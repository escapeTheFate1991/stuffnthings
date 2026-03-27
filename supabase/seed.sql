-- ============================================================================
-- SEED DATA FOR STUFFNTHINGS LMS
-- ============================================================================
-- This file contains sample data for testing the LMS implementation
-- Run after applying the main schema migration

-- ============================================================================
-- SAMPLE COURSES
-- ============================================================================

-- Get the default organization ID
DO $$
DECLARE
    org_id_var BIGINT;
    course_id_var BIGINT;
    chapter_id_var BIGINT;
    activity_id_var BIGINT;
BEGIN
    -- Get the stuffnthings organization ID
    SELECT id INTO org_id_var FROM organizations WHERE slug = 'stuffnthings';
    
    -- Create sample courses
    INSERT INTO courses (org_id, name, description, about, learnings, tags, public, published, access_tier, git_progress_required) VALUES
    (org_id_var, 'Git Fundamentals', 
     'Master the basics of version control with Git', 
     'This comprehensive course covers everything you need to know about Git version control system, from basic commands to advanced workflows.',
     'Learn to create repositories, make commits, manage branches, resolve conflicts, and collaborate effectively with Git.',
     'git, version-control, programming, development',
     true, true, 'free', 0),
    
    (org_id_var, 'Advanced React Patterns', 
     'Deep dive into React hooks, context, and performance optimization', 
     'Take your React skills to the next level with advanced patterns, custom hooks, and performance optimization techniques.',
     'Master compound components, render props, custom hooks, React Context, and performance optimization strategies.',
     'react, javascript, frontend, hooks, performance',
     true, true, 'pro', 25),
     
    (org_id_var, 'Full-Stack TypeScript', 
     'Build end-to-end applications with TypeScript, Node.js, and React', 
     'Learn to build production-ready full-stack applications using TypeScript across the entire development stack.',
     'Create type-safe applications, implement proper error handling, set up CI/CD pipelines, and deploy to production.',
     'typescript, nodejs, react, fullstack, deployment',
     true, true, 'premium', 50);

    -- Get course IDs for adding chapters
    SELECT id INTO course_id_var FROM courses WHERE name = 'Git Fundamentals' AND org_id = org_id_var;
    
    -- Add chapters for Git Fundamentals
    INSERT INTO chapters (course_id, name, description, chapter_order) VALUES
    (course_id_var, 'Introduction to Version Control', 'Understanding the need for version control and Git basics', 1),
    (course_id_var, 'Basic Git Operations', 'Learn essential Git commands for daily development', 2),
    (course_id_var, 'Branching and Merging', 'Master Git branching strategies and conflict resolution', 3),
    (course_id_var, 'Collaboration with Git', 'Working with remote repositories and teams', 4);

    -- Get first chapter ID
    SELECT id INTO chapter_id_var FROM chapters WHERE course_id = course_id_var AND chapter_order = 1;
    
    -- Add sample activities
    INSERT INTO activities (name, activity_type, content) VALUES
    ('What is Version Control?', 'video', '{
        "video_url": "https://example.com/intro-video.mp4",
        "duration": 480,
        "description": "An introduction to version control concepts and why they matter for developers."
    }'),
    
    ('Setting Up Git', 'text', '{
        "markdown": "# Setting Up Git\n\n## Installation\n\nFirst, download and install Git from [git-scm.com](https://git-scm.com)...\n\n## Configuration\n\nSet up your identity:\n```bash\ngit config --global user.name \"Your Name\"\ngit config --global user.email \"your.email@example.com\"\n```",
        "reading_time": 5
    }'),
    
    ('Your First Repository', 'code', '{
        "language": "bash",
        "code": "# Create a new directory\nmkdir my-first-repo\ncd my-first-repo\n\n# Initialize Git repository\ngit init\n\n# Create a file\necho \"Hello Git!\" > README.md\n\n# Add and commit\ngit add README.md\ngit commit -m \"Initial commit\"",
        "solution": "git init\necho \"Hello Git!\" > README.md\ngit add README.md\ngit commit -m \"Initial commit\"",
        "tests": "Check that .git directory exists and README.md is committed"
    }'),
    
    ('Git Basics Quiz', 'quiz', '{
        "questions": [
            {
                "question": "What command initializes a new Git repository?",
                "type": "multiple_choice",
                "options": ["git start", "git init", "git create", "git new"],
                "correct_answer": "git init",
                "explanation": "git init creates a new .git directory in the current folder, initializing a new repository."
            },
            {
                "question": "Git is a distributed version control system.",
                "type": "true_false",
                "correct_answer": "true",
                "explanation": "Yes, Git is distributed, meaning every clone contains the full history of the project."
            }
        ],
        "passing_score": 80,
        "attempts_allowed": 3
    }');

    -- Link activities to chapters
    SELECT id INTO activity_id_var FROM activities WHERE name = 'What is Version Control?';
    INSERT INTO chapter_activities (chapter_id, activity_id, activity_order) VALUES (chapter_id_var, activity_id_var, 1);
    
    SELECT id INTO activity_id_var FROM activities WHERE name = 'Setting Up Git';
    INSERT INTO chapter_activities (chapter_id, activity_id, activity_order) VALUES (chapter_id_var, activity_id_var, 2);
    
    SELECT id INTO activity_id_var FROM activities WHERE name = 'Your First Repository';
    INSERT INTO chapter_activities (chapter_id, activity_id, activity_order) VALUES (chapter_id_var, activity_id_var, 3);
    
    SELECT id INTO activity_id_var FROM activities WHERE name = 'Git Basics Quiz';
    INSERT INTO chapter_activities (chapter_id, activity_id, activity_order) VALUES (chapter_id_var, activity_id_var, 4);

