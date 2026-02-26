'use client'

import { useScrollReveal, useCountUp } from '@/lib/hooks'

/* ── Avatar ── */
function Avatar({ name, gradient }: { name: string; gradient: string }) {
  const initials = name.split(' ').map((n) => n[0]).join('')
  return (
    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-lg`}>
      {initials}
    </div>
  )
}

/* ── Stat ── */
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

/* ── Logo Marquee ── */
function LogoMarquee() {
  const logos = [
    'TechFlow', 'Meridian', 'CloudSync', 'Pinnacle', 'Elevate',
    'VitalCare', 'NovaTech', 'Horizon', 'Apex', 'Radiant',
  ]
  const doubled = [...logos, ...logos]

  return (
    <div className="relative overflow-hidden py-8 mb-16">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-950 to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-950 to-transparent z-10" />
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((name, i) => (
          <div key={i} className="mx-8 flex items-center gap-2 text-slate-600 hover:text-slate-400 transition-colors duration-300">
            <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700/50 flex items-center justify-center text-xs font-bold">
              {name[0]}
            </div>
            <span className="text-lg font-semibold tracking-tight">{name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const testimonials = [
  {
    name: 'Sarah Chen',
    title: 'Head of Operations, TechFlow Solutions',
    quote: "We'd been living with a slow, outdated site for two years. The team rebuilt it properly — mobile-first, clean architecture, no shortcuts. Our Lighthouse score went from 54 to 97. We finally feel confident sending clients to our URL.",
    result: 'Lighthouse: 54 → 97 · LCP: 4.2s → 0.9s',
    gradient: 'from-brand-cyan to-blue-500',
  },
  {
    name: 'Marcus Rodriguez',
    title: 'Founder, Elevate Digital',
    quote: "What stood out was that they treated our website like infrastructure, not a design project. They identified three critical performance bottlenecks in the first week that our previous agency had never flagged. It's been maintained proactively ever since.",
    result: 'Perf: 61 → 96 · Accessibility: 78 → 100',
    gradient: 'from-brand-purple to-pink-500',
  },
  {
    name: 'Jennifer Liu',
    title: 'Director of Marketing, Pinnacle Consulting',
    quote: "The audit they delivered before we even signed a contract was more thorough than anything we'd received from vendors we'd paid. That set the tone — every recommendation has been clear, prioritized, and actually implemented.",
    result: 'SEO: 72 → 100 · CLS: 0.24 → 0.00',
    gradient: 'from-brand-green to-emerald-400',
  },
]

const stats = [
  { end: 95, suffix: '+', label: 'Avg Lighthouse Performance', icon: '🚀' },
  { end: 100, suffix: '', label: 'Accessibility Score Target', icon: '♿' },
  { end: 99, suffix: '.9%', label: 'Uptime SLA', icon: '🔧' },
  { end: 100, suffix: '', label: 'SEO Score Target', icon: '📡' },
]

export default function SocialProof() {
  const sectionRef = useScrollReveal<HTMLElement>()

  return (
    <section id="testimonials" ref={sectionRef} className="py-28 md:py-36 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="reveal">
            <h2 className="section-heading mb-6">
              <span className="gradient-text">The scores speak</span>
              <br />
              <span className="text-white">for themselves.</span>
            </h2>
          </div>
          <div className="reveal stagger-1">
            <p className="section-subtext">
              Every site we deliver is measured against the same standard Google uses to rank your competition.
              Here&apos;s what that looks like in practice.
            </p>
          </div>
        </div>

        {/* Logo Marquee */}
        <div className="reveal">
          <p className="text-center text-xs uppercase tracking-[0.2em] text-slate-600 font-medium mb-4">
            Trusted by teams that take their web presence seriously
          </p>
          <LogoMarquee />
        </div>

        {/* Stats */}
        <div className="reveal grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((s, i) => (
            <div key={i} className={`stagger-${i + 1}`}>
              <Stat {...s} />
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className={`reveal stagger-${i + 1}`}>
              <div className="relative group h-full">
                {/* Gradient border glow on hover */}
                <div className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-br ${t.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm`} />
                <div className="card relative h-full flex flex-col">
                  <div className="flex items-center gap-4 mb-5">
                    <Avatar name={t.name} gradient={t.gradient} />
                    <div>
                      <h4 className="text-white font-semibold">{t.name}</h4>
                      <p className="text-slate-500 text-sm">{t.title}</p>
                    </div>
                  </div>

                  {/* Quote */}
                  <div className={`text-3xl font-serif bg-gradient-to-r ${t.gradient} bg-clip-text text-transparent leading-none mb-3`}>
                    &ldquo;
                  </div>
                  <blockquote className="text-slate-300 mb-6 leading-relaxed flex-1">
                    {t.quote}
                  </blockquote>

                  {/* Result badge */}
                  <div className="bg-brand-green/5 border border-brand-green/15 rounded-xl p-3">
                    <p className="text-brand-green font-semibold text-sm">{t.result}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}