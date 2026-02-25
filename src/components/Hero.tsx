'use client'

import { useEffect, useRef } from 'react'

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)

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

    if (heroRef.current) {
      const elements = heroRef.current.querySelectorAll('.animate-on-scroll')
      elements.forEach((el) => observer.observe(el))
    }

    return () => observer.disconnect()
  }, [])

  const handleCTAClick = () => {
    const contactSection = document.querySelector('#contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="hero"
      ref={heroRef}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-electric-blue rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-emerald rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 pt-16">
        <div className="animate-on-scroll">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6">
            <span className="gradient-text">High-Performance</span>
            <br />
            <span className="text-white">Digital Presence.</span>
            <br />
            <span className="text-slate-300 text-4xl md:text-5xl lg:text-6xl">
              Zero Technical Friction.
            </span>
          </h1>
        </div>

        <div className="animate-on-scroll">
          <p className="text-xl md:text-2xl text-slate-400 max-w-4xl mx-auto mb-8 leading-relaxed">
            Transform your website into a high-converting, lightning-fast digital presence. 
            Our <span className="text-electric-blue font-semibold">Website-as-a-Service</span> eliminates 
            all technical barriers while delivering enterprise-grade performance.
          </p>
        </div>

        <div className="animate-on-scroll">
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-12">
            Stop losing customers to slow, broken, or outdated websites. 
            We build, optimize, and maintain your entire digital presence.
          </p>
        </div>

        <div className="animate-on-scroll">
          <button
            onClick={handleCTAClick}
            className="btn btn-primary text-xl px-12 py-6 mb-8 shadow-2xl hover:shadow-electric-blue/25"
          >
            Get Your Free Friction Audit
          </button>
        </div>

        <div className="animate-on-scroll">
          <p className="text-sm text-slate-600">
            ✓ No upfront costs &nbsp;&nbsp;&nbsp; ✓ Complete analysis in 48 hours &nbsp;&nbsp;&nbsp; ✓ Actionable insights
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-slate-600 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  )
}