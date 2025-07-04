"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Package, Wrench, Phone } from "lucide-react"
import { productsStore, type Product } from "@/lib/products-store"

export default function ProductosPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedBrand, setSelectedBrand] = useState<string>("all")
  const [priceRange, setPriceRange] = useState<string>("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simular carga
    setTimeout(() => {
      setProducts(productsStore.getProducts())
      setIsLoading(false)
    }, 500)
  }, [])

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesBrand = selectedBrand === "all" || product.brand === selectedBrand

    let matchesPrice = true
    if (priceRange !== "all") {
      const price = product.price
      switch (priceRange) {
        case "under-1000":
          matchesPrice = price < 1000
          break
        case "1000-3000":
          matchesPrice = price >= 1000 && price <= 3000
          break
        case "3000-5000":
          matchesPrice = price >= 3000 && price <= 5000
          break
        case "over-5000":
          matchesPrice = price > 5000
          break
      }
    }

    return matchesSearch && matchesCategory && matchesBrand && matchesPrice
  })

  const categories = [...new Set(products.map((p) => p.category))]
  const brands = [...new Set(products.map((p) => p.brand))]

  const handleWhatsAppContact = (product: Product) => {
    const message = encodeURIComponent(
      `Hola, me interesa el producto: ${product.name} (${product.sku}). ¿Podrían darme más información?`,
    )
    window.open(`https://wa.me/523338766231?text=${message}`, "_blank")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando productos...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Catálogo de Refacciones</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Encuentra las refacciones originales que necesitas para tus electrodomésticos. Contamos con stock inmediato
            y servicio de instalación profesional.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Todas las categorías" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger>
                <SelectValue placeholder="Todas las marcas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las marcas</SelectItem>
                {brands.map((brand) => (
                  <SelectItem key={brand} value={brand}>
                    {brand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger>
                <SelectValue placeholder="Rango de precio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los precios</SelectItem>
                <SelectItem value="under-1000">Menos de $1,000</SelectItem>
                <SelectItem value="1000-3000">$1,000 - $3,000</SelectItem>
                <SelectItem value="3000-5000">$3,000 - $5,000</SelectItem>
                <SelectItem value="over-5000">Más de $5,000</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">{filteredProducts.length} productos encontrados</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("all")
                setSelectedBrand("all")
                setPriceRange("all")
              }}
            >
              <Filter className="h-4 w-4 mr-2" />
              Limpiar filtros
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron productos</h3>
            <p className="text-gray-600">Intenta ajustar los filtros de búsqueda</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gray-100 relative">
                  <img
                    src={product.imageUrl || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder.svg?height=300&width=300"
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <Badge
                      variant={product.availability === "in-stock" ? "default" : "secondary"}
                      className={
                        product.availability === "in-stock"
                          ? "bg-green-600 hover:bg-green-700"
                          : product.availability === "2-3-days"
                            ? "bg-yellow-600 hover:bg-yellow-700"
                            : "bg-red-600 hover:bg-red-700"
                      }
                    >
                      {product.availability === "in-stock"
                        ? "En Stock"
                        : product.availability === "2-3-days"
                          ? "2-3 días"
                          : "Agotado"}
                    </Badge>
                  </div>
                  {product.installationAvailable && (
                    <div className="absolute top-4 right-4">
                      <Badge variant="outline" className="bg-white">
                        <Wrench className="h-3 w-3 mr-1" />
                        Instalación
                      </Badge>
                    </div>
                  )}
                </div>

                <CardContent className="p-6">
                  <div className="mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-600">
                      {product.brand} • SKU: {product.sku}
                    </p>
                  </div>

                  <p className="text-gray-700 text-sm mb-4 line-clamp-3">{product.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">${product.price.toLocaleString("es-MX")}</span>
                      <p className="text-sm text-gray-600">Stock: {product.stock} unidades</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button
                      onClick={() => handleWhatsAppContact(product)}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Consultar por WhatsApp
                    </Button>

                    {product.installationAvailable && (
                      <p className="text-xs text-center text-gray-600">✓ Servicio de instalación disponible</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">¿No encuentras lo que buscas?</h2>
          <p className="text-xl mb-6 opacity-90">
            Contáctanos directamente y te ayudamos a encontrar la refacción exacta que necesitas
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => window.open("https://wa.me/523338766231", "_blank")}
              className="bg-green-600 hover:bg-green-700 text-white"
              size="lg"
            >
              <Phone className="h-5 w-5 mr-2" />
              WhatsApp: (33) 3876-6231
            </Button>
            <Button
              onClick={() => (window.location.href = "/contacto")}
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
              size="lg"
            >
              Formulario de Contacto
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
