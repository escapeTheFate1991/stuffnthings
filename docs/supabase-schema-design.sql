-- ============================================================================
-- SUPABASE SCHEMA DESIGN - LEARNHOUSE MIGRATION
-- ============================================================================
-- 
-- This schema migrates LearnHouse's PostgreSQL database to Supabase with:
-- ✅ Native PostgreSQL compatibility (zero translation needed)
-- ✅ Row Level Security for multi-tenancy  
-- ✅ UUID primary keys and JSONB for rich content
-- ✅ Clerk authentication integration
-- ✅ Git-Paywall progressive access support
--
-- Migration Strategy: Direct port from LearnHouse with Supabase enhancements
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "vector";

-- ============================================================================
-- 1. ORGANIZATIONS (Multi-tenancy)
-- ============================================================================

CREATE TABLE organizations (
    id BIGSERIAL PRIMARY KEY,
    org_uuid UUID UNIQUE DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    about TEXT,
    email VARCHAR(255) NOT NULL,
    
    -- Visual branding
    logo_image VARCHAR(500),
    thumbnail_image VARCHAR(500),
    
    -- JSON configuration
    socials JSONB DEFAULT '{}',
    links JSONB DEFAULT '{}',
    scripts JSONB DEFAULT '{}',
    previews JSONB DEFAULT '{}',
    
    -- Discovery settings
    explore BOOLEAN DEFAULT false,
    label VARCHAR(100),
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Search optimization
    search_vector TSVECTOR GENERATED ALWAYS AS (
        setweight(to_tsvector('english', name), 'A') ||
        setweight(to_tsvector('english', COALESCE(description, '')), 'B')
    ) STORED
);

-- Indexes for performance
CREATE INDEX idx_organizations_slug ON organizations(slug);
CREATE INDEX idx_organizations_org_uuid ON organizations(org_uuid);
CREATE INDEX idx_organizations_search ON organizations USING GIN(search_vector);
CREATE INDEX idx_organizations_explore ON organizations(explore) WHERE explore = true;

