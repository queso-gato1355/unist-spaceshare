'use client';

import React from "react";
import { useState, useEffect } from "react";
import Post from "@/components/posts/Post";

export default function PostList() {
    const [posts, setPosts] = useState([]);
    const [intervalId, setIntervalId] = useState(null);

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
        const id = setInterval(fetchPosts, 10000);
        setIntervalId(id);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <span>{`total ${posts ? posts.length : 0} posts`}</span>
                <span>Filter</span>
            </div>
            <div className="space-y-4">
                {posts && posts.map((post) => <Post key={post._id} post={post} />)}
            </div>
        </>
    );
}