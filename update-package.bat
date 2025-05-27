@echo off
REM Script to update package.json with the correct GitHub username

if "%1"=="" (
    echo Please provide your GitHub username as a parameter
    echo Usage: update-package.bat YOUR_USERNAME
    exit /b 1
)

set USERNAME=%1
set PACKAGE_FILE="package.json"

echo Updating package.json with GitHub username: %USERNAME%

REM Update package.json URLs with the correct username
powershell -Command "(Get-Content %PACKAGE_FILE%) -replace 'YOUR_USERNAME', '%USERNAME%' | Set-Content %PACKAGE_FILE%"

echo ✅ package.json updated successfully!
echo Repository URLs now point to: https://github.com/%USERNAME%/smo-interactive-cost-analysis
