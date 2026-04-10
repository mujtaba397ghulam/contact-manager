'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useContacts } from '@/hooks/useContacts';
import { isMigrationNeeded } from '@/utils/migration';
import Icon from '@/components/ui/Icon';

export default function HomePage() {
  const { getStats } = useContacts();
  const stats = getStats();
  const [showMigrationNotice, setShowMigrationNotice] = useState(false);
  
  useEffect(() => {
    // Check if migration is needed
    setShowMigrationNotice(isMigrationNeeded());
  }, []);
  
  return (
    <div className="animate-fade-in">
      {/* Migration Notice */}
      {showMigrationNotice && (
        <div className="bg-blue-600 text-white py-3 px-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <p className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              You have contacts in browser storage. Migrate them to MongoDB for better features!
            </p>
            <Link 
              href="/migrate" 
              className="bg-white text-blue-600 px-4 py-1 rounded-md font-medium hover:bg-blue-50 transition-colors"
            >
              Migrate Now
            </Link>
          </div>
        </div>
      )}
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Features Section */}
      <FeaturesSection />
      
      {/* Advanced Search Section */}
      <section id="advanced-search" className="py-20 bg-gradient-to-b from-white to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">
            Advanced Contact Search
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-10 text-lg">
            Find, filter, and manage your contacts with powerful search capabilities
          </p>
          
          <div className="space-y-6">
            <Link 
              href="/search" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Icon name="search" className="inline mr-2" />
              Open Advanced Search
            </Link>
            
            <div className="grid md:grid-cols-3 gap-4 mt-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Smart Filters</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Filter by categories, tags, and favorites</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Quick Sort</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Sort by name, date, or company</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Bulk Actions</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Manage multiple contacts at once</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <StatsSection stats={stats} />
    </div>
  );
}

// Hero Section Component
function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-48 md:w-72 h-48 md:h-72 bg-white/10 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-white/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      </div>
      
      <div className="relative max-w-6xl mx-auto px-4 text-center">
        <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-6">
          <span>Professional Contact Management</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slide-in">
          Contact Manager <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">Pro</span>
        </h1>
        <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-2xl mx-auto">
          The most efficient way to manage your professional network
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/search" className="btn-hero">
            Get Started
          </Link>
          <Link href="/dashboard" className="btn-hero-secondary">
            View Dashboard
          </Link>
        </div>
      </div>
    </section>
  );
}

// Features Section Component
function FeaturesSection() {
  const features = [
    {
      icon: <Icon name="search" size="large" />,
      title: 'Advanced Search',
      description: 'Powerful search with multiple filters and sorting options',
      link: '/search',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Analytics Dashboard',
      description: 'Visual insights and statistics about your contacts',
      link: '/dashboard',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ),
      title: 'Tags & Categories',
      description: 'Organize contacts with custom tags and predefined categories',
      link: '/search',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: <Icon name="star" size="large" />,
      title: 'Favorites',
      description: 'Mark important contacts and access them quickly',
      link: '/search',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      ),
      title: 'Import & Export',
      description: 'Transfer contacts with CSV and JSON support',
      link: '/import',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Settings',
      description: 'Customize your experience and preferences',
      link: '/settings',
      color: 'from-gray-600 to-gray-800'
    }
  ];
  
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-800 dark:text-white">
          Powerful Features
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg">
          Everything you need for professional contact management
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Link
              key={index}
              href={feature.link}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 hover:-translate-y-2 overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.color} opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity`}></div>
              <div className="relative">
                <div className="mb-6 text-gray-700 dark:text-gray-300">{feature.icon}</div>
                <h3 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
                <div className="mt-4 text-blue-600 dark:text-blue-400 font-medium group-hover:translate-x-2 transition-transform duration-300">
                  Learn more →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// Stats Section Component
function StatsSection({ stats }: { stats: any }) {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold">{stats.total}</p>
            <p className="text-blue-100 mt-1">Total Contacts</p>
          </div>
          <div>
            <p className="text-4xl font-bold">{stats.favorites}</p>
            <p className="text-blue-100 mt-1">Favorites</p>
          </div>
          <div>
            <p className="text-4xl font-bold">{stats.uniqueTags}</p>
            <p className="text-blue-100 mt-1">Unique Tags</p>
          </div>
          <div>
            <p className="text-4xl font-bold">{Object.keys(stats.byCategory).length}</p>
            <p className="text-blue-100 mt-1">Categories</p>
          </div>
        </div>
      </div>
    </section>
  );
}