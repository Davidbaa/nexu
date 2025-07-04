interface EmailTemplateProps {
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

const AppointmentEmailTemplate = ({
  name,
  phone,
  email,
  address,
  zone,
  appliance,
  problem,
  date,
  time,
  appointmentId,
}: EmailTemplateProps) => {
  const timeLabels = {
    morning: "Mañana (9:00 - 12:00)",
    afternoon: "Tarde (12:00 - 17:00)",
    evening: "Noche (17:00 - 20:00)",
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto" }}>
      <div style={{ backgroundColor: "#1e293b", color: "white", padding: "20px", textAlign: "center" }}>
        <h1 style={{ margin: "0", fontSize: "24px" }}>Nueva Cita Agendada</h1>
        <p style={{ margin: "5px 0 0 0", opacity: "0.8" }}>Nexu - Refacciones Pro</p>
      </div>

      <div style={{ padding: "20px", backgroundColor: "#f8fafc" }}>
        <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
          <h2 style={{ color: "#1e293b", marginTop: "0" }}>Información del Cliente</h2>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tr>
              <td style={{ padding: "8px 0", fontWeight: "bold", color: "#64748b" }}>Nombre:</td>
              <td style={{ padding: "8px 0" }}>{name}</td>
            </tr>
            <tr>
              <td style={{ padding: "8px 0", fontWeight: "bold", color: "#64748b" }}>Teléfono:</td>
              <td style={{ padding: "8px 0" }}>{phone}</td>
            </tr>
            {email && (
              <tr>
                <td style={{ padding: "8px 0", fontWeight: "bold", color: "#64748b" }}>Email:</td>
                <td style={{ padding: "8px 0" }}>{email}</td>
              </tr>
            )}
            <tr>
              <td style={{ padding: "8px 0", fontWeight: "bold", color: "#64748b" }}>Dirección:</td>
              <td style={{ padding: "8px 0" }}>{address}</td>
            </tr>
            <tr>
              <td style={{ padding: "8px 0", fontWeight: "bold", color: "#64748b" }}>Zona:</td>
              <td style={{ padding: "8px 0", textTransform: "capitalize" }}>{zone.replace("-", " ")}</td>
            </tr>
          </table>
        </div>

        <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
          <h2 style={{ color: "#1e293b", marginTop: "0" }}>Detalles del Servicio</h2>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tr>
              <td style={{ padding: "8px 0", fontWeight: "bold", color: "#64748b" }}>Electrodoméstico:</td>
              <td style={{ padding: "8px 0", textTransform: "capitalize" }}>{appliance}</td>
            </tr>
            <tr>
              <td style={{ padding: "8px 0", fontWeight: "bold", color: "#64748b" }}>Fecha solicitada:</td>
              <td style={{ padding: "8px 0" }}>{date}</td>
            </tr>
            <tr>
              <td style={{ padding: "8px 0", fontWeight: "bold", color: "#64748b" }}>Horario:</td>
              <td style={{ padding: "8px 0" }}>{timeLabels[time as keyof typeof timeLabels]}</td>
            </tr>
          </table>

          <div style={{ marginTop: "15px" }}>
            <p style={{ fontWeight: "bold", color: "#64748b", margin: "0 0 5px 0" }}>Problema descrito:</p>
            <p style={{ margin: "0", padding: "10px", backgroundColor: "#f1f5f9", borderRadius: "4px" }}>{problem}</p>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#dcfce7",
            border: "1px solid #bbf7d0",
            padding: "15px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          <h3 style={{ color: "#166534", margin: "0 0 10px 0" }}>Próximos Pasos:</h3>
          <ul style={{ color: "#166534", margin: "0", paddingLeft: "20px" }}>
            <li>Contactar al cliente en las próximas 2 horas</li>
            <li>Confirmar disponibilidad de técnico</li>
            <li>Agendar cita definitiva</li>
            <li>Enviar recordatorio 24h antes</li>
          </ul>
        </div>

        <div
          style={{
            textAlign: "center",
            padding: "20px",
            backgroundColor: "#1e293b",
            color: "white",
            borderRadius: "8px",
          }}
        >
          <p style={{ margin: "0", fontSize: "14px", opacity: "0.8" }}>ID de Cita:</p>
          <p style={{ margin: "5px 0 0 0", fontSize: "18px", fontWeight: "bold", fontFamily: "monospace" }}>
            {appointmentId}
          </p>
        </div>
      </div>
    </div>
  )
}

export default AppointmentEmailTemplate
