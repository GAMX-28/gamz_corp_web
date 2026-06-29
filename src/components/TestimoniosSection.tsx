'use client'
import { useEffect, useRef } from 'react'

const testimonios = [
  {
    texto: "Antes perdíamos citas porque nadie contestaba el WhatsApp a tiempo, ahora el bot las agenda solo y manda recordatorios, bajamos las cancelaciones a la mitad",
    nombre: "Dra. Mariana Torres",
    negocio: "Clínica Dental Sonrisa, Querétaro",
  },
  {
    texto: "Mis clientes preguntan precios por WhatsApp todo el día, el bot ya contesta solo y hasta aparta mercancía, me ahorré contratar a alguien más",
    nombre: "Vicente Ramírez",
    negocio: "Ferretería El Clavo, Texcoco",
  },
  {
    texto: "Pusimos el bot un viernes, el sábado ya había tomado 12 pedidos para llevar sin que yo tocara el teléfono, no lo puedo creer todavía",
    nombre: "Chef Rodrigo Serna",
    negocio: "Fonda El Sazón, CDMX",
  },
]

export default function TestimoniosSection() {
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            el.style.opacity = '1'
            el.style.transform = 'translateY(0)'
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.15 }
    )
    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <section className="px-6 md:px-[10%] py-32 border-t border-white/[0.06]">
      <p
        className="text-[11px] font-semibold uppercase tracking-[0.22em] mb-6"
        style={{ color: '#2563EB', fontFamily: 'Space Grotesk, sans-serif' }}
      >
        Clientes
      </p>
      <h2
        data-reveal
        className="font-space-grotesk text-[clamp(32px,4vw,52px)] font-bold text-white leading-[1.08] tracking-tight mb-20 max-w-xl"
      >
        Resultados reales.
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonios.map((t, i) => (
          <div
            key={i}
            ref={(el) => { if (el) cardsRef.current[i] = el }}
            className="rounded-2xl p-8 flex flex-col"
            style={{
              background: '#0D0D0D',
              border: '1px solid rgba(255,255,255,0.06)',
              opacity: 0,
              transform: 'translateY(40px)',
              transition: `opacity 0.7s ease, transform 0.7s ease, border-color 0.3s ease`,
              transitionDelay: `${i * 120}ms`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(37,99,235,0.3)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
            }}
          >
            <span
              className="text-[48px] leading-none mb-2"
              style={{ color: '#2563EB', fontFamily: 'Space Grotesk, sans-serif' }}
            >
              &ldquo;
            </span>
            <p
              className="flex-1 mb-6"
              style={{
                color: '#F0EDE8',
                fontSize: '15px',
                lineHeight: '1.7',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {t.texto}
            </p>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px' }}>
              <p
                className="text-white text-[13px] font-semibold"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {t.nombre}
              </p>
              <p
                className="mt-0.5"
                style={{ color: '#86868B', fontSize: '12px', fontFamily: 'Inter, sans-serif' }}
              >
                {t.negocio}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
