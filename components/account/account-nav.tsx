"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { User, Package, Heart, CreditCard, Bell, Settings, LogOut } from "lucide-react"

const navItems = [
  {
    name: "پروفایل",
    href: "/account",
    icon: User,
  },
  {
    name: "سفارش‌ها",
    href: "/account/orders",
    icon: Package,
  },
  {
    name: "علاقه‌مندی‌ها",
    href: "/account/wishlist",
    icon: Heart,
  },
  {
    name: "روش‌های پرداخت",
    href: "/account/payment-methods",
    icon: CreditCard,
  },
  {
    name: "اطلاع‌رسانی‌ها",
    href: "/account/notifications",
    icon: Bell,
  },
  {
    name: "تنظیمات",
    href: "/account/settings",
    icon: Settings,
  },
]

export default function AccountNav() {
  const pathname = usePathname()

  return (
    <div className="space-y-1">
      {navItems.map((item) => (
        <Button
          key={item.href}
          variant="ghost"
          className={cn("w-full justify-start", pathname === item.href && "bg-muted font-medium")}
          asChild
        >
          <Link href={item.href} className="flex items-center gap-2">
            <item.icon className="h-5 w-5" />
            {item.name}
          </Link>
        </Button>
      ))}

      <Button
        variant="ghost"
        className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
      >
        <LogOut className="h-5 w-5 ml-2" />
        خروج از حساب کاربری
      </Button>
    </div>
  )
}
