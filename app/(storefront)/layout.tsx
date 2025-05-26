import { CartProvider } from "@/components/cart-provider";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import type React from "react";
import "./globals.css";
import Navbar from "@/components/navbar";

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
                    <CartProvider>
                        <Navbar />
                        <main className="flex-grow">{children}</main>
                        <Footer />
                    </CartProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
