'use client'

import React, { useState, useEffect } from 'react'
import { useCreateContact, useUpdateContact } from '@/lib/hooks/useApi'

interface ContactFormProps {
  contact?: any
  onSuccess?: () => void
  onCancel?: () => void
}

export default function ContactForm({ contact, onSuccess, onCancel }: ContactFormProps) {
  const createApi = useCreateContact()
  const updateApi = useUpdateContact()
  const isEditMode = !!contact

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    notes: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (contact) {
      setFormData({
        name: contact.name || '',
        email: contact.email || '',
        phone: contact.phone || '',
        company: contact.company || '',
        notes: contact.notes || ''
      })
    }
  }, [contact])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      phone: true,
      company: true,
      notes: true
    })

    if (!validateForm()) {
      // Shake animation for form
      const form = e.currentTarget
      form.classList.add('animate-shake')
      setTimeout(() => form.classList.remove('animate-shake'), 500)
      return
    }

    try {
      if (isEditMode) {
        await updateApi.callApi(`/api/contacts/${contact._id}`, 'PUT', formData)
      } else {
        await createApi.callApi('/api/contacts', 'POST', formData)
      }

      // Success animation
      const form = e.currentTarget
      form.classList.add('animate-pulse')
      setTimeout(() => {
        form.classList.remove('animate-pulse')
        
        // Reset form if creating new contact
        if (!isEditMode) {
          setFormData({
            name: '',
            email: '',
            phone: '',
            company: '',
            notes: ''
          })
          setTouched({})
        }

        if (onSuccess) {
          onSuccess()
        }
      }, 600)
    } catch (error) {
      console.error('Failed to save contact:', error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error for this field when user starts typing
    if (errors[name] && touched[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleBlur = (fieldName: string) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }))
    validateForm()
  }

  const loading = createApi.loading || updateApi.loading
  const apiError = createApi.error || updateApi.error

  return (
    <form 
      onSubmit={handleSubmit} 
      className="max-w-2xl mx-auto p-8 bg-white rounded-3xl shadow-2xl transform hover:shadow-3xl transition-all duration-300"
    >
      <div className="flex items-center mb-8">
        <div className="mr-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center transform rotate-3 hover:rotate-6 transition-transform duration-300">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isEditMode ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              )}
            </svg>
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            {isEditMode ? 'Edit Contact' : 'New Contact'}
          </h2>
          <p className="text-gray-500 mt-1">
            {isEditMode ? 'Update contact information' : 'Add a new contact to your list'}
          </p>
        </div>
      </div>

      {apiError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center animate-slideInUp">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {apiError}
        </div>
      )}

      <div className="space-y-6">
        {/* Name Field */}
        <div className="group">
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={() => handleBlur('name')}
              className={`w-full px-4 py-3 pl-12 border-2 rounded-xl shadow-sm transition-all duration-200 
                ${errors.name && touched.name 
                  ? 'border-red-400 focus:ring-red-100 focus:border-red-500' 
                  : 'border-gray-200 focus:ring-blue-100 focus:border-blue-500 hover:border-gray-300'
                } focus:outline-none focus:ring-4`}
              placeholder="John Doe"
            />
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          {errors.name && touched.name && (
            <p className="mt-2 text-sm text-red-600 flex items-center animate-slideInUp">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.name}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="group">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={() => handleBlur('email')}
              className={`w-full px-4 py-3 pl-12 border-2 rounded-xl shadow-sm transition-all duration-200 
                ${errors.email && touched.email 
                  ? 'border-red-400 focus:ring-red-100 focus:border-red-500' 
                  : 'border-gray-200 focus:ring-blue-100 focus:border-blue-500 hover:border-gray-300'
                } focus:outline-none focus:ring-4`}
              placeholder="john@example.com"
            />
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          {errors.email && touched.email && (
            <p className="mt-2 text-sm text-red-600 flex items-center animate-slideInUp">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone Field */}
        <div className="group">
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
            Phone Number
          </label>
          <div className="relative">
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 hover:border-gray-300 transition-all duration-200"
              placeholder="+1 (555) 123-4567"
            />
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
        </div>

        {/* Company Field */}
        <div className="group">
          <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
            Company
          </label>
          <div className="relative">
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 hover:border-gray-300 transition-all duration-200"
              placeholder="Acme Corporation"
            />
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        </div>

        {/* Notes Field */}
        <div className="group">
          <label htmlFor="notes" className="block text-sm font-semibold text-gray-700 mb-2">
            Notes
          </label>
          <div className="relative">
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 hover:border-gray-300 transition-all duration-200 resize-none"
              placeholder="Add any additional notes..."
            />
            <svg className="absolute left-4 top-4 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isEditMode ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                )}
              </svg>
              {isEditMode ? 'Update Contact' : 'Create Contact'}
            </>
          )}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-200 transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}