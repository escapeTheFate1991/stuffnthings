'use client'

import { useState } from 'react'

const CONTACT_API = process.env.NEXT_PUBLIC_CONTACT_API || 'https://stuffnthings-contact.stuffnthings.workers.dev'

const inputClass =
  'w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 focus:border-brand-cyan/30 transition-all duration-300 text-sm'

const stats = [
  { value: '55,000', label: 'US jobs cut citing AI in 2025 alone', source: 'Challenger, Gray & Christmas' },
  { value: '25.9%', label: 'Decline in data entry roles by 2034', source: 'Bureau of Labor Statistics' },
  { value: '$1,700–$3,200', label: 'Monthly savings from AI workflow automation', source: 'Industry average' },
  { value: '89%', label: 'Of SMBs already using AI for daily tasks', source: 'Microsoft/LinkedIn Research' },
]

const chapters = [
  {
    number: '01',
    title: 'The AI Layoff Wave',
    description: '25+ companies with specific headcount cuts, roles eliminated, and dates. From Amazon\'s 30,000 to Klarna replacing 700 customer service agents with a single AI.',
  },
  {
    number: '02',
    title: 'Positions Becoming Obsolete',
    description: 'BLS employment projections through 2034 showing which roles are declining fastest — data entry, customer service, bookkeeping, and more.',
  },
  {
    number: '03',
    title: 'The Productivity Counter-Narrative',
    description: 'This isn\'t doom and gloom. WEF projects 170M new jobs vs 92M displaced. AI augments more roles than it replaces — if you adapt.',
  },
  {
    number: '04',
    title: 'Industry-Specific Impact',
    description: 'Medical, legal, real estate, restaurants, e-commerce, consulting, construction, and salons — what\'s automatable in YOUR industry.',
  },
  {
    number: '05',
    title: 'The ROI Math',
    description: 'Real salary benchmarks for 15 positions mapped against automation potential. See exactly what AI saves vs. hiring.',
  },
]

