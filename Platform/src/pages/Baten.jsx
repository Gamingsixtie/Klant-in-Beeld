import { useState, useMemo } from 'react'
import { useAppStore } from '../stores/appStore'
import {
  Plus,
  Edit2,
  Trash2,
  X,
  Target,
  Building,
  Search,
  Filter,
  TrendingUp,
  Users,
  Layers,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Grid3X3,
  LayoutList,
  Lightbulb
} from 'lucide-react'

// Domein configuratie
const domeinConfig = {
  'Mens': { color: '#3B82F6', bg: 'bg-blue-500', bgLight: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', icon: Users },
  'Proces': { color: '#10B981', bg: 'bg-emerald-500', bgLight: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', icon: Layers },
  'Systeem': { color: '#8B5CF6', bg: 'bg-violet-500', bgLight: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-200', icon: Target },
  'Cultuur': { color: '#F59E0B', bg: 'bg-amber-500', bgLight: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', icon: TrendingUp }
}

// Sector configuratie - 3 sectoren
const sectorConfig = {
  'Primair onderwijs': { short: 'PO', color: 'bg-cyan-500', bgLight: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200' },
  'Voortgezet onderwijs': { short: 'VO', color: 'bg-indigo-500', bgLight: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
  'Zakelijk Professionals': { short: 'ZP', color: 'bg-emerald-500', bgLight: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' }
}

const domeinen = ['Mens', 'Proces', 'Systeem', 'Cultuur']
const sectoren = ['Primair onderwijs', 'Voortgezet onderwijs', 'Zakelijk Professionals']
const statussen = [
  { value: 'pending', label: 'Gepland', icon: Clock, color: 'text-slate-500' },
  { value: 'in_progress', label: 'In uitvoering', icon: AlertCircle, color: 'text-blue-500' },
  { value: 'completed', label: 'Afgerond', icon: CheckCircle, color: 'text-green-500' }
]

// Helper voor voortgang berekening
const calculateProgress = (huidigeWaarde, doelWaarde) => {
  const current = parseFloat(String(huidigeWaarde).replace(/[^0-9.-]/g, ''))
  const target = parseFloat(String(doelWaarde).replace(/[^0-9.-]/g, ''))
  if (isNaN(current) || isNaN(target) || target === 0) return null
  return Math.min(100, Math.max(0, (current / target) * 100))
}

// Impact levels configuratie
const impactLevels = [
  { value: 'hoog', label: 'Hoog', color: 'bg-green-500', ring: 'ring-green-500' },
  { value: 'midden', label: 'Midden', color: 'bg-yellow-500', ring: 'ring-yellow-500' },
  { value: 'laag', label: 'Laag', color: 'bg-slate-300', ring: 'ring-slate-300' }
]

// Domein impact indicator component - toont waar actie nodig is
const DomeinImpactIndicator = ({ domeinImpact, primaryDomein, compact = false, showLabel = false }) => {
  if (!domeinImpact) return null

  const getImpactStyle = (level) => {
    switch(level) {
      case 'hoog': return { bg: 'bg-red-500', text: 'Hoog' }
      case 'midden': return { bg: 'bg-amber-400', text: 'Midden' }
      case 'laag': return { bg: 'bg-slate-300', text: 'Laag' }
      default: return { bg: 'bg-slate-100', text: '' }
    }
  }

  const domeinInfo = {
    mens: { letter: 'M', name: 'Mens', color: 'text-blue-600' },
    proces: { letter: 'P', name: 'Proces', color: 'text-emerald-600' },
    systeem: { letter: 'S', name: 'Systeem', color: 'text-violet-600' },
    cultuur: { letter: 'C', name: 'Cultuur', color: 'text-amber-600' }
  }

  // Filter alleen domeinen met impact (niet het primaire domein)
  const impactDomeinen = Object.entries(domeinImpact)
    .filter(([key, level]) => level && key.toLowerCase() !== primaryDomein?.toLowerCase())
    .sort((a, b) => {
      const order = { hoog: 0, midden: 1, laag: 2 }
      return order[a[1]] - order[b[1]]
    })

  if (impactDomeinen.length === 0) return null

  if (compact) {
    return (
      <div className="flex gap-0.5">
        {impactDomeinen.map(([key, level]) => {
          const info = domeinInfo[key]
          const style = getImpactStyle(level)
          return (
            <div
              key={key}
              className={`w-4 h-4 text-[8px] rounded flex items-center justify-center font-bold ${style.bg} text-white`}
              title={`${info.name}: ${style.text} impact - actie nodig`}
            >
              {info.letter}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="mt-2 space-y-1">
      <p className="text-[10px] text-slate-500 font-medium">Ook actie nodig in:</p>
      <div className="flex flex-wrap gap-1">
        {impactDomeinen.map(([key, level]) => {
          const info = domeinInfo[key]
          const style = getImpactStyle(level)
          return (
            <span
              key={key}
              className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium ${style.bg} text-white`}
              title={`${info.name}: ${style.text} impact`}
            >
              {info.letter}
              <span className="opacity-80">{style.text}</span>
            </span>
          )
        })}
      </div>
    </div>
  )
}

function BaatForm({ baat, onSave, onCancel }) {
  const [form, setForm] = useState(baat || {
    sector: '',
    domein: '',
    naam: '',
    beschrijving: '',
    indicator: '',
    huidigeWaarde: '',
    doelWaarde: '',
    eigenaar: '',
    status: 'pending',
    domeinImpact: { mens: '', proces: '', systeem: '', cultuur: '' }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({ ...form, type: 'sector' }) // Alle baten zijn sector-gebaseerd
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-[#003366] to-[#0066cc] rounded-t-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">
                {baat ? 'Baat bewerken' : 'Nieuwe baat toevoegen'}
              </h2>
              <p className="text-white/70 text-sm mt-1">Definieer een baat voor een sector</p>
            </div>
            <button onClick={onCancel} className="p-2 hover:bg-white/10 rounded-lg">
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Sector selectie */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Sector *</label>
            <div className="grid grid-cols-3 gap-2">
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
                  </button>
                )
              })}
            </div>
          </div>

          {/* Domein selectie */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Domein *</label>
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
                        ? `${config.bgLight} ${config.border} ${config.text}`
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

          {/* Naam */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Naam van de baat *</label>
            <input
              type="text"
              value={form.naam}
              onChange={(e) => setForm({ ...form, naam: e.target.value })}
              placeholder="Bijv. Hogere klanttevredenheid"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#003366] focus:border-transparent"
              required
            />
          </div>

          {/* Beschrijving */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Beschrijving</label>
            <textarea
              value={form.beschrijving}
              onChange={(e) => setForm({ ...form, beschrijving: e.target.value })}
              placeholder="Waarom is deze baat belangrijk?"
              rows={2}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#003366] focus:border-transparent"
            />
          </div>

          {/* Indicator en waarden */}
          <div className="bg-slate-50 rounded-xl p-4 space-y-3">
            <h3 className="text-sm font-medium text-slate-700">Meetbaar maken</h3>
            <div>
              <label className="block text-xs text-slate-500 mb-1">KPI / Indicator</label>
              <input
                type="text"
                value={form.indicator}
                onChange={(e) => setForm({ ...form, indicator: e.target.value })}
                placeholder="Bijv. NPS score"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-500 mb-1">Huidige waarde</label>
                <input
                  type="text"
                  value={form.huidigeWaarde}
                  onChange={(e) => setForm({ ...form, huidigeWaarde: e.target.value })}
                  placeholder="Bijv. +15"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Doelwaarde</label>
                <input
                  type="text"
                  value={form.doelWaarde}
                  onChange={(e) => setForm({ ...form, doelWaarde: e.target.value })}
                  placeholder="Bijv. +40"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Domein Impact */}
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200">
            <h3 className="text-sm font-medium text-slate-700 mb-1">Impact op domeinen</h3>
            <p className="text-xs text-slate-500 mb-3">
              Eén baat kan impact hebben op meerdere domeinen. Geef per domein de mate van impact aan.
            </p>

            <div className="space-y-2">
              {[
                { key: 'mens', label: 'Mens', icon: Users, color: 'blue' },
                { key: 'proces', label: 'Proces', icon: Layers, color: 'emerald' },
                { key: 'systeem', label: 'Systeem', icon: Target, color: 'violet' },
                { key: 'cultuur', label: 'Cultuur', icon: TrendingUp, color: 'amber' }
              ].map(({ key, label, icon: Icon, color }) => {
                const currentImpact = form.domeinImpact?.[key] || ''
                const colorClasses = {
                  blue: { bg: 'bg-blue-500', light: 'bg-blue-50', text: 'text-blue-700' },
                  emerald: { bg: 'bg-emerald-500', light: 'bg-emerald-50', text: 'text-emerald-700' },
                  violet: { bg: 'bg-violet-500', light: 'bg-violet-50', text: 'text-violet-700' },
                  amber: { bg: 'bg-amber-500', light: 'bg-amber-50', text: 'text-amber-700' }
                }[color]

                return (
                  <div key={key} className="flex items-center gap-3 bg-white rounded-lg p-2 border border-slate-100">
                    <div className={`p-1.5 ${colorClasses.light} rounded`}>
                      <Icon className={`w-4 h-4 ${colorClasses.text}`} />
                    </div>
                    <span className="text-sm font-medium text-slate-700 w-20">{label}</span>
                    <div className="flex gap-1 flex-1">
                      {[
                        { value: 'hoog', label: 'Hoog', style: 'bg-green-500 text-white' },
                        { value: 'midden', label: 'Midden', style: 'bg-yellow-400 text-yellow-900' },
                        { value: 'laag', label: 'Laag', style: 'bg-slate-300 text-slate-700' }
                      ].map(level => (
                        <button
                          key={level.value}
                          type="button"
                          onClick={() => setForm({
                            ...form,
                            domeinImpact: {
                              ...form.domeinImpact,
                              [key]: currentImpact === level.value ? '' : level.value
                            }
                          })}
                          className={`flex-1 py-1.5 text-xs font-medium rounded transition-all ${
                            currentImpact === level.value
                              ? level.style
                              : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                          }`}
                        >
                          {level.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Eigenaar en Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Baateigenaar</label>
              <input
                type="text"
                value={form.eigenaar}
                onChange={(e) => setForm({ ...form, eigenaar: e.target.value })}
                placeholder="Sectormanager"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#003366] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#003366] focus:border-transparent"
              >
                {statussen.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <button type="button" onClick={onCancel} className="px-5 py-2.5 text-slate-600 hover:bg-slate-100 rounded-xl">
              Annuleren
            </button>
            <button
              type="submit"
              disabled={!form.sector || !form.domein || !form.naam}
              className="px-5 py-2.5 bg-[#003366] text-white rounded-xl hover:bg-[#0066cc] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {baat ? 'Opslaan' : 'Toevoegen'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function Baten() {
  const { baten, addBaat, updateBaat, deleteBaat } = useAppStore()
  const [showForm, setShowForm] = useState(false)
  const [editingBaat, setEditingBaat] = useState(null)
  const [search, setSearch] = useState('')
  const [viewType, setViewType] = useState('sectoren') // 'sectoren' | 'matrix'
  const [expandedSectors, setExpandedSectors] = useState(sectoren)
  const [filters, setFilters] = useState({ status: 'all' })

  // Filter baten
  const filteredBaten = useMemo(() => {
    return baten.filter(b => {
      const matchesStatus = filters.status === 'all' || b.status === filters.status
      const matchesSearch = !search ||
        b.naam?.toLowerCase().includes(search.toLowerCase()) ||
        b.beschrijving?.toLowerCase().includes(search.toLowerCase())
      return matchesStatus && matchesSearch
    })
  }, [baten, filters, search])

  // Group per sector, dan per domein
  const batenPerSector = useMemo(() => {
    return sectoren.reduce((acc, sector) => {
      const sectorBaten = filteredBaten.filter(b => b.sector === sector)
      acc[sector] = {
        total: sectorBaten.length,
        perDomein: domeinen.reduce((domAcc, d) => {
          domAcc[d] = sectorBaten.filter(b => b.domein === d)
          return domAcc
        }, {})
      }
      return acc
    }, {})
  }, [filteredBaten])

  // Matrix data: groepeer baten op eigenaarschap EN impact
  const matrixData = useMemo(() => {
    // Groepeer alle baten per domein (eigenaarschap)
    const perDomein = domeinen.reduce((acc, d) => {
      acc[d] = filteredBaten.filter(b => b.domein === d)
      return acc
    }, {})

    // Bereken impact per sector per domein
    // Dit toont ALLE baten die actie vereisen in een domein (eigenaar + impact)
    const impactPerSectorPerDomein = sectoren.reduce((sectorAcc, sector) => {
      const sectorBaten = filteredBaten.filter(b => b.sector === sector)

      sectorAcc[sector] = domeinen.reduce((domAcc, domein) => {
        const domeinKey = domein.toLowerCase()

        // Baten die hier eigenaar zijn
        const eigenaar = sectorBaten.filter(b => b.domein === domein)

        // Baten die hier impact hebben (maar ergens anders eigenaar zijn)
        const impact = sectorBaten.filter(b =>
          b.domein !== domein &&
          b.domeinImpact &&
          b.domeinImpact[domeinKey] &&
          b.domeinImpact[domeinKey] !== ''
        )

        domAcc[domein] = {
          eigenaar,
          impact,
          total: eigenaar.length + impact.length
        }
        return domAcc
      }, {})

      return sectorAcc
    }, {})

    // Vind overeenkomsten: baten met vergelijkbare namen
    const overeenkomsten = []
    const baatNamen = [...new Set(filteredBaten.map(b => b.naam?.toLowerCase().trim()))]

    baatNamen.forEach(naam => {
      if (!naam) return
      const matchingBaten = filteredBaten.filter(b => b.naam?.toLowerCase().trim() === naam)
      if (matchingBaten.length > 1) {
        overeenkomsten.push({
          naam: matchingBaten[0].naam,
          sectoren: [...new Set(matchingBaten.map(b => b.sector))],
          domein: matchingBaten[0].domein,
          count: matchingBaten.length
        })
      }
    })

    return { perDomein, overeenkomsten, impactPerSectorPerDomein }
  }, [filteredBaten])

  const handleSave = (form) => {
    if (editingBaat) {
      updateBaat(editingBaat.id, form)
    } else {
      addBaat(form)
    }
    setShowForm(false)
    setEditingBaat(null)
  }

  const handleEdit = (baat) => {
    setEditingBaat(baat)
    setShowForm(true)
  }

  const handleDelete = (id) => {
    if (confirm('Weet je zeker dat je deze baat wilt verwijderen?')) {
      deleteBaat(id)
    }
  }

  const toggleSector = (sector) => {
    setExpandedSectors(prev =>
      prev.includes(sector) ? prev.filter(s => s !== sector) : [...prev, sector]
    )
  }

  // Stats
  const stats = useMemo(() => ({
    total: baten.length,
    completed: baten.filter(b => b.status === 'completed').length,
    perSector: sectoren.reduce((acc, s) => {
      acc[s] = baten.filter(b => b.sector === s).length
      return acc
    }, {})
  }), [baten])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#003366] to-[#002855] rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Baten per Sector</h1>
            <p className="text-white/70 mt-1">Elke sector definieert baten over de 4 domeinen</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-white text-[#003366] rounded-xl font-medium hover:bg-white/90 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Nieuwe baat
          </button>
        </div>

        {/* Sector stats */}
        <div className="grid grid-cols-4 gap-3 mt-6">
          <div className="bg-white/10 backdrop-blur rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-white">{stats.total}</p>
            <p className="text-white/60 text-xs">Totaal</p>
          </div>
          {sectoren.map(sector => {
            const config = sectorConfig[sector]
            return (
              <div key={sector} className="bg-white/10 backdrop-blur rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-white">{stats.perSector[sector]}</p>
                <p className="text-white/60 text-xs">{config.short}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Uitleg Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
            <Lightbulb className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-blue-900 text-sm mb-1">Hoe werkt het?</h3>
            <p className="text-xs text-blue-800 leading-relaxed">
              <strong>Primair domein</strong> = Waar de baat "woont" (eigenaarschap).
              <strong className="ml-1">Impact domeinen</strong> = Waar OOK actie nodig is om de baat te realiseren.
              <br />
              <span className="text-blue-600">
                Voorbeeld: "Hogere klanttevredenheid" woont in Cultuur, maar vereist ook actie in Proces (werkwijzen aanpassen) en Systeem (tools verbeteren).
              </span>
            </p>
            <div className="flex items-center gap-3 mt-2">
              <span className="inline-flex items-center gap-1 text-[10px]">
                <span className="w-3 h-3 bg-red-500 rounded"></span> Hoog = Kritieke actie
              </span>
              <span className="inline-flex items-center gap-1 text-[10px]">
                <span className="w-3 h-3 bg-amber-400 rounded"></span> Midden = Ondersteunend
              </span>
              <span className="inline-flex items-center gap-1 text-[10px]">
                <span className="w-3 h-3 bg-slate-300 rounded"></span> Laag = Randvoorwaardelijk
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="flex-1 max-w-sm">
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#003366]">
              <div className="pl-4 pr-2">
                <Search className="w-5 h-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Zoeken..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 py-2.5 pr-4 bg-transparent border-0 focus:outline-none"
              />
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex bg-slate-100 rounded-xl p-1">
            <button
              onClick={() => setViewType('sectoren')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewType === 'sectoren' ? 'bg-white text-[#003366] shadow-sm' : 'text-slate-600'
              }`}
            >
              <LayoutList className="w-4 h-4" />
              Per sector
            </button>
            <button
              onClick={() => setViewType('matrix')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewType === 'matrix' ? 'bg-white text-[#003366] shadow-sm' : 'text-slate-600'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
              Matrix
            </button>
          </div>

          {/* Status filter */}
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="px-4 py-2 border border-slate-200 rounded-xl text-sm"
          >
            <option value="all">Alle statussen</option>
            {statussen.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>
      </div>

      {/* SECTOREN VIEW */}
      {viewType === 'sectoren' && (
        <div className="space-y-4">
          {sectoren.map(sector => {
            const sConfig = sectorConfig[sector]
            const sectorData = batenPerSector[sector]
            const isExpanded = expandedSectors.includes(sector)

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
                      <p className="text-sm text-slate-500">{sectorData.total} baten</p>
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
                          <div key={domein} className={`rounded-xl border ${dConfig.border} overflow-hidden`}>
                            <div className={`${dConfig.bgLight} px-3 py-2 border-b ${dConfig.border}`}>
                              <div className="flex items-center gap-2">
                                <DomeinIcon className={`w-4 h-4 ${dConfig.text}`} />
                                <span className={`text-sm font-medium ${dConfig.text}`}>{domein}</span>
                                <span className="text-xs text-slate-400 ml-auto">{items.length}</span>
                              </div>
                            </div>

                            <div className="p-2 space-y-2 min-h-[120px]">
                              {items.length > 0 ? (
                                items.map(baat => {
                                  const progress = calculateProgress(baat.huidigeWaarde, baat.doelWaarde)
                                  const statusCfg = statussen.find(s => s.value === baat.status)
                                  const StatusIcon = statusCfg?.icon || Clock

                                  return (
                                    <div
                                      key={baat.id}
                                      onClick={() => handleEdit(baat)}
                                      className="p-2 bg-slate-50 rounded-lg hover:bg-white hover:shadow-sm transition-all cursor-pointer group"
                                    >
                                      <div className="flex items-start justify-between">
                                        <p className="text-xs font-medium text-slate-700 line-clamp-2 group-hover:text-[#003366]">
                                          {baat.naam}
                                        </p>
                                        <StatusIcon className={`w-3.5 h-3.5 ${statusCfg?.color} ml-1 flex-shrink-0`} />
                                      </div>
                                      {progress !== null && (
                                        <div className="mt-2">
                                          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                                            <span>{baat.huidigeWaarde}</span>
                                            <span>{baat.doelWaarde}</span>
                                          </div>
                                          <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                                            <div className={`h-full ${dConfig.bg} rounded-full`} style={{ width: `${progress}%` }} />
                                          </div>
                                        </div>
                                      )}
                                      {/* Domein Impact - toont waar OOK actie nodig is */}
                                      <DomeinImpactIndicator
                                        domeinImpact={baat.domeinImpact}
                                        primaryDomein={baat.domein}
                                      />
                                      <div className="flex justify-end mt-2 opacity-0 group-hover:opacity-100">
                                        <button
                                          onClick={(e) => { e.stopPropagation(); handleDelete(baat.id) }}
                                          className="p-1 text-slate-400 hover:text-red-500"
                                        >
                                          <Trash2 className="w-3 h-3" />
                                        </button>
                                      </div>
                                    </div>
                                  )
                                })
                              ) : (
                                <div className="flex items-center justify-center h-full py-6">
                                  <button
                                    onClick={() => {
                                      setEditingBaat({ sector, domein })
                                      setShowForm(true)
                                    }}
                                    className={`text-xs ${dConfig.text} hover:underline`}
                                  >
                                    + Toevoegen
                                  </button>
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

      {/* MATRIX VIEW - Overeenkomsten vinden */}
      {viewType === 'matrix' && (
        <div className="space-y-6">
          {/* Overeenkomsten alert */}
          {matrixData.overeenkomsten.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <h3 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Overeenkomsten gevonden ({matrixData.overeenkomsten.length})
              </h3>
              <p className="text-sm text-amber-700 mb-3">
                Deze baten komen bij meerdere sectoren voor - mogelijk om te bundelen of af te stemmen
              </p>
              <div className="space-y-2">
                {matrixData.overeenkomsten.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 bg-white rounded-lg">
                    <span className="font-medium text-slate-800">{item.naam}</span>
                    <span className="text-xs text-slate-500">({item.domein})</span>
                    <div className="flex gap-1 ml-auto">
                      {item.sectoren.map(s => (
                        <span key={s} className={`px-2 py-0.5 text-xs rounded ${sectorConfig[s].bgLight} ${sectorConfig[s].text}`}>
                          {sectorConfig[s].short}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Legenda */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="flex items-center gap-6 text-sm">
              <span className="font-medium text-slate-700">Legenda:</span>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span className="text-slate-600">Eigenaar (primair domein)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-dashed border-red-400 rounded"></div>
                <span className="text-slate-600">Impact (actie nodig)</span>
              </div>
            </div>
          </div>

          {/* Matrix tabel: Sectoren x Domeinen met Eigenaar + Impact */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-200">
              <h3 className="font-semibold text-slate-800">Werkmatrix: Waar is actie nodig per domein?</h3>
              <p className="text-sm text-slate-500 mt-1">Toont zowel eigenaarschap als impact per sector/domein</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="p-3 text-left text-sm font-semibold text-slate-600 w-40">Sector</th>
                    {domeinen.map(d => {
                      const cfg = domeinConfig[d]
                      const Icon = cfg.icon
                      return (
                        <th key={d} className="p-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Icon className={`w-4 h-4 ${cfg.text}`} />
                            <span className={`text-sm font-semibold ${cfg.text}`}>{d}</span>
                          </div>
                        </th>
                      )
                    })}
                    <th className="p-3 text-center text-sm font-semibold text-slate-600">Acties</th>
                  </tr>
                </thead>
                <tbody>
                  {sectoren.map(sector => {
                    const sCfg = sectorConfig[sector]
                    const sectorImpactData = matrixData.impactPerSectorPerDomein?.[sector] || {}

                    // Tel totaal acties voor deze sector
                    const totalActies = domeinen.reduce((sum, d) => {
                      const data = sectorImpactData[d] || { total: 0 }
                      return sum + data.total
                    }, 0)

                    return (
                      <tr key={sector} className="border-t border-slate-100 hover:bg-slate-50">
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 ${sCfg.color} rounded flex items-center justify-center`}>
                              <span className="text-xs font-bold text-white">{sCfg.short}</span>
                            </div>
                            <span className="text-sm font-medium text-slate-700">{sector}</span>
                          </div>
                        </td>
                        {domeinen.map(d => {
                          const data = sectorImpactData[d] || { eigenaar: [], impact: [], total: 0 }
                          const dCfg = domeinConfig[d]
                          const domeinKey = d.toLowerCase()

                          return (
                            <td key={d} className="p-3 align-top">
                              <div className="space-y-1 min-w-[140px]">
                                {/* Eigenaar baten (solid) */}
                                {data.eigenaar.map(baat => (
                                  <div
                                    key={baat.id}
                                    onClick={() => handleEdit(baat)}
                                    className={`text-xs p-1.5 rounded ${dCfg.bg} text-white cursor-pointer hover:opacity-80 truncate`}
                                    title={`${baat.naam} (Eigenaar)`}
                                  >
                                    {baat.naam}
                                  </div>
                                ))}

                                {/* Impact baten (dashed border) */}
                                {data.impact.map(baat => {
                                  const impactLevel = baat.domeinImpact?.[domeinKey]
                                  const levelColor = impactLevel === 'hoog' ? 'border-red-400 bg-red-50 text-red-700'
                                    : impactLevel === 'midden' ? 'border-amber-400 bg-amber-50 text-amber-700'
                                    : 'border-slate-300 bg-slate-50 text-slate-600'

                                  return (
                                    <div
                                      key={`impact-${baat.id}`}
                                      onClick={() => handleEdit(baat)}
                                      className={`text-xs p-1.5 rounded border-2 border-dashed ${levelColor} cursor-pointer hover:opacity-80 truncate`}
                                      title={`${baat.naam} (Impact: ${impactLevel}) - eigenaar: ${baat.domein}`}
                                    >
                                      <span className="opacity-70">↪</span> {baat.naam}
                                    </div>
                                  )
                                })}

                                {data.total === 0 && (
                                  <span className="text-slate-300 text-xs">-</span>
                                )}
                              </div>
                            </td>
                          )
                        })}
                        <td className="p-3 text-center">
                          <span className="font-semibold text-slate-700">{totalActies}</span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
                <tfoot>
                  <tr className="bg-slate-50 border-t-2 border-slate-200">
                    <td className="p-3 font-semibold text-slate-700">Totaal per domein</td>
                    {domeinen.map(d => {
                      // Tel alle acties voor dit domein over alle sectoren
                      const totalForDomein = sectoren.reduce((sum, sector) => {
                        const data = matrixData.impactPerSectorPerDomein?.[sector]?.[d] || { total: 0 }
                        return sum + data.total
                      }, 0)
                      const cfg = domeinConfig[d]
                      return (
                        <td key={d} className="p-3 text-center">
                          <span className={`font-bold ${cfg.text}`}>{totalForDomein}</span>
                        </td>
                      )
                    })}
                    <td className="p-3 text-center">
                      <span className="font-bold text-[#003366]">
                        {sectoren.reduce((sum, sector) => {
                          return sum + domeinen.reduce((dSum, d) => {
                            const data = matrixData.impactPerSectorPerDomein?.[sector]?.[d] || { total: 0 }
                            return dSum + data.total
                          }, 0)
                        }, 0)}
                      </span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredBaten.length === 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <Target className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Nog geen baten</h3>
          <p className="text-slate-500 mb-6">Begin met het definiëren van baten per sector</p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#003366] text-white rounded-xl hover:bg-[#0066cc]"
          >
            <Plus className="w-5 h-5" />
            Eerste baat toevoegen
          </button>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <BaatForm
          baat={editingBaat}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditingBaat(null) }}
        />
      )}
    </div>
  )
}

export default Baten
