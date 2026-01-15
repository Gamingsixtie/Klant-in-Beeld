/**
 * Dashboard Store Selectors
 * Memoized selectors for efficient state access
 */

import { WIDGET_TYPES } from './dashboardStore'

// ============================================================================
// Widget Selectors
// ============================================================================

/**
 * Get all widgets
 */
export const selectWidgets = (state) => state.widgets

/**
 * Get widget by ID
 */
export const selectWidgetById = (id) => (state) =>
  state.widgets.find((w) => w.id === id)

/**
 * Get widgets by type
 */
export const selectWidgetsByType = (type) => (state) =>
  state.widgets.filter((w) => w.type === type)

/**
 * Get widget count
 */
export const selectWidgetCount = (state) => state.widgets.length

/**
 * Get KPI widgets
 */
export const selectKPIWidgets = (state) =>
  state.widgets.filter((w) => w.type === WIDGET_TYPES.KPI)

/**
 * Get chart widgets (bar + line)
 */
export const selectChartWidgets = (state) =>
  state.widgets.filter(
    (w) => w.type === WIDGET_TYPES.BAR || w.type === WIDGET_TYPES.LINE
  )

/**
 * Get table widgets
 */
export const selectTableWidgets = (state) =>
  state.widgets.filter((w) => w.type === WIDGET_TYPES.TABLE)

/**
 * Get widget statistics
 */
export const selectWidgetStats = (state) => ({
  total: state.widgets.length,
  kpis: state.widgets.filter((w) => w.type === WIDGET_TYPES.KPI).length,
  charts:
    state.widgets.filter((w) => w.type === WIDGET_TYPES.BAR).length +
    state.widgets.filter((w) => w.type === WIDGET_TYPES.LINE).length,
  tables: state.widgets.filter((w) => w.type === WIDGET_TYPES.TABLE).length
})

/**
 * Check if dashboard has widgets
 */
export const selectHasWidgets = (state) => state.widgets.length > 0

// ============================================================================
// Conversation Selectors
// ============================================================================

/**
 * Get conversation messages
 */
export const selectConversation = (state) => state.conversation

/**
 * Get last N messages
 */
export const selectLastMessages = (count) => (state) =>
  state.conversation.slice(-count)

/**
 * Get user messages only
 */
export const selectUserMessages = (state) =>
  state.conversation.filter((m) => m.role === 'user')

/**
 * Get assistant messages only
 */
export const selectAssistantMessages = (state) =>
  state.conversation.filter((m) => m.role === 'assistant')

/**
 * Get conversation length
 */
export const selectConversationLength = (state) => state.conversation.length

/**
 * Check if conversation is empty
 */
export const selectIsConversationEmpty = (state) =>
  state.conversation.length === 0

/**
 * Get last user query
 */
export const selectLastUserQuery = (state) => {
  const userMessages = state.conversation.filter((m) => m.role === 'user')
  return userMessages.length > 0
    ? userMessages[userMessages.length - 1].content
    : null
}

// ============================================================================
// Processing State Selectors
// ============================================================================

/**
 * Check if AI is processing
 */
export const selectIsProcessing = (state) => state.isProcessing

/**
 * Get current error
 */
export const selectError = (state) => state.error

/**
 * Check if there's an error
 */
export const selectHasError = (state) => state.error !== null

// ============================================================================
// Panel State Selectors
// ============================================================================

/**
 * Get panel state
 */
export const selectPanelState = (state) => state.panelState

/**
 * Check if panel is expanded
 */
export const selectIsPanelExpanded = (state) => state.panelState === 'expanded'

/**
 * Check if panel is collapsed
 */
export const selectIsPanelCollapsed = (state) => state.panelState === 'collapsed'

/**
 * Check if panel is hidden
 */
export const selectIsPanelHidden = (state) => state.panelState === 'hidden'

// ============================================================================
// Filter Selectors
// ============================================================================

/**
 * Get global filters
 */
export const selectGlobalFilters = (state) => state.globalFilters

/**
 * Get active sector filter
 */
export const selectActiveSector = (state) => state.globalFilters.sector

/**
 * Get active domein filter
 */
export const selectActiveDomein = (state) => state.globalFilters.domein

/**
 * Get active periode filter
 */
export const selectActivePeriode = (state) => state.globalFilters.periode

/**
 * Check if any filter is active
 */
export const selectHasActiveFilters = (state) =>
  state.globalFilters.sector !== null || state.globalFilters.domein !== null

/**
 * Get active filter count
 */
export const selectActiveFilterCount = (state) => {
  let count = 0
  if (state.globalFilters.sector) count++
  if (state.globalFilters.domein) count++
  return count
}

// ============================================================================
// Context Selectors
// ============================================================================

/**
 * Get conversation context
 */
export const selectConversationContext = (state) => state.conversationContext

/**
 * Get last entities from context
 */
export const selectLastEntities = (state) => state.conversationContext.lastEntities

/**
 * Get last metrics from context
 */
export const selectLastMetrics = (state) => state.conversationContext.lastMetrics

/**
 * Get last widget type from context
 */
export const selectLastWidgetType = (state) =>
  state.conversationContext.lastWidgetType

/**
 * Check if there's conversation context
 */
export const selectHasContext = (state) =>
  state.conversationContext.lastEntities.length > 0 ||
  state.conversationContext.lastMetrics.length > 0

