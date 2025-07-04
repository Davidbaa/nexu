"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MapPin, Phone, User, CheckCircle, X, AlertCircle } from "lucide-react"

interface AppointmentBookingProps {
  isOpen: boolean
  onClose: () => void
}

export default function AppointmentBooking({ isOpen, onClose }: AppointmentBookingProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [appointmentId, setAppointmentId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    appliance: "",
    problem: "",
    date: "",
    time: "",
    zone: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Enviar a la API real
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Error al agendar la cita")
      }

      setAppointmentId(result.appointmentId)
      setIsSubmitted(true)

      // Reset después de 5 segundos
      setTimeout(() => {
        setIsSubmitted(false)
        setCurrentStep(1)
        setAppointmentId(null)
        setFormData({
          name: "",
          phone: "",
          email: "",
          address: "",
          appliance: "",
          problem: "",
          date: "",
          time: "",
          zone: "",
        })
        onClose()
      }, 5000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="bg-gradient-to-r from-slate-800 to-slate-900 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Calendar className="h-6 w-6" />
              <div>
                <CardTitle>Agendar Cita de Servicio</CardTitle>
                <p className="text-sm text-white/80">Técnico certificado a domicilio</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mt-6">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep ? "bg-white text-slate-900" : "bg-white/20 text-white/60"
                  }`}
                >
                  {step}
                </div>
                {step < 3 && <div className={`w-16 h-1 mx-2 ${step < currentStep ? "bg-white" : "bg-white/20"}`} />}
              </div>
            ))}
          </div>

          <div className="flex justify-between text-sm text-white/80 mt-2">
            <span>Información</span>
            <span>Servicio</span>
            <span>Confirmación</span>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
              <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
              <span className="text-red-800">{error}</span>
            </div>
          )}

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Información Personal */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <User className="mr-2 h-5 w-5" />
                    Información Personal
                  </h3>

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
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Dirección Completa *</label>
                    <Textarea
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="Calle, número, colonia, código postal..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Zona *</label>
                    <Select value={formData.zone} onValueChange={(value) => handleInputChange("zone", value)} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar zona" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="guadalajara-centro">Guadalajara Centro</SelectItem>
                        <SelectItem value="zapopan">Zapopan</SelectItem>
                        <SelectItem value="tlaquepaque">Tlaquepaque</SelectItem>
                        <SelectItem value="tonala">Tonalá</SelectItem>
                        <SelectItem value="tlajomulco">Tlajomulco</SelectItem>
                        <SelectItem value="el-salto">El Salto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Step 2: Información del Servicio */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <MapPin className="mr-2 h-5 w-5" />
                    Información del Servicio
                  </h3>

                  <div>
                    <label className="block text-sm font-medium mb-2">Tipo de Electrodoméstico *</label>
                    <Select
                      value={formData.appliance}
                      onValueChange={(value) => handleInputChange("appliance", value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar electrodoméstico" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lavadora">Lavadora</SelectItem>
                        <SelectItem value="refrigerador">Refrigerador</SelectItem>
                        <SelectItem value="horno">Horno</SelectItem>
                        <SelectItem value="microondas">Microondas</SelectItem>
                        <SelectItem value="secadora">Secadora</SelectItem>
                        <SelectItem value="lavavajillas">Lavavajillas</SelectItem>
                        <SelectItem value="calentador">Calentador</SelectItem>
                        <SelectItem value="aire-acondicionado">Aire Acondicionado</SelectItem>
                        <SelectItem value="otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Descripción del Problema *</label>
                    <Textarea
                      value={formData.problem}
                      onChange={(e) => handleInputChange("problem", e.target.value)}
                      placeholder="Describe el problema o qué refacción necesitas..."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Fecha Preferida *</label>
                      <Input
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleInputChange("date", e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Horario Preferido *</label>
                      <Select
                        value={formData.time}
                        onValueChange={(value) => handleInputChange("time", value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar horario" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">Mañana (9:00 - 12:00)</SelectItem>
                          <SelectItem value="afternoon">Tarde (12:00 - 17:00)</SelectItem>
                          <SelectItem value="evening">Noche (17:00 - 20:00)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Confirmación */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Confirmación de Cita
                  </h3>

                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-600">Cliente:</span>
                        <p className="text-gray-900">{formData.name}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Teléfono:</span>
                        <p className="text-gray-900">{formData.phone}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Electrodoméstico:</span>
                        <p className="text-gray-900 capitalize">{formData.appliance}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Zona:</span>
                        <p className="text-gray-900 capitalize">{formData.zone?.replace("-", " ")}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Fecha:</span>
                        <p className="text-gray-900">{formData.date}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Horario:</span>
                        <p className="text-gray-900">
                          {formData.time === "morning" && "Mañana (9:00 - 12:00)"}
                          {formData.time === "afternoon" && "Tarde (12:00 - 17:00)"}
                          {formData.time === "evening" && "Noche (17:00 - 20:00)"}
                        </p>
                      </div>
                    </div>

                    <div className="border-t pt-3">
                      <span className="font-medium text-gray-600">Problema:</span>
                      <p className="text-gray-900 text-sm mt-1">{formData.problem}</p>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-medium text-green-800 mb-2">Incluye:</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Diagnóstico profesional gratuito</li>
                      <li>• Cotización de refacciones necesarias</li>
                      <li>• Instalación profesional (costo adicional)</li>
                      <li>• 30 días de garantía en el servicio</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-800 mb-2">Importante:</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• El técnico confirmará la cita 24 horas antes</li>
                      <li>• Costo de visita: $200 MXN (se descuenta del servicio)</li>
                      <li>• Tiempo estimado de visita: 30-60 minutos</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="bg-transparent"
                >
                  Anterior
                </Button>

                {currentStep < 3 ? (
                  <Button type="button" onClick={nextStep} className="bg-slate-900 hover:bg-slate-800">
                    Siguiente
                  </Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting} className="bg-green-600 hover:bg-green-500">
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Calendar className="mr-2 h-4 w-4" />
                        Confirmar Cita
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="mx-auto h-16 w-16 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-green-800 mb-2">¡Cita Agendada!</h3>
              {appointmentId && (
                <p className="text-sm text-gray-600 mb-2">
                  ID de cita: <span className="font-mono font-medium">{appointmentId}</span>
                </p>
              )}
              <p className="text-gray-600 mb-4">
                Hemos recibido tu solicitud. Un técnico se pondrá en contacto contigo en las próximas 2 horas para
                confirmar la cita.
              </p>
              <div className="flex justify-center space-x-4">
                <Button
                  onClick={() => {
                    const message = encodeURIComponent(
                      `Hola, acabo de agendar una cita (${appointmentId}) para ${formData.appliance} el ${formData.date}`,
                    )
                    window.open(`https://wa.me/523338766231?text=${message}`, "_blank")
                  }}
                  className="bg-green-600 hover:bg-green-500"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  WhatsApp
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
