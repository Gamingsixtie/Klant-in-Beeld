/**
 * useAIQuery Hook
 * React hook for processing AI queries with state management
 */

import { useState, useCallback, useRef, useEffect } from 'react'
import { processAIQuery, validateAIQuery, onAIServiceEvent } from '../services/aiService'

/**
 * Hook for processing AI queries
 * @param {Object} options - Hook options
 * @returns {Object} - Query state and methods
 */
export function useAIQuery(options = {}) {
  const {
    onSuccess,
    onError,
    onWidget,
    onClarification,
    initialContext = {}
  } = options

  const [state, setState] = useState({
    isProcessing: false,
    error: null,
    lastResponse: null,
    lastQuery: null
  })

  const contextRef = useRef(initialContext)
  const abortControllerRef = useRef(null)

  // Update context ref when it changes
  useEffect(() => {
    contextRef.current = initialContext
  }, [initialContext])

  /**
   * Submit a query for processing
   */
  const query = useCallback(async (text, additionalContext = {}) => {
    // Validate query
    const validation = validateAIQuery(text)
    if (!validation.valid) {
      const error = new Error(validation.error)
      setState(prev => ({ ...prev, error }))
      onError?.(error)
      return null
    }

    // Cancel any pending request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    abortControllerRef.current = new AbortController()

    // Set processing state
    setState(prev => ({
      ...prev,
      isProcessing: true,
      error: null,
      lastQuery: validation.query
    }))

    try {
      // Combine contexts
      const context = {
        ...contextRef.current,
        ...additionalContext
      }

      // Process the query
      const response = await processAIQuery(validation.query, context)

      // Check if aborted
      if (abortControllerRef.current?.signal.aborted) {
        return null
      }

      // Handle different response types
      if (response.type === 'error') {
        const error = response.error || new Error(response.content)
        setState(prev => ({
          ...prev,
          isProcessing: false,
          error,
          lastResponse: response
        }))
        onError?.(error)
        return null
      }

      if (response.type === 'clarification') {
        setState(prev => ({
          ...prev,
          isProcessing: false,
          lastResponse: response
        }))
        onClarification?.(response.clarification)
        return response
      }

      // Update context for next query
      if (response.context) {
        contextRef.current = {
          ...contextRef.current,
          ...response.context
        }
      }

      // Success state
      setState(prev => ({
        ...prev,
        isProcessing: false,
        lastResponse: response
      }))

      // Callbacks
      onSuccess?.(response)
      if (response.widget) {
        onWidget?.(response.widget)
      }

      return response

    } catch (error) {
      // Check if aborted
      if (error.name === 'AbortError') {
        return null
      }

      setState(prev => ({
        ...prev,
        isProcessing: false,
        error
      }))
      onError?.(error)
      return null
    }
  }, [onSuccess, onError, onWidget, onClarification])

  /**
   * Clear the error state
   */
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }))
  }, [])

  /**
   * Reset the hook state
   */
  const reset = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    setState({
      isProcessing: false,
      error: null,
      lastResponse: null,
      lastQuery: null
    })
    contextRef.current = initialContext
  }, [initialContext])

  /**
   * Cancel any pending request
   */
  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    setState(prev => ({ ...prev, isProcessing: false }))
  }, [])

  /**
   * Update context manually
   */
  const updateContext = useCallback((updates) => {
    contextRef.current = {
      ...contextRef.current,
      ...updates
    }
  }, [])

  /**
   * Get current context
   */
  const getContext = useCallback(() => contextRef.current, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  return {
    // State
    isProcessing: state.isProcessing,
    error: state.error,
    lastResponse: state.lastResponse,
    lastQuery: state.lastQuery,

    // Methods
    query,
    clearError,
    reset,
    cancel,
    updateContext,
    getContext
  }
}

/**
 * Hook for subscribing to AI service events
 * @param {string} event - Event name
 * @param {Function} callback - Event callback
 */
export function useAIServiceEvent(event, callback) {
  useEffect(() => {
    const unsubscribe = onAIServiceEvent(event, callback)
    return unsubscribe
  }, [event, callback])
}

/**
 * Hook for AI query with automatic suggestions
 */
export function useAIQueryWithSuggestions(options = {}) {
  const [suggestions, setSuggestions] = useState([])

  const aiQuery = useAIQuery({
    ...options,
    onSuccess: (response) => {
      if (response.suggestions) {
        setSuggestions(response.suggestions)
      }
      options.onSuccess?.(response)
    }
  })

  return {
    ...aiQuery,
    suggestions
  }
}

export default useAIQuery
