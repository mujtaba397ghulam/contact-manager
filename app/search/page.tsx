'use client';

import { useState, useEffect } from 'react';
import { Contact, SearchFilters } from '@/types';
import { useContacts } from '@/hooks/useContacts';
import { DEFAULT_TAGS, CONTACT_CATEGORIES, SORT_OPTIONS, SORT_ORDER_OPTIONS } from '@/utils/constants';
import ContactCard from '@/components/ContactCard';
import ContactFormClean from '@/components/ContactFormClean';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import EmptyState from '@/components/ui/EmptyState';
import Loading from '@/components/ui/Loading';
import Icon from '@/components/ui/Icon';

export default function SearchPage() {
  const {
    contacts,
    filteredContacts,
    isLoading,
    error,
    saveContact,
    deleteContact,
    toggleFavorite,
    applyFilters,
    getStats,
    refreshContacts
  } = useContacts();

  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [filters, setFilters] = useState<SearchFilters>({
    searchTerm: '',
    category: 'all',
    tags: [],
    isFavorite: null,
    sortBy: 'name',
    sortOrder: 'asc'
  });

  const stats = getStats();

  // Apply filters whenever they change
  useEffect(() => {
    applyFilters(filters);
  }, [filters, applyFilters]);

  // Handle form submission
  const handleSaveContact = async (contact: Contact) => {
    try {
      await saveContact(contact);
      setEditingContact(null);
      setShowForm(false);
    } catch (err) {
      // Error is handled in the hook, just keep the form open
      console.error('Failed to save contact:', err);
    }
  };

  // Handle edit
  const handleEdit = (contact: Contact) => {
    setEditingContact(contact);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle delete
  const handleDelete = async (contact: Contact) => {
    if (confirm(`Are you sure you want to delete ${contact.name}?`)) {
      try {
        await deleteContact(contact.id);
      } catch (err) {
        console.error('Failed to delete contact:', err);
      }
    }
  };

  // Filter handlers
  const updateFilter = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleTag = (tag: string) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const resetFilters = () => {
    setFilters({
      searchTerm: '',
      category: 'all',
      tags: [],
      isFavorite: null,
      sortBy: 'name',
      sortOrder: 'asc'
    });
  };

  const activeFiltersCount = 
    (filters.category !== 'all' ? 1 : 0) +
    filters.tags.length +
    (filters.isFavorite !== null ? 1 : 0) +
    (filters.searchTerm ? 1 : 0);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading text="Loading contacts..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Error Alert */}
        {error && (
          <div className="mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-red-800 dark:text-red-200">{error}</span>
            </div>
            <button
              onClick={refreshContacts}
              className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 font-medium"
            >
              Retry
            </button>
          </div>
        )}
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Advanced Search</h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Find, filter, and manage all your contacts with powerful search tools
              </p>
            </div>
            <Button
              variant="primary"
              size="medium"
              onClick={() => {
                setShowForm(true);
                setEditingContact(null);
              }}
            >
              <Icon name="add" />
              Add Contact
            </Button>
          </div>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="mb-8">
            <ContactFormClean
              initialData={editingContact || undefined}
              onSubmit={handleSaveContact}
              onCancel={() => {
                setEditingContact(null);
                setShowForm(false);
              }}
            />
          </div>
        )}

        {/* Search and Filters */}
        <Card className="mb-8">
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name, email, phone, or company..."
                value={filters.searchTerm}
                onChange={(e) => updateFilter('searchTerm', e.target.value)}
                className="w-full px-6 py-4 pl-14 pr-4 text-lg border-2 border-gray-200 dark:border-gray-700 rounded-xl 
                         focus:outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 focus:border-blue-500 
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200"
              />
              <Icon name="search" size="large" className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            {/* Filter Options */}
            <div className="space-y-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Category
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => updateFilter('category', 'all')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 
                              ${filters.category === 'all' 
                                ? 'bg-blue-500 text-white shadow-md' 
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                  >
                    All
                  </button>
                  {CONTACT_CATEGORIES.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => updateFilter('category', cat.value)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 capitalize
                                ${filters.category === cat.value 
                                  ? 'bg-blue-500 text-white shadow-md' 
                                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tags Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Tags
                </label>
                <div className="flex flex-wrap gap-2">
                  {DEFAULT_TAGS.map((tag) => (
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Favorites Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Favorites
                  </label>
                  <select
                    value={filters.isFavorite === null ? 'all' : filters.isFavorite ? 'yes' : 'no'}
                    onChange={(e) => updateFilter('isFavorite', 
                      e.target.value === 'all' ? null : e.target.value === 'yes'
                    )}
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
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Sort By
                  </label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => updateFilter('sortBy', e.target.value as any)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {SORT_OPTIONS.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort Order */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Order
                  </label>
                  <select
                    value={filters.sortOrder}
                    onChange={(e) => updateFilter('sortOrder', e.target.value as any)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {SORT_ORDER_OPTIONS.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Filter Summary and Reset */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {activeFiltersCount > 0 && (
                    <span>{activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} active</span>
                  )}
                  {filteredContacts.length !== contacts.length && (
                    <span className="ml-2">
                      • Showing {filteredContacts.length} of {contacts.length} contacts
                    </span>
                  )}
                </p>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={resetFilters}
                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card padding="small">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
            </div>
          </Card>
          <Card padding="small">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.favorites}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Favorites</p>
            </div>
          </Card>
          <Card padding="small">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.uniqueTags}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Tags</p>
            </div>
          </Card>
          <Card padding="small">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {Object.keys(stats.byCategory).length}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Categories</p>
            </div>
          </Card>
        </div>

        {/* Contacts List */}
        {filteredContacts.length > 0 ? (
          <div className="space-y-4">
            {filteredContacts.map((contact) => (
              <ContactCard
                key={contact.id}
                contact={contact}
                onEdit={() => handleEdit(contact)}
                onDelete={() => handleDelete(contact)}
                onToggleFavorite={() => toggleFavorite(contact.id)}
              />
            ))}
          </div>
        ) : (
          <Card>
            <EmptyState
              icon={
                <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
              title={contacts.length === 0 ? "No contacts yet" : "No contacts match your filters"}
              description={
                contacts.length === 0 
                  ? "Add your first contact to get started" 
                  : "Try adjusting your search criteria"
              }
              action={
                contacts.length === 0 
                  ? {
                      label: 'Add Contact',
                      onClick: () => setShowForm(true)
                    }
                  : {
                      label: 'Reset Filters',
                      onClick: resetFilters
                    }
              }
            />
          </Card>
        )}
      </div>
    </div>
  );
}