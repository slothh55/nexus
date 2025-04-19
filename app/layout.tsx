import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { SoundPreloader } from "@/components/sound-preloader"
import "./globals.css"
import "../styles/optimization.css"
import "../styles/performance.css"

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  title: "Nexus AI - Digital Inclusion and Responsible Use Companion",
  description: "An AI-powered tool to enhance digital literacy and promote responsible, ethical engagement with AI for students of all ages and backgrounds",
  keywords: "AI literacy, digital inclusion, AI ethics, educational technology, ISTE, digital citizenship",
  authors: [{ name: "Nexus AI Team" }],
  creator: "Nexus AI",
  publisher: "Nexus AI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://nexus-ai.example.com"),
  openGraph: {
    title: "Nexus AI - Digital Inclusion and Responsible Use Companion",
    description: "Learn AI literacy and ethics in an inclusive, engaging environment",
    url: "https://nexus-ai.example.com",
    siteName: "Nexus AI",
    locale: "en_US",
    type: "website",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="theme-color" content="#6366f1" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SoundPreloader />
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-black">
            Skip to main content
          </a>
          <main id="main-content">
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

