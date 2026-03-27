'use client'

import { useState } from 'react'
import { Play, Star, Users, Award } from 'lucide-react'

export default function LMSHero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(255,255,255) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-float-delayed"></div>

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <div className="space-y-8 animate-slide-in-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full px-4 py-2 text-sm text-slate-300">
            <Award className="h-4 w-4 text-yellow-400" />
            <span>Learn from Industry Experts</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              <span className="text-white">Master</span>{' '}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_auto]">
                Technology
              </span>
              <br />
              <span className="text-white">Skills That</span>{' '}
              <span className="text-slate-300">Matter</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed max-w-xl">
              Join thousands of developers, designers, and entrepreneurs who've transformed their careers through our hands-on learning platform.
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">50k+</div>
              <div className="text-sm text-slate-400">Students</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">1,000+</div>
              <div className="text-sm text-slate-400">Courses</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">4.8★</div>
              <div className="text-sm text-slate-400">Rating</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25">
              Start Learning Free
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
              <Users className="h-4 w-4" />
              <span>Join 50,000+ learners</span>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-1">Trusted by professionals</span>
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
                <h3 className="text-xl font-semibold text-white">Featured Course</h3>
                <p className="text-slate-300">Full-Stack Web Development Bootcamp</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm text-slate-400">(1,234 reviews)</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-400 line-through">$199</div>
                    <div className="text-lg font-bold text-white">Free</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-bounce-subtle">
              30% OFF
            </div>
            <div className="absolute -bottom-4 -left-4 bg-slate-800/90 backdrop-blur-sm border border-slate-700 rounded-lg p-3 animate-float">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-slate-300">Live now</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}