'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { useScrollReveal } from '@/lib/hooks'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const categories = ['All', 'Consulting', 'SaaS', 'Child Care', 'Hospitality', 'E-commerce', 'Warehouse']

const SCREENSHOTS = '/portfolio/screenshots'

const projects = [
  {
    title: 'Pinnacle Strategy Group',
    category: 'Consulting',
    description: 'Authority-driven consulting site with AI-powered lead qualification, automated intake workflows, and a smart chatbot that books discovery calls while the team sleeps.',
    results: { Speed: '97', Saved: '$2.1K', SEO: '98', Workflows: '4' },
    gradient: 'from-yellow-600 to-yellow-400',
    mockupAccent: 'bg-yellow-600/20',
    href: '/portfolio/consulting.html',
    image: `${SCREENSHOTS}/consulting.jpg`,
    before: {
      headline: 'Generic template site with zero automation behind it',
      issues: [
        'No social proof or case studies -- visitors had no reason to trust',
        'Contact form buried at the bottom with no supporting copy',
        'No chatbot or instant response -- leads waited days for a reply',
        'Zero lead qualification -- every inquiry went to the same inbox, no scoring',
        'Consultation booking required back-and-forth emails',
      ],
    },
    after: {
      headline: 'Authority-first site with AI doing the heavy lifting behind the scenes',
      improvements: [
        'AI chatbot answers prospect questions 24/7 and qualifies leads before they hit the inbox',
        'Automated intake workflow scores leads by company size, budget, and urgency',
        'Smart scheduling widget lets qualified prospects self-book discovery calls',
        'Drip email sequences triggered by visit behavior -- case study downloads, return visits',
        'Authority page flow restructured: Proof → Expertise → AI-Powered Contact',
      ],
    },
    useCases: [
      'Consulting firms automating lead qualification and intake',
      'Professional services replacing manual follow-up with AI-driven nurture sequences',
      'B2B firms that want 24/7 prospect engagement without hiring more staff',
    ],
  },
  {
    title: 'FlowSync',
    category: 'SaaS',
    description: 'High-converting SaaS landing page backed by AI-powered onboarding, automated trial nurture sequences, and intelligent lead routing that sends the right prospects to the right team.',
    results: { Speed: '98', Saved: '$3.4K', SEO: '99', Workflows: '5' },
    gradient: 'from-brand-cyan to-brand-purple',
    mockupAccent: 'bg-brand-cyan/20',
    href: '/portfolio/saas.html',
    image: `${SCREENSHOTS}/saas.jpg`,
    before: {
      headline: 'Feature-heavy page with no automation behind the signup flow',
      issues: [
        'Listed 20+ features with no hierarchy -- overwhelming for visitors',
        'No free trial CTA above the fold',
        'Pricing hidden behind a "Contact Sales" wall',
        'Trial signups got a generic welcome email and nothing else -- no onboarding sequence',
        'No way to identify or route high-value enterprise leads automatically',
      ],
    },
    after: {
      headline: 'Clean product showcase with AI-driven conversion and onboarding',
      improvements: [
        'AI onboarding assistant guides new trial users through setup in their first 10 minutes',
        'Automated trial nurture sequence sends usage tips, feature highlights, and upgrade nudges',
        'Intelligent lead scoring routes enterprise prospects to sales, self-serve users to docs',
        'Transparent tiered pricing with AI-powered plan recommendation based on usage signals',
        'Exit-intent chatbot captures abandoning visitors and offers personalized demos',
      ],
    },
    useCases: [
      'SaaS products automating the trial-to-paid conversion funnel',
      'Startups replacing manual onboarding with AI-guided setup flows',
      'Platforms using lead scoring to route self-serve vs. enterprise buyers',
    ],
  },
  {
    title: 'Sunshine Sprouts Day Care',
    category: 'Child Care',
    description: 'Warm, trust-first childcare site with an AI chatbot that answers parent questions instantly, automated tour scheduling, and smart waitlist management that fills spots without staff effort.',
    results: { Speed: '96', Saved: '$1.8K', SEO: '97', Workflows: '4' },
    gradient: 'from-orange-500 to-yellow-400',
    mockupAccent: 'bg-orange-500/20',
    href: '/portfolio/daycare.html',
    image: `${SCREENSHOTS}/daycare.jpg`,
    before: {
      headline: 'Outdated site with zero automation -- everything was manual',
      issues: [
        'Stock photos instead of real facility images -- felt impersonal',
        'No parent testimonials or trust signals',
        'Tour booking required a phone call -- front desk was overwhelmed',
        'No chatbot to answer common parent questions (hours, pricing, curriculum)',
        'Waitlist was a spreadsheet -- parents never got updates',
      ],
    },
    after: {
      headline: 'Warm design with AI handling enrollment, tours, and parent communication',
      improvements: [
        'AI chatbot answers parent FAQs 24/7 -- hours, pricing, availability, curriculum details',
        'Smart tour scheduling widget with automated confirmations and reminders',
        'Automated waitlist management -- parents get real-time updates when spots open',
        'Post-tour drip sequence nurtures parents with program highlights and enrollment prompts',
        'Automated review collection emails sent after first month of enrollment',
      ],
    },
    useCases: [
      'Daycare centers automating tour scheduling and parent intake',
      'Child care facilities replacing front-desk phone tag with AI chatbots',
      'Programs using automated waitlist management to fill spots faster',
    ],
  },
  {
    title: 'The Bellevue Grand Hotel',
    category: 'Hospitality',
    description: 'Luxury hotel site with an AI concierge chatbot, smart booking engine that upsells room upgrades, and automated pre-arrival sequences that personalize every guest experience.',
    results: { Speed: '95', Saved: '$2.8K', SEO: '97', Workflows: '5' },
    gradient: 'from-yellow-700 to-yellow-500',
    mockupAccent: 'bg-yellow-700/20',
    href: '/portfolio/hotel.html',
    image: `${SCREENSHOTS}/hotel.jpg`,
    before: {
      headline: 'Pretty site with no intelligence behind the booking flow',
      issues: [
        'Hero was a stock photo -- no atmosphere or emotion',
        'Booking widget was 3 clicks deep -- guests gave up and used OTAs',
        'No chatbot -- guests called the front desk for basic questions',
        'Zero pre-arrival automation -- no upsell, no personalization',
        'No post-stay review collection -- missing out on social proof',
      ],
    },
    after: {
      headline: 'Immersive site with AI that sells, books, and personalizes automatically',
      improvements: [
        'AI concierge chatbot handles room questions, dining reservations, and spa bookings 24/7',
        'Smart booking engine suggests room upgrades and add-ons based on stay duration and party size',
        'Automated pre-arrival email sequence with personalized restaurant, spa, and experience recommendations',
        'Post-stay AI triggers review requests and loyalty offers based on guest satisfaction signals',
        'Direct booking flow with persistent widget -- reducing OTA commission leakage by design',
      ],
    },
    useCases: [
      'Hotels replacing front-desk phone calls with AI concierge chatbots',
      'Properties automating upsells (room upgrades, dining, spa) during booking',
      'Hospitality brands using pre/post-stay automation to boost reviews and repeat bookings',
    ],
  },
  {
    title: 'Meridian Home',
    category: 'E-commerce',
    description: 'Premium e-commerce store with AI-powered product recommendations, automated cart recovery, and smart review collection that turns happy customers into repeat buyers.',
    results: { Speed: '94', Saved: '$3.9K', SEO: '98', Workflows: '6' },
    gradient: 'from-brand-coral to-red-600',
    mockupAccent: 'bg-brand-coral/20',
    href: '/portfolio/ecommerce.html',
    image: `${SCREENSHOTS}/ecommerce.jpg`,
    before: {
      headline: 'Product grid with no intelligence -- every shopper got the same experience',
      issues: [
        'Every product looked the same -- no visual hierarchy or curation',
        'No brand story or editorial content to differentiate from Amazon',
        'Cart abandonment was sky-high -- no recovery emails, no exit intent',
        'No product recommendations -- shoppers browsed randomly or left',
        'No post-purchase review automation -- social proof was stale',
      ],
    },
    after: {
      headline: 'Editorial shopping experience with AI working every stage of the funnel',
      improvements: [
        'AI product recommendations personalize the homepage based on browsing behavior and purchase history',
        'Automated cart abandonment sequence -- email + SMS with dynamic product reminders',
        'Smart exit-intent popup offers personalized discount based on cart value and visit frequency',
        'Post-purchase AI sends review requests, cross-sell recommendations, and restock reminders',
        'AI-generated product descriptions highlight sustainability details and material sourcing',
      ],
    },
    useCases: [
      'E-commerce brands automating cart recovery and post-purchase engagement',
      'D2C stores using AI recommendations to increase AOV and repeat purchases',
      'Retailers replacing manual product copy with AI-generated content at scale',
    ],
  },
  {
    title: 'Iron Ridge Storage',
    category: 'Warehouse',
    description: 'B2B logistics platform with AI-powered quote generation, automated lead qualification, and a smart chatbot that handles facility questions and routes enterprise inquiries to the right team.',
    results: { Speed: '97', Saved: '$2.5K', SEO: '99', Workflows: '4' },
    gradient: 'from-blue-600 to-brand-cyan',
    mockupAccent: 'bg-blue-600/20',
    href: '/portfolio/warehouse.html',
    image: `${SCREENSHOTS}/warehouse.jpg`,
    before: {
      headline: 'Brochure site with a 12-field form and zero automation',
      issues: [
        'Facility photos were dark, low-res, and uninspiring',
        'Pricing required a phone call -- enterprise buyers want transparency',
        'No chatbot -- prospects with quick questions bounced instead of calling',
        'Quote process was fully manual -- sales team spent hours on spreadsheets',
        'No lead scoring -- a 500 sq ft inquiry got the same treatment as 50,000 sq ft',
      ],
    },
    after: {
      headline: 'Professional B2B platform with AI that qualifies, quotes, and follows up',
      improvements: [
        'AI chatbot answers facility questions, pricing ranges, and availability in real time',
        'Automated quote generator builds custom proposals based on space needs, term length, and services',
        'Smart lead scoring routes enterprise inquiries to senior reps, SMBs to self-serve flow',
        'Automated follow-up sequences nurture leads with facility tours, case studies, and pricing updates',
        'Contact form reduced to 4 fields -- AI enriches the rest from company data',
      ],
    },
    useCases: [
      'Warehousing companies automating quote generation and lead qualification',
      'B2B logistics providers replacing manual sales processes with AI-driven pipelines',
      'Industrial businesses using chatbots to handle facility questions at scale',
    ],
  },
]

