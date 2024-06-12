import { connectToDatabase, closeConnection } from "../../../lib/mongodb";
import { generateAccessToken } from "../../../utils/jwtToken";

export const POST = async (req) => {
    const { refreshToken } = await req.json();

    const { db } = await connectToDatabase();

    // refreshToken 검증
    const user = await db.collection("users").findOne({ refreshToken });
    if (!user) {
        await closeConnection();
        return new Response(
            JSON.stringify({ error: "Invalid refresh token" }),
            {
                status: 401,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }

    // 새로운 accessToken 발급
    const accessToken = generateAccessToken(user._id);

    await closeConnection();

    return new Response(JSON.stringify({ success: true, accessToken }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
};
