'use client';

import { useState, useRef } from 'react';

export default function ImportExportPage() {
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importStatus, setImportStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [importMessage, setImportMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImportFile(file);
      setImportStatus('idle');
      setImportMessage('');
    }
  };

  const handleImport = async () => {
    if (!importFile) return;

    setImportStatus('processing');
    setImportMessage('Processing your file...');

    // Simulate import process
    setTimeout(() => {
      setImportStatus('success');
      setImportMessage('Successfully imported 45 contacts!');
      setImportFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }, 2000);
  };

  const handleExport = async (format: 'csv' | 'json') => {
    // Simulate export
    const filename = `contacts_export_${new Date().toISOString().split('T')[0]}.${format}`;
    
    // Mock data for demonstration
    const mockData = format === 'csv' 
      ? 'Name,Email,Phone,Company\nJohn Doe,john@example.com,123-456-7890,Acme Corp'
      : JSON.stringify([{ name: 'John Doe', email: 'john@example.com' }], null, 2);
    
    const blob = new Blob([mockData], { type: format === 'csv' ? 'text/csv' : 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Import & Export</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Transfer your contacts in and out of Contact Manager
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Import Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Import Contacts</h2>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Upload a CSV or JSON file containing your contacts. We'll automatically map the fields.
                </p>
                
                {/* File Upload Area */}
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv,.json"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-gray-600 dark:text-gray-400">
                      {importFile ? (
                        <span className="font-medium">{importFile.name}</span>
                      ) : (
                        <>
                          <span className="font-medium text-blue-600 dark:text-blue-400 hover:underline">Click to upload</span> or drag and drop
                        </>
                      )}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">CSV or JSON up to 10MB</p>
                  </label>
                </div>

                {/* Import Status */}
                {importStatus !== 'idle' && (
                  <div className={`mt-4 p-4 rounded-lg ${
                    importStatus === 'success' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                    importStatus === 'error' ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' :
                    'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                  }`}>
                    {importStatus === 'processing' && (
                      <div className="flex items-center">
                        <svg className="animate-spin h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {importMessage}
                      </div>
                    )}
                    {importStatus !== 'processing' && importMessage}
                  </div>
                )}

                {/* Import Button */}
                <button
                  onClick={handleImport}
                  disabled={!importFile || importStatus === 'processing'}
                  className="mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 dark:disabled:bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 disabled:cursor-not-allowed"
                >
                  {importStatus === 'processing' ? 'Importing...' : 'Import Contacts'}
                </button>
              </div>

              {/* Sample Files */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Need a template?</p>
                <div className="flex gap-3">
                  <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                    Download CSV template
                  </button>
                  <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                    Download JSON template
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Export Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Export Contacts</h2>
            </div>

            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                Download all your contacts in your preferred format. Your data is always yours.
              </p>

              {/* Export Options */}
              <div className="space-y-3">
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">CSV Format</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Compatible with Excel, Google Sheets, and most applications
                      </p>
                    </div>
                    <button
                      onClick={() => handleExport('csv')}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Export
                    </button>
                  </div>
                </div>

                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">JSON Format</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Perfect for developers and advanced integrations
                      </p>
                    </div>
                    <button
                      onClick={() => handleExport('json')}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Export
                    </button>
                  </div>
                </div>
              </div>

              {/* Export Stats */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Export Summary</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Total contacts:</span>
                    <span className="font-medium text-gray-900 dark:text-white">156</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">With phone numbers:</span>
                    <span className="font-medium text-gray-900 dark:text-white">143</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">With companies:</span>
                    <span className="font-medium text-gray-900 dark:text-white">87</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">💡 Pro Tips</h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Your CSV file should include headers in the first row</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>We automatically detect and skip duplicate contacts during import</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Exports include all contact fields including custom fields and tags</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}