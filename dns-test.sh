
#!/bin/bash

echo "=========================================================="
echo "   DNS Troubleshooting for Custom Domain on GitHub Pages"
echo "=========================================================="
echo ""

# Get the custom domain from the CNAME file
DOMAIN=$(cat CNAME)
echo "Testing domain: $DOMAIN"
echo ""

# Check DNS resolution
echo "Checking DNS resolution for $DOMAIN..."
echo "A record resolution:"
DIG_RESULT=$(dig +short $DOMAIN)
echo "$DIG_RESULT"
echo ""

echo "CNAME record resolution for www:"
DIG_WWW=$(dig +short www.$DOMAIN)
echo "$DIG_WWW"
echo ""

# Check GitHub Pages IPs
echo "Verifying against GitHub Pages IP addresses:"
GITHUB_IPS=("185.199.108.153" "185.199.109.153" "185.199.110.153" "185.199.111.153")
DOMAIN_IPS=$(dig +short $DOMAIN)

GITHUB_IP_MATCH=false
for ip in "${GITHUB_IPS[@]}"; do
  if echo "$DOMAIN_IPS" | grep -q "$ip"; then
    echo "✅ Found GitHub Pages IP: $ip"
    GITHUB_IP_MATCH=true
  else
    echo "❌ Missing GitHub Pages IP: $ip"
  fi
done

if [ "$GITHUB_IP_MATCH" = false ]; then
  echo ""
  echo "⚠️ WARNING: Your domain is not pointing to GitHub Pages IPs!"
  echo "This is likely why you're still seeing your old website."
fi
echo ""

# Check for DNS caching
echo "Checking for possible DNS caching issues:"
echo "Default DNS Server result:"
dig $DOMAIN +short
echo ""
echo "Google DNS Server result:"
dig @8.8.8.8 $DOMAIN +short
echo ""
echo "Cloudflare DNS Server result:"
dig @1.1.1.1 $DOMAIN +short
echo ""

# HTTP request test with user agent to avoid caching
echo "Testing HTTP response from $DOMAIN (with cache-busting)..."
CURL_UA="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
curl -I -A "$CURL_UA" "https://$DOMAIN?nocache=$(date +%s)"
echo ""

# Check TXT records for any verification records that might still be set
echo "Checking TXT records (may show domain verification records):"
dig TXT $DOMAIN +short
echo ""

echo "--------------------------------------------------------"
echo "TROUBLESHOOTING RECOMMENDATIONS:"
echo "--------------------------------------------------------"
echo ""
echo "If you're still seeing your old Squarespace site, here's what to do:"
echo ""
echo "1. DOMAIN REGISTRAR SETTINGS:"
echo "   - Log in to your domain registrar (GoDaddy, Namecheap, etc.)"
echo "   - Remove ALL existing A records pointing to your old host"
echo "   - Add these 4 A records pointing to GitHub Pages IPs:"
echo "     * @ → 185.199.108.153"
echo "     * @ → 185.199.109.153"
echo "     * @ → 185.199.110.153"
echo "     * @ → 185.199.111.153"
echo "   - Set a CNAME record: www → $DOMAIN or your-username.github.io"
echo ""
echo "2. SQUARESPACE DISCONNECTION:"
echo "   - Log in to Squarespace"
echo "   - Go to Settings → Domains"
echo "   - Remove or disconnect your domain ($DOMAIN)"
echo "   - This is CRITICAL as Squarespace may still be claiming the domain"
echo ""
echo "3. CLEAR YOUR DNS CACHE:"
echo "   Run these commands based on your OS:"
echo "   - macOS: sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder"
echo "   - Windows: ipconfig /flushdns"
echo "   - Linux: sudo systemd-resolve --flush-caches or sudo resolvectl flush-caches"
echo ""
echo "4. TRY ALTERNATIVE BROWSERS/DEVICES:"
echo "   - Try accessing your site in an incognito/private window"
echo "   - Try from a different browser or mobile device"
echo "   - Try from a different network (mobile data instead of WiFi)"
echo ""
echo "5. WAIT FOR PROPAGATION:"
echo "   - DNS changes can take 24-48 hours to fully propagate"
echo "   - Check again tomorrow if changes don't take effect today"
echo ""
echo "6. VERIFY GITHUB PAGES SETTINGS:"
echo "   - Ensure 'Custom domain' is properly set in your repo settings"
echo "   - Check that CNAME file exists in your repo (it should contain: $DOMAIN)"
echo ""
echo "Run this script again after making any changes to verify improvements."
