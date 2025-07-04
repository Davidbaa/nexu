// Sistema de autenticación simple para el panel de administración
export interface AdminUser {
  username: string
  isAuthenticated: boolean
  loginTime: number
}

// Credenciales del administrador (en producción, esto debería estar en variables de entorno)
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "nexu2024",
}

// Duración de la sesión (24 horas)
const SESSION_DURATION = 24 * 60 * 60 * 1000

export function authenticateAdmin(username: string, password: string): boolean {
  return username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password
}

export function setAdminSession(username: string): void {
  const session: AdminUser = {
    username,
    isAuthenticated: true,
    loginTime: Date.now(),
  }

  if (typeof window !== "undefined") {
    localStorage.setItem("nexu_admin_session", JSON.stringify(session))
  }
}

export function getAdminSession(): AdminUser | null {
  if (typeof window === "undefined") return null

  try {
    const sessionData = localStorage.getItem("nexu_admin_session")
    if (!sessionData) return null

    const session: AdminUser = JSON.parse(sessionData)

    // Verificar si la sesión ha expirado
    if (Date.now() - session.loginTime > SESSION_DURATION) {
      clearAdminSession()
      return null
    }

    return session
  } catch {
    return null
  }
}

export function clearAdminSession(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("nexu_admin_session")
  }
}

export function isAdminAuthenticated(): boolean {
  const session = getAdminSession()
  return session?.isAuthenticated === true
}
