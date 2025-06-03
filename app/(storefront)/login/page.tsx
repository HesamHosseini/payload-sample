"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { loginAction } from "./forrm-action";
import type { loginSchemaType } from "./schema";
import { loginSchema } from "./schema";

export default function LoginPage() {
    const form = useForm<loginSchemaType>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    });

    const onSubmit = async (data: loginSchemaType) => {
        const result = await loginAction(data);

        if (result?.success) {
            toast.success(
                <div className="font-sans ">
                    <p>ورود با موفقیت انجام شد!</p>
                    <p>
                        <span>به حساب کاربری خود خوش آمدید.</span>
                        <span>🎉</span>
                    </p>
                </div>
            );
            // Optionally redirect or reset form here
        } else if (result?.error) {
            toast.error(<div className="font-sans">{result.error}</div>);
        } else {
            toast.error(
                <div className="font-sans">
                    <p>خطا در ورود به سیستم.</p>
                    <p>لطفاً دوباره تلاش کنید یا با پشتیبانی تماس بگیرید.</p>
                </div>
            );
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md p-8 bg-white rounded shadow" dir="rtl">
                    <h1 className="text-2xl font-bold mb-6 text-center">ورود به حساب کاربری</h1>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="mb-4">
                                <FormLabel>ایمیل</FormLabel>
                                <FormControl>
                                    <Input {...field} id="email" type="email" placeholder="ایمیل خود را وارد کنید" autoFocus required />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="mb-4">
                                <FormLabel>رمز عبور</FormLabel>
                                <FormControl>
                                    <Input {...field} id="password" type="password" placeholder="رمز عبور خود را وارد کنید" required />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="rememberMe"
                        render={({ field }) => (
                            <FormItem className="mb-6 flex items-center">
                                <FormControl>
                                    <Checkbox id="rememberMe" checked={field.value} onCheckedChange={field.onChange} className="ml-2" />
                                </FormControl>
                                <FormLabel htmlFor="rememberMe" className="text-sm">
                                    مرا به خاطر بسپار
                                </FormLabel>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full">
                        ورود
                    </Button>
                </form>
            </Form>
        </div>
    );
}
