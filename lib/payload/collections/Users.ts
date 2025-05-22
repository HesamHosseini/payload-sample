import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
    slug: "users",
    admin: {
        useAsTitle: "email",
    },
    auth: true,
    fields: [
        // Email added by default
        // Add more fields as needed
        {
            name: "firstName",
            type: "text",
        },
        {
            name: "lastName",
            type: "text",
        },
    ],
};
