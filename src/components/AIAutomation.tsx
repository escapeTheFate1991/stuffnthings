'use client'

import { useCallback } from 'react'
import { useScrollReveal } from '@/lib/hooks'
import AnimatedStreaks from './AnimatedStreaks'

const capabilities = [
  {
    icon: (
      <svg className="w-8 h-8 text-brand-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Operational Reliability',
    description: 'OpenClaw agents don\'t just respond--they execute. They navigate your software, manage your CRM, and carry out multi-step workflows with the consistency your team and customers expect.',
    tag: 'Reliability',
  },
  {
    icon: (
      <svg className="w-8 h-8 text-brand-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.01v.008H12v-.008z" />
      </svg>
    ),
    title: 'Institutional Memory',
    description: 'Your business rules, brand voice, customer history--OpenClaw agents retain context across interactions. They learn how your business operates and maintain that understanding over time.',
    tag: 'Memory',
  },
  {
    icon: (
      <svg className="w-8 h-8 text-brand-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    title: 'Security-First Architecture',
    description: 'Your data stays private. Our agents are deployed with enterprise-grade security practices--no data leaks, no unnecessary exposure. Just structured, secure logic doing the work.',
    tag: 'Security',
  },
]

export default function AIAutomation() {
  const sectionRef = useScrollReveal<HTMLElement>()

  const handleCTAClick = useCallback(() => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <section id="ai" ref={sectionRef} className="py-16 md:py-28 lg:py-36 relative overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-900/20 to-black" />
      <AnimatedStreaks opacity={0.1} />
      {/* Aurora orbs */}
      <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-brand-cyan/[0.08] blur-[120px] animate-aurora-1" />
      <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-brand-purple/[0.08] blur-[100px] animate-aurora-2" />
      <div className="absolute top-[50%] left-[40%] w-[400px] h-[400px] rounded-full bg-brand-green/[0.05] blur-[120px] animate-aurora-3" />
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />
      {/* Edge glow lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-purple/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="reveal">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6">
              <span className="gradient-text">Thoughtful Engineering.</span>
              <br />
              <span className="text-white">Measurable Results.</span>
            </h2>
          </div>
          <div className="reveal stagger-2">
            <p className="section-subtext">
              We don&apos;t take shortcuts. Every automation we build runs on OpenClaw--a purpose-built framework for autonomous AI agents that goes well beyond what generic tools can offer.
            </p>
          </div>
        </div>

        {/* Capabilities Grid -- 3 cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {capabilities.map((cap, index) => (
            <div key={index} className={`reveal stagger-${index + 1}`}>
              <div className="group relative bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-8 hover:border-brand-cyan/30 hover:shadow-xl hover:shadow-brand-cyan/5 transition-all duration-500 h-full">
                {/* Tag */}
                <span className="absolute top-6 right-6 text-[10px] font-bold tracking-widest uppercase text-brand-cyan/60">
                  {cap.tag}
                </span>

                {/* Icon */}
                <div className="mb-5 group-hover:scale-110 transition-transform duration-300">
                  {cap.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3 font-display">{cap.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{cap.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA -- no card wrapper */}
        <div className="reveal text-center max-w-3xl mx-auto mt-8">
          <div className="relative inline-block group">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-cyan to-brand-purple rounded-xl opacity-40 group-hover:opacity-70 blur-lg transition-opacity duration-700" />
            <button
              onClick={handleCTAClick}
              className="relative btn btn-primary text-lg px-10 py-5"
            >
              Request Your Efficiency Assessment
              <svg className="inline-block ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
