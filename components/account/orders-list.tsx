import { fetchUserOrders } from "@/lib/api"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Eye, Package, Truck } from "lucide-react"
import Image from "next/image"

export default async function OrdersList() {
  const orders = await fetchUserOrders()

  if (orders.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-4">
            <Package className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">هنوز سفارشی ثبت نشده است</h2>
          <p className="text-muted-foreground mb-6">سفارش‌های شما پس از خرید در این قسمت نمایش داده می‌شوند.</p>
          <Button asChild>
            <a href="/shop">مشاهده محصولات</a>
          </Button>
        </CardContent>
      </Card>
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
    <div className="space-y-6">
      {orders.map((order) => (
        <Card key={order.id}>
          <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="text-lg">سفارش #{order.id}</CardTitle>
                <CardDescription>تاریخ: {new Date(order.createdAt).toLocaleDateString("fa-IR")}</CardDescription>
              </div>
              <div className="flex items-center gap-3">
                <Badge className={getStatusColor(order.status)} variant="outline">
                  {getStatusText(order.status)}
                </Badge>
                {order.trackingNumber && (
                  <div className="flex items-center gap-1 text-sm">
                    <Truck className="h-4 w-4" />
                    <span>کد رهگیری: {order.trackingNumber}</span>
                  </div>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="items">
                <AccordionTrigger>
                  <span className="text-base">محصولات ({order.items.length})</span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 mt-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{item.title}</h4>
                          <div className="flex justify-between mt-1">
                            <p className="text-sm text-muted-foreground">تعداد: {item.quantity}</p>
                            <p className="text-sm font-medium">{(item.price * item.quantity).toLocaleString()} تومان</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="details">
                <AccordionTrigger>
                  <span className="text-base">جزئیات سفارش</span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 mt-2">
                    <div>
                      <h4 className="font-medium mb-2">آدرس ارسال</h4>
                      <div className="text-sm text-muted-foreground">
                        <p>{order.shippingAddress.fullName}</p>
                        <p>{order.shippingAddress.addressLine1}</p>
                        {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
                        <p>
                          {order.shippingAddress.city}، {order.shippingAddress.state}،{" "}
                          {order.shippingAddress.postalCode}
                        </p>
                        <p>{order.shippingAddress.phone}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">روش پرداخت</h4>
                      <p className="text-sm text-muted-foreground">{order.paymentMethod}</p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">مبلغ کل</h4>
                      <p className="font-bold">{order.totalAmount.toLocaleString()} تومان</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-4 flex justify-end">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                مشاهده جزئیات کامل
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
