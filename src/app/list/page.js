// src/app/list/page.js
"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Post from "@/components/posts/Post";

export default function ListPage() {
    const router = useRouter();
    const [posts, setPosts] = useState([]);

    const handleMakeForm = () => {
        router.push("/post");
    };

    const DUMMY_DATA = [
        {
            id: 1,
            userId: 1,
            title: "Title 1",
            location: "Location 1",
            description: "Description 1",
            postedTime : 1717080140,
            price: [
                "Price 1-1",
                "Price 1-2",
                "Price 1-3",
                "Price 1-4",
            ], // 가격은 배열로 받아서 렌더링
            image: "https://images.livspace-cdn.com/plain/https://d3gq2merok8n5r.cloudfront.net/abhinav/ond-1634120396-Obfdc/jfm-2024-1704560007-SGQ6F/living-room-1704796237-OxcYs/la-9-1710762201-Lwnli.jpg",
            occupation: "Buyer",
            state: false,
        },
        {
            id: 2,
            userId: 1,
            title: "Title 2",
            location: "Location 1",
            description: "Description 1",
            postedTime : 1717234240,
            price: [
                "Price 1-1",
                "Price 1-2",
                "Price 1-3",
                "Price 1-4",
            ], // 가격은 배열로 받아서 렌더링
            image: "https://images.livspace-cdn.com/plain/https://d3gq2merok8n5r.cloudfront.net/abhinav/ond-1634120396-Obfdc/jfm-2024-1704560007-SGQ6F/living-room-1704796237-OxcYs/la-9-1710762201-Lwnli.jpg",
            occupation: "Seller",
            state: true,
        }
    ];

    // get the posts to the const and fetch them if there's any new.
    useEffect(() => {
        fetch("/api/shares")
            .then((res) => res.json())
            .then((data) => setPosts(data.posts));
    }, []);

    return (
        <div className="container mx-auto p-4">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Post Yours!</h1>
                <button
                    className="bg-blue-600 hover:bg-blue-400 transition-all text-white px-4 py-2 rounded mb-4"
                    onClick={handleMakeForm}
                >
                    Make a form
                </button>
                <div className="flex justify-between items-center mb-4">
                    <span>{`total ${posts ? posts.length : 0} posts`}</span>
                    <span>Filter</span>
                </div>
                <div className="space-y-4">
                    {posts && posts.map((post) => (
                        <Post key={post.id} post={post} />
                    ))}
                </div>
            </div>
        </div>
    );
}
