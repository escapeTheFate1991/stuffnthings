'use client'

import { useScrollReveal, useCountUp } from '@/lib/hooks'

/* ── Animated Stat ── */
function Stat({ end, suffix, label, icon }: { end: number; suffix: string; label: string; icon: React.ReactNode }) {
  const { ref, value } = useCountUp(end, 2200)
  return (
    <div ref={ref} className="text-center group cursor-default">
      <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-slate-800/80 border border-slate-700/50 flex items-center justify-center group-hover:scale-125 group-hover:border-brand-cyan/30 transition-all duration-300">
        {icon}
      </div>
      <div className="text-4xl md:text-5xl font-black gradient-text mb-1">{value}{suffix}</div>
      <div className="text-slate-400 text-sm font-medium">{label}</div>
    </div>
  )
}

/* ── Build Standard Card ── */
function StandardCard({
  icon, title, commitment, proof, gradient,
}: {
  icon: React.ReactNode; title: string; commitment: string; proof: string; gradient: string
}) {
  return (
    <div className="relative group h-full">
      <div className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm`} />
      <div className="card relative h-full flex flex-col">
        <div className="mb-4">{icon}</div>
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
    icon: (
      <svg className="w-9 h-9 text-brand-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: '95+ Performance. Every Build.',
    commitment:
      "We don't ship anything below 95 on Google Lighthouse. That's not a target — it's a rule. You can verify it yourself on day one. Open DevTools, run the audit, see the number.",
    proof: 'Target: Lighthouse Perf ≥ 95 · LCP < 1.5s · CLS = 0.00',
    gradient: 'from-brand-cyan to-blue-500',
  },
  {
    icon: (
      <svg className="w-9 h-9 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    title: 'AI That Does Real Work.',
    commitment:
      "We don't just hand you a login and wish you luck. Our AI automates your workflows, qualifies your leads, and monitors your performance — so things keep moving even when you're not looking.",
    proof: 'Included: AI Workflows · Lead Capture · Performance Monitoring',
    gradient: 'from-brand-purple to-pink-500',
  },
  {
    icon: (
      <svg className="w-9 h-9 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
    title: 'SEO Baked In From Day One.',
    commitment:
      "Clean structure, correct headings, structured data, meta strategy built around your keywords. Search engines see exactly what humans see — a site built with intention, not duct-taped together with plugins.",
    proof: 'Target: SEO = 100 · Structured data · Zero crawl errors',
    gradient: 'from-brand-green to-emerald-400',
  },
]

const stats = [
  {
    end: 95, suffix: '+', label: 'Lighthouse Perf — our floor',
    icon: <svg className="w-5 h-5 text-brand-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>,
  },
  {
    end: 3, suffix: '', label: 'AI automations per site',
    icon: <svg className="w-5 h-5 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082" /></svg>,
  },
  {
    end: 99, suffix: '.9%', label: 'Uptime SLA',
    icon: <svg className="w-5 h-5 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.42 15.17l-5.1-5.1m0 0L12 4.37m-5.68 5.7h11.8M4.26 19.72a9 9 0 1115.48 0" /></svg>,
  },
  {
    end: 100, suffix: '', label: 'SEO Score — our standard',
    icon: <svg className="w-5 h-5 text-brand-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>,
  },
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
              <span className="gradient-text">Don&apos;t Take</span>
              <br />
              <span className="text-white">Our Word For It. Measure It.</span>
            </h2>
          </div>
          <div className="reveal stagger-1">
            <p className="section-subtext">
              Every site we build hits these numbers. Not sometimes — every time.
              Run Lighthouse yourself. The scores are public. That&apos;s the point.
            </p>
          </div>
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
