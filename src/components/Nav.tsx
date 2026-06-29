"use client"

import { useEffect, useRef, useState } from "react"

const links = [
  { href: "#servicios", label: "Servicios" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#stack", label: "Stack" },
  { href: "#contacto", label: "Contacto" },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [open])

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  const bars = open
    ? ["translate-y-[6.5px] rotate-45", "opacity-0 scale-x-0", "-translate-y-[6.5px] -rotate-45"]
    : ["", "", ""]

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/85 backdrop-blur-xl border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="relative flex items-center justify-between h-[52px] px-8 md:px-12 max-w-screen-xl mx-auto">
          {/* Logo */}
          <a href="#" className="font-space-grotesk text-[19px] font-bold tracking-tight flex">
            <span className="text-white">GAMZ</span>
            <span style={{ color: "#86868B" }}>Corp</span>
          </a>

          {/* Links – centrados con absolute en desktop */}
          <ul className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8 list-none">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => scrollTo(e, l.href)}
                  className="text-white/70 hover:text-white text-[11px] uppercase tracking-widest font-medium transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA + Hamburger – siempre a la derecha */}
          <div className="flex items-center justify-end">
            <a
              href="https://wa.me/525526849714"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline text-white text-[12px] font-medium tracking-wider hover:opacity-60 transition-opacity"
            >
              WhatsApp ↗
            </a>

            <button
              className="md:hidden flex flex-col gap-[5px] p-2 -mr-2"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menú"
              aria-expanded={open}
            >
              {bars.map((cls, i) => (
                <span
                  key={i}
                  className={`block w-[22px] h-[1.5px] bg-white rounded-sm transition-all duration-200 ${cls}`}
                />
              ))}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          ref={menuRef}
          className="fixed inset-x-0 top-[52px] z-40 bg-black/95 backdrop-blur-xl border-b border-white/5 px-8 py-5 md:hidden"
        >
          {[...links, { href: "https://wa.me/525526849714", label: "WhatsApp ↗" }].map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
              onClick={l.href.startsWith("#") ? (e) => scrollTo(e, l.href) : undefined}
              className="block py-3.5 border-b border-white/5 text-white/75 hover:text-white text-[15px] font-medium transition-colors last:border-none"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </>
  )
}
