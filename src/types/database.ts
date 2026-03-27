export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      organizations: {
        Row: {
          id: number
          org_uuid: string
          slug: string
          name: string
          description: string | null
          about: string | null
          email: string
          logo_image: string | null
          thumbnail_image: string | null
          socials: Json
          links: Json
          scripts: Json
          previews: Json
          explore: boolean
          label: string | null
          created_at: string
          updated_at: string
          search_vector: unknown | null
        }
        Insert: {
          id?: never
          org_uuid?: string
          slug: string
          name: string
          description?: string | null
          about?: string | null
          email: string
          logo_image?: string | null
          thumbnail_image?: string | null
          socials?: Json
          links?: Json
          scripts?: Json
          previews?: Json
          explore?: boolean
          label?: string | null
          created_at?: string
          updated_at?: string
          search_vector?: never
        }
        Update: {
          id?: never
          org_uuid?: string
          slug?: string
          name?: string
          description?: string | null
          about?: string | null
          email?: string
          logo_image?: string | null
          thumbnail_image?: string | null
          socials?: Json
          links?: Json
          scripts?: Json
          previews?: Json
          explore?: boolean
          label?: string | null
          created_at?: string
          updated_at?: string
          search_vector?: never
        }
      }
      users: {
        Row: {
          id: number
          user_uuid: string
          clerk_user_id: string | null
          username: string | null
          email: string
          first_name: string | null
          last_name: string | null
          avatar_image: string | null
          bio: string | null
          details: Json
          profile: Json
          email_verified: boolean
          email_verified_at: string | null
          last_login_at: string | null
          last_login_ip: string | null
          is_superadmin: boolean
          failed_login_attempts: number
          locked_until: string | null
          git_username: string | null
          subscription_tier: string
          subscription_status: string
          subscription_expires_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: never
          user_uuid?: string
          clerk_user_id?: string | null
          username?: string | null
          email: string
          first_name?: string | null
          last_name?: string | null
          avatar_image?: string | null
          bio?: string | null
          details?: Json
          profile?: Json
          email_verified?: boolean
          email_verified_at?: string | null
          last_login_at?: string | null
          last_login_ip?: string | null
          is_superadmin?: boolean
          failed_login_attempts?: number
          locked_until?: string | null
          git_username?: string | null
          subscription_tier?: string
          subscription_status?: string
          subscription_expires_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: never
          user_uuid?: string
          clerk_user_id?: string | null
          username?: string | null
          email?: string
          first_name?: string | null
          last_name?: string | null
          avatar_image?: string | null
          bio?: string | null
          details?: Json
          profile?: Json
          email_verified?: boolean
          email_verified_at?: string | null
          last_login_at?: string | null
          last_login_ip?: string | null
          is_superadmin?: boolean
          failed_login_attempts?: number
          locked_until?: string | null
          git_username?: string | null
          subscription_tier?: string
          subscription_status?: string
          subscription_expires_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      user_organizations: {
        Row: {
          id: number
          user_id: number
          org_id: number
          role: string
          joined_at: string
          permissions: Json
        }
        Insert: {
          id?: never
          user_id: number
          org_id: number
          role?: string
          joined_at?: string
          permissions?: Json
        }
        Update: {
          id?: never
          user_id?: number
          org_id?: number
          role?: string
          joined_at?: string
          permissions?: Json
        }
      }
      courses: {
        Row: {
          id: number
          org_id: number
          course_uuid: string
          name: string
          description: string | null
          about: string | null
          learnings: string | null
          tags: string | null
          thumbnail_type: string
          thumbnail_image: string | null
          thumbnail_video: string | null
          public: boolean
          published: boolean
          open_to_contributors: boolean
          seo: Json
          access_tier: string
          git_progress_required: number
          prerequisites: Json
          enrollment_count: number
          completion_rate: number
          average_rating: number
          created_at: string
          updated_at: string
          search_vector: unknown | null
        }
        Insert: {
          id?: never
          org_id: number
          course_uuid?: string
          name: string
          description?: string | null
          about?: string | null
          learnings?: string | null
          tags?: string | null
          thumbnail_type?: string
          thumbnail_image?: string | null
          thumbnail_video?: string | null
          public?: boolean
          published?: boolean
          open_to_contributors?: boolean
          seo?: Json
          access_tier?: string
          git_progress_required?: number
          prerequisites?: Json
          enrollment_count?: number
          completion_rate?: number
          average_rating?: number
          created_at?: string
          updated_at?: string
          search_vector?: never
        }
        Update: {
          id?: never
          org_id?: number
          course_uuid?: string
          name?: string
          description?: string | null
          about?: string | null
          learnings?: string | null
          tags?: string | null
          thumbnail_type?: string
          thumbnail_image?: string | null
          thumbnail_video?: string | null
          public?: boolean
          published?: boolean
          open_to_contributors?: boolean
          seo?: Json
          access_tier?: string
          git_progress_required?: number
          prerequisites?: Json
          enrollment_count?: number
          completion_rate?: number
          average_rating?: number
          created_at?: string
          updated_at?: string
          search_vector?: never
        }
      }
      chapters: {
        Row: {
          id: number
          course_id: number
          chapter_uuid: string
          name: string
          description: string | null
          chapter_order: number
          access_tier: string
          git_progress_required: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: never
          course_id: number
          chapter_uuid?: string
          name: string
          description?: string | null
          chapter_order: number
          access_tier?: string
          git_progress_required?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: never
          course_id?: number
          chapter_uuid?: string
          name?: string
          description?: string | null
          chapter_order?: number
          access_tier?: string
          git_progress_required?: number
          created_at?: string
          updated_at?: string
        }
      }
      activities: {
        Row: {
          id: number
          activity_uuid: string
          name: string
          activity_type: string
          content: Json
          published: boolean
          completion_rate: number
          average_time_minutes: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: never
          activity_uuid?: string
          name: string
          activity_type: string
          content?: Json
          published?: boolean
          completion_rate?: number
          average_time_minutes?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: never
          activity_uuid?: string
          name?: string
          activity_type?: string
          content?: Json
          published?: boolean
          completion_rate?: number
          average_time_minutes?: number
          created_at?: string
          updated_at?: string
        }
      }
      chapter_activities: {
        Row: {
          id: number
          chapter_id: number
          activity_id: number
          activity_order: number
          access_tier: string | null
          git_progress_required: number | null
          created_at: string
        }
        Insert: {
          id?: never
          chapter_id: number
          activity_id: number
          activity_order: number
          access_tier?: string | null
          git_progress_required?: number | null
          created_at?: string
        }
        Update: {
          id?: never
          chapter_id?: number
          activity_id?: number
          activity_order?: number
          access_tier?: string | null
          git_progress_required?: number | null
          created_at?: string
        }
      }
      user_progress: {
        Row: {
          id: number
          user_id: number
          course_id: number
          progress_percentage: number
          completed_activities: number
          total_activities: number
          started_at: string
          last_accessed_at: string
          completed_at: string | null
          chapter_progress: Json
          activity_progress: Json
        }
        Insert: {
          id?: never
          user_id: number
          course_id: number
          progress_percentage?: number
          completed_activities?: number
          total_activities?: number
          started_at?: string
          last_accessed_at?: string
          completed_at?: string | null
          chapter_progress?: Json
          activity_progress?: Json
        }
        Update: {
          id?: never
          user_id?: number
          course_id?: number
          progress_percentage?: number
          completed_activities?: number
          total_activities?: number
          started_at?: string
          last_accessed_at?: string
          completed_at?: string | null
          chapter_progress?: Json
          activity_progress?: Json
        }
      }
      activity_submissions: {
        Row: {
          id: number
          user_id: number
          activity_id: number
          submission_data: Json
          status: string
          score: number | null
          max_score: number | null
          feedback: string | null
          graded_by: number | null
          graded_at: string | null
          submitted_at: string
          updated_at: string
        }
        Insert: {
          id?: never
          user_id: number
          activity_id: number
          submission_data: Json
          status?: string
          score?: number | null
          max_score?: number | null
          feedback?: string | null
          graded_by?: number | null
          graded_at?: string | null
          submitted_at?: string
          updated_at?: string
        }
        Update: {
          id?: never
          user_id?: number
          activity_id?: number
          submission_data?: Json
          status?: string
          score?: number | null
          max_score?: number | null
          feedback?: string | null
          graded_by?: number | null
          graded_at?: string | null
          submitted_at?: string
          updated_at?: string
        }
      }
      user_git_progress: {
        Row: {
          id: number
          user_id: number
          git_username: string
          progress_level: number
          commits_count: number
          repos_count: number
          contributions_streak: number
          last_activity_date: string | null
          algorithm_score: number
          project_score: number
          consistency_score: number
          last_updated: string
        }
        Insert: {
          id?: never
          user_id: number
          git_username: string
          progress_level?: number
          commits_count?: number
          repos_count?: number
          contributions_streak?: number
          last_activity_date?: string | null
          algorithm_score?: number
          project_score?: number
          consistency_score?: number
          last_updated?: string
        }
        Update: {
          id?: never
          user_id?: number
          git_username?: string
          progress_level?: number
          commits_count?: number
          repos_count?: number
          contributions_streak?: number
          last_activity_date?: string | null
          algorithm_score?: number
          project_score?: number
          consistency_score?: number
          last_updated?: string
        }
      }
      subscription_tiers: {
        Row: {
          id: number
          name: string
          display_name: string
          description: string | null
          max_courses: number
          max_premium_courses: number
          git_progress_bonus: number
          monthly_price: number
          annual_price: number
          created_at: string
        }
        Insert: {
          id?: never
          name: string
          display_name: string
          description?: string | null
          max_courses?: number
          max_premium_courses?: number
          git_progress_bonus?: number
          monthly_price?: number
          annual_price?: number
          created_at?: string
        }
        Update: {
          id?: never
          name?: string
          display_name?: string
          description?: string | null
          max_courses?: number
          max_premium_courses?: number
          git_progress_bonus?: number
          monthly_price?: number
          annual_price?: number
          created_at?: string
        }
      }
      certificates: {
        Row: {
          id: number
          user_id: number
          course_id: number
          certificate_uuid: string
          certificate_data: Json
          issued_at: string
        }
        Insert: {
          id?: never
          user_id: number
          course_id: number
          certificate_uuid?: string
          certificate_data: Json
          issued_at?: string
        }
        Update: {
          id?: never
          user_id?: number
          course_id?: number
          certificate_uuid?: string
          certificate_data?: Json
          issued_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_course_access: {
        Args: {
          p_user_id: number
          p_course_id: number
        }
        Returns: boolean
      }
      update_course_progress: {
        Args: {
          p_user_id: number
          p_course_id: number
          p_activity_id: number
          p_completed?: boolean
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Helper types for common operations
export type CourseWithOrg = Database['public']['Tables']['courses']['Row'] & {
  organizations: Database['public']['Tables']['organizations']['Row']
}

export type CourseWithDetails = Database['public']['Tables']['courses']['Row'] & {
  organizations: Database['public']['Tables']['organizations']['Row']
  chapters: (Database['public']['Tables']['chapters']['Row'] & {
    chapter_activities: (Database['public']['Tables']['chapter_activities']['Row'] & {
      activities: Database['public']['Tables']['activities']['Row']
    })[]
  })[]
}

export type UserProgressWithCourse = Database['public']['Tables']['user_progress']['Row'] & {
  courses: Database['public']['Tables']['courses']['Row'] & {
    organizations: Database['public']['Tables']['organizations']['Row']
  }
}

// Activity content type definitions
export interface VideoContent {
  video_url?: string
  youtube_id?: string
  duration?: number
  subtitles?: string
}

export interface TextContent {
  markdown: string
  html?: string
  reading_time?: number
}

export interface CodeContent {
  language: string
  code: string
  solution?: string
  tests?: string
}

export interface QuizQuestion {
  question: string
  type: 'multiple_choice' | 'true_false' | 'short_answer'
  options?: string[]
  correct_answer: string | string[]
  explanation?: string
}

export interface QuizContent {
  questions: QuizQuestion[]
  passing_score: number
  attempts_allowed?: number
}

export interface AssignmentContent {
  instructions: string
  submission_format: 'text' | 'file' | 'code' | 'url'
  grading_rubric?: string
  max_score?: number
}

// Enum-like constants
export const AccessTiers = {
  FREE: 'free',
  PRO: 'pro',
  PREMIUM: 'premium'
} as const

export const SubscriptionStatuses = {
  ACTIVE: 'active',
  CANCELED: 'canceled',
  EXPIRED: 'expired'
} as const

export const ActivityTypes = {
  VIDEO: 'video',
  TEXT: 'text',
  CODE: 'code',
  QUIZ: 'quiz',
  ASSIGNMENT: 'assignment'
} as const

export const UserRoles = {
  OWNER: 'owner',
  ADMIN: 'admin',
  MEMBER: 'member',
  VIEWER: 'viewer'
} as const