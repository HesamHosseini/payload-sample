import type { CollectionConfig } from "payload";
import { isAdmin } from "../access/isAdmin";
import { isAdminOrSelf } from "../access/isAdmin";

const Orders: CollectionConfig = {
  slug: "orders",
  admin: {
    useAsTitle: "id",
    defaultColumns: ["id", "user", "status", "totalAmount", "createdAt"],
    group: "مدیریت سفارشات",
  },
  access: {
    read: isAdminOrSelf,
    create: () => true, // Anyone can create an order
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      label: "کاربر",
      relationTo: "users",
      required: true,
    },
    {
      name: "items",
      type: "array",
      label: "محصولات",
      required: true,
      minRows: 1,
      fields: [
        {
          name: "product",
          type: "relationship",
          label: "محصول",
          relationTo: "products",
          required: true,
        },
        {
          name: "quantity",
          type: "number",
          label: "تعداد",
          required: true,
          min: 1,
        },
        {
          name: "price",
          type: "number",
          label: "قیمت واحد",
          required: true,
          min: 0,
        },
      ],
    },
    {
      name: "status",
      type: "select",
      label: "وضعیت",
      options: [
        {
          label: "در انتظار تأیید",
          value: "pending",
        },
        {
          label: "در حال پردازش",
          value: "processing",
        },
        {
          label: "ارسال شده",
          value: "shipped",
        },
        {
          label: "تحویل داده شده",
          value: "delivered",
        },
        {
          label: "لغو شده",
          value: "cancelled",
        },
      ],
      defaultValue: "pending",
      required: true,
    },
    {
      name: "shippingAddress",
      type: "group",
      label: "آدرس ارسال",
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
      ],
    },
    {
      name: "paymentMethod",
      type: "select",
      label: "روش پرداخت",
      options: [
        {
          label: "پرداخت آنلاین با کارت بانکی",
          value: "credit_card",
        },
        {
          label: "انتقال بانکی",
          value: "bank_transfer",
        },
        {
          label: "پرداخت در محل",
          value: "cash_on_delivery",
        },
      ],
      required: true,
    },
    {
      name: "totalAmount",
      type: "number",
      label: "مبلغ کل",
      required: true,
      min: 0,
    },
    {
      name: "trackingNumber",
      type: "text",
      label: "کد رهگیری",
    },
    {
      name: "notes",
      type: "textarea",
      label: "یادداشت‌ها",
    },
  ],
  timestamps: true,
}

export default Orders
