
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
  cat .github/workflows/deploy.yml | grep -A 3 "Deploy to GitHub Pages"
  cat .github/workflows/deploy.yml | grep -A 3 "Create CNAME"
else
  echo "❌ GitHub Actions workflow file is missing"
fi

echo ""
echo "To troubleshoot:"
echo "1. Check that GitHub Pages is enabled in your repository settings"
echo "2. Make sure your custom domain is configured in your repository settings"
echo "3. Verify the workflow ran successfully (check Actions tab on GitHub)"
echo "4. Remember that it can take up to 24 hours for DNS changes to fully propagate"
echo "5. Try clearing your browser cache or using a private browsing window"
echo ""
echo "You can also try forcing a new deployment by making a small change and pushing it to GitHub."
