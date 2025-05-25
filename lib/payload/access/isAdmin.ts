import type { Access } from "payload";

interface CustomUser {
    id: string;
    role: "admin" | "user";
}

export const isAdmin: Access = ({ req: { user } }) => {
    if (!user) return false;
    const customUser = user as unknown as CustomUser;
    return customUser.role === "admin";
};

export const isAdminOrSelf: Access = ({ req: { user }, id }) => {
    if (!user) return false;
    const customUser = user as unknown as CustomUser;
    if (customUser.role === "admin") return true;
    return customUser.id === id;
};
