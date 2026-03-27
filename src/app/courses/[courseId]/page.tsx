import { getCourseById, getAllCourses, SAMPLE_COURSES } from '@/lib/courses'
import CourseDetail from '@/components/lms/CourseDetail'
import { notFound } from 'next/navigation'

interface CoursePageProps {
  params: Promise<{
    courseId: string
  }>
}

export async function generateStaticParams() {
  // In a real implementation, this would come from your course data
  const courses = getAllCourses().length > 0 ? getAllCourses() : SAMPLE_COURSES
  
  return courses.map((course) => ({
    courseId: course.id,
  }))
}

export async function generateMetadata({ params }: CoursePageProps) {
  const { courseId } = await params
  const course = getCourseById(courseId) || 
    SAMPLE_COURSES.find(c => c.id === courseId)
  
  if (!course) {
    return {
      title: 'Course Not Found | Stuff N Things',
    }
  }

  return {
    title: `${course.title} | AI Automation Course | Stuff N Things`,
    description: course.description,
    openGraph: {
      title: course.title,
      description: course.description,
      type: 'article',
      images: course.thumbnail ? [course.thumbnail] : [],
    },
  }
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { courseId } = await params
  const course = getCourseById(courseId) || 
    SAMPLE_COURSES.find(c => c.id === courseId)
  
  if (!course) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CourseDetail course={course} />
      </div>
    </div>
  )
}