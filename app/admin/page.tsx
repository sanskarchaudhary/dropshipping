"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { AdminGuard } from "@/components/admin-guard";
import { ProductForm } from "@/components/product-form";
import {
  type Product,
  getProducts,
  deleteProduct,
  updateProductStock,
} from "@/lib/products";
import { getAllOrders, type Order } from "@/lib/orders";
import {
  Plus,
  Edit,
  Trash2,
  Package,
  ShoppingCart,
  Users,
  DollarSign,
} from "lucide-react";
import Image from "next/image";
import { doc, updateDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase"; // Adjust the import based on your project structure

type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [productsData, ordersData] = await Promise.all([
        getProducts(),
        getAllOrders(),
      ]);
      setProducts(productsData);
      setOrders(ordersData);

      // Calculate initial total revenue
      const initialRevenue = ordersData.reduce(
        (sum, order) => sum + order.total,
        0
      );
      setTotalRevenue(initialRevenue);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        await loadData();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleStockUpdate = async (productId: string, inStock: boolean) => {
    await updateProductStock(productId, inStock);
    await loadData();
  };

  const handleProductSave = async () => {
    setShowProductForm(false);
    setEditingProduct(undefined);
    await loadData();
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    totalProducts: products.length,
    totalOrders: orders.length,
    totalRevenue: totalRevenue,
    pendingOrders: orders.filter((order) => order.status === "pending").length,
  };

  const getNextStatus = (currentStatus: OrderStatus): OrderStatus => {
    switch (currentStatus) {
      case "pending":
        return "shipped";
      case "shipped":
        return "delivered";
      case "delivered":
        return "cancelled";
      case "cancelled":
        return "pending";
      default:
        return "pending";
    }
  };

  const updateOrderStatusHandler = async (
    orderId: string,
    newStatus: OrderStatus
  ) => {
    try {
      const currentOrder = orders.find((order) => order.id === orderId);
      if (!currentOrder) {
        console.error("Order not found");
        return;
      }

      // Calculate loss if the order is being cancelled
      if (newStatus === "cancelled") {
        const loss = currentOrder.total; // Total amount of the order
        const deliveryCharges = currentOrder.deliveryCharges || 0; // Now valid
        const tax = currentOrder.tax || 0; // Now valid

        const totalLoss = loss + deliveryCharges + tax;
        console.log(`Total loss calculated: ${totalLoss}`);

        // Update total revenue, ensuring it doesn't go negative
        setTotalRevenue((prevRevenue) => {
          const newRevenue = prevRevenue - totalLoss;
          if (newRevenue < 0) {
            console.warn("Revenue cannot be negative. Setting to 0.");
            return 0; // Prevent negative revenue
          }
          console.log(
            `Previous Revenue: ${prevRevenue}, New Revenue: ${newRevenue}`
          );
          return newRevenue;
        });
      }

      console.log(`Updating order ${orderId} to status ${newStatus}`);
      await updateOrderStatus(orderId, newStatus); // Update Firestore
      console.log("Order status updated successfully");
      await loadData(); // Reload data to reflect changes
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-200 text-yellow-800";
      case "shipped":
        return "bg-blue-200 text-blue-800";
      case "delivered":
        return "bg-green-200 text-green-800";
      case "cancelled":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  if (loading) {
    return (
      <AdminGuard>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading admin panel...</p>
          </div>
        </div>
      </AdminGuard>
    );
  }

  if (showProductForm) {
    return (
      <AdminGuard>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <ProductForm
              product={editingProduct}
              onSave={handleProductSave}
              onCancel={() => {
                setShowProductForm(false);
                setEditingProduct(undefined);
              }}
            />
          </div>
        </div>
      </AdminGuard>
    );
  }

  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your dropshipping store</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Products</p>
                    <p className="text-2xl font-bold">{stats.totalProducts}</p>
                  </div>
                  <Package className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Orders</p>
                    <p className="text-2xl font-bold">{stats.totalOrders}</p>
                  </div>
                  <ShoppingCart className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold">
                      ${stats.totalRevenue.toFixed(2)}
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Pending Orders</p>
                    <p className="text-2xl font-bold">{stats.pendingOrders}</p>
                  </div>
                  <Users className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products Management */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Products Management</CardTitle>
                <Button onClick={() => setShowProductForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-md"
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Product</th>
                      <th className="text-left p-4">Category</th>
                      <th className="text-left p-4">Price</th>
                      <th className="text-left p-4">Stock</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="border-b">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-gray-100">
                              <Image
                                src={product.images[0] || "/placeholder.svg"}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium">{product.name}</p>
                              {product.badge && (
                                <Badge variant="secondary" className="mt-1">
                                  {product.badge}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="p-4">{product.category}</td>
                        <td className="p-4">
                          <div>
                            <span className="font-bold">${product.price}</span>
                            {product.originalPrice && (
                              <span className="text-gray-500 line-through ml-2">
                                ${product.originalPrice}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() =>
                              handleStockUpdate(product.id!, !product.inStock)
                            }
                            className={`inline-block px-3 py-1 rounded-full cursor-pointer ${
                              product.inStock ? "bg-green-200" : "bg-red-200"
                            }`}
                          >
                            {product.inStock
                              ? "Set Out of Stock"
                              : "Set In Stock"}
                          </button>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setEditingProduct(product);
                                setShowProductForm(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteProduct(product.id!)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Order #</th>
                      <th className="text-left p-4">Customer</th>
                      <th className="text-left p-4">Total</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 10).map((order) => (
                      <tr key={order.id} className="border-b">
                        <td className="p-4 font-mono">{order.orderNumber}</td>
                        <td className="p-4">{order.userEmail}</td>
                        <td className="p-4 font-bold">
                          ${order.total.toFixed(2)}
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => {
                              const nextStatus = getNextStatus(
                                order.status as OrderStatus
                              );
                              if (order.id) {
                                updateOrderStatusHandler(order.id, nextStatus);
                              } else {
                                console.error("Order ID is undefined");
                              }
                            }}
                            className={`inline-block px-3 py-1 rounded-full cursor-pointer ${getStatusClass(
                              order.status
                            )}`}
                          >
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </button>
                        </td>
                        <td className="p-4">
                          {order.createdAt instanceof Timestamp
                            ? new Date(
                                order.createdAt.seconds * 1000
                              ).toLocaleDateString()
                            : "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Total Revenue Card */}
          <Card>
            <CardContent>
              <h2 className="text-lg font-bold">Total Revenue</h2>
              <p>${totalRevenue.toFixed(2)}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminGuard>
  );
}

export const updateOrderStatus = async (
  orderId: string,
  newStatus: OrderStatus
) => {
  const orderRef = doc(db, "orders", orderId); // Adjust the collection name if necessary
  await updateDoc(orderRef, {
    status: newStatus,
  });
};
