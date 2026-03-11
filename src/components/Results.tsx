'use client'

import { useScrollReveal } from '@/lib/hooks'

const metrics = [
  { value: '3.2x', label: 'Average traffic increase in 90 days' },
  { value: '95+', label: 'Lighthouse performance score, every build' },
  { value: '$2,400', label: 'Average monthly savings from AI automation' },
  { value: '48hr', label: 'From audit to action plan' },
]

const testimonials = [
  {
    quote: 'I used to spend two hours a day answering the same questions. Now our site handles it and I actually get to do my job.',
    name: 'Sarah',
    company: 'Bright Smile Dental',
    gradient: 'from-brand-cyan to-brand-purple',
  },
  {
    quote: 'Our old site was costing us leads we didn\'t even know about. Within a month of the rebuild, our phone started ringing again.',
    name: 'James',
    company: 'Summit Contractors',
    gradient: 'from-brand-purple to-brand-coral',
  },
]

export default function Results() {
  const sectionRef = useScrollReveal<HTMLElement>()

  return (
    <section id="results" ref={sectionRef} className="py-16 md:py-28 lg:py-36 relative overflow-hidden bg-[#0B1120]">
      {/* Edge glow lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-green/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/30 to-transparent" />
      {/* Aurora orbs */}
      <div className="absolute top-[10%] left-[-8%] w-[600px] h-[600px] rounded-full bg-brand-green/[0.07] blur-[130px] animate-aurora-1" />
      <div className="absolute bottom-[5%] right-[-10%] w-[500px] h-[500px] rounded-full bg-brand-cyan/[0.06] blur-[120px] animate-aurora-2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="reveal">
            <h2 className="section-heading mb-6">
              <span className="gradient-text">Real Numbers.</span>
              <br />
              <span className="text-white">Not Marketing Fluff.</span>
            </h2>
          </div>
          <div className="reveal stagger-1">
            <p className="section-subtext">
              These are averages across our client base. Not cherry-picked.
              Not theoretical. Just what happens when you build things right.
            </p>
          </div>
        </div>

        {/* Metrics — MUCH bigger numbers, no card wrappers */}
        <div className="reveal grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-24">
          {metrics.map((metric, i) => (
            <div key={metric.label} className={`stagger-${i + 1} text-center`}>
              <div className="text-6xl md:text-7xl lg:text-8xl font-black gradient-text mb-3" style={{ textShadow: '0 0 25px rgba(6, 182, 212, 0.3), 0 0 50px rgba(168, 85, 247, 0.15)' }}>
                {metric.value}
              </div>
              <div className="text-slate-400 text-sm md:text-base font-medium">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials — Splunk-style: gradient left border, no cards */}
        <div className="space-y-12 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <div key={t.name} className={`${i === 0 ? 'reveal-slide-left' : 'reveal-slide-right'} stagger-${i + 1}`}>
              <div className="grid md:grid-cols-[1fr_auto] gap-8 items-center">
                {/* Quote — gradient left border */}
                <div className="pl-8" style={{
                  borderLeft: `4px solid transparent`,
                  borderImage: `linear-gradient(to bottom, ${i === 0 ? '#06b6d4' : '#a855f7'}, ${i === 0 ? '#a855f7' : '#f97316'}) 1`,
                }}>
                  <p className="text-slate-200 text-xl md:text-2xl leading-relaxed italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                {/* Attribution — clean text, no avatar */}
                <div className="md:text-right pl-8 md:pl-0">
                  <div className="text-white font-semibold">{t.name}</div>
                  <div className="text-slate-500 text-sm">{t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
