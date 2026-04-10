# MongoDB Local Setup Guide for Windows

## 1. Check if MongoDB is Running

### Method 1: Check Windows Services
1. Press `Win + R`, type `services.msc` and press Enter
2. Look for "MongoDB" or "MongoDB Server" in the services list
3. Check if the Status shows "Running"

### Method 2: Using Command Prompt
Open Command Prompt as Administrator and run:
```cmd
sc query MongoDB
```
or
```cmd
tasklist /FI "IMAGENAME eq mongod.exe"
```

### Method 3: Try to Connect
Open a new Command Prompt and type:
```cmd
mongosh
```
or (for older versions):
```cmd
mongo
```

If it connects, MongoDB is running. If not, you'll see a connection error.

## 2. Start MongoDB if Not Running

### Method 1: Start as Windows Service (Recommended)
```cmd
net start MongoDB
```

### Method 2: Run MongoDB Manually
1. Open Command Prompt as Administrator
2. Navigate to MongoDB bin directory (usually):
   ```cmd
   cd "C:\Program Files\MongoDB\Server\7.0\bin"
   ```
   (Replace 7.0 with your MongoDB version)

3. Start MongoDB:
   ```cmd
   mongod --dbpath "C:\data\db"
   ```

### Method 3: Using MongoDB Compass
1. Open MongoDB Compass (GUI tool)
2. Click "Connect" with default connection string: `mongodb://localhost:27017`

## 3. If MongoDB is Not Installed

1. Download MongoDB Community Server from: https://www.mongodb.com/try/download/community
2. Run the installer (choose "Complete" installation)
3. Make sure to install MongoDB as a Windows Service during setup
4. The installer will create the data directory automatically

## 4. Common Issues and Solutions

### Issue: "The service name is invalid"
MongoDB might not be installed as a service. Install it:
```cmd
mongod --install --dbpath "C:\data\db" --logpath "C:\data\db\log\mongo.log"
```

### Issue: "Data directory not found"
Create the data directory:
```cmd
mkdir C:\data\db
```

### Issue: "Port 27017 already in use"
Another instance might be running. Check with:
```cmd
netstat -an | findstr :27017
```

## 5. Verify MongoDB is Working

After starting MongoDB, test the connection:

### Using mongosh (MongoDB Shell):
```cmd
mongosh
```

Then run a simple command:
```javascript
show dbs
```

### Using your Next.js app:
1. Make sure your `.env.local` has:
   ```
   MONGODB_URI=mongodb://localhost:27017/contact-manager
   ```
2. Run your Next.js app:
   ```cmd
   npm run dev
   ```
3. Visit http://localhost:3000/contacts

## Quick Start Commands Summary:

```cmd
# Check if running
sc query MongoDB

# Start MongoDB service
net start MongoDB

# Stop MongoDB service
net stop MongoDB

# Connect to MongoDB
mongosh
```

## Visual Indicator
If MongoDB is running properly:
- The mongosh command will show: "Connecting to: mongodb://127.0.0.1:27017"
- Your Next.js app won't show connection errors
- Port 27017 will be listening (check with: netstat -an | findstr :27017)
