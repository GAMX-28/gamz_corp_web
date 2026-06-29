"use client"

import { useEffect, useState } from "react"
import Nav from "@/components/Nav"
import ServicesSection from "@/components/ServicesSection"
import TestimoniosSection from "@/components/TestimoniosSection"
import AnimatedShaderHero from "@/components/ui/animated-shader-hero"
import AnimatedNumber from "@/components/AnimatedNumber"

// ── Projects ──────────────────────────────────────────────────────────────────
const projects = [
  {
    num: "01",
    title: "Sistema de citas automatizado",
    desc: "Tu negocio agenda solo, manda recordatorios y confirma citas por WhatsApp, sin que nadie tenga que estar pendiente del teléfono.",
  },
  {
    num: "02",
    title: "Optimizador de rutas con IA",
    desc: "Calcula las rutas más eficientes para tu flota de reparto, menos combustible, menos tiempo en carretera y más entregas por día.",
  },
  {
    num: "03",
    title: "Páginas web profesionales",
    desc: "Sitio diseñado a la medida de tu negocio, con lo que necesitas para vender, cobrar y atender clientes desde internet.",
  },
]

export default function Home() {
  const [grayColor, setGrayColor] = useState('#86868B')

  useEffect(() => {
    if (window.innerWidth < 768) setGrayColor('#a0a0a0')
  }, [])

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
          subtitle="Diseñamos soluciones digitales para negocios en México, desde bots inteligentes hasta plataformas completas, adaptadas exactamente a lo que tu empresa necesita."
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


      {/* ── Servicios ── */}
      <ServicesSection className="section-glow-blue" />

      {/* ── Testimonios ── */}
      <TestimoniosSection />

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
              <h3 className="font-space-grotesk text-[22px] font-bold text-white leading-snug mb-3">
                {p.title}
              </h3>
              <p className="text-[15px] leading-relaxed" style={{ color: grayColor }}>
                {p.desc}
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
            <p className="text-[15px] leading-relaxed" style={{ color: grayColor }}>
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
            <p className="text-[15px] leading-relaxed" style={{ color: grayColor }}>
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
            <p className="text-[15px] leading-relaxed" style={{ color: grayColor }}>
              Disponible siempre.
            </p>
          </div>
        </div>
      </section>

      {/* ── Contacto ── */}
      <section
        id="contacto"
        className="section-glow-blue px-6 md:px-[10%] py-32 border-t border-white/[0.06] text-center"
      >
        <p
          className="mb-6"
          style={{
            color: grayColor,
            fontSize: "11px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            fontFamily: "Space Grotesk, sans-serif",
          }}
        >
          CONTACTO
        </p>
        <h2
          data-reveal
          className="leading-[1.04] tracking-tight mb-6"
          style={{
            color: "#ffffff",
            fontFamily: "Space Grotesk, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(52px,8vw,96px)",
          }}
        >
          ¿Tienes un proyecto? Cuéntanos.
        </h2>
        <p
          className="mx-auto mb-12"
          style={{
            color: grayColor,
            fontFamily: "Inter, sans-serif",
            fontSize: "19px",
            lineHeight: "1.6",
            maxWidth: "460px",
          }}
        >
          Dinos qué necesitas y te contactamos ese mismo día con una solución a la medida.
        </p>
        <div className="flex items-center justify-center">
          <a
            href="https://wa.me/525526849714"
            target="_blank"
            rel="noopener noreferrer"
            className="h-14 px-10 rounded-full font-semibold text-[16px] tracking-tight transition hover:opacity-80 active:scale-[0.97] inline-flex items-center"
            style={{ background: "white", color: "black" }}
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
