# MongoDB Backend Setup Guide (Pure MongoDB)

This guide explains how to use MongoDB with your Next.js Contact Manager application using the native MongoDB driver (without Mongoose).

## Prerequisites

- Node.js installed
- MongoDB installed locally OR a MongoDB Atlas account (cloud)

## Setup Instructions

### 1. Dependencies Already Installed

The project already has MongoDB installed. The `package.json` includes:
- `mongodb` - MongoDB native driver for Node.js

### 2. MongoDB Connection

The connection is handled in `lib/mongodb.ts` using connection pooling for optimal performance.

### 3. Environment Variables

The `.env.local` file is already configured. Update it with your MongoDB connection string:

```bash
# For local MongoDB:
MONGODB_URI=mongodb://localhost:27017/contact-manager

# For MongoDB Atlas (cloud):
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/contact-manager?retryWrites=true&w=majority

# Database name (optional)
MONGODB_DB=contact-manager
```

### 4. Get MongoDB URI

#### Option A: Local MongoDB
1. Install MongoDB Community Edition from [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/contact-manager`

#### Option B: MongoDB Atlas (Free Cloud)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (M0 free tier)
4. Add your IP address to the whitelist
5. Create a database user
6. Get your connection string from "Connect" button

## API Endpoints

### Contacts API

- **GET /api/contacts** - Get all contacts with pagination and search
  - Query params: `page`, `limit`, `search`, `sortBy`, `sortOrder`
- **POST /api/contacts** - Create a new contact
- **GET /api/contacts/[id]** - Get a specific contact
- **PUT /api/contacts/[id]** - Update a contact
- **DELETE /api/contacts/[id]** - Delete a contact

### Users API (Example)

- **GET /api/users** - Get all users
- **POST /api/users** - Create a new user

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── contacts/
│   │   │   ├── route.ts          # GET all, POST
│   │   │   └── [id]/
│   │   │       └── route.ts      # GET, PUT, DELETE by ID
│   │   └── users/
│   │       └── route.ts          # Users example API
│   └── contacts/
│       └── page.tsx              # Contacts UI page
├── components/
│   ├── ContactList.tsx           # Contact list component
│   └── ContactForm.tsx           # Contact form component
├── lib/
│   ├── mongodb.ts                # MongoDB connection
│   ├── mongodb-helpers.ts        # Database helper functions
│   └── hooks/
│       └── useApi.ts             # Custom hooks for API calls
├── models/                       # Not used (pure MongoDB approach)
└── .env.local                    # Environment variables
```

## Key Features

- ✅ Pure MongoDB implementation (no ORM)
- ✅ Connection pooling for performance
- ✅ Full CRUD operations
- ✅ Pagination and search
- ✅ Input validation
- ✅ Error handling
- ✅ Duplicate prevention
- ✅ Automatic timestamps
- ✅ Custom hooks for frontend
- ✅ TypeScript support

## Usage Examples

### Frontend - Using Custom Hooks

```typescript
import { useGetContacts } from '@/lib/hooks/useApi'

function MyComponent() {
  const { contacts, loading, error, fetchContacts } = useGetContacts()
  
  useEffect(() => {
    fetchContacts({ page: 1, limit: 10 })
  }, [])
  
  // Use contacts data...
}
```

### Frontend - Direct API Calls

```javascript
// Create a contact
const response = await fetch('/api/contacts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890'
  })
})

// Get contacts with search
const contacts = await fetch('/api/contacts?search=john&page=1&limit=10')
  .then(res => res.json())
```

### Server-Side (App Router)

```typescript
import clientPromise from '@/lib/mongodb'

async function getServerSideData() {
  const client = await clientPromise
  const db = client.db(process.env.MONGODB_DB)
  
  const data = await db
    .collection('contacts')
    .find({})
    .sort({ createdAt: -1 })
    .toArray()
    
  return data
}
```

## MongoDB Helper Functions

The `lib/mongodb-helpers.ts` file provides these utilities:

- `findDocuments()` - Find multiple documents with options
- `findOneDocument()` - Find a single document
- `insertDocument()` - Insert with automatic timestamps
- `updateDocument()` - Update with automatic timestamps
- `deleteDocument()` - Delete a document
- `countDocuments()` - Count documents
- `createIndex()` - Create database indexes
- `toObjectId()` - Convert string to ObjectId
- `isValidObjectId()` - Validate ObjectId format

## Performance Tips

1. **Indexes**: Create indexes for frequently queried fields
2. **Projections**: Only fetch fields you need
3. **Pagination**: Use skip/limit for large datasets
4. **Connection Pooling**: Already implemented in `mongodb.ts`

## Troubleshooting

### Connection Issues
- Verify MongoDB is running (local) or accessible (cloud)
- Check connection string format
- For Atlas: Whitelist your IP address
- Check network/firewall settings

### ObjectId Errors
- Always validate IDs before using them
- Use the `isValidObjectId()` helper function
- Convert string IDs with `toObjectId()`

### Performance Issues
- Create appropriate indexes
- Use pagination for large result sets
- Limit fields with projections
- Monitor query performance with MongoDB tools

## Next Steps

1. Add authentication (NextAuth.js recommended)
2. Implement real-time updates (webhooks/polling)
3. Add file uploads (GridFS for large files)
4. Create data relationships
5. Add advanced search with text indexes
6. Implement caching (Redis/in-memory)
