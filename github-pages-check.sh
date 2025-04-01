
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
fi

# Check if CNAME exists in the public directory
if [ -f "public/CNAME" ]; then
  PUBLIC_DOMAIN=$(cat public/CNAME)
  echo "✅ public/CNAME file exists with domain: $PUBLIC_DOMAIN"
else
  echo "❌ public/CNAME file is missing from public directory"
fi

# Check if GitHub Pages is configured correctly in workflows
if [ -f ".github/workflows/deploy.yml" ]; then
  echo "✅ GitHub Actions workflow file exists"
  echo "Checking workflow configuration..."
  
  if grep -q "CNAME" .github/workflows/deploy.yml; then
    echo "✅ Workflow includes CNAME generation"
    
    # Check if www subdomain is handled
    if grep -q "www" .github/workflows/deploy.yml; then
      echo "✅ Workflow appears to handle www subdomain"
    else
      echo "⚠️ Workflow might not explicitly handle www subdomain"
    fi
  else
    echo "❌ Workflow does not appear to generate a CNAME file"
  fi
else
  echo "❌ GitHub Actions workflow file is missing"
fi

echo ""
echo "DNS Configuration Check"
echo "======================"
echo ""

# Check apex domain DNS configuration
if [ -f "CNAME" ]; then
  DOMAIN=$(cat CNAME)
  echo "Checking A records for $DOMAIN..."
  dig +short $DOMAIN
  
  echo "Checking CNAME record for www.$DOMAIN..."
  dig +short CNAME www.$DOMAIN
fi

echo ""
echo "To troubleshoot:"
echo "1. Check that GitHub Pages is enabled in your repository settings"
echo "2. Make sure your custom domain is configured in your repository settings"
echo "3. Verify the workflow ran successfully (check Actions tab on GitHub)"
echo "4. Check your DNS configuration with your domain registrar:"
echo "   - The apex domain should have A records pointing to GitHub Pages IPs:"
echo "     185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153"
echo "   - The www subdomain should have a CNAME record pointing to $DOMAIN or your GitHub Pages URL"
echo "5. Remember that it can take up to 24 hours for DNS changes to fully propagate"
echo "6. Try clearing your browser cache or using a private browsing window"
echo ""
echo "You can also try forcing a new deployment by making a small change and pushing it to GitHub."

