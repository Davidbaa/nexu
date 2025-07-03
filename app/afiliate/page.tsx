"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { DollarSign, Calendar, Shield, Users, Award, Clock, CheckCircle, Upload, FileText } from "lucide-react"
import Header from "@/components/header"

export default function AfiliatePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    personalInfo: {},
    experience: {},
    documents: {},
    availability: {},
  })

  const benefits = [
    {
      icon: DollarSign,
      title: "Ingresos Competitivos",
      description: "Gana entre $300-800 por servicio según la complejidad",
      color: "text-green-600 bg-green-100",
    },
    {
      icon: Calendar,
      title: "Horarios Flexibles",
      description: "Tú decides cuándo y dónde trabajar",
      color: "text-blue-600 bg-blue-100",
    },
    {
      icon: Shield,
      title: "Seguro Incluido",
      description: "Cobertura completa durante todos los servicios",
      color: "text-purple-600 bg-purple-100",
    },
    {
      icon: Users,
      title: "Clientes Garantizados",
      description: "Flujo constante de trabajo a través de nuestra plataforma",
      color: "text-orange-600 bg-orange-100",
    },
  ]

  const requirements = [
    "Experiencia mínima de 2 años en reparación de electrodomésticos",
    "Certificaciones técnicas o estudios relacionados",
    "Herramientas propias básicas",
    "Vehículo propio para traslados",
    "Disponibilidad en zona metropolitana de Guadalajara",
    "Actitud de servicio al cliente",
  ]

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="py-8">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Únete al Equipo de
              <span className="text-blue-600 block">Técnicos Certificados Nexu</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Forma parte de la red de técnicos más confiable de Guadalajara. Obtén trabajo constante, ingresos
              competitivos y el respaldo de una marca líder.
            </p>
          </div>

          {/* Benefits Section */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${benefit.color}`}
                  >
                    <benefit.icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Requirements */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="mr-2 h-5 w-5" />
                Requisitos para Ser Técnico Certificado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {requirements.map((requirement, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{requirement}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Registration Form */}
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle>Formulario de Registro</CardTitle>
              <CardDescription>Completa tu información para comenzar el proceso de certificación</CardDescription>

              {/* Progress Steps */}
              <div className="flex items-center justify-between mt-6">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step <= currentStep ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {step}
                    </div>
                    {step < 4 && (
                      <div className={`w-16 h-1 mx-2 ${step < currentStep ? "bg-blue-600" : "bg-gray-200"}`} />
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>Información Personal</span>
                <span>Experiencia</span>
                <span>Documentos</span>
                <span>Disponibilidad</span>
              </div>
            </CardHeader>

            <CardContent>
              <form className="space-y-6">
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold">Información Personal</h3>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Nombre Completo *</label>
                        <Input placeholder="Tu nombre completo" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Teléfono *</label>
                        <Input placeholder="(33) 1234-5678" required />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Email *</label>
                        <Input type="email" placeholder="tu@email.com" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Edad</label>
                        <Input type="number" placeholder="25" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Dirección Completa *</label>
                      <Textarea placeholder="Calle, número, colonia, código postal, ciudad..." required />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">¿Tienes vehículo propio? *</label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="si">Sí, tengo vehículo propio</SelectItem>
                          <SelectItem value="no">No tengo vehículo</SelectItem>
                          <SelectItem value="moto">Tengo motocicleta</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {/* Step 2: Experience */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold">Experiencia Técnica</h3>

                    <div>
                      <label className="block text-sm font-medium mb-2">Años de Experiencia *</label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar años de experiencia" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2-3">2-3 años</SelectItem>
                          <SelectItem value="4-5">4-5 años</SelectItem>
                          <SelectItem value="6-10">6-10 años</SelectItem>
                          <SelectItem value="10+">Más de 10 años</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Especialidades (selecciona todas las que apliquen)
                      </label>
                      <div className="grid md:grid-cols-2 gap-3">
                        {[
                          "Lavadoras",
                          "Refrigeradores",
                          "Hornos",
                          "Microondas",
                          "Secadoras",
                          "Lavavajillas",
                          "Calentadores",
                          "Aires Acondicionados",
                        ].map((specialty) => (
                          <div key={specialty} className="flex items-center space-x-2">
                            <Checkbox id={specialty} />
                            <label htmlFor={specialty} className="text-sm">
                              {specialty}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Describe tu Experiencia *</label>
                      <Textarea
                        placeholder="Cuéntanos sobre tu experiencia, lugares donde has trabajado, tipos de reparaciones que has realizado..."
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">¿Tienes herramientas propias? *</label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="completas">Sí, herramientas completas</SelectItem>
                          <SelectItem value="basicas">Sí, herramientas básicas</SelectItem>
                          <SelectItem value="pocas">Pocas herramientas</SelectItem>
                          <SelectItem value="ninguna">No tengo herramientas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {/* Step 3: Documents */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold">Documentos y Certificaciones</h3>

                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                        <div className="text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                          <h4 className="font-medium mb-2">Identificación Oficial *</h4>
                          <p className="text-sm text-gray-600 mb-4">INE, Pasaporte o Cédula Profesional</p>
                          <Button variant="outline">Subir Archivo</Button>
                        </div>
                      </div>

                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                        <div className="text-center">
                          <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                          <h4 className="font-medium mb-2">Certificaciones Técnicas</h4>
                          <p className="text-sm text-gray-600 mb-4">Diplomas, certificados o constancias de cursos</p>
                          <Button variant="outline">Subir Archivos</Button>
                        </div>
                      </div>

                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                        <div className="text-center">
                          <Shield className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                          <h4 className="font-medium mb-2">Comprobante de Domicilio</h4>
                          <p className="text-sm text-gray-600 mb-4">
                            Recibo de luz, agua o teléfono (no mayor a 3 meses)
                          </p>
                          <Button variant="outline">Subir Archivo</Button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Referencias Laborales</label>
                      <Textarea placeholder="Proporciona 2-3 referencias de trabajos anteriores (nombre, teléfono, relación laboral)" />
                    </div>
                  </div>
                )}

                {/* Step 4: Availability */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold">Disponibilidad y Preferencias</h3>

                    <div>
                      <label className="block text-sm font-medium mb-2">Zonas de Trabajo Preferidas</label>
                      <div className="grid md:grid-cols-2 gap-3">
                        {[
                          "Guadalajara Centro",
                          "Zapopan",
                          "Tlaquepaque",
                          "Tonalá",
                          "Tlajomulco",
                          "El Salto",
                          "Chapala",
                          "Ajijic",
                        ].map((zone) => (
                          <div key={zone} className="flex items-center space-x-2">
                            <Checkbox id={zone} />
                            <label htmlFor={zone} className="text-sm">
                              {zone}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Horarios Disponibles</label>
                      <div className="space-y-3">
                        {[
                          "Lunes a Viernes (8:00 - 17:00)",
                          "Lunes a Viernes (17:00 - 20:00)",
                          "Sábados (8:00 - 17:00)",
                          "Sábados (17:00 - 20:00)",
                          "Domingos",
                          "Emergencias (24/7)",
                        ].map((schedule) => (
                          <div key={schedule} className="flex items-center space-x-2">
                            <Checkbox id={schedule} />
                            <label htmlFor={schedule} className="text-sm">
                              {schedule}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        ¿Cuántos servicios podrías realizar por semana?
                      </label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar cantidad" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-5">1-5 servicios</SelectItem>
                          <SelectItem value="6-10">6-10 servicios</SelectItem>
                          <SelectItem value="11-15">11-15 servicios</SelectItem>
                          <SelectItem value="16+">Más de 16 servicios</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Comentarios Adicionales</label>
                      <Textarea placeholder="¿Hay algo más que quieras que sepamos sobre ti o tu experiencia?" />
                    </div>

                    {/* Terms and Conditions */}
                    <div className="bg-gray-50 border rounded-lg p-4">
                      <div className="flex items-start space-x-2">
                        <Checkbox id="terms" required />
                        <label htmlFor="terms" className="text-sm text-gray-700">
                          Acepto los términos y condiciones de Nexu, así como las políticas de privacidad. Entiendo que
                          mi solicitud será revisada y me contactarán en un plazo de 3-5 días hábiles.
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6 border-t">
                  <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 1}>
                    Anterior
                  </Button>

                  {currentStep < 4 ? (
                    <Button type="button" onClick={nextStep}>
                      Siguiente
                    </Button>
                  ) : (
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                      Enviar Solicitud
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Process Timeline */}
          <Card className="mt-8 max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Proceso de Certificación
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-4">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium">Revisión de Solicitud</h4>
                    <p className="text-gray-600 text-sm">Revisamos tu información y documentos (3-5 días hábiles)</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-4">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium">Entrevista Técnica</h4>
                    <p className="text-gray-600 text-sm">Entrevista presencial o virtual para evaluar conocimientos</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-4">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium">Prueba Práctica</h4>
                    <p className="text-gray-600 text-sm">Demostración de habilidades en un servicio supervisado</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-4">
                    4
                  </div>
                  <div>
                    <h4 className="font-medium">Certificación y Activación</h4>
                    <p className="text-gray-600 text-sm">Recibe tu certificación y comienza a recibir servicios</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
