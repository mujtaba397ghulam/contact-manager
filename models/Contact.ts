import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  // Basic Info
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  
  // New Advanced Fields
  jobTitle: {
    type: String,
    trim: true
  },
  birthday: {
    type: Date
  },
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String
  },
  website: {
    type: String,
    trim: true
  },
  socialMedia: {
    linkedin: String,
    twitter: String,
    facebook: String,
    instagram: String
  },
  tags: [{
    type: String,
    trim: true
  }],
  category: {
    type: String,
    enum: ['personal', 'work', 'family', 'friend', 'other'],
    default: 'personal'
  },
  isFavorite: {
    type: Boolean,
    default: false
  },
  notes: {
    type: String
  },
  avatar: {
    type: String // URL or base64
  },
  lastContactedAt: {
    type: Date
  },
  customFields: [{
    label: String,
    value: String
  }],
  
  // Metadata
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp on save
contactSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Add indexes for better search performance
contactSchema.index({ name: 'text', email: 'text', company: 'text', tags: 'text' });
contactSchema.index({ category: 1, isFavorite: 1 });

export default mongoose.models.Contact || mongoose.model('Contact', contactSchema);