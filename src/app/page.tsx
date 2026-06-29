"use client"

import { useEffect, useRef } from "react"
import Nav from "@/components/Nav"
import ServicesSection from "@/components/ServicesSection"
import AnimatedShaderHero from "@/components/ui/animated-shader-hero"

const stackRow1 = [
  "WhatsApp API", "Telegram Bot API", "Claude AI", "OpenAI GPT", "Next.js",
  "TypeScript", "Tailwind CSS", "Node.js", "Python", "Supabase",
]
const stackRow2 = [
  "PostgreSQL", "Redis", "Vercel", "Railway", "Zapier", "n8n",
  "Make.com", "Stripe", "Twilio", "REST APIs",
]

const projects = [
  {
    tag: "Bot de WhatsApp",
    title: "Asistente de reservas automático",
    desc: "Bot que recibe mensajes, detecta intención, consulta disponibilidad y confirma citas — sin intervención humana.",
    stat: "98% automatizado",
  },
  {
    tag: "Inteligencia Artificial",
    title: "Análisis de datos con IA",
    desc: "Sistema que procesa reportes diarios, identifica tendencias y envía resúmenes ejecutivos cada mañana.",
    stat: "4 horas ahorradas/día",
  },
  {
    tag: "Desarrollo Web",
    title: "Plataforma SaaS B2B",
    desc: "Dashboard con autenticación, pagos y panel de administración — desplegado en producción en 3 semanas.",
    stat: "Producción en 21 días",
  },
]

const stats = [
  { value: 3, suffix: "+", label: "Proyectos en producción", animated: true },
  { value: 100, suffix: "%", label: "Sin código adicional tuyo", animated: true },
  { value: null, raw: "24/7", label: "Disponible siempre", animated: false },
]

function AnimatedCounter({
  target,
  suffix,
  raw,
  animated,
}: {
  target: number | null
  suffix: string
  raw?: string
  animated: boolean
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    if (!animated || !ref.current) return
    const el = ref.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const end = target!
          const duration = 1600
          const start = performance.now()
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1)
            const ease = 1 - Math.pow(1 - progress, 3)
            el.textContent = Math.round(ease * end) + suffix
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, suffix, animated])

  if (!animated) return <>{raw}</>
  return <span ref={ref}>0{suffix}</span>
}

