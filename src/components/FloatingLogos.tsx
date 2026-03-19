'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

const logos = [
  { name: 'Claude', color: '#d4a574', startX: -300, startY: -200 },
  { name: 'GPT-4', color: '#74aa9c', startX: 350, startY: -180 },
  { name: 'Gemini', color: '#4285f4', startX: -250, startY: 50 },
  { name: 'Perplexity', color: '#20b8cd', startX: 280, startY: 80 },
  { name: 'Grok', color: '#e8e8e8', startX: -200, startY: 200 },
  { name: 'OpenClaw', color: '#f97316', startX: 200, startY: 180 },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.4 }
  }
}

const logoVariants = {
  hidden: { opacity: 0, scale: 0.3 },
  visible: { opacity: 1, scale: 1 }
}

export default function FloatingLogos() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -60])

  // Position logos in a constellation pattern
  const positions = [
    { top: '12%', left: '10%' },
    { top: '8%', right: '12%' },
    { top: '45%', left: '5%' },
    { top: '40%', right: '8%' },
    { bottom: '18%', left: '15%' },
    { bottom: '22%', right: '10%' },
  ]

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[500px] md:min-h-[600px] flex items-center justify-center">

        {/* Floating logo constellation -- desktop only */}
        <motion.div
          className="absolute inset-0 hidden md:block"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {logos.map((logo, i) => (
            <motion.div
              key={logo.name}
              className="absolute"
              style={positions[i]}
              variants={logoVariants}
              transition={{ type: "spring", stiffness: 80, damping: 15, delay: i * 0.1 }}
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
                className="px-5 py-3 rounded-2xl backdrop-blur-md border border-white/[0.12] bg-white/[0.05] shadow-2xl cursor-default transition-transform hover:scale-110 duration-300"
                style={{
                  boxShadow: `0 0 30px ${logo.color}25, 0 0 60px ${logo.color}10`,
                }}
              >
                <span
                  className="text-sm font-bold tracking-wider"
                  style={{ color: logo.color }}
                >
                  {logo.name}
                </span>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Center content */}
        <div className="text-center relative z-10 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="uppercase tracking-[0.2em] text-xs md:text-sm text-brand-cyan/80 font-semibold mb-6">
              Powered by the Best
            </p>
            <h3 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-6 font-display tracking-tight leading-[1.1]">
              Built on the world&apos;s{' '}
              <span className="gradient-text">most powerful AI</span>
            </h3>
          </motion.div>

          <motion.p
            className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Every site we build runs on enterprise-grade AI -- from content generation
            to workflow automation to real-time monitoring.
          </motion.p>

          {/* CTA */}
          <motion.a
            href="#services"
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-brand-cyan/30 text-brand-cyan text-sm font-semibold hover:bg-brand-cyan/10 transition-all duration-300 group"
          >
            See Our AI Stack
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </motion.a>

          {/* Mobile: show logos inline */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mt-10 md:hidden"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {logos.map((logo) => (
              <motion.span
                key={logo.name}
                variants={logoVariants}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                className="px-4 py-2 rounded-xl text-xs font-bold backdrop-blur-md border border-white/[0.1] bg-white/[0.05]"
                style={{ color: logo.color, boxShadow: `0 0 15px ${logo.color}20` }}
              >
                {logo.name}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
