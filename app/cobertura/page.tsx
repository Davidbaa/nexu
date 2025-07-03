"use client"

import Header from "@/components/header"
import CoverageMap from "@/components/coverage-map"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Phone, MessageCircle } from "lucide-react"

export default function CoberturaPage() {
  const openWhatsApp = () => {
    const message = encodeURIComponent("Hola, quiero saber si dan servicio en mi zona")
    window.open(`https://wa.me/523338766231?text=${message}`, "_blank")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Área de Cobertura</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Conoce las zonas donde ofrecemos nuestros servicios de refacciones e instalación técnica
            </p>
          </div>

          <CoverageMap />

          {/* Service Information */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-blue-600" />
                  Tiempos de Respuesta
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Servicios regulares:</strong> 24-48 horas
                  </p>
                  <p>
                    <strong>Instalaciones:</strong> Mismo día o siguiente
                  </p>
                  <p>
                    <strong>Emergencias:</strong> 2-4 horas
                  </p>
                  <p className="text-gray-600 pt-2">
                    Los tiempos pueden variar según la zona y disponibilidad de técnicos.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-green-600" />
                  Expansión
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Próximamente:</strong>
                  </p>
                  <p>• Chapala</p>
                  <p>• Ajijic</p>
                  <p>• Tepatitlán</p>
                  <p className="text-gray-600 pt-2">Estamos expandiendo constantemente para llegar a más zonas.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="mr-2 h-5 w-5 text-orange-600" />
                  ¿Tu zona no aparece?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Contáctanos para verificar si podemos dar servicio en tu ubicación específica.
                </p>
                <div className="space-y-2">
                  <Button onClick={openWhatsApp} className="w-full bg-green-600 hover:bg-green-700" size="sm">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Consultar por WhatsApp
                  </Button>
                  <Button
                    onClick={() => (window.location.href = "tel:+523338766231")}
                    variant="outline"
                    className="w-full"
                    size="sm"
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Llamar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
