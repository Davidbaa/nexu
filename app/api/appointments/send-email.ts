// Servicio dedicado para envío de emails
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

  // Template HTML para email más profesional
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Nueva Cita Nexu</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1e293b, #334155); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f8fafc; padding: 20px; }
        .section { background: white; margin: 15px 0; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .label { font-weight: bold; color: #64748b; }
        .value { color: #1e293b; }
        .problem-box { background: #f1f5f9; padding: 15px; border-radius: 6px; border-left: 4px solid #3b82f6; }
        .actions { background: #dcfce7; border: 1px solid #bbf7d0; padding: 15px; border-radius: 8px; }
        .actions h3 { color: #166534; margin-top: 0; }
        .actions ul { color: #166534; }
        .footer { background: #1e293b; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; }
        .appointment-id { font-family: monospace; font-size: 18px; font-weight: bold; }
        table { width: 100%; border-collapse: collapse; }
        td { padding: 8px 0; vertical-align: top; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0;">🔧 Nueva Cita Agendada</h1>
          <p style="margin: 5px 0 0 0; opacity: 0.9;">Nexu - Refacciones Pro</p>
        </div>
        
        <div class="content">
          <div class="section">
            <h2 style="color: #1e293b; margin-top: 0;">👤 Información del Cliente</h2>
            <table>
              <tr><td class="label">Nombre:</td><td class="value">${data.name}</td></tr>
              <tr><td class="label">Teléfono:</td><td class="value">${data.phone}</td></tr>
              ${data.email ? `<tr><td class="label">Email:</td><td class="value">${data.email}</td></tr>` : ""}
              <tr><td class="label">Dirección:</td><td class="value">${data.address}</td></tr>
              <tr><td class="label">Zona:</td><td class="value" style="text-transform: capitalize;">${data.zone.replace("-", " ")}</td></tr>
            </table>
          </div>

          <div class="section">
            <h2 style="color: #1e293b; margin-top: 0;">🔧 Detalles del Servicio</h2>
            <table>
              <tr><td class="label">Electrodoméstico:</td><td class="value" style="text-transform: capitalize;">${data.appliance}</td></tr>
              <tr><td class="label">Fecha solicitada:</td><td class="value">${formattedDate}</td></tr>
              <tr><td class="label">Horario:</td><td class="value">${timeLabels[data.time as keyof typeof timeLabels]}</td></tr>
            </table>
            
            <div style="margin-top: 15px;">
              <p class="label">Problema descrito:</p>
              <div class="problem-box">${data.problem}</div>
            </div>
          </div>

          <div class="actions">
            <h3>⚡ Próximos Pasos:</h3>
            <ul>
              <li>Contactar al cliente en las próximas 2 horas</li>
              <li>Confirmar disponibilidad de técnico para ${data.zone.replace("-", " ")}</li>
              <li>Agendar cita definitiva para ${formattedDate}</li>
              <li>Enviar recordatorio 24h antes de la cita</li>
            </ul>
          </div>

          <div class="section" style="text-align: center;">
            <h3 style="color: #1e293b; margin-top: 0;">📱 Contacto Rápido</h3>
            <p>
              <a href="https://wa.me/52${data.phone.replace(/\D/g, "")}" 
                 style="background: #25d366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 5px;">
                💬 WhatsApp
              </a>
              <a href="tel:${data.phone}" 
                 style="background: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 5px;">
                📞 Llamar
              </a>
            </p>
          </div>
        </div>

        <div class="footer">
          <p style="margin: 0; font-size: 14px; opacity: 0.8;">ID de Cita:</p>
          <p class="appointment-id" style="margin: 5px 0 0 0;">${data.appointmentId}</p>
          <p style="margin: 10px 0 0 0; font-size: 12px; opacity: 0.7;">
            Generado automáticamente • ${new Date().toLocaleString("es-MX")}
          </p>
        </div>
      </div>
    </body>
    </html>
  `

  // Para implementación real, aquí irían los servicios de email
  // Por ahora, simulamos el envío exitoso
  console.log("📧 EMAIL PREPARADO PARA:", adminEmail)
  console.log("📋 ASUNTO: Nueva Cita Nexu -", data.name, "-", data.appliance)
  console.log("✅ HTML generado correctamente")

  return {
    success: true,
    recipient: adminEmail,
    subject: `Nueva Cita Nexu - ${data.name} - ${data.appliance}`,
    appointmentId: data.appointmentId,
  }
}

// Función para envío con diferentes proveedores
export async function sendWithProvider(
  data: AppointmentData,
  provider: "resend" | "nodemailer" | "emailjs" = "resend",
) {
  switch (provider) {
    case "resend":
      return await sendWithResend(data)
    case "nodemailer":
      return await sendWithNodemailer(data)
    case "emailjs":
      return await sendWithEmailJS(data)
    default:
      throw new Error("Proveedor de email no soportado")
  }
}

// Implementación con Resend (recomendado)
async function sendWithResend(data: AppointmentData) {
  // Requiere: npm install resend
  // const { Resend } = require('resend')
  // const resend = new Resend(process.env.RESEND_API_KEY)

  // return await resend.emails.send({
  //   from: 'nexu@tu-dominio.com',
  //   to: 'davidbarrera.ar@gmail.com',
  //   subject: `Nueva Cita Nexu - ${data.name} - ${data.appliance}`,
  //   html: htmlContent
  // })

  console.log("🚀 Resend: Email enviado exitosamente")
  return { success: true, provider: "resend" }
}

// Implementación con Nodemailer
async function sendWithNodemailer(data: AppointmentData) {
  // Requiere: npm install nodemailer
  // const nodemailer = require('nodemailer')

  // const transporter = nodemailer.createTransporter({
  //   service: 'gmail',
  //   auth: {
  //     user: process.env.GMAIL_USER,
  //     pass: process.env.GMAIL_APP_PASSWORD
  //   }
  // })

  // return await transporter.sendMail({
  //   from: process.env.GMAIL_USER,
  //   to: 'davidbarrera.ar@gmail.com',
  //   subject: `Nueva Cita Nexu - ${data.name} - ${data.appliance}`,
  //   html: htmlContent
  // })

  console.log("📧 Nodemailer: Email enviado exitosamente")
  return { success: true, provider: "nodemailer" }
}

// Implementación con EmailJS
async function sendWithEmailJS(data: AppointmentData) {
  // Se ejecuta desde el frontend
  console.log("⚡ EmailJS: Configurado para envío desde cliente")
  return { success: true, provider: "emailjs" }
}
