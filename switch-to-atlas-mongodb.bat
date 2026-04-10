@echo off
echo Switching to MongoDB Atlas...
echo.

REM Restore backup if exists
if exist .env.local.backup (
    copy .env.local.backup .env.local >nul 2>&1
    echo ✅ Restored Atlas configuration!
) else (
    echo ⚠️  No backup found. Please manually add your Atlas connection string to .env.local
    echo.
    echo Example:
    echo MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/contact-manager?retryWrites=true^&w=majority
)

echo.
echo 🌐 Make sure your IP is whitelisted in MongoDB Atlas:
echo 1. Go to https://cloud.mongodb.com
echo 2. Navigate to Network Access
echo 3. Add your current IP address
echo.
pause