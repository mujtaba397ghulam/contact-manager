import { NextRequest, NextResponse } from 'next/server'
import { 
  findOneDocument, 
  updateDocument, 
  deleteDocument, 
  toObjectId,
  isValidObjectId,
  findDocuments
} from '@/lib/mongodb-helpers'

// GET /api/contacts/[id] - Get a single contact
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    
    // Validate ObjectId
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid contact ID format' 
        },
        { status: 400 }
      )
    }
    
    const contact = await findOneDocument('contacts', { _id: toObjectId(id) })
    
    if (!contact) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Contact not found' 
        },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: contact
    })
  } catch (error) {
    console.error('Error fetching contact:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch contact' 
      },
      { status: 500 }
    )
  }
}

// PUT /api/contacts/[id] - Update a contact
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
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
    
    // Validate ObjectId
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid contact ID format' 
        },
        { status: 400 }
      )
    }
    
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
    
    // Check if email already exists (excluding current contact)
    const existingContacts = await findDocuments('contacts', { 
      email: email.toLowerCase().trim(),
      _id: { $ne: toObjectId(id) }
    })
    
    if (existingContacts.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'A contact with this email already exists' 
        },
        { status: 409 }
      )
    }
    
    // Update contact with all fields
    const updateData = {
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
      isFavorite: isFavorite !== undefined ? isFavorite : false,
      notes: notes?.trim() || '',
      avatar: avatar || ''
    }
    
    const result = await updateDocument(
      'contacts',
      { _id: toObjectId(id) },
      updateData
    )
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Contact not found' 
        },
        { status: 404 }
      )
    }
    
    // Fetch updated contact
    const updatedContact = await findOneDocument('contacts', { _id: toObjectId(id) })
    
    return NextResponse.json({
      success: true,
      data: updatedContact,
      message: 'Contact updated successfully'
    })
  } catch (error) {
    console.error('Error updating contact:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to update contact' 
      },
      { status: 500 }
    )
  }
}

// PATCH /api/contacts/[id] - Partial update (e.g., toggle favorite)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()
    
    // Validate ObjectId
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid contact ID format' 
        },
        { status: 400 }
      )
    }
    
    // Update only provided fields
    const result = await updateDocument(
      'contacts',
      { _id: toObjectId(id) },
      body
    )
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Contact not found' 
        },
        { status: 404 }
      )
    }
    
    // Fetch updated contact
    const updatedContact = await findOneDocument('contacts', { _id: toObjectId(id) })
    
    return NextResponse.json({
      success: true,
      data: updatedContact,
      message: 'Contact updated successfully'
    })
  } catch (error) {
    console.error('Error updating contact:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to update contact' 
      },
      { status: 500 }
    )
  }
}

// DELETE /api/contacts/[id] - Delete a contact
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    
    // Validate ObjectId
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid contact ID format' 
        },
        { status: 400 }
      )
    }
    
    const result = await deleteDocument('contacts', { _id: toObjectId(id) })
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Contact not found' 
        },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: 'Contact deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting contact:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to delete contact' 
      },
      { status: 500 }
    )
  }
}
