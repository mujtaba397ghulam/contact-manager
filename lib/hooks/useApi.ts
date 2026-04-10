import { useState, useCallback } from 'react'

interface UseApiOptions {
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
}

export function useApi(options: UseApiOptions = {}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const callApi = useCallback(async (
    url: string,
    method: string = 'GET',
    body?: any
  ) => {
    setLoading(true)
    setError(null)

    try {
      const requestOptions: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      }

      if (body && method !== 'GET') {
        requestOptions.body = JSON.stringify(body)
      }

      const response = await fetch(url, requestOptions)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      if (options.onSuccess) {
        options.onSuccess(data)
      }

      return data
    } catch (err: any) {
      const errorMessage = err.message || 'An error occurred'
      setError(errorMessage)
      
      if (options.onError) {
        options.onError(err)
      }
      
      throw err
    } finally {
      setLoading(false)
    }
  }, [options])

  return {
    loading,
    error,
    callApi,
  }
}

// Specific hooks for common operations
export function useCreateContact() {
  return useApi()
}

export function useUpdateContact() {
  return useApi()
}

export function useDeleteContact() {
  return useApi()
}

export function useGetContacts() {
  const [contacts, setContacts] = useState([])
  const [pagination, setPagination] = useState(null)

  const api = useApi({
    onSuccess: (data) => {
      setContacts(data.data)
      setPagination(data.pagination)
    }
  })

  const fetchContacts = useCallback(async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return api.callApi(`/api/contacts${queryString ? `?${queryString}` : ''}`)
  }, [api])

  return {
    contacts,
    pagination,
    loading: api.loading,
    error: api.error,
    fetchContacts,
  }
}