"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, Search, MessageCircle, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"

const faqData = [
  {
    id: 1,
    category: "General",
    question: "¿Qué es Nexu y qué servicios ofrecen?",
    answer:
      "Nexu es una plataforma que conecta a clientes con refacciones para electrodomésticos y técnicos certificados para su instalación. Ofrecemos un catálogo completo de refacciones originales, identificación por IA de electrodomésticos, y servicio técnico profesional a domicilio en la zona metropolitana de Guadalajara.",
  },
  {
    id: 2,
    category: "Refacciones",
    question: "¿Cómo puedo saber qué refacción necesita mi electrodoméstico?",
    answer:
      "Tenemos tres formas de ayudarte: 1) Usa nuestra función de identificación por IA subiendo una foto de tu electrodoméstico, 2) Busca por marca y modelo en nuestro catálogo, o 3) Contacta a nuestros expertos por WhatsApp o teléfono para recibir asesoría personalizada.",
  },
  {
    id: 3,
    category: "Refacciones",
    question: "¿Las refacciones son originales?",
    answer:
      "Sí, trabajamos únicamente con refacciones originales y de alta calidad. Todas nuestras piezas cuentan con garantía del fabricante y están certificadas para asegurar el mejor rendimiento y durabilidad.",
  },
  {
    id: 4,
    category: "Instalación",
    question: "¿Incluyen el servicio de instalación?",
    answer:
      "Sí, ofrecemos servicio de instalación profesional a través de nuestros técnicos certificados. El costo de instalación varía según la complejidad del trabajo, pero generalmente va desde $300 MXN para instalaciones básicas.",
  },
  {
    id: 5,
    category: "Instalación",
    question: "¿Qué garantía tienen las instalaciones?",
    answer:
      "Todas nuestras instalaciones incluyen 30 días de garantía en el servicio. Si hay algún problema relacionado con la instalación, regresamos sin costo adicional para solucionarlo.",
  },
  {
    id: 6,
    category: "Cobertura",
    question: "¿En qué zonas dan servicio?",
    answer:
      "Actualmente damos servicio en toda la zona metropolitana de Guadalajara, incluyendo: Guadalajara Centro, Zapopan, Tlaquepaque, Tonalá, Tlajomulco y El Salto. Estamos expandiendo constantemente nuestra cobertura.",
  },
  {
    id: 7,
    category: "Pagos",
    question: "¿Qué métodos de pago aceptan?",
    answer:
      "Aceptamos tarjetas de crédito y débito (Visa, MasterCard, American Express), transferencias bancarias, OXXO, y pago en efectivo al técnico (solo para el servicio de instalación).",
  },
  {
    id: 8,
    category: "Envíos",
    question: "¿Cuánto tiempo tardan en entregar las refacciones?",
    answer:
      "Las refacciones en stock se entregan en 24-48 horas. Las refacciones que requieren pedido especial pueden tardar de 3-7 días hábiles. Te notificaremos el tiempo exacto al realizar tu pedido.",
  },
  {
    id: 9,
    category: "IA",
    question: "¿Qué tan precisa es la identificación por IA?",
    answer:
      "Nuestra tecnología de IA tiene una precisión del 90-95% en la identificación de electrodomésticos. Para mejores resultados, asegúrate de tomar fotos claras, con buena iluminación y que muestren las etiquetas del modelo cuando sea posible.",
  },
  {
    id: 10,
    category: "Técnicos",
    question: "¿Cómo puedo convertirme en técnico certificado de Nexu?",
    answer:
      "Puedes registrarte en nuestra sección 'Afiliate'. Necesitas mínimo 2 años de experiencia, certificaciones técnicas, herramientas propias y vehículo. El proceso incluye revisión de documentos, entrevista técnica y prueba práctica.",
  },
  {
    id: 11,
    category: "Soporte",
    question: "¿Cómo puedo contactar al soporte técnico?",
    answer:
      "Puedes contactarnos por WhatsApp (+52 33 3876-6231), teléfono, email (info@nexu.mx), o a través del chat en vivo en nuestra página web. Nuestro horario de atención es de lunes a viernes de 8:00 a 18:00 y sábados de 9:00 a 14:00.",
  },
  {
    id: 12,
    category: "Garantías",
    question: "¿Qué garantía tienen las refacciones?",
    answer:
      "Todas las refacciones incluyen garantía del fabricante que varía según el tipo de pieza (generalmente de 6 meses a 2 años). Además, si la refacción llega defectuosa, la cambiamos sin costo en los primeros 15 días.",
  },
]

const categories = [
  "Todos",
  "General",
  "Refacciones",
  "Instalación",
  "Cobertura",
  "Pagos",
  "Envíos",
  "IA",
  "Técnicos",
  "Soporte",
  "Garantías",
]

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [openItems, setOpenItems] = useState<number[]>([])

  const filteredFAQs = faqData.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Todos" || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleItem = (id: number) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const openWhatsApp = () => {
    const message = encodeURIComponent("Hola, tengo una pregunta que no encontré en las FAQ")
    window.open(`https://wa.me/523338766231?text=${message}`, "_blank")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Preguntas Frecuentes</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Encuentra respuestas rápidas a las preguntas más comunes sobre nuestros servicios
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Search and Filter */}
            <Card className="mb-8">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Buscar en preguntas frecuentes..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Badge
                        key={category}
                        variant={selectedCategory === category ? "default" : "secondary"}
                        className="cursor-pointer hover:bg-blue-600 hover:text-white transition-colors"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Items */}
            <div className="space-y-4">
              {filteredFAQs.map((faq) => (
                <Card key={faq.id} className="overflow-hidden">
                  <CardHeader
                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => toggleItem(faq.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline" className="text-xs">
                          {faq.category}
                        </Badge>
                        <CardTitle className="text-lg">{faq.question}</CardTitle>
                      </div>
                      {openItems.includes(faq.id) ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                  </CardHeader>

                  {openItems.includes(faq.id) && (
                    <CardContent className="pt-0">
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>

            {filteredFAQs.length === 0 && (
              <div className="text-center py-12">
                <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No se encontraron resultados</h3>
                <p className="text-gray-500 mb-6">
                  Intenta con otros términos de búsqueda o selecciona una categoría diferente
                </p>
              </div>
            )}

            {/* Contact Support */}
            <Card className="mt-12">
              <CardHeader>
                <CardTitle>¿No encontraste lo que buscabas?</CardTitle>
                <CardDescription>
                  Nuestro equipo de soporte está listo para ayudarte con cualquier pregunta adicional
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Button onClick={openWhatsApp} className="bg-green-600 hover:bg-green-700">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    WhatsApp
                  </Button>

                  <Button onClick={() => (window.location.href = "tel:+523338766231")} variant="outline">
                    <Phone className="mr-2 h-4 w-4" />
                    Llamar
                  </Button>

                  <Button onClick={() => (window.location.href = "/contacto")} variant="outline">
                    <Mail className="mr-2 h-4 w-4" />
                    Contacto
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
