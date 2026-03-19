'use client'

import { useRef } from 'react'
import { useScrollReveal } from '@/lib/hooks'
import { motion, useInView } from 'framer-motion'

const useCases = [
  {
    title: 'Operations Assistant',
    subtitle: 'Full-Time Digital Employee',
    description: 'Always-on ALEC deployment that clears inboxes, drafts replies, routes messages, updates CRMs, and manages admin tasks.',
    features: [
      'Email triage and auto-responses',
      'CRM data entry and updates',
      'Meeting scheduling and calendar management',
      'Document processing and filing',
      'Customer inquiry routing'
    ],
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
    description: 'Lead research and enrichment from email, website, and LinkedIn. Qualification and automatic follow-up sequences. ALEC routes inbound interest and books demos.',
    features: [
      'Automated lead enrichment',
      'Smart qualification workflows',
      'Follow-up sequence automation',
      'Demo booking and scheduling',
      'Pipeline stage management'
    ],
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
    description: 'ALEC keeps social accounts active by drafting posts and repurposing content. Updates websites with new offers and handles SEO research tasks.',
    features: [
      'Social media post generation',
      'Content repurposing automation',
      'Website content updates',
      'SEO research and optimization',
      'Analytics data collection'
    ],
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
    description: 'Consolidated reporting across tools like GA, Ads, CRM, and project tools. Daily and weekly briefs delivered in Slack, Teams, or Telegram.',
    features: [
      'Cross-platform data aggregation',
      'Automated report generation',
      'Real-time performance alerts',
      'Natural language analytics',
      'Custom dashboard creation'
    ],
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
    description: 'Private knowledge base for SOPs, contracts, and tech docs. Internal Q&A access through Slack, Teams, or WhatsApp from your knowledge bases.',
    features: [
      'Document ingestion and indexing',
      'Conversational knowledge search',
      'Multi-channel Q&A access',
      'Self-hosted deployment options',
      'Privacy-first architecture'
    ],
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
    description: 'Invoice intake, categorization, budget matching, and payment queues. Expense report triage and compliance checks via omni-channel agents.',
    features: [
      'Invoice processing automation',
      'Expense report management',
      'Budget tracking and alerts',
      'Compliance verification',
      'Multi-channel communication'
    ],
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
              <span className="text-white">ALEC at</span>{' '}
              <span className="gradient-text">Work</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="section-subtext">
              Real automation for real businesses. No demos, no pilots -- production-ready ALEC deployments that handle your daily workflows from day one.
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
              className="reveal"
            >
              <div className="relative p-6 rounded-2xl border border-slate-800 bg-slate-900/50 hover:border-brand-cyan/50 transition-all duration-300 h-full flex flex-col group">
                {/* Icon */}
                <div className="w-8 h-8 text-brand-cyan mb-4 reveal-scale">
                  {useCase.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-2">{useCase.title}</h3>
                
                {/* Description */}
                <p className="text-sm text-slate-400 mb-4 leading-relaxed">{useCase.description}</p>

                {/* Capabilities List */}
                <div className="space-y-2 mb-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">Key Capabilities</p>
                  {useCase.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan mt-1.5 flex-shrink-0" />
                      <span className="text-sm text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-cyan/5 to-brand-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}