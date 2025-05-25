import { collection, doc, addDoc, getDocs, getDoc, updateDoc, query, where, orderBy } from "firebase/firestore"
import { db } from "./firebase"

export interface OrderItem {
  productId: string
  name: string
  price: number
  quantity: number
  image: string
}

export interface ShippingAddress {
  firstName: string
  lastName: string
  address: string
  apartment?: string
  city: string
  state: string
  zipCode: string
  country: string
  phone: string
}

export interface Order {
  id?: string
  userId: string
  userEmail: string
  items: OrderItem[]
  shippingAddress: ShippingAddress
  shippingMethod: string
  paymentMethod: string
  subtotal: number
  shipping: number
  tax: number
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  orderNumber: string
  createdAt: Date
  updatedAt: Date
}

export const ordersCollection = collection(db, "orders")

export async function createOrder(orderData: Omit<Order, "id" | "createdAt" | "updatedAt" | "orderNumber">) {
  const orderNumber = "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase()

  const order = {
    ...orderData,
    orderNumber,
    status: "pending" as const,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const docRef = await addDoc(ordersCollection, order)
  return { id: docRef.id, ...order }
}

export async function getUserOrders(userId: string) {
  const q = query(ordersCollection, where("userId", "==", userId), orderBy("createdAt", "desc"))

  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Order[]
}

export async function getAllOrders() {
  const q = query(ordersCollection, orderBy("createdAt", "desc"))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Order[]
}

export async function getOrder(id: string) {
  const docRef = doc(db, "orders", id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as Order
  }

  return null
}

export async function updateOrderStatus(id: string, status: Order["status"]) {
  const docRef = doc(db, "orders", id)
  await updateDoc(docRef, {
    status,
    updatedAt: new Date(),
  })
}
