import { getAllCourses, SAMPLE_COURSES } from '@/lib/courses'
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://stuffnthings.io'
  
  // Get all courses for static generation
  const courses = getAllCourses().length > 0 ? getAllCourses() : SAMPLE_COURSES
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/courses`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/deletion`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/resources/ai-workforce-report`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Course pages
  const coursePages: MetadataRoute.Sitemap = courses.map((course) => ({
    url: `${baseUrl}/courses/${course.id}`,
    lastModified: new Date(course.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Learning activity pages
  const learningPages: MetadataRoute.Sitemap = []
  courses.forEach(course => {
    course.chapters.forEach(chapter => {
      chapter.activities.forEach(activity => {
        learningPages.push({
          url: `${baseUrl}/learn/${course.id}/${chapter.id}/${activity.id}`,
          lastModified: new Date(course.updatedAt),
          changeFrequency: 'monthly' as const,
          priority: 0.6,
        })
      })
    })
  })

  return [...staticPages, ...coursePages, ...learningPages]
}