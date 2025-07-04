export interface Product {
  id: number
  name: string
  brand: string
  category: string
  price: number
  image: string
  availability: string
  description: string
  installationAvailable: boolean
  sku?: string
  stock?: number
}

// Productos por defecto (puedes editarlos desde el admin)
const defaultProducts: Product[] = [
  {
    id: 1,
    name: "Bomba de Agua Universal",
    brand: "LG",
    category: "Lavadoras",
    price: 850,
    image: "/placeholder.svg?height=200&width=200",
    availability: "En Stock",
    description: "Bomba de agua compatible con modelos LG WM series",
    installationAvailable: true,
    sku: "LG-BOMBA-001",
    stock: 15,
  },
  {
    id: 2,
    name: "Filtro de Agua Refrigerador",
    brand: "Samsung",
    category: "Refrigeradores",
    price: 1200,
    image: "/placeholder.svg?height=200&width=200",
    availability: "En Stock",
    description: "Filtro de agua original Samsung RF series",
    installationAvailable: true,
    sku: "SAM-FILTRO-002",
    stock: 8,
  },
]

class ProductsStore {
  private products: Product[] = []

  constructor() {
    if (typeof window !== "undefined") {
      this.loadProducts()
    }
  }

  private loadProducts() {
    const stored = localStorage.getItem("nexu-products")
    if (stored) {
      this.products = JSON.parse(stored)
    } else {
      this.products = defaultProducts
      this.saveProducts()
    }
  }

  private saveProducts() {
    if (typeof window !== "undefined") {
      localStorage.setItem("nexu-products", JSON.stringify(this.products))
    }
  }

  getAllProducts(): Product[] {
    return this.products
  }

  getProduct(id: number): Product | undefined {
    return this.products.find((p) => p.id === id)
  }

  addProduct(product: Omit<Product, "id">): Product {
    const newProduct = {
      ...product,
      id: Math.max(...this.products.map((p) => p.id), 0) + 1,
    }
    this.products.push(newProduct)
    this.saveProducts()
    return newProduct
  }

  updateProduct(id: number, updates: Partial<Product>): Product | null {
    const index = this.products.findIndex((p) => p.id === id)
    if (index === -1) return null

    this.products[index] = { ...this.products[index], ...updates }
    this.saveProducts()
    return this.products[index]
  }

  deleteProduct(id: number): boolean {
    const index = this.products.findIndex((p) => p.id === id)
    if (index === -1) return false

    this.products.splice(index, 1)
    this.saveProducts()
    return true
  }

  getCategories(): string[] {
    return [...new Set(this.products.map((p) => p.category))]
  }

  getBrands(): string[] {
    return [...new Set(this.products.map((p) => p.brand))]
  }
}

export const productsStore = new ProductsStore()
