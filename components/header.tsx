"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Phone, MessageCircle, Settings } from "lucide-react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

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
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/placeholder-logo.svg" alt="Nexu Logo" width={40} height={40} className="w-10 h-10" />
            <span className="text-2xl font-bold text-blue-600">Nexu</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}

            {/* Admin Link */}
            <Link
              href="/admin/productos"
              className="flex items-center text-gray-500 hover:text-blue-600 font-medium transition-colors"
            >
              <Settings className="h-4 w-4 mr-1" />
              Admin
            </Link>
          </nav>

          {/* Contact Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="tel:+525512345678">
                <Phone className="h-4 w-4 mr-2" />
                Llamar
              </Link>
            </Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700" asChild>
              <Link href="https://wa.me/525512345678" target="_blank">
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp
              </Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                <Link
                  href="/admin/productos"
                  className="flex items-center text-lg font-medium text-gray-500 hover:text-blue-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Panel Admin
                </Link>

                <div className="pt-4 space-y-2">
                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <Link href="tel:+525512345678">
                      <Phone className="h-4 w-4 mr-2" />
                      Llamar
                    </Link>
                  </Button>
                  <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
                    <Link href="https://wa.me/525512345678" target="_blank">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      WhatsApp
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
