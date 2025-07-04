export interface AuthUser {
  username: string
  isAuthenticated: boolean
}

export class AuthService {
  private static readonly ADMIN_USERNAME = "admin"
  private static readonly ADMIN_PASSWORD = "nexu2024"
  private static readonly AUTH_KEY = "nexu_admin_auth"

  static login(username: string, password: string): boolean {
    if (username === this.ADMIN_USERNAME && password === this.ADMIN_PASSWORD) {
      const authData = {
        username,
        isAuthenticated: true,
        timestamp: Date.now(),
      }
      localStorage.setItem(this.AUTH_KEY, JSON.stringify(authData))
      return true
    }
    return false
  }

  static logout(): void {
    localStorage.removeItem(this.AUTH_KEY)
  }

  static isAuthenticated(): boolean {
    try {
      const authData = localStorage.getItem(this.AUTH_KEY)
      if (!authData) return false

      const parsed = JSON.parse(authData)
      const now = Date.now()
      const sessionDuration = 24 * 60 * 60 * 1000 // 24 horas

      // Verificar si la sesión ha expirado
      if (now - parsed.timestamp > sessionDuration) {
        this.logout()
        return false
      }

      return parsed.isAuthenticated === true
    } catch {
      return false
    }
  }

  static getCurrentUser(): AuthUser | null {
    try {
      const authData = localStorage.getItem(this.AUTH_KEY)
      if (!authData) return null

      const parsed = JSON.parse(authData)
      return {
        username: parsed.username,
        isAuthenticated: parsed.isAuthenticated,
      }
    } catch {
      return null
    }
  }
}
