import { useState } from 'react'
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
  Unlink
} from 'lucide-react'

// Vermogen type icons
const typeIcons = {
  Organisatorisch: Briefcase,
  Inhoudelijk: Brain,
  Menselijk: Users,
  Financieel: Briefcase,
  Technisch: Cpu,
  Cultureel: Heart
}

// Domein colors
const domeinColors = {
  Mens: { bg: 'bg-blue-100', text: 'text-blue-700', accent: 'bg-blue-500' },
  Proces: { bg: 'bg-emerald-100', text: 'text-emerald-700', accent: 'bg-emerald-500' },
  Systeem: { bg: 'bg-purple-100', text: 'text-purple-700', accent: 'bg-purple-500' },
  Cultuur: { bg: 'bg-amber-100', text: 'text-amber-700', accent: 'bg-amber-500' }
}

// Status config
const statusConfig = {
  operationeel: { label: 'Operationeel', color: 'bg-emerald-100 text-emerald-700' },
  in_ontwikkeling: { label: 'In ontwikkeling', color: 'bg-blue-100 text-blue-700' },
  gepland: { label: 'Gepland', color: 'bg-slate-100 text-slate-600' }
}

// Volwassenheid levels
const volwassenheidLabels = ['', 'Initieel', 'Herhaalbaar', 'Gedefinieerd', 'Beheerst', 'Geoptimaliseerd']

