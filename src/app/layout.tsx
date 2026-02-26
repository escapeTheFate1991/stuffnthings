import type { Metadata, Viewport } from 'next'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0f172a',
}

export const metadata: Metadata = {
  title: 'Stuff N Things — Your Website Should Work as Hard as You Do.',
  description: 'We design, engineer, and actively manage high-performance websites for ambitious businesses. 95+ Lighthouse scores, sub-1.5s LCP, and ongoing optimization — delivered as a partnership, not a project.',
  keywords: 'web performance agency, Lighthouse optimization, Core Web Vitals, website-as-a-service, technical SEO, high-performance web development',
  authors: [{ name: 'Stuff N Things' }],
  openGraph: {
    title: 'Stuff N Things — High-Performance Web Partnerships',
    description: 'We engineer and actively manage websites built to score 95+ on Lighthouse, pass Core Web Vitals, and keep improving month over month.',
    url: 'https://stuffnthings.io',
    siteName: 'Stuff N Things',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stuff N Things — High-Performance Web Partnerships',
    description: 'We engineer and actively manage websites built to score 95+ on Lighthouse, pass Core Web Vitals, and keep improving month over month.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="canonical" href="https://stuffnthings.io" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-slate-950 text-white antialiased font-sans selection:bg-brand-cyan/30 selection:text-white">
        {children}
      </body>
    </html>
  )
}