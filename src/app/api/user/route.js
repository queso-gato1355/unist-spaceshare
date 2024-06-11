// src/app/api/user/route.js
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// "use client";

export async function GET(req) {
    try {
        const { client, db } = await connectToDatabase();
        const userId = req.query.id; // Adjusted to capture 'id' from query string
        const user = await db
            .collection("users")
            .findOne({ _id: new ObjectId(userId) }
            );

        if (!user) {
            return new Response(JSON.stringify({ user: null }), {
                status: 404,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }
        console.log(`data: ${JSON.stringify(user)}`);

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