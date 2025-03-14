
#!/bin/bash

echo "=========================================================="
echo "   DNS Troubleshooting for Custom Domain on GitHub Pages"
echo "=========================================================="
echo ""

# Get the custom domain from the CNAME file
if [ -f "CNAME" ]; then
  DOMAIN=$(cat CNAME)
  echo "Testing domain: $DOMAIN"
else
  echo "ERROR: CNAME file not found. Cannot determine domain."
  exit 1
fi
echo ""

# Check for Squarespace DNS records
echo "SQUARESPACE CONNECTION TEST:"
echo "---------------------------"
# Try to detect if the domain is connected to Squarespace
CURL_OUTPUT=$(curl -s -L "https://$DOMAIN" || echo "Failed to fetch")

if echo "$CURL_OUTPUT" | grep -q "Squarespace"; then
  echo "🚨 CRITICAL ISSUE: Your domain is still connected to Squarespace!"
  echo "The HTML returned contains Squarespace references."
  echo ""
  echo "REQUIRED ACTION: You must disconnect your domain from Squarespace:"
  echo "1. Log in to Squarespace"
  echo "2. Go to Settings → Domains"
  echo "3. Find your domain and click 'Disconnect'"
  echo "4. Confirm the disconnection"
  echo "5. Wait for DNS changes to propagate (up to 48 hours)"
  echo ""
elif echo "$CURL_OUTPUT" | grep -q "sqs_page"; then
  echo "🚨 CRITICAL ISSUE: Squarespace code detected in the served HTML!"
  echo "Your domain is still connected to Squarespace services."
  echo ""
else
  echo "✅ No obvious Squarespace references found in the HTML response."
fi
echo ""

# Check DNS resolution
echo "DNS RESOLUTION TESTS:"
echo "-------------------"
echo "A record resolution for $DOMAIN:"
DIG_RESULT=$(dig +short A $DOMAIN)
if [ -z "$DIG_RESULT" ]; then
  echo "❌ No A records found for $DOMAIN"
else
  echo "$DIG_RESULT"
fi
echo ""

echo "CNAME record resolution for www.$DOMAIN:"
DIG_WWW=$(dig +short CNAME www.$DOMAIN)
if [ -z "$DIG_WWW" ]; then
  echo "❌ No CNAME record found for www.$DOMAIN"
else
  echo "$DIG_WWW"
fi
echo ""

# Check for TXT records that might indicate domain verification
echo "TXT records that might indicate domain ownership:"
DIG_TXT=$(dig +short TXT $DOMAIN)
if [ -z "$DIG_TXT" ]; then
  echo "No TXT records found."
else
  echo "$DIG_TXT"
fi
echo ""

# Check GitHub Pages IPs
echo "GITHUB PAGES IP VERIFICATION:"
echo "---------------------------"
GITHUB_IPS=("185.199.108.153" "185.199.109.153" "185.199.110.153" "185.199.111.153")
DOMAIN_IPS=$(dig +short A $DOMAIN)

if [ -z "$DOMAIN_IPS" ]; then
  echo "❌ No IP addresses resolved for $DOMAIN"
else
  GITHUB_IP_MATCH=false
  GITHUB_IP_COUNT=0
  for ip in "${GITHUB_IPS[@]}"; do
    if echo "$DOMAIN_IPS" | grep -q "$ip"; then
      echo "✅ Found GitHub Pages IP: $ip"
      GITHUB_IP_MATCH=true
      GITHUB_IP_COUNT=$((GITHUB_IP_COUNT + 1))
    else
      echo "❌ Missing GitHub Pages IP: $ip"
    fi
  done

  if [ "$GITHUB_IP_MATCH" = false ]; then
    echo ""
    echo "🚨 CRITICAL ISSUE: Your domain is not pointing to ANY GitHub Pages IPs!"
    
    # Check for Squarespace IPs
    SQUARESPACE_IPS=("198.185.159." "198.49.23.")
    SQUARESPACE_MATCH=false
    
    for squarespace_prefix in "${SQUARESPACE_IPS[@]}"; do
      if echo "$DOMAIN_IPS" | grep -q "$squarespace_prefix"; then
        echo "🚨 DETECTED SQUARESPACE IP PREFIX: $squarespace_prefix"
        SQUARESPACE_MATCH=true
      fi
    done
    
    if [ "$SQUARESPACE_MATCH" = true ]; then
      echo "🚨 Your domain is pointing to Squarespace IPs instead of GitHub Pages!"
      echo "This explains why you're still seeing your Squarespace site."
    else
      echo "Your domain is pointing to unknown IPs: $DOMAIN_IPS"
    fi
  elif [ "$GITHUB_IP_COUNT" -lt 4 ]; then
    echo ""
    echo "⚠️ WARNING: Only $GITHUB_IP_COUNT out of 4 GitHub Pages IPs are configured."
    echo "For optimal performance and reliability, all 4 IPs should be configured."
  else
    echo ""
    echo "✅ All GitHub Pages IPs are correctly configured!"
  fi
