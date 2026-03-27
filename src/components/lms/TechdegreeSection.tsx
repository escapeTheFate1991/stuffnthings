import { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Clock, Award } from 'lucide-react'

interface Bootcamp {
  id: number
  title: string
  description: string
  image: string
  level: string
  duration: string
}

export default function TechdegreeSection() {
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

  const bootcamps: Bootcamp[] = [
    {
      id: 1,
      title: 'Full-Stack Web Development',
      description: 'Learn how to build complete web applications with HTML, CSS, JavaScript, React, and Node.js with real-time student support.',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=200&fit=crop&crop=center',
      level: 'Beginner',
      duration: '4-9 months'
    },
    {
      id: 2,
      title: 'AI & Machine Learning',
      description: 'Get certified in AI/ML: Python, TensorFlow, PyTorch, computer vision, and natural language processing.',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=200&fit=crop&crop=center',
      level: 'Beginner',
      duration: '4-9 months'
    },
    {
      id: 3,
      title: 'Mobile App Development',
      description: 'Learn to design and build mobile apps for iOS and Android using React Native and Flutter.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop&crop=center',
      level: 'Beginner',
      duration: '3-8 months'
    },
    {
      id: 4,
      title: 'Cloud Computing & DevOps',
      description: 'Build scalable applications and master AWS, Docker, Kubernetes in a self-paced bootcamp with real-time support.',
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=200&fit=crop&crop=center',
      level: 'Beginner',
      duration: '2-5 months'
    },
    {
      id: 5,
      title: 'Data Science & Analytics',
      description: 'Learn to analyze data with Python, SQL, machine learning, and advanced visualization techniques.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop&crop=center',
      level: 'Beginner',
      duration: '3-8 months'
    },
  ]

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section 
      ref={sectionRef}
      id="techdegree"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div 
          className={`flex items-center justify-between mb-10 transition-all duration-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">Premium Bootcamps</h2>
            <p className="text-zinc-400">Intensive programs with certificate and career support</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-full glass hover:bg-white/10 transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-full glass hover:bg-white/10 transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Bootcamp Cards */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {bootcamps.map((bootcamp, index) => (
            <div
              key={bootcamp.id}
              className={`flex-shrink-0 w-[320px] sm:w-[380px] snap-start transition-all duration-600 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="group glass rounded-2xl overflow-hidden card-hover cursor-pointer h-full">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={bootcamp.image}
                    alt={bootcamp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold border bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 text-violet-300 border-violet-500/30 flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    CERTIFICATE
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-violet-400 transition-colors">
                    {bootcamp.title}
                  </h3>
                  <p className="text-sm text-zinc-400 mb-4 line-clamp-2">
                    {bootcamp.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center gap-4 text-xs text-zinc-500">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                      {bootcamp.level}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {bootcamp.duration}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}