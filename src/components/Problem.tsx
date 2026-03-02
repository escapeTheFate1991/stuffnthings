'use client'

import { useCallback } from 'react'
import { useScrollReveal, useTilt, useCountUp } from '@/lib/hooks'

/* ── Stat Counter ── */
function AnimatedStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, value: current } = useCountUp(value, 2000)
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-black gradient-text-warm">
        {current}{suffix}
      </div>
      <div className="text-sm text-slate-400 mt-1 font-medium">{label}</div>
    </div>
  )
}

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

        <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>

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
      title: 'Set It and Forget It',
      description: "Agencies launch your site, invoice you, and move on to the next project. No ongoing optimization. No performance monitoring. No security updates. Your site degrades while you focus on your business.",
      stat: 'Most business websites lose 15-30% performance within 6 months of launch',
    },
    {
      icon: (
        <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2-2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: 'No Web Team Expertise',
      description: "You need ongoing design, engineering, performance optimization, SEO, security, and strategy expertise. Hiring a full web team costs $300K+ annually. Most businesses can't justify that expense.",
      stat: 'Average cost to hire a full-stack web team: $25K+ per month',
    },
    {
      icon: (
        <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      title: 'Hidden Performance Tax',
      description: "Slow sites cost conversions, search rankings, and customer trust. Google's Core Web Vitals directly impact your bottom line. Every month of poor performance is revenue you can't recover.",
      stat: "1-second delay = 7% fewer conversions, 11% fewer page views",
    },
  ]

  const handleScroll = useCallback(() => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <section id="problem" ref={sectionRef} className="py-16 md:py-28 lg:py-36 relative overflow-hidden">
      {/* Subtle gradient separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="reveal">
            <h2 className="section-heading mb-6">
              <span className="gradient-text-warm">Most agencies build</span>
              <br />
              <span className="text-white">your site and disappear.</span>
            </h2>
          </div>
          <div className="reveal stagger-1">
            <p className="section-subtext">
              Your site launches, looks great, then slowly falls apart. Performance drops. 
              Security patches pile up. Rankings slip. You need a team that stays, not a project that ends.
            </p>
          </div>
        </div>

        {/* Animated Stats Bar */}
        <div className="reveal grid grid-cols-3 gap-8 mb-20 max-w-3xl mx-auto">
          <AnimatedStat value={53} suffix="%" label="Users abandon slow-loading sites" />
          <AnimatedStat value={88} suffix="%" label="Won't return after a bad experience" />
          <AnimatedStat value={70} suffix="+" label="Lighthouse score required by Google" />
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
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Your Website Needs a Team, Not a Project
              </h3>
              <p className="text-lg text-slate-400 mb-6 max-w-2xl mx-auto">
                We don't build and disappear. We become your web team — 
                all the design, engineering, performance, and strategy expertise you need without hiring anyone.
                Your website gets better every month, not worse.
              </p>
              <button onClick={handleScroll} className="btn btn-primary text-lg px-8 py-4">
                See how your web team works →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}