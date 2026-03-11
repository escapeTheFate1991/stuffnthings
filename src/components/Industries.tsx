'use client'

import { useScrollReveal } from '@/lib/hooks'

const industries = [
  {
    name: 'Roofing & Home Services',
    problem: 'Turn storm-chaser leads into booked inspections before your competitor answers the phone.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    color: 'text-brand-cyan',
    borderHover: 'group-hover:border-brand-cyan/30',
    bgHover: 'from-brand-cyan/10 to-transparent',
  },
  {
    name: 'Medical & Dental',
    problem: 'Fill cancellations automatically and let patients book without calling your front desk.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    color: 'text-brand-purple',
    borderHover: 'group-hover:border-brand-purple/30',
    bgHover: 'from-brand-purple/10 to-transparent',
  },
  {
    name: 'Legal & Professional',
    problem: 'Qualify leads before they hit your inbox. AI handles intake so your team handles cases.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
      </svg>
    ),
    color: 'text-brand-coral',
    borderHover: 'group-hover:border-brand-coral/30',
    bgHover: 'from-brand-coral/10 to-transparent',
  },
  {
    name: 'Restaurants & Hospitality',
    problem: 'Online ordering, reservation management, and review responses — all on autopilot.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.379a48.474 48.474 0 00-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265z" />
      </svg>
    ),
    color: 'text-brand-green',
    borderHover: 'group-hover:border-brand-green/30',
    bgHover: 'from-brand-green/10 to-transparent',
  },
  {
    name: 'Salon & Beauty',
    problem: 'Stop losing bookings to phone tag. AI scheduling fills your chair every hour.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
    color: 'text-brand-purple',
    borderHover: 'group-hover:border-brand-purple/30',
    bgHover: 'from-brand-purple/10 to-transparent',
  },
  {
    name: 'Automotive & Repair',
    problem: 'Automated appointment reminders and service follow-ups that keep bays full.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.42 15.17l-5.1-5.1m0 0L12 4.37m-5.68 5.7h11.8M4.26 19.72a9 9 0 1115.48 0" />
      </svg>
    ),
    color: 'text-brand-coral',
    borderHover: 'group-hover:border-brand-coral/30',
    bgHover: 'from-brand-coral/10 to-transparent',
  },
  {
    name: 'Construction & Trades',
    problem: 'Your work speaks for itself — your website should too. Project galleries + quote automation.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.42 15.17l-5.1-5.1m0 0L12 4.37m-5.68 5.7h11.8M4.26 19.72a9 9 0 1115.48 0" />
      </svg>
    ),
    color: 'text-brand-cyan',
    borderHover: 'group-hover:border-brand-cyan/30',
    bgHover: 'from-brand-cyan/10 to-transparent',
  },
  {
    name: 'Real Estate',
    problem: 'AI-powered property matching and automated follow-ups that close deals while you show homes.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
    color: 'text-brand-green',
    borderHover: 'group-hover:border-brand-green/30',
    bgHover: 'from-brand-green/10 to-transparent',
  },
]

export default function Industries() {
  const sectionRef = useScrollReveal<HTMLElement>()

  return (
    <section id="industries" ref={sectionRef} className="py-16 md:py-28 lg:py-36 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/30 to-slate-950" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="reveal">
            <h2 className="section-heading mb-6">
              <span className="text-white">Built For</span>{' '}
              <span className="gradient-text">Your Industry</span>
            </h2>
          </div>
          <div className="reveal stagger-1">
            <p className="section-subtext">
              We don&apos;t build generic websites. Every site is tailored to how your
              industry actually works — the way customers find you, the way they buy,
              and the follow-ups that close the deal.
            </p>
          </div>
        </div>

        {/* Industry Grid — 2 rows of 4 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {industries.map((industry, i) => (
            <div key={industry.name} className={`reveal stagger-${(i % 4) + 1}`}>
              <div className={`group card !p-6 h-full cursor-default ${industry.borderHover} transition-all duration-500`}>
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${industry.bgHover} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/50 flex items-center justify-center mb-4 ${industry.borderHover} transition-all duration-300 group-hover:scale-110`}>
                    <div className={industry.color}>{industry.icon}</div>
                  </div>
                  <h3 className="text-white font-bold text-sm md:text-base mb-2 font-display">{industry.name}</h3>
                  <p className="text-slate-400 text-xs md:text-sm leading-relaxed">{industry.problem}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
