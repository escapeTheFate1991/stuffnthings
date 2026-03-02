'use client'

import { useState } from 'react'
import { useScrollReveal } from '@/lib/hooks'
import emailjs from '@emailjs/browser'

const EMAILJS_SERVICE_ID = 'service_wlkod83'
const EMAILJS_TEMPLATE_ID = 'template_k4i21rc'
const EMAILJS_PUBLIC_KEY = 'f3K57-eWieF0Fpm6N'

const inputClass =
  'w-full px-5 py-4 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 focus:border-brand-cyan/30 transition-all duration-300 hover:border-slate-600/50'

const benefits = [
  {
    icon: '🔍',
    title: 'Full Lighthouse Diagnostic',
    text: 'Performance, accessibility, SEO, best practices — we test everything and explain every score in plain language. No jargon.',
  },
  {
    icon: '⚡',
    title: 'Core Web Vitals Breakdown',
    text: 'We identify your LCP, CLS, and INP readings and map each one back to the specific code or infrastructure causing the issue.',
  },
  {
    icon: '📊',
    title: 'Prioritized Action Plan',
    text: 'Not generic tips. A ranked list of what to fix first, what it\u2019ll cost, and how much it\u2019ll move the needle.',
  },
  {
    icon: '🔒',
    title: 'Zero Pressure. Guaranteed.',
    text: 'No follow-up calls you didn\u2019t ask for. No hard sell. We\u2019ll send you the report and let the work speak for itself.',
  },
]

export default function ContactForm() {
  const sectionRef = useScrollReveal<HTMLElement>()
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    websiteUrl: '',
    phone: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          businessName: formData.businessName,
          websiteUrl: formData.websiteUrl,
          phone: formData.phone,
        },
        EMAILJS_PUBLIC_KEY,
      )
      setIsSubmitting(false)
      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({ name: '', businessName: '', websiteUrl: '', phone: '' })
      }, 5000)
    } catch (err: any) {
      setIsSubmitting(false)
      setError('Something went wrong. Please email us directly at info@stuffnthings.io')
      // error already surfaced in UI
    }
  }

  const filledCount = Object.values(formData).filter(Boolean).length

  return (
    <section id="contact" ref={sectionRef} className="py-16 md:py-28 lg:py-36 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />
      {/* Background accents */}
      <div className="absolute top-[20%] left-[-5%] w-[500px] h-[500px] rounded-full bg-brand-cyan/[0.03] blur-[100px]" />
      <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-brand-purple/[0.03] blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="reveal">
            <h2 className="section-heading mb-6">
              <span className="text-white">Get a Free</span>
              <br />
              <span className="gradient-text">Friction Audit</span>
            </h2>
          </div>
          <div className="reveal stagger-1">
            <p className="section-subtext">
              Most sites have 3–5 issues that are quietly costing real money. We&apos;ll find them,
              explain them in plain English, and show you exactly what they&apos;re costing — no obligation.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
          {/* Form */}
          <div className="reveal">
            <div className="relative group">
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-brand-cyan/20 via-brand-purple/10 to-brand-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm" />
              <div className="card relative">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Progress dots */}
                    <div className="flex items-center justify-center gap-2 mb-6">
                      {[0, 1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full transition-all duration-500 ${
                            i < filledCount
                              ? 'bg-brand-cyan w-6'
                              : 'bg-slate-700'
                          }`}
                        />
                      ))}
                    </div>

                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={inputClass}
                        placeholder="Jane Smith"
                      />
                    </div>

                    <div>
                      <label htmlFor="businessName" className="block text-sm font-medium text-slate-300 mb-2">
                        Business Name
                      </label>
                      <input
                        type="text"
                        id="businessName"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        required
                        className={inputClass}
                        placeholder="Acme Inc."
                      />
                    </div>

                    <div>
                      <label htmlFor="websiteUrl" className="block text-sm font-medium text-slate-300 mb-2">
                        Current Website URL
                      </label>
                      <input
                        type="url"
                        id="websiteUrl"
                        name="websiteUrl"
                        value={formData.websiteUrl}
                        onChange={handleChange}
                        required
                        className={inputClass}
                        placeholder="https://yourwebsite.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className={inputClass}
                        placeholder="(555) 123-4567"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn btn-primary !py-5 text-lg mt-2"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-3">
                          <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Analyzing...
                        </span>
                      ) : (
                        'Get My Free Friction Audit →'
                      )}
                    </button>

                    {error && (
                      <p className="text-xs text-red-400 text-center">{error}</p>
                    )}
                    <p className="text-xs text-slate-600 text-center">
                      No spam, ever. We&apos;ll contact you within 24 hours.
                    </p>
                  </form>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-green to-emerald-400 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-brand-green/30 animate-scale-in">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">You&apos;re All Set!</h3>
                    <p className="text-slate-400 max-w-sm mx-auto">
                      Our team will reach out within 24 hours to schedule your
                      comprehensive free friction audit.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="reveal stagger-2 lg:pt-4">
            <div className="mb-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                What We Actually Look At
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Not a traffic-light PDF with no context. Every finding comes with a clear explanation,
                a severity rating, and a concrete fix — whether you work with us or not.
              </p>
            </div>

            <div className="space-y-6 mb-10">
              {benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-4 group cursor-default">
                  <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/50 flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 group-hover:border-brand-cyan/30 transition-all duration-300">
                    {b.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">{b.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{b.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="glass rounded-2xl p-6 border border-brand-green/10">
              <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="text-lg">📋</span> What We Measure
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-xl bg-slate-800/50">
                  <div className="text-2xl font-bold gradient-text">95+</div>
                  <div className="text-xs text-slate-400 mt-1">Lighthouse Performance Target</div>
                </div>
                <div className="text-center p-3 rounded-xl bg-slate-800/50">
                  <div className="text-2xl font-bold gradient-text">&lt;1.5s</div>
                  <div className="text-xs text-slate-400 mt-1">LCP (Largest Contentful Paint)</div>
                </div>
                <div className="text-center p-3 rounded-xl bg-slate-800/50">
                  <div className="text-2xl font-bold gradient-text">100</div>
                  <div className="text-xs text-slate-400 mt-1">Accessibility Score Goal</div>
                </div>
                <div className="text-center p-3 rounded-xl bg-slate-800/50">
                  <div className="text-2xl font-bold gradient-text">0.00</div>
                  <div className="text-xs text-slate-400 mt-1">CLS (Layout Shift) Target</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}