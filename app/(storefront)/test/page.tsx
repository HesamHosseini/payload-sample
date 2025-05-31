// "use client";

import { getUsers } from "@/lib/api/users";
import { getLoggedInUser } from "@/lib/auth";

// import { useUsers } from "@/lib/hooks/useUsers";
// import { useAuth } from "@/lib/providers/AuthContext";

// export default function TestUsersPage() {
//     debugger;
//     const { token } = useAuth();

//     if (!token) {
//         return;
//     }

//     const { users, isLoading, error } = useUsers(token);

//     return (
//         <div className="max-w-xl mx-auto mt-10 space-y-6">
//             {isLoading && <p>Loading users...</p>}
//             {error && <p className="text-red-500">Failed to load users</p>}

//             {users && (
//                 <div>
//                     <h2 className="font-bold mb-2">Users:</h2>
//                     <ul className="list-disc pl-5">
//                         {users.map((user) => (
//                             <li key={user.id}>{user.email}</li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// }

// sever side version

export default async function TestPage() {
    const user = await getLoggedInUser();
    if (!user) {
        return <div>No user</div>;
    }
    const payloadResponse = await getUsers(user.token);
    const payloadUsers = payloadResponse.docs;

    return (
        <div>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                {payloadUsers.map((payloadUser) => (
                    <tr key={payloadUser.id}>
                        <td>{payloadUser.id}</td>
                        <td>
                            {payloadUser.firstName} {payloadUser.lastName}
                        </td>
                        <td>{payloadUser.email}</td>
                        <td>{payloadUser.role}</td>
                    </tr>
                ))}
            </table>
        </div>
    );
}
