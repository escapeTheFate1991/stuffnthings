'use client'

import { useCallback } from 'react'
import { useScrollReveal } from '@/lib/hooks'

const services = [
  {
    name: 'Foundation',
    price: '$299',
    period: '/month',
    description: 'Perfect for small businesses ready to establish their digital presence',
    features: [
      'Professional website design & development',
      'Mobile-optimized responsive design',
      'Basic SEO setup & optimization',
      'Contact forms & lead capture',
      'SSL certificate & security basics',
      'Monthly performance reports',
      'Email support',
      '1 design revision per month',
    ],
    popular: false,
    cta: 'Start with Foundation',
    ideal: 'Consultants, local services, small retailers',
    accent: 'from-slate-500 to-slate-400',
    iconBg: 'bg-slate-700/50',
  },
  {
    name: 'Operational',
    price: '$599',
    priceRange: '–$899',
    period: '/month',
    description: 'For growing businesses that need advanced functionality and integrations',
    features: [
      'Everything in Foundation, plus:',
      'Advanced SEO & content optimization',
      'E-commerce capabilities',
      'CRM & email marketing integrations',
      'Analytics & conversion tracking',
      'A/B testing & optimization',
      'Priority support & monthly strategy calls',
      'Unlimited design revisions',
      'Custom functionality development',
      'Social media integration',
    ],
    popular: true,
    cta: 'Choose Operational',
    ideal: 'Growing businesses, online stores, B2B companies',
    accent: 'from-brand-cyan to-brand-purple',
    iconBg: 'bg-brand-cyan/10',
  },
  {
    name: 'Growth',
    price: '$1,200',
    priceRange: '+',
    period: '/month',
    description: 'Enterprise-grade solution for businesses serious about digital dominance',
    features: [
      'Everything in Operational, plus:',
      'Enterprise-grade performance optimization',
      'Advanced conversion rate optimization',
      'Custom web applications',
      'Multi-site management',
      'Advanced integrations & automation',
      'Dedicated account manager',
      'Weekly strategy & optimization calls',
      'Priority development queue',
      'Advanced analytics & reporting',
      '24/7 monitoring & support',
    ],
    popular: false,
    cta: 'Scale with Growth',
    ideal: 'Established businesses, enterprises, high-traffic sites',
    accent: 'from-brand-purple to-brand-coral',
    iconBg: 'bg-brand-purple/10',
  },
]

const guarantees = [
  { icon: '🚀', label: '99.9% Uptime Guarantee' },
  { icon: '⚡', label: 'PageSpeed Score 95+' },
  { icon: '🔒', label: 'Enterprise Security' },
  { icon: '🔄', label: 'Continuous Optimization' },
]

export default function Services() {
  const sectionRef = useScrollReveal<HTMLElement>()

  const handleCTAClick = useCallback(() => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <section id="services" ref={sectionRef} className="py-28 md:py-36 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="reveal">
            <h2 className="section-heading mb-6">
              <span className="gradient-text">Website-as-a-Service</span>
              <br />
              <span className="text-white">Built for Growth</span>
            </h2>
          </div>
          <div className="reveal stagger-1">
            <p className="section-subtext">
              Choose the plan that matches your ambition. Every plan includes ongoing optimization,
              maintenance, and support. No hidden fees, no surprises.
            </p>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {services.map((service, index) => (
            <div
              key={index}
              className={`reveal stagger-${index + 1} ${service.popular ? 'lg:-mt-4 lg:mb-[-16px]' : ''}`}
            >
              <div
                className={`relative rounded-2xl transition-all duration-500 group ${
                  service.popular
                    ? 'bg-slate-800/80 border-2 border-brand-cyan/30 shadow-2xl shadow-brand-cyan/10 hover:shadow-brand-cyan/20 hover:border-brand-cyan/50'
                    : 'bg-slate-800/40 border border-slate-700/50 hover:border-slate-600/50 hover:shadow-xl'
                } p-8 lg:p-10`}
              >
                {/* Popular badge */}
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-brand-cyan to-brand-purple text-white text-sm font-semibold px-5 py-1.5 rounded-full shadow-lg shadow-brand-cyan/25 animate-pulse-glow">
                      <span className="w-1.5 h-1.5 bg-white rounded-full" />
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Plan name & price */}
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-white mb-4">{service.name}</h3>
                  <div className="flex items-baseline justify-center gap-1 mb-3">
                    <span className={`text-5xl font-black bg-gradient-to-r ${service.accent} bg-clip-text text-transparent`}>
                      {service.price}
                    </span>
                    {service.priceRange && (
                      <span className={`text-2xl font-bold bg-gradient-to-r ${service.accent} bg-clip-text text-transparent`}>
                        {service.priceRange}
                      </span>
                    )}
                    <span className="text-slate-500 text-sm ml-1">{service.period}</span>
                  </div>
                  <p className="text-slate-400 text-sm">{service.description}</p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, fi) => (
                    <li key={fi} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-brand-green mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={`text-sm ${feature.includes('Everything in') ? 'text-brand-cyan font-semibold' : 'text-slate-300'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Ideal for */}
                <div className="border-t border-slate-700/50 pt-5 mb-6">
                  <p className="text-brand-green/80 text-xs font-medium text-center tracking-wide uppercase">
                    Ideal for: {service.ideal}
                  </p>
                </div>

                {/* CTA */}
                <button
                  onClick={handleCTAClick}
                  className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    service.popular
                      ? 'btn btn-primary !rounded-xl'
                      : 'btn btn-secondary !rounded-xl'
                  }`}
                >
                  {service.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantees */}
        <div className="reveal mt-20">
          <div className="glass rounded-2xl p-8 md:p-10 max-w-4xl mx-auto border border-brand-green/10">
            <h3 className="text-xl font-bold text-white mb-6 text-center">All Plans Include</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {guarantees.map((g, i) => (
                <div key={i} className="text-center group cursor-default">
                  <div className="text-2xl mb-2 group-hover:scale-125 transition-transform duration-300">{g.icon}</div>
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