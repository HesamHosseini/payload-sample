import { User } from "@/payload-types";


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

export async function getUsers(token: string): Promise<PaginatedResponse<User>> {
const res = await fetch(`${API_URL}/api/users`, {
  headers: {
    "Authorization": `Bearer ${token}`,
  },
});
if (!res.ok) throw new Error("Failed to fetch users");
return res.json();
}

export async function getUser(id: string, token: string): Promise<User> {
const res = await fetch(`${API_URL}/api/users/${id}`, {
  headers: {
    "Authorization": `Bearer ${token}`,
  },
});
if (!res.ok) throw new Error("Failed to fetch User with id " + id);
return res.json();
}

export async function createUser(data: Partial<User>, token: string): Promise<User> {
const res = await fetch(`${API_URL}/api/users`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  },
  body: JSON.stringify(data),
});
if (!res.ok) throw new Error("Failed to create User");
return res.json();
}
