import { useState, useMemo } from 'react'
import { useAppStore } from '../stores/appStore'
import {
  Zap,
  Target,
  Wrench,
  Users,
  Cpu,
  Heart,
  Brain,
  Briefcase,
  Filter,
  TrendingUp,
  User,
  Link2,
  ChevronRight,
  Gauge,
  Plus,
  Edit3,
  Save,
  X,
  Trash2,
  Check,
  ArrowRight,
  Award,
  Sparkles,
  BarChart3,
  CheckCircle2,
  Clock,
  Settings
} from 'lucide-react'

// Vermogen type icons and colors
const typeConfig = {
  Organisatorisch: { icon: Briefcase, color: 'from-slate-500 to-slate-600', bgLight: 'bg-slate-50', text: 'text-slate-700' },
  Inhoudelijk: { icon: Brain, color: 'from-purple-500 to-purple-600', bgLight: 'bg-purple-50', text: 'text-purple-700' },
  Menselijk: { icon: Users, color: 'from-blue-500 to-blue-600', bgLight: 'bg-blue-50', text: 'text-blue-700' },
  Financieel: { icon: Briefcase, color: 'from-emerald-500 to-emerald-600', bgLight: 'bg-emerald-50', text: 'text-emerald-700' },
  Technisch: { icon: Cpu, color: 'from-cyan-500 to-cyan-600', bgLight: 'bg-cyan-50', text: 'text-cyan-700' },
  Cultureel: { icon: Heart, color: 'from-rose-500 to-rose-600', bgLight: 'bg-rose-50', text: 'text-rose-700' }
}

