"use client"

import { useEffect } from "react"
import Nav from "@/components/Nav"
import ServicesSection from "@/components/ServicesSection"
import AnimatedShaderHero from "@/components/ui/animated-shader-hero"
import AnimatedNumber from "@/components/AnimatedNumber"

// ── Stack marquee ─────────────────────────────────────────────────────────────
const stackRow1 = ["Node.js", "Supabase", "Claude API", "MercadoPago", "Twilio", "Railway", "Next.js", "TypeScript"]
const stackRow2 = ["Telegram API", "WhatsApp API", "PostgreSQL", "Fly.io", "Netlify", "React", "Vercel", "Turbopack"]

// ── Projects ──────────────────────────────────────────────────────────────────
const projects = [
  {
    num: "01",
    title: "Sistema de citas automatizado",
    desc: "Bot de WhatsApp que reserva, recuerda y confirma citas solo. El negocio opera sin operador humano.",
    stack: "Node.js, Supabase, Twilio, Railway",
  },
  {
    num: "02",
    title: "Bot de análisis con IA",
    desc: "Análisis deportivo en tiempo real por Telegram. Claude AI procesa los datos, MercadoPago cobra.",
    stack: "Claude API, Telegram, MercadoPago, Supabase",
  },
  {
    num: "03",
    title: "Páginas web profesionales",
    desc: "Sitios para negocios mexicanos: desde landing page hasta plataforma con pagos, auth y panel de admin.",
    stack: "Next.js, React, Tailwind, Vercel",
  },
]

