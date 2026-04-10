'use client';

import { useState, useEffect, useRef } from 'react';

interface SearchFilters {
  searchTerm: string;
  category: string;
  tags: string[];
  isFavorite: boolean | null;
  sortBy: 'name' | 'date' | 'company';
  sortOrder: 'asc' | 'desc';
}

interface AdvancedSearchProps {
  onSearch: (filters: SearchFilters) => void;
  availableTags?: string[];
}

export default function AdvancedSearch({ onSearch, availableTags = [] }: AdvancedSearchProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    searchTerm: '',
    category: 'all',
    tags: [],
    isFavorite: null,
    sortBy: 'name',
    sortOrder: 'asc'
  });

  const searchRef = useRef<HTMLDivElement>(null);

  // Sample tags if none provided
  const defaultTags = ['VIP', 'Client', 'Supplier', 'Partner', 'Lead', 'Inactive'];
  const tags = availableTags.length > 0 ? availableTags : defaultTags;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = () => {
    onSearch(filters);
    setIsExpanded(false);
  };

  const handleReset = () => {
    const resetFilters = {
      searchTerm: '',
      category: 'all',
      tags: [],
      isFavorite: null,
      sortBy: 'name' as const,
      sortOrder: 'asc' as const
    };
    setFilters(resetFilters);
    onSearch(resetFilters);
  };

  const toggleTag = (tag: string) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const activeFiltersCount = 
    (filters.category !== 'all' ? 1 : 0) +
    filters.tags.length +
    (filters.isFavorite !== null ? 1 : 0) +
    (filters.sortBy !== 'name' || filters.sortOrder !== 'asc' ? 1 : 0);

  return (
    <div ref={searchRef} className="relative mb-8">
      {/* Main Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search contacts by name, email, company..."
          value={filters.searchTerm}
          onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          className="w-full px-6 py-4 pl-14 pr-32 text-lg border-2 border-gray-200 dark:border-gray-700 rounded-2xl 
                   focus:outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 focus:border-blue-500 
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200"
        />
        <svg className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        
        {/* Filter Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`absolute right-20 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-all duration-200
                     ${isExpanded ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' : 
                     'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          {activeFiltersCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </button>
        
        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 
                   text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-semibold 
                   shadow-lg hover:shadow-xl"
        >
          Search
        </button>
      </div>

      {/* Advanced Filters Panel */}
      <div className={`absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl 
                      border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 z-20
                      ${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <div className="p-6">
          {/* Category Filter */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Category</label>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {['all', 'personal', 'work', 'family', 'friend', 'other'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilters(prev => ({ ...prev, category: cat }))}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 capitalize
                            ${filters.category === cat 
                              ? 'bg-blue-500 text-white shadow-md' 
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Tags Filter */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Tags</label>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                            ${filters.tags.includes(tag)
                              ? 'bg-purple-500 text-white shadow-md' 
                              : 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800'}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Additional Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Favorites Only */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Favorites</label>
              <select
                value={filters.isFavorite === null ? 'all' : filters.isFavorite ? 'yes' : 'no'}
                onChange={(e) => setFilters(prev => ({ 
                  ...prev, 
                  isFavorite: e.target.value === 'all' ? null : e.target.value === 'yes' 
                }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Contacts</option>
                <option value="yes">Favorites Only</option>
                <option value="no">Non-Favorites</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Sort By</label>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="name">Name</option>
                <option value="date">Date Added</option>
                <option value="company">Company</option>
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Order</label>
              <select
                value={filters.sortOrder}
                onChange={(e) => setFilters(prev => ({ ...prev, sortOrder: e.target.value as any }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleReset}
              className="px-5 py-2.5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white 
                       font-medium transition-colors duration-200"
            >
              Reset Filters
            </button>
            <div className="flex gap-3">
              <button
                onClick={() => setIsExpanded(false)}
                className="px-5 py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 
                         rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSearch}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg 
                         font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 
                         shadow-md hover:shadow-lg"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}