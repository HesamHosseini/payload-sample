import type { CollectionConfig, CollectionSlug } from "payload";
import { isAdmin } from "../access/isAdmin";
import { isAdminOrPublished } from "../access/isAdminOrPublished";

const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "rating", "updatedAt"],
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
      name: "name",
      type: "text",
      label: "نام",
      required: true,
    },
    {
      name: "role",
      type: "text",
      label: "شغل",
      required: true,
    },
    {
      name: "comment",
      type: "textarea",
      label: "نظر",
      required: true,
    },
    {
      name: "avatar",
      type: "upload",
      label: "تصویر",
      relationTo: "media" as CollectionSlug,
      required: true,
    },
    {
      name: "rating",
      type: "select",
      label: "امتیاز",
      options: [
        {
          label: "۱ ستاره",
          value: "1",
        },
        {
          label: "۲ ستاره",
          value: "2",
        },
        {
          label: "۳ ستاره",
          value: "3",
        },
        {
          label: "۴ ستاره",
          value: "4",
        },
        {
          label: "۵ ستاره",
          value: "5",
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
}

export default Testimonials
