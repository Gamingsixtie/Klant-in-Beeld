import { useState, useRef, useEffect, lazy, Suspense } from 'react'
import { useDashboardStore, WIDGET_TYPES } from '../stores/dashboardStore'
import { useAppStore } from '../stores/appStore'
import { useResponsive } from '../hooks/useResponsive'
import { sectoren } from '../data/programmaData'
import KPICard from '../components/ai-dashboard/widgets/KPICard'
import BarChartWidget from '../components/ai-dashboard/widgets/BarChartWidget'
import DataTableWidget from '../components/ai-dashboard/widgets/DataTableWidget'
import LineChartWidget from '../components/ai-dashboard/widgets/LineChartWidget'
import ClarificationDialog from '../components/ai-dashboard/ClarificationDialog'
import OnboardingTour from '../components/ai-dashboard/OnboardingTour'
import { exportToJSON, exportToPNG, exportReport } from '../services/exportService'
import {
  Send,
  Sparkles,
  MessageCircle,
  Trash2,
  LayoutGrid,
  Bot,
  User,
  RefreshCw,
  Wand2,
  ChevronRight,
  ChevronLeft,
  PanelRightClose,
  PanelRightOpen,
  Layers,
  Activity,
  Star,
  Clock,
  FileText,
  Heart,
  BookOpen,
  AlertCircle,
  X,
  Download,
  HelpCircle,
  Keyboard
} from 'lucide-react'

// Widget component mapper
const WidgetComponents = {
  [WIDGET_TYPES.KPI]: KPICard,
  [WIDGET_TYPES.BAR]: BarChartWidget,
  [WIDGET_TYPES.TABLE]: DataTableWidget,
  [WIDGET_TYPES.LINE]: LineChartWidget
}

// Responsive size classes for widgets
const sizeClasses = {
  sm: 'col-span-1',
  md: 'col-span-1 sm:col-span-2',
  lg: 'col-span-1 sm:col-span-2 lg:col-span-3',
  xl: 'col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4'
}

// Widget skeleton for lazy loading
const WidgetSkeleton = () => (
  <div className="bg-white rounded-2xl border border-slate-200 p-5 animate-pulse">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 bg-slate-200 rounded-xl" />
      <div className="flex-1">
        <div className="h-4 bg-slate-200 rounded w-24 mb-2" />
        <div className="h-3 bg-slate-100 rounded w-16" />
      </div>
    </div>
    <div className="h-32 bg-slate-100 rounded-xl" />
  </div>
)

