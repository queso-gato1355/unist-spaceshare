
// /app/api/user/route.js
// 쿼리 파라미터로 user id를 입력하면 그에 따른 user 객체를 반환한다
// GET /api/user?userId={userId}
import { connectToDatabase, closeConnection } from "../../../lib/mongodb";
import { ObjectId } from "mongodb";
import { verifyAccessToken } from "@/utils/jwtToken";

export async function GET(req) {

    const auth = req.headers.get("Authorization");
    const params = req.nextUrl.searchParams;

    if (!auth || !auth.startsWith("Bearer ")) {
        return new Response(JSON.stringify({ user: null, error: "Authorization error" }), {
            status: 401,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    const token = auth.split(" ")[1];

    try {
        const decoded = verifyAccessToken(token);

        if (!decoded) {
            return new Response(JSON.stringify({ user: null, error: "Invalid token" }), {
                status: 401,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }

        const { db } = await connectToDatabase();
        const userCollection = db.collection("users");
        const user = await userCollection.findOne(
            { _id: new ObjectId(params.userId) },
            { projection: { username: 1, email: 1, profilePicture: 1, contactLink: 1 } }
        );

        if (!user) {
            await closeConnection();
            return new Response(JSON.stringify({ user: null }), {
                status: 404,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }
        console.log(`data: ${JSON.stringify(user)}`);

        await closeConnection();

        return new Response(JSON.stringify({ user }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        await closeConnection();
        return new Response(JSON.stringify({ user: null }), {
            status: 403,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}