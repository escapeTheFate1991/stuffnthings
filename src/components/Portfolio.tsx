'use client'

import { useState, useCallback } from 'react'
import { useScrollReveal, useTilt } from '@/lib/hooks'

const categories = ['All', 'Consulting', 'SaaS', 'Child Care', 'Hospitality', 'E-commerce', 'Warehouse']

const THUMB = 'https://image.thum.io/get/width/800/crop/500/wait/10'
const PORTFOLIO = 'https://escapethefate1991.github.io/stuffnthings/portfolio'

const projects = [
  {
    title: 'Pinnacle Strategy Group',
    category: 'Consulting',
    description: 'Authoritative consulting site featuring executive case studies, team credentials, and a trust-first design that positions expertise before the ask.',
    results: { Performance: '97', Accessibility: '100', SEO: '98', 'Best Practices': '100' },
    gradient: 'from-yellow-600 to-yellow-400',
    mockupAccent: 'bg-yellow-600/20',
    href: '/portfolio/consulting.html',
    image: `${THUMB}/${PORTFOLIO}/consulting.html`,
    before: {
      headline: 'Generic template site with no clear value proposition',
      issues: [
        'No social proof or case studies — visitors had no reason to trust',
        'Vague headline: "Welcome to our consulting firm"',
        'Contact form buried at the bottom with no supporting copy',
        'Mobile experience was broken — nav overlapped content',
      ],
    },
    after: {
      headline: 'Authority-first design that lets the work speak',
      improvements: [
        'Led with the biggest client win as the hero — instant credibility',
        'Added executive team bios with credentials and specializations',
        'Built a case study section with measurable client outcomes',
        'Restructured the page flow: Authority → Expertise → Proof → Contact',
      ],
    },
    useCases: [
      'Management consulting firms needing to establish authority online',
      'Professional services competing against larger, established brands',
      'B2B firms where trust and credibility drive the sales cycle',
    ],
  },
  {
    title: 'FlowSync',
    category: 'SaaS',
    description: 'Full-featured SaaS landing page with animated feature cards, tiered pricing, and a frictionless trial sign-up flow optimised for qualified leads.',
    results: { Performance: '98', Accessibility: '100', SEO: '99', 'Best Practices': '100' },
    gradient: 'from-brand-cyan to-brand-purple',
    mockupAccent: 'bg-brand-cyan/20',
    href: '/portfolio/saas.html',
    image: `${THUMB}/${PORTFOLIO}/saas.html`,
    before: {
      headline: 'Feature-heavy page with no clear conversion path',
      issues: [
        'Listed 20+ features with no hierarchy — overwhelming for visitors',
        'No free trial CTA above the fold',
        'Pricing was hidden behind a "Contact Sales" wall',
        'Zero social proof — no logos, stats, or testimonials',
      ],
    },
    after: {
      headline: 'Clean product showcase with dual CTA strategy',
      improvements: [
        'Reduced to 4 hero features with animated cards — scannable in seconds',
        '"Start Free" CTA above fold + "Get a Demo" for enterprise',
        'Transparent tiered pricing with feature comparison grid',
        'Added trust bar with integration logos and a live metric counter',
      ],
    },
    useCases: [
      'SaaS products targeting both self-serve and enterprise customers',
      'Startups needing to convert free trials into paid subscriptions',
      'Platforms competing on ease-of-use and transparent pricing',
    ],
  },
  {
    title: 'Sunshine Sprouts Day Care',
    category: 'Child Care',
    description: 'Warm, trust-first childcare site with program galleries, parent testimonials, and a tour-booking widget that turns visits into enrolments.',
    results: { Performance: '96', Accessibility: '100', SEO: '97', 'Best Practices': '100' },
    gradient: 'from-orange-500 to-yellow-400',
    mockupAccent: 'bg-orange-500/20',
    href: '/portfolio/daycare.html',
    image: `${THUMB}/${PORTFOLIO}/daycare.html`,
    before: {
      headline: 'Outdated site that didn\'t reflect the quality of care',
      issues: [
        'Stock photos instead of real facility images — felt impersonal',
        'No parent testimonials or trust signals',
        'Programs listed as a text wall — no visual differentiation',
        'Tour booking required a phone call — friction killed conversions',
      ],
    },
    after: {
      headline: 'Warm, inviting design that builds parent confidence',
      improvements: [
        'Real facility photos with bright, welcoming color palette',
        'Parent testimonials front and center — named, specific, emotional',
        'Program cards with age ranges, schedules, and photo galleries',
        'Online tour booking widget — 3 clicks from landing to scheduled visit',
      ],
    },
    useCases: [
      'Daycare centers and preschools competing for parent trust',
      'Child care facilities expanding to new locations',
      'Programs needing to showcase licensing, certifications, and curriculum',
    ],
  },
  {
    title: 'The Bellevue Grand Hotel',
    category: 'Hospitality',
    description: '5-star boutique hotel site with immersive room galleries, dining and spa experiences, and a booking engine that shortens the path to reservation.',
    results: { Performance: '95', Accessibility: '98', SEO: '97', 'Best Practices': '100' },
    gradient: 'from-yellow-700 to-yellow-500',
    mockupAccent: 'bg-yellow-700/20',
    href: '/portfolio/hotel.html',
    image: `${THUMB}/${PORTFOLIO}/hotel.html`,
    before: {
      headline: 'Booking engine buried under layers of generic content',
      issues: [
        'Hero was a stock photo of a hotel room — no atmosphere or emotion',
        'Booking widget was 3 clicks deep — guests gave up and used OTAs',
        'Room descriptions read like spec sheets, not experiences',
        'No dining, spa, or experience sections — missed upsell opportunities',
      ],
    },
    after: {
      headline: 'Immersive experience site that sells the feeling, not the room',
      improvements: [
        'Hero video showing the property experience — pool, dining, sunset views',
        'Persistent booking widget accessible from any page in one click',
        'Room pages designed as experiences — lifestyle photos, story-driven copy',
        'Dedicated dining and spa sections that drive on-property revenue',
      ],
    },
    useCases: [
      'Boutique hotels competing against OTA listings (Booking.com, Expedia)',
      'Properties wanting to drive direct bookings and reduce commission fees',
      'Hotels with dining, spa, or event spaces needing to showcase the full experience',
    ],
  },
  {
    title: 'Meridian Home',
    category: 'E-commerce',
    description: 'Premium home goods store with an editorial product grid, curated collections mosaic, verified reviews, and a high-converting newsletter capture.',
    results: { Performance: '94', Accessibility: '96', SEO: '98', 'Best Practices': '100' },
    gradient: 'from-brand-coral to-red-600',
    mockupAccent: 'bg-brand-coral/20',
    href: '/portfolio/ecommerce.html',
    image: `${THUMB}/${PORTFOLIO}/ecommerce.html`,
    before: {
      headline: 'Product-heavy grid with no story or brand identity',
      issues: [
        'Every product looked the same — no visual hierarchy or curation',
        'No brand story or editorial content to differentiate from Amazon',
        'Cart abandonment was high — no trust signals at checkout',
        'Newsletter popup was aggressive and appeared on page load',
      ],
    },
    after: {
      headline: 'Editorial shopping experience that builds brand desire',
      improvements: [
        'Curated collections with editorial photography — lifestyle over product shots',
        'Brand story woven throughout — "designed for how you actually live"',
        'Trust bar at checkout: free shipping, easy returns, secure payment',
        'Newsletter capture at scroll depth 50% with a 10% incentive — not a popup',
      ],
    },
    useCases: [
      'D2C brands needing to compete on experience, not just price',
      'Home goods, lifestyle, and premium product retailers',
      'Stores wanting to reduce cart abandonment and increase AOV',
    ],
  },
  {
    title: 'Iron Ridge Storage',
    category: 'Warehouse',
    description: 'B2B logistics site showcasing facility scale, tiered service plans, transparent pricing, and a lead-gen contact form built for enterprise buyers.',
    results: { Performance: '97', Accessibility: '100', SEO: '99', 'Best Practices': '100' },
    gradient: 'from-blue-600 to-brand-cyan',
    mockupAccent: 'bg-blue-600/20',
    href: '/portfolio/warehouse.html',
    image: `${THUMB}/${PORTFOLIO}/warehouse.html`,
    before: {
      headline: 'Brochure site that read like a PDF, not a business',
      issues: [
        'Facility photos were dark, low-res, and uninspiring',
        'Pricing required a phone call — enterprise buyers want transparency',
        'No service tier breakdown — one-size-fits-all messaging',
        'Contact form asked for 12 fields — killed completion rates',
      ],
    },
    after: {
      headline: 'Professional B2B platform that closes enterprise deals',
      improvements: [
        'Drone footage and professional facility photography — shows scale and capability',
        'Transparent tiered pricing with clear included/add-on features',
        'Service plans broken into Small, Medium, Enterprise with comparison grid',
        'Contact form reduced to 4 fields + optional details — 3x completion rate',
      ],
    },
    useCases: [
      'Logistics and warehousing companies targeting enterprise contracts',
      'B2B service providers needing to showcase facility capabilities',
      'Industrial businesses competing against larger national chains',
    ],
  },
]

