import { connectToDatabase, closeConnection } from "../../../lib/mongodb";
import { verifyAccessToken } from "../../../utils/jwtToken";
import instanceValidation from "../../../utils/instanceValidation";
import AWS from "@/../../aws.config";

const s3 = new AWS.S3();

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
            const decoded = verifyAccessToken(token);
            userId = decoded.id;
        } catch (err) {
            return new Response(JSON.stringify({ error: "Invalid token" + err }), {
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
        const price = JSON.parse(formData.getAll("price"));
        const image = formData.get("image");
        const occupation = formData.get("occupation");

        const { isEmpty, emptyObj } = instanceValidation({
            title, location, description, price, image, occupation
        });

        if (isEmpty) {
            const errorMessage = `Missing required fields: ${Object.keys(emptyObj).join(", ")}`;
            return new Response(JSON.stringify({ error: errorMessage }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        // 파일 객체인 경우에는 AWS에 게시하며
        // 아닌 경우(단순한 링크)에는 그대로 저장
        let imageLink = "";
        console.log(image);
        // image 값이 http로 시작할 경우
        if (image.startsWith("http")) {
            imageLink = image;
        } else {
            const uniqueSuffix = `${Date.now()}-${Math.round(
                Math.random() * 1e9
            )}`;
            const ext = path.extname(image.name);
            const filename = `post-${uniqueSuffix}${ext}`;

            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: filename,
                Body: image,
                ACL: "public-read",
            };

            try {
                const data = await s3.upload(params).promise();
                imageLink = data.Location;
            } catch (error) {
                console.error(error);
                return new Response(JSON.stringify({ error: "An error occurred" }), {
                    status: 500,
                    headers: { "Content-Type": "application/json" },
                });
            }
        }

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
            "image": imageLink,
            occupation,
            userId,
            postedTime,
            state,
        });

        const insertedId = result.insertedId.toString();

        await closeConnection();

        return new Response(JSON.stringify({ message: "Post inserted!", id: insertedId }), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error(error);
        await closeConnection();
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
