# Manual Supabase Schema Setup

The automated schema application failed because Supabase doesn't allow direct SQL execution through the API. You need to apply the schema manually through the Supabase dashboard.

## ✅ Current Status

- **Supabase Project**: ✅ Created and configured
- **Environment Variables**: ✅ Set in `.env.local`
- **Schema File**: ✅ Ready at `supabase/migrations/0001_initial_schema.sql`
- **Database Application**: ❌ **NEEDS MANUAL SETUP**

## 🔧 Required Action

### Step 1: Access Supabase Dashboard
1. Go to https://supabase.com/dashboard
2. Log into your account
3. Select project: `jgpkxsuolmhzecrfucdy`

### Step 2: Apply Schema
1. In the dashboard, go to **SQL Editor**
2. Create a new query
3. Copy the entire contents of `supabase/migrations/0001_initial_schema.sql`
4. Paste it into the SQL editor
5. Click **Run** to execute all statements

### Schema File Location
```
/home/eddy/Development/stuffnthings/supabase/migrations/0001_initial_schema.sql
```

### What the Schema Contains
- **12 main tables**: Organizations, Users, Courses, Chapters, Activities, etc.
- **Row Level Security**: Multi-tenant data isolation
- **Progressive Access**: Git-Paywall + subscription tiers
- **Search Optimization**: Full-text search indexes
- **Business Logic**: PostgreSQL functions for access control

## 🔍 Verification Steps

After applying the schema, run the verification:

```bash
cd /home/eddy/Development/stuffnthings
node verify-supabase.js
```

Expected output:
```
✅ Supabase connection successful!
📊 Database is accessible
```

## 📋 Schema Summary

The migration creates these core tables:

1. **organizations** - Multi-tenant organizations
2. **users** - Clerk-integrated user management  
3. **user_organizations** - User-org relationships with roles
4. **courses** - Learning content with progressive access
5. **chapters** - Course structure
6. **activities** - Individual learning activities
7. **user_progress** - Learning progress tracking
8. **user_git_progress** - GitHub activity scoring
9. **subscription_tiers** - Access tier definitions
10. **user_activity_completions** - Activity completion tracking
11. **certificates** - Course completion certificates

## 🔐 Security Features

- **Row Level Security (RLS)** enabled on all tables
- **Multi-tenant isolation** by organization
- **JWT authentication** integration with Clerk
- **Progressive access control** based on subscriptions + Git progress

## 🚀 After Setup

Once the schema is applied:

1. ✅ Database will be ready for LMS functionality
2. ✅ Frontend can connect and query data
3. ✅ User authentication will work with Clerk
4. ✅ Progressive access will be functional
5. ✅ Multi-tenant data isolation will be active

## 🆘 If You Need Help

If the manual setup fails:
1. Copy any error messages from the SQL editor
2. The schema is split into logical sections - you can apply them one at a time
3. Check the Supabase docs for any PostgreSQL version differences

## Alternative: CLI Installation

If you prefer CLI setup:
```bash
npm install -g supabase
supabase login
cd /home/eddy/Development/stuffnthings
supabase db push
```

But manual dashboard setup is more reliable for first-time setup.