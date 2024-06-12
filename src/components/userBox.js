"use client"

import UserContext from "@/context/UserContext";
import { useContext, useEffect, useState } from "react";
import ImageSelection from "./inputs/ProfileImageSelection";
import ConditionalLabelInput from "./inputs/ConditionalLabelInput";
import { useRouter } from "next/navigation";
import emailValidate from "@/utils/emailValidation";

export default function UserBox() {
    const router = useRouter();
    const { user, isLoading } = useContext(UserContext);
    const [userFormData, setUserFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        contactLink: "",
        profilePicture: "",
    });

    useEffect(() => {
        if (user) {
            setUserFormData({
                username: user.username,
                email: user.email,
                contactLink: user.contactLink,
                profilePicture: user.profilePicture,
                password: "",
                confirmPassword: "",
            });
        }
    }, [user]);

    const [userFormDataValidity, setUserFormDataValidity] = useState({
        username: true,
        contactLink: true,
        email: true,
        password: true,
        confirmPassword: true,
        isPass: true,
    });

    
    const handleFormData = (key, value) => {
        setUserFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleValidity = (key, value) => {
        setUserFormDataValidity((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const checkValidity = () => {
        handleValidity("email", emailValidate(userFormData.email));
        handleValidity(
            "username",
            userFormData.username.length >= 5 &&
                userFormData.username.length <= 30
        );
        handleValidity("contactLink", userFormData.contactLink?.length > 0);
        handleValidity(
            "password",
            userFormData.password.length >= 8 &&
                userFormData.password.length <= 20
        );
        handleValidity(
            "confirmPassword",
            userFormData.password === userFormData.confirmPassword
        );

        handleValidity(
            "isPass",
            userFormDataValidity.email &&
                userFormDataValidity.username &&
                userFormDataValidity.password &&
                userFormDataValidity.confirmPassword
        );
    };

    const onChangeFormData = (e) => {
        const { name, value } = e.target;
        handleFormData(name, value);
    };

    const onChangeProfilePicture = (e) => {
        handleFormData("profilePicture", e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        checkValidity();

        if (!userFormDataValidity.isPass) {
            return;
        }

        const formdata = new FormData();
        formdata.append("email", userFormData.email);
        formdata.append("username", userFormData.username);
        formdata.append("password", userFormData.password);
        formdata.append("confirmPassword", userFormData.confirmPassword);
        formdata.append("contactLink", userFormData.contactLink);

        if (userFormData.profilePicture)
            formdata.append("profilePicture", userFormData.profilePicture);

        const res = await fetch("/api/user", {
            method: "PUT",
            headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
            body: formdata,
        });

        const data = await res.json();

        if (data.success) {
            alert("Edit successful");
            router.push(`/${user.username}`);
        } else {
            alert(data.error);
        }
    };
    
    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 flex flex-wrap w-full"
        >
            <div className="flex flex-col justify-center w-full mb-4">
                <div className="ml-10 mr-10">
                    <ImageSelection
                        onChange={onChangeProfilePicture}
                        value={null}
                        placeholderImage={userFormData.profilePicture}
                    />
                </div>
                <ConditionalLabelInput
                    label="Email"
                    name="email"
                    type="email"
                    value={userFormData.email}
                    onChange={onChangeFormData}
                    error={!userFormDataValidity.email}
                    errorMessage="Invalid email address."
                    showUpper
                />
                <ConditionalLabelInput
                    label="Username"
                    name="username"
                    type="text"
                    value={userFormData.username}
                    onChange={onChangeFormData}
                    error={!userFormDataValidity.username}
                    errorMessage="Username should be between 5 and 30 characters."
                    showUpper
                />
                <ConditionalLabelInput
                    label="Contact Link"
                    name="contactLink"
                    type="text"
                    value={userFormData.contactLink}
                    onChange={onChangeFormData}
                    error={!userFormDataValidity.contactLink}
                    errorMessage="Link should be valid."
                    showUpper
                />
                <ConditionalLabelInput
                    label="Password"
                    name="password"
                    type="password"
                    value={userFormData.password}
                    onChange={onChangeFormData}
                    error={!userFormDataValidity.password}
                    errorMessage="Password should be between 8 and 20 characters."
                    showUpper
                />
                <ConditionalLabelInput
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    value={userFormData.confirmPassword}
                    onChange={onChangeFormData}
                    error={!userFormDataValidity.confirmPassword}
                    errorMessage="Password does not match."
                    showUpper
                />
            </div>
            <div className="w-full">
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-500 hover:shadow-lg w-40 transition-all text-white px-4 py-2 rounded"
                >
                    Edit
                </button>
            </div>
        </form>
    );
}