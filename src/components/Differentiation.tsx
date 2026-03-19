'use client'

import { useRef } from 'react'
import { useScrollReveal } from '@/lib/hooks'
import { motion, useInView } from 'framer-motion'

const differentiators = [
  {
    title: 'Private Skills Repository',
    description: 'Custom, secure agent capabilities that never leave your infrastructure. Build proprietary workflows that give you competitive advantages.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    gradient: 'from-purple-500 to-indigo-600',
    features: [
      'Self-hosted deployment options',
      'Zero data exfiltration',
      'Custom business logic',
      'Proprietary workflow automation'
    ]
  },
  {
    title: 'Security-First Architecture',
    description: 'Enterprise-grade encryption with self-hosted options. No data sent to third parties. Complete control over your business intelligence.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    gradient: 'from-green-500 to-emerald-600',
    features: [
      'End-to-end encryption',
      'Air-gapped deployment',
      'SOC 2 compliance ready',
      'GDPR compliant by design'
    ]
  },
  {
    title: 'MCP Framework',
    description: 'Model Context Protocol for standardized, auditable tool access. Every integration is transparent, secure, and follows industry best practices.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    gradient: 'from-cyan-500 to-blue-600',
    features: [
      'Standardized tool protocols',
      'Auditable integration logs',
      'Version-controlled access',
      'Granular permission control'
    ]
  },
  {
    title: 'Multi-Model Support',
    description: 'Not locked to one AI provider. Use OpenAI, Claude, Gemini, or local models. Switch anytime. Your business logic stays independent.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    gradient: 'from-orange-500 to-red-600',
    features: [
      'Provider-agnostic architecture',
      'Cost optimization routing',
      'Automatic failover',
      'Model performance analytics'
    ]
  }
]

const comparison = {
  them: {
    title: 'ChatGPT, Claude, Gemini',
    subtitle: 'Consumer Chat Products',
    limitations: [
      'No business context memory',
      'Cannot access your tools',
      'Manual copy-paste workflows',
      'No automation capabilities',
      'Generic responses only',
      'Data sent to third parties'
    ]
  },
  us: {
    title: 'ALEC by Stuff N Things',
    subtitle: 'Business Automation Platform',
    capabilities: [
      'Full business context awareness',
      'Direct tool integration & orchestration',
      'End-to-end workflow automation',
      'Autonomous decision-making',
      'Custom business logic',
      'Private infrastructure options'
    ]
  }
}

export default function Differentiation() {
  const sectionRef = useScrollReveal<HTMLElement>()
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section id="differentiation" ref={sectionRef} className="py-16 md:py-28 lg:py-36 relative overflow-hidden bg-black">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-black to-neutral-950" />
      
      {/* Aurora orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] right-[-12%] w-[600px] h-[600px] rounded-full bg-brand-purple/[0.05] blur-[140px]"
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[15%] left-[-12%] w-[500px] h-[500px] rounded-full bg-brand-cyan/[0.06] blur-[120px]"
      />

      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h2 className="section-heading mb-6">
              <span className="text-white">They Integrate Tools.</span>{' '}
              <span className="gradient-text">We Integrate Your Business.</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="section-subtext">
              Move beyond basic chat interfaces. Get ALEC that understands your business, automates your workflows, and grows with your company.
            </p>
          </motion.div>
        </div>

        {/* Key Differentiators */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 md:mb-20">
          {differentiators.map((diff, index) => (
            <motion.div
              key={diff.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] transition-all duration-300 h-full">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${diff.gradient} flex items-center justify-center text-white mb-4 group-hover:scale-105 transition-transform duration-300`}>
                  {diff.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3 font-display">{diff.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{diff.description}</p>

                {/* Features */}
                <div className="space-y-2">
                  {diff.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-500">
                      <div className="w-1 h-1 rounded-full bg-brand-green" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Them */}
            <div className="relative p-6 rounded-2xl border border-red-500/20 bg-red-500/[0.02]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div>
                  <h3 className="text-xl font-bold text-white font-display">{comparison.them.title}</h3>
                  <p className="text-red-400 text-sm">{comparison.them.subtitle}</p>
                </div>
              </div>

              <div className="space-y-3">
                {comparison.them.limitations.map((limitation, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <svg className="w-4 h-4 text-red-500/60 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-sm text-slate-400">{limitation}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Us */}
            <div className="relative p-6 rounded-2xl border border-brand-green/20 bg-brand-green/[0.02]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-brand-green" />
                <div>
                  <h3 className="text-xl font-bold text-white font-display">{comparison.us.title}</h3>
                  <p className="text-brand-green text-sm">{comparison.us.subtitle}</p>
                </div>
              </div>

              <div className="space-y-3">
                {comparison.us.capabilities.map((capability, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <svg className="w-4 h-4 text-brand-green mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-slate-300">{capability}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-brand-cyan/10 to-brand-purple/10 border border-white/[0.08]">
              <svg className="w-5 h-5 text-brand-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-sm text-slate-300">
                <span className="text-white font-semibold">This Isn't Extra. It's Built In.</span> -- every partnership includes ALEC at no extra cost
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-3">
              Every engagement includes full ALEC operations -- not a chatbot add-on. While others charge $200--500/month for basic automation, we deliver end-to-end workflow intelligence as part of every partnership.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}