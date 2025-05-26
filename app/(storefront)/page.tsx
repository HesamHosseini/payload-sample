import HeroSection from "@/components/home/hero-section";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default function Home() {
    return (
        <div className="animate-fade-in">
            <Suspense fallback={<div className="h-[500px] w-full bg-muted animate-pulse"></div>}>
                <HeroSection />
            </Suspense>

            {/* <div className="container mx-auto px-4 py-16 space-y-24">
                <Suspense fallback={<CategoryShowcaseSkeleton />}>
                    <CategoryShowcase />
                </Suspense>

                <Suspense fallback={<FeaturedProductsSkeleton />}>
                    <FeaturedProducts />
                </Suspense>

                <Suspense fallback={<PromotionalBannersSkeleton />}>
                    <PromotionalBanners />
                </Suspense>

                <Suspense fallback={<TestimonialsSkeleton />}>
                    <Testimonials />
                </Suspense>

                <Suspense fallback={<BrandsShowcaseSkeleton />}>
                    <BrandsShowcase />
                </Suspense>
            </div> */}
        </div>
    );
}

function CategoryShowcaseSkeleton() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-10 w-32" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array(4)
                    .fill(0)
                    .map((_, i) => (
                        <Skeleton key={i} className="h-48 w-full rounded-lg" />
                    ))}
            </div>
        </div>
    );
}

function FeaturedProductsSkeleton() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-10 w-32" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array(4)
                    .fill(0)
                    .map((_, i) => (
                        <div key={i} className="space-y-3">
                            <Skeleton className="h-64 w-full rounded-lg" />
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-5 w-1/2" />
                            <Skeleton className="h-8 w-1/3" />
                        </div>
                    ))}
            </div>
        </div>
    );
}

function PromotionalBannersSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-64 w-full rounded-lg" />
            <Skeleton className="h-64 w-full rounded-lg" />
        </div>
    );
}

function TestimonialsSkeleton() {
    return (
        <div className="space-y-6">
            <Skeleton className="h-8 w-64 mx-auto" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Array(3)
                    .fill(0)
                    .map((_, i) => (
                        <Skeleton key={i} className="h-48 w-full rounded-lg" />
                    ))}
            </div>
        </div>
    );
}

function BrandsShowcaseSkeleton() {
    return (
        <div className="space-y-6">
            <Skeleton className="h-8 w-64 mx-auto" />
            <div className="flex flex-wrap justify-center gap-8">
                {Array(5)
                    .fill(0)
                    .map((_, i) => (
                        <Skeleton key={i} className="h-16 w-32 rounded" />
                    ))}
            </div>
        </div>
    );
}
