# MongoDB Connection Troubleshooting Guide

## Current Setup
Your `.env.local` has MongoDB Atlas configured:
```
MONGODB_URI=mongodb+srv://jawadtaj201:JOT@043atlas@jawad201.gas0uxs.mongodb.net/?retryWrites=true&w=majority&appName=jawad201
```

## Common Issues & Solutions

### 1. Network Access (Most Common Issue)
MongoDB Atlas requires your IP address to be whitelisted.

**Solution:**
1. Go to MongoDB Atlas Dashboard: https://cloud.mongodb.com
2. Select your project
3. Go to **Network Access** (left sidebar)
4. Click **Add IP Address**
5. Click **Add Current IP Address** or **Allow Access from Anywhere** (0.0.0.0/0)
6. Click **Confirm**

### 2. Check Credentials
Your connection string might have incorrect password.

**To verify:**
1. Go to **Database Access** in Atlas
2. Click **Edit** on your user (jawadtaj201)
3. Update password if needed
4. Make sure the password in `.env.local` matches exactly (special characters need encoding)

### 3. Connection String Format Issue
Your current connection string has an unusual format. Try this corrected version:

```
MONGODB_URI=mongodb+srv://jawadtaj201:JOT043atlas@jawad201.gas0uxs.mongodb.net/contact-manager?retryWrites=true&w=majority
```

(Note: I removed the @ symbol in the password and fixed the format)

### 4. Use Local MongoDB Instead (Quick Fix)
If you want to avoid Atlas issues, comment out the Atlas URI and use local:

```
# Atlas (comment this out)
# MONGODB_URI=mongodb+srv://...

# Local MongoDB (uncomment this)
MONGODB_URI=mongodb://localhost:27017/contact-manager
```

Then install MongoDB locally using the instructions in MONGODB_WINDOWS_SETUP.md

## Test Your Connection
After making changes:
```bash
npm run test-db
```

## If Atlas Still Doesn't Work
1. **Check cluster status**: Make sure your cluster is active (green) in Atlas dashboard
2. **Try connection string in MongoDB Compass** first to isolate the issue
3. **Create new user** with simpler password (no special characters)
4. **Check firewall**: Your network might be blocking port 27017

## Alternative: Create New Atlas Cluster
If nothing works, create a fresh MongoDB Atlas cluster:
1. Sign up at https://cloud.mongodb.com
2. Create free M0 cluster
3. Add database user
4. Whitelist your IP
5. Get new connection string
6. Update `.env.local`