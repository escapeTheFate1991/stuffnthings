'use client'

import { useState, useCallback } from 'react'
import { useScrollReveal, useTilt } from '@/lib/hooks'

const categories = ['All', 'Consulting', 'SaaS', 'Day Care', 'Hotel', 'E-commerce', 'Warehouse']

const projects = [
  {
    title: 'Pinnacle Strategy Group',
    category: 'Consulting',
    description: 'Premium consulting site with $2.8B+ revenue attribution, case studies, and 94% client retention showcase.',
    results: { speed: '+420%', conversions: '+300%', revenue: '+$890K' },
    gradient: 'from-yellow-600 to-yellow-400',
    mockupAccent: 'bg-yellow-600/20',
    href: '/portfolio/consulting.html',
  },
  {
    title: 'FlowSync',
    category: 'SaaS',
    description: 'AI-powered project management SaaS with pricing tiers, feature showcase, and 127% trial signup lift.',
    results: { speed: '+280%', conversions: '+127%', revenue: '+$1.8M' },
    gradient: 'from-brand-cyan to-brand-purple',
    mockupAccent: 'bg-brand-cyan/20',
    href: '/portfolio/saas.html',
  },
  {
    title: 'Sunshine Sprouts Day Care',
    category: 'Day Care',
    description: 'Warm, trust-building daycare site with program showcase, parent testimonials, and tour scheduling.',
    results: { speed: '+310%', conversions: '+156%', revenue: '+$640K' },
    gradient: 'from-orange-500 to-yellow-400',
    mockupAccent: 'bg-orange-500/20',
    href: '/portfolio/daycare.html',
  },
  {
    title: 'The Bellevue Grand Hotel',
    category: 'Hotel',
    description: '5-star boutique hotel site with room booking, dining, spa experiences and 4.9★ guest reviews.',
    results: { speed: '+340%', conversions: '+89%', revenue: '+$2.4M' },
    gradient: 'from-yellow-700 to-yellow-500',
    mockupAccent: 'bg-yellow-700/20',
    href: '/portfolio/hotel.html',
  },
  {
    title: 'Meridian Home',
    category: 'E-commerce',
    description: 'Premium home goods store with product grid, collections mosaic, reviews, and newsletter growth engine.',
    results: { speed: '+380%', conversions: '+94%', revenue: '+$3.1M' },
    gradient: 'from-brand-coral to-red-600',
    mockupAccent: 'bg-brand-coral/20',
    href: '/portfolio/ecommerce.html',
  },
  {
    title: 'Iron Ridge Storage',
    category: 'Warehouse',
    description: 'B2B warehouse & storage site with 1.2M sq ft facility, service tiers, pricing, and lead generation.',
    results: { speed: '+250%', conversions: '+180%', revenue: '+$1.2M' },
    gradient: 'from-blue-600 to-brand-cyan',
    mockupAccent: 'bg-blue-600/20',
    href: '/portfolio/warehouse.html',
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
            {/* Browser frame mockup */}
            <div className="absolute inset-4 rounded-lg bg-slate-900/90 border border-slate-700/50 overflow-hidden">
              <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-800/80 border-b border-slate-700/50">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                <div className="ml-2 flex-1 h-4 rounded bg-slate-700/50" />
              </div>
              <div className="p-3 space-y-2">
                <div className={`h-3 rounded bg-gradient-to-r ${project.gradient} opacity-30 w-3/4`} />
                <div className="h-2 rounded bg-slate-700/50 w-full" />
                <div className="h-2 rounded bg-slate-700/50 w-5/6" />
                <div className="h-8 rounded bg-slate-700/30 w-1/3 mt-3" />
              </div>
            </div>
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
              <div className="flex gap-3 w-full">
                {Object.entries(project.results).map(([key, val]) => (
                  <div key={key} className="flex-1 text-center glass rounded-lg py-2 px-1">
                    <div className="text-sm font-bold text-white">{val}</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">{key}</div>
                  </div>
                ))}
              </div>
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
    <section id="portfolio" ref={sectionRef} className="py-28 md:py-36 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/30 to-slate-950" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="reveal">
            <h2 className="section-heading mb-6">
              <span className="text-white">Our</span>{' '}
              <span className="gradient-text">Work</span>
            </h2>
          </div>
          <div className="reveal stagger-1">
            <p className="section-subtext">
              Real projects. Real results. Every site we build becomes a case study in performance and conversion optimization.
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

