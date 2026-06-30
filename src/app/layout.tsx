import type { Metadata } from "next"
import { Space_Grotesk, Inter } from "next/font/google"
import "./globals.css"
import DemoChat from "@/components/DemoChat"
import { ScrollToTop } from "@/components/ScrollToTop"

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
  title: "GAMZ Corp — Automatización con IA para negocios en México",
  description:
    "Construimos bots, automatizaciones y sistemas con IA para negocios mexicanos. WhatsApp bots, Telegram bots, páginas web y más.",
  keywords: "automatización, inteligencia artificial, bots WhatsApp, bots Telegram, páginas web, México, GAMZ Corp",
  authors: [{ name: "GAMZ Corp" }],
  openGraph: {
    title: "GAMZ Corp — Automatización con IA",
    description: "Bots, automatizaciones y sistemas con IA para negocios en México.",
    url: "https://gamzcorp.vercel.app",
    siteName: "GAMZ Corp",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GAMZ Corp — Automatización con IA",
    description: "Bots, automatizaciones y sistemas con IA para negocios en México.",
  },
  robots: {
    index: true,
    follow: true,
  },
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
        <ScrollToTop />
        {children}
        <DemoChat />
      </body>
    </html>
  )
}
