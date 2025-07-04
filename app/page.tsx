"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Users,
  Shield,
  Star,
  Menu,
  X,
  ArrowRight,
  Clock,
  MapPin,
  Wrench,
  Zap,
  Phone,
  MessageCircle,
  Award,
  Target,
  Settings,
  Calendar,
} from "lucide-react"
import Link from "next/link"
import LiveChat from "@/components/live-chat"
import AppointmentBooking from "@/components/appointment-booking"

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [appointmentOpen, setAppointmentOpen] = useState(false)

  const features = [
    {
      icon: Search,
      title: "Diagnóstico Experto",
      description: "Nuestros técnicos identifican el problema y la refacción exacta que necesitas",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      step: "01",
    },
    {
      icon: Wrench,
      title: "Refacciones Exactas",
      description: "Encuentra la pieza correcta en nuestro catálogo de +500 refacciones originales",
      color: "text-green-600",
      bgColor: "bg-green-50",
      step: "02",
    },
    {
      icon: Users,
      title: "Instalación Pro",
      description: "Técnicos certificados instalan tu refacción con garantía de 30 días",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      step: "03",
    },
  ]

  const benefits = [
    {
      icon: Target,
      title: "Diagnóstico Preciso",
      description: "Identificación exacta del problema",
      color: "text-blue-600",
    },
    {
      icon: Clock,
      title: "Servicio Rápido",
      description: "Instalación en 24-48 horas",
      color: "text-green-600",
    },
    {
      icon: Shield,
      title: "Garantía Total",
      description: "30 días en todas las instalaciones",
      color: "text-orange-600",
    },
    {
      icon: Award,
      title: "Técnicos Expertos",
      description: "50+ profesionales certificados",
      color: "text-blue-600",
    },
  ]

  const stats = [
    { number: "500+", label: "Refacciones", icon: Settings },
    { number: "50+", label: "Técnicos", icon: Users },
    { number: "24h", label: "Respuesta", icon: Clock },
    { number: "98%", label: "Satisfacción", icon: Star },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-md bg-white/95">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl flex items-center justify-center shadow-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-slate-900">Nexu</span>
                <span className="text-xs text-gray-500 -mt-1">Refacciones Pro</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {[
                { href: "/productos", label: "Productos" },
                { href: "/tecnicos", label: "Técnicos" },
                { href: "/afiliate", label: "Afiliate" },
                { href: "/identificar", label: "IA Identificar" },
                { href: "/faq", label: "FAQ" },
                { href: "/contacto", label: "Contacto" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-600 hover:text-slate-900 font-medium transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center space-x-4">
              <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50 bg-transparent">
                Iniciar Sesión
              </Button>
              <Button className="bg-slate-900 hover:bg-slate-800 text-white shadow-lg">Comenzar</Button>
            </div>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-6 pb-6 border-t border-gray-100">
              <nav className="flex flex-col space-y-4 pt-6">
                {[
                  { href: "/productos", label: "Productos" },
                  { href: "/tecnicos", label: "Técnicos" },
                  { href: "/afiliate", label: "Afiliate" },
                  { href: "/identificar", label: "IA Identificar" },
                  { href: "/faq", label: "FAQ" },
                  { href: "/contacto", label: "Contacto" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-gray-600 hover:text-slate-900 font-medium py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="pt-4 border-t border-gray-100 space-y-3">
                  <Button variant="outline" className="w-full bg-transparent">
                    Iniciar Sesión
                  </Button>
                  <Button className="w-full bg-slate-900 hover:bg-slate-800">Comenzar</Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-blue-700 font-medium text-sm mb-8">
              <Award className="w-4 h-4 mr-2" />
              Técnicos Certificados + Refacciones Originales
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Refacciones y Servicio
              <span className="block bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                Profesional
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Encuentra la refacción exacta para tu electrodoméstico y agenda instalación profesional con técnicos
              certificados. Todo en Guadalajara.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button
                size="lg"
                className="bg-slate-900 hover:bg-slate-800 text-white shadow-lg px-8 py-4"
                onClick={() => setAppointmentOpen(true)}
              >
                <Calendar className="mr-2 h-5 w-5" />
                Agendar Cita
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-gray-200 px-8 py-4 bg-transparent">
                Ver Catálogo
              </Button>
            </div>

            {/* Quick Benefits */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gray-50 flex items-center justify-center`}>
                    <benefit.icon className={`w-6 h-6 ${benefit.color}`} />
                  </div>
                  <h3 className="font-semibold text-slate-900 text-sm mb-1">{benefit.title}</h3>
                  <p className="text-gray-600 text-xs">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">¿Cómo Funciona?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Proceso simplificado en 3 pasos para resolver tu problema de electrodomésticos
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                <CardHeader className="text-center pb-4">
                  <div className="relative mb-6">
                    <div
                      className={`w-16 h-16 mx-auto rounded-2xl ${feature.bgColor} flex items-center justify-center`}
                    >
                      <feature.icon className={`h-8 w-8 ${feature.color}`} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {feature.step}
                    </div>
                  </div>
                  <CardTitle className="text-xl text-slate-900 mb-2">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Cobertura Guadalajara</h2>
          <div className="flex items-center justify-center mb-12">
            <MapPin className="h-6 w-6 text-green-600 mr-2" />
            <span className="text-lg text-gray-600">Zona Metropolitana Completa</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {["Guadalajara Centro", "Zapopan", "Tlaquepaque", "Tonalá", "Tlajomulco", "El Salto"].map((zone, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="p-4 text-sm font-medium bg-gray-50 border border-gray-100 hover:border-green-200 hover:bg-green-50 transition-colors"
              >
                {zone}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl mb-4 shadow-lg">
                  <stat.icon className="h-8 w-8 text-slate-900" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-green-600 to-green-500 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">¿Listo para Comenzar?</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Únete a miles de clientes satisfechos que confían en Nexu para sus electrodomésticos
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-green-600 hover:bg-gray-50 shadow-lg px-8 py-4"
              onClick={() => setAppointmentOpen(true)}
            >
              <Calendar className="mr-2 h-5 w-5" />
              Agendar Cita
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 bg-transparent"
            >
              Ver Productos
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-500 rounded-xl flex items-center justify-center">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <span className="text-2xl font-bold">Nexu</span>
                  <span className="block text-sm text-gray-400 -mt-1">Refacciones Pro</span>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed max-w-md mb-6">
                La plataforma más avanzada para refacciones de electrodomésticos. Tecnología IA + técnicos expertos en
                Guadalajara.
              </p>
              <div className="flex space-x-4">
                <Button
                  onClick={() => {
                    const message = encodeURIComponent("Hola, me interesa conocer más sobre Nexu")
                    window.open(`https://wa.me/523338766231?text=${message}`, "_blank")
                  }}
                  className="bg-green-600 hover:bg-green-500"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp
                </Button>
                <Button onClick={() => (window.location.href = "tel:+523338766231")} variant="outline">
                  <Phone className="mr-2 h-4 w-4" />
                  Llamar
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-white">Servicios</h3>
              <ul className="space-y-3 text-gray-300">
                <li>
                  <a href="/productos" className="hover:text-green-400 transition-colors">
                    Refacciones Originales
                  </a>
                </li>
                <li>
                  <a href="/tecnicos" className="hover:text-green-400 transition-colors">
                    Instalación Técnica
                  </a>
                </li>
                <li>
                  <a href="/identificar" className="hover:text-green-400 transition-colors">
                    Identificación IA
                  </a>
                </li>
                <li>
                  <a href="/faq" className="hover:text-green-400 transition-colors">
                    Garantía Extendida
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-white">Soporte</h3>
              <ul className="space-y-3 text-gray-300">
                <li>
                  <a href="/faq" className="hover:text-green-400 transition-colors">
                    Centro de Ayuda
                  </a>
                </li>
                <li>
                  <button className="hover:text-green-400 transition-colors">Chat en Vivo</button>
                </li>
                <li>
                  <a href="/contacto" className="hover:text-green-400 transition-colors">
                    Contacto
                  </a>
                </li>
                <li>
                  <a href="mailto:info@nexu.mx" className="hover:text-green-400 transition-colors">
                    info@nexu.mx
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">&copy; 2024 Nexu. Todos los derechos reservados.</p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <a href="/contacto" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                Privacidad
              </a>
              <a href="/faq" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                Términos
              </a>
              <a href="/contacto" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Live Chat */}
      <LiveChat />

      {/* Appointment Booking Modal */}
      <AppointmentBooking isOpen={appointmentOpen} onClose={() => setAppointmentOpen(false)} />
    </div>
  )
}
