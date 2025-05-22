import ProductGallery from "@/components/product/product-gallery";
import ProductInfo from "@/components/product/product-info";
import ProductTabs from "@/components/product/product-tabs";
import RelatedProducts from "@/components/product/related-products";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchProductById } from "@/lib/api";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function ProductPage({ params }: { params: { id: string } }) {
    const product = await fetchProductById(params.id);

    if (!product) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <Suspense fallback={<Skeleton className="h-[500px] w-full rounded-lg" />}>
                    <ProductGallery images={product.images} title={product.title} />
                </Suspense>

                <ProductInfo product={product} />
            </div>

            <ProductTabs product={product} />

            <Suspense fallback={<div className="h-[300px] w-full bg-muted animate-pulse mt-12 rounded-lg" />}>
                <RelatedProducts productId={product.id} relatedIds={product.relatedProducts} />
            </Suspense>
        </div>
    );
}
