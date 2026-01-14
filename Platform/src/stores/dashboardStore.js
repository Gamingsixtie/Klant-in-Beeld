import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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
        showWelcome: true
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
        set({ widgets: [] })
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

      clearConversation: () => {
        set({ conversation: [] })
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

      // === QUERY PROCESSING (Mock for MVP) ===

      processQuery: async (query) => {
        const { addMessage, setProcessing, addWidget, addRecentQuery } = get()

        // Add user message
        addMessage({ role: 'user', content: query })
        setProcessing(true)
        addRecentQuery(query)

        // Simulate AI processing delay
        await new Promise(resolve => setTimeout(resolve, 800))

        // Mock intent classification
        const lowerQuery = query.toLowerCase()
        let response = { role: 'assistant', content: '', widget: null }

        // Simple pattern matching for MVP
        if (lowerQuery.includes('go/no-go') || lowerQuery.includes('gereedheid')) {
          response.content = "Hier is de huidige Go/No-Go gereedheid:"
          response.widget = {
            type: WIDGET_TYPES.KPI,
            title: 'Go/No-Go Gereedheid',
            dataSource: { entity: 'stuurparameters', metric: 'gereedheid' },
            size: 'md'
          }
        }
        else if (lowerQuery.includes('nps') && lowerQuery.includes('sector')) {
          response.content = "NPS vergelijking per sector:"
          response.widget = {
            type: WIDGET_TYPES.BAR,
            title: 'NPS per Sector',
            dataSource: { entity: 'baten', metric: 'nps', groupBy: 'sector' },
            size: 'lg'
          }
        }
        else if (lowerQuery.includes('actieve') && lowerQuery.includes('inspanning')) {
          response.content = "Overzicht van actieve inspanningen:"
          response.widget = {
            type: WIDGET_TYPES.TABLE,
            title: 'Actieve Inspanningen',
            dataSource: { entity: 'inspanningen', filter: { status: 'in_progress' } },
            size: 'xl'
          }
        }
        else if (lowerQuery.includes('risico')) {
          response.content = "Top risico's gesorteerd op score:"
          response.widget = {
            type: WIDGET_TYPES.TABLE,
            title: 'Risico Overzicht',
            dataSource: { entity: 'risicos', sortBy: 'score', order: 'desc' },
            size: 'lg'
          }
        }
        else if (lowerQuery.includes('dekking') || lowerQuery.includes('domein')) {
          response.content = "Dekkingsgraad per domein:"
          response.widget = {
            type: WIDGET_TYPES.BAR,
            title: 'Dekking per Domein',
            dataSource: { entity: 'baten', metric: 'dekking', groupBy: 'domein' },
            size: 'lg'
          }
        }
        else if (lowerQuery.includes('hoeveel') && lowerQuery.includes('baten')) {
          response.content = "Totaal aantal baten in het programma:"
          response.widget = {
            type: WIDGET_TYPES.KPI,
            title: 'Totaal Baten',
            dataSource: { entity: 'baten', aggregation: 'count' },
            size: 'sm'
          }
        }
        else {
          response.content = `Ik begreep je vraag "${query}" niet helemaal. Probeer een van de suggesties, of vraag specifiek naar baten, inspanningen, risico's of NPS.`
        }

        // Add assistant response
        addMessage(response)

        // Add widget if generated
        if (response.widget) {
          addWidget(response.widget)
        }

        setProcessing(false)
        return response
      }
    }),
    {
      name: 'kib-dashboard-storage',
      partialize: (state) => ({
        widgets: state.widgets,
        globalFilters: state.globalFilters,
        preferences: state.preferences,
        conversation: state.conversation.slice(-20) // Keep last 20 messages
      })
    }
  )
)
