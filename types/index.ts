// Type definitions for the Contact Manager application

export interface Contact {
  id: string | number;
  name: string;
  email: string;
  phone: string;
  company?: string;
  jobTitle?: string;
  birthday?: Date | string;
  address?: Address;
  website?: string;
  socialMedia?: SocialMedia;
  tags: string[];
  category: ContactCategory;
  isFavorite: boolean;
  notes?: string;
  avatar?: string;
  lastContactedAt?: Date | string;
  customFields?: CustomField[];
  createdAt: string;
  updatedAt?: string;
}

export interface Address {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
}

export interface SocialMedia {
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
}

export interface CustomField {
  label: string;
  value: string;
}

export type ContactCategory = 'personal' | 'work' | 'family' | 'friend' | 'other';

export interface SearchFilters {
  searchTerm: string;
  category: string;
  tags: string[];
  isFavorite: boolean | null;
  sortBy: 'name' | 'date' | 'company';
  sortOrder: 'asc' | 'desc';
}

export interface DashboardStats {
  totalContacts: number;
  favoriteContacts: number;
  recentContacts: number;
  contactsByCategory: Record<string, number>;
  recentActivities: Activity[];
}

export interface Activity {
  id: string;
  type: 'added' | 'edited' | 'deleted';
  contactName: string;
  timestamp: Date;
}

export interface NotificationSettings {
  email: boolean;
  browser: boolean;
  birthday: boolean;
  weekly: boolean;
}

export interface PrivacySettings {
  shareAnalytics: boolean;
  publicProfile: boolean;
  showEmail: boolean;
}