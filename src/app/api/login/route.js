// src/app/api/login/route.js

import { connectToDatabase } from "../../../lib/mongodb";
import bcrypt from "bcryptjs";
import {
    generateRefreshToken,
    generateAccessToken,
} from "../../../utils/jwtToken";

export async function POST(req) {
    const { username, password } = await req.json();

    if (!username || !password) {
        return new Response(
            JSON.stringify({ error: "Username and password are required" }),
            {
                status: 400,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }

    const { db } = await connectToDatabase();

    const user = await db.collection("users").findOne({ username });

    if (!user) {
        return new Response(JSON.stringify({ error: "Invalid username" }), {
            status: 400,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return new Response(JSON.stringify({ error: "Invalid password" }), {
            status: 400,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    const refreshToken = generateRefreshToken(user._id);
    const accessToken = generateAccessToken(user._id);

    // save refresh token in database coressponing to user
    await db
        .collection("users")
        .updateOne({ username }, { $set: { refreshToken } });

    return new Response(JSON.stringify({ success: true, id: user._id, accessToken: accessToken }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}
