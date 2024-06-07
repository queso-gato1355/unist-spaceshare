'use client';

import { useState, useContext } from "react";
import UserContext from "@/context/UserContext";
import { useRouter } from "next/navigation";

export default function LoginBox() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { setUser, setAccessToken } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await res.json();

        if (data.success) {
            alert("Login successful");
            setAccessToken(data.accessToken);

            router.push("/list");
        } else {
            alert(data.error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                className="border p-2 w-full rounded"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                className="border p-2 w-full rounded"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
                Login
            </button>
        </form>
    );
}