'use client'

import { useState, useRef } from 'react'
import { Play, Star, Users, Award, Crown, Zap } from 'lucide-react'
import { motion, useMotionValue, useMotionTemplate, useAnimationFrame } from 'framer-motion'

export default function LMSHero() {
  const containerRef = useRef<HTMLDivElement>(null);
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

  const maskImage = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-slate-950 flex items-center overflow-hidden"
    >
      {/* Infinite Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03]">
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </div>
      <motion.div 
        className="absolute inset-0 z-0 opacity-20"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      >
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </motion.div>

      {/* Gradient Orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-float-delayed"></div>

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <div className="space-y-8 animate-slide-in-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full px-4 py-2 text-sm text-slate-300">
            <Crown className="h-4 w-4 text-yellow-400" />
            <span>Unlimited Access Membership</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              <span className="text-white">Unlock</span>{' '}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_auto]">
                Everything
              </span>
              <br />
              <span className="text-white">One</span>{' '}
              <span className="text-slate-300">Subscription</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed max-w-xl">
              Get unlimited access to our entire learning library. 1,000+ courses, expert-led workshops, 
              and exclusive content — all for one low monthly price.
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">50k+</div>
              <div className="text-sm text-slate-400">Members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">1,000+</div>
              <div className="text-sm text-slate-400">Courses</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">$29</div>
              <div className="text-sm text-slate-400">per month</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25">
              Start Free Trial
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </button>
            <button className="group flex items-center gap-3 bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-lg font-semibold border border-slate-700 hover:border-slate-600 transition-all duration-300">
              <Play className="h-5 w-5 text-blue-400 group-hover:text-blue-300" />
              Watch Demo
            </button>
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <div className="flex items-center gap-1">
              <Zap className="h-4 w-4 text-green-400" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-1">4.8/5 member satisfaction</span>
            </div>
          </div>
        </div>

        {/* Right Content - Video/Image Area */}
        <div className="relative animate-slide-in-right">
          <div className="relative">
            {/* Main Content Card */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:bg-slate-800/70 transition-all duration-300 hover:scale-[1.02]">
              <div className="aspect-video bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg mb-6 flex items-center justify-center group cursor-pointer">
                <div className="bg-white/10 backdrop-blur-sm rounded-full p-6 group-hover:bg-white/20 transition-colors duration-300">
                  <Play className="h-12 w-12 text-white ml-1" />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Your Membership Includes</h3>
                <div className="space-y-2 text-slate-300">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Unlimited access to all courses</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>New content added weekly</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>Expert-led live workshops</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span>Download for offline learning</span>
                  </div>
                </div>
                <div className="pt-2">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">$29<span className="text-sm font-normal text-slate-400">/month</span></div>
                    <div className="text-sm text-green-400">7-day free trial</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-bounce-subtle">
              FREE TRIAL
            </div>
            <div className="absolute -bottom-4 -left-4 bg-slate-800/90 backdrop-blur-sm border border-slate-700 rounded-lg p-3 animate-float">
              <div className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-yellow-400" />
                <span className="text-sm text-slate-300">Premium Access</span>
              </div>
            </div>
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
          id="hero-grid-pattern"
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
      <rect width="100%" height="100%" fill="url(#hero-grid-pattern)" />
    </svg>
  );
};