// src/app/list/page.js
"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Post from "@/components/posts/Post";

export default function ListPage() {
    const router = useRouter();
    const [posts, setPosts] = useState([]);
    const [intervalId, setIntervalId] = useState(null);

    const handleMakeForm = () => {
        router.push("/post");
    };

    // get the posts once a second
    const fetchPosts = async () => {
        const res = await fetch("/api/shares", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        setPosts(data.posts);
    };

    useEffect(() => {
        fetchPosts();
        const id = setInterval(fetchPosts, 1000);
        setIntervalId(id);

        return () => clearInterval(intervalId);
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
                    {posts &&
                        posts.map((post) => <Post key={post.id} post={post} />)}
                </div>
            </div>
        </div>
    );
}
