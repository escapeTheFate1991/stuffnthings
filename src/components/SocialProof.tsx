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
      "We don't ship anything below 95 on Google Lighthouse. That's not a goal — it's a rule. You can verify it yourself the day the site goes live. Open DevTools, run the audit, see the number.",
    proof: 'Target: Lighthouse Perf ≥ 95 · LCP < 1.5s · CLS = 0.00',
    gradient: 'from-brand-cyan to-blue-500',
  },
  {
    icon: '🤖',
    title: 'AI That Actually Does the Work.',
    commitment:
      "We don't just build your site and hand you a login. Our AI generates content, captures leads, and monitors performance — so your web presence grows while you focus on your business.",
    proof: 'Included: AI Content · Lead Capture · Performance Monitoring',
    gradient: 'from-brand-purple to-pink-500',
  },
  {
    icon: '📡',
    title: 'SEO Architecture from Day One.',
    commitment:
      "Clean structure, correct headings, structured data, meta strategy built around your actual keywords. Search engines see what humans see — a site built with intention, not cobbled together with plugins.",
    proof: 'Target: SEO = 100 · Structured data · Zero crawl errors',
    gradient: 'from-brand-green to-emerald-400',
  },
]

const stats = [
  { end: 95, suffix: '+', label: 'Lighthouse Perf — our floor', icon: '🚀' },
  { end: 3, suffix: '', label: 'AI automations per site', icon: '🤖' },
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
