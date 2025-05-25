"use client"
import Link from "next/link"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { User, Menu, Heart, Search } from "lucide-react"
import { CartDrawer } from "@/components/cart-drawer"
import { useAuth } from "@/lib/auth-context"
import { AuthModal } from "@/components/auth-modal"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function Header() {
  const { user, userData, logout, isAdmin } = useAuth()
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "signup">("login")
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchTerm.trim())}`)
      setSearchTerm("")
    }
  }

  const handleCategoryClick = (category: string) => {
    router.push(`/products?category=${category}`)
  }

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-2 text-sm border-b">
          <div className="text-gray-600">Free shipping on orders over $50 | 30-day returns</div>
          <div className="flex items-center gap-4">
            <Link href="/track-order" className="text-gray-600 hover:text-gray-900">
              Track Order
            </Link>
            <Link href="/help" className="text-gray-600 hover:text-gray-900">
              Help
            </Link>
          </div>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              DropShop
            </Link>

            <nav className="hidden lg:flex items-center gap-6">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 hover:text-blue-600">
                  Categories
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleCategoryClick("electronics")}>Electronics</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleCategoryClick("home-garden")}>Home & Garden</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleCategoryClick("fashion")}>Fashion</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleCategoryClick("sports-fitness")}>
                    Sports & Fitness
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleCategoryClick("beauty-health")}>
                    Beauty & Health
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleCategoryClick("automotive")}>Automotive</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link href="/products?filter=deals" className="hover:text-blue-600">
                Hot Deals
              </Link>
              <Link href="/products?sort=newest" className="hover:text-blue-600">
                New Arrivals
              </Link>
              <Link href="/about" className="hover:text-blue-600">
                About
              </Link>
            </nav>
          </div>

          <div className="flex-1 max-w-xl mx-8 hidden md:block">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search for products..."
                className="pl-10 pr-4"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Heart className="h-5 w-5" />
            </Button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <div className="flex flex-col">
                      <span className="font-medium">{userData?.displayName || "User"}</span>
                      <span className="text-sm text-gray-500">{user.email}</span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/orders")}>My Orders</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/wishlist")}>Wishlist</DropdownMenuItem>
                  {isAdmin && (
                    <>
                      <DropdownMenuItem onClick={() => router.push("/admin")}>Admin Panel</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => router.push("/admin/seed")}>Seed Data</DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuItem onClick={logout}>Sign Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => {
                      setAuthMode("login")
                      setAuthModalOpen(true)
                    }}
                  >
                    Sign In
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setAuthMode("signup")
                      setAuthModalOpen(true)
                    }}
                  >
                    Create Account
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} defaultMode={authMode} />

            <CartDrawer />

            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
