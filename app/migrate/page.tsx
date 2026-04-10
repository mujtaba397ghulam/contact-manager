'use client';

import { useState, useEffect } from 'react';
import { migrateContactsToMongoDB, isMigrationNeeded } from '@/utils/migration';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function MigrationPage() {
  const [needsMigration, setNeedsMigration] = useState(false);
  const [migrating, setMigrating] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    // Check if migration is needed
    setNeedsMigration(isMigrationNeeded());
  }, []);

  const handleMigration = async () => {
    setMigrating(true);
    setResult(null);

    try {
      const migrationResult = await migrateContactsToMongoDB();
      setResult(migrationResult);
      
      // Recheck if migration is still needed
      setNeedsMigration(isMigrationNeeded());
    } catch (error: any) {
      setResult({
        success: false,
        message: `Migration failed: ${error.message}`
      });
    } finally {
      setMigrating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Data Migration Tool
        </h1>

        <Card className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Migrate to MongoDB</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            This tool helps you migrate your existing contacts from browser storage to MongoDB database.
          </p>

          {needsMigration ? (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-blue-800 dark:text-blue-200">
                  ✨ Contacts found in browser storage! Click the button below to migrate them to MongoDB.
                </p>
              </div>

              <Button 
                onClick={handleMigration} 
                disabled={migrating}
                variant="primary"
                size="large"
              >
                {migrating ? 'Migrating...' : 'Start Migration'}
              </Button>
            </div>
          ) : (
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-green-800 dark:text-green-200">
                ✅ No migration needed. All your contacts are already in MongoDB!
              </p>
            </div>
          )}

          {result && (
            <div className={`mt-6 p-4 rounded-lg ${
              result.success 
                ? 'bg-green-50 dark:bg-green-900/20' 
                : 'bg-red-50 dark:bg-red-900/20'
            }`}>
              <h3 className={`font-semibold mb-2 ${
                result.success 
                  ? 'text-green-800 dark:text-green-200' 
                  : 'text-red-800 dark:text-red-200'
              }`}>
                {result.success ? '✅ Migration Successful!' : '❌ Migration Failed'}
              </h3>
              <p className={result.success ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}>
                {result.message}
              </p>
              
              {result.details && (
                <div className="mt-4 space-y-1 text-sm">
                  <p>• Total contacts found: {result.details.totalFound}</p>
                  <p>• Already in database: {result.details.alreadyExisted}</p>
                  <p>• Successfully migrated: {result.details.migrated}</p>
                  {result.details.failed > 0 && (
                    <p>• Failed: {result.details.failed}</p>
                  )}
                  
                  {result.details.errors && result.details.errors.length > 0 && (
                    <div className="mt-2">
                      <p className="font-semibold">Errors:</p>
                      <ul className="list-disc list-inside">
                        {result.details.errors.map((error: string, index: number) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4">About MongoDB Integration</h2>
          <div className="space-y-3 text-gray-600 dark:text-gray-400">
            <p>
              Your contacts are now stored in MongoDB Atlas, providing:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Persistent storage across devices</li>
              <li>Better performance for large contact lists</li>
              <li>Advanced search and filtering capabilities</li>
              <li>Automatic backups and data recovery</li>
              <li>Scalability for thousands of contacts</li>
            </ul>
            
            <div className="mt-6 flex gap-4">
              <Link href="/search" className="text-blue-600 dark:text-blue-400 hover:underline">
                Go to Contacts →
              </Link>
              <Link href="/test-db" className="text-blue-600 dark:text-blue-400 hover:underline">
                Test Database Connection →
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
