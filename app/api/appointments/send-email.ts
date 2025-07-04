import { Resend } from "resend"

// Inicializar Resend
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
  const adminEmail = "davidbarrera.ar@gmail.com"

  // Formatear datos para el email
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

  // Template HTML profesional
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
        .header p { margin: 8px 0 0 0; opacity: 0.9; font-size: 16px; }
        .content { padding: 0; }
        .section { margin: 0; padding: 25px; border-bottom: 1px solid #e2e8f0; }
        .section:last-child { border-bottom: none; }
        .section h2 { color: #1e293b; margin: 0 0 20px 0; font-size: 20px; font-weight: 600; display: flex; align-items: center; }
        .section h2 .emoji { margin-right: 10px; font-size: 24px; }
        .info-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 12px; margin-bottom: 15px; }
        .info-label { font-weight: 600; color: #64748b; font-size: 14px; }
        .info-value { color: #1e293b; font-size: 14px; }
        .problem-box { background: #f1f5f9; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6; margin-top: 15px; }
        .problem-label { font-weight: 600; color: #64748b; margin-bottom: 8px; font-size: 14px; }
        .problem-text { color: #1e293b; line-height: 1.5; font-size: 14px; }
        .actions { background: #dcfce7; padding: 25px; margin: 0; }
        .actions h3 { color: #166534; margin: 0 0 15px 0; font-size: 18px; font-weight: 600; }
        .actions ul { color: #166534; margin: 0; padding-left: 20px; }
        .actions li { margin-bottom: 8px; font-size: 14px; }
        .contact-buttons { text-align: center; padding: 25px; background: #f8fafc; }
        .contact-buttons h3 { color: #1e293b; margin: 0 0 20px 0; font-size: 18px; }
        .btn { display: inline-block; padding: 12px 24px; margin: 0 8px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px; }
        .btn-whatsapp { background: #25d366; color: white; }
        .btn-phone { background: #3b82f6; color: white; }
        .footer { background: #1e293b; color: white; padding: 25px; text-align: center; }
        .appointment-id { font-family: 'SF Mono', Monaco, monospace; font-size: 20px; font-weight: 700; margin: 8px 0; letter-spacing: 1px; }
        .timestamp { font-size: 12px; opacity: 0.7; margin-top: 15px; }
        @media (max-width: 600px) {
          .info-grid { grid-template-columns: 1fr; gap: 8px; }
          .btn { display: block; margin: 8px 0; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔧 Nueva Cita Agendada</h1>
          <p>Nexu - Refacciones Pro</p>
        </div>
        
        <div class="content">
          <div class="section">
            <h2><span class="emoji">👤</span>Información del Cliente</h2>
            <div class="info-grid">
              <div class="info-label">Nombre:</div>
              <div class="info-value">${data.name}</div>
              <div class="info-label">Teléfono:</div>
              <div class="info-value">${data.phone}</div>
              ${data.email ? `<div class="info-label">Email:</div><div class="info-value">${data.email}</div>` : ""}
              <div class="info-label">Zona:</div>
              <div class="info-value" style="text-transform: capitalize;">${data.zone.replace("-", " ")}</div>
            </div>
            <div class="info-label">Dirección completa:</div>
            <div class="info-value" style="margin-top: 5px; padding: 10px; background: #f8fafc; border-radius: 6px;">${data.address}</div>
          </div>

          <div class="section">
            <h2><span class="emoji">🔧</span>Detalles del Servicio</h2>
            <div class="info-grid">
              <div class="info-label">Electrodoméstico:</div>
              <div class="info-value" style="text-transform: capitalize; font-weight: 600;">${data.appliance}</div>
              <div class="info-label">Fecha solicitada:</div>
              <div class="info-value" style="font-weight: 600;">${formattedDate}</div>
              <div class="info-label">Horario:</div>
              <div class="info-value" style="font-weight: 600;">${timeLabels[data.time as keyof typeof timeLabels]}</div>
            </div>
            
            <div class="problem-box">
              <div class="problem-label">Problema descrito:</div>
              <div class="problem-text">${data.problem}</div>
            </div>
          </div>

          <div class="actions">
            <h3>⚡ Próximos Pasos:</h3>
            <ul>
              <li><strong>Contactar al cliente en las próximas 2 horas</strong></li>
              <li>Confirmar disponibilidad de técnico para ${data.zone.replace("-", " ")}</li>
              <li>Agendar cita definitiva para ${formattedDate}</li>
              <li>Enviar recordatorio 24h antes de la cita</li>
              <li>Preparar refacciones comunes para ${data.appliance}</li>
            </ul>
          </div>

          <div class="contact-buttons">
            <h3>📱 Contacto Directo</h3>
            <a href="https://wa.me/52${data.phone.replace(/\D/g, "")}" class="btn btn-whatsapp">
              💬 Abrir WhatsApp
            </a>
            <a href="tel:${data.phone}" class="btn btn-phone">
              📞 Llamar Ahora
            </a>
          </div>
        </div>

        <div class="footer">
          <p style="margin: 0; font-size: 14px; opacity: 0.8;">ID de Cita:</p>
          <div class="appointment-id">${data.appointmentId}</div>
          <div class="timestamp">
            Generado automáticamente • ${new Date().toLocaleString("es-MX", {
              timeZone: "America/Mexico_City",
            })}
          </div>
        </div>
      </div>
    </body>
    </html>
  `

  // Texto plano como fallback
  const textContent = `
NUEVA CITA NEXU - ${data.appointmentId}

CLIENTE:
- Nombre: ${data.name}
- Teléfono: ${data.phone}
${data.email ? `- Email: ${data.email}` : ""}
- Dirección: ${data.address}
- Zona: ${data.zone.replace("-", " ")}

SERVICIO:
- Electrodoméstico: ${data.appliance}
- Fecha: ${formattedDate}
- Horario: ${timeLabels[data.time as keyof typeof timeLabels]}
- Problema: ${data.problem}

PRÓXIMOS PASOS:
1. Contactar cliente en 2 horas
2. Confirmar técnico disponible
3. Agendar cita definitiva
4. Enviar recordatorio 24h antes

WhatsApp: https://wa.me/52${data.phone.replace(/\D/g, "")}
Teléfono: ${data.phone}

---
Generado automáticamente por Nexu
${new Date().toLocaleString("es-MX")}
  `

  try {
    // Enviar email con Resend
    const result = await resend.emails.send({
      from: "Nexu Citas <citas@nexu.mx>",
      to: [adminEmail],
      subject: `🔧 Nueva Cita: ${data.name} - ${data.appliance} - ${formattedDate}`,
      html: htmlContent,
      text: textContent,
      headers: {
        "X-Priority": "1", // Alta prioridad
        "X-MSMail-Priority": "High",
      },
      tags: [
        { name: "category", value: "appointment" },
        { name: "zone", value: data.zone },
        { name: "appliance", value: data.appliance },
      ],
    })

    console.log("✅ Email enviado exitosamente con Resend:", result.data?.id)

    return {
      success: true,
      provider: "resend",
      emailId: result.data?.id,
      recipient: adminEmail,
      subject: `🔧 Nueva Cita: ${data.name} - ${data.appliance}`,
      appointmentId: data.appointmentId,
    }
  } catch (error) {
    console.error("❌ Error enviando email con Resend:", error)
    throw new Error(`Error enviando email: ${error instanceof Error ? error.message : "Error desconocido"}`)
  }
}

// Función adicional para enviar confirmación al cliente (opcional)
export async function sendClientConfirmation(data: AppointmentData) {
  if (!data.email) return null

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

  const clientHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 500px; margin: 0 auto; background: white; }
        .header { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 25px; text-align: center; }
        .content { padding: 25px; }
        .section { margin-bottom: 20px; padding: 20px; background: #f8fafc; border-radius: 8px; }
        .highlight { background: #dcfce7; padding: 15px; border-radius: 6px; border-left: 4px solid #10b981; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0;">✅ Cita Confirmada</h1>
          <p style="margin: 8px 0 0 0;">Nexu - Refacciones Pro</p>
        </div>
        
        <div class="content">
          <p>Hola <strong>${data.name}</strong>,</p>
          
          <p>Hemos recibido tu solicitud de cita para tu <strong>${data.appliance}</strong>.</p>
          
          <div class="section">
            <h3 style="margin-top: 0; color: #1e293b;">📅 Detalles de tu Cita</h3>
            <p><strong>Fecha solicitada:</strong> ${formattedDate}</p>
            <p><strong>Horario:</strong> ${timeLabels[data.time as keyof typeof timeLabels]}</p>
            <p><strong>Zona:</strong> ${data.zone.replace("-", " ")}</p>
            <p><strong>ID de cita:</strong> <code>${data.appointmentId}</code></p>
          </div>

          <div class="highlight">
            <h4 style="margin-top: 0; color: #166534;">🔔 Próximos Pasos:</h4>
            <ul style="color: #166534; margin-bottom: 0;">
              <li>Un técnico te contactará en las próximas 2 horas</li>
              <li>Confirmaremos la fecha y hora definitiva</li>
              <li>Te enviaremos un recordatorio 24h antes</li>
            </ul>
          </div>

          <p>Si tienes alguna pregunta, puedes contactarnos:</p>
          <p>
            📱 WhatsApp: <a href="https://wa.me/523338766231">(33) 3876-6231</a><br>
            📧 Email: info@nexu.mx
          </p>

          <p>¡Gracias por confiar en Nexu!</p>
        </div>
      </div>
    </body>
    </html>
  `

  try {
    const result = await resend.emails.send({
      from: "Nexu Confirmaciones <confirmaciones@nexu.mx>",
      to: [data.email],
      subject: `✅ Cita Confirmada - ${data.appointmentId}`,
      html: clientHtml,
      tags: [
        { name: "category", value: "client-confirmation" },
        { name: "appointment-id", value: data.appointmentId },
      ],
    })

    return {
      success: true,
      emailId: result.data?.id,
      recipient: data.email,
    }
  } catch (error) {
    console.error("❌ Error enviando confirmación al cliente:", error)
    return null
  }
}
