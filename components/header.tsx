"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Phone, Calendar } from "lucide-react"
import AppointmentBooking from "./appointment-booking"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false)

  const navigation = [
    { name: "Inicio", href: "/" },
    { name: "Productos", href: "/productos" },
    { name: "Técnicos", href: "/tecnicos" },
    { name: "Afíliate", href: "/afiliate" },
    { name: "Contacto", href: "/contacto" },
    { name: "FAQ", href: "/faq" },
    { name: "Cobertura", href: "/cobertura" },
  ]

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <img src="/placeholder-logo.svg" alt="Nexu" className="h-8 w-auto" />
              <span className="ml-2 text-xl font-bold text-gray-900">Nexu</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <Button onClick={() => setIsAppointmentOpen(true)} className="bg-blue-600 hover:bg-blue-700">
                <Calendar className="h-4 w-4 mr-2" />
                Agendar Cita
              </Button>
              <Button
                onClick={() => window.open("https://wa.me/523338766231", "_blank")}
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50"
              >
                <Phone className="h-4 w-4 mr-2" />
                WhatsApp
              </Button>
            </div>

            {/* Mobile menu button */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <img src="/placeholder-logo.svg" alt="Nexu" className="h-8 w-auto" />
                    <span className="ml-2 text-xl font-bold text-gray-900">Nexu</span>
                  </div>
                </div>

                <nav className="space-y-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>

                <div className="mt-8 space-y-4">
                  <Button
                    onClick={() => {
                      setIsAppointmentOpen(true)
                      setIsMenuOpen(false)
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Agendar Cita
                  </Button>
                  <Button
                    onClick={() => window.open("https://wa.me/523338766231", "_blank")}
                    variant="outline"
                    className="w-full border-green-600 text-green-600 hover:bg-green-50"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    WhatsApp
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Appointment Booking Modal */}
      <AppointmentBooking isOpen={isAppointmentOpen} onClose={() => setIsAppointmentOpen(false)} />
    </>
  )
}
