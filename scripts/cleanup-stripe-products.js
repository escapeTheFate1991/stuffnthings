#!/usr/bin/env node

/**
 * Cleanup existing stuffnthings products from Stripe
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

async function cleanupProducts() {
  console.log('🧹 Cleaning up existing stuffnthings products...\n');
  
  try {
    // Get all products
    const products = await stripe.products.list({
      limit: 100
    });
    
    const stuffnthingsProducts = products.data.filter(product => 
      product.name.includes('stuffnthings LMS')
    );
    
    console.log(`Found ${stuffnthingsProducts.length} stuffnthings products to delete.\n`);
    
    for (const product of stuffnthingsProducts) {
      console.log(`🗑️  Deleting: ${product.name} (${product.id})`);
      
      // First archive all prices for this product
      const prices = await stripe.prices.list({
        product: product.id,
        limit: 100
      });
      
      for (const price of prices.data) {
        if (price.active) {
          await stripe.prices.update(price.id, { active: false });
          console.log(`   ⚠️  Archived price: ${price.id}`);
        }
      }
      
      // Then archive the product
      await stripe.products.update(product.id, { active: false });
      console.log(`   ✅ Archived product: ${product.id}\n`);
    }
    
    console.log('✨ Cleanup complete! You can now run setup-stripe-products.js again.');
    
  } catch (error) {
    console.error('❌ Error during cleanup:', error.message);
    process.exit(1);
  }
}

if (!envVars.STRIPE_SECRET_KEY) {
  console.error('❌ STRIPE_SECRET_KEY not found in .env file.');
  process.exit(1);
}

cleanupProducts().catch(console.error);