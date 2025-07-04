import { type NextRequest, NextResponse } from "next/server"
import { sendAppointmentEmail, sendClientConfirmation } from "./send-email"

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

    // Validar formato de fecha
    const appointmentDate = new Date(appointmentData.date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (appointmentDate < today) {
      return NextResponse.json({ error: "La fecha no puede ser en el pasado" }, { status: 400 })
    }

    // Generar ID único para la cita
    const appointmentId = generateAppointmentId()

    // Preparar datos completos
    const completeData = {
      ...appointmentData,
      appointmentId,
    }

    const emailResults = {
      adminEmail: null as any,
      clientEmail: null as any,
    }

    // Enviar email de notificación al administrador
    try {
      emailResults.adminEmail = await sendAppointmentEmail(completeData)
      console.log("✅ Email admin enviado:", emailResults.adminEmail.emailId)
    } catch (emailError) {
      console.error("❌ Error enviando email admin:", emailError)
      // Continuar aunque falle el email
    }

    // Enviar confirmación al cliente (si tiene email)
    if (appointmentData.email) {
      try {
        emailResults.clientEmail = await sendClientConfirmation(completeData)
        console.log("✅ Confirmación cliente enviada:", emailResults.clientEmail?.emailId)
      } catch (emailError) {
        console.error("❌ Error enviando confirmación cliente:", emailError)
        // No es crítico si falla
      }
    }

    // Respuesta exitosa
    return NextResponse.json({
      success: true,
      message: "Cita agendada exitosamente",
      appointmentId: appointmentId,
      emails: {
        adminSent: !!emailResults.adminEmail?.success,
        clientSent: !!emailResults.clientEmail?.success,
        adminEmailId: emailResults.adminEmail?.emailId,
        clientEmailId: emailResults.clientEmail?.emailId,
      },
      nextSteps: [
        "El administrador ha sido notificado",
        "Un técnico te contactará en 2 horas",
        "Recibirás confirmación de fecha definitiva",
        "Te enviaremos recordatorio 24h antes",
      ],
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
  const date = new Date().toISOString().slice(2, 10).replace(/-/g, "")
  return `NEXU-${date}-${random}`
}
