import clientPromise from './mongodb'
import { ObjectId } from 'mongodb'

// Get database name from environment variable or use default
const DB_NAME = process.env.MONGODB_DB || 'contact-manager'

export async function getDatabase() {
  const client = await clientPromise
  return client.db(DB_NAME)
}

export async function findDocuments(
  collectionName: string, 
  query = {}, 
  options: {
    sort?: any,
    limit?: number,
    skip?: number,
    projection?: any
  } = {}
) {
  const db = await getDatabase()
  let cursor = db.collection(collectionName).find(query)
  
  if (options.sort) cursor = cursor.sort(options.sort)
  if (options.limit) cursor = cursor.limit(options.limit)
  if (options.skip) cursor = cursor.skip(options.skip)
  if (options.projection) cursor = cursor.project(options.projection)
  
  return cursor.toArray()
}

export async function findOneDocument(collectionName: string, query: any) {
  const db = await getDatabase()
  return db.collection(collectionName).findOne(query)
}

export async function insertDocument(collectionName: string, document: any) {
  const db = await getDatabase()
  const docWithTimestamp = {
    ...document,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  const result = await db.collection(collectionName).insertOne(docWithTimestamp)
  return { ...docWithTimestamp, _id: result.insertedId }
}

export async function insertManyDocuments(collectionName: string, documents: any[]) {
  const db = await getDatabase()
  const docsWithTimestamp = documents.map(doc => ({
    ...doc,
    createdAt: new Date(),
    updatedAt: new Date(),
  }))
  const result = await db.collection(collectionName).insertMany(docsWithTimestamp)
  return result
}

export async function updateDocument(
  collectionName: string, 
  query: any, 
  update: any,
  options = {}
) {
  const db = await getDatabase()
  return db.collection(collectionName).updateOne(query, {
    $set: {
      ...update,
      updatedAt: new Date(),
    },
  }, options)
}

export async function updateManyDocuments(
  collectionName: string,
  query: any,
  update: any,
  options = {}
) {
  const db = await getDatabase()
  return db.collection(collectionName).updateMany(query, {
    $set: {
      ...update,
      updatedAt: new Date(),
    },
  }, options)
}

export async function deleteDocument(collectionName: string, query: any) {
  const db = await getDatabase()
  return db.collection(collectionName).deleteOne(query)
}

export async function deleteManyDocuments(collectionName: string, query: any) {
  const db = await getDatabase()
  return db.collection(collectionName).deleteMany(query)
}

export async function countDocuments(collectionName: string, query = {}) {
  const db = await getDatabase()
  return db.collection(collectionName).countDocuments(query)
}

export async function createIndex(collectionName: string, index: any, options = {}) {
  const db = await getDatabase()
  return db.collection(collectionName).createIndex(index, options)
}

// Helper function to convert string ID to ObjectId
export function toObjectId(id: string): ObjectId | null {
  try {
    return new ObjectId(id)
  } catch (error) {
    return null
  }
}

// Helper function to validate ObjectId string
export function isValidObjectId(id: string): boolean {
  return ObjectId.isValid(id)
}