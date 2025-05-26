// This file simulates API calls to Payload CMS
// In a real implementation, these would be actual API calls

import type { CartItem } from "@/components/cart-provider";
import config from "@/payload.config";
import { getPayload } from "payload";

// Types
export type Product = {
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

export type Category = {
    id: string;
    slug: string;
    title: string;
    description: string;
    image: string;
    featured: boolean;
    parentId?: string;
    children?: Category[];
};

export type Brand = {
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

export type Banner = {
    id: string;
    title: string;
    subtitle: string;
    image: string;
    buttonText: string;
    buttonLink: string;
    position: string;
};

export type Testimonial = {
    id: string;
    name: string;
    role: string;
    comment: string;
    avatar: string;
    rating: number;
};

export type Order = {
    id: string;
    userId: string;
    items: CartItem[];
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
    shippingAddress: Address;
    paymentMethod: string;
    totalAmount: number;
    createdAt: string;
    updatedAt: string;
    trackingNumber?: string;
};

export type Address = {
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

export type User = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    addresses: Address[];
    orders: Order[];
};

// Mock data generators
const generateMockProducts = (): Product[] => {
    return [
        {
            id: "prod_1",
            slug: "کفش-ورزشی-نایک-ایر",
            title: "کفش ورزشی نایک ایر",
            price: 1290000,
            description:
                "کفش ورزشی نایک ایر با طراحی مدرن و راحتی فوق‌العاده برای ورزش و استفاده روزانه. این کفش با تکنولوژی پیشرفته هوا در کف، ضربات را جذب کرده و فشار را کاهش می‌دهد.",
            shortDescription: "کفش ورزشی با تکنولوژی جذب ضربه",
            images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
            category: "کفش",
            brand: "نایک",
            inStock: true,
            featured: true,
            new: false,
            rating: 4.5,
            reviews: [
                {
                    id: "rev_1",
                    userId: "user_1",
                    userName: "علی محمدی",
                    rating: 5,
                    comment: "بسیار راحت و با کیفیت عالی",
                    date: "2023-12-15",
                },
            ],
            specifications: {
                جنس: "چرم مصنوعی و پارچه",
                کف: "لاستیک",
                رنگ: "سفید/آبی",
                سایز: "۴۰-۴۵",
            },
            relatedProducts: ["prod_2", "prod_3"],
        },
        {
            id: "prod_2",
            slug: "هدفون-بی-سیم-سونی",
            title: "هدفون بی سیم سونی",
            price: 2490000,
            salePrice: 1990000,
            description:
                "هدفون بی سیم سونی با کیفیت صدای فوق‌العاده و حذف نویز فعال. باتری با دوام تا ۳۰ ساعت پخش مداوم و طراحی راحت برای استفاده طولانی مدت.",
            shortDescription: "هدفون بی سیم با حذف نویز فعال",
            images: ["/placeholder.svg", "/placeholder.svg"],
            category: "صوتی",
            brand: "سونی",
            inStock: true,
            featured: true,
            new: true,
            rating: 4.8,
            reviews: [
                {
                    id: "rev_2",
                    userId: "user_2",
                    userName: "مریم احمدی",
                    rating: 5,
                    comment: "کیفیت صدا عالی و حذف نویز فوق‌العاده",
                    date: "2024-01-10",
                },
            ],
            specifications: {
                "نوع اتصال": "بلوتوث ۵.۰",
                "عمر باتری": "تا ۳۰ ساعت",
                "حذف نویز": "فعال",
                وزن: "۲۵۰ گرم",
            },
            relatedProducts: ["prod_5", "prod_6"],
        },
        {
            id: "prod_3",
            slug: "لپ-تاپ-ایسوس-زنبوک",
            title: "لپ تاپ ایسوس زنبوک",
            price: 45900000,
            description:
                "لپ تاپ ایسوس زنبوک با پردازنده قدرتمند و طراحی فوق باریک. صفحه نمایش با کیفیت OLED و عمر باتری طولانی برای کار و سرگرمی.",
            shortDescription: "لپ تاپ فوق باریک با صفحه نمایش OLED",
            images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
            category: "لپ تاپ",
            brand: "ایسوس",
            inStock: true,
            featured: false,
            new: true,
            rating: 4.7,
            reviews: [],
            specifications: {
                پردازنده: "Intel Core i7",
                "حافظه رم": "۱۶ گیگابایت",
                "حافظه داخلی": "۵۱۲ گیگابایت SSD",
                "صفحه نمایش": "۱۴ اینچ OLED",
            },
            relatedProducts: ["prod_7", "prod_8"],
        },
        {
            id: "prod_4",
            slug: "ساعت-هوشمند-سامسونگ",
            title: "ساعت هوشمند سامسونگ",
            price: 7900000,
            description: "ساعت هوشمند سامسونگ با قابلیت پایش سلامتی و تناسب اندام. صفحه نمایش لمسی با کیفیت بالا و طراحی شیک و مدرن.",
            shortDescription: "ساعت هوشمند با قابلیت پایش سلامتی",
            images: ["/placeholder.svg", "/placeholder.svg"],
            category: "پوشیدنی",
            brand: "سامسونگ",
            inStock: true,
            featured: true,
            new: false,
            rating: 4.6,
            reviews: [],
            specifications: {
                "صفحه نمایش": "۱.۴ اینچ AMOLED",
                باتری: "تا ۴۰ ساعت",
                "مقاومت آب": "۵۰ متر",
                سنسورها: "ضربان قلب، اکسیژن خون، خواب",
            },
            relatedProducts: ["prod_9", "prod_10"],
        },
        {
            id: "prod_5",
            slug: "دوربین-بدون-آینه-سونی",
            title: "دوربین بدون آینه سونی",
            price: 35900000,
            description:
                "دوربین بدون آینه سونی با کیفیت تصویر فوق‌العاده و قابلیت فیلمبرداری ۴K. سیستم فوکوس خودکار پیشرفته و طراحی سبک و قابل حمل.",
            shortDescription: "دوربین بدون آینه با کیفیت تصویر عالی",
            images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
            category: "دوربین",
            brand: "سونی",
            inStock: true,
            featured: false,
            new: false,
            rating: 4.9,
            reviews: [],
            specifications: {
                سنسور: "Full-frame ۲۴.۲ مگاپیکسل",
                فیلمبرداری: "۴K ۶۰fps",
                "فوکوس خودکار": "۶۹۳ نقطه فاز",
                وزن: "۶۵۰ گرم",
            },
            relatedProducts: ["prod_2", "prod_6"],
        },
        {
            id: "prod_6",
            slug: "تبلت-اپل-آیپد-پرو",
            title: "تبلت اپل آیپد پرو",
            price: 29900000,
            salePrice: 27900000,
            description:
                "تبلت اپل آیپد پرو با صفحه نمایش Liquid Retina و پردازنده قدرتمند M2. مناسب برای طراحی، ویرایش ویدیو و بازی‌های سنگین.",
            shortDescription: "تبلت حرفه‌ای با پردازنده M2",
            images: ["/placeholder.svg", "/placeholder.svg"],
            category: "تبلت",
            brand: "اپل",
            inStock: true,
            featured: true,
            new: true,
            rating: 4.8,
            reviews: [],
            specifications: {
                "صفحه نمایش": "۱۲.۹ اینچ Liquid Retina XDR",
                پردازنده: "Apple M2",
                حافظه: "۲۵۶ گیگابایت",
                دوربین: "۱۲ مگاپیکسل عقب، ۱۲ مگاپیکسل جلو",
            },
            relatedProducts: ["prod_3", "prod_7"],
        },
    ];
};

const generateMockCategories = (): Category[] => {
    return [
        {
            id: "cat_1",
            slug: "الکترونیک",
            title: "الکترونیک",
            description: "انواع محصولات الکترونیکی شامل موبایل، لپ تاپ، تبلت و لوازم جانبی",
            image: "/placeholder.svg",
            featured: true,
            children: [
                {
                    id: "cat_2",
                    slug: "موبایل",
                    title: "موبایل",
                    description: "انواع گوشی‌های هوشمند از برندهای مختلف",
                    image: "/placeholder.svg",
                    featured: true,
                    parentId: "cat_1",
                },
                {
                    id: "cat_3",
                    slug: "لپ-تاپ",
                    title: "لپ تاپ",
                    description: "لپ تاپ‌های مخصوص کار، بازی و استفاده روزمره",
                    image: "/placeholder.svg",
                    featured: true,
                    parentId: "cat_1",
                },
                {
                    id: "cat_4",
                    slug: "صوتی",
                    title: "صوتی",
                    description: "هدفون، اسپیکر و لوازم صوتی",
                    image: "/placeholder.svg",
                    featured: false,
                    parentId: "cat_1",
                },
            ],
        },
        {
            id: "cat_5",
            slug: "پوشاک",
            title: "پوشاک",
            description: "انواع پوشاک مردانه، زنانه و بچگانه",
            image: "/placeholder.svg",
            featured: true,
            children: [
                {
                    id: "cat_6",
                    slug: "کفش",
                    title: "کفش",
                    description: "انواع کفش ورزشی، رسمی و روزمره",
                    image: "/placeholder.svg",
                    featured: true,
                    parentId: "cat_5",
                },
                {
                    id: "cat_7",
                    slug: "لباس-مردانه",
                    title: "لباس مردانه",
                    description: "انواع لباس مردانه برای سبک‌های مختلف",
                    image: "/placeholder.svg",
                    featured: false,
                    parentId: "cat_5",
                },
            ],
        },
        {
            id: "cat_8",
            slug: "خانه-و-آشپزخانه",
            title: "خانه و آشپزخانه",
            description: "لوازم خانگی، دکوراسیون و وسایل آشپزخانه",
            image: "/placeholder.svg",
            featured: true,
        },
        {
            id: "cat_9",
            slug: "زیبایی-و-سلامت",
            title: "زیبایی و سلامت",
            description: "محصولات آرایشی، بهداشتی و سلامت",
            image: "/placeholder.svg",
            featured: false,
        },
    ];
};

const generateMockBrands = (): Brand[] => {
    return [
        {
            id: "brand_1",
            slug: "سامسونگ",
            title: "سامسونگ",
            description: "برند پیشرو در تولید محصولات الکترونیکی",
            logo: "/placeholder.svg",
            featured: true,
        },
        {
            id: "brand_2",
            slug: "اپل",
            title: "اپل",
            description: "تولید کننده محصولات با کیفیت و لوکس",
            logo: "/placeholder.svg",
            featured: true,
        },
        {
            id: "brand_3",
            slug: "نایک",
            title: "نایک",
            description: "برند معتبر در تولید پوشاک و کفش ورزشی",
            logo: "/placeholder.svg",
            featured: true,
        },
        {
            id: "brand_4",
            slug: "سونی",
            title: "سونی",
            description: "تولید کننده محصولات صوتی و تصویری با کیفیت",
            logo: "/placeholder.svg",
            featured: true,
        },
        {
            id: "brand_5",
            slug: "ایسوس",
            title: "ایسوس",
            description: "تولید کننده لپ تاپ و قطعات کامپیوتری",
            logo: "/placeholder.svg",
            featured: false,
        },
    ];
};

const generateMockBanners = (): Banner[] => {
    return [
        {
            id: "banner_1",
            title: "فروش ویژه تابستانه",
            subtitle: "تا ۵۰٪ تخفیف روی محصولات منتخب",
            image: "/placeholder.svg",
            buttonText: "مشاهده محصولات",
            buttonLink: "/shop",
            position: "hero",
        },
        {
            id: "banner_2",
            title: "محصولات جدید",
            subtitle: "آخرین مدل‌های ۲۰۲۴",
            image: "/placeholder.svg",
            buttonText: "خرید کنید",
            buttonLink: "/shop?new=true",
            position: "middle",
        },
        {
            id: "banner_3",
            title: "لوازم الکترونیکی",
            subtitle: "بهترین برندها با قیمت استثنایی",
            image: "/placeholder.svg",
            buttonText: "مشاهده دسته‌بندی",
            buttonLink: "/shop/electronics",
            position: "bottom",
        },
    ];
};

const generateMockTestimonials = (): Testimonial[] => {
    return [
        {
            id: "testimonial_1",
            name: "سارا احمدی",
            role: "طراح وب",
            comment: "من همیشه از این فروشگاه خرید می‌کنم. کیفیت محصولات عالی و ارسال سریع است.",
            avatar: "/placeholder.svg",
            rating: 5,
        },
        {
            id: "testimonial_2",
            name: "محمد رضایی",
            role: "مهندس نرم‌افزار",
            comment: "بهترین تجربه خرید آنلاین را با این فروشگاه داشتم. پشتیبانی عالی و محصولات با کیفیت.",
            avatar: "/placeholder.svg",
            rating: 4,
        },
        {
            id: "testimonial_3",
            name: "نیلوفر محمدی",
            role: "پزشک",
            comment: "سرعت ارسال فوق‌العاده و بسته‌بندی مناسب. قطعاً دوباره خرید خواهم کرد.",
            avatar: "/placeholder.svg",
            rating: 5,
        },
    ];
};

const generateMockUser = (): User => {
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
        orders: [
            {
                id: "order_1",
                userId: "user_1",
                items: [
                    {
                        id: "item_1",
                        productId: "prod_1",
                        title: "کفش ورزشی نایک ایر",
                        price: 1290000,
                        quantity: 1,
                        image: "/placeholder.svg",
                    },
                    {
                        id: "item_2",
                        productId: "prod_2",
                        title: "هدفون بی سیم سونی",
                        price: 2490000,
                        quantity: 1,
                        image: "/placeholder.svg",
                    },
                ],
                status: "delivered",
                shippingAddress: {
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
                paymentMethod: "کارت بانکی",
                totalAmount: 3780000,
                createdAt: "2023-12-10T10:30:00Z",
                updatedAt: "2023-12-12T14:20:00Z",
                trackingNumber: "TRK123456789",
            },
            {
                id: "order_2",
                userId: "user_1",
                items: [
                    {
                        id: "item_3",
                        productId: "prod_6",
                        title: "تبلت اپل آیپد پرو",
                        price: 29900000,
                        quantity: 1,
                        image: "/placeholder.svg",
                    },
                ],
                status: "processing",
                shippingAddress: {
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
                paymentMethod: "کارت بانکی",
                totalAmount: 29900000,
                createdAt: "2024-04-05T09:15:00Z",
                updatedAt: "2024-04-05T09:15:00Z",
            },
        ],
    };
};

// Mock cart items
let mockCartItems: CartItem[] = [
    {
        id: "cart_item_1",
        productId: "prod_1",
        title: "کفش ورزشی نایک ایر",
        price: 1290000,
        quantity: 1,
        image: "/placeholder.svg",
    },
    {
        id: "cart_item_2",
        productId: "prod_2",
        title: "هدفون بی سیم سونی",
        price: 1990000, // Sale price
        quantity: 2,
        image: "/placeholder.svg",
    },
];

// API functions
export async function fetchProducts(options?: {
    category?: string;
    brand?: string;
    featured?: boolean;
    new?: boolean;
    search?: string;
    limit?: number;
}): Promise<Product[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    let products = generateMockProducts();

    if (options) {
        if (options.category) {
            products = products.filter((product) => product.category === options.category);
        }

        if (options.brand) {
            products = products.filter((product) => product.brand === options.brand);
        }

        if (options.featured !== undefined) {
            products = products.filter((product) => product.featured === options.featured);
        }

        if (options.new !== undefined) {
            products = products.filter((product) => product.new === options.new);
        }

        if (options.search) {
            const searchLower = options.search.toLowerCase();
            products = products.filter(
                (product) => product.title.toLowerCase().includes(searchLower) || product.description.toLowerCase().includes(searchLower)
            );
        }

        if (options.limit) {
            products = products.slice(0, options.limit);
        }
    }

    return products;
}

export async function fetchProductById(id: string): Promise<Product | null> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const products = generateMockProducts();
    const product = products.find((p) => p.id === id);

    return product || null;
}

export async function fetchCategories(): Promise<Category[]> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return generateMockCategories();
}

export async function fetchBrands(): Promise<Brand[]> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return generateMockBrands();
}

