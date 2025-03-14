
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
echo "Verifying against GitHub Pages IP addresses:"
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

# HTTP request test
echo "Testing HTTP response from $DOMAIN..."
curl -I https://$DOMAIN
echo ""
echo "Testing HTTP response from www.$DOMAIN..."
curl -I https://www.$DOMAIN
echo ""

echo "If you're still seeing your old site, you might need to:"
echo "1. Verify DNS settings with your domain registrar"
echo "2. Ensure your old Squarespace site has been disconnected from the domain"
echo "3. Wait longer for DNS propagation (can take up to 48 hours)"
echo "4. Check GitHub Pages settings to confirm custom domain configuration"
