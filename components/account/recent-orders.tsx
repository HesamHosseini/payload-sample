import Link from "next/link"
import { fetchUserOrders } from "@/lib/api"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

interface RecentOrdersProps {
  limit?: number
}

export default async function RecentOrders({ limit }: RecentOrdersProps) {
  const orders = await fetchUserOrders()
  const recentOrders = limit ? orders.slice(0, limit) : orders

  if (recentOrders.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">هنوز سفارشی ثبت نشده است.</p>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
      case "processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
      case "shipped":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "در انتظار تأیید"
      case "processing":
        return "در حال پردازش"
      case "shipped":
        return "ارسال شده"
      case "delivered":
        return "تحویل داده شده"
      case "cancelled":
        return "لغو شده"
      default:
        return status
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-right py-3 px-2">شماره سفارش</th>
            <th className="text-right py-3 px-2">تاریخ</th>
            <th className="text-right py-3 px-2">مبلغ</th>
            <th className="text-right py-3 px-2">وضعیت</th>
            <th className="text-right py-3 px-2"></th>
          </tr>
        </thead>
        <tbody>
          {recentOrders.map((order) => (
            <tr key={order.id} className="border-b">
              <td className="py-3 px-2 font-medium">{order.id}</td>
              <td className="py-3 px-2 text-muted-foreground">
                {new Date(order.createdAt).toLocaleDateString("fa-IR")}
              </td>
              <td className="py-3 px-2">{order.totalAmount.toLocaleString()} تومان</td>
              <td className="py-3 px-2">
                <Badge className={getStatusColor(order.status)} variant="outline">
                  {getStatusText(order.status)}
                </Badge>
              </td>
              <td className="py-3 px-2">
                <Button asChild variant="ghost" size="sm">
                  <Link href={`/account/orders/${order.id}`} className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    مشاهده
                  </Link>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
