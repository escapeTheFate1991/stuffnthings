'use client'

import { useCallback } from 'react'
import { useScrollReveal } from '@/lib/hooks'

const features = [
  'Custom website — designed, built, and deployed',
  'AI-powered lead capture & smart forms',
  'AI workflow automation & task routing',
  'Performance monitoring & auto-alerts',
  'Hosting, SSL, security hardening & uptime monitoring',
  'Monthly performance report with clear insights',
  'On-page SEO architecture & Core Web Vitals optimization',
  'Email support with 48-hour response SLA',
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
              <span className="gradient-text">One Plan.</span>
              <br />
              <span className="text-white">Everything Included.</span>
            </h2>
          </div>
          <div className="reveal stagger-1">
            <p className="section-subtext">
              A full-time web team costs $25K+ a month. An agency charges $15–50K and disappears after launch.
              We give you the team without the overhead — and we stick around.
            </p>
          </div>
        </div>

        {/* Single Pricing Card */}
        <div className="max-w-2xl mx-auto reveal">
          <div className="relative rounded-2xl bg-slate-800/80 border-2 border-brand-cyan/30 shadow-2xl shadow-brand-cyan/10 hover:shadow-brand-cyan/20 hover:border-brand-cyan/50 transition-all duration-500 p-8 lg:p-12">
            {/* Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-brand-cyan to-brand-purple text-white text-sm font-semibold px-5 py-1.5 rounded-full shadow-lg shadow-brand-cyan/25 animate-pulse-glow">
                <span className="w-1.5 h-1.5 bg-white rounded-full" />
                Your AI-Powered Web Team
              </span>
            </div>

            <div className="text-center mb-10">
              {/* Setup fee */}
              <div className="mb-6">
                <div className="flex items-baseline justify-center gap-1 mb-1">
                  <span className="text-5xl md:text-6xl font-black bg-gradient-to-r from-brand-cyan to-brand-purple bg-clip-text text-transparent">
                    $497
                  </span>
                  <span className="text-slate-500 text-sm ml-1">/month</span>
                </div>
                <p className="text-slate-400 text-sm">+ $1,997 one-time setup</p>
              </div>

              <p className="text-slate-300 text-lg leading-relaxed max-w-md mx-auto">
                Your site updates itself. Your workflows run themselves. Your leads get captured automatically.
                You get a report every month showing what&apos;s working.
              </p>
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-10">
              {features.map((feature, fi) => (
                <li key={fi} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-brand-green mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-slate-300">{feature}</span>
                </li>
              ))}
            </ul>

            {/* What it replaces */}
            <div className="border-t border-slate-700/50 pt-6 mb-8">
              <p className="text-xs text-slate-500 text-center mb-3 uppercase tracking-wider font-medium">What this replaces</p>
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

            {/* CTA */}
            <button
              onClick={handleCTAClick}
              className="w-full btn btn-primary !rounded-xl !py-5 text-lg"
            >
              Start With a Free Audit
            </button>
            <p className="text-xs text-slate-600 text-center mt-3">No contracts. Cancel anytime.</p>
          </div>
        </div>

        {/* Guarantees */}
        <div className="reveal mt-20">
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
