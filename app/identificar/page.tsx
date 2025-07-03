"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera, Upload, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import Header from "@/components/header"

interface IdentificationResult {
  brand: string
  model: string
  type: string
  confidence: number
  compatibleParts: Array<{
    id: string
    name: string
    price: number
    availability: string
  }>
}

export default function IdentificarPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<IdentificationResult | null>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
        setResult(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzeImage = async () => {
    if (!selectedImage) return

    setIsAnalyzing(true)

    // Simular análisis de IA
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setResult({
      brand: "LG",
      model: "WM3488HW",
      type: "Lavadora",
      confidence: 94,
      compatibleParts: [
        { id: "1", name: "Bomba de Agua", price: 850, availability: "En Stock" },
        { id: "2", name: "Filtro de Pelusa", price: 320, availability: "En Stock" },
        { id: "3", name: "Correa de Transmisión", price: 450, availability: "2-3 días" },
        { id: "4", name: "Válvula de Entrada", price: 680, availability: "En Stock" },
      ],
    })

    setIsAnalyzing(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Identificación Inteligente</h1>
              <p className="text-xl text-gray-600">
                Sube una foto de tu electrodoméstico y descubre qué refacciones necesitas
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Upload Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Camera className="mr-2 h-5 w-5" />
                    Subir Imagen
                  </CardTitle>
                  <CardDescription>Toma una foto clara del electrodoméstico completo</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {!selectedImage ? (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <p className="text-gray-600 mb-4">Arrastra una imagen aquí o haz clic para seleccionar</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                        />
                        <label htmlFor="image-upload">
                          <Button variant="outline" className="cursor-pointer bg-transparent">
                            Seleccionar Imagen
                          </Button>
                        </label>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="relative">
                          <img
                            src={selectedImage || "/placeholder.svg"}
                            alt="Electrodoméstico"
                            className="w-full h-64 object-cover rounded-lg"
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={analyzeImage}
                            disabled={isAnalyzing}
                            className="flex-1 bg-blue-600 hover:bg-blue-700"
                          >
                            {isAnalyzing ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Analizando...
                              </>
                            ) : (
                              <>
                                <Camera className="mr-2 h-4 w-4" />
                                Identificar
                              </>
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setSelectedImage(null)
                              setResult(null)
                            }}
                          >
                            Nueva Imagen
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Results Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Resultado del Análisis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!result && !isAnalyzing && (
                    <div className="text-center py-8 text-gray-500">
                      <AlertCircle className="mx-auto h-12 w-12 mb-4" />
                      <p>Sube una imagen para comenzar el análisis</p>
                    </div>
                  )}

                  {isAnalyzing && (
                    <div className="text-center py-8">
                      <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-600 mb-4" />
                      <p className="text-gray-600">Analizando imagen con IA...</p>
                    </div>
                  )}

                  {result && (
                    <div className="space-y-4">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-green-800">
                            {result.brand} {result.model}
                          </h3>
                          <Badge variant="secondary">{result.confidence}% confianza</Badge>
                        </div>
                        <p className="text-green-700">Tipo: {result.type}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Refacciones Compatibles:</h4>
                        <div className="space-y-2">
                          {result.compatibleParts.map((part) => (
                            <div key={part.id} className="flex items-center justify-between p-3 border rounded-lg">
                              <div>
                                <p className="font-medium">{part.name}</p>
                                <p className="text-sm text-gray-600">${part.price.toLocaleString()} MXN</p>
                              </div>
                              <div className="text-right">
                                <Badge variant={part.availability === "En Stock" ? "default" : "secondary"}>
                                  {part.availability}
                                </Badge>
                                <Button size="sm" className="ml-2">
                                  Agregar
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Tips Section */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Consejos para Mejores Resultados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Camera className="h-6 w-6 text-blue-600" />
                    </div>
                    <h4 className="font-medium mb-1">Buena Iluminación</h4>
                    <p className="text-sm text-gray-600">Asegúrate de tener luz suficiente</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <h4 className="font-medium mb-1">Vista Completa</h4>
                    <p className="text-sm text-gray-600">Incluye el electrodoméstico completo</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <AlertCircle className="h-6 w-6 text-orange-600" />
                    </div>
                    <h4 className="font-medium mb-1">Etiquetas Visibles</h4>
                    <p className="text-sm text-gray-600">Muestra etiquetas de marca y modelo</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
