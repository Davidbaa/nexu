import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function GET(request: NextRequest) {
  try {
    console.log("🧪 Iniciando test de configuración de Resend...")

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          error: "RESEND_API_KEY no configurada",
          solution: "Agrega la API key a las variables de entorno",
        },
        { status: 400 },
      )
    }

    // Test de envío real
    const result = await resend.emails.send({
      from: "Nexu Test <onboarding@resend.dev>",
      to: ["davidbarrera.ar@gmail.com"],
      subject: "✅ Nexu - Sistema de Emails Configurado Exitosamente",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 500px; margin: 0 auto; background: white; }
            .header { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 25px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { padding: 25px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; }
            .success { background: #dcfce7; padding: 15px; border-radius: 6px; border-left: 4px solid #10b981; margin: 15px 0; }
            .info { background: #f0f9ff; padding: 15px; border-radius: 6px; border-left: 4px solid #3b82f6; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">🎉 ¡Sistema Activado!</h1>
              <p style="margin: 8px 0 0 0;">Nexu - Refacciones Pro</p>
            </div>
            
            <div class="content">
              <div class="success">
                <h3 style="margin-top: 0; color: #166534;">✅ Configuración Exitosa</h3>
                <p style="margin-bottom: 0; color: #166534;">
                  El sistema de emails de Nexu está funcionando perfectamente. 
                  Ahora recibirás automáticamente todas las citas agendadas.
                </p>
              </div>

              <div class="info">
                <h4 style="margin-top: 0; color: #1e40af;">📧 ¿Qué recibirás?</h4>
                <ul style="color: #1e40af; margin-bottom: 0;">
                  <li>Notificación inmediata de cada cita</li>
                  <li>Información completa del cliente</li>
                  <li>Detalles del servicio solicitado</li>
                  <li>Botones directos para contactar</li>
                  <li>Lista de verificación de próximos pasos</li>
                </ul>
              </div>

              <p><strong>Próximo paso:</strong> Haz una cita de prueba desde tu sitio web para verificar que todo funcione correctamente.</p>

              <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;">
              
              <p style="font-size: 12px; color: #6b7280; margin: 0;">
                Test enviado: ${new Date().toLocaleString("es-MX", { timeZone: "America/Mexico_City" })}<br>
                API Key: ${process.env.RESEND_API_KEY?.substring(0, 10)}...
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
🎉 ¡NEXU SISTEMA ACTIVADO!

✅ Configuración exitosa
El sistema de emails está funcionando perfectamente.

📧 Ahora recibirás:
- Notificación inmediata de cada cita
- Información completa del cliente  
- Detalles del servicio solicitado
- Botones directos para contactar

Próximo paso: Haz una cita de prueba para verificar.

Test enviado: ${new Date().toLocaleString("es-MX")}
      `,
    })

    console.log("✅ Email de prueba enviado exitosamente!")
    console.log("📧 Email ID:", result.data?.id)

    return NextResponse.json({
      success: true,
      message: "✅ Sistema configurado correctamente",
      emailId: result.data?.id,
      details: {
        recipient: "davidbarrera.ar@gmail.com",
        subject: "✅ Nexu - Sistema de Emails Configurado Exitosamente",
        timestamp: new Date().toISOString(),
        apiKeyConfigured: true,
      },
      nextSteps: [
        "Revisa tu email (davidbarrera.ar@gmail.com)",
        "Verifica que el email llegó correctamente",
        "Haz una cita de prueba desde el sitio web",
        "Confirma que recibes la notificación de cita",
      ],
    })
  } catch (error) {
    console.error("❌ Error en test de email:", error)

    let errorMessage = "Error desconocido"
    let solution = "Verifica la configuración"

    if (error instanceof Error) {
      errorMessage = error.message

      if (error.message.includes("API key")) {
        solution = "Verifica que la API key sea correcta y esté activa"
      } else if (error.message.includes("rate limit")) {
        solution = "Has alcanzado el límite de emails. Espera unos minutos."
      } else if (error.message.includes("domain")) {
        solution = "Problema con el dominio. Usando onboarding@resend.dev temporalmente."
      }
    }

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        solution: solution,
        apiKeyPresent: !!process.env.RESEND_API_KEY,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
