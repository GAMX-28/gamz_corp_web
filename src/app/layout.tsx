import type { Metadata } from "next"
import { Space_Grotesk, Inter } from "next/font/google"
import "./globals.css"
import DemoChat from "@/components/DemoChat"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "GAMZ Corp — Automatización con IA",
  description:
    "Construimos bots, automatizaciones y sistemas con IA que trabajan por ti — para que tú te enfoques en lo que importa.",
  keywords: ["automatización", "inteligencia artificial", "bots", "WhatsApp", "México"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-black text-white">
        {children}
        <DemoChat />
      </body>
    </html>
  )
}
