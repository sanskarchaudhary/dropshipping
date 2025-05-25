"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useCartStore } from "@/lib/cart-store"
import { Heart, ShoppingCart, X, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { getProducts } from "@/lib/products"

export default function WishlistPage() {
  const addItem = useCartStore((state) => state.addItem)
  const router = useRouter()

  // Mock wishlist data - in a real app, this would come from user's saved items
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Wireless Bluetooth Earbuds Pro",
      price: 49.99,
      originalPrice: 79.99,
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&h=300&fit=crop",
      category: "Electronics",
      rating: 4.8,
      reviews: 1247,
      badge: "Best Seller",
      inStock: true,
    },
    {
      id: 2,
      name: "Smart Fitness Watch Ultra",
      price: 129.99,
      originalPrice: 199.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
      category: "Electronics",
      rating: 4.6,
      reviews: 892,
      badge: "Hot Deal",
      inStock: true,
    },
    {
      id: 3,
      name: "LED Desk Lamp with USB Charging",
      price: 34.99,
      originalPrice: 54.99,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
      category: "Home & Garden",
      rating: 4.5,
      reviews: 423,
      badge: "New Arrival",
      inStock: false,
    },
  ])

  const [suggestedProducts, setSuggestedProducts] = useState<any[]>([])
  const [loadingSuggestions, setLoadingSuggestions] = useState(true)

  useEffect(() => {
    const loadSuggestedProducts = async () => {
      try {
        const products = await getProducts(undefined, 8) // Get 8 suggested products
        setSuggestedProducts(
          products.filter(
            (product) => !wishlistItems.some((wishlistItem) => wishlistItem.id === Number.parseInt(product.id)),
          ),
        )
      } catch (error) {
        console.error("Error loading suggested products:", error)
      } finally {
        setLoadingSuggestions(false)
      }
    }

    loadSuggestedProducts()
  }, [wishlistItems])

  const removeFromWishlist = (id: number) => {
    setWishlistItems((items) => items.filter((item) => item.id !== id))
  }

  const addToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      originalPrice: item.originalPrice,
      image: item.image,
      category: item.category,
    })
  }

  const moveAllToCart = () => {
    wishlistItems.forEach((item) => {
      if (item.inStock) {
        addToCart(item)
      }
    })
    setWishlistItems((items) => items.filter((item) => !item.inStock))
  }

  const handleQuickView = (productId: number) => {
    router.push(`/product/${productId}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
              <p className="text-gray-600">{wishlistItems.length} items saved for later</p>
            </div>
            {wishlistItems.length > 0 && (
              <Button onClick={moveAllToCart} className="hidden md:flex">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add All to Cart
              </Button>
            )}
          </div>

          {wishlistItems.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Your wishlist is empty</h3>
                <p className="text-gray-600 mb-6">Save items you love to your wishlist</p>
                <Link href="/products">
                  <Button>Browse Products</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Mobile Add All Button */}
              <div className="md:hidden mb-6">
                <Button onClick={moveAllToCart} className="w-full">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add All to Cart
                </Button>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {wishlistItems.map((item) => (
                  <Card key={item.id} className="group hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-0">
                      <div className="relative" onClick={() => handleQuickView(item.id)}>
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={300}
                          height={300}
                          className="w-full h-64 object-cover rounded-t-lg"
                        />
                        {item.badge && (
                          <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">{item.badge}</Badge>
                        )}
                        <Button
                          size="sm"
                          variant="secondary"
                          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                          onClick={(e) => {
                            e.stopPropagation()
                            removeFromWishlist(item.id)
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        {!item.inStock && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-t-lg flex items-center justify-center">
                            <Badge variant="destructive">Out of Stock</Badge>
                          </div>
                        )}
                      </div>
                      <div className="p-4 space-y-3" onClick={() => handleQuickView(item.id)}>
                        <div className="text-sm text-gray-500">{item.category}</div>
                        <h3 className="font-semibold text-lg group-hover:text-blue-600 transition-colors line-clamp-2">
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium ml-1">{item.rating}</span>
                          </div>
                          <span className="text-sm text-gray-500">({item.reviews})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-blue-600">${item.price}</span>
                          {item.originalPrice && (
                            <span className="text-lg text-gray-500 line-through">${item.originalPrice}</span>
                          )}
                        </div>
                      </div>
                      <div className="px-4 pb-4">
                        <div className="flex gap-2">
                          <Button
                            className="flex-1"
                            onClick={(e) => {
                              e.stopPropagation()
                              addToCart(item)
                            }}
                            disabled={!item.inStock}
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            {item.inStock ? "Add to Cart" : "Out of Stock"}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              removeFromWishlist(item.id)
                            }}
                          >
                            <Heart className="h-4 w-4 fill-current text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Product Suggestions */}
              <div className="mt-16">
                <h2 className="text-2xl font-bold mb-6">You might also like</h2>

                {loadingSuggestions ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Card key={i} className="animate-pulse">
                        <CardContent className="p-0">
                          <div className="bg-gray-200 h-64 rounded-t-lg"></div>
                          <div className="p-4 space-y-3">
                            <div className="bg-gray-200 h-4 rounded"></div>
                            <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                            <div className="bg-gray-200 h-6 rounded w-1/2"></div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : suggestedProducts.length > 0 ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {suggestedProducts.slice(0, 4).map((product) => (
                      <Card key={product.id} className="group hover:shadow-lg transition-shadow cursor-pointer">
                        <CardContent className="p-0">
                          <div className="relative" onClick={() => router.push(`/product/${product.id}`)}>
                            <Image
                              src={
                                product.images?.[0] ||
                                "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop" ||
                                "/placeholder.svg"
                              }
                              alt={product.name}
                              width={300}
                              height={300}
                              className="w-full h-64 object-cover rounded-t-lg"
                            />
                            {product.badge && (
                              <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">
                                {product.badge}
                              </Badge>
                            )}
                          </div>
                          <div className="p-4 space-y-3" onClick={() => router.push(`/product/${product.id}`)}>
                            <div className="text-sm text-gray-500">{product.category}</div>
                            <h3 className="font-semibold text-lg group-hover:text-blue-600 transition-colors line-clamp-2">
                              {product.name}
                            </h3>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-medium ml-1">{product.rating}</span>
                              </div>
                              <span className="text-sm text-gray-500">({product.reviews})</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                              {product.originalPrice && (
                                <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                              )}
                            </div>
                          </div>
                          <div className="px-4 pb-4">
                            <Button
                              className="w-full"
                              onClick={(e) => {
                                e.stopPropagation()
                                addItem({
                                  id: product.id,
                                  name: product.name,
                                  price: product.price,
                                  originalPrice: product.originalPrice,
                                  image:
                                    product.images?.[0] ||
                                    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
                                  category: product.category,
                                })
                              }}
                            >
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              Add to Cart
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-gray-600 mb-6">Discover more products in our catalog</p>
                    <Link href="/products">
                      <Button variant="outline">Browse All Products</Button>
                    </Link>
                  </div>
                )}

                <div className="text-center mt-8">
                  <Link href="/products">
                    <Button variant="outline">View All Products</Button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