// Type options
const typeOptions = ['Organisatorisch', 'Inhoudelijk', 'Menselijk', 'Financieel', 'Technisch', 'Cultureel']
const domeinOptions = ['Mens', 'Proces', 'Systeem', 'Cultuur']
const statusOptions = ['gepland', 'in_ontwikkeling', 'operationeel']

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
  const [linkingVermogen, setLinkingVermogen] = useState(null) // For linking UI
  const [linkingType, setLinkingType] = useState(null) // 'doelen' or 'inspanningen'

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

  // Get unique types
  const types = [...new Set(vermogens.map(v => v.type))]

  // Filter vermogens
  const filteredVermogens = vermogens.filter(v => {
    if (filterType && v.type !== filterType) return false
    if (filterDomein && v.domein !== filterDomein) return false
    return true
  })

  // Get linked doelen names
  const getLinkedDoelen = (gekoppeldeDoelen) => {
    if (!gekoppeldeDoelen) return []
    return gekoppeldeDoelen.map(id => strategischeDoelen.find(d => d.id === id)).filter(Boolean)
  }

  // Get linked inspanningen names
  const getLinkedInspanningen = (gekoppeldeInspanningen) => {
    if (!gekoppeldeInspanningen) return []
    return gekoppeldeInspanningen.map(id => inspanningen.find(i => i.id === id)).filter(Boolean)
  }

  // Calculate stats
  const avgCurrentMaturity = vermogens.length > 0
    ? (vermogens.reduce((sum, v) => sum + v.volwassenheidHuidig, 0) / vermogens.length).toFixed(1)
    : 0

  // Handle add vermogen
  const handleAddVermogen = () => {
    if (newVermogen.naam.trim()) {
      addVermogen(newVermogen)
      setNewVermogen({
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
      setShowAddForm(false)
    }
  }

  // Handle update vermogen
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

  // Toggle link to doel
  const handleToggleDoel = (vermogenId, doelId) => {
    const vermogen = vermogens.find(v => v.id === vermogenId)
    if (!vermogen) return

    if (vermogen.gekoppeldeDoelen?.includes(doelId)) {
      unlinkVermogenFromDoel(vermogenId, doelId)
    } else {
      linkVermogenToDoel(vermogenId, doelId)
    }
  }

  // Toggle link to inspanning
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
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-700 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Vermogens (Capabilities)</h1>
                <p className="text-sm text-white/70">Organisatorische bekwaamheden die baten realiseren</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg">
                <span className="text-2xl font-bold">{vermogens.length}</span>
                <p className="text-xs text-white/70">vermogens</p>
              </div>
              <div className="text-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg">
                <span className="text-2xl font-bold">{avgCurrentMaturity}</span>
                <p className="text-xs text-white/70">gem. volwassenheid</p>
              </div>
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                Vermogen toevoegen
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="bg-purple-50 rounded-2xl border border-purple-200 p-6">
          <h2 className="text-lg font-bold text-purple-800 mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Nieuw Vermogen
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Naam *</label>
              <input
                type="text"
                value={newVermogen.naam}
                onChange={(e) => setNewVermogen({ ...newVermogen, naam: e.target.value })}
                className="w-full bg-white border border-purple-200 rounded-lg px-3 py-2 text-sm"
                placeholder="Vermogensnaam"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Type</label>
              <select
                value={newVermogen.type}
                onChange={(e) => setNewVermogen({ ...newVermogen, type: e.target.value })}
                className="w-full bg-white border border-purple-200 rounded-lg px-3 py-2 text-sm"
              >
                {typeOptions.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Domein</label>
              <select
                value={newVermogen.domein}
                onChange={(e) => setNewVermogen({ ...newVermogen, domein: e.target.value })}
                className="w-full bg-white border border-purple-200 rounded-lg px-3 py-2 text-sm"
              >
                {domeinOptions.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Eigenaar</label>
              <input
                type="text"
                value={newVermogen.eigenaar}
                onChange={(e) => setNewVermogen({ ...newVermogen, eigenaar: e.target.value })}
                className="w-full bg-white border border-purple-200 rounded-lg px-3 py-2 text-sm"
                placeholder="Naam eigenaar"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Volwassenheid Huidig (1-5)</label>
              <input
                type="number"
                min="1"
                max="5"
                value={newVermogen.volwassenheidHuidig}
                onChange={(e) => setNewVermogen({ ...newVermogen, volwassenheidHuidig: parseInt(e.target.value) || 1 })}
                className="w-full bg-white border border-purple-200 rounded-lg px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Volwassenheid Doel (1-5)</label>
              <input
                type="number"
                min="1"
                max="5"
                value={newVermogen.volwassenheidDoel}
                onChange={(e) => setNewVermogen({ ...newVermogen, volwassenheidDoel: parseInt(e.target.value) || 3 })}
                className="w-full bg-white border border-purple-200 rounded-lg px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Status</label>
              <select
                value={newVermogen.status}
                onChange={(e) => setNewVermogen({ ...newVermogen, status: e.target.value })}
                className="w-full bg-white border border-purple-200 rounded-lg px-3 py-2 text-sm"
              >
                {statusOptions.map(s => (
                  <option key={s} value={s}>{statusConfig[s]?.label || s}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-slate-600 mb-1">Beschrijving</label>
              <textarea
                value={newVermogen.beschrijving}
                onChange={(e) => setNewVermogen({ ...newVermogen, beschrijving: e.target.value })}
                className="w-full bg-white border border-purple-200 rounded-lg px-3 py-2 text-sm resize-none"
                rows={2}
                placeholder="Beschrijving van het vermogen..."
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm"
            >
              Annuleren
            </button>
            <button
              onClick={handleAddVermogen}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium"
            >
              <Save className="w-4 h-4" />
              Opslaan
            </button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Type filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-500">Type:</span>
          <button
            onClick={() => setFilterType(null)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              !filterType ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Alle
          </button>
          {types.map(type => {
            const Icon = typeIcons[type] || Zap
            return (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filterType === type ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {type}
              </button>
            )
          })}
        </div>

        {/* Domein filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Domein:</span>
          <button
            onClick={() => setFilterDomein(null)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              !filterDomein ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Alle
          </button>
          {domeinOptions.map(domein => (
            <button
              key={domein}
              onClick={() => setFilterDomein(domein)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filterDomein === domein
                  ? `${domeinColors[domein].accent} text-white`
                  : `${domeinColors[domein].bg} ${domeinColors[domein].text} hover:opacity-80`
              }`}
            >
              {domein}
            </button>
          ))}
        </div>
      </div>

      {/* Linking Modal */}
      {linkingVermogen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-800">
                {linkingType === 'doelen' ? 'Koppel aan Strategische Doelen' : 'Koppel aan Inspanningen'}
              </h2>
              <button
                onClick={() => { setLinkingVermogen(null); setLinkingType(null); }}
                className="p-2 hover:bg-slate-100 rounded-lg"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <p className="text-sm text-slate-500 mb-4">
              Selecteer de {linkingType === 'doelen' ? 'doelen' : 'inspanningen'} die bij "{linkingVermogen.naam}" horen:
            </p>
            <div className="space-y-2">
              {linkingType === 'doelen' ? (
                strategischeDoelen.map(doel => {
                  const isLinked = linkingVermogen.gekoppeldeDoelen?.includes(doel.id)
                  return (
                    <button
                      key={doel.id}
                      onClick={() => handleToggleDoel(linkingVermogen.id, doel.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${
                        isLinked
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center ${
                        isLinked ? 'bg-emerald-500' : 'bg-slate-300'
                      }`}>
                        {isLinked && <Check className="w-3.5 h-3.5 text-white" />}
                      </div>
                      <div className="flex-1 text-left">
                        <span className="font-medium text-sm">{doel.titel}</span>
                      </div>
                    </button>
                  )
                })
              ) : (
                inspanningen.map(insp => {
                  const isLinked = linkingVermogen.gekoppeldeInspanningen?.includes(insp.id)
                  return (
                    <button
                      key={insp.id}
                      onClick={() => handleToggleInspanning(linkingVermogen.id, insp.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${
                        isLinked
                          ? 'bg-blue-50 border-blue-300 text-blue-800'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center ${
                        isLinked ? 'bg-blue-500' : 'bg-slate-300'
                      }`}>
                        {isLinked && <Check className="w-3.5 h-3.5 text-white" />}
                      </div>
                      <div className="flex-1 text-left">
                        <span className="font-medium text-sm">{insp.naam}</span>
                        <span className="text-xs text-slate-500 ml-2">{insp.code}</span>
                      </div>
                    </button>
                  )
                })
              )}
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => { setLinkingVermogen(null); setLinkingType(null); }}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium"
              >
                Sluiten
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Vermogens Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredVermogens.map(vermogen => {
          const TypeIcon = typeIcons[vermogen.type] || Zap
          const domeinStyle = domeinColors[vermogen.domein] || domeinColors.Mens
          const status = statusConfig[vermogen.status] || statusConfig.gepland
          const linkedDoelen = getLinkedDoelen(vermogen.gekoppeldeDoelen)
          const linkedInspanningen = getLinkedInspanningen(vermogen.gekoppeldeInspanningen)
          const isEditing = editingVermogen === vermogen.id

          return (
            <div
              key={vermogen.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg transition-all group relative"
            >
              {/* Edit/Delete Buttons */}
              {!isEditing && (
                <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => {
                      setLinkingVermogen(vermogen)
                      setLinkingType('doelen')
                    }}
                    className="p-1.5 bg-emerald-50 hover:bg-emerald-100 rounded-lg"
                    title="Koppel aan doelen"
                  >
                    <Target className="w-3.5 h-3.5 text-emerald-600" />
                  </button>
                  <button
                    onClick={() => {
                      setLinkingVermogen(vermogen)
                      setLinkingType('inspanningen')
                    }}
                    className="p-1.5 bg-blue-50 hover:bg-blue-100 rounded-lg"
                    title="Koppel aan inspanningen"
                  >
                    <Wrench className="w-3.5 h-3.5 text-blue-600" />
                  </button>
                  <button
                    onClick={() => setEditingVermogen(vermogen.id)}
                    className="p-1.5 bg-slate-50 hover:bg-slate-100 rounded-lg"
                    title="Bewerken"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-slate-500" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Weet je zeker dat je dit vermogen wilt verwijderen?')) {
                        deleteVermogen(vermogen.id)
                      }
                    }}
                    className="p-1.5 bg-red-50 hover:bg-red-100 rounded-lg"
                    title="Verwijderen"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-red-500" />
                  </button>
                </div>
              )}

              {isEditing ? (
                // Edit Form
                <form id={`vermogen-form-${vermogen.id}`} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2">
                      <label className="block text-xs font-medium text-slate-500 mb-1">Naam</label>
                      <input
                        name="naam"
                        defaultValue={vermogen.naam}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Type</label>
                      <select
                        name="type"
                        defaultValue={vermogen.type}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm"
                      >
                        {typeOptions.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Domein</label>
                      <select
                        name="domein"
                        defaultValue={vermogen.domein}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm"
                      >
                        {domeinOptions.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Eigenaar</label>
                      <input
                        name="eigenaar"
                        defaultValue={vermogen.eigenaar}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Status</label>
                      <select
                        name="status"
                        defaultValue={vermogen.status}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm"
                      >
                        {statusOptions.map(s => (
                          <option key={s} value={s}>{statusConfig[s]?.label || s}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Huidig niveau</label>
                      <input
                        type="number"
                        name="volwassenheidHuidig"
                        min="1"
                        max="5"
                        defaultValue={vermogen.volwassenheidHuidig}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Doel niveau</label>
                      <input
                        type="number"
                        name="volwassenheidDoel"
                        min="1"
                        max="5"
                        defaultValue={vermogen.volwassenheidDoel}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs font-medium text-slate-500 mb-1">Beschrijving</label>
                      <textarea
                        name="beschrijving"
                        defaultValue={vermogen.beschrijving}
                        rows={2}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm resize-none"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingVermogen(null)}
                      className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg text-sm"
                    >
                      Annuleren
                    </button>
                    <button
                      type="button"
                      onClick={() => handleUpdateVermogen(vermogen.id)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
                    >
                      <Save className="w-3.5 h-3.5" />
                      Opslaan
                    </button>
                  </div>
                </form>
              ) : (
                // Display Mode
                <>
                  {/* Header */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className={`p-2.5 ${domeinStyle.bg} rounded-xl`}>
                      <TypeIcon className={`w-5 h-5 ${domeinStyle.text}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                          {status.label}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${domeinStyle.bg} ${domeinStyle.text}`}>
                          {vermogen.domein}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-800">{vermogen.naam}</h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                    {vermogen.beschrijving}
                  </p>

                  {/* Maturity Progress */}
                  <div className="mb-4 p-3 bg-slate-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Gauge className="w-3.5 h-3.5" />
                        Volwassenheid
                      </span>
                      <span className="text-xs font-semibold text-slate-700">
                        {vermogen.volwassenheidHuidig} → {vermogen.volwassenheidDoel}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mb-1">
                      {[1, 2, 3, 4, 5].map(level => (
                        <div
                          key={level}
                          className={`flex-1 h-2 rounded-full ${
                            level <= vermogen.volwassenheidHuidig
                              ? domeinStyle.accent
                              : level <= vermogen.volwassenheidDoel
                              ? `${domeinStyle.bg} border-2 ${domeinStyle.text.replace('text', 'border')}`
                              : 'bg-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>{volwassenheidLabels[vermogen.volwassenheidHuidig]}</span>
                      <span>Doel: {volwassenheidLabels[vermogen.volwassenheidDoel]}</span>
                    </div>
                  </div>

                  {/* Owner */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                    <User className="w-3.5 h-3.5" />
                    <span>{vermogen.eigenaar}</span>
                  </div>

                  {/* Linked items */}
                  <div className="space-y-2 pt-3 border-t border-slate-100">
                    {/* Linked Doelen */}
                    <div>
                      <span className="text-xs text-slate-400 flex items-center gap-1 mb-1">
                        <Target className="w-3 h-3" />
                        Ondersteunt doelen ({linkedDoelen.length}):
                      </span>
                      {linkedDoelen.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {linkedDoelen.map(doel => (
                            <span
                              key={doel.id}
                              className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-xs"
                            >
                              {doel.titel}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setLinkingVermogen(vermogen)
                            setLinkingType('doelen')
                          }}
                          className="text-xs text-purple-600 hover:text-purple-700 flex items-center gap-1"
                        >
                          <Link2 className="w-3 h-3" />
                          Koppel doelen
                        </button>
                      )}
                    </div>

                    {/* Linked Inspanningen */}
                    <div>
                      <span className="text-xs text-slate-400 flex items-center gap-1 mb-1">
                        <Wrench className="w-3 h-3" />
                        Gebouwd door ({linkedInspanningen.length}):
                      </span>
                      {linkedInspanningen.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {linkedInspanningen.slice(0, 3).map(insp => (
                            <span
                              key={insp.id}
                              className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs"
                            >
                              {insp.naam}
                            </span>
                          ))}
                          {linkedInspanningen.length > 3 && (
                            <span className="text-xs text-slate-400">+{linkedInspanningen.length - 3} meer</span>
                          )}
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setLinkingVermogen(vermogen)
                            setLinkingType('inspanningen')
                          }}
                          className="text-xs text-purple-600 hover:text-purple-700 flex items-center gap-1"
                        >
                          <Link2 className="w-3 h-3" />
                          Koppel inspanningen
                        </button>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredVermogens.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
          <Zap className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-600 mb-2">Geen vermogens gevonden</h3>
          <p className="text-sm text-slate-500 mb-4">
            {filterType || filterDomein
              ? 'Probeer een andere filter of voeg een nieuw vermogen toe.'
              : 'Begin met het toevoegen van je eerste vermogen.'}
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Vermogen toevoegen
          </button>
        </div>
      )}

      {/* Links to related pages */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-600 rounded-lg text-white">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 text-sm">Visie & Doelen</h3>
                <p className="text-xs text-slate-500">Wat vermogens realiseren</p>
              </div>
            </div>
            <a href="/visie-doelen" className="text-emerald-600 hover:text-emerald-700">
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg text-white">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 text-sm">Inspanningen</h3>
                <p className="text-xs text-slate-500">Wat vermogens bouwt</p>
              </div>
            </div>
            <a href="/inspanningen" className="text-blue-600 hover:text-blue-700">
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-600 rounded-lg text-white">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 text-sm">Baten</h3>
                <p className="text-xs text-slate-500">Waarde die vermogens leveren</p>
              </div>
            </div>
            <a href="/baten" className="text-amber-600 hover:text-amber-700">
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* DIN Context */}
      <div className="bg-slate-100 rounded-xl p-4 border border-slate-200">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-purple-100 rounded-lg text-purple-600 shrink-0">
            <Zap className="w-4 h-4" />
          </div>
          <div className="text-sm">
            <p className="font-medium text-slate-700 mb-1">Vermogens in het DIN</p>
            <p className="text-slate-500">
              Vermogens (capabilities) zijn de brug tussen <strong>strategische doelen</strong> en <strong>inspanningen</strong>.
              Ze vertegenwoordigen de organisatorische bekwaamheden die nodig zijn om baten te realiseren.
              Meerdere inspanningen kunnen bijdragen aan het ontwikkelen van een vermogen.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
