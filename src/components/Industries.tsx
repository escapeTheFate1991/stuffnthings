'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const industries = [
  {
    name: 'Roofing',
    fullName: 'Roofing & Home Services',
    headline: 'Turn storm-chaser leads into booked inspections.',
    description: 'Before your competitor answers the phone. AI-powered scheduling, automated follow-ups, and a site that converts visitors into booked jobs — not just pageviews.',
    color: 'text-brand-cyan',
    borderColor: 'border-brand-cyan/50',
    bgGlow: 'bg-brand-cyan',
    gradient: 'from-brand-cyan to-blue-500',
    mockup: '/images/sections/industry-roofing.png',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    name: 'Medical',
    fullName: 'Medical & Dental',
    headline: 'Fill cancellations automatically.',
    description: 'Let patients book without calling your front desk. AI handles appointment reminders, review requests, and no-show follow-ups while your team focuses on care.',
    color: 'text-brand-purple',
    borderColor: 'border-brand-purple/50',
    bgGlow: 'bg-brand-purple',
    gradient: 'from-brand-purple to-pink-500',
    mockup: '/images/sections/industry-medical.png',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
  {
    name: 'Legal',
    fullName: 'Legal & Professional',
    headline: 'Qualify leads before they hit your inbox.',
    description: 'AI handles intake so your team handles cases. Smart forms pre-qualify prospects, route them to the right attorney, and follow up when they go quiet.',
    color: 'text-brand-coral',
    borderColor: 'border-brand-coral/50',
    bgGlow: 'bg-brand-coral',
    gradient: 'from-brand-coral to-red-500',
    mockup: null,
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
      </svg>
    ),
  },
  {
    name: 'Restaurants',
    fullName: 'Restaurants & Hospitality',
    headline: 'Online ordering on autopilot.',
    description: 'Reservation management, review responses, and menu updates — all automated. Your site works the late shift so your team doesn\'t have to.',
    color: 'text-brand-green',
    borderColor: 'border-brand-green/50',
    bgGlow: 'bg-brand-green',
    gradient: 'from-brand-green to-emerald-400',
    mockup: null,
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.379a48.474 48.474 0 00-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265z" />
      </svg>
    ),
  },
  {
    name: 'Construction',
    fullName: 'Construction & Trades',
    headline: 'Your work speaks for itself.',
    description: 'Your website should too. Project galleries with before/after sliders, AI-powered quote calculators, and automated review collection.',
    color: 'text-brand-cyan',
    borderColor: 'border-brand-cyan/50',
    bgGlow: 'bg-brand-cyan',
    gradient: 'from-brand-cyan to-blue-500',
    mockup: null,
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.42 15.17l-5.1-5.1m0 0L12 4.37m-5.68 5.7h11.8M4.26 19.72a9 9 0 1115.48 0" />
      </svg>
    ),
  },
  {
    name: 'Real Estate',
    fullName: 'Real Estate',
    headline: 'AI-powered property matching.',
    description: 'Automated follow-ups that close deals while you show homes. Smart property search, virtual tour integration, and lead scoring that never sleeps.',
    color: 'text-brand-green',
    borderColor: 'border-brand-green/50',
    bgGlow: 'bg-brand-green',
    gradient: 'from-brand-green to-emerald-400',
    mockup: null,
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
  },
]

export default function Industries() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [activeIndex, setActiveIndex] = useState(0)
  const active = industries[activeIndex]

  return (
    <section id="industries" ref={sectionRef} className="py-16 md:py-28 lg:py-36 relative overflow-hidden">
      {/* Edge glow lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-green/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-coral/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-900/30 to-black" />

      {/* Aurora orbs */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-brand-cyan/[0.06] blur-[120px]"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[10%] right-[-8%] w-[600px] h-[600px] rounded-full bg-brand-purple/[0.06] blur-[130px]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h2 className="section-heading mb-6">
              <span className="text-white">Built For</span>{' '}
              <span className="gradient-text">Your Industry</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="section-subtext">
              We don&apos;t build generic websites. Every site is tailored to how your
              industry actually works.
            </p>
          </motion.div>
        </div>

        {/* Tab bar */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {industries.map((industry, i) => (
            <button
              key={industry.name}
              onClick={() => setActiveIndex(i)}
              className={`relative px-4 py-2 md:px-5 md:py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${activeIndex === i
                  ? `text-white bg-white/[0.08] border border-white/20`
                  : 'text-slate-400 border border-transparent hover:text-white hover:border-white/10'
                }`}
            >
              {industry.name}
              {activeIndex === i && (
                <motion.div
                  layoutId="activeTab"
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-8 bg-gradient-to-r ${industry.gradient} rounded-full`}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Featured showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
          >
            {/* Left — text content */}
            <div className="order-2 md:order-1">
              <div className={`${active.color} mb-4`}>
                {active.icon}
              </div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-3 font-display">
                {active.fullName}
              </h3>
              <p className={`text-xl md:text-2xl font-bold mb-4 bg-gradient-to-r ${active.gradient} bg-clip-text text-transparent`}>
                {active.headline}
              </p>
              <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-8">
                {active.description}
              </p>
              <a
                href="#contact"
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border ${active.borderColor} ${active.color} text-sm font-semibold hover:bg-white/[0.05] transition-all duration-300 group`}
              >
                Get Started
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>

            {/* Right — mockup or gradient placeholder */}
            <div className="order-1 md:order-2">
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl aspect-[4/3]">
                {active.mockup ? (
                  <Image
                    src={active.mockup}
                    alt={`${active.fullName} website mockup`}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-br ${active.gradient} opacity-10`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`${active.color} opacity-30 scale-[3]`}>
                        {active.icon}
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="h-2 w-3/4 bg-white/10 rounded mb-2" />
                      <div className="h-2 w-1/2 bg-white/10 rounded mb-2" />
                      <div className="h-2 w-2/3 bg-white/10 rounded" />
                    </div>
                  </div>
                )}
                {/* Glow overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none`} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
