'use client'
import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const BUSINESS_TYPES = [
  { id: 'clinica',     label: 'Clinica o consultorio' },
  { id: 'ferreteria',  label: 'Tienda o ferreteria'   },
  { id: 'boutique',    label: 'Ropa o boutique'        },
  { id: 'restaurante', label: 'Restaurante o comida'   },
  { id: 'otro',        label: 'Otro negocio'           },
]

const INITIAL_MESSAGES: Record<string, string> = {
  clinica:     'Hola, bienvenido. Puedo agendarte una cita ahora mismo. Que servicio necesitas?',
  ferreteria:  'Hola, en que te puedo ayudar? Puedo revisar disponibilidad y tomar tu pedido.',
  restaurante: 'Hola, bienvenido. Quieres hacer un pedido para llevar o reservar una mesa?',
  boutique:    'Hola, que estas buscando hoy? Te ayudo a encontrar lo que necesitas.',
  otro:        'Hola, en que te puedo ayudar? Estoy aqui para atenderte.',
}

export default function DemoChat() {
  const [isOpen, setIsOpen]             = useState(false)
  const [step, setStep]                 = useState<'select' | 'chat'>('select')
  const [businessType, setBusinessType] = useState('')
  const [messages, setMessages]         = useState<Message[]>([])
  const [input, setInput]               = useState('')
  const [loading, setLoading]           = useState(false)
  const bottomRef                       = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const selectBusiness = (id: string) => {
    setBusinessType(id)
    setMessages([{ role: 'assistant', content: INITIAL_MESSAGES[id] }])
    setStep('chat')
  }

  const reset = () => {
    setStep('select')
    setBusinessType('')
    setMessages([])
    setInput('')
  }

  const sendMessage = async () => {
    if (!input.trim() || loading) return
    const userMsg: Message = { role: 'user', content: input.trim() }
    const updated = [...messages, userMsg]
    setMessages(updated)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated, businessType }),
      })
      const data = await res.json()
      if (data.message) {
        setMessages(prev => [
          ...prev,
          { role: 'assistant', content: data.message }
        ])
      }
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Hubo un error, intenta de nuevo.' }
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const selectedLabel = BUSINESS_TYPES.find(b => b.id === businessType)?.label || ''

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5
          bg-white text-black font-semibold text-sm px-5 py-3 rounded-full
          shadow-2xl hover:scale-105 active:scale-95 transition-transform duration-200"
        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full
            rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
        </span>
        Probar demo
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative w-full sm:w-[400px] h-[580px] sm:h-[560px]
            bg-[#0D0D0D] border border-white/10 rounded-t-3xl sm:rounded-3xl
            flex flex-col overflow-hidden shadow-2xl">

            <div className="flex items-center justify-between px-5 py-4
              border-b border-white/[0.08]">
              <div>
                <p className="text-white text-sm font-semibold"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {step === 'select' ? 'Demo en vivo' : selectedLabel}
                </p>
                <p className="text-[11px] text-[#86868B] mt-0.5">
                  {step === 'select'
                    ? 'Elige tu tipo de negocio'
                    : 'Bot activo · IA real'}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {step === 'chat' && (
                  <button onClick={reset}
                    className="text-[#86868B] hover:text-white text-[11px]
                      uppercase tracking-wider transition-colors">
                    Cambiar
                  </button>
                )}
                <button onClick={() => setIsOpen(false)}
                  className="text-[#86868B] hover:text-white transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {step === 'select' && (
              <div className="flex-1 flex flex-col justify-center px-6 gap-3">
                <p className="text-[#86868B] text-xs uppercase tracking-widest mb-2">
                  Tipo de negocio
                </p>
                {BUSINESS_TYPES.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => selectBusiness(b.id)}
                    className="w-full text-left px-5 py-3.5 rounded-xl
                      border border-white/10 text-white text-sm font-medium
                      hover:border-white/30 hover:bg-white/5
                      transition-all duration-150"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    {b.label}
                  </button>
                ))}
                <p className="text-[11px] text-[#3D3D3F] text-center mt-4">
                  Demo de GAMZ Corp · IA con Claude
                </p>
              </div>
            )}

            {step === 'chat' && (
              <>
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                  {messages.map((msg, i) => (
                    <div key={i}
                      className={`flex ${
                        msg.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}>
                      <div className={`max-w-[82%] px-4 py-2.5 rounded-2xl
                        text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-[#2563EB] text-white rounded-br-sm'
                          : 'bg-[#1A1A1A] text-[#F0EDE8] rounded-bl-sm border border-white/5'
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="flex justify-start">
                      <div className="bg-[#1A1A1A] border border-white/5
                        px-4 py-3 rounded-2xl rounded-bl-sm">
                        <div className="flex gap-1">
                          {[0, 150, 300].map((delay) => (
                            <span key={delay}
                              className="w-1.5 h-1.5 bg-[#86868B] rounded-full animate-bounce"
                              style={{ animationDelay: `${delay}ms` }} />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={bottomRef} />
                </div>

                <div className="px-4 py-4 border-t border-white/[0.08]">
                  <div className="flex items-center gap-2 bg-[#1A1A1A]
                    rounded-full px-4 py-2.5 border border-white/10
                    focus-within:border-white/25 transition-colors">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKey}
                      placeholder="Escribe tu mensaje..."
                      className="flex-1 bg-transparent text-white text-sm
                        outline-none placeholder:text-[#3D3D3F]"
                      autoFocus
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!input.trim() || loading}
                      className="w-7 h-7 bg-[#2563EB] rounded-full flex items-center
                        justify-center disabled:opacity-25 hover:bg-blue-500
                        transition-all flex-shrink-0"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                        stroke="white" strokeWidth="2.5">
                        <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-[10px] text-[#3D3D3F] text-center mt-2">
                    Demo de GAMZ Corp · IA real con Claude
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
