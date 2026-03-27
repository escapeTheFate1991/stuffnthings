#!/bin/bash

# Test webhook endpoint script
echo "🧪 Testing Clerk webhook endpoint..."

# Get webhook secret from .env.local
WEBHOOK_SECRET=$(grep "CLERK_WEBHOOK_SECRET=" .env.local | cut -d'=' -f2)

if [ -z "$WEBHOOK_SECRET" ]; then
    echo "❌ CLERK_WEBHOOK_SECRET not found in .env.local"
    exit 1
fi

echo "Using webhook secret: ${WEBHOOK_SECRET:0:20}..."

# Test webhook endpoint (requires server to be running)
echo "📡 Testing webhook endpoint (make sure dev server is running)..."

curl -X POST http://localhost:3000/api/webhooks/clerk \
  -H "Content-Type: application/json" \
  -H "svix-id: msg_test123" \
  -H "svix-timestamp: $(date +%s)" \
  -H "svix-signature: v1,test-signature" \
  -d @test-webhook.json \
  -w "\nHTTP Status: %{http_code}\n"

echo ""
echo "💡 Note: This test will fail signature verification (expected)"
echo "   Real webhooks from Clerk will have valid signatures"
