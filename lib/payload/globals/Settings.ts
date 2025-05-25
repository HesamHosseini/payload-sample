import type { GlobalConfig } from "payload/types"
import { isAdmin } from "../access/isAdmin"

const Settings: GlobalConfig = {
  slug: "settings",
  access: {
    read: () => true,
    update: isAdmin,
  },
  admin: {
    group: "تنظیمات",
  },
  fields: [
    {
      name: "siteTitle",
      type: "text",
      label: "عنوان سایت",
      required: true,
    },
    {
      name: "siteDescription",
      type: "textarea",
      label: "توضیحات سایت",
      required: true,
    },
    {
      name: "logo",
      type: "upload",
      label: "لوگو",
      relationTo: "media",
    },
    {
      name: "favicon",
      type: "upload",
      label: "فاویکون",
      relationTo: "media",
    },
    {
      name: "contactInfo",
      type: "group",
      label: "اطلاعات تماس",
      fields: [
        {
          name: "email",
          type: "text",
          label: "ایمیل",
        },
        {
          name: "phone",
          type: "text",
          label: "شماره تلفن",
        },
        {
          name: "address",
          type: "textarea",
          label: "آدرس",
        },
      ],
    },
    {
      name: "socialMedia",
      type: "array",
      label: "شبکه‌های اجتماعی",
      fields: [
        {
          name: "platform",
          type: "select",
          label: "پلتفرم",
          options: [
            {
              label: "اینستاگرام",
              value: "instagram",
            },
            {
              label: "توییتر",
              value: "twitter",
            },
            {
              label: "فیسبوک",
              value: "facebook",
            },
            {
              label: "لینکدین",
              value: "linkedin",
            },
            {
              label: "تلگرام",
              value: "telegram",
            },
          ],
          required: true,
        },
        {
          name: "url",
          type: "text",
          label: "آدرس",
          required: true,
        },
      ],
    },
    {
      name: "footerLinks",
      type: "array",
      label: "لینک‌های فوتر",
      fields: [
        {
          name: "title",
          type: "text",
          label: "عنوان",
          required: true,
        },
        {
          name: "url",
          type: "text",
          label: "آدرس",
          required: true,
        },
      ],
    },
  ],
}

export default Settings
