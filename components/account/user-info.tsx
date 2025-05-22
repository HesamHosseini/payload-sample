import { Card, CardContent } from "@/components/ui/card"
import { User } from "lucide-react"
import type { User as UserType } from "@/lib/api"

interface UserInfoProps {
  user: UserType
}

export default function UserInfo({ user }: UserInfoProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
            <User className="h-12 w-12 text-muted-foreground" />
          </div>

          <div className="text-center md:text-right">
            <h2 className="text-2xl font-bold">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-muted-foreground">{user.email}</p>
            {user.phone && <p className="text-muted-foreground">{user.phone}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
