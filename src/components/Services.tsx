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
    subtitle: 'Essential AI Automation',
    price: '$499',
    period: '/month',
    description: '1 Custom OpenClaw Agent to handle your most time-consuming workflow.',
    features: [
      '1 Custom OpenClaw Agent',
      'Customer Support & FAQ Automation',
      'CRM Integration',
      'Weekly Performance Insights',
      'Email & chat support',
      'Basic workflow automation',
      'Standard integration support',
      'Monthly optimization review',
    ],
    popular: false,
  },
  {
    name: 'Growth',
    subtitle: 'Comprehensive Automation',
    price: '$999-$1,499',
    period: '/month',
    description: 'Up to 3 Dedicated OpenClaw Agents for comprehensive business automation.',
    features: [
      'Up to 3 Dedicated OpenClaw Agents',
      'Lead Qualification & Scheduling',
      'Multi-App Workflow Automation',
      'Monthly Strategy Calls',
      'Priority Support',
      'Advanced CRM orchestration',
      'Custom business logic',
      'Performance analytics dashboard',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    subtitle: 'Full AI Operations',
    price: 'Custom Pricing',
    period: '',
    description: 'Unlimited OpenClaw Agents with advanced autonomous logic and dedicated engineering.',
    features: [
      'Unlimited OpenClaw Agents',
      'Custom API & Database Integration',
      'Advanced Autonomous Logic',
      'Dedicated AI Engineer',
      '24/7 Monitoring & Support',
      'White-glove implementation',
      'Enterprise security compliance',
      'Custom training & onboarding',
    ],
    popular: false,
  },
]

const guarantees = [
  {
    icon: (
      <svg className="w-6 h-6 text-brand-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    label: '24/7 AI Operation',
  },
  {
    icon: (
      <svg className="w-6 h-6 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: '30-Second Response Time',
  },
  {
    icon: (
      <svg className="w-6 h-6 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    label: 'Autonomous Decision-Making',
  },
  {
    icon: (
      <svg className="w-6 h-6 text-brand-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    label: 'Weekly Business Intelligence',
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
      <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-900/50 to-black" />
      {/* Edge glow lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-purple/30 to-transparent" />
      {/* Aurora orbs */}
      <div className="absolute top-[15%] left-[-8%] w-[600px] h-[600px] rounded-full bg-brand-cyan/[0.06] blur-[130px] animate-aurora-1" />
      <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-brand-purple/[0.07] blur-[120px] animate-aurora-2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="reveal">
            <h2 className="section-heading mb-6">
              <span className="gradient-text">AI Automation</span>
              <br />
              <span className="text-white">That Actually Works.</span>
            </h2>
          </div>
          <div className="reveal stagger-1">
            <p className="section-subtext">
              Choose the level of automation that fits your business. Every tier includes custom OpenClaw agents designed specifically for your workflows.
            </p>
          </div>
        </div>

        {/* Pricing Tiers -- thin borders, transparent backgrounds */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch reveal">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-2xl bg-transparent border transition-all duration-500 p-8 group overflow-hidden ${tier.popular
                ? 'border-white/[0.1] md:scale-105 md:z-10'
                : 'border-white/[0.06] hover:border-brand-purple/30'
                }`}
            >
              {/* Popular tier: gradient TOP border bar */}
              {tier.popular && (
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-coral" />
              )}

              {/* Most Popular Badge */}
              {tier.popular && (
                <div className="absolute -top-0 left-1/2 -translate-x-1/2 translate-y-3">
                  <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-brand-cyan to-brand-purple text-white text-sm font-semibold px-5 py-1.5 rounded-full shadow-lg shadow-brand-cyan/25">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Tier Header */}
              <div className={`text-center ${tier.popular ? 'mt-8' : ''} mb-6`}>
                <h3 className="text-2xl font-bold text-white mb-1">{tier.name}</h3>
                <p className="text-sm text-slate-400 mb-4">{tier.subtitle}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className={`text-4xl md:text-5xl font-black bg-gradient-to-r bg-clip-text text-transparent ${tier.popular
                    ? 'from-brand-cyan to-brand-purple'
                    : 'from-slate-200 to-slate-400'
                    }`}>
                    {tier.price}
                  </span>
                  {tier.period && <span className="text-slate-500 text-sm ml-1">{tier.period}</span>}
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

              {/* CTA -- clean, no pulse */}
              <button
                onClick={handleCTAClick}
                className={`w-full btn !rounded-xl !py-4 text-base ${tier.popular
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
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-lg font-bold text-red-400 line-through">$17K+</div>
                  <div className="text-[10px] text-slate-500 mt-1">Operations team /mo</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-red-400 line-through">$1,800+</div>
                  <div className="text-[10px] text-slate-500 mt-1">SaaS stack /mo</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-red-400 line-through">40hrs+</div>
                  <div className="text-[10px] text-slate-500 mt-1">Manual work /week</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Guarantees -- clean icon + text, no card wrappers */}
        <div className="reveal mt-16">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-8 text-center">Every Partnership Includes</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {guarantees.map((g, i) => (
                <div key={i} className="flex flex-col items-center gap-3 text-center group cursor-default">
                  <div className="group-hover:scale-110 transition-transform duration-300">
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
