import type { CollectionConfig, CollectionSlug } from "payload";
import { isAdmin } from "../access/isAdmin";
import { isAdminOrPublished } from "../access/isAdminOrPublished";

const Categories: CollectionConfig = {
    slug: "categories",
    admin: {
        useAsTitle: "title",
        defaultColumns: ["title", "parent", "featured", "updatedAt"],
        group: "محتوا",
    },
    access: {
        read: isAdminOrPublished,
        create: isAdmin,
        update: isAdmin,
        delete: isAdmin,
    },
    hooks: {
        beforeValidate: [
            ({ data }) => {
                if (data?.title && !data?.slug) {
                    data.slug = data.title
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/(^-|-$)/g, "");
                }
                return data;
            },
        ],
    },
    fields: [
        {
            name: "title",
            type: "text",
            label: "عنوان",
            required: true,
        },
        {
            name: "slug",
            type: "text",
            label: "اسلاگ",
            admin: {
                position: "sidebar",
            },
            unique: true,
            index: true,
        },
        {
            name: "description",
            type: "textarea",
            label: "توضیحات",
        },
        {
            name: "image",
            type: "upload",
            label: "تصویر",
            relationTo: "media" as CollectionSlug,
            required: true,
        },
        {
            name: "featured",
            type: "checkbox",
            label: "دسته‌بندی ویژه",
            defaultValue: false,
        },
        {
            name: "parent",
            type: "relationship",
            label: "دسته‌بندی والد",
            relationTo: "categories" as CollectionSlug,
            hasMany: false,
            filterOptions: ({ id }) => {
                return {
                    id: {
                        not_equals: id,
                    },
                };
            },
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

export default Categories;
