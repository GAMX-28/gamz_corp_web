"use client"

import { useEffect, useRef } from "react"

const services = [
  {
    eyebrow: "WHATSAPP",
    title: "Tu negocio\nresponde solo.",
    body: "Bots que agendan citas, contestan preguntas y procesan pedidos en WhatsApp — sin que levantes un dedo.",
    icon: (
      <svg viewBox="0 0 200 200" fill="none" className="w-56 h-56 md:w-72 md:h-72 text-white opacity-[0.07]">
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
    eyebrow: "TELEGRAM",
    title: "Análisis en\ntiempo real.",
    body: "Automatizaciones e IA integrada directamente en Telegram para tu equipo o tus clientes.",
    icon: (
      <svg viewBox="0 0 200 200" fill="none" className="w-56 h-56 md:w-72 md:h-72 text-white opacity-[0.07]">
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
    body: "Integro modelos como Claude directamente en el flujo operativo de tu empresa.",
    icon: (
      <svg viewBox="0 0 200 200" fill="none" className="w-56 h-56 md:w-72 md:h-72 text-white opacity-[0.07]">
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
    body: "Desde landing pages hasta sistemas completos — diseñados exactamente para tu negocio.",
    icon: (
      <svg viewBox="0 0 200 200" fill="none" className="w-56 h-56 md:w-72 md:h-72 text-white opacity-[0.07]">
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
]

export default function ServicesSection() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const statesRef = useRef<HTMLDivElement>(null)
  const iconsRef = useRef<HTMLDivElement>(null)
  const dotsRef = useRef<HTMLDivElement>(null)
  const activeIndexRef = useRef(0)

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    let gsapModule: typeof import("gsap") | null = null
    let ScrollTriggerModule: typeof import("gsap/ScrollTrigger").ScrollTrigger | null = null

    const init = async () => {
      const [gsapPkg, stPkg] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ])
      const gsap = gsapPkg.gsap
      const ScrollTrigger = stPkg.ScrollTrigger
      gsap.registerPlugin(ScrollTrigger)
      gsapModule = gsapPkg
      ScrollTriggerModule = ScrollTrigger

      const mq = gsap.matchMedia()

      mq.add("(min-width: 769px)", () => {
        const wrapper = wrapperRef.current
        const sticky = stickyRef.current
        const statesEl = statesRef.current
        const iconsEl = iconsRef.current
        const dotsEl = dotsRef.current
        if (!wrapper || !sticky || !statesEl || !iconsEl) return

        const states = statesEl.querySelectorAll<HTMLElement>(".srv-state")
        const icons = iconsEl.querySelectorAll<HTMLElement>(".srv-icon")
        const dots = dotsEl?.querySelectorAll<HTMLElement>(".srv-dot")

        // Initial: first visible, rest hidden
        gsap.set([...states].slice(1), { opacity: 0, y: 22 })
        gsap.set([...icons].slice(1), { opacity: 0 })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: "+=300%",
            pin: sticky,
            scrub: 1,
            anticipatePin: 1,
            onUpdate: (self) => {
              const idx = Math.min(3, Math.floor(self.progress * 4))
              if (idx !== activeIndexRef.current) {
                activeIndexRef.current = idx
                dots?.forEach((d, i) => {
                  d.style.width = i === idx ? "10px" : "4px"
                  d.style.height = i === idx ? "10px" : "4px"
                  d.style.opacity = i === idx ? "1" : "0.25"
                })
              }
            },
          },
        })

        const dur = 0.18
        ;[0, 1, 2].forEach((i) => {
          const at = i + 0.78
          tl.to(states[i], { opacity: 0, y: -22, duration: dur }, at)
            .to(icons[i], { opacity: 0, duration: dur }, at)
            .fromTo(states[i + 1], { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: dur }, at + 0.14)
            .to(icons[i + 1], { opacity: 1, duration: dur }, at + 0.14)
        })

        return () => {
          gsap.set([...states, ...icons], { clearProps: "all" })
        }
      })

      mq.add("(max-width: 768px)", () => {
        const statesEl = statesRef.current
        if (!statesEl) return
        statesEl.querySelectorAll<HTMLElement>(".srv-state").forEach((state) => {
          gsap.from(state, {
            opacity: 0, y: 40, duration: 0.8, ease: "power2.out",
            scrollTrigger: { trigger: state, start: "top 82%" },
          })
        })
      })
    }

    init()

    return () => {
      ScrollTriggerModule?.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <section id="servicios" ref={wrapperRef} className="relative">
      {/* ── Desktop: sticky scroll ── */}
      <div
        ref={stickyRef}
        className="hidden md:flex items-center justify-between h-screen px-[10%] gap-[8%]"
      >
        {/* Text states */}
        <div ref={statesRef} className="relative flex-[0_0_42%] h-[360px]">
          {services.map((s, i) => (
            <div
              key={i}
              className="srv-state absolute inset-0 flex flex-col justify-center"
            >
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.22em] mb-5"
                style={{ color: "#2563EB" }}
              >
                {s.eyebrow}
              </p>
              <h2
                className="font-space-grotesk text-[clamp(36px,3.5vw,52px)] font-bold leading-[1.06] tracking-tight text-white mb-5 whitespace-pre-line"
              >
                {s.title}
              </h2>
              <p className="text-[17px] leading-relaxed max-w-[360px]" style={{ color: "#86868B" }}>
                {s.body}
              </p>
            </div>
          ))}
        </div>

        {/* Icons */}
        <div ref={iconsRef} className="relative flex-1 h-[320px] flex items-center justify-center">
          {services.map((s, i) => (
            <div key={i} className="srv-icon absolute inset-0 flex items-center justify-center">
              {s.icon}
            </div>
          ))}
        </div>

        {/* Progress dots */}
        <div ref={dotsRef} className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 items-center">
          {services.map((_, i) => (
            <div
              key={i}
              className="srv-dot rounded-full bg-white transition-all duration-300"
              style={{
                width: i === 0 ? "10px" : "4px",
                height: i === 0 ? "10px" : "4px",
                opacity: i === 0 ? 1 : 0.25,
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Mobile: stacked ── */}
      <div className="md:hidden px-6 py-24 space-y-16">
        {services.map((s, i) => (
          <div key={i} className="srv-state">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] mb-4" style={{ color: "#2563EB" }}>
              {s.eyebrow}
            </p>
            <h2 className="font-space-grotesk text-[34px] font-bold leading-[1.06] tracking-tight text-white mb-4 whitespace-pre-line">
              {s.title}
            </h2>
            <p className="text-[16px] leading-relaxed" style={{ color: "#86868B" }}>
              {s.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
