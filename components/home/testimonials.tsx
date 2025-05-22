import Image from "next/image"
import { fetchTestimonials } from "@/lib/api"
import { Card, CardContent } from "@/components/ui/card"
import { Star, StarHalf } from "lucide-react"

export default async function Testimonials() {
  const testimonials = await fetchTestimonials()

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
    <section className="space-y-8">
      <h2 className="text-3xl font-bold text-center">نظرات مشتریان</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="border-border/40">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex">{renderRating(testimonial.rating)}</div>
              <p className="text-muted-foreground">{testimonial.comment}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
