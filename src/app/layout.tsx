import type { Metadata, Viewport } from 'next'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0f172a',
}

export const metadata: Metadata = {
  title: 'Prompts That Actually Work | Stuffnthings Security & Compliance',
  description: 'Battle-tested prompts for AI security audits, compliance frameworks, and enterprise deployment. Copy, paste, and secure your systems with proven audit prompts.',
  keywords: 'AI security prompts, compliance audit prompts, database security, Supabase security, AI coding assistant prompts, security automation',
  authors: [{ name: 'Stuffnthings Security Team' }],
  openGraph: {
    title: 'Prompts That Actually Work | Stuffnthings Security & Compliance',
    description: 'Battle-tested prompts for AI security audits, compliance frameworks, and enterprise deployment. Copy, paste, and secure your systems.',
    url: 'https://stuffnthings.io',
    siteName: 'Stuffnthings',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://stuffnthings.io/images/sections/blog-security.png',
        width: 1200,
        height: 630,
        alt: 'Prompts That Actually Work - Security & Compliance',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prompts That Actually Work | Stuffnthings Security & Compliance',
    description: 'Battle-tested prompts for AI security audits, compliance frameworks, and enterprise deployment.',
    images: ['https://stuffnthings.io/images/sections/blog-security.png'],
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
          href="https://fonts.googleapis.com/css2?family=General+Sans:wght@400;500;600;700&family=Cabinet+Grotesk:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-black text-white antialiased font-sans selection:bg-brand-cyan/30 selection:text-white">
        {children}
      </body>
    </html>
  )
}