export default function AIDashboard() {
  const [queryInput, setQueryInput] = useState('')
  const [showShortcutsHelp, setShowShortcutsHelp] = useState(false)
  const [showExportMenu, setShowExportMenu] = useState(false)
  const [showTour, setShowTour] = useState(false)
  const inputRef = useRef(null)
  const conversationRef = useRef(null)
  const widgetGridRef = useRef(null)
  const dashboardRef = useRef(null)
  const [focusedWidgetIndex, setFocusedWidgetIndex] = useState(-1)

  // Responsive hook
  const { isMobile, isTablet, isDesktop, getRecommendedPanelState } = useResponsive()

  const {
    widgets,
    conversation,
    isProcessing,
    error,
    panelState,
    clarification,
    suggestions,
    globalFilters,
    preferences,
    reportTemplates,
    processQuery,
    removeWidget,
    clearWidgets,
    setGlobalFilter,
    dismissWelcome,
    loadDemo,
    loadReport,
    toggleFavoriteQuery,
    isFavoriteQuery,
    clearError,
    setPanelState,
    togglePanel,
    hideClarification,
    selectClarificationOption,
    completeTour
  } = useDashboardStore()

  // Show tour for new users
  useEffect(() => {
    if (!preferences.hasSeenTour && widgets.length === 0 && conversation.length === 0) {
      // Delay tour start slightly
      const timer = setTimeout(() => setShowTour(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const { baten, inspanningen } = useAppStore()

  // Set recommended panel state on breakpoint change
  useEffect(() => {
    if (isMobile && panelState === 'expanded') {
      setPanelState('hidden')
    }
  }, [isMobile])

  // Auto-load demo on first visit
  useEffect(() => {
    if (widgets.length === 0 && conversation.length === 0) {
      loadDemo()
    }
  }, [])

  // Auto-scroll conversation
  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight
    }
  }, [conversation])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only handle if shortcuts are enabled
      if (!preferences.keyboardShortcutsEnabled) return

      // Ctrl+K: Focus query input
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
        return
      }

      // Ctrl+/: Toggle shortcuts help
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault()
        setShowShortcutsHelp(prev => !prev)
        return
      }

      // Escape: Close panel on mobile or close modals
      if (e.key === 'Escape') {
        if (showShortcutsHelp) {
          setShowShortcutsHelp(false)
          return
        }
        if (clarification.isOpen) {
          hideClarification()
          return
        }
        if (isMobile && panelState !== 'hidden') {
          setPanelState('hidden')
          return
        }
        // Reset widget focus
        setFocusedWidgetIndex(-1)
        return
      }

      // Arrow key navigation for widgets when grid is focused
      if (focusedWidgetIndex >= 0 && widgets.length > 0) {
        const cols = isDesktop ? 4 : isTablet ? 2 : 1

        if (e.key === 'ArrowRight') {
          e.preventDefault()
          setFocusedWidgetIndex(prev => Math.min(prev + 1, widgets.length - 1))
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault()
          setFocusedWidgetIndex(prev => Math.max(prev - 1, 0))
        } else if (e.key === 'ArrowDown') {
          e.preventDefault()
          setFocusedWidgetIndex(prev => Math.min(prev + cols, widgets.length - 1))
        } else if (e.key === 'ArrowUp') {
          e.preventDefault()
          setFocusedWidgetIndex(prev => Math.max(prev - cols, 0))
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [preferences.keyboardShortcutsEnabled, showShortcutsHelp, clarification.isOpen, isMobile, panelState, focusedWidgetIndex, widgets.length, isDesktop, isTablet])

  // Handle query submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!queryInput.trim() || isProcessing) return

    const query = queryInput.trim()
    setQueryInput('')
    await processQuery(query)
  }

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    processQuery(suggestion.query)
  }

  // Render widget based on type
  const renderWidget = (widget) => {
    const Component = WidgetComponents[widget.type]
    if (!Component) return null

    return (
      <Component
        config={widget}
        onRemove={() => removeWidget(widget.id)}
      />
    )
  }

  const hasWidgets = widgets.length > 0
  const kpiCount = widgets.filter(w => w.type === WIDGET_TYPES.KPI).length
  const chartCount = widgets.filter(w => w.type === WIDGET_TYPES.BAR || w.type === WIDGET_TYPES.LINE).length

  // Panel width based on state
  const panelWidthClass = {
    expanded: 'w-96',
    collapsed: 'w-16',
    hidden: 'w-0'
  }[panelState]

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-4 lg:gap-6 relative">
      {/* Keyboard Shortcuts Help Modal */}
      {showShortcutsHelp && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#003366] rounded-xl">
                  <Keyboard className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800">Sneltoetsen</h3>
              </div>
              <button
                onClick={() => setShowShortcutsHelp(false)}
                className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <div className="space-y-3">
              {[
                { keys: 'Ctrl + K', action: 'Focus zoekveld' },
                { keys: 'Ctrl + /', action: 'Toon/verberg sneltoetsen' },
                { keys: 'Escape', action: 'Sluit panel/modal' },
                { keys: '←→↑↓', action: 'Navigeer tussen widgets' },
                { keys: 'Enter', action: 'Selecteer widget' }
              ].map(shortcut => (
                <div key={shortcut.keys} className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">{shortcut.action}</span>
                  <kbd className="px-2 py-1 bg-slate-100 rounded-lg text-xs font-mono text-slate-700">{shortcut.keys}</kbd>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Clarification Dialog */}
      <ClarificationDialog
        isOpen={clarification.isOpen}
        question={clarification.question}
        options={clarification.options}
        onSelect={selectClarificationOption}
        onClose={hideClarification}
      />

      {/* Onboarding Tour */}
      <OnboardingTour
        isOpen={showTour}
        onComplete={() => {
          setShowTour(false)
          completeTour()
        }}
        onSkip={() => {
          setShowTour(false)
          completeTour()
        }}
      />

      {/* Mobile Panel Toggle Button (when hidden) */}
      {panelState === 'hidden' && (
        <button
          onClick={() => setPanelState('expanded')}
          className="fixed bottom-6 right-6 z-40 p-4 bg-[#003366] text-white rounded-2xl shadow-xl hover:bg-[#002855] transition-all"
          aria-label="Open AI Assistant"
        >
          <Bot className="w-6 h-6" />
        </button>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Premium Header - Corporate Blue consistent met andere pagina's */}
        <div className="bg-gradient-to-br from-[#003366] via-[#004080] to-[#002855] rounded-2xl p-5 mb-6 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white flex items-center gap-2">
                  AI Dashboard
                  <span className="text-xs bg-white/20 text-white/90 px-2 py-0.5 rounded-full font-medium">Beta</span>
                </h1>
                <p className="text-sm text-white/70">Stel vragen over je programma data</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Stats badges */}
              {hasWidgets && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10">
                    <Layers className="w-3.5 h-3.5 text-blue-300" />
                    <span className="text-xs text-white font-medium">{kpiCount} KPIs</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10">
                    <Activity className="w-3.5 h-3.5 text-emerald-300" />
                    <span className="text-xs text-white font-medium">{chartCount} Charts</span>
                  </div>
                </div>
              )}

              {/* Sector Filter */}
              <div className="flex items-center gap-0.5 bg-white/10 backdrop-blur-sm rounded-xl p-1" data-tour="sector-filter">
                <button
                  onClick={() => setGlobalFilter('sector', null)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    !globalFilters.sector
                      ? 'bg-white text-slate-900 shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Alle
                </button>
                {sectoren.map(sector => (
                  <button
                    key={sector.id}
                    onClick={() => setGlobalFilter('sector', sector.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      globalFilters.sector === sector.id
                        ? 'bg-white shadow-md'
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                    style={globalFilters.sector === sector.id ? { color: sector.kleur } : {}}
                  >
                    {sector.afkorting}
                  </button>
                ))}
              </div>

              {/* Export Menu */}
              {hasWidgets && (
                <div className="relative">
                  <button
                    onClick={() => setShowExportMenu(!showExportMenu)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                    data-tour="export"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Export
                  </button>

                  {showExportMenu && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setShowExportMenu(false)}
                      />
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
                        <button
                          onClick={() => {
                            exportToJSON({ widgets, globalFilters, preferences })
                            setShowExportMenu(false)
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                        >
                          <FileText className="w-4 h-4 text-slate-400" />
                          Export als JSON
                        </button>
                        <button
                          onClick={() => {
                            exportReport({ widgets, globalFilters, preferences, conversation })
                            setShowExportMenu(false)
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                        >
                          <BookOpen className="w-4 h-4 text-slate-400" />
                          Export als Rapport
                        </button>
                        <button
                          onClick={() => {
                            if (dashboardRef.current) {
                              exportToPNG(dashboardRef.current)
                            }
                            setShowExportMenu(false)
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                        >
                          <LayoutGrid className="w-4 h-4 text-slate-400" />
                          Export als PNG
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Help button */}
              <button
                onClick={() => setShowShortcutsHelp(true)}
                className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                title="Sneltoetsen (Ctrl+/)"
              >
                <HelpCircle className="w-4 h-4" />
              </button>

              {hasWidgets && (
                <button
                  onClick={clearWidgets}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Canvas Area */}
        <div ref={dashboardRef} className="flex-1 overflow-auto pr-2" data-tour="widget-grid">
          {!hasWidgets && preferences.showWelcome ? (
            // Welcome State - Premium with Report Templates
            <div className="h-full flex flex-col px-4 py-6 overflow-auto">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="relative inline-block mb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#003366] via-[#004080] to-[#002855] rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-900/30 rotate-3">
                    <Wand2 className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg -rotate-6">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">
                  AI Dashboard
                </h2>
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                  Kies een rapport sjabloon of stel een vraag om te beginnen
                </p>
              </div>

              {/* Report Templates */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-4 h-4 text-slate-400" />
                  <h3 className="text-sm font-semibold text-slate-700">Rapport Sjablonen</h3>
                  <span className="text-xs text-slate-400">(Opgeslagen voorkeuren)</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {reportTemplates?.map(template => (
                    <button
                      key={template.id}
                      onClick={() => loadReport(template.id)}
                      className={`flex items-start gap-3 p-4 bg-white border rounded-xl text-left hover:border-[#003366]/30 hover:bg-blue-50/30 hover:shadow-lg transition-all group ${
                        preferences.lastUsedReport === template.id ? 'border-[#003366]/30 bg-blue-50/30' : 'border-slate-200'
                      }`}
                    >
                      <div className="p-2 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg group-hover:from-blue-100 group-hover:to-blue-200 transition-colors">
                        <span className="text-lg">{template.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-slate-800 group-hover:text-slate-900">
                            {template.name}
                          </span>
                          {preferences.lastUsedReport === template.id && (
                            <span className="text-[10px] bg-blue-100 text-[#003366] px-1.5 py-0.5 rounded-full">Recent</span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5 truncate">{template.description}</p>
                        <div className="flex items-center gap-1 mt-1.5">
                          <Layers className="w-3 h-3 text-slate-400" />
                          <span className="text-[10px] text-slate-400">{template.widgets.length} widgets</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Queries */}
              {preferences.recentQueries?.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <h3 className="text-sm font-semibold text-slate-700">Recente vragen</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {preferences.recentQueries.slice(0, 6).map((query, i) => (
                      <button
                        key={i}
                        onClick={() => processQuery(query)}
                        className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-600 hover:border-[#003366]/30 hover:bg-blue-50 transition-all"
                      >
                        <Clock className="w-3 h-3 text-slate-400" />
                        {query}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Suggestions */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-[#003366]" />
                  <h3 className="text-sm font-semibold text-slate-700">Snelle vragen</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {suggestions.slice(0, 6).map(suggestion => (
                    <button
                      key={suggestion.id}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="flex items-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-xl text-left hover:border-[#003366]/30 hover:bg-blue-50/50 transition-all group"
                    >
                      <span className="text-base">{suggestion.icon}</span>
                      <span className="text-xs text-slate-700 group-hover:text-slate-900 font-medium flex-1">
                        {suggestion.query}
                      </span>
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleFavoriteQuery(suggestion.query); }}
                        className="p-1 hover:bg-blue-100 rounded transition-colors"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isFavoriteQuery(suggestion.query) ? 'fill-rose-500 text-rose-500' : 'text-slate-300'}`} />
                      </button>
                    </button>
                  ))}
                </div>
              </div>

              {/* Demo Link */}
              <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                <button
                  onClick={loadDemo}
                  className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-slate-700 transition-colors"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  Of bekijk de demo met 9 widgets
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            // Widget Canvas - Responsive grid
            <div
              ref={widgetGridRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5 auto-rows-min pb-4"
              role="grid"
              aria-label="Dashboard widgets"
              tabIndex={0}
              onFocus={() => widgets.length > 0 && focusedWidgetIndex === -1 && setFocusedWidgetIndex(0)}
            >
              {widgets.map((widget, index) => (
                <div
                  key={widget.id}
                  className={`${sizeClasses[widget.size || 'md']} ${
                    focusedWidgetIndex === index ? 'ring-2 ring-[#003366] ring-offset-2 rounded-2xl' : ''
                  }`}
                  role="gridcell"
                  tabIndex={focusedWidgetIndex === index ? 0 : -1}
                  aria-selected={focusedWidgetIndex === index}
                >
                  {renderWidget(widget)}
                </div>
              ))}

              {!hasWidgets && (
                <div className="col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4 py-16 text-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <LayoutGrid className="w-8 h-8 text-slate-300" />
                  </div>
                  <p className="text-sm text-slate-500 font-medium">
                    Stel een vraag om widgets toe te voegen
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Of klik op een suggestie hieronder
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Suggestions - Corporate Blue */}
        {hasWidgets && (
          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-100 overflow-x-auto pb-1" data-tour="suggestions">
            <span className="text-xs text-slate-400 shrink-0 font-medium">Voeg toe:</span>
            {suggestions.slice(0, 4).map(s => (
              <button
                key={s.id}
                onClick={() => handleSuggestionClick(s)}
                className="shrink-0 flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:border-[#003366]/30 hover:bg-blue-50 text-xs text-slate-600 hover:text-slate-800 rounded-xl transition-all shadow-sm hover:shadow-md"
              >
                <span>{s.icon}</span>
                {s.query}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* AI Assistant Panel - Collapsible */}
      <div
        data-tour="ai-panel"
        className={`${panelWidthClass} flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden shrink-0 shadow-xl shadow-slate-200/50 transition-all duration-300 ${
          panelState === 'hidden' ? 'opacity-0 pointer-events-none absolute right-0' : ''
        } ${isMobile && panelState !== 'hidden' ? 'fixed inset-4 w-auto z-50' : ''}`}
      >
        {/* Mobile Overlay */}
        {isMobile && panelState !== 'hidden' && (
          <div
            className="fixed inset-0 bg-black/30 -z-10"
            onClick={() => setPanelState('hidden')}
          />
        )}

        {/* Panel Header - Corporate Blue */}
        <div className="px-4 py-4 bg-gradient-to-br from-[#003366] via-[#004080] to-[#002855] text-white relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                {panelState === 'expanded' && (
                  <div>
                    <span className="font-semibold text-base">AI Assistent</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                      <span className="text-xs text-white/60">Online</span>
                    </div>
                  </div>
                )}
              </div>
              {/* Toggle button */}
              <button
                onClick={togglePanel}
                className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                aria-label={panelState === 'expanded' ? 'Klap panel in' : 'Klap panel uit'}
              >
                {panelState === 'expanded' ? (
                  <PanelRightClose className="w-5 h-5 text-white" />
                ) : (
                  <PanelRightOpen className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
            {panelState === 'expanded' && (
              <div className="flex items-center gap-3 mt-3 text-xs">
                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/10">
                  <span className="text-blue-300 font-semibold">{baten.length}</span>
                  <span className="text-white/60">baten</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/10">
                  <span className="text-emerald-300 font-semibold">{inspanningen.length}</span>
                  <span className="text-white/60">inspanningen</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Conversation - Premium styling (only when expanded) */}
        {panelState === 'expanded' && (
        <div ref={conversationRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-slate-50/50 to-white">
          {conversation.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-slate-300" />
              </div>
              <p className="text-sm text-slate-500 font-medium">
                Stel een vraag over je programma
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Ik help je met data-inzichten
              </p>
            </div>
          ) : (
            conversation.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-xl bg-[#003366] flex items-center justify-center shrink-0 shadow-md">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-tr-md'
                      : 'bg-white text-slate-700 border border-slate-100 rounded-tl-md'
                  }`}
                >
                  {msg.content}
                  {msg.widget && (
                    <div className={`mt-2 pt-2 border-t ${msg.role === 'user' ? 'border-white/20' : 'border-slate-100'} flex items-center gap-1.5`}>
                      <Layers className={`w-3 h-3 ${msg.role === 'user' ? 'text-emerald-300' : 'text-emerald-500'}`} />
                      <span className={`text-xs ${msg.role === 'user' ? 'text-slate-300' : 'text-slate-500'}`}>
                        Widget toegevoegd
                      </span>
                    </div>
                  )}
                </div>
                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center shrink-0 shadow-md">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))
          )}

          {isProcessing && (
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-xl bg-[#003366] flex items-center justify-center shrink-0 shadow-md">
                <RefreshCw className="w-4 h-4 text-white animate-spin" />
              </div>
              <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-md px-4 py-3 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-[#003366] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-[#004080] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-[#003366] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="text-xs text-slate-400">Analyseren...</span>
                </div>
              </div>
            </div>
          )}
        </div>
        )}

        {/* Collapsed state - Quick actions */}
        {panelState === 'collapsed' && (
          <div className="flex-1 flex flex-col items-center py-4 gap-3">
            <button
              onClick={() => setPanelState('expanded')}
              className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
              title="Stel een vraag"
            >
              <MessageCircle className="w-5 h-5 text-slate-500" />
            </button>
            {isProcessing && (
              <RefreshCw className="w-5 h-5 text-[#003366] animate-spin" />
            )}
          </div>
        )}

        {/* Error Display */}
        {panelState === 'expanded' && error && (
          <div className="mx-4 mb-2 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
            <p className="text-sm text-red-700 flex-1">{error}</p>
            <button
              onClick={clearError}
              className="p-1 hover:bg-red-100 rounded-lg transition-colors"
              aria-label="Sluit foutmelding"
            >
              <X className="w-4 h-4 text-red-400" />
            </button>
          </div>
        )}

        {/* Input - Corporate Blue met ARIA labels (only when expanded) */}
        {panelState === 'expanded' && (
        <form onSubmit={handleSubmit} className="p-4 border-t border-slate-100 bg-white" role="search" data-tour="query-input">
          <div className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3 border border-slate-200 focus-within:border-[#003366] focus-within:ring-2 focus-within:ring-blue-100 transition-all">
            <input
              ref={inputRef}
              type="text"
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              placeholder="Stel een vraag..."
              disabled={isProcessing}
              aria-label="Stel een vraag aan de AI assistent"
              aria-describedby="query-hint"
              className="flex-1 bg-transparent text-sm text-slate-700 placeholder-slate-400 focus:outline-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!queryInput.trim() || isProcessing}
              aria-label="Verstuur vraag"
              className="p-2.5 bg-[#003366] text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#002855] transition-all shadow-md disabled:shadow-none"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p id="query-hint" className="text-[10px] text-slate-400 mt-2 text-center">
            Probeer: "Toon NPS per sector" of "Hoeveel baten zijn er?"
          </p>
        </form>
        )}
      </div>
    </div>
  )
}
