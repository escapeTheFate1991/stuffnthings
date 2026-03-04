'use client'

import { useState } from 'react'
import { useScrollReveal } from '@/lib/hooks'

const CONTACT_API = process.env.NEXT_PUBLIC_CONTACT_API || 'https://stuffnthings-contact.stuffnthings.workers.dev'

const inputClass =
  'w-full px-5 py-4 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 focus:border-brand-cyan/30 transition-all duration-300 hover:border-slate-600/50'

const benefits = [
  {
    icon: (
      <svg className="w-6 h-6 text-brand-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
    title: 'Full Site Diagnostic',
    text: 'Performance, SEO, conversion paths, AI automation potential — we test everything and explain every finding in plain language.',
  },
  {
    icon: (
      <svg className="w-6 h-6 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: 'Core Web Vitals Breakdown',
    text: 'We identify your LCP, CLS, and INP scores and trace each one back to the specific code or infrastructure causing the problem.',
  },
  {
    icon: (
      <svg className="w-6 h-6 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082" />
      </svg>
    ),
    title: 'AI Automation Opportunities',
    text: 'We scan your site for areas where AI can automate tasks — content, lead capture, customer interactions — and show you exactly how much time and money it saves.',
  },
  {
    icon: (
      <svg className="w-6 h-6 text-brand-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: 'Zero Pressure. Guaranteed.',
    text: 'No follow-up calls you didn\'t ask for. No hard sell. We send you the report and let the work speak for itself.',
  },
]

export default function ContactForm() {
  const sectionRef = useScrollReveal<HTMLElement>()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessName: '',
    websiteUrl: '',
    phone: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const res = await fetch(`${CONTACT_API}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Request failed')
      setIsSubmitting(false)
      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({ name: '', email: '', businessName: '', websiteUrl: '', phone: '', message: '' })
      }, 5000)
    } catch (err: any) {
      setIsSubmitting(false)
      setError(err.message || 'Something went wrong. Please email us directly at info@stuffnthings.io')
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
              <span className="text-white">Get Your Free</span>
              <br />
              <span className="gradient-text">Site Audit</span>
            </h2>
          </div>
          <div className="reveal stagger-1">
            <p className="section-subtext">
              Most sites have 3–5 issues quietly costing real money. We&apos;ll find them,
              explain them in plain English, and show you what to fix first — no obligation.
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
                      <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={inputClass}
                        placeholder="jane@acme.com"
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

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                        Message <span className="text-slate-600">(optional)</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={3}
                        className={`${inputClass} resize-none`}
                        placeholder="Tell us about your project or what you need help with..."
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
                        'Get My Free Site Audit →'
                      )}
                    </button>

                    {error && (
                      <p className="text-xs text-red-400 text-center">{error}</p>
                    )}
                    <p className="text-xs text-slate-600 text-center">
                      No spam, ever. We&apos;ll reach out within 24 hours.
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
                      We&apos;ll reach out within 24 hours to kick off your free site audit.
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
                Not a traffic-light PDF with zero context. Every finding comes with an explanation,
                a severity rating, and a concrete fix — whether you work with us or not.
              </p>
            </div>

            <div className="space-y-6 mb-10">
              {benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-4 group cursor-default">
                  <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:border-brand-cyan/30 transition-all duration-300">
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
                <svg className="w-5 h-5 text-brand-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
                What We Measure
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
                  <div className="text-2xl font-bold gradient-text">3</div>
                  <div className="text-xs text-slate-400 mt-1">AI Automations Per Site</div>
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
