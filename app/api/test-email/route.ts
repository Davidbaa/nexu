import { type NextRequest, NextResponse } from "next/server"
import { testResendConfiguration } from "../appointments/send-email"

export async function GET(request: NextRequest) {
  try {
    console.log("🧪 Iniciando test de configuración de Resend...")

    // Verificar que la API key esté presente
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          error: "RESEND_API_KEY no configurada",
          solution: "Agrega la API key a las variables de entorno",
          details: "La variable de entorno RESEND_API_KEY no está definida",
        },
        { status: 400 },
      )
    }

    // Ejecutar test
    const result = await testResendConfiguration()

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "✅ Sistema configurado correctamente",
        emailId: result.emailId,
        details: {
          recipient: "davidbarrera.ar@gmail.com",
          subject: "✅ Test Nexu - Configuración Exitosa",
          timestamp: new Date().toISOString(),
          apiKeyConfigured: true,
          apiKeyPrefix: process.env.RESEND_API_KEY.substring(0, 10) + "...",
        },
        nextSteps: [
          "Revisa tu email (davidbarrera.ar@gmail.com)",
          "Verifica que el email llegó correctamente",
          "Haz una cita de prueba desde el sitio web",
          "Confirma que recibes la notificación de cita",
        ],
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
          solution: result.solution,
          apiKeyPresent: !!process.env.RESEND_API_KEY,
          timestamp: new Date().toISOString(),
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("❌ Error en test de email:", error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
        solution: "Verifica la configuración de Resend",
        apiKeyPresent: !!process.env.RESEND_API_KEY,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
