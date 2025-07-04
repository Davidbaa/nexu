import { type NextRequest, NextResponse } from "next/server"

// Simulamos el store del lado del servidor
// En producción, esto se conectaría a una base de datos real
const serverProducts: any[] = []

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    const search = searchParams.get("search")
    const category = searchParams.get("category")
    const brand = searchParams.get("brand")

    // Si se solicita un producto específico
    if (id) {
      const product = serverProducts.find((p) => p.id === id)
      if (!product) {
        return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 })
      }
      return NextResponse.json(product)
    }

    let filteredProducts = [...serverProducts]

    // Aplicar filtros
    if (search) {
      const searchLower = search.toLowerCase()
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchLower) ||
          product.sku.toLowerCase().includes(searchLower) ||
          product.brand.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower),
      )
    }

    if (category) {
      filteredProducts = filteredProducts.filter((product) => product.category === category)
    }

    if (brand) {
      filteredProducts = filteredProducts.filter((product) => product.brand === brand)
    }

    return NextResponse.json({
      products: filteredProducts,
      total: filteredProducts.length,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error en GET /api/products:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validar si es un array de productos o un solo producto
    const products = Array.isArray(body) ? body : [body]

    const newProducts = []

    for (const productData of products) {
      // Validar campos requeridos
      if (!productData.name || !productData.sku) {
        return NextResponse.json({ error: "Campos requeridos: name, sku" }, { status: 400 })
      }

      // Verificar que el SKU no exista
      if (serverProducts.some((p) => p.sku === productData.sku)) {
        return NextResponse.json({ error: `SKU ${productData.sku} ya existe` }, { status: 409 })
      }

      const newProduct = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: productData.name,
        sku: productData.sku,
        brand: productData.brand || "Sin marca",
        category: productData.category || "general",
        price: Number(productData.price) || 0,
        stock: Number(productData.stock) || 0,
        description: productData.description || "",
        imageUrl: productData.imageUrl || "/placeholder.svg?height=300&width=300",
        available: productData.available !== false,
        installationRequired: productData.installationRequired === true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      serverProducts.push(newProduct)
      newProducts.push(newProduct)
    }

    return NextResponse.json(
      {
        success: true,
        products: newProducts,
        message: `${newProducts.length} producto(s) creado(s) exitosamente`,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error en POST /api/products:", error)
    return NextResponse.json({ error: "Error procesando la solicitud" }, { status: 400 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "ID del producto requerido" }, { status: 400 })
    }

    const body = await request.json()
    const productIndex = serverProducts.findIndex((p) => p.id === id)

    if (productIndex === -1) {
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 })
    }

    // Actualizar producto
    const updatedProduct = {
      ...serverProducts[productIndex],
      ...body,
      id, // Mantener el ID original
      updatedAt: new Date().toISOString(),
    }

    serverProducts[productIndex] = updatedProduct

    return NextResponse.json({
      success: true,
      product: updatedProduct,
      message: "Producto actualizado exitosamente",
    })
  } catch (error) {
    console.error("Error en PUT /api/products:", error)
    return NextResponse.json({ error: "Error procesando la solicitud" }, { status: 400 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "ID del producto requerido" }, { status: 400 })
    }

    const productIndex = serverProducts.findIndex((p) => p.id === id)

    if (productIndex === -1) {
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 })
    }

    const deletedProduct = serverProducts.splice(productIndex, 1)[0]

    return NextResponse.json({
      success: true,
      product: deletedProduct,
      message: "Producto eliminado exitosamente",
    })
  } catch (error) {
    console.error("Error en DELETE /api/products:", error)
    return NextResponse.json({ error: "Error procesando la solicitud" }, { status: 500 })
  }
}
