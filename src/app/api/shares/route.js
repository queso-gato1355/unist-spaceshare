import jwt from "jsonwebtoken";
import { connectToDatabase } from "../../../lib/mongodb";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error(
        "Please define the JWT_SECRET environment variable inside .env.local"
    );
}

export async function POST(request) {
    try {
        const authHeader = request.headers.get("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return new Response(
                JSON.stringify({
                    error: "Missing or invalid authorization header",
                }),
                {
                    status: 401,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        }

        const token = authHeader.split(" ")[1];
        let userId;
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            userId = decoded.id;
        } catch (err) {
            return new Response(JSON.stringify({ error: "Invalid token" }), {
                status: 401,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }

        const data = await request.json();

        const { db } = await connectToDatabase();
        const postsCollection = db.collection("Posts");

        const postedTime = Math.floor(Date.now() / 1000); // 현재 Unix 시간 (초 단위)
        const state = true; // 항상 true로 설정

        const result = await postsCollection.insertOne({
            ...data,
            userId,
            postedTime,
            state,
        });

        const insertedId = result.insertedId.toString();

        return new Response(JSON.stringify({ message: "Post inserted!", id: insertedId }), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: "An error occurred" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
