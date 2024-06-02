// src/app/post/page.js
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../hooks/useAuth";

export default function PostPage() {
    //const router = useRouter();
    //const { user } = useAuth();
    const [buttonState, setButtonState] = useState(false);

    const [isValidImage, setIsValidImage] = useState(true);
    const [isValidLocation, setIsValidLocation] = useState(true);

    const [imgURL, setImageURL] = useState("");
    const [locationType, setLocationType] = useState("Building 301");
    const [customLocation, setCustomLocation] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        image: "",
        location: "",
        description: "",
        price: ["", "", "", ""],
        occupation: buttonState ? "Seller" : "Buyer",
    });

    const handleChange = (e) => {
        if (e.target.name === "price1" || e.target.name === "price2" || e.target.name === "price3" || e.target.name === "price4") {
            const index = parseInt(e.target.name[e.target.name.length - 1], 10) - 1;
            const newPrice = [...formData.price];
            newPrice[index] = e.target.value;
            setFormData({ ...formData, price: newPrice });
            return;
        }
        if (e.target.name === "image") {
            setIsValidImage(true);
            setImageURL(e.target.value);
            setFormData({ ...formData, image: e.target.value });
            return;
        }
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };

    const buildingOptions = [
        "Building 301",
        "Building 302",
        "Building 303",
        "Building 304",
        "Building 305",
        "Building 306",
        "Building 307",
        "Building 308",
        "Building 309",
        "Other"
    ];

    const handleSubmit = (e)=> {
        // 단순 콘솔 출력
        e.preventDefault();
        console.log(formData);
    }

    //   const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //       // 게시글 작성 API 호출
    //       const response = await fetch('/api/posts', {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ ...formData, userId: user.id }),
    //       });
    //       const data = await response.json();
    //       // 게시글 작성 후 처리 로직
    //       router.push(`/${data.slug}`);
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   };

    useEffect(() => {
        setFormData({ ...formData, occupation: buttonState ? "Seller" : "Buyer" });
    }, [buttonState]);

    useEffect(() => {
        setFormData({ ...formData, image: imgURL});
    }, [imgURL]);

    useEffect(() => {
        if (!buildingOptions.includes(locationType)) {
            setIsValidLocation(false);
            setFormData({ ...formData, location: "" });
            return;
        }
        setFormData({ ...formData, location: locationType === "Other" ? customLocation : locationType });
    }, [locationType, customLocation]);

    function buttonToggleHandler(buttonName) {
        if (buttonName === "Share Space" && buttonState === false || buttonName === "Buy Space" && buttonState === true) {
            setButtonState(!buttonState);
        }
    }

    function imageErrorHandler() {
        setIsValidImage(false);
        setImageURL("");
        setFormData({ ...formData, image: "" });
    }

    return (
        <div className="container mx-auto p-4">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">I Want to...</h1>
                <div className="flex justify-center space-x-4 mb-4">
                    <button 
                        className={`${buttonState ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-700'} px-4 py-2 rounded transition-all`}
                        onClick={() => buttonToggleHandler("Share Space")}
                    >
                        Share Space
                    </button>
                    <button 
                        className={`${buttonState ? 'bg-gray-300 hover:bg-gray-400 text-gray-700' : 'bg-blue-600 hover:bg-blue-500 text-white'}  px-4 py-2 rounded transition-all`}
                        onClick={() => buttonToggleHandler("Buy Space")}
                    >
                        Buy Space
                    </button>
                </div>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        className="border p-2 w-full rounded"
                        value={formData.title}
                        onChange={handleChange}
                    />
                    <select
                        name="locationType"
                        className={`border p-2 w-full rounded ${isValidLocation ? undefined : 'border-red-500 border-2'}`}
                        value={locationType}
                        onChange={(e) => setLocationType(e.target.value)}
                    >
                        {buildingOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                    {locationType === "Other" && (
                        <input
                            type="text"
                            name="customLocation"
                            placeholder="Enter your location"
                            className="border p-2 w-full rounded"
                            value={customLocation}
                            onChange={(e) => setCustomLocation(e.target.value)}
                        />
                    )}
                    <textarea
                        name="description"
                        placeholder="Description"
                        className="border p-2 w-full rounded h-32"
                        value={formData.description}
                        onChange={handleChange}
                    ></textarea>
                    <div className="flex space-x-4">
                        <div>
                            {imgURL && isValidImage ? (
                                <img src={imgURL} alt="preview" className="h-48 w-full object-cover rounded" onError={imageErrorHandler}/>
                            ) : (
                                <div className="bg-gray-300 h-48 flex items-center justify-center rounded">
                                    <span className="text-gray-500">No Image</span>
                                </div>
                            )}
                            {!isValidImage && <p className="text-red-500 mt-2">Invalid Image URL</p>}
                            <input
                                type="text"
                                name="image"
                                placeholder="Enter Image URL"
                                className={`border mt-2 p-2 w-full rounded mb-2 ${isValidImage ? undefined : 'border-red-500 border-2'}`}
                                value={imgURL}
                                onChange={handleChange}
                            ></input>
                        </div>
                        <div className="flex-col">
                            <input
                                type="text"
                                name="price1"
                                placeholder="Small Box Price"
                                className="border p-2 w-full rounded mb-2"
                                value={formData.price[0]}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="price2"
                                placeholder="Midium Box Price"
                                className="border p-2 w-full rounded mb-2"
                                value={formData.price[1]}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="price3"
                                placeholder="Midium Box Price"
                                className="border p-2 w-full rounded mb-2"
                                value={formData.price[2]}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="price4"
                                placeholder="Extra Box Price"
                                className="border p-2 w-full rounded"
                                value={formData.price[3]}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
                    >
                        Submit!
                    </button>
                </form>
            </div>
        </div>
    );
}
