'use client'

import { useCallback } from 'react'
import { useScrollReveal, useTilt } from '@/lib/hooks'

/* ── Problem Card ── */
function ProblemCard({ icon, title, description, stat, index }: {
  icon: React.ReactNode
  title: string
  description: string
  stat: string
  index: number
}) {
  const { ref, handlers } = useTilt<HTMLDivElement>(8)

  return (
    <div className={`reveal stagger-${index + 1}`}>
      <div
        ref={ref}
        {...handlers}
        className="card group cursor-default text-center h-full hover:border-red-400/30"
      >
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-red-500/20 transition-all duration-500">
          {icon}
        </div>

        <h3 className="text-2xl font-bold text-white mb-4 font-display">{title}</h3>

        <p className="text-slate-400 mb-6 leading-relaxed">{description}</p>

        <div className="bg-red-950/40 border border-red-900/30 rounded-xl p-4 group-hover:border-red-800/50 transition-colors duration-500">
          <p className="text-red-300/90 font-semibold text-sm">{stat}</p>
        </div>
      </div>
    </div>
  )
}

export default function Problem() {
  const sectionRef = useScrollReveal<HTMLElement>()

  const problems = [
    {
      icon: (
        <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Built It and Bailed',
      description: "They launched your site, sent the final invoice, and moved on to the next client. No one's monitoring performance. No one's patching security holes. Your site is slowly getting worse and nobody's telling you.",
      stat: 'Most business sites lose 15–30% performance within 6 months of launch',
    },
    {
      icon: (
        <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2-2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: "Can't Afford a Full Team",
      description: "You need a designer, a developer, someone who understands SEO, someone who handles security updates. Hiring all of that in-house? That's $25K a month. For most businesses, it just doesn't make sense.",
      stat: 'A full-stack web team runs $25K+/month in salary alone',
    },
    {
      icon: (
        <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      title: 'Slow Site, Lost Revenue',
      description: "Every second your site takes to load, you're losing customers. Google knows it, your visitors know it, and your competitors are benefiting from it. This isn't a vanity metric — it's money walking out the door.",
      stat: '1-second delay = 7% fewer conversions, 11% fewer page views',
    },
  ]

  const handleScroll = useCallback(() => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <section id="problem" ref={sectionRef} className="py-16 md:py-28 lg:py-36 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />

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
              Meanwhile, you&apos;re paying for traffic that bounces before the homepage even loads.
            </p>
          </div>
        </div>

        {/* Problem Cards */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {problems.map((problem, index) => (
            <ProblemCard key={index} {...problem} index={index} />
          ))}
        </div>

        {/* CTA Box */}
        <div className="reveal mt-20">
          <div className="relative rounded-2xl overflow-hidden max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan/10 via-brand-purple/10 to-brand-cyan/10" />
            <div className="relative glass rounded-2xl p-10 text-center border border-slate-700/50">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-display">
                What If You Had a Team That Actually Stayed?
              </h3>
              <p className="text-lg text-slate-400 mb-6 max-w-2xl mx-auto">
                That&apos;s what we do. Design, development, performance, security — we handle it all, ongoing.
                No project end date. No final invoice and radio silence. Just a site that stays fast, secure, and performing at its best.
              </p>
              <button onClick={handleScroll} className="btn btn-primary text-lg px-8 py-4">
                See how it works →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
