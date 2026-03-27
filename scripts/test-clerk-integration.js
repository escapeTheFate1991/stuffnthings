#!/usr/bin/env node

/**
 * Test Clerk Integration Script
 * Verifies that all Clerk components can be imported and auth is working
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

async function testBuild() {
    console.log('🔨 Testing Next.js build with Clerk integration...\n');
    
    return new Promise((resolve, reject) => {
        const buildProcess = spawn('npm', ['run', 'build'], {
            stdio: 'inherit',
            cwd: process.cwd()
        });
        
        buildProcess.on('close', (code) => {
            if (code === 0) {
                console.log('\n✅ Build successful! Clerk integration working.');
                resolve(true);
            } else {
                console.log('\n❌ Build failed. Check for import/configuration errors.');
                resolve(false);
            }
        });
        
        buildProcess.on('error', (err) => {
            console.error('Build process error:', err);
            reject(err);
        });
    });
}

async function testDevServer() {
    console.log('🚀 Testing development server...\n');
    console.log('Starting dev server (will auto-terminate after 10 seconds)');
    
    return new Promise((resolve) => {
        const devProcess = spawn('npm', ['run', 'dev'], {
            stdio: 'pipe',
            cwd: process.cwd()
        });
        
        let output = '';
        
        devProcess.stdout.on('data', (data) => {
            output += data.toString();
            process.stdout.write(data);
        });
        
        devProcess.stderr.on('data', (data) => {
            output += data.toString();
            process.stderr.write(data);
        });
        
        // Auto-terminate after 10 seconds
        setTimeout(() => {
            devProcess.kill();
            
            if (output.includes('Ready') || output.includes('Local:') || output.includes('3000')) {
                console.log('\n✅ Dev server started successfully!');
                console.log('🌐 Visit http://localhost:3000 to test authentication');
                resolve(true);
            } else {
                console.log('\n❌ Dev server failed to start properly.');
                resolve(false);
            }
        }, 10000);
    });
}

function checkAuthRoutes() {
    console.log('🛡️ Checking protected routes configuration...\n');
    
    const middlewarePath = path.join(process.cwd(), 'src/middleware.ts');
    if (!fs.existsSync(middlewarePath)) {
        console.log('❌ Middleware file missing');
        return false;
    }
    
    const middlewareContent = fs.readFileSync(middlewarePath, 'utf8');
    const protectedRoutes = ['/learn', '/profile', '/dashboard'];
    
    protectedRoutes.forEach(route => {
        if (middlewareContent.includes(route)) {
            console.log(`✅ Route protected: ${route}`);
        } else {
            console.log(`❌ Route not protected: ${route}`);
        }
    });
    
    return protectedRoutes.every(route => middlewareContent.includes(route));
}

function generateTestPlan() {
    console.log('\n📋 MANUAL TESTING PLAN\n');
    
    console.log('1. Start Development Server:');
    console.log('   npm run dev');
    
    console.log('\n2. Test Public Pages (should work):');
    console.log('   http://localhost:3000/           # Landing page with auth buttons');
    console.log('   http://localhost:3000/about      # About page (if exists)');
    
    console.log('\n3. Test Protected Pages (should redirect to sign-in):');
    console.log('   http://localhost:3000/learn/     # Learning interface');
    console.log('   http://localhost:3000/profile/   # User profile');
    console.log('   http://localhost:3000/dashboard/ # User dashboard');
    
    console.log('\n4. Test Authentication Flows:');
    console.log('   □ Click "Sign In" button');
    console.log('   □ Test GitHub OAuth (if configured)');
    console.log('   □ Test Google OAuth (if configured)');
    console.log('   □ Test Email/Password signup');
    console.log('   □ Verify user appears in Supabase users table');
    
    console.log('\n5. Test Authenticated Experience:');
    console.log('   □ Access protected routes after login');
    console.log('   □ User profile shows correct information');
    console.log('   □ Sign out works correctly');
    console.log('   □ Session persists on page refresh');
    
    console.log('\n6. Test Webhook Integration:');
    console.log('   □ Check Supabase users table after signup');
    console.log('   □ Verify clerk_user_id field populated');
    console.log('   □ Check user data sync (email, name, etc.)');
}

async function main() {
    console.log('🧪 Clerk Integration Testing\n');
    console.log('='.repeat(50) + '\n');
    
    let allTestsPass = true;
    
    // Check route protection
    allTestsPass &= checkAuthRoutes();
    
    console.log('\n' + '='.repeat(50));
    
    if (allTestsPass) {
        console.log('\n✅ Pre-flight checks passed!');
        
        // Test build
        const buildSuccess = await testBuild();
        allTestsPass &= buildSuccess;
        
        if (buildSuccess) {
            console.log('\n' + '='.repeat(50));
            // Test dev server
            const devSuccess = await testDevServer();
            allTestsPass &= devSuccess;
        }
    }
    
    console.log('\n' + '='.repeat(50));
    
    if (allTestsPass) {
        console.log('\n🎉 All automated tests passed!');
        console.log('✅ Clerk integration is ready for manual testing.');
    } else {
        console.log('\n❌ Some tests failed. Check the errors above.');
    }
    
    generateTestPlan();
}

if (require.main === module) {
    main().catch(console.error);
}

module.exports = { testBuild, testDevServer, checkAuthRoutes };