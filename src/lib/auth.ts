import { currentUser, auth } from '@clerk/nextjs/server'
import { supabaseAdmin } from './supabase'
import { Database } from '../types/database'

export type User = Database['public']['Tables']['users']['Row']

/**
 * Sync Clerk user with Supabase users table
 * This function should be called on user sign-in/sign-up
 */
export async function syncClerkUserWithSupabase(clerkUser: any) {
  if (!clerkUser) return null

  const email = clerkUser.primaryEmailAddress?.emailAddress || clerkUser.emailAddresses?.[0]?.emailAddress
  if (!email) {
    throw new Error('User email not found')
  }

  try {
    // Check if user already exists
    const { data: existingUser, error: fetchError } = await (supabaseAdmin as any)
      .from('users')
      .select('*')
      .eq('clerk_user_id', clerkUser.id)
      .single()

    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error fetching user:', fetchError)
      throw fetchError
    }

    if (existingUser) {
      // Update existing user
      const updateData = {
        email,
        first_name: clerkUser.firstName || null,
        last_name: clerkUser.lastName || null,
        avatar_image: clerkUser.imageUrl || null,
        username: clerkUser.username || null,
        email_verified: clerkUser.emailAddresses?.[0]?.verification?.status === 'verified' || false,
        last_login_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      const { data: updatedUser, error: updateError } = await (supabaseAdmin as any)
        .from('users')
        .update(updateData as any)
        .eq('clerk_user_id', clerkUser.id)
        .select()
        .single()

      if (updateError) {
        console.error('Error updating user:', updateError)
        throw updateError
      }

      return updatedUser
    } else {
      // Create new user
      const insertData: Database['public']['Tables']['users']['Insert'] = {
        clerk_user_id: clerkUser.id,
        email,
        first_name: clerkUser.firstName || null,
        last_name: clerkUser.lastName || null,
        avatar_image: clerkUser.imageUrl || null,
        username: clerkUser.username || null,
        email_verified: clerkUser.emailAddresses?.[0]?.verification?.status === 'verified' || false,
        subscription_tier: 'free',
        subscription_status: 'active',
        last_login_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      const { data: newUser, error: insertError } = await (supabaseAdmin as any)
        .from('users')
        .insert(insertData)
        .select()
        .single()

      if (insertError) {
        console.error('Error creating user:', insertError)
        throw insertError
      }

      return newUser
    }
  } catch (error) {
    console.error('Error syncing user with Supabase:', error)
    throw error
  }
}

/**
 * Get the current authenticated user from Supabase
 * Returns null if no user is authenticated
 */
export async function getCurrentSupabaseUser(): Promise<User | null> {
  try {
    const clerkUser = await currentUser()
    if (!clerkUser) return null

    // Get user from Supabase using Clerk ID
    const { data: user, error } = await (supabaseAdmin as any)
      .from('users')
      .select('*')
      .eq('clerk_user_id', clerkUser.id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') { // No rows returned
        // User doesn't exist in Supabase yet, sync them
        return await syncClerkUserWithSupabase(clerkUser)
      }
      console.error('Error fetching user from Supabase:', error)
      return null
    }

    return user
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

/**
 * Check if user has access to a specific course tier
 */
export async function hasAccessToTier(user: User | null, tier: 'free' | 'spark' | 'synapse' | 'cortex' | 'singularity'): Promise<boolean> {
  if (!user) return tier === 'free'
  
  const tierHierarchy = {
    'free': 0,
    'spark': 1,
    'synapse': 2,
    'cortex': 3,
    'singularity': 4
  }
  
  const userTierLevel = tierHierarchy[user.subscription_tier as keyof typeof tierHierarchy] || 0
  const requiredTierLevel = tierHierarchy[tier as keyof typeof tierHierarchy] || 0
  
  return userTierLevel >= requiredTierLevel
}

/**
 * Check if user has access to a specific course
 */
export async function hasAccessToCourse(courseId: string): Promise<boolean> {
  try {
    const user = await getCurrentSupabaseUser()
    if (!user) return false

    // Get course access tier
    const { data: course, error } = await (supabaseAdmin as any)
      .from('courses')
      .select('access_tier, git_progress_required')
      .eq('course_uuid', courseId)
      .single()

    if (error || !course) return false

    // Check subscription tier access
    const tierAccess = await hasAccessToTier(user, course.access_tier as 'free' | 'spark' | 'synapse' | 'cortex' | 'singularity')
    if (!tierAccess) return false

    // Check git progress requirement if applicable
    if (course.git_progress_required > 0) {
      const { data: gitProgress } = await (supabaseAdmin as any)
        .from('user_git_progress')
        .select('progress_level')
        .eq('user_id', user.id)
        .single()

      return (gitProgress?.progress_level || 0) >= course.git_progress_required
    }

    return true
  } catch (error) {
    console.error('Error checking course access:', error)
    return false
  }
}

/**
 * Get user progress for a specific course
 */
export async function getUserCourseProgress(courseId: string): Promise<any | null> {
  try {
    const user = await getCurrentSupabaseUser()
    if (!user) return null

    const { data: course, error: courseError } = await (supabaseAdmin as any)
      .from('courses')
      .select('id')
      .eq('course_uuid', courseId)
      .single()

    if (courseError || !course) return null

    const { data: progress, error } = await (supabaseAdmin as any)
      .from('user_progress')
      .select('*')
      .eq('user_id', (user as any).id)
      .eq('course_id', (course as any).id)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching user progress:', error)
      return null
    }

    return progress
  } catch (error) {
    console.error('Error getting user course progress:', error)
    return null
  }
}

/**
 * Server-side auth check for protected pages
 * Use this in page components that require authentication
 */
export async function requireAuth() {
  const { userId } = await auth()
  if (!userId) {
    throw new Error('Authentication required')
  }
  return userId
}

/**
 * Helper to determine if current user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  try {
    const { userId } = await auth()
    return !!userId
  } catch {
    return false
  }
}