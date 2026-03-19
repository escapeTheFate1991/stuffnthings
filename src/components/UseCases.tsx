'use client'

import { useState, useRef } from 'react'
import { useScrollReveal } from '@/lib/hooks'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const useCases = [
  {
    title: 'AI Operations Assistant',
    subtitle: 'Full-Time Digital Employee',
    description: 'Always-on assistant that clears inboxes, drafts replies, routes messages, updates CRMs, and manages admin tasks. Nudges humans when decisions are needed.',
    features: [
      'Email triage and auto-responses',
      'CRM data entry and updates',
      'Meeting scheduling and calendar management',
      'Document processing and filing',
      'Customer inquiry routing',
      'Task delegation and follow-ups'
    ],
    roles: ['AI receptionist', 'ops assistant', 'marketing VA', 'PM assistant'],
    gradient: 'from-blue-500 to-cyan-400',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
  },
  {
    title: 'Revenue Automation',
    subtitle: 'Close Deals While You Sleep',
    description: 'Lead research and enrichment from email, website, and LinkedIn. Qualification and automatic follow-up sequences. Agent routes inbound interest, qualifies, and books demos.',
    features: [
      'Automated lead enrichment',
      'Smart qualification workflows',
      'Follow-up sequence automation',
      'Demo booking and scheduling',
      'Pipeline stage management',
      'Proposal generation and delivery'
    ],
    roles: ['sales assistant', 'lead qualifier', 'demo scheduler', 'pipeline manager'],
    gradient: 'from-green-500 to-emerald-400',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
      </svg>
    )
  },
  {
    title: 'Marketing Autopilot',
    subtitle: 'Content That Never Stops',
    description: 'Keeping social accounts active by drafting posts and repurposing content. Updates websites with new offers. SEO and research tasks: scraping analytics, summarizing insights, proposing content topics.',
    features: [
      'Social media post generation',
      'Content repurposing automation',
      'Website content updates',
      'SEO research and optimization',
      'Analytics data collection',
      'Campaign performance reporting'
    ],
    roles: ['content creator', 'social manager', 'SEO analyst', 'campaign manager'],
    gradient: 'from-purple-500 to-pink-400',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    )
  },
  {
    title: 'Reporting & Intelligence',
    subtitle: 'Data-Driven Decisions',
    description: 'Consolidated reporting across tools (GA, Ads, CRM, project tools). Daily and weekly briefs delivered in Slack, Teams, or Telegram. Natural-language queries over marketing, sales, or ops metrics.',
    features: [
      'Cross-platform data aggregation',
      'Automated report generation',
      'Real-time performance alerts',
      'Natural language analytics',
      'Custom dashboard creation',
      'Predictive trend analysis'
    ],
    roles: ['business analyst', 'data scientist', 'report generator', 'insights advisor'],
    gradient: 'from-orange-500 to-red-400',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  },
  {
    title: 'Knowledge Assistant',
    subtitle: 'Chat Over Your Docs',
    description: 'Private knowledge base for SOPs, contracts, and tech docs. Internal Q&A in Slack, Teams, or WhatsApp from your knowledge bases. Self-hosted models for privacy -- data never leaves your infrastructure.',
    features: [
      'Document ingestion and indexing',
      'Conversational knowledge search',
      'Multi-channel Q&A access',
      'Self-hosted deployment options',
      'Privacy-first architecture',
      'Custom knowledge workflows'
    ],
    roles: ['knowledge curator', 'documentation assistant', 'support agent', 'training coordinator'],
    gradient: 'from-indigo-500 to-blue-400',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )
  },
  {
    title: 'Back-Office Automation',
    subtitle: 'Administrative Excellence',
    description: 'Invoice intake, categorization, budget matching, and payment queues. Expense report triage and compliance checks. Phone and omni-channel agents (WhatsApp, Slack, Telegram, email).',
    features: [
      'Invoice processing automation',
      'Expense report management',
      'Budget tracking and alerts',
      'Compliance verification',
      'Multi-channel communication',
      'Financial workflow optimization'
    ],
    roles: ['finance assistant', 'compliance officer', 'admin coordinator', 'payment processor'],
    gradient: 'from-teal-500 to-green-400',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  }
]

export default function UseCases() {
  const sectionRef = useScrollReveal<HTMLElement>()
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [activeCase, setActiveCase] = useState(0)

  return (
    <section id="use-cases" ref={sectionRef} className="py-16 md:py-28 lg:py-36 relative overflow-hidden bg-black">
      {/* Aurora orbs */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] right-[-8%] w-[500px] h-[500px] rounded-full bg-brand-purple/[0.06] blur-[120px]"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[10%] left-[-8%] w-[600px] h-[600px] rounded-full bg-brand-cyan/[0.05] blur-[130px]"
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
              <span className="text-white">AI That</span>{' '}
              <span className="gradient-text">Actually Works</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="section-subtext">
              Real automation for real businesses. No demos, no pilots -- production-ready AI that handles your daily workflows from day one.
            </p>
          </motion.div>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setActiveCase(index)}
            >
              <div className="relative p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] transition-all duration-300 h-full flex flex-col">
                {/* Icon & Gradient */}
                <div className={`relative w-16 h-16 rounded-xl bg-gradient-to-br ${useCase.gradient} flex items-center justify-center text-white mb-4 group-hover:scale-105 transition-transform duration-300`}>
                  {useCase.icon}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2 font-display">{useCase.title}</h3>
                  <p className={`text-sm font-medium mb-3 bg-gradient-to-r ${useCase.gradient} bg-clip-text text-transparent`}>
                    {useCase.subtitle}
                  </p>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">{useCase.description}</p>

                  {/* Key Features */}
                  <div className="space-y-2 mb-4">
                    {useCase.features.slice(0, 3).map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-500">
                        <div className="w-1 h-1 rounded-full bg-brand-cyan" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Roles */}
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {useCase.roles.slice(0, 2).map((role, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-400"
                    >
                      {role}
                    </span>
                  ))}
                  {useCase.roles.length > 2 && (
                    <span className="text-xs px-2 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-400">
                      +{useCase.roles.length - 2}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Featured Use Case Detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCase}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="mt-12 md:mt-16"
          >
            <div className="max-w-4xl mx-auto">
              <div className={`relative p-8 rounded-2xl border border-white/[0.08] bg-gradient-to-br ${useCases[activeCase].gradient} bg-opacity-5`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${useCases[activeCase].gradient} opacity-[0.03] rounded-2xl`} />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${useCases[activeCase].gradient} flex items-center justify-center text-white`}>
                      {useCases[activeCase].icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white font-display">{useCases[activeCase].title}</h3>
                      <p className={`text-sm font-medium bg-gradient-to-r ${useCases[activeCase].gradient} bg-clip-text text-transparent`}>
                        {useCases[activeCase].subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* All Features */}
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">What It Does</h4>
                      <div className="space-y-3">
                        {useCases[activeCase].features.map((feature, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <svg className="w-4 h-4 text-brand-green mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm text-slate-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* All Roles */}
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">Replaces These Roles</h4>
                      <div className="flex flex-wrap gap-2">
                        {useCases[activeCase].roles.map((role, i) => (
                          <span
                            key={i}
                            className="text-sm px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-slate-300"
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}