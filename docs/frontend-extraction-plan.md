# LearnHouse Frontend Extraction Plan

## Executive Summary

The LearnHouse frontend (`apps/web`) can be **extracted intact** into stuffnthings with minimal modifications. The clean API boundaries, standalone build configuration, and modern Next.js architecture make it an ideal candidate for integration.

## 🎯 Extraction Strategy Overview

```
LearnHouse/apps/web  →  stuffnthings/app/(course-platform)/
├── app/             →  app/(course-platform)/
├── components/      →  components/course/
├── services/        →  lib/course-api/
├── styles/          →  styles/ (merge)
└── lib/             →  lib/course-utils/
```

## 📁 Directory Structure Analysis

### Current LearnHouse Structure
```
apps/web/
├── app/                    # Next.js 16 App Router
│   ├── orgs/[orgslug]/    # Multi-org routing
│   ├── auth/              # Authentication flows
│   ├── api/               # API proxy routes
│   ├── admin/             # Admin dashboard
│   └── embed/             # Embeddable widgets
├── components/            # React components
│   ├── Contexts/          # Auth, Session, I18n
│   ├── StyledElements/    # UI primitives
│   ├── Objects/           # Course components
│   └── Pages/             # Page layouts
├── services/              # API abstraction
│   ├── config/            # Environment config
│   ├── courses/           # Course API calls
│   └── auth/              # Auth API calls
├── lib/                   # Utilities
│   ├── i18n/              # Internationalization  
│   └── utils/             # Helper functions
└── styles/                # Tailwind + globals
```

### Target stuffnthings Integration
```
stuffnthings/
├── app/
│   ├── (course-platform)/       # New: Extracted LearnHouse
│   │   ├── [orgslug]/          # Multi-org support
│   │   ├── courses/            # Course browser
│   │   ├── learn/              # Course player
│   │   └── embed/              # Widget support
│   └── (existing routes)/       # Git repos, auth, etc.
├── components/
│   ├── course/                  # Extracted course components
│   │   ├── player/             # Video/content player
│   │   ├── browser/            # Course catalog
│   │   └── common/             # Shared UI
│   └── (existing)/              # Existing stuffnthings UI
└── lib/
    ├── course-api/              # Extracted API services
    └── (existing)/              # Existing utilities
```

## 🔧 Key Files to Extract

### 1. Core Application Files

```typescript
// Essential app structure
app/orgs/[orgslug]/courses/[courseuuid]/page.tsx          # Course player
app/orgs/[orgslug]/courses/[courseuuid]/chapters/*/page.tsx # Chapter view  
app/orgs/[orgslug]/courses/page.tsx                       # Course catalog
app/orgs/[orgslug]/layout.tsx                             # Org layout
```

### 2. Component Library

```typescript
// Course player components
components/Objects/Course/CoursePage.tsx                  # Main course view
components/Objects/Course/CourseHeader.tsx                # Course header
components/Objects/Course/CourseProgress.tsx              # Progress tracking
components/Objects/Activities/ActivityPlayer.tsx          # Content player
components/Objects/Activities/VideoActivity.tsx           # Video player
components/Objects/Activities/TextActivity.tsx            # Markdown renderer
components/Objects/Activities/CodeActivity.tsx            # Code editor

// Course browser components  
components/Objects/CourseCatalog/CourseGrid.tsx           # Course grid
components/Objects/CourseCatalog/CourseCard.tsx           # Course preview
components/Objects/CourseCatalog/CourseFilter.tsx         # Filtering UI

// Navigation & layout
components/Objects/Navigation/CourseSidebar.tsx           # Chapter navigation
components/Objects/Layout/CourseLayout.tsx               # Course layout
```

### 3. API Services

```typescript
// API abstraction layer
services/courses/courses.ts                              # Course CRUD
services/courses/activities.ts                           # Activity content  
services/courses/progress.ts                             # User progress
services/auth/auth.ts                                    # Authentication
services/config/config.ts                               # Environment config
```

### 4. Configuration Files

```javascript
// Build configuration
next.config.js              # Next.js config → merge with existing
tailwind.config.js           # Tailwind → merge utility classes
package.json                 # Dependencies → merge required packages
```

## 🎨 UI Integration Strategy

### Tailwind Class Compatibility
LearnHouse uses **utility-first** Tailwind classes that are compatible with stuffnthings:

