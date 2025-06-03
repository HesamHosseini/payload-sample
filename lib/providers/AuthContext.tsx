"use client";

import type { User } from "payload";
import { createContext, ReactNode, useEffect, useState } from "react";

export interface AuthContextType {
    user: User | null;
    token?: string | null;
    loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                debugger;
                const fetchedUser = await fetch("/api/auth/me");
                if (!fetchedUser.ok) {
                    throw new Error("Failed to fetch user");
                }
                const fetchedUserData = (await fetchedUser.json()) as { user: User | null; token: string | null };

                if (!fetchedUserData) {
                    throw new Error("User not found");
                }
                setUser(fetchedUserData.user);
                setToken(fetchedUserData.token);
            } catch (error) {
                console.error("Error fetching user:", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        if (!user) {
            fetchUser();
        }
    }, [user]);

    return <AuthContext.Provider value={{ user: user, loading, token }}>{children}</AuthContext.Provider>;
};
