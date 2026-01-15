import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { analyzeQuery, generateWidgetConfig, generateClarification, generateFollowUpSuggestions } from '../services/intentMapper'

// Widget types
export const WIDGET_TYPES = {
  KPI: 'kpi',
  BAR: 'bar',
  LINE: 'line',
  PIE: 'pie',
  TABLE: 'table',
  PROGRESS: 'progress'
}

// Widget size display
export const WIDGET_SIZES = {
  sm: 1,
  md: 2,
  lg: 3,
  xl: 4
}

// Initial suggested queries
const initialSuggestions = [
  { id: 1, query: "Hoe staat het met Go/No-Go gereedheid?", intent: 'metric', icon: '🎯' },
  { id: 2, query: "Vergelijk NPS per sector", intent: 'comparison', icon: '📊' },
  { id: 3, query: "Toon actieve inspanningen", intent: 'list', icon: '📋' },
  { id: 4, query: "Wat zijn de hoogste risico's?", intent: 'list', icon: '⚠️' },
  { id: 5, query: "Dekkingsgraad per domein", intent: 'comparison', icon: '📈' },
  { id: 6, query: "Hoeveel baten hebben we?", intent: 'metric', icon: '🎯' }
]

// Predefined report templates
const reportTemplates = [
  {
    id: 'executive-summary',
    name: 'Executive Summary',
    description: 'Overzicht voor management rapportage',
    icon: '📋',
    widgets: [
      { type: 'kpi', title: 'Go/No-Go Gereedheid', dataSource: { entity: 'stuurparameters', metric: 'gereedheid' }, size: 'sm' },
      { type: 'kpi', title: 'Totaal Baten', dataSource: { entity: 'baten', aggregation: 'count' }, size: 'sm' },
      { type: 'kpi', title: 'Actieve Inspanningen', dataSource: { entity: 'inspanningen', aggregation: 'count', filter: { status: 'in_progress' } }, size: 'sm' },
      { type: 'kpi', title: "Open Risico's", dataSource: { entity: 'risicos', aggregation: 'count' }, size: 'sm' },
      { type: 'line', title: 'Programma Voortgang', dataSource: { entity: 'voortgang', metric: 'trend' }, size: 'md' },
      { type: 'bar', title: 'NPS per Sector', dataSource: { entity: 'baten', metric: 'nps', groupBy: 'sector' }, size: 'md' }
    ]
  },
  {
    id: 'sector-analysis',
    name: 'Sector Analyse',
    description: 'Vergelijking tussen sectoren',
    icon: '📊',
    widgets: [
      { type: 'bar', title: 'NPS per Sector', dataSource: { entity: 'baten', metric: 'nps', groupBy: 'sector' }, size: 'lg' },
      { type: 'bar', title: 'Dekking per Domein', dataSource: { entity: 'baten', metric: 'dekking', groupBy: 'domein' }, size: 'lg' },
      { type: 'kpi', title: 'Totaal Baten', dataSource: { entity: 'baten', aggregation: 'count' }, size: 'sm' },
      { type: 'kpi', title: 'Actieve Inspanningen', dataSource: { entity: 'inspanningen', aggregation: 'count', filter: { status: 'in_progress' } }, size: 'sm' }
    ]
  },
  {
    id: 'risk-overview',
    name: 'Risico Overzicht',
    description: 'Focus op risicomanagement',
    icon: '⚠️',
    widgets: [
      { type: 'kpi', title: "Open Risico's", dataSource: { entity: 'risicos', aggregation: 'count' }, size: 'sm' },
      { type: 'kpi', title: 'Go/No-Go Gereedheid', dataSource: { entity: 'stuurparameters', metric: 'gereedheid' }, size: 'sm' },
      { type: 'table', title: 'Risico Overzicht', dataSource: { entity: 'risicos', sortBy: 'score', order: 'desc' }, size: 'xl' }
    ]
  },
  {
    id: 'progress-tracking',
    name: 'Voortgang Tracking',
    description: 'Trends en ontwikkelingen',
    icon: '📈',
    widgets: [
      { type: 'line', title: 'Programma Voortgang', dataSource: { entity: 'voortgang', metric: 'trend' }, size: 'md' },
      { type: 'line', title: 'NPS Ontwikkeling', dataSource: { entity: 'baten', metric: 'nps' }, size: 'md' },
      { type: 'table', title: 'Lopende Inspanningen', dataSource: { entity: 'inspanningen', filter: { status: 'in_progress' } }, size: 'xl' }
    ]
  }
]

