'use client'

import { useEffect, useRef, useCallback } from 'react'
import { useParallax } from '@/lib/hooks'

/* ── Particle Canvas ── */
function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let particles: { x: number; y: number; vx: number; vy: number; r: number; o: number }[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const count = Math.min(80, Math.floor(window.innerWidth / 18))
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 0.5,
        o: Math.random() * 0.5 + 0.1,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(6, 182, 212, ${p.o})`
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const dx = p.x - particles[j].x
          const dy = p.y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 150) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.08 * (1 - dist / 150)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      })
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />
}

/* ── Floating UI Elements ── */
function FloatingElements() {
  const offset = useParallax(15)
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {/* AI Workflow Automation badge */}
      <div
        className="absolute top-[15%] left-[6%] animate-float hidden lg:block"
        style={{ transform: `translate(${offset.x * 0.5}px, ${offset.y * 0.5}px)` }}
      >
        <div className="glass rounded-2xl px-5 py-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-cyan/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-brand-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
            </svg>
          </div>
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">AI Workflow</div>
            <div className="text-lg font-bold text-brand-cyan">Automating</div>
          </div>
        </div>
      </div>

      {/* Lead Capture badge */}
      <div
        className="absolute top-[25%] right-[6%] animate-float-delayed hidden lg:block"
        style={{ transform: `translate(${offset.x * -0.3}px, ${offset.y * -0.3}px)` }}
      >
        <div className="glass rounded-2xl px-5 py-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-green/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
          </div>
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Lead Captured</div>
            <div className="text-lg font-bold text-brand-green">+1 New</div>
          </div>
        </div>
      </div>

      {/* Performance badge */}
      <div
        className="absolute bottom-[35%] left-[10%] animate-float-slow hidden lg:block"
        style={{ transform: `translate(${offset.x * 0.4}px, ${offset.y * 0.4}px)` }}
      >
        <div className="glass rounded-2xl px-5 py-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-purple/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
          </div>
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Lighthouse Score</div>
            <div className="text-lg font-bold text-brand-cyan">98 / 100</div>
          </div>
        </div>
      </div>

      {/* Uptime badge */}
      <div
        className="absolute bottom-[28%] right-[8%] animate-float hidden lg:block"
        style={{ transform: `translate(${offset.x * -0.6}px, ${offset.y * -0.6}px)` }}
      >
        <div className="glass rounded-2xl px-5 py-3 flex items-center gap-3">
          <div className="w-3 h-3 bg-brand-green rounded-full animate-pulse" />
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Uptime SLA</div>
            <div className="text-lg font-bold text-white">99.9%</div>
          </div>
        </div>
      </div>
    </div>
  )
}

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
      {/* Gradient orbs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-brand-cyan/[0.07] blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-brand-purple/[0.07] blur-[120px]" />
        <div className="absolute top-[40%] left-[50%] w-[400px] h-[400px] rounded-full bg-brand-coral/[0.04] blur-[100px]" />
      </div>

      <ParticleBackground />
      <FloatingElements />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 pt-24 pb-16">
        {/* Tagline chip */}
        <div className="hero-reveal reveal mb-8">
          <span className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 text-sm font-medium text-brand-cyan border border-brand-cyan/20">
            <span className="w-2 h-2 bg-brand-cyan rounded-full animate-pulse" />
            Now accepting new partners — Free site audit included
          </span>
        </div>

        {/* Main heading */}
        <div className="hero-reveal reveal">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.95] mb-8 tracking-tight">
            <span className="gradient-text inline-block">Run Your</span>
            <br />
            <span className="text-white inline-block">Business.</span>
            <br />
            <span className="text-white inline-block">Let AI Handle</span>
            <br />
            <span className="gradient-text inline-block">the Rest.</span>
          </h1>
        </div>

        <div className="hero-reveal reveal">
          <p className="text-xl md:text-2xl text-slate-300/80 max-w-3xl mx-auto mb-12 leading-relaxed">
            We build fast, high-performing websites — then plug in AI that writes your content,
            captures your leads, and keeps everything running. You don&apos;t lift a finger.
          </p>
        </div>

        {/* CTA Group */}
        <div className="hero-reveal reveal flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button
            onClick={handleCTAClick}
            className="btn btn-primary text-lg px-10 py-5 animate-pulse-glow"
          >
            Get Your Free Site Audit
            <svg className="inline-block ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
          <button
            onClick={handleWorkClick}
            className="btn text-lg px-10 py-5 border border-slate-600/60 text-slate-300 hover:border-brand-cyan/50 hover:text-white transition-all duration-300"
          >
            See Our Work
          </button>
        </div>

        {/* Trust bar */}
        <div className="hero-reveal reveal">
          <div className="glass rounded-2xl border border-slate-700/30 px-6 py-4 inline-flex flex-wrap items-center justify-center gap-6 md:gap-10">
            <span className="flex items-center gap-2 text-sm text-slate-400">
              <span className="w-2 h-2 bg-brand-green rounded-full" />
              No contracts
            </span>
            <span className="hidden md:block w-px h-4 bg-slate-700" />
            <span className="flex items-center gap-2 text-sm text-slate-400">
              <span className="w-2 h-2 bg-brand-green rounded-full" />
              Cancel anytime
            </span>
            <span className="hidden md:block w-px h-4 bg-slate-700" />
            <span className="flex items-center gap-2 text-sm text-slate-400">
              <span className="w-2 h-2 bg-brand-green rounded-full" />
              48-hour audit turnaround
            </span>
            <span className="hidden md:block w-px h-4 bg-slate-700" />
            <span className="flex items-center gap-2 text-sm text-slate-400">
              <span className="w-2 h-2 bg-brand-green rounded-full" />
              Every score is verifiable
            </span>
          </div>
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
