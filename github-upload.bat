@echo off
setlocal EnableDelayedExpansion

echo ==========================================
echo 🚀 SMO Interactive Cost Analysis 
echo    Complete GitHub Setup
echo ==========================================
echo.

REM Get GitHub username from user
if "%1"=="" (
    echo Please enter your GitHub username:
    set /p USERNAME="GitHub Username: "
) else (
    set USERNAME=%1
)

if "!USERNAME!"=="" (
    echo ❌ ERROR: GitHub username is required
    pause
    exit /b 1
)

set REPO_NAME=smo-interactive-cost-analysis

echo.
echo 📋 Setup Configuration:
echo ├── Username: !USERNAME!
echo ├── Repository: !REPO_NAME!
echo └── Project Directory: %CD%
echo.

REM Update package.json with correct username
echo 📝 Updating package.json with your GitHub username...
powershell -Command "(Get-Content 'package.json') -replace 'YOUR_USERNAME', '!USERNAME!' | Set-Content 'package.json'"
if !errorlevel! equ 0 (
    echo ✅ package.json updated successfully!
) else (
    echo ⚠️  Warning: Could not update package.json
)
echo.

REM Check if remote already exists and remove it
git remote get-url origin >nul 2>&1
if !errorlevel! equ 0 (
    echo ⚠️  Remote 'origin' already exists. Removing and re-adding...
    git remote remove origin
)

REM Add GitHub repository as remote origin
echo 🔗 Adding GitHub repository as remote origin...
git remote add origin https://github.com/!USERNAME!/!REPO_NAME!.git
if !errorlevel! equ 0 (
    echo ✅ Remote origin added successfully!
) else (
    echo ❌ Failed to add remote origin
    pause
    exit /b 1
)
echo.

REM Rename branch to main
echo 🌿 Renaming branch to main...
git branch -M main
if !errorlevel! equ 0 (
    echo ✅ Branch renamed to main!
) else (
    echo ⚠️  Warning: Could not rename branch
)
echo.

REM Show current git status
echo 📊 Current git status:
git status --short
echo.

REM Push to GitHub
echo ⬆️  Pushing code to GitHub...
echo Note: You may be prompted to enter your GitHub credentials...
echo.

git push -u origin main
if !errorlevel! equ 0 (
    echo.
    echo ==========================================
    echo 🎉 SUCCESS! Your project is now on GitHub!
    echo ==========================================
    echo.
    echo 📍 Your repository: https://github.com/!USERNAME!/!REPO_NAME!
    echo 🌐 Live site after Pages setup: https://!USERNAME!.github.io/!REPO_NAME!
    echo.
    echo 📋 Next steps:
    echo 1. Go to https://github.com/!USERNAME!/!REPO_NAME!
    echo 2. Click 'Settings' → 'Pages'
    echo 3. Under 'Source', select 'GitHub Actions'
    echo 4. Wait 2-5 minutes for deployment
    echo 5. Access your live site!
    echo.
    echo 🎯 Your SMO Interactive Cost Analysis is ready for the world!
    echo ==========================================
) else (
    echo.
    echo ❌ Push failed. This might be because:
    echo 1. The repository doesn't exist on GitHub yet
    echo 2. Authentication failed
    echo 3. Network connectivity issues
    echo.
    echo 🔧 Manual steps:
    echo 1. Create repository on GitHub: https://github.com/new
    echo 2. Name it: !REPO_NAME!
    echo 3. Don't initialize with README/license/gitignore
    echo 4. Run this script again
    echo.
)

echo.
echo Press any key to continue...
pause >nul
