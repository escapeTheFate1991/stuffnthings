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

        // Connect nearby particles
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
      {/* Speed badge */}
      <div
        className="absolute top-[18%] left-[8%] animate-float hidden lg:block"
        style={{ transform: `translate(${offset.x * 0.5}px, ${offset.y * 0.5}px)` }}
      >
        <div className="glass rounded-2xl px-5 py-3 flex items-center gap-3">
          <span className="text-2xl">⚡</span>
          <div>
            <div className="text-xs text-slate-400">PageSpeed</div>
            <div className="text-lg font-bold text-brand-cyan">98/100</div>
          </div>
        </div>
      </div>

      {/* Code snippet */}
      <div
        className="absolute top-[25%] right-[6%] animate-float-delayed hidden lg:block"
        style={{ transform: `translate(${offset.x * -0.3}px, ${offset.y * -0.3}px)` }}
      >
        <div className="glass rounded-2xl px-5 py-3 font-mono text-xs">
          <span className="text-brand-purple">const</span>{' '}
          <span className="text-brand-cyan">speed</span>{' '}
          <span className="text-slate-400">=</span>{' '}
          <span className="text-brand-green">&quot;blazing&quot;</span>
          <span className="text-slate-500">;</span>
        </div>
      </div>

      {/* Conversion badge */}
      <div
        className="absolute bottom-[22%] left-[10%] animate-float-slow hidden lg:block"
        style={{ transform: `translate(${offset.x * 0.4}px, ${offset.y * 0.4}px)` }}
      >
        <div className="glass rounded-2xl px-5 py-3 flex items-center gap-3">
          <span className="text-2xl">📈</span>
          <div>
            <div className="text-xs text-slate-400">Conversions</div>
            <div className="text-lg font-bold text-brand-green">+127%</div>
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
            <div className="text-xs text-slate-400">Uptime</div>
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
    // Trigger staggered reveals after mount
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
            Website-as-a-Service — Build · Ship · Grow
          </span>
        </div>

        {/* Main heading with kinetic type */}
        <div className="hero-reveal reveal">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.95] mb-8 tracking-tight">
            <span className="gradient-text inline-block">High-Performance</span>
            <br />
            <span className="text-white inline-block">Digital Presence.</span>
          </h1>
        </div>

        <div className="hero-reveal reveal">
          <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-300/80 mb-8 tracking-tight">
            Zero Technical Friction.
          </p>
        </div>

        <div className="hero-reveal reveal">
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            We build, optimize, and manage stunning websites that load in under a second,
            convert visitors into customers, and grow your business on autopilot.
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
            className="btn btn-secondary text-lg px-10 py-5"
          >
            See Our Work
          </button>
        </div>

        {/* Trust bar */}
        <div className="hero-reveal reveal flex flex-wrap items-center justify-center gap-6 md:gap-10 text-sm text-slate-500">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-brand-green" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
            No upfront costs
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-brand-green" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
            48-hour audit turnaround
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-brand-green" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
            Actionable insights
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 text-slate-600 animate-bounce-subtle">
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Scroll</span>
          <div className="w-5 h-8 border border-slate-700 rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-2 bg-slate-600 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}