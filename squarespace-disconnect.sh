
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

echo "SQUARESPACE DNS CONFIGURATION GUIDE:"
echo "----------------------------------"
echo "Based on your screenshot, you've already set up the www CNAME record correctly,"
echo "but you still need to configure the A records for your apex domain:"
echo ""
echo "1. LOG IN TO SQUARESPACE"
echo "   Go to: https://account.squarespace.com/"
echo ""
echo "2. NAVIGATE TO DOMAINS SECTION"
echo "   → Find your domain ($DOMAIN) in the list"
echo "   → Click on your domain to access domain settings"
echo ""
echo "3. FIND DNS SETTINGS"
echo "   → Look for 'DNS Settings' or 'Advanced DNS Settings'"
echo "   → Note: If you don't see DNS settings, your domain might still be connected"
echo "     to a Squarespace site and you need to disconnect it first"
echo ""
echo "4. ADD A RECORDS FOR GITHUB PAGES"
echo "   You must add ALL FOUR of these A records:"
echo ""
echo "   A Records (all four are required):"
echo "     @ → 185.199.108.153"
echo "     @ → 185.199.109.153"
echo "     @ → 185.199.110.153"
echo "     @ → 185.199.111.153"
echo ""
echo "5. VERIFY YOUR CNAME RECORD"
echo "   Your screenshot shows you already have:"
echo "   CNAME Record: www → vlvmaster.github.io"
echo "   This looks correct! Keep this record."
echo ""
echo "6. REMOVE ANY SQUARESPACE A RECORDS"
echo "   Delete any existing A records pointing to Squarespace IPs"
echo "   (Usually starting with 198.185.159.x or similar)"
echo ""
echo "7. WAIT FOR DNS PROPAGATION"
echo "   DNS changes can take 30 minutes to 48 hours to fully propagate"
echo "   Run this script again after waiting to check status"
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
echo "SQUARESPACE DOMAIN MANAGEMENT GUIDE:"
echo "-----------------------------------------------------"
echo "For domains registered through Squarespace:"
echo ""
echo "1. Log in to Squarespace: https://account.squarespace.com/"
echo "2. Go to Domains → Your Domain → DNS Settings"
echo "3. Add the four GitHub Pages A records listed above"
echo "4. Keep the www CNAME record you already have set up"
echo "5. Remove any existing A records pointing to Squarespace"
echo ""
echo "If you don't see DNS settings, check if your domain is connected to a site:"
echo "1. Go to Domains → Your Domain"
echo "2. If it shows as connected to a site, look for 'Disconnect Domain'"
echo "3. After disconnecting, you should be able to access DNS settings"
echo ""
echo "IMPORTANT: When you disconnect a domain from a site, make sure to keep"
echo "your domain registration if prompted. You're just removing the connection"
echo "to Squarespace hosting, not giving up ownership of your domain."
echo ""
echo "NEXT STEPS:"
echo "----------"
echo "1. Check if your domain is connected to a Squarespace site"
echo "2. If connected, disconnect it (keep your domain registration)"
echo "3. Configure DNS settings with all four GitHub Pages A records"
echo "4. Wait 24-48 hours for full DNS propagation"
echo "5. Run './dns-test.sh' to verify your DNS configuration again"
