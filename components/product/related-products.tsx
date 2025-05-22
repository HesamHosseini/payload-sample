import Link from "next/link"
import Image from "next/image"
import { fetchProducts } from "@/lib/api"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface RelatedProductsProps {
  productId: string
  relatedIds: string[]
}

export default async function RelatedProducts({ productId, relatedIds }: RelatedProductsProps) {
  // Fetch all products and filter by related IDs
  // In a real app, you would have a dedicated API endpoint for this
  const allProducts = await fetchProducts()
  const relatedProducts = allProducts.filter((product) => relatedIds.includes(product.id) && product.id !== productId)

  if (relatedProducts.length === 0) {
    return null
  }

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-6">محصولات مرتبط</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <Link key={product.id} href={`/shop/${product.slug}`} className="product-card">
            <Card className="overflow-hidden h-full border-border/40 hover:border-primary/50 transition-colors">
              <div className="relative h-48 bg-muted">
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
                      <p className="text-muted-foreground line-through text-sm">
                        {product.price.toLocaleString()} تومان
                      </p>
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
    </section>
  )
}
