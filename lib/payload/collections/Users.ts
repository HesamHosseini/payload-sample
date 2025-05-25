import type { CollectionConfig } from "payload";
import { isAdmin, isAdminOrSelf } from "../access/isAdmin";

const Users: CollectionConfig = {
    slug: "users",
    auth: true,
    admin: {
        useAsTitle: "email",
        group: "مدیریت کاربران",
    },
    access: {
        read: isAdminOrSelf,
        create: isAdmin,
        update: isAdminOrSelf,
        delete: isAdmin,
    },
    fields: [
        {
            name: "firstName",
            type: "text",
            label: "نام",
            required: true,
        },
        {
            name: "lastName",
            type: "text",
            label: "نام خانوادگی",
            required: true,
        },
        {
            name: "phone",
            type: "text",
            label: "شماره تلفن",
        },
        {
            name: "role",
            type: "select",
            label: "نقش",
            options: [
                {
                    label: "مدیر",
                    value: "admin",
                },
                {
                    label: "کاربر",
                    value: "user",
                },
            ],
            defaultValue: "user",
            required: true,
            access: {
                update: isAdmin,
            },
        },
        {
            name: "addresses",
            type: "array",
            label: "آدرس‌ها",
            fields: [
                {
                    name: "fullName",
                    type: "text",
                    label: "نام و نام خانوادگی",
                    required: true,
                },
                {
                    name: "addressLine1",
                    type: "text",
                    label: "آدرس خط 1",
                    required: true,
                },
                {
                    name: "addressLine2",
                    type: "text",
                    label: "آدرس خط 2",
                },
                {
                    name: "city",
                    type: "text",
                    label: "شهر",
                    required: true,
                },
                {
                    name: "state",
                    type: "text",
                    label: "استان",
                    required: true,
                },
                {
                    name: "postalCode",
                    type: "text",
                    label: "کد پستی",
                    required: true,
                },
                {
                    name: "country",
                    type: "text",
                    label: "کشور",
                    defaultValue: "ایران",
                    required: true,
                },
                {
                    name: "phone",
                    type: "text",
                    label: "شماره تلفن",
                    required: true,
                },
                {
                    name: "isDefault",
                    type: "checkbox",
                    label: "آدرس پیش‌فرض",
                    defaultValue: false,
                },
            ],
        },
    ],
};

export default Users;
