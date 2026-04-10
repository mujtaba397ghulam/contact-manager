# MongoDB Connection String Troubleshooting

## Common Issues and Solutions

### 1. Special Characters in Password
If your MongoDB password contains special characters, they must be URL encoded:
- `@` → `%40`
- `:` → `%3A`  
- `/` → `%2F`
- `?` → `%3F`
- `#` → `%23`
- `[` → `%5B`
- `]` → `%5D`
- `%` → `%25`
- `space` → `%20`

### 2. Connection String Format
The correct format for MongoDB Atlas is:
```
mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/DATABASE?retryWrites=true&w=majority
```

Example:
```
mongodb+srv://myuser:mypass123@cluster0.abcde.mongodb.net/mydb?retryWrites=true&w=majority
```

### 3. Getting Your Connection String from MongoDB Atlas

1. **Log in to MongoDB Atlas** (https://cloud.mongodb.com)

2. **Click "Connect" on your cluster**

3. **Choose "Connect your application"**

4. **Copy the connection string** and replace:
   - `<password>` with your database user password
   - `<dbname>` with your database name (e.g., `contact-manager`)

### 4. Verify Your Credentials

Make sure you're using:
- **Database user** credentials (not your MongoDB Atlas login)
- The correct **cluster name**
- Your IP address is **whitelisted** in Network Access

### 5. Network Access (IP Whitelist)

In MongoDB Atlas:
1. Go to **Network Access** in the left sidebar
2. Click **Add IP Address**
3. Either:
   - Click **Add Current IP Address** for your current IP
   - Click **Allow Access from Anywhere** (0.0.0.0/0) for development

### 6. Test Your Connection

After updating `.env.local`, restart your Next.js server:
```bash
# Stop the server (Ctrl+C)
# Start it again
npm run dev
```

Then visit `/test-db` to verify the connection works.

### 7. Alternative Connection Methods

If `mongodb+srv://` doesn't work, try the standard format:
```
mongodb://USERNAME:PASSWORD@HOST1:PORT1,HOST2:PORT2,HOST3:PORT3/DATABASE?ssl=true&replicaSet=REPLICA_SET_NAME&authSource=admin
```

You can get this from Atlas by selecting "MongoDB 2.2.12 or later" in the connection modal.
