import { NextRequest, NextResponse } from 'next/server'
import { 
  findDocuments, 
  insertDocument,
  createIndex
} from '@/lib/mongodb-helpers'

// Create indexes on first run
async function ensureIndexes() {
  try {
    await createIndex('users', { email: 1 }, { unique: true })
    await createIndex('users', { createdAt: -1 })
  } catch (error) {
    console.error('Error creating indexes:', error)
  }
}

// GET /api/users - Get all users
export async function GET(request: NextRequest) {
  try {
    // Ensure indexes exist
    await ensureIndexes()
    
    const searchParams = request.nextUrl.searchParams
    const limit = parseInt(searchParams.get('limit') || '20')
    const skip = parseInt(searchParams.get('skip') || '0')
    
    const users = await findDocuments('users', {}, {
      sort: { createdAt: -1 },
      limit,
      skip,
      projection: { password: 0 } // Exclude password field
    })
    
    return NextResponse.json({
      success: true,
      data: users
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch users' 
      },
      { status: 500 }
    )
  }
}

// POST /api/users - Create a new user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, role = 'user' } = body
    
    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Name and email are required' 
        },
        { status: 400 }
      )
    }
    
    // Create user document
    const userData = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      role,
      isActive: true
    }
    
    try {
      const newUser = await insertDocument('users', userData)
      
      // Remove password from response
      const { password, ...userWithoutPassword } = newUser
      
      return NextResponse.json(
        {
          success: true,
          data: userWithoutPassword
        },
        { status: 201 }
      )
    } catch (error: any) {
      // Handle duplicate email error
      if (error.code === 11000) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'A user with this email already exists' 
          },
          { status: 409 }
        )
      }
      throw error
    }
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create user' 
      },
      { status: 500 }
    )
  }
}