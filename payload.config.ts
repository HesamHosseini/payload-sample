// storage-adapter-import-placeholder
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import { Users } from "./lib/payload/collections/Users";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
    secret: process.env.PAYLOAD_SECRET || "",
    cors: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ""].filter(Boolean),
    csrf: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ""].filter(Boolean),
    db: sqliteAdapter({
        client: {
            url: process.env.DATABASE_URI || "",
        },
        migrationDir: path.resolve(dirname, "lib/payload/migrations"),
        push: false,
    }),
    collections: [Users],

    admin: {
        user: Users.slug,
        importMap: {
            baseDir: path.resolve(dirname),
        },
    },
    editor: lexicalEditor(),
    typescript: {
        outputFile: path.resolve(dirname, "payload-types.ts"),
    },
});
