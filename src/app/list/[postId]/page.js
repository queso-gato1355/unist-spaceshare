// app/list/[postId]/page.js
import { connectToDatabase } from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

const getUserById = async (userId) => {
    // const baseURL = "http://localhost:3000";
    // const url = new URL(`/api/user?id=${userId}`, baseURL);

    // const response = await fetch(`/api/user?id=${userId}`, {
    //     method: "GET",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    // });
    // if (!response.ok) {
    //     console.error('Failed to fetch user:', response.statusText);
    //     return null;
    // }
    // const data = await response.json();
    // return data.user;
}

async function getPostById(postId) {
    const { db } = await connectToDatabase();
    const post = await db
        .collection("Posts")
        .findOne({ _id: new ObjectId(postId) });
    // postId 변경
    post.postedTime = Number(post.postedTime.replace(/[^\d]/g, ""));
    return post;
}

export default async function DetailedPage({ params }) {
    // console.log(params); // { postId: '6662f9b928863a6a9a5218f9' }
    const { postId } = params;
    // console.log(postId); // 6662f9b928863a6a9a5218f9
    const post = await getPostById(postId);

    if (!post) {
        return <div>Post not found</div>;
    }
    // {
    //     _id: new ObjectId('6662f9b928863a6a9a5218f9'),
    //     userId: new ObjectId('665e740a973af77e2014ee5b'),
    //     title: 'Title 1',
    //     location: 'Other',
    //     description: 'Description 1',
    //     postedTime: 1717080140,
    //     price: [ 'Price 1-1', 'Price 1-2', 'Price 1-3', 'Price 1-4' ],
    //     image: 'https://images.livspace-cdn.com/plain/https://d3gq2merok8n5r.cloudfront.net/abhinav/ond-1634120396-Obfdc/jfm-2024-1704560007-SGQ6F/living-room-1704796237-OxcYs/la-9-1710762201-Lwnli.jpg',
    //     occupation: 'Buyer',
    //     state: false
    //   }


    console.log(post);

    return (
        <div>
            <h1>Title: {post.title}</h1>
            <h1>Location: {post.location}</h1>
            <p>Description: {post.description}</p>
            <p>userId: {post.userId}</p>

            <p>{getUserById(post.userId).contactLink}</p>
            {/* 여기에 추가적인 게시글 정보를 렌더링할 수 있습니다. */}
        </div>
    );
}
