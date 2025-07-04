import { Resend } from "resend"

// Inicializar Resend con tu API key
const resend = new Resend(process.env.RESEND_API_KEY)

interface AppointmentData {
  name: string
  phone: string
  email?: string
  address: string
  zone: string
  appliance: string
  problem: string
  date: string
  time: string
  appointmentId: string
}

export async function sendAppointmentEmail(data: AppointmentData) {
  // Verificar API key
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY no está configurada")
  }

  const adminEmail = "davidbarrera.ar@gmail.com"

  // Formatear datos
  const formattedDate = new Date(data.date).toLocaleDateString("es-MX", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const timeLabels = {
    morning: "Mañana (9:00 - 12:00)",
    afternoon: "Tarde (12:00 - 17:00)",
    evening: "Noche (17:00 - 20:00)",
  }

  // Template HTML optimizado
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Nueva Cita Nexu</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f8fafc; }
        .container { max-width: 600px; margin: 0 auto; background: white; }
        .header { background: linear-gradient(135deg, #1e293b, #334155); color: white; padding: 30px 20px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
        .urgent-banner { background: #fef2f2; border: 2px solid #fecaca; padding: 15px; margin: 20px; border-radius: 8px; text-align: center; }
        .urgent-banner h3 { color: #dc2626; margin: 0 0 5px 0; font-size: 18px; }
        .urgent-banner p { color: #dc2626; margin: 0; font-weight: 600; }
        .section { padding: 25px; border-bottom: 1px solid #e2e8f0; }
        .section h2 { color: #1e293b; margin: 0 0 20px 0; font-size: 20px; font-weight: 600; }
        .info-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f1f5f9; }
        .info-label { font-weight: 600; color: #64748b; }
        .info-value { color: #1e293b; font-weight: 500; }
        .problem-box { background: #f1f5f9; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6; margin-top: 15px; }
        .contact-buttons { text-align: center; padding: 25px; background: #f8fafc; }
        .btn { display: inline-block; padding: 15px 30px; margin: 0 10px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; }
        .btn-whatsapp { background: #25d366; color: white; }
        .btn-phone { background: #3b82f6; color: white; }
        .checklist { background: #dcfce7; padding: 25px; }
        .checklist h3 { color: #166534; margin: 0 0 15px 0; }
        .checklist ul { color: #166534; margin: 0; padding-left: 20px; }
        .checklist li { margin-bottom: 8px; font-size: 15px; }
        .footer { background: #1e293b; color: white; padding: 25px; text-align: center; }
        .appointment-id { font-family: monospace; font-size: 24px; font-weight: bold; margin: 10px 0; letter-spacing: 2px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔧 NUEVA CITA AGENDADA</h1>
          <p style="margin: 8px 0 0 0; opacity: 0.9; font-size: 16px;">Nexu - Refacciones Pro</p>
        </div>
        
        <div class="urgent-banner">
          <h3>🚨 ACCIÓN INMEDIATA REQUERIDA</h3>
          <p>Contactar al cliente en las próximas 2 horas para confirmar la cita</p>
        </div>

        <div class="section">
          <h2>👤 Información del Cliente</h2>
          <div class="info-row">
            <span class="info-label">Nombre:</span>
            <span class="info-value">${data.name}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Teléfono:</span>
            <span class="info-value">${data.phone}</span>
          </div>
          ${data.email ? `<div class="info-row"><span class="info-label">Email:</span><span class="info-value">${data.email}</span></div>` : ""}
          <div class="info-row">
            <span class="info-label">Zona:</span>
            <span class="info-value" style="text-transform: capitalize;">${data.zone.replace("-", " ")}</span>
          </div>
          <div style="margin-top: 15px;">
            <div class="info-label">Dirección completa:</div>
            <div style="margin-top: 5px; padding: 15px; background: #f8fafc; border-radius: 6px; border: 1px solid #e2e8f0;">
              ${data.address}
            </div>
          </div>
        </div>

        <div class="section">
          <h2>🔧 Detalles del Servicio</h2>
          <div class="info-row">
            <span class="info-label">Electrodoméstico:</span>
            <span class="info-value" style="text-transform: capitalize; color: #dc2626; font-weight: 700;">${data.appliance}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Fecha solicitada:</span>
            <span class="info-value" style="font-weight: 700;">${formattedDate}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Horario:</span>
            <span class="info-value" style="font-weight: 700;">${timeLabels[data.time as keyof typeof timeLabels]}</span>
          </div>
          
          <div class="problem-box">
            <div style="font-weight: 600; color: #64748b; margin-bottom: 10px;">Problema descrito:</div>
            <div style="color: #1e293b; line-height: 1.6; font-size: 15px;">${data.problem}</div>
          </div>
        </div>

        <div class="contact-buttons">
          <h2 style="color: #1e293b; margin: 0 0 20px 0;">📱 Contacto Inmediato</h2>
          <a href="https://wa.me/52${data.phone.replace(/\D/g, "")}" class="btn btn-whatsapp">
            💬 Abrir WhatsApp
          </a>
          <a href="tel:${data.phone}" class="btn btn-phone">
            📞 Llamar Ahora
          </a>
        </div>

        <div class="checklist">
          <h3>⚡ Lista de Verificación - Próximos Pasos:</h3>
          <ul>
            <li><strong>☐ URGENTE: Contactar cliente en máximo 2 horas</strong></li>
            <li>☐ Verificar disponibilidad de técnico en ${data.zone.replace("-", " ")}</li>
            <li>☐ Confirmar fecha definitiva: ${formattedDate}</li>
            <li>☐ Preparar refacciones comunes para ${data.appliance}</li>
            <li>☐ Programar recordatorio automático 24h antes</li>
            <li>☐ Actualizar estado de cita en sistema</li>
            <li>☐ Enviar confirmación final al cliente</li>
          </ul>
        </div>

        <div class="footer">
          <p style="margin: 0; font-size: 14px; opacity: 0.8;">ID de Cita:</p>
          <div class="appointment-id">${data.appointmentId}</div>
          <div style="font-size: 12px; opacity: 0.7; margin-top: 15px;">
            Generado automáticamente • ${new Date().toLocaleString("es-MX", {
              timeZone: "America/Mexico_City",
            })}
          </div>
        </div>
      </div>
    </body>
    </html>
  `

  try {
    console.log("📧 Enviando notificación de cita a:", adminEmail)

    const result = await resend.emails.send({
      from: "Nexu Citas <onboarding@resend.dev>",
      to: [adminEmail],
      subject: `🚨 NUEVA CITA URGENTE: ${data.name} - ${data.appliance} - ${formattedDate}`,
      html: htmlContent,
      headers: {
        "X-Priority": "1",
        "X-MSMail-Priority": "High",
        Importance: "high",
      },
      tags: [
        { name: "category", value: "appointment" },
        { name: "zone", value: data.zone },
        { name: "appliance", value: data.appliance },
        { name: "urgent", value: "true" },
      ],
    })

    console.log("✅ Email enviado exitosamente!")
    console.log("📧 Email ID:", result.data?.id)

    return {
      success: true,
      provider: "resend",
      emailId: result.data?.id,
      recipient: adminEmail,
      appointmentId: data.appointmentId,
    }
  } catch (error) {
    console.error("❌ Error enviando email:", error)
    throw error
  }
}
