"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { Category, Brand } from "@/lib/api"

interface FilterSidebarProps {
  categories: Category[]
  brands: Brand[]
}

export default function FilterSidebar({ categories, brands }: FilterSidebarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "")
  const [selectedCategories, setSelectedCategories] = useState<string[]>(searchParams.get("category")?.split(",") || [])
  const [selectedBrands, setSelectedBrands] = useState<string[]>(searchParams.get("brand")?.split(",") || [])

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category)
      } else {
        return [...prev, category]
      }
    })
  }

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) => {
      if (prev.includes(brand)) {
        return prev.filter((b) => b !== brand)
      } else {
        return [...prev, brand]
      }
    })
  }

  const applyFilters = () => {
    const params = new URLSearchParams()

    if (selectedCategories.length > 0) {
      params.set("category", selectedCategories.join(","))
    }

    if (selectedBrands.length > 0) {
      params.set("brand", selectedBrands.join(","))
    }

    if (searchTerm) {
      params.set("search", searchTerm)
    }

    router.push(`/shop?${params.toString()}`)
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedBrands([])
    setSearchTerm("")
    router.push("/shop")
  }

  return (
    <div className="bg-card rounded-lg border p-4 sticky top-20">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">فیلترها</h2>
        {(selectedCategories.length > 0 || selectedBrands.length > 0 || searchTerm) && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 px-2">
            <X className="h-4 w-4 ml-1" />
            پاک کردن
          </Button>
        )}
      </div>

      <div className="relative mb-6">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="جستجو در محصولات..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pr-10"
        />
      </div>

      <Accordion type="multiple" defaultValue={["categories", "brands"]} className="space-y-4">
        <AccordionItem value="categories" className="border-b-0">
          <AccordionTrigger className="py-2 hover:no-underline">
            <span className="text-base font-medium">دسته‌بندی‌ها</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={selectedCategories.includes(category.slug)}
                    onCheckedChange={() => handleCategoryChange(category.slug)}
                  />
                  <label
                    htmlFor={`category-${category.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {category.title}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="brands" className="border-b-0">
          <AccordionTrigger className="py-2 hover:no-underline">
            <span className="text-base font-medium">برندها</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {brands.map((brand) => (
                <div key={brand.id} className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Checkbox
                    id={`brand-${brand.id}`}
                    checked={selectedBrands.includes(brand.slug)}
                    onCheckedChange={() => handleBrandChange(brand.slug)}
                  />
                  <label
                    htmlFor={`brand-${brand.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {brand.title}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button onClick={applyFilters} className="w-full mt-6">
        اعمال فیلترها
      </Button>
    </div>
  )
}
