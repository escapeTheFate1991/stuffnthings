'use client'

import { useScrollReveal, useCountUp } from '@/lib/hooks'

function MetricCard({ value, suffix, label, color }: { value: string; suffix?: string; label: string; color: string }) {
  return (
    <div className="text-center group cursor-default">
      <div className={`text-4xl md:text-5xl lg:text-6xl font-black mb-2 ${color}`}>
        {value}{suffix}
      </div>
      <div className="text-slate-400 text-sm md:text-base font-medium">{label}</div>
    </div>
  )
}

const metrics = [
  { value: '3.2x', label: 'Average traffic increase in 90 days', color: 'gradient-text' },
  { value: '95+', label: 'Lighthouse performance score, every build', color: 'gradient-text' },
  { value: '$2,400', label: 'Average monthly savings from AI automation', color: 'gradient-text' },
  { value: '48hr', label: 'From audit to action plan', color: 'gradient-text' },
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
    <section id="results" ref={sectionRef} className="py-16 md:py-28 lg:py-36 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />

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

        {/* Metrics Grid */}
        <div className="reveal grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-20">
          {metrics.map((metric, i) => (
            <div key={metric.label} className={`stagger-${i + 1}`}>
              <MetricCard {...metric} />
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <div key={t.name} className={`reveal stagger-${i + 1}`}>
              <div className="card relative h-full">
                {/* Quote mark */}
                <svg className="w-10 h-10 text-slate-700/50 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11h4v10H0z" />
                </svg>
                <p className="text-slate-300 text-lg leading-relaxed mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center`}>
                    <span className="text-white font-bold text-sm">{t.name[0]}</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{t.name}</div>
                    <div className="text-slate-500 text-xs">{t.company}</div>
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
