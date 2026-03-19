'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const posts = [
  {
    title: "How AI Agents Are Replacing $17K/Month Operations Teams",
    excerpt: "Most businesses hire expensive operations teams to handle routine tasks. AI agents do the same work at a fraction of the cost with zero human errors.",
    slug: '/blog/ai-operations-cost-savings',
    image: '/images/sections/blog-cost.png',
    gradient: 'from-brand-cyan/30 to-blue-500/10',
    accentColor: '#22d3ee',
    tag: 'AI Operations',
  },
  {
    title: "5 AI Automations Every Growing Business Should Deploy First",
    excerpt: "Lead qualification, email triage, CRM updates, follow-up sequences, customer support. These AI capabilities are table stakes for modern businesses.",
    slug: '/blog/essential-ai-automations',
    image: '/images/sections/blog-ai.png',
    gradient: 'from-brand-purple/30 to-pink-500/10',
    accentColor: '#a855f7',
    tag: 'AI',
  },
  {
    title: "The Hidden Cost of Manual Processes (And How to Measure It)",
    excerpt: "Manual data entry, response delays, human errors, and context switching cost businesses 40+ hours per week. Here's how to calculate the real cost.",
    slug: '/blog/manual-process-costs',
    image: '/images/sections/blog-audit.png',
    gradient: 'from-brand-coral/30 to-red-500/10',
    accentColor: '#f97316',
    tag: 'Strategy',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
}

export default function BlogTeaser() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  const orbY1 = useTransform(scrollYProgress, [0, 1], [50, -50])
  const orbY2 = useTransform(scrollYProgress, [0, 1], [-30, 60])

  return (
    <section id="blog" ref={sectionRef} className="py-16 md:py-28 lg:py-36 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-900/20 to-black" />

      {/* Parallax aurora orbs */}
      <motion.div
        style={{ y: orbY1 }}
        className="absolute top-[15%] right-[-10%] w-[500px] h-[500px] rounded-full bg-brand-purple/[0.06] blur-[120px]"
      />
      <motion.div
        style={{ y: orbY2 }}
        className="absolute bottom-[10%] left-[-8%] w-[450px] h-[450px] rounded-full bg-brand-cyan/[0.04] blur-[110px]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="uppercase tracking-[0.2em] text-xs md:text-sm text-brand-cyan/80 font-semibold mb-4">
              From Our Blog
            </p>
            <h2 className="section-heading mb-4">
              <span className="text-white">Insights That</span>{' '}
              <span className="gradient-text">Actually Help</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="section-subtext">
              Practical insights on AI agent deployment and intelligent automation. No jargon, no fluff -- just
              what works.
            </p>
          </motion.div>
        </div>

        {/* Blog cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {posts.map((post) => (
            <motion.article
              key={post.slug}
              variants={cardVariants}
              transition={{ type: "spring", stiffness: 80, damping: 18 }}
              className="group"
            >
              <Link href={post.slug} className="block">
                <div className="rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm hover:border-white/[0.12] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                  {/* Image header */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${post.gradient} opacity-40 group-hover:opacity-20 transition-opacity duration-500`} />
                    {/* Tag */}
                    <div className="absolute top-3 left-3">
                      <span
                        className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md bg-black/40 border border-white/10"
                        style={{ color: post.accentColor }}
                      >
                        {post.tag}
                      </span>
                    </div>
                  </div>

                  {/* Text content */}
                  <div className="p-5 md:p-6">
                    <h3 className="text-lg md:text-xl font-bold text-white mb-3 leading-snug group-hover:text-brand-cyan transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <span
                      className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-300 group-hover:gap-3"
                      style={{ color: post.accentColor }}
                    >
                      Read More
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>

        {/* View All Blog Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Link
            href="/blog"
            className="inline-flex items-center px-8 py-3 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white font-semibold transition-all hover:scale-105 hover:border-brand-cyan/50"
          >
            Read the Latest Insights
            <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