/* ── Small Card (All view) ── */
function ProjectCard({ project, onClick }: { project: (typeof projects)[0]; onClick: () => void }) {
  const { ref, handlers } = useTilt<HTMLDivElement>(6)

  return (
    <div ref={ref} {...handlers} className="group cursor-pointer" onClick={onClick}>
      <div className="card overflow-hidden !p-0 h-full hover:border-slate-600/50 transition-colors">
        <div className={`relative h-52 ${project.mockupAccent} overflow-hidden`}>
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-10`} />
          <div className="absolute inset-4 rounded-lg bg-slate-900/90 border border-slate-700/50 overflow-hidden flex flex-col">
            <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-800/80 border-b border-slate-700/50 flex-shrink-0">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
              <div className="ml-2 flex-1 h-4 rounded bg-slate-700/50" />
            </div>
            <div className="flex-1 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={project.image} alt={`${project.title} preview`} loading="lazy" className="w-full h-full object-cover object-top" />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
            <div className="flex gap-3 w-full">
              {Object.entries(project.results).slice(0, 3).map(([key, val]) => (
                <div key={key} className="flex-1 text-center glass rounded-lg py-2 px-1">
                  <div className="text-sm font-bold text-white">{val}</div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">{key.slice(0, 4)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="p-6">
          <span className={`text-xs font-semibold uppercase tracking-wider bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
            {project.category}
          </span>
          <h3 className="text-xl font-bold text-white mt-2 mb-2 font-display">{project.title}</h3>
          <p className="text-sm text-slate-400 leading-relaxed">{project.description}</p>
        </div>
      </div>
    </div>
  )
}