// ============================================================================
// Clarification Selectors
// ============================================================================

/**
 * Get clarification state
 */
export const selectClarification = (state) => state.clarification

/**
 * Check if clarification is open
 */
export const selectIsClarificationOpen = (state) => state.clarification.isOpen

/**
 * Get clarification question
 */
export const selectClarificationQuestion = (state) => state.clarification.question

/**
 * Get clarification options
 */
export const selectClarificationOptions = (state) => state.clarification.options

// ============================================================================
// Suggestions Selectors
// ============================================================================

/**
 * Get all suggestions
 */
export const selectSuggestions = (state) => state.suggestions

/**
 * Get top N suggestions
 */
export const selectTopSuggestions = (count) => (state) =>
  state.suggestions.slice(0, count)

/**
 * Get follow-up suggestions (ones marked with followup intent)
 */
export const selectFollowUpSuggestions = (state) =>
  state.suggestions.filter((s) => s.intent === 'followup')

// ============================================================================
// Preferences Selectors
// ============================================================================

/**
 * Get all preferences
 */
export const selectPreferences = (state) => state.preferences

/**
 * Get recent queries
 */
export const selectRecentQueries = (state) => state.preferences.recentQueries

/**
 * Get favorite queries
 */
export const selectFavoriteQueries = (state) => state.preferences.favoriteQueries

/**
 * Check if query is favorited
 */
export const selectIsQueryFavorited = (query) => (state) =>
  state.preferences.favoriteQueries.includes(query)

/**
 * Get saved layouts
 */
export const selectSavedLayouts = (state) => state.preferences.savedLayouts

/**
 * Get last used report
 */
export const selectLastUsedReport = (state) => state.preferences.lastUsedReport

/**
 * Check if should show welcome
 */
export const selectShouldShowWelcome = (state) => state.preferences.showWelcome

/**
 * Check if tour has been seen
 */
export const selectHasSeenTour = (state) => state.preferences.hasSeenTour

/**
 * Check if keyboard shortcuts are enabled
 */
export const selectKeyboardShortcutsEnabled = (state) =>
  state.preferences.keyboardShortcutsEnabled

// ============================================================================
// Report Templates Selectors
// ============================================================================

/**
 * Get all report templates
 */
export const selectReportTemplates = (state) => state.reportTemplates

/**
 * Get report template by ID
 */
export const selectReportTemplateById = (id) => (state) =>
  state.reportTemplates.find((t) => t.id === id)

// ============================================================================
// Computed Selectors
// ============================================================================

/**
 * Get dashboard summary for display
 */
export const selectDashboardSummary = (state) => {
  const stats = selectWidgetStats(state)
  const hasWidgets = selectHasWidgets(state)
  const activeSector = selectActiveSector(state)
  const conversationLength = selectConversationLength(state)

  return {
    ...stats,
    hasWidgets,
    activeSector,
    conversationLength,
    isEmpty: !hasWidgets && conversationLength === 0
  }
}

/**
 * Get AI assistant state
 */
export const selectAIAssistantState = (state) => ({
  isProcessing: state.isProcessing,
  error: state.error,
  panelState: state.panelState,
  conversationLength: state.conversation.length,
  hasContext: selectHasContext(state),
  isClarifying: state.clarification.isOpen
})

/**
 * Get exportable dashboard config
 */
export const selectExportableConfig = (state) => ({
  widgets: state.widgets,
  filters: state.globalFilters,
  preferences: {
    lastUsedReport: state.preferences.lastUsedReport
  }
})

export default {
  // Widgets
  selectWidgets,
  selectWidgetById,
  selectWidgetsByType,
  selectWidgetCount,
  selectKPIWidgets,
  selectChartWidgets,
  selectTableWidgets,
  selectWidgetStats,
  selectHasWidgets,

  // Conversation
  selectConversation,
  selectLastMessages,
  selectUserMessages,
  selectAssistantMessages,
  selectConversationLength,
  selectIsConversationEmpty,
  selectLastUserQuery,

  // Processing
  selectIsProcessing,
  selectError,
  selectHasError,

  // Panel
  selectPanelState,
  selectIsPanelExpanded,
  selectIsPanelCollapsed,
  selectIsPanelHidden,

  // Filters
  selectGlobalFilters,
  selectActiveSector,
  selectActiveDomein,
  selectActivePeriode,
  selectHasActiveFilters,
  selectActiveFilterCount,

  // Context
  selectConversationContext,
  selectLastEntities,
  selectLastMetrics,
  selectLastWidgetType,
  selectHasContext,

  // Clarification
  selectClarification,
  selectIsClarificationOpen,
  selectClarificationQuestion,
  selectClarificationOptions,

  // Suggestions
  selectSuggestions,
  selectTopSuggestions,
  selectFollowUpSuggestions,

  // Preferences
  selectPreferences,
  selectRecentQueries,
  selectFavoriteQueries,
  selectIsQueryFavorited,
  selectSavedLayouts,
  selectLastUsedReport,
  selectShouldShowWelcome,
  selectHasSeenTour,
  selectKeyboardShortcutsEnabled,

  // Templates
  selectReportTemplates,
  selectReportTemplateById,

  // Computed
  selectDashboardSummary,
  selectAIAssistantState,
  selectExportableConfig
}