END $$;

-- ============================================================================
-- SAMPLE USERS (for testing - remove in production)
-- ============================================================================

-- Note: In production, users will be created via Clerk authentication
-- These are just for testing database functionality

INSERT INTO users (clerk_user_id, username, email, first_name, last_name, git_username, subscription_tier) VALUES
('test_user_1', 'johndoe', 'john@example.com', 'John', 'Doe', 'johndoe-dev', 'free'),
('test_user_2', 'janesmith', 'jane@example.com', 'Jane', 'Smith', 'jane-codes', 'pro'),
('test_user_3', 'bobwilson', 'bob@example.com', 'Bob', 'Wilson', 'bobwilson', 'premium');

-- Sample Git progress for test users
INSERT INTO user_git_progress (user_id, git_username, progress_level, commits_count, repos_count, contributions_streak, algorithm_score, project_score, consistency_score) 
SELECT 
    u.id, 
    u.git_username,
    CASE u.username 
        WHEN 'johndoe' THEN 15
        WHEN 'janesmith' THEN 45
        WHEN 'bobwilson' THEN 75
    END,
    CASE u.username 
        WHEN 'johndoe' THEN 50
        WHEN 'janesmith' THEN 250
        WHEN 'bobwilson' THEN 500
    END,
    CASE u.username 
        WHEN 'johndoe' THEN 3
        WHEN 'janesmith' THEN 8
        WHEN 'bobwilson' THEN 15
    END,
    CASE u.username 
        WHEN 'johndoe' THEN 5
        WHEN 'janesmith' THEN 30
        WHEN 'bobwilson' THEN 90
    END,
    CASE u.username 
        WHEN 'johndoe' THEN 20.5
        WHEN 'janesmith' THEN 65.0
        WHEN 'bobwilson' THEN 85.5
    END,
    CASE u.username 
        WHEN 'johndoe' THEN 15.0
        WHEN 'janesmith' THEN 55.0
        WHEN 'bobwilson' THEN 90.0
    END,
    CASE u.username 
        WHEN 'johndoe' THEN 10.0
        WHEN 'janesmith' THEN 35.0
        WHEN 'bobwilson' THEN 70.0
    END
FROM users u 
WHERE u.username IN ('johndoe', 'janesmith', 'bobwilson');

-- Sample user progress (John has started Git Fundamentals)
DO $$
DECLARE
    user_id_var BIGINT;
    course_id_var BIGINT;
    activity_id_var BIGINT;
BEGIN
    SELECT id INTO user_id_var FROM users WHERE username = 'johndoe';
    SELECT id INTO course_id_var FROM courses WHERE name = 'Git Fundamentals';
    SELECT id INTO activity_id_var FROM activities WHERE name = 'What is Version Control?';
    
    -- John has started the Git course and completed the first activity
    INSERT INTO user_progress (user_id, course_id, progress_percentage, completed_activities, total_activities, activity_progress) VALUES
    (user_id_var, course_id_var, 25.0, 1, 4, 
     jsonb_build_object(activity_id_var::text, jsonb_build_object('completed', true, 'completed_at', NOW())));
     
    -- Add a sample activity submission
    INSERT INTO activity_submissions (user_id, activity_id, submission_data, status, score, max_score) VALUES
    (user_id_var, activity_id_var, '{"watched": true, "duration": 480}', 'submitted', 100, 100);
END $$;

-- ============================================================================
-- UPDATE COURSE STATISTICS
-- ============================================================================

-- Update enrollment counts based on user progress
UPDATE courses SET 
    enrollment_count = (
        SELECT COUNT(*) 
        FROM user_progress 
        WHERE user_progress.course_id = courses.id
    ),
    completion_rate = (
        SELECT COALESCE(
            ROUND(
                (COUNT(CASE WHEN completed_at IS NOT NULL THEN 1 END)::DECIMAL / 
                 NULLIF(COUNT(*), 0)) * 100, 2
            ), 0
        )
        FROM user_progress 
        WHERE user_progress.course_id = courses.id
    );

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Uncomment to verify the seed data was inserted correctly

/*
-- Check organizations
SELECT 'Organizations:' as table_name, count(*) as count FROM organizations
UNION ALL
SELECT 'Courses:', count(*) FROM courses  
UNION ALL
SELECT 'Chapters:', count(*) FROM chapters
UNION ALL  
SELECT 'Activities:', count(*) FROM activities
UNION ALL
SELECT 'Users:', count(*) FROM users
UNION ALL
SELECT 'User Progress:', count(*) FROM user_progress;

-- Sample course with structure
SELECT 
    c.name as course,
    ch.name as chapter, 
    a.name as activity,
    a.activity_type
FROM courses c
JOIN chapters ch ON c.id = ch.course_id  
JOIN chapter_activities ca ON ch.id = ca.chapter_id
JOIN activities a ON ca.activity_id = a.id
WHERE c.name = 'Git Fundamentals'
ORDER BY ch.chapter_order, ca.activity_order;
*/