import config from "@/payload.config";
import { cookies, headers } from "next/headers";
import type { User } from "payload";
import { getPayload } from "payload";

export async function getLoggedInUser(): Promise<{ user: User; token: string } | null> {
    const headersList = await headers();
    const cookieStore = await cookies();

    const token = cookieStore.get("payload-token")?.value;

    if (!token) return null;

    const payload = await getPayload({ config });

    try {
        const result = await payload.auth({ headers: headersList });

        if (!result.user) return null;

        const user = result.user;
        return { user, token };
    } catch {
        return null;
    }
}
