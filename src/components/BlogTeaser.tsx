'use client'

import { useScrollReveal } from '@/lib/hooks'

const posts = [
  {
    title: 'Why Your $5,000 Website Is Costing You Customers',
    excerpt: 'Most agency sites look great and do nothing. Slow load times, zero automation, no lead capture. Here\'s what actually matters for local businesses.',
    href: '#',
    gradient: 'from-brand-cyan to-blue-500',
  },
  {
    title: '5 AI Automations Every Local Business Should Have',
    excerpt: 'Chatbots, scheduling, review responses, follow-up sequences, lead scoring. These aren\'t enterprise tools anymore — they\'re table stakes.',
    href: '#',
    gradient: 'from-brand-purple to-pink-500',
  },
  {
    title: 'The Free Website Audit: What We Actually Check',
    excerpt: 'We run 47 checks across performance, SEO, accessibility, and conversion. Here\'s exactly what we look at and why each one matters.',
    href: '#',
    gradient: 'from-brand-coral to-red-500',
  },
]

export default function BlogTeaser() {
  const sectionRef = useScrollReveal<HTMLElement>()

  return (
    <section id="blog" ref={sectionRef} className="py-16 md:py-28 lg:py-36 relative overflow-hidden">
      {/* Edge glow lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-coral/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-purple/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/30 to-slate-950" />
      {/* Aurora orbs */}
      <div className="absolute top-[10%] left-[-8%] w-[500px] h-[500px] rounded-full bg-brand-coral/[0.06] blur-[120px] animate-aurora-1" />
      <div className="absolute bottom-[15%] right-[-10%] w-[400px] h-[400px] rounded-full bg-brand-purple/[0.05] blur-[110px] animate-aurora-2" />
      <div className="absolute top-[50%] left-[40%] w-[400px] h-[400px] rounded-full bg-brand-cyan/[0.04] blur-[100px] animate-aurora-3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="reveal">
            <h2 className="section-heading mb-6">
              <span className="text-white">From Our</span>{' '}
              <span className="gradient-text">Blog</span>
            </h2>
          </div>
          <div className="reveal stagger-1">
            <p className="section-subtext">
              Practical advice for local businesses. No jargon, no fluff — just what works.
            </p>
          </div>
        </div>

        {/* Blog Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <div key={post.title} className={`reveal stagger-${i + 1}`}>
              <a href={post.href} className="block group no-underline h-full">
                <div className="relative bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl !p-0 overflow-hidden h-full flex flex-col hover:border-white/[0.12] hover:shadow-lg hover:shadow-brand-cyan/5 transition-all duration-500">
                  {/* Color accent bar — subtle pulse */}
                  <div className={`h-1 bg-gradient-to-r ${post.gradient} animate-pulse`} />
                  <div className="p-8 flex flex-col flex-1">
                    <h3 className="text-white font-bold text-lg mb-3 font-display group-hover:text-brand-cyan transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-6">
                      {post.excerpt}
                    </p>
                    <span className={`text-sm font-semibold bg-gradient-to-r ${post.gradient} bg-clip-text text-transparent flex items-center gap-1`}>
                      Read More
                      <svg className="w-4 h-4 text-brand-cyan group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
