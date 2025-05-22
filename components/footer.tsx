import Link from "next/link"
import { Instagram, Twitter, Facebook, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  return (
    <footer className="bg-muted mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">فروشگاه مدرن</h3>
            <p className="text-muted-foreground mb-4">
              ارائه دهنده بهترین محصولات با کیفیت و قیمت مناسب. ما به دنبال ایجاد تجربه خرید آنلاین لذت‌بخش برای شما
              هستیم.
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <Button variant="ghost" size="icon" aria-label="اینستاگرام">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="توییتر">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="فیسبوک">
                <Facebook className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">دسترسی سریع</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  صفحه اصلی
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-muted-foreground hover:text-foreground transition-colors">
                  فروشگاه
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  درباره ما
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  تماس با ما
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  وبلاگ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">خدمات مشتریان</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  سوالات متداول
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-muted-foreground hover:text-foreground transition-colors">
                  اطلاعات ارسال
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-muted-foreground hover:text-foreground transition-colors">
                  شرایط بازگشت کالا
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  حریم خصوصی
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  قوانین و مقررات
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">تماس با ما</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 ml-2 mt-0.5" />
                <span className="text-muted-foreground">تهران، خیابان ولیعصر، برج مدرن، طبقه ۵، واحد ۱۲</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 ml-2" />
                <span className="text-muted-foreground">۰۲۱-۱۲۳۴۵۶۷۸</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 ml-2" />
                <span className="text-muted-foreground">info@modernshop.ir</span>
              </li>
            </ul>

            <div className="mt-6">
              <h4 className="font-medium mb-2">عضویت در خبرنامه</h4>
              <div className="flex">
                <Input placeholder="ایمیل خود را وارد کنید" className="rounded-l-none" />
                <Button className="rounded-r-none">عضویت</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-6 text-center text-muted-foreground">
          <p>© ۱۴۰۳ فروشگاه مدرن. تمامی حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  )
}
