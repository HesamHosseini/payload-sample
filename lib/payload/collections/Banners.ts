import type { CollectionConfig, CollectionSlug } from "payload";
import { isAdmin } from "../access/isAdmin";
import { isAdminOrPublished } from "../access/isAdminOrPublished";

const Banners: CollectionConfig = {
    slug: "banners",
    admin: {
        useAsTitle: "title",
        defaultColumns: ["title", "position", "updatedAt"],
        group: "محتوا",
    },
    access: {
        read: isAdminOrPublished,
        create: isAdmin,
        update: isAdmin,
        delete: isAdmin,
    },
    fields: [
        {
            name: "title",
            type: "text",
            label: "عنوان",
            required: true,
        },
        {
            name: "subtitle",
            type: "text",
            label: "زیرعنوان",
        },
        {
            name: "image",
            type: "upload",
            label: "تصویر",
            relationTo: "media" as CollectionSlug,
            required: true,
        },
        {
            name: "buttonText",
            type: "text",
            label: "متن دکمه",
            required: true,
        },
        {
            name: "buttonLink",
            type: "text",
            label: "لینک دکمه",
            required: true,
        },
        {
            name: "position",
            type: "select",
            label: "موقعیت",
            options: [
                {
                    label: "هدر (اسلایدر اصلی)",
                    value: "hero",
                },
                {
                    label: "میانی",
                    value: "middle",
                },
                {
                    label: "پایین",
                    value: "bottom",
                },
            ],
            required: true,
        },
        {
            name: "status",
            type: "select",
            label: "وضعیت",
            options: [
                {
                    label: "پیش‌نویس",
                    value: "draft",
                },
                {
                    label: "منتشر شده",
                    value: "published",
                },
            ],
            defaultValue: "published",
            required: true,
            admin: {
                position: "sidebar",
            },
        },
    ],
};

export default Banners;
