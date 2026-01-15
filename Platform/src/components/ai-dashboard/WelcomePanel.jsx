import React, { useState, useRef, useEffect } from 'react'
import { useDashboardStore } from '../../stores/dashboardStore'

// Role-based suggestions
const ROLE_SUGGESTIONS = {
  default: [
    { icon: '📊', query: 'Hoe staat het programma ervoor?', description: 'Krijg een overzicht van de belangrijkste indicatoren' },
    { icon: '📈', query: 'Vergelijk NPS per sector', description: 'Zie hoe sectoren presteren' },
    { icon: '⚠️', query: 'Wat zijn de hoogste risico\'s?', description: 'Bekijk openstaande risico\'s' },
    { icon: '📋', query: 'Toon actieve inspanningen', description: 'Zie lopende projecten en activiteiten' }
  ],
  programmamanager: [
    { icon: '🎯', query: 'Hoe staat het met Go/No-Go gereedheid?', description: 'Check de stuurparameters' },
    { icon: '📊', query: 'Vergelijk voortgang per sector', description: 'Zie welke sectoren voorlopen' },
    { icon: '⚠️', query: 'Wat zijn de top 5 risico\'s?', description: 'Prioriteer risicomanagement' },
    { icon: '📈', query: 'Toon NPS trend over tijd', description: 'Analyseer de ontwikkeling' }
  ],
  sectormanager: [
    { icon: '📊', query: 'Hoe staat mijn sector ervoor?', description: 'Focus op jouw doelgroep' },
    { icon: '📋', query: 'Welke inspanningen lopen er?', description: 'Bekijk actieve projecten' },
    { icon: '🎯', query: 'Toon baten voor mijn sector', description: 'Zie gerealiseerde waarde' },
    { icon: '📈', query: 'Vergelijk met andere sectoren', description: 'Benchmark je prestaties' }
  ]
}

// Template quick starts
const TEMPLATES = [
  { id: 'executive-summary', name: 'Programma Status', icon: '🎯', color: 'bg-blue-500' },
  { id: 'sector-analysis', name: 'Sector Analyse', icon: '📊', color: 'bg-purple-500' },
  { id: 'risk-overview', name: 'Risico Dashboard', icon: '⚠️', color: 'bg-amber-500' },
  { id: 'progress-tracking', name: 'Voortgang', icon: '📈', color: 'bg-emerald-500' }
]

export default function WelcomePanel({ onQuerySubmit, inputRef }) {
  const [inputValue, setInputValue] = useState('')
  const [isHovered, setIsHovered] = useState(null)
  const localInputRef = useRef(null)
  const activeInputRef = inputRef || localInputRef

  const {
    processQuery,
    loadReport,
    loadDemo,
    preferences,
    reportTemplates
  } = useDashboardStore()

  const suggestions = ROLE_SUGGESTIONS.default

  // Auto-focus input on mount
  useEffect(() => {
    if (activeInputRef.current) {
      activeInputRef.current.focus()
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    if (onQuerySubmit) {
      onQuerySubmit(inputValue)
    } else {
      await processQuery(inputValue)
    }
    setInputValue('')
  }

  const handleSuggestionClick = async (query) => {
    if (onQuerySubmit) {
      onQuerySubmit(query)
    } else {
      await processQuery(query)
    }
  }

  const handleTemplateClick = (templateId) => {
    loadReport(templateId)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 animate-fadeIn">
      {/* Logo & Welcome */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#003366] to-[#0066CC] flex items-center justify-center shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">
          Welkom bij het AI Dashboard
        </h1>
        <p className="text-slate-500 max-w-md">
          Stel een vraag over je programma en ik help je met de juiste inzichten
        </p>
      </div>

      {/* Main Query Input */}
      <form onSubmit={handleSubmit} className="w-full max-w-2xl mb-8">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-[#003366] to-[#0066CC] rounded-xl opacity-0 group-hover:opacity-10 transition-opacity blur-xl" />
          <div className="relative flex items-center bg-white rounded-xl shadow-lg border-2 border-slate-200 focus-within:border-[#003366] transition-colors">
            <span className="pl-4 text-slate-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              ref={activeInputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Stel een vraag over je programma..."
              className="flex-1 px-4 py-4 text-lg bg-transparent outline-none text-slate-800 placeholder:text-slate-400"
              aria-label="Stel een vraag"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="m-2 px-4 py-2 bg-[#003366] text-white rounded-lg hover:bg-[#004488] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              <span className="hidden sm:inline">Vraag</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
          <p className="mt-2 text-xs text-slate-400 text-center">
            Druk op <kbd className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-600 font-mono">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-600 font-mono">K</kbd> om snel te focussen
          </p>
        </div>
      </form>

      {/* Suggestion Cards */}
      <div className="w-full max-w-3xl mb-8">
        <h2 className="text-sm font-medium text-slate-500 mb-3 text-center">
          Probeer bijvoorbeeld:
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion.query)}
              onMouseEnter={() => setIsHovered(index)}
              onMouseLeave={() => setIsHovered(null)}
              className={`
                relative p-4 bg-white rounded-xl border-2 border-slate-200
                hover:border-[#003366] hover:shadow-md
                text-left transition-all duration-200
                ${isHovered === index ? 'scale-[1.02]' : ''}
              `}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{suggestion.icon}</span>
                <div>
                  <p className="font-medium text-slate-800">{suggestion.query}</p>
                  <p className="text-sm text-slate-500 mt-0.5">{suggestion.description}</p>
                </div>
              </div>
              {isHovered === index && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#003366]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="w-full max-w-3xl flex items-center gap-4 mb-8">
        <div className="flex-1 h-px bg-slate-200" />
        <span className="text-sm text-slate-400">of start met een template</span>
        <div className="flex-1 h-px bg-slate-200" />
      </div>

      {/* Template Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {TEMPLATES.map((template) => (
          <button
            key={template.id}
            onClick={() => handleTemplateClick(template.id)}
            className={`
              px-4 py-2.5 rounded-full border-2 border-slate-200
              hover:border-slate-300 hover:shadow-sm
              flex items-center gap-2 transition-all
              bg-white hover:bg-slate-50
            `}
          >
            <span className={`w-6 h-6 rounded-full ${template.color} flex items-center justify-center text-white text-sm`}>
              {template.icon}
            </span>
            <span className="font-medium text-slate-700">{template.name}</span>
          </button>
        ))}
      </div>

      {/* Recent Queries (if any) */}
      {preferences.recentQueries?.length > 0 && (
        <div className="w-full max-w-2xl mb-6">
          <h3 className="text-xs font-medium text-slate-400 mb-2 text-center uppercase tracking-wide">
            Recent
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {preferences.recentQueries.slice(0, 3).map((query, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(query)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-full text-sm text-slate-600 transition-colors flex items-center gap-1.5"
              >
                <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="truncate max-w-[150px]">{query}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Demo Link */}
      <div className="pt-6 border-t border-slate-100 text-center">
        <button
          onClick={loadDemo}
          className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-slate-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          Bekijk de demo met voorbeelddata
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}
