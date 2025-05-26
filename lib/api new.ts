import type { CartItem } from "@/components/cart-provider";
import type { Banner, Brand, Category, Product, Testimonial } from "@/payload-types";

// Base URL for Payload API
const PAYLOAD_API_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || "http://localhost:3000";

// Helper function to make API requests
async function payloadRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${PAYLOAD_API_URL}/api${endpoint}`;

    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            ...options?.headers,
        },
        ...options,
    });

    if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
}

// Transform Payload product to frontend format
function transformProduct(product: Product): ProductWithReviews {
    return {
        id: product.id.toString(),
        slug: product.slug || product.id.toString(),
        title: product.title,
        price: product.price,
        salePrice: product.salePrice || undefined,
        description: product.description ? JSON.stringify(product.description) : "",
        shortDescription: product.shortDescription,
        images: product.images?.map((img) => {
            const media = typeof img.image === "object" ? img.image : null;
            return media?.url || "/placeholder.svg";
        }) || ["/placeholder.svg"],
        category: typeof product.category === "object" ? product.category.title : "",
        brand: typeof product.brand === "object" ? product.brand.title : "",
        inStock: product.inStock ?? true,
        featured: product.featured ?? false,
        new: product.new ?? false,
        rating: 4.5, // Default rating since not in Payload schema
        reviews: [], // Default empty reviews
        specifications:
            product.specifications?.reduce(
                (acc, spec) => {
                    acc[spec.key] = spec.value;
                    return acc;
                },
                {} as Record<string, string>
            ) || {},
        relatedProducts: Array.isArray(product.relatedProducts)
            ? product.relatedProducts.map((p) => (typeof p === "object" ? p.id.toString() : p.toString()))
            : [],
    };
}

// Transform Payload category to frontend format
function transformCategory(category: Category): CategoryWithChildren {
    return {
        id: category.id.toString(),
        slug: category.slug || category.id.toString(),
        title: category.title,
        description: category.description || "",
        image: typeof category.image === "object" ? category.image.url || "/placeholder.svg" : "/placeholder.svg",
        featured: category.featured ?? false,
        parentId: typeof category.parent === "object" ? category.parent?.id.toString() : undefined,
        children: [], // Will be populated separately
    };
}

// Transform Payload brand to frontend format
function transformBrand(brand: Brand): BrandType {
    return {
        id: brand.id.toString(),
        slug: brand.slug || brand.id.toString(),
        title: brand.title,
        description: brand.description || "",
        logo: typeof brand.logo === "object" ? brand.logo.url || "/placeholder.svg" : "/placeholder.svg",
        featured: brand.featured ?? false,
    };
}

// Types for frontend
export type ProductWithReviews = {
    id: string;
    slug: string;
    title: string;
    price: number;
    salePrice?: number;
    description: string;
    shortDescription: string;
    images: string[];
    category: string;
    brand: string;
    inStock: boolean;
    featured: boolean;
    new: boolean;
    rating: number;
    reviews: Review[];
    specifications: Record<string, string>;
    relatedProducts: string[];
};

export type CategoryWithChildren = {
    id: string;
    slug: string;
    title: string;
    description: string;
    image: string;
    featured: boolean;
    parentId?: string;
    children?: CategoryWithChildren[];
};

export type BrandType = {
    id: string;
    slug: string;
    title: string;
    description: string;
    logo: string;
    featured: boolean;
};

export type Review = {
    id: string;
    userId: string;
    userName: string;
    rating: number;
    comment: string;
    date: string;
};

export type BannerType = {
    id: string;
    title: string;
    subtitle: string;
    image: string;
    buttonText: string;
    buttonLink: string;
    position: string;
};

export type TestimonialType = {
    id: string;
    name: string;
    role: string;
    comment: string;
    avatar: string;
    rating: number;
};

export type OrderType = {
    id: string;
    userId: string;
    items: CartItem[];
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
    shippingAddress: AddressType;
    paymentMethod: string;
    totalAmount: number;
    createdAt: string;
    updatedAt: string;
    trackingNumber?: string;
};

export type AddressType = {
    id: string;
    fullName: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone: string;
    isDefault: boolean;
};

export type UserType = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    addresses: AddressType[];
    orders: OrderType[];
};

// API functions
export async function fetchProducts(options?: {
    category?: string;
    brand?: string;
    featured?: boolean;
    new?: boolean;
    search?: string;
    limit?: number;
}): Promise<ProductWithReviews[]> {
    const params = new URLSearchParams();

    if (options?.featured !== undefined) {
        params.append("where[featured][equals]", options.featured.toString());
    }

    if (options?.new !== undefined) {
        params.append("where[new][equals]", options.new.toString());
    }

    if (options?.category) {
        params.append("where[category.slug][equals]", options.category);
    }

    if (options?.brand) {
        params.append("where[brand.slug][equals]", options.brand);
    }

    if (options?.search) {
        params.append("where[title][contains]", options.search);
    }

    if (options?.limit) {
        params.append("limit", options.limit.toString());
    }

    params.append("where[status][equals]", "published");
    params.append("depth", "2");

    const response = await payloadRequest<{ docs: Product[] }>(`/products?${params.toString()}`);
    return response.docs.map(transformProduct);
}

export async function fetchProductById(id: string): Promise<ProductWithReviews | null> {
    try {
        const response = await payloadRequest<Product>(`/products/${id}?depth=2`);
        return transformProduct(response);
    } catch (error) {
        console.error("Error fetching product:", error);
        return null;
    }
}

export async function fetchCategories(): Promise<CategoryWithChildren[]> {
    const params = new URLSearchParams();
    params.append("where[status][equals]", "published");
    params.append("depth", "2");
    params.append("limit", "100");

    const response = await payloadRequest<{ docs: Category[] }>(`/categories?${params.toString()}`);
    const categories = response.docs.map(transformCategory);

    // Build category tree
    const categoryMap = new Map(categories.map((cat) => [cat.id, cat]));
    const rootCategories: CategoryWithChildren[] = [];

    categories.forEach((category) => {
        if (category.parentId) {
            const parent = categoryMap.get(category.parentId);
            if (parent) {
                if (!parent.children) parent.children = [];
                parent.children.push(category);
            }
        } else {
            rootCategories.push(category);
        }
    });

    return rootCategories;
}

export async function fetchBrands(): Promise<BrandType[]> {
    const params = new URLSearchParams();
    params.append("where[status][equals]", "published");
    params.append("depth", "1");
    params.append("limit", "100");

    const response = await payloadRequest<{ docs: Brand[] }>(`/brands?${params.toString()}`);
    return response.docs.map(transformBrand);
}

export async function fetchBanners(position?: string): Promise<BannerType[]> {
    const params = new URLSearchParams();
    params.append("where[status][equals]", "published");
    params.append("depth", "1");

    if (position) {
        params.append("where[position][equals]", position);
    }

    const response = await payloadRequest<{ docs: Banner[] }>(`/banners?${params.toString()}`);
    return response.docs.map((banner) => ({
        id: banner.id.toString(),
        title: banner.title,
        subtitle: banner.subtitle || "",
        image: typeof banner.image === "object" ? banner.image.url || "/placeholder.svg" : "/placeholder.svg",
        buttonText: banner.buttonText,
        buttonLink: banner.buttonLink,
        position: banner.position,
    }));
}

export async function fetchTestimonials(): Promise<TestimonialType[]> {
    const params = new URLSearchParams();
    params.append("where[status][equals]", "published");
    params.append("depth", "1");

    const response = await payloadRequest<{ docs: Testimonial[] }>(`/testimonials?${params.toString()}`);
    return response.docs.map((testimonial) => ({
        id: testimonial.id.toString(),
        name: testimonial.name,
        role: testimonial.role,
        comment: testimonial.comment,
        avatar: typeof testimonial.avatar === "object" ? testimonial.avatar.url || "/placeholder.svg" : "/placeholder.svg",
        rating: Number.parseInt(testimonial.rating),
    }));
}

// Mock cart functionality (you might want to implement this with Payload or local storage)
let mockCartItems: CartItem[] = [];

export async function fetchCartItems(): Promise<CartItem[]> {
    // In a real implementation, this could be stored in Payload or local storage
    return [...mockCartItems];
}

export async function addToCart(productId: string, quantity: number): Promise<CartItem> {
    const product = await fetchProductById(productId);

    if (!product) {
        throw new Error("Product not found");
    }

    const existingItemIndex = mockCartItems.findIndex((item) => item.productId === productId);

    if (existingItemIndex >= 0) {
        mockCartItems[existingItemIndex].quantity += quantity;
        return mockCartItems[existingItemIndex];
    } else {
        const newItem: CartItem = {
            id: `cart_item_${Date.now()}`,
            productId,
            title: product.title,
            price: product.salePrice || product.price,
            quantity,
            image: product.images[0],
        };

        mockCartItems.push(newItem);
        return newItem;
    }
}

export async function updateCartItem(itemId: string, quantity: number): Promise<void> {
    const itemIndex = mockCartItems.findIndex((item) => item.id === itemId);

    if (itemIndex === -1) {
        throw new Error("Cart item not found");
    }

    mockCartItems[itemIndex].quantity = quantity;
}

export async function removeFromCart(itemId: string): Promise<void> {
    mockCartItems = mockCartItems.filter((item) => item.id !== itemId);
}

// User and order functions (mock for now - you'd implement these with Payload auth)
export async function fetchUserProfile(): Promise<UserType> {
    // Mock user data - implement with Payload auth
    return {
        id: "user_1",
        email: "user@example.com",
        firstName: "علی",
        lastName: "محمدی",
        phone: "09123456789",
        addresses: [
            {
                id: "addr_1",
                fullName: "علی محمدی",
                addressLine1: "خیابان ولیعصر، کوچه بهار، پلاک ۱۲",
                city: "تهران",
                state: "تهران",
                postalCode: "1234567890",
                country: "ایران",
                phone: "09123456789",
                isDefault: true,
            },
        ],
        orders: [],
    };
}

export async function fetchUserOrders(): Promise<OrderType[]> {
    // Mock orders - implement with Payload
    return [];
}

export async function createOrder(orderData: {
    items: CartItem[];
    shippingAddress: AddressType;
    paymentMethod: string;
}): Promise<OrderType> {
    // Mock order creation - implement with Payload
    const newOrder: OrderType = {
        id: `order_${Date.now()}`,
        userId: "user_1",
        items: orderData.items,
        status: "pending",
        shippingAddress: orderData.shippingAddress,
        paymentMethod: orderData.paymentMethod,
        totalAmount: orderData.items.reduce((total, item) => total + item.price * item.quantity, 0),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    // Clear cart after order creation
    mockCartItems = [];

    return newOrder;
}
