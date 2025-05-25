// import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { slateEditor } from "@payloadcms/richtext-slate";
import path from "path";
// Collections
import Banners from "@/lib/payload/collections/Banners";
import Brands from "@/lib/payload/collections/Brands";
import Categories from "@/lib/payload/collections/Categories";
import Media from "@/lib/payload/collections/Media";
import Orders from "@/lib/payload/collections/Orders";
import Products from "@/lib/payload/collections/Products";
import Testimonials from "@/lib/payload/collections/Testimonials";
import Users from "@/lib/payload/collections/Users";
// Globals
import Settings from "@/lib/payload/globals/Settings";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
export default buildConfig({
    admin: {
        user: Users.slug,
    },
    editor: slateEditor({}),
    db: sqliteAdapter({
        client: {
            url: process.env.DATABASE_URI || "",
        },
        migrationDir: path.resolve(dirname, "lib/payload/migrations"),
        push: false,
    }),
    collections: [Users, Products, Categories, Brands, Orders, Banners, Testimonials, Media],
    globals: [Settings],
    typescript: {
        outputFile: path.resolve(dirname, "payload-types.ts"),
    },
    graphQL: {
        schemaOutputFile: path.resolve(dirname, "generated-schema.graphql"),
    },
    plugins: [
        // Add other plugins here if needed
    ],
    cors: [process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000"],
    csrf: [process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000"],
    upload: {
        limits: {
            fileSize: 5000000, // 5MB
        },
    },

    secret: "secret",
});
