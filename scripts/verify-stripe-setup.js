#!/usr/bin/env node

/**
 * Verify Stripe Setup for stuffnthings LMS
 * Checks that all price IDs are correctly configured and accessible
 */

const Stripe = require('stripe');
const fs = require('fs');
const path = require('path');

// Read environment variables from .env file
const envPath = path.join(__dirname, '..', '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};

envContent.split('\n').forEach(line => {
  if (line.trim() && !line.startsWith('#')) {
    const [key, ...valueParts] = line.split('=');
    envVars[key.trim()] = valueParts.join('=').trim();
  }
});

const stripe = new Stripe(envVars.STRIPE_SECRET_KEY);

const EXPECTED_PRICE_IDS = {
  basic: {
    monthly: envVars.STRIPE_BASIC_MONTHLY_PRICE_ID,
    annual: envVars.STRIPE_BASIC_ANNUAL_PRICE_ID
  },
  pro: {
    monthly: envVars.STRIPE_PRO_MONTHLY_PRICE_ID,
    annual: envVars.STRIPE_PRO_ANNUAL_PRICE_ID
  },
  premium: {
    monthly: envVars.STRIPE_PREMIUM_MONTHLY_PRICE_ID,
    annual: envVars.STRIPE_PREMIUM_ANNUAL_PRICE_ID
  },
  enterprise: {
    monthly: envVars.STRIPE_ENTERPRISE_MONTHLY_PRICE_ID,
    annual: envVars.STRIPE_ENTERPRISE_ANNUAL_PRICE_ID
  }
};

async function verifyStripeSetup() {
  console.log('🔍 Verifying Stripe Setup for stuffnthings LMS...\n');
  
  let allValid = true;
  
  for (const [tierName, prices] of Object.entries(EXPECTED_PRICE_IDS)) {
    console.log(`📋 Checking ${tierName.toUpperCase()} tier:`);
    
    for (const [cycle, priceId] of Object.entries(prices)) {
      try {
        if (!priceId) {
          console.log(`  ❌ ${cycle}: Missing price ID`);
          allValid = false;
          continue;
        }
        
        const price = await stripe.prices.retrieve(priceId);
        const product = await stripe.products.retrieve(price.product);
        
        console.log(`  ✅ ${cycle}: ${priceId}`);
        console.log(`     Product: ${product.name}`);
        console.log(`     Amount: $${(price.unit_amount / 100).toFixed(2)}${price.recurring?.interval === 'year' ? '/year' : '/month'}`);
        console.log(`     Active: ${price.active ? 'Yes' : 'No'}`);
        
        if (!price.active) {
          console.log(`     ⚠️  Warning: Price is not active!`);
        }
        
      } catch (error) {
        console.log(`  ❌ ${cycle}: Error - ${error.message}`);
        allValid = false;
      }
    }
    console.log('');
  }
  
  // Check webhook configuration
  console.log('🔗 Webhook Configuration:');
  const webhookSecret = envVars.STRIPE_WEBHOOK_SECRET;
  if (webhookSecret && !webhookSecret.includes('placeholder')) {
    console.log('  ✅ Webhook secret configured');
  } else {
    console.log('  ⚠️  Webhook secret is placeholder - update after creating webhook endpoint in Stripe Dashboard');
  }
  
  // List existing webhooks
  try {
    const webhooks = await stripe.webhookEndpoints.list();
    console.log(`  📡 Active webhooks: ${webhooks.data.length}`);
    
    const stuffnthingsWebhooks = webhooks.data.filter(w => 
      w.url.includes('stuffnthings.io') || w.url.includes('localhost')
    );
    
    if (stuffnthingsWebhooks.length > 0) {
      stuffnthingsWebhooks.forEach(webhook => {
        console.log(`     - ${webhook.url} (${webhook.status})`);
      });
    } else {
      console.log('     ⚠️  No stuffnthings webhooks found - create one in Stripe Dashboard');
    }
  } catch (error) {
    console.log(`  ❌ Error checking webhooks: ${error.message}`);
  }
  
  console.log('\n' + '='.repeat(50));
  
  if (allValid) {
    console.log('✨ All Stripe price IDs are valid and configured correctly!');
    console.log('\n📋 Next Steps:');
    console.log('1. Create webhook endpoint in Stripe Dashboard if not exists');
    console.log('2. Update STRIPE_WEBHOOK_SECRET in .env with actual webhook secret');
    console.log('3. Test subscription flow end-to-end');
    console.log('4. Update frontend pricing UI if needed');
  } else {
    console.log('❌ Some issues found. Please check the errors above.');
  }
}

if (!envVars.STRIPE_SECRET_KEY) {
  console.error('❌ STRIPE_SECRET_KEY not found in .env file.');
  process.exit(1);
}

verifyStripeSetup().catch(console.error);