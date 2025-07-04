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
  createdAt: string
  updatedAt: string
}

class ProductsStore {
  private readonly STORAGE_KEY = "nexu_products"

  private getProducts(): Product[] {
    if (typeof window === "undefined") return []

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      return stored ? JSON.parse(stored) : this.getDefaultProducts()
    } catch {
      return this.getDefaultProducts()
    }
  }

  private saveProducts(products: Product[]): void {
    if (typeof window === "undefined") return

    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(products))
    } catch (error) {
      console.error("Error saving products:", error)
    }
  }

  private getDefaultProducts(): Product[] {
    return [
      {
        id: 1,
        name: "Bomba de Agua para Lavadora LG",
        brand: "LG",
        category: "Lavadoras",
        price: 850,
        image: "/placeholder.svg?height=300&width=300",
        availability: "En Stock",
        description:
          "Bomba de agua original para lavadoras LG. Compatible con modelos WM2016CW, WM2101HW, WM2301HR y más.",
        installationAvailable: true,
        sku: "LG-BOMBA-001",
        stock: 15,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 2,
        name: "Termostato Refrigerador Samsung",
        brand: "Samsung",
        category: "Refrigeradores",
        price: 1200,
        image: "/placeholder.svg?height=300&width=300",
        availability: "En Stock",
        description: "Termostato de control de temperatura para refrigeradores Samsung. Modelo universal compatible.",
        installationAvailable: true,
        sku: "SAM-TERM-002",
        stock: 8,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]
  }

  getAllProducts(): Product[] {
    return this.getProducts()
  }

  getProductById(id: number): Product | undefined {
    return this.getProducts().find((product) => product.id === id)
  }

  addProduct(productData: Omit<Product, "id" | "createdAt" | "updatedAt">): Product {
    const products = this.getProducts()
    const newId = Math.max(...products.map((p) => p.id), 0) + 1

    const newProduct: Product = {
      ...productData,
      id: newId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    products.push(newProduct)
    this.saveProducts(products)
    return newProduct
  }

  updateProduct(id: number, updates: Partial<Omit<Product, "id" | "createdAt">>): Product | null {
    const products = this.getProducts()
    const index = products.findIndex((product) => product.id === id)

    if (index === -1) return null

    products[index] = {
      ...products[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    this.saveProducts(products)
    return products[index]
  }

  deleteProduct(id: number): boolean {
    const products = this.getProducts()
    const filteredProducts = products.filter((product) => product.id !== id)

    if (filteredProducts.length === products.length) return false

    this.saveProducts(filteredProducts)
    return true
  }

  getCategories(): string[] {
    const products = this.getProducts()
    return [...new Set(products.map((product) => product.category))]
  }

  getBrands(): string[] {
    const products = this.getProducts()
    return [...new Set(products.map((product) => product.brand))]
  }

  searchProducts(query: string): Product[] {
    const products = this.getProducts()
    const lowercaseQuery = query.toLowerCase()

    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.brand.toLowerCase().includes(lowercaseQuery) ||
        product.category.toLowerCase().includes(lowercaseQuery) ||
        product.description.toLowerCase().includes(lowercaseQuery) ||
        (product.sku && product.sku.toLowerCase().includes(lowercaseQuery)),
    )
  }

  getProductsByCategory(category: string): Product[] {
    return this.getProducts().filter((product) => product.category === category)
  }

  getProductsByBrand(brand: string): Product[] {
    return this.getProducts().filter((product) => product.brand === brand)
  }

  getTotalValue(): number {
    const products = this.getProducts()
    return products.reduce((total, product) => total + product.price * (product.stock || 1), 0)
  }

  getLowStockProducts(threshold = 5): Product[] {
    return this.getProducts().filter((product) => (product.stock || 0) <= threshold)
  }
}

export const productsStore = new ProductsStore()
