'use client'

import { useEffect, useRef } from 'react'

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      const elements = sectionRef.current.querySelectorAll('.animate-on-scroll')
      elements.forEach((el) => observer.observe(el))
    }

    return () => observer.disconnect()
  }, [])

  const steps = [
    {
      number: "01",
      title: "Free Friction Audit",
      subtitle: "We analyze what's broken",
      description: "Our team performs a comprehensive analysis of your current website, identifying performance bottlenecks, conversion killers, and missed opportunities. You'll receive a detailed report with actionable insights within 48 hours.",
      timeline: "48 hours",
      deliverables: [
        "Performance analysis & speed test",
        "Mobile optimization review",
        "SEO & technical audit",
        "Conversion optimization assessment",
        "Detailed improvement roadmap"
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    },
    {
      number: "02",
      title: "We Build & Launch",
      subtitle: "From strategy to live site",
      description: "Based on the audit findings, we design and build your high-performance website from the ground up. Every element is optimized for speed, conversions, and user experience. We handle everything while you focus on running your business.",
      timeline: "2-4 weeks",
      deliverables: [
        "Custom website design & development",
        "Performance optimization",
        "SEO implementation",
        "Mobile-first responsive design",
        "Testing & quality assurance"
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      number: "03",
      title: "We Manage Everything",
      subtitle: "Ongoing optimization & support",
      description: "Your website is never 'done.' We continuously monitor, optimize, and improve your site's performance. From security updates to conversion testing, we handle all technical aspects so your website gets better over time, not worse.",
      timeline: "Ongoing",
      deliverables: [
        "Continuous performance monitoring",
        "Regular security updates",
        "A/B testing & optimization",
        "Monthly reporting & insights",
        "Unlimited updates & support"
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ]

  const handleCTAClick = () => {
    const contactSection = document.querySelector('#contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-24 bg-slate-900 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="animate-on-scroll">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">How It</span>
              <span className="gradient-text"> Works</span>
            </h2>
          </div>
          
          <div className="animate-on-scroll">
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              From broken to brilliant in three simple steps. 
              We handle all the technical complexity while you see the results.
            </p>
          </div>
        </div>

        <div className="space-y-16 lg:space-y-24">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`animate-on-scroll grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
              style={{ animationDelay: `${index * 300}ms` }}
            >
              <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="flex items-center mb-6">
                  <div className="bg-electric-blue text-white p-3 rounded-xl mr-4">
                    {step.icon}
                  </div>
                  <div className="text-electric-blue text-6xl font-bold opacity-20">
                    {step.number}
                  </div>
                </div>

                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {step.title}
                </h3>
                
                <p className="text-xl text-electric-blue mb-4 font-medium">
                  {step.subtitle}
                </p>
                
                <p className="text-lg text-slate-400 mb-6 leading-relaxed">
                  {step.description}
                </p>

                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-white font-semibold">Deliverables</h4>
                    <span className="text-emerald font-medium text-sm">
                      Timeline: {step.timeline}
                    </span>
                  </div>
                  
                  <ul className="space-y-2">
                    {step.deliverables.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center text-sm text-slate-300">
                        <svg className="w-4 h-4 text-emerald mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 h-full flex items-center justify-center min-h-[400px]">
                  <div className="text-center">
                    <div className="text-8xl font-bold gradient-text mb-4">
                      {step.number}
                    </div>
                    <div className="text-2xl text-white font-semibold">
                      {step.title}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="animate-on-scroll">
            <div className="bg-electric-blue/10 border border-electric-blue/20 rounded-xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Transform Your Digital Presence?
              </h3>
              <p className="text-lg text-slate-300 mb-6">
                The first step costs nothing. Get your free friction audit and discover 
                exactly what&apos;s holding your website back from peak performance.
              </p>
              <button
                onClick={handleCTAClick}
                className="btn btn-primary text-lg px-8 py-4"
              >
                Start Your Free Audit Today
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}