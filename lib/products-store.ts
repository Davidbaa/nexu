"use client"

import React from "react"

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
  totalProducts: number
  availableProducts: number
  totalValue: number
  lowStockProducts: number
  totalCategories: number
}

// Productos por defecto
const defaultProducts: Product[] = [
  {
    id: "1",
    name: "Motor de Lavadora LG",
    sku: "LG-MOT-001",
    brand: "LG",
    category: "Lavadora",
    price: 2500,
    stock: 5,
    description: "Motor original para lavadoras LG. Compatible con modelos WM2016CW, WM2101HW, WM2301HR.",
    imageUrl: "/placeholder.svg?height=300&width=300",
    available: true,
    installationRequired: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Compresor Refrigerador Samsung",
    sku: "SAM-COMP-002",
    brand: "Samsung",
    category: "Refrigerador",
    price: 4200,
    stock: 3,
    description: "Compresor original Samsung para refrigeradores de 18-22 pies cúbicos.",
    imageUrl: "/placeholder.svg?height=300&width=300",
    available: true,
    installationRequired: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Resistencia Horno Whirlpool",
    sku: "WHP-RES-003",
    brand: "Whirlpool",
    category: "Horno",
    price: 850,
    stock: 8,
    description: "Resistencia de calentamiento para hornos Whirlpool. 2500W.",
    imageUrl: "/placeholder.svg?height=300&width=300",
    available: true,
    installationRequired: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

class ProductsStore {
  private storageKey = "nexu_products"
  private listeners: (() => void)[] = []

  // Suscribirse a cambios
  subscribe(listener: () => void) {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener)
    }
  }

  // Notificar cambios
  private notify() {
    this.listeners.forEach((listener) => listener())
  }

  // Obtener productos
  getProducts(): Product[] {
    if (typeof window === "undefined") return defaultProducts

    try {
      const stored = localStorage.getItem(this.storageKey)
      if (stored) {
        return JSON.parse(stored)
      }

      // Si no hay productos guardados, usar los por defecto
      this.saveProducts(defaultProducts)
      return defaultProducts
    } catch {
      return defaultProducts
    }
  }

  // Guardar productos
  saveProducts(products: Product[]): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(this.storageKey, JSON.stringify(products))
      this.notify()
    }
  }

  // Importar productos desde JSON
  importFromJSON(jsonData: string): { success: boolean; message: string; imported: number } {
    try {
      const data = JSON.parse(jsonData)

      if (!Array.isArray(data)) {
        return { success: false, message: "El JSON debe contener un array de productos", imported: 0 }
      }

      const validProducts: Product[] = []

      for (const item of data) {
        // Validar campos requeridos
        if (!item.name || !item.sku || !item.price) {
          continue
        }

        const product: Product = {
          id: item.id || Date.now().toString() + Math.random().toString(36).substr(2, 9),
          name: item.name,
          sku: item.sku,
          brand: item.brand || "Sin marca",
          category: item.category || "General",
          price: Number(item.price) || 0,
          stock: Number(item.stock) || 0,
          description: item.description || "",
          imageUrl: item.imageUrl || "/placeholder.svg?height=300&width=300",
          available: item.available !== false,
          installationRequired: item.installationRequired === true,
          createdAt: item.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

        validProducts.push(product)
      }

      if (validProducts.length > 0) {
        this.saveProducts(validProducts)
        return {
          success: true,
          message: `${validProducts.length} productos importados correctamente`,
          imported: validProducts.length,
        }
      } else {
        return { success: false, message: "No se encontraron productos válidos", imported: 0 }
      }
    } catch (error) {
      return { success: false, message: "Error al procesar el JSON: " + error, imported: 0 }
    }
  }

  // Exportar productos a JSON
  exportToJSON(): string {
    const products = this.getProducts()
    return JSON.stringify(products, null, 2)
  }

  // Importar desde CSV
  importFromCSV(csvData: string): { success: boolean; message: string; imported: number } {
    try {
      const lines = csvData.trim().split("\n")
      if (lines.length < 2) {
        return {
          success: false,
          message: "El CSV debe tener al menos una fila de encabezados y una de datos",
          imported: 0,
        }
      }

      const headers = lines[0].split(",").map((h) => h.trim().toLowerCase())
      const products: Product[] = []

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(",").map((v) => v.trim())

        if (values.length !== headers.length) continue

        const productData: any = {}
        headers.forEach((header, index) => {
          productData[header] = values[index]
        })

        // Mapear campos comunes
        const nameField = headers.find((h) => h.includes("name") || h.includes("nombre"))
        const skuField = headers.find((h) => h.includes("sku") || h.includes("codigo"))
        const priceField = headers.find((h) => h.includes("price") || h.includes("precio"))

        if (!nameField || !skuField || !priceField) continue

        const product: Product = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          name: productData[nameField] || "",
          sku: productData[skuField] || "",
          brand: productData[headers.find((h) => h.includes("brand") || h.includes("marca")) || ""] || "Sin marca",
          category:
            productData[headers.find((h) => h.includes("category") || h.includes("categoria")) || ""] || "General",
          price: Number(productData[priceField]) || 0,
          stock: Number(productData[headers.find((h) => h.includes("stock") || h.includes("inventario")) || ""]) || 0,
          description:
            productData[headers.find((h) => h.includes("description") || h.includes("descripcion")) || ""] || "",
          imageUrl:
            productData[headers.find((h) => h.includes("image") || h.includes("imagen")) || ""] ||
            "/placeholder.svg?height=300&width=300",
          available:
            productData[headers.find((h) => h.includes("available") || h.includes("disponible")) || ""] !== "false",
          installationRequired:
            productData[headers.find((h) => h.includes("installation") || h.includes("instalacion")) || ""] === "true",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

        if (product.name && product.sku && product.price > 0) {
          products.push(product)
        }
      }

      if (products.length > 0) {
        this.saveProducts(products)
        return {
          success: true,
          message: `${products.length} productos importados desde CSV`,
          imported: products.length,
        }
      } else {
        return { success: false, message: "No se encontraron productos válidos en el CSV", imported: 0 }
      }
    } catch (error) {
      return { success: false, message: "Error al procesar el CSV: " + error, imported: 0 }
    }
  }

  // Exportar a CSV
  exportToCSV(): string {
    const products = this.getProducts()
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
      ...products.map((product) =>
        headers
          .map((header) => {
            const value = product[header as keyof Product]
            return typeof value === "string" && value.includes(",") ? `"${value}"` : String(value)
          })
          .join(","),
      ),
    ].join("\n")

    return csvContent
  }

  // Métodos existentes
  addProduct(productData: Omit<Product, "id" | "createdAt" | "updatedAt">): Product {
    const products = this.getProducts()
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    products.push(newProduct)
    this.saveProducts(products)
    return newProduct
  }

  updateProduct(id: string, updates: Partial<Omit<Product, "id" | "createdAt">>): Product | null {
    const products = this.getProducts()
    const index = products.findIndex((p) => p.id === id)

    if (index === -1) return null

    products[index] = {
      ...products[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    this.saveProducts(products)
    return products[index]
  }

  deleteProduct(id: string): boolean {
    const products = this.getProducts()
    const filteredProducts = products.filter((p) => p.id !== id)

    if (filteredProducts.length === products.length) return false

    this.saveProducts(filteredProducts)
    return true
  }

  getProductById(id: string): Product | null {
    const products = this.getProducts()
    return products.find((p) => p.id === id) || null
  }

  searchProducts(query: string): Product[] {
    const products = this.getProducts()
    const lowercaseQuery = query.toLowerCase()

    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(lowercaseQuery) ||
        p.brand.toLowerCase().includes(lowercaseQuery) ||
        p.sku.toLowerCase().includes(lowercaseQuery) ||
        p.description.toLowerCase().includes(lowercaseQuery),
    )
  }

  getStats(): ProductStats {
    const products = this.getProducts()
    return {
      totalProducts: products.length,
      availableProducts: products.filter((p) => p.available).length,
      totalValue: products.reduce((sum, p) => sum + p.price * p.stock, 0),
      lowStockProducts: products.filter((p) => p.stock < 5).length,
      totalCategories: new Set(products.map((p) => p.category)).size,
    }
  }

  // Limpiar todos los productos
  clearAllProducts(): void {
    this.saveProducts([])
  }

  // Resetear a productos por defecto
  resetToDefault(): void {
    this.saveProducts(defaultProducts)
  }
}

export const productsStore = new ProductsStore()

// Hook para React
export function useProductStore() {
  const [products, setProducts] = React.useState<Product[]>([])

  React.useEffect(() => {
    setProducts(productsStore.getProducts())

    const unsubscribe = productsStore.subscribe(() => {
      setProducts(productsStore.getProducts())
    })

    return unsubscribe
  }, [])

  return {
    products,
    addProduct: productsStore.addProduct.bind(productsStore),
    updateProduct: productsStore.updateProduct.bind(productsStore),
    deleteProduct: productsStore.deleteProduct.bind(productsStore),
    getStats: productsStore.getStats.bind(productsStore),
    importFromJSON: productsStore.importFromJSON.bind(productsStore),
    importFromCSV: productsStore.importFromCSV.bind(productsStore),
    exportToJSON: productsStore.exportToJSON.bind(productsStore),
    exportToCSV: productsStore.exportToCSV.bind(productsStore),
    clearAllProducts: productsStore.clearAllProducts.bind(productsStore),
    resetToDefault: productsStore.resetToDefault.bind(productsStore),
  }
}
