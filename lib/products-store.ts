import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

export interface Product {
  id: string
  name: string
  sku: string
  brand: string
  category: string
  price: number
  stock: number
  description: string
  imageUrl: string
  available: boolean
  installationRequired: boolean
}

interface ProductStats {
  totalProducts: number
  availableProducts: number
  totalValue: number
  lowStockProducts: number
  totalCategories: number
}

interface ProductState {
  products: Product[]
  addProduct: (product: Omit<Product, "id">) => void
  updateProduct: (id: string, updatedProduct: Omit<Product, "id">) => void
  deleteProduct: (id: string) => void
  getStats: () => ProductStats
  importProducts: (newProducts: Product[], overwrite: boolean) => void
}

const initialProducts: Product[] = [
  {
    id: "1",
    name: "Filtro de Agua para Refrigerador",
    sku: "FLT-WTR-001",
    brand: "Samsung",
    category: "Refrigerador",
    price: 850.5,
    stock: 15,
    description: "Filtro de agua de carbón activado para refrigeradores Samsung. Modelo HAF-CIN/EXP.",
    imageUrl: "/placeholder.svg?width=100&height=100",
    available: true,
    installationRequired: false,
  },
  {
    id: "2",
    name: "Bomba de Drenaje para Lavadora",
    sku: "PMP-DRN-002",
    brand: "LG",
    category: "Lavadora",
    price: 1200,
    stock: 4,
    description: "Bomba de drenaje universal para lavadoras de carga frontal LG. 120V, 60Hz.",
    imageUrl: "/placeholder.svg?width=100&height=100",
    available: true,
    installationRequired: true,
  },
  {
    id: "3",
    name: "Termostato para Horno Eléctrico",
    sku: "TRM-OVN-003",
    brand: "Whirlpool",
    category: "Horno",
    price: 650,
    stock: 8,
    description: "Termostato de seguridad para hornos eléctricos Whirlpool. Rango de 50-300°C.",
    imageUrl: "/placeholder.svg?width=100&height=100",
    available: true,
    installationRequired: true,
  },
]

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: initialProducts,
      addProduct: (product) =>
        set((state) => ({
          products: [...state.products, { ...product, id: new Date().toISOString() }],
        })),
      updateProduct: (id, updatedProduct) =>
        set((state) => ({
          products: state.products.map((p) => (p.id === id ? { ...updatedProduct, id } : p)),
        })),
      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),
      importProducts: (newProducts, overwrite) => {
        set((state) => {
          if (overwrite) {
            return { products: newProducts }
          }
          // Lógica para fusionar sin duplicados por SKU
          const existingSkus = new Set(state.products.map((p) => p.sku))
          const productsToAdd = newProducts.filter((p) => !existingSkus.has(p.sku))
          return { products: [...state.products, ...productsToAdd] }
        })
      },
      getStats: () => {
        const products = get().products
        const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0)
        const lowStockProducts = products.filter((p) => p.stock < 5).length
        const totalCategories = new Set(products.map((p) => p.category)).size
        return {
          totalProducts: products.length,
          availableProducts: products.filter((p) => p.available).length,
          totalValue,
          lowStockProducts,
          totalCategories,
        }
      },
    }),
    {
      name: "nexu-product-inventory",
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
