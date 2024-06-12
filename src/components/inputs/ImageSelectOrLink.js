"use client";

import { useState } from "react";
import Image from "next/image";
import plusIcon from "/public/plusIcon.png";

export default function ImageSelectOrLink({
    onChange,
    value,
    placeholderImage,
}) {
    const [isValidImage, setIsValidImage] = useState(true);

    function imageErrorHandler() {
        setIsValidImage(false);
    }

    function handleChange(e) {
        setIsValidImage(true);
        onChange(e);
    }

    return (
        <div className="felx-col items-center justify-center">
            <div className="overflow-hidden sm:w-48 w-full h-48 rounded-xl shadow-md">
                <img
                    src={value && value instanceof File ? URL.createObjectURL(value) : (value ? value : placeholderImage)}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    onError={imageErrorHandler}
                />
            </div>
            <input
                type="file"
                id="profilePictureInput"
                className="hidden"
                onChange={handleChange}
            />
            <div
                onClick={() => {
                    document.getElementById("profilePictureInput").click();
                }}
                className="bg-blue-500 hover:bg-blue-400 hover:shadow-md fill-white transition-all border rounded-full cursor-pointer text-white p-1 mt-2 ml-4 mr-4"
            >
                Select Image
            </div>
            {!isValidImage && (
                <p className="text-red-500 mt-2">Invalid Image URL</p>
            )}
            <div className="flex flex-col items-col">
                <label>Or link...</label>
                <input
                    type="text"
                    placeholder="Enter Image URL"
                    className={`border p-2 w-full rounded mb-2 ${
                        isValidImage
                            ? undefined
                            : "border-red-500 border-2"
                    }`}
                    value={value}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
}
