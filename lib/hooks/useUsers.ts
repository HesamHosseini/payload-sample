import { getUsers } from "@/lib/api/users";
import { User } from "@/payload-types";
import useSWR from "swr";

export function useUsers(token: string) {
    const shouldFetch = !!token;

    const { data, error, isLoading } = useSWR(shouldFetch ? ["users", token] : null, () => getUsers(token));

    return {
        users: data as User[] | undefined,
        isLoading,
        error,
    };
}
