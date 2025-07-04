"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Mail, CheckCircle, XCircle, AlertTriangle } from "lucide-react"

interface TestResult {
  success: boolean
  emailId?: string
  message?: string
  error?: string
  solution?: string
}

export default function DiagnosticoPage() {
  const [isTestingEmail, setIsTestingEmail] = useState(false)
  const [testResult, setTestResult] = useState<TestResult | null>(null)

  const testEmailSystem = async () => {
    setIsTestingEmail(true)
    setTestResult(null)

    try {
      const response = await fetch("/api/test-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const result = await response.json()
      setTestResult(result)
    } catch (error) {
      setTestResult({
        success: false,
        error: "Error de conexión",
        solution: "Verifica tu conexión a internet",
      })
    } finally {
      setIsTestingEmail(false)
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">🔧 Diagnóstico del Sistema</h1>
        <p className="text-muted-foreground">Verifica el estado de los sistemas críticos de Nexu</p>
      </div>

      <div className="grid gap-6">
        {/* Sistema de Emails */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Sistema de Emails
            </CardTitle>
            <CardDescription>
              Verifica que el sistema de notificaciones por email esté funcionando correctamente
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Estado del Servicio</h3>
                <p className="text-sm text-muted-foreground">Prueba la configuración de Resend</p>
              </div>
              <Button onClick={testEmailSystem} disabled={isTestingEmail} className="min-w-[120px]">
                {isTestingEmail ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Probando...
                  </>
                ) : (
                  "Probar Email"
                )}
              </Button>
            </div>

            {testResult && (
              <Alert className={testResult.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
                <div className="flex items-start gap-2">
                  {testResult.success ? (
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-600 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <AlertDescription>
                      {testResult.success ? (
                        <div>
                          <p className="font-medium text-green-800">✅ Sistema funcionando correctamente</p>
                          <p className="text-green-700 mt-1">{testResult.message}</p>
                          {testResult.emailId && (
                            <p className="text-xs text-green-600 mt-2">ID del email: {testResult.emailId}</p>
                          )}
                        </div>
                      ) : (
                        <div>
                          <p className="font-medium text-red-800">❌ Error en el sistema</p>
                          <p className="text-red-700 mt-1">{testResult.error}</p>
                          {testResult.solution && (
                            <p className="text-red-600 mt-2">
                              <strong>Solución:</strong> {testResult.solution}
                            </p>
                          )}
                        </div>
                      )}
                    </AlertDescription>
                  </div>
                </div>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Variables de Entorno */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Variables de Entorno
            </CardTitle>
            <CardDescription>Estado de las configuraciones críticas del sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">RESEND_API_KEY</span>
                <Badge variant={process.env.RESEND_API_KEY ? "default" : "destructive"}>
                  {process.env.RESEND_API_KEY ? "Configurada" : "No configurada"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Instrucciones */}
        <Card>
          <CardHeader>
            <CardTitle>📋 Instrucciones de Configuración</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Para configurar Resend:</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                <li>
                  Ve a{" "}
                  <a
                    href="https://resend.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    resend.com
                  </a>{" "}
                  y crea una cuenta
                </li>
                <li>Genera una API key en tu dashboard</li>
                <li>Agrega la variable de entorno RESEND_API_KEY con tu clave</li>
                <li>Reinicia la aplicación</li>
                <li>Ejecuta la prueba de email desde esta página</li>
              </ol>
            </div>

            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Importante:</strong> Sin la configuración de Resend, no recibirás notificaciones de las citas
                agendadas por los clientes.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
