import { addProduct } from "./products"

export const seedProducts = async () => {
  const sampleProducts = [
    {
      name: "Wireless Bluetooth Earbuds Pro",
      description:
        "Experience premium sound quality with our latest Wireless Bluetooth Earbuds Pro. Featuring advanced noise cancellation, 30-hour battery life, and crystal-clear audio for all your music and calls.",
      price: 49.99,
      originalPrice: 79.99,
      category: "Electronics",
      images: [
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=400&fit=crop",
      ],
      badge: "Best Seller",
      rating: 4.8,
      reviews: 1247,
      features: [
        "Advanced Active Noise Cancellation",
        "30-hour total battery life",
        "IPX7 Waterproof rating",
        "Touch controls",
        "Fast charging (15 min = 3 hours)",
        "Premium sound drivers",
      ],
      specifications: {
        "Battery Life": "8 hours + 22 hours with case",
        "Charging Time": "1.5 hours",
        "Bluetooth Version": "5.3",
        "Driver Size": "12mm",
        Weight: "4.5g per earbud",
        Warranty: "2 years",
      },
      inStock: true,
    },
    {
      name: "Smart Fitness Watch Ultra",
      description:
        "Track your fitness goals with our advanced Smart Fitness Watch Ultra. Features heart rate monitoring, GPS tracking, and 50+ workout modes.",
      price: 129.99,
      originalPrice: 199.99,
      category: "Electronics",
      images: [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400&h=400&fit=crop",
      ],
      badge: "Hot Deal",
      rating: 4.6,
      reviews: 892,
      features: [
        "Heart Rate Monitoring",
        "GPS Tracking",
        "50+ Workout Modes",
        "7-day Battery Life",
        "Water Resistant",
        "Sleep Tracking",
      ],
      specifications: {
        Display: "1.4 inch AMOLED",
        Battery: "7 days typical use",
        "Water Rating": "5ATM",
        Connectivity: "Bluetooth 5.0",
        Sensors: "Heart rate, GPS, Accelerometer",
        Compatibility: "iOS & Android",
      },
      inStock: true,
    },
    {
      name: "Portable Phone Charger 20000mAh",
      description:
        "Never run out of battery with our high-capacity portable charger. Fast charging technology and multiple device support.",
      price: 24.99,
      originalPrice: 39.99,
      category: "Electronics",
      images: [
        "https://images.unsplash.com/photo-1609592806787-3d9c5b1e8b8d?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop",
      ],
      badge: "Limited Time",
      rating: 4.7,
      reviews: 634,
      features: [
        "20000mAh High Capacity",
        "Fast Charging Technology",
        "Multiple Device Support",
        "LED Power Indicator",
        "Compact Design",
        "Safety Protection",
      ],
      specifications: {
        Capacity: "20000mAh",
        Input: "USB-C 18W",
        Output: "USB-A 22.5W, USB-C 20W",
        "Charging Time": "6-7 hours",
        Weight: "420g",
        Dimensions: "146 x 69 x 29mm",
      },
      inStock: true,
    },
    {
      name: "LED Desk Lamp with USB Charging",
      description:
        "Illuminate your workspace with our modern LED desk lamp featuring adjustable brightness and built-in USB charging port.",
      price: 34.99,
      originalPrice: 54.99,
      category: "Home & Garden",
      images: [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
      ],
      badge: "New Arrival",
      rating: 4.5,
      reviews: 423,
      features: [
        "Adjustable Brightness",
        "USB Charging Port",
        "Touch Controls",
        "Eye-Care Technology",
        "Flexible Arm",
        "Memory Function",
      ],
      specifications: {
        Power: "12W LED",
        Brightness: "10 levels",
        "Color Temperature": "3000K-6500K",
        "USB Output": "5V/1A",
        Material: "Aluminum alloy",
        Warranty: "2 years",
      },
      inStock: true,
    },
    {
      name: "Yoga Mat Premium Non-Slip",
      description:
        "Perfect for all types of yoga and exercise. Made from eco-friendly materials with superior grip and cushioning.",
      price: 19.99,
      originalPrice: 29.99,
      category: "Sports & Fitness",
      images: [
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop",
      ],
      badge: "Eco-Friendly",
      rating: 4.4,
      reviews: 567,
      features: [
        "Non-slip surface",
        "Extra thick cushioning",
        "Eco-friendly materials",
        "Easy to clean",
        "Lightweight and portable",
        "Alignment guides",
      ],
      specifications: {
        Dimensions: '72" x 24"',
        Thickness: "6mm",
        Material: "TPE (Thermoplastic Elastomer)",
        Weight: "2.2 lbs",
        "Care Instructions": "Wipe clean with damp cloth",
        Warranty: "1 year",
      },
      inStock: true,
    },
    {
      name: "Stainless Steel Water Bottle",
      description:
        "Keep your drinks at the perfect temperature with our insulated stainless steel water bottle. Perfect for sports and daily use.",
      price: 14.99,
      originalPrice: 24.99,
      category: "Sports & Fitness",
      images: [
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      ],
      badge: "Popular",
      rating: 4.6,
      reviews: 789,
      features: [
        "Double-wall insulation",
        "Keeps drinks cold for 24 hours",
        "Keeps drinks hot for 12 hours",
        "BPA-free",
        "Leak-proof design",
        "Wide mouth opening",
      ],
      specifications: {
        Capacity: "32 oz (946ml)",
        Material: "18/8 Stainless Steel",
        Height: "10.5 inches",
        Diameter: "3.5 inches",
        Weight: "1.1 lbs",
        "Mouth Opening": "2.16 inches",
      },
      inStock: true,
    },
    {
      name: "Wireless Phone Car Mount",
      description:
        "Secure wireless charging car mount with automatic clamping. Compatible with all Qi-enabled devices.",
      price: 29.99,
      originalPrice: 44.99,
      category: "Automotive",
      images: [
        "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=400&fit=crop",
      ],
      badge: "Trending",
      rating: 4.3,
      reviews: 345,
      features: [
        "Wireless charging",
        "Automatic clamping",
        "360-degree rotation",
        "One-hand operation",
        "Universal compatibility",
        "Secure grip",
      ],
      specifications: {
        "Charging Power": "15W max",
        Compatibility: "4.7-6.8 inch phones",
        "Mount Type": "Air vent & dashboard",
        Material: "ABS + Silicone",
        "Input Voltage": "5V/2A, 9V/1.67A",
        Warranty: "18 months",
      },
      inStock: true,
    },
    {
      name: "Bluetooth Speaker Waterproof",
      description:
        "Portable waterproof Bluetooth speaker with 360-degree sound. Perfect for outdoor adventures and pool parties.",
      price: 39.99,
      originalPrice: 59.99,
      category: "Electronics",
      images: [
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&h=400&fit=crop",
      ],
      badge: "Waterproof",
      rating: 4.7,
      reviews: 912,
      features: [
        "IPX7 waterproof rating",
        "360-degree sound",
        "20-hour battery life",
        "Bluetooth 5.0",
        "Built-in microphone",
        "Compact design",
      ],
      specifications: {
        "Battery Life": "20 hours",
        "Bluetooth Range": "100 feet",
        "Water Rating": "IPX7",
        "Driver Size": "52mm",
        Dimensions: "7.9 x 2.9 x 2.9 inches",
        Weight: "1.3 lbs",
      },
      inStock: true,
    },
  ]

  try {
    for (const product of sampleProducts) {
      await addProduct(product)
      console.log(`Added product: ${product.name}`)
    }
    console.log("Sample products added successfully!")
  } catch (error) {
    console.error("Error adding sample products:", error)
  }
}