export default function Home() {
  // Scroll reveal for data-reveal elements
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
            el.style.opacity = "1"
            el.style.transform = "translateY(0)"
            io.unobserve(el)
          }
        })
      },
      { threshold: 0.08 }
    )
    els.forEach((el) => {
      el.style.opacity = "0"
      el.style.transform = "translateY(28px)"
      el.style.transition = "opacity 0.75s cubic-bezier(0.22,1,0.36,1), transform 0.75s cubic-bezier(0.22,1,0.36,1)"
      io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  return (
    <main className="bg-black min-h-screen relative">
      <Nav />

      {/* Hero envuelto en z-10 para que quede sobre el bridge */}
      <div className="relative z-10">
        <AnimatedShaderHero
          headline={{ line1: "Tu negocio,", line2: "en piloto automático." }}
          subtitle="Automatizamos lo repetible para que tú te enfoques en crecer."
          buttons={{
            primary: {
              text: "Ver servicios",
              onClick: () => document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" }),
            },
            secondary: {
              text: "WhatsApp ↗",
              onClick: () => window.open("https://wa.me/525526849714", "_blank"),
            },
          }}
        />
      </div>

      {/* Color bridge hero → servicios */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50vh",
          left: 0,
          right: 0,
          height: "100vh",
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(200,82,12,0.72) 48%, rgba(150,58,8,0.42) 68%, rgba(80,30,4,0.15) 85%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 5,
        }}
      />

      {/* ── Servicios ── */}
      <ServicesSection className="section-glow-blue" />

      {/* ── Proyectos ── */}
      <section id="proyectos" className="section-glow-subtle px-6 md:px-[10%] py-32 border-t border-white/[0.06]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] mb-5" style={{ color: "#2563EB" }}>
          PROYECTOS
        </p>
        <h2
          data-reveal
          className="font-space-grotesk text-[clamp(32px,4vw,52px)] font-bold text-white leading-[1.08] tracking-tight mb-20 max-w-xl"
        >
          Lo que ya está<br />corriendo.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-10">
          {projects.map((p, i) => (
            <div key={i} data-reveal data-delay={String(i * 100)} className="relative">
              {/* Big background number */}
              <div
                aria-hidden
                className="font-space-grotesk font-bold text-white select-none leading-none mb-2"
                style={{ fontSize: "clamp(72px,10vw,120px)", opacity: 0.13, lineHeight: 1 }}
              >
                {p.num}
              </div>
              {/* Badge */}
              <span
                className="inline-block text-[11px] font-semibold px-3 py-1 rounded-full mb-4"
                style={{ background: "rgba(52,199,89,0.1)", color: "#34C759" }}
              >
                En producción
              </span>
              <h3 className="font-space-grotesk text-[22px] font-bold text-white leading-snug mb-3">
                {p.title}
              </h3>
              <p className="text-[15px] leading-relaxed mb-4" style={{ color: "#86868B" }}>
                {p.desc}
              </p>
              <p className="text-[12px] uppercase tracking-[0.1em]" style={{ color: "#3D3D3F" }}>
                {p.stack}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="px-6 md:px-[10%] py-24 border-t border-white/[0.06]">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 md:gap-0 md:divide-x divide-white/[0.08]">
          {/* Stat 1 */}
          <div data-reveal className="md:px-12 first:pl-0 text-center md:text-left">
            <div
              className="font-space-grotesk font-extrabold text-white leading-none mb-3"
              style={{ fontSize: "clamp(64px,8vw,96px)" }}
            >
              <AnimatedNumber target={20} suffix="+" />
            </div>
            <p className="text-[15px] leading-relaxed" style={{ color: "#86868B" }}>
              Proyectos en producción.
            </p>
          </div>
          {/* Stat 2 */}
          <div data-reveal data-delay="120" className="md:px-12 text-center md:text-left">
            <div
              className="font-space-grotesk font-extrabold text-white leading-none mb-3"
              style={{ fontSize: "clamp(64px,8vw,96px)" }}
            >
              <AnimatedNumber target={100} suffix="%" />
            </div>
            <p className="text-[15px] leading-relaxed" style={{ color: "#86868B" }}>
              Sin código adicional tuyo.
            </p>
          </div>
          {/* Stat 3 — static */}
          <div data-reveal data-delay="240" className="md:px-12 last:pr-0 text-center md:text-left">
            <div
              className="font-space-grotesk font-extrabold text-white leading-none mb-3"
              style={{ fontSize: "clamp(64px,8vw,96px)" }}
            >
              24/7
            </div>
            <p className="text-[15px] leading-relaxed" style={{ color: "#86868B" }}>
              Disponible siempre.
            </p>
          </div>
        </div>
      </section>

      {/* ── Stack marquee ── */}
      <section id="stack" className="section-glow-subtle py-20 border-t border-white/[0.06] overflow-hidden">
        <p
          className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] mb-10"
          style={{ color: "#86868B" }}
        >
          Stack tecnológico
        </p>

        {/* Row 1 — left */}
        <div className="marquee-row flex mb-3">
          <div className="flex animate-marquee-left whitespace-nowrap">
            {[...stackRow1, ...stackRow1].map((t, i) => (
              <span
                key={i}
                className="text-[13px] uppercase font-medium"
                style={{ color: "#3D3D3F", letterSpacing: "0.1em", padding: "0 24px" }}
              >
                {t}
                {i < stackRow1.length * 2 - 1 && (
                  <span style={{ marginLeft: "24px" }}>·</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Row 2 — right */}
        <div className="marquee-row flex">
          <div className="flex animate-marquee-right whitespace-nowrap">
            {[...stackRow2, ...stackRow2].map((t, i) => (
              <span
                key={i}
                className="text-[13px] uppercase font-medium"
                style={{ color: "#3D3D3F", letterSpacing: "0.1em", padding: "0 24px" }}
              >
                {t}
                {i < stackRow2.length * 2 - 1 && (
                  <span style={{ marginLeft: "24px" }}>·</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contacto ── */}
      <section
        id="contacto"
        className="section-glow-blue px-6 md:px-[10%] py-32 border-t border-white/[0.06] text-center"
      >
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.22em] mb-6"
          style={{ color: "#2563EB" }}
        >
          CONTACTO
        </p>
        <h2
          data-reveal
          className="font-space-grotesk font-bold text-white leading-[1.04] tracking-tight mb-6"
          style={{ fontSize: "clamp(52px,8vw,96px)" }}
        >
          ¿Hablamos?
        </h2>
        <p
          className="mx-auto mb-12 leading-relaxed"
          style={{ color: "#86868B", fontSize: "19px", maxWidth: "460px" }}
        >
          Cuéntanos qué necesitas. Te contactamos ese mismo día.
        </p>
        <div className="flex items-center justify-center">
          <a
            href="https://wa.me/525526849714"
            target="_blank"
            rel="noopener noreferrer"
            className="h-14 px-10 rounded-full bg-white text-black font-semibold text-[16px] tracking-tight transition hover:opacity-80 active:scale-[0.97] inline-flex items-center"
          >
            WhatsApp ↗
          </a>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        className="flex items-center justify-between"
        style={{
          borderTop: "1px solid #1D1D1F",
          padding: "40px 10%",
        }}
      >
        <span style={{ fontSize: "12px", color: "#3D3D3F" }}>© 2026 GAMZ Corp</span>
        <span style={{ fontSize: "12px", color: "#3D3D3F" }}>México</span>
      </footer>
    </main>
  )
}
