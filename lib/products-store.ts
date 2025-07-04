"use client"

import { useState, useEffect } from "react"

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
  createdAt: string
  updatedAt: string
}

export interface ProductStats {
  total: number
  available: number
  outOfStock: number
  totalValue: number
  categories: Record<string, number>
  brands: Record<string, number>
}

// Productos por defecto para demostración
const defaultProducts: Product[] = [
  {
    id: "1",
    name: "Motor para Lavadora Samsung",
    sku: "MOT-SAM-001",
    brand: "Samsung",
    category: "motores",
    price: 2500,
    stock: 5,
    description: "Motor original para lavadoras Samsung de 15kg. Compatible con modelos WA15F7S2UWW, WA13F5S3QWY.",
    imageUrl: "/placeholder.svg?height=300&width=300",
    available: true,
    installationRequired: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Compresor Refrigerador LG",
    sku: "COMP-LG-002",
    brand: "LG",
    category: "compresores",
    price: 3200,
    stock: 3,
    description: "Compresor hermético para refrigeradores LG. Modelo R134a, 1/4 HP.",
    imageUrl: "/placeholder.svg?height=300&width=300",
    available: true,
    installationRequired: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Resistencia Secadora Whirlpool",
    sku: "RES-WHI-003",
    brand: "Whirlpool",
    category: "resistencias",
    price: 850,
    stock: 8,
    description: "Resistencia de calentamiento para secadoras Whirlpool. 5400W, 240V.",
    imageUrl: "/placeholder.svg?height=300&width=300",
    available: true,
    installationRequired: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Bomba de Agua Bosch",
    sku: "BOMB-BOS-004",
    brand: "Bosch",
    category: "bombas",
    price: 1200,
    stock: 0,
    description: "Bomba de drenaje para lavavajillas Bosch. Incluye filtro y mangueras.",
    imageUrl: "/placeholder.svg?height=300&width=300",
    available: false,
    installationRequired: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

class ProductsStore {
  private products: Product[] = []
  private listeners: (() => void)[] = []

  constructor() {
    this.loadProducts()
  }

  private loadProducts() {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("nexu-products")
      if (stored) {
        try {
          this.products = JSON.parse(stored)
        } catch (error) {
          console.error("Error loading products from localStorage:", error)
          this.products = [...defaultProducts]
          this.saveProducts()
        }
      } else {
        this.products = [...defaultProducts]
        this.saveProducts()
      }
    }
  }

  private saveProducts() {
    if (typeof window !== "undefined") {
      localStorage.setItem("nexu-products", JSON.stringify(this.products))
      this.notifyListeners()
    }
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener())
  }

  subscribe(listener: () => void) {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener)
    }
  }

  getProducts(): Product[] {
    return [...this.products]
  }

  getProduct(id: string): Product | undefined {
    return this.products.find((p) => p.id === id)
  }

  addProduct(product: Omit<Product, "id" | "createdAt" | "updatedAt">): Product {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    this.products.push(newProduct)
    this.saveProducts()
    return newProduct
  }

  updateProduct(id: string, updates: Partial<Omit<Product, "id" | "createdAt">>): Product | null {
    const index = this.products.findIndex((p) => p.id === id)
    if (index === -1) return null

    this.products[index] = {
      ...this.products[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    }
    this.saveProducts()
    return this.products[index]
  }

  deleteProduct(id: string): boolean {
    const index = this.products.findIndex((p) => p.id === id)
    if (index === -1) return false

    this.products.splice(index, 1)
    this.saveProducts()
    return true
  }

  importProducts(products: Omit<Product, "id" | "createdAt" | "updatedAt">[]): Product[] {
    const newProducts = products.map((product) => ({
      ...product,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }))

    this.products.push(...newProducts)
    this.saveProducts()
    return newProducts
  }

  replaceAllProducts(products: Omit<Product, "id" | "createdAt" | "updatedAt">[]): Product[] {
    const newProducts = products.map((product) => ({
      ...product,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }))

    this.products = newProducts
    this.saveProducts()
    return newProducts
  }

  clearProducts(): void {
    this.products = []
    this.saveProducts()
  }

  resetToDefaults(): void {
    this.products = [...defaultProducts]
    this.saveProducts()
  }

  getStats(): ProductStats {
    const stats: ProductStats = {
      total: this.products.length,
      available: this.products.filter((p) => p.available && p.stock > 0).length,
      outOfStock: this.products.filter((p) => p.stock === 0).length,
      totalValue: this.products.reduce((sum, p) => sum + p.price * p.stock, 0),
      categories: {},
      brands: {},
    }

    this.products.forEach((product) => {
      stats.categories[product.category] = (stats.categories[product.category] || 0) + 1
      stats.brands[product.brand] = (stats.brands[product.brand] || 0) + 1
    })

    return stats
  }

  searchProducts(query: string): Product[] {
    const lowercaseQuery = query.toLowerCase()
    return this.products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.sku.toLowerCase().includes(lowercaseQuery) ||
        product.brand.toLowerCase().includes(lowercaseQuery) ||
        product.category.toLowerCase().includes(lowercaseQuery) ||
        product.description.toLowerCase().includes(lowercaseQuery),
    )
  }

  filterProducts(filters: {
    category?: string
    brand?: string
    available?: boolean
    minPrice?: number
    maxPrice?: number
    inStock?: boolean
  }): Product[] {
    return this.products.filter((product) => {
      if (filters.category && product.category !== filters.category) return false
      if (filters.brand && product.brand !== filters.brand) return false
      if (filters.available !== undefined && product.available !== filters.available) return false
      if (filters.minPrice !== undefined && product.price < filters.minPrice) return false
      if (filters.maxPrice !== undefined && product.price > filters.maxPrice) return false
      if (filters.inStock !== undefined && product.stock > 0 !== filters.inStock) return false
      return true
    })
  }

  exportToJSON(): string {
    return JSON.stringify(this.products, null, 2)
  }

  exportToCSV(): string {
    if (this.products.length === 0) return ""

    const headers = [
      "id",
      "name",
      "sku",
      "brand",
      "category",
      "price",
      "stock",
      "description",
      "imageUrl",
      "available",
      "installationRequired",
      "createdAt",
      "updatedAt",
    ]

    const csvContent = [
      headers.join(","),
      ...this.products.map((product) =>
        headers
          .map((header) => {
            const value = product[header as keyof Product]
            // Escapar comillas y envolver en comillas si contiene comas
            if (typeof value === "string" && (value.includes(",") || value.includes('"'))) {
              return `"${value.replace(/"/g, '""')}"`
            }
            return value
          })
          .join(","),
      ),
    ].join("\n")

    return csvContent
  }
}

