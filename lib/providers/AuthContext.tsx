"use client";

import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
    token: string | null;
    setToken: (token: string | null) => void;
};

const AuthContext = createContext<AuthContextType>({
    token: null,
    setToken: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setTokenState] = useState<string | null>(null);

    useEffect(() => {
        if (!token) {
            fetch("/api/auth/token")
                .then((res) => res.json())
                .then((data) => {
                    debugger;
                    if (data.token) {
                        setTokenState(data.token);
                    }
                })
                .catch(() => {});
        }
    }, []);

    return <AuthContext.Provider value={{ token, setToken: setTokenState }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