export default function Home() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const els = document.querySelectorAll<HTMLElement>("[data-reveal]")
    if (!els.length) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const delay = el.dataset.delay || "0"
            el.style.transitionDelay = delay + "ms"
            el.classList.add("opacity-100", "translate-y-0")
            el.classList.remove("opacity-0", "translate-y-8")
            io.unobserve(el)
          }
        })
      },
      { threshold: 0.15 }
    )

    els.forEach((el) => {
      el.classList.add("opacity-0", "translate-y-8", "transition-all", "duration-700")
      io.observe(el)
    })

    return () => io.disconnect()
  }, [])

  return (
    <main className="bg-black min-h-screen">
      <Nav />

      {/* ── Hero ── */}
      <AnimatedShaderHero
        headline={{ line1: "Tu negocio,", line2: "en piloto automático." }}
        subtitle="Construimos bots, automatizaciones y sistemas con IA que trabajan por ti — para que tú te enfoques en lo que importa."
        buttons={{
          primary: {
            text: "Ver servicios",
            onClick: () =>
              document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" }),
          },
          secondary: {
            text: "WhatsApp ↗",
            onClick: () => window.open("https://wa.me/525526849714", "_blank"),
          },
        }}
      />

      {/* ── Servicios ── */}
      <ServicesSection />

      {/* ── Proyectos ── */}
      <section id="proyectos" className="px-6 md:px-[10%] py-32 border-t border-white/[0.06]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] mb-5" style={{ color: "#2563EB" }}>
          PROYECTOS
        </p>
        <h2
          data-reveal
          className="font-space-grotesk text-[clamp(32px,4vw,52px)] font-bold text-white leading-[1.08] tracking-tight mb-16 max-w-xl"
        >
          Lo que hemos<br />construido.
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <div
              key={i}
              data-reveal
              data-delay={String(i * 100)}
              className="border border-white/[0.08] rounded-2xl p-7 flex flex-col gap-4 hover:border-white/20 transition-colors"
            >
              <span
                className="inline-block text-[10px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
                style={{ background: "rgba(37,99,235,0.12)", color: "#2563EB", width: "fit-content" }}
              >
                {p.tag}
              </span>
              <h3 className="font-space-grotesk text-[20px] font-bold text-white leading-snug">
                {p.title}
              </h3>
              <p className="text-[15px] leading-relaxed flex-1" style={{ color: "#86868B" }}>
                {p.desc}
              </p>
              <div className="pt-2 border-t border-white/[0.06]">
                <span className="text-[13px] font-semibold text-white/80">{p.stat}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="px-6 md:px-[10%] py-24 border-t border-white/[0.06]">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 md:gap-0 md:divide-x divide-white/[0.08]">
          {stats.map((s, i) => (
            <div
              key={i}
              data-reveal
              data-delay={String(i * 120)}
              className="md:px-12 first:pl-0 last:pr-0 text-center md:text-left"
            >
              <div className="font-space-grotesk text-[clamp(48px,6vw,72px)] font-bold text-white leading-none mb-3">
                <AnimatedCounter target={s.value} suffix={s.suffix ?? ""} raw={s.raw} animated={s.animated} />
              </div>
              <p className="text-[15px]" style={{ color: "#86868B" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Stack ── */}
      <section id="stack" className="py-20 border-t border-white/[0.06] overflow-hidden">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] mb-10" style={{ color: "#86868B" }}>
          Stack tecnológico
        </p>

        <div className="flex mb-4">
          <div className="flex animate-marquee-left whitespace-nowrap gap-4">
            {[...stackRow1, ...stackRow1].map((t, i) => (
              <span key={i} className="inline-block border border-white/10 rounded-full px-5 py-2 text-[13px] font-medium text-white/60">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="flex">
          <div className="flex animate-marquee-right whitespace-nowrap gap-4">
            {[...stackRow2, ...stackRow2].map((t, i) => (
              <span key={i} className="inline-block border border-white/10 rounded-full px-5 py-2 text-[13px] font-medium text-white/60">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contacto ── */}
      <section id="contacto" className="px-6 md:px-[10%] py-32 border-t border-white/[0.06] text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] mb-6" style={{ color: "#2563EB" }}>
          CONTACTO
        </p>
        <h2
          data-reveal
          className="font-space-grotesk text-[clamp(36px,5vw,64px)] font-bold text-white leading-[1.06] tracking-tight mb-6"
        >
          ¿Listo para automatizar<br />tu negocio?
        </h2>
        <p className="text-[18px] max-w-xl mx-auto mb-12 leading-relaxed" style={{ color: "#86868B" }}>
          Cuéntame qué necesitas. Agendamos una llamada y en 48 horas tienes una propuesta.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://wa.me/525526849714"
            target="_blank"
            rel="noopener noreferrer"
            className="h-14 px-10 rounded-full bg-white text-black font-semibold text-[16px] tracking-tight transition hover:opacity-85 active:scale-[0.97] inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Escribir por WhatsApp
          </a>
          <a
            href="mailto:gaelalejandromz@gmail.com"
            className="h-14 px-10 rounded-full border border-white/20 text-white font-medium text-[16px] transition hover:border-white/50 hover:bg-white/5 active:scale-[0.97] inline-flex items-center"
          >
            gaelalejandromz@gmail.com
          </a>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/[0.06] px-6 md:px-[10%] py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="font-space-grotesk text-[15px] font-bold">
          <span className="text-white">GAMZ</span>
          <span style={{ color: "#86868B" }}>Corp</span>
        </span>
        <p className="text-[13px]" style={{ color: "#86868B" }}>© 2026 GAMZ Corp · México</p>
      </footer>
    </main>
  )
}
