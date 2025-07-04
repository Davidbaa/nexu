"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, ExternalLink } from "lucide-react"
import AdminGuard from "@/components/admin-guard"

export default function ApiDocsPage() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://tu-sitio.com"

  return (
    <AdminGuard>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Documentación API</h1>
            <p className="text-muted-foreground">Guía completa para integrar con sistemas externos</p>
          </div>
          <Button variant="outline" asChild>
            <a href="/admin/importar" className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              Ir a Importar
            </a>
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
            <TabsTrigger value="examples">Ejemplos</TabsTrigger>
            <TabsTrigger value="scripts">Scripts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>API REST de Productos Nexu</CardTitle>
                <CardDescription>
                  Gestiona tu inventario programáticamente desde cualquier sistema externo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">🔗 Base URL</h3>
                    <code className="text-sm bg-muted p-2 rounded block">{baseUrl}/api/products</code>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">📄 Formato</h3>
                    <p className="text-sm">JSON (application/json)</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">🔐 Autenticación</h3>
                    <p className="text-sm">No requerida (por ahora)</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">⚡ Rate Limit</h3>
                    <p className="text-sm">Sin límites actualmente</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold">Campos de Producto</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div>
                      <code>name</code> - Nombre del producto (requerido)
                    </div>
                    <div>
                      <code>sku</code> - Código único (requerido)
                    </div>
                    <div>
                      <code>brand</code> - Marca del producto
                    </div>
                    <div>
                      <code>category</code> - Categoría
                    </div>
                    <div>
                      <code>price</code> - Precio en pesos
                    </div>
                    <div>
                      <code>stock</code> - Cantidad disponible
                    </div>
                    <div>
                      <code>description</code> - Descripción detallada
                    </div>
                    <div>
                      <code>imageUrl</code> - URL de la imagen
                    </div>
                    <div>
                      <code>available</code> - Disponible (true/false)
                    </div>
                    <div>
                      <code>installationRequired</code> - Requiere instalación
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="endpoints" className="space-y-4">
            <div className="space-y-4">
              {/* GET Products */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">GET</Badge>
                    <CardTitle className="text-lg">/api/products</CardTitle>
                  </div>
                  <CardDescription>Obtener lista de productos con filtros opcionales</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Parámetros de consulta:</h4>
                    <ul className="text-sm space-y-1 ml-4">
                      <li>
                        <code>?search=motor</code> - Buscar en nombre, SKU, marca
                      </li>
                      <li>
                        <code>?category=motores</code> - Filtrar por categoría
                      </li>
                      <li>
                        <code>?brand=Samsung</code> - Filtrar por marca
                      </li>
                      <li>
                        <code>?id=123</code> - Obtener producto específico
                      </li>
                    </ul>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="text-sm bg-muted p-2 rounded flex-1">
                      GET {baseUrl}/api/products?search=motor&category=motores
                    </code>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(`GET ${baseUrl}/api/products?search=motor&category=motores`)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* POST Products */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Badge variant="default">POST</Badge>
                    <CardTitle className="text-lg">/api/products</CardTitle>
                  </div>
                  <CardDescription>Crear uno o múltiples productos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Body (JSON):</h4>
                    <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                      {`{
  "name": "Motor Lavadora Samsung",
  "sku": "MOT-SAM-001",
  "brand": "Samsung",
  "category": "motores",
  "price": 2500,
  "stock": 5,
  "description": "Motor original para lavadoras Samsung",
  "available": true,
  "installationRequired": true
}`}
                    </pre>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="text-sm bg-muted p-2 rounded flex-1">POST {baseUrl}/api/products</code>
                    <Button size="sm" variant="outline" onClick={() => copyToClipboard(`POST ${baseUrl}/api/products`)}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* PUT Products */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">PUT</Badge>
                    <CardTitle className="text-lg">/api/products</CardTitle>
                  </div>
                  <CardDescription>Actualizar producto existente</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Parámetros requeridos:</h4>
                    <p className="text-sm">
                      <code>?id=123</code> - ID del producto a actualizar
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="text-sm bg-muted p-2 rounded flex-1">PUT {baseUrl}/api/products?id=123</code>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(`PUT ${baseUrl}/api/products?id=123`)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* DELETE Products */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Badge variant="destructive">DELETE</Badge>
                    <CardTitle className="text-lg">/api/products</CardTitle>
                  </div>
                  <CardDescription>Eliminar producto</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Parámetros requeridos:</h4>
                    <p className="text-sm">
                      <code>?id=123</code> - ID del producto a eliminar
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="text-sm bg-muted p-2 rounded flex-1">DELETE {baseUrl}/api/products?id=123</code>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(`DELETE ${baseUrl}/api/products?id=123`)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="examples" className="space-y-4">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>JavaScript / Node.js</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="text-xs bg-muted p-4 rounded overflow-x-auto">
                    {`// Obtener todos los productos
const response = await fetch('${baseUrl}/api/products');
const data = await response.json();
console.log(data.products);

// Crear un producto
const newProduct = {
  name: "Motor Lavadora Samsung",
  sku: "MOT-SAM-001",
  brand: "Samsung",
  category: "motores",
  price: 2500,
  stock: 5
};

const createResponse = await fetch('${baseUrl}/api/products', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(newProduct)
});

const result = await createResponse.json();
console.log(result);`}
                  </pre>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Python</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="text-xs bg-muted p-4 rounded overflow-x-auto">
                    {`import requests
import json

# Obtener productos
response = requests.get('${baseUrl}/api/products')
products = response.json()
print(f"Total productos: {products['total']}")

# Crear producto
new_product = {
    "name": "Motor Lavadora Samsung",
    "sku": "MOT-SAM-001",
    "brand": "Samsung",
    "category": "motores",
    "price": 2500,
    "stock": 5
}

response = requests.post(
    '${baseUrl}/api/products',
    headers={'Content-Type': 'application/json'},
    data=json.dumps(new_product)
)

result = response.json()
print(result)`}
                  </pre>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>cURL</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="text-xs bg-muted p-4 rounded overflow-x-auto">
                    {`# Obtener productos
curl -X GET "${baseUrl}/api/products"

# Crear producto
curl -X POST "${baseUrl}/api/products" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Motor Lavadora Samsung",
    "sku": "MOT-SAM-001",
    "brand": "Samsung",
    "category": "motores",
    "price": 2500,
    "stock": 5
  }'

# Actualizar producto
curl -X PUT "${baseUrl}/api/products?id=123" \\
  -H "Content-Type: application/json" \\
  -d '{"price": 2800, "stock": 10}'

# Eliminar producto
curl -X DELETE "${baseUrl}/api/products?id=123"`}
                  </pre>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="scripts" className="space-y-4">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Script de Sincronización Automática</CardTitle>
                  <CardDescription>Python script para sincronizar inventario cada hora</CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="text-xs bg-muted p-4 rounded overflow-x-auto">
                    {`#!/usr/bin/env python3
import requests
import json
import time
import schedule

NEXU_API_URL = "${baseUrl}/api/products"

def sync_inventory():
    """Sincronizar inventario con Nexu"""
    try:
        # Obtener productos de tu sistema ERP/base de datos
        products = get_products_from_your_system()
        
        # Limpiar inventario actual (opcional)
        current_products = requests.get(NEXU_API_URL).json()
        for product in current_products.get('products', []):
            requests.delete(f"{NEXU_API_URL}?id={product['id']}")
        
        # Subir productos actualizados
        for product in products:
            response = requests.post(
                NEXU_API_URL,
                headers={'Content-Type': 'application/json'},
                data=json.dumps(product)
            )
            if response.status_code == 201:
                print(f"✅ Producto {product['name']} sincronizado")
            else:
                print(f"❌ Error con {product['name']}: {response.text}")
                
        print(f"🎉 Sincronización completada: {len(products)} productos")
        
    except Exception as e:
        print(f"❌ Error en sincronización: {e}")

def get_products_from_your_system():
    """Reemplaza esta función con tu lógica de obtener productos"""
    # Ejemplo: conectar a tu base de datos, ERP, etc.
    return [
        {
            "name": "Producto desde ERP",
            "sku": "ERP-001",
            "brand": "Mi Marca",
            "category": "categoria",
            "price": 1000,
            "stock": 5
        }
    ]

# Programar sincronización cada hora
schedule.every().hour.do(sync_inventory)

# Ejecutar inmediatamente
sync_inventory()

# Mantener el script corriendo
while True:
    schedule.run_pending()
    time.sleep(60)`}
                  </pre>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Script de Importación desde CSV</CardTitle>
                  <CardDescription>Node.js script para importar desde archivos CSV</CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="text-xs bg-muted p-4 rounded overflow-x-auto">
                    {`const fs = require('fs');
const csv = require('csv-parser');
const fetch = require('node-fetch');

const NEXU_API_URL = '${baseUrl}/api/products';
const CSV_FILE = 'productos.csv';

async function importFromCSV() {
  const products = [];
  
  return new Promise((resolve, reject) => {
    fs.createReadStream(CSV_FILE)
      .pipe(csv())
      .on('data', (row) => {
        products.push({
          name: row.name,
          sku: row.sku,
          brand: row.brand || 'Sin marca',
          category: row.category || 'general',
          price: parseFloat(row.price) || 0,
          stock: parseInt(row.stock) || 0,
          description: row.description || '',
          available: row.available !== 'false',
          installationRequired: row.installationRequired === 'true'
        });
      })
      .on('end', async () => {
        console.log(\`📄 Procesando \${products.length} productos del CSV\`);
        
        for (const product of products) {
          try {
            const response = await fetch(NEXU_API_URL, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(product)
            });
            
            if (response.ok) {
              console.log(\`✅ \${product.name} importado\`);
            } else {
              console.log(\`❌ Error con \${product.name}\`);
            }
          } catch (error) {
            console.log(\`❌ Error: \${error.message}\`);
          }
        }
        
        console.log('🎉 Importación completada');
        resolve();
      })
      .on('error', reject);
  });
}

importFromCSV().catch(console.error);`}
                  </pre>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Webhook para Actualizaciones en Tiempo Real</CardTitle>
                  <CardDescription>Recibir notificaciones cuando cambien los productos</CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="text-xs bg-muted p-4 rounded overflow-x-auto">
                    {`// Express.js webhook receiver
const express = require('express');
const app = express();

app.use(express.json());

app.post('/webhook/product-updated', (req, res) => {
  const { action, product } = req.body;
  
  console.log(\`📦 Producto \${action}: \${product.name}\`);
  
  // Tu lógica personalizada aquí
  switch(action) {
    case 'created':
      handleProductCreated(product);
      break;
    case 'updated':
      handleProductUpdated(product);
      break;
    case 'deleted':
      handleProductDeleted(product);
      break;
  }
  
  res.json({ success: true });
});

function handleProductCreated(product) {
  // Notificar a tu sistema ERP
  // Actualizar cache
  // Enviar email de notificación
}

app.listen(3001, () => {
  console.log('🎣 Webhook listener en puerto 3001');
});`}
                  </pre>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminGuard>
  )
}
