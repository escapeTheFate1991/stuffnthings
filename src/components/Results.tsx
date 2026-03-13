'use client'

import { useScrollReveal, useCountUp } from '@/lib/hooks'

const metrics = [
  { value: 3.2, suffix: 'x', label: 'Average traffic increase in 90 days' },
  { value: 95, suffix: '+', label: 'Lighthouse performance score, every build' },
  { value: 2400, suffix: '', label: 'Average monthly savings from AI automation', prefix: '$' },
  { value: 48, suffix: 'hr', label: 'From audit to action plan' },
]

const testimonials = [
  {
    quote: 'I used to spend two hours a day answering the same questions. Now our site handles it and I actually get to do my job.',
    name: 'Sarah',
    company: 'Bright Smile Dental',
  },
  {
    quote: 'Our old site was costing us leads we didn\'t even know about. Within a month of the rebuild, our phone started ringing again.',
    name: 'James',
    company: 'Summit Contractors',
  },
]

/* ── Metric with count-up + glowing underline ── */
function MetricBlock({ metric }: { metric: (typeof metrics)[0] }) {
  const { ref, value } = useCountUp(metric.value === 3.2 ? 32 : metric.value, 2200)
  const displayValue = metric.value === 3.2
    ? `${(value / 10).toFixed(1)}`
    : `${value}`

  return (
    <div ref={ref} className="text-center">
      <div className="relative inline-block">
        <div
          className="text-5xl md:text-6xl lg:text-7xl font-black gradient-text mb-1"
          style={{ textShadow: '0 0 30px rgba(6, 182, 212, 0.3), 0 0 60px rgba(168, 85, 247, 0.15)' }}
        >
          {metric.prefix || ''}{displayValue}{metric.suffix}
        </div>
        {/* Animated gradient underline */}
        <div className="h-[2px] w-full mt-1 rounded-full overflow-hidden">
          <div className="h-full w-full bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-coral animate-pulse opacity-60" />
        </div>
      </div>
      <div className="text-slate-400 text-sm md:text-base font-medium mt-3">{metric.label}</div>
    </div>
  )
}

export default function Results() {
  const sectionRef = useScrollReveal<HTMLElement>()

  return (
    <section id="results" ref={sectionRef} className="py-16 md:py-28 lg:py-36 relative overflow-hidden bg-black">
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

        {/* Metrics — count-up with glowing underlines */}
        <div className="reveal grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-12 md:gap-16 mb-24">
          {metrics.map((metric, i) => (
            <div key={metric.label} className={`stagger-${i + 1}`}>
              <MetricBlock metric={metric} />
            </div>
          ))}
        </div>

        {/* Testimonials — stacked, full-width, large quote */}
        <div className="space-y-16 max-w-4xl mx-auto">
          {testimonials.map((t, i) => (
            <div key={t.name} className={`${i === 0 ? 'reveal-slide-left' : 'reveal-slide-right'} stagger-${i + 1}`}>
              {/* Gradient line above */}
              <div className={`h-px w-full bg-gradient-to-r ${i === 0 ? 'from-transparent via-brand-cyan/30 to-transparent' : 'from-transparent via-brand-purple/30 to-transparent'} mb-10`} />

              <div className="text-center">
                <p className="text-white text-2xl md:text-3xl leading-relaxed italic font-light">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6">
                  <div className="text-white font-semibold">{t.name}</div>
                  <div className="text-slate-500 text-sm">{t.company}</div>
                </div>
              </div>

              {/* Gradient line below */}
              <div className={`h-px w-full bg-gradient-to-r ${i === 0 ? 'from-transparent via-brand-purple/30 to-transparent' : 'from-transparent via-brand-coral/30 to-transparent'} mt-10`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