// Instancia singleton
export const productsStore = new ProductsStore()

// Hook para usar el store en componentes de React
export function useProductStore() {
  const [storeState, setStoreState] = useState(() => ({
    products: productsStore.getProducts(),
    stats: productsStore.getStats(),
  }))

  useEffect(() => {
    const handleStoreChange = () => {
      setStoreState({
        products: productsStore.getProducts(),
        stats: productsStore.getStats(),
      })
    }

    const unsubscribe = productsStore.subscribe(handleStoreChange)
    handleStoreChange()

    return () => {
      unsubscribe()
    }
  }, [])

  return {
    ...storeState,
    // Devolvemos los métodos bindeados para asegurar el contexto correcto de `this`
    getProducts: productsStore.getProducts.bind(productsStore),
    getProduct: productsStore.getProduct.bind(productsStore),
    addProduct: productsStore.addProduct.bind(productsStore),
    updateProduct: productsStore.updateProduct.bind(productsStore),
    deleteProduct: productsStore.deleteProduct.bind(productsStore),
    importProducts: productsStore.importProducts.bind(productsStore),
    replaceAllProducts: productsStore.replaceAllProducts.bind(productsStore),
    clearProducts: productsStore.clearProducts.bind(productsStore),
    resetToDefaults: productsStore.resetToDefaults.bind(productsStore),
    searchProducts: productsStore.searchProducts.bind(productsStore),
    filterProducts: productsStore.filterProducts.bind(productsStore),
    exportToJSON: productsStore.exportToJSON.bind(productsStore),
    exportToCSV: productsStore.exportToCSV.bind(productsStore),
  }
}
