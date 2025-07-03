"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Phone } from "lucide-react"

const coverageAreas = [
  {
    id: 1,
    name: "Guadalajara Centro",
    status: "active",
    responseTime: "30-45 min",
    technicians: 12,
    coordinates: { x: 50, y: 45 },
  },
  {
    id: 2,
    name: "Zapopan",
    status: "active",
    responseTime: "25-40 min",
    technicians: 15,
    coordinates: { x: 35, y: 30 },
  },
  {
    id: 3,
    name: "Tlaquepaque",
    status: "active",
    responseTime: "35-50 min",
    technicians: 8,
    coordinates: { x: 65, y: 60 },
  },
  {
    id: 4,
    name: "Tonalá",
    status: "active",
    responseTime: "40-55 min",
    technicians: 6,
    coordinates: { x: 75, y: 70 },
  },
  {
    id: 5,
    name: "Tlajomulco",
    status: "active",
    responseTime: "45-60 min",
    technicians: 5,
    coordinates: { x: 40, y: 80 },
  },
  {
    id: 6,
    name: "El Salto",
    status: "active",
    responseTime: "50-65 min",
    technicians: 4,
    coordinates: { x: 25, y: 85 },
  },
  {
    id: 7,
    name: "Chapala",
    status: "coming-soon",
    responseTime: "Próximamente",
    technicians: 0,
    coordinates: { x: 20, y: 95 },
  },
  {
    id: 8,
    name: "Ajijic",
    status: "coming-soon",
    responseTime: "Próximamente",
    technicians: 0,
    coordinates: { x: 15, y: 90 },
  },
]

export default function CoverageMap() {
  const [selectedArea, setSelectedArea] = useState<(typeof coverageAreas)[0] | null>(null)

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <MapPin className="mr-2 h-5 w-5" />
          Mapa de Cobertura - Zona Metropolitana de Guadalajara
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Interactive Map */}
          <div className="lg:col-span-2">
            <div className="relative bg-gradient-to-br from-blue-100 to-green-100 rounded-lg p-4 h-96 overflow-hidden">
              {/* Map Background */}
              <div className="absolute inset-0 opacity-20">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Simplified map outline */}
                  <path
                    d="M20,20 L80,20 L85,40 L80,60 L85,80 L70,90 L30,95 L15,85 L20,60 L15,40 Z"
                    fill="currentColor"
                    className="text-blue-300"
                  />
                </svg>
              </div>

              {/* Coverage Areas */}
              {coverageAreas.map((area) => (
                <div
                  key={area.id}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 ${
                    selectedArea?.id === area.id ? "scale-125 z-10" : "hover:scale-110"
                  }`}
                  style={{
                    left: `${area.coordinates.x}%`,
                    top: `${area.coordinates.y}%`,
                  }}
                  onClick={() => setSelectedArea(area)}
                >
                  <div
                    className={`w-4 h-4 rounded-full border-2 border-white shadow-lg ${
                      area.status === "active" ? "bg-green-500 animate-pulse" : "bg-yellow-500"
                    }`}
                  />

                  {/* Area Label */}
                  <div
                    className={`absolute top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap ${
                      selectedArea?.id === area.id ? "block" : "hidden lg:block"
                    }`}
                  >
                    <div className="bg-white px-2 py-1 rounded shadow-md text-xs font-medium">{area.name}</div>
                  </div>
                </div>
              ))}

              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-md">
                <div className="text-xs font-medium mb-2">Leyenda</div>
                <div className="flex items-center space-x-4 text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Activo</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span>Próximamente</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Area Details */}
          <div className="space-y-4">
            {selectedArea ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{selectedArea.name}</CardTitle>
                    <Badge variant={selectedArea.status === "active" ? "default" : "secondary"}>
                      {selectedArea.status === "active" ? "Activo" : "Próximamente"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">
                      <strong>Tiempo de respuesta:</strong> {selectedArea.responseTime}
                    </span>
                  </div>

                  {selectedArea.status === "active" && (
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-green-600" />
                      <span className="text-sm">
                        <strong>Técnicos disponibles:</strong> {selectedArea.technicians}
                      </span>
                    </div>
                  )}

                  {selectedArea.status === "active" && (
                    <div className="pt-2 border-t">
                      <p className="text-xs text-gray-600">
                        Servicio completo disponible: refacciones, instalación y soporte técnico.
                      </p>
                    </div>
                  )}

                  {selectedArea.status === "coming-soon" && (
                    <div className="pt-2 border-t">
                      <p className="text-xs text-gray-600">
                        Estamos expandiendo nuestros servicios a esta zona. ¡Mantente atento!
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center text-gray-500">
                    <MapPin className="mx-auto h-8 w-8 mb-2" />
                    <p className="text-sm">Haz clic en cualquier zona del mapa para ver detalles</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Coverage Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Resumen de Cobertura</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Zonas activas:</span>
                  <span className="font-medium">6</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Técnicos totales:</span>
                  <span className="font-medium">50</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tiempo promedio:</span>
                  <span className="font-medium">35-50 min</span>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-xs text-gray-600">Cobertura 24/7 para emergencias en todas las zonas activas</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
