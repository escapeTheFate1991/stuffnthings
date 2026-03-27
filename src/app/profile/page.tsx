import { currentUser } from '@clerk/nextjs/server'
import { getCurrentSupabaseUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { ProtectedRoute } from '@/components/auth'

export default async function ProfilePage() {
  const clerkUser = await currentUser()
  
  if (!clerkUser) {
    redirect('/sign-in')
  }

  const supabaseUser = await getCurrentSupabaseUser()

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Clerk Profile Info */}
          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Authentication Profile</h2>
            <div className="space-y-3">
              <div>
                <span className="text-gray-400">Email:</span>
                <p className="font-medium">{clerkUser.primaryEmailAddress?.emailAddress}</p>
              </div>
              <div>
                <span className="text-gray-400">Name:</span>
                <p className="font-medium">{clerkUser.firstName} {clerkUser.lastName}</p>
              </div>
              <div>
                <span className="text-gray-400">Username:</span>
                <p className="font-medium">{clerkUser.username || 'Not set'}</p>
              </div>
              <div>
                <span className="text-gray-400">Joined:</span>
                <p className="font-medium">{new Date(clerkUser.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Supabase Profile Info */}
          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Learning Profile</h2>
            {supabaseUser ? (
              <div className="space-y-3">
                <div>
                  <span className="text-gray-400">Subscription:</span>
                  <p className="font-medium capitalize">{supabaseUser.subscription_tier}</p>
                </div>
                <div>
                  <span className="text-gray-400">Status:</span>
                  <p className="font-medium capitalize">{supabaseUser.subscription_status}</p>
                </div>
                <div>
                  <span className="text-gray-400">Git Username:</span>
                  <p className="font-medium">{supabaseUser.git_username || 'Not connected'}</p>
                </div>
                <div>
                  <span className="text-gray-400">Member Since:</span>
                  <p className="font-medium">{new Date(supabaseUser.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            ) : (
              <div className="text-gray-400">
                <p>Learning profile not synced yet.</p>
                <p className="text-sm mt-2">This will be created automatically on your next sign-in.</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <a
              href="/courses"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Browse Courses
            </a>
            <a
              href="/learn"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Continue Learning
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}