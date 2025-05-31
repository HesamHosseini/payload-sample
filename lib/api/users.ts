import { User } from "@/payload-types";

const API_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || "http://localhost:3000";

export async function getUsers(
    token: string
): Promise<{
    docs: User[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
}> {
    console.log("getUsers", token);
    console.log(`${API_URL}/api/users`);
    const res = await fetch(`${API_URL}/api/users`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.json();
}

export async function getUser(id: string, token: string): Promise<User> {
    const res = await fetch(`${API_URL}/api/users/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.json();
}

export async function createUser(data: Partial<User>, token: string): Promise<User> {
    const res = await fetch(`${API_URL}/api/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
    return res.json();
}
