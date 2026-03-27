import { supabase, supabaseAdmin } from './supabase'
import type { Database } from '../types/database'

// Type aliases for convenience
type Tables = Database['public']['Tables']
type Organization = Tables['organizations']['Row']
type Course = Tables['courses']['Row']
type Chapter = Tables['chapters']['Row']
type Activity = Tables['activities']['Row']
type UserProgress = Tables['user_progress']['Row']
type User = Tables['users']['Row']

// ============================================================================
// ORGANIZATION OPERATIONS
// ============================================================================

export const getOrganizations = async () => {
  const { data, error } = await supabase
    .from('organizations')
    .select('*')
    .eq('explore', true)
    .order('name')

  if (error) throw error
  return data
}

export const getOrganizationBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from('organizations')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) throw error
  return data
}

// ============================================================================
// COURSE OPERATIONS
// ============================================================================

export const getPublicCourses = async () => {
  const { data, error } = await supabase
    .from('courses')
    .select(`
      *,
      organizations!inner(name, slug, logo_image)
    `)
    .eq('public', true)
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export const getCoursesByOrganization = async (orgId: number) => {
  const { data, error } = await supabase
    .from('courses')
    .select(`
      *,
      organizations!inner(name, slug, logo_image)
    `)
    .eq('org_id', orgId)
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export const getCourseByUuid = async (courseUuid: string) => {
  const { data, error } = await supabase
    .from('courses')
    .select(`
      *,
      organizations!inner(name, slug, logo_image),
      chapters(
        *,
        chapter_activities(
          activity_order,
          activities(*)
        )
      )
    `)
    .eq('course_uuid', courseUuid)
    .eq('published', true)
    .order('chapter_order', { referencedTable: 'chapters' })
    .order('activity_order', { referencedTable: 'chapters.chapter_activities' })
    .single()

  if (error) throw error
  return data
}

export const searchCourses = async (query: string) => {
  const { data, error } = await supabase
    .from('courses')
    .select(`
      *,
      organizations!inner(name, slug, logo_image)
    `)
    .textSearch('search_vector', query, {
      type: 'websearch',
      config: 'english'
    })
    .eq('public', true)
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

// ============================================================================
// USER & PROGRESS OPERATIONS
// ============================================================================

export const getUserByClerkId = async (clerkUserId: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('clerk_user_id', clerkUserId)
    .single()

  if (error && error.code !== 'PGRST116') throw error // Ignore not found
  return data
}

export const createOrUpdateUser = async (userData: {
  clerk_user_id: string
  email: string
  username?: string
  first_name?: string
  last_name?: string
  avatar_image?: string
}) => {
  const { data, error } = await (supabaseAdmin as any)
    .from('users')
    .upsert({
      clerk_user_id: userData.clerk_user_id,
      email: userData.email,
      username: userData.username,
      first_name: userData.first_name,
      last_name: userData.last_name,
      avatar_image: userData.avatar_image,
      updated_at: new Date().toISOString()
    } as any)
    .select()
    .single()

  if (error) throw error
  return data
}

export const getUserProgress = async (userId: number, courseId: number) => {
  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('course_id', courseId)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return data
}

export const updateUserProgress = async (
  userId: number,
  courseId: number,
  activityId: number,
  completed = true
) => {
  // Use the database function for complex progress updates
  const { data, error } = await (supabase as any).rpc('update_course_progress', {
    p_user_id: userId,
    p_course_id: courseId,
    p_activity_id: activityId,
    p_completed: completed
  } as any)

  if (error) throw error
  return data
}

export const getUserCourseProgress = async (userId: number) => {
  const { data, error } = await supabase
    .from('user_progress')
    .select(`
      *,
      courses(name, course_uuid, thumbnail_image, organizations(name, slug))
    `)
    .eq('user_id', userId)
    .order('last_accessed_at', { ascending: false })

  if (error) throw error
  return data
}

// ============================================================================
// ACCESS CONTROL OPERATIONS
// ============================================================================

export const checkCourseAccess = async (userId: number, courseId: number) => {
  const { data, error } = await (supabase as any).rpc('check_course_access', {
    p_user_id: userId,
    p_course_id: courseId
  })

  if (error) throw error
  return data as boolean
}

export const getUserGitProgress = async (userId: number) => {
  const { data, error } = await supabase
    .from('user_git_progress')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return data
}

export const updateUserGitProgress = async (
  userId: number,
  gitData: {
    git_username: string
    progress_level: number
    commits_count: number
    repos_count: number
    contributions_streak: number
    last_activity_date: string
    algorithm_score: number
    project_score: number
    consistency_score: number
  }
) => {
  const { data, error } = await (supabaseAdmin as any)
    .from('user_git_progress')
    .upsert({
      user_id: userId,
      ...gitData,
      last_updated: new Date().toISOString()
    } as any)
    .select()
    .single()

  if (error) throw error
  return data
}

// ============================================================================
// ACTIVITY SUBMISSIONS
// ============================================================================

export const submitActivity = async (
  userId: number,
  activityId: number,
  submissionData: any,
  score?: number,
  maxScore?: number
) => {
  const { data, error } = await (supabase as any)
    .from('activity_submissions')
    .upsert({
      user_id: userId,
      activity_id: activityId,
      submission_data: submissionData,
      score,
      max_score: maxScore,
      status: 'submitted',
      updated_at: new Date().toISOString()
    } as any)
    .select()
    .single()

  if (error) throw error
  return data
}

export const getActivitySubmission = async (userId: number, activityId: number) => {
  const { data, error } = await supabase
    .from('activity_submissions')
    .select('*')
    .eq('user_id', userId)
    .eq('activity_id', activityId)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return data
}

// ============================================================================
// SUBSCRIPTION & TIER MANAGEMENT
// ============================================================================

export const getSubscriptionTiers = async () => {
  const { data, error } = await supabase
    .from('subscription_tiers')
    .select('*')
    .order('monthly_price')

  if (error) throw error
  return data
}



// ============================================================================
// ANALYTICS & REPORTING
// ============================================================================

export const getCourseAnalytics = async (courseId: number) => {
  // Get enrollment count
  const { count: enrollmentCount } = await supabase
    .from('user_progress')
    .select('*', { count: 'exact', head: true })
    .eq('course_id', courseId)

  // Get completion count
  const { count: completionCount } = await supabase
    .from('user_progress')
    .select('*', { count: 'exact', head: true })
    .eq('course_id', courseId)
    .not('completed_at', 'is', null)

  // Calculate completion rate
  const completionRate = enrollmentCount ? (completionCount || 0) / enrollmentCount * 100 : 0

  return {
    enrollmentCount: enrollmentCount || 0,
    completionCount: completionCount || 0,
    completionRate: Math.round(completionRate * 100) / 100
  }
}

// ============================================================================
// GITHUB ACCESS TRACKING
// ============================================================================

export const updateUserGitHubUsername = async (userId: number, githubUsername: string) => {
  const { data, error } = await (supabaseAdmin as any)
    .from('users')
    .update({
      git_username: githubUsername,
      updated_at: new Date().toISOString()
    })
    .eq('id', userId)
    .select()
    .single()

  if (error) throw error
  return data
}

export const logGitHubAccessEvent = async (event: {
  user_id: number
  github_username: string
  repositories: string[]
  access_level: string
  tier: string
  action: 'grant' | 'revoke' | 'update'
  timestamp: string
}) => {
  const { data, error } = await (supabaseAdmin as any)
    .from('github_access_events')
    .insert({
      user_id: event.user_id,
      github_username: event.github_username,
      repositories: event.repositories,
      access_level: event.access_level,
      tier: event.tier,
      action: event.action,
      event_timestamp: event.timestamp,
      created_at: new Date().toISOString()
    } as any)
    .select()
    .single()

  if (error) throw error
  return data
}

export const getUserGitHubAccess = async (userId: number) => {
  const { data, error } = await supabase
    .from('github_access_events')
    .select('*')
    .eq('user_id', userId)
    .order('event_timestamp', { ascending: false })
    .limit(10)

  if (error) throw error
  return data
}

export const getActiveGitHubUsers = async () => {
  const { data, error } = await supabase
    .from('users')
    .select('id, email, git_username, subscription_tier, subscription_status')
    .not('git_username', 'is', null)
    .eq('subscription_status', 'active')
    .order('updated_at', { ascending: false })

  if (error) throw error
  return data
}

export const cleanupExpiredAccess = async () => {
  // Get users with expired subscriptions
  const { data: expiredUsers, error } = await supabase
    .from('users')
    .select('id, email, git_username, subscription_tier')
    .eq('subscription_status', 'expired')
    .not('git_username', 'is', null)

  if (error) throw error
  
  return expiredUsers
}

export const updateUserSubscriptionTier = async (
  userId: number,
  newTier: string,
  oldTier?: string
) => {
  const { data, error } = await (supabaseAdmin as any)
    .from('users')
    .update({
      subscription_tier: newTier,
      updated_at: new Date().toISOString()
    })
    .eq('id', userId)
    .select()
    .single()

  if (error) throw error
  
  // Log tier change for GitHub access management
  if (oldTier && oldTier !== newTier) {
    await logGitHubAccessEvent({
      user_id: userId,
      github_username: data.git_username || 'unknown',
      repositories: [],
      access_level: newTier,
      tier: newTier,
      action: 'update',
      timestamp: new Date().toISOString()
    })
  }
  
  return data
}

// ============================================================================
// ERROR HANDLING UTILITIES
// ============================================================================

export class DatabaseError extends Error {
  constructor(message: string, public originalError?: any) {
    super(message)
    this.name = 'DatabaseError'
  }
}

export const handleDatabaseError = (error: any, operation: string) => {
  console.error(`Database error during ${operation}:`, error)
  
  if (error.code === 'PGRST116') {
    throw new DatabaseError(`Record not found during ${operation}`)
  }
  
  if (error.code === '23505') {
    throw new DatabaseError(`Duplicate record during ${operation}`)
  }
  
  if (error.code === '23503') {
    throw new DatabaseError(`Referenced record not found during ${operation}`)
  }
  
  throw new DatabaseError(`Database operation failed: ${operation}`, error)
}

// ============================================================================
// SUBSCRIPTION & PRICING OPERATIONS
// ============================================================================

export const getUserSubscription = async (userId: number) => {
  const { data, error } = await supabase
    .from('users')
    .select('subscription_tier, subscription_status, subscription_expires_at')
    .eq('id', userId)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return data
}

export const updateUserSubscription = async (
  userId: number,
  tier: string,
  status: string,
  expiresAt?: string | null
) => {
  const { data, error } = await (supabaseAdmin as any)
    .from('users')
    .update({
      subscription_tier: tier,
      subscription_status: status,
      subscription_expires_at: expiresAt,
      updated_at: new Date().toISOString()
    })
    .eq('id', userId)
    .select()
    .single()

  if (error) throw error
  return data
}

export const getUsersBySubscriptionTier = async (tier: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('id, email, first_name, last_name, subscription_tier, subscription_status, subscription_expires_at')
    .eq('subscription_tier', tier)
    .eq('subscription_status', 'active')

  if (error) throw error
  return data
}

export const checkSubscriptionAccess = async (userId: number, requiredTier: string) => {
  const user = await getUserSubscription(userId)
  if (!user) return false

  // Define tier hierarchy (higher numbers = higher access)
  const tierHierarchy = {
    'free': 0,
    'spark': 1,
    'synapse': 2,
    'cortex': 3,
    'singularity': 4
  }

  const userTierLevel = tierHierarchy[user.subscription_tier as keyof typeof tierHierarchy] || 0
  const requiredTierLevel = tierHierarchy[requiredTier as keyof typeof tierHierarchy] || 0

  // Check if subscription is active and not expired
  const isActive = user.subscription_status === 'active'
  const notExpired = !user.subscription_expires_at || new Date(user.subscription_expires_at) > new Date()

  return isActive && notExpired && userTierLevel >= requiredTierLevel
}

export const getCourseAccessRequirement = async (courseId: number) => {
  const { data, error } = await supabase
    .from('courses')
    .select('access_tier')
    .eq('id', courseId)
    .single()

  if (error) throw error
  return data?.access_tier || 'free'
}

export const getChapterAccessRequirement = async (chapterId: number) => {
  const { data, error } = await supabase
    .from('chapters')
    .select('access_tier')
    .eq('id', chapterId)
    .single()

  if (error) throw error
  return data?.access_tier || 'free'
}

export const getUserCourseAccess = async (userId: number, courseId: number) => {
  // Get course access requirement
  const requiredTier = await getCourseAccessRequirement(courseId)
  
  // Check user's subscription access
  return await checkSubscriptionAccess(userId, requiredTier)
}

export const getBulkCourseAccess = async (userId: number, courseIds: number[]) => {
  const user = await getUserSubscription(userId)
  if (!user) {
    return courseIds.map(id => ({ courseId: id, hasAccess: false, requiredTier: 'tier1' }))
  }

  // Get access requirements for all courses
  const { data: courses, error } = await supabase
    .from('courses')
    .select('id, access_tier')
    .in('id', courseIds)

  if (error) throw error

  const tierHierarchy = {
    'free': 0,
    'spark': 1,
    'synapse': 2,
    'cortex': 3,
    'singularity': 4
  }

  const userTierLevel = tierHierarchy[user.subscription_tier as keyof typeof tierHierarchy] || 0
  const isActive = user.subscription_status === 'active'
  const notExpired = !user.subscription_expires_at || new Date(user.subscription_expires_at) > new Date()

  return courses.map(course => {
    const requiredTierLevel = tierHierarchy[course.access_tier as keyof typeof tierHierarchy] || 0
    const hasAccess = isActive && notExpired && userTierLevel >= requiredTierLevel

    return {
      courseId: course.id,
      hasAccess,
      requiredTier: course.access_tier
    }
  })
}

// ============================================================================
// REPOSITORY ACCESS CONTROL
// ============================================================================

export const getUserRepositoryAccess = async (userId: number) => {
  const user = await getUserSubscription(userId)
  if (!user) return []

  // Map subscription tiers to repository access
  const repositoryMap = {
    'spark': ['ai-fundamentals'],
    'synapse': ['ai-fundamentals', 'advanced-workflows'],
    'cortex': ['ai-fundamentals', 'advanced-workflows', 'business-automation'],
    'singularity': ['ai-fundamentals', 'advanced-workflows', 'business-automation', 'enterprise-integrations']
  }

  const isActive = user.subscription_status === 'active'
  const notExpired = !user.subscription_expires_at || new Date(user.subscription_expires_at) > new Date()

  if (!isActive || !notExpired) {
    return []
  }

  return repositoryMap[user.subscription_tier as keyof typeof repositoryMap] || []
}

export const checkRepositoryAccess = async (userId: number, repository: string) => {
  const accessibleRepos = await getUserRepositoryAccess(userId)
  return accessibleRepos.includes(repository)
}

// ============================================================================
// SUBSCRIPTION ANALYTICS
// ============================================================================

export const getSubscriptionAnalytics = async () => {
  const { data, error } = await supabase
    .from('users')
    .select('subscription_tier, subscription_status')
    .not('subscription_tier', 'eq', 'free')

  if (error) throw error

  const analytics = {
    totalSubscriptions: 0,
    activeSubscriptions: 0,
    spark: 0,
    synapse: 0,
    cortex: 0,
    singularity: 0,
    churnRate: 0
  }

  data.forEach(user => {
    analytics.totalSubscriptions++
    
    if (user.subscription_status === 'active') {
      analytics.activeSubscriptions++
    }
    
    switch (user.subscription_tier) {
      case 'spark':
        analytics.spark++
        break
      case 'synapse':
        analytics.synapse++
        break
      case 'cortex':
        analytics.cortex++
        break
      case 'singularity':
        analytics.singularity++
        break
    }
  })

  analytics.churnRate = analytics.totalSubscriptions > 0 
    ? ((analytics.totalSubscriptions - analytics.activeSubscriptions) / analytics.totalSubscriptions) * 100
    : 0

  return analytics
}

// ============================================================================
// WEBHOOK EVENT LOGGING
// ============================================================================

export const logWebhookEvent = async (
  eventType: string,
  eventId: string,
  processed: boolean,
  data?: any,
  error?: string
) => {
  // This could be stored in a separate webhook_events table
  // For now, we'll just log to console with structured format
  const logEntry = {
    eventType,
    eventId,
    processed,
    timestamp: new Date().toISOString(),
    ...(data && { data }),
    ...(error && { error })
  }

  console.log('Webhook Event Log:', JSON.stringify(logEntry, null, 2))
  
  // In production, you might want to store this:
  // await supabase.from('webhook_events').insert(logEntry)
}