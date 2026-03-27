'use client'

import { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Clock, Users, Star, ArrowRight } from 'lucide-react'

interface Course {
  id: number
  title: string
  description: string
  image: string
  badge?: { text: string; type: 'recommended' | 'popular' | 'new' | 'hot' }
  students?: number
  level: string
  duration: string
}

export default function KimiCourses() {
  const scrollRef = useRef<HTMLDivElement>(null)
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

  const courses: Course[] = [
    {
      id: 1,
      title: 'Full-Stack Web Development',
      description: 'Master React, Node.js, and modern web development practices from beginner to professional.',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=200&fit=crop&crop=center',
      badge: { text: 'RECOMMENDED', type: 'recommended' },
      level: 'Beginner',
      duration: '12 weeks',
      students: 2840
    },
    {
      id: 2,
      title: 'AI & Machine Learning',
      description: 'Learn Python, TensorFlow, and build intelligent applications with real-world projects.',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=200&fit=crop&crop=center',
      badge: { text: 'POPULAR', type: 'popular' },
      level: 'Intermediate',
      duration: '16 weeks',
      students: 1920
    },
    {
      id: 3,
      title: 'Mobile App Development',
      description: 'Build iOS and Android apps with React Native and Flutter from scratch.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop&crop=center',
      badge: { text: 'NEW', type: 'new' },
      level: 'Intermediate',
      duration: '10 weeks',
      students: 3150
    },
    {
      id: 4,
      title: 'Cloud Computing & DevOps',
      description: 'Master AWS, Docker, Kubernetes, and modern deployment strategies.',
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=200&fit=crop&crop=center',
      badge: { text: 'HOT', type: 'hot' },
      level: 'Advanced',
      duration: '14 weeks',
      students: 1680
    },
    {
      id: 5,
      title: 'Data Science & Analytics',
      description: 'Master Python, SQL, and data visualization with real datasets and projects.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop&crop=center',
      badge: { text: 'POPULAR', type: 'popular' },
      level: 'Intermediate',
      duration: '12 weeks',
      students: 2240
    }
  ]

  const getBadgeStyles = (type: string) => {
    switch (type) {
      case 'recommended':
        return 'bg-violet-600/20 text-violet-300 border-violet-500/30'
      case 'popular':
        return 'bg-fuchsia-600/20 text-fuchsia-300 border-fuchsia-500/30'
      case 'new':
        return 'bg-cyan-600/20 text-cyan-300 border-cyan-500/30'
      case 'hot':
        return 'bg-orange-600/20 text-orange-300 border-orange-500/30'
      default:
        return 'bg-zinc-600/20 text-zinc-300 border-zinc-500/30'
    }
  }

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' })
    }
  }

  return (
    <section ref={sectionRef} className="section-padding bg-[#0a0a0a]">
      <div className="container-wide">
        {/* Section Header */}
        <div 
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">What You'll</span>{' '}
            <span className="gradient-text">Learn</span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto mb-8">
            Explore our comprehensive learning paths and expertly crafted courses. 
            All included in your membership.
          </p>
        </div>

        {/* Course Cards Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:glow-primary transition-all group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:glow-primary transition-all group"
          >
            <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Course Cards */}
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide px-6"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {courses.map((course, index) => (
              <div
                key={course.id}
                className={`flex-shrink-0 w-80 group cursor-pointer transition-all duration-700 ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="glass rounded-2xl overflow-hidden card-hover">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Badge */}
                    {course.badge && (
                      <div className={`absolute top-4 left-4 px-3 py-1 text-xs font-semibold rounded-full border ${getBadgeStyles(course.badge.type)}`}>
                        {course.badge.text}
                      </div>
                    )}

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60" />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-violet-400 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-sm text-zinc-400 mb-4 line-clamp-2">
                      {course.description}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between text-xs text-zinc-500 mb-4">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-green-500" />
                          {course.level}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {course.duration}
                        </span>
                      </div>
                      {course.students && (
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {course.students.toLocaleString()}
                        </span>
                      )}
                    </div>

                    {/* CTA */}
                    <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-violet-500/30 text-white py-3 rounded-lg font-medium transition-all duration-300 group/btn">
                      <span className="flex items-center justify-center gap-2">
                        Start Learning
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div 
          className={`text-center mt-16 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to unlock everything?</h3>
            <p className="text-zinc-400 mb-6">Get unlimited access to all courses, new releases, and exclusive content.</p>
            <button className="btn-gradient px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
              Start Your Free Trial
            </button>
            <div className="text-sm text-zinc-500 mt-3">7 days free, then $29/month. Cancel anytime.</div>
          </div>
        </div>
      </div>
    </section>
  )
}