"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, MapPin, Star, Shield, User } from "lucide-react"
import Header from "@/components/header"

const tecnicos = [
  {
    id: 1,
    name: "Carlos Mendoza",
    specialties: ["Lavadoras", "Secadoras"],
    rating: 4.9,
    reviews: 127,
    experience: "8 años",
    zone: "Guadalajara Centro",
    available: true,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Ana García",
    specialties: ["Refrigeradores", "Congeladores"],
    rating: 4.8,
    reviews: 89,
    experience: "6 años",
    zone: "Zapopan",
    available: true,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Roberto Silva",
    specialties: ["Hornos", "Estufas"],
    rating: 4.9,
    reviews: 156,
    experience: "10 años",
    zone: "Tlaquepaque",
    available: false,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "María López",
    specialties: ["Microondas", "Hornos"],
    rating: 4.7,
    reviews: 73,
    experience: "5 años",
    zone: "Tonalá",
    available: true,
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function TecnicosPage() {
  const [selectedTechnician, setSelectedTechnician] = useState<number | null>(null)
  const [showBookingForm, setShowBookingForm] = useState(false)

  const handleBookTechnician = (technicianId: number) => {
    setSelectedTechnician(technicianId)
    setShowBookingForm(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Técnicos Certificados</h1>
            <p className="text-xl text-gray-600">Profesionales especializados en instalación de refacciones</p>
          </div>

          {!showBookingForm ? (
            <>
              {/* Service Features */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Técnicos Certificados</h3>
                    <p className="text-gray-600 text-sm">Todos nuestros técnicos están certificados y asegurados</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <Clock className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Servicio Rápido</h3>
                    <p className="text-gray-600 text-sm">Instalación el mismo día o al siguiente día hábil</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <Star className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Garantía de Servicio</h3>
                    <p className="text-gray-600 text-sm">30 días de garantía en todas las instalaciones</p>
                  </CardContent>
                </Card>
              </div>

              {/* Technicians Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {tecnicos.map((tecnico) => (
                  <Card key={tecnico.id} className="overflow-hidden">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <img
                          src={tecnico.image || "/placeholder.svg"}
                          alt={tecnico.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-xl">{tecnico.name}</CardTitle>
                            {tecnico.available ? (
                              <Badge className="bg-green-100 text-green-800">Disponible</Badge>
                            ) : (
                              <Badge variant="secondary">Ocupado</Badge>
                            )}
                          </div>
                          <div className="flex items-center mt-2">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            <span className="font-medium">{tecnico.rating}</span>
                            <span className="text-gray-500 ml-1">({tecnico.reviews} reseñas)</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center text-gray-600">
                          <User className="h-4 w-4 mr-2" />
                          <span>{tecnico.experience} de experiencia</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{tecnico.zone}</span>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-2">Especialidades:</p>
                          <div className="flex flex-wrap gap-2">
                            {tecnico.specialties.map((specialty) => (
                              <Badge key={specialty} variant="outline">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button
                          className="w-full mt-4"
                          disabled={!tecnico.available}
                          onClick={() => handleBookTechnician(tecnico.id)}
                        >
                          {tecnico.available ? "Agendar Cita" : "No Disponible"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            /* Booking Form */
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Agendar Servicio Técnico</CardTitle>
                <CardDescription>Completa los datos para agendar tu cita de instalación</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Nombre Completo</label>
                      <Input placeholder="Tu nombre completo" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Teléfono</label>
                      <Input placeholder="(33) 1234-5678" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Dirección Completa</label>
                    <Textarea placeholder="Calle, número, colonia, código postal..." />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Fecha Preferida</label>
                      <Input type="date" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Horario Preferido</label>
                      <Select>
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

                  <div>
                    <label className="block text-sm font-medium mb-2">Tipo de Electrodoméstico</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lavadora">Lavadora</SelectItem>
                        <SelectItem value="refrigerador">Refrigerador</SelectItem>
                        <SelectItem value="horno">Horno</SelectItem>
                        <SelectItem value="microondas">Microondas</SelectItem>
                        <SelectItem value="otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Descripción del Problema</label>
                    <Textarea placeholder="Describe brevemente qué refacción necesitas instalar..." />
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-800 mb-2">Resumen del Servicio</h4>
                    <div className="text-sm text-blue-700 space-y-1">
                      <p>• Técnico certificado a domicilio</p>
                      <p>• Instalación profesional de refacción</p>
                      <p>• 30 días de garantía en el servicio</p>
                      <p>• Costo: $300 MXN (instalación básica)</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowBookingForm(false)}
                      className="flex-1"
                    >
                      Cancelar
                    </Button>
                    <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                      Confirmar Cita
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
