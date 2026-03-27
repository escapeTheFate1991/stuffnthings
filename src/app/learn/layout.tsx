import { ProtectedRoute } from '@/components/auth'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Learn | Stuff N Things',
  description: 'Access your learning content and track your progress.',
}

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute
      fallback={
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
          <div className="max-w-md text-center">
            <h1 className="text-3xl font-bold mb-4">Access Learning Content</h1>
            <p className="text-gray-400 mb-8">
              Sign in to access your courses and track your progress. Join thousands of developers 
              already learning with our structured curriculum.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* The SignInButton will be rendered by ProtectedRoute */}
            </div>
            <div className="mt-8 text-sm text-gray-500">
              <p>Sign up with GitHub or Google</p>
              <p className="mt-2">New users get free access to starter courses</p>
            </div>
          </div>
        </div>
      }
    >
      {children}
    </ProtectedRoute>
  )
}