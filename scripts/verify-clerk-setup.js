#!/usr/bin/env node

/**
 * Clerk Setup Verification Script
 * Verifies environment variables and Clerk configuration
 */

const fs = require('fs');
const path = require('path');

function checkEnvFile() {
    const envPath = path.join(process.cwd(), '.env.local');
    
    if (!fs.existsSync(envPath)) {
        console.error('❌ .env.local file not found');
        return false;
    }

    const envContent = fs.readFileSync(envPath, 'utf8');
    const requiredVars = [
        'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
        'CLERK_SECRET_KEY',
        'CLERK_WEBHOOK_SECRET'
    ];

    const missingVars = [];
    const placeholderVars = [];

    requiredVars.forEach(varName => {
        const regex = new RegExp(`${varName}=(.+)`, 'm');
        const match = envContent.match(regex);
        
        if (!match) {
            missingVars.push(varName);
        } else {
            const value = match[1].trim();
            if (value.includes('your_') || value.includes('whsec_your_') || value.includes('_here')) {
                placeholderVars.push(varName);
            }
        }
    });

    if (missingVars.length > 0) {
        console.error('❌ Missing environment variables:');
        missingVars.forEach(varName => console.error(`   - ${varName}`));
    }

    if (placeholderVars.length > 0) {
        console.warn('⚠️  Placeholder values detected (need real credentials):');
        placeholderVars.forEach(varName => console.warn(`   - ${varName}`));
    }

    if (missingVars.length === 0 && placeholderVars.length === 0) {
        console.log('✅ Environment variables configured correctly');
        return true;
    }

    return placeholderVars.length === 0; // OK if no missing vars, warn about placeholders
}

function checkClerkFiles() {
    const requiredFiles = [
        'src/lib/auth.ts',
        'src/app/api/webhooks/clerk/route.ts',
        'src/middleware.ts',
        'src/components/auth/AuthStatus.tsx',
        'src/components/auth/SocialAuth.tsx'
    ];

    const missingFiles = [];

    requiredFiles.forEach(filePath => {
        if (!fs.existsSync(filePath)) {
            missingFiles.push(filePath);
        }
    });

    if (missingFiles.length > 0) {
        console.error('❌ Missing Clerk integration files:');
        missingFiles.forEach(file => console.error(`   - ${file}`));
        return false;
    }

    console.log('✅ Clerk integration files present');
    return true;
}

function checkPackageJson() {
    const packagePath = path.join(process.cwd(), 'package.json');
    
    if (!fs.existsSync(packagePath)) {
        console.error('❌ package.json not found');
        return false;
    }

    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    const dependencies = packageJson.dependencies || {};

    const requiredPackages = {
        '@clerk/nextjs': '^7.0.0',
        'svix': '^1.0.0'
    };

    const missingPackages = [];

    Object.entries(requiredPackages).forEach(([pkg, minVersion]) => {
        if (!dependencies[pkg]) {
            missingPackages.push(`${pkg}@${minVersion}`);
        }
    });

    if (missingPackages.length > 0) {
        console.error('❌ Missing required packages:');
        missingPackages.forEach(pkg => console.error(`   - ${pkg}`));
        console.log('\nInstall with: npm install ' + missingPackages.join(' '));
        return false;
    }

    console.log('✅ Required packages installed');
    console.log(`   - @clerk/nextjs: ${dependencies['@clerk/nextjs']}`);
    console.log(`   - svix: ${dependencies['svix']}`);
    return true;
}

function checkSupabaseIntegration() {
    const supabasePath = path.join(process.cwd(), 'src/lib/supabase.ts');
    
    if (!fs.existsSync(supabasePath)) {
        console.error('❌ Supabase integration file missing: src/lib/supabase.ts');
        return false;
    }

    console.log('✅ Supabase integration present');
    return true;
}

function generateSetupChecklist() {
    console.log('\n📋 CLERK SETUP CHECKLIST\n');
    
    console.log('1. Create Clerk Application:');
    console.log('   □ Visit https://dashboard.clerk.dev');
    console.log('   □ Create application for "Stuff N Things LMS"');
    console.log('   □ Copy API keys to .env.local');
    
    console.log('\n2. Configure OAuth Providers:');
    console.log('   □ GitHub OAuth app with callback: https://stuffnthings.io/api/auth/callback/github');
    console.log('   □ Google OAuth app with callback: https://stuffnthings.io/api/auth/callback/google');
    console.log('   □ Enable Email/Password authentication');
    
    console.log('\n3. Setup Webhooks:');
    console.log('   □ Create webhook: https://stuffnthings.io/api/webhooks/clerk');
    console.log('   □ Subscribe to: user.created, user.updated');
    console.log('   □ Copy webhook secret to CLERK_WEBHOOK_SECRET');
    
    console.log('\n4. Test Authentication:');
    console.log('   □ npm run dev');
    console.log('   □ Test GitHub OAuth flow');
    console.log('   □ Test Google OAuth flow');
    console.log('   □ Test Email/Password signup');
    console.log('   □ Verify user sync to Supabase');
    
    console.log('\n5. Production Deployment:');
    console.log('   □ Update OAuth callback URLs for production domain');
    console.log('   □ Set production environment variables');
    console.log('   □ Deploy and test live authentication flows');
}

function main() {
    console.log('🔍 Clerk Setup Verification\n');
    
    let allChecksPass = true;
    
    allChecksPass &= checkPackageJson();
    allChecksPass &= checkClerkFiles();
    allChecksPass &= checkSupabaseIntegration();
    allChecksPass &= checkEnvFile();
    
    console.log('\n' + '='.repeat(50));
    
    if (allChecksPass) {
        console.log('✅ All checks passed! Ready for Clerk Dashboard configuration.');
    } else {
        console.log('❌ Some issues found. Please fix the above errors.');
    }
    
    generateSetupChecklist();
}

if (require.main === module) {
    main();
}

module.exports = {
    checkEnvFile,
    checkClerkFiles,
    checkPackageJson,
    checkSupabaseIntegration
};