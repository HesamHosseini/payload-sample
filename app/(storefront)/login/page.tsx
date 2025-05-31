import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { loginAction } from "./forrm-action";
const schema = z.object({
    email: z.string().email("ایمیل معتبر وارد کنید"),
    password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
    rememberMe: z.boolean().optional(),
});

type State = { error: string };

export default function LoginPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <form action={loginAction} className="w-full max-w-md p-8 bg-white rounded shadow" dir="rtl">
                <h1 className="text-2xl font-bold mb-6 text-center">ورود به حساب کاربری</h1>
                <div className="mb-4">
                    <Label htmlFor="email">ایمیل</Label>
                    <Input id="email" name="email" type="email" placeholder="ایمیل خود را وارد کنید" autoFocus required />
                </div>
                <div className="mb-4 relative">
                    <Label htmlFor="password">رمز عبور</Label>
                    <Input id="password" name="password" type="password" placeholder="رمز عبور خود را وارد کنید" required />
                </div>
                <div className="mb-6 flex items-center">
                    <Checkbox id="rememberMe" name="rememberMe" className="ml-2" />
                    <Label htmlFor="rememberMe" className="text-sm">
                        مرا به خاطر بسپار
                    </Label>
                </div>
                <Button type="submit">ورود</Button>
            </form>
        </div>
    );
}
