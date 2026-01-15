/**
 * DashboardProvider Component
 * Provides dashboard context and functionality to child components
 */

import { createContext, useContext, useCallback, useEffect, useState, useMemo } from 'react'
import { useDashboardStore } from '../../stores/dashboardStore'
import { useResponsive } from '../../hooks/useResponsive'
import { useAIQuery } from '../../hooks/useAIQuery'
import {
  selectWidgets,
  selectWidgetStats,
  selectHasWidgets,
  selectConversation,
  selectIsProcessing,
  selectError,
  selectPanelState,
  selectGlobalFilters,
  selectSuggestions,
  selectPreferences,
  selectConversationContext,
  selectClarification
} from '../../stores/selectors'

// ============================================================================
// Context Creation
// ============================================================================

const DashboardContext = createContext(null)

/**
 * Hook to access dashboard context
 */
export function useDashboard() {
  const context = useContext(DashboardContext)
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider')
  }
  return context
}

/**
 * Hook to access responsive state
 */
export function useDashboardResponsive() {
  const context = useContext(DashboardContext)
  return context?.responsive ?? {}
}

/**
 * Hook to access AI query functionality
 */
export function useDashboardAI() {
  const context = useContext(DashboardContext)
  return context?.ai ?? {}
}

// ============================================================================
// Provider Component
// ============================================================================

