import { type NextRequest, NextResponse } from "next/server"
import { testResendConfiguration } from "../appointments/send-email"

export async function GET(request: NextRequest) {
  try {
    const result = await testResendConfiguration()

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "✅ Resend configurado correctamente",
        emailId: result.emailId,
        details: "Revisa tu email para confirmar que llegó el mensaje de prueba",
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
          solution: result.solution,
        },
        { status: 400 },
      )
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Error en la configuración",
        details: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 },
    )
  }
}