fi
echo ""

# Check for DNS caching
echo "CHECKING DIFFERENT DNS SERVERS (for caching issues):"
echo "-------------------------------------------------"
echo "Default DNS Server result:"
dig $DOMAIN +short A
echo ""

echo "Google DNS Server result:"
dig @8.8.8.8 $DOMAIN +short A
echo ""

echo "Cloudflare DNS Server result:"
dig @1.1.1.1 $DOMAIN +short A
echo ""

# HTTP request test
echo "TESTING HTTP RESPONSE:"
echo "--------------------"
echo "HTTP status code and headers from $DOMAIN:"
CURL_UA="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
curl -I -A "$CURL_UA" -L "https://$DOMAIN?nocache=$(date +%s)" | head -15
echo ""

echo "=========================================================="
echo "SUMMARY AND RECOMMENDATIONS:"
echo "=========================================================="
echo ""

# Check if domain is pointing to all GitHub Pages IPs
DOMAIN_IPS=$(dig +short A $DOMAIN)
GITHUB_IP_COUNT=0
for ip in "${GITHUB_IPS[@]}"; do
  if echo "$DOMAIN_IPS" | grep -q "$ip"; then
    GITHUB_IP_COUNT=$((GITHUB_IP_COUNT + 1))
  fi
done

# Check if domain has Squarespace content
if echo "$CURL_OUTPUT" | grep -q -E "Squarespace|sqs_page"; then
  HAS_SQUARESPACE=true
else
  HAS_SQUARESPACE=false
fi

# Provide a summary based on findings
if [ "$GITHUB_IP_COUNT" -eq 4 ] && [ "$HAS_SQUARESPACE" = false ]; then
  echo "✅ GOOD NEWS: DNS appears to be correctly configured for GitHub Pages!"
  echo "If you're still having issues, it might be due to caching or propagation delay."
  echo "Try accessing the site in an incognito window or from a different network."
elif [ "$GITHUB_IP_COUNT" -eq 0 ] && [ "$HAS_SQUARESPACE" = true ]; then
  echo "🚨 CRITICAL ISSUE: Your domain is still fully connected to Squarespace."
  echo "You MUST disconnect your domain from Squarespace before GitHub Pages will work."
  echo ""
  echo "SQUARESPACE DISCONNECTION STEPS:"
  echo "1. Log in to Squarespace"
  echo "2. Go to Settings → Domains"
  echo "3. Find your domain and click 'Disconnect'"
  echo "4. Confirm the disconnection"
  echo "5. After disconnection, update your DNS records at your domain registrar"
  echo "   to point to GitHub Pages IPs (see below)"
elif [ "$GITHUB_IP_COUNT" -gt 0 ] && [ "$GITHUB_IP_COUNT" -lt 4 ]; then
  echo "⚠️ PARTIAL CONFIGURATION: Some GitHub Pages IPs are configured, but not all."
  echo "You should add all four GitHub Pages IP addresses for best performance and reliability."
elif [ "$GITHUB_IP_COUNT" -eq 0 ] && [ "$HAS_SQUARESPACE" = false ]; then
  echo "🚨 INCORRECT CONFIGURATION: Your domain is not pointing to GitHub Pages IPs."
  echo "You need to update your DNS settings at your domain registrar."
else
  echo "⚠️ MIXED CONFIGURATION: Your DNS appears to be partially configured."
  echo "Some settings may be correct, but additional issues were detected."
fi

echo ""
echo "REQUIRED DNS CONFIGURATION FOR GITHUB PAGES:"
echo "-------------------------------------------"
echo "At your domain registrar (not Squarespace), ensure these DNS records exist:"
echo ""
echo "A Records (all four are required):"
echo "  @ → 185.199.108.153"
echo "  @ → 185.199.109.153"
echo "  @ → 185.199.110.153"
echo "  @ → 185.199.111.153"
echo ""
echo "CNAME Record:"
echo "  www → $DOMAIN or your-username.github.io"
echo ""
echo "After making these changes, wait 24-48 hours for full DNS propagation."
echo "Run this script again to check if changes have taken effect."
