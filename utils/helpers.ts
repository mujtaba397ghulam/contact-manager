// Utility functions for the Contact Manager application

import { Contact, SearchFilters } from '@/types';
import { LOCAL_STORAGE_KEYS } from './constants';

/**
 * Save contacts to localStorage
 */
export function saveContactsToStorage(contacts: Contact[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEYS.CONTACTS, JSON.stringify(contacts));
  } catch (error) {
    console.error('Failed to save contacts to localStorage:', error);
  }
}

/**
 * Load contacts from localStorage
 */
export function loadContactsFromStorage(): Contact[] {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.CONTACTS);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Failed to load contacts from localStorage:', error);
    return [];
  }
}

/**
 * Filter contacts based on search criteria
 */
export function filterContacts(contacts: Contact[], filters: SearchFilters): Contact[] {
  let filtered = [...contacts];
  
  // Apply search term
  if (filters.searchTerm) {
    const searchLower = filters.searchTerm.toLowerCase();
    filtered = filtered.filter(contact =>
      contact.name.toLowerCase().includes(searchLower) ||
      contact.email.toLowerCase().includes(searchLower) ||
      contact.phone.includes(filters.searchTerm) ||
      (contact.company && contact.company.toLowerCase().includes(searchLower))
    );
  }
  
  // Apply category filter
  if (filters.category && filters.category !== 'all') {
    filtered = filtered.filter(contact => contact.category === filters.category);
  }
  
  // Apply tags filter
  if (filters.tags.length > 0) {
    filtered = filtered.filter(contact =>
      filters.tags.some(tag => contact.tags?.includes(tag))
    );
  }
  
  // Apply favorite filter
  if (filters.isFavorite !== null) {
    filtered = filtered.filter(contact => contact.isFavorite === filters.isFavorite);
  }
  
  // Apply sorting
  filtered.sort((a, b) => {
    let compareValue = 0;
    switch (filters.sortBy) {
      case 'name':
        compareValue = a.name.localeCompare(b.name);
        break;
      case 'date':
        compareValue = new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        break;
      case 'company':
        compareValue = (a.company || '').localeCompare(b.company || '');
        break;
    }
    return filters.sortOrder === 'asc' ? compareValue : -compareValue;
  });
  
  return filtered;
}

/**
 * Generate a unique ID for a new contact
 */
export function generateContactId(): string {
  return `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Format phone number for display
 */
export function formatPhoneNumber(phone: string): string {
  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, '');
  
  // Format as (XXX) XXX-XXXX for US numbers
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  
  // Return original if not a standard US number
  return phone;
}

/**
 * Get initials from a name
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Format date for display
 */
export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

/**
 * Get relative time string (e.g., "2 hours ago")
 */
export function getRelativeTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffDays > 0) {
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  } else if (diffHours > 0) {
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  } else if (diffMins > 0) {
    return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  } else {
    return 'just now';
  }
}

/**
 * Export contacts as CSV
 */
export function exportContactsAsCSV(contacts: Contact[]): string {
  const headers = ['Name', 'Email', 'Phone', 'Company', 'Category', 'Tags', 'Favorite'];
  const rows = contacts.map(contact => [
    contact.name,
    contact.email,
    contact.phone,
    contact.company || '',
    contact.category,
    contact.tags.join('; '),
    contact.isFavorite ? 'Yes' : 'No'
  ]);
  
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');
  
  return csvContent;
}

/**
 * Export contacts as JSON
 */
export function exportContactsAsJSON(contacts: Contact[]): string {
  return JSON.stringify(contacts, null, 2);
}

/**
 * Download file utility
 */
export function downloadFile(content: string, filename: string, type: string): void {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}