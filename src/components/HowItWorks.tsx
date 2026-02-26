'use client'

import { useCallback } from 'react'
import { useScrollReveal } from '@/lib/hooks'

const steps = [
  {
    number: '01',
    title: 'Free Friction Audit',
    subtitle: 'We analyze what\'s broken',
    description:
      'Our team performs a comprehensive analysis of your current website, identifying performance bottlenecks, conversion killers, and missed opportunities. You\'ll receive a detailed report with actionable insights within 48 hours.',
    timeline: '48 hours',
    deliverables: [
      'Performance analysis & speed test',
      'Mobile optimization review',
      'SEO & technical audit',
      'Conversion optimization assessment',
      'Detailed improvement roadmap',
    ],
    color: 'from-brand-cyan to-blue-500',
    glowColor: 'shadow-brand-cyan/20',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'We Build & Launch',
    subtitle: 'From strategy to live site',
    description:
      'Based on the audit findings, we design and build your high-performance website from the ground up. Every element is optimized for speed, conversions, and user experience.',
    timeline: '2-4 weeks',
    deliverables: [
      'Custom website design & development',
      'Performance optimization',
      'SEO implementation',
      'Mobile-first responsive design',
      'Testing & quality assurance',
    ],
    color: 'from-brand-purple to-pink-500',
    glowColor: 'shadow-brand-purple/20',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'We Manage Everything',
    subtitle: 'Ongoing optimization & support',
    description:
      'Your website is never \'done.\' We continuously monitor, optimize, and improve your site\'s performance so your website gets better over time, not worse.',
    timeline: 'Ongoing',
    deliverables: [
      'Continuous performance monitoring',
      'Regular security updates',
      'A/B testing & optimization',
      'Monthly reporting & insights',
      'Unlimited updates & support',
    ],
    color: 'from-brand-green to-emerald-400',
    glowColor: 'shadow-brand-green/20',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
]

export default function HowItWorks() {
  const sectionRef = useScrollReveal<HTMLElement>()

  const handleCTAClick = useCallback(() => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <section id="how-it-works" ref={sectionRef} className="py-16 md:py-28 lg:py-36 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="reveal">
            <h2 className="section-heading mb-6">
              <span className="text-white">How It</span>{' '}
              <span className="gradient-text">Works</span>
            </h2>
          </div>
          <div className="reveal stagger-1">
            <p className="section-subtext">
              From broken to brilliant in three simple steps.
              We handle all the technical complexity while you see the results.
            </p>
          </div>
        </div>

        {/* Timeline Steps */}
        <div className="relative">
          {/* Vertical timeline line (desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-cyan via-brand-purple to-brand-green" />

          <div className="space-y-16 lg:space-y-0">
            {steps.map((step, index) => (
              <div key={index} className="reveal relative lg:pb-24 last:lg:pb-0">
                {/* Timeline node (desktop) */}
                <div className="hidden lg:flex absolute left-1/2 top-8 -translate-x-1/2 z-10">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-xl ${step.glowColor} ring-4 ring-slate-950`}>
                    {step.icon}
                  </div>
                </div>

                <div className={`lg:grid lg:grid-cols-2 lg:gap-20 items-start ${index % 2 === 0 ? '' : 'lg:direction-rtl'}`}>
                  {/* Content side */}
                  <div className={`${index % 2 === 0 ? 'lg:text-right lg:pr-16' : 'lg:col-start-2 lg:pl-16'}`}>
                    {/* Mobile icon */}
                    <div className="lg:hidden flex items-center gap-4 mb-6">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg`}>
                        {step.icon}
                      </div>
                      <span className={`text-5xl font-black bg-gradient-to-r ${step.color} bg-clip-text text-transparent opacity-30`}>
                        {step.number}
                      </span>
                    </div>

                    <div className={`hidden lg:block text-7xl font-black bg-gradient-to-r ${step.color} bg-clip-text text-transparent opacity-20 mb-2`}>
                      {step.number}
                    </div>

                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{step.title}</h3>
                    <p className={`text-lg font-medium mb-4 bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}>
                      {step.subtitle}
                    </p>
                    <p className="text-slate-400 leading-relaxed mb-6">{step.description}</p>
                  </div>

                  {/* Deliverables card */}
                  <div className={`${index % 2 === 0 ? 'lg:col-start-2 lg:pl-16' : 'lg:pr-16 lg:row-start-1'}`}>
                    <div className="glass rounded-2xl p-6 border border-slate-700/50">
                      <div className="flex items-center justify-between mb-5">
                        <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Deliverables</h4>
                        <span className={`text-sm font-semibold bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}>
                          {step.timeline}
                        </span>
                      </div>
                      <ul className="space-y-3">
                        {step.deliverables.map((item, di) => (
                          <li key={di} className="flex items-center gap-3 text-sm text-slate-300">
                            <svg className="w-4 h-4 text-brand-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="reveal mt-20">
          <div className="relative rounded-2xl overflow-hidden max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan/5 via-brand-purple/10 to-brand-green/5" />
            <div className="relative glass rounded-2xl p-10 text-center border border-slate-700/50">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to Transform Your Digital Presence?
              </h3>
              <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                The first step costs nothing. Get your free friction audit and discover
                exactly what&apos;s holding your website back from peak performance.
              </p>
              <button onClick={handleCTAClick} className="btn btn-primary text-lg px-10 py-5">
                Start Your Free Audit Today
                <svg className="inline-block ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}