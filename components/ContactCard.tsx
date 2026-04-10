// Contact card component

import { Contact } from '@/types';
import { CATEGORY_BG_COLORS } from '@/utils/constants';
import { formatPhoneNumber, getInitials } from '@/utils/helpers';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';

interface ContactCardProps {
  contact: Contact;
  onEdit: () => void;
  onDelete: () => void;
  onToggleFavorite: () => void;
}

export default function ContactCard({ 
  contact, 
  onEdit, 
  onDelete, 
  onToggleFavorite 
}: ContactCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 md:p-6 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        {/* Contact Info */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h4 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
              {contact.name}
              {contact.isFavorite && <span className="text-yellow-500">⭐</span>}
            </h4>
            <button
              onClick={onToggleFavorite}
              className={`p-2 rounded-lg transition-colors ${
                contact.isFavorite 
                  ? 'text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900' 
                  : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              aria-label={contact.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Icon name="star" />
            </button>
          </div>
          
          {/* Contact Details */}
          <div className="space-y-1 mb-3">
            <ContactDetail 
              icon={<Icon name="email" size="small" className="text-blue-500" />}
              href={`mailto:${contact.email}`}
              text={contact.email}
            />
            <ContactDetail 
              icon={<Icon name="phone" size="small" className="text-green-500" />}
              href={`tel:${contact.phone}`}
              text={formatPhoneNumber(contact.phone)}
            />
            {contact.company && (
              <ContactDetail 
                icon={<Icon name="company" size="small" className="text-purple-500" />}
                text={contact.company}
              />
            )}
          </div>
          
          {/* Tags and Category */}
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge variant="primary" size="small">
              {contact.category}
            </Badge>
            {contact.tags?.map((tag, idx) => (
              <Badge key={idx} variant="secondary" size="small">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2 justify-end">
          <Button 
            variant="warning" 
            size="small" 
            onClick={onEdit}
            aria-label="Edit contact"
          >
            <Icon name="edit" size="small" />
            Edit
          </Button>
          <Button 
            variant="danger" 
            size="small" 
            onClick={onDelete}
            aria-label="Delete contact"
          >
            <Icon name="delete" size="small" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

// Helper component for contact details
function ContactDetail({ 
  icon, 
  href, 
  text 
}: { 
  icon: React.ReactNode; 
  href?: string; 
  text: string 
}) {
  const content = (
    <>
      {icon}
      <span className="break-all">{text}</span>
    </>
  );
  
  if (href) {
    return (
      <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 flex items-center">
        <a href={href} className="hover:text-blue-600 transition-colors flex items-center gap-2">
          {content}
        </a>
      </p>
    );
  }
  
  return (
    <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 flex items-center gap-2">
      {content}
    </p>
  );
}