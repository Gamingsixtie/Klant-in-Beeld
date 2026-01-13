import { useState, useMemo } from 'react'
import { useAppStore } from '../stores/appStore'
import {
  Plus,
  Edit2,
  Trash2,
  X,
  Search,
  Briefcase,
  Repeat,
  GraduationCap,
  Monitor,
  Filter,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  Users,
  Layers,
  Target,
  TrendingUp,
  ChevronRight,
  ChevronDown,
  Play,
  Pause,
  Lightbulb,
  Link2,
  LayoutList,
  Building
} from 'lucide-react'

// Type configuratie
const typeConfig = {
  project: {
    label: 'Project',
    icon: Briefcase,
    color: '#3B82F6',
    bg: 'bg-blue-500',
    bgLight: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200'
  },
  proces: {
    label: 'Procesinspanning',
    icon: Repeat,
    color: '#8B5CF6',
    bg: 'bg-violet-500',
    bgLight: 'bg-violet-50',
    text: 'text-violet-700',
    border: 'border-violet-200'
  },
  leer: {
    label: 'Leertraject',
    icon: GraduationCap,
    color: '#10B981',
    bg: 'bg-emerald-500',
    bgLight: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200'
  },
  systeem: {
    label: 'Systeemtraject',
    icon: Monitor,
    color: '#F59E0B',
    bg: 'bg-amber-500',
    bgLight: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200'
  }
}

// Domein configuratie
const domeinConfig = {
  'Mens': { color: '#3B82F6', bg: 'bg-blue-500', bgLight: 'bg-blue-50', text: 'text-blue-700', icon: Users },
  'Proces': { color: '#10B981', bg: 'bg-emerald-500', bgLight: 'bg-emerald-50', text: 'text-emerald-700', icon: Layers },
  'Systeem': { color: '#8B5CF6', bg: 'bg-violet-500', bgLight: 'bg-violet-50', text: 'text-violet-700', icon: Target },
  'Cultuur': { color: '#F59E0B', bg: 'bg-amber-500', bgLight: 'bg-amber-50', text: 'text-amber-700', icon: TrendingUp }
}

