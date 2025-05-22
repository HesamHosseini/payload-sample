import { Suspense } from "react"
import { fetchProducts, fetchCategories, fetchBrands } from "@/lib/api"
import ProductGrid from "@/components/shop/product-grid"
import FilterSidebar from "@/components/shop/filter-sidebar"
import ProductGridSkeleton from "@/components/shop/product-grid-skeleton"

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { category?: string; brand?: string; search?: string }
}) {
  const { category, brand, search } = searchParams
  const products = await fetchProducts({ category, brand, search })
  const categories = await fetchCategories()
  const brands = await fetchBrands()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">فروشگاه</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/4">
          <FilterSidebar categories={categories} brands={brands} />
        </div>

        <div className="w-full lg:w-3/4">
          <Suspense fallback={<ProductGridSkeleton />}>
            <ProductGrid products={products} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
