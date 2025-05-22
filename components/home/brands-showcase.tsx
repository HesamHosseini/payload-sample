import Image from "next/image"
import Link from "next/link"
import { fetchBrands } from "@/lib/api"

export default async function BrandsShowcase() {
  const brands = await fetchBrands()
  const featuredBrands = brands.filter((brand) => brand.featured)

  return (
    <section className="space-y-8">
      <h2 className="text-3xl font-bold text-center">برندهای برتر</h2>
      <div className="flex flex-wrap justify-center gap-8 items-center">
        {featuredBrands.map((brand) => (
          <Link
            key={brand.id}
            href={`/brands/${brand.slug}`}
            className="relative h-16 w-32 grayscale hover:grayscale-0 transition-all duration-300"
          >
            <Image src={brand.logo || "/placeholder.svg"} alt={brand.title} fill className="object-contain" />
          </Link>
        ))}
      </div>
    </section>
  )
}
