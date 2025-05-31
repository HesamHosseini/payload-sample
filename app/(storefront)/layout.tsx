import { CartProvider } from "@/components/cart-provider";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
// import { UserProvider } from "@/lib/auth";
// import { getSession, getUser } from "@/lib/auth/session";
import { AuthProvider } from "@/lib/providers/AuthContext";
import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import type React from "react";
import "./globals.css";

const vazirmatn = Vazirmatn({
    subsets: ["arabic"],
    variable: "--font-vazirmatn",
});

export const metadata: Metadata = {
    title: "فروشگاه آنلاین مدرن",
    description: "فروشگاه آنلاین مدرن با طراحی زیبا و کاربری آسان",
    generator: "v0.dev",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fa" dir="rtl" suppressHydrationWarning>
            <body className={`${vazirmatn.variable} font-sans min-h-screen flex flex-col`}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <AuthProvider>
                        {/* <UserProvider userPromise={getUser()} sessionPromise={getSession()}> */}
                        <CartProvider>
                            <Navbar />
                            <main className="flex-grow">{children}</main>
                            <Footer />
                        </CartProvider>
                        {/* </UserProvider> */}
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
