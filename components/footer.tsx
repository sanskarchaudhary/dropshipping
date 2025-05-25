import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-400">DropShop</h3>
            <p className="text-gray-300">
              Your trusted partner for quality products at unbeatable prices. Shop with confidence and enjoy fast,
              reliable shipping worldwide.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/about" className="block text-gray-300 hover:text-white">
                About Us
              </Link>
              <Link href="/contact" className="block text-gray-300 hover:text-white">
                Contact
              </Link>
              <Link href="/faq" className="block text-gray-300 hover:text-white">
                FAQ
              </Link>
              <Link href="/shipping" className="block text-gray-300 hover:text-white">
                Shipping Info
              </Link>
              <Link href="/returns" className="block text-gray-300 hover:text-white">
                Returns
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Categories</h4>
            <div className="space-y-2">
              <Link href="/electronics" className="block text-gray-300 hover:text-white">
                Electronics
              </Link>
              <Link href="/fashion" className="block text-gray-300 hover:text-white">
                Fashion
              </Link>
              <Link href="/home-garden" className="block text-gray-300 hover:text-white">
                Home & Garden
              </Link>
              <Link href="/sports" className="block text-gray-300 hover:text-white">
                Sports & Fitness
              </Link>
              <Link href="/beauty" className="block text-gray-300 hover:text-white">
                Beauty & Health
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Customer Service</h4>
            <div className="space-y-2">
              <p className="text-gray-300">Email: support@dropshop.com</p>
              <p className="text-gray-300">Phone: 1-800-DROPSHOP</p>
              <p className="text-gray-300">Hours: Mon-Fri 9AM-6PM EST</p>
              <Link href="/track-order" className="block text-gray-300 hover:text-white">
                Track Your Order
              </Link>
              <Link href="/live-chat" className="block text-gray-300 hover:text-white">
                Live Chat Support
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2024 DropShop. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-gray-400 hover:text-white text-sm">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
