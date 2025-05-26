// import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { slateEditor } from "@payloadcms/richtext-slate";
import path from "path";
// Collections
import Users from "@/lib/payload/collections/Users";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
export default buildConfig({
    admin: {
        user: Users.slug,
        meta: {
            titleSuffix: "- Admin",
        },
        dateFormat: "yyyy-MM-dd",
        // css: path.resolve(dirname, "styles/admin.css"), // Removed invalid 'css' property
    },
    editor: slateEditor({}),
    db: sqliteAdapter({
        client: {
            url: process.env.DATABASE_URI || "",
        },
        migrationDir: path.resolve(dirname, "lib/payload/migrations"),
        push: true,
    }),
    collections: [Users],
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
