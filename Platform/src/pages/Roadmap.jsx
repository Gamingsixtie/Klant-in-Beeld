import { useState, useMemo } from 'react'
import { useAppStore } from '../stores/appStore'
import { Calendar, LayoutGrid, Layers, X } from 'lucide-react'
import RoadmapKanban from '../components/roadmap/RoadmapKanban'

const months = ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12', 'M13', 'M14', 'M15', 'M16', 'M17', 'M18']

// Levensloopcycli conform "Werken aan Programma's" (Prevaas & Van Loon)
const levenscyclusColors = {
  'Verkennen': 'bg-slate-500',
  'Opbouwen': 'bg-blue-500',
  'Uitvoeren': 'bg-green-500',
  'Afbouwen': 'bg-purple-500'
}

const levenscyclusPeriods = {
  'Verkennen': { start: 1, end: 3 },
  'Opbouwen': { start: 4, end: 6 },
  'Uitvoeren': { start: 7, end: 15 },
  'Afbouwen': { start: 16, end: 18 }
}

const typeColors = {
  project: 'bg-blue-400',
  proces: 'bg-purple-400',
  leer: 'bg-green-400',
  systeem: 'bg-orange-400'
}

const milestones = [
  { maand: 3, naam: 'Go/No-Go Fundament', type: 'decision' },
  { maand: 6, naam: 'CRM Live', type: 'delivery' },
  { maand: 9, naam: 'Eerste KPI-meting', type: 'measurement' },
  { maand: 12, naam: 'Go/No-Go Implementatie', type: 'decision' },
  { maand: 15, naam: 'Tweede KPI-meting', type: 'measurement' },
  { maand: 18, naam: 'Programma-afronding', type: 'delivery' }
]

const milestoneIcons = {
  decision: '🔹',
  delivery: '🚀',
  measurement: '📊'
}

