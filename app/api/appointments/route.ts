import { type NextRequest, NextResponse } from "next/server"

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

    // Aquí puedes elegir una o varias opciones:

    // OPCIÓN 1: Enviar email con Resend
    await sendEmailNotification(appointmentData)

    // OPCIÓN 2: Guardar en base de datos
    // await saveToDatabase(appointmentData)

    // OPCIÓN 3: Enviar a webhook externo
    // await sendToWebhook(appointmentData)

    // OPCIÓN 4: Integrar con CRM
    // await sendToCRM(appointmentData)

    return NextResponse.json({
      success: true,
      message: "Cita agendada exitosamente",
      appointmentId: generateAppointmentId(),
    })
  } catch (error) {
    console.error("Error processing appointment:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

// Función para enviar email de notificación
async function sendEmailNotification(data: any) {
  // Usando Resend (recomendado)
  const emailContent = `
    Nueva Cita Agendada - Nexu
    
    Cliente: ${data.name}
    Teléfono: ${data.phone}
    Email: ${data.email || "No proporcionado"}
    
    Dirección: ${data.address}
    Zona: ${data.zone}
    
    Electrodoméstico: ${data.appliance}
    Problema: ${data.problem}
    
    Fecha solicitada: ${data.date}
    Horario: ${data.time}
    
    ---
    Contactar al cliente en las próximas 2 horas para confirmar.
  `

  // Aquí integrarías con tu servicio de email preferido
  console.log("Email enviado:", emailContent)
}

// Función para generar ID único
function generateAppointmentId() {
  return "APT-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9)
}

// OPCIÓN: Guardar en base de datos (ejemplo con Supabase)
/*
async function saveToDatabase(data: any) {
  const { createClient } = require('@supabase/supabase-js')
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  const { error } = await supabase
    .from('appointments')
    .insert([{
      name: data.name,
      phone: data.phone,
      email: data.email,
      address: data.address,
      zone: data.zone,
      appliance: data.appliance,
      problem: data.problem,
      preferred_date: data.date,
      preferred_time: data.time,
      status: 'pending',
      created_at: new Date().toISOString()
    }])

  if (error) throw error
}
*/

// OPCIÓN: Enviar a webhook externo
/*
async function sendToWebhook(data: any) {
  const webhookUrl = process.env.APPOINTMENT_WEBHOOK_URL
  
  if (webhookUrl) {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'new_appointment',
        data: data,
        timestamp: new Date().toISOString()
      })
    })
  }
}
*/
