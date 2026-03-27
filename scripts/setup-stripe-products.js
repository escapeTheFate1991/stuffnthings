#!/usr/bin/env node

/**
 * Stripe Product & Price Setup for stuffnthings LMS
 * Creates 4 AI-centric subscription tiers: Spark $99, Synapse $299, Cortex $499, Singularity $799
 * Both monthly and annual pricing (with 29% annual discount)
 */

const Stripe = require('stripe');
const fs = require('fs');
const path = require('path');

// Read environment variables from .env.local file
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};

envContent.split('\n').forEach(line => {
  if (line.trim() && !line.startsWith('#')) {
    const [key, ...valueParts] = line.split('=');
    envVars[key.trim()] = valueParts.join('=').trim();
  }
});

const stripe = new Stripe(envVars.STRIPE_SECRET_KEY);

const TIERS = [
  {
    id: 'spark',
    name: 'Spark',
    description: 'Launch your automation journey with AI fundamentals',
    monthlyPrice: 99,
    annualPrice: 70, // 29% discount
    features: [
      'Access to foundational AI automation courses',
      'Community Discord access',
      'Email support',
      'Starter templates library'
    ]
  },
  {
    id: 'synapse', 
    name: 'Synapse',
    description: 'Connect the dots with advanced AI workflows',
    monthlyPrice: 299,
    annualPrice: 212, // 29% discount
    features: [
      'All Spark features',
      'Advanced AI workflow courses',
      'Priority support',
      'Pro templates & integrations',
      'Monthly office hours'
    ]
  },
  {
    id: 'cortex',
    name: 'Cortex', 
    description: 'Master enterprise-grade AI automation',
    monthlyPrice: 499,
    annualPrice: 354, // 29% discount
    features: [
      'All Synapse features',
      'Enterprise AI masterclasses',
      'Custom workflow consultation',
      'Advanced business integrations',
      'Priority support'
    ]
  },
  {
    id: 'singularity',
    name: 'Singularity',
    description: 'Full-spectrum AI transformation for your business',
    monthlyPrice: 799,
    annualPrice: 567, // 29% discount
    features: [
      'All Cortex features',
      'White-glove AI setup & consulting',
      'Custom enterprise integrations',
      'Dedicated account manager',
      'Priority phone support'
    ]
  }
];

async function createStripeProducts() {
  console.log('🚀 Setting up Stripe products and pricing for stuffnthings LMS AI tiers...\n');
  
  const priceIds = {};
  
  for (const tier of TIERS) {
    try {
      console.log(`📦 Creating ${tier.name} tier...`);
      
      // Create product
      const product = await stripe.products.create({
        name: `stuffnthings LMS - ${tier.name}`,
        description: tier.description,
        metadata: {
          tier: tier.id,
          features: JSON.stringify(tier.features)
        }
      });
      
      console.log(`✅ Product created: ${product.id}`);
      
      // Create monthly price
      const monthlyPrice = await stripe.prices.create({
        product: product.id,
        unit_amount: tier.monthlyPrice * 100, // Convert to cents
        currency: 'usd',
        recurring: {
          interval: 'month'
        },
        metadata: {
          tier: tier.id,
          billing_cycle: 'monthly'
        }
      });
      
      // Create annual price (billed annually)
      const annualTotal = tier.annualPrice * 12;
      const annualPriceObj = await stripe.prices.create({
        product: product.id,
        unit_amount: annualTotal * 100, // Total annual amount in cents
        currency: 'usd',
        recurring: {
          interval: 'year'
        },
        metadata: {
          tier: tier.id,
          billing_cycle: 'annual'
        }
      });
      
      priceIds[tier.id] = {
        monthly: monthlyPrice.id,
        annual: annualPriceObj.id
      };
      
      console.log(`💰 Monthly price: ${monthlyPrice.id} ($${tier.monthlyPrice}/month)`);
      console.log(`💰 Annual price: ${annualPriceObj.id} ($${annualTotal}/year = $${tier.annualPrice}/month)`);
      console.log(`💡 Annual savings: ${Math.round((1 - (annualTotal / (tier.monthlyPrice * 12))) * 100)}%\n`);
      
    } catch (error) {
      console.error(`❌ Error creating ${tier.name} tier:`, error.message);
      process.exit(1);
    }
  }
  
  // Generate environment variables
  console.log('🔧 Environment Variables for .env.local:');
  console.log('# Stripe Price IDs (Generated)');
  console.log(`STRIPE_SPARK_MONTHLY_PRICE_ID=${priceIds.spark.monthly}`);
  console.log(`STRIPE_SPARK_ANNUAL_PRICE_ID=${priceIds.spark.annual}`);
  console.log(`STRIPE_SYNAPSE_MONTHLY_PRICE_ID=${priceIds.synapse.monthly}`);
  console.log(`STRIPE_SYNAPSE_ANNUAL_PRICE_ID=${priceIds.synapse.annual}`);
  console.log(`STRIPE_CORTEX_MONTHLY_PRICE_ID=${priceIds.cortex.monthly}`);
  console.log(`STRIPE_CORTEX_ANNUAL_PRICE_ID=${priceIds.cortex.annual}`);
  console.log(`STRIPE_SINGULARITY_MONTHLY_PRICE_ID=${priceIds.singularity.monthly}`);
  console.log(`STRIPE_SINGULARITY_ANNUAL_PRICE_ID=${priceIds.singularity.annual}`);
  
  // Save price IDs to file for easy reference
  const priceIdsPath = path.join(__dirname, 'stripe-price-ids.json');
  fs.writeFileSync(priceIdsPath, JSON.stringify(priceIds, null, 2));
  console.log(`\n📄 Price IDs saved to: ${priceIdsPath}`);
  
  console.log('\n✨ Stripe setup complete! Add the environment variables above to your .env.local file.');
}

// Check if Stripe API key is available
if (!envVars.STRIPE_SECRET_KEY) {
  console.error('❌ STRIPE_SECRET_KEY not found in .env.local file.');
  console.error('Make sure you have a .env.local file with your Stripe secret key.');
  process.exit(1);
}

createStripeProducts().catch(console.error);