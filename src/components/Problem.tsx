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

  const opportunities = [
    {
      icon: (
        <svg className="w-10 h-10 text-brand-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Reclaim Your Team\'s Best Hours',
      description: "Every business has a layer of repetitive, process-driven work—answering the same common questions, re-entering data across systems, manually routing inquiries. These tasks are necessary, but they don't require your team's expertise. When you automate the routine, your people get their time back for client relationships, strategy, and creative problem-solving.",
      stat: 'Research suggests that knowledge workers spend roughly 60% of their day on operational tasks rather than the skilled work they were hired to do.',
      revealClass: 'reveal-slide-left',
    },
    {
      icon: (
        <svg className="w-10 h-10 text-brand-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
        </svg>
      ),
      title: 'Move Beyond First-Generation AI',
      description: "If you've tried a chatbot or a basic workflow tool and walked away unimpressed—you're not alone. Early AI solutions often lacked the depth to handle real business logic. The technology has matured significantly. Today's AI agents can manage complex, multi-step processes with the reliability your operations demand. The question isn't whether AI works—it's whether you're working with the right framework.",
      stat: '',
      revealClass: 'reveal',
    },
    {
      icon: (
        <svg className="w-10 h-10 text-brand-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 010 0L21.75 9M21.75 9H18M21.75 9v3.75" />
        </svg>
      ),
      title: 'Scale Without Proportional Overhead',
      description: "Growth should be exciting, not exhausting. When every new client or order means hiring and training another team member, your margins shrink as your revenue grows. Intelligent automation creates operational leverage—the ability to handle significantly more volume without a proportional increase in headcount or cost.",
      stat: 'Organizations leveraging AI-driven operations have reported operational cost reductions of up to 40–60% in targeted workflows.',
      revealClass: 'reveal-slide-right',
    },
  ]

  const handleScroll = useCallback(() => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <section id="opportunity" ref={sectionRef} className="py-16 md:py-28 lg:py-36 relative overflow-hidden bg-black">
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
              <span className="text-white">Your Team Is Capable of More.</span>
              <br />
              <span className="gradient-text-warm">The System Is Holding Them Back.</span>
            </h2>
          </div>
          <div className="reveal stagger-1">
            <p className="section-subtext">
              Most businesses aren&apos;t struggling because of their people—they&apos;re struggling because talented people are spending too much of their day on low-leverage work. The opportunity isn&apos;t to replace your workforce. It&apos;s to redirect their energy toward the high-impact work that drives real growth.
            </p>
          </div>
        </div>

        {/* Opportunities */}
        <div className="max-w-4xl mx-auto space-y-0">
          {opportunities.map((opportunity, index) => (
            <div key={index}>
              <div className={`${opportunity.revealClass} stagger-${index + 1} py-10`}>
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-shrink-0">{opportunity.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-3 font-display">{opportunity.title}</h3>
                    <p className="text-slate-400 leading-relaxed mb-4">{opportunity.description}</p>
                    {opportunity.stat && <p className="text-brand-cyan/80 font-semibold text-sm">{opportunity.stat}</p>}
                  </div>
                </div>
              </div>
              {index < opportunities.length - 1 && <div className="gradient-divider" />}
            </div>
          ))}
        </div>
      </div>

      {/* ── Immersive CTA — Expand-from-center scroll reveal ── */}
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

        {/* Content — fades in after background expands */}
        <motion.div
          className="relative py-24 md:py-36 lg:py-44"
          style={{ opacity: contentOpacity, y: contentY }}
        >
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

            <div className="relative inline-block group">
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

            <p className="mt-6 text-sm text-slate-500">Free download</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
