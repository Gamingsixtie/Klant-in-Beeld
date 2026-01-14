import { useState, useRef, useEffect } from 'react'
import { useDashboardStore, WIDGET_TYPES } from '../stores/dashboardStore'
import { useAppStore } from '../stores/appStore'
import { sectoren } from '../data/programmaData'
import KPICard from '../components/ai-dashboard/widgets/KPICard'
import BarChartWidget from '../components/ai-dashboard/widgets/BarChartWidget'
import DataTableWidget from '../components/ai-dashboard/widgets/DataTableWidget'
import LineChartWidget from '../components/ai-dashboard/widgets/LineChartWidget'
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
  Layers,
  Activity,
  Star,
  Clock,
  FileText,
  Heart,
  BookOpen
} from 'lucide-react'

// Widget component mapper
const WidgetComponents = {
  [WIDGET_TYPES.KPI]: KPICard,
  [WIDGET_TYPES.BAR]: BarChartWidget,
  [WIDGET_TYPES.TABLE]: DataTableWidget,
  [WIDGET_TYPES.LINE]: LineChartWidget
}

// Size classes for widgets with better responsiveness
const sizeClasses = {
  sm: 'col-span-1',
  md: 'col-span-2',
  lg: 'col-span-3',
  xl: 'col-span-4'
}

export default function AIDashboard() {
  const [queryInput, setQueryInput] = useState('')
  const inputRef = useRef(null)
  const conversationRef = useRef(null)

  const {
    widgets,
    conversation,
    isProcessing,
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
    isFavoriteQuery
  } = useDashboardStore()

  const { baten, inspanningen } = useAppStore()

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
      <div key={widget.id} className={sizeClasses[widget.size || 'md']}>
        <Component
          config={widget}
          onRemove={() => removeWidget(widget.id)}
        />
      </div>
    )
  }

  const hasWidgets = widgets.length > 0
  const kpiCount = widgets.filter(w => w.type === WIDGET_TYPES.KPI).length
  const chartCount = widgets.filter(w => w.type === WIDGET_TYPES.BAR || w.type === WIDGET_TYPES.LINE).length

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Premium Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-5 mb-6 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl shadow-lg shadow-amber-500/30">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white flex items-center gap-2">
                  AI Dashboard
                  <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-medium">Beta</span>
                </h1>
                <p className="text-sm text-slate-400">Stel vragen over je programma data</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Stats badges */}
              {hasWidgets && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                    <Layers className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-xs text-white font-medium">{kpiCount} KPIs</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                    <Activity className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-xs text-white font-medium">{chartCount} Charts</span>
                  </div>
                </div>
              )}

              {/* Sector Filter */}
              <div className="flex items-center gap-0.5 bg-white/10 backdrop-blur-sm rounded-xl p-1">
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
        <div className="flex-1 overflow-auto pr-2">
          {!hasWidgets && preferences.showWelcome ? (
            // Welcome State - Premium with Report Templates
            <div className="h-full flex flex-col px-4 py-6 overflow-auto">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="relative inline-block mb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-orange-500/30 rotate-3">
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
                      className={`flex items-start gap-3 p-4 bg-white border rounded-xl text-left hover:border-amber-300 hover:bg-amber-50/30 hover:shadow-lg transition-all group ${
                        preferences.lastUsedReport === template.id ? 'border-amber-300 bg-amber-50/30' : 'border-slate-200'
                      }`}
                    >
                      <div className="p-2 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg group-hover:from-amber-100 group-hover:to-orange-100 transition-colors">
                        <span className="text-lg">{template.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-slate-800 group-hover:text-slate-900">
                            {template.name}
                          </span>
                          {preferences.lastUsedReport === template.id && (
                            <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">Recent</span>
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
                        className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-600 hover:border-amber-300 hover:bg-amber-50 transition-all"
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
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <h3 className="text-sm font-semibold text-slate-700">Snelle vragen</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {suggestions.slice(0, 6).map(suggestion => (
                    <button
                      key={suggestion.id}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="flex items-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-xl text-left hover:border-amber-300 hover:bg-amber-50/50 transition-all group"
                    >
                      <span className="text-base">{suggestion.icon}</span>
                      <span className="text-xs text-slate-700 group-hover:text-slate-900 font-medium flex-1">
                        {suggestion.query}
                      </span>
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleFavoriteQuery(suggestion.query); }}
                        className="p-1 hover:bg-amber-100 rounded transition-colors"
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
            // Widget Canvas - Premium grid
            <div className="grid grid-cols-4 gap-5 auto-rows-min pb-4">
              {widgets.map(renderWidget)}

              {!hasWidgets && (
                <div className="col-span-4 py-16 text-center">
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

        {/* Quick Suggestions - Premium */}
        {hasWidgets && (
          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-100 overflow-x-auto pb-1">
            <span className="text-xs text-slate-400 shrink-0 font-medium">Voeg toe:</span>
            {suggestions.slice(0, 4).map(s => (
              <button
                key={s.id}
                onClick={() => handleSuggestionClick(s)}
                className="shrink-0 flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:border-amber-300 hover:bg-amber-50 text-xs text-slate-600 hover:text-slate-800 rounded-xl transition-all shadow-sm hover:shadow-md"
              >
                <span>{s.icon}</span>
                {s.query}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* AI Assistant Panel - Premium */}
      <div className="w-96 flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden shrink-0 shadow-xl shadow-slate-200/50">
        {/* Panel Header - Premium gradient */}
        <div className="px-5 py-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl shadow-lg shadow-amber-500/30">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-semibold text-base">AI Assistent</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-xs text-slate-400">Online</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-3 text-xs">
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                <span className="text-amber-300 font-semibold">{baten.length}</span>
                <span className="text-slate-400">baten</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                <span className="text-emerald-300 font-semibold">{inspanningen.length}</span>
                <span className="text-slate-400">inspanningen</span>
              </div>
            </div>
          </div>
        </div>

        {/* Conversation - Premium styling */}
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
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shrink-0 shadow-md shadow-amber-500/20">
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
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shrink-0 shadow-md shadow-amber-500/20">
                <RefreshCw className="w-4 h-4 text-white animate-spin" />
              </div>
              <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-md px-4 py-3 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="text-xs text-slate-400">Analyseren...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input - Premium */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-slate-100 bg-white">
          <div className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3 border border-slate-200 focus-within:border-amber-300 focus-within:ring-2 focus-within:ring-amber-100 transition-all">
            <input
              ref={inputRef}
              type="text"
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              placeholder="Stel een vraag..."
              disabled={isProcessing}
              className="flex-1 bg-transparent text-sm text-slate-700 placeholder-slate-400 focus:outline-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!queryInput.trim() || isProcessing}
              className="p-2.5 bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:from-amber-500 hover:to-orange-600 transition-all shadow-md shadow-amber-500/30 disabled:shadow-none"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[10px] text-slate-400 mt-2 text-center">
            Probeer: "Toon NPS per sector" of "Hoeveel baten zijn er?"
          </p>
        </form>
      </div>
    </div>
  )
}
