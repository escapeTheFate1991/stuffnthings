'use client'

import { useRef } from 'react'
import { useScrollReveal } from '@/lib/hooks'
import { motion, useInView } from 'framer-motion'

const integrationCategories = [
  {
    name: 'CRM',
    description: 'Native CRM bridges -- the #1 most-requested feature in the AI agent market',
    integrations: [
      { name: 'Salesforce', icon: '🏢' },
      { name: 'HubSpot', icon: '🟠' },
      { name: 'Pipedrive', icon: '🔶' },
      { name: 'Zoho', icon: '🟡' }
    ],
    gradient: 'from-blue-500 to-indigo-600'
  },
  {
    name: 'Communication',
    description: 'Multi-channel messaging and collaboration platforms',
    integrations: [
      { name: 'Slack', icon: '💬' },
      { name: 'Microsoft Teams', icon: '👥' },
      { name: 'WhatsApp', icon: '📱' },
      { name: 'Telegram', icon: '✈️' },
      { name: 'Discord', icon: '🎮' },
      { name: 'Email (SMTP/IMAP)', icon: '📧' }
    ],
    gradient: 'from-green-500 to-teal-600'
  },
  {
    name: 'Productivity',
    description: 'Document management and workspace integration',
    integrations: [
      { name: 'Gmail', icon: '📨' },
      { name: 'Google Docs', icon: '📝' },
      { name: 'Google Sheets', icon: '📊' },
      { name: 'Google Calendar', icon: '📅' },
      { name: 'Google Drive', icon: '💾' },
      { name: 'Microsoft 365', icon: '📋' },
      { name: 'Notion', icon: '📓' },
      { name: 'Confluence', icon: '🌐' }
    ],
    gradient: 'from-purple-500 to-pink-600'
  },
  {
    name: 'Marketing',
    description: 'Social media and content marketing platforms',
    integrations: [
      { name: 'Instagram', icon: '📷' },
      { name: 'TikTok', icon: '🎵' },
      { name: 'YouTube', icon: '📺' },
      { name: 'Facebook', icon: '👍' },
      { name: 'LinkedIn', icon: '💼' },
      { name: 'Twitter/X', icon: '🐦' }
    ],
    gradient: 'from-pink-500 to-rose-600'
  },
  {
    name: 'Development',
    description: 'Code repositories and deployment platforms',
    integrations: [
      { name: 'GitHub', icon: '🐙' },
      { name: 'GitLab', icon: '🦊' },
      { name: 'Vercel', icon: '▲' },
      { name: 'AWS', icon: '☁️' },
      { name: 'GCP', icon: '🌩️' },
      { name: 'Azure', icon: '🔵' }
    ],
    gradient: 'from-orange-500 to-red-600'
  },
  {
    name: 'Finance',
    description: 'Accounting and payment processing systems',
    integrations: [
      { name: 'QuickBooks', icon: '💰' },
      { name: 'Xero', icon: '📈' },
      { name: 'Stripe', icon: '💳' },
      { name: 'Square', icon: '⬜' }
    ],
    gradient: 'from-emerald-500 to-green-600'
  },
  {
    name: 'AI Models',
    description: 'Multiple AI providers for flexibility and redundancy',
    integrations: [
      { name: 'OpenAI GPT', icon: '🤖' },
      { name: 'Anthropic Claude', icon: '🎭' },
      { name: 'Google Gemini', icon: '💎' },
      { name: 'Local/Private (Ollama)', icon: '🔒' }
    ],
    gradient: 'from-cyan-500 to-blue-600'
  }
]

export default function Integrations() {
  const sectionRef = useScrollReveal<HTMLElement>()
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section id="integrations" ref={sectionRef} className="py-16 md:py-28 lg:py-36 relative overflow-hidden bg-neutral-950">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-black" />
      
      {/* Aurora orbs */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-brand-cyan/[0.08] blur-[100px]"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-brand-purple/[0.06] blur-[120px]"
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
              <span className="text-white">Your Tools.</span>{' '}
              <span className="gradient-text">Our Orchestration.</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="section-subtext mb-8">
              We don't just connect to your tools -- we orchestrate them. Every integration runs through our secure MCP (Model Context Protocol) framework, giving your AI agents the ability to read, write, and act across your entire tech stack.
            </p>
          </motion.div>
        </div>

        {/* Integration Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {integrationCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="group"
            >
              <div className="relative p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] transition-all duration-300">
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${category.gradient}`} />
                  <h3 className="text-xl font-bold text-white font-display">{category.name}</h3>
                </div>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                  {category.description}
                </p>

                {/* Integrations Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {category.integrations.map((integration, index) => (
                    <motion.div
                      key={integration.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: (categoryIndex * 0.1) + (index * 0.02) }}
                      className="group/item cursor-pointer"
                    >
                      <div className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.1] hover:bg-white/[0.04] transition-all duration-200">
                        <span className="text-lg flex-shrink-0">{integration.icon}</span>
                        <span className="text-xs text-slate-300 group-hover/item:text-white transition-colors duration-200 truncate">
                          {integration.name}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* MCP Framework Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-12 md:mt-16"
        >
          <div className="relative max-w-4xl mx-auto p-8 rounded-2xl border border-brand-cyan/20 bg-gradient-to-br from-brand-cyan/[0.05] to-brand-purple/[0.05]">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/[0.03] to-brand-purple/[0.03] rounded-2xl" />
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 mb-4">
                <svg className="w-4 h-4 text-brand-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                <span className="text-sm font-semibold text-brand-cyan">MCP Framework</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 font-display">
                Model Context Protocol
              </h3>
              <p className="text-slate-300 leading-relaxed max-w-2xl mx-auto">
                Every tool integration is built on MCP, providing standardized, secure, and auditable access patterns. Your AI agents don't just use tools -- they understand them, coordinate between them, and maintain context across your entire business ecosystem.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}