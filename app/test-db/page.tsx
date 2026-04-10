'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function TestDbPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [data, setData] = useState<any>(null);

  const testConnection = async () => {
    setStatus('loading');
    setMessage('Testing database connection...');
    setData(null);

    try {
      // Test fetching contacts
      const response = await fetch('/api/contacts?limit=5');
      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setMessage(`✅ Database connected! Found ${result.pagination.totalCount} contacts.`);
        setData(result);
      } else {
        setStatus('error');
        setMessage(`❌ Database error: ${result.error}`);
      }
    } catch (error: any) {
      setStatus('error');
      setMessage(`❌ Connection failed: ${error.message}`);
    }
  };

  const createTestContact = async () => {
    setStatus('loading');
    setMessage('Creating test contact...');

    try {
      const testContact = {
        name: 'Test Contact',
        email: `test${Date.now()}@example.com`,
        phone: '+1234567890',
        company: 'Test Company',
        category: 'work',
        tags: ['test', 'demo'],
        isFavorite: true,
        notes: 'This is a test contact created to verify MongoDB integration'
      };

      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testContact)
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setMessage('✅ Test contact created successfully!');
        setData(result);
      } else {
        setStatus('error');
        setMessage(`❌ Failed to create contact: ${result.error}`);
      }
    } catch (error: any) {
      setStatus('error');
      setMessage(`❌ Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">MongoDB Connection Test</h1>

        <Card className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Database Status</h2>
          
          <div className="space-y-4">
            <div className="flex gap-4">
              <Button onClick={testConnection} disabled={status === 'loading'}>
                Test Connection
              </Button>
              <Button onClick={createTestContact} disabled={status === 'loading'} variant="secondary">
                Create Test Contact
              </Button>
            </div>

            {message && (
              <div className={`p-4 rounded-lg ${
                status === 'success' ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200' :
                status === 'error' ? 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200' :
                'bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200'
              }`}>
                {message}
              </div>
            )}

            {data && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Response Data:</h3>
                <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto text-sm">
                  {JSON.stringify(data, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4">Connection Information</h2>
          <div className="space-y-2 text-gray-600 dark:text-gray-400">
            <p>• MongoDB Atlas is configured in your environment variables</p>
            <p>• Database name: contact-manager</p>
            <p>• Collection: contacts</p>
            <p>• All contact data is now stored in MongoDB instead of localStorage</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