// Sector configuratie - 3 sectoren
const sectorConfig = {
  'Primair onderwijs': { short: 'PO', color: 'bg-cyan-500', bgLight: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200' },
  'Voortgezet onderwijs': { short: 'VO', color: 'bg-indigo-500', bgLight: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
  'Zakelijk Professionals': { short: 'ZP', color: 'bg-emerald-500', bgLight: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  'Programma': { short: 'PRG', color: 'bg-slate-500', bgLight: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-300' }
}

const domeinen = ['Mens', 'Proces', 'Systeem', 'Cultuur']
const sectoren = ['Programma', 'Primair onderwijs', 'Voortgezet onderwijs', 'Zakelijk Professionals']

// Levenscyclus configuratie conform methodologie
const levenscyclusConfig = {
  verkennen: { label: 'Verkennen', color: 'bg-slate-500', icon: Search },
  opbouwen: { label: 'Opbouwen', color: 'bg-blue-500', icon: Play },
  uitvoeren: { label: 'Uitvoeren', color: 'bg-green-500', icon: CheckCircle },
  afbouwen: { label: 'Afbouwen', color: 'bg-amber-500', icon: Pause }
}
const levenscycli = ['verkennen', 'opbouwen', 'uitvoeren', 'afbouwen']

const statussen = [
  { value: 'planned', label: 'Gepland', icon: Clock, color: 'text-slate-500', bg: 'bg-slate-100' },
  { value: 'in_progress', label: 'In uitvoering', icon: AlertCircle, color: 'text-blue-500', bg: 'bg-blue-100' },
  { value: 'completed', label: 'Afgerond', icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-100' }
]

function InspanningForm({ inspanning, onSave, onCancel, baten }) {
  const [form, setForm] = useState(inspanning || {
    type: 'project',
    code: '',
    naam: '',
    beschrijving: '',
    sector: 'Programma',
    domein: '',
    eigenaar: '',
    leider: '',
    startMaand: 1,
    eindMaand: 6,
    status: 'planned',
    levenscyclus: 'opbouwen',
    werkfase: 1,
    gekoppeldeBaten: []
  })

  const toggleBaat = (baatId) => {
    const current = form.gekoppeldeBaten || []
    if (current.includes(baatId)) {
      setForm({ ...form, gekoppeldeBaten: current.filter(id => id !== baatId) })
    } else {
      setForm({ ...form, gekoppeldeBaten: [...current, baatId] })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(form)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" role="dialog" aria-modal="true">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-[#003366] to-[#0066cc] rounded-t-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">
                {inspanning ? 'Inspanning bewerken' : 'Nieuwe inspanning toevoegen'}
              </h2>
              <p className="text-white/70 text-sm mt-1">
                Definieer een project, proces of traject
              </p>
            </div>
            <button onClick={onCancel} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Type selectie */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">Type inspanning</label>
            <div className="grid grid-cols-4 gap-2">
              {Object.entries(typeConfig).map(([value, config]) => {
                const Icon = config.icon
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setForm({ ...form, type: value })}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                      form.type === value
                        ? `${config.bgLight} ${config.border} ${config.text}`
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <Icon className={`w-6 h-6 ${form.type === value ? config.text : 'text-slate-400'}`} />
                    <span className={`text-xs font-medium text-center ${form.type === value ? config.text : 'text-slate-600'}`}>
                      {config.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Sector selectie */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Sector (waar hoort deze inspanning bij?)</label>
            <div className="grid grid-cols-4 gap-2">
              {sectoren.map(s => {
                const config = sectorConfig[s]
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setForm({ ...form, sector: s })}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      form.sector === s
                        ? `${config.bgLight} ${config.border} ${config.text}`
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <p className={`text-lg font-bold text-center ${form.sector === s ? config.text : 'text-slate-600'}`}>
                      {config.short}
                    </p>
                    <p className={`text-xs text-center mt-1 ${form.sector === s ? config.text : 'text-slate-400'}`}>
                      {s === 'Programma' ? 'Overkoepelend' : s.split(' ')[0]}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Code en Naam */}
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Code</label>
              <input
                type="text"
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value })}
                placeholder="P-001"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#003366] focus:border-transparent font-mono"
                required
              />
            </div>
            <div className="col-span-3">
              <label className="block text-sm font-medium text-slate-700 mb-2">Naam</label>
              <input
                type="text"
                value={form.naam}
                onChange={(e) => setForm({ ...form, naam: e.target.value })}
                placeholder="Naam van de inspanning"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Beschrijving */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Beschrijving</label>
            <textarea
              value={form.beschrijving}
              onChange={(e) => setForm({ ...form, beschrijving: e.target.value })}
              placeholder="Beschrijf het doel en de scope..."
              rows={3}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#003366] focus:border-transparent"
            />
          </div>

          {/* Domein selectie */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Domein</label>
            <div className="grid grid-cols-4 gap-2">
              {domeinen.map(d => {
                const config = domeinConfig[d]
                const Icon = config.icon
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setForm({ ...form, domein: d })}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      form.domein === d
                        ? `${config.bgLight} ${config.text} border-current`
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mx-auto mb-1 ${form.domein === d ? config.text : 'text-slate-400'}`} />
                    <p className={`text-sm font-medium text-center ${form.domein === d ? config.text : 'text-slate-600'}`}>{d}</p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Levenscyclus en Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Levenscyclus</label>
              <div className="flex gap-1">
                {levenscycli.map(l => {
                  const config = levenscyclusConfig[l]
                  return (
                    <button
                      key={l}
                      type="button"
                      onClick={() => setForm({ ...form, levenscyclus: l })}
                      className={`flex-1 py-2 px-2 rounded-lg text-xs font-medium transition-all ${
                        form.levenscyclus === l
                          ? `${config.color} text-white`
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {config.label}
                    </button>
                  )
                })}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#003366] focus:border-transparent"
              >
                {statussen.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
          </div>

          {/* Periode */}
          <div className="bg-slate-50 rounded-xl p-4">
            <label className="block text-sm font-medium text-slate-700 mb-3">Periode (maand)</label>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="block text-xs text-slate-500 mb-1">Start</label>
                <input
                  type="number"
                  min="1"
                  max="18"
                  value={form.startMaand}
                  onChange={(e) => setForm({ ...form, startMaand: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                />
              </div>
              <div className="pt-5">
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-slate-500 mb-1">Eind</label>
                <input
                  type="number"
                  min="1"
                  max="18"
                  value={form.eindMaand}
                  onChange={(e) => setForm({ ...form, eindMaand: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                />
              </div>
              <div className="flex-1 pt-5">
                <div className="text-sm text-slate-600">
                  {form.eindMaand - form.startMaand + 1} maanden
                </div>
              </div>
            </div>
          </div>

          {/* Eigenaar en Leider */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Eigenaar</label>
              <input
                type="text"
                value={form.eigenaar}
                onChange={(e) => setForm({ ...form, eigenaar: e.target.value })}
                placeholder="Verantwoordelijke"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#003366] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Inspanningsleider</label>
              <input
                type="text"
                value={form.leider}
                onChange={(e) => setForm({ ...form, leider: e.target.value })}
                placeholder="Uitvoerende leider"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#003366] focus:border-transparent"
              />
            </div>
          </div>

          {/* Gekoppelde Baten */}
          {baten && baten.length > 0 && (
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200">
              <div className="flex items-center gap-2 mb-3">
                <Link2 className="w-4 h-4 text-slate-500" />
                <h3 className="text-sm font-medium text-slate-700">Draagt bij aan welke baten?</h3>
              </div>
              <p className="text-xs text-slate-500 mb-3">
                Selecteer de baten waar deze inspanning aan bijdraagt
              </p>
              <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto">
                {baten.map(baat => {
                  const isSelected = (form.gekoppeldeBaten || []).includes(baat.id)
                  const baatDomeinCfg = domeinConfig[baat.domein] || {}
                  return (
                    <button
                      key={baat.id}
                      type="button"
                      onClick={() => toggleBaat(baat.id)}
                      className={`flex items-start gap-2 p-2 rounded-lg text-left transition-all ${
                        isSelected
                          ? `${baatDomeinCfg.bgLight || 'bg-blue-50'} ring-2 ring-offset-1 ${baatDomeinCfg.border || 'ring-blue-300'}`
                          : 'bg-white border border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className={`w-4 h-4 mt-0.5 rounded flex-shrink-0 flex items-center justify-center border ${
                        isSelected ? `${baatDomeinCfg.bg || 'bg-blue-500'} border-transparent` : 'border-slate-300'
                      }`}>
                        {isSelected && <CheckCircle className="w-3 h-3 text-white" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className={`text-xs font-medium truncate ${isSelected ? (baatDomeinCfg.text || 'text-blue-700') : 'text-slate-700'}`}>
                          {baat.naam}
                        </p>
                        <p className="text-[10px] text-slate-400 truncate">
                          {baat.sector} • {baat.domein}
                        </p>
                      </div>
                    </button>
                  )
                })}
              </div>
              {(form.gekoppeldeBaten || []).length > 0 && (
                <p className="text-xs text-slate-500 mt-2">
                  {(form.gekoppeldeBaten || []).length} baat(en) geselecteerd
                </p>
              )}
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2.5 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Annuleren
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#003366] text-white rounded-xl hover:bg-[#0066cc] transition-colors"
            >
              {inspanning ? 'Wijzigingen opslaan' : 'Inspanning toevoegen'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function Inspanningen() {
  const { inspanningen, addInspanning, updateInspanning, deleteInspanning, baten } = useAppStore()
  const [showForm, setShowForm] = useState(false)
  const [editingInspanning, setEditingInspanning] = useState(null)
  const [search, setSearch] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedType, setSelectedType] = useState(null)
  const [selectedDomein, setSelectedDomein] = useState(null)
  const [selectedSector, setSelectedSector] = useState(null)
  const [viewType, setViewType] = useState('sector') // 'sector' | 'type'
  const [expandedSectors, setExpandedSectors] = useState(sectoren)

  // Filters
  const [filters, setFilters] = useState({
    status: 'all',
    levenscyclus: 'all'
  })

  // Statistics
  const stats = useMemo(() => {
    const byType = Object.keys(typeConfig).reduce((acc, type) => {
      acc[type] = inspanningen.filter(i => i.type === type).length
      return acc
    }, {})

    const byStatus = {
      planned: inspanningen.filter(i => i.status === 'planned').length,
      in_progress: inspanningen.filter(i => i.status === 'in_progress').length,
      completed: inspanningen.filter(i => i.status === 'completed').length
    }

    const byDomein = domeinen.reduce((acc, d) => {
      acc[d] = inspanningen.filter(i => i.domein === d).length
      return acc
    }, {})

    const bySector = sectoren.reduce((acc, s) => {
      acc[s] = inspanningen.filter(i => i.sector === s).length
      return acc
    }, {})

    return {
      total: inspanningen.length,
      byType,
      byStatus,
      byDomein,
      bySector
    }
  }, [inspanningen])

  // Filtered inspanningen
  const filteredInspanningen = useMemo(() => {
    return inspanningen.filter(i => {
      const matchesType = !selectedType || i.type === selectedType
      const matchesDomein = !selectedDomein || i.domein === selectedDomein
      const matchesSector = !selectedSector || i.sector === selectedSector
      const matchesStatus = filters.status === 'all' || i.status === filters.status
      const matchesLevenscyclus = filters.levenscyclus === 'all' || i.levenscyclus === filters.levenscyclus
      const matchesSearch = !search ||
        i.naam?.toLowerCase().includes(search.toLowerCase()) ||
        i.code?.toLowerCase().includes(search.toLowerCase())
      return matchesType && matchesDomein && matchesSector && matchesStatus && matchesLevenscyclus && matchesSearch
    }).sort((a, b) => a.startMaand - b.startMaand)
  }, [inspanningen, selectedType, selectedDomein, selectedSector, filters, search])

  // Group by type for main view
  const inspanningenPerType = useMemo(() => {
    return Object.keys(typeConfig).reduce((acc, type) => {
      acc[type] = filteredInspanningen.filter(i => i.type === type)
      return acc
    }, {})
  }, [filteredInspanningen])

  // Group by sector, then by domein (like Baten)
  const inspanningenPerSector = useMemo(() => {
    return sectoren.reduce((acc, sector) => {
      const sectorItems = filteredInspanningen.filter(i => i.sector === sector)
      acc[sector] = {
        total: sectorItems.length,
        perDomein: domeinen.reduce((domAcc, d) => {
          domAcc[d] = sectorItems.filter(i => i.domein === d)
          return domAcc
        }, {})
      }
      return acc
    }, {})
  }, [filteredInspanningen])

  const toggleSector = (sector) => {
    setExpandedSectors(prev =>
      prev.includes(sector) ? prev.filter(s => s !== sector) : [...prev, sector]
    )
  }

  const handleSave = (form) => {
    if (editingInspanning) {
      updateInspanning(editingInspanning.id, form)
    } else {
      addInspanning(form)
    }
    setShowForm(false)
    setEditingInspanning(null)
  }

  const handleEdit = (inspanning) => {
    setEditingInspanning(inspanning)
    setShowForm(true)
  }

  const handleDelete = (id) => {
    if (confirm('Weet je zeker dat je deze inspanning wilt verwijderen?')) {
      deleteInspanning(id)
    }
  }

  const handleStatusChange = (id, newStatus) => {
    updateInspanning(id, { status: newStatus })
  }

  const activeFiltersCount = Object.values(filters).filter(v => v !== 'all').length +
    (selectedType ? 1 : 0) + (selectedDomein ? 1 : 0) + (selectedSector ? 1 : 0)

  return (
    <div className="space-y-6">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-[#003366] to-[#002855] rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Inspanningen</h1>
            <p className="text-white/70 mt-1">
              Beheer projecten, processen en trajecten binnen het programma
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-white text-[#003366] rounded-xl font-medium hover:bg-white/90 transition-colors shadow-sm"
          >
            <Plus className="w-5 h-5" />
            Nieuwe inspanning
          </button>
        </div>

        {/* Summary Stats - Type breakdown */}
        <div className="grid grid-cols-5 gap-4 mt-6">
          <div className="bg-white/10 backdrop-blur rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
                <p className="text-white/70 text-sm">Totaal</p>
              </div>
            </div>
          </div>
          {Object.entries(typeConfig).map(([type, config]) => {
            const Icon = config.icon
            return (
              <div
                key={type}
                onClick={() => setSelectedType(selectedType === type ? null : type)}
                className={`backdrop-blur rounded-xl p-4 cursor-pointer transition-all ${
                  selectedType === type
                    ? 'bg-white ring-2 ring-white'
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${selectedType === type ? config.bg : 'bg-white/20'}`}>
                    <Icon className={`w-5 h-5 ${selectedType === type ? 'text-white' : 'text-white'}`} />
                  </div>
                  <div>
                    <p className={`text-2xl font-bold ${selectedType === type ? config.text : 'text-white'}`}>
                      {stats.byType[type]}
                    </p>
                    <p className={`text-sm ${selectedType === type ? 'text-slate-600' : 'text-white/70'}`}>
                      {config.label.split(' ')[0]}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex items-center gap-4">
          {/* Search - Fixed design */}
          <div className="flex-1 max-w-sm">
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#003366] focus-within:border-transparent focus-within:bg-white transition-all">
              <div className="pl-4 pr-2">
                <Search className="w-5 h-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Zoeken..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 py-2.5 pr-4 bg-transparent border-0 focus:outline-none focus:ring-0 text-slate-700 placeholder-slate-400"
              />
            </div>
          </div>

          {/* Sector Quick Filters */}
          <div className="flex items-center gap-1 border-r border-slate-200 pr-3">
            {sectoren.map(s => {
              const config = sectorConfig[s]
              return (
                <button
                  key={s}
                  onClick={() => setSelectedSector(selectedSector === s ? null : s)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedSector === s
                      ? `${config.color} text-white`
                      : `${config.bgLight} ${config.text} hover:opacity-80`
                  }`}
                  title={s}
                >
                  {config.short}
                </button>
              )
            })}
          </div>

          {/* Domein Quick Filters */}
          <div className="flex items-center gap-1">
            {domeinen.map(d => {
              const config = domeinConfig[d]
              return (
                <button
                  key={d}
                  onClick={() => setSelectedDomein(selectedDomein === d ? null : d)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedDomein === d
                      ? `${config.bg} text-white`
                      : `${config.bgLight} ${config.text} hover:opacity-80`
                  }`}
                >
                  {d}
                </button>
              )
            })}
          </div>

          {/* More Filters */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showFilters || activeFiltersCount > 0
                ? 'bg-[#003366] text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Filter className="w-4 h-4" />
            Filters
            {activeFiltersCount > 0 && (
              <span className="bg-white text-[#003366] px-1.5 py-0.5 rounded-full text-xs font-bold">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {activeFiltersCount > 0 && (
            <button
              onClick={() => {
                setFilters({ status: 'all', levenscyclus: 'all' })
                setSelectedType(null)
                setSelectedDomein(null)
                setSelectedSector(null)
              }}
              className="text-sm text-slate-500 hover:text-slate-700"
            >
              Wis filters
            </button>
          )}

          {/* View Toggle */}
          <div className="flex items-center gap-1 ml-auto border-l border-slate-200 pl-4">
            <button
              onClick={() => setViewType('sector')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                viewType === 'sector'
                  ? 'bg-[#003366] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Building className="w-4 h-4" />
              Per Sector
            </button>
            <button
              onClick={() => setViewType('type')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                viewType === 'type'
                  ? 'bg-[#003366] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <LayoutList className="w-4 h-4" />
              Per Type
            </button>
          </div>
        </div>

        {/* Extended Filters Panel */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-slate-200">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-2">Status</label>
                <div className="flex flex-wrap gap-2">
                  {statussen.map(s => {
                    const Icon = s.icon
                    return (
                      <button
                        key={s.value}
                        onClick={() => setFilters({ ...filters, status: filters.status === s.value ? 'all' : s.value })}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                          filters.status === s.value
                            ? 'bg-[#003366] text-white'
                            : `${s.bg} ${s.color} hover:opacity-80`
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {s.label}
                      </button>
                    )
                  })}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-2">Levenscyclus</label>
                <div className="flex flex-wrap gap-2">
                  {levenscycli.map(l => {
                    const config = levenscyclusConfig[l]
                    return (
                      <button
                        key={l}
                        onClick={() => setFilters({ ...filters, levenscyclus: filters.levenscyclus === l ? 'all' : l })}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                          filters.levenscyclus === l
                            ? `${config.color} text-white`
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {config.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Uitleg Banner */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200 p-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-indigo-100 rounded-lg flex-shrink-0">
            <Lightbulb className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-semibold text-indigo-900 text-sm mb-1">Inspanningen & Baten</h3>
            <p className="text-xs text-indigo-800 leading-relaxed">
              <strong>Inspanningen</strong> zijn de concrete activiteiten (projecten, processen, trajecten) die bijdragen aan het realiseren van <strong>baten</strong>.
              <br />
              <span className="text-indigo-600">
                Elke inspanning is gekoppeld aan één of meer baten. Zo zie je direct welke activiteiten bijdragen aan welke resultaten.
              </span>
            </p>
            <div className="flex items-center gap-4 mt-2">
              <span className="inline-flex items-center gap-1 text-[10px]">
                <Link2 className="w-3 h-3 text-indigo-500" /> Gekoppelde baten
              </span>
              <span className="inline-flex items-center gap-1 text-[10px]">
                <Target className="w-3 h-3 text-violet-500" /> Draagt bij aan resultaat
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTOR VIEW - Per Sector > Per Domein */}
      {viewType === 'sector' && (
        <div className="space-y-4">
          {sectoren.map(sector => {
            const sConfig = sectorConfig[sector]
            const sectorData = inspanningenPerSector[sector]
            const isExpanded = expandedSectors.includes(sector)

            // Skip sectors without items unless showing all
            if (sectorData.total === 0 && !selectedSector) return null

            return (
              <div key={sector} className={`bg-white rounded-xl border-2 ${sConfig.border} overflow-hidden`}>
                {/* Sector Header */}
                <button
                  onClick={() => toggleSector(sector)}
                  className={`w-full ${sConfig.bgLight} px-5 py-4 flex items-center justify-between hover:opacity-90`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 ${sConfig.color} rounded-lg`}>
                      <Building className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className={`font-semibold ${sConfig.text}`}>{sector}</h3>
                      <p className="text-sm text-slate-500">{sectorData.total} inspanningen</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {/* Domein indicators */}
                    <div className="flex gap-1">
                      {domeinen.map(d => {
                        const dConfig = domeinConfig[d]
                        const count = sectorData.perDomein[d]?.length || 0
                        return (
                          <div
                            key={d}
                            className={`w-8 h-8 rounded flex items-center justify-center text-xs font-bold ${
                              count > 0 ? `${dConfig.bg} text-white` : 'bg-slate-200 text-slate-400'
                            }`}
                            title={`${d}: ${count}`}
                          >
                            {count}
                          </div>
                        )
                      })}
                    </div>
                    {isExpanded ? <ChevronDown className="w-5 h-5 text-slate-400" /> : <ChevronRight className="w-5 h-5 text-slate-400" />}
                  </div>
                </button>

                {/* Expanded: 4 domeinen */}
                {isExpanded && (
                  <div className="p-4">
                    <div className="grid grid-cols-4 gap-4">
                      {domeinen.map(domein => {
                        const dConfig = domeinConfig[domein]
                        const DomeinIcon = dConfig.icon
                        const items = sectorData.perDomein[domein] || []

                        return (
                          <div key={domein} className={`rounded-xl border ${dConfig.border || 'border-slate-200'} overflow-hidden`}>
                            <div className={`${dConfig.bgLight} px-3 py-2 border-b ${dConfig.border || 'border-slate-200'}`}>
                              <div className="flex items-center gap-2">
                                <DomeinIcon className={`w-4 h-4 ${dConfig.text}`} />
                                <span className={`text-sm font-medium ${dConfig.text}`}>{domein}</span>
                                <span className="text-xs text-slate-400 ml-auto">{items.length}</span>
                              </div>
                            </div>

                            <div className="p-2 space-y-2 min-h-[120px]">
                              {items.length > 0 ? (
                                items.map(inspanning => {
                                  const tConfig = typeConfig[inspanning.type] || {}
                                  const TypeIcon = tConfig.icon || Briefcase
                                  const statusCfg = statussen.find(s => s.value === inspanning.status) || {}

                                  return (
                                    <div
                                      key={inspanning.id}
                                      onClick={() => handleEdit(inspanning)}
                                      className="p-2 bg-slate-50 rounded-lg hover:bg-white hover:shadow-sm transition-all cursor-pointer group"
                                    >
                                      <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-1.5">
                                          <TypeIcon className={`w-3.5 h-3.5 ${tConfig.text || 'text-slate-500'}`} />
                                          <span className="text-[10px] font-mono text-slate-400">{inspanning.code}</span>
                                        </div>
                                        <div className={`w-2 h-2 rounded-full ${statusCfg.color?.replace('text-', 'bg-') || 'bg-slate-300'}`} />
                                      </div>
                                      <p className="text-xs font-medium text-slate-700 line-clamp-2 mt-1 group-hover:text-[#003366]">
                                        {inspanning.naam}
                                      </p>
                                      <div className="flex items-center gap-2 mt-1.5 text-[10px] text-slate-400">
                                        <Calendar className="w-3 h-3" />
                                        <span>M{inspanning.startMaand}-M{inspanning.eindMaand}</span>
                                      </div>
                                      {/* Gekoppelde Baten */}
                                      {inspanning.gekoppeldeBaten && inspanning.gekoppeldeBaten.length > 0 && (
                                        <div className="flex items-center gap-1 mt-1.5">
                                          <Link2 className="w-3 h-3 text-slate-400" />
                                          <span className="text-[10px] text-slate-400">
                                            {inspanning.gekoppeldeBaten.length} baat(en)
                                          </span>
                                        </div>
                                      )}
                                      <div className="flex justify-end mt-2 opacity-0 group-hover:opacity-100">
                                        <button
                                          onClick={(e) => { e.stopPropagation(); handleDelete(inspanning.id) }}
                                          className="p-1 text-slate-400 hover:text-red-500"
                                        >
                                          <Trash2 className="w-3 h-3" />
                                        </button>
                                      </div>
                                    </div>
                                  )
                                })
                              ) : (
                                <div className="h-full flex items-center justify-center text-xs text-slate-400 italic">
                                  Geen inspanningen
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* TYPE VIEW - Content per Type */}
      {viewType === 'type' && Object.entries(typeConfig).map(([type, config]) => {
        const items = inspanningenPerType[type] || []
        const Icon = config.icon

        // Skip if filtered by type and not matching
        if (selectedType && selectedType !== type) return null
        // Skip if no items
        if (items.length === 0 && !selectedType) return null

        return (
          <div key={type} className="space-y-4">
            {/* Type Header */}
            <div className={`flex items-center gap-3 ${config.bgLight} rounded-xl p-4`}>
              <div className={`p-2 ${config.bg} rounded-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className={`text-lg font-semibold ${config.text}`}>{config.label}en</h2>
                <p className="text-sm text-slate-500">{items.length} items</p>
              </div>
            </div>

            {/* Items Grid */}
            {items.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((inspanning) => {
                  const domeinCfg = domeinConfig[inspanning.domein] || {}
                  const DomeinIcon = domeinCfg.icon || Target
                  const statusCfg = statussen.find(s => s.value === inspanning.status) || {}
                  const StatusIcon = statusCfg.icon || Clock
                  const lcConfig = levenscyclusConfig[inspanning.levenscyclus] || {}
                  const duration = inspanning.eindMaand - inspanning.startMaand + 1

                  return (
                    <div
                      key={inspanning.id}
                      className={`bg-white rounded-xl border-2 ${config.border} overflow-hidden hover:shadow-lg transition-shadow group`}
                    >
                      {/* Card Header */}
                      <div className={`${config.bgLight} px-4 py-3 border-b ${config.border}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className={`font-mono text-sm ${config.text}`}>{inspanning.code}</span>
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${lcConfig.color} text-white`}>
                              {lcConfig.label}
                            </span>
                          </div>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleEdit(inspanning)}
                              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-white rounded-lg"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(inspanning.id)}
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-4">
                        <h3 className="font-semibold text-slate-800 mb-1">{inspanning.naam}</h3>
                        <p className="text-sm text-slate-500 line-clamp-2 mb-4">{inspanning.beschrijving}</p>

                        {/* Meta Info */}
                        <div className="space-y-2">
                          {/* Sector */}
                          {inspanning.sector && (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-slate-500">Sector</span>
                              <span className={`px-2 py-0.5 rounded text-xs font-medium ${sectorConfig[inspanning.sector]?.bgLight || 'bg-slate-100'} ${sectorConfig[inspanning.sector]?.text || 'text-slate-600'}`}>
                                {sectorConfig[inspanning.sector]?.short || inspanning.sector}
                              </span>
                            </div>
                          )}

                          {/* Domein */}
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-500">Domein</span>
                            <span className={`flex items-center gap-1 px-2 py-0.5 rounded ${domeinCfg.bgLight} ${domeinCfg.text}`}>
                              <DomeinIcon className="w-3 h-3" />
                              {inspanning.domein}
                            </span>
                          </div>

                          {/* Periode */}
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-500">Periode</span>
                            <span className="flex items-center gap-1 text-slate-700">
                              <Calendar className="w-3 h-3 text-slate-400" />
                              M{inspanning.startMaand} - M{inspanning.eindMaand}
                              <span className="text-slate-400">({duration}m)</span>
                            </span>
                          </div>

                          {/* Timeline Bar */}
                          <div className="pt-2">
                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${config.bg} rounded-full`}
                                style={{
                                  marginLeft: `${((inspanning.startMaand - 1) / 18) * 100}%`,
                                  width: `${(duration / 18) * 100}%`
                                }}
                              />
                            </div>
                            <div className="flex justify-between text-xs text-slate-400 mt-1">
                              <span>M1</span>
                              <span>M18</span>
                            </div>
                          </div>

                          {/* Gekoppelde Baten */}
                          {inspanning.gekoppeldeBaten && inspanning.gekoppeldeBaten.length > 0 && (
                            <div className="pt-3 mt-3 border-t border-slate-100">
                              <div className="flex items-center gap-1.5 mb-2">
                                <Link2 className="w-3 h-3 text-slate-400" />
                                <span className="text-xs text-slate-500">Draagt bij aan:</span>
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {inspanning.gekoppeldeBaten.map(baatId => {
                                  const baat = baten.find(b => b.id === baatId)
                                  if (!baat) return null
                                  const baatDomeinCfg = domeinConfig[baat.domein] || {}
                                  return (
                                    <span
                                      key={baatId}
                                      className={`text-[10px] px-1.5 py-0.5 rounded ${baatDomeinCfg.bgLight || 'bg-slate-100'} ${baatDomeinCfg.text || 'text-slate-600'} truncate max-w-[120px]`}
                                      title={baat.naam}
                                    >
                                      {baat.naam}
                                    </span>
                                  )
                                })}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                          <span className="text-xs text-slate-500">{inspanning.eigenaar}</span>
                          <select
                            value={inspanning.status}
                            onChange={(e) => handleStatusChange(inspanning.id, e.target.value)}
                            className={`text-xs px-2 py-1 rounded-lg border-0 cursor-pointer ${statusCfg.bg} ${statusCfg.color}`}
                          >
                            {statussen.map(s => (
                              <option key={s.value} value={s.value}>{s.label}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
                <Icon className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 mb-3">Nog geen {config.label.toLowerCase()}en</p>
                <button
                  onClick={() => setShowForm(true)}
                  className={`inline-flex items-center gap-2 px-4 py-2 ${config.bgLight} ${config.text} rounded-lg text-sm font-medium hover:opacity-80`}
                >
                  <Plus className="w-4 h-4" />
                  Voeg {config.label.toLowerCase()} toe
                </button>
              </div>
            )}
          </div>
        )
      })}

      {/* Empty State */}
      {filteredInspanningen.length === 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Geen inspanningen gevonden</h3>
          <p className="text-slate-500 mb-6">
            {search || activeFiltersCount > 0
              ? 'Pas je zoek- of filtercriteria aan'
              : 'Begin met het toevoegen van projecten en trajecten'
            }
          </p>
          {!search && activeFiltersCount === 0 && (
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#003366] text-white rounded-xl hover:bg-[#0066cc] transition-colors"
            >
              <Plus className="w-5 h-5" />
              Eerste inspanning toevoegen
            </button>
          )}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <InspanningForm
          inspanning={editingInspanning}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditingInspanning(null) }}
          baten={baten}
        />
      )}
    </div>
  )
}

export default Inspanningen
