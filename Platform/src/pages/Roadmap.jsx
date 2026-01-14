import { useState, useMemo, useEffect } from 'react'
import { useAppStore } from '../stores/appStore'
import { useMethodologieStore } from '../stores/methodologieStore'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  Calendar,
  LayoutGrid,
  Layers,
  X,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  TrendingUp,
  Filter,
  ExternalLink
} from 'lucide-react'
import RoadmapKanban from '../components/roadmap/RoadmapKanban'

const months = ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12', 'M13', 'M14', 'M15', 'M16', 'M17', 'M18']

// Levensloopcycli conform "Werken aan Programma's" (Prevaas & Van Loon)
const levenscyclusColors = {
  'Verkennen': 'bg-slate-500',
  'Opbouwen': 'bg-blue-500',
  'Uitvoeren': 'bg-green-500',
  'Afbouwen': 'bg-purple-500'
}

const levenscyclusBgColors = {
  'Verkennen': 'bg-slate-100 border-slate-300',
  'Opbouwen': 'bg-blue-50 border-blue-300',
  'Uitvoeren': 'bg-green-50 border-green-300',
  'Afbouwen': 'bg-purple-50 border-purple-300'
}

const levenscyclusPeriods = {
  'Verkennen': { start: 1, end: 3, maanden: 3 },
  'Opbouwen': { start: 4, end: 6, maanden: 3 },
  'Uitvoeren': { start: 7, end: 15, maanden: 9 },
  'Afbouwen': { start: 16, end: 18, maanden: 3 }
}

// Map cyclus naam naar maand voor huidige positie
const cyclusToMonth = {
  'Verkennen': 2,
  'Opbouwen': 5,
  'Uitvoeren': 11,
  'Afbouwen': 17
}

const typeColors = {
  project: 'bg-blue-400',
  proces: 'bg-purple-400',
  leer: 'bg-green-400',
  systeem: 'bg-orange-400'
}

const typeLabels = {
  project: 'Project',
  proces: 'Proces',
  leer: 'Leertraject',
  systeem: 'Systeemtraject'
}

const statusColors = {
  planned: { bg: 'bg-slate-100', text: 'text-slate-700', label: 'Gepland' },
  in_progress: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Actief' },
  completed: { bg: 'bg-green-100', text: 'text-green-700', label: 'Afgerond' }
}

const milestoneIcons = {
  decision: '🔹',
  delivery: '🚀',
  measurement: '📊'
}

