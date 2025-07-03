"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Zap } from "lucide-react"
import Link from "next/link"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
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
  )
}
