'use client'

import { useCallback } from 'react'
import { useScrollReveal } from '@/lib/hooks'

const capabilities = [
  {
    icon: '🤖',
    title: 'AI Content Generation',
    description: 'We generate on-brand social posts, blog drafts, and ad copy tuned to your voice — then schedule them automatically. Your content writes itself while you focus on running your business.',
    tag: 'Content',
  },
  {
    icon: '🎯',
    title: 'Smart Lead Capture',
    description: 'AI-powered forms that qualify visitors in real-time, route hot leads to your inbox instantly, and follow up automatically if they go cold. No lead falls through the cracks.',
    tag: 'Leads',
  },
  {
    icon: '📈',
    title: 'Performance Monitoring',
    description: 'Continuous monitoring of speed, SEO, and uptime. When something drifts, our systems detect it and fix it — often before you even notice. Monthly reports show exactly what\u2019s working.',
    tag: 'Monitoring',
  },
]

export default function AIAutomation() {
  const sectionRef = useScrollReveal<HTMLElement>()

  const handleCTAClick = useCallback(() => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <section id="ai" ref={sectionRef} className="py-16 md:py-28 lg:py-36 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/30 to-slate-950" />
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-cyan/[0.04] blur-[120px]" />
      <div className="absolute bottom-[10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-brand-purple/[0.04] blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="reveal">
            <span className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 text-sm font-medium text-brand-cyan border border-brand-cyan/20 mb-8">
              <span className="w-2 h-2 bg-brand-cyan rounded-full animate-pulse" />
              AI-Powered — Not Just a Buzzword
            </span>
          </div>
          <div className="reveal stagger-1">
            <h2 className="section-heading mb-6">
              <span className="text-white">Your Website Runs on</span>
              <br />
              <span className="gradient-text">Intelligence.</span>
            </h2>
          </div>
          <div className="reveal stagger-2">
            <p className="section-subtext">
              Most agencies build your site and disappear. We embed AI into every layer —
              content creation, lead capture, and performance monitoring —
              so your web presence gets smarter every week, not stale.
            </p>
          </div>
        </div>

        {/* Capabilities Grid — 3 cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {capabilities.map((cap, index) => (
            <div key={index} className={`reveal stagger-${index + 1}`}>
              <div className="group relative bg-slate-800/40 border border-slate-700/50 rounded-2xl p-8 hover:border-brand-cyan/30 hover:shadow-xl hover:shadow-brand-cyan/5 transition-all duration-500 h-full">
                {/* Tag */}
                <span className="absolute top-6 right-6 text-[10px] font-bold tracking-widest uppercase text-brand-cyan/60">
                  {cap.tag}
                </span>

                {/* Icon */}
                <div className="text-4xl mb-5 group-hover:scale-110 transition-transform duration-300">
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
              AI That <span className="gradient-text">Works While You Sleep.</span>
            </h3>
            <p className="text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
              Content goes out on schedule. Leads get captured automatically.
              Performance stays at peak. You get a monthly report showing exactly what happened —
              no login required.
            </p>
            <button
              onClick={handleCTAClick}
              className="btn btn-primary text-lg px-10 py-5"
            >
              See What AI Can Do For You
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
