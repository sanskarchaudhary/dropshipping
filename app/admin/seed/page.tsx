"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminGuard } from "@/components/admin-guard"
import { seedProducts } from "@/lib/seed-data"

export default function SeedDataPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSeedProducts = async () => {
    setLoading(true)
    setMessage("")

    try {
      await seedProducts()
      setMessage("Sample products added successfully!")
    } catch (error) {
      setMessage("Error adding sample products. Check console for details.")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Seed Sample Data</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">This will add sample products to your store for testing purposes.</p>

              <Button onClick={handleSeedProducts} disabled={loading} className="w-full">
                {loading ? "Adding Products..." : "Add Sample Products"}
              </Button>

              {message && (
                <div
                  className={`p-3 rounded ${
                    message.includes("Error") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                  }`}
                >
                  {message}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminGuard>
  )
}
