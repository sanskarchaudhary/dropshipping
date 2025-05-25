import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Package, Truck, Mail } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function OrderSuccessPage() {
  const orderNumber = "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase()
  const estimatedDelivery = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <CheckCircle className="h-20 w-20 text-green-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-green-600 mb-2">Order Confirmed!</h1>
            <p className="text-gray-600 text-lg">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-left">
                <div>
                  <span className="text-sm text-gray-600">Order Number</span>
                  <p className="font-bold">{orderNumber}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Estimated Delivery</span>
                  <p className="font-bold">{estimatedDelivery}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Mail className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Confirmation Email</h3>
                <p className="text-sm text-gray-600">
                  A confirmation email has been sent to your email address with order details.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Package className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Order Processing</h3>
                <p className="text-sm text-gray-600">
                  Your order is being prepared and will be shipped within 1-2 business days.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Truck className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Tracking Info</h3>
                <p className="text-sm text-gray-600">You'll receive tracking information once your order ships.</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg">Continue Shopping</Button>
              </Link>
              <Link href={`/track-order?order=${orderNumber}`}>
                <Button variant="outline" size="lg">
                  Track Your Order
                </Button>
              </Link>
            </div>
            <p className="text-sm text-gray-600">Need help? Contact our support team at support@dropshop.com</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
