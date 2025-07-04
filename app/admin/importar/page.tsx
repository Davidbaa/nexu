"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { productsStore } from "@/lib/products-store"
import { Upload, Download, FileText, Database, AlertCircle, CheckCircle, Trash2, RotateCcw } from "lucide-react"

export default function ImportarPage() {
  const [jsonInput, setJsonInput] = useState("")
  const [csvInput, setCsvInput] = useState("")
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [stats, setStats] = useState(productsStore.getStats())
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Actualizar estadísticas
  const updateStats = () => {
    setStats(productsStore.getStats())
  }

  // Suscribirse a cambios en el store
  useState(() => {
    const unsubscribe = productsStore.subscribe(updateStats)
    return unsubscribe
  })

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text })
    setTimeout(() => setMessage(null), 5000)
  }

  const handleJSONImport = async () => {
    if (!jsonInput.trim()) {
      showMessage("error", "Por favor ingresa contenido JSON válido")
      return
    }

    setIsLoading(true)
    try {
      const products = JSON.parse(jsonInput)

      if (!Array.isArray(products)) {
        throw new Error("El JSON debe ser un array de productos")
      }

      // Validar estructura básica
      const validatedProducts = products.map((product, index) => {
        if (!product.name || !product.sku || typeof product.price !== "number") {
          throw new Error(`Producto ${index + 1}: faltan campos requeridos (name, sku, price)`)
        }

        return {
          name: product.name,
          sku: product.sku,
          brand: product.brand || "Sin marca",
          category: product.category || "general",
          price: Number(product.price),
          stock: Number(product.stock) || 0,
          description: product.description || "",
          imageUrl: product.imageUrl || "/placeholder.svg?height=300&width=300",
          available: product.available !== false,
          installationRequired: product.installationRequired === true,
        }
      })

      const imported = productsStore.importProducts(validatedProducts)
      showMessage("success", `${imported.length} productos importados exitosamente`)
      setJsonInput("")
      updateStats()
    } catch (error) {
      showMessage("error", `Error al importar JSON: ${error instanceof Error ? error.message : "Error desconocido"}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCSVImport = async () => {
    if (!csvInput.trim()) {
      showMessage("error", "Por favor ingresa contenido CSV válido")
      return
    }

    setIsLoading(true)
    try {
      const lines = csvInput.trim().split("\n")
      const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""))

      if (lines.length < 2) {
        throw new Error("El CSV debe tener al menos una fila de datos")
      }

      const products = lines.slice(1).map((line, index) => {
        const values = line.split(",").map((v) => v.trim().replace(/"/g, ""))
        const product: any = {}

        headers.forEach((header, i) => {
          product[header] = values[i] || ""
        })

        // Validar campos requeridos
        if (!product.name || !product.sku) {
          throw new Error(`Fila ${index + 2}: faltan campos requeridos (name, sku)`)
        }

        return {
          name: product.name,
          sku: product.sku,
          brand: product.brand || "Sin marca",
          category: product.category || "general",
          price: Number(product.price) || 0,
          stock: Number(product.stock) || 0,
          description: product.description || "",
          imageUrl: product.imageUrl || "/placeholder.svg?height=300&width=300",
          available: product.available !== "false",
          installationRequired: product.installationRequired === "true",
        }
      })

      const imported = productsStore.importProducts(products)
      showMessage("success", `${imported.length} productos importados desde CSV`)
      setCsvInput("")
      updateStats()
    } catch (error) {
      showMessage("error", `Error al importar CSV: ${error instanceof Error ? error.message : "Error desconocido"}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string

      if (file.name.endsWith(".json")) {
        setJsonInput(content)
      } else if (file.name.endsWith(".csv")) {
        setCsvInput(content)
      }
    }
    reader.readAsText(file)
  }

  const handleExport = (format: "json" | "csv") => {
    const products = productsStore.getProducts()
    if (products.length === 0) {
      showMessage("error", "No hay productos para exportar")
      return
    }

    let content: string
    let filename: string
    let mimeType: string

    if (format === "json") {
      content = productsStore.exportToJSON()
      filename = `nexu-productos-${new Date().toISOString().split("T")[0]}.json`
      mimeType = "application/json"
    } else {
      content = productsStore.exportToCSV()
      filename = `nexu-productos-${new Date().toISOString().split("T")[0]}.csv`
      mimeType = "text/csv"
    }

    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    showMessage("success", `Productos exportados como ${format.toUpperCase()}`)
  }

  const handleClearAll = () => {
    if (confirm("¿Estás seguro de que quieres eliminar TODOS los productos? Esta acción no se puede deshacer.")) {
      productsStore.clearProducts()
      showMessage("success", "Todos los productos han sido eliminados")
      updateStats()
    }
  }

  const handleResetDefaults = () => {
    if (confirm("¿Quieres restaurar los productos por defecto? Esto eliminará todos los productos actuales.")) {
      productsStore.resetToDefaults()
      showMessage("success", "Productos restaurados a valores por defecto")
      updateStats()
    }
  }

  const exampleJSON = `[
  {
    "name": "Motor Lavadora Samsung",
    "sku": "MOT-SAM-001",
    "brand": "Samsung",
    "category": "motores",
    "price": 2500,
    "stock": 5,
    "description": "Motor original para lavadoras Samsung",
    "imageUrl": "/placeholder.svg?height=300&width=300",
    "available": true,
    "installationRequired": true
  }
]`

  const exampleCSV = `name,sku,brand,category,price,stock,description,available,installationRequired
Motor Lavadora Samsung,MOT-SAM-001,Samsung,motores,2500,5,Motor original para lavadoras Samsung,true,true
Compresor LG,COMP-LG-002,LG,compresores,3200,3,Compresor hermético para refrigeradores,true,true`

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestión Externa de Inventario</h1>
          <p className="text-muted-foreground">Importa, exporta y gestiona tu inventario desde archivos externos</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleExport("json")}>
            <Download className="w-4 h-4 mr-2" />
            Exportar JSON
          </Button>
          <Button variant="outline" onClick={() => handleExport("csv")}>
            <Download className="w-4 h-4 mr-2" />
            Exportar CSV
          </Button>
        </div>
      </div>

      {message && (
        <Alert className={message.type === "success" ? "border-green-500" : "border-red-500"}>
          {message.type === "success" ? (
            <CheckCircle className="h-4 w-4 text-green-500" />
          ) : (
            <AlertCircle className="h-4 w-4 text-red-500" />
          )}
          <AlertDescription className={message.type === "success" ? "text-green-700" : "text-red-700"}>
            {message.text}
          </AlertDescription>
        </Alert>
      )}

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Productos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Disponibles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.available}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Sin Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.outOfStock}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalValue.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="import" className="space-y-4">
        <TabsList>
          <TabsTrigger value="import">Importar</TabsTrigger>
          <TabsTrigger value="api">API REST</TabsTrigger>
          <TabsTrigger value="manage">Gestionar</TabsTrigger>
        </TabsList>

        <TabsContent value="import" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Importar JSON */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Importar JSON
                </CardTitle>
                <CardDescription>Pega tu contenido JSON o sube un archivo .json</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <input ref={fileInputRef} type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
                  <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="w-full mb-4">
                    <Upload className="w-4 h-4 mr-2" />
                    Subir archivo JSON
                  </Button>
                </div>

                <Textarea
                  placeholder="Pega tu JSON aquí..."
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  rows={10}
                  className="font-mono text-sm"
                />

                <Button onClick={handleJSONImport} disabled={isLoading || !jsonInput.trim()} className="w-full">
                  {isLoading ? "Importando..." : "Importar JSON"}
                </Button>

                <details className="text-sm">
                  <summary className="cursor-pointer font-medium">Ver ejemplo JSON</summary>
                  <pre className="mt-2 p-3 bg-muted rounded text-xs overflow-x-auto">{exampleJSON}</pre>
                </details>
              </CardContent>
            </Card>

            {/* Importar CSV */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Importar CSV
                </CardTitle>
                <CardDescription>Compatible con Excel, Google Sheets, etc.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" id="csv-upload" />
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById("csv-upload")?.click()}
                    className="w-full mb-4"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Subir archivo CSV
                  </Button>
                </div>

                <Textarea
                  placeholder="Pega tu CSV aquí..."
                  value={csvInput}
                  onChange={(e) => setCsvInput(e.target.value)}
                  rows={10}
                  className="font-mono text-sm"
                />

                <Button onClick={handleCSVImport} disabled={isLoading || !csvInput.trim()} className="w-full">
                  {isLoading ? "Importando..." : "Importar CSV"}
                </Button>

                <details className="text-sm">
                  <summary className="cursor-pointer font-medium">Ver ejemplo CSV</summary>
                  <pre className="mt-2 p-3 bg-muted rounded text-xs overflow-x-auto">{exampleCSV}</pre>
                </details>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API REST para Gestión Externa</CardTitle>
              <CardDescription>Usa estas rutas para integrar con sistemas externos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">GET</Badge>
                    <code className="text-sm">/api/products</code>
                  </div>
                  <p className="text-sm text-muted-foreground">Obtener todos los productos</p>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="default">POST</Badge>
                    <code className="text-sm">/api/products</code>
                  </div>
                  <p className="text-sm text-muted-foreground">Crear nuevos productos</p>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">PUT</Badge>
                    <code className="text-sm">/api/products?id=123</code>
                  </div>
                  <p className="text-sm text-muted-foreground">Actualizar producto existente</p>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="destructive">DELETE</Badge>
                    <code className="text-sm">/api/products?id=123</code>
                  </div>
                  <p className="text-sm text-muted-foreground">Eliminar producto</p>
                </div>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Documentación completa:</strong> Ve a <code>/admin/api-docs</code> para ejemplos de código y
                  guías detalladas.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestión del Inventario</CardTitle>
              <CardDescription>Herramientas para administrar tu inventario</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  onClick={handleResetDefaults}
                  className="flex items-center gap-2 bg-transparent"
                >
                  <RotateCcw className="w-4 h-4" />
                  Restaurar Productos por Defecto
                </Button>

                <Button variant="destructive" onClick={handleClearAll} className="flex items-center gap-2">
                  <Trash2 className="w-4 h-4" />
                  Eliminar Todos los Productos
                </Button>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Nota:</strong> Todas las acciones se guardan automáticamente en el navegador. Para
                  persistencia permanente, considera conectar una base de datos.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
