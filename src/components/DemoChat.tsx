'use client'
import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const BUSINESS_TYPES = [
  { id: 'clinica',     label: 'Clínica o consultorio' },
  { id: 'ferreteria',  label: 'Tienda o ferretería'   },
  { id: 'boutique',    label: 'Ropa o boutique'        },
  { id: 'restaurante', label: 'Restaurante o comida'   },
  { id: 'otro',        label: 'Otro negocio'           },
]

const INITIAL_MESSAGES: Record<string, string> = {
  clinica:     'Hola, bienvenido. Puedo agendarte una cita ahora mismo. ¿Qué servicio necesitas?',
  ferreteria:  'Hola, ¿en qué te puedo ayudar? Puedo revisar disponibilidad y tomar tu pedido.',
  restaurante: 'Hola, bienvenido. ¿Quieres hacer un pedido para llevar o reservar una mesa?',
  boutique:    'Hola, ¿qué estás buscando hoy? Te ayudo a encontrar lo que necesitas.',
  otro:        'Hola, ¿en qué te puedo ayudar? Estoy aquí para atenderte.',
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

  // Bloquea scroll del body cuando el modal está abierto
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

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
        setMessages(prev => [...prev, { role: 'assistant', content: data.message }])
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Hubo un error, intenta de nuevo.' }])
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  const selectedLabel = BUSINESS_TYPES.find(b => b.id === businessType)?.label ?? ''

  return (
    <>
      {/* ── Trigger ── */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 font-space-grotesk
          text-white text-[13px] font-medium px-4 py-2.5 rounded-full
          border border-white/[0.14] bg-black/90 backdrop-blur-xl
          hover:bg-white/[0.05] hover:border-white/30
          transition-all duration-200 shadow-lg"
      >
        <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
          <span className="animate-ping absolute inset-0 rounded-full bg-green-400 opacity-75" />
          <span className="relative rounded-full bg-green-500 h-full w-full" />
        </span>
        Probar demo
      </button>

      {/* ── Modal ── */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <div
            className="relative w-full sm:max-w-[390px] flex flex-col overflow-hidden
              bg-[#080808] border border-white/[0.08]
              rounded-t-[28px] sm:rounded-[28px]
              shadow-[0_32px_80px_rgba(0,0,0,0.7)]"
            style={{ height: 'min(580px, 88svh)' }}
          >

            {/* Header */}
            <div className="flex items-start justify-between px-6 pt-6 pb-5 flex-shrink-0">
              <div>
                <p className="font-space-grotesk text-[15px] font-semibold text-white leading-tight">
                  {step === 'select' ? 'Demo en vivo' : selectedLabel}
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                  {step === 'chat' && (
                    <span className="inline-flex h-1.5 w-1.5 rounded-full bg-green-500 flex-shrink-0" />
                  )}
                  <p className="text-[11px] leading-none" style={{ color: '#555' }}>
                    {step === 'select' ? 'Automatización con IA · GAMZ Corp' : 'IA activa · respondiendo en tiempo real'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-0.5">
                {step === 'chat' && (
                  <button
                    onClick={reset}
                    className="font-space-grotesk text-[11px] uppercase tracking-[0.14em] transition-colors"
                    style={{ color: '#444' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#888')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#444')}
                  >
                    Cambiar
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="transition-colors flex-shrink-0"
                  style={{ color: '#444' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#888')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#444')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', flexShrink: 0 }} />

            {/* ── Selector ── */}
            {step === 'select' && (
              <div className="flex-1 flex flex-col px-6 overflow-y-auto">
                <p
                  className="font-space-grotesk text-[10px] uppercase tracking-[0.2em] pt-6 pb-3"
                  style={{ color: '#3A3A3A' }}
                >
                  Tipo de negocio
                </p>
                {BUSINESS_TYPES.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => selectBusiness(b.id)}
                    className="group flex items-center justify-between w-full text-left py-[15px] transition-all duration-150"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
                  >
                    <span
                      className="font-space-grotesk text-[16px] font-medium transition-colors duration-150"
                      style={{ color: 'rgba(255,255,255,0.55)' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                    >
                      {b.label}
                    </span>
                    <svg
                      width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="rgba(255,255,255,0.18)" strokeWidth="1.8"
                      className="flex-shrink-0 transition-all duration-150 group-hover:stroke-white/50 group-hover:translate-x-0.5"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                ))}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }} />
                <p
                  className="text-[10px] text-center py-6 mt-auto"
                  style={{ color: '#2A2A2A' }}
                >
                  GAMZ Corp · Powered by Claude
                </p>
              </div>
            )}

            {/* ── Chat ── */}
            {step === 'chat' && (
              <>
                <div className="flex-1 overflow-y-auto px-5 py-5 space-y-3">
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div
                        className="max-w-[80%] px-4 py-2.5 rounded-2xl text-[14px] leading-relaxed"
                        style={
                          msg.role === 'user'
                            ? { background: '#2563EB', color: '#fff', borderBottomRightRadius: '6px' }
                            : { background: '#141414', color: 'rgba(255,255,255,0.82)', borderBottomLeftRadius: '6px', border: '1px solid rgba(255,255,255,0.06)' }
                        }
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="flex justify-start">
                      <div
                        className="px-4 py-3 rounded-2xl"
                        style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)', borderBottomLeftRadius: '6px' }}
                      >
                        <div className="flex gap-[5px] items-center h-4">
                          {[0, 160, 320].map((d) => (
                            <span
                              key={d}
                              className="w-1.5 h-1.5 rounded-full animate-bounce"
                              style={{ background: '#444', animationDelay: `${d}ms` }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={bottomRef} />
                </div>

                {/* Input */}
                <div
                  className="flex-shrink-0 px-4 pb-5 pt-3"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
                >
                  <div
                    className="flex items-center gap-2 px-4 py-3 rounded-2xl transition-all duration-150"
                    style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)' }}
                    onFocus={() => {}}
                  >
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKey}
                      placeholder="Escribe aquí..."
                      autoFocus
                      className="flex-1 bg-transparent outline-none font-inter"
                      style={{
                        color: '#fff',
                        fontSize: '16px', // Evita el zoom en iOS
                        lineHeight: '1.4',
                      }}
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!input.trim() || loading}
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-150"
                      style={{
                        background: input.trim() && !loading ? '#2563EB' : 'rgba(255,255,255,0.06)',
                      }}
                    >
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                        <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-center mt-2.5 text-[10px]" style={{ color: '#2A2A2A' }}>
                    GAMZ Corp · IA real con Claude
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
