"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Package, DollarSign, TrendingUp, Archive, LogOut, Shield, Search } from "lucide-react"
import { productsStore, type Product } from "@/lib/products-store"
import { clearAdminSession, getAdminSession } from "@/lib/auth"
import AdminGuard from "@/components/admin-guard"

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isAddingProduct, setIsAddingProduct] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [adminUser, setAdminUser] = useState<string>("")
  const router = useRouter()

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    brand: "",
    category: "",
    price: "",
    stock: "",
    imageUrl: "",
    description: "",
    availability: "in-stock" as const,
    installationAvailable: false,
  })

  useEffect(() => {
    loadProducts()
    const session = getAdminSession()
    if (session) {
      setAdminUser(session.username)
    }
  }, [])

  const loadProducts = () => {
    setProducts(productsStore.getProducts())
  }

  const handleLogout = () => {
    clearAdminSession()
    router.push("/admin/login")
  }

  const resetForm = () => {
    setFormData({
      name: "",
      sku: "",
      brand: "",
      category: "",
      price: "",
      stock: "",
      imageUrl: "",
      description: "",
      availability: "in-stock",
      installationAvailable: false,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const productData = {
      name: formData.name,
      sku: formData.sku || `AUTO-${Date.now()}`,
      brand: formData.brand,
      category: formData.category,
      price: Number.parseFloat(formData.price),
      stock: Number.parseInt(formData.stock),
      imageUrl: formData.imageUrl || "/placeholder.svg?height=300&width=300",
      description: formData.description,
      availability: formData.availability,
      installationAvailable: formData.installationAvailable,
    }

    if (editingProduct) {
      productsStore.updateProduct(editingProduct.id, productData)
      setEditingProduct(null)
    } else {
      productsStore.addProduct(productData)
      setIsAddingProduct(false)
    }

    resetForm()
    loadProducts()
  }

  const handleEdit = (product: Product) => {
    setFormData({
      name: product.name,
      sku: product.sku,
      brand: product.brand,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      imageUrl: product.imageUrl,
      description: product.description,
      availability: product.availability,
      installationAvailable: product.installationAvailable,
    })
    setEditingProduct(product)
    setIsAddingProduct(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      productsStore.deleteProduct(id)
      loadProducts()
    }
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const stats = productsStore.getStats()
  const categories = [...new Set(products.map((p) => p.category))]

  const brands = ["LG", "Samsung", "Whirlpool", "GE", "Frigidaire", "Bosch", "Mabe", "Kelvinator"]
  const productCategories = [
    "lavadora",
    "refrigerador",
    "horno",
    "microondas",
    "secadora",
    "lavavajillas",
    "calentador",
    "aire-acondicionado",
  ]

  return (
    <AdminGuard>
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Shield className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">Panel de Administración</h1>
                  <p className="text-sm text-gray-500">Gestión de Productos - Nexu</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Bienvenido, {adminUser}</span>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Cerrar Sesión
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Package className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Productos</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Archive className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Stock Total</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalStock}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <DollarSign className="h-8 w-8 text-yellow-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Valor Inventario</p>
                    <p className="text-2xl font-bold text-gray-900">${stats.totalValue.toLocaleString("es-MX")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Categorías</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.categories}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions and Filters */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full sm:w-80"
                />
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
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
            </div>

            <Button onClick={() => setIsAddingProduct(true)} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Agregar Producto
            </Button>
          </div>

          {/* Add/Edit Product Form */}
          {isAddingProduct && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>{editingProduct ? "Editar Producto" : "Agregar Nuevo Producto"}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Nombre del Producto *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ej: Motor de Lavadora LG"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="sku">SKU</Label>
                      <Input
                        id="sku"
                        value={formData.sku}
                        onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                        placeholder="Ej: LG-MOT-001 (opcional)"
                      />
                    </div>

                    <div>
                      <Label htmlFor="brand">Marca *</Label>
                      <Select
                        value={formData.brand}
                        onValueChange={(value) => setFormData({ ...formData, brand: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar marca" />
                        </SelectTrigger>
                        <SelectContent>
                          {brands.map((brand) => (
                            <SelectItem key={brand} value={brand}>
                              {brand}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="category">Categoría *</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar categoría" />
                        </SelectTrigger>
                        <SelectContent>
                          {productCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category.charAt(0).toUpperCase() + category.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="price">Precio (MXN) *</Label>
                      <Input
                        id="price"
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        placeholder="2500"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="stock">Stock *</Label>
                      <Input
                        id="stock"
                        type="number"
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                        placeholder="10"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="availability">Disponibilidad</Label>
                      <Select
                        value={formData.availability}
                        onValueChange={(value: any) => setFormData({ ...formData, availability: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="in-stock">En Stock</SelectItem>
                          <SelectItem value="2-3-days">2-3 días</SelectItem>
                          <SelectItem value="out-of-stock">Agotado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="imageUrl">URL de Imagen</Label>
                      <Input
                        id="imageUrl"
                        value={formData.imageUrl}
                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                        placeholder="https://ejemplo.com/imagen.jpg"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Descripción *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Descripción detallada del producto..."
                      rows={3}
                      required
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="installation"
                      checked={formData.installationAvailable}
                      onChange={(e) => setFormData({ ...formData, installationAvailable: e.target.checked })}
                      className="rounded"
                    />
                    <Label htmlFor="installation">Instalación disponible</Label>
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit" className="bg-green-600 hover:bg-green-700">
                      {editingProduct ? "Actualizar Producto" : "Agregar Producto"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsAddingProduct(false)
                        setEditingProduct(null)
                        resetForm()
                      }}
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Products List */}
          <Card>
            <CardHeader>
              <CardTitle>Productos ({filteredProducts.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredProducts.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No se encontraron productos</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg">{product.name}</h3>
                            <Badge variant={product.availability === "in-stock" ? "default" : "secondary"}>
                              {product.availability === "in-stock"
                                ? "En Stock"
                                : product.availability === "2-3-days"
                                  ? "2-3 días"
                                  : "Agotado"}
                            </Badge>
                            {product.installationAvailable && <Badge variant="outline">Instalación</Badge>}
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                            <div>
                              <span className="font-medium">SKU:</span> {product.sku}
                            </div>
                            <div>
                              <span className="font-medium">Marca:</span> {product.brand}
                            </div>
                            <div>
                              <span className="font-medium">Precio:</span> ${product.price.toLocaleString("es-MX")}
                            </div>
                            <div>
                              <span className="font-medium">Stock:</span> {product.stock}
                            </div>
                          </div>

                          <p className="text-gray-700 text-sm">{product.description}</p>
                        </div>

                        <div className="flex gap-2 ml-4">
                          <Button size="sm" variant="outline" onClick={() => handleEdit(product)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(product.id)}
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminGuard>
  )
}
