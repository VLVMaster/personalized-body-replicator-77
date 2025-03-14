
#!/bin/bash

# This script helps you set up your GitHub repository and push your code

echo "Setting up your GitHub repository..."

# Check if git is installed
if ! command -v git &> /dev/null
then
    echo "Git is not installed. Please install Git and try again."
    exit 1
fi

# Initialize Git repository if not already initialized
if [ ! -d ".git" ]; then
    echo "Initializing Git repository..."
    git init
fi

echo "Enter your GitHub username:"
read username

echo "Enter your repository name (e.g., vulvalareplica):"
read repo_name

# Add all files to git
git add .

# Commit changes
echo "Committing your code..."
git commit -m "Initial commit"

# Add GitHub remote
echo "Adding GitHub remote..."
git remote add origin https://github.com/$username/$repo_name.git

# Push to GitHub
echo "Pushing to GitHub..."
git push -u origin master

echo "Setup complete! Your code has been pushed to GitHub."
echo "Now you can enable GitHub Pages in your repository settings."
echo "Don't forget to update the deploy.sh script with your actual GitHub repository URL."