/* ── Case Study Right Panel ── */
function CaseStudyRight({ project }: { project: (typeof projects)[0] }) {
  return (
    <div className="space-y-8">
      {/* Lighthouse Metrics */}
      <div className="grid grid-cols-4 gap-3">
        {Object.entries(project.results).map(([key, val]) => (
          <div key={key} className="rounded-xl p-3 text-center border border-white/[0.06] bg-white/[0.02]">
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
            <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-400">
              {uc}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Portfolio() {
  const sectionRef = useScrollReveal<HTMLElement>()
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [activeFilter, setActiveFilter] = useState('All')
  const rightRef = useRef<HTMLDivElement>(null)
  const [rightH, setRightH] = useState<number>(0)

  useEffect(() => {
    if (!rightRef.current) return
    const ro = new ResizeObserver(([entry]) => setRightH(entry.contentRect.height))
    ro.observe(rightRef.current)
    return () => ro.disconnect()
  }, [activeFilter])

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter)

  const featured = filtered[0]

  const handleFilter = useCallback((cat: string) => setActiveFilter(cat), [])

  return (
    <section id="portfolio" ref={sectionRef} className="py-16 md:py-28 lg:py-36 relative overflow-hidden bg-black">
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
              <span className="text-white">Our Build</span>{' '}
              <span className="gradient-text">Standard</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="section-subtext">
              Every site is built to the same production standard -- optimized, fast, and
              conversion-ready. Click any project to see the before/after analysis and live Lighthouse scores.
            </p>
          </motion.div>
        </div>

        {/* Tab bar -- Industries style with gradient underlines */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilter(cat)}
              className={`relative px-4 py-2 md:px-5 md:py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${activeFilter === cat
                  ? 'text-white bg-white/[0.08] border border-white/20'
                  : 'text-slate-400 border border-transparent hover:text-white hover:border-white/10'
                }`}
            >
              {cat}
              {activeFilter === cat && (
                <motion.div
                  layoutId="portfolioTab"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-8 bg-gradient-to-r from-brand-cyan to-brand-purple rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Featured showcase -- AnimatePresence crossfade */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {activeFilter === 'All' ? (
              /* ── All view: Featured + compact strip ── */
              <div className="space-y-10">
                {/* Featured project */}
                <div
                  onClick={() => handleFilter(projects[4].category)}
                  className="group cursor-pointer grid lg:grid-cols-[3fr_2fr] gap-8 items-center"
                >
                  {/* Browser frame */}
                  <div className="relative rounded-2xl overflow-hidden border border-white/[0.06]">
                    <div className="flex items-center gap-1.5 px-4 py-3 bg-neutral-900/80 border-b border-white/[0.06]">
                      <div className="w-3 h-3 rounded-full bg-red-400/60" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                      <div className="w-3 h-3 rounded-full bg-green-400/60" />
                      <div className="ml-3 flex-1 h-5 rounded-md bg-white/[0.04] flex items-center px-3">
                        <span className="text-[10px] text-slate-500 truncate">{projects[4].href}</span>
                      </div>
                    </div>
                    <div className="overflow-hidden aspect-[16/9]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={projects[4].image}
                        alt={`${projects[4].title} preview`}
                        loading="lazy"
                        className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-700"
                      />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="space-y-4">
                    <span className={`inline-block text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-gradient-to-r ${projects[4].gradient} text-white/90`}>
                      {projects[4].category}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-bold text-white font-display">{projects[4].title}</h3>
                    <p className="text-slate-400 leading-relaxed">{projects[4].description}</p>
                    <span className={`inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r ${projects[4].gradient} bg-clip-text text-transparent group-hover:gap-3 transition-all duration-300`}>
                      View Case Study
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </div>

                {/* Compact strip */}
                <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide md:grid md:grid-cols-5 md:overflow-visible md:pb-0">
                  {projects.filter((_, i) => i !== 4).map((project, i) => (
                    <motion.div
                      key={project.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08, duration: 0.4 }}
                      onClick={() => handleFilter(project.category)}
                      className="group cursor-pointer flex-shrink-0 w-[220px] md:w-auto"
                    >
                      <div className="relative rounded-xl overflow-hidden aspect-[16/10] mb-3 border border-white/[0.04] hover:border-white/[0.1] transition-all duration-300">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={project.image}
                          alt={`${project.title} preview`}
                          loading="lazy"
                          className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
                      </div>
                      <h4 className="text-sm font-semibold text-white group-hover:text-brand-cyan transition-colors duration-300 truncate">{project.title}</h4>
                      <span className={`text-[11px] font-medium uppercase tracking-wider bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                        {project.category}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              /* ── Case Study view ── */
              <div className="grid lg:grid-cols-2 gap-10 items-start">
                {/* Left -- browser frame */}
                <div className="flex flex-col" style={rightH ? { height: rightH } : undefined}>
                  <div className={`relative rounded-2xl ${featured.mockupAccent} overflow-hidden border border-white/[0.06] flex-1 min-h-0`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${featured.gradient} opacity-5`} />
                    <div className="relative h-full flex flex-col">
                      <div className="flex items-center gap-1.5 px-4 py-3 bg-neutral-900/80 border-b border-white/[0.06] flex-shrink-0">
                        <div className="w-3 h-3 rounded-full bg-red-400/60" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                        <div className="w-3 h-3 rounded-full bg-green-400/60" />
                        <div className="ml-3 flex-1 h-5 rounded-md bg-white/[0.04] flex items-center px-3">
                          <span className="text-[10px] text-slate-500 truncate">{featured.href}</span>
                        </div>
                      </div>
                      <a href={featured.href} target="_blank" rel="noopener noreferrer" className="block flex-1 min-h-0 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={featured.image}
                          alt={`${featured.title} website`}
                          loading="lazy"
                          className="w-full object-cover object-top hover:opacity-95 transition"
                        />
                      </a>
                    </div>
                  </div>
                  <a
                    href={featured.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-6 py-3 mt-4 rounded-xl bg-gradient-to-r ${featured.gradient} text-white font-semibold text-sm hover:opacity-90 transition shadow-lg flex-shrink-0`}
                  >
                    View Live Preview
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </a>
                </div>

                {/* Right -- case study details */}
                <div ref={rightRef}>
                  <div className="mb-4">
                    <span className={`text-xs font-semibold uppercase tracking-wider bg-gradient-to-r ${featured.gradient} bg-clip-text text-transparent`}>
                      {featured.category}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-bold text-white mt-2 font-display">{featured.title}</h3>
                  </div>
                  <CaseStudyRight project={featured} />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
