'use client'

import { useCallback } from 'react'
import { useScrollReveal } from '@/lib/hooks'

const CheckIcon = () => (
  <svg className="w-5 h-5 text-brand-green mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

const tiers = [
  {
    name: 'Foundation',
    subtitle: 'Custom Website',
    price: '$997',
    description: 'A rock-solid website that actually works for your business — not a template with your logo slapped on.',
    features: [
      'Custom-designed, mobile-first website',
      '5–7 optimized pages',
      'SEO-optimized titles, meta descriptions, headings',
      'LocalBusiness schema markup',
      'Google Analytics 4 + conversion tracking',
      'Contact form with email notifications',
      'SSL, fast hosting, CDN',
      'Google Business Profile optimization',
    ],
    popular: false,
  },
  {
    name: 'Growth',
    subtitle: 'Website + SEO',
    price: '$1,997',
    description: 'Everything in Foundation, plus ongoing SEO and lead capture that compounds month over month.',
    features: [
      'Everything in Foundation, plus:',
      'Monthly SEO content (blog posts)',
      'Local SEO strategy (citations, reviews)',
      'Before/after project portfolio',
      'AI-powered chatbot for lead capture',
      'Review collection and display',
      'Monthly performance reports',
      'Social media profile optimization',
    ],
    popular: true,
  },
  {
    name: 'Dominate',
    subtitle: 'Full Digital Presence',
    price: '$3,497',
    description: 'Everything in Growth, plus paid ads, AI automation, and a dedicated manager who actually knows your business.',
    features: [
      'Everything in Growth, plus:',
      'AI automation (follow-up emails, lead scoring, CRM)',
      'Video content strategy support',
      'Google Ads + Facebook Ads management',
      'Competitor monitoring and intelligence',
      'Branded proposal and estimate system',
      'Priority support with dedicated manager',
      'Quarterly strategy reviews',
    ],
    popular: false,
  },
]

const guarantees = [
  {
    icon: (
      <svg className="w-6 h-6 text-brand-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    label: '95+ Lighthouse Score',
  },
  {
    icon: (
      <svg className="w-6 h-6 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082" />
      </svg>
    ),
    label: 'AI Automation Included',
  },
  {
    icon: (
      <svg className="w-6 h-6 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    label: 'Enterprise-Grade Security',
  },
  {
    icon: (
      <svg className="w-6 h-6 text-brand-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    label: 'Monthly Performance Reports',
  },
]

export default function Services() {
  const sectionRef = useScrollReveal<HTMLElement>()

  const handleCTAClick = useCallback(() => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <section id="services" ref={sectionRef} className="py-16 md:py-28 lg:py-36 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="reveal">
            <h2 className="section-heading mb-6">
              <span className="gradient-text">Pick Your Level.</span>
              <br />
              <span className="text-white">We Handle the Rest.</span>
            </h2>
          </div>
          <div className="reveal stagger-1">
            <p className="section-subtext">
              A full-time web team costs $25K+ a month. An agency charges $15–50K and disappears after launch.
              We give you the team without the overhead — and we stick around.
            </p>
          </div>
        </div>

        {/* Pricing Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch reveal">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-2xl bg-slate-800/80 border-2 shadow-2xl transition-all duration-500 p-8 ${
                tier.popular
                  ? 'border-brand-cyan/50 shadow-brand-cyan/20 hover:shadow-brand-cyan/30 hover:border-brand-cyan/70 md:scale-105 md:z-10'
                  : 'border-slate-700/30 shadow-slate-900/20 hover:shadow-brand-purple/10 hover:border-slate-600/50'
              }`}
            >
              {/* Most Popular Badge */}
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-brand-cyan to-brand-purple text-white text-sm font-semibold px-5 py-1.5 rounded-full shadow-lg shadow-brand-cyan/25 animate-pulse-glow">
                    <span className="w-1.5 h-1.5 bg-white rounded-full" />
                    Most Popular
                  </span>
                </div>
              )}

              {/* Tier Header */}
              <div className={`text-center ${tier.popular ? 'mt-2' : ''} mb-6`}>
                <h3 className="text-2xl font-bold text-white mb-1">{tier.name}</h3>
                <p className="text-sm text-slate-400 mb-4">{tier.subtitle}</p>
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-sm text-slate-500">Starting at</span>
                </div>
                <div className="flex items-baseline justify-center gap-1">
                  <span className={`text-4xl md:text-5xl font-black bg-gradient-to-r bg-clip-text text-transparent ${
                    tier.popular
                      ? 'from-brand-cyan to-brand-purple'
                      : 'from-slate-200 to-slate-400'
                  }`}>
                    {tier.price}
                  </span>
                  <span className="text-slate-500 text-sm ml-1">/mo</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-400 text-sm leading-relaxed text-center mb-6">
                {tier.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-grow">
                {tier.features.map((feature, fi) => (
                  <li key={fi} className="flex items-start gap-3">
                    {feature.endsWith(':') ? (
                      <span className="text-sm text-brand-cyan font-medium">{feature}</span>
                    ) : (
                      <>
                        <CheckIcon />
                        <span className="text-sm text-slate-300">{feature}</span>
                      </>
                    )}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={handleCTAClick}
                className={`w-full btn !rounded-xl !py-4 text-base ${
                  tier.popular
                    ? 'btn-primary'
                    : 'bg-slate-700/50 text-white border border-slate-600/50 hover:bg-slate-700 hover:border-slate-500 transition-all'
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>

        {/* What this replaces */}
        <div className="reveal mt-16">
          <div className="max-w-2xl mx-auto">
            <div className="border-t border-slate-700/50 pt-8">
              <p className="text-xs text-slate-500 text-center mb-4 uppercase tracking-wider font-medium">What this replaces</p>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="glass rounded-xl p-3">
                  <div className="text-lg font-bold text-red-400 line-through">$25K+</div>
                  <div className="text-[10px] text-slate-500 mt-1">In-house team /mo</div>
                </div>
                <div className="glass rounded-xl p-3">
                  <div className="text-lg font-bold text-red-400 line-through">$15–50K</div>
                  <div className="text-[10px] text-slate-500 mt-1">Agency project</div>
                </div>
                <div className="glass rounded-xl p-3">
                  <div className="text-lg font-bold text-red-400 line-through">$200–500</div>
                  <div className="text-[10px] text-slate-500 mt-1">SaaS tools /mo</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Guarantees */}
        <div className="reveal mt-16">
          <div className="glass rounded-2xl p-8 md:p-10 max-w-4xl mx-auto border border-brand-green/10">
            <h3 className="text-xl font-bold text-white mb-6 text-center">Every Partnership Includes</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {guarantees.map((g, i) => (
                <div key={i} className="text-center group cursor-default">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-slate-800/80 border border-slate-700/50 flex items-center justify-center group-hover:scale-125 group-hover:border-brand-cyan/30 transition-all duration-300">
                    {g.icon}
                  </div>
                  <p className="text-slate-300 text-sm font-medium">{g.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
