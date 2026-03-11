'use client'

import { useCallback } from 'react'
import { useScrollReveal } from '@/lib/hooks'

export default function Problem() {
  const sectionRef = useScrollReveal<HTMLElement>()

  const problems = [
    {
      icon: (
        <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Built It and Bailed',
      description: "Your agency launched the site, cashed the check, and moved on. Nobody's watching performance. Nobody's patching security holes. Your site is quietly getting worse — and nobody's telling you.",
      stat: 'Most business sites lose 15–30% performance within 6 months of launch',
      revealClass: 'reveal-slide-left',
    },
    {
      icon: (
        <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2-2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: "Can't Justify a Full Team",
      description: "A designer, a developer, an SEO person, someone handling security patches — that's $25K a month in salary. For most businesses, hiring all of that in-house just doesn't make sense.",
      stat: 'A full-stack web team runs $25K+ per month in salary alone',
      revealClass: 'reveal',
    },
    {
      icon: (
        <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      title: 'Slow Site, Lost Money',
      description: "Every second your site takes to load costs you customers. Google penalizes it, visitors bounce, and your competitors pick up the traffic. This isn't a vanity metric — it's revenue walking out the door.",
      stat: '1-second delay = 7% fewer conversions, 11% fewer page views',
      revealClass: 'reveal-slide-right',
    },
  ]

  const handleScroll = useCallback(() => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <section id="problem" ref={sectionRef} className="py-16 md:py-28 lg:py-36 relative overflow-hidden bg-[#0B1120]">
      {/* Edge glow line top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-coral/40 to-transparent" />
      {/* Aurora orbs for card area */}
      <div className="absolute top-[5%] left-[-5%] w-[500px] h-[500px] rounded-full bg-brand-coral/[0.06] blur-[120px] animate-aurora-1" />
      <div className="absolute top-[20%] right-[-8%] w-[400px] h-[400px] rounded-full bg-brand-purple/[0.05] blur-[100px] animate-aurora-2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="reveal">
            <h2 className="section-heading mb-6">
              <span className="gradient-text-warm">Your agency built it.</span>
              <br />
              <span className="text-white">Then ghosted.</span>
            </h2>
          </div>
          <div className="reveal stagger-1">
            <p className="section-subtext">
              Sound familiar? The site launched, looked great for a month, and then nobody touched it again.
              Performance dropped. Security patches piled up. Rankings slipped.
              Meanwhile, you&apos;re paying for traffic that bounces before the homepage loads.
            </p>
          </div>
        </div>

        {/* Problems — open layout, no card wrappers */}
        <div className="max-w-4xl mx-auto space-y-0">
          {problems.map((problem, index) => (
            <div key={index}>
              <div className={`${problem.revealClass} stagger-${index + 1} py-10`}>
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  {/* Icon — larger, no box */}
                  <div className="flex-shrink-0">
                    {problem.icon}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-3 font-display">{problem.title}</h3>
                    <p className="text-slate-400 leading-relaxed mb-4">{problem.description}</p>
                    <p className="text-red-300/80 font-semibold text-sm">{problem.stat}</p>
                  </div>
                </div>
              </div>
              {index < problems.length - 1 && (
                <div className="gradient-divider" />
              )}
            </div>
          ))}
        </div>

        {/* ── Immersive CTA — Full-width Aurora Section ── */}
      </div>

      <div className="reveal mt-20 relative">
        {/* Full-bleed background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Aurora gradient layers */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/95 to-slate-950" />
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand-cyan/15 rounded-full blur-[120px] animate-aurora-1" />
          <div className="absolute top-10 right-1/4 w-[500px] h-[500px] bg-brand-purple/15 rounded-full blur-[100px] animate-aurora-2" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-coral/8 rounded-full blur-[140px] animate-aurora-3" />
          {/* Subtle grid overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} />
          {/* Top/bottom edge glow lines */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-purple/40 to-transparent" />
        </div>

        <div className="relative py-24 md:py-36 lg:py-44">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Floating stat pills */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12">
              {[
                { value: '55K', label: 'US jobs displaced by AI in 2025', glow: 'shadow-brand-cyan/20' },
                { value: '66%', label: 'avg productivity gain with AI', glow: 'shadow-brand-purple/20' },
                { value: '89%', label: 'of SMBs already using AI', glow: 'shadow-brand-coral/20' },
              ].map((stat) => (
                <div key={stat.label} className={`flex items-center gap-3 px-5 py-3 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm shadow-lg ${stat.glow} hover:bg-white/[0.07] hover:border-white/[0.15] transition-all duration-500`}>
                  <span className="text-2xl md:text-3xl font-black gradient-text">{stat.value}</span>
                  <span className="text-xs md:text-sm text-slate-400 text-left max-w-[140px] leading-tight">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Headline */}
            <h3 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-6 font-display leading-[1.1] tracking-tight">
              AI Is Reshaping<br />
              <span className="bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-coral bg-clip-text text-transparent">
                Every Business.
              </span>
            </h3>

            <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Companies are replacing entire departments with AI workflows.
              The ones that move first save $1,700–$3,200 a month.
              The ones that wait lose ground they won&apos;t get back.
            </p>

            {/* CTA Button — glowing, oversized */}
            <div className="relative inline-block group">
              {/* Glow behind button */}
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-coral rounded-2xl opacity-40 group-hover:opacity-70 blur-lg transition-opacity duration-700" />
              <a
                href="/resources/ai-workforce-report"
                className="relative inline-flex items-center gap-3 px-10 py-5 md:px-14 md:py-6 bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-coral rounded-2xl text-white font-bold text-lg md:text-xl tracking-wide shadow-2xl hover:shadow-brand-purple/30 transition-all duration-500 hover:scale-[1.03]"
              >
                <span>See the Full Report</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>

            {/* Subtle subtext */}
            <p className="mt-6 text-sm text-slate-500">Free download. No email required.</p>
          </div>
        </div>
      </div>

    </section>
  )
}
