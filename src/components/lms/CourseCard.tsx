'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Clock, BarChart3, Tag, CheckCircle } from 'lucide-react'
import { Course, getCourseProgress } from '@/lib/courses'
import { useEffect, useState } from 'react'

interface CourseCardProps {
  course: Course
  className?: string
}

export default function CourseCard({ course, className = '' }: CourseCardProps) {
  const [progress, setProgress] = useState({ completed: 0, total: 0, percentage: 0 })

  useEffect(() => {
    const courseProgress = getCourseProgress(course.id)
    setProgress(courseProgress)
  }, [course.id])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-700'
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-700'
      case 'Advanced':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className={`group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${className}`}>
      <Link href={`/courses/${course.id}`} className="block">
        {/* Course Thumbnail */}
        <div className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900">
          {course.thumbnail ? (
            <Image
              src={course.thumbnail}
              alt={course.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white">
              <div className="text-center">
                <BarChart3 size={48} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm opacity-75">{course.title}</p>
              </div>
            </div>
          )}
          
          {/* Progress indicator */}
          {progress.percentage > 0 && (
            <div className="absolute top-3 right-3">
              <div className="bg-black/70 backdrop-blur-sm rounded-full p-2">
                {progress.percentage === 100 ? (
                  <CheckCircle size={20} className="text-green-400" />
                ) : (
                  <div className="relative w-5 h-5">
                    <svg className="w-5 h-5 transform -rotate-90" viewBox="0 0 24 24">
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="3"
                        fill="transparent"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="rgb(34 197 94)"
                        strokeWidth="3"
                        fill="transparent"
                        strokeDasharray={`${progress.percentage * 0.628} 62.8`}
                        className="transition-all duration-500"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-medium">
                      {progress.percentage}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Difficulty badge */}
          <div className="absolute bottom-3 left-3">
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(course.difficulty)}`}>
              {course.difficulty}
            </span>
          </div>
        </div>

        {/* Course Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-slate-800 transition-colors">
              {course.title}
            </h3>
          </div>

          <p className="text-gray-600 text-sm line-clamp-3 mb-4">
            {course.description}
          </p>

          {/* Course metadata */}
          <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <BarChart3 size={14} />
              <span>{course.chapters.length} chapters</span>
            </div>
          </div>

          {/* Tags */}
          {course.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {course.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                >
                  <Tag size={10} />
                  {tag}
                </span>
              ))}
              {course.tags.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +{course.tags.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Instructor */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700 font-medium">{course.instructor}</span>
            {progress.percentage > 0 && progress.percentage < 100 && (
              <span className="text-xs text-slate-600 bg-slate-100 px-2 py-1 rounded-full">
                Resume
              </span>
            )}
            {progress.percentage === 100 && (
              <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full font-medium">
                Completed
              </span>
            )}
          </div>

          {/* Progress bar */}
          {progress.total > 0 && (
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>Progress</span>
                <span>{progress.completed}/{progress.total} activities</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-slate-600 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${progress.percentage}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </Link>
    </div>
  )
}