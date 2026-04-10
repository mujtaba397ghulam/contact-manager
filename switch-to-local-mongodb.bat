@echo off
echo Switching to Local MongoDB...
echo.

REM Backup current .env.local
copy .env.local .env.local.backup >nul 2>&1

REM Create new .env.local with local MongoDB
(
echo # MongoDB Connection - LOCAL
echo MONGODB_URI=mongodb://localhost:27017/contact-manager
echo MONGODB_DB=contact-manager
) > .env.local

echo ✅ Switched to local MongoDB!
echo.
echo Starting MongoDB service...
net start MongoDB 2>nul
if %errorlevel% == 0 (
    echo ✅ MongoDB service started!
) else (
    echo ⚠️  MongoDB service already running or not installed
    echo.
    echo To install MongoDB:
    echo 1. Download from: https://www.mongodb.com/try/download/community
    echo 2. Install with default settings
    echo 3. Run this script again
)

echo.
echo Testing connection...
npm run test-db