@echo off
echo ==========================================
echo SMO Interactive Cost Analysis - GitHub Setup
echo ==========================================
echo.

REM Check if user provided their GitHub username
if "%1"=="" (
    echo ERROR: Please provide your GitHub username as a parameter
    echo Usage: setup-github.bat YOUR_USERNAME
    echo.
    echo Example: setup-github.bat john-doe
    echo.
    pause
    exit /b 1
)

set USERNAME=%1
set REPO_NAME=smo-interactive-cost-analysis

echo Setting up GitHub repository connection...
echo Repository: https://github.com/%USERNAME%/%REPO_NAME%
echo.

REM Navigate to project directory
cd /d "e:\[WebDev.]\• PROJECTS •\SMO Interactive Cost Analysis"

echo Current directory: %CD%
echo.

REM Add remote origin
echo Adding GitHub repository as remote origin...
git remote add origin https://github.com/%USERNAME%/%REPO_NAME%.git

REM Rename branch to main
echo Renaming branch to main...
git branch -M main

REM Push to GitHub
echo Pushing code to GitHub...
git push -u origin main

echo.
echo ==========================================
echo 🎉 SUCCESS! Your code has been uploaded to GitHub!
echo ==========================================
echo.
echo Your repository: https://github.com/%USERNAME%/%REPO_NAME%
echo.
echo Next steps:
echo 1. Go to your repository on GitHub
echo 2. Click Settings → Pages
echo 3. Select "GitHub Actions" as source
echo 4. Wait 2-5 minutes for deployment
echo 5. Access your live site at: https://%USERNAME%.github.io/%REPO_NAME%
echo.
echo ==========================================
pause
