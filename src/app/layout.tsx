import type { Metadata, Viewport } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0f172a',
}

export const metadata: Metadata = {
  title: 'Stuff N Things -- AI Automation Agency | OpenClaw Framework',
  description: 'We design and deploy intelligent automation systems powered by OpenClaw. Custom AI agents that handle your routine tasks so your team can focus on high-impact work that drives real growth.',
  keywords: 'AI automation, OpenClaw agents, business process automation, intelligent workflow automation, AI operations partner, custom AI agents',
  authors: [{ name: 'Stuff N Things' }],
  openGraph: {
    title: 'Stuff N Things -- AI Automation Agency | OpenClaw Framework',
    description: 'We design and deploy intelligent automation systems powered by OpenClaw. Custom AI agents that handle your routine tasks so your team can focus on high-impact work.',
    url: 'https://stuffnthings.io',
    siteName: 'Stuff N Things',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://stuffnthings.io/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Stuff N Things -- Your Website Should Never Fall Behind',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stuff N Things -- AI Automation Agency | OpenClaw Framework',
    description: 'We design and deploy intelligent automation systems powered by OpenClaw. Custom AI agents that handle your routine tasks so your team can focus on high-impact work.',
    images: ['https://stuffnthings.io/og-image.png'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
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

          {/* JSON-LD: Organization + LocalBusiness */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': ['Organization', 'LocalBusiness'],
                name: 'Stuff N Things LLC',
                url: 'https://stuffnthings.io',
                logo: 'https://stuffnthings.io/app-icon-1024.png',
                description: 'AI automation agency specializing in OpenClaw-powered intelligent automation systems. Custom AI agents and workflow automation for businesses looking to reduce manual work and increase operational efficiency.',
                email: 'admin@stuffnthings.io',
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: '2093 Philadelphia Pike',
                  addressLocality: 'Claymont',
                  addressRegion: 'DE',
                  postalCode: '19703',
                  addressCountry: 'US',
                },
                sameAs: [],
                priceRange: '$$',
                areaServed: { '@type': 'Country', name: 'United States' },
                serviceType: [
                  'AI Automation',
                  'Custom AI Agents',
                  'Business Process Automation',
                  'Workflow Automation',
                  'OpenClaw Framework Development',
                  'AI Operations Consulting',
                ],
                hasOfferCatalog: {
                  '@type': 'OfferCatalog',
                  name: 'AI Automation Services',
                  itemListElement: [
                    {
                      '@type': 'Offer',
                      name: 'Foundation',
                      description: '1 Custom OpenClaw Agent with customer support automation and CRM integration',
                      price: '499',
                      priceCurrency: 'USD',
                      priceSpecification: { '@type': 'UnitPriceSpecification', price: '499', priceCurrency: 'USD', unitText: 'MONTH' },
                    },
                    {
                      '@type': 'Offer',
                      name: 'Growth',
                      description: 'Up to 3 Dedicated OpenClaw Agents with lead qualification and multi-app workflow automation',
                      price: '999',
                      priceCurrency: 'USD',
                      priceSpecification: { '@type': 'UnitPriceSpecification', price: '999', priceCurrency: 'USD', unitText: 'MONTH' },
                    },
                    {
                      '@type': 'Offer',
                      name: 'Enterprise',
                      description: 'Unlimited OpenClaw Agents with custom API integration and dedicated AI engineer',
                      price: '1500',
                      priceCurrency: 'USD',
                      priceSpecification: { '@type': 'UnitPriceSpecification', price: '1500', priceCurrency: 'USD', unitText: 'MONTH' },
                    },
                  ],
                },
              }),
            }}
          />
          {/* JSON-LD: WebSite with SearchAction */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'Stuff N Things',
                url: 'https://stuffnthings.io',
                publisher: { '@type': 'Organization', name: 'Stuff N Things LLC' },
              }),
            }}
          />
        </head>
        <body className="bg-black text-white antialiased font-sans selection:bg-brand-cyan/30 selection:text-white">
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}