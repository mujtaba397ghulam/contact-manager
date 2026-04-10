@echo off
echo ====================================
echo MongoDB Quick Setup for Windows
echo ====================================
echo.

REM Check if running as admin
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  Please run this script as Administrator!
    echo Right-click and select "Run as administrator"
    pause
    exit /b 1
)

echo Checking if MongoDB is already installed...
sc query MongoDB >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ MongoDB is already installed!
    echo.
    echo Starting MongoDB service...
    net start MongoDB
    echo.
    goto :test_connection
)

echo ❌ MongoDB is not installed.
echo.
echo Please install MongoDB manually:
echo.
echo 1. Download MongoDB Community Server:
echo    https://www.mongodb.com/try/download/community
echo.
echo 2. Run the installer with these options:
echo    - Choose "Complete" installation
echo    - Install MongoDB as a Windows Service
echo    - Service Name: MongoDB
echo    - Data Directory: C:\data\db
echo    - Log Directory: C:\data\log
echo.
echo 3. After installation, run this script again
echo.
pause
exit /b 0

:test_connection
echo Testing MongoDB connection...
cd /d "%~dp0"
call npm run test-db
pause