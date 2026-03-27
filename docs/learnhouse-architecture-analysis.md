# LearnHouse Architecture Analysis

## Executive Summary

LearnHouse is a **full-stack learning management system** with a Next.js frontend (`apps/web`) and FastAPI backend (`apps/api`). The architecture is well-designed for extraction - the frontend is cleanly separated and communicates with the backend only through HTTP APIs.

**Key findings for stuffnthings integration:**
- ✅ **Frontend is extractable** - Next.js app with clear API boundaries
- ✅ **PostgreSQL schema** - Native Supabase compatibility 
- ✅ **Static export capable** - Configuration already supports standalone builds
- ✅ **Multi-org architecture** - Perfect for Git-Paywall progressive access
- ✅ **Rich course content** - Supports video, interactive activities, assessments

## Architecture Overview

```
┌─────────────────┐    HTTP/REST    ┌─────────────────┐
│   Frontend      │ ───────────────▶│   Backend       │
│   Next.js 16    │ ←───────────────│   FastAPI       │
│   (apps/web)    │                 │   (apps/api)    │
└─────────────────┘                 └─────────────────┘
        │                                    │
        │                                    │
        ▼                                    ▼
┌─────────────────┐                 ┌─────────────────┐
│   Browser/      │                 │   PostgreSQL    │
│   CDN Static    │                 │   Database      │
└─────────────────┘                 └─────────────────┘
```

## 🎯 Core Components

### Frontend (apps/web)
- **Framework**: Next.js 16.2.1 with App Router
- **UI**: Tailwind CSS + Radix UI + Custom components  
- **Auth**: Custom JWT-based session management
- **Content**: Rich course viewer with video, markdown, code blocks
- **Collaboration**: Real-time editing via Hocuspocus/Y.js
- **Analytics**: Umami integration
- **Static Export**: `output: 'standalone'` ready

### Backend (apps/api) 
- **Framework**: FastAPI with uvicorn
- **ORM**: SQLModel (Pydantic + SQLAlchemy)
- **Database**: PostgreSQL with Alembic migrations
- **Auth**: JWT + Argon2 password hashing
- **File Storage**: S3-compatible or local filesystem
- **Payments**: Stripe integration (Enterprise Edition)
- **Search**: Basic PostgreSQL search + vector embeddings

### Database Schema
- **Multi-tenant**: Organizations + users + roles
- **Course Structure**: Courses → Chapters → Activities  
- **Content Types**: Video, text, code, assessments, SCORM
- **Collaboration**: Real-time document editing
- **Analytics**: User progress, trail completion

## 🔧 Technical Stack Compatibility

| Component | LearnHouse | stuffnthings Target | Compatibility |
|-----------|------------|---------------------|---------------|
| **Frontend** | Next.js 16 | Next.js 15+ | ✅ Perfect |
| **Database** | PostgreSQL | Supabase (PostgreSQL) | ✅ Native |
| **Auth** | JWT + custom | Clerk | 🔄 Replacement needed |
| **Storage** | S3/local | S3/CDN | ✅ Compatible |
| **Deployment** | Docker/K8s | Vercel + Serverless | 🔄 Adaptation needed |
| **Styling** | Tailwind | Tailwind | ✅ Perfect |

## 🚀 Frontend Extraction Strategy

The LearnHouse frontend (`apps/web`) is designed for extraction with:

### API Abstraction Layer
- **All backend calls** go through `/api/v1/[...path]/route.ts` proxy
- **Config-driven URLs** via `services/config/config.ts`
- **No direct backend imports** - pure HTTP communication

### Self-Contained Components
```typescript
// services/config/config.ts - Environment abstraction
export const getAPIUrl = () => isOnCustomDomain() ? '/api/v1/' : deriveAPIUrl()

// Clean separation of concerns
Frontend ←→ HTTP API ←→ Backend
```

### Static Export Ready
```javascript
// next.config.js
{
  output: 'standalone',          // ✅ Static export capable
  generateBuildId: () => 'hash', // ✅ Consistent builds
  images: { remotePatterns: []}  // ✅ External image support
}
```

## 📊 Database Schema Analysis

### Core Tables (PostgreSQL → Supabase)

```sql
-- Organizations (Multi-tenancy)
CREATE TABLE organization (
  id SERIAL PRIMARY KEY,
  org_uuid UUID UNIQUE,
  slug VARCHAR UNIQUE,
  name VARCHAR,
  description TEXT,
  logo_image VARCHAR,
  email VARCHAR,
  socials JSONB,
  creation_date TIMESTAMP
);

-- Users 
CREATE TABLE "user" (
  id SERIAL PRIMARY KEY,
  user_uuid UUID,
  username VARCHAR,
  email VARCHAR UNIQUE,
  password VARCHAR, -- Argon2 hashed
  first_name VARCHAR,
  last_name VARCHAR,
  avatar_image VARCHAR,
  bio TEXT,
  details JSONB,
  profile JSONB,
  email_verified BOOLEAN DEFAULT false,
  last_login_at TIMESTAMP,
  is_superadmin BOOLEAN DEFAULT false
);

-- Courses
CREATE TABLE course (
  id SERIAL PRIMARY KEY,
  org_id INTEGER REFERENCES organization(id) ON DELETE CASCADE,
  course_uuid UUID,
  name VARCHAR,
  description TEXT,
  about TEXT,
  thumbnail_image VARCHAR,
  thumbnail_video VARCHAR,
  public BOOLEAN,
  published BOOLEAN DEFAULT false,
  seo JSONB,
  creation_date TIMESTAMP
);

-- Chapters (Course structure)
CREATE TABLE chapter (
  id SERIAL PRIMARY KEY,
  course_id INTEGER REFERENCES course(id) ON DELETE CASCADE,
  chapter_uuid UUID,
  name VARCHAR,
  description TEXT,
  chapter_order INTEGER
);

-- Activities (Content blocks)
CREATE TABLE activity (
  id SERIAL PRIMARY KEY,
  activity_uuid UUID,
  name VARCHAR,
  activity_type VARCHAR, -- video, text, code, quiz
  content JSONB,
  published BOOLEAN DEFAULT true
);
```

