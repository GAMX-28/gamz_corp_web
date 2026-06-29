'use client'
import { useEffect, useRef } from 'react'

const testimonios = [
  {
    texto: "Tenía una recepcionista dedicada solo a contestar WhatsApp y agendar citas, con el bot ya no necesitamos eso y las citas siguen llegando solas",
    nombre: "Dra. Mariana Torres",
    negocio: "Clínica Dental Sonrisa, Querétaro",
  },
  {
    texto: "Mis clientes preguntan precios a cualquier hora, antes me la pasaba pegado al teléfono, ahora el bot contesta y yo me entero solo cuando hay un pedido listo",
    nombre: "Vicente Ramírez",
    negocio: "Ferretería El Clavo, Texcoco",
  },
  {
    texto: "Tenemos 12 camiones y antes era un relajo saber quién iba a dónde, ahora el sistema nos da la ruta más corta y hemos bajado bastante en gasolina",
    nombre: "Roberto Mendoza",
    negocio: "Distribuidora Mendoza, Estado de México",
  },
]

export default function TestimoniosSection() {
  const itemsRef = useRef<HTMLDivElement[]>([])

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
    itemsRef.current.forEach((el) => { if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  return (
    <section id="testimonios" className="px-6 md:px-[10%] py-32 border-t border-white/[0.06]">
      <p
        className="text-[11px] font-semibold uppercase tracking-[0.22em] mb-6"
        style={{ color: '#2563EB', fontFamily: 'Space Grotesk, sans-serif' }}
      >
        Clientes
      </p>
      <h2
        data-reveal
        className="text-[clamp(32px,4vw,52px)] leading-[1.08] tracking-tight mb-20 max-w-xl"
        style={{ color: '#ffffff', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800 }}
      >
        Resultados reales
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10">
        {testimonios.map((t, i) => (
          <div
            key={i}
            ref={(el) => { if (el) itemsRef.current[i] = el }}
            style={{
              opacity: 0,
              transform: 'translateY(32px)',
              transition: `opacity 0.7s ease, transform 0.7s ease`,
              transitionDelay: `${i * 120}ms`,
            }}
          >
            <span
              style={{
                display: 'block',
                color: '#2563EB',
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '32px',
                lineHeight: 1,
                marginBottom: '16px',
              }}
            >
              &ldquo;
            </span>
            <p
              style={{
                color: '#b0b0b0',
                fontSize: '16px',
                lineHeight: '1.7',
                fontFamily: 'Inter, sans-serif',
                marginBottom: '24px',
              }}
            >
              {t.texto}
            </p>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginBottom: '16px' }} />
            <p style={{ color: '#ffffff', fontSize: '13px', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600 }}>
              {t.nombre}
            </p>
            <p style={{ color: '#86868B', fontSize: '12px', fontFamily: 'Inter, sans-serif' }}>
              {t.negocio}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
