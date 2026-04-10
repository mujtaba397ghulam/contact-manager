import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function GET(request: NextRequest) {
  try {
    // Test connection
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || 'contact-manager')
    
    // Perform a simple operation to verify connection
    const collections = await db.listCollections().toArray()
    
    // Test write and delete
    const testCollection = db.collection('connection-test')
    const testDoc = { 
      message: 'API connection test', 
      timestamp: new Date() 
    }
    
    const insertResult = await testCollection.insertOne(testDoc)
    await testCollection.deleteOne({ _id: insertResult.insertedId })
    
    return NextResponse.json({
      success: true,
      message: 'MongoDB connection successful!',
      database: db.databaseName,
      collectionsCount: collections.length,
      collections: collections.map(c => c.name),
      connectionString: process.env.MONGODB_URI?.replace(/:[^:@]+@/, ':****@') // Hide password
    })
  } catch (error: any) {
    console.error('MongoDB connection test failed:', error)
    
    let errorMessage = error.message
    let tips = []
    
    if (error.message.includes('Authentication failed')) {
      tips = [
        'Check your username and password in .env.local',
        'Make sure you removed the < > brackets from the connection string',
        'Verify the password has no typos'
      ]
    } else if (error.message.includes('ENOTFOUND') || error.message.includes('timeout')) {
      tips = [
        'Check your internet connection',
        'Verify the cluster address is correct',
        'Make sure your IP is whitelisted in MongoDB Atlas'
      ]
    } else if (error.message.includes('ECONNREFUSED')) {
      tips = [
        'Make sure MongoDB is running locally',
        'Start MongoDB with: net start MongoDB (Windows)',
        'Or switch to MongoDB Atlas in .env.local'
      ]
    }
    
    return NextResponse.json({
      success: false,
      error: errorMessage,
      tips: tips
    }, { status: 500 })
  }
}