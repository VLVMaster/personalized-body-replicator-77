
#!/bin/bash

echo "DNS Troubleshooting for Custom Domain on GitHub Pages"
echo "===================================================="
echo ""

# Get the custom domain from the CNAME file
DOMAIN=$(cat CNAME)
echo "Testing domain: $DOMAIN"
echo ""

# Flush DNS cache (works on macOS, Linux varies by distribution)
echo "Attempting to flush DNS cache..."
if [[ "$OSTYPE" == "darwin"* ]]; then
  sudo dscacheutil -flushcache
  sudo killall -HUP mDNSResponder
  echo "macOS DNS cache flushed"
elif [[ -f /etc/debian_version ]]; then
  sudo systemd-resolve --flush-caches || sudo service network-manager restart
  echo "Debian/Ubuntu DNS cache flushed"
elif [[ -f /etc/redhat-release ]]; then
  sudo systemctl restart NetworkManager
  echo "RHEL/CentOS/Fedora DNS cache flushed"
else
  echo "Could not determine OS type for DNS flush. Please flush DNS manually."
fi
echo ""

# Check DNS resolution
echo "Checking DNS resolution for $DOMAIN..."
echo "A record resolution:"
dig +short $DOMAIN
echo ""
echo "CNAME record resolution for www:"
dig +short www.$DOMAIN
echo ""

# Check GitHub Pages IPs
echo "Verifying apex domain against GitHub Pages IP addresses:"
GITHUB_IPS=("185.199.108.153" "185.199.109.153" "185.199.110.153" "185.199.111.153")
DOMAIN_IPS=$(dig +short $DOMAIN)

for ip in "${GITHUB_IPS[@]}"; do
  if echo "$DOMAIN_IPS" | grep -q "$ip"; then
    echo "✅ Found GitHub Pages IP: $ip"
  else
    echo "❌ Missing GitHub Pages IP: $ip"
  fi
done
echo ""

# Check www subdomain configuration
echo "Verifying www subdomain configuration:"
WWW_DOMAIN_IPS=$(dig +short www.$DOMAIN)
WWW_CNAME=$(dig +short CNAME www.$DOMAIN)

if [[ -z "$WWW_DOMAIN_IPS" && -z "$WWW_CNAME" ]]; then
  echo "❌ No DNS records found for www.$DOMAIN"
  echo "   You need to add a CNAME record pointing www to $DOMAIN or to your GitHub Pages domain"
elif [[ -n "$WWW_CNAME" ]]; then
  echo "✅ Found CNAME record for www.$DOMAIN: $WWW_CNAME"
  if [[ "$WWW_CNAME" == "$DOMAIN" || "$WWW_CNAME" == *"github.io" ]]; then
    echo "   CNAME record is correctly configured"
  else
    echo "❌ CNAME record may be pointing to an incorrect location"
    echo "   Should point to $DOMAIN or your GitHub Pages domain"
  fi
else
  echo "Checking if www subdomain is using A records instead of CNAME:"
  for ip in "${GITHUB_IPS[@]}"; do
    if echo "$WWW_DOMAIN_IPS" | grep -q "$ip"; then
      echo "✅ Found GitHub Pages IP for www: $ip"
    else
      echo "❌ Missing GitHub Pages IP for www: $ip"
    fi
  done
fi
echo ""

# HTTP request test
echo "Testing HTTP response from $DOMAIN..."
curl -I https://$DOMAIN
echo ""
echo "Testing HTTP response from www.$DOMAIN..."
curl -I https://www.$DOMAIN
echo ""

echo "If you're still seeing your old site, you might need to:"
echo "1. Verify DNS settings with your domain registrar:"
echo "   - The apex domain ($DOMAIN) should have A records pointing to GitHub Pages IPs"
echo "   - The www subdomain should have a CNAME record pointing to $DOMAIN or your GitHub Pages URL"
echo "2. Ensure your old site has been completely disconnected from the domain"
echo "3. Wait longer for DNS propagation (can take up to 48 hours)"
echo "4. Check GitHub Pages settings to confirm custom domain configuration"
echo ""
echo "For www subdomain issues specifically:"
echo "1. Add a CNAME record for www pointing to $DOMAIN or your GitHub Pages URL"
echo "2. Make sure your GitHub Pages settings has 'Enforce HTTPS' enabled"
echo "3. Check that both the apex domain and www subdomain are properly configured in DNS"
