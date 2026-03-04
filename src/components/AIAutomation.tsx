'use client'

import { useCallback } from 'react'
import { useScrollReveal } from '@/lib/hooks'

const capabilities = [
  {
    icon: (
      <svg className="w-8 h-8 text-brand-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
      </svg>
    ),
    title: 'AI Content That Sounds Like You',
    description: 'Social posts, blog articles, ad copy — all written in your brand voice and scheduled automatically. Your content calendar fills itself while you focus on what you do best.',
    tag: 'Content',
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
              AI Built Into Every Layer
            </span>
          </div>
          <div className="reveal stagger-1">
            <h2 className="section-heading mb-6">
              <span className="text-white">Your Site Gets</span>
              <br />
              <span className="gradient-text">Smarter Every Week.</span>
            </h2>
          </div>
          <div className="reveal stagger-2">
            <p className="section-subtext">
              Most agencies build your site and vanish. We wire AI into the foundation —
              content creation, lead capture, performance monitoring —
              so it keeps improving long after launch day.
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
              Content goes out on schedule. Leads get captured the second they show interest.
              Performance stays dialed. You get a monthly report showing everything that happened —
              no dashboard login required.
            </p>
            <button
              onClick={handleCTAClick}
              className="btn btn-primary text-lg px-10 py-5"
            >
              See What We Can Automate
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
