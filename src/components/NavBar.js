// src/app/components/NavBar.js
"use client";

import "./NavBar.css";

import React from "react";
import { useRouter } from "next/navigation";
// import { useAuth } from "../hooks/useAuth";

export default function NavBar() {
    const router = useRouter();
    // const { user, isLoading } = useAuth();
    const user = false;

    //if (isLoading) return <div>Loading...</div>;

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
                    <img
                        src={user.profilePic}
                        alt="Profile"
                        className="w-8 h-8 rounded-full mr-2"
                    />
                    <span className="text-white">{user.name}</span>
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