export async function fetchBanners(position?: string): Promise<Banner[]> {
    const bannersFromPayload = await getPayloadClient();

    console.log("bannersFromPayload", bannersFromPayload);

    await new Promise((resolve) => setTimeout(resolve, 200));

    let banners = generateMockBanners();

    if (position) {
        banners = banners.filter((banner) => banner.position === position);
    }

    return banners;
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return generateMockTestimonials();
}

export async function fetchUserProfile(): Promise<User> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return generateMockUser();
}

export async function fetchUserOrders(): Promise<Order[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const user = generateMockUser();
    return user.orders;
}

export async function fetchCartItems(): Promise<CartItem[]> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return [...mockCartItems];
}

export async function addToCart(productId: string, quantity: number): Promise<CartItem> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const products = generateMockProducts();
    const product = products.find((p) => p.id === productId);

    if (!product) {
        throw new Error("Product not found");
    }

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

export async function updateCartItem(itemId: string, quantity: number): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 200));

    const itemIndex = mockCartItems.findIndex((item) => item.id === itemId);

    if (itemIndex === -1) {
        throw new Error("Cart item not found");
    }

    mockCartItems[itemIndex].quantity = quantity;
}

export async function removeFromCart(itemId: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    mockCartItems = mockCartItems.filter((item) => item.id !== itemId);
}

export async function createOrder(orderData: { items: CartItem[]; shippingAddress: Address; paymentMethod: string }): Promise<Order> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newOrder: Order = {
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

async function getPayloadClient() {
    const payload = await getPayload({ config });

    // const foundBanners = await payload.find({
    //     collection: "banners",
    //     where: {
    //         position: {
    //             equals: "hero",
    //         },
    //     },
    // });

    // console.log(foundBanners);

    // return foundBanners;

    return [];
}