### Supabase Migration Advantages
- **Native PostgreSQL**: Zero schema translation needed
- **JSONB support**: Rich content/metadata storage
- **UUID primary keys**: Already implemented
- **Foreign key constraints**: Referential integrity maintained
- **Row Level Security**: Can replace custom auth middleware

## 🔐 Authentication System Analysis

### Current: LearnHouse JWT System

```typescript
// JWT-based authentication
const JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=8)
const JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=30)

// Session management
interface Session {
  user: UserRead
  roles: UserRoleWithOrg[]
  tokens: {
    access_token: string
    refresh_token: string
  }
}
```

### Target: Clerk Integration

```typescript
// Clerk session structure  
interface ClerkSession {
  user: {
    id: string           // → user_uuid
    emailAddresses: []   // → email
    firstName: string    // → first_name
    lastName: string     // → last_name
    imageUrl: string     // → avatar_image
  }
  orgId?: string        // → org_id lookup
  orgRole?: string      // → role mapping
}
```

**Migration Strategy:**
1. **Replace JWT middleware** with Clerk middleware
2. **Map Clerk user data** to existing user schema
3. **Preserve organization permissions** via Clerk organizations
4. **Maintain API compatibility** - same session interface

## 🎯 Progressive Access Integration

LearnHouse's multi-org architecture is **perfect** for Git-Paywall integration:

### Current Multi-Org Flow
```typescript
// URL structure: {orgslug}.domain.com/course/{courseuuid}
app/orgs/[orgslug]/(withmenu)/courses/[courseuuid]/page.tsx

// Access control per organization
const checkOrgAccess = (user: User, org: Organization) => {
  // Role-based access control
  return user.roles.find(r => r.org.id === org.id)?.role
}
```

### Git-Paywall Enhancement
```typescript
// Enhanced access control
const checkContentAccess = (user: User, course: Course) => {
  const subscription = await getSubscription(user.id)
  const gitProgress = await getGitProgress(user.github_username)
  
  return {
    tier: subscription.tier,           // 'free' | 'pro' | 'premium'
    git_progress: gitProgress.level,   // 0-100 completion
    allowed_courses: calculateAccess(subscription, gitProgress)
  }
}

// Progressive unlock based on Git contributions
const courseAccess = {
  'intro-courses': 'always',
  'intermediate': 'git_progress >= 30', 
  'advanced': 'subscription.tier === "pro"',
  'premium': 'subscription.tier === "premium"'
}
```

## 📦 Content Management System

### Rich Content Support
- **Video players**: YouTube integration + custom video
- **Interactive code**: CodeMirror with syntax highlighting
- **Assessments**: Quizzes, assignments with auto-grading
- **Collaboration**: Real-time document editing
- **SCORM support**: Enterprise learning standards
- **File uploads**: S3-compatible storage

### Content Structure
```typescript
interface Activity {
  activity_type: 'video' | 'text' | 'code' | 'quiz' | 'assignment'
  content: {
    // Video activities
    video_url?: string
    youtube_id?: string
    duration?: number
    
    // Text activities  
    markdown?: string
    html?: string
    
    // Code activities
    language?: string
    code?: string
    solution?: string
    
    // Quiz activities
    questions?: Question[]
    passing_score?: number
  }
}
```

## 🔧 Migration Strategy Summary

### Phase 1: Frontend Extraction (Week 1)
1. **Clone LearnHouse frontend** to `stuffnthings/app/(course-viewer)/`
2. **Remove FastAPI dependencies** - already clean HTTP boundaries
3. **Integrate Tailwind** - compatible design system
4. **Configure static export** - production deployment ready

### Phase 2: Supabase Migration (Week 2)  
1. **Import PostgreSQL schema** - direct migration possible
2. **Set up Row Level Security** - replace custom auth middleware
3. **Configure S3 storage** - existing S3 compatibility
4. **Test data migration** - validate schema compatibility

### Phase 3: Clerk Integration (Week 3)
1. **Replace JWT auth** with Clerk middleware
2. **Map user sessions** to existing schema
3. **Preserve organization flow** - maintain multi-tenancy
4. **Update frontend auth** - Clerk components

### Phase 4: Progressive Access (Week 4)
1. **Implement Git-Paywall logic** - subscription + progress tracking
2. **Course access control** - tier-based content unlocking
3. **Payment integration** - Stripe (existing) or new provider
4. **Testing & deployment** - production rollout

## 🎉 Conclusion

LearnHouse is **exceptionally well-architected** for integration into stuffnthings:

- ✅ **Clean separation** between frontend and backend
- ✅ **PostgreSQL/Supabase native** compatibility
- ✅ **Static export ready** for Vercel deployment  
- ✅ **Rich content system** for course delivery
- ✅ **Multi-org architecture** perfect for progressive access
- ✅ **Modern tech stack** (Next.js 16, Tailwind, TypeScript)

The frontend can be **extracted intact** with minimal modifications, providing a production-ready course delivery system for stuffnthings' Git-Paywall model.

**Estimated Integration Timeline: 3-4 weeks**
**Risk Level: Low** - Clean architecture, proven technology stack
**Maintenance Overhead: Low** - Well-documented, active open source project