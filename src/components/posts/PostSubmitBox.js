'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ToggleButton from "../../components/buttons/ToggleButton";
import ConditionalLabelInput from "../../components/inputs/ConditionalLabelInput";
import DMWithOptionInput from "../../components/menu/DMWithOptionInput";
import ImageSelectOrLink from "../../components/inputs/ImageSelectOrLink";
import LabelInput from "../../components/inputs/LabelInput";


export default function PostSubmitBox({ buildingOptions }) {
    const router = useRouter();

    const [formData, setFormData] = useState({
        title: "",
        image: "",
        location: "Building 301",
        locationType: "",
        description: "",
        price: {
            small: "",
            medium: "",
            large: "",
            xl: "",
        },
        occupation: "Seller",
    });
    const [valideChecker, setValidChecker] = useState({
        title: true,
        image: true,
        location: true,
        description: true,
        price: true,
        occupation: true,
    });

    const handleChange = (e) => {
        if (
            e.target.name === "small" ||
            e.target.name === "medium" ||
            e.target.name === "large" ||
            e.target.name === "xl"
        ) {
            setFormData({
                ...formData,
                price: {
                    ...formData.price,
                    [e.target.name]: e.target.value,
                },
            });
            return;
        }
        if (e.target.name === "location") {
            setFormData({
                ...formData,
                location: e.target.value,
                locationType: "Default",
            });
            return;
        }
        if (e.target.name === "otherInput") {
            setFormData({
                ...formData,
                location: e.target.value,
                locationType: "Other",
            });
            return;
        }
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // if it is file, store it image file
    // else, store it as image link
    const handleImageChange = (e) => {
        if (e.target.files) {
            setFormData({ ...formData, image: e.target.files[0] });
        } else {
            setFormData({ ...formData, image: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newChecker = { ...valideChecker };
            for (const key in formData) {
                if (key === "locationType") continue;
                if (key === "price") {
                    let isAllNone = true;
                    for (const priceKey in formData.price) {
                        if (formData.price[priceKey] === "") {
                            isAllNone = isAllNone && true;
                        } else {
                            isAllNone = isAllNone && false;
                        }
                    }
                    newChecker[key] = !isAllNone;
                    continue;
                }
                if (key === "location") {
                    if (formData.locationType === "Other") {
                        newChecker[key] = formData.location !== "";
                    } else {
                        newChecker[key] = !buildingOptions.includes(
                            formData.location
                        );
                    }
                }
                if (formData[key] === "") {
                    newChecker[key] = false;
                }
            }

            const formdata = new FormData();
            formdata.append("title", formData.title);
            formdata.append("image", formData.image);
            formdata.append("location", formData.location);
            formdata.append("description", formData.description);
            formdata.append("price", JSON.stringify(formData.price));
            formdata.append("occupation", formData.occupation);

            const token = localStorage.getItem("accessToken");

            if (!token) {
                console.error("No token found in cookies");
                return;
            }

            const response = await fetch("/api/shares", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`, // 요청 헤더에 토큰 추가
                },
                body: formdata,
            });
            const data = await response.json();
            if (response.ok) {
                // 게시글 작성 후 처리 로직
                router.push(`/list/${data.id}`);
            } else {
                if (
                    data.error &&
                    data.error.includes("Missing required fields")
                ) {
                    const missingFields = data.error.split(": ")[1].split(", ");
                    const newChecker = { ...valideChecker };
                    missingFields.forEach((field) => {
                        newChecker[field] = false;
                    });
                    setValidChecker(newChecker);
                    return;
                } else {
                    alert(data.error);
                    return;
                }
            }
        } catch (error) {
            alert("An error occurred. Please try again later. " + error);
        }
    };

    function buttonToggleHandler(buttonName) {
        setFormData({ ...formData, occupation: buttonName });
    }

    return (
        <>
            <h1 className="text-4xl font-bold mb-4">I am...</h1>
            <div className="mb-4">
                <ToggleButton
                    buttonNames={["Buyer", "Seller"]}
                    stateFunction={buttonToggleHandler}
                    state={formData.occupation}
                    highlightColor="bg-blue-600"
                />
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <ConditionalLabelInput
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    showUpper={true}
                    error={!valideChecker.title}
                    errorMessage="Please enter a title."
                />
                <DMWithOptionInput
                    options={buildingOptions}
                    onChange={handleChange}
                    name="location"
                    className={`border p-2 w-full rounded ${
                        valideChecker.location
                            ? undefined
                            : "border-red-500 border-2"
                    }`}
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    className="border p-2 w-full rounded h-32"
                    value={formData.description}
                    onChange={handleChange}
                ></textarea>
                <div className="max-[639px]:flex-col sm:flex sm:space-x-4">
                    <ImageSelectOrLink
                        onChange={handleImageChange}
                        value={formData.image}
                        placeholderImage="https://placehold.co/192x192?text=No+Image"
                    />
                    <div className="flex-col w-full space-y-4">
                        <LabelInput
                            type="text"
                            name="small"
                            placeholder="Small Box Price"
                            value={formData.price[0]}
                            onChange={handleChange}
                            className="border p-2 w-full rounded"
                        />
                        <LabelInput
                            type="text"
                            name="medium"
                            placeholder="Medium Box Price"
                            value={formData.price[1]}
                            onChange={handleChange}
                            className="border p-2 w-full rounded"
                        />
                        <LabelInput
                            type="text"
                            name="large"
                            placeholder="Large Box Price"
                            value={formData.price[2]}
                            onChange={handleChange}
                            className="border p-2 w-full rounded"
                        />
                        <LabelInput
                            type="text"
                            name="xl"
                            placeholder="XL Box Price"
                            value={formData.price[3]}
                            onChange={handleChange}
                            className="border p-2 w-full rounded"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded w-full"
                >
                    Post it!
                </button>
            </form>
        </>
    );
}
