# Technology Stack Documentation

## Core Technologies

### Frontend Framework
- **Next.js 14.0.0** - App Router, Static Export
- **React 18** - Functional components, hooks
- **TypeScript 5.0.0** - Type safety, developer experience

### Styling & Design
- **Tailwind CSS 3.3.5** - Utility-first CSS framework
- **@tailwindcss/typography** - Rich content styling
- **Framer Motion 12.36.0** - Smooth animations
- **Inter Font** - Typography system

### Content Management
- **Gray-matter 4.0.3** - YAML frontmatter parsing
- **Remark 15.0.1** - Markdown processing
- **Remark-HTML 16.0.1** - HTML conversion
- **Remark-GFM 4.0.1** - GitHub Flavored Markdown

### Email Integration
- **Resend 6.9.3** - Email delivery service
- **Express.js** - Contact API backend
- **CORS** - Cross-origin resource sharing

### Development Tools
- **ESLint 8.0.0** - Code linting
- **Autoprefixer 10.4.16** - CSS vendor prefixes
- **PostCSS 8.4.31** - CSS processing
- **Canvas 3.2.1** - Server-side canvas rendering

## Architecture Decisions

### Static Export Strategy
The project uses Next.js static export to generate a fully static site:

```javascript
// next.config.js
output: 'export'           // Enable static HTML export
trailingSlash: true        // GitHub Pages URL compatibility
images: { unoptimized: true } // Disable Next.js image optimization
```

**Benefits:**
- Zero server requirements
- CDN-friendly deployment
- Maximum performance
- GitHub Pages compatibility

**Tradeoffs:**
- No server-side rendering
- No API routes (handled by separate Express server)
- Limited dynamic functionality

### Component Architecture
**Pattern:** Functional components with TypeScript

```typescript
interface ComponentProps {
  title: string;
  children: React.ReactNode;
}

export function Component({ title, children }: ComponentProps) {
  return (
    <div className="component">
      <h2>{title}</h2>
      {children}
    </div>
  );
}
```

### Content Strategy
**Markdown-first approach:**
- Blog posts stored as `.md` files
- YAML frontmatter for metadata
- Gray-matter for parsing
- Remark for HTML conversion

```yaml
---
title: "Post Title"
excerpt: "Brief description"
date: "2024-03-26"
author: "Author Name"
image: "/images/post.png"
tag: "Category"
---
```

### State Management
**Approach:** React built-in state management
- `useState` for component state
- `useEffect` for side effects
- Props for data flow
- Context API for global state (when needed for LMS)

### Styling Philosophy
**Utility-first with Tailwind CSS:**
- Mobile-first responsive design
- Dark theme primary
- Consistent spacing system
- Electric blue (#3b82f6) accent color
- Emerald (#10b981) success color

```css
/* Core color palette */
--bg-primary: slate-900
--bg-secondary: slate-950
--accent-blue: #3b82f6
--accent-emerald: #10b981
--text-primary: white
--text-secondary: slate-400
```

### Performance Optimizations
1. **Static Export** - Pre-built HTML files
2. **Code Splitting** - Automatic with Next.js
3. **Image Optimization** - Disabled for static export
4. **CSS Optimization** - Tailwind CSS purging
5. **Bundle Analysis** - Development monitoring

### API Architecture
**Separated API Layer:**
- Express.js server (api/server.js)
- Port 3100 (configurable via ENV)
- CORS enabled for cross-origin requests
- Resend integration for email delivery

```javascript
// API endpoints
GET /health           // Health check
POST /contact         // Contact form submission
```

### Email System
**Resend Integration:**
```javascript
// Email configuration
From: 'Stuff N Things <info@stuffnthings.io>'
To: NOTIFY_EMAIL (environment variable)
Templates: HTML with inline CSS
Auto-reply: Customer confirmation emails
```

## Development Environment

### Required Tools
- **Node.js** - v22.22.0+
- **npm** - Package management
- **Git** - Version control
- **Context7** - Documentation context

### Scripts
```json
{
  "dev": "next dev",           // Development server
  "build": "next build",       // Production build
  "start": "next start",       // Production server
  "lint": "next lint",         // Code linting
  "export": "next build && next export"  // Static export
}
```

### Environment Variables
```env
# Email configuration
RESEND_API_KEY=re_HWVk1EfN_AmTNFXFicUV95eDWyZGX76aD
NOTIFY_EMAIL=info@stuffnthings.io
PORT=3100

# Development
NODE_ENV=development
```

## LMS Integration Considerations

### Technology Additions Needed
1. **Database Layer**
   - PostgreSQL or MongoDB for course data
   - Prisma or Mongoose for ORM
   - Database migrations

2. **Authentication System**
   - NextAuth.js or Auth0
   - JWT token management
   - Role-based access control

3. **Payment Processing**
   - Stripe integration
   - Subscription management
   - Webhook handling

4. **Video Content**
   - Video streaming service (Vimeo, YouTube)
   - Progress tracking
   - Adaptive bitrate streaming

5. **Real-time Features**
   - WebSocket connections
   - Live chat/discussions
   - Real-time progress updates

### Architecture Evolution
**Current:** Static Site Generator
```
Frontend (Static) → API Server → Email Service
```

**Future LMS:** Full-stack Application
```
Frontend (SSR/SSG) ↔ API Layer ↔ Database
                   ↕
            Payment Service
                   ↕
            Video Platform
```

### Migration Strategy
1. **Maintain Static Export Capability** - Keep current performance benefits
2. **Incremental API Integration** - Add dynamic features gradually
3. **Database-Optional Design** - Start with file-based content, migrate to DB
4. **Progressive Enhancement** - Static content + dynamic features

## Code Quality Standards

### TypeScript Configuration
```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  }
}
```

### ESLint Rules
- Next.js recommended configuration
- TypeScript integration
- Accessibility rules (eslint-plugin-jsx-a11y)

### File Organization
```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable React components
├── lib/                # Utility functions, helpers
├── content/            # Markdown content files
└── styles/             # Global CSS styles
```

This tech stack provides a solid foundation for high-performance web applications while supporting the transition to a full-featured Learning Management System.