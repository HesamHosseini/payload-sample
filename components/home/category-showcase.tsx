import Link from "next/link"
import Image from "next/image"
import { fetchCategories } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default async function CategoryShowcase() {
  const categories = await fetchCategories()
  const featuredCategories = categories.filter((category) => category.featured).slice(0, 4)

  return (
    <section className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">دسته‌بندی‌های محبوب</h2>
        <Button asChild variant="ghost" className="group">
          <Link href="/shop" className="flex items-center gap-2">
            مشاهده همه
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          </Link>
        </Button>
      </div>

      <div className="asymmetric-grid">
        {featuredCategories.map((category, index) => {
          // Create different grid layouts based on index
          const gridClasses = [
            "col-span-12 md:col-span-6 row-span-2",
            "col-span-12 md:col-span-6 row-span-1",
            "col-span-12 md:col-span-3 row-span-1",
            "col-span-12 md:col-span-3 row-span-1",
          ]

          return (
            <Link
              key={category.id}
              href={`/shop/${category.slug}`}
              className={`relative overflow-hidden rounded-lg group ${gridClasses[index % gridClasses.length]}`}
            >
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-xl md:text-2xl font-bold mb-2">{category.title}</h3>
                <p className="text-muted-foreground text-sm md:text-base line-clamp-2">{category.description}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
