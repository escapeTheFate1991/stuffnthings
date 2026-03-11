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
    title: 'AI Workflow Automation',
    description: 'Repetitive tasks, customer follow-ups, internal routing — AI handles the busywork so your team stays focused on what actually moves the business forward.',
    tag: 'Automation',
  },
  {
    icon: (
      <svg className="w-8 h-8 text-brand-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    title: 'Leads That Don\'t Slip Away',
    description: 'Smart forms that qualify visitors on the spot, send hot leads straight to your inbox, and follow up automatically when someone goes quiet. Nothing falls through the cracks.',
    tag: 'Leads',
  },
  {
    icon: (
      <svg className="w-8 h-8 text-brand-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    title: 'Always Watching, Always Improving',
    description: 'Speed, SEO, uptime — we monitor it all around the clock. When something drifts, we catch it and fix it before you notice. Monthly reports show exactly what moved the needle.',
    tag: 'Monitoring',
  },
]

export default function AIAutomation() {
  const sectionRef = useScrollReveal<HTMLElement>()

  const handleCTAClick = useCallback(() => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <section id="ai" ref={sectionRef} className="py-16 md:py-28 lg:py-36 relative overflow-hidden bg-[#111827] rounded-3xl mx-4 my-8">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#111827] via-[#111827] to-[#111827]" />
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
            <p className="text-sm text-slate-400 tracking-widest uppercase mb-8">
              AI Built Into Every Layer
            </p>
          </div>
          <div className="reveal stagger-1">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6">
              <span className="text-white">Your Site Gets</span>
              <br />
              <span className="gradient-text">Smarter Every Week.</span>
            </h2>
          </div>
          <div className="reveal stagger-2">
            <p className="section-subtext">
              Most agencies build your site and vanish. We wire AI into the foundation —
              workflow automation, lead capture, performance monitoring —
              so it keeps improving long after launch day.
            </p>
          </div>
        </div>

        {/* Capabilities Grid — 3 cards */}
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

        {/* Bottom CTA */}
        <div className="reveal text-center">
          <div className="glass rounded-2xl border border-slate-700/30 p-10 md:p-14 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-display">
              This Isn&apos;t Extra. <span className="gradient-text">It&apos;s Built In.</span>
            </h3>
            <p className="text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
              Workflows run on autopilot. Leads get captured the second they show interest.
              Performance stays dialed. You get a monthly report showing everything that happened —
              no dashboard login required.
            </p>
            <div className="relative inline-block group">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-cyan to-brand-purple rounded-xl opacity-40 group-hover:opacity-70 blur-lg transition-opacity duration-700" />
              <button
                onClick={handleCTAClick}
                className="relative btn btn-primary text-lg px-10 py-5"
              >
                See What We Can Automate
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
