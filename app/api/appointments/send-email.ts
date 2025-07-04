import type React from "react"
import { Resend } from "resend"
import { AppointmentEmailTemplate } from "@/app/api/appointments/email-template"
import type { Appointment } from "@/components/appointment-booking"

// Patrón Singleton para el cliente de Resend
let resend: Resend | null = null

function getResendClient() {
  if (!resend) {
    if (!process.env.RESEND_API_KEY) {
      // En desarrollo, podemos registrar un warning en lugar de lanzar un error
      if (process.env.NODE_ENV === "development") {
        console.warn("RESEND_API_KEY no está configurada. Los correos no se enviarán.")
        // Devolvemos un cliente "mock" para evitar que la app crashee
        return {
          emails: {
            send: async (payload: any) => {
              console.log("Simulando envío de email:", payload)
              return { data: { id: "mock_id" }, error: null }
            },
          },
        } as any // Usamos 'as any' para el mock
      }
      // En producción, es un error fatal
      throw new Error("Missing RESEND_API_KEY environment variable.")
    }
    resend = new Resend(process.env.RESEND_API_KEY)
  }
  return resend
}

export async function sendAppointmentConfirmationEmail(appointment: Appointment) {
  try {
    const client = getResendClient()
    const { data, error } = await client.emails.send({
      from: "Nexu <onboarding@resend.dev>",
      to: [appointment.email],
      subject: "Confirmación de Cita - Nexu",
      react: AppointmentEmailTemplate({ appointment }) as React.ReactElement,
    })

    if (error) {
      console.error("Error al enviar email:", error)
      // Podríamos lanzar el error para que el llamador lo maneje
      throw new Error(`Failed to send email: ${error.message}`)
    }

    console.log("Email enviado con éxito, ID:", data?.id)
    return { success: true, messageId: data?.id }
  } catch (error) {
    console.error("Excepción al enviar email:", error)
    // Aseguramos que siempre se devuelva un objeto con success: false en caso de error
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}
