'use client'

import { useScrollReveal, useCountUp } from '@/lib/hooks'

/* ── Animated Stat ── */
function Stat({ end, suffix, label, icon }: { end: number; suffix: string; label: string; icon: string }) {
  const { ref, value } = useCountUp(end, 2200)
  return (
    <div ref={ref} className="text-center group cursor-default">
      <div className="text-3xl mb-3 group-hover:scale-125 transition-transform duration-300">{icon}</div>
      <div className="text-4xl md:text-5xl font-black gradient-text mb-1">{value}{suffix}</div>
      <div className="text-slate-400 text-sm font-medium">{label}</div>
    </div>
  )
}

/* ── Tech Stack Marquee (honest: these are the tools we actually use) ── */
function TechMarquee() {
  const stack = [
    { name: 'Next.js', icon: '▲' },
    { name: 'React', icon: '⚛' },
    { name: 'TypeScript', icon: 'TS' },
    { name: 'Tailwind CSS', icon: '🎨' },
    { name: 'Vercel', icon: '▲' },
    { name: 'Lighthouse', icon: '🔦' },
    { name: 'Core Web Vitals', icon: '📊' },
    { name: 'WCAG 2.1 AA', icon: '♿' },
    { name: 'Structured Data', icon: '🗂' },
    { name: 'GitHub Actions', icon: '⚙️' },
  ]
  const doubled = [...stack, ...stack]

  return (
    <div className="relative overflow-hidden py-8 mb-16">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-950 to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-950 to-transparent z-10" />
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <div key={i} className="mx-8 flex items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors duration-300">
            <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700/50 flex items-center justify-center text-xs font-bold">
              {item.icon}
            </div>
            <span className="text-sm font-semibold tracking-tight">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Build Standard Card ── */
function StandardCard({
  icon, title, commitment, proof, gradient,
}: {
  icon: string; title: string; commitment: string; proof: string; gradient: string
}) {
  return (
    <div className="relative group h-full">
      <div className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm`} />
      <div className="card relative h-full flex flex-col">
        <div className="text-4xl mb-4">{icon}</div>
        <h4 className={`text-xl font-bold mb-3 font-display bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>{title}</h4>
        <p className="text-slate-300 leading-relaxed flex-1 mb-6">{commitment}</p>
        <div className="bg-brand-green/5 border border-brand-green/15 rounded-xl p-3">
          <p className="text-brand-green font-semibold text-sm font-mono">{proof}</p>
        </div>
      </div>
    </div>
  )
}

const standards = [
  {
    icon: '🚀',
    title: '95+ Performance. Every Build.',
    commitment:
      "Your web team doesn't ship a site that scores below 95 on Google Lighthouse Performance. Not 94. That threshold is our baseline, not our ceiling — and it's verifiable the moment the site goes live.",
    proof: 'Target: Lighthouse Perf ≥ 95 · LCP < 1.5s · CLS = 0.00',
    gradient: 'from-brand-cyan to-blue-500',
  },
  {
    icon: '♿',
    title: 'Accessibility Is Not Optional.',
    commitment:
      "Every site your web team builds targets a Lighthouse Accessibility score of 100. WCAG 2.1 AA compliance is baked into our process — semantic HTML, correct ARIA roles, proper contrast ratios — from the first commit, not as an afterthought.",
    proof: 'Target: Accessibility = 100 · WCAG 2.1 AA',
    gradient: 'from-brand-purple to-pink-500',
  },
  {
    icon: '📡',
    title: 'SEO Architecture from Day One.',
    commitment:
      "Clean semantic structure, correct heading hierarchy, structured data where applicable, meta strategy aligned to your keywords. Your web team builds for search engines the same way we build for humans — with intention, not plugins.",
    proof: 'Target: SEO = 100 · Structured data · Zero crawl errors',
    gradient: 'from-brand-green to-emerald-400',
  },
]

const stats = [
  { end: 95, suffix: '+', label: 'Lighthouse Perf — our floor', icon: '🚀' },
  { end: 100, suffix: '', label: 'Accessibility — our target', icon: '♿' },
  { end: 99, suffix: '.9%', label: 'Uptime SLA', icon: '🔧' },
  { end: 100, suffix: '', label: 'SEO Score — our standard', icon: '📡' },
]

export default function SocialProof() {
  const sectionRef = useScrollReveal<HTMLElement>()

  return (
    <section id="testimonials" ref={sectionRef} className="py-16 md:py-28 lg:py-36 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="reveal">
            <h2 className="section-heading mb-6">
              <span className="gradient-text">Your Web Team</span>
              <br />
              <span className="text-white">delivers verifiable results.</span>
            </h2>
          </div>
          <div className="reveal stagger-1">
            <p className="section-subtext">
              We set our standards publicly so you can measure our performance. 
              Every site your web team builds meets these benchmarks — verifiably, measurably, consistently.
            </p>
          </div>
        </div>

        {/* Tech stack marquee */}
        <div className="reveal">
          <p className="text-center text-xs uppercase tracking-[0.2em] text-slate-600 font-medium mb-4">
            Built with
          </p>
          <TechMarquee />
        </div>

        {/* Stats */}
        <div className="reveal grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((s, i) => (
            <div key={i} className={`stagger-${i + 1}`}>
              <Stat {...s} />
            </div>
          ))}
        </div>

        {/* Build Standards Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {standards.map((s, i) => (
            <div key={i} className={`reveal stagger-${i + 1}`}>
              <StandardCard {...s} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}