// Detail Modal Component
function InspanningDetailModal({ inspanning, onClose }) {
  if (!inspanning) return null

  const statusLabels = {
    planned: 'Gepland',
    in_progress: 'In uitvoering',
    completed: 'Afgerond'
  }

  const statusColors = {
    planned: 'bg-slate-100 text-slate-700',
    in_progress: 'bg-blue-100 text-blue-700',
    completed: 'bg-green-100 text-green-700'
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div>
            <span className="text-sm font-mono text-slate-500">{inspanning.code}</span>
            <h2 className="text-xl font-semibold text-slate-800">{inspanning.naam}</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          {inspanning.beschrijving && (
            <p className="text-slate-600">{inspanning.beschrijving}</p>
          )}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-slate-500">Type</span>
              <p className="font-medium text-slate-800 capitalize">{inspanning.type}</p>
            </div>
            <div>
              <span className="text-slate-500">Domein</span>
              <p className="font-medium text-slate-800">{inspanning.domein}</p>
            </div>
            <div>
              <span className="text-slate-500">Levenscyclus</span>
              <p className="font-medium text-slate-800 capitalize">{inspanning.levenscyclus || '-'}</p>
            </div>
            <div>
              <span className="text-slate-500">Periode</span>
              <p className="font-medium text-slate-800">M{inspanning.startMaand} - M{inspanning.eindMaand}</p>
            </div>
            <div>
              <span className="text-slate-500">Eigenaar</span>
              <p className="font-medium text-slate-800">{inspanning.eigenaar || '-'}</p>
            </div>
            <div>
              <span className="text-slate-500">Leider</span>
              <p className="font-medium text-slate-800">{inspanning.leider || '-'}</p>
            </div>
          </div>
          <div className="pt-4 border-t border-slate-100">
            <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${statusColors[inspanning.status]}`}>
              {statusLabels[inspanning.status]}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function Roadmap() {
  const { inspanningen } = useAppStore()
  const [viewMode, setViewMode] = useState('timeline') // 'timeline' | 'kanban'
  const [swimlaneBy, setSwimlaneBy] = useState('domein') // 'none' | 'domein' | 'type' | 'fase'
  const [selectedInspanning, setSelectedInspanning] = useState(null)

  // Sort inspanningen by start month
  const sortedInspanningen = useMemo(() => {
    return [...inspanningen].sort((a, b) => a.startMaand - b.startMaand)
  }, [inspanningen])

  // Group inspanningen by swimlane for timeline
  const groupedInspanningen = useMemo(() => {
    if (swimlaneBy === 'none' || viewMode !== 'timeline') {
      return { 'Alle': sortedInspanningen }
    }
    return sortedInspanningen.reduce((acc, item) => {
      const key = item[swimlaneBy] || 'Overig'
      if (!acc[key]) acc[key] = []
      acc[key].push(item)
      return acc
    }, {})
  }, [sortedInspanningen, swimlaneBy, viewMode])

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Roadmap</h1>
          <p className="text-slate-500">18-maanden programmaoverzicht</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {/* View Toggle */}
          <div className="flex bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('timeline')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                viewMode === 'timeline'
                  ? 'bg-white shadow text-slate-800'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              <Calendar className="w-4 h-4" />
              Timeline
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                viewMode === 'kanban'
                  ? 'bg-white shadow text-slate-800'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              Kanban
            </button>
          </div>

          {/* Swimlane Selector */}
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-slate-500" />
            <select
              value={swimlaneBy}
              onChange={(e) => setSwimlaneBy(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#003366] focus:border-transparent"
            >
              <option value="domein">Per domein</option>
              <option value="type">Per type</option>
              <option value="levenscyclus">Per levenscyclus</option>
              <option value="none">Geen swimlanes</option>
            </select>
          </div>
        </div>
      </div>

      {/* Kanban View */}
      {viewMode === 'kanban' && (
        <RoadmapKanban
          swimlaneBy={swimlaneBy}
          onCardClick={(item) => setSelectedInspanning(item)}
        />
      )}

      {/* Timeline View */}
      {viewMode === 'timeline' && (
        <>
          {/* Legend */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-4">
                <span className="font-medium text-slate-700">Levenscycli:</span>
                {Object.entries(levenscyclusColors).map(([cyclus, color]) => (
                  <span key={cyclus} className="flex items-center gap-1">
                    <span className={`w-3 h-3 rounded ${color}`} />
                    {cyclus}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <span className="font-medium text-slate-700">Types:</span>
                {Object.entries(typeColors).map(([type, color]) => (
                  <span key={type} className="flex items-center gap-1 capitalize">
                    <span className={`w-3 h-3 rounded ${color}`} />
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Levenscyclus bars */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Levensloopcycli</h2>
            <div className="relative">
              {/* Month headers */}
              <div className="flex border-b border-slate-200 mb-4">
                <div className="w-32 shrink-0" />
                <div className="flex-1 flex">
                  {months.map(m => (
                    <div key={m} className="flex-1 text-center text-xs text-slate-500 pb-2">
                      {m}
                    </div>
                  ))}
                </div>
              </div>

              {/* Levenscyclus rows */}
              {Object.entries(levenscyclusPeriods).map(([cyclus, period]) => (
                <div key={cyclus} className="flex items-center h-10 mb-2">
                  <div className="w-32 shrink-0 text-sm font-medium text-slate-700">{cyclus}</div>
                  <div className="flex-1 flex relative">
                    {months.map((m) => (
                      <div key={m} className="flex-1 border-l border-slate-100 h-8" />
                    ))}
                    <div
                      className={`absolute h-8 rounded-lg ${levenscyclusColors[cyclus]} opacity-80`}
                      style={{
                        left: `${((period.start - 1) / 18) * 100}%`,
                        width: `${((period.end - period.start + 1) / 18) * 100}%`
                      }}
                    >
                      <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-medium">
                        {cyclus}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Milestones */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Milestones</h2>
            <div className="relative">
              <div className="flex border-b border-slate-200 mb-4">
                <div className="flex-1 flex">
                  {months.map(m => (
                    <div key={m} className="flex-1 text-center text-xs text-slate-500 pb-2">
                      {m}
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative h-20">
                <div className="absolute inset-0 flex">
                  {months.map((m) => (
                    <div key={m} className="flex-1 border-l border-slate-100" />
                  ))}
                </div>
                {milestones.map((ms, i) => (
                  <div
                    key={i}
                    className="absolute flex flex-col items-center"
                    style={{
                      left: `${((ms.maand - 0.5) / 18) * 100}%`,
                      transform: 'translateX(-50%)'
                    }}
                  >
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white text-sm">
                      {milestoneIcons[ms.type]}
                    </div>
                    <span className="mt-1 text-xs text-slate-600 whitespace-nowrap text-center max-w-[80px]">
                      {ms.naam}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Gantt-style inspanningen with swimlanes */}
          {Object.entries(groupedInspanningen).map(([groupName, items]) => (
            <div key={groupName} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">
                {swimlaneBy === 'none' ? 'Inspanningen Timeline' : groupName}
                <span className="ml-2 text-sm font-normal text-slate-500">({items.length})</span>
              </h2>
              <div className="overflow-x-auto">
                <div className="min-w-[800px]">
                  {/* Month headers */}
                  <div className="flex border-b border-slate-200 mb-2">
                    <div className="w-48 shrink-0" />
                    <div className="flex-1 flex">
                      {months.map(m => (
                        <div key={m} className="flex-1 text-center text-xs text-slate-500 pb-2">
                          {m}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Inspanning rows */}
                  {items.map((inspanning) => (
                    <div
                      key={inspanning.id}
                      className="flex items-center h-10 hover:bg-slate-50 cursor-pointer"
                      onClick={() => setSelectedInspanning(inspanning)}
                    >
                      <div className="w-48 shrink-0 pr-4">
                        <div className="text-sm font-medium text-slate-700 truncate">{inspanning.naam}</div>
                        <div className="text-xs text-slate-400">{inspanning.code}</div>
                      </div>
                      <div className="flex-1 flex relative">
                        {months.map((m) => (
                          <div key={m} className="flex-1 border-l border-slate-100 h-8" />
                        ))}
                        <div
                          className={`absolute h-6 top-1 rounded ${typeColors[inspanning.type]} opacity-90 hover:opacity-100 transition-opacity`}
                          style={{
                            left: `${((inspanning.startMaand - 1) / 18) * 100}%`,
                            width: `${((inspanning.eindMaand - inspanning.startMaand + 1) / 18) * 100}%`
                          }}
                          title={`${inspanning.naam} (M${inspanning.startMaand}-M${inspanning.eindMaand})`}
                        >
                          <span className="absolute inset-0 flex items-center px-2 text-white text-xs font-medium truncate">
                            {inspanning.code}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {items.length === 0 && (
                    <div className="py-8 text-center text-slate-400">
                      Geen inspanningen in deze groep
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* KPI Meetmomenten */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">KPI Meetmomenten</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { maand: 0, label: 'Nulmeting', status: 'completed' },
                { maand: 9, label: 'Meting 1', status: 'pending' },
                { maand: 15, label: 'Meting 2', status: 'pending' },
                { maand: 18, label: 'Eindmeting', status: 'pending' }
              ].map((meting, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-lg border ${
                    meting.status === 'completed'
                      ? 'bg-green-50 border-green-200'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">{meting.label}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      meting.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {meting.status === 'completed' ? 'Afgerond' : 'Gepland'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    {meting.maand === 0 ? 'Start' : `Maand ${meting.maand}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Detail Modal */}
      {selectedInspanning && (
        <InspanningDetailModal
          inspanning={selectedInspanning}
          onClose={() => setSelectedInspanning(null)}
        />
      )}
    </div>
  )
}

export default Roadmap
