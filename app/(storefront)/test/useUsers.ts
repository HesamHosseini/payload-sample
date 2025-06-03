import { useAuthContext } from "@/hooks/auth/useAuthContext";
import { getUsers } from "@/lib/api/users";
import { User } from "@/payload-types";
import { useEffect, useState } from "react";

export const UseUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { user, token } = useAuthContext();

    useEffect(() => {
        if (!user || !token) {
            return;
        }
        const fetchUsers = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await getUsers(token);
                if (!response || !response.docs || response.docs.length === 0) {
                    throw new Error("No users found");
                }
                setUsers(response.docs);
            } catch (err) {
                console.error("Error fetching users:", err);
                setError(err instanceof Error ? err.message : "An unexpected error occurred");
            } finally {
                setIsLoading(false);
            }
        };
        fetchUsers();
    }, [token]);

    return { users, isLoading, error };
};
