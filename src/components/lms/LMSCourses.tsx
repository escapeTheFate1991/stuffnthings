'use client'

import { Clock, Users, Star, ArrowRight } from 'lucide-react'
import Image from 'next/image'

export default function LMSCourses() {
  const courses = [
    {
      id: 1,
      title: 'Full-Stack Web Development',
      description: 'Master React, Node.js, and modern web development practices.',
      instructor: 'Sarah Johnson',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=200&fit=crop&crop=center',
      duration: '12 weeks',
      students: 2840,
      rating: 4.9,
      level: 'Beginner',
      price: 'Included',
      category: 'Web Development'
    },
    {
      id: 2,
      title: 'AI & Machine Learning Fundamentals',
      description: 'Learn Python, TensorFlow, and build intelligent applications.',
      instructor: 'Dr. Michael Chen',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=200&fit=crop&crop=center',
      duration: '16 weeks',
      students: 1920,
      rating: 4.8,
      level: 'Intermediate',
      price: 'Included',
      category: 'AI/ML'
    },
    {
      id: 3,
      title: 'Mobile App Development',
      description: 'Build iOS and Android apps with React Native and Flutter.',
      instructor: 'James Martinez',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop&crop=center',
      duration: '10 weeks',
      students: 3150,
      rating: 4.9,
      level: 'Intermediate',
      price: 'Included',
      category: 'Mobile'
    },
    {
      id: 4,
      title: 'Cloud Computing & DevOps',
      description: 'Master AWS, Docker, Kubernetes, and modern deployment practices.',
      instructor: 'Lisa Wang',
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=200&fit=crop&crop=center',
      duration: '14 weeks',
      students: 1680,
      rating: 4.7,
      level: 'Advanced',
      price: 'Included',
      category: 'DevOps'
    },
    {
      id: 5,
      title: 'Cybersecurity Essentials',
      description: 'Learn ethical hacking, security protocols, and risk assessment.',
      instructor: 'Alex Thompson',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=200&fit=crop&crop=center',
      duration: '8 weeks',
      students: 920,
      rating: 4.8,
      level: 'Beginner',
      price: 'Included',
      category: 'Security'
    },
    {
      id: 6,
      title: 'Data Science & Analytics',
      description: 'Master Python, SQL, and data visualization with real datasets.',
      instructor: 'Emma Rodriguez',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop&crop=center',
      duration: '12 weeks',
      students: 2240,
      rating: 4.9,
      level: 'Intermediate',
      price: 'Included',
      category: 'Data Science'
    }
  ]

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'Advanced': return 'bg-red-500/20 text-red-400 border-red-500/30'
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30'
    }
  }

  return (
    <section className="py-24 bg-slate-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full px-4 py-2 text-sm text-slate-300 mb-6">
            <Star className="h-4 w-4 text-yellow-400" />
            <span>Featured Content</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            What You'll
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Learn</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Explore our comprehensive learning paths and expertly crafted courses. 
            All included in your membership.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl overflow-hidden hover:border-slate-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-slate-900/50"
            >
              {/* Course Image */}
              <div className="relative overflow-hidden">
                <Image
                  src={course.image}
                  alt={course.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getLevelColor(course.level)}`}>
                    {course.level}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-slate-900/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                    {course.category}
                  </span>
                </div>
              </div>

              {/* Course Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                  {course.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                  {course.description}
                </p>

                {/* Instructor */}
                <div className="text-sm text-slate-300 mb-4">
                  by <span className="font-medium">{course.instructor}</span>
                </div>

                {/* Course Stats */}
                <div className="flex items-center gap-4 mb-4 text-sm text-slate-400">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{course.rating}</span>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-white">
                    {course.price}
                  </div>
                  <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg font-medium border border-slate-700 hover:border-slate-600 transition-all duration-300 group-hover:scale-105">
                    Start Learning
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to unlock everything?</h3>
            <p className="text-slate-400 mb-6">Get unlimited access to all courses, new releases, and exclusive content.</p>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25">
              Start Your Free Trial
            </button>
            <div className="text-sm text-slate-400 mt-3">7 days free, then $29/month. Cancel anytime.</div>
          </div>
        </div>
      </div>
    </section>
  )
}