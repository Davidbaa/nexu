"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, AlertCircle, Loader2, Mail, Send } from "lucide-react"

export default function TestPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const runTest = async () => {
    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      console.log("🧪 Iniciando test de configuración...")

      const response = await fetch("/api/test-email", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()

      if (response.ok) {
        setResult(data)
        console.log("✅ Test exitoso:", data)
      } else {
        setError(data.error || "Error en el test")
        console.error("❌ Test falló:", data)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error desconocido"
      setError(errorMessage)
      console.error("❌ Error ejecutando test:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center space-x-2">
            <Mail className="h-6 w-6 text-blue-600" />
            <span>Test de Configuración Nexu</span>
          </CardTitle>
          <p className="text-gray-600">Verificar que el sistema de emails esté funcionando correctamente</p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Test Button */}
          <div className="text-center">
            <Button onClick={runTest} disabled={isLoading} size="lg" className="bg-blue-600 hover:bg-blue-700">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Ejecutando Test...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Ejecutar Test de Email
                </>
              )}
            </Button>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center">
                <Loader2 className="h-5 w-5 text-blue-600 animate-spin mr-3" />
                <div>
                  <h4 className="font-medium text-blue-800">Ejecutando Test...</h4>
                  <p className="text-blue-600 text-sm">Enviando email de prueba a davidbarrera.ar@gmail.com</p>
                </div>
              </div>
            </div>
          )}

          {/* Success Result */}
          {result && result.success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold text-green-800 mb-2">✅ ¡Test Exitoso!</h4>
                  <p className="text-green-700 mb-4">{result.message}</p>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-green-600">Email ID:</span>
                      <span className="font-mono text-green-800">{result.emailId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-600">Destinatario:</span>
                      <span className="text-green-800">{result.details?.recipient}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-600">Timestamp:</span>
                      <span className="text-green-800">
                        {new Date(result.details?.timestamp).toLocaleString("es-MX")}
                      </span>
                    </div>
                  </div>

                  {result.nextSteps && (
                    <div className="mt-4 p-3 bg-green-100 rounded-md">
                      <h5 className="font-medium text-green-800 mb-2">Próximos pasos:</h5>
                      <ul className="text-green-700 text-sm space-y-1">
                        {result.nextSteps.map((step: string, index: number) => (
                          <li key={index}>• {step}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Error Result */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="flex items-start">
                <AlertCircle className="h-6 w-6 text-red-600 mr-3 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold text-red-800 mb-2">❌ Error en el Test</h4>
                  <p className="text-red-700 mb-4">{error}</p>

                  <div className="bg-red-100 p-3 rounded-md">
                    <h5 className="font-medium text-red-800 mb-2">Posibles soluciones:</h5>
                    <ul className="text-red-700 text-sm space-y-1">
                      <li>• Verificar que la API key sea correcta</li>
                      <li>• Confirmar que la API key esté activa en Resend</li>
                      <li>• Revisar las variables de entorno</li>
                      <li>• Verificar conexión a internet</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-800 mb-2">¿Qué hace este test?</h4>
            <ul className="text-gray-600 text-sm space-y-1">
              <li>• Verifica que la API key de Resend esté configurada</li>
              <li>• Envía un email de prueba a davidbarrera.ar@gmail.com</li>
              <li>• Confirma que el sistema de notificaciones funcione</li>
              <li>• Valida el formato y diseño del email</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
