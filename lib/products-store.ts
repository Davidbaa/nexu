export interface Product {
  id: string
  name: string
  sku: string
  brand: string
  category: string
  price: number
  stock: number
  imageUrl: string
  description: string
  availability: "in-stock" | "2-3-days" | "out-of-stock"
  installationAvailable: boolean
  createdAt: string
  updatedAt: string
}

// Productos por defecto para empezar
const defaultProducts: Product[] = [
  {
    id: "1",
    name: "Motor de Lavadora LG",
    sku: "LG-MOT-001",
    brand: "LG",
    category: "lavadora",
    price: 2500,
    stock: 5,
    imageUrl: "/placeholder.svg?height=300&width=300",
    description: "Motor original para lavadoras LG. Compatible con modelos WM2016CW, WM2101HW, WM2301HR.",
    availability: "in-stock",
    installationAvailable: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Compresor Refrigerador Samsung",
    sku: "SAM-COMP-002",
    brand: "Samsung",
    category: "refrigerador",
    price: 4200,
    stock: 3,
    imageUrl: "/placeholder.svg?height=300&width=300",
    description: "Compresor original Samsung para refrigeradores de 18-22 pies cúbicos.",
    availability: "in-stock",
    installationAvailable: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Resistencia Horno Whirlpool",
    sku: "WHP-RES-003",
    brand: "Whirlpool",
    category: "horno",
    price: 850,
    stock: 8,
    imageUrl: "/placeholder.svg?height=300&width=300",
    description: "Resistencia de calentamiento para hornos Whirlpool. 2500W.",
    availability: "in-stock",
    installationAvailable: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

class ProductsStore {
  private storageKey = "nexu_products"

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

  saveProducts(products: Product[]): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(this.storageKey, JSON.stringify(products))
    }
  }

  addProduct(productData: Omit<Product, "id" | "createdAt" | "updatedAt">): Product {
    const products = this.getProducts()
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
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

  getProductsByCategory(category: string): Product[] {
    const products = this.getProducts()
    return products.filter((p) => p.category === category)
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

  getStats() {
    const products = this.getProducts()
    const totalProducts = products.length
    const totalStock = products.reduce((sum, p) => sum + p.stock, 0)
    const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0)
    const categories = [...new Set(products.map((p) => p.category))].length
    const inStock = products.filter((p) => p.availability === "in-stock").length
    const outOfStock = products.filter((p) => p.availability === "out-of-stock").length

    return {
      totalProducts,
      totalStock,
      totalValue,
      categories,
      inStock,
      outOfStock,
    }
  }
}

export const productsStore = new ProductsStore()
