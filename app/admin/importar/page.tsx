"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import {
  Upload,
  Download,
  FileText,
  Database,
  RefreshCw,
  Trash2,
  AlertCircle,
  CheckCircle,
  Copy,
  ExternalLink,
} from "lucide-react"
import { useProductStore } from "@/lib/products-store"
import AdminGuard from "@/components/admin-guard"

export default function ImportarPage() {
  const { products, importFromJSON, importFromCSV, exportToJSON, exportToCSV, clearAllProducts, resetToDefault } =
    useProductStore()

  const [jsonInput, setJsonInput] = useState("")
  const [csvInput, setCsvInput] = useState("")
  const [importResult, setImportResult] = useState<{ success: boolean; message: string; imported: number } | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleJSONImport = async () => {
    setIsLoading(true)
    try {
      const result = importFromJSON(jsonInput)
      setImportResult(result)
      if (result.success) {
        setJsonInput("")
      }
    } catch (error) {
      setImportResult({ success: false, message: "Error inesperado", imported: 0 })
    }
    setIsLoading(false)
  }

  const handleCSVImport = async () => {
    setIsLoading(true)
    try {
      const result = importFromCSV(csvInput)
      setImportResult(result)
      if (result.success) {
        setCsvInput("")
      }
    } catch (error) {
      setImportResult({ success: false, message: "Error inesperado", imported: 0 })
    }
    setIsLoading(false)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: "json" | "csv") => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      if (type === "json") {
        setJsonInput(content)
      } else {
        setCsvInput(content)
      }
    }
    reader.readAsText(file)
  }

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const exampleJSON = `[
  {
    "name": "Filtro de Agua Samsung",
    "sku": "SAM-FLT-001",
    "brand": "Samsung",
    "category": "Refrigerador",
    "price": 450,
    "stock": 12,
    "description": "Filtro de agua original para refrigeradores Samsung",
    "imageUrl": "https://ejemplo.com/imagen.jpg",
    "available": true,
    "installationRequired": false
  },
  {
    "name": "Bomba de Drenaje LG",
    "sku": "LG-PUMP-002",
    "brand": "LG",
    "category": "Lavadora",
    "price": 890,
    "stock": 6,
    "description": "Bomba de drenaje para lavadoras LG",
    "available": true,
    "installationRequired": true
  }
]`

  const exampleCSV = `name,sku,brand,category,price,stock,description,available,installationRequired
Filtro de Agua Samsung,SAM-FLT-001,Samsung,Refrigerador,450,12,Filtro de agua original para refrigeradores Samsung,true,false
Bomba de Drenaje LG,LG-PUMP-002,LG,Lavadora,890,6,Bomba de drenaje para lavadoras LG,true,true
Termostato Whirlpool,WHP-TERM-003,Whirlpool,Horno,320,8,Termostato de control de temperatura,true,false`

  return (
    <AdminGuard>
      <div className="container mx-auto p-6 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">📦 Gestión Externa de Inventario</h1>
            <p className="text-muted-foreground">Importa y exporta tu inventario desde diferentes fuentes</p>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline">{products.length} productos</Badge>
            <Button onClick={() => (window.location.href = "/admin/productos")} variant="outline">
              Volver al Panel
            </Button>
          </div>
        </div>

        {importResult && (
          <Alert className={`mb-6 ${importResult.success ? "border-green-500" : "border-red-500"}`}>
            <div className="flex items-center">
              {importResult.success ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-600" />
              )}
              <AlertDescription className="ml-2">
                {importResult.message}
                {importResult.success && importResult.imported > 0 && (
                  <span className="ml-2 font-semibold">({importResult.imported} productos)</span>
                )}
              </AlertDescription>
            </div>
          </Alert>
        )}

        <Tabs defaultValue="import" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="import">Importar</TabsTrigger>
            <TabsTrigger value="export">Exportar</TabsTrigger>
            <TabsTrigger value="api">API Externa</TabsTrigger>
            <TabsTrigger value="manage">Gestionar</TabsTrigger>
          </TabsList>

          <TabsContent value="import" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Importar JSON */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Importar desde JSON
                  </CardTitle>
                  <CardDescription>Pega tu JSON o sube un archivo .json con los productos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="json-file">Subir archivo JSON</Label>
                    <Input
                      id="json-file"
                      type="file"
                      accept=".json"
                      onChange={(e) => handleFileUpload(e, "json")}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="json-input">O pegar JSON directamente</Label>
                    <Textarea
                      id="json-input"
                      placeholder="Pega tu JSON aquí..."
                      value={jsonInput}
                      onChange={(e) => setJsonInput(e.target.value)}
                      rows={8}
                      className="mt-1 font-mono text-sm"
                    />
                  </div>

                  <Button onClick={handleJSONImport} disabled={!jsonInput.trim() || isLoading} className="w-full">
                    <Upload className="mr-2 h-4 w-4" />
                    {isLoading ? "Importando..." : "Importar JSON"}
                  </Button>

                  <details className="mt-4">
                    <summary className="cursor-pointer text-sm font-medium mb-2">Ver ejemplo de JSON</summary>
                    <div className="bg-gray-100 p-3 rounded-md">
                      <pre className="text-xs overflow-x-auto">{exampleJSON}</pre>
                      <Button size="sm" variant="outline" onClick={() => copyToClipboard(exampleJSON)} className="mt-2">
                        <Copy className="mr-1 h-3 w-3" />
                        Copiar ejemplo
                      </Button>
                    </div>
                  </details>
                </CardContent>
              </Card>

              {/* Importar CSV */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Importar desde CSV
                  </CardTitle>
                  <CardDescription>Sube un archivo CSV o pega el contenido directamente</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="csv-file">Subir archivo CSV</Label>
                    <Input
                      id="csv-file"
                      type="file"
                      accept=".csv"
                      onChange={(e) => handleFileUpload(e, "csv")}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="csv-input">O pegar CSV directamente</Label>
                    <Textarea
                      id="csv-input"
                      placeholder="Pega tu CSV aquí..."
                      value={csvInput}
                      onChange={(e) => setCsvInput(e.target.value)}
                      rows={8}
                      className="mt-1 font-mono text-sm"
                    />
                  </div>

                  <Button onClick={handleCSVImport} disabled={!csvInput.trim() || isLoading} className="w-full">
                    <Upload className="mr-2 h-4 w-4" />
                    {isLoading ? "Importando..." : "Importar CSV"}
                  </Button>

                  <details className="mt-4">
                    <summary className="cursor-pointer text-sm font-medium mb-2">Ver ejemplo de CSV</summary>
                    <div className="bg-gray-100 p-3 rounded-md">
                      <pre className="text-xs overflow-x-auto">{exampleCSV}</pre>
                      <Button size="sm" variant="outline" onClick={() => copyToClipboard(exampleCSV)} className="mt-2">
                        <Copy className="mr-1 h-3 w-3" />
                        Copiar ejemplo
                      </Button>
                    </div>
                  </details>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="export" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5" />
                    Exportar a JSON
                  </CardTitle>
                  <CardDescription>Descarga todos tus productos en formato JSON</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => downloadFile(exportToJSON(), "productos.json", "application/json")}
                    className="w-full"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Descargar JSON ({products.length} productos)
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5" />
                    Exportar a CSV
                  </CardTitle>
                  <CardDescription>Descarga todos tus productos en formato CSV para Excel</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => downloadFile(exportToCSV(), "productos.csv", "text/csv")} className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Descargar CSV ({products.length} productos)
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="api" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ExternalLink className="h-5 w-5" />
                  API Externa (Próximamente)
                </CardTitle>
                <CardDescription>Conecta sistemas externos para sincronizar automáticamente</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Esta funcionalidad estará disponible cuando conectes una base de datos real (Supabase/Neon).
                    Permitirá sincronización automática desde:
                  </AlertDescription>
                </Alert>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">🛒 Sistemas de Inventario</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Sistemas ERP</li>
                      <li>• Software de punto de venta</li>
                      <li>• Hojas de cálculo en la nube</li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">🔄 Sincronización</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Webhooks automáticos</li>
                      <li>• API REST endpoints</li>
                      <li>• Sincronización programada</li>
                    </ul>
                  </div>
                </div>

                <Button disabled className="w-full">
                  Configurar API Externa (Próximamente)
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manage" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <RefreshCw className="h-5 w-5" />
                    Resetear Inventario
                  </CardTitle>
                  <CardDescription>Volver a los productos de ejemplo por defecto</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={resetToDefault} variant="outline" className="w-full bg-transparent">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Resetear a Productos por Defecto
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trash2 className="h-5 w-5" />
                    Limpiar Inventario
                  </CardTitle>
                  <CardDescription>Eliminar todos los productos (¡Cuidado!)</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => {
                      if (confirm("¿Estás seguro? Esto eliminará TODOS los productos.")) {
                        clearAllProducts()
                        setImportResult({ success: true, message: "Inventario limpiado completamente", imported: 0 })
                      }
                    }}
                    variant="destructive"
                    className="w-full"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Limpiar Todo el Inventario
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>📊 Estado Actual del Inventario</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{products.length}</div>
                    <div className="text-sm text-muted-foreground">Total Productos</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {products.filter((p) => p.available).length}
                    </div>
                    <div className="text-sm text-muted-foreground">Disponibles</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      {new Set(products.map((p) => p.category)).size}
                    </div>
                    <div className="text-sm text-muted-foreground">Categorías</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      ${products.reduce((sum, p) => sum + p.price * p.stock, 0).toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Valor Total</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminGuard>
  )
}
