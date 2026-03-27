#!/bin/bash

# =============================================================================
# SUPABASE SETUP SCRIPT FOR STUFFNTHINGS LMS
# =============================================================================

set -e  # Exit on any error

echo "🚀 Setting up Supabase for stuffnthings LMS..."

# Check if running from project root
if [ ! -f "package.json" ] || [ ! -f "next.config.js" ]; then
    echo "❌ Please run this script from the project root directory"
    exit 1
fi

# Install dependencies
echo "📦 Installing Supabase dependencies..."
npm install

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚠️  .env.local not found!"
    echo "📝 Please create a Supabase project and update .env.local with your credentials"
    echo ""
    echo "Steps:"
    echo "1. Go to https://supabase.com/dashboard"
    echo "2. Create a new project"
    echo "3. Go to Settings > API"
    echo "4. Copy your Project URL and anon/public key"
    echo "5. Update .env.local with actual values"
    echo ""
    echo "Current .env.local has placeholder values that need to be replaced."
    exit 1
fi

# Source environment variables
source .env.local

# Check if environment variables are still placeholders
if [[ "$NEXT_PUBLIC_SUPABASE_URL" == "https://your-project.supabase.co" ]]; then
    echo "⚠️  Environment variables still contain placeholder values!"
    echo "Please update .env.local with your actual Supabase project credentials."
    exit 1
fi

echo "✅ Environment variables configured"

# Test database connection
echo "🔍 Testing Supabase connection..."
node -e "
const { createClient } = require('@supabase/supabase-js');
const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
client.from('organizations').select('count').then(result => {
    if (result.error && result.error.code !== 'PGRST116') {
        console.log('❌ Connection failed:', result.error.message);
        process.exit(1);
    }
    console.log('✅ Supabase connection successful');
}).catch(err => {
    console.log('❌ Connection test failed:', err.message);
    process.exit(1);
});
" 2>/dev/null || echo "⚠️  Connection test failed - schema might not be applied yet"

echo ""
echo "📋 Next steps:"
echo "1. Apply the database schema by running the migration in Supabase"
echo "2. Go to your Supabase dashboard > SQL Editor"
echo "3. Copy and paste the content of: supabase/migrations/0001_initial_schema.sql"
echo "4. Click 'Run' to execute the migration"
echo ""
echo "🔧 Or use Supabase CLI:"
echo "   npx supabase init (if not already done)"
echo "   npx supabase db push"
echo ""

# Test build
echo "🏗️  Testing build with Supabase integration..."
if npm run build; then
    echo "✅ Build successful with Supabase integration"
else
    echo "❌ Build failed - check for TypeScript or dependency errors"
    exit 1
fi

echo ""
echo "🎉 Supabase setup complete!"
echo ""
echo "📚 Documentation:"
echo "   - Database schema: supabase/migrations/0001_initial_schema.sql"
echo "   - TypeScript types: src/types/database.ts"
echo "   - Client setup: src/lib/supabase.ts"
echo "   - Database utilities: src/lib/database.ts"
echo ""
echo "🔐 Security:"
echo "   - Row Level Security (RLS) is enabled on all tables"
echo "   - Authentication required for most operations"
echo "   - Multi-tenant organization isolation"
echo ""
echo "🚀 Ready to implement LMS features!"