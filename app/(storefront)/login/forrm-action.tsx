"use server";

import config from "@/payload.config";
import { cookies } from "next/headers";
import { getPayload } from "payload";
import { loginSchemaType } from "./schema";

export async function loginAction(data: loginSchemaType) {
    let cookieStore;
    let payload;
    try {
        cookieStore = await cookies();
    } catch (error) {
        console.error("Cookie store error:", error);
        return { error: "خطا در دسترسی به کوکی‌ها." };
    }

    try {
        payload = await getPayload({ config });
    } catch (error) {
        console.error("Payload init error:", error);
        return { error: "خطا در راه‌اندازی سیستم احراز هویت." };
    }

    try {
        const result = await payload.login({
            collection: "users",
            data: { email: data.email, password: data.password },
        });

        const token = result.token;

        if (token) {
            try {
                cookieStore.set("payload-token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    path: "/",
                    maxAge: 60 * 60 * 24, // 1 day
                });
            } catch (error) {
                console.error("Set cookie error:", error);
                return { success: false, error: "خطا در ذخیره توکن ورود." };
            }
        }

        if (result.user) {
            return { success: true };
        } else {
            return { success: false, error: "کاربر یافت نشد یا اطلاعات ورود اشتباه است." };
        }
    } catch (error: any) {
        // Handle payload.login specific error structure
        if (error && typeof error === "object" && "status" in error && error.status === 401) {
            return { success: false, error: "ایمیل یا رمز عبور اشتباه است." };
        }
        console.error("Login error:", error);
        return { success: false, error: "خطا در ورود به سیستم. لطفاً دوباره تلاش کنید." };
    }
}
