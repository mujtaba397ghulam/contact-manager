'use client'

import React, { useEffect, useState } from 'react'
import { useGetContacts, useDeleteContact } from '@/lib/hooks/useApi'

export default function ContactList() {
  const { contacts, pagination, loading, error, fetchContacts } = useGetContacts()
  const deleteApi = useDeleteContact()
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  useEffect(() => {
    fetchContacts({
      page: currentPage,
      limit: 10,
      search: searchTerm
    })
  }, [currentPage, searchTerm])

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact?')) return

    setDeletingId(id)
    try {
      await deleteApi.callApi(`/api/contacts/${id}`, 'DELETE')
      // Add fade out animation before refreshing
      setTimeout(() => {
        fetchContacts({
          page: currentPage,
          limit: 10,
          search: searchTerm
        })
        setDeletingId(null)
      }, 300)
    } catch (error) {
      console.error('Failed to delete contact:', error)
      setDeletingId(null)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1) // Reset to first page on search
  }

  if (loading && contacts.length === 0) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg p-6">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
          <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-red-700 font-semibold">Error loading contacts</p>
          <p className="text-red-600 mt-2">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header with gradient */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Contacts</h1>
        <p className="text-gray-600">Manage and organize all your contacts in one place</p>
      </div>
      
      {/* Search Form with enhanced design */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, email, or company..."
            className="w-full px-6 py-4 pl-14 pr-32 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 hover:border-gray-300 transition-all duration-200 text-lg"
          />
          <svg className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
          >
            Search
          </button>
        </div>
      </form>

      {/* Contacts Cards Grid */}
      <div className="grid gap-4">
        {contacts.map((contact: any) => (
        <div 
        key={contact._id} 
        className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:scale-[1.02] ${
        deletingId === contact._id ? 'animate-fadeOut opacity-0' : ''
        }`}
        onMouseEnter={() => setHoveredId(contact._id)}
        onMouseLeave={() => setHoveredId(null)}
        >
        <div className="p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-3 sm:space-x-4">
        {/* Avatar */}
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-lg sm:text-2xl font-bold shadow-lg flex-shrink-0">
        {contact.name.charAt(0).toUpperCase()}
        </div>
        
        {/* Contact Info */}
        <div className="flex-1 min-w-0">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 truncate">{contact.name}</h3>
        <div className="space-y-1">
        <p className="text-sm sm:text-base text-gray-600 flex items-center">
        <svg className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <a href={`mailto:${contact.email}`} className="hover:text-blue-600 transition-colors truncate">
        {contact.email}
        </a>
        </p>
        <div className="flex flex-wrap gap-3">
        {contact.phone && (
        <p className="text-sm sm:text-base text-gray-600 flex items-center">
        <svg className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        <a href={`tel:${contact.phone}`} className="hover:text-green-600 transition-colors">
        {contact.phone}
        </a>
        </p>
        )}
        {contact.company && (
        <p className="text-sm sm:text-base text-gray-600 flex items-center">
        <svg className="w-4 h-4 mr-2 text-purple-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        {contact.company}
        </p>
        )}
        </div>
        </div>
        </div>
        </div>

        {/* Action Buttons */}
        <div className={`flex gap-2 sm:ml-4 transition-all duration-300 ${
        hoveredId === contact._id ? 'opacity-100' : 'sm:opacity-60'
        }`}>
        <button
        className="p-2 sm:p-3 bg-yellow-100 text-yellow-600 rounded-xl hover:bg-yellow-200 transition-all duration-200 transform hover:scale-110"
        title="Edit contact"
        >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        </button>
        <button
        onClick={() => handleDelete(contact._id)}
        disabled={deleteApi.loading || deletingId === contact._id}
        className="p-2 sm:p-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-all duration-200 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
        title="Delete contact"
        >
        {deletingId === contact._id ? (
        <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        ) : (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        )}
        </button>
        </div>
        </div>
        </div>
        </div>
        ))}
      </div>

      {/* Empty State */}
      {contacts.length === 0 && !loading && (
        <div className="text-center py-16 bg-white rounded-3xl shadow-lg">
          <svg className="w-24 h-24 text-gray-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p className="text-gray-500 text-xl font-medium mb-2">No contacts found</p>
          <p className="text-gray-400">
            {searchTerm ? `No results for "${searchTerm}"` : 'Start by adding your first contact'}
          </p>
        </div>
      )}

      {/* Enhanced Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="mt-10 flex justify-center items-center gap-2">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={!pagination.hasPrevPage}
            className="p-3 bg-white rounded-xl shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="flex gap-2">
            {[...Array(pagination.totalPages)].map((_, index) => {
              const pageNumber = index + 1
              const isActive = pageNumber === currentPage
              return (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`w-10 h-10 rounded-xl font-semibold transition-all duration-200 transform hover:scale-110 ${
                    isActive 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
                      : 'bg-white text-gray-600 shadow-md hover:shadow-lg'
                  }`}
                >
                  {pageNumber}
                </button>
              )
            })}
          </div>

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={!pagination.hasNextPage}
            className="p-3 bg-white rounded-xl shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}