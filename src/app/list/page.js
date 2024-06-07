// src/app/list/page.js
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Post from "@/components/posts/Post";

export default function ListPage(props) {
    const router = useRouter();

    const handleMakeForm = () => {
        router.push("/post");
    };

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
                    <span>{`total ${props.posts ? props.posts.length : 0} posts`}</span>
                    <span>Filter</span>
                </div>
                <div className="space-y-4">
                    {props.posts && props.posts.map((post) => (
                        <Post key={post.id} post={post} />
                    ))}
                </div>
            </div>
        </div>
    );
}

// get posts data from db as props.posts
export async function getStaticProps() {
    const res = await fetch("http://localhost:3000/api/shares");
    const data = await res.json();

    return {
        props: {
            posts: data.posts,
        },
        revalidate: 1,
    };
}
