# Supabase Setup for stuffnthings LMS

This directory contains the database schema and configuration for migrating from LearnHouse to a Supabase-powered LMS.

## Quick Setup

1. **Create Supabase Project**
   ```bash
   # Go to https://supabase.com/dashboard
   # Create new project named "stuffnthings-lms"
   ```

2. **Configure Environment**
   ```bash
   # Update .env.local with your actual project details
   NEXT_PUBLIC_SUPABASE_URL=https://[your-project].supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-anon-key]
   SUPABASE_SERVICE_ROLE_KEY=[your-service-key]
   ```

3. **Install Dependencies & Setup**
   ```bash
   npm install
   ./scripts/setup-supabase.sh
   ```

4. **Apply Database Schema**
   - Go to your Supabase dashboard
   - Navigate to SQL Editor
   - Copy and paste `migrations/0001_initial_schema.sql`
   - Execute the migration

## Architecture Overview

### Core Tables

| Table | Purpose | Key Features |
|-------|---------|--------------|
| `organizations` | Multi-tenancy | RLS, full-text search |
| `users` | Authentication | Clerk integration, Git linking |
| `courses` | Learning content | Progressive access, analytics |
| `chapters` & `activities` | Course structure | Flexible content types |
| `user_progress` | Learning tracking | Real-time progress updates |
| `user_git_progress` | Git-Paywall integration | GitHub activity scoring |

### Key Features

#### 🔐 Row Level Security (RLS)
- All tables protected with RLS policies
- Multi-tenant data isolation
- Clerk authentication integration

#### 🎯 Progressive Access Control
```sql
-- Course access based on subscription + Git progress
SELECT check_course_access(user_id, course_id);
```

#### 📊 Real-time Progress Tracking
```sql
-- Automatic progress calculation
SELECT update_course_progress(user_id, course_id, activity_id, completed);
```

#### 🔍 Full-text Search
```sql
-- Optimized course search
SELECT * FROM courses 
WHERE search_vector @@ websearch_to_tsquery('english', 'react tutorial');
```

## Content Types

### Activities Support
- **Video**: YouTube integration, duration tracking
- **Text**: Markdown content, reading time estimation  
- **Code**: Multi-language support, test cases
- **Quiz**: Multiple formats, auto-grading
- **Assignment**: File submissions, rubric grading

### Example Activity Content:
```json
{
  "video": {
    "youtube_id": "dQw4w9WgXcQ",
    "duration": 300,
    "subtitles": "path/to/subtitles.vtt"
  }
}
```

## Git-Paywall Integration

### Progress Calculation
The system automatically calculates user progression based on:
- Commit frequency and consistency
- Repository diversity and complexity
- Algorithm implementation quality
- Project completion rates

### Access Tiers
- **Free**: Basic courses, Git-gated content
- **Pro**: Advanced courses, 10 bonus Git points  
- **Premium**: All content, 25 bonus Git points

## Database Functions

### Access Control
```sql
-- Check if user can access a course
SELECT check_course_access(123, 456);
```

### Progress Updates
```sql
-- Mark activity as completed
SELECT update_course_progress(123, 456, 789, true);
```

## Migration Strategy

### From LearnHouse
1. **Export existing data** to JSON/CSV
2. **Transform user authentication** to Clerk IDs
3. **Map content structure** to new schema
4. **Import via Supabase** client or SQL
5. **Verify RLS policies** with test users

### Data Mapping
```
LearnHouse → Supabase
├── schools → organizations  
├── users → users (+ clerk_user_id)
├── courses → courses (+ access_tier)
├── lessons → activities (+ content JSONB)
└── progress → user_progress (enhanced)
```

## Development Workflow

### Local Development
```bash
# Install Supabase CLI
npm install -g @supabase/cli

# Initialize local project
supabase init

# Start local development
supabase start

# Apply migrations
supabase db push
```

### Schema Changes
1. Create new migration file
2. Test locally with `supabase db reset`
3. Apply to production via dashboard
4. Update TypeScript definitions

## Security Notes

### Environment Variables
- Never commit real credentials to Git
- Use different projects for dev/staging/prod
- Rotate service role keys regularly

### RLS Policies
```sql
-- Example: Users can only see their own progress
CREATE POLICY "Users see own progress" ON user_progress
  FOR ALL USING (user_id = get_current_user_id());
```

### API Security
- Anon key for public operations only
- Service role key for admin operations
- Validate user permissions in application code

## Performance Optimization

### Indexes
All critical queries have optimized indexes:
```sql
-- Course search performance
CREATE INDEX idx_courses_search ON courses USING GIN(search_vector);

-- User progress lookups  
CREATE INDEX idx_user_progress_user ON user_progress(user_id);
```

### Caching Strategy
- Use React Query for client-side caching
- Implement Redis for server-side caching
- Consider read replicas for high traffic

## Monitoring & Analytics

### Built-in Analytics
- Course enrollment tracking
- Completion rate calculation
- User engagement metrics
- Git progress correlation

### Custom Events
```typescript
// Track learning events
await supabase
  .from('user_progress')
  .update({ last_accessed_at: new Date() })
  .eq('user_id', userId)
  .eq('course_id', courseId);
```

## Troubleshooting

### Common Issues

#### Connection Errors
```bash
# Check environment variables
echo $NEXT_PUBLIC_SUPABASE_URL

# Test connection
node -e "console.log(require('@supabase/supabase-js'))"
```

#### RLS Policy Issues
- Verify user authentication flow
- Check policy conditions in SQL
- Test with different user roles

#### Migration Failures
- Check foreign key constraints
- Verify required extensions are enabled
- Review error logs in Supabase dashboard

### Debug Mode
```typescript
// Enable debug logging
const supabase = createClient(url, key, {
  auth: { debug: true }
});
```

## Support

- 📚 [Supabase Documentation](https://supabase.com/docs)
- 🔧 [Migration Scripts](./migrations/)
- 💬 [Project Issues](https://github.com/stuffnthings/issues)