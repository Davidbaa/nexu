import { type NextRequest, NextResponse } from "next/server"
import { testResendConfiguration } from "../appointments/send-email"

export async function POST(request: NextRequest) {
  try {
    console.log("🧪 Iniciando test de configuración de email...")

    const result = await testResendConfiguration()

    if (result.success) {
      console.log("✅ Test de email exitoso")
      return NextResponse.json({
        success: true,
        message: "Email de prueba enviado correctamente. Revisa tu bandeja de entrada.",
        emailId: result.emailId,
        timestamp: new Date().toISOString(),
      })
    } else {
      console.log("❌ Test de email falló:", result.error)
      return NextResponse.json(
        {
          success: false,
          error: result.error,
          solution: result.solution,
          timestamp: new Date().toISOString(),
        },
        { status: 400 },
      )
    }
  } catch (error) {
    console.error("❌ Error en test de email:", error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido en el test",
        solution: "Verifica que RESEND_API_KEY esté configurada correctamente",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Endpoint de test de email. Usa POST para ejecutar la prueba.",
    timestamp: new Date().toISOString(),
  })
}
