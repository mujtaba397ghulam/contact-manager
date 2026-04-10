# MongoDB Local Setup for Windows

## 1. Download MongoDB
- Go to https://www.mongodb.com/try/download/community
- Download MongoDB Community Server for Windows
- Choose the MSI installer

## 2. Install MongoDB
- Run the installer
- Choose "Complete" installation
- Install MongoDB as a Windows Service (recommended)
- The installer will automatically start MongoDB

## 3. Verify Installation
Open Command Prompt as Administrator and run:
```
net start MongoDB
```

If MongoDB is already running, you'll see:
"The requested service has already been started."

## 4. Test Connection
```
npm run test-db
```

## Alternative: Start MongoDB Manually
If not installed as a service:
```
"C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe" --dbpath="C:\data\db"
```
(Create C:\data\db folder first)

## Troubleshooting
If port 27017 is blocked, check Windows Firewall or antivirus settings.