// Detail Modal Component
function InspanningDetailModal({ inspanning, onClose, onOpenInInspanningen }) {
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
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${statusColors[inspanning.status]}`}>
              {statusLabels[inspanning.status]}
            </span>
            <button
              onClick={() => onOpenInInspanningen(inspanning.id)}
              className="flex items-center gap-2 px-4 py-2 bg-[#003366] text-white rounded-lg text-sm font-medium hover:bg-[#002855] transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Open in Inspanningen
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Roadmap() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { inspanningen, baten } = useAppStore()
  const { voortgang, getTotaleVoortgang, getCyclusVoortgang } = useMethodologieStore()

  // Read query params for initial view
  const initialView = searchParams.get('view') || 'timeline'
  const highlightId = searchParams.get('highlight')

  const [viewMode, setViewMode] = useState(initialView) // 'timeline' | 'kanban'
  const [swimlaneBy, setSwimlaneBy] = useState('domein') // 'none' | 'domein' | 'type' | 'fase'
  const [statusFilter, setStatusFilter] = useState('alle') // 'alle' | 'planned' | 'in_progress' | 'completed'
  const [selectedInspanning, setSelectedInspanning] = useState(null)

  // Open highlighted inspanning on mount
  useEffect(() => {
    if (highlightId) {
      const found = inspanningen.find(i => String(i.id) === highlightId)
      if (found) {
        setSelectedInspanning(found)
      }
    }
  }, [highlightId, inspanningen])

  // Navigate to Inspanningen page with highlight
  const handleOpenInInspanningen = (inspanningId) => {
    navigate(`/inspanningen?highlight=${inspanningId}`)
  }

  // Huidige positie berekenen
  const currentPosition = useMemo(() => {
    const cyclus = voortgang.huidigeCyclus || 'Verkennen'
    const week = voortgang.huidigeWeek || 1
    // Schat maand op basis van cyclus en week (elke cyclus ~3 maanden behalve Uitvoeren)
    const cyclusStart = levenscyclusPeriods[cyclus]?.start || 1
    const cyclusDuur = levenscyclusPeriods[cyclus]?.maanden || 3
    const weekInCyclus = Math.min(week, 12) // max 12 weken per cyclus
    const maandOffset = Math.floor((weekInCyclus / 12) * cyclusDuur)
    const huidigeMaand = Math.min(cyclusStart + maandOffset, 18)

    return {
      cyclus,
      week,
      maand: huidigeMaand,
      percentage: getTotaleVoortgang().percentage
    }
  }, [voortgang, getTotaleVoortgang])

  // Statistieken
  const stats = useMemo(() => {
    const actief = inspanningen.filter(i => i.status === 'in_progress').length
    const gepland = inspanningen.filter(i => i.status === 'planned').length
    const afgerond = inspanningen.filter(i => i.status === 'completed').length
    const totaal = inspanningen.length

    // Inspanningen in huidige periode
    const inHuidigePeriode = inspanningen.filter(i =>
      i.startMaand <= currentPosition.maand && i.eindMaand >= currentPosition.maand
    )

    // Achterlopend: status is nog 'planned' maar startmaand is voorbij
    const achterlopend = inspanningen.filter(i =>
      i.status === 'planned' && i.startMaand < currentPosition.maand
    ).length

    return { actief, gepland, afgerond, totaal, inHuidigePeriode, achterlopend }
  }, [inspanningen, currentPosition])

  // Dynamische milestones met status
  const milestones = useMemo(() => {
    return [
      {
        maand: 3,
        naam: 'Go/No-Go Verkennen',
        type: 'decision',
        status: currentPosition.maand > 3 ? 'passed' : currentPosition.maand === 3 ? 'current' : 'upcoming'
      },
      {
        maand: 6,
        naam: 'Go/No-Go Opbouwen',
        type: 'decision',
        status: currentPosition.maand > 6 ? 'passed' : currentPosition.maand >= 5 ? 'current' : 'upcoming'
      },
      {
        maand: 9,
        naam: 'Eerste KPI-meting',
        type: 'measurement',
        status: currentPosition.maand > 9 ? 'passed' : currentPosition.maand >= 8 ? 'current' : 'upcoming'
      },
      {
        maand: 15,
        naam: 'Go/No-Go Uitvoeren',
        type: 'decision',
        status: currentPosition.maand > 15 ? 'passed' : currentPosition.maand >= 14 ? 'current' : 'upcoming'
      },
      {
        maand: 18,
        naam: 'Programma-afronding',
        type: 'delivery',
        status: currentPosition.maand >= 18 ? 'current' : 'upcoming'
      }
    ]
  }, [currentPosition])

  // Filter en sorteer inspanningen
  const filteredInspanningen = useMemo(() => {
    let filtered = [...inspanningen]
    if (statusFilter !== 'alle') {
      filtered = filtered.filter(i => i.status === statusFilter)
    }
    return filtered.sort((a, b) => a.startMaand - b.startMaand)
  }, [inspanningen, statusFilter])

  // Group inspanningen by swimlane for timeline
  const groupedInspanningen = useMemo(() => {
    if (swimlaneBy === 'none' || viewMode !== 'timeline') {
      return { 'Alle': filteredInspanningen }
    }
    return filteredInspanningen.reduce((acc, item) => {
      const key = item[swimlaneBy] || 'Overig'
      if (!acc[key]) acc[key] = []
      acc[key].push(item)
      return acc
    }, {})
  }, [filteredInspanningen, swimlaneBy, viewMode])

  return (
    <div className="space-y-6">
      {/* Header with Current Position */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Roadmap</h1>
          <p className="text-slate-500">18-maanden programmaoverzicht</p>
        </div>

        {/* Huidige Positie Card */}
        <div className={`flex items-center gap-4 px-5 py-3 rounded-xl border-2 ${levenscyclusBgColors[currentPosition.cyclus]}`}>
          <MapPin className="w-5 h-5 text-slate-600" />
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wide font-medium">Nu</div>
            <div className="font-semibold text-slate-800">
              {currentPosition.cyclus} - Week {currentPosition.week}
            </div>
            <div className="text-xs text-slate-500">
              Maand {currentPosition.maand} van 18 ({currentPosition.percentage}% voltooid)
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-2 text-slate-500 text-xs uppercase tracking-wide mb-1">
            <Target className="w-3.5 h-3.5" />
            Totaal
          </div>
          <div className="text-2xl font-bold text-slate-800">{stats.totaal}</div>
          <div className="text-xs text-slate-400">inspanningen</div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-2 text-blue-600 text-xs uppercase tracking-wide mb-1">
            <Clock className="w-3.5 h-3.5" />
            Actief
          </div>
          <div className="text-2xl font-bold text-blue-600">{stats.actief}</div>
          <div className="text-xs text-slate-400">in uitvoering</div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-2 text-green-600 text-xs uppercase tracking-wide mb-1">
            <CheckCircle className="w-3.5 h-3.5" />
            Afgerond
          </div>
          <div className="text-2xl font-bold text-green-600">{stats.afgerond}</div>
          <div className="text-xs text-slate-400">voltooid</div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-2 text-slate-500 text-xs uppercase tracking-wide mb-1">
            <Calendar className="w-3.5 h-3.5" />
            Gepland
          </div>
          <div className="text-2xl font-bold text-slate-600">{stats.gepland}</div>
          <div className="text-xs text-slate-400">nog te starten</div>
        </div>

        {stats.achterlopend > 0 ? (
          <div className="bg-amber-50 rounded-xl border border-amber-200 p-4">
            <div className="flex items-center gap-2 text-amber-600 text-xs uppercase tracking-wide mb-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              Achterlopend
            </div>
            <div className="text-2xl font-bold text-amber-600">{stats.achterlopend}</div>
            <div className="text-xs text-amber-500">actie nodig</div>
          </div>
        ) : (
          <div className="bg-green-50 rounded-xl border border-green-200 p-4">
            <div className="flex items-center gap-2 text-green-600 text-xs uppercase tracking-wide mb-1">
              <TrendingUp className="w-3.5 h-3.5" />
              Op schema
            </div>
            <div className="text-2xl font-bold text-green-600">✓</div>
            <div className="text-xs text-green-500">geen vertraging</div>
          </div>
        )}
      </div>

      {/* Controls Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white rounded-xl border border-slate-200 p-4">
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

        <div className="flex flex-wrap items-center gap-4">
          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#003366] focus:border-transparent"
            >
              <option value="alle">Alle statussen</option>
              <option value="planned">Gepland</option>
              <option value="in_progress">In uitvoering</option>
              <option value="completed">Afgerond</option>
            </select>
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
                  <span key={type} className="flex items-center gap-1">
                    <span className={`w-3 h-3 rounded ${color}`} />
                    {typeLabels[type]}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <span className="w-0.5 h-6 bg-orange-500"></span>
                <span className="text-xs text-slate-500">= huidige positie</span>
              </div>
            </div>
          </div>

          {/* Levenscyclus bars met huidige positie */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Levensloopcycli</h2>
            <div className="relative">
              {/* Month headers */}
              <div className="flex border-b border-slate-200 mb-4">
                <div className="w-32 shrink-0" />
                <div className="flex-1 flex relative">
                  {months.map((m, i) => (
                    <div
                      key={m}
                      className={`flex-1 text-center text-xs pb-2 ${
                        i + 1 === currentPosition.maand
                          ? 'text-orange-600 font-bold'
                          : i + 1 < currentPosition.maand
                            ? 'text-slate-400'
                            : 'text-slate-500'
                      }`}
                    >
                      {m}
                    </div>
                  ))}
                  {/* Huidige positie lijn */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-orange-500 z-10"
                    style={{ left: `${((currentPosition.maand - 0.5) / 18) * 100}%` }}
                  />
                </div>
              </div>

              {/* Levenscyclus rows */}
              {Object.entries(levenscyclusPeriods).map(([cyclus, period]) => {
                const isCurrentCyclus = cyclus === currentPosition.cyclus
                const isPastCyclus = period.end < currentPosition.maand

                return (
                  <div key={cyclus} className="flex items-center h-10 mb-2">
                    <div className={`w-32 shrink-0 text-sm font-medium ${
                      isCurrentCyclus ? 'text-slate-800' : isPastCyclus ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      {cyclus}
                      {isCurrentCyclus && <span className="ml-1 text-orange-500">●</span>}
                    </div>
                    <div className="flex-1 flex relative">
                      {months.map((m, i) => (
                        <div
                          key={m}
                          className={`flex-1 border-l h-8 ${
                            i + 1 < currentPosition.maand ? 'border-slate-100 bg-slate-50/50' : 'border-slate-100'
                          }`}
                        />
                      ))}
                      <div
                        className={`absolute h-8 rounded-lg ${levenscyclusColors[cyclus]} ${
                          isPastCyclus ? 'opacity-50' : isCurrentCyclus ? 'opacity-100 ring-2 ring-orange-400 ring-offset-1' : 'opacity-70'
                        }`}
                        style={{
                          left: `${((period.start - 1) / 18) * 100}%`,
                          width: `${((period.end - period.start + 1) / 18) * 100}%`
                        }}
                      >
                        <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-medium">
                          {cyclus}
                          {isPastCyclus && ' ✓'}
                        </span>
                      </div>
                      {/* Huidige positie lijn */}
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-orange-500 z-10"
                        style={{ left: `${((currentPosition.maand - 0.5) / 18) * 100}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Milestones met status */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Milestones & Go/No-Go Momenten</h2>
            <div className="relative">
              <div className="flex border-b border-slate-200 mb-4">
                <div className="flex-1 flex relative">
                  {months.map((m, i) => (
                    <div
                      key={m}
                      className={`flex-1 text-center text-xs pb-2 ${
                        i + 1 === currentPosition.maand
                          ? 'text-orange-600 font-bold'
                          : i + 1 < currentPosition.maand
                            ? 'text-slate-400'
                            : 'text-slate-500'
                      }`}
                    >
                      {m}
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative h-24">
                <div className="absolute inset-0 flex">
                  {months.map((m, i) => (
                    <div
                      key={m}
                      className={`flex-1 border-l ${
                        i + 1 < currentPosition.maand ? 'border-slate-100 bg-slate-50/50' : 'border-slate-100'
                      }`}
                    />
                  ))}
                </div>
                {/* Huidige positie lijn */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-orange-500 z-10"
                  style={{ left: `${((currentPosition.maand - 0.5) / 18) * 100}%` }}
                />
                {milestones.map((ms, i) => (
                  <div
                    key={i}
                    className="absolute flex flex-col items-center z-20"
                    style={{
                      left: `${((ms.maand - 0.5) / 18) * 100}%`,
                      transform: 'translateX(-50%)'
                    }}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all ${
                        ms.status === 'passed'
                          ? 'bg-green-500 text-white'
                          : ms.status === 'current'
                            ? 'bg-orange-500 text-white ring-4 ring-orange-200 animate-pulse'
                            : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {ms.status === 'passed' ? '✓' : milestoneIcons[ms.type]}
                    </div>
                    <span
                      className={`mt-2 text-xs text-center max-w-[90px] leading-tight ${
                        ms.status === 'current' ? 'font-semibold text-orange-600' : 'text-slate-600'
                      }`}
                    >
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
              <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                {swimlaneBy === 'none' ? 'Inspanningen Timeline' : groupName}
                <span className="text-sm font-normal text-slate-500">({items.length})</span>
                {swimlaneBy !== 'none' && items.length > 0 && (
                  <span className="ml-auto flex gap-2 text-xs">
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
                      {items.filter(i => i.status === 'completed').length} af
                    </span>
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                      {items.filter(i => i.status === 'in_progress').length} actief
                    </span>
                  </span>
                )}
              </h2>
              <div className="overflow-x-auto">
                <div className="min-w-[800px]">
                  {/* Month headers */}
                  <div className="flex border-b border-slate-200 mb-2">
                    <div className="w-52 shrink-0" />
                    <div className="flex-1 flex relative">
                      {months.map((m, i) => (
                        <div
                          key={m}
                          className={`flex-1 text-center text-xs pb-2 ${
                            i + 1 === currentPosition.maand
                              ? 'text-orange-600 font-bold'
                              : i + 1 < currentPosition.maand
                                ? 'text-slate-400'
                                : 'text-slate-500'
                          }`}
                        >
                          {m}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Inspanning rows */}
                  {items.map((inspanning) => {
                    const isPast = inspanning.eindMaand < currentPosition.maand
                    const isActive = inspanning.startMaand <= currentPosition.maand && inspanning.eindMaand >= currentPosition.maand
                    const isLate = inspanning.status === 'planned' && inspanning.startMaand < currentPosition.maand

                    return (
                      <div
                        key={inspanning.id}
                        className={`flex items-center h-12 cursor-pointer transition-colors ${
                          isActive ? 'bg-orange-50/50' : 'hover:bg-slate-50'
                        }`}
                        onClick={() => setSelectedInspanning(inspanning)}
                      >
                        <div className="w-52 shrink-0 pr-4 flex items-center gap-2">
                          <div className="flex-1 min-w-0">
                            <div className={`text-sm font-medium truncate ${
                              inspanning.status === 'completed' ? 'text-green-700' :
                              isLate ? 'text-amber-700' : 'text-slate-700'
                            }`}>
                              {inspanning.naam}
                            </div>
                            <div className="text-xs text-slate-400 flex items-center gap-1">
                              {inspanning.code}
                              {isLate && <AlertTriangle className="w-3 h-3 text-amber-500" />}
                            </div>
                          </div>
                          <span className={`shrink-0 w-2 h-2 rounded-full ${
                            inspanning.status === 'completed' ? 'bg-green-500' :
                            inspanning.status === 'in_progress' ? 'bg-blue-500' :
                            'bg-slate-300'
                          }`} />
                        </div>
                        <div className="flex-1 flex relative">
                          {months.map((m, i) => (
                            <div
                              key={m}
                              className={`flex-1 border-l h-9 ${
                                i + 1 < currentPosition.maand ? 'border-slate-100 bg-slate-50/30' : 'border-slate-100'
                              }`}
                            />
                          ))}
                          {/* Huidige positie lijn */}
                          <div
                            className="absolute top-0 bottom-0 w-0.5 bg-orange-500 z-10"
                            style={{ left: `${((currentPosition.maand - 0.5) / 18) * 100}%` }}
                          />
                          {/* Inspanning bar */}
                          <div
                            className={`absolute h-7 top-1 rounded-md transition-all ${
                              inspanning.status === 'completed'
                                ? 'bg-green-400 opacity-70'
                                : isLate
                                  ? 'bg-amber-400 opacity-90 ring-2 ring-amber-300'
                                  : typeColors[inspanning.type] + ' opacity-90'
                            } hover:opacity-100 hover:shadow-md`}
                            style={{
                              left: `${((inspanning.startMaand - 1) / 18) * 100}%`,
                              width: `${((inspanning.eindMaand - inspanning.startMaand + 1) / 18) * 100}%`
                            }}
                            title={`${inspanning.naam} (M${inspanning.startMaand}-M${inspanning.eindMaand}) - ${statusColors[inspanning.status].label}`}
                          >
                            <span className="absolute inset-0 flex items-center px-2 text-white text-xs font-medium truncate">
                              {inspanning.status === 'completed' && '✓ '}
                              {inspanning.code}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  })}

                  {items.length === 0 && (
                    <div className="py-8 text-center text-slate-400">
                      Geen inspanningen in deze groep
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Actieve Periode - Wat loopt er nu? */}
          {stats.inHuidigePeriode.length > 0 && (
            <div className="bg-orange-50 rounded-xl border border-orange-200 p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-500" />
                Actief in Maand {currentPosition.maand}
                <span className="text-sm font-normal text-slate-500">({stats.inHuidigePeriode.length} inspanningen)</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {stats.inHuidigePeriode.map(inspanning => (
                  <div
                    key={inspanning.id}
                    onClick={() => setSelectedInspanning(inspanning)}
                    className="bg-white rounded-lg border border-orange-200 p-3 cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-slate-800 truncate">{inspanning.naam}</div>
                        <div className="text-xs text-slate-500">{inspanning.code}</div>
                      </div>
                      <span className={`shrink-0 px-2 py-0.5 rounded-full text-xs ${statusColors[inspanning.status].bg} ${statusColors[inspanning.status].text}`}>
                        {statusColors[inspanning.status].label}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
                      <span className={`w-2 h-2 rounded ${typeColors[inspanning.type]}`}></span>
                      {typeLabels[inspanning.type]} • M{inspanning.startMaand}-M{inspanning.eindMaand}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* KPI Meetmomenten - Dynamisch */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">KPI Meetmomenten & Baten Tracking</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { maand: 0, label: 'Nulmeting', beschrijving: 'Baseline vastgelegd' },
                { maand: 9, label: 'Meting 1', beschrijving: 'Eerste voortgangscheck' },
                { maand: 15, label: 'Meting 2', beschrijving: 'Tweede voortgangscheck' },
                { maand: 18, label: 'Eindmeting', beschrijving: 'Finale batenrealisatie' }
              ].map((meting, i) => {
                const isPast = meting.maand < currentPosition.maand
                const isCurrent = Math.abs(meting.maand - currentPosition.maand) <= 1
                const batenMetWaarde = baten.filter(b => b.huidigeWaarde > 0).length
                const batenTotaal = baten.length

                return (
                  <div
                    key={i}
                    className={`p-4 rounded-lg border transition-all ${
                      isPast
                        ? 'bg-green-50 border-green-200'
                        : isCurrent
                          ? 'bg-orange-50 border-orange-300 ring-2 ring-orange-200'
                          : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm font-medium ${isCurrent ? 'text-orange-700' : 'text-slate-700'}`}>
                        {meting.label}
                      </span>
                      {isPast ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : isCurrent ? (
                        <Clock className="w-4 h-4 text-orange-500" />
                      ) : (
                        <Calendar className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mb-2">{meting.beschrijving}</p>
                    <div className="text-xs">
                      <span className={isPast ? 'text-green-600' : isCurrent ? 'text-orange-600' : 'text-slate-400'}>
                        {meting.maand === 0 ? 'Start programma' : `Maand ${meting.maand}`}
                      </span>
                    </div>
                    {isPast && meting.maand === 0 && batenTotaal > 0 && (
                      <div className="mt-2 text-xs text-green-600">
                        {batenMetWaarde}/{batenTotaal} baten gemeten
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </>
      )}

      {/* Detail Modal */}
      {selectedInspanning && (
        <InspanningDetailModal
          inspanning={selectedInspanning}
          onClose={() => setSelectedInspanning(null)}
          onOpenInInspanningen={handleOpenInInspanningen}
        />
      )}
    </div>
  )
}

export default Roadmap
