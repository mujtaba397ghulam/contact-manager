# MongoDB Atlas Setup Guide for Next.js

## Step 1: Create MongoDB Atlas Account

1. Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Try Free" or "Sign Up"
3. Create account with:
   - Your email
   - Or sign up with Google account
4. Verify your email if required

## Step 2: Create Your First Cluster

After signing in, you'll create a cluster:

1. **Choose a plan**: Select "M0" (FREE tier) ✅
2. **Provider & Region**: 
   - Provider: AWS, Google Cloud, or Azure (any is fine)
   - Region: Choose closest to your location (e.g., Mumbai for Pakistan)
3. **Cluster Name**: Keep default or name it (e.g., "MyCluster")
4. Click "Create Cluster" (takes 1-3 minutes)

## Step 3: Set Up Database Access (Create User)

1. In left sidebar, click **"Database Access"**
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Create credentials:
   - Username: `myappuser` (or any name)
   - Password: Click "Autogenerate" or create your own
   - **SAVE THIS PASSWORD!** 📝
5. Database User Privileges: Select "Read and write to any database"
6. Click **"Add User"**

## Step 4: Set Up Network Access (Whitelist IP)

1. In left sidebar, click **"Network Access"**
2. Click **"Add IP Address"**
3. Choose one:
   - **For Development**: Click "Allow Access from Anywhere" (0.0.0.0/0)
   - **For Production**: Add your specific IP address
4. Click **"Confirm"**

## Step 5: Get Your Connection String

1. Go back to **"Database"** in sidebar
2. Click **"Connect"** button on your cluster
3. Choose **"Connect your application"**
4. Select:
   - Driver: **Node.js**
   - Version: **4.1 or later**
5. Copy the connection string. It looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

## Step 6: Update Your Next.js Project

1. **Update `.env.local`**:
   ```bash
   # Replace <username> with your database username
   # Replace <password> with your database password
   # Add your database name after .net/
   MONGODB_URI=mongodb+srv://myappuser:yourpassword@cluster0.xxxxx.mongodb.net/contact-manager?retryWrites=true&w=majority
   
   # Optional: Specify database name separately
   MONGODB_DB=contact-manager
   ```

2. **Important**: Replace in the connection string:
   - `<username>` → Your database username (e.g., myappuser)
   - `<password>` → Your database password
   - Add `/contact-manager` after `.net` (your database name)

## Step 7: Test the Connection

1. Stop your Next.js dev server (Ctrl+C)
2. Start it again:
   ```bash
   npm run dev
   ```
3. Visit http://localhost:3000/contacts
4. Try adding a contact - it should work!

## Step 8: Verify in MongoDB Atlas

1. In Atlas dashboard, click **"Browse Collections"**
2. You should see:
   - Database: `contact-manager`
   - Collection: `contacts`
   - Your added data

## Common Issues & Solutions

### Connection Error: "Authentication failed"
- Double-check username and password
- Make sure you replaced `<password>` in connection string
- Password should NOT have `<>` brackets

### Connection Error: "Network timeout"
- Check Network Access settings
- Make sure your IP is whitelisted
- Try "Allow from anywhere" for testing

### "Invalid connection string"
- Make sure you replaced all placeholders
- Check for special characters in password (URL encode them)
- Ensure database name is added: `.net/contact-manager`

### Special Characters in Password
If your password has special characters, URL encode them:
- @ → %40
- : → %3A
- / → %2F
- ? → %3F
- # → %23

Example:
```
Password: p@ss:word
Encoded: p%40ss%3Aword
```

## MongoDB Atlas Free Tier (M0) Limits

- ✅ **512 MB storage** (plenty for development)
- ✅ **Shared RAM/CPU** (fine for small projects)
- ✅ **No credit card required**
- ⚠️ **Pauses after 60 days of inactivity**

## Next Steps

After successful connection:
1. Create indexes for better performance
2. Set up MongoDB Atlas monitoring
3. Configure backup schedules
4. Add more specific IP addresses for security

## Quick Reference

Your final connection string should look like:
```
mongodb+srv://myappuser:actualpassword@cluster0.abcde.mongodb.net/contact-manager?retryWrites=true&w=majority
```

Where:
- `myappuser` = your database username
- `actualpassword` = your database password
- `cluster0.abcde` = your cluster address
- `contact-manager` = your database name