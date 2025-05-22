"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"

export default function CartPage() {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart, loading } = useCart()
  const { toast } = useToast()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return

    try {
      await updateQuantity(itemId, newQuantity)
    } catch (error) {
      toast({
        title: "خطا",
        description: "به‌روزرسانی سبد خرید با مشکل مواجه شد. لطفاً دوباره تلاش کنید.",
        variant: "destructive",
      })
    }
  }

  const handleRemoveItem = async (itemId: string) => {
    try {
      await removeFromCart(itemId)
      toast({
        title: "محصول حذف شد",
        description: "محصول با موفقیت از سبد خرید حذف شد.",
      })
    } catch (error) {
      toast({
        title: "خطا",
        description: "حذف محصول از سبد خرید با مشکل مواجه شد. لطفاً دوباره تلاش کنید.",
        variant: "destructive",
      })
    }
  }

  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="h-[400px] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (totalItems === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">سبد خرید</h1>
        <div className="bg-card rounded-lg border p-8 text-center">
          <div className="flex justify-center mb-4">
            <ShoppingBag className="h-16 w-16 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">سبد خرید شما خالی است</h2>
          <p className="text-muted-foreground mb-6">
            محصولات مورد نظر خود را به سبد خرید اضافه کنید تا در اینجا نمایش داده شوند.
          </p>
          <Button asChild>
            <Link href="/shop">مشاهده محصولات</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">سبد خرید</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row gap-4 pb-6 border-b last:border-b-0 last:pb-0"
                  >
                    <div className="relative h-24 w-24 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                      <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="font-bold">{(item.price * item.quantity).toLocaleString()} تومان</p>
                      </div>

                      <p className="text-muted-foreground text-sm mb-4">{item.price.toLocaleString()} تومان / هر عدد</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            disabled={loading || item.quantity <= 1}
                            className="h-8 w-8 rounded-r-none"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <div className="h-8 w-10 flex items-center justify-center border-y">{item.quantity}</div>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            disabled={loading}
                            className="h-8 w-8 rounded-l-none"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.id)}
                          disabled={loading}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">خلاصه سفارش</h2>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">تعداد محصولات:</span>
                  <span>{totalItems} عدد</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">مجموع قیمت:</span>
                  <span>{totalPrice.toLocaleString()} تومان</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">هزینه ارسال:</span>
                  <span>رایگان</span>
                </div>

                <Separator />

                <div className="flex justify-between font-bold">
                  <span>مبلغ قابل پرداخت:</span>
                  <span>{totalPrice.toLocaleString()} تومان</span>
                </div>
              </div>
            </CardContent>

            <CardFooter className="p-6 pt-0">
              <div className="w-full space-y-3">
                <Button asChild className="w-full">
                  <Link href="/checkout">ادامه فرآیند خرید</Link>
                </Button>

                <Button asChild variant="outline" className="w-full">
                  <Link href="/shop" className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    ادامه خرید
                  </Link>
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
