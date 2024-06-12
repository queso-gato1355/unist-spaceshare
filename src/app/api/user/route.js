// src/app/api/user/route.js
import { connectToDatabase } from "../../../lib/mongodb";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";

const JWT_SECRET = process.env.JWT_SECRET;

export async function GET(req) {
    const authHeader = req.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return new Response(JSON.stringify({ user: null }), {
            status: 401,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const { client, db } = await connectToDatabase();
        const userCollection = db.collection("users");
        const user = await userCollection.findOne(
            { _id: new ObjectId(decoded.id) },
            { projection: { username: 1, email: 1, contactLink: 1, profilePicture: 1 } }
        );

        if (!user) {
            return new Response(JSON.stringify({ user: null }), {
                status: 404,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }

        return new Response(JSON.stringify({ user }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ user: null }), {
            status: 403,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}

export async function PUT(req) {
    const authHeader = req.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return new Response(JSON.stringify({ user: null }), {
            status: 401,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    const formData = await req.formData();
    const email = formData.get("email");
    const username = formData.get("username");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    const contactLink = formData.get("contactLink");
    const profilePicture = formData.get("profilePicture");

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
    const user_info = {
        username,
        password: hashedPassword,
        email,
        contactLink,
        profilePicture: profilePicturePath,
    };

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const { client, db } = await connectToDatabase();
        const userCollection = db.collection("users");
        const user = await userCollection.updateOne(
            { _id: new ObjectId(decoded.id) },
            { $set: user_info },
        );

        if (!user) {
            return new Response(JSON.stringify({ user: null }), {
                status: 404,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }

        return new Response(JSON.stringify({ user }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ user: null }), {
            status: 403,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}

// 유저 회원탈퇴

export async function DELETE(req) {
    const authHeader = req.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return new Response(JSON.stringify({ success: false }), {
            status: 401,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const { client, db } = await connectToDatabase();
        const userCollection = db.collection("users");
        const user = await userCollection.findOne(
            { _id: new ObjectId(decoded.id) },
            { projection: { username: 1, email: 1, profilePicture: 1 } }
        );

        if (!user) {
            return new Response(JSON.stringify({ success: false }), {
                status: 404,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }

        await userCollection.deleteOne({ _id: new ObjectId(decoded.id) });

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ success: false }), {
            status: 403,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}
