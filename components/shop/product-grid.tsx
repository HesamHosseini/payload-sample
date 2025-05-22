import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/api"

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">محصولی یافت نشد</h3>
        <p className="text-muted-foreground">لطفاً فیلترهای خود را تغییر دهید یا دوباره جستجو کنید.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Link key={product.id} href={`/shop/${product.slug}`} className="product-card">
          <Card className="overflow-hidden h-full border-border/40 hover:border-primary/50 transition-colors">
            <div className="relative h-64 bg-muted">
              <Image
                src={product.images[0] || "/placeholder.svg"}
                alt={product.title}
                fill
                className="object-cover transition-transform hover:scale-105"
              />
              {product.salePrice && <Badge className="absolute top-2 right-2 bg-destructive">تخفیف</Badge>}
              {product.new && <Badge className="absolute top-2 left-2 bg-primary">جدید</Badge>}
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.title}</h3>
              <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{product.shortDescription}</p>
              <div className="flex items-center justify-between">
                {product.salePrice ? (
                  <div className="space-y-1">
                    <p className="text-muted-foreground line-through text-sm">{product.price.toLocaleString()} تومان</p>
                    <p className="font-bold text-primary">{product.salePrice.toLocaleString()} تومان</p>
                  </div>
                ) : (
                  <p className="font-bold">{product.price.toLocaleString()} تومان</p>
                )}
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
