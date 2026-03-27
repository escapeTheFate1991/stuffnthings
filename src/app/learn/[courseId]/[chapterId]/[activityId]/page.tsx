import { getCourseById, SAMPLE_COURSES } from '@/lib/courses'
import LearningInterface from '@/components/lms/LearningInterface'
import { notFound } from 'next/navigation'

interface LearningPageProps {
  params: Promise<{
    courseId: string
    chapterId: string
    activityId: string
  }>
}

export async function generateStaticParams() {
  const courses = SAMPLE_COURSES
  const staticParams: Array<{
    courseId: string
    chapterId: string
    activityId: string
  }> = []

  courses.forEach(course => {
    course.chapters.forEach(chapter => {
      chapter.activities.forEach(activity => {
        staticParams.push({
          courseId: course.id,
          chapterId: chapter.id,
          activityId: activity.id
        })
      })
    })
  })

  return staticParams
}

export async function generateMetadata({ params }: LearningPageProps) {
  const { courseId, chapterId, activityId } = await params
  const course = getCourseById(courseId) || 
    SAMPLE_COURSES.find(c => c.id === courseId)
  
  if (!course) {
    return {
      title: 'Learning Activity Not Found | Stuff N Things',
    }
  }

  const chapter = course.chapters.find(c => c.id === chapterId)
  const activity = chapter?.activities.find(a => a.id === activityId)

  const title = activity ? `${activity.title} - ${course.title}` : course.title

  return {
    title: `${title} | Learn | Stuff N Things`,
    description: activity?.content?.substring(0, 160) || course.description,
  }
}

export default async function LearningPage({ params }: LearningPageProps) {
  const { courseId, chapterId, activityId } = await params
  const course = getCourseById(courseId) || 
    SAMPLE_COURSES.find(c => c.id === courseId)
  
  if (!course) {
    notFound()
  }

  // Verify chapter and activity exist
  const chapter = course.chapters.find(c => c.id === chapterId)
  if (!chapter) {
    notFound()
  }

  const activity = chapter.activities.find(a => a.id === activityId)
  if (!activity) {
    notFound()
  }

  return (
    <LearningInterface 
      course={course}
      currentChapterId={chapterId}
      currentActivityId={activityId}
    />
  )
}