import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  limit,
} from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { db, storage } from "./firebase"

export interface Product {
  id?: string
  name: string
  description: string
  price: number
  originalPrice?: number
  category: string
  images: string[]
  badge?: string
  rating: number
  reviews: number
  features: string[]
  specifications: Record<string, string>
  inStock: boolean
  createdAt: Date
  updatedAt: Date
}

export const productsCollection = collection(db, "products")

export async function getProducts(categoryFilter?: string, limitCount?: number) {
  let q = query(productsCollection, orderBy("createdAt", "desc"))

  if (categoryFilter) {
    q = query(q, where("category", "==", categoryFilter))
  }

  if (limitCount) {
    q = query(q, limit(limitCount))
  }

  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[]
}

export async function getProduct(id: string) {
  const docRef = doc(db, "products", id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as Product
  }

  return null
}

export async function addProduct(product: Omit<Product, "id" | "createdAt" | "updatedAt">) {
  const productData = {
    ...product,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const docRef = await addDoc(productsCollection, productData)
  return docRef.id
}

export async function updateProduct(id: string, updates: Partial<Product>) {
  const docRef = doc(db, "products", id)
  await updateDoc(docRef, {
    ...updates,
    updatedAt: new Date(),
  })
}

export async function deleteProduct(id: string) {
  const docRef = doc(db, "products", id)
  await deleteDoc(docRef)
}

export async function uploadProductImage(file: File, productId: string, imageIndex: number): Promise<string> {
  const imageRef = ref(storage, `products/${productId}/image-${imageIndex}`)
  await uploadBytes(imageRef, file)
  return getDownloadURL(imageRef)
}

export async function deleteProductImage(imageUrl: string) {
  const imageRef = ref(storage, imageUrl)
  await deleteObject(imageRef)
}
export const updateProductStock = async (
  productId: string,
  inStock: boolean
) => {
  const productRef = doc(db, "products", productId); // Adjust the collection name as needed
  await updateDoc(productRef, {
    inStock: inStock,
  });
};