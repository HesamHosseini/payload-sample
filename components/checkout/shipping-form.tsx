"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import type { Address } from "@/lib/api"

const formSchema = z.object({
  fullName: z.string().min(3, { message: "نام و نام خانوادگی باید حداقل ۳ کاراکتر باشد" }),
  addressLine1: z.string().min(5, { message: "آدرس باید حداقل ۵ کاراکتر باشد" }),
  addressLine2: z.string().optional(),
  city: z.string().min(2, { message: "نام شهر باید حداقل ۲ کاراکتر باشد" }),
  state: z.string().min(2, { message: "نام استان باید حداقل ۲ کاراکتر باشد" }),
  postalCode: z.string().min(10, { message: "کد پستی باید ۱۰ رقم باشد" }).max(10),
  phone: z.string().min(11, { message: "شماره تلفن باید ۱۱ رقم باشد" }).max(11),
  isDefault: z.boolean().default(false),
})

interface ShippingFormProps {
  onSubmit: (address: Address) => void
  initialData: Address | null
}

export default function ShippingForm({ onSubmit, initialData }: ShippingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      fullName: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
      phone: "",
      isDefault: false,
    },
  })

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)

    try {
      // In a real app, you might save this address to the user's profile
      const address: Address = {
        id: initialData?.id || `addr_${Date.now()}`,
        ...values,
        country: "ایران", // Default for this example
      }

      onSubmit(address)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>نام و نام خانوادگی</FormLabel>
                <FormControl>
                  <Input placeholder="علی محمدی" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>شماره تلفن همراه</FormLabel>
                <FormControl>
                  <Input placeholder="۰۹۱۲۳۴۵۶۷۸۹" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="addressLine1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>آدرس</FormLabel>
              <FormControl>
                <Input placeholder="خیابان، کوچه، پلاک" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="addressLine2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>آدرس (ادامه)</FormLabel>
              <FormControl>
                <Input placeholder="واحد، طبقه (اختیاری)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>شهر</FormLabel>
                <FormControl>
                  <Input placeholder="تهران" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>استان</FormLabel>
                <FormControl>
                  <Input placeholder="تهران" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="postalCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>کد پستی</FormLabel>
              <FormControl>
                <Input placeholder="۱۲۳۴۵۶۷۸۹۰" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isDefault"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rtl:space-x-reverse">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>ذخیره به عنوان آدرس پیش‌فرض</FormLabel>
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          ادامه به روش پرداخت
        </Button>
      </form>
    </Form>
  )
}
