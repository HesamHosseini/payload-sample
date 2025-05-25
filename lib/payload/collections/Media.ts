import type { CollectionConfig } from "payload";
import { isAdmin } from "../access/isAdmin";
import { isAdminOrPublished } from "../access/isAdminOrPublished";

const Media: CollectionConfig = {
    slug: "media",
    access: {
        read: isAdminOrPublished,
        create: isAdmin,
        update: isAdmin,
        delete: isAdmin,
    },
    upload: {
        staticDir: "../public/uploads",
        imageSizes: [
            {
                name: "thumbnail",
                width: 400,
                height: 300,
                position: "centre",
            },
            {
                name: "card",
                width: 768,
                height: 1024,
                position: "centre",
            },
            {
                name: "tablet",
                width: 1024,
                height: undefined,
                position: "centre",
            },
        ],
        adminThumbnail: "thumbnail",
        mimeTypes: ["image/png", "image/jpeg", "image/jpg", "image/gif", "image/svg+xml"],
    },
    admin: {
        useAsTitle: "filename",
        group: "مدیریت رسانه",
    },
    fields: [
        {
            name: "alt",
            type: "text",
            label: "متن جایگزین",
        },
    ],
};

export default Media;