```typescript
// LearnHouse component classes
const courseCardClasses = [
  'bg-white',           // ✅ Compatible
  'border',             // ✅ Compatible  
  'rounded-lg',         // ✅ Compatible
  'shadow-sm',          // ✅ Compatible
  'hover:shadow-md',    // ✅ Compatible
  'transition-shadow'   // ✅ Compatible
]

// stuffnthings can use the same classes or override
const stuffnthingsCardClasses = [
  'bg-gray-50',         // Different background
  'border-gray-200',    // Different border
  'rounded-xl',         // Different radius
  // ... rest compatible
]
```

### Component Namespace Strategy
Use TypeScript namespacing to avoid conflicts:

```typescript
// Namespace LearnHouse components
declare namespace Course {
  export interface PlayerProps {
    courseUuid: string
    chapterUuid?: string
  }
  
  export const Player: React.FC<PlayerProps>
  export const Browser: React.FC<BrowserProps>
  export const Progress: React.FC<ProgressProps>
}

// Usage in stuffnthings
import { Course } from '@/components/course'
<Course.Player courseUuid="..." />
```

## 🔌 API Integration Points

### Backend Replacement Strategy

LearnHouse's clean API abstraction makes backend replacement straightforward:

```typescript
// Current: LearnHouse FastAPI backend
const API_BASE = 'https://api.learnhouse.com/v1'

// Target: Supabase + serverless functions
const API_BASE = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:3000/api/course'  
  : 'https://stuffnthings.com/api/course'

// API service abstraction (NO CHANGES NEEDED)
export const courseAPI = {
  getCourse: (uuid: string) => fetch(`${API_BASE}/courses/${uuid}`),
  getChapters: (courseUuid: string) => fetch(`${API_BASE}/courses/${courseUuid}/chapters`),
  getActivity: (activityUuid: string) => fetch(`${API_BASE}/activities/${activityUuid}`)
}
```

### Serverless API Routes (New Implementation)

```typescript
// app/api/course/courses/[uuid]/route.ts
export async function GET(request: NextRequest, { params }: { params: { uuid: string } }) {
  const course = await supabase
    .from('courses')
    .select('*, chapters(*), activities(*)')
    .eq('course_uuid', params.uuid)
    .single()
    
  return NextResponse.json(course)
}

// app/api/course/progress/[uuid]/route.ts  
export async function PUT(request: NextRequest, { params }: { params: { uuid: string } }) {
  const { userId } = auth()
  const { progress } = await request.json()
  
  await supabase
    .from('user_progress')
    .upsert({ user_id: userId, course_uuid: params.uuid, progress })
    
  return NextResponse.json({ success: true })
}
```

## 🔐 Authentication Integration

### Current: LearnHouse Custom JWT

```typescript
// services/auth/auth.ts (LearnHouse)
export const useAuth = () => {
  const [session, setSession] = useState<Session | null>(null)
  
  return {
    user: session?.user,
    roles: session?.roles,
    signIn: (email, password) => { /* JWT login */ },
    signOut: () => { /* Clear JWT */ }
  }
}
```

### Target: Clerk Integration

```typescript
// lib/course-auth/clerk-adapter.ts (New)
export const useCourseAuth = () => {
  const { user, isSignedIn } = useUser()
  const { organization } = useOrganization()
  
  // Map Clerk session to LearnHouse format
  const session = isSignedIn ? {
    user: {
      id: user.id,
      user_uuid: user.id,
      email: user.primaryEmailAddress?.emailAddress,
      first_name: user.firstName,
      last_name: user.lastName,
      avatar_image: user.imageUrl
    },
    roles: organization ? [{
      role: { name: 'member' },
      org: { org_uuid: organization.id, slug: organization.slug }
    }] : []
  } : null
  
  return {
    user: session?.user,
    roles: session?.roles,
    // Preserve LearnHouse API compatibility
    signIn: () => redirectToSignIn(),
    signOut: () => signOut()
  }
}
```

## 📱 Static Export Configuration

### Current Next.js Config (Compatible)

```javascript
// apps/web/next.config.js (LearnHouse)
const nextConfig = {
  output: 'standalone',           // ✅ Static export ready
  reactStrictMode: false,         // ✅ Compatible
  images: {
    remotePatterns: [{            // ✅ External images supported
      protocol: 'https',
      hostname: '**'
    }]
  },
  experimental: {
    optimizePackageImports: [     // ✅ Bundle optimization
      '@phosphor-icons/react',
      'lucide-react'
    ]
  }
}
```

### Enhanced stuffnthings Config

