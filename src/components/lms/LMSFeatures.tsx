'use client'

import { Code, Users, Trophy, Zap, BookOpen, Globe } from 'lucide-react'

export default function LMSFeatures() {
  const features = [
    {
      icon: Code,
      title: 'Hands-On Projects',
      description: 'Build real applications with guided projects that mirror industry practices.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      title: 'Expert Instructors',
      description: 'Learn from industry professionals with years of experience at top tech companies.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Trophy,
      title: 'Career Support',
      description: 'Get job placement assistance, resume reviews, and interview preparation.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Zap,
      title: 'Self-Paced Learning',
      description: 'Study at your own rhythm with lifetime access to all course materials.',
      color: 'from-orange-500 to-yellow-500'
    },
    {
      icon: BookOpen,
      title: 'Comprehensive Curriculum',
      description: 'Structured learning paths from beginner to advanced level certifications.',
      color: 'from-red-500 to-rose-500'
    },
    {
      icon: Globe,
      title: 'Global Community',
      description: 'Connect with learners worldwide through our active community platform.',
      color: 'from-indigo-500 to-blue-500'
    }
  ]

  return (
    <section className="py-24 bg-slate-950">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full px-4 py-2 text-sm text-slate-300 mb-6">
            <Zap className="h-4 w-4 text-yellow-400" />
            <span>Why Choose Us</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Everything You Need to
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Succeed</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Our platform combines cutting-edge technology with proven educational methods to deliver
            an unparalleled learning experience.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-all duration-300 hover:scale-105"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
              
              {/* Icon */}
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-slate-100 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                {feature.description}
              </p>

              {/* Hover Effect Border */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-20 -z-10 blur-xl transition-opacity duration-300`}></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25">
            Explore All Features
          </button>
        </div>
      </div>
    </section>
  )
}