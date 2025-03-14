
#!/bin/bash

echo "====================================================="
echo "   Squarespace Disconnection Guide and DNS Checker"
echo "====================================================="
echo ""

# Get the custom domain from the CNAME file
if [ -f "CNAME" ]; then
  DOMAIN=$(cat CNAME)
  echo "Domain being tested: $DOMAIN"
else
  echo "ERROR: CNAME file not found. Cannot determine domain."
  exit 1
fi
echo ""

echo "SQUARESPACE DISCONNECTION CHECKLIST:"
echo "----------------------------------"
echo "You MUST disconnect your domain from Squarespace before GitHub Pages will work:"
echo ""
echo "1. LOG IN TO SQUARESPACE"
echo "   Go to: https://account.squarespace.com/"
echo ""
echo "2. NAVIGATE TO DOMAINS SETTINGS"
echo "   → Find your website in your account dashboard"
echo "   → Go to Settings → Domains"
echo ""
echo "3. DISCONNECT YOUR DOMAIN"
echo "   → Click on your domain ($DOMAIN)"
echo "   → Select 'Disconnect Domain' (usually at the bottom of the page)"
echo "   → Confirm the disconnection when prompted"
echo "   → Note: You may need to first click on 'Advanced Settings' to find the disconnect option"
echo ""
echo "4. IMPORTANT NOTE: KEEP YOUR DOMAIN REGISTRATION"
echo "   → When disconnecting, choose to KEEP your domain registration if prompted"
echo "   → You still own the domain, you're just removing it from Squarespace hosting"
echo ""
echo "5. AFTER DISCONNECTION, UPDATE DNS RECORDS AT YOUR DOMAIN REGISTRAR"
echo "   → Log in to where your domain is registered (often Squarespace, GoDaddy, Namecheap, etc.)"
echo "   → Find DNS management or DNS settings"
echo "   → Update your DNS records as follows:"
echo ""
echo "   A Records (all four are required):"
echo "     @ → 185.199.108.153"
echo "     @ → 185.199.109.153"
echo "     @ → 185.199.110.153"
echo "     @ → 185.199.111.153"
echo ""
echo "   CNAME Record:"
echo "     www → $DOMAIN or your-username.github.io"
echo ""
echo "6. VERIFY DISCONNECTION BY CHECKING DNS"
echo "   Run this script again after 30-60 minutes"
echo ""

echo "CURRENT DNS STATUS:"
echo "----------------"
# Check for Squarespace connection
CURL_OUTPUT=$(curl -s -L "https://$DOMAIN" || echo "Failed to fetch")

if echo "$CURL_OUTPUT" | grep -q -E "Squarespace|sqs_page"; then
  echo "🚨 Your domain appears to be serving content from Squarespace!"
  echo "This indicates the domain is still connected to Squarespace services."
else
  echo "✅ No obvious Squarespace references found in the HTML response."
fi
echo ""

# Check DNS resolution to see where the domain points
echo "Current A records for $DOMAIN:"
DIG_RESULT=$(dig +short A $DOMAIN)
if [ -z "$DIG_RESULT" ]; then
  echo "❌ No A records found"
else
  echo "$DIG_RESULT"
fi

# Check if pointing to GitHub Pages IPs
GITHUB_IPS=("185.199.108.153" "185.199.109.153" "185.199.110.153" "185.199.111.153")
DOMAIN_IPS=$(dig +short A $DOMAIN)
GITHUB_IP_COUNT=0

for ip in "${GITHUB_IPS[@]}"; do
  if echo "$DOMAIN_IPS" | grep -q "$ip"; then
    GITHUB_IP_COUNT=$((GITHUB_IP_COUNT + 1))
  fi
done

echo ""
if [ "$GITHUB_IP_COUNT" -eq 4 ]; then
  echo "✅ All GitHub Pages IPs are correctly configured"
elif [ "$GITHUB_IP_COUNT" -gt 0 ]; then
  echo "⚠️ Only $GITHUB_IP_COUNT out of 4 GitHub Pages IPs are configured"
else
  echo "❌ No GitHub Pages IPs are configured"
  
  # Check for Squarespace IPs
  if echo "$DOMAIN_IPS" | grep -q -E "198.185.159.|198.49.23."; then
    echo "🚨 DETECTED: Your domain is pointing to Squarespace IPs!"
  fi
fi

echo ""
echo "====================================================="
echo "IF YOUR DOMAIN IS REGISTERED THROUGH SQUARESPACE:"
echo "-----------------------------------------------------"
echo "1. Log in to Squarespace: https://account.squarespace.com/"
echo "2. Go to Domains → Your Domain → DNS Settings"
echo "3. Set the DNS records as mentioned above (may need to remove existing records first)"
echo "4. If you don't see DNS settings, your domain might still be connected to a Squarespace site"
echo ""
echo "IF YOUR DOMAIN IS REGISTERED ELSEWHERE (GoDaddy, Namecheap, etc.):"
echo "-----------------------------------------------------"
echo "1. Log in to your domain registrar"
echo "2. Navigate to DNS management"
echo "3. Update the A and CNAME records as specified above"
echo ""
echo "NEXT STEPS:"
echo "----------"
echo "1. Complete the Squarespace disconnection process outlined above"
echo "2. Wait at least 30-60 minutes after disconnection"
echo "3. Update your DNS records at your domain registrar"
echo "4. Run './dns-test.sh' to verify your DNS configuration"
echo "5. Wait 24-48 hours for full DNS propagation to complete"
echo ""
echo "If you continue to experience issues after following these steps,"
echo "run './github-pages-check.sh' for additional diagnostics."
