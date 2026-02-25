import type { Metadata, Viewport } from 'next'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0f172a',
}

export const metadata: Metadata = {
  title: 'Stuff N Things — High-Performance Digital Presence. Zero Technical Friction.',
  description: 'Transform your website into a high-converting, lightning-fast digital presence. Website-as-a-Service with zero technical friction.',
  keywords: 'web development, website optimization, digital presence, website performance, WaaS',
  authors: [{ name: 'Stuff N Things' }],
  openGraph: {
    title: 'Stuff N Things — High-Performance Digital Presence',
    description: 'Transform your website into a high-converting, lightning-fast digital presence with zero technical friction.',
    url: 'https://stuffnthings.io',
    siteName: 'Stuff N Things',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stuff N Things — High-Performance Digital Presence',
    description: 'Transform your website into a high-converting, lightning-fast digital presence with zero technical friction.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="canonical" href="https://stuffnthings.io" />
      </head>
      <body className="bg-slate-950 text-white antialiased font-sans">
        {children}
      </body>
    </html>
  )
}