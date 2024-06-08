// src/app/list/page.js
import React from "react";
import PostList from "@/components/posts/PostList";
import VerificationButtonLink from "@/components/buttons/VerificationButtonLink";

export default function ListPage() {
    return (
        <div className="container mx-auto p-4">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Post Yours!</h1>
                <VerificationButtonLink
                    href="/post"
                    className="bg-blue-600 hover:bg-blue-400 transition-all text-white px-4 py-2 rounded mb-4"
                >
                    Make a form!
                </VerificationButtonLink>
                <PostList />
            </div>
        </div>
    );
}
