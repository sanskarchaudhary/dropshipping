"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Package, Truck, MapPin, Clock, CheckCircle, Search } from "lucide-react"

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("")
  const [email, setEmail] = useState("")
  const [trackingResult, setTrackingResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setTrackingResult(null)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock tracking data
    if (orderNumber.toLowerCase().includes("ord-") || orderNumber.length > 5) {
      const mockTrackingData = {
        orderNumber: orderNumber.toUpperCase(),
        status: "shipped",
        estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        trackingNumber: "1Z999AA1234567890",
        carrier: "UPS",
        items: [
          {
            name: "Wireless Bluetooth Earbuds Pro",
            quantity: 1,
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=100&h=100&fit=crop",
          },
          {
            name: "Smart Fitness Watch Ultra",
            quantity: 1,
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop",
          },
        ],
        timeline: [
          {
            status: "Order Placed",
            date: "2024-01-15",
            time: "10:30 AM",
            location: "Online",
            completed: true,
          },
          {
            status: "Order Confirmed",
            date: "2024-01-15",
            time: "11:15 AM",
            location: "Warehouse",
            completed: true,
          },
          {
            status: "Shipped",
            date: "2024-01-16",
            time: "2:45 PM",
            location: "Distribution Center",
            completed: true,
          },
          {
            status: "In Transit",
            date: "2024-01-17",
            time: "8:00 AM",
            location: "Local Facility",
            completed: true,
          },
          {
            status: "Out for Delivery",
            date: "2024-01-18",
            time: "9:00 AM",
            location: "Delivery Vehicle",
            completed: false,
          },
          {
            status: "Delivered",
            date: "2024-01-18",
            time: "Expected by 6:00 PM",
            location: "Your Address",
            completed: false,
          },
        ],
        shippingAddress: {
          name: "John Doe",
          address: "123 Main Street",
          city: "New York",
          state: "NY",
          zipCode: "10001",
        },
      }
      setTrackingResult(mockTrackingData)
    } else {
      setError("Order not found. Please check your order number and email address.")
    }

    setLoading(false)
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-500"
      case "shipped":
      case "in transit":
      case "out for delivery":
        return "bg-blue-500"
      case "processing":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Track Your Order</h1>
            <p className="text-gray-600">Enter your order details to track your shipment</p>
          </div>

          {/* Track Order Form */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Order Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTrackOrder} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="orderNumber">Order Number</Label>
                    <Input
                      id="orderNumber"
                      placeholder="e.g., ORD-ABC123456"
                      value={orderNumber}
                      onChange={(e) => setOrderNumber(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {error && <div className="text-red-600 text-sm bg-red-50 p-3 rounded">{error}</div>}

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Tracking..." : "Track Order"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Tracking Results */}
          {trackingResult && (
            <div className="space-y-6">
              {/* Order Status Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Order {trackingResult.orderNumber}</span>
                    <Badge className={getStatusColor(trackingResult.status)}>
                      {trackingResult.status.charAt(0).toUpperCase() + trackingResult.status.slice(1)}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="flex items-center gap-3">
                      <Package className="h-8 w-8 text-blue-600" />
                      <div>
                        <p className="font-medium">Tracking Number</p>
                        <p className="text-sm text-gray-600">{trackingResult.trackingNumber}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Truck className="h-8 w-8 text-green-600" />
                      <div>
                        <p className="font-medium">Carrier</p>
                        <p className="text-sm text-gray-600">{trackingResult.carrier}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-8 w-8 text-purple-600" />
                      <div>
                        <p className="font-medium">Estimated Delivery</p>
                        <p className="text-sm text-gray-600">{trackingResult.estimatedDelivery}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Order Items */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trackingResult.items.map((item: any, index: number) => (
                      <div key={index} className="flex items-center gap-4">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trackingResult.timeline.map((event: any, index: number) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-4 h-4 rounded-full ${event.completed ? "bg-green-500" : "bg-gray-300"}`} />
                          {index < trackingResult.timeline.length - 1 && <div className="w-0.5 h-8 bg-gray-200 mt-2" />}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex items-center justify-between">
                            <h4 className={`font-medium ${event.completed ? "text-green-700" : "text-gray-500"}`}>
                              {event.status}
                            </h4>
                            {event.completed && <CheckCircle className="h-5 w-5 text-green-500" />}
                          </div>
                          <p className="text-sm text-gray-600">
                            {event.date} at {event.time}
                          </p>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {event.location}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Address</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm">
                    <p className="font-medium">{trackingResult.shippingAddress.name}</p>
                    <p>{trackingResult.shippingAddress.address}</p>
                    <p>
                      {trackingResult.shippingAddress.city}, {trackingResult.shippingAddress.state}{" "}
                      {trackingResult.shippingAddress.zipCode}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Help Section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Can't find your order?</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Make sure you're using the correct order number and email address. Order numbers typically start
                    with "ORD-".
                  </p>
                  <Button variant="outline" size="sm">
                    Contact Support
                  </Button>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Delivery Issues?</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    If your package is marked as delivered but you haven't received it, please check with neighbors or
                    your building management.
                  </p>
                  <Button variant="outline" size="sm">
                    Report Issue
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
