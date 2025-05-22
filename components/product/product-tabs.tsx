"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, StarHalf, User } from "lucide-react"
import type { Product } from "@/lib/api"

interface ProductTabsProps {
  product: Product
}

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("description")

  const renderRating = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="h-4 w-4 fill-primary text-primary" />)
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="h-4 w-4 fill-primary text-primary" />)
    }

    return stars
  }

  return (
    <Tabs defaultValue="description" value={activeTab} onValueChange={setActiveTab} className="mt-12">
      <TabsList className="grid w-full grid-cols-3 mb-8">
        <TabsTrigger value="description">توضیحات</TabsTrigger>
        <TabsTrigger value="specifications">مشخصات</TabsTrigger>
        <TabsTrigger value="reviews">نظرات ({product.reviews.length})</TabsTrigger>
      </TabsList>

      <TabsContent value="description" className="bg-card rounded-lg p-6 border">
        <div className="prose prose-lg max-w-none">
          <p>{product.description}</p>
        </div>
      </TabsContent>

      <TabsContent value="specifications" className="bg-card rounded-lg p-6 border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(product.specifications).map(([key, value]) => (
            <div key={key} className="flex py-2 border-b">
              <span className="font-medium ml-2 w-1/3">{key}:</span>
              <span className="text-muted-foreground w-2/3">{value}</span>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="reviews" className="bg-card rounded-lg p-6 border">
        {product.reviews.length > 0 ? (
          <div className="space-y-6">
            {product.reviews.map((review) => (
              <div key={review.id} className="border-b pb-6 last:border-b-0">
                <div className="flex items-center gap-4 mb-2">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                    <User className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium">{review.userName}</h4>
                    <p className="text-sm text-muted-foreground">{new Date(review.date).toLocaleDateString("fa-IR")}</p>
                  </div>
                </div>
                <div className="flex mb-2">{renderRating(review.rating)}</div>
                <p className="text-muted-foreground">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <h3 className="text-lg font-medium mb-2">هنوز نظری ثبت نشده است</h3>
            <p className="text-muted-foreground">اولین نفری باشید که نظر خود را درباره این محصول ثبت می‌کند.</p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  )
}
