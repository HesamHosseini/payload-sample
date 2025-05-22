"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, ShoppingCart, User, Search, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useTheme } from "next-themes"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/cart-provider"
import { fetchCategories } from "@/lib/api"
import type { Category } from "@/lib/api"

export default function Navbar() {
  const pathname = usePathname()
  const { setTheme, theme } = useTheme()
  const { totalItems } = useCart()
  const [isScrolled, setIsScrolled] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories()
        setCategories(data)
      } catch (error) {
        console.error("Failed to load categories:", error)
      }
    }

    loadCategories()
  }, [])

  const navItems = [
    { name: "خانه", href: "/" },
    { name: "فروشگاه", href: "/shop" },
    { name: "دسته‌بندی‌ها", href: "#", dropdown: true },
    { name: "برندها", href: "/brands" },
    { name: "تماس با ما", href: "/contact" },
  ]

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-background"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">منو</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`text-lg px-2 py-1 rounded-md transition-colors ${
                        pathname === item.href
                          ? "font-bold text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="mt-4 border-t pt-4">
                    <Link
                      href="/account"
                      className="flex items-center gap-2 text-lg px-2 py-1 rounded-md transition-colors text-muted-foreground hover:text-foreground"
                    >
                      <User className="h-5 w-5" />
                      حساب کاربری
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>

            <Link href="/" className="mr-4 flex items-center space-x-2 rtl:space-x-reverse">
              <span className="text-xl font-bold">فروشگاه مدرن</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
            {navItems.map((item) =>
              item.dropdown ? (
                <div key={item.name} className="relative group">
                  <button
                    className={`flex items-center px-2 py-1 rounded-md transition-colors ${
                      pathname === item.href ? "font-bold text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.name}
                  </button>
                  <div className="absolute right-0 top-full w-48 bg-background shadow-lg rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <div className="py-2">
                      {categories.map((category) => (
                        <Link
                          key={category.id}
                          href={`/shop/${category.slug}`}
                          className="block px-4 py-2 hover:bg-muted text-sm"
                        >
                          {category.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-2 py-1 rounded-md transition-colors ${
                    pathname === item.href ? "font-bold text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(!isSearchOpen)} aria-label="جستجو">
              <Search className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={theme === "dark" ? "روشن" : "تاریک"}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <Link href="/account">
              <Button variant="ghost" size="icon" aria-label="حساب کاربری">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative" aria-label="سبد خرید">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>
        </div>

        {isSearchOpen && (
          <div className="py-2 border-t animate-fade-in">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="جستجو در محصولات..." className="w-full pr-10 focus-visible:ring-primary" />
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
