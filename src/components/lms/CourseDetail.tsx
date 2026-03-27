'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Clock, 
  BarChart3, 
  Tag, 
  Users, 
  PlayCircle, 
  CheckCircle, 
  FileText,
  Layers,
  BookOpen,
  Award,
  ArrowRight
} from 'lucide-react'
import { Course, getUserProgress, getCourseProgress, markActivityCompleted } from '@/lib/courses'

interface CourseDetailProps {
  course: Course
  className?: string
}

export default function CourseDetail({ course, className = '' }: CourseDetailProps) {
  const [progress, setProgress] = useState({ completed: 0, total: 0, percentage: 0 })
  const [userProgress, setUserProgress] = useState<any>(null)

  useEffect(() => {
    const courseProgress = getCourseProgress(course.id)
    const userCourseProgress = getUserProgress(course.id)
    setProgress(courseProgress)
    setUserProgress(userCourseProgress)
  }, [course.id])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'Advanced':
        return 'bg-red-100 text-red-700 border-red-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <PlayCircle size={16} className="text-blue-600" />
      case 'document':
        return <FileText size={16} className="text-green-600" />
      case 'interactive':
        return <Layers size={16} className="text-purple-600" />
      case 'assignment':
        return <BookOpen size={16} className="text-orange-600" />
      default:
        return <FileText size={16} className="text-gray-600" />
    }
  }

  const isActivityCompleted = (activityId: string) => {
    return userProgress?.completedActivities.includes(activityId) || false
  }

  const getFirstIncompleteActivity = () => {
    for (const chapter of course.chapters) {
      for (const activity of chapter.activities) {
        if (!isActivityCompleted(activity.id)) {
          return { chapterId: chapter.id, activityId: activity.id }
        }
      }
    }
    return null
  }

  const getStartLink = () => {
    if (userProgress?.lastAccessedActivity) {
      // Find the chapter containing the last accessed activity
      for (const chapter of course.chapters) {
        const activity = chapter.activities.find(a => a.id === userProgress.lastAccessedActivity)
        if (activity) {
          return `/learn/${course.id}/${chapter.id}/${activity.id}`
        }
      }
    }
    
    // Return first activity if no progress or activity not found
    const firstIncomplete = getFirstIncompleteActivity()
    if (firstIncomplete) {
      return `/learn/${course.id}/${firstIncomplete.chapterId}/${firstIncomplete.activityId}`
    }
    
    // Fallback to first activity
    const firstChapter = course.chapters[0]
    const firstActivity = firstChapter?.activities[0]
    if (firstActivity) {
      return `/learn/${course.id}/${firstChapter.id}/${firstActivity.id}`
    }
    
    return `/courses/${course.id}`
  }

  const totalActivities = course.chapters.reduce((total, chapter) => total + chapter.activities.length, 0)

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      {/* Course Header */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        {/* Course Image */}
        <div className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900">
          {course.thumbnail ? (
            <Image
              src={course.thumbnail}
              alt={course.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white">
              <div className="text-center">
                <BarChart3 size={64} className="mx-auto mb-4 opacity-50" />
                <h1 className="text-2xl font-bold opacity-75">{course.title}</h1>
              </div>
            </div>
          )}
          
          {/* Progress Overlay */}
          {progress.percentage > 0 && (
            <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-center gap-2 text-white">
                {progress.percentage === 100 ? (
                  <>
                    <CheckCircle size={20} className="text-green-400" />
                    <span className="text-sm font-medium">Course Completed!</span>
                  </>
                ) : (
                  <>
                    <div className="text-sm font-medium">{progress.percentage}% Complete</div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Course Info */}
        <div className="p-8">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <span className={`px-3 py-1 text-sm font-semibold rounded-full border ${getDifficultyColor(course.difficulty)}`}>
              {course.difficulty}
            </span>
            <div className="flex items-center gap-1 text-gray-600">
              <Clock size={16} />
              <span className="text-sm">{course.duration}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <BarChart3 size={16} />
              <span className="text-sm">{course.chapters.length} chapters</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <BookOpen size={16} />
              <span className="text-sm">{totalActivities} activities</span>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
          <p className="text-lg text-gray-600 mb-6">{course.description}</p>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-1 text-gray-700">
              <Users size={16} />
              <span className="text-sm font-medium">{course.instructor}</span>
            </div>

            <Link
              href={getStartLink()}
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              {progress.percentage === 0 ? 'Start Course' : progress.percentage === 100 ? 'Review Course' : 'Continue Learning'}
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Progress Bar */}
          {progress.total > 0 && (
            <div className="mt-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Your Progress</span>
                <span>{progress.completed}/{progress.total} activities completed</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-slate-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progress.percentage}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Course Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Course Chapters */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Content</h2>
            <div className="space-y-6">
              {course.chapters.map((chapter, chapterIndex) => {
                const completedActivitiesInChapter = chapter.activities.filter(activity => 
                  isActivityCompleted(activity.id)
                ).length
                
                return (
                  <div key={chapter.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            Chapter {chapterIndex + 1}: {chapter.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">{chapter.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">
                            {completedActivitiesInChapter}/{chapter.activities.length} completed
                          </div>
                          <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                            <div
                              className="bg-slate-600 h-2 rounded-full transition-all duration-300"
                              style={{ 
                                width: `${(completedActivitiesInChapter / chapter.activities.length) * 100}%` 
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="divide-y divide-gray-200">
                      {chapter.activities.map((activity, activityIndex) => {
                        const isCompleted = isActivityCompleted(activity.id)
                        const isLastAccessed = userProgress?.lastAccessedActivity === activity.id
                        
                        return (
                          <Link
                            key={activity.id}
                            href={`/learn/${course.id}/${chapter.id}/${activity.id}`}
                            className={`block p-4 hover:bg-gray-50 transition-colors ${
                              isLastAccessed ? 'bg-slate-50 border-l-4 border-slate-500' : ''
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className={`flex-shrink-0 ${isCompleted ? 'text-green-600' : 'text-gray-400'}`}>
                                  {isCompleted ? (
                                    <CheckCircle size={20} />
                                  ) : (
                                    getActivityIcon(activity.type)
                                  )}
                                </div>
                                <div>
                                  <h4 className="font-medium text-gray-900">
                                    {activityIndex + 1}. {activity.title}
                                  </h4>
                                  {activity.duration && (
                                    <p className="text-sm text-gray-500">{activity.duration}</p>
                                  )}
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                {isLastAccessed && (
                                  <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full">
                                    Current
                                  </span>
                                )}
                                {isCompleted && (
                                  <CheckCircle size={16} className="text-green-600" />
                                )}
                              </div>
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Course Tags */}
          {course.tags.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Topics Covered</h3>
              <div className="flex flex-wrap gap-2">
                {course.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                  >
                    <Tag size={12} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Completion Certificate */}
          {progress.percentage === 100 && userProgress?.certificateEarned && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-center">
                <Award size={48} className="mx-auto text-yellow-500 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Congratulations!
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  You've completed this course and earned a certificate.
                </p>
                <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                  Download Certificate
                </button>
              </div>
            </div>
          )}

          {/* Course Stats */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Difficulty</span>
                <span className="font-medium">{course.difficulty}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration</span>
                <span className="font-medium">{course.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Chapters</span>
                <span className="font-medium">{course.chapters.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Activities</span>
                <span className="font-medium">{totalActivities}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Instructor</span>
                <span className="font-medium">{course.instructor}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}