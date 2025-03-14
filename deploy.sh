
#!/bin/bash

# Build the project
echo "Building the project..."
npm run build

# Navigate to the dist folder
cd dist

# Create a CNAME file for custom domain
echo "Creating CNAME file with your custom domain..."
echo "vulvalareplica.com" > CNAME

# Initialize Git repository in the dist folder
echo "Initializing Git repository in the dist folder..."
git init
git add .
git commit -m "Deploy to GitHub Pages"

# Add GitHub remote (replace with your actual repository URL)
echo "Adding GitHub remote..."
git remote add origin https://github.com/VLVMaster/personalized-body-replicator-77.git

# Force push to the gh-pages branch
echo "Pushing to gh-pages branch..."
git push -f origin master:gh-pages

echo "Deployment complete!"
