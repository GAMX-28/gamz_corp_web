"use client"

import { useEffect, useRef, useState } from "react"

const services = [
  {
    eyebrow: "WHATSAPP",
    title: "Tu negocio\nresponde solo.",
    body: "Bot inteligente para WhatsApp que automatiza la atención a clientes, agenda citas, procesa pedidos y mucho más, adaptado a las necesidades de tu negocio.",
    icon: (
      <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-white">
        <rect x="52" y="18" width="96" height="164" rx="14" stroke="currentColor" strokeWidth="2.5"/>
        <line x1="52" y1="42" x2="148" y2="42" stroke="currentColor" strokeWidth="2"/>
        <line x1="52" y1="160" x2="148" y2="160" stroke="currentColor" strokeWidth="2"/>
        <circle cx="100" cy="173" r="5" stroke="currentColor" strokeWidth="2"/>
        <rect x="64" y="56" width="62" height="22" rx="8" stroke="currentColor" strokeWidth="2"/>
        <circle cx="77" cy="67" r="2.5" fill="currentColor"/>
        <circle cx="86" cy="67" r="2.5" fill="currentColor"/>
        <circle cx="95" cy="67" r="2.5" fill="currentColor"/>
        <rect x="74" y="88" width="52" height="22" rx="8" stroke="currentColor" strokeWidth="2"/>
        <rect x="64" y="120" width="72" height="22" rx="8" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    eyebrow: "TELEGRAM & WHATSAPP",
    title: "Análisis en\ntiempo real.",
    body: "Notificaciones, análisis y atención automatizada directo en Telegram, para tu equipo o para los clientes de tu negocio.",
    icon: (
      <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-white">
        <line x1="100" y1="34" x2="100" y2="58" stroke="currentColor" strokeWidth="2.5"/>
        <circle cx="100" cy="28" r="7" stroke="currentColor" strokeWidth="2.5"/>
        <rect x="42" y="58" width="116" height="88" rx="16" stroke="currentColor" strokeWidth="2.5"/>
        <rect x="24" y="76" width="18" height="32" rx="9" stroke="currentColor" strokeWidth="2.5"/>
        <rect x="158" y="76" width="18" height="32" rx="9" stroke="currentColor" strokeWidth="2.5"/>
        <circle cx="76" cy="96" r="11" stroke="currentColor" strokeWidth="2.5"/>
        <circle cx="124" cy="96" r="11" stroke="currentColor" strokeWidth="2.5"/>
        <circle cx="76" cy="96" r="4" fill="currentColor"/>
        <circle cx="124" cy="96" r="4" fill="currentColor"/>
        <rect x="76" y="121" width="48" height="12" rx="6" stroke="currentColor" strokeWidth="2"/>
        <rect x="65" y="146" width="70" height="32" rx="8" stroke="currentColor" strokeWidth="2.5"/>
        <line x1="100" y1="146" x2="100" y2="178" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    eyebrow: "INTELIGENCIA ARTIFICIAL",
    title: "IA que trabaja\nen tus procesos.",
    body: "Hacemos que la IA trabaje dentro de tu negocio, resolviendo tareas reales que hoy te quitan tiempo y dinero.",
    icon: (
      <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-white">
        <circle cx="100" cy="100" r="20" stroke="currentColor" strokeWidth="2.5"/>
        <circle cx="100" cy="100" r="7" fill="currentColor"/>
        <circle cx="36" cy="60" r="11" stroke="currentColor" strokeWidth="2"/>
        <circle cx="164" cy="60" r="11" stroke="currentColor" strokeWidth="2"/>
        <circle cx="36" cy="140" r="11" stroke="currentColor" strokeWidth="2"/>
        <circle cx="164" cy="140" r="11" stroke="currentColor" strokeWidth="2"/>
        <circle cx="100" cy="24" r="11" stroke="currentColor" strokeWidth="2"/>
        <circle cx="100" cy="176" r="11" stroke="currentColor" strokeWidth="2"/>
        <line x1="100" y1="80" x2="100" y2="35" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="100" y1="120" x2="100" y2="165" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="83" y1="89" x2="46" y2="67" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="117" y1="89" x2="154" y2="67" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="83" y1="111" x2="46" y2="133" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="117" y1="111" x2="154" y2="133" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="100" cy="100" r="58" stroke="currentColor" strokeWidth="1" strokeDasharray="4 7" opacity="0.35"/>
      </svg>
    ),
  },
  {
    eyebrow: "DESARROLLO WEB",
    title: "Tu presencia\ndigital, sin límites.",
    body: "Construimos tu presencia digital desde cero, sitios que se ven profesionales y están pensados para convertir visitas en clientes.",
    icon: (
      <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-white">
        <rect x="16" y="38" width="168" height="116" rx="10" stroke="currentColor" strokeWidth="2.5"/>
        <rect x="26" y="48" width="148" height="96" rx="6" stroke="currentColor" strokeWidth="1.5" opacity="0.35"/>
        <polyline points="42,72 52,80 42,88" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="60" y1="72" x2="100" y2="72" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="60" y1="80" x2="130" y2="80" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="60" y1="88" x2="112" y2="88" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="42" y1="102" x2="95" y2="102" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="42" y1="110" x2="140" y2="110" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="42" y1="118" x2="115" y2="118" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="100" y1="154" x2="100" y2="175" stroke="currentColor" strokeWidth="2.5"/>
        <line x1="68" y1="175" x2="132" y2="175" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    eyebrow: "MARKETING DIGITAL",
    title: "Más clientes,\ncon IA.",
    body: "Estrategias de contenido, anuncios y posicionamiento potenciados con IA para que tu negocio crezca solo.",
    icon: (
      <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-white">
        <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="2.5" strokeDasharray="6 5"/>
        <circle cx="100" cy="100" r="42" stroke="currentColor" strokeWidth="2"/>
        <circle cx="100" cy="100" r="14" stroke="currentColor" strokeWidth="2.5"/>
        <line x1="100" y1="30" x2="100" y2="58" stroke="currentColor" strokeWidth="2"/>
        <line x1="100" y1="142" x2="100" y2="170" stroke="currentColor" strokeWidth="2"/>
        <line x1="30" y1="100" x2="58" y2="100" stroke="currentColor" strokeWidth="2"/>
        <line x1="142" y1="100" x2="170" y2="100" stroke="currentColor" strokeWidth="2"/>
        <polyline points="60,60 80,90 100,72 120,108 140,88" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="140" cy="88" r="5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    eyebrow: "RUTAS CON IA",
    title: "Menos gasolina,\nmás entregas.",
    body: "Optimizamos las rutas de tus transportistas con IA. Menos combustible, menos tiempo muerto y más dinero en tu bolsillo.",
    icon: (
      <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-white">
        <circle cx="48" cy="68" r="10" stroke="currentColor" strokeWidth="2.5"/>
        <circle cx="152" cy="52" r="10" stroke="currentColor" strokeWidth="2.5"/>
        <circle cx="130" cy="140" r="10" stroke="currentColor" strokeWidth="2.5"/>
        <circle cx="60" cy="152" r="10" stroke="currentColor" strokeWidth="2.5"/>
        <path d="M48 78 Q72 110 130 130" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M152 62 Q148 96 140 140" stroke="currentColor" strokeWidth="2" strokeDasharray="5 4" strokeLinecap="round"/>
        <path d="M48 78 Q30 120 60 142" stroke="currentColor" strokeWidth="2" strokeDasharray="5 4" strokeLinecap="round"/>
        <path d="M130 130 Q100 148 70 152" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M48 68 Q96 44 152 52" stroke="currentColor" strokeWidth="2" strokeDasharray="5 4" strokeLinecap="round"/>
        <circle cx="89" cy="104" r="5" fill="currentColor" opacity="0.6"/>
        <polyline points="82,100 89,96 96,104 103,98" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    eyebrow: "PÁGINAS WEB",
    title: "Tu negocio,\nen internet.",
    body: "Tu negocio en internet con todo lo que necesita, diseño a tu medida, pagos integrados y listo para operar desde el primer día.",
    icon: (
      <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-white">
        <rect x="18" y="28" width="164" height="118" rx="10" stroke="currentColor" strokeWidth="2.5"/>
        <rect x="28" y="38" width="144" height="18" rx="4" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="40" cy="47" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="52" cy="47" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="64" cy="47" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="76" y="42" width="86" height="10" rx="3" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="28" y1="68" x2="172" y2="68" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
        <line x1="38" y1="62" x2="58" y2="62" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="68" y1="62" x2="82" y2="62" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        <line x1="88" y1="62" x2="102" y2="62" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        <rect x="38" y="76" width="72" height="40" rx="4" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="44" y1="84" x2="80" y2="84" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="44" y1="92" x2="96" y2="92" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        <line x1="44" y1="100" x2="72" y2="100" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        <rect x="44" y="106" width="28" height="8" rx="4" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="120" y="76" width="44" height="40" rx="4" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="128" y1="86" x2="156" y2="86" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        <line x1="128" y1="94" x2="148" y2="94" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        <line x1="128" y1="102" x2="152" y2="102" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        <line x1="100" y1="146" x2="100" y2="166" stroke="currentColor" strokeWidth="2.5"/>
        <line x1="72" y1="166" x2="128" y2="166" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
  },
]

interface Props {
  className?: string
}

export default function ServicesSection({ className = "" }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [grayColor, setGrayColor] = useState('#86868B')
  const [inView, setInView] = useState(false)
  const [hintVisible, setHintVisible] = useState(true)
  const [hintOpacity, setHintOpacity] = useState(0)

  useEffect(() => {
    if (window.innerWidth < 768) setGrayColor('#a0a0a0')
  }, [])

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const fadeIn = setTimeout(() => setHintOpacity(1), 100)
    return () => clearTimeout(fadeIn)
  }, [])

  useEffect(() => {
    if (activeIndex === services.length - 1) {
      setHintOpacity(0)
      setTimeout(() => setHintVisible(false), 800)
    }
  }, [activeIndex])

  useEffect(() => {
    const sentinelEls = wrapperRef.current?.querySelectorAll("[data-index]")
    if (!sentinelEls) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(
              (entry.target as HTMLElement).dataset.index || "0"
            )
            setActiveIndex(Math.min(index, services.length - 1))
          }
        })
      },
      {
        threshold: 0,
        rootMargin: "-40% 0px -40% 0px",
      }
    )

    sentinelEls.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
    <section
      id="servicios"
      ref={wrapperRef}
      className={`relative ${className}`}
      style={{ height: `${services.length * 60}vh` }}
    >
      {/* Sentinels — en el wrapper 700vh para que IO los detecte al scrollear */}
      {Array.from({ length: services.length }, (_, i) => (
        <div
          key={i}
          data-index={i}
          style={{
            position: "absolute",
            top: `${(i / services.length) * 100}%`,
            height: "1px",
            width: "100%",
            pointerEvents: "none",
          }}
        />
      ))}

      <div
        style={{ position: "sticky", top: 0, height: "100vh" }}
        className="relative overflow-hidden"
      >
        {/* Glow ambiental */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 50% 15%, rgba(191,132,74,0.16) 0%, rgba(164,130,73,0.06) 50%, transparent 74%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* ── Mobile layout ── */}
        <div className="md:hidden absolute inset-0 flex flex-col items-center justify-center px-6 z-10">
          {/* Text states */}
          <div className="relative w-full text-center" style={{ height: "260px" }}>
            {services.map((s, i) => (
              <div
                key={i}
                className="absolute inset-0 flex flex-col items-center"
                style={{
                  opacity: i === activeIndex ? 1 : 0,
                  transform: i === activeIndex
                    ? "translateY(0)"
                    : i < activeIndex
                    ? "translateY(-16px)"
                    : "translateY(16px)",
                  transition: "opacity 0.7s ease, transform 0.7s ease",
                  pointerEvents: i === activeIndex ? "auto" : "none",
                }}
              >
                <p
                  className="font-semibold uppercase mb-3"
                  style={{ color: "#2563EB", fontSize: "10px", letterSpacing: "0.22em" }}
                >
                  {s.eyebrow}
                </p>
                <h2
                  className="font-space-grotesk font-bold leading-[1.06] tracking-tight text-white mb-4 whitespace-pre-line"
                  style={{ fontSize: "clamp(32px, 8vw, 48px)" }}
                >
                  {s.title}
                </h2>
                <p style={{ color: grayColor, fontSize: "15px", lineHeight: "1.6" }}>
                  {s.body}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* ── Desktop layout ── */}
        <div className="hidden md:flex items-center justify-between h-full px-[10%] gap-[8%]">
          {/* Text states */}
          <div className="relative flex-[0_0_42%]" style={{ height: "360px" }}>
            {services.map((s, i) => (
              <div
                key={i}
                className="absolute inset-0 flex flex-col justify-center"
                style={{
                  opacity: i === activeIndex ? 1 : 0,
                  transform: i === activeIndex
                    ? "translateY(0)"
                    : i < activeIndex
                    ? "translateY(-22px)"
                    : "translateY(22px)",
                  transition: "opacity 0.7s ease, transform 0.7s ease",
                  pointerEvents: i === activeIndex ? "auto" : "none",
                }}
              >
                <p
                  className="font-semibold uppercase mb-5"
                  style={{ color: "#2563EB", fontSize: "11px", letterSpacing: "0.22em" }}
                >
                  {s.eyebrow}
                </p>
                <h2
                  className="font-space-grotesk font-bold leading-[1.06] tracking-tight text-white mb-5 whitespace-pre-line"
                  style={{ fontSize: "clamp(36px, 3.5vw, 52px)" }}
                >
                  {s.title}
                </h2>
                <p style={{ color: grayColor, fontSize: "17px", lineHeight: "1.6", maxWidth: "360px" }}>
                  {s.body}
                </p>
              </div>
            ))}
          </div>

          {/* Icons */}
          <div className="relative flex-1 flex items-center justify-center" style={{ height: "320px" }}>
            {services.map((s, i) => (
              <div
                key={i}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  opacity: i === activeIndex ? 1 : 0,
                  transition: "opacity 0.7s ease",
                }}
              >
                <div style={{ width: "288px", height: "288px", opacity: 0.07 }}>
                  {s.icon}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Dots — único bloque vertical lateral derecho */}
        <div
          style={{
            position: "fixed",
            right: "20px",
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            zIndex: 50,
          }}
        >
          {services.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === activeIndex ? "8px" : "6px",
                height: i === activeIndex ? "8px" : "6px",
                borderRadius: "9999px",
                background: i === activeIndex ? "white" : "rgba(255,255,255,0.25)",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>
    </section>

    {hintVisible && (
      <div
        style={{
          position: 'fixed',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          opacity: hintOpacity,
          transition: 'opacity 0.8s ease',
        }}
      >
        <span style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: '11px',
          color: '#86868B',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
        }}>
          Desliza para explorar
        </span>
        <span style={{
          color: '#2563EB',
          fontSize: '18px',
          display: 'inline-block',
          animation: 'bounce-arrow 1.5s ease infinite',
        }}>
          ↓
        </span>
      </div>
    )}
    </>
  )
}
