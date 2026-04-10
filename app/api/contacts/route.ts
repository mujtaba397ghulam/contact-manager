import { NextRequest, NextResponse } from 'next/server'
import { 
  findDocuments, 
  insertDocument, 
  countDocuments 
} from '@/lib/mongodb-helpers'

// GET /api/contacts - Get all contacts with advanced filtering
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '100')
    const search = searchParams.get('search') || ''
    const category = searchParams.get('category') || ''
    const tags = searchParams.get('tags') || ''
    const isFavorite = searchParams.get('isFavorite') || ''
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'
    
    // Build query object
    const query: any = {}
    
    // Search filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } }
      ]
    }
    
    // Category filter
    if (category && category !== 'all') {
      query.category = category
    }
    
    // Tags filter
    if (tags) {
      const tagArray = tags.split(',').filter(t => t.trim())
      if (tagArray.length > 0) {
        query.tags = { $in: tagArray }
      }
    }
    
    // Favorite filter
    if (isFavorite === 'true') {
      query.isFavorite = true
    } else if (isFavorite === 'false') {
      query.isFavorite = false
    }
    
    // Calculate skip value for pagination
    const skip = (page - 1) * limit
    
    // Fetch contacts with pagination
    const contacts = await findDocuments('contacts', query, {
      sort: { [sortBy]: sortOrder === 'desc' ? -1 : 1 },
      limit,
      skip
    })
    
    // Get total count for pagination info
    const totalCount = await countDocuments('contacts', query)
    const totalPages = Math.ceil(totalCount / limit)
    
    return NextResponse.json({
      success: true,
      data: contacts,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    })
  } catch (error) {
    console.error('Error fetching contacts:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch contacts' 
      },
      { status: 500 }
    )
  }
}

// POST /api/contacts - Create a new contact with all fields
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      name, 
      email, 
      phone, 
      company,
      jobTitle,
      address,
      website,
      socialMedia,
      tags,
      category,
      isFavorite,
      notes,
      avatar
    } = body
    
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
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid email format' 
        },
        { status: 400 }
      )
    }
    
    // Check if email already exists
    const existingContacts = await findDocuments('contacts', { email: email.toLowerCase().trim() })
    if (existingContacts.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'A contact with this email already exists' 
        },
        { status: 409 }
      )
    }
    
    // Create contact document with all fields
    const contactData = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone?.trim() || '',
      company: company?.trim() || '',
      jobTitle: jobTitle?.trim() || '',
      address: address || {},
      website: website?.trim() || '',
      socialMedia: socialMedia || {},
      tags: Array.isArray(tags) ? tags : [],
      category: category || 'personal',
      isFavorite: isFavorite || false,
      notes: notes?.trim() || '',
      avatar: avatar || ''
    }
    
    // Insert contact
    const newContact = await insertDocument('contacts', contactData)
    
    return NextResponse.json(
      {
        success: true,
        data: newContact,
        message: 'Contact created successfully'
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating contact:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create contact' 
      },
      { status: 500 }
    )
  }
}
