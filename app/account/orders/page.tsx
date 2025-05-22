import { Suspense } from "react"
import AccountNav from "@/components/account/account-nav"
import OrdersList from "@/components/account/orders-list"
import { Skeleton } from "@/components/ui/skeleton"

export default function OrdersPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">سفارش‌های من</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <AccountNav />
        </div>

        <div className="lg:col-span-3">
          <Suspense fallback={<Skeleton className="h-96 w-full" />}>
            <OrdersList />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
