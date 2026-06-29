'use client'
import { useEffect } from 'react'

export function ScrollToTop() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Deshabilita la restauración de scroll del browser
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    // Fuerza scroll al top inmediatamente
    window.scrollTo(0, 0)

    // Segundo intento por si el browser lo sobreescribe
    const timeout = setTimeout(() => {
      window.scrollTo(0, 0)
    }, 0)

    return () => clearTimeout(timeout)
  }, [])

  return null
}
