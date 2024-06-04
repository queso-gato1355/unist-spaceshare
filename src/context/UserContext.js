// src/app/context/UserContext.js
"use client";

import { createContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("/api/user", {
                    credentials: "include",
                });
                const data = await res.json();
                setUser(data.user);
            } catch (error) {
                console.error("Error fetching user:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, isLoading, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