/* ── Full-width Case Study View ── */
function CaseStudyView({ project }: { project: (typeof projects)[0] }) {
  return (
    <div className="reveal">
      <div className="grid lg:grid-cols-2 gap-10 items-start">
        {/* Left — Website screenshot in browser frame */}
        <div className="space-y-4">
          <div className={`relative rounded-2xl ${project.mockupAccent} overflow-hidden border border-slate-700/50`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-5`} />
            <div className="relative">
              {/* Browser chrome */}
              <div className="flex items-center gap-1.5 px-4 py-3 bg-slate-800/80 border-b border-slate-700/50">
                <div className="w-3 h-3 rounded-full bg-red-400/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                <div className="w-3 h-3 rounded-full bg-green-400/60" />
                <div className="ml-3 flex-1 h-5 rounded-md bg-slate-700/50 flex items-center px-3">
                  <span className="text-[10px] text-slate-500 truncate">{project.href}</span>
                </div>
              </div>
              {/* Screenshot */}
              <a href={project.href} target="_blank" rel="noopener noreferrer" className="block cursor-pointer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={`${project.title} website`}
                  loading="lazy"
                  className="w-full object-cover object-top hover:opacity-95 transition"
                  style={{ maxHeight: '500px' }}
                />
              </a>
            </div>
          </div>
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r ${project.gradient} text-white font-semibold text-sm hover:opacity-90 transition shadow-lg`}
          >
            View Live Preview
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
          </a>
        </div>

        {/* Right — Metrics + Before/After + Use Cases */}
        <div className="space-y-8">
          {/* Title */}
          <div>
            <span className={`text-xs font-semibold uppercase tracking-wider bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
              {project.category}
            </span>
            <h3 className="text-3xl md:text-4xl font-bold text-white mt-2 font-display">{project.title}</h3>
          </div>

          {/* Lighthouse Metrics */}
          <div className="grid grid-cols-4 gap-3">
            {Object.entries(project.results).map(([key, val]) => (
              <div key={key} className="glass rounded-xl p-3 text-center border border-slate-700/30">
                <div className={`text-2xl font-bold bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>{val}</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">{key}</div>
              </div>
            ))}
          </div>

          {/* Before */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <h4 className="text-sm font-semibold uppercase tracking-wider text-red-400">Before</h4>
            </div>
            <p className="text-slate-400 text-sm font-medium">{project.before.headline}</p>
            <ul className="space-y-2">
              {project.before.issues.map((issue, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-500">
                  <svg className="w-4 h-4 text-red-500/60 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  {issue}
                </li>
              ))}
            </ul>
          </div>

          {/* After */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-brand-green" />
              <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-green">After</h4>
            </div>
            <p className="text-slate-400 text-sm font-medium">{project.after.headline}</p>
            <ul className="space-y-2">
              {project.after.improvements.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                  <svg className="w-4 h-4 text-brand-green mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Use Cases */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Ideal For</h4>
            <div className="flex flex-wrap gap-2">
              {project.useCases.map((uc, i) => (
                <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/50 text-slate-400">
                  {uc}
                </span>
              ))}
            </div>
          </div>
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
              Real sites. Real scores. Click any project to see the full case study — before, after, and the numbers that matter.
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

        {/* Content — Grid (All) or Case Study (filtered) */}
        {activeFilter === 'All' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((project, i) => (
              <div key={project.title} className={`reveal stagger-${Math.min(i + 1, 6)}`}>
                <ProjectCard project={project} onClick={() => setActiveFilter(project.category)} />
              </div>
            ))}
          </div>
        ) : (
          <CaseStudyView project={filtered[0]} />
        )}
      </div>
    </section>
  )
}
