'use client'

import { useState, useEffect, useRef } from 'react'
import { Code, Users, Trophy, Zap, BookOpen, Globe } from 'lucide-react'

export default function LMSFeatures() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

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
    <section ref={sectionRef} className="section-padding bg-[#111]">
      <div className="container-wide">
        {/* Section Header */}
        <div 
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Everything You Need to</span>{' '}
            <span className="gradient-text">Succeed</span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            Our platform combines cutting-edge technology with proven educational methods to deliver
            an unparalleled learning experience.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group glass rounded-2xl p-8 card-hover transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-6 group-hover:glow-primary transition-all duration-300`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-violet-400 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div 
          className={`text-center mt-16 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <button className="btn-gradient px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
            Explore All Features
          </button>
        </div>
      </div>
    </section>
  )
}