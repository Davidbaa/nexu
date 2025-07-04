"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, ExternalLink, Book } from "lucide-react"
import AdminGuard from "@/components/admin-guard"

export default function ApiDocsPage() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const baseUrl = typeof window !== "undefined" ? window.location.origin : ""

  const examples = {
    getAllProducts: `curl -X GET "${baseUrl}/api/products"`,
    getFilteredProducts: `curl -X GET "${baseUrl}/api/products?category=Refrigerador&available=true"`,
    createProduct: `curl -X POST "${baseUrl}/api/products" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Filtro de Agua Samsung",
    "sku": "SAM-FLT-001",
    "brand": "Samsung",
    "category": "Refrigerador",
    "price": 450,
    "stock": 12,
    "description": "Filtro de agua original",
    "available": true,
    "installationRequired": false
  }'`,
    updateProduct: `curl -X PUT "${baseUrl}/api/products?id=123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "price": 500,
    "stock": 8
  }'`,
    deleteProduct: `curl -X DELETE "${baseUrl}/api/products?id=123"`,
  }

  const jsExamples = {
    getAllProducts: `// Obtener todos los productos
const response = await fetch('${baseUrl}/api/products')
const data = await response.json()
console.log(data.data) // Array de productos`,
    createProduct: `// Crear un nuevo producto
const newProduct = {
  name: "Filtro de Agua Samsung",
  sku: "SAM-FLT-001",
  brand: "Samsung",
  category: "Refrigerador",
  price: 450,
  stock: 12,
  description: "Filtro de agua original",
  available: true,
  installationRequired: false
}

const response = await fetch('${baseUrl}/api/products', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(newProduct)
})

const result = await response.json()
console.log(result)`,
  }

  return (
    <AdminGuard>
      <div className="container mx-auto p-6 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">📚 Documentación de API</h1>
            <p className="text-muted-foreground">Guía completa para integrar sistemas externos</p>
          </div>
          <Button onClick={() => (window.location.href = "/admin/importar")} variant="outline">
            <ExternalLink className="mr-2 h-4 w-4" />
            Volver a Importar
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
            <TabsTrigger value="examples">Ejemplos</TabsTrigger>
            <TabsTrigger value="integration">Integración</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Book className="h-5 w-5" />
                  API REST para Gestión de Productos
                </CardTitle>
                <CardDescription>
                  Conecta sistemas externos para sincronizar tu inventario automáticamente
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">🔗 URL Base</h4>
                    <code className="text-sm bg-gray-100 p-2 rounded block">{baseUrl}/api/products</code>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">📋 Formato</h4>
                    <p className="text-sm text-muted-foreground">Todas las respuestas están en formato JSON</p>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold mb-2">🚀 Casos de Uso</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Sincronizar desde sistemas ERP</li>
                    <li>• Importar desde hojas de cálculo</li>
                    <li>• Conectar con software de punto de venta</li>
                    <li>• Automatizar actualizaciones de inventario</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="endpoints" className="space-y-6">
            <div className="space-y-4">
              {/* GET */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Badge className="bg-green-600">GET</Badge>
                      Obtener Productos
                    </CardTitle>
                  </div>
                  <CardDescription>/api/products</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h5 className="font-medium mb-2">Parámetros de consulta (opcionales):</h5>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>
                          • <code>category</code> - Filtrar por categoría
                        </li>
                        <li>
                          • <code>available</code> - Filtrar por disponibilidad (true/false)
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">Respuesta:</h5>
                      <pre className="text-xs bg-gray-100 p-3 rounded overflow-x-auto">
                        {`{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "Filtro de Agua Samsung",
      "sku": "SAM-FLT-001",
      "brand": "Samsung",
      "category": "Refrigerador",
      "price": 450,
      "stock": 12,
      "available": true,
      "installationRequired": false
    }
  ],
  "total": 1
}`}
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* POST */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Badge className="bg-blue-600">POST</Badge>
                      Crear Producto
                    </CardTitle>
                  </div>
                  <CardDescription>/api/products</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h5 className="font-medium mb-2">Campos requeridos:</h5>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>
                          • <code>name</code> - Nombre del producto
                        </li>
                        <li>
                          • <code>sku</code> - Código único del producto
                        </li>
                        <li>
                          • <code>price</code> - Precio del producto
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">Campos opcionales:</h5>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>
                          • <code>brand, category, stock, description, imageUrl, available, installationRequired</code>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* PUT */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Badge className="bg-orange-600">PUT</Badge>
                      Actualizar Producto
                    </CardTitle>
                  </div>
                  <CardDescription>/api/products?id={"<product_id>"}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Actualiza cualquier campo del producto. Solo envía los campos que quieres cambiar.
                  </p>
                </CardContent>
              </Card>

              {/* DELETE */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Badge className="bg-red-600">DELETE</Badge>
                      Eliminar Producto
                    </CardTitle>
                  </div>
                  <CardDescription>/api/products?id={"<product_id>"}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Elimina permanentemente un producto del inventario.</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="examples" className="space-y-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>🔧 Ejemplos con cURL</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(examples).map(([key, example]) => (
                    <div key={key} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h5 className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1")}</h5>
                        <Button size="sm" variant="outline" onClick={() => copyToClipboard(example)}>
                          <Copy className="h-3 w-3 mr-1" />
                          Copiar
                        </Button>
                      </div>
                      <pre className="text-xs bg-gray-100 p-3 rounded overflow-x-auto">{example}</pre>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>💻 Ejemplos con JavaScript</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(jsExamples).map(([key, example]) => (
                    <div key={key} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h5 className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1")}</h5>
                        <Button size="sm" variant="outline" onClick={() => copyToClipboard(example)}>
                          <Copy className="h-3 w-3 mr-1" />
                          Copiar
                        </Button>
                      </div>
                      <pre className="text-xs bg-gray-100 p-3 rounded overflow-x-auto">{example}</pre>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="integration" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>🔄 Sincronización Automática</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">Configura scripts para sincronizar automáticamente:</p>
                  <ul className="text-sm space-y-1">
                    <li>• Cada hora/día/semana</li>
                    <li>• Cuando cambien los precios</li>
                    <li>• Al actualizar el stock</li>
                    <li>• Nuevos productos</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>🛠️ Herramientas Recomendadas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ul className="text-sm space-y-1">
                    <li>
                      • <strong>Zapier:</strong> Conectar sin código
                    </li>
                    <li>
                      • <strong>Make:</strong> Automatización visual
                    </li>
                    <li>
                      • <strong>Python:</strong> Scripts personalizados
                    </li>
                    <li>
                      • <strong>Node.js:</strong> Aplicaciones web
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>📋 Script de Ejemplo (Python)</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="text-xs bg-gray-100 p-4 rounded overflow-x-auto">
                    {`import requests
import json

# Configuración
API_URL = "${baseUrl}/api/products"

# Función para sincronizar productos
def sync_products(products_data):
    for product in products_data:
        response = requests.post(
            API_URL,
            headers={'Content-Type': 'application/json'},
            data=json.dumps(product)
        )
        
        if response.status_code == 201:
            print(f"✅ Producto creado: {product['name']}")
        else:
            print(f"❌ Error: {response.json()}")

# Ejemplo de uso
productos = [
    {
        "name": "Filtro Samsung",
        "sku": "SAM-001",
        "price": 450,
        "stock": 10,
        "category": "Refrigerador"
    }
]

sync_products(productos)`}
                  </pre>
                  <Button
                    className="mt-3 bg-transparent"
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      copyToClipboard(`import requests
import json

# Configuración
API_URL = "${baseUrl}/api/products"

# Función para sincronizar productos
def sync_products(products_data):
    for product in products_data:
        response = requests.post(
            API_URL,
            headers={'Content-Type': 'application/json'},
            data=json.dumps(product)
        )
        
        if response.status_code == 201:
            print(f"✅ Producto creado: {product['name']}")
        else:
            print(f"❌ Error: {response.json()}")

# Ejemplo de uso
productos = [
    {
        "name": "Filtro Samsung",
        "sku": "SAM-001",
        "price": 450,
        "stock": 10,
        "category": "Refrigerador"
    }
]

sync_products(productos)`)
                    }
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copiar Script
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminGuard>
  )
}
