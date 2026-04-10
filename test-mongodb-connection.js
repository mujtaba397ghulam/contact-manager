// Test MongoDB Connection Script
// Run with: npm run test-db

async function testConnection() {
  // Try to get MongoDB URI from environment or use the local default
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/contact-manager';
  
  console.log('🔍 Testing MongoDB connection...');
  console.log(`📍 Connection string: ${uri.replace(/:[^:@]+@/, ':****@')}`); // Hide password
  
  // Import MongoDB after checking environment
  const { MongoClient } = await import('mongodb');
  const client = new MongoClient(uri);

  try {
    // Connect to MongoDB
    await client.connect();
    console.log('✅ Successfully connected to MongoDB!');
    
    // Test database access
    const dbName = process.env.MONGODB_DB || 'contact-manager';
    const db = client.db(dbName);
    const collections = await db.listCollections().toArray();
    
    console.log(`📊 Database: ${db.databaseName}`);
    console.log(`📁 Collections found: ${collections.length}`);
    collections.forEach(col => console.log(`   - ${col.name}`));
    
    // Test write operation
    const testCollection = db.collection('connection-test');
    const testDoc = { 
      message: 'Connection test successful', 
      timestamp: new Date() 
    };
    
    const result = await testCollection.insertOne(testDoc);
    console.log('✅ Write test successful!');
    
    // Clean up test document
    await testCollection.deleteOne({ _id: result.insertedId });
    console.log('🧹 Cleaned up test data');
    
    console.log('\n🎉 All tests passed! Your MongoDB connection is working perfectly.');
    
  } catch (error) {
    console.error('\n❌ Connection failed!');
    console.error('Error:', error.message);
    
    if (error.message.includes('Authentication failed')) {
      console.log('\n💡 Tips:');
      console.log('1. Check your username and password in .env.local');
      console.log('2. Make sure you removed the < > brackets');
      console.log('3. Verify the password has no typos');
    } else if (error.message.includes('ENOTFOUND') || error.message.includes('timeout')) {
      console.log('\n💡 Tips:');
      console.log('1. Check your internet connection');
      console.log('2. Verify the cluster address is correct');
      console.log('3. Make sure your IP is whitelisted in Atlas');
    } else if (error.message.includes('connect ECONNREFUSED')) {
      console.log('\n💡 Tips:');
      console.log('1. Make sure MongoDB is running locally');
      console.log('2. Start MongoDB with: net start MongoDB');
      console.log('3. Or switch to MongoDB Atlas in .env.local');
    }
  } finally {
    await client.close();
  }
}

// Note about environment variables
console.log('📌 Note: This test uses the default local MongoDB connection.');
console.log('   To test MongoDB Atlas, set MONGODB_URI environment variable:');
console.log('   Windows: set MONGODB_URI=your-atlas-connection-string');
console.log('   Then run: npm run test-db\n');

// Run the test
testConnection().catch(console.error);