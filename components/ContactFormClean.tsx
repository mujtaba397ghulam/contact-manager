// Clean contact form component

import { useState } from 'react';
import { Contact, ContactCategory } from '@/types';
import { CONTACT_CATEGORIES, DEFAULT_TAGS } from '@/utils/constants';
import { generateContactId } from '@/utils/helpers';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Icon from '@/components/ui/Icon';

interface ContactFormProps {
  initialData?: Partial<Contact>;
  onSubmit: (contact: Contact) => void;
  onCancel?: () => void;
}

export default function ContactForm({ 
  initialData, 
  onSubmit, 
  onCancel 
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    company: initialData?.company || '',
    category: initialData?.category || 'personal' as ContactCategory,
    tags: initialData?.tags || [] as string[],
    isFavorite: initialData?.isFavorite || false
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const isEditMode = !!initialData?.id;
  
  // Handle form field changes
  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };
  
  // Toggle tag selection
  const toggleTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };
  
  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const contact: Contact = {
      id: initialData?.id || 'new', // Use 'new' for new contacts, MongoDB will generate the real ID
      ...formData,
      createdAt: initialData?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    onSubmit(contact);
  };
  
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
          {isEditMode ? (
            <>
              <Icon name="edit" /> Edit Contact
            </>
          ) : (
            <>
              <Icon name="add" /> Add New Contact
            </>
          )}
        </h3>
        
        <div className="space-y-5">
          {/* Basic Fields */}
          <div className="grid md:grid-cols-2 gap-5">
            <Input
              label="Name *"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              error={errors.name}
              required
            />
            <Input
              label="Email *"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              error={errors.email}
              required
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-5">
            <Input
              label="Phone *"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              error={errors.phone}
              required
            />
            <Input
              label="Company"
              placeholder="Acme Corp"
              value={formData.company}
              onChange={(e) => handleChange('company', e.target.value)}
            />
          </div>
          
          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
              {CONTACT_CATEGORIES.map(cat => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => handleChange('category', cat.value)}
                  className={`
                    px-4 py-2 rounded-lg font-medium transition-all duration-200 capitalize
                    ${formData.category === cat.value 
                      ? 'bg-blue-500 text-white shadow-md' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }
                  `}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Tags Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {DEFAULT_TAGS.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`
                    px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                    ${formData.tags.includes(tag)
                      ? 'bg-purple-500 text-white shadow-md' 
                      : 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800'
                    }
                  `}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          
          {/* Favorite Toggle */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="favorite"
              checked={formData.isFavorite}
              onChange={(e) => handleChange('isFavorite', e.target.checked)}
              className="w-4 h-4 text-yellow-600 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500 focus:ring-2"
            />
            <label htmlFor="favorite" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              ⭐ Mark as favorite
            </label>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button type="submit" variant="primary" size="large" fullWidth>
              {isEditMode ? 'Update Contact' : 'Add Contact'}
            </Button>
            {onCancel && (
              <Button 
                type="button" 
                variant="secondary" 
                size="large" 
                fullWidth 
                onClick={onCancel}
              >
                Cancel
              </Button>
            )}
          </div>
        </div>
      </form>
    </Card>
  );
}