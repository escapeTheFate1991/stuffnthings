'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  PlayCircle,
  FileText,
  Layers,
  BookOpen,
  Menu,
  X,
  Award
} from 'lucide-react'
import { Course, Activity, getUserProgress, markActivityCompleted } from '@/lib/courses'

interface LearningInterfaceProps {
  course: Course
  currentChapterId: string
  currentActivityId: string
  className?: string
}

export default function LearningInterface({ 
  course, 
  currentChapterId, 
  currentActivityId, 
  className = '' 
}: LearningInterfaceProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userProgress, setUserProgress] = useState<any>(null)
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null)
  const [currentChapter, setCurrentChapter] = useState<any>(null)

  useEffect(() => {
    const progress = getUserProgress(course.id)
    setUserProgress(progress)

    // Find current chapter and activity
    const chapter = course.chapters.find(c => c.id === currentChapterId)
    const activity = chapter?.activities.find(a => a.id === currentActivityId)
    
    setCurrentChapter(chapter)
    setCurrentActivity(activity || null)
  }, [course.id, currentChapterId, currentActivityId])

  const isActivityCompleted = (activityId: string) => {
    return userProgress?.completedActivities.includes(activityId) || false
  }

  const handleMarkCompleted = () => {
    if (currentActivity) {
      markActivityCompleted(course.id, currentActivity.id)
      const newProgress = getUserProgress(course.id)
      setUserProgress(newProgress)
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

  // Navigation helpers
  const getAllActivities = () => {
    const activities: Array<{ activity: Activity; chapter: any; chapterIndex: number; activityIndex: number }> = []
    course.chapters.forEach((chapter, chapterIndex) => {
      chapter.activities.forEach((activity, activityIndex) => {
        activities.push({ activity, chapter, chapterIndex, activityIndex })
      })
    })
    return activities
  }

  const allActivities = getAllActivities()
  const currentIndex = allActivities.findIndex(
    item => item.activity.id === currentActivityId && item.chapter.id === currentChapterId
  )

  const previousActivity = currentIndex > 0 ? allActivities[currentIndex - 1] : null
  const nextActivity = currentIndex < allActivities.length - 1 ? allActivities[currentIndex + 1] : null

  const renderActivityContent = () => {
    if (!currentActivity) {
      return (
        <div className="text-center py-12">
          <BookOpen size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Activity not found</h3>
          <p className="text-gray-500">The requested activity could not be loaded.</p>
        </div>
      )
    }

    switch (currentActivity.type) {
      case 'video':
        return (
          <div className="space-y-6">
            <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
              <div className="text-center text-white">
                <PlayCircle size={64} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">Video Player Placeholder</p>
                <p className="text-sm opacity-75 mt-2">
                  In a real implementation, this would be a video player component
                </p>
              </div>
            </div>
            <div className="prose max-w-none">
              <h2>{currentActivity.title}</h2>
              <p>{currentActivity.content}</p>
            </div>
          </div>
        )
      
      case 'document':
        return (
          <div className="prose max-w-none">
            <h2>{currentActivity.title}</h2>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <div className="flex items-center">
                <FileText className="text-blue-600 mr-2" size={20} />
                <span className="text-sm font-medium text-blue-800">Reading Material</span>
              </div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: currentActivity.content.replace(/\n/g, '<br>') }} />
          </div>
        )
      
      case 'interactive':
        return (
          <div className="space-y-6">
            <div className="bg-purple-50 border-l-4 border-purple-400 p-4">
              <div className="flex items-center">
                <Layers className="text-purple-600 mr-2" size={20} />
                <span className="text-sm font-medium text-purple-800">Interactive Activity</span>
              </div>
            </div>
            <div className="prose max-w-none">
              <h2>{currentActivity.title}</h2>
              <p>{currentActivity.content}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <Layers size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">Interactive component would be embedded here</p>
            </div>
          </div>
        )
      
      case 'assignment':
        return (
          <div className="space-y-6">
            <div className="bg-orange-50 border-l-4 border-orange-400 p-4">
              <div className="flex items-center">
                <BookOpen className="text-orange-600 mr-2" size={20} />
                <span className="text-sm font-medium text-orange-800">Assignment</span>
              </div>
            </div>
            <div className="prose max-w-none">
              <h2>{currentActivity.title}</h2>
              <p>{currentActivity.content}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold mb-3">Assignment Submission</h4>
              <textarea
                placeholder="Enter your assignment response here..."
                className="w-full p-3 border border-gray-300 rounded-lg resize-vertical"
                rows={6}
              />
              <div className="mt-3 flex justify-end">
                <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  Submit Assignment
                </button>
              </div>
            </div>
          </div>
        )
      
      default:
        return (
          <div className="prose max-w-none">
            <h2>{currentActivity.title}</h2>
            <p>{currentActivity.content}</p>
          </div>
        )
    }
  }

  const completedCount = userProgress?.completedActivities.length || 0
  const totalCount = allActivities.length
  const progressPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0
  const courseCompleted = progressPercentage === 100

  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      {/* Mobile menu button */}
      <div className="lg:hidden bg-white shadow-sm border-b p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
          >
            <Menu size={20} />
          </button>
          <div className="text-sm text-gray-600">
            {completedCount}/{totalCount} completed ({progressPercentage}%)
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          {/* Sidebar header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-gray-900 line-clamp-1">{course.title}</h2>
                <p className="text-sm text-gray-600 mt-1">
                  {completedCount}/{totalCount} completed ({progressPercentage}%)
                </p>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            <div className="mt-3">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-slate-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Course navigation */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <Link
                href={`/courses/${course.id}`}
                className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-800 mb-4"
              >
                <ArrowLeft size={16} />
                Back to Course Overview
              </Link>
            </div>

            <div className="space-y-1">
              {course.chapters.map((chapter, chapterIndex) => {
                const completedActivitiesInChapter = chapter.activities.filter(activity => 
                  isActivityCompleted(activity.id)
                ).length
                
                return (
                  <div key={chapter.id}>
                    <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                      <h3 className="font-medium text-gray-900 text-sm">
                        {chapterIndex + 1}. {chapter.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {completedActivitiesInChapter}/{chapter.activities.length} completed
                      </p>
                    </div>
                    
                    {chapter.activities.map((activity, activityIndex) => {
                      const isCompleted = isActivityCompleted(activity.id)
                      const isCurrent = activity.id === currentActivityId && chapter.id === currentChapterId
                      
                      return (
                        <Link
                          key={activity.id}
                          href={`/learn/${course.id}/${chapter.id}/${activity.id}`}
                          onClick={() => setSidebarOpen(false)}
                          className={`block px-6 py-3 border-l-4 hover:bg-gray-50 transition-colors ${
                            isCurrent 
                              ? 'border-slate-500 bg-slate-50 text-slate-900' 
                              : 'border-transparent text-gray-700 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 min-w-0">
                              <div className={`flex-shrink-0 ${isCompleted ? 'text-green-600' : 'text-gray-400'}`}>
                                {isCompleted ? (
                                  <CheckCircle size={16} />
                                ) : (
                                  getActivityIcon(activity.type)
                                )}
                              </div>
                              <div className="min-w-0">
                                <h4 className="text-sm font-medium truncate">
                                  {activityIndex + 1}. {activity.title}
                                </h4>
                                {activity.duration && (
                                  <p className="text-xs text-gray-500">{activity.duration}</p>
                                )}
                              </div>
                            </div>
                            
                            {isCurrent && (
                              <div className="w-2 h-2 bg-slate-500 rounded-full flex-shrink-0" />
                            )}
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Course completion */}
          {courseCompleted && (
            <div className="p-4 border-t border-gray-200 bg-green-50">
              <div className="text-center">
                <Award size={24} className="mx-auto text-green-600 mb-2" />
                <p className="text-sm font-semibold text-green-800">Course Completed!</p>
                <Link
                  href={`/courses/${course.id}`}
                  className="text-xs text-green-600 hover:text-green-700 underline"
                >
                  View certificate
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <div className="flex-1 lg:ml-0">
          <div className="max-w-4xl mx-auto p-6 lg:p-8">
            {/* Activity content */}
            <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
              {renderActivityContent()}
            </div>

            {/* Activity completion and navigation */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {!isActivityCompleted(currentActivityId) && (
                    <button
                      onClick={handleMarkCompleted}
                      className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      <CheckCircle size={16} />
                      Mark Complete
                    </button>
                  )}
                  
                  {isActivityCompleted(currentActivityId) && (
                    <div className="inline-flex items-center gap-2 text-green-600">
                      <CheckCircle size={16} />
                      <span className="font-medium">Completed</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {previousActivity && (
                    <Link
                      href={`/learn/${course.id}/${previousActivity.chapter.id}/${previousActivity.activity.id}`}
                      className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <ArrowLeft size={16} />
                      Previous
                    </Link>
                  )}
                  
                  {nextActivity ? (
                    <Link
                      href={`/learn/${course.id}/${nextActivity.chapter.id}/${nextActivity.activity.id}`}
                      className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      Next
                      <ArrowRight size={16} />
                    </Link>
                  ) : (
                    <Link
                      href={`/courses/${course.id}`}
                      className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      Finish Course
                      <ArrowRight size={16} />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}