// src/app/components/NavBar.js
"use client";

import "./NavBar.css";

import React from "react";
import path from "path";
import { useContext } from "react";
import UserContext from "@/context/UserContext";
import { useRouter } from "next/navigation";

const publicPath = path.resolve("public");

export default function NavBar() {
    const router = useRouter();
    const { user, isLoading } = useContext(UserContext);

    console.log(user);

    if (isLoading) return <div>Loading...</div>;

    return (
        <nav className="bg-[#03AED2] p-4 flex justify-between items-center">
            <span
                className="logo text-white text-2xl font-bold cursor-pointer transition-all"
                onClick={() => router.push("/")}
            >
                SpaceShare
            </span>
            {user ? (
                <div className="flex items-center">
                    <button>Log out</button>
                    <img
                        src={user.profilePicture}
                        alt="Profile"
                        className="w-8 h-8 rounded-full mr-2"
                    />
                    <span className="text-white">{user.username}</span>
                </div>
            ) : (
                <button
                    className="bg-[#FEEFAD] hover:bg-[#FDDE55] transition-all text-gray-700 px-4 py-2 rounded"
                    onClick={() => router.push("/login")}
                >
                    Sign-in
                </button>
            )}
        </nav>
    );
}
