"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { CheckCircle, Package, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="h-[400px] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-primary" />
          </div>

          <h1 className="text-2xl font-bold mb-2">سفارش شما با موفقیت ثبت شد</h1>

          <p className="text-muted-foreground mb-6">از خرید شما متشکریم. سفارش شما دریافت شد و در حال پردازش است.</p>

          <div className="bg-muted p-4 rounded-lg mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Package className="h-5 w-5" />
              <span className="font-medium">شماره سفارش:</span>
              <span>{orderId || "N/A"}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              یک ایمیل تأیید به همراه جزئیات سفارش و اطلاعات پیگیری برای شما ارسال شده است.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/account/orders">مشاهده سفارش‌ها</Link>
            </Button>

            <Button asChild variant="outline">
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                بازگشت به صفحه اصلی
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
