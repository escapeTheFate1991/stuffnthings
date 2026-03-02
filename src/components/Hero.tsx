'use client'

import { useEffect, useRef, useCallback } from 'react'

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const children = el.querySelectorAll('.hero-reveal')
    children.forEach((child, i) => {
      setTimeout(() => child.classList.add('visible'), 200 + i * 180)
    })
  }, [])

  const handleCTAClick = useCallback(() => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const handleWorkClick = useCallback(() => {
    document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <section
      id="hero"
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-950"
    >
      {/* Gradient orbs — atmospheric, not distracting */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-brand-cyan/[0.07] blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-brand-purple/[0.07] blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 pt-24 pb-16">
        {/* Tagline chip */}
        <div className="hero-reveal reveal mb-8">
          <span className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 text-sm font-medium text-brand-cyan border border-brand-cyan/20">
            <span className="w-2 h-2 bg-brand-cyan rounded-full animate-pulse" />
            Now accepting new clients — Free friction audit included
          </span>
        </div>

        {/* Main heading — Center-Stage pattern */}
        <div className="hero-reveal reveal">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.95] mb-8 tracking-tight font-display">
            <span className="gradient-text inline-block">We Become</span>
            <br />
            <span className="text-white inline-block">Your Web Team.</span>
          </h1>
        </div>

        <div className="hero-reveal reveal">
          <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-300/80 mb-8 tracking-tight font-display">
            The one you never had to hire.
          </p>
        </div>

        <div className="hero-reveal reveal">
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            Design, engineering, performance, security, strategy — we handle everything web so you can focus on your business.
            Your website improves every month instead of slowly degrading.
          </p>
        </div>

        {/* CTA Group */}
        <div className="hero-reveal reveal flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button
            onClick={handleCTAClick}
            className="btn btn-primary text-lg px-10 py-5 animate-pulse-glow"
          >
            Get Your Free Friction Audit
            <svg className="inline-block ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
          <button
            onClick={handleWorkClick}
            className="btn text-lg px-10 py-5 border border-slate-600/60 text-slate-300 hover:border-brand-cyan/50 hover:text-white transition-all duration-300"
          >
            See Our Standards
          </button>
        </div>

        {/* Trust bar */}
        <div className="hero-reveal reveal flex flex-wrap items-center justify-center gap-6 md:gap-10 text-sm text-slate-500">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-brand-green" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
            No contracts · No upfront costs
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-brand-green" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
            Friction audit in 48 hours
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-brand-green" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
            Verifiable performance metrics
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center text-slate-600 animate-bounce-subtle">
          <div className="w-5 h-8 border border-slate-700 rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-2 bg-slate-600 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}
