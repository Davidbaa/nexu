"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, User, Bot, Phone, Zap } from "lucide-react"

interface Message {
  id: number
  text: string
  sender: "user" | "agent"
  timestamp: Date
}

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "¡Hola! Soy Ana, tu asistente virtual de Nexu. ¿En qué puedo ayudarte hoy?",
      sender: "agent",
      timestamp: new Date(),
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const quickReplies = [
    "Necesito una refacción",
    "Quiero agendar un técnico",
    "¿Cuánto cuesta la instalación?",
    "¿Dan servicio en mi zona?",
  ]

  const autoResponses: { [key: string]: string } = {
    "necesito una refacción":
      "Perfecto, puedo ayudarte a encontrar la refacción que necesitas. ¿Podrías decirme qué tipo de electrodoméstico tienes y cuál es el problema?",
    "quiero agendar un técnico":
      "Excelente, podemos agendar un técnico para ti. ¿Qué tipo de electrodoméstico necesita servicio y en qué zona te encuentras?",
    "¿cuánto cuesta la instalación?":
      "El costo de instalación varía según el tipo de refacción. Las instalaciones básicas cuestan desde $300 MXN. ¿Qué tipo de pieza necesitas instalar?",
    "¿dan servicio en mi zona?":
      "Damos servicio en toda la zona metropolitana de Guadalajara. ¿En qué colonia o municipio te encuentras?",
    hola: "¡Hola! ¿En qué puedo ayudarte hoy?",
    gracias: "¡De nada! ¿Hay algo más en lo que pueda ayudarte?",
    adiós: "¡Hasta luego! Si necesitas ayuda, estaré aquí. ¡Que tengas un excelente día!",
  }

  const sendMessage = async (text: string) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: text,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setNewMessage("")
    setIsTyping(true)

    // Simulate agent response
    setTimeout(() => {
      const lowerText = text.toLowerCase()
      let response =
        "Gracias por tu mensaje. Un agente se pondrá en contacto contigo pronto. También puedes llamarnos al (33) 3876-6231 para atención inmediata."

      // Check for auto responses
      for (const [key, value] of Object.entries(autoResponses)) {
        if (lowerText.includes(key)) {
          response = value
          break
        }
      }

      const agentMessage: Message = {
        id: messages.length + 2,
        text: response,
        sender: "agent",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, agentMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickReply = (reply: string) => {
    sendMessage(reply)
  }

  const openWhatsApp = () => {
    const message = encodeURIComponent("Hola, me gustaría recibir atención personalizada")
    window.open(`https://wa.me/523338766231?text=${message}`, "_blank")
  }

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 hover:from-slate-900 hover:to-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300"
          size="sm"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 z-50 w-80 h-96 shadow-2xl border-0">
          <CardHeader className="bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Zap className="h-4 w-4 text-white" />
                </div>
                <div>
                  <CardTitle className="text-sm font-semibold">Chat en Vivo</CardTitle>
                  <p className="text-xs text-white/80">Nexu Soporte</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex flex-col h-80 p-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`flex items-start space-x-2 max-w-[80%] ${
                      message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-slate-800 to-slate-900 text-white"
                          : "bg-white border border-gray-200 text-gray-600"
                      }`}
                    >
                      {message.sender === "user" ? <User className="h-3 w-3" /> : <Bot className="h-3 w-3" />}
                    </div>
                    <div
                      className={`rounded-xl px-3 py-2 text-sm shadow-lg ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-slate-800 to-slate-900 text-white"
                          : "bg-white text-gray-800 border border-gray-200"
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center">
                      <Bot className="h-3 w-3 text-gray-600" />
                    </div>
                    <div className="bg-white rounded-xl px-3 py-2 shadow-lg border border-gray-200">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Replies */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 bg-white">
                <div className="text-xs text-gray-500 mb-2">Respuestas rápidas:</div>
                <div className="flex flex-wrap gap-1">
                  {quickReplies.map((reply, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs h-6 px-2 bg-gray-50 border-gray-200 hover:bg-gray-100"
                      onClick={() => handleQuickReply(reply)}
                    >
                      {reply}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="border-t border-gray-200 p-4 bg-white">
              <div className="flex space-x-2 mb-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1 text-sm border-gray-200 focus:border-slate-800"
                  onKeyPress={(e) => e.key === "Enter" && sendMessage(newMessage)}
                />
                <Button
                  onClick={() => sendMessage(newMessage)}
                  size="sm"
                  className="bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-slate-800"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex space-x-2">
                <Button
                  onClick={openWhatsApp}
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                >
                  <MessageCircle className="h-3 w-3 mr-1" />
                  WhatsApp
                </Button>
                <Button
                  onClick={() => (window.location.href = "tel:+523338766231")}
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs border-gray-200 hover:bg-gray-50"
                >
                  <Phone className="h-3 w-3 mr-1" />
                  Llamar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
