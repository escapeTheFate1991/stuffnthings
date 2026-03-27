#!/usr/bin/env node

/**
 * GitHub Repository Setup Script
 * Creates the required repositories in the stuffnthingsio organization
 */

const { GitHubClient } = require('../src/lib/github')
require('dotenv').config({ path: '.env.local' })

async function setupGitHubRepositories() {
  console.log('🚀 Setting up GitHub repository structure for stuffnthingsio...')
  
  try {
    if (!process.env.GITHUB_TOKEN) {
      throw new Error('GITHUB_TOKEN environment variable is required')
    }

    const githubClient = new GitHubClient(process.env.GITHUB_TOKEN)
    await githubClient.setupRepositoryStructure()
    
    console.log('✅ GitHub repository structure setup complete!')
    console.log('\nNext steps:')
    console.log('1. Configure GitHub App in stuffnthingsio organization')
    console.log('2. Set up webhook endpoints in GitHub App settings')
    console.log('3. Configure environment variables for GitHub App')
    console.log('4. Test repository access management')
    
  } catch (error) {
    console.error('❌ Error setting up GitHub repositories:', error.message)
    process.exit(1)
  }
}

if (require.main === module) {
  setupGitHubRepositories()
}

module.exports = { setupGitHubRepositories }