"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle } from "lucide-react"
import Header from "@/components/header"

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    serviceType: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simular envío del formulario
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitted(true)
    setIsSubmitting(false)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        serviceType: "",
      })
    }, 3000)
  }

  const openWhatsApp = () => {
    const message = encodeURIComponent("Hola, me interesa conocer más sobre los servicios de Nexu")
    window.open(`https://wa.me/523338766231?text=${message}`, "_blank")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Contáctanos</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Estamos aquí para ayudarte. Ponte en contacto con nosotros a través de cualquiera de estos medios.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Información de Contacto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Teléfono</p>
                      <p className="text-gray-600">(33) 3876-6231</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-gray-600">info@nexu.mx</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Ubicación</p>
                      <p className="text-gray-600">Guadalajara, Jalisco</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Horarios</p>
                      <p className="text-gray-600">Lun - Vie: 8:00 - 18:00</p>
                      <p className="text-gray-600">Sáb: 9:00 - 14:00</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Contact Buttons */}
              <div className="space-y-3">
                <Button onClick={openWhatsApp} className="w-full bg-green-600 hover:bg-green-700 text-white">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp
                </Button>

                <Button
                  onClick={() => (window.location.href = "tel:+523338766231")}
                  variant="outline"
                  className="w-full"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Llamar Ahora
                </Button>

                <Button
                  onClick={() => (window.location.href = "mailto:info@nexu.mx")}
                  variant="outline"
                  className="w-full"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Enviar Email
                </Button>
              </div>

              {/* Service Areas */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Áreas de Servicio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p>• Guadalajara Centro</p>
                    <p>• Zapopan</p>
                    <p>• Tlaquepaque</p>
                    <p>• Tonalá</p>
                    <p>• Tlajomulco</p>
                    <p>• El Salto</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Envíanos un Mensaje</CardTitle>
                  <CardDescription>
                    Completa el formulario y nos pondremos en contacto contigo lo antes posible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Nombre Completo *</label>
                          <Input
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            placeholder="Tu nombre completo"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Teléfono *</label>
                          <Input
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            placeholder="(33) 1234-5678"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Email *</label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="tu@email.com"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Tipo de Servicio</label>
                        <Select
                          value={formData.serviceType}
                          onValueChange={(value) => handleInputChange("serviceType", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar tipo de servicio" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="refacciones">Compra de Refacciones</SelectItem>
                            <SelectItem value="instalacion">Servicio de Instalación</SelectItem>
                            <SelectItem value="identificacion">Identificación de Equipo</SelectItem>
                            <SelectItem value="tecnico">Registro como Técnico</SelectItem>
                            <SelectItem value="soporte">Soporte Técnico</SelectItem>
                            <SelectItem value="otro">Otro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Asunto *</label>
                        <Input
                          value={formData.subject}
                          onChange={(e) => handleInputChange("subject", e.target.value)}
                          placeholder="Asunto de tu consulta"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Mensaje *</label>
                        <Textarea
                          value={formData.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          placeholder="Describe tu consulta o necesidad..."
                          rows={5}
                          required
                        />
                      </div>

                      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Enviando...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Enviar Mensaje
                          </>
                        )}
                      </Button>
                    </form>
                  ) : (
                    <div className="text-center py-8">
                      <CheckCircle className="mx-auto h-16 w-16 text-green-600 mb-4" />
                      <h3 className="text-xl font-semibold text-green-800 mb-2">¡Mensaje Enviado!</h3>
                      <p className="text-gray-600">
                        Gracias por contactarnos. Nos pondremos en contacto contigo en las próximas 24 horas.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
