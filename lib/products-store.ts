import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

export interface Product {
  id: string
  name: string
  brand: string
  model: string
  category: string
  stock: number
  price: number
  sku: string
  compatibility: string[]
}

interface ProductState {
  products: Product[]
  addProduct: (product: Product) => void
  addMultipleProducts: (products: Product[]) => void
  updateProduct: (id: string, updatedProduct: Partial<Product>) => void
  deleteProduct: (id: string) => void
  getProductById: (id: string) => Product | undefined
  setProducts: (products: Product[]) => void
  clearProducts: () => void
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: [],
      addProduct: (product) =>
        set((state) => ({
          products: [...state.products, product],
        })),
      addMultipleProducts: (newProducts) =>
        set((state) => {
          const existingIds = new Set(state.products.map((p) => p.id))
          const uniqueNewProducts = newProducts.filter((p) => !existingIds.has(p.id))
          return { products: [...state.products, ...uniqueNewProducts] }
        }),
      updateProduct: (id, updatedProduct) =>
        set((state) => ({
          products: state.products.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p)),
        })),
      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),
      getProductById: (id) => get().products.find((p) => p.id === id),
      setProducts: (products) => set({ products }),
      clearProducts: () => set({ products: [] }),
    }),
    {
      name: "product-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)
