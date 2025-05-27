#!/bin/bash

# SMO Interactive Cost Analysis - Complete GitHub Setup Script
# This script will automatically upload your project to GitHub

echo "=============================================="
echo "🚀 SMO Interactive Cost Analysis GitHub Setup"
echo "=============================================="
echo

# Check if GitHub username is provided
if [ "$1" = "" ]; then
    echo "❌ ERROR: Please provide your GitHub username as a parameter"
    echo "Usage: ./complete-github-setup.sh YOUR_USERNAME"
    echo
    echo "Example: ./complete-github-setup.sh john-doe"
    echo
    exit 1
fi

USERNAME=$1
REPO_NAME="smo-interactive-cost-analysis"
PROJECT_DIR="e:/[WebDev.]/• PROJECTS •/SMO Interactive Cost Analysis"

echo "📋 Setup Configuration:"
echo "├── Username: $USERNAME"
echo "├── Repository: $REPO_NAME" 
echo "└── Project Directory: $PROJECT_DIR"
echo

# Navigate to project directory
cd "$PROJECT_DIR"

echo "📁 Current directory: $(pwd)"
echo

# Update package.json with correct username
echo "📝 Updating package.json with your GitHub username..."
sed -i "s/YOUR_USERNAME/$USERNAME/g" package.json
echo "✅ package.json updated successfully!"
echo

# Check if remote already exists
if git remote get-url origin > /dev/null 2>&1; then
    echo "⚠️  Remote 'origin' already exists. Removing and re-adding..."
    git remote remove origin
fi

# Add GitHub repository as remote origin
echo "🔗 Adding GitHub repository as remote origin..."
git remote add origin "https://github.com/$USERNAME/$REPO_NAME.git"
echo "✅ Remote origin added successfully!"
echo

# Rename branch to main (GitHub's preferred default)
echo "🌿 Renaming branch to main..."
git branch -M main
echo "✅ Branch renamed to main!"
echo

# Show current git status
echo "📊 Current git status:"
git status --short
echo

# Push to GitHub
echo "⬆️  Pushing code to GitHub..."
echo "Note: You may be prompted to enter your GitHub credentials..."
echo

if git push -u origin main; then
    echo
    echo "=============================================="
    echo "🎉 SUCCESS! Your project is now on GitHub!"
    echo "=============================================="
    echo
    echo "📍 Your repository: https://github.com/$USERNAME/$REPO_NAME"
    echo "🌐 Live site (after Pages setup): https://$USERNAME.github.io/$REPO_NAME"
    echo
    echo "📋 Next steps:"
    echo "1. Go to https://github.com/$USERNAME/$REPO_NAME"
    echo "2. Click 'Settings' → 'Pages'"
    echo "3. Under 'Source', select 'GitHub Actions'"
    echo "4. Wait 2-5 minutes for deployment"
    echo "5. Access your live site!"
    echo
    echo "🎯 Your SMO Interactive Cost Analysis is ready for the world!"
    echo "=============================================="
else
    echo
    echo "❌ Push failed. This might be because:"
    echo "1. The repository doesn't exist on GitHub yet"
    echo "2. Authentication failed"
    echo "3. Network connectivity issues"
    echo
    echo "🔧 Manual steps:"
    echo "1. Create repository on GitHub: https://github.com/new"
    echo "2. Name it: $REPO_NAME"
    echo "3. Don't initialize with README/license/gitignore"
    echo "4. Run: git push -u origin main"
    echo
fi
