"use server";

import config from "@/payload.config";
import { cookies } from "next/headers";
import { getPayload } from "payload";

export async function loginAction(formData: FormData) {
    const cookieStore = await cookies();
    const payload = await getPayload({ config });

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        return { error: "ایمیل و رمز عبور را وارد کنید" };
    }

    const result = await payload.login({
        collection: "users",
        data: { email, password },
    });

    console.log(result.token);

    // Set cookie with JWT
    const token = result.token; // Payload returns token

    token &&
        cookieStore.set("payload-token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 60 * 24, // 1 day
        });
    console.log(cookieStore.get("payload-token"));
    if (result.user) {
        return { success: true };
    } else {
        return { error: "ایمیل یا رمز عبور اشتباه است" };
    }
}
