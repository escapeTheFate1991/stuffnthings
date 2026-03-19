'use client'

import { useCallback } from 'react'
import { useScrollReveal } from '@/lib/hooks'

const steps = [
  {
    number: '01',
    title: 'The Efficiency Assessment',
    subtitle: 'We find where your team is spending time on routine tasks',
    description:
      'We start with a focused review of your current operations. Together, we identify the workflows where your team is spending the most time on routine tasks—and where intelligent automation will deliver the highest return. You'll receive a clear, prioritized roadmap within 48 hours.',
    timeline: '48 hours',
    deliverables: [
      'Workflow analysis & automation opportunities',
      'Time savings projections per workflow',
      'ROI estimates for AI implementation',
      'Prioritized automation roadmap',
      'Technology stack integration plan',
    ],
    color: 'from-brand-cyan to-blue-500',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Custom Agent Design & Deployment',
    subtitle: 'Built specifically for your tech stack and business processes',
    description:
      'Based on the assessment, we design and deploy custom AI agents built specifically for your tech stack and business processes. Whether it\'s automated customer engagement, intelligent lead qualification, or complex data orchestration across multiple platforms—every agent is engineered to integrate seamlessly.',
    timeline: '2-4 weeks',
    deliverables: [
      'Custom OpenClaw agent development',
      'Business process automation setup',
      'CRM & tool integrations',
      'Intelligent workflow orchestration',
      'Testing & quality assurance',
    ],
    color: 'from-brand-purple to-pink-500',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Continuous Optimization',
    subtitle: 'Your dedicated AI operations partner',
    description:
      'AI isn\'t a \'set it and forget it\' solution. We stay on as your dedicated AI operations partner—monitoring performance, refining agent logic, and proactively adapting the system as your business evolves.',
    timeline: 'Ongoing',
    deliverables: [
      'Performance monitoring & tuning',
      'Agent logic refinement',
      'New workflow development',
      'Monthly optimization reports',
      'Strategic business adaptation',
    ],
    color: 'from-brand-green to-emerald-400',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
]

export default function HowItWorks() {
  const sectionRef = useScrollReveal<HTMLElement>()

  const handleCTAClick = useCallback(() => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <section id="how-it-works" ref={sectionRef} className="py-16 md:py-28 lg:py-36 relative overflow-hidden">
      {/* Edge glow lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-purple/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-green/30 to-transparent" />
      {/* Aurora orbs — purple dominant */}
      <div className="absolute top-[10%] left-[-8%] w-[600px] h-[600px] rounded-full bg-brand-purple/[0.08] blur-[130px] animate-aurora-1" />
      <div className="absolute bottom-[15%] right-[-10%] w-[500px] h-[500px] rounded-full bg-brand-purple/[0.06] blur-[120px] animate-aurora-2" />
      <div className="absolute top-[50%] left-[30%] w-[400px] h-[400px] rounded-full bg-brand-cyan/[0.04] blur-[100px] animate-aurora-3" />
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="reveal">
            <h2 className="section-heading mb-6">
              <span className="text-white">How It</span>{' '}
              <span className="gradient-text">Works</span>
            </h2>
          </div>
          <div className="reveal stagger-1">
            <p className="section-subtext">
              Three steps. No jargon. We assess your operations, deploy custom AI agents, and continuously optimize the system as your business grows.
            </p>
          </div>
        </div>

        {/* Vertical Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical timeline line (desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-cyan via-brand-purple to-brand-green" />
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[3px] -translate-x-[1px] bg-gradient-to-b from-brand-cyan via-brand-purple to-brand-green opacity-20 blur-[4px]" />

          <div className="space-y-16 lg:space-y-24">
            {steps.map((step, index) => {
              const isLeft = index % 2 === 1
              const revealClass = index === 0 ? 'reveal-slide-right' : index === 1 ? 'reveal-slide-left' : 'reveal-slide-right'

              return (
                <div key={index} className={`${revealClass} relative`}>
                  {/* Timeline node (desktop) */}
                  <div className="hidden lg:flex absolute left-1/2 top-0 -translate-x-1/2 z-10">
                    <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-xl ring-4 ring-slate-950`}>
                      {step.icon}
                    </div>
                  </div>

                  <div className={`lg:grid lg:grid-cols-2 lg:gap-20 items-start`}>
                    {/* Content side */}
                    <div className={`${isLeft ? 'lg:col-start-1 lg:text-right lg:pr-16' : 'lg:col-start-2 lg:pl-16'}`}>
                      {/* Mobile icon */}
                      <div className="lg:hidden flex items-center gap-4 mb-6">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg`}>
                          {step.icon}
                        </div>
                        <span className={`text-5xl font-black bg-gradient-to-r ${step.color} bg-clip-text text-transparent opacity-30`}>
                          {step.number}
                        </span>
                      </div>

                      <div className={`hidden lg:block text-7xl font-black bg-gradient-to-r ${step.color} bg-clip-text text-transparent opacity-20 mb-2`}>
                        {step.number}
                      </div>

                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 font-display">{step.title}</h3>
                      <p className={`text-lg font-medium mb-4 bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}>
                        {step.subtitle}
                      </p>
                      <p className="text-slate-400 leading-relaxed mb-6">{step.description}</p>

                      {/* Deliverables — inline, no card wrapper */}
                      <div className={`${isLeft ? 'lg:text-right' : ''}`}>
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Deliverables</h4>
                          <span className={`text-sm font-semibold bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}>
                            {step.timeline}
                          </span>
                        </div>
                        <ul className={`space-y-2 ${isLeft ? 'lg:text-left' : ''}`}>
                          {step.deliverables.map((item, di) => (
                            <li key={di} className="flex items-center gap-3 text-sm text-slate-300">
                              <svg className="w-4 h-4 text-brand-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="reveal mt-20">
          <div className="relative rounded-2xl overflow-hidden max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan/5 via-brand-purple/10 to-brand-green/5" />
            <div className="relative glass rounded-2xl p-10 text-center border border-slate-700/50">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to See Where You Can Save Time?
              </h3>
              <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                The assessment is complimentary. Takes 48 hours. You get a detailed report — and it&apos;s yours whether you work with us or not.
              </p>
              <div className="relative inline-block group">
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-cyan to-brand-purple rounded-xl opacity-40 group-hover:opacity-70 blur-lg transition-opacity duration-700" />
                <button onClick={handleCTAClick} className="relative btn btn-primary text-lg px-10 py-5">
                  Request Your Efficiency Assessment
                  <svg className="inline-block ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
