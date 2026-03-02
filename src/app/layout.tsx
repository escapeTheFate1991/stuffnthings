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
    description: 'We engineer and actively manage websites built to score 95+ on Lighthouse, pass Core Web Vitals, and maintain peak performance month over month.',
    url: 'https://stuffnthings.io',
    siteName: 'Stuff N Things',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stuff N Things — High-Performance Web Partnerships',
    description: 'We engineer and actively manage websites built to score 95+ on Lighthouse, pass Core Web Vitals, and maintain peak performance month over month.',
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
              description: 'Web performance agency that designs, builds, and actively manages high-performance websites for small businesses and professional services. Monthly partnerships starting at $299/mo.',
              email: 'info@stuffnthings.io',
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
                'Web Design',
                'Web Development',
                'Website Management',
                'Technical SEO',
                'Website Performance Optimization',
                'Website-as-a-Service',
              ],
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Web Services',
                itemListElement: [
                  {
                    '@type': 'Offer',
                    name: 'Foundation Plan',
                    description: 'Professional website with hosting, SSL, and monthly maintenance',
                    price: '299',
                    priceCurrency: 'USD',
                    priceSpecification: { '@type': 'UnitPriceSpecification', price: '299', priceCurrency: 'USD', unitText: 'MONTH' },
                  },
                  {
                    '@type': 'Offer',
                    name: 'Operational Plan',
                    description: 'Full website management with SEO, content updates, and performance optimization',
                    price: '599',
                    priceCurrency: 'USD',
                    priceSpecification: { '@type': 'UnitPriceSpecification', price: '599', priceCurrency: 'USD', unitText: 'MONTH' },
                  },
                  {
                    '@type': 'Offer',
                    name: 'Growth Plan',
                    description: 'Complete web team with strategy, A/B testing, conversion optimization, and priority support',
                    price: '1200',
                    priceCurrency: 'USD',
                    priceSpecification: { '@type': 'UnitPriceSpecification', price: '1200', priceCurrency: 'USD', unitText: 'MONTH' },
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
      <body className="bg-slate-950 text-white antialiased font-sans selection:bg-brand-cyan/30 selection:text-white">
        {children}
      </body>
    </html>
  )
}