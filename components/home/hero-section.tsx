import { fetchBanners } from "@/lib/api"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default async function HeroSection() {
  const heroBanners = await fetchBanners("hero")
  const mainBanner = heroBanners[0]

  return (
    <section className="relative h-[600px] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-l from-background/80 via-background/50 to-transparent z-10"></div>

      <Image
        src={mainBanner.image || "/placeholder.svg"}
        alt={mainBanner.title}
        fill
        className="object-cover"
        priority
      />

      <div className="container mx-auto px-4 h-full flex items-center relative z-20">
        <div className="max-w-xl animate-slide-in-right">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{mainBanner.title}</h1>
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground">{mainBanner.subtitle}</p>
          <Button asChild size="lg" className="text-lg px-8 py-6">
            <Link href={mainBanner.buttonLink}>{mainBanner.buttonText}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
