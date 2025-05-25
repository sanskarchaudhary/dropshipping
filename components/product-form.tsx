"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { type Product, addProduct, updateProduct, uploadProductImage } from "@/lib/products"
import { X, Upload, Plus } from "lucide-react"
import { useRouter } from "next/navigation"

interface ProductFormProps {
  product?: Product
  onSave: () => void
  onCancel: () => void
}

export function ProductForm({ product, onSave, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    originalPrice: 0,
    category: "",
    badge: "",
    rating: 4.5,
    reviews: 0,
    inStock: true,
    features: [""],
    specifications: { "": "" },
  })
  const [images, setImages] = useState<File[]>([])
  const [existingImages, setExistingImages] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        originalPrice: product.originalPrice || 0,
        category: product.category,
        badge: product.badge || "",
        rating: product.rating,
        reviews: product.reviews,
        inStock: product.inStock,
        features: product.features.length > 0 ? product.features : [""],
        specifications: Object.keys(product.specifications).length > 0 ? product.specifications : { "": "" },
      })
      setExistingImages(product.images || [])
    }
  }, [product])

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features]
    newFeatures[index] = value
    setFormData((prev) => ({ ...prev, features: newFeatures }))
  }

  const addFeature = () => {
    setFormData((prev) => ({ ...prev, features: [...prev.features, ""] }))
  }

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index)
    setFormData((prev) => ({ ...prev, features: newFeatures }))
  }

  const handleSpecificationChange = (key: string, value: string, oldKey?: string) => {
    const newSpecs = { ...formData.specifications }
    if (oldKey && oldKey !== key) {
      delete newSpecs[oldKey]
    }
    newSpecs[key] = value
    setFormData((prev) => ({ ...prev, specifications: newSpecs }))
  }

  const addSpecification = () => {
    setFormData((prev) => ({
      ...prev,
      specifications: { ...prev.specifications, "": "" },
    }))
  }

  const removeSpecification = (key: string) => {
    const newSpecs = { ...formData.specifications }
    delete newSpecs[key]
    setFormData((prev) => ({ ...prev, specifications: newSpecs }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const productData = {
        ...formData,
        features: formData.features.filter((f) => f.trim() !== ""),
        specifications: Object.fromEntries(
          Object.entries(formData.specifications).filter(([k, v]) => k.trim() !== "" && v.trim() !== ""),
        ),
        images: existingImages,
      }

      let productId: string

      if (product?.id) {
        await updateProduct(product.id, productData)
        productId = product.id
      } else {
        productId = await addProduct(productData)
      }

      // Upload new images
      if (images.length > 0) {
        const imageUrls = await Promise.all(
          images.map((image, index) => uploadProductImage(image, productId, existingImages.length + index)),
        )

        await updateProduct(productId, {
          images: [...existingImages, ...imageUrls],
        })
      }

      onSave()
    } catch (error) {
      console.error("Error saving product:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{product ? "Edit Product" : "Add New Product"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Home & Garden">Home & Garden</SelectItem>
                  <SelectItem value="Fashion">Fashion</SelectItem>
                  <SelectItem value="Sports & Fitness">Sports & Fitness</SelectItem>
                  <SelectItem value="Beauty & Health">Beauty & Health</SelectItem>
                  <SelectItem value="Automotive">Automotive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => handleInputChange("price", Number.parseFloat(e.target.value))}
                required
              />
            </div>

            <div>
              <Label htmlFor="originalPrice">Original Price ($)</Label>
              <Input
                id="originalPrice"
                type="number"
                step="0.01"
                value={formData.originalPrice}
                onChange={(e) => handleInputChange("originalPrice", Number.parseFloat(e.target.value))}
              />
            </div>

            <div>
              <Label htmlFor="badge">Badge</Label>
              <Input
                id="badge"
                value={formData.badge}
                onChange={(e) => handleInputChange("badge", e.target.value)}
                placeholder="e.g., Best Seller, Hot Deal"
              />
            </div>

            <div>
              <Label htmlFor="rating">Rating</Label>
              <Input
                id="rating"
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={formData.rating}
                onChange={(e) => handleInputChange("rating", Number.parseFloat(e.target.value))}
              />
            </div>

            <div>
              <Label htmlFor="reviews">Number of Reviews</Label>
              <Input
                id="reviews"
                type="number"
                value={formData.reviews}
                onChange={(e) => handleInputChange("reviews", Number.parseInt(e.target.value))}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="inStock"
                checked={formData.inStock}
                onCheckedChange={(checked) => handleInputChange("inStock", checked)}
              />
              <Label htmlFor="inStock">In Stock</Label>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={4}
              required
            />
          </div>

          {/* Features */}
          <div>
            <Label>Features</Label>
            <div className="space-y-2">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    placeholder="Enter feature"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeFeature(index)}
                    disabled={formData.features.length === 1}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addFeature}>
                <Plus className="h-4 w-4 mr-2" />
                Add Feature
              </Button>
            </div>
          </div>

          {/* Specifications */}
          <div>
            <Label>Specifications</Label>
            <div className="space-y-2">
              {Object.entries(formData.specifications).map(([key, value], index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={key}
                    onChange={(e) => handleSpecificationChange(e.target.value, value, key)}
                    placeholder="Specification name"
                  />
                  <Input
                    value={value}
                    onChange={(e) => handleSpecificationChange(key, e.target.value)}
                    placeholder="Specification value"
                  />
                  <Button type="button" variant="outline" size="sm" onClick={() => removeSpecification(key)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addSpecification}>
                <Plus className="h-4 w-4 mr-2" />
                Add Specification
              </Button>
            </div>
          </div>

          {/* Images */}
          <div>
            <Label>Product Images</Label>
            <div className="space-y-4">
              {existingImages.length > 0 && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">Current Images:</p>
                  <div className="flex gap-2 flex-wrap">
                    {existingImages.map((url, index) => (
                      <Badge key={index} variant="secondary">
                        Image {index + 1}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Input type="file" multiple accept="image/*" onChange={handleImageChange} />
                <Upload className="h-4 w-4" />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Product"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
