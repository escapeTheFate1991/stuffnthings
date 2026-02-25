'use client'

import { useEffect, useRef } from 'react'

export default function Problem() {
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

  const problems = [
    {
      icon: (
        <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Slow Loading Sites",
      description: "Every second of delay costs you 7% in conversions. Your competitors' faster sites are stealing your customers.",
      stat: "53% of users abandon sites that take over 3 seconds to load"
    },
    {
      icon: (
        <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: "Broken Mobile Experience",
      description: "Over 60% of traffic is mobile, but your site wasn't built for smartphones. Poor mobile UX = lost revenue.",
      stat: "Mobile users are 5x more likely to bounce from unoptimized sites"
    },
    {
      icon: (
        <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      title: "Missing Integrations",
      description: "Your tools don't talk to each other. Manual processes, data silos, and missed opportunities everywhere.",
      stat: "Businesses lose 21% revenue due to poor tool integration"
    }
  ]

  return (
    <section
      id="problem"
      ref={sectionRef}
      className="py-24 bg-slate-900 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="animate-on-scroll">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-red-400">Is your website</span>
              <br />
              <span className="text-white">costing you customers?</span>
            </h2>
          </div>
          
          <div className="animate-on-scroll">
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Most websites are accidentally designed to repel customers. 
              Here are the three biggest revenue killers we see every day:
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="animate-on-scroll card hover:border-red-400/50 text-center"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex justify-center mb-6">
                {problem.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">
                {problem.title}
              </h3>
              
              <p className="text-slate-400 mb-6 leading-relaxed">
                {problem.description}
              </p>
              
              <div className="bg-red-900/20 border border-red-800/30 rounded-lg p-4">
                <p className="text-red-300 font-semibold text-sm">
                  {problem.stat}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="animate-on-scroll">
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                The Hidden Cost of DIY Websites
              </h3>
              <p className="text-lg text-slate-400 mb-6">
                Building and maintaining a high-performance website requires expertise in design, 
                development, SEO, performance optimization, security, and ongoing maintenance. 
                Most businesses spend 6-12 months trying to get it right... and still fall short.
              </p>
              <p className="text-xl text-electric-blue font-semibold">
                What if there was a better way?
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}