// Domein colors
const domeinConfig = {
  Mens: { color: '#3b82f6', bg: 'bg-blue-500', bgLight: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  Proces: { color: '#10b981', bg: 'bg-emerald-500', bgLight: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  Systeem: { color: '#8b5cf6', bg: 'bg-purple-500', bgLight: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  Cultuur: { color: '#f59e0b', bg: 'bg-amber-500', bgLight: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' }
}

// Status config
const statusConfig = {
  operationeel: { label: 'Operationeel', color: 'bg-emerald-500', textColor: 'text-emerald-700', bgLight: 'bg-emerald-50', icon: CheckCircle2 },
  in_ontwikkeling: { label: 'In ontwikkeling', color: 'bg-blue-500', textColor: 'text-blue-700', bgLight: 'bg-blue-50', icon: Settings },
  gepland: { label: 'Gepland', color: 'bg-slate-400', textColor: 'text-slate-600', bgLight: 'bg-slate-50', icon: Clock }
}

// Volwassenheid levels
const volwassenheidLabels = ['', 'Initieel', 'Herhaalbaar', 'Gedefinieerd', 'Beheerst', 'Geoptimaliseerd']

// Options
const typeOptions = ['Organisatorisch', 'Inhoudelijk', 'Menselijk', 'Financieel', 'Technisch', 'Cultureel']
const domeinOptions = ['Mens', 'Proces', 'Systeem', 'Cultuur']
const statusOptions = ['gepland', 'in_ontwikkeling', 'operationeel']

// Maturity Ring Component
function MaturityRing({ current, target, size = 80, color = '#8b5cf6' }) {
  const radius = (size - 8) / 2
  const circumference = radius * 2 * Math.PI
  const currentOffset = circumference - (current / 5) * circumference
  const targetOffset = circumference - (target / 5) * circumference

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        {/* Background */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e2e8f0"
          strokeWidth={8}
          fill="none"
        />
        {/* Target (lighter) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeOpacity={0.2}
          strokeWidth={8}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={targetOffset}
        />
        {/* Current (solid) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={8}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={currentOffset}
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-bold text-slate-800">{current}</span>
        <span className="text-[10px] text-slate-400">van {target}</span>
      </div>
    </div>
  )
}

export default function Vermogens() {
  const {
    vermogens,
    strategischeDoelen,
    inspanningen,
    addVermogen,
    updateVermogen,
    deleteVermogen,
    linkVermogenToDoel,
    unlinkVermogenFromDoel,
    linkVermogenToInspanning,
    unlinkVermogenFromInspanning
  } = useAppStore()

  const [filterType, setFilterType] = useState(null)
  const [filterDomein, setFilterDomein] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingVermogen, setEditingVermogen] = useState(null)
  const [linkingVermogen, setLinkingVermogen] = useState(null)
  const [linkingType, setLinkingType] = useState(null)

  // Form state for new vermogen
  const [newVermogen, setNewVermogen] = useState({
    naam: '',
    beschrijving: '',
    type: 'Organisatorisch',
    domein: 'Proces',
    eigenaar: '',
    volwassenheidHuidig: 1,
    volwassenheidDoel: 3,
    status: 'gepland',
    gekoppeldeDoelen: [],
    gekoppeldeInspanningen: []
  })

  // Statistics
  const stats = useMemo(() => {
    const operationeel = vermogens.filter(v => v.status === 'operationeel').length
    const inOntwikkeling = vermogens.filter(v => v.status === 'in_ontwikkeling').length
    const gepland = vermogens.filter(v => v.status === 'gepland').length

    const avgCurrent = vermogens.length > 0
      ? (vermogens.reduce((sum, v) => sum + (v.volwassenheidHuidig || 1), 0) / vermogens.length).toFixed(1)
      : 0
    const avgTarget = vermogens.length > 0
      ? (vermogens.reduce((sum, v) => sum + (v.volwassenheidDoel || 3), 0) / vermogens.length).toFixed(1)
      : 0

    const byDomein = domeinOptions.reduce((acc, d) => {
      acc[d] = vermogens.filter(v => v.domein === d).length
      return acc
    }, {})

    return { total: vermogens.length, operationeel, inOntwikkeling, gepland, avgCurrent, avgTarget, byDomein }
  }, [vermogens])

  // Filter vermogens
  const filteredVermogens = vermogens.filter(v => {
    if (filterType && v.type !== filterType) return false
    if (filterDomein && v.domein !== filterDomein) return false
    return true
  })

  // Get linked items
  const getLinkedDoelen = (gekoppeldeDoelen) => {
    if (!gekoppeldeDoelen) return []
    return gekoppeldeDoelen.map(id => strategischeDoelen.find(d => d.id === id)).filter(Boolean)
  }

  const getLinkedInspanningen = (gekoppeldeInspanningen) => {
    if (!gekoppeldeInspanningen) return []
    return gekoppeldeInspanningen.map(id => inspanningen.find(i => i.id === id)).filter(Boolean)
  }

  // Handlers
  const handleAddVermogen = () => {
    if (newVermogen.naam.trim()) {
      addVermogen(newVermogen)
      setNewVermogen({
        naam: '', beschrijving: '', type: 'Organisatorisch', domein: 'Proces',
        eigenaar: '', volwassenheidHuidig: 1, volwassenheidDoel: 3, status: 'gepland',
        gekoppeldeDoelen: [], gekoppeldeInspanningen: []
      })
      setShowAddForm(false)
    }
  }

  const handleUpdateVermogen = (id) => {
    const form = document.getElementById(`vermogen-form-${id}`)
    if (!form) return
    const updates = {
      naam: form.naam.value,
      beschrijving: form.beschrijving.value,
      type: form.type.value,
      domein: form.domein.value,
      eigenaar: form.eigenaar.value,
      volwassenheidHuidig: parseInt(form.volwassenheidHuidig.value),
      volwassenheidDoel: parseInt(form.volwassenheidDoel.value),
      status: form.status.value
    }
    updateVermogen(id, updates)
    setEditingVermogen(null)
  }

  const handleToggleDoel = (vermogenId, doelId) => {
    const vermogen = vermogens.find(v => v.id === vermogenId)
    if (!vermogen) return
    if (vermogen.gekoppeldeDoelen?.includes(doelId)) {
      unlinkVermogenFromDoel(vermogenId, doelId)
    } else {
      linkVermogenToDoel(vermogenId, doelId)
    }
  }

  const handleToggleInspanning = (vermogenId, inspanningId) => {
    const vermogen = vermogens.find(v => v.id === vermogenId)
    if (!vermogen) return
    if (vermogen.gekoppeldeInspanningen?.includes(inspanningId)) {
      unlinkVermogenFromInspanning(vermogenId, inspanningId)
    } else {
      linkVermogenToInspanning(vermogenId, inspanningId)
    }
  }

  return (
    <div className="space-y-6">
      {/* Premium Header */}
      <div className="relative bg-gradient-to-br from-purple-600 via-fuchsia-600 to-violet-700 rounded-2xl p-8 text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-45" />
        </div>

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl shadow-lg">
                <Zap className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Vermogens (Capabilities)</h1>
                <p className="text-white/70 mt-1">Organisatorische bekwaamheden die baten realiseren</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl transition-all text-sm font-medium border border-white/20"
            >
              <Plus className="w-4 h-4" />
              Vermogen toevoegen
            </button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-6 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-3xl font-bold">{stats.total}</p>
                  <p className="text-xs text-white/60">Totaal</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/30 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                </div>
                <div>
                  <p className="text-3xl font-bold">{stats.operationeel}</p>
                  <p className="text-xs text-white/60">Operationeel</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/30 rounded-lg">
                  <Settings className="w-5 h-5 text-blue-300" />
                </div>
                <div>
                  <p className="text-3xl font-bold">{stats.inOntwikkeling}</p>
                  <p className="text-xs text-white/60">In ontwikkeling</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-400/30 rounded-lg">
                  <Clock className="w-5 h-5 text-slate-300" />
                </div>
                <div>
                  <p className="text-3xl font-bold">{stats.gepland}</p>
                  <p className="text-xs text-white/60">Gepland</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/30 rounded-lg">
                  <Gauge className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <p className="text-3xl font-bold">{stats.avgCurrent}</p>
                  <p className="text-xs text-white/60">Gem. huidig</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-400/30 rounded-lg">
                  <Target className="w-5 h-5 text-purple-300" />
                </div>
                <div>
                  <p className="text-3xl font-bold">{stats.avgTarget}</p>
                  <p className="text-xs text-white/60">Gem. doel</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="bg-gradient-to-r from-purple-50 to-fuchsia-50 rounded-2xl border border-purple-200 p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-lg shadow-lg shadow-purple-500/20">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-lg font-bold text-purple-800">Nieuw Vermogen</h2>
            </div>
            <button onClick={() => setShowAddForm(false)} className="p-2 hover:bg-white rounded-lg transition-colors">
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Naam *</label>
              <input
                type="text"
                value={newVermogen.naam}
                onChange={(e) => setNewVermogen({ ...newVermogen, naam: e.target.value })}
                className="w-full bg-white border border-purple-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Vermogensnaam"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Eigenaar</label>
              <input
                type="text"
                value={newVermogen.eigenaar}
                onChange={(e) => setNewVermogen({ ...newVermogen, eigenaar: e.target.value })}
                className="w-full bg-white border border-purple-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Naam eigenaar"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Type</label>
              <select
                value={newVermogen.type}
                onChange={(e) => setNewVermogen({ ...newVermogen, type: e.target.value })}
                className="w-full bg-white border border-purple-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {typeOptions.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Domein</label>
              <select
                value={newVermogen.domein}
                onChange={(e) => setNewVermogen({ ...newVermogen, domein: e.target.value })}
                className="w-full bg-white border border-purple-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {domeinOptions.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Status</label>
              <select
                value={newVermogen.status}
                onChange={(e) => setNewVermogen({ ...newVermogen, status: e.target.value })}
                className="w-full bg-white border border-purple-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {statusOptions.map(s => <option key={s} value={s}>{statusConfig[s]?.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Huidig niveau (1-5)</label>
              <input
                type="number" min="1" max="5"
                value={newVermogen.volwassenheidHuidig}
                onChange={(e) => setNewVermogen({ ...newVermogen, volwassenheidHuidig: parseInt(e.target.value) || 1 })}
                className="w-full bg-white border border-purple-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Doel niveau (1-5)</label>
              <input
                type="number" min="1" max="5"
                value={newVermogen.volwassenheidDoel}
                onChange={(e) => setNewVermogen({ ...newVermogen, volwassenheidDoel: parseInt(e.target.value) || 3 })}
                className="w-full bg-white border border-purple-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="lg:col-span-3">
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Beschrijving</label>
              <textarea
                value={newVermogen.beschrijving}
                onChange={(e) => setNewVermogen({ ...newVermogen, beschrijving: e.target.value })}
                className="w-full bg-white border border-purple-200 rounded-xl px-4 py-2.5 text-sm resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                rows={2}
                placeholder="Beschrijving van het vermogen..."
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-5">
            <button onClick={() => setShowAddForm(false)} className="px-5 py-2.5 text-slate-600 hover:bg-white rounded-xl text-sm font-medium transition-colors">
              Annuleren
            </button>
            <button
              onClick={handleAddVermogen}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white rounded-xl hover:from-purple-600 hover:to-fuchsia-700 text-sm font-medium transition-all shadow-lg shadow-purple-500/20"
            >
              <Save className="w-4 h-4" />
              Opslaan
            </button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-medium text-slate-500">Domein:</span>
            <button
              onClick={() => setFilterDomein(null)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                !filterDomein ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Alle
            </button>
            {domeinOptions.map(domein => {
              const config = domeinConfig[domein]
              return (
                <button
                  key={domein}
                  onClick={() => setFilterDomein(filterDomein === domein ? null : domein)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    filterDomein === domein
                      ? `${config.bg} text-white shadow-lg`
                      : `${config.bgLight} ${config.text} hover:opacity-80`
                  }`}
                >
                  {domein} ({stats.byDomein[domein]})
                </button>
              )
            })}
          </div>
          <div className="h-6 w-px bg-slate-200" />
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-500">Type:</span>
            <button
              onClick={() => setFilterType(null)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                !filterType ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Alle
            </button>
            {typeOptions.map(type => {
              const config = typeConfig[type]
              const Icon = config.icon
              return (
                <button
                  key={type}
                  onClick={() => setFilterType(filterType === type ? null : type)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    filterType === type
                      ? `bg-gradient-to-r ${config.color} text-white shadow-lg`
                      : `${config.bgLight} ${config.text} hover:opacity-80`
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  {type}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Linking Modal */}
      {linkingVermogen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-fuchsia-600 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white">
                    {linkingType === 'doelen' ? 'Koppel aan Strategische Doelen' : 'Koppel aan Inspanningen'}
                  </h2>
                  <p className="text-sm text-white/70 mt-1">"{linkingVermogen.naam}"</p>
                </div>
                <button
                  onClick={() => { setLinkingVermogen(null); setLinkingType(null); }}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
            <div className="p-5 max-h-[60vh] overflow-y-auto">
              <div className="space-y-2">
                {linkingType === 'doelen' ? (
                  strategischeDoelen.length > 0 ? strategischeDoelen.map(doel => {
                    const isLinked = linkingVermogen.gekoppeldeDoelen?.includes(doel.id)
                    return (
                      <button
                        key={doel.id}
                        onClick={() => handleToggleDoel(linkingVermogen.id, doel.id)}
                        className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                          isLinked
                            ? 'bg-emerald-50 border-emerald-300'
                            : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                          isLinked ? 'bg-emerald-500' : 'bg-slate-200'
                        }`}>
                          {isLinked && <Check className="w-4 h-4 text-white" />}
                        </div>
                        <div className="flex-1 text-left">
                          <span className={`font-medium ${isLinked ? 'text-emerald-800' : 'text-slate-700'}`}>{doel.titel}</span>
                        </div>
                      </button>
                    )
                  }) : <p className="text-center text-slate-500 py-8">Geen doelen beschikbaar</p>
                ) : (
                  inspanningen.length > 0 ? inspanningen.map(insp => {
                    const isLinked = linkingVermogen.gekoppeldeInspanningen?.includes(insp.id)
                    return (
                      <button
                        key={insp.id}
                        onClick={() => handleToggleInspanning(linkingVermogen.id, insp.id)}
                        className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                          isLinked
                            ? 'bg-blue-50 border-blue-300'
                            : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                          isLinked ? 'bg-blue-500' : 'bg-slate-200'
                        }`}>
                          {isLinked && <Check className="w-4 h-4 text-white" />}
                        </div>
                        <div className="flex-1 text-left">
                          <span className={`font-medium ${isLinked ? 'text-blue-800' : 'text-slate-700'}`}>{insp.naam}</span>
                          <span className="text-xs text-slate-500 ml-2">{insp.code}</span>
                        </div>
                      </button>
                    )
                  }) : <p className="text-center text-slate-500 py-8">Geen inspanningen beschikbaar</p>
                )}
              </div>
            </div>
            <div className="p-5 border-t border-slate-200 bg-slate-50">
              <button
                onClick={() => { setLinkingVermogen(null); setLinkingType(null); }}
                className="w-full px-5 py-2.5 bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white rounded-xl hover:from-purple-600 hover:to-fuchsia-700 font-medium transition-all shadow-lg shadow-purple-500/20"
              >
                Sluiten
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Vermogens Grid */}
      {filteredVermogens.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filteredVermogens.map(vermogen => {
            const tConfig = typeConfig[vermogen.type] || typeConfig.Organisatorisch
            const dConfig = domeinConfig[vermogen.domein] || domeinConfig.Mens
            const sConfig = statusConfig[vermogen.status] || statusConfig.gepland
            const TypeIcon = tConfig.icon
            const StatusIcon = sConfig.icon
            const linkedDoelen = getLinkedDoelen(vermogen.gekoppeldeDoelen)
            const linkedInspanningen = getLinkedInspanningen(vermogen.gekoppeldeInspanningen)
            const isEditing = editingVermogen === vermogen.id

            return (
              <div
                key={vermogen.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-slate-300 transition-all duration-300 group"
              >
                {/* Color accent top */}
                <div className={`h-1.5 bg-gradient-to-r ${tConfig.color}`} />

                {isEditing ? (
                  <form id={`vermogen-form-${vermogen.id}`} className="p-5 space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="col-span-2">
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Naam</label>
                        <input name="naam" defaultValue={vermogen.naam} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Type</label>
                        <select name="type" defaultValue={vermogen.type} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500">
                          {typeOptions.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Domein</label>
                        <select name="domein" defaultValue={vermogen.domein} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500">
                          {domeinOptions.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Eigenaar</label>
                        <input name="eigenaar" defaultValue={vermogen.eigenaar} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Status</label>
                        <select name="status" defaultValue={vermogen.status} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500">
                          {statusOptions.map(s => <option key={s} value={s}>{statusConfig[s]?.label}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Huidig niveau</label>
                        <input type="number" name="volwassenheidHuidig" min="1" max="5" defaultValue={vermogen.volwassenheidHuidig} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Doel niveau</label>
                        <input type="number" name="volwassenheidDoel" min="1" max="5" defaultValue={vermogen.volwassenheidDoel} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500" />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Beschrijving</label>
                        <textarea name="beschrijving" defaultValue={vermogen.beschrijving} rows={2} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm resize-none focus:ring-2 focus:ring-purple-500" />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <button type="button" onClick={() => setEditingVermogen(null)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl text-sm font-medium">Annuleren</button>
                      <button type="button" onClick={() => handleUpdateVermogen(vermogen.id)} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white rounded-xl text-sm font-medium shadow-lg shadow-purple-500/20">
                        <Save className="w-4 h-4" />Opslaan
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="p-5">
                    {/* Actions */}
                    <div className="absolute top-14 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                      <button onClick={() => { setLinkingVermogen(vermogen); setLinkingType('doelen'); }} className="p-2 bg-emerald-50 hover:bg-emerald-100 rounded-lg" title="Koppel aan doelen">
                        <Target className="w-4 h-4 text-emerald-600" />
                      </button>
                      <button onClick={() => { setLinkingVermogen(vermogen); setLinkingType('inspanningen'); }} className="p-2 bg-blue-50 hover:bg-blue-100 rounded-lg" title="Koppel aan inspanningen">
                        <Wrench className="w-4 h-4 text-blue-600" />
                      </button>
                      <button onClick={() => setEditingVermogen(vermogen.id)} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg" title="Bewerken">
                        <Edit3 className="w-4 h-4 text-slate-600" />
                      </button>
                      <button onClick={() => { if (confirm('Weet je zeker dat je dit vermogen wilt verwijderen?')) deleteVermogen(vermogen.id) }} className="p-2 bg-red-50 hover:bg-red-100 rounded-lg" title="Verwijderen">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>

                    <div className="flex gap-5">
                      {/* Maturity Ring */}
                      <MaturityRing
                        current={vermogen.volwassenheidHuidig || 1}
                        target={vermogen.volwassenheidDoel || 3}
                        size={80}
                        color={dConfig.color}
                      />

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${sConfig.bgLight} ${sConfig.textColor}`}>
                            <StatusIcon className="w-3 h-3" />
                            {sConfig.label}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${dConfig.bgLight} ${dConfig.text}`}>
                            {vermogen.domein}
                          </span>
                        </div>

                        <h3 className="font-bold text-slate-800 mb-1 line-clamp-1">{vermogen.naam}</h3>

                        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                          <TypeIcon className="w-3.5 h-3.5" />
                          <span>{vermogen.type}</span>
                          {vermogen.eigenaar && (
                            <>
                              <span className="text-slate-300">|</span>
                              <User className="w-3.5 h-3.5" />
                              <span>{vermogen.eigenaar}</span>
                            </>
                          )}
                        </div>

                        {vermogen.beschrijving && (
                          <p className="text-sm text-slate-500 line-clamp-2 mb-3">{vermogen.beschrijving}</p>
                        )}

                        {/* Maturity labels */}
                        <div className="text-xs text-slate-400">
                          <span className="font-medium text-slate-600">{volwassenheidLabels[vermogen.volwassenheidHuidig]}</span>
                          <span className="mx-2">→</span>
                          <span>{volwassenheidLabels[vermogen.volwassenheidDoel]}</span>
                        </div>
                      </div>
                    </div>

                    {/* Linked items */}
                    <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-xs text-slate-400 flex items-center gap-1.5 mb-2">
                          <Target className="w-3.5 h-3.5" />
                          Doelen ({linkedDoelen.length})
                        </span>
                        {linkedDoelen.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {linkedDoelen.slice(0, 2).map(doel => (
                              <span key={doel.id} className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-xs truncate max-w-[120px]">{doel.titel}</span>
                            ))}
                            {linkedDoelen.length > 2 && <span className="text-xs text-slate-400">+{linkedDoelen.length - 2}</span>}
                          </div>
                        ) : (
                          <button onClick={() => { setLinkingVermogen(vermogen); setLinkingType('doelen'); }} className="text-xs text-purple-600 hover:text-purple-700 flex items-center gap-1">
                            <Link2 className="w-3 h-3" />Koppelen
                          </button>
                        )}
                      </div>
                      <div>
                        <span className="text-xs text-slate-400 flex items-center gap-1.5 mb-2">
                          <Wrench className="w-3.5 h-3.5" />
                          Inspanningen ({linkedInspanningen.length})
                        </span>
                        {linkedInspanningen.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {linkedInspanningen.slice(0, 2).map(insp => (
                              <span key={insp.id} className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs truncate max-w-[120px]">{insp.naam}</span>
                            ))}
                            {linkedInspanningen.length > 2 && <span className="text-xs text-slate-400">+{linkedInspanningen.length - 2}</span>}
                          </div>
                        ) : (
                          <button onClick={() => { setLinkingVermogen(vermogen); setLinkingType('inspanningen'); }} className="text-xs text-purple-600 hover:text-purple-700 flex items-center gap-1">
                            <Link2 className="w-3 h-3" />Koppelen
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-fuchsia-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="w-10 h-10 text-purple-500" />
          </div>
          <h3 className="text-lg font-semibold text-slate-700 mb-2">Geen vermogens gevonden</h3>
          <p className="text-slate-500 mb-6">
            {filterType || filterDomein ? 'Probeer een andere filter' : 'Begin met het toevoegen van je eerste vermogen'}
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white rounded-xl font-medium hover:from-purple-600 hover:to-fuchsia-700 transition-all shadow-lg shadow-purple-500/20"
          >
            <Plus className="w-4 h-4" />
            Vermogen toevoegen
          </button>
        </div>
      )}

      {/* DIN Navigation */}
      <div className="relative bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 rounded-2xl p-6 text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-indigo-400/30 rounded-full blur-2xl" />
        </div>
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
              <Wrench className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-white/70 font-medium mb-1">Volgende in DIN keten</p>
              <h3 className="text-xl font-bold">Inspanningen</h3>
              <p className="text-sm text-white/80">Welke projecten bouwen deze vermogens?</p>
            </div>
          </div>
          <a
            href="/inspanningen"
            className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl hover:bg-white/90 transition-all text-sm font-semibold shadow-lg"
          >
            Bekijk Inspanningen
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* DIN Context */}
      <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-5 border border-slate-200">
        <div className="flex items-start gap-4">
          <div className="p-2.5 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-xl shadow-lg shadow-purple-500/20">
            <Award className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 mb-1">Vermogens in het DIN</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Vermogens (capabilities) zijn de brug tussen{' '}
              <span className="font-semibold text-amber-600">Baten</span> en{' '}
              <span className="font-semibold text-blue-600">Inspanningen</span>.
              Ze vertegenwoordigen de organisatorische bekwaamheden die nodig zijn om resultaten te bereiken.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
