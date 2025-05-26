"use client";

import { useState } from "react";
import { Star, StarHalf, Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/components/cart-provider";
import { useToast } from "@/hooks/use-toast";
import type { ProductWithReviews } from "@/lib/api";

interface ProductInfoProps {
    product: ProductWithReviews;
}

export default function ProductInfo({ product }: ProductInfoProps) {
    const [quantity, setQuantity] = useState(1);
    const { addToCart, loading } = useCart();
    const { toast } = useToast();

    const handleAddToCart = async () => {
        try {
            await addToCart(product.id, quantity);
            toast({
                title: "به سبد خرید اضافه شد",
                description: `${product.title} با موفقیت به سبد خرید اضافه شد.`,
            });
        } catch (error) {
            toast({
                title: "خطا",
                description: "افزودن به سبد خرید با مشکل مواجه شد. لطفاً دوباره تلاش کنید.",
                variant: "destructive",
            });
        }
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const renderRating = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<Star key={`star-${i}`} className="h-4 w-4 fill-primary text-primary" />);
        }

        if (hasHalfStar) {
            stars.push(<StarHalf key="half-star" className="h-4 w-4 fill-primary text-primary" />);
        }

        return stars;
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">{product.title}</h1>
                <div className="flex items-center gap-2 mt-2">
                    <div className="flex">{renderRating(product.rating)}</div>
                    <span className="text-muted-foreground">
                        {product.rating} ({product.reviews.length} نظر)
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-2">
                {product.salePrice ? (
                    <>
                        <p className="text-3xl font-bold text-primary">{product.salePrice.toLocaleString()} تومان</p>
                        <p className="text-muted-foreground line-through">{product.price.toLocaleString()} تومان</p>
                    </>
                ) : (
                    <p className="text-3xl font-bold">{product.price.toLocaleString()} تومان</p>
                )}
            </div>

            <div className="flex items-center gap-2">
                <Badge variant={product.inStock ? "default" : "destructive"}>{product.inStock ? "موجود" : "ناموجود"}</Badge>
                {product.new && <Badge className="bg-primary">جدید</Badge>}
            </div>

            <div className="prose prose-sm max-w-none">
                <p className="text-muted-foreground">{product.shortDescription}</p>
            </div>

            {Object.keys(product.specifications).length > 0 && (
                <div className="pt-4 border-t">
                    <h3 className="font-semibold mb-2">ویژگی‌های محصول:</h3>
                    <ul className="space-y-1">
                        {Object.entries(product.specifications).map(([key, value]) => (
                            <li key={key} className="flex">
                                <span className="font-medium ml-2">{key}:</span>
                                <span className="text-muted-foreground">{value}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="pt-4 border-t">
                <div className="flex items-center gap-4">
                    <div className="flex items-center">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={decreaseQuantity}
                            disabled={quantity <= 1}
                            className="h-10 w-10 rounded-r-none"
                        >
                            <Minus className="h-4 w-4" />
                        </Button>
                        <div className="h-10 w-12 flex items-center justify-center border-y">{quantity}</div>
                        <Button variant="outline" size="icon" onClick={increaseQuantity} className="h-10 w-10 rounded-l-none">
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>

                    <Button onClick={handleAddToCart} disabled={loading || !product.inStock} className="flex-1">
                        <ShoppingCart className="ml-2 h-5 w-5" />
                        افزودن به سبد خرید
                    </Button>
                </div>
            </div>
        </div>
    );
}
