import type { Access } from "payload/types";

export const isAdminOrPublished: Access = ({ req: { user } }) => {
    if (user?.role === "admin") return true;

    return {
        status: {
            equals: "published",
        },
    };
};
