# MongoDB Authentication Setup (Optional for Local Development)

## For Development (No Auth - DEFAULT)
Your current setup works without any login:
```
MONGODB_URI=mongodb://localhost:27017/contact-manager
```

## To Add Authentication (Optional - For Security)

### Step 1: Create Admin User
1. Start MongoDB without auth (current state):
```cmd
mongod
```

2. Connect to MongoDB:
```cmd
mongosh
```

3. Switch to admin database and create user:
```javascript
use admin
db.createUser({
  user: "adminUser",
  pwd: "adminPassword",
  roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
})
```

4. Create database user for your app:
```javascript
use contact-manager
db.createUser({
  user: "appUser",
  pwd: "appPassword",
  roles: [ { role: "readWrite", db: "contact-manager" } ]
})
```

### Step 2: Enable Authentication
1. Stop MongoDB (Ctrl+C)
2. Start MongoDB with auth enabled:
```cmd
mongod --auth
```

Or if running as service, add to config file.

### Step 3: Update Connection String
Update `.env.local`:
```
MONGODB_URI=mongodb://appUser:appPassword@localhost:27017/contact-manager?authSource=contact-manager
```

## Quick Decision Guide

### Use NO Authentication When:
- 🏠 Developing locally
- 🧪 Testing features
- 📚 Learning MongoDB
- 💻 Personal projects on your own computer

### Use Authentication When:
- 🌐 Deploying to production
- 🏢 Company/client projects
- 🔒 Sensitive data
- 👥 Multiple users accessing the database
- ☁️ Using MongoDB Atlas (required)

## Your Current Setup
Your local MongoDB is running without authentication, which is perfect for development! No changes needed unless you want extra security.