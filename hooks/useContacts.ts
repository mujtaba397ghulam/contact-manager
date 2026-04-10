// Custom hook for managing contacts with MongoDB integration

import { useState, useEffect, useCallback } from 'react';
import { Contact, SearchFilters } from '@/types';
import { filterContacts } from '@/utils/helpers';

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Load contacts from MongoDB on mount
  useEffect(() => {
    fetchContacts();
  }, []);
  
  // Fetch contacts from API
  const fetchContacts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/contacts?limit=1000');
      const result = await response.json();
      
      if (result.success) {
        // Convert MongoDB _id to id for compatibility
        const contactsWithId = result.data.map((contact: any) => ({
          ...contact,
          id: contact._id,
        }));
        setContacts(contactsWithId);
        setFilteredContacts(contactsWithId);
      } else {
        setError(result.error || 'Failed to fetch contacts');
      }
    } catch (err) {
      console.error('Error fetching contacts:', err);
      setError('Failed to connect to server');
      // Fallback to empty array if API fails
      setContacts([]);
      setFilteredContacts([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Add or update contact
  const saveContact = useCallback(async (contact: Contact) => {
    try {
      setError(null);
      
      if (contact.id && contact.id !== 'new') {
        // Update existing contact
        const response = await fetch(`/api/contacts/${contact.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(contact)
        });
        
        const result = await response.json();
        if (result.success) {
          // Update local state immediately for better UX
          setContacts(prev => {
            const updated = prev.map(c => 
              c.id === contact.id ? { ...result.data, id: result.data._id } : c
            );
            return updated;
          });
        } else {
          throw new Error(result.error);
        }
      } else {
        // Create new contact
        const { id, ...contactData } = contact; // Remove id for new contacts
        const response = await fetch('/api/contacts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(contactData)
        });
        
        const result = await response.json();
        if (result.success) {
          // Add to local state immediately
          const newContact = { ...result.data, id: result.data._id };
          setContacts(prev => [...prev, newContact]);
        } else {
          throw new Error(result.error);
        }
      }
    } catch (err: any) {
      console.error('Error saving contact:', err);
      setError(err.message || 'Failed to save contact');
      throw err; // Re-throw to handle in UI
    }
  }, []);
  
  // Delete contact
  const deleteContact = useCallback(async (id: string | number) => {
    try {
      setError(null);
      
      const response = await fetch(`/api/contacts/${id}`, {
        method: 'DELETE'
      });
      
      const result = await response.json();
      if (result.success) {
        // Remove from local state immediately
        setContacts(prev => prev.filter(c => c.id !== id));
      } else {
        throw new Error(result.error);
      }
    } catch (err: any) {
      console.error('Error deleting contact:', err);
      setError(err.message || 'Failed to delete contact');
      throw err;
    }
  }, []);
  
  // Toggle favorite
  const toggleFavorite = useCallback(async (id: string | number) => {
    try {
      setError(null);
      
      // Find current contact to get its favorite status
      const contact = contacts.find(c => c.id === id);
      if (!contact) return;
      
      const response = await fetch(`/api/contacts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFavorite: !contact.isFavorite })
      });
      
      const result = await response.json();
      if (result.success) {
        // Update local state immediately
        setContacts(prev => prev.map(c => 
          c.id === id 
            ? { ...c, isFavorite: !c.isFavorite }
            : c
        ));
      } else {
        throw new Error(result.error);
      }
    } catch (err: any) {
      console.error('Error toggling favorite:', err);
      setError(err.message || 'Failed to update favorite status');
      throw err;
    }
  }, [contacts]);
  
  // Apply filters (client-side for better performance)
  const applyFilters = useCallback((filters: SearchFilters) => {
    const filtered = filterContacts(contacts, filters);
    setFilteredContacts(filtered);
  }, [contacts]);
  
  // Get statistics
  const getStats = useCallback(() => {
    return {
      total: contacts.length,
      favorites: contacts.filter(c => c.isFavorite).length,
      byCategory: contacts.reduce((acc, contact) => {
        acc[contact.category] = (acc[contact.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      uniqueTags: [...new Set(contacts.flatMap(c => c.tags || []))].length
    };
  }, [contacts]);
  
  // Refresh contacts from database
  const refreshContacts = useCallback(() => {
    fetchContacts();
  }, []);
  
  return {
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
  };
}
