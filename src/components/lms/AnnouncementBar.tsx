import { useState, useEffect } from 'react'
import { Sparkles, X } from 'lucide-react'

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  const announcements = [
    {
      icon: <Sparkles className="w-4 h-4" />,
      text: "Master Web Dev, AI/ML, Mobile Apps and Cloud Computing",
      link: null
    },
    {
      icon: null,
      text: "Join 50,000+ learners transforming their tech careers!",
      link: { text: "Start free trial", href: "/auth/signup" }
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  if (!isVisible) return null

  const current = announcements[currentIndex]

  return (
    <div className="relative w-full h-10 bg-gradient-to-r from-cyan-600 via-violet-600 to-fuchsia-600 flex items-center justify-center overflow-hidden">
      <div className="flex items-center gap-2 px-4 text-sm font-medium text-white">
        {current.icon && <span className="animate-pulse">{current.icon}</span>}
        <span>{current.text}</span>
        {current.link && (
          <a 
            href={current.link.href} 
            className="underline hover:no-underline ml-1 transition-all"
          >
            {current.link.text}
          </a>
        )}
      </div>
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute right-4 p-1 hover:bg-white/20 rounded-full transition-colors"
        aria-label="Close announcement"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}