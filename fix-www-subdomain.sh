
#!/bin/bash

echo "========================================================"
echo "   www Subdomain Fix for GitHub Pages Custom Domain"
echo "========================================================"
echo ""

# Get the custom domain from CNAME
if [ -f "CNAME" ]; then
  DOMAIN=$(cat CNAME)
  echo "Your domain: $DOMAIN"
else
  echo "ERROR: CNAME file not found. Cannot determine domain."
  exit 1
fi

echo "CHECKING WWW SUBDOMAIN CONFIGURATION..."
echo "--------------------------------------"

# Check for CNAME record
WWW_CNAME=$(dig +short CNAME www.$DOMAIN)

if [ -z "$WWW_CNAME" ]; then
  echo "❌ No CNAME record found for www.$DOMAIN"
  echo ""
  echo "WHAT TO DO: You need to add a CNAME record for 'www' in your DNS settings."
else
  echo "✅ CNAME record found for www.$DOMAIN pointing to: $WWW_CNAME"
  
  # Check if it's N/A or something strange
  if [[ "$WWW_CNAME" == *"N/A"* ]] || [[ "$WWW_CNAME" == *"null"* ]] || [[ -z "$WWW_CNAME" ]]; then
    echo "⚠️ WARNING: Your CNAME record appears to have an invalid value"
    echo "This matches the 'N/A' value seen in your screenshot."
  elif [[ "$WWW_CNAME" == *"$DOMAIN"* ]] || [[ "$WWW_CNAME" == *"github.io"* ]]; then
    echo "✅ CNAME value looks correctly formatted"
  else
    echo "⚠️ WARNING: Your CNAME record has an unexpected value"
  fi
fi

echo ""
echo "STEP-BY-STEP FIX FOR WWW SUBDOMAIN:"
echo "--------------------------------"
echo "1. LOG IN TO YOUR SQUARESPACE ACCOUNT"
echo "   URL: https://account.squarespace.com"
echo ""
echo "2. NAVIGATE TO YOUR DOMAIN SETTINGS"
echo "   → Click on your domain name: $DOMAIN"
echo "   → Find and click on 'DNS Settings'"
echo ""
echo "3. DELETE THE EXISTING WWW CNAME RECORD"
echo "   → Find the CNAME record with Host = www"
echo "   → Click the trash icon or delete button next to it"
echo "   → Confirm deletion"
echo ""
echo "4. ADD A NEW CNAME RECORD WITH THESE EXACT VALUES:"
echo "   → Record Type: CNAME"
echo "   → HOST: www"
echo "   → VALUE: $DOMAIN"
echo "   → TTL: Automatic or 3600"
echo ""
echo "5. SAVE CHANGES"
echo "   → Look for a Save or Apply button"
echo "   → Confirm any warnings about DNS propagation time"
echo ""
echo "6. VERIFY IN GITHUB REPOSITORY SETTINGS"
echo "   → Go to your GitHub repository"
echo "   → Navigate to Settings → Pages"
echo "   → Verify Custom Domain is set to: $DOMAIN (without www)"
echo "   → Ensure 'Enforce HTTPS' is checked if available"
echo ""
echo "7. WAIT FOR DNS PROPAGATION"
echo "   → Changes may take 24-48 hours to fully propagate"
echo "   → You can check status with this script in the meantime"
echo ""
echo "8. VERIFY CHANGES"
echo "   After waiting period, test both:"
echo "   → https://$DOMAIN"
echo "   → https://www.$DOMAIN"
echo "   Both should load your GitHub Pages site"
echo ""
echo "SPECIFICALLY FOR SQUARESPACE USERS:"
echo "--------------------------------"
echo "The screenshot you shared showed an 'N/A' value for the www CNAME."
echo "This is invalid and must be fixed by:"
echo ""
echo "1. DELETING the current www CNAME record completely"
echo "2. CREATING a new CNAME record with the proper value"
echo "3. Setting the proper value to: $DOMAIN"
echo ""
echo "If Squarespace doesn't allow you to edit the record properly,"
echo "consider moving your domain DNS management to another provider"
echo "like Cloudflare (free) for better DNS control."
echo ""
echo "========================================================"
echo "RUN './dns-test.sh' TO CHECK DNS AFTER MAKING CHANGES"
echo "========================================================"
