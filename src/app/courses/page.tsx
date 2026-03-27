import { getAllCourses, SAMPLE_COURSES } from '@/lib/courses'
import CourseList from '@/components/lms/CourseList'
import { BookOpen, Zap, Target, Users } from 'lucide-react'

export const metadata = {
  title: 'AI Automation Courses | Stuff N Things',
  description: 'Learn AI automation and OpenClaw framework through our comprehensive courses. Master intelligent workflow automation and become an AI operations expert.',
}

export default function CoursesPage() {
  // In a real implementation, this would load from your content management system
  // For now, we'll use sample courses
  const courses = getAllCourses().length > 0 ? getAllCourses() : SAMPLE_COURSES

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <BookOpen size={16} />
              <span className="text-sm font-medium">AI Automation Academy</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Master AI Automation
              <span className="block text-cyan-400">Build Intelligent Systems</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Learn to design and deploy AI-powered automation systems that handle routine tasks, 
              optimize workflows, and scale your business operations with the OpenClaw framework.
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
              <Zap className="text-blue-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Hands-On Learning</h3>
            <p className="text-gray-600">
              Build real automation systems with guided tutorials and practical exercises using the OpenClaw framework.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
              <Target className="text-green-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Industry-Focused</h3>
            <p className="text-gray-600">
              Learn automation strategies specific to your industry with real-world case studies and applications.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
              <Users className="text-purple-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Expert Support</h3>
            <p className="text-gray-600">
              Get guidance from AI automation experts who have deployed systems in production environments.
            </p>
          </div>
        </div>

        {/* Course List */}
        <CourseList 
          courses={courses}
          title="Available Courses"
          showSearch={true}
          showFilters={true}
        />

        {/* CTA Section */}
        <div className="mt-20 bg-slate-900 rounded-2xl p-8 lg:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Build Your AI Automation System?</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Start with our foundational course and work your way up to advanced automation patterns. 
            Join thousands of professionals transforming their workflows with AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={courses.length > 0 ? `/courses/${courses[0].id}` : '#'}
              className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Start Learning Now
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 border border-gray-400 hover:border-gray-300 text-gray-300 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Contact Our Experts
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}