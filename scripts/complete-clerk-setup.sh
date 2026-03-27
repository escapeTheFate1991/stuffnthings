#!/bin/bash

# Complete Clerk Setup - Final Configuration Script
# Run this after creating Clerk application and OAuth apps

echo "🔧 Complete Clerk Setup - Final Configuration"
echo "==============================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "src" ]; then
    echo "❌ Please run this script from the stuffnthings project root"
    exit 1
fi

echo "This script will help you complete the Clerk setup by updating environment variables."
echo "Make sure you have:"
echo "  ✅ Created Clerk application"
echo "  ✅ Created GitHub OAuth app"  
echo "  ✅ Created Google OAuth app"
echo "  ✅ Set up Clerk webhook"
echo ""

read -p "Do you have all the above ready? (y/n): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Please complete the prerequisite steps first:"
    echo "  📖 See: CLERK_APPLICATION_SETUP.md"
    echo "  📖 See: CLERK_SETUP_STATUS.md"
    exit 1
fi

# Backup current .env.local
cp .env.local .env.local.backup.$(date +%Y%m%d_%H%M%S)
echo "📋 Backed up current .env.local"
echo ""

# Function to update env variable
update_env_var() {
    local var_name=$1
    local description=$2
    local current_value=$(grep "^$var_name=" .env.local | cut -d'=' -f2 | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')
    
    echo "🔑 $description"
    echo "   Current: ${current_value:0:20}..."
    echo ""
    read -p "   Enter new value (or press Enter to keep current): " new_value
    
    if [ ! -z "$new_value" ]; then
        sed -i.tmp "s|^$var_name=.*|$var_name=$new_value|" .env.local
        echo "   ✅ Updated $var_name"
    else
        echo "   ℹ️  Keeping current value"
    fi
    echo ""
}

# Update Clerk API keys
echo "📱 Clerk API Keys"
echo "=================="
update_env_var "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY" "Clerk Publishable Key (from Clerk Dashboard)"
update_env_var "CLERK_SECRET_KEY" "Clerk Secret Key (from Clerk Dashboard)"

# Update webhook secret
echo "🔗 Webhook Configuration"
echo "========================="
update_env_var "CLERK_WEBHOOK_SECRET" "Clerk Webhook Secret (from Clerk Dashboard → Webhooks)"

# Update OAuth credentials (optional)
echo "🔐 OAuth Provider Credentials (optional - leave empty to skip)"
echo "=============================================================="

read -p "Do you want to update GitHub OAuth credentials? (y/n): " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "GitHub OAuth App Configuration:"
    read -p "GitHub Client ID: " github_client_id
    read -p "GitHub Client Secret: " github_client_secret
    
    if [ ! -z "$github_client_id" ] && [ ! -z "$github_client_secret" ]; then
        echo "GITHUB_CLIENT_ID=$github_client_id" >> .env.local
        echo "GITHUB_CLIENT_SECRET=$github_client_secret" >> .env.local
        echo "✅ Added GitHub OAuth credentials"
    fi
    echo ""
fi

read -p "Do you want to update Google OAuth credentials? (y/n): " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "Google OAuth App Configuration:"
    read -p "Google Client ID: " google_client_id
    read -p "Google Client Secret: " google_client_secret
    
    if [ ! -z "$google_client_id" ] && [ ! -z "$google_client_secret" ]; then
        echo "GOOGLE_CLIENT_ID=$google_client_id" >> .env.local  
        echo "GOOGLE_CLIENT_SECRET=$google_client_secret" >> .env.local
        echo "✅ Added Google OAuth credentials"
    fi
    echo ""
fi

# Clean up temp files
rm -f .env.local.tmp

# Verify configuration
echo "🔍 Verifying updated configuration..."
echo ""
node scripts/verify-clerk-setup.js

echo ""
echo "🎯 Next Steps:"
echo "=============="
echo "1. Start development server: npm run dev"
echo "2. Test authentication at: http://localhost:3000"
echo "3. Test protected routes: http://localhost:3000/learn/"
echo "4. Verify user sync in Supabase after signup"
echo "5. Deploy to production when ready"
echo ""

echo "📖 Documentation:"
echo "   Setup Guide: CLERK_APPLICATION_SETUP.md"
echo "   Status Report: CLERK_SETUP_STATUS.md"
echo "   Original Setup: CLERK_SETUP.md"
echo ""

echo "✅ Clerk setup configuration complete!"
echo "🚀 Ready for testing and deployment"