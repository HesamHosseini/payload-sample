"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Check, MapPin, CreditCard } from "lucide-react"
import type { CartItem } from "@/components/cart-provider"
import type { Address } from "@/lib/api"

interface OrderSummaryProps {
  items: CartItem[]
  totalPrice: number
  shippingAddress: Address | null
  paymentMethod: string
  onPlaceOrder: () => void
  isSubmitting: boolean
}

export default function OrderSummary({
  items,
  totalPrice,
  shippingAddress,
  paymentMethod,
  onPlaceOrder,
  isSubmitting,
}: OrderSummaryProps) {
  const getPaymentMethodName = (method: string) => {
    switch (method) {
      case "credit_card":
        return "پرداخت آنلاین با کارت بانکی"
      case "bank_transfer":
        return "انتقال بانکی"
      case "cash_on_delivery":
        return "پرداخت در محل"
      default:
        return method
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">بررسی و تأیید سفارش</h2>

      <div className="space-y-4">
        <div className="bg-muted p-4 rounded-lg flex items-start gap-3">
          <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium">آدرس ارسال</h3>
            {shippingAddress && (
              <div className="text-sm text-muted-foreground mt-1">
                <p>{shippingAddress.fullName}</p>
                <p>{shippingAddress.addressLine1}</p>
                {shippingAddress.addressLine2 && <p>{shippingAddress.addressLine2}</p>}
                <p>
                  {shippingAddress.city}، {shippingAddress.state}، {shippingAddress.postalCode}
                </p>
                <p>{shippingAddress.phone}</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-muted p-4 rounded-lg flex items-start gap-3">
          <CreditCard className="h-5 w-5 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium">روش پرداخت</h3>
            <p className="text-sm text-muted-foreground mt-1">{getPaymentMethodName(paymentMethod)}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">محصولات سفارش</h3>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3">
              <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-sm">{item.title}</h4>
                <div className="flex justify-between mt-1">
                  <p className="text-sm text-muted-foreground">تعداد: {item.quantity}</p>
                  <p className="text-sm font-medium">{(item.price * item.quantity).toLocaleString()} تومان</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-muted-foreground">مجموع:</span>
          <span>{totalPrice.toLocaleString()} تومان</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">هزینه ارسال:</span>
          <span>رایگان</span>
        </div>

        <div className="flex justify-between font-bold pt-2 border-t">
          <span>مبلغ قابل پرداخت:</span>
          <span>{totalPrice.toLocaleString()} تومان</span>
        </div>
      </div>

      <Button onClick={onPlaceOrder} disabled={isSubmitting} className="w-full">
        {isSubmitting ? (
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent"></div>
            در حال پردازش...
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Check className="h-5 w-5" />
            ثبت نهایی سفارش
          </div>
        )}
      </Button>
    </div>
  )
}
