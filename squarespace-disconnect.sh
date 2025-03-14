
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

echo "CRITICAL ISSUE DETECTED: SQUARESPACE NAMESERVERS"
echo "------------------------------------------------"
echo "You're using Squarespace's nameservers which means:"
echo "- Squarespace controls ALL DNS settings for your domain"
echo "- GitHub Pages DNS settings cannot take effect"
echo "- Even if you add A records in Squarespace, they may not work correctly"
echo ""
echo "REQUIRED ACTION: CHANGE NAMESERVERS OR USE CUSTOM DNS"
echo "----------------------------------------------------"
echo "You have TWO options:"
echo ""
echo "OPTION 1: USE CUSTOM DNS WITH SQUARESPACE (Easier)"
echo "1. Log in to Squarespace"
echo "2. Go to: Home → Settings → Domains → Your Domain ($DOMAIN)"
echo "3. Under 'Domain Nameservers', select 'Use Custom Nameservers'"
echo "4. When asked about nameservers, choose 'Use the current DNS provider'"
echo "5. This allows you to manage DNS directly in Squarespace without their nameservers"
echo "6. Then proceed to add GitHub Pages DNS records as described below"
echo ""
echo "OPTION 2: CHANGE NAMESERVERS AT DOMAIN REGISTRAR (Advanced)"
echo "If your domain is registered elsewhere, log into your registrar and set"
echo "custom nameservers like Cloudflare (recommended) or your hosting provider."
echo ""

echo "AFTER CHANGING NAMESERVERS OR SWITCHING TO CUSTOM DNS:"
echo "-----------------------------------------------------"
echo "SQUARESPACE DNS CONFIGURATION GUIDE:"
echo "1. LOG IN TO SQUARESPACE"
echo "   Go to: https://account.squarespace.com/"
echo ""
echo "2. NAVIGATE TO DOMAINS SECTION"
echo "   → Find your domain ($DOMAIN) in the list"
echo "   → Click on your domain to access domain settings"
echo ""
echo "3. FIND DNS SETTINGS"
echo "   → Look for 'DNS Settings' or 'Advanced DNS Settings'"
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
echo "NAMESERVER INFORMATION:"
echo "-----------------------------------------------------"
echo "Current nameservers for your domain:"
dig +short NS $DOMAIN
echo ""
echo "If these include 'ns*.squarespace.com', you're using Squarespace nameservers,"
echo "which means Squarespace has full control over your DNS settings."
echo ""
echo "IMPORTANT: You cannot properly point to GitHub Pages while using"
echo "Squarespace nameservers. You MUST either:"
echo "1. Switch to 'Use Custom Nameservers' in Squarespace domain settings, or"
echo "2. Move your domain to another registrar like Cloudflare or Namecheap"
echo "====================================================="
echo ""
echo "For domains registered through Squarespace:"
echo ""
echo "1. Log in to Squarespace: https://account.squarespace.com/"
echo "2. Go to Domains → Your Domain → Domain Nameservers"
echo "3. Select 'Use Custom Nameservers'"
echo "4. When prompted, choose 'Use the current DNS provider'"
echo "5. After that's complete, go to DNS Settings"
echo "6. Add the four GitHub Pages A records listed above"
echo "7. Keep the www CNAME record you already have set up"
echo "8. Remove any existing A records pointing to Squarespace"
echo ""
echo "NEXT STEPS:"
echo "----------"
echo "1. Change nameservers or switch to custom DNS in Squarespace"
echo "2. Configure DNS settings with all four GitHub Pages A records"
echo "3. Wait 24-48 hours for full DNS propagation"
echo "4. Run './dns-test.sh' to verify your DNS configuration again"
