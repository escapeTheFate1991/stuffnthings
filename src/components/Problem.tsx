'use client'

import { useCallback, useRef } from 'react'
import { useScrollReveal } from '@/lib/hooks'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Problem() {
  const sectionRef = useScrollReveal<HTMLElement>()
  const ctaRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ctaRef,
    offset: ['start end', 'center center']
  })

  // Expand from center: bg panel starts narrow and grows to full
  const scaleX = useTransform(scrollYProgress, [0, 0.8], [0.3, 1])
  const scaleY = useTransform(scrollYProgress, [0, 0.6], [0.6, 1])
  const bgOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1])
  const contentOpacity = useTransform(scrollYProgress, [0.3, 0.7], [0, 1])
  const contentY = useTransform(scrollYProgress, [0.3, 0.7], [40, 0])

  const oldWayPoints = [
    '$17K/mo ops team',
    '45-min response times',
    '6 disconnected tools',
    '40 hrs/week on admin'
  ]

  const alecWayPoints = [
    'Deployed in 15 minutes',
    '<2 min responses, 24/7',
    'One integration layer across your stack',
    '40 hrs/week back on strategy'
  ]

  const handleScroll = useCallback(() => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <section id="problem" ref={sectionRef} className="py-16 md:py-28 lg:py-36 relative overflow-hidden bg-black">
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
              <span className="text-white">The Old Way</span>{' '}
              <span className="text-slate-500">vs</span>{' '}
              <span className="gradient-text">ALEC Way</span>
            </h2>
          </div>
          <div className="reveal stagger-1">
            <p className="section-subtext">
              You know the math. The old way costs more every quarter.
            </p>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="reveal grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto mb-20">
          {/* The Old Way */}
          <div className="reveal-slide-left">
            <div className="relative p-8 rounded-2xl border border-red-500/20 bg-red-500/[0.02] h-full">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/[0.03] to-transparent" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                  <h3 className="text-2xl font-bold text-white font-display">The Old Way</h3>
                </div>
                
                <div className="space-y-4">
                  {oldWayPoints.map((point, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span className="text-slate-300 leading-relaxed">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* With ALEC */}
          <div className="reveal-slide-right">
            <div className="relative p-8 rounded-2xl border border-brand-cyan/20 bg-brand-cyan/[0.02] h-full">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-cyan/[0.05] via-brand-purple/[0.03] to-transparent" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <svg className="w-8 h-8 text-brand-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                  <h3 className="text-2xl font-bold gradient-text font-display">With ALEC</h3>
                </div>
                
                <div className="space-y-4">
                  {alecWayPoints.map((point, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-brand-green mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-slate-300 leading-relaxed">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Immersive CTA -- Expand-from-center scroll reveal ── */}
      <div ref={ctaRef} className="mt-20 relative">
        {/* Expanding background panel */}
        <motion.div
          className="absolute inset-0 overflow-hidden origin-center rounded-3xl mx-4 md:mx-8 lg:mx-12"
          style={{ scaleX, scaleY, opacity: bgOpacity }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/90 via-neutral-900/95 to-black" />
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand-cyan/15 rounded-full blur-[120px] animate-aurora-1" />
          <div className="absolute top-10 right-1/4 w-[500px] h-[500px] bg-brand-purple/15 rounded-full blur-[100px] animate-aurora-2" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-coral/8 rounded-full blur-[140px] animate-aurora-3" />
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-purple/40 to-transparent" />
        </motion.div>

        {/* Content -- fades in after background expands */}
        <motion.div
          className="relative py-24 md:py-36 lg:py-44"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Floating stat pills */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12">
              {[
                { value: '$2.4K', label: 'avg monthly savings', glow: 'shadow-brand-cyan/20' },
                { value: '60-80%', label: 'tasks automated', glow: 'shadow-brand-purple/20' },
                { value: '15min', label: 'deployment time', glow: 'shadow-brand-coral/20' },
              ].map((stat) => (
                <div key={stat.label} className={`flex items-center gap-3 px-5 py-3 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm shadow-lg ${stat.glow} hover:bg-white/[0.07] hover:border-white/[0.15] transition-all duration-500`}>
                  <span className="text-2xl md:text-3xl font-black gradient-text">{stat.value}</span>
                  <span className="text-xs md:text-sm text-slate-400 text-left max-w-[140px] leading-tight">{stat.label}</span>
                </div>
              ))}
            </div>

            <h3 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-6 font-display leading-[1.1] tracking-tight">
              Stop Managing.<br />
              <span className="bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-coral bg-clip-text text-transparent">
                Start Operating.
              </span>
            </h3>

            <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              ALEC doesn't just replace manual work. It transforms how your business operates.
              Less admin. More growth. That's the difference.
            </p>

            <div className="relative inline-block group">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-coral rounded-2xl opacity-40 group-hover:opacity-70 blur-lg transition-opacity duration-700" />
              <button
                onClick={handleScroll}
                className="relative inline-flex items-center gap-3 px-10 py-5 md:px-14 md:py-6 bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-coral rounded-2xl text-white font-bold text-lg md:text-xl tracking-wide shadow-2xl hover:shadow-brand-purple/30 transition-all duration-500 hover:scale-[1.03]"
              >
                <span>Get Your Free Assessment</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>

            <p className="mt-6 text-sm text-slate-500">48-hour assessment turnaround</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
