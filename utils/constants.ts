// Application constants

export const CONTACT_CATEGORIES = [
  { value: 'personal', label: 'Personal', color: 'blue' },
  { value: 'work', label: 'Work', color: 'purple' },
  { value: 'family', label: 'Family', color: 'pink' },
  { value: 'friend', label: 'Friend', color: 'green' },
  { value: 'other', label: 'Other', color: 'gray' }
] as const;

export const DEFAULT_TAGS = [
  'VIP',
  'Client',
  'Supplier',
  'Partner',
  'Lead',
  'Inactive',
  'Friend',
  'Family'
] as const;

export const SORT_OPTIONS = [
  { value: 'name', label: 'Name' },
  { value: 'date', label: 'Date Added' },
  { value: 'company', label: 'Company' }
] as const;

export const SORT_ORDER_OPTIONS = [
  { value: 'asc', label: 'Ascending' },
  { value: 'desc', label: 'Descending' }
] as const;

export const CATEGORY_COLORS = {
  personal: 'from-blue-400 to-blue-600',
  work: 'from-purple-400 to-purple-600',
  family: 'from-pink-400 to-pink-600',
  friend: 'from-green-400 to-green-600',
  other: 'from-gray-400 to-gray-600'
} as const;

export const CATEGORY_BG_COLORS = {
  personal: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  work: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
  family: 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300',
  friend: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  other: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
} as const;

export const ACTIVITY_ICONS = {
  added: {
    color: 'text-green-500',
    path: 'M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  edited: {
    color: 'text-yellow-500',
    path: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
  },
  deleted: {
    color: 'text-red-500',
    path: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
  }
} as const;

export const LOCAL_STORAGE_KEYS = {
  CONTACTS: 'contacts',
  THEME: 'theme',
  USER_SETTINGS: 'userSettings'
} as const;