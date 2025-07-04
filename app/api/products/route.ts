import { type NextRequest, NextResponse } from "next/server"

// Simulación de base de datos en memoria para el ejemplo
// En producción, esto se conectaría a tu base de datos real
const products: any[] = []

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const available = searchParams.get("available")

    let filteredProducts = products

    if (category) {
      filteredProducts = filteredProducts.filter((p) => p.category.toLowerCase() === category.toLowerCase())
    }

    if (available !== null) {
      filteredProducts = filteredProducts.filter((p) => p.available === (available === "true"))
    }

    return NextResponse.json({
      success: true,
      data: filteredProducts,
      total: filteredProducts.length,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Error al obtener productos" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validar campos requeridos
    if (!body.name || !body.sku || !body.price) {
      return NextResponse.json({ success: false, error: "Campos requeridos: name, sku, price" }, { status: 400 })
    }

    const newProduct = {
      id: Date.now().toString(),
      name: body.name,
      sku: body.sku,
      brand: body.brand || "Sin marca",
      category: body.category || "General",
      price: Number(body.price),
      stock: Number(body.stock) || 0,
      description: body.description || "",
      imageUrl: body.imageUrl || "/placeholder.svg?height=300&width=300",
      available: body.available !== false,
      installationRequired: body.installationRequired === true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    products.push(newProduct)

    return NextResponse.json(
      {
        success: true,
        data: newProduct,
        message: "Producto creado exitosamente",
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ success: false, error: "Error al crear producto" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ success: false, error: "ID de producto requerido" }, { status: 400 })
    }

    const productIndex = products.findIndex((p) => p.id === id)

    if (productIndex === -1) {
      return NextResponse.json({ success: false, error: "Producto no encontrado" }, { status: 404 })
    }

    products[productIndex] = {
      ...products[productIndex],
      ...body,
      id, // Mantener el ID original
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      data: products[productIndex],
      message: "Producto actualizado exitosamente",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Error al actualizar producto" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ success: false, error: "ID de producto requerido" }, { status: 400 })
    }

    const productIndex = products.findIndex((p) => p.id === id)

    if (productIndex === -1) {
      return NextResponse.json({ success: false, error: "Producto no encontrado" }, { status: 404 })
    }

    const deletedProduct = products.splice(productIndex, 1)[0]

    return NextResponse.json({
      success: true,
      data: deletedProduct,
      message: "Producto eliminado exitosamente",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Error al eliminar producto" }, { status: 500 })
  }
}
