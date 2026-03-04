'use client'

import { useCallback } from 'react'
import { useScrollReveal } from '@/lib/hooks'

const features = [
  'Custom website — designed, built, and deployed',
  'AI-powered lead capture & smart forms',
  'AI content generation (4–8 posts/month)',
  'Performance monitoring & auto-alerts',
  'Hosting, SSL, security hardening & uptime monitoring',
  'Monthly performance report with actionable insights',
  'On-page SEO architecture & Core Web Vitals optimization',
  'Email support with 48-hour response SLA',
]

const guarantees = [
  { icon: '🚀', label: '95+ Lighthouse Score' },
  { icon: '🤖', label: 'AI Automation Included' },
  { icon: '🔒', label: 'Enterprise-Grade Security' },
  { icon: '📈', label: 'Monthly Performance Reports' },
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
              A full-time web team costs $25K+ a month. An agency project runs $15–50K and they disappear after.
              We give you the team without the overhead — and we never leave.
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
                AI Web Operations Partner
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
                <p className="text-slate-400 text-sm">+ $1,997 one-time setup fee</p>
              </div>

              <p className="text-slate-300 text-lg leading-relaxed max-w-md mx-auto">
                Your website updates itself. Your content writes itself. Your leads get captured automatically.
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