export default function AIWorkforceReport() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessName: '',
    phone: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const res = await fetch(`${CONTACT_API}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          websiteUrl: '',
          message: '[Resource Download] AI Workforce Report 2026',
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Request failed')
      setIsSubmitting(false)
      setIsSubmitted(true)
    } catch (err: any) {
      setIsSubmitting(false)
      setError(err.message || 'Something went wrong. Email us at info@stuffnthings.io')
    }
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Nav back */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="/" className="text-xl font-bold gradient-text tracking-tight">stuffnthings</a>
          <a href="/" className="text-sm text-slate-400 hover:text-white transition-colors">← Back to home</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-brand-cyan/[0.05] blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-brand-purple/[0.05] blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-slate-800/60 rounded-full px-4 py-1.5 text-sm font-medium text-brand-cyan border border-brand-cyan/20 mb-6">
              <span className="w-2 h-2 bg-brand-cyan rounded-full animate-pulse" />
              Free Report — 2026 Edition
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.1] mb-6">
              AI Is Replacing Roles<br />
              <span className="gradient-text">Faster Than Anyone Expected.</span>
            </h1>
            <p className="text-xl text-slate-300/80 leading-relaxed mb-8">
              55,000 US jobs were cut citing AI in 2025 alone — 12× more than two years prior.
              This report breaks down exactly which roles are being automated, which industries
              are most affected, and what smart businesses are doing to stay ahead.
            </p>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            {stats.map((s, i) => (
              <div key={i} className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5 text-center">
                <div className="text-2xl md:text-3xl font-black gradient-text mb-1">{s.value}</div>
                <div className="text-xs text-slate-400 mb-2">{s.label}</div>
                <div className="text-[10px] text-slate-600 italic">{s.source}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content + Form — two columns */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-16">
            {/* Left: What's inside */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold text-white mb-8">What&apos;s Inside the Report</h2>

              <div className="space-y-6">
                {chapters.map((ch) => (
                  <div key={ch.number} className="flex gap-5 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-brand-cyan/20 to-brand-purple/20 border border-slate-700/50 flex items-center justify-center text-brand-cyan font-bold text-sm group-hover:scale-110 transition-transform">
                      {ch.number}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{ch.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{ch.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Key findings preview */}
              <div className="mt-12 bg-slate-800/40 border border-slate-700/50 rounded-2xl p-8">
                <h3 className="text-lg font-bold text-white mb-6">Key Findings</h3>
                <div className="space-y-4">
                  {[
                    'Amazon, Intel, UPS, Salesforce, and 20+ more companies have cut 100K+ jobs citing AI',
                    'Data entry roles declining 25.9% by 2034 — the steepest decline of any occupation (BLS)',
                    'Customer service positions projected to lose 153,700 jobs by 2034 (BLS)',
                    'AI-exposed industries saw productivity growth jump from 7% to 27% — a 4× increase (PwC)',
                    '75% of knowledge workers now use AI at work. 46% started in just the last 6 months (Microsoft)',
                    'Businesses using AI automation save $1,700–$3,200/month on average in staff equivalent costs',
                  ].map((finding, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-brand-cyan flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                      <span className="text-slate-300 text-sm">{finding}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sources note */}
              <p className="mt-8 text-xs text-slate-600">
                Data sourced from Bureau of Labor Statistics, Challenger Gray & Christmas, Goldman Sachs Research,
                World Economic Forum, PwC Global AI Jobs Barometer, Microsoft Work Trend Index, and 15+ additional sources.
                Full citations included in the report.
              </p>
            </div>

            {/* Right: Download form */}
            <div className="lg:col-span-2">
              <div className="sticky top-24">
                <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-8">
                  {!isSubmitted ? (
                    <>
                      <h3 className="text-xl font-bold text-white mb-2">Download the Full Report</h3>
                      <p className="text-slate-400 text-sm mb-6">
                        Free. No strings attached. See the data and decide for yourself.
                      </p>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-xs font-medium text-slate-400 mb-1.5">Full Name</label>
                          <input
                            type="text" id="name" name="name" required
                            value={formData.name} onChange={handleChange}
                            className={inputClass} placeholder="Jane Smith"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-xs font-medium text-slate-400 mb-1.5">Work Email</label>
                          <input
                            type="email" id="email" name="email" required
                            value={formData.email} onChange={handleChange}
                            className={inputClass} placeholder="jane@acme.com"
                          />
                        </div>
                        <div>
                          <label htmlFor="businessName" className="block text-xs font-medium text-slate-400 mb-1.5">Business Name</label>
                          <input
                            type="text" id="businessName" name="businessName" required
                            value={formData.businessName} onChange={handleChange}
                            className={inputClass} placeholder="Acme Inc."
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-xs font-medium text-slate-400 mb-1.5">Phone <span className="text-slate-600">(optional)</span></label>
                          <input
                            type="tel" id="phone" name="phone"
                            value={formData.phone} onChange={handleChange}
                            className={inputClass} placeholder="(555) 123-4567"
                          />
                        </div>

                        <button type="submit" disabled={isSubmitting} className="w-full btn btn-primary !py-4 text-base mt-2">
                          {isSubmitting ? (
                            <span className="flex items-center justify-center gap-2">
                              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              Processing...
                            </span>
                          ) : (
                            'Get the Free Report →'
                          )}
                        </button>

                        {error && <p className="text-xs text-red-400 text-center">{error}</p>}
                        <p className="text-[10px] text-slate-600 text-center">No spam. We&apos;ll email you the PDF within minutes.</p>
                      </form>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-green to-emerald-400 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-brand-green/30">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Check Your Inbox!</h3>
                      <p className="text-slate-400 text-sm mb-6">
                        We&apos;ll send the full report to your email within a few minutes.
                      </p>
                      <a href="/" className="text-brand-cyan hover:text-white transition-colors text-sm">
                        ← Back to stuffnthings.io
                      </a>
                    </div>
                  )}
                </div>

                {/* Social proof */}
                <div className="mt-6 text-center">
                  <p className="text-xs text-slate-600">
                    Sourced from BLS, Goldman Sachs, WEF, PwC, Microsoft, and 15+ verified sources
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 border-t border-slate-800/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to See What AI Can Do for <span className="gradient-text">Your Business?</span>
          </h2>
          <p className="text-lg text-slate-400 mb-8">
            We&apos;ll audit your website, identify where AI can save you time and money, and show you the math. Free. No obligation.
          </p>
          <a href="/#contact" className="btn btn-primary text-lg px-10 py-5 inline-block">
            Get Your Free Site Audit →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <p className="text-xs text-slate-600">© {new Date().getFullYear()} Stuff N Things LLC</p>
          <div className="flex gap-4 text-xs text-slate-600">
            <a href="/privacy" className="hover:text-slate-400">Privacy</a>
            <a href="/terms" className="hover:text-slate-400">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
