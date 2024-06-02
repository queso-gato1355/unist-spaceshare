"use client";

import ButtonLink from "@/components/ButtonLink";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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
            // Store token in local storage or cookies
            localStorage.setItem("token", data.token);
            router.push("/list");
        } else {
            alert(data.error);
        }
    };

    return (
        <div className="container mx-auto p-4 flex justify-center items-center">
            <div className="text-center max-w-[500px] pt-20">
                <h1 className="text-4xl font-bold mb-4">Log In</h1>
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
                    <ButtonLink href="/register" className="text-blue-600 mt-5">
                        Register
                    </ButtonLink>
                </form>
            </div>
        </div>
    );
}
