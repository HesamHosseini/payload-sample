import { Suspense } from "react"
import Link from "next/link"
import { fetchUserProfile } from "@/lib/api"
import AccountNav from "@/components/account/account-nav"
import UserInfo from "@/components/account/user-info"
import RecentOrders from "@/components/account/recent-orders"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowRight } from "lucide-react"

export default async function AccountPage() {
  const user = await fetchUserProfile()

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">حساب کاربری</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <AccountNav />
        </div>

        <div className="lg:col-span-3 space-y-8">
          <Suspense fallback={<Skeleton className="h-32 w-full" />}>
            <UserInfo user={user} />
          </Suspense>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>سفارش‌های اخیر</CardTitle>
              <Button asChild variant="ghost" size="sm" className="gap-1">
                <Link href="/account/orders">
                  مشاهده همه
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<Skeleton className="h-64 w-full" />}>
                <RecentOrders limit={3} />
              </Suspense>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>آدرس‌های من</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {user.addresses.length > 0 ? (
                  user.addresses.map((address) => (
                    <div key={address.id} className="p-4 border rounded-lg">
                      <p className="font-medium">{address.fullName}</p>
                      <p className="text-sm text-muted-foreground">{address.addressLine1}</p>
                      {address.addressLine2 && <p className="text-sm text-muted-foreground">{address.addressLine2}</p>}
                      <p className="text-sm text-muted-foreground">
                        {address.city}، {address.state}، {address.postalCode}
                      </p>
                      <p className="text-sm text-muted-foreground">{address.phone}</p>
                      {address.isDefault && (
                        <span className="inline-block mt-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          آدرس پیش‌فرض
                        </span>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">هنوز آدرسی ثبت نشده است.</p>
                )}
                <Button variant="outline" className="w-full">
                  افزودن آدرس جدید
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>تنظیمات حساب کاربری</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full">
                  ویرایش اطلاعات شخصی
                </Button>
                <Button variant="outline" className="w-full">
                  تغییر رمز عبور
                </Button>
                <Button variant="outline" className="w-full">
                  تنظیمات اطلاع‌رسانی
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
