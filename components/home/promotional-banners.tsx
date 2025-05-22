import Link from "next/link"
import Image from "next/image"
import { fetchBanners } from "@/lib/api"
import { Button } from "@/components/ui/button"

export default async function PromotionalBanners() {
  const banners = await fetchBanners("middle")

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {banners.map((banner) => (
        <div key={banner.id} className="relative overflow-hidden rounded-lg group h-64">
          <Image
            src={banner.image || "/placeholder.svg"}
            alt={banner.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-transparent flex flex-col justify-end p-6">
            <h3 className="text-2xl font-bold mb-2">{banner.title}</h3>
            <p className="text-muted-foreground mb-4">{banner.subtitle}</p>
            <Button asChild className="w-fit">
              <Link href={banner.buttonLink}>{banner.buttonText}</Link>
            </Button>
          </div>
        </div>
      ))}
    </section>
  )
}
