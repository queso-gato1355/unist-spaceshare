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

        const formData = await request.formData();
        const title = formData.get("title");
        const location = formData.get("location");
        const description = formData.get("description");
        const price = formData.getAll("price");
        const image = formData.get("image");
        const occupation = formData.get("occupation");

        const { db } = await connectToDatabase();
        const postsCollection = db.collection("Posts");

        // store current time in Unix timestamp (in string)
        const postedTime = String(Math.floor(Date.now() / 1000));
        const state = true; // 항상 true로 설정

        const result = await postsCollection.insertOne({
            title,
            location,
            description,
            price,
            image,
            occupation,
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

export async function GET(request) {
    try {
        const { db } = await connectToDatabase();
        const postsCollection = db.collection("Posts");

        const posts = await postsCollection.find({}).toArray();

        // 전체 포스트에 존재하는 postedId를 정규표현식을 통해 깔끔한 postedTime으로 변환
        posts.forEach((post) => {
            post.postedTime = Number(post.postedTime.replace(/[^\d]/g, ''));
        });

        return new Response(JSON.stringify({posts}), {
            status: 200,
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
