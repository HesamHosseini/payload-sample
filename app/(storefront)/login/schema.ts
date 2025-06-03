import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("ایمیل معتبر وارد کنید"),
    password: z.string().min(4, "رمز عبور باید حداقل 4 کاراکتر باشد"),
    rememberMe: z.boolean().optional(),
});

export type loginSchemaType = z.infer<typeof loginSchema>;
