import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import payloadConfig from "../payload.config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUT_DIR = path.join(__dirname, "..", "lib", "api");

const baseFetcher = (slug: string, requireAuth = true) => {
    const entityName = capitalize(slug.slice(0, -1)); // crude plural-to-singular

    const authHeaders = requireAuth
        ? `headers: {
    "Authorization": \`Bearer \${token}\`,
  },`
        : ``;

    return `import { ${entityName} } from "@/payload-types";


const API_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || "http://localhost:3000";

type PaginatedResponse<T> = {
  docs: T[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage: number | null;
  page: number;
  pagingCounter: number;
  prevPage: number | null;
  totalDocs: number;
  totalPages: number;
};

export async function get${capitalize(slug)}(token${requireAuth ? "" : "?"}: string): Promise<PaginatedResponse<${entityName}>> {
const res = await fetch(\`\${API_URL}/api/${slug}\`, {
  ${authHeaders}
});
if (!res.ok) throw new Error("Failed to fetch ${slug}");
return res.json();
}

export async function get${entityName}(id: string, token${requireAuth ? "" : "?"}: string): Promise<${entityName}> {
const res = await fetch(\`\${API_URL}/api/${slug}/\${id}\`, {
  ${authHeaders}
});
if (!res.ok) throw new Error("Failed to fetch ${entityName} with id " + id);
return res.json();
}

export async function create${entityName}(data: Partial<${entityName}>, token: string): Promise<${entityName}> {
const res = await fetch(\`\${API_URL}/api/${slug}\`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": \`Bearer \${token}\`,
  },
  body: JSON.stringify(data),
});
if (!res.ok) throw new Error("Failed to create ${entityName}");
return res.json();
}
`;
};

function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

async function main() {
    const config = await payloadConfig;

    if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

    const collections = config.collections || [];

    for (const col of collections) {
        if (col.slug.includes("payload-")) {
            console.log(`❌ Skipping internal collection: ${col.slug}`);
            continue;
        }

        const fileName = path.join(OUT_DIR, `${col.slug}.ts`);
        const content = baseFetcher(col.slug, !!col.auth); // pass auth flag
        fs.writeFileSync(fileName, content);
        console.log(`✅ Generated fetcher for: ${col.slug}`);
    }
}

main();
