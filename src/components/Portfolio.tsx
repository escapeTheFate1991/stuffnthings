'use client'

import { useState, useCallback } from 'react'
import { useScrollReveal, useTilt } from '@/lib/hooks'

const categories = ['All', 'E-commerce', 'SaaS', 'Services', 'Healthcare']

const projects = [
  {
    title: 'Meridian Commerce',
    category: 'E-commerce',
    description: 'Complete e-commerce redesign with 340% speed improvement and 89% conversion lift.',
    results: { speed: '+340%', conversions: '+89%', revenue: '+$2.4M' },
    gradient: 'from-brand-cyan to-blue-600',
    mockupAccent: 'bg-brand-cyan/20',
  },
  {
    title: 'CloudSync Pro',
    category: 'SaaS',
    description: 'SaaS landing page with animated demos, achieving 127% increase in trial signups.',
    results: { speed: '+280%', conversions: '+127%', revenue: '+$1.8M' },
    gradient: 'from-brand-purple to-pink-600',
    mockupAccent: 'bg-brand-purple/20',
  },
  {
    title: 'Pinnacle Consulting',
    category: 'Services',
    description: 'Professional services site with 3× mobile conversion improvement.',
    results: { speed: '+420%', conversions: '+300%', revenue: '+$890K' },
    gradient: 'from-brand-green to-emerald-600',
    mockupAccent: 'bg-brand-green/20',
  },
  {
    title: 'VitalCare Health',
    category: 'Healthcare',
    description: 'HIPAA-compliant patient portal with intuitive appointment scheduling.',
    results: { speed: '+310%', conversions: '+156%', revenue: '+$1.2M' },
    gradient: 'from-blue-500 to-brand-cyan',
    mockupAccent: 'bg-blue-500/20',
  },
  {
    title: 'Elevate Marketing',
    category: 'Services',
    description: 'Agency website with interactive case studies and 6-week ROI payback.',
    results: { speed: '+250%', conversions: '+89%', revenue: '+$640K' },
    gradient: 'from-brand-coral to-red-500',
    mockupAccent: 'bg-brand-coral/20',
  },
  {
    title: 'NovaTech Store',
    category: 'E-commerce',
    description: 'High-performance storefront handling 10K+ concurrent users with sub-second loads.',
    results: { speed: '+380%', conversions: '+94%', revenue: '+$3.1M' },
    gradient: 'from-yellow-500 to-brand-coral',
    mockupAccent: 'bg-yellow-500/20',
  },
]

/* ── Project Card ── */
function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  const { ref, handlers } = useTilt<HTMLDivElement>(6)

  return (
    <div ref={ref} {...handlers} className="group cursor-default">
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
          <p className="text-sm text-slate-400 leading-relaxed">{project.description}</p>
        </div>
      </div>
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
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === cat
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

