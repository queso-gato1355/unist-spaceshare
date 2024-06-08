// src/app/context/UserContext.js
"use client";

import { createContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    async function fetchUser() {
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
    }

    useEffect(() => {
        const storedToken = localStorage.getItem("accessToken");
        if (storedToken) {
            setAccessToken(storedToken);
        } else {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
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

    const login = (token) => {
        setAccessToken(token);
        localStorage.setItem('accessToken', token);
        fetchUser();
    };

    const logout = () => {
        setUser(null);
        setAccessToken(null);
        localStorage.removeItem('accessToken');
    };

    const deleteUser = async () => {
        if (!accessToken) return;

        try {
            const res = await fetch('/api/delete-user', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            const data = await res.json();
            if (data.success) {
                logout();
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };

    return (
        <UserContext.Provider value={{ user, isLoading, setUser, accessToken, setAccessToken, refreshAccessToken, login, logout, deleteUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
