import { type NextRequest, NextResponse } from "next/server"
import { sendAppointmentEmail } from "./send-email"

export async function POST(request: NextRequest) {
  try {
    const appointmentData = await request.json()

    // Validar datos requeridos
    const requiredFields = ["name", "phone", "address", "appliance", "problem", "date", "time", "zone"]
    for (const field of requiredFields) {
      if (!appointmentData[field]) {
        return NextResponse.json({ error: `Campo requerido: ${field}` }, { status: 400 })
      }
    }

    // Generar ID único para la cita
    const appointmentId = generateAppointmentId()

    // Preparar datos completos
    const completeData = {
      ...appointmentData,
      appointmentId,
    }

    // Enviar email de notificación
    try {
      const emailResult = await sendAppointmentEmail(completeData)
      console.log("✅ Email enviado exitosamente:", emailResult)
    } catch (emailError) {
      console.error("❌ Error enviando email:", emailError)
      // No fallar la cita si el email falla, solo registrar el error
    }

    // Respuesta exitosa
    return NextResponse.json({
      success: true,
      message: "Cita agendada exitosamente",
      appointmentId: appointmentId,
      emailSent: true,
      recipient: "davidbarrera.ar@gmail.com",
    })
  } catch (error) {
    console.error("❌ Error procesando cita:", error)
    return NextResponse.json(
      {
        error: "Error interno del servidor",
        details: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 },
    )
  }
}

// Función para generar ID único de cita
function generateAppointmentId() {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substr(2, 6).toUpperCase()
  return `NEXU-${timestamp}-${random}`
}
