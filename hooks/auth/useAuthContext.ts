// hooks/useAuthContext.ts
import { AuthContext, AuthContextType } from "@/lib/providers/AuthContext";
import { useContext } from "react";

export const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
};
