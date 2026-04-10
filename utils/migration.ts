// Utility to migrate localStorage contacts to MongoDB

export async function migrateContactsToMongoDB() {
  try {
    // Check if there are contacts in localStorage
    const localStorageKey = 'contact_manager_contacts';
    const storedData = localStorage.getItem(localStorageKey);
    
    if (!storedData) {
      console.log('No contacts found in localStorage');
      return { success: true, message: 'No contacts to migrate' };
    }
    
    const localContacts = JSON.parse(storedData);
    
    if (!Array.isArray(localContacts) || localContacts.length === 0) {
      console.log('No valid contacts found in localStorage');
      return { success: true, message: 'No valid contacts to migrate' };
    }
    
    console.log(`Found ${localContacts.length} contacts in localStorage`);
    
    // Fetch existing contacts from MongoDB to avoid duplicates
    const response = await fetch('/api/contacts?limit=1000');
    const result = await response.json();
    
    if (!result.success) {
      throw new Error('Failed to fetch existing contacts from database');
    }
    
    const existingEmails = new Set(result.data.map((c: any) => c.email.toLowerCase()));
    
    // Filter out contacts that already exist in MongoDB
    const contactsToMigrate = localContacts.filter(
      contact => !existingEmails.has(contact.email.toLowerCase())
    );
    
    if (contactsToMigrate.length === 0) {
      console.log('All contacts already exist in MongoDB');
      return { success: true, message: 'All contacts already exist in database' };
    }
    
    console.log(`Migrating ${contactsToMigrate.length} new contacts to MongoDB`);
    
    // Migrate each contact
    let successCount = 0;
    let failCount = 0;
    const errors: string[] = [];
    
    for (const contact of contactsToMigrate) {
      try {
        // Remove the old ID as MongoDB will generate a new one
        const { id, ...contactData } = contact;
        
        const response = await fetch('/api/contacts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(contactData)
        });
        
        const result = await response.json();
        
        if (result.success) {
          successCount++;
        } else {
          failCount++;
          errors.push(`${contact.name}: ${result.error}`);
        }
      } catch (error: any) {
        failCount++;
        errors.push(`${contact.name}: ${error.message}`);
      }
    }
    
    // Clear localStorage after successful migration
    if (successCount > 0 && failCount === 0) {
      localStorage.removeItem(localStorageKey);
      console.log('Cleared localStorage after successful migration');
    }
    
    return {
      success: failCount === 0,
      message: `Migration complete: ${successCount} succeeded, ${failCount} failed`,
      details: {
        totalFound: localContacts.length,
        alreadyExisted: localContacts.length - contactsToMigrate.length,
        migrated: successCount,
        failed: failCount,
        errors: errors.length > 0 ? errors : undefined
      }
    };
  } catch (error: any) {
    console.error('Migration error:', error);
    return {
      success: false,
      message: `Migration failed: ${error.message}`
    };
  }
}

// Check if migration is needed
export function isMigrationNeeded(): boolean {
  const localStorageKey = 'contact_manager_contacts';
  const storedData = localStorage.getItem(localStorageKey);
  
  if (!storedData) return false;
  
  try {
    const contacts = JSON.parse(storedData);
    return Array.isArray(contacts) && contacts.length > 0;
  } catch {
    return false;
  }
}