// Demo widgets for initial state - optimized layout for visual impact
const demoWidgets = [
  // Row 1: 4 KPIs (sm + md + sm = 4 cols)
  {
    id: 'demo-1',
    type: WIDGET_TYPES.KPI,
    title: 'Go/No-Go Gereedheid',
    dataSource: { entity: 'stuurparameters', metric: 'gereedheid' },
    size: 'sm'
  },
  {
    id: 'demo-2',
    type: WIDGET_TYPES.KPI,
    title: 'Totaal Baten',
    dataSource: { entity: 'baten', aggregation: 'count' },
    size: 'sm'
  },
  {
    id: 'demo-3',
    type: WIDGET_TYPES.KPI,
    title: 'Actieve Inspanningen',
    dataSource: { entity: 'inspanningen', aggregation: 'count', filter: { status: 'in_progress' } },
    size: 'sm'
  },
  {
    id: 'demo-4',
    type: WIDGET_TYPES.KPI,
    title: 'Open Risico\'s',
    dataSource: { entity: 'risicos', aggregation: 'count' },
    size: 'sm'
  },
  // Row 2: Charts (2 + 2 = 4 cols)
  {
    id: 'demo-5',
    type: WIDGET_TYPES.BAR,
    title: 'NPS per Sector',
    dataSource: { entity: 'baten', metric: 'nps', groupBy: 'sector' },
    size: 'md'
  },
  {
    id: 'demo-6',
    type: WIDGET_TYPES.BAR,
    title: 'Dekking per Domein',
    dataSource: { entity: 'baten', metric: 'dekking', groupBy: 'domein' },
    size: 'md'
  },
  // Row 3: Line charts for trends (2 + 2 = 4 cols)
  {
    id: 'demo-7',
    type: WIDGET_TYPES.LINE,
    title: 'Programma Voortgang',
    dataSource: { entity: 'voortgang', metric: 'trend' },
    size: 'md'
  },
  {
    id: 'demo-8',
    type: WIDGET_TYPES.LINE,
    title: 'NPS Ontwikkeling',
    dataSource: { entity: 'baten', metric: 'nps' },
    size: 'md'
  },
  // Row 4: Full width table
  {
    id: 'demo-9',
    type: WIDGET_TYPES.TABLE,
    title: 'Lopende Inspanningen',
    dataSource: { entity: 'inspanningen', filter: { status: 'in_progress' } },
    size: 'xl'
  }
]

// Demo conversation - shows AI capabilities
const demoConversation = [
  {
    id: 'demo-msg-1',
    role: 'assistant',
    content: '👋 Welkom bij het AI Dashboard van Klant in Beeld! Ik heb alvast een overzicht voor je klaargezet met de belangrijkste programma-indicatoren.',
    timestamp: new Date().toISOString()
  },
  {
    id: 'demo-msg-2',
    role: 'user',
    content: 'Hoe staat het programma ervoor?',
    timestamp: new Date().toISOString()
  },
  {
    id: 'demo-msg-3',
    role: 'assistant',
    content: '📊 Het programma staat er goed voor! De Go/No-Go gereedheid is 72% met 4 actieve baten en 9 lopende inspanningen. De NPS-trend is positief. Bekijk de widgets voor details.',
    timestamp: new Date().toISOString(),
    widget: true
  },
  {
    id: 'demo-msg-4',
    role: 'assistant',
    content: '💡 Tip: Je kunt vragen stellen zoals "Vergelijk NPS per sector" of "Toon risico\'s". Ik genereer dan automatisch de juiste visualisatie.',
    timestamp: new Date().toISOString()
  }
]

