import { connectToDatabase, closeConnection } from "../../../lib/mongodb";
import bcrypt from "bcryptjs";
import path from "path";
import fs from "fs";
import AWS from "@/../../aws.config";
import emailValidate from "@/utils/emailValidation";

const s3 = new AWS.S3();

const isMultipartFormData = (req) => {
    const contentType = req.headers.get("Content-Type") || "";
    return contentType.startsWith("multipart/form-data");
};

export const POST = async (req) => {
    try {
        if (!isMultipartFormData(req)) {
            return new Response(
                JSON.stringify({ error: "Invalid request body" }),
                { status: 400 }
            );
        }

        const formData = await req.formData();
        const email = formData.get("email");
        const username = formData.get("username");
        const password = formData.get("password");
        const confirmPassword = formData.get("confirmPassword");
        const contactLink = formData.get("contactLink");
        const profilePicture = formData.get("profilePicture");

        if (!username || !password || !email || !contactLink ||
            username.length < 5 || password.length < 8 || contactLink.length <= 0 || !emailValidate(email) ||
            username.length > 30 || password.length > 20 || password !== confirmPassword
        ) {
            return new Response(
                JSON.stringify({
                    error: "Validation failed. Please check your input.",
                }),
                { status: 400 }
            );
        }

        const { db } = await connectToDatabase();

        const existingUser = await db.collection("users").findOne({ email });
        if (existingUser) {
            await closeConnection();

            return new Response(
                JSON.stringify({ error: "Email already exists" }),
                { status: 400 }
            );
        }

        let profilePicturePath = "";
        if (profilePicture && profilePicture.size > 0) {
            const uniqueSuffix = `${Date.now()}-${Math.round(
                Math.random() * 1e9
            )}`;
            const ext = path.extname(profilePicture.name);
            const filename = `profile-${uniqueSuffix}${ext}`;

            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: filename,
                Body: Buffer.from(await profilePicture.arrayBuffer()),
                ContentType: profilePicture.type,
            };

            const data = await s3.upload(params).promise();
            profilePicturePath = data.Location;
        } else {
            profilePicturePath = "https://ui-avatars.com/api/?name=" + username + "&background=random&size=128";
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = {
            username,
            password: hashedPassword,
            email,
            contactLink,
            profilePicture: profilePicturePath,
        };

        await db.collection("users").insertOne(user);

        await closeConnection();

        return new Response(JSON.stringify({ success: true, user }), {
            status: 201,
        });
    } catch (error) {
        console.error(error);

        await closeConnection();

        return new Response(JSON.stringify({ error: "Server Error" }), {
            status: 500,
        });
    }
};
