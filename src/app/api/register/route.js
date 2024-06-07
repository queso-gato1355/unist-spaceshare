import { connectToDatabase } from "../../../lib/mongodb";
import bcrypt from "bcryptjs";
import path from "path";
import fs from "fs";

const uploadDir = path.join(process.cwd(), "public", "uploads");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const isMultipartFormData = (req) => {
    const contentType = req.headers.get('Content-Type') || '';
    return contentType.startsWith('multipart/form-data');
};

export const POST = async (req) => {
    try {
        if (!isMultipartFormData(req)) {
            return new Response(JSON.stringify({ error: "Invalid request body" }), { status: 400 });
        }

        const formData = await req.formData();
        const email = formData.get('email');
        const username = formData.get('username');
        const password = formData.get('password');
        const profilePicture = formData.get('profilePicture');

        if (!username || !password || !email) {
            return new Response(JSON.stringify({ error: "Username, password, and email are required" }), { status: 400 });
        }

        const { db } = await connectToDatabase();

        const existingUser = await db.collection("users").findOne({ email });
        if (existingUser) {
            return new Response(JSON.stringify({ error: "Email already exists" }), { status: 400 });
        }

        let profilePicturePath = "";
        if (profilePicture) {
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            const ext = path.extname(profilePicture.name);
            const filename = `profile-${uniqueSuffix}${ext}`;
            const filePath = path.join(uploadDir, filename);
            
            const data = await profilePicture.arrayBuffer();
            await fs.promises.writeFile(filePath, Buffer.from(data));
            profilePicturePath = path.join("uploads", filename);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = {
            username,
            password: hashedPassword,
            email,
            profilePicture: profilePicturePath,
        };

        await db.collection("users").insertOne(user);
        return new Response(JSON.stringify({ success: true, user }), { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Server Error" }), { status: 500 });
    }
}