-- Row Level Security
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 2. USERS (Clerk Integration)
-- ============================================================================

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    user_uuid UUID UNIQUE DEFAULT uuid_generate_v4(),
    
    -- Clerk integration fields
    clerk_user_id VARCHAR(100) UNIQUE, -- Clerk's user.id
    username VARCHAR(100),
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    avatar_image VARCHAR(500),
    bio TEXT,
    
    -- Profile & preferences
    details JSONB DEFAULT '{}',
    profile JSONB DEFAULT '{}',
    
    -- Authentication status
    email_verified BOOLEAN DEFAULT false,
    email_verified_at TIMESTAMPTZ,
    last_login_at TIMESTAMPTZ,
    last_login_ip INET,
    
    -- Security & admin
    is_superadmin BOOLEAN DEFAULT false,
    failed_login_attempts INTEGER DEFAULT 0,
    locked_until TIMESTAMPTZ,
    
    -- Progressive access tracking  
    git_username VARCHAR(100), -- GitHub username for Git-Paywall
    subscription_tier VARCHAR(20) DEFAULT 'free', -- free, pro, premium
    subscription_status VARCHAR(20) DEFAULT 'active', -- active, canceled, expired
    subscription_expires_at TIMESTAMPTZ,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_users_clerk_user_id ON users(clerk_user_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_user_uuid ON users(user_uuid);
CREATE INDEX idx_users_git_username ON users(git_username);
CREATE INDEX idx_users_subscription ON users(subscription_tier, subscription_status);

-- Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 3. USER ORGANIZATIONS (Many-to-Many with Roles)
-- ============================================================================

CREATE TABLE user_organizations (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    org_id BIGINT REFERENCES organizations(id) ON DELETE CASCADE,
    role VARCHAR(50) DEFAULT 'member', -- owner, admin, member, viewer
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Role permissions
    permissions JSONB DEFAULT '{}',
    
    UNIQUE(user_id, org_id)
);

CREATE INDEX idx_user_organizations_user ON user_organizations(user_id);
CREATE INDEX idx_user_organizations_org ON user_organizations(org_id);
CREATE INDEX idx_user_organizations_role ON user_organizations(role);

ALTER TABLE user_organizations ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 4. COURSES (Core Learning Content)
-- ============================================================================

CREATE TABLE courses (
    id BIGSERIAL PRIMARY KEY,
    org_id BIGINT REFERENCES organizations(id) ON DELETE CASCADE,
    course_uuid UUID UNIQUE DEFAULT uuid_generate_v4(),
    
    -- Basic info
    name VARCHAR(255) NOT NULL,
    description TEXT,
    about TEXT,
    learnings TEXT, -- Learning objectives
    tags TEXT, -- Comma-separated tags
    
    -- Visual content
    thumbnail_type VARCHAR(10) DEFAULT 'image', -- image, video, both
    thumbnail_image VARCHAR(500),
    thumbnail_video VARCHAR(500),
    
    -- Visibility & status
    public BOOLEAN DEFAULT false,
    published BOOLEAN DEFAULT false,
    open_to_contributors BOOLEAN DEFAULT false,
    
    -- SEO & metadata
    seo JSONB DEFAULT '{}',
    
    -- Progressive access control
    access_tier VARCHAR(20) DEFAULT 'free', -- free, pro, premium
    git_progress_required INTEGER DEFAULT 0, -- Required Git progress level (0-100)
    prerequisites JSONB DEFAULT '[]', -- Array of course UUIDs
    
    -- Analytics
    enrollment_count INTEGER DEFAULT 0,
    completion_rate DECIMAL(5,2) DEFAULT 0,
    average_rating DECIMAL(3,2) DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Search optimization
    search_vector TSVECTOR GENERATED ALWAYS AS (
        setweight(to_tsvector('english', name), 'A') ||
        setweight(to_tsvector('english', COALESCE(description, '')), 'B') ||
        setweight(to_tsvector('english', COALESCE(tags, '')), 'C')
    ) STORED
);

-- Indexes
CREATE INDEX idx_courses_org_id ON courses(org_id);
CREATE INDEX idx_courses_uuid ON courses(course_uuid);
CREATE INDEX idx_courses_published ON courses(published) WHERE published = true;
CREATE INDEX idx_courses_public ON courses(public) WHERE public = true;
CREATE INDEX idx_courses_search ON courses USING GIN(search_vector);
CREATE INDEX idx_courses_access_tier ON courses(access_tier);
CREATE INDEX idx_courses_git_progress ON courses(git_progress_required);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 5. CHAPTERS (Course Structure)
-- ============================================================================

CREATE TABLE chapters (
    id BIGSERIAL PRIMARY KEY,
    course_id BIGINT REFERENCES courses(id) ON DELETE CASCADE,
    chapter_uuid UUID UNIQUE DEFAULT uuid_generate_v4(),
    
    name VARCHAR(255) NOT NULL,
    description TEXT,
    chapter_order INTEGER NOT NULL,
    
    -- Progressive access
    access_tier VARCHAR(20) DEFAULT 'free',
    git_progress_required INTEGER DEFAULT 0,
    
    -- Timestamps  
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(course_id, chapter_order)
);

CREATE INDEX idx_chapters_course_id ON chapters(course_id, chapter_order);
CREATE INDEX idx_chapters_uuid ON chapters(chapter_uuid);

ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 6. ACTIVITIES (Learning Content Blocks)
-- ============================================================================

CREATE TABLE activities (
    id BIGSERIAL PRIMARY KEY,
    activity_uuid UUID UNIQUE DEFAULT uuid_generate_v4(),
    
    name VARCHAR(255) NOT NULL,
    activity_type VARCHAR(50) NOT NULL, -- video, text, code, quiz, assignment
    
    -- Rich content (type-specific)
    content JSONB NOT NULL DEFAULT '{}',
    /*
    Content structure by type:
    - video: { video_url, youtube_id, duration, subtitles }
    - text: { markdown, html, reading_time }
    - code: { language, code, solution, tests }
    - quiz: { questions[], passing_score, attempts }
    - assignment: { instructions, submission_format, grading_rubric }
    */
    
    -- Status
    published BOOLEAN DEFAULT true,
    
    -- Analytics  
    completion_rate DECIMAL(5,2) DEFAULT 0,
    average_time_minutes INTEGER DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_activities_uuid ON activities(activity_uuid);
CREATE INDEX idx_activities_type ON activities(activity_type);
CREATE INDEX idx_activities_published ON activities(published) WHERE published = true;

ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 7. CHAPTER ACTIVITIES (Ordering within Chapters)
-- ============================================================================

CREATE TABLE chapter_activities (
    id BIGSERIAL PRIMARY KEY,
    chapter_id BIGINT REFERENCES chapters(id) ON DELETE CASCADE,
    activity_id BIGINT REFERENCES activities(id) ON DELETE CASCADE,
    activity_order INTEGER NOT NULL,
    
    -- Progressive access override
    access_tier VARCHAR(20),
    git_progress_required INTEGER,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(chapter_id, activity_id),
    UNIQUE(chapter_id, activity_order)
);

CREATE INDEX idx_chapter_activities_chapter ON chapter_activities(chapter_id, activity_order);
CREATE INDEX idx_chapter_activities_activity ON chapter_activities(activity_id);

ALTER TABLE chapter_activities ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 8. USER PROGRESS (Learning Analytics)  
-- ============================================================================

CREATE TABLE user_progress (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    course_id BIGINT REFERENCES courses(id) ON DELETE CASCADE,
    
    -- Progress tracking
    progress_percentage DECIMAL(5,2) DEFAULT 0,
    completed_activities INTEGER DEFAULT 0,
    total_activities INTEGER DEFAULT 0,
    
    -- Timing
    started_at TIMESTAMPTZ DEFAULT NOW(),
    last_accessed_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    
    -- Detailed progress
    chapter_progress JSONB DEFAULT '{}', -- { chapter_id: percentage }
    activity_progress JSONB DEFAULT '{}', -- { activity_id: { status, time_spent, score } }
    
    UNIQUE(user_id, course_id)
);

CREATE INDEX idx_user_progress_user ON user_progress(user_id);
CREATE INDEX idx_user_progress_course ON user_progress(course_id);
CREATE INDEX idx_user_progress_completion ON user_progress(completed_at) WHERE completed_at IS NOT NULL;

ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 9. ACTIVITY SUBMISSIONS (Assignments & Quizzes)
-- ============================================================================

CREATE TABLE activity_submissions (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    activity_id BIGINT REFERENCES activities(id) ON DELETE CASCADE,
    
    -- Submission data
    submission_data JSONB NOT NULL,
    status VARCHAR(20) DEFAULT 'submitted', -- submitted, graded, returned
    score DECIMAL(5,2),
    max_score DECIMAL(5,2),
    
    -- Feedback
    feedback TEXT,
    graded_by BIGINT REFERENCES users(id),
    graded_at TIMESTAMPTZ,
    
    -- Timing
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(user_id, activity_id) -- One submission per user per activity
);

CREATE INDEX idx_submissions_user ON activity_submissions(user_id);
CREATE INDEX idx_submissions_activity ON activity_submissions(activity_id);
CREATE INDEX idx_submissions_status ON activity_submissions(status);

ALTER TABLE activity_submissions ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 10. GIT PAYWALL INTEGRATION
-- ============================================================================

-- Git progress tracking for progressive access
CREATE TABLE user_git_progress (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    git_username VARCHAR(100) NOT NULL,
    
    -- Progress metrics
    progress_level INTEGER DEFAULT 0, -- 0-100 calculated score
    commits_count INTEGER DEFAULT 0,
    repos_count INTEGER DEFAULT 0,
    contributions_streak INTEGER DEFAULT 0,
    last_activity_date DATE,
    
    -- Calculated scores
    algorithm_score DECIMAL(5,2) DEFAULT 0,
    project_score DECIMAL(5,2) DEFAULT 0,
    consistency_score DECIMAL(5,2) DEFAULT 0,
    
    -- Cache timestamp
    last_updated TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(user_id)
);

CREATE INDEX idx_git_progress_user ON user_git_progress(user_id);
CREATE INDEX idx_git_progress_username ON user_git_progress(git_username);
CREATE INDEX idx_git_progress_level ON user_git_progress(progress_level);

-- Subscription tiers and access control
CREATE TABLE subscription_tiers (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL, -- free, pro, premium
    display_name VARCHAR(100) NOT NULL,
    description TEXT,
    
    -- Access permissions
    max_courses INTEGER DEFAULT -1, -- -1 = unlimited
    max_premium_courses INTEGER DEFAULT 0,
    git_progress_bonus INTEGER DEFAULT 0, -- Bonus points for tier
    
    -- Pricing (for reference)
    monthly_price DECIMAL(10,2) DEFAULT 0,
    annual_price DECIMAL(10,2) DEFAULT 0,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default tiers
INSERT INTO subscription_tiers (name, display_name, description, max_premium_courses, git_progress_bonus, monthly_price) VALUES
('free', 'Free', 'Access to basic courses and Git-based progression', 0, 0, 0),
('pro', 'Pro', 'Unlimited access to intermediate courses', 5, 10, 19.99),
('premium', 'Premium', 'Full access to all courses and exclusive content', -1, 25, 49.99);

-- ============================================================================
-- 11. CERTIFICATES & ACHIEVEMENTS
-- ============================================================================

CREATE TABLE certificates (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    course_id BIGINT REFERENCES courses(id) ON DELETE CASCADE,
    
    certificate_uuid UUID UNIQUE DEFAULT uuid_generate_v4(),
    certificate_data JSONB NOT NULL, -- Template, scores, metadata
    
    issued_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(user_id, course_id)
);

CREATE INDEX idx_certificates_user ON certificates(user_id);
CREATE INDEX idx_certificates_uuid ON certificates(certificate_uuid);

-- ============================================================================
-- 12. ROW LEVEL SECURITY POLICIES
-- ============================================================================

-- Organizations: Users can view orgs they belong to
CREATE POLICY "Users can view their organizations" ON organizations
    FOR SELECT USING (
        id IN (SELECT org_id FROM user_organizations WHERE user_id = (SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub'))
    );

-- Courses: Public courses + org member courses
CREATE POLICY "Public and member courses visible" ON courses
    FOR SELECT USING (
        public = true OR 
        org_id IN (SELECT org_id FROM user_organizations WHERE user_id = (SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub'))
    );

-- User progress: Users can only see their own progress  
CREATE POLICY "Users see own progress" ON user_progress
    FOR ALL USING (user_id = (SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub'));

-- Git progress: Users can only access their own Git data
CREATE POLICY "Users see own git progress" ON user_git_progress  
    FOR ALL USING (user_id = (SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub'));

-- ============================================================================
-- 13. FUNCTIONS FOR BUSINESS LOGIC
-- ============================================================================

-- Function to calculate course access based on subscription + Git progress
CREATE OR REPLACE FUNCTION check_course_access(
    p_user_id BIGINT,
    p_course_id BIGINT
) RETURNS BOOLEAN AS $$
DECLARE
    user_tier VARCHAR(20);
    user_git_level INTEGER;
    course_tier VARCHAR(20);
    course_git_required INTEGER;
BEGIN
    -- Get user subscription and Git progress
    SELECT u.subscription_tier, COALESCE(gp.progress_level, 0)
    INTO user_tier, user_git_level
    FROM users u
    LEFT JOIN user_git_progress gp ON u.id = gp.user_id
    WHERE u.id = p_user_id;
    
    -- Get course requirements
    SELECT c.access_tier, c.git_progress_required
    INTO course_tier, course_git_required
    FROM courses c
    WHERE c.id = p_course_id;
    
    -- Check access logic
    RETURN CASE
        WHEN course_tier = 'free' THEN true
        WHEN course_tier = 'pro' AND user_tier IN ('pro', 'premium') THEN true
        WHEN course_tier = 'premium' AND user_tier = 'premium' THEN true
        ELSE false
    END AND user_git_level >= course_git_required;
END;
$$ LANGUAGE plpgsql;

-- Function to update course progress
CREATE OR REPLACE FUNCTION update_course_progress(
    p_user_id BIGINT,
    p_course_id BIGINT,
    p_activity_id BIGINT,
    p_completed BOOLEAN DEFAULT true
) RETURNS VOID AS $$
DECLARE
    total_activities INTEGER;
    completed_count INTEGER;
    new_percentage DECIMAL(5,2);
BEGIN
    -- Get total activities in course
    SELECT COUNT(*)
    INTO total_activities
    FROM chapter_activities ca
    JOIN chapters ch ON ca.chapter_id = ch.id
    WHERE ch.course_id = p_course_id;
    
    -- Update or insert progress record
    INSERT INTO user_progress (user_id, course_id, total_activities)
    VALUES (p_user_id, p_course_id, total_activities)
    ON CONFLICT (user_id, course_id) 
    DO UPDATE SET 
        total_activities = EXCLUDED.total_activities,
        last_accessed_at = NOW();
    
    -- Update activity progress
    UPDATE user_progress
    SET activity_progress = jsonb_set(
        activity_progress,
        ARRAY[p_activity_id::TEXT],
        jsonb_build_object('completed', p_completed, 'completed_at', NOW())
    )
    WHERE user_id = p_user_id AND course_id = p_course_id;
    
    -- Calculate completion percentage
    WITH progress_calc AS (
        SELECT 
            COUNT(CASE WHEN (activity_progress->>key->>'completed')::BOOLEAN = true THEN 1 END) as completed
        FROM user_progress,
        jsonb_each(activity_progress) AS kv(key, value)
        WHERE user_id = p_user_id AND course_id = p_course_id
    )
    UPDATE user_progress
    SET 
        completed_activities = progress_calc.completed,
        progress_percentage = ROUND((progress_calc.completed::DECIMAL / total_activities) * 100, 2),
        completed_at = CASE WHEN progress_calc.completed = total_activities THEN NOW() ELSE NULL END
    FROM progress_calc
    WHERE user_id = p_user_id AND course_id = p_course_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- 14. TRIGGERS FOR AUTOMATIC UPDATES
-- ============================================================================

-- Update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to all tables with updated_at
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_chapters_updated_at BEFORE UPDATE ON chapters FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_activities_updated_at BEFORE UPDATE ON activities FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 15. INITIAL DATA SETUP
-- ============================================================================

-- Create default organization for single-tenant setup
INSERT INTO organizations (slug, name, email, description) VALUES
('default', 'stuffnthings Learning Platform', 'hello@stuffnthings.com', 'Git-based learning platform with progressive access')
ON CONFLICT (slug) DO NOTHING;

-- ============================================================================
-- END SCHEMA
-- ============================================================================

/*
MIGRATION NOTES:

1. COMPATIBILITY:
   ✅ Direct PostgreSQL port from LearnHouse
   ✅ All JSONB fields preserved for rich content
   ✅ UUID fields maintained for external references
   ✅ Foreign key constraints preserved

2. ENHANCEMENTS:
   ✅ Clerk authentication integration (clerk_user_id field)
   ✅ Git-Paywall progressive access (git_progress, subscription_tiers)  
   ✅ Row Level Security for multi-tenant data isolation
   ✅ Full-text search optimization
   ✅ Business logic functions for access control

3. MIGRATION STRATEGY:
   - Export LearnHouse data to JSON/CSV
   - Transform user IDs to Clerk user IDs
   - Import via Supabase SQL or client libraries
   - Test RLS policies with real user sessions

4. PERFORMANCE:
   - All critical queries have proper indexes
   - Search vectors for full-text search
   - Partitioning can be added for large datasets
   - Read replicas recommended for high traffic

5. SECURITY:
   - RLS prevents unauthorized data access
   - User identification via Clerk JWT
   - Sensitive operations require authentication
   - Audit logs can be added via triggers
*/