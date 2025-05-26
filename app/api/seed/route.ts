"use server";

import config from "@/payload.config";
import fs, { createWriteStream } from "fs";
import { NextResponse } from "next/server";
import fetch from "node-fetch";
import { join } from "path";
import { getPayload } from "payload";

export async function POST() {
    debugger;
    try {
        const payload = await getPayload({ config });

        // Download the image first
        const response = await fetch("https://picsum.photos/200/300");
        const buffer = await response.buffer();

        // Create a temporary file
        const tempPath = join(process.cwd(), "public", "temp-image.jpg");
        const writeStream = createWriteStream(tempPath);
        writeStream.write(buffer);
        writeStream.end();

        // Create media entry with the file
        const media = await payload.create({
            
            collection: "media",
            data: {
                alt: "Sample Image",
            },
            filePath: tempPath,
        });

        // Clean up temp file
        await fs.promises.unlink(tempPath);

        const brand = await payload.create({
            collection: "brands",
            data: {
                title: "برند نمونه",
                slug: "brand-sample",
                description: "برند معتبر ایرانی",
                logo: media.id,
                status: "published",
            },
        });

        const category = await payload.create({
            collection: "categories",
            data: {
                title: "لوازم دیجیتال",
                slug: "digital-goods",
                description: "محصولات دیجیتالی",
                image: media.id,
                status: "published",
            },
        });

        const product = await payload.create({
            collection: "products",
            data: {
                title: "گوشی هوشمند X",
                slug: "smartphone-x",
                price: 25000000,
                salePrice: 22000000,
                shortDescription: "گوشی پیشرفته با کیفیت بالا",
                description: [],
                category: category.id,
                brand: brand.id,
                inStock: true,
                featured: true,
                new: true,
                status: "published",
                images: [{ image: media.id, alt: "Sample Image" }],
            },
        });

        return NextResponse.json({ success: true, product });
    } catch (err: any) {
        console.error("Seed Error:", err);
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}
