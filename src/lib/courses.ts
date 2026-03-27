// Static course management for client-side only
// In a real implementation, course data would be pre-generated at build time
// or loaded from a headless CMS/API

export interface Course {
  id: string
  title: string
  description: string
  instructor: string
  duration: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  tags: string[]
  thumbnail?: string
  published: boolean
  chapters: Chapter[]
  createdAt: string
  updatedAt: string
}

export interface Chapter {
  id: string
  title: string
  description: string
  order: number
  activities: Activity[]
}

export interface Activity {
  id: string
  title: string
  type: 'video' | 'document' | 'interactive' | 'assignment'
  content: string
  order: number
  duration?: string
  completed?: boolean
}

export interface UserProgress {
  courseId: string
  completedActivities: string[]
  lastAccessedActivity?: string
  startedAt: string
  completedAt?: string
  certificateEarned?: boolean
}

// For static sites, we'll use hardcoded sample data
// In production, this would be replaced with API calls or static generation
export function getAllCourses(): Course[] {
  return SAMPLE_COURSES.filter(course => course.published)
}

export function getCourseById(id: string): Course | null {
  return SAMPLE_COURSES.find(course => course.id === id && course.published) || null
}

export function getCoursesByTag(tag: string): Course[] {
  const allCourses = getAllCourses()
  return allCourses.filter(course => 
    course.tags.some(courseTag => courseTag.toLowerCase() === tag.toLowerCase())
  )
}

export function searchCourses(query: string): Course[] {
  const allCourses = getAllCourses()
  const searchTerm = query.toLowerCase()
  
  return allCourses.filter(course => 
    course.title.toLowerCase().includes(searchTerm) ||
    course.description.toLowerCase().includes(searchTerm) ||
    course.instructor.toLowerCase().includes(searchTerm) ||
    course.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  )
}

// Progress tracking for static sites (localStorage-based)
export function getUserProgress(courseId: string): UserProgress | null {
  if (typeof window === 'undefined') return null
  
  try {
    const progressData = localStorage.getItem(`course_progress_${courseId}`)
    return progressData ? JSON.parse(progressData) : null
  } catch (error) {
    console.error('Error loading user progress:', error)
    return null
  }
}

export function saveUserProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(`course_progress_${progress.courseId}`, JSON.stringify(progress))
  } catch (error) {
    console.error('Error saving user progress:', error)
  }
}

export function markActivityCompleted(courseId: string, activityId: string): void {
  const progress = getUserProgress(courseId) || {
    courseId,
    completedActivities: [],
    startedAt: new Date().toISOString()
  }
  
  if (!progress.completedActivities.includes(activityId)) {
    progress.completedActivities.push(activityId)
  }
  
  progress.lastAccessedActivity = activityId
  
  const course = getCourseById(courseId)
  if (course) {
    const totalActivities = course.chapters.reduce((total, chapter) => total + chapter.activities.length, 0)
    if (progress.completedActivities.length === totalActivities) {
      progress.completedAt = new Date().toISOString()
      progress.certificateEarned = true
    }
  }
  
  saveUserProgress(progress)
}

export function getCourseProgress(courseId: string): { completed: number; total: number; percentage: number } {
  const course = getCourseById(courseId)
  const progress = getUserProgress(courseId)
  
  if (!course) {
    return { completed: 0, total: 0, percentage: 0 }
  }
  
  const totalActivities = course.chapters.reduce((total, chapter) => total + chapter.activities.length, 0)
  const completedCount = progress ? progress.completedActivities.length : 0
  
  return {
    completed: completedCount,
    total: totalActivities,
    percentage: totalActivities > 0 ? Math.round((completedCount / totalActivities) * 100) : 0
  }
}

// Sample courses for development
export const SAMPLE_COURSES: Course[] = [
  {
    id: 'ai-automation-fundamentals',
    title: 'AI Automation Fundamentals',
    description: 'Learn the basics of AI automation and how to implement intelligent workflows in your business.',
    instructor: 'Stuff N Things Team',
    duration: '4 hours',
    difficulty: 'Beginner',
    tags: ['AI', 'Automation', 'Business Process'],
    thumbnail: '/course-thumbnails/ai-fundamentals.jpg',
    published: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    chapters: [
      {
        id: 'introduction',
        title: 'Introduction to AI Automation',
        description: 'Understanding the fundamentals of AI-powered automation',
        order: 1,
        activities: [
          {
            id: 'what-is-ai-automation',
            title: 'What is AI Automation?',
            type: 'video',
            content: 'Introduction video about AI automation concepts',
            order: 1,
            duration: '15 minutes'
          },
          {
            id: 'benefits-of-automation',
            title: 'Benefits of Automation',
            type: 'document',
            content: 'Reading material about automation benefits',
            order: 2,
            duration: '10 minutes'
          }
        ]
      }
    ]
  },
  {
    id: 'openclaw-framework',
    title: 'OpenClaw Framework Mastery',
    description: 'Master the OpenClaw framework for building intelligent AI agents and automation systems.',
    instructor: 'Expert Developer',
    duration: '8 hours',
    difficulty: 'Intermediate',
    tags: ['OpenClaw', 'Development', 'AI Agents'],
    thumbnail: '/course-thumbnails/openclaw.jpg',
    published: true,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    chapters: [
      {
        id: 'openclaw-basics',
        title: 'OpenClaw Basics',
        description: 'Getting started with the OpenClaw framework',
        order: 1,
        activities: [
          {
            id: 'installation-setup',
            title: 'Installation and Setup',
            type: 'interactive',
            content: 'Step-by-step installation guide',
            order: 1,
            duration: '30 minutes'
          }
        ]
      }
    ]
  }
]