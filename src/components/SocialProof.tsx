'use client'

import { useEffect, useRef } from 'react'

function Avatar({ name }: { name: string }) {
  const initials = name.split(' ').map(n => n[0]).join('')
  return (
    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
      {initials}
    </div>
  )
}

export default function SocialProof() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const testimonials = [
    {
      name: 'Sarah Chen',
      title: 'CEO, TechFlow Solutions',
      quote: 'Stuff N Things transformed our online presence completely. Our site speed increased by 340% and conversions doubled in the first month.',
      result: '+340% Speed, +127% Conversions',
    },
    {
      name: 'Marcus Rodriguez',
      title: 'Founder, Elevate Marketing',
      quote: "They didn't just build us a pretty website — they built a revenue-generating machine. ROI was positive within 6 weeks.",
      result: '6-week ROI, +89% Lead Quality',
    },
    {
      name: 'Jennifer Liu',
      title: 'Director, Pinnacle Consulting',
      quote: 'Mobile traffic converted 3× better immediately. Their ongoing support means we never worry about technical issues.',
      result: '+300% Mobile Conversions',
    },
  ]

  const stats = [
    { number: '340%', label: 'Avg Speed Increase', icon: '⚡' },
    { number: '127%', label: 'Conversion Lift', icon: '📈' },
    { number: '98+', label: 'PageSpeed Scores', icon: '🚀' },
    { number: '99.9%', label: 'Uptime Guarantee', icon: '🔧' },
  ]

  return (
    <section id="testimonials" ref={ref} className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="animate-on-scroll text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Proven Results.</span>{' '}
            <span className="text-white">Real Impact.</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Don&apos;t take our word for it. Here&apos;s what our clients achieve.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((s, i) => (
            <div key={i} className="animate-on-scroll text-center" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-1">{s.number}</div>
              <div className="text-slate-400 text-sm font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="animate-on-scroll card" style={{ transitionDelay: `${i * 150}ms` }}>
              <div className="flex items-center gap-4 mb-4">
                <Avatar name={t.name} />
                <div>
                  <h4 className="text-white font-semibold">{t.name}</h4>
                  <p className="text-slate-400 text-sm">{t.title}</p>
                </div>
              </div>
              <blockquote className="text-slate-300 mb-4 leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                <p className="text-emerald-400 font-semibold text-sm">{t.result}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}