// src/app/api/user/route.js
import { connectToDatabase } from "../../../lib/mongodb";
import jwt from "jsonwebtoken";
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
            { projection: { username: 1, email: 1, profilePicture: 1 } }
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
