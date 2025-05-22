"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/components/cart-provider"
import ShippingForm from "@/components/checkout/shipping-form"
import PaymentForm from "@/components/checkout/payment-form"
import OrderSummary from "@/components/checkout/order-summary"
import { createOrder } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import type { Address } from "@/lib/api"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalItems, totalPrice, clearCart } = useCart()
  const { toast } = useToast()
  const [activeStep, setActiveStep] = useState("shipping")
  const [shippingAddress, setShippingAddress] = useState<Address | null>(null)
  const [paymentMethod, setPaymentMethod] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Redirect to cart if cart is empty
    if (mounted && totalItems === 0) {
      router.push("/cart")
    }
  }, [mounted, totalItems, router])

  const handleShippingSubmit = (address: Address) => {
    setShippingAddress(address)
    setActiveStep("payment")
  }

  const handlePaymentSubmit = (method: string) => {
    setPaymentMethod(method)
    setActiveStep("review")
  }

  const handlePlaceOrder = async () => {
    if (!shippingAddress || !paymentMethod) {
      toast({
        title: "خطا",
        description: "لطفاً تمام اطلاعات مورد نیاز را وارد کنید.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const order = await createOrder({
        items,
        shippingAddress,
        paymentMethod,
      })

      await clearCart()

      toast({
        title: "سفارش ثبت شد",
        description: "سفارش شما با موفقیت ثبت شد.",
      })

      router.push(`/checkout/success?orderId=${order.id}`)
    } catch (error) {
      toast({
        title: "خطا",
        description: "ثبت سفارش با مشکل مواجه شد. لطفاً دوباره تلاش کنید.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!mounted || totalItems === 0) {
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
      <h1 className="text-3xl font-bold mb-8">تکمیل خرید</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <Tabs value={activeStep} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="shipping" onClick={() => setActiveStep("shipping")} disabled={isSubmitting}>
                  ۱. آدرس ارسال
                </TabsTrigger>
                <TabsTrigger
                  value="payment"
                  onClick={() => shippingAddress && setActiveStep("payment")}
                  disabled={!shippingAddress || isSubmitting}
                >
                  ۲. روش پرداخت
                </TabsTrigger>
                <TabsTrigger
                  value="review"
                  onClick={() => shippingAddress && paymentMethod && setActiveStep("review")}
                  disabled={!shippingAddress || !paymentMethod || isSubmitting}
                >
                  ۳. بررسی و تأیید
                </TabsTrigger>
              </TabsList>

              <TabsContent value="shipping" className="p-6">
                <ShippingForm onSubmit={handleShippingSubmit} initialData={shippingAddress} />
              </TabsContent>

              <TabsContent value="payment" className="p-6">
                <PaymentForm onSubmit={handlePaymentSubmit} initialMethod={paymentMethod} />
              </TabsContent>

              <TabsContent value="review" className="p-6">
                <OrderSummary
                  items={items}
                  totalPrice={totalPrice}
                  shippingAddress={shippingAddress}
                  paymentMethod={paymentMethod}
                  onPlaceOrder={handlePlaceOrder}
                  isSubmitting={isSubmitting}
                />
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        <div>
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">خلاصه سفارش</h2>

            <div className="space-y-4">
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.title} × {item.quantity}
                    </span>
                    <span>{(item.price * item.quantity).toLocaleString()} تومان</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
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
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
