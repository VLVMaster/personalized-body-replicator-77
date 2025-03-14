
#!/bin/bash

echo "====================================================="
echo "   Squarespace Disconnection and GitHub Pages Setup Guide"
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

echo "CHECKING DNS STATUS..."
# Check for GitHub Pages IPs
GITHUB_IPS=("185.199.108.153" "185.199.109.153" "185.199.110.153" "185.199.111.153")
DOMAIN_IPS=$(dig +short A $DOMAIN)
GITHUB_IP_COUNT=0

for ip in "${GITHUB_IPS[@]}"; do
  if echo "$DOMAIN_IPS" | grep -q "$ip"; then
    GITHUB_IP_COUNT=$((GITHUB_IP_COUNT + 1))
  fi
done

# Check the www subdomain
WWW_CNAME=$(dig +short CNAME www.$DOMAIN)
echo "Testing www.$DOMAIN CNAME record: $WWW_CNAME"

if [ "$GITHUB_IP_COUNT" -eq 4 ]; then
  echo "✅ GOOD NEWS: All GitHub Pages IPs are correctly configured for the apex domain ($DOMAIN)"
  
  if [ -z "$WWW_CNAME" ]; then
    echo "❌ ERROR: No CNAME record found for www.$DOMAIN"
    echo ""
    echo "To make www.$DOMAIN work, you need to add this CNAME record:"
    echo "  www → $DOMAIN or your-username.github.io"
    echo ""
  elif [[ "$WWW_CNAME" == *"github.io"* ]] || [[ "$WWW_CNAME" == *"$DOMAIN"* ]]; then
    echo "✅ GOOD: www.$DOMAIN has a CNAME record pointing to $WWW_CNAME"
  else
    echo "❌ ERROR: www.$DOMAIN has an incorrect CNAME record pointing to $WWW_CNAME"
    echo "It should point to $DOMAIN or your-username.github.io instead"
  fi
  
  echo ""
  echo "NEXT STEPS FOR HTTPS SETUP:"
  echo "----------------------------"
  echo "1. Your DNS for the apex domain is correctly configured! Now you need to wait for GitHub to"
  echo "   issue an SSL certificate for your domain. This can take up to 24 hours."
  echo ""
  echo "2. Once the certificate is issued, you can enable 'Enforce HTTPS' in"
  echo "   your GitHub Pages settings."
  echo ""
  echo "3. During this waiting period, your site is accessible via HTTP only."
  echo "   This is normal and temporary."
  echo ""
  echo "4. To check if your certificate is ready, go to your repository settings:"
  echo "   → Settings → Pages → Custom domain → Check if 'Enforce HTTPS' is available"
  echo ""
  echo "IMPORTANT: Don't make any DNS changes during this waiting period."
elif [ "$GITHUB_IP_COUNT" -gt 0 ] && [ "$GITHUB_IP_COUNT" -lt 4 ]; then
  echo "⚠️ PARTIAL CONFIGURATION: Only $GITHUB_IP_COUNT out of 4 GitHub Pages IPs are configured"
  echo "For optimal performance and reliability, all 4 IPs should be configured."
  echo ""
  echo "REQUIRED DNS CONFIGURATION:"
  echo "Add all four A records in your DNS settings at Squarespace or your domain registrar:"
  echo "  @ → 185.199.108.153"
  echo "  @ → 185.199.109.153"
  echo "  @ → 185.199.110.153"
  echo "  @ → 185.199.111.153"
else
  # Display the original Squarespace disconnection instructions
  echo "CRITICAL ISSUE DETECTED: MISSING GITHUB PAGES DNS RECORDS"
  echo "------------------------------------------------"
  echo "You need to configure your DNS settings to point to GitHub Pages."
  echo ""
  echo "REQUIRED ACTION: CONFIGURE DNS WITH SQUARESPACE CUSTOM DNS"
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
  echo "5. ADD CNAME RECORD FOR WWW SUBDOMAIN"
  echo "   CNAME Record for www subdomain:"
  echo "     www → $DOMAIN"
  echo "   This will make www.$DOMAIN redirect to $DOMAIN"
  echo ""
  echo "6. VERIFY YOUR CNAME RECORD"
  echo "   Your screenshot shows you already have:"
  echo "   CNAME Record: www → vlvmaster.github.io"
  echo "   This looks correct! Keep this record."
  echo ""
  echo "7. REMOVE ANY SQUARESPACE A RECORDS"
  echo "   Delete any existing A records pointing to Squarespace IPs"
  echo "   (Usually starting with 198.185.159.x or similar)"
fi

echo ""
echo "APEX AND WWW DOMAIN CONFIGURATION GUIDE:"
echo "---------------------------------------"
echo "To make BOTH $DOMAIN and www.$DOMAIN work with GitHub Pages:"
echo ""
echo "1. APEX DOMAIN CONFIGURATION (for $DOMAIN):"
echo "   → Add all four A records pointing to GitHub Pages IPs:"
echo "     @ → 185.199.108.153"
echo "     @ → 185.199.109.153"
echo "     @ → 185.199.110.153"
echo "     @ → 185.199.111.153"
echo ""
echo "2. WWW SUBDOMAIN CONFIGURATION (for www.$DOMAIN):"
echo "   → Add a CNAME record: www → $DOMAIN"
echo "   OR"
echo "   → Add a CNAME record: www → your-username.github.io"
echo ""
echo "3. GITHUB REPOSITORY SETTINGS:"
echo "   → Go to your repository settings"
echo "   → Pages section"
echo "   → Set custom domain to $DOMAIN (without www)"
echo "   → GitHub will automatically redirect www.$DOMAIN to $DOMAIN if DNS is set up correctly"
echo ""
echo "HTTPS CERTIFICATE INFORMATION:"
echo "-----------------------------"
echo "- GitHub Pages automatically issues a Let's Encrypt certificate for your custom domain"
echo "- Certificate issuance can take up to 24 hours after DNS is correctly configured"
echo "- You'll be able to enable 'Enforce HTTPS' once the certificate is ready"
echo "- During the waiting period, your site will be accessible via HTTP only"
echo ""
echo "THINGS TO CHECK IF YOUR SITE ISN'T WORKING:"
echo "------------------------------------------"
echo "1. Confirm your CNAME file contains the correct domain"
echo "2. Verify all four GitHub Pages IP addresses are configured in DNS"
echo "3. Make sure your GitHub repository has the custom domain configured in settings"
echo "4. Clear your browser cache or try accessing the site in an incognito window"
echo "5. Remember that DNS changes and certificate issuance can take time to propagate"
echo ""
echo "Run './dns-test.sh' to perform a more detailed DNS diagnostic"
