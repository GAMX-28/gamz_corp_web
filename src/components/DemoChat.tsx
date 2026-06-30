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
      {/* ── Botón flotante ── */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 transition-all duration-200"
        style={{
          background: 'transparent',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '4px',
          color: '#ffffff',
          fontSize: '12px',
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)')}
        onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)')}
      >
        <span style={{ width: '6px', height: '6px', borderRadius: '9999px', background: '#2563EB', flexShrink: 0, display: 'inline-block' }} />
        DEMO EN VIVO
      </button>

      {/* ── Modal ── */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(12px)' }}
        >
          <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

          {/* Panel — mobile: full screen, desktop: 480×600 */}
          <div
            className="relative flex flex-col w-full h-full sm:w-[480px] sm:h-[600px]"
            style={{
              background: '#0A0A0A',
              borderRadius: 0,
              border: 'none',
              overflow: 'hidden',
            }}
          >
            {/* Desktop border-radius y border via breakpoint */}
            <style>{`.demo-panel-inner{border-radius:0;border:none}@media(min-width:640px){.demo-panel-inner{border-radius:12px!important;border:1px solid rgba(255,255,255,0.08)!important}}`}</style>
            <div className="demo-panel-inner flex flex-col w-full h-full overflow-hidden" style={{ background: '#0A0A0A' }}>

              {/* Header */}
              <div style={{ padding: '24px 24px 0', flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ color: '#ffffff', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '15px', lineHeight: 1.2, marginBottom: '6px' }}>
                      {step === 'select' ? 'Elige tu tipo de negocio' : selectedLabel}
                    </p>
                    <p style={{ color: '#86868B', fontFamily: 'Inter, sans-serif', fontSize: '11px', lineHeight: 1 }}>
                      {step === 'select'
                        ? 'Demo de bot para WhatsApp y Telegram · GAMZ Corp'
                        : 'IA activa · respondiendo en tiempo real'}
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '2px' }}>
                    {step === 'chat' && (
                      <button
                        onClick={reset}
                        style={{ color: '#86868B', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Space Grotesk, sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', padding: 0, transition: 'color 0.15s' }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
                        onMouseLeave={e => (e.currentTarget.style.color = '#86868B')}
                      >
                        Cambiar
                      </button>
                    )}
                    <button
                      onClick={() => setIsOpen(false)}
                      style={{ color: '#86868B', background: 'none', border: 'none', cursor: 'pointer', fontSize: '22px', lineHeight: 1, padding: 0, transition: 'color 0.15s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#86868B')}
                    >
                      ×
                    </button>
                  </div>
                </div>
                <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', marginTop: '20px' }} />
              </div>

              {/* ── Selector ── */}
              {step === 'select' && (
                <div style={{ flex: 1, overflowY: 'auto', padding: '0 24px' }}>
                  {BUSINESS_TYPES.map((b, i) => (
                    <button
                      key={b.id}
                      onClick={() => selectBusiness(b.id)}
                      className="selector-btn"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        width: '100%',
                        textAlign: 'left',
                        background: 'none',
                        border: 'none',
                        borderBottom: i < BUSINESS_TYPES.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                        padding: '16px 0',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={e => {
                        const lbl = e.currentTarget.querySelector<HTMLElement>('.sel-label')
                        if (lbl) lbl.style.color = '#2563EB'
                      }}
                      onMouseLeave={e => {
                        const lbl = e.currentTarget.querySelector<HTMLElement>('.sel-label')
                        if (lbl) lbl.style.color = '#ffffff'
                      }}
                    >
                      <span style={{ color: '#2563EB', fontFamily: 'monospace', fontSize: '11px', flexShrink: 0 }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        className="sel-label"
                        style={{ color: '#ffffff', fontFamily: 'Space Grotesk, sans-serif', fontSize: '14px', fontWeight: 500, transition: 'color 0.15s' }}
                      >
                        {b.label}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* ── Chat ── */}
              {step === 'chat' && (
                <>
                  <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {messages.map((msg, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                        <div
                          style={
                            msg.role === 'user'
                              ? { background: '#2563EB', color: '#ffffff', borderRadius: '8px', fontSize: '14px', lineHeight: '1.5', padding: '12px 16px', maxWidth: '85%', fontFamily: 'Inter, sans-serif' }
                              : { background: '#141414', border: '1px solid rgba(255,255,255,0.06)', color: '#b0b0b0', borderRadius: '8px', fontSize: '14px', lineHeight: '1.5', padding: '12px 16px', maxWidth: '85%', fontFamily: 'Inter, sans-serif' }
                          }
                        >
                          {msg.content}
                        </div>
                      </div>
                    ))}
                    {loading && (
                      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <div style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', padding: '12px 16px' }}>
                          <div style={{ display: 'flex', gap: '5px', alignItems: 'center', height: '16px' }}>
                            {[0, 160, 320].map((d) => (
                              <span
                                key={d}
                                className="animate-bounce"
                                style={{ width: '6px', height: '6px', borderRadius: '9999px', background: '#444', animationDelay: `${d}ms`, display: 'block' }}
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
                    className="demo-input-area"
                    style={{ flexShrink: 0, padding: '12px 24px 20px', borderTop: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <div
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#141414', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '10px 12px', transition: 'border-color 0.15s' }}
                      onFocusCapture={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)')}
                      onBlurCapture={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
                    >
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKey}
                        placeholder="Escribe aquí..."
                        autoFocus
                        style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#ffffff', fontSize: '16px', fontFamily: 'Inter, sans-serif', lineHeight: '1.4' }}
                      />
                      <button
                        onClick={sendMessage}
                        disabled={!input.trim() || loading}
                        style={{
                          width: '30px',
                          height: '30px',
                          borderRadius: '4px',
                          background: input.trim() && !loading ? '#2563EB' : 'rgba(255,255,255,0.06)',
                          border: 'none',
                          cursor: input.trim() && !loading ? 'pointer' : 'default',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          transition: 'background 0.15s',
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                    <p style={{ textAlign: 'center', marginTop: '10px', fontSize: '10px', color: '#2D2D2D', fontFamily: 'Inter, sans-serif' }}>
                      Demo · Bot para WhatsApp y Telegram · GAMZ Corp
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
