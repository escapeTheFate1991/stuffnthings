#!/bin/bash

# Webhook Placeholder Setup Script
# Creates a temporary webhook secret and sets up ngrok for local testing

echo "🔗 Setting up webhook placeholder for Clerk integration"
echo "=================================================="

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "❌ .env.local file not found"
    exit 1
fi

# Generate a temporary webhook secret if none exists
CURRENT_SECRET=$(grep "CLERK_WEBHOOK_SECRET=" .env.local | cut -d'=' -f2)
if [[ "$CURRENT_SECRET" == *"your_webhook_secret_here"* ]] || [ -z "$CURRENT_SECRET" ]; then
    echo "🔧 Generating temporary webhook secret..."
    
    # Generate a random webhook secret (whsec_ prefix is Svix standard)
    TEMP_SECRET="whsec_$(openssl rand -hex 32)"
    
    # Update .env.local
    sed -i.bak "s/CLERK_WEBHOOK_SECRET=.*/CLERK_WEBHOOK_SECRET=$TEMP_SECRET/" .env.local
    
    echo "✅ Temporary webhook secret generated: ${TEMP_SECRET:0:20}..."
    echo "📝 Updated .env.local with temporary secret"
else
    echo "✅ Webhook secret already configured"
fi

# Check if ngrok is available for local testing
if command -v ngrok &> /dev/null; then
    echo ""
    echo "🌐 ngrok detected - can be used for local webhook testing"
    echo "To test webhooks locally:"
    echo "  1. Run: ngrok http 3000"
    echo "  2. Copy the HTTPS URL (e.g., https://abc123.ngrok.io)"
    echo "  3. In Clerk Dashboard, set webhook URL to: [ngrok-url]/api/webhooks/clerk"
    echo "  4. Start dev server: npm run dev"
    echo ""
else
    echo ""
    echo "💡 Tip: Install ngrok for local webhook testing"
    echo "   npm install -g ngrok"
    echo "   or visit: https://ngrok.com/download"
    echo ""
fi

# Create a webhook test file
cat > test-webhook.json << 'EOF'
{
  "data": {
    "id": "user_test123",
    "email_addresses": [
      {
        "email_address": "test@example.com",
        "verification": {
          "status": "verified"
        }
      }
    ],
    "first_name": "Test",
    "last_name": "User",
    "image_url": "https://images.clerk.dev/default.png",
    "username": "testuser"
  },
  "type": "user.created",
  "object": "event"
}
EOF

echo "📄 Created test-webhook.json for manual webhook testing"

# Create webhook test script
cat > scripts/test-webhook-endpoint.sh << 'EOF'
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
EOF

chmod +x scripts/test-webhook-endpoint.sh

echo "🔧 Created scripts/test-webhook-endpoint.sh for endpoint testing"
echo ""
echo "✅ Webhook placeholder setup complete!"
echo ""
echo "Next steps:"
echo "1. Complete Clerk Dashboard setup with real webhook URL"
echo "2. Replace temporary webhook secret with real secret from Clerk"
echo "3. Test webhook integration with user signup/signin"

# Display current webhook configuration
echo ""
echo "📋 Current webhook configuration:"
echo "   Endpoint: /api/webhooks/clerk"
echo "   Events: user.created, user.updated"
echo "   Secret: ${CURRENT_SECRET:0:20}... (temporary)"
echo "   Handler: src/app/api/webhooks/clerk/route.ts"