export function DashboardProvider({ children, initialState = {} }) {
  // Zustand store access
  const store = useDashboardStore()

  // Responsive state
  const responsive = useResponsive()

  // Local UI state
  const [uiState, setUIState] = useState({
    isExporting: false,
    showTour: false,
    showShortcuts: false,
    focusedWidgetIndex: -1
  })

  // AI Query hook with store integration
  const ai = useAIQuery({
    initialContext: store.conversationContext,
    onSuccess: (response) => {
      store.addMessage({
        role: 'assistant',
        content: response.content
      })
    },
    onWidget: (widget) => {
      store.addWidget(widget)
    },
    onClarification: (clarification) => {
      store.showClarification(
        clarification.question,
        clarification.options,
        (option) => {
          ai.query(`${ai.lastQuery} - ${option.label || option.value}`)
        }
      )
    },
    onError: (error) => {
      store.setError(error.message || 'Er ging iets mis')
    }
  })

  // ============================================================================
  // Selectors
  // ============================================================================

  const widgets = selectWidgets(store)
  const widgetStats = selectWidgetStats(store)
  const hasWidgets = selectHasWidgets(store)
  const conversation = selectConversation(store)
  const isProcessing = selectIsProcessing(store)
  const error = selectError(store)
  const panelState = selectPanelState(store)
  const globalFilters = selectGlobalFilters(store)
  const suggestions = selectSuggestions(store)
  const preferences = selectPreferences(store)
  const conversationContext = selectConversationContext(store)
  const clarification = selectClarification(store)

  // ============================================================================
  // Actions
  // ============================================================================

  const submitQuery = useCallback(async (query) => {
    // Add user message
    store.addMessage({ role: 'user', content: query })
    store.setProcessing(true)
    store.addRecentQuery(query)
    store.clearError()

    try {
      // Update AI context with store context
      ai.updateContext(conversationContext)

      // Process query
      const response = await ai.query(query)

      // Update store context from AI response
      if (response?.context) {
        store.updateConversationContext(response.context)
      }

      store.setProcessing(false)
      return response

    } catch (error) {
      store.setProcessing(false)
      store.setError(error.message || 'Verwerking mislukt')
      return null
    }
  }, [ai, store, conversationContext])

  const addWidget = useCallback((config) => {
    return store.addWidget(config)
  }, [store])

  const removeWidget = useCallback((widgetId) => {
    store.removeWidget(widgetId)
  }, [store])

  const updateWidget = useCallback((widgetId, updates) => {
    store.updateWidget(widgetId, updates)
  }, [store])

  const clearWidgets = useCallback(() => {
    store.clearWidgets()
  }, [store])

  const setFilter = useCallback((key, value) => {
    store.setGlobalFilter(key, value)
  }, [store])

  const clearFilters = useCallback(() => {
    store.clearFilters()
  }, [store])

  const togglePanel = useCallback(() => {
    store.togglePanel()
  }, [store])

  const setPanelState = useCallback((state) => {
    store.setPanelState(state)
  }, [store])

  const loadReport = useCallback((reportId) => {
    store.loadReport(reportId)
  }, [store])

  const loadDemo = useCallback(() => {
    store.loadDemo()
  }, [store])

  const clearConversation = useCallback(() => {
    store.clearConversation()
    store.clearConversationContext()
  }, [store])

  // ============================================================================
  // UI Actions
  // ============================================================================

  const setUIStateValue = useCallback((key, value) => {
    setUIState(prev => ({
      ...prev,
      [key]: typeof value === 'function' ? value(prev[key]) : value
    }))
  }, [])

  const setFocusedWidget = useCallback((index) => {
    setUIStateValue('focusedWidgetIndex', index)
  }, [setUIStateValue])

  const showTour = useCallback(() => {
    setUIStateValue('showTour', true)
  }, [setUIStateValue])

  const hideTour = useCallback(() => {
    setUIStateValue('showTour', false)
    store.completeTour()
  }, [setUIStateValue, store])

  const showShortcuts = useCallback(() => {
    setUIStateValue('showShortcuts', true)
  }, [setUIStateValue])

  const hideShortcuts = useCallback(() => {
    setUIStateValue('showShortcuts', false)
  }, [setUIStateValue])

  // ============================================================================
  // Effects
  // ============================================================================

  // Auto-adjust panel state based on screen size
  useEffect(() => {
    if (responsive.isMobile && panelState === 'expanded') {
      store.setPanelState('hidden')
    }
  }, [responsive.isMobile, panelState, store])

  // Show tour for new users
  useEffect(() => {
    if (!preferences.hasSeenTour && !hasWidgets && conversation.length === 0) {
      const timer = setTimeout(() => setUIStateValue('showTour', true), 1500)
      return () => clearTimeout(timer)
    }
  }, [preferences.hasSeenTour, hasWidgets, conversation.length, setUIStateValue])

  // ============================================================================
  // Context Value
  // ============================================================================

  const contextValue = useMemo(() => ({
    // State
    widgets,
    widgetStats,
    hasWidgets,
    conversation,
    isProcessing,
    error,
    panelState,
    globalFilters,
    suggestions,
    preferences,
    conversationContext,
    clarification,

    // UI State
    uiState,

    // Responsive
    responsive,

    // AI
    ai: {
      query: submitQuery,
      isProcessing: ai.isProcessing,
      lastResponse: ai.lastResponse,
      cancel: ai.cancel
    },

    // Widget Actions
    addWidget,
    removeWidget,
    updateWidget,
    clearWidgets,

    // Filter Actions
    setFilter,
    clearFilters,

    // Panel Actions
    togglePanel,
    setPanelState,

    // Report Actions
    loadReport,
    loadDemo,

    // Conversation Actions
    submitQuery,
    clearConversation,
    hideClarification: store.hideClarification,
    selectClarificationOption: store.selectClarificationOption,

    // UI Actions
    setFocusedWidget,
    showTour,
    hideTour,
    showShortcuts,
    hideShortcuts,

    // Store access (for advanced use cases)
    store
  }), [
    widgets,
    widgetStats,
    hasWidgets,
    conversation,
    isProcessing,
    error,
    panelState,
    globalFilters,
    suggestions,
    preferences,
    conversationContext,
    clarification,
    uiState,
    responsive,
    ai,
    submitQuery,
    addWidget,
    removeWidget,
    updateWidget,
    clearWidgets,
    setFilter,
    clearFilters,
    togglePanel,
    setPanelState,
    loadReport,
    loadDemo,
    clearConversation,
    setFocusedWidget,
    showTour,
    hideTour,
    showShortcuts,
    hideShortcuts,
    store
  ])

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  )
}

export default DashboardProvider
