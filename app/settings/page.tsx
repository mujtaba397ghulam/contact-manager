'use client';

import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

export default function SettingsPage() {
  const { theme } = useTheme();
  const [notifications, setNotifications] = useState({
    email: true,
    browser: false,
    birthday: true,
    weekly: false
  });
  
  const [privacy, setPrivacy] = useState({
    shareAnalytics: true,
    publicProfile: false,
    showEmail: true
  });

  const handleSave = () => {
    // Save settings to localStorage or API
    localStorage.setItem('userSettings', JSON.stringify({ notifications, privacy }));
    alert('Settings saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Customize your Contact Manager experience
          </p>
        </div>

        <div className="space-y-6">
          {/* Appearance Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Appearance</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Theme</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Choose your preferred color theme</p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
                  <span className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-white">
                    {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Notifications</h2>
            
            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()} Notifications
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {key === 'email' && 'Receive updates via email'}
                      {key === 'browser' && 'Show browser notifications'}
                      {key === 'birthday' && 'Get birthday reminders'}
                      {key === 'weekly' && 'Weekly contact summary'}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => setNotifications({ ...notifications, [key]: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Privacy</h2>
            
            <div className="space-y-4">
              {Object.entries(privacy).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {key === 'shareAnalytics' && 'Share Analytics'}
                      {key === 'publicProfile' && 'Public Profile'}
                      {key === 'showEmail' && 'Show Email'}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {key === 'shareAnalytics' && 'Help improve the app with anonymous usage data'}
                      {key === 'publicProfile' && 'Make your profile visible to other users'}
                      {key === 'showEmail' && 'Display email in your public profile'}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => setPrivacy({ ...privacy, [key]: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Data Management */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Data Management</h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Export All Data</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Download all your contacts and settings in a single file
                </p>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                  Export Data
                </button>
              </div>
              
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
                <h3 className="font-medium text-red-900 dark:text-red-300 mb-2">Delete Account</h3>
                <p className="text-sm text-red-700 dark:text-red-400 mb-3">
                  Permanently delete your account and all associated data
                </p>
                <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-6">
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}