'use client'

import { useState, useCallback } from 'react'
import { useScrollReveal, useTilt } from '@/lib/hooks'

const categories = ['All', 'Consulting', 'SaaS', 'Day Care', 'Hotel', 'E-commerce', 'Warehouse']

const THUMB = 'https://image.thum.io/get/width/600/crop/350/wait/10'
const PORTFOLIO = 'https://escapethefate1991.github.io/stuffnthings/portfolio'

const projects = [
  {
    title: 'Pinnacle Strategy Group',
    category: 'Consulting',
    description: 'Authoritative consulting site featuring executive case studies, team credentials, and a trust-first design that positions expertise before the ask.',
    results: { Perf: '97', Access: '100', SEO: '98' },
    gradient: 'from-yellow-600 to-yellow-400',
    mockupAccent: 'bg-yellow-600/20',
    href: '/portfolio/consulting.html',
    image: `${THUMB}/${PORTFOLIO}/consulting.html`,
  },
  {
    title: 'FlowSync',
    category: 'SaaS',
    description: 'Full-featured SaaS landing page with animated feature cards, tiered pricing, and a frictionless trial sign-up flow optimised for qualified leads.',
    results: { Perf: '98', Access: '100', SEO: '99' },
    gradient: 'from-brand-cyan to-brand-purple',
    mockupAccent: 'bg-brand-cyan/20',
    href: '/portfolio/saas.html',
    image: `${THUMB}/${PORTFOLIO}/saas.html`,
  },
  {
    title: 'Sunshine Sprouts Day Care',
    category: 'Day Care',
    description: 'Warm, trust-first childcare site with program galleries, parent testimonials, and a tour-booking widget that turns visits into enrolments.',
    results: { Perf: '96', Access: '100', SEO: '97' },
    gradient: 'from-orange-500 to-yellow-400',
    mockupAccent: 'bg-orange-500/20',
    href: '/portfolio/daycare.html',
    image: `${THUMB}/${PORTFOLIO}/daycare.html`,
  },
  {
    title: 'The Bellevue Grand Hotel',
    category: 'Hotel',
    description: '5-star boutique hotel site with immersive room galleries, dining and spa experiences, and a booking engine that shortens the path to reservation.',
    results: { Perf: '95', Access: '98', SEO: '97' },
    gradient: 'from-yellow-700 to-yellow-500',
    mockupAccent: 'bg-yellow-700/20',
    href: '/portfolio/hotel.html',
    image: `${THUMB}/${PORTFOLIO}/hotel.html`,
  },
  {
    title: 'Meridian Home',
    category: 'E-commerce',
    description: 'Premium home goods store with an editorial product grid, curated collections mosaic, verified reviews, and a high-converting newsletter capture.',
    results: { Perf: '94', Access: '96', SEO: '98' },
    gradient: 'from-brand-coral to-red-600',
    mockupAccent: 'bg-brand-coral/20',
    href: '/portfolio/ecommerce.html',
    image: `${THUMB}/${PORTFOLIO}/ecommerce.html`,
  },
  {
    title: 'Iron Ridge Storage',
    category: 'Warehouse',
    description: 'B2B logistics site showcasing facility scale, tiered service plans, transparent pricing, and a lead-gen contact form built for enterprise buyers.',
    results: { Perf: '97', Access: '100', SEO: '99' },
    gradient: 'from-blue-600 to-brand-cyan',
    mockupAccent: 'bg-blue-600/20',
    href: '/portfolio/warehouse.html',
    image: `${THUMB}/${PORTFOLIO}/warehouse.html`,
  },
]

/* ── Project Card ── */
function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  const { ref, handlers } = useTilt<HTMLDivElement>(6)

  return (
    <div ref={ref} {...handlers} className="group cursor-pointer">
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full no-underline"
        aria-label={`View ${project.title} portfolio example`}
      >
        <div className="card overflow-hidden !p-0 h-full">
          {/* Mockup area */}
          <div className={`relative h-52 ${project.mockupAccent} overflow-hidden`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-10`} />
            {/* Browser frame with live screenshot */}
            <div className="absolute inset-4 rounded-lg bg-slate-900/90 border border-slate-700/50 overflow-hidden flex flex-col">
              <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-800/80 border-b border-slate-700/50 flex-shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                <div className="ml-2 flex-1 h-4 rounded bg-slate-700/50" />
              </div>
              <div className="flex-1 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={`${project.title} website preview`}
                  width={600}
                  height={350}
                  loading="lazy"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
            {/* Hover overlay — Lighthouse scores */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
              <div className="flex gap-3 w-full">
                {Object.entries(project.results).map(([key, val]) => (
                  <div key={key} className="flex-1 text-center glass rounded-lg py-2 px-1">
                    <div className="text-sm font-bold text-white">{val}</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">{key}</div>
                  </div>
                ))}
              </div>
              <p className="sr-only">Lighthouse scores: Performance, Accessibility, SEO</p>
            </div>
          </div>

          {/* Info */}
          <div className="p-6">
            <span className={`text-xs font-semibold uppercase tracking-wider bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
              {project.category}
            </span>
            <h3 className="text-xl font-bold text-white mt-2 mb-2">{project.title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">{project.description}</p>
            <span className={`text-xs font-semibold bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent group-hover:opacity-100 flex items-center gap-1`}>
              View Live Example →
            </span>
          </div>
        </div>
      </a>
    </div>
  )
}

export default function Portfolio() {
  const sectionRef = useScrollReveal<HTMLElement>()
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter)

  const handleFilter = useCallback((cat: string) => setActiveFilter(cat), [])

  return (
    <section id="portfolio" ref={sectionRef} className="py-16 md:py-28 lg:py-36 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/30 to-slate-950" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="reveal">
            <h2 className="section-heading mb-6">
              <span className="text-white">See the</span>{' '}
              <span className="gradient-text">Work</span>
            </h2>
          </div>
          <div className="reveal stagger-1">
            <p className="section-subtext">
              Real sites. Real scores. Hover any project to see the Lighthouse numbers — then run the audit yourself.
              What you see is what you get.
            </p>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="reveal flex flex-wrap justify-center gap-2 mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeFilter === cat
                  ? 'bg-gradient-to-r from-brand-cyan to-brand-purple text-white shadow-lg shadow-brand-cyan/20'
                  : 'text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project, i) => (
            <div key={project.title} className={`reveal stagger-${Math.min(i + 1, 6)}`}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

