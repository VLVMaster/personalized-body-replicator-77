
#!/bin/bash

echo "GitHub Pages Configuration Check"
echo "================================"
echo ""

# Get repository details
REPO_URL=$(git config --get remote.origin.url)
REPO_NAME=$(basename -s .git $REPO_URL)
USER_NAME=$(echo $REPO_URL | sed -n 's/.*github.com[:\/]\([^\/]*\).*/\1/p')

echo "Repository: $USER_NAME/$REPO_NAME"
echo ""

# Check CNAME file
if [ -f "CNAME" ]; then
  DOMAIN=$(cat CNAME)
  echo "✅ CNAME file exists with domain: $DOMAIN"
else
  echo "❌ CNAME file is missing"
  echo "   Create a CNAME file in the root with your domain name"
fi

# Check if CNAME exists in the public directory
if [ -f "public/CNAME" ]; then
  PUBLIC_DOMAIN=$(cat public/CNAME)
  echo "✅ public/CNAME file exists with domain: $PUBLIC_DOMAIN"
else
  echo "❌ public/CNAME file is missing from public directory"
  echo "   This is needed for the build process to include your domain"
fi

# Check if CNAME exists in the dist directory
if [ -f "dist/CNAME" ]; then
  DIST_DOMAIN=$(cat dist/CNAME)
  echo "✅ dist/CNAME file exists with domain: $DIST_DOMAIN"
else
  echo "❌ dist/CNAME file is missing from dist directory"
  echo "   This might be created during build but should be verified"
fi

# Check if GitHub Pages is configured correctly in workflows
if [ -f ".github/workflows/deploy.yml" ]; then
  echo "✅ GitHub Actions workflow file exists"
  echo "Checking workflow configuration..."
  
  # Check for CNAME creation in workflow
  if grep -q "CNAME" .github/workflows/deploy.yml; then
    echo "✅ CNAME creation is included in the workflow"
    grep -A 3 "CNAME" .github/workflows/deploy.yml
  else
    echo "❌ CNAME creation might be missing from the workflow"
  fi
  
  # Check for GitHub Pages deployment
  if grep -q "Deploy to GitHub Pages" .github/workflows/deploy.yml; then
    echo "✅ GitHub Pages deployment is configured"
    grep -A 5 "Deploy to GitHub Pages" .github/workflows/deploy.yml
  else
    echo "❌ GitHub Pages deployment section might be missing"
  fi
else
  echo "❌ GitHub Actions workflow file is missing"
fi

echo ""
echo "DNS VERIFICATION:"
echo "----------------"
echo "Checking if domain points to GitHub Pages IPs..."
GITHUB_IPS=("185.199.108.153" "185.199.109.153" "185.199.110.153" "185.199.111.153")

# Check if CNAME file exists
if [ -f "CNAME" ]; then
  DOMAIN=$(cat CNAME)
  DOMAIN_IPS=$(dig +short $DOMAIN)
  
  # Test if the domain resolves at all
  if [ -z "$DOMAIN_IPS" ]; then
    echo "⚠️ WARNING: Domain $DOMAIN does not resolve to any IP address"
    echo "This could indicate DNS propagation is still in progress, or DNS is misconfigured."
  else
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
      
      # Check for Squarespace IPs
      SQUARESPACE_IPS=("198.185.159." "198.49.23.")
      SQUARESPACE_MATCH=false
      
      for squarespace_prefix in "${SQUARESPACE_IPS[@]}"; do
        if echo "$DOMAIN_IPS" | grep -q "$squarespace_prefix"; then
          echo "❌ DETECTED SQUARESPACE IP PREFIX: $squarespace_prefix"
          SQUARESPACE_MATCH=true
        fi
      done
      
      if [ "$SQUARESPACE_MATCH" = true ]; then
        echo "🚨 Your domain is still pointing to Squarespace!"
        echo "You need to disconnect your domain from Squarespace before GitHub Pages will work."
      fi
    fi
  fi
else
  echo "❓ Can't check DNS settings without a CNAME file"
fi

echo ""
echo "SQUARESPACE DETECTION:"
echo "---------------------"
# Check if the website content appears to be from Squarespace
if [ -f "CNAME" ]; then
  DOMAIN=$(cat CNAME)
  CURL_OUTPUT=$(curl -s -L "https://$DOMAIN" || echo "Failed to fetch")
  
  if echo "$CURL_OUTPUT" | grep -q "Squarespace"; then
    echo "🚨 DETECTED: Your domain appears to be serving a Squarespace site!"
    echo "You need to fully disconnect your domain from Squarespace."
  elif echo "$CURL_OUTPUT" | grep -q "sqs_page"; then
    echo "🚨 DETECTED: Squarespace code found in the served HTML!"
    echo "Your domain is still connected to Squarespace."
  fi
fi

echo ""
echo "TROUBLESHOOTING CHECKLIST:"
echo "------------------------"
echo "1. ☐ Verify your domain registrar settings (A records + CNAME):"
echo "   ✓ All four GitHub Pages IPs must be set as A records:"
echo "     @ → 185.199.108.153"
echo "     @ → 185.199.109.153" 
echo "     @ → 185.199.110.153"
echo "     @ → 185.199.111.153"
echo "   ✓ www CNAME should point to yourusername.github.io"
echo ""
echo "2. ☐ DISCONNECT FROM SQUARESPACE! (CRITICAL STEP)"
echo "   ✓ Log in to Squarespace"
echo "   ✓ Go to Settings → Domains"
echo "   ✓ Select your domain and click 'Disconnect'"
echo "   ✓ Confirm the disconnection"
echo "   ✓ This is ABSOLUTELY ESSENTIAL - Squarespace will override GitHub Pages"
echo ""
echo "3. ☐ Check GitHub repository settings has custom domain configured"
echo "4. ☐ Confirm CNAME file exists in correct locations"
echo "5. ☐ Wait 24-48 hours for DNS propagation"
echo "6. ☐ Clear browser cache and DNS cache (run dns-test.sh script)"
echo "7. ☐ Try accessing site from different network/device"
echo ""
echo "You can force a new deployment by pushing a small change to GitHub."