// Create the store with persistence
export const useDashboardStore = create(
  persist(
    (set, get) => ({
      // === STATE ===

      // Widgets on the canvas
      widgets: [],

      // AI Conversation
      conversation: [],
      isProcessing: false,
      error: null,

      // Progressive Disclosure Level (0-3)
      // 0 = Clean Slate (no widgets, welcome screen)
      // 1 = Quick Insights (1-3 KPIs)
      // 2 = Exploration (4-6 mixed widgets)
      // 3 = Deep Analysis (7+ widgets)
      disclosureLevel: 0,
      isTransitioning: false,

      // AI Panel state: 'expanded' | 'collapsed' | 'hidden'
      panelState: 'expanded',

      // Conversation context for follow-up questions
      conversationContext: {
        lastEntities: [],
        lastMetrics: [],
        lastFilters: {},
        lastWidgetType: null
      },

      // Clarification state
      clarification: {
        isOpen: false,
        question: '',
        options: [],
        onSelect: null
      },

      // Global filters
      globalFilters: {
        sector: null, // null = alle sectoren
        periode: { start: 1, end: 18 },
        domein: null
      },

      // Suggestions
      suggestions: initialSuggestions,

      // User preferences
      preferences: {
        savedLayouts: [],
        recentQueries: [],
        favoriteQueries: [],
        lastUsedReport: null,
        autoLoadLastReport: true,
        showWelcome: true,
        hasSeenTour: false,
        keyboardShortcutsEnabled: true
      },

      // Report templates
      reportTemplates: reportTemplates,

      // === WIDGET ACTIONS ===

      addWidget: (widget) => {
        const id = `widget-${Date.now()}`
        const newWidget = {
          id,
          ...widget,
          position: widget.position || { col: 0, row: get().widgets.length }
        }
        set({ widgets: [...get().widgets, newWidget] })

        // Auto-advance disclosure level after adding widget
        setTimeout(() => get().autoAdvanceLevel(), 100)

        return id
      },

      removeWidget: (widgetId) => {
        set({ widgets: get().widgets.filter(w => w.id !== widgetId) })
      },

      updateWidget: (widgetId, updates) => {
        set({
          widgets: get().widgets.map(w =>
            w.id === widgetId ? { ...w, ...updates } : w
          )
        })
      },

      clearWidgets: () => {
        set({
          widgets: [],
          disclosureLevel: 0
        })
      },

      // === CONVERSATION ACTIONS ===

      addMessage: (message) => {
        const newMessage = {
          id: `msg-${Date.now()}`,
          timestamp: new Date().toISOString(),
          ...message
        }
        set({ conversation: [...get().conversation, newMessage] })
        return newMessage.id
      },

      setProcessing: (isProcessing) => {
        set({ isProcessing })
      },

      setError: (error) => {
        set({ error })
      },

      clearError: () => {
        set({ error: null })
      },

      clearConversation: () => {
        set({ conversation: [], error: null })
      },

      // === PANEL STATE ACTIONS ===

      setPanelState: (state) => {
        set({ panelState: state })
      },

      togglePanel: () => {
        const current = get().panelState
        const newState = current === 'expanded' ? 'collapsed' : 'expanded'
        set({ panelState: newState })
      },

      // === PROGRESSIVE DISCLOSURE ACTIONS ===

      setDisclosureLevel: (level) => {
        if (level < 0 || level > 3) return
        set({ isTransitioning: true })
        setTimeout(() => {
          set({ disclosureLevel: level, isTransitioning: false })
        }, 300)
      },

      // Automatically advance disclosure level based on widget count
      autoAdvanceLevel: () => {
        const { widgets, disclosureLevel } = get()
        const widgetCount = widgets.length
        const hasChartOrTable = widgets.some(w =>
          ['bar', 'line', 'pie', 'table'].includes(w.type)
        )

        let newLevel = disclosureLevel

        // Level 0 → 1: First widget added
        if (widgetCount >= 1 && disclosureLevel === 0) {
          newLevel = 1
        }
        // Level 1 → 2: More than 3 widgets OR has chart/table
        else if ((widgetCount > 3 || hasChartOrTable) && disclosureLevel === 1) {
          newLevel = 2
        }
        // Level 2 → 3: More than 6 widgets
        else if (widgetCount > 6 && disclosureLevel === 2) {
          newLevel = 3
        }

        if (newLevel !== disclosureLevel) {
          get().setDisclosureLevel(newLevel)
        }
      },

      // Reset to clean slate (level 0)
      resetToCleanSlate: () => {
        set({ isTransitioning: true })
        setTimeout(() => {
          set({
            widgets: [],
            disclosureLevel: 0,
            isTransitioning: false,
            conversationContext: {
              lastEntities: [],
              lastMetrics: [],
              lastFilters: {},
              lastWidgetType: null
            }
          })
        }, 300)
      },

      // Get visible widgets based on disclosure level
      getVisibleWidgets: () => {
        const { widgets, disclosureLevel } = get()
        switch (disclosureLevel) {
          case 0: return []
          case 1: return widgets.slice(0, 3)
          case 2: return widgets.slice(0, 6)
          case 3: return widgets
          default: return widgets
        }
      },

      // Check if we're in clean slate mode
      isCleanSlate: () => {
        const { widgets, disclosureLevel } = get()
        return disclosureLevel === 0 && widgets.length === 0
      },

      // === CONVERSATION CONTEXT ACTIONS ===

      updateConversationContext: (updates) => {
        set({
          conversationContext: {
            ...get().conversationContext,
            ...updates
          }
        })
      },

      clearConversationContext: () => {
        set({
          conversationContext: {
            lastEntities: [],
            lastMetrics: [],
            lastFilters: {},
            lastWidgetType: null
          }
        })
      },

      // === CLARIFICATION ACTIONS ===

      showClarification: (question, options, onSelect) => {
        set({
          clarification: {
            isOpen: true,
            question,
            options,
            onSelect
          }
        })
      },

      hideClarification: () => {
        set({
          clarification: {
            isOpen: false,
            question: '',
            options: [],
            onSelect: null
          }
        })
      },

      selectClarificationOption: (option) => {
        const { clarification } = get()
        if (clarification.onSelect) {
          clarification.onSelect(option)
        }
        get().hideClarification()
      },

      // === FILTER ACTIONS ===

      setGlobalFilter: (key, value) => {
        set({
          globalFilters: {
            ...get().globalFilters,
            [key]: value
          }
        })
      },

      clearFilters: () => {
        set({
          globalFilters: {
            sector: null,
            periode: { start: 1, end: 18 },
            domein: null
          }
        })
      },

      // === PREFERENCES ACTIONS ===

      addRecentQuery: (query) => {
        const recent = get().preferences.recentQueries
        const updated = [query, ...recent.filter(q => q !== query)].slice(0, 10)
        set({
          preferences: {
            ...get().preferences,
            recentQueries: updated
          }
        })
      },

      saveLayout: (name) => {
        const layout = {
          id: `layout-${Date.now()}`,
          name,
          widgets: get().widgets,
          filters: get().globalFilters,
          savedAt: new Date().toISOString()
        }
        set({
          preferences: {
            ...get().preferences,
            savedLayouts: [...get().preferences.savedLayouts, layout]
          }
        })
        return layout.id
      },

      loadLayout: (layoutId) => {
        const layout = get().preferences.savedLayouts.find(l => l.id === layoutId)
        if (layout) {
          set({
            widgets: layout.widgets,
            globalFilters: layout.filters
          })
        }
      },

      deleteLayout: (layoutId) => {
        set({
          preferences: {
            ...get().preferences,
            savedLayouts: get().preferences.savedLayouts.filter(l => l.id !== layoutId)
          }
        })
      },

      dismissWelcome: () => {
        set({
          preferences: {
            ...get().preferences,
            showWelcome: false
          }
        })
      },

      completeTour: () => {
        set({
          preferences: {
            ...get().preferences,
            hasSeenTour: true
          }
        })
      },

      resetTour: () => {
        set({
          preferences: {
            ...get().preferences,
            hasSeenTour: false
          }
        })
      },

      toggleKeyboardShortcuts: () => {
        set({
          preferences: {
            ...get().preferences,
            keyboardShortcutsEnabled: !get().preferences.keyboardShortcutsEnabled
          }
        })
      },

      // === FAVORITE QUERIES ===

      toggleFavoriteQuery: (query) => {
        const favorites = get().preferences.favoriteQueries || []
        const exists = favorites.includes(query)
        set({
          preferences: {
            ...get().preferences,
            favoriteQueries: exists
              ? favorites.filter(q => q !== query)
              : [...favorites, query]
          }
        })
      },

      isFavoriteQuery: (query) => {
        return (get().preferences.favoriteQueries || []).includes(query)
      },

      // === REPORT TEMPLATES ===

      loadReport: (reportId) => {
        const template = get().reportTemplates.find(r => r.id === reportId)
        if (template) {
          const widgets = template.widgets.map((w, i) => ({
            ...w,
            id: `${reportId}-widget-${i}-${Date.now()}`
          }))
          set({
            widgets,
            preferences: {
              ...get().preferences,
              lastUsedReport: reportId,
              showWelcome: false
            }
          })
          // Add info message to conversation
          get().addMessage({
            role: 'assistant',
            content: `📊 Rapport "${template.name}" geladen met ${widgets.length} widgets. ${template.description}`
          })
        }
      },

      setAutoLoadLastReport: (value) => {
        set({
          preferences: {
            ...get().preferences,
            autoLoadLastReport: value
          }
        })
      },

      // Load demo dashboard
      loadDemo: () => {
        set({
          widgets: demoWidgets,
          conversation: demoConversation,
          preferences: {
            ...get().preferences,
            showWelcome: false
          }
        })
      },

      // === QUERY PROCESSING WITH INTENT MAPPER ===

      processQuery: async (query) => {
        const {
          addMessage,
          setProcessing,
          addWidget,
          addRecentQuery,
          setError,
          clearError,
          conversationContext,
          updateConversationContext,
          showClarification,
          updateSuggestions
        } = get()

        // Clear any previous errors
        clearError()

        // Add user message
        addMessage({ role: 'user', content: query })
        setProcessing(true)
        addRecentQuery(query)

        try {
          // Simulate AI processing delay
          await new Promise(resolve => setTimeout(resolve, 600))

          // Analyze query with intent mapper
          const analysis = analyzeQuery(query, conversationContext)

          // Check if clarification is needed
          if (analysis.needsClarification && analysis.confidence < 0.5) {
            const clarification = generateClarification(analysis)
            if (clarification) {
              setProcessing(false)
              showClarification(
                clarification.question,
                clarification.options,
                async (selectedOption) => {
                  // Re-process with clarified intent
                  const clarifiedQuery = `${query} - ${selectedOption.label || selectedOption.value}`
                  await get().processQuery(clarifiedQuery)
                }
              )
              addMessage({
                role: 'assistant',
                content: `🤔 ${clarification.question}`
              })
              return null
            }
          }

          // Generate widget configuration
          const widgetConfig = generateWidgetConfig(analysis)

          let response = { role: 'assistant', content: '', widget: null }

          if (widgetConfig) {
            // Map widget type to WIDGET_TYPES constant
            const widgetTypeMap = {
              kpi: WIDGET_TYPES.KPI,
              bar: WIDGET_TYPES.BAR,
              line: WIDGET_TYPES.LINE,
              table: WIDGET_TYPES.TABLE
            }

            response.widget = {
              ...widgetConfig,
              type: widgetTypeMap[widgetConfig.type] || WIDGET_TYPES.KPI
            }

            // Generate contextual response
            const responseTemplates = {
              kpi: `📊 Hier is ${widgetConfig.title}:`,
              bar: `📊 ${widgetConfig.title} vergelijking:`,
              line: `📈 ${widgetConfig.title} trend:`,
              table: `📋 Overzicht van ${widgetConfig.title}:`
            }
            response.content = responseTemplates[widgetConfig.type] || `Hier is ${widgetConfig.title}:`

            // Update conversation context
            updateConversationContext({
              lastEntities: analysis.entities.map(e => e.entity),
              lastMetrics: analysis.metrics.map(m => m.metric),
              lastWidgetType: widgetConfig.type,
              lastFilters: analysis.groupBy ? { groupBy: analysis.groupBy } : {}
            })

            // Update suggestions based on context
            const newSuggestions = generateFollowUpSuggestions({
              lastEntities: analysis.entities.map(e => e.entity),
              lastMetrics: analysis.metrics.map(m => m.metric),
              lastWidgetType: widgetConfig.type
            })

            // Merge with existing suggestions, prioritizing new ones
            const currentSuggestions = get().suggestions
            const mergedSuggestions = [
              ...newSuggestions.map((s, i) => ({ ...s, id: `followup-${i}`, intent: 'followup' })),
              ...currentSuggestions.filter(s => !newSuggestions.some(ns => ns.query === s.query)).slice(0, 2)
            ]
            get().setSuggestions(mergedSuggestions)

          } else {
            // No widget generated - provide helpful response
            if (analysis.isFollowUp && conversationContext.lastEntities.length > 0) {
              response.content = `Je wilt meer weten over ${conversationContext.lastEntities.join(', ')}. Kun je specifieker zijn? Bijvoorbeeld: "Toon NPS per sector" of "Hoeveel zijn er actief?"`
            } else {
              response.content = `Ik begreep je vraag niet helemaal. Probeer specifiek te vragen naar:\n• Baten (bijv. "Hoeveel baten zijn er?")\n• Inspanningen (bijv. "Toon actieve inspanningen")\n• Risico's (bijv. "Wat zijn de hoogste risico's?")\n• NPS of metrics (bijv. "Vergelijk NPS per sector")`
            }
          }

          // Add assistant response
          addMessage(response)

          // Add widget if generated
          if (response.widget) {
            addWidget(response.widget)
          }

          setProcessing(false)
          return response
        } catch (error) {
          console.error('Query processing error:', error)
          setProcessing(false)
          setError('Er ging iets mis bij het verwerken van je vraag. Probeer het opnieuw.')
          addMessage({
            role: 'assistant',
            content: '❌ Sorry, er ging iets mis. Probeer het opnieuw of kies een suggestie.'
          })
          return null
        }
      },

      // Update suggestions
      setSuggestions: (suggestions) => {
        set({ suggestions })
      }
    }),
    {
      name: 'kib-dashboard-storage',
      partialize: (state) => ({
        widgets: state.widgets,
        disclosureLevel: state.disclosureLevel,
        globalFilters: state.globalFilters,
        preferences: state.preferences,
        panelState: state.panelState,
        conversation: state.conversation.slice(-20) // Keep last 20 messages
      })
    }
  )
)
