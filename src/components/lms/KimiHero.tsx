'use client'

import { useState, useEffect, useRef } from 'react'
import { Star, ArrowRight, Crown, Zap, Users } from 'lucide-react'
import { motion, useMotionValue, useMotionTemplate, useAnimationFrame } from 'framer-motion'

export default function KimiHero() {
  const [email, setEmail] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const heroRef = useRef<HTMLElement>(null)

  // Infinite Grid Animation
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const gridOffsetX = useMotionValue(0);
  const gridOffsetY = useMotionValue(0);

  const speedX = 0.3; 
  const speedY = 0.3;

  useAnimationFrame(() => {
    const currentX = gridOffsetX.get();
    const currentY = gridOffsetY.get();
    gridOffsetX.set((currentX + speedX) % 40);
    gridOffsetY.set((currentY + speedY) % 40);
  });

  const maskImage = useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    alert(`Thanks for signing up with: ${email}`)
  }

  return (
    <section 
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[90vh] flex items-center justify-center pt-[112px] pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[#0a0a0a]">
        {/* Infinite Grid Background */}
        <div className="absolute inset-0 z-0 opacity-[0.03]">
          <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
        </div>
        <motion.div 
          className="absolute inset-0 z-0 opacity-30"
          style={{ maskImage, WebkitMaskImage: maskImage }}
        >
          <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
        </motion.div>

        {/* Radial gradient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-violet-900/30 via-violet-900/10 to-transparent rounded-full animate-glow-pulse" />

        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-violet-600/20 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-[100px] animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-cyan-600/10 rounded-full blur-[80px] animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Rating Badge */}
        <div 
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <Crown className="w-4 h-4 text-yellow-400" />
          <span className="text-sm font-medium text-zinc-300">Unlimited Access Membership</span>
          <span className="text-xs text-zinc-500">|</span>
          <span className="text-xs text-zinc-500">Join 50k+ learners</span>
        </div>

        {/* Headline */}
        <h1 
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-white">Don't Let AI Think for You.</span>
          <br />
          <span className="gradient-text">Learn to Code.</span>
        </h1>

        {/* Subheadline */}
        <p 
          className={`text-lg sm:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Master <span className="text-violet-400 font-medium">Web Development</span>,{' '}
          <span className="text-cyan-400 font-medium">AI/ML</span>,{' '}
          <span className="text-fuchsia-400 font-medium">Mobile Apps</span>, and{' '}
          <span className="text-yellow-400 font-medium">Cloud Computing</span> — all included in your membership.
        </p>

        {/* Email Form */}
        <form 
          onSubmit={handleSubmit}
          className={`flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all"
            required
          />
          <button
            type="submit"
            className="btn-gradient px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 group"
          >
            Start Free Trial
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        {/* Trust Text */}
        <p 
          className={`text-sm text-zinc-500 mb-8 transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Try it free for 7 days, then $29 a month
        </p>

        {/* Stats */}
        <div 
          className={`flex items-center justify-center gap-8 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-white">50k+</div>
            <div className="text-sm text-zinc-400">Active Members</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">1,000+</div>
            <div className="text-sm text-zinc-400">Courses</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <div className="text-sm text-zinc-400">4.9/5 Rating</div>
          </div>
        </div>
      </div>
    </section>
  )
}

const GridPattern = ({ offsetX, offsetY }: { offsetX: any, offsetY: any }) => {
  return (
    <svg className="w-full h-full">
      <defs>
        <motion.pattern
          id="kimi-hero-grid-pattern"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
          x={offsetX}
          y={offsetY}
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-slate-600" 
          />
        </motion.pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#kimi-hero-grid-pattern)" />
    </svg>
  );
};