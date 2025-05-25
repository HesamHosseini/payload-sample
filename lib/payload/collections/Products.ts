import type { CollectionConfig, CollectionSlug } from "payload";
import { isAdmin } from "../access/isAdmin";
import { isAdminOrPublished } from "../access/isAdminOrPublished";

const Products: CollectionConfig = {
    slug: "products",
    admin: {
        useAsTitle: "title",
        defaultColumns: ["title", "category", "price", "inStock", "updatedAt"],
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
            name: "price",
            type: "number",
            label: "قیمت",
            required: true,
            min: 0,
        },
        {
            name: "salePrice",
            type: "number",
            label: "قیمت فروش ویژه",
            min: 0,
        },
        {
            name: "description",
            type: "richText",
            label: "توضیحات",
            required: true,
        },
        {
            name: "shortDescription",
            type: "textarea",
            label: "توضیحات کوتاه",
            required: true,
            maxLength: 160,
        },
        {
            name: "images",
            type: "array",
            label: "تصاویر",
            minRows: 1,
            maxRows: 10,
            required: true,
            labels: {
                singular: "تصویر",
                plural: "تصاویر",
            },
            fields: [
                {
                    name: "image",
                    type: "upload",
                    relationTo: "media" as CollectionSlug,
                    required: true,
                },
                {
                    name: "alt",
                    type: "text",
                    label: "متن جایگزین",
                    required: true,
                },
            ],
        },
        {
            name: "category",
            type: "relationship",
            label: "دسته‌بندی",
            relationTo: "categories" as CollectionSlug,
            required: true,
            hasMany: false,
        },
        {
            name: "brand",
            type: "relationship",
            label: "برند",
            relationTo: "brands" as CollectionSlug,
            required: true,
            hasMany: false,
        },
        {
            name: "inStock",
            type: "checkbox",
            label: "موجود در انبار",
            defaultValue: true,
        },
        {
            name: "featured",
            type: "checkbox",
            label: "محصول ویژه",
            defaultValue: false,
        },
        {
            name: "new",
            type: "checkbox",
            label: "محصول جدید",
            defaultValue: false,
        },
        {
            name: "specifications",
            type: "array",
            label: "مشخصات فنی",
            labels: {
                singular: "مشخصه",
                plural: "مشخصات",
            },
            fields: [
                {
                    name: "key",
                    type: "text",
                    label: "عنوان",
                    required: true,
                },
                {
                    name: "value",
                    type: "text",
                    label: "مقدار",
                    required: true,
                },
            ],
        },
        {
            name: "relatedProducts",
            type: "relationship",
            label: "محصولات مرتبط",
            relationTo: "products" as CollectionSlug,
            hasMany: true,
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

export default Products;
