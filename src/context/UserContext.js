// src/app/context/UserContext.js
"use client";

import { createContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("/api/user", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                const data = await res.json();
                setUser(data.user);
            } catch (error) {
                console.error("Error fetching user:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (accessToken) {
            fetchUser();
        }
    }, [accessToken]);

    const refreshAccessToken = async () => {
        try {
            const res = await fetch("/api/revalidate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ refreshToken: user.refreshToken }),
            });
            const data = await res.json();
            if (data.success) {
                setAccessToken(data.accessToken);
            }
        } catch (error) {
            console.error("Error refreshing access token:", error);
        }
    };

    return (
        <UserContext.Provider value={{ user, isLoading, setUser, accessToken, setAccessToken, refreshAccessToken }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
