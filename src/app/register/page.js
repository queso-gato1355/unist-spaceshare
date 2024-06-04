"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);

    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isSamePassword, setIsSamePassword] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setIsEmailValid(false);
            return;
        }
        if (password.length < 8 || password.length > 20) {
            setIsPasswordValid(false);
            return;
        }
        if (password !== confirmPassword) {
            setIsSamePassword(false);
            return;
        }

        const formdata = new FormData();
        formdata.append("email", email);
        formdata.append("username", username);
        formdata.append("password", password);
        formdata.append("profilePicture", profilePicture);

        const res = await fetch("/api/register", {
            method: "POST",
            body: formdata,
        });

        const data = await res.json();

        if (data.success) {
            alert("Registration successful");
            router.push("/login");
        } else {
            alert(data.error);
        }
    };

    function validateEmail(email) {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    return (
        <div className="container mx-auto p-4 flex justify-center items-center">
            <div className="text-center max-w-[700px]">
                <h1 className="text-4xl font-bold mb-4">Welcome!</h1>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4 flex flex-wrap"
                >
                    <div className="flex justify-center w-full mb-4">
                        <div className="flex flex-col justify-center items-center mr-10">
                            <div>
                                <img
                                    src={profilePicture ? URL.createObjectURL(profilePicture) : "https://placehold.co/200x200"}
                                    alt="Profile"
                                    className="w-20 h-20 mb-4 rounded-full"
                                />
                            </div>
                            <input
                                type="file"
                                id="profilePicture"
                                className="hidden"
                                onChange={(e) =>
                                    setProfilePicture(e.target.files[0])
                                }
                            />
                            <label
                                htmlFor="profilePicture"
                                className="bg-blue-500 hover:bg-blue-400 text-white transition-all border p-2 w-full rounded cursor-pointer"
                            >
                                Select...
                            </label>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            {!isEmailValid && (
                                <p className="text-red-500 mb-2">
                                    Invalid email address.
                                </p>
                            )}
                            <input
                                type="email"
                                placeholder="Email"
                                className={`border transition-all p-2 mb-2 w-full rounded ${
                                    isEmailValid ? "" : "border-red-500"
                                }`}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Username"
                                className="border transition-all p-2 mb-2 w-full rounded"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            {!isPasswordValid ? (
                                <p className="text-red-500 mb-2">
                                    Password should be more than 8 words and
                                    less than 20 words.
                                </p>
                            ) : (
                                <p className="text-gray-500 text-xs mb-2">
                                    Password should be more than 8 words and
                                    less than 20 words.
                                </p>
                            )}
                            <input
                                type="password"
                                placeholder="Password"
                                className={`border transition-all p-2 mb-2 w-full rounded ${
                                    isPasswordValid ? "" : "border-red-500"
                                }`}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {!isSamePassword && (
                                <p className="text-red-500">
                                    Password does not match.
                                </p>
                            )}
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className={`border transition-all p-2 w-full rounded ${
                                    isSamePassword ? "" : "border-red-500"
                                }`}
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                        </div>
                    </div>
                    <div className="w-full">
                        <button type="submit" className="bg-blue-600 hover:bg-blue-500 w-40 hover:w-44 transition-all text-white px-4 py-2 rounded">Register!</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
