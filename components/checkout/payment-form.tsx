"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreditCard, Landmark, Wallet } from "lucide-react"

const formSchema = z.object({
  paymentMethod: z.enum(["credit_card", "bank_transfer", "cash_on_delivery"], {
    required_error: "لطفاً یک روش پرداخت انتخاب کنید",
  }),
})

interface PaymentFormProps {
  onSubmit: (method: string) => void
  initialMethod: string
}

export default function PaymentForm({ onSubmit, initialMethod }: PaymentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      paymentMethod: initialMethod || "credit_card",
    },
  })

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)

    try {
      onSubmit(values.paymentMethod)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel>روش پرداخت</FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-4">
                  <FormItem className="flex items-center space-x-3 space-y-0 rtl:space-x-reverse">
                    <FormControl>
                      <RadioGroupItem value="credit_card" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      پرداخت آنلاین با کارت بانکی
                    </FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center space-x-3 space-y-0 rtl:space-x-reverse">
                    <FormControl>
                      <RadioGroupItem value="bank_transfer" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer flex items-center gap-2">
                      <Landmark className="h-5 w-5" />
                      انتقال بانکی
                    </FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center space-x-3 space-y-0 rtl:space-x-reverse">
                    <FormControl>
                      <RadioGroupItem value="cash_on_delivery" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer flex items-center gap-2">
                      <Wallet className="h-5 w-5" />
                      پرداخت در محل
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="bg-muted p-4 rounded-lg">
          <p className="text-sm text-muted-foreground">
            تمام تراکنش‌های پرداخت آنلاین از طریق درگاه‌های امن بانکی انجام می‌شود و اطلاعات کارت شما به صورت رمزنگاری شده
            منتقل می‌شود.
          </p>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          ادامه به بررسی سفارش
        </Button>
      </form>
    </Form>
  )
}
