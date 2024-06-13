// app/list/[postId]/page.js
import { ObjectId } from "mongodb";
import ButtonLink from "@/components/buttons/ButtonLink";

export default async function DetailedPage({ params }) {
    const { postId } = params;
    const post = {
        _id: new ObjectId("6662f9b928863a6a9a5218f9"),
        userId: new ObjectId("665e740a973af77e2014ee5b"),
        title: "Title 1",
        location: "Other",
        description: "Description 1",
        postedTime: 1717080140,
        price: ["Price 1-1", "Price 1-2", "Price 1-3", "Price 1-4"],
        image: "https://images.livspace-cdn.com/plain/https://d3gq2merok8n5r.cloudfront.net/abhinav/ond-1634120396-Obfdc/jfm-2024-1704560007-SGQ6F/living-room-1704796237-OxcYs/la-9-1710762201-Lwnli.jpg",
        occupation: "Buyer",
        state: false,
    };

    const user = {
        _id: new ObjectId("665e740a973af77e2014ee5b"),
        username: "user1",
        email: "test@email.com",
        profilePicture: "https://placehold.co/192x192?text=No+Image",
        contactLink: "https://www.google.com",
    };

    return (
        <div className="flex-col justify-center items-center text-center">
            {/* 항상 화면 왼쪽 위에 존재하는 돌아가기 버튼 */}
            <ButtonLink
                href="/list"
                className="fixed bottom-5 left-5 transition-all p-2 rounded-xl bg-green-500 text-white shadow-lg hover:bg-green-700 hover:shadow-2xl"
            >
                Back
            </ButtonLink>
            <div className="p-4">
                <h1 className="text-5xl font-bold">{post.title}</h1>
                <h1 className="text-lg text-gray-500">{post.location}</h1>
            </div>
            <div className="overflow-hidden w-full h-96">
                <img
                    src={post.image}
                    alt="Post"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex-col justify-center items-center space-y-4 p-2">
                <h1 className="text-2xl font-bold">Price</h1>
                <div className="flex justify-center space-x-10">
                    <h1>{post.price[0]}</h1>
                    <h1>{post.price[1]}</h1>
                    <h1>{post.price[2]}</h1>
                    <h1>{post.price[3]}</h1>
                </div>
            </div>
            <div className="p-4 space-y-10">
                <p className="text-2xl font-bold">Description</p>
                <p>{post.description}</p>
            </div>

            <div className="flex justify-center items-center mt-5">
                <a href={user.contactLink}>
                    <button className="bg-blue-500 hover:bg-blue-400 hover:shadow-md fill-white transition-all border rounded-full cursor-pointer text-white p-4">
                        Contact!
                    </button>
                </a>
            </div>
        </div>
    );
}
