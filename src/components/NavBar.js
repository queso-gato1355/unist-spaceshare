// src/app/components/NavBar.js
"use client";

import "./NavBar.css";

import React from "react";
import { useContext, useState, useEffect } from "react";
import UserContext from "@/context/UserContext";
import { useRouter, usePathname } from "next/navigation";
import LogoutButton from "./buttons/LogoutButton";
import ReactLoading from "react-loading";

export default function NavBar() {
    const router = useRouter();
    const currentPath = usePathname();
    const { user, isLoading } = useContext(UserContext);
    const [isLoginOrSignup, setIsLoginOrSignup] = useState(false);

    useEffect(() => {
        setIsLoginOrSignup(["/login", "/register"].includes(currentPath));
    }, [currentPath]);

    const loadingComponent = (
        <div className="flex items-center justify-center w-24">
            <ReactLoading type="bars" color="#fff" height={'20%'} width={60} />
        </div>
    );

    const userInfoComponent = ( user ? (
        <div className="flex items-center w-52">
            <div className="mr-2">
                <LogoutButton />
            </div>
            <img
                src={user.profilePicture}
                alt="Profile"
                className="w-8 h-8 rounded-full mr-2"
            />
            <span className="text-white">{user.username}</span>
        </div>
        ) : (
        <div className="w-24">
            <button
                className="bg-[#FEEFAD] hover:bg-[#FDDE55] transition-all text-gray-700 px-4 py-2 rounded"
                onClick={() => router.push("/login")}
            >
                Sign-in
            </button>
        </div>
        )
    );

    return (
        <nav className="bg-[#03AED2] p-4 flex justify-between items-center h-20">
            <span
                className="logo text-white text-2xl font-bold cursor-pointer transition-all"
                onClick={() => router.push("/")}
            >
                SpaceShare
            </span>
            {isLoading
                ? loadingComponent
                : isLoginOrSignup
                    ? null
                    : userInfoComponent
            }
        </nav>
    );
}