```javascript
// next.config.js (stuffnthings enhanced)
const nextConfig = {
  // Existing stuffnthings config
  ...existingConfig,
  
  // Merged LearnHouse optimizations
  experimental: {
    ...existingConfig.experimental,
    optimizePackageImports: [
      ...existingConfig.experimental?.optimizePackageImports || [],
      // LearnHouse dependencies
      '@phosphor-icons/react',
      '@radix-ui/react-icons', 
      'lucide-react',
      '@tiptap/react'
    ]
  },
  
  // Course platform API proxy
  async rewrites() {
    return [
      ...existingConfig.rewrites?.() || [],
      {
        source: '/api/course/:path*',
        destination: '/api/course-platform/:path*'
      }
    ]
  }
}
```

## 📦 Package Dependencies

### Essential Dependencies to Add

```json
{
  "dependencies": {
    // Course content rendering
    "@tiptap/core": "^3.10.1",
    "@tiptap/react": "^3.10.1",
    "@tiptap/starter-kit": "^3.10.1",
    "@tiptap/extension-youtube": "^3.10.1",
    
    // Code highlighting  
    "@uiw/react-codemirror": "^4.25.4",
    "@uiw/codemirror-theme-tokyo-night": "^4.25.4",
    "highlight.js": "^11.11.1",
    
    // Video player
    "react-youtube": "^10.1.0",
    "wavesurfer.js": "^7.12.1",
    
    // Progress tracking
    "recharts": "^3.0.0",
    
    // UI components (if not already present)
    "@radix-ui/react-progress": "^1.1.0",
    "@radix-ui/react-tabs": "^1.1.13",
    "@radix-ui/react-dialog": "^1.1.15"
  }
}
```

### Bundle Size Impact Analysis

| Package | Size | Purpose | Priority |
|---------|------|---------|----------|
| `@tiptap/react` | ~150KB | Rich text editor | High |
| `@uiw/react-codemirror` | ~200KB | Code editor | High |
| `react-youtube` | ~30KB | Video player | High |
| `recharts` | ~400KB | Progress charts | Medium |
| `highlight.js` | ~100KB | Syntax highlighting | Medium |
| `wavesurfer.js` | ~150KB | Audio waveforms | Low |

**Total Addition: ~1MB** (reasonable for course platform features)

## 🚀 Migration Timeline

### Phase 1: Component Extraction (Days 1-3)
- [ ] Extract core course components
- [ ] Set up component namespacing
- [ ] Test component rendering in stuffnthings
- [ ] Resolve style conflicts

### Phase 2: API Integration (Days 4-5)  
- [ ] Create serverless API routes
- [ ] Implement Supabase queries
- [ ] Test API compatibility
- [ ] Add error handling

### Phase 3: Auth Integration (Days 6-7)
- [ ] Create Clerk adapter layer
- [ ] Test authentication flows  
- [ ] Preserve session compatibility
- [ ] Add organization support

### Phase 4: Build & Deploy (Days 8-10)
- [ ] Configure static export
- [ ] Test production builds
- [ ] Optimize bundle sizes
- [ ] Deploy to Vercel

## ⚠️ Potential Challenges & Solutions

### 1. Component Conflicts
**Challenge**: Name collisions with existing stuffnthings components
**Solution**: Use strict TypeScript namespacing and component prefixing

### 2. Style Conflicts  
**Challenge**: Tailwind class conflicts between systems
**Solution**: CSS-in-JS for course components or Tailwind prefix isolation

### 3. Bundle Size
**Challenge**: Large dependencies increasing bundle size
**Solution**: Lazy loading, code splitting, and selective imports

### 4. State Management
**Challenge**: Complex course state (progress, activities, collaboration)
**Solution**: Zustand store for course state, isolated from main app state

## ✅ Success Criteria

1. **✅ Clean Integration**: Course components render without conflicts
2. **✅ API Compatibility**: All course functions work via Supabase
3. **✅ Auth Preservation**: Seamless Clerk integration 
4. **✅ Static Export**: Production-ready builds
5. **✅ Performance**: <1MB additional bundle size
6. **✅ UX Consistency**: Course UI matches stuffnthings design system

## 🎉 Expected Outcome

A **production-ready course platform** integrated into stuffnthings with:

- 📚 **Rich course content** (video, text, code, quizzes)
- 🎯 **Progress tracking** and completion certificates  
- 🤝 **Multi-user support** with organizational access
- 📱 **Responsive design** optimized for all devices
- ⚡ **Fast performance** via static generation
- 🔐 **Secure authentication** via Clerk
- 💾 **Reliable data** via Supabase

**Risk Level: LOW** - Clean architecture, proven components, minimal changes required
**Timeline: 7-10 days** for full integration and testing
**Maintenance: LOW** - Standard Next.js components with clear boundaries