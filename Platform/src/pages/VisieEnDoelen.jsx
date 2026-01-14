import { useState } from 'react'
import { useAppStore } from '../stores/appStore'
import {
  Eye,
  Target,
  Compass,
  Star,
  FileText,
  Calendar,
  Quote,
  Edit3,
  Save,
  X,
  Plus,
  Trash2,
  TrendingUp,
  User,
  CheckCircle2,
  Clock,
  AlertCircle,
  Zap,
  ChevronRight,
  ArrowRight
} from 'lucide-react'

// Status styling
const statusConfig = {
  actief: { label: 'Actief', color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle2 },
  gepland: { label: 'Gepland', color: 'bg-blue-100 text-blue-700', icon: Clock },
  afgerond: { label: 'Afgerond', color: 'bg-slate-100 text-slate-600', icon: CheckCircle2 },
  risico: { label: 'Risico', color: 'bg-red-100 text-red-700', icon: AlertCircle }
}

// Prioriteit styling
const prioriteitConfig = {
  high: { label: 'Hoog', color: 'bg-rose-100 text-rose-700' },
  medium: { label: 'Midden', color: 'bg-amber-100 text-amber-700' },
  low: { label: 'Laag', color: 'bg-slate-100 text-slate-600' }
}

const emptyDoel = {
  titel: '',
  beschrijving: '',
  indicator: '',
  huidigeWaarde: '',
  doelWaarde: '',
  prioriteit: 'medium',
  tijdshorizon: '',
  eigenaar: '',
  status: 'actief'
}

export default function VisieEnDoelen() {
  const {
    visie,
    strategischeDoelen,
    vermogens,
    updateVisie,
    addStrategischDoel,
    updateStrategischDoel,
    deleteStrategischDoel
  } = useAppStore()

  // UI state
  const [editingVisie, setEditingVisie] = useState(false)
  const [showAddDoel, setShowAddDoel] = useState(false)
  const [editingDoel, setEditingDoel] = useState(null)
  const [doelFormData, setDoelFormData] = useState(emptyDoel)

  // Form state for visie
  const [visieForm, setVisieForm] = useState({
    programmaVisie: visie.programmaVisie,
    missie: visie.missie,
    horizon: visie.horizon,
    bronDocument: visie.bronDocument
  })

  // Get linked vermogens count
  const getVermogensCount = (doelId) => {
    return vermogens.filter(v => v.gekoppeldeDoelen?.includes(doelId)).length
  }

  // Calculate progress
  const calculateProgress = (huidig, doel) => {
    const huidigeNum = parseFloat(huidig?.replace(/[^0-9.-]/g, '')) || 0
    const doelNum = parseFloat(doel?.replace(/[^0-9.-]/g, '')) || 1
    return Math.min(100, Math.round((huidigeNum / doelNum) * 100))
  }

  // Handlers
  const handleSaveVisie = () => {
    updateVisie(visieForm)
    setEditingVisie(false)
  }

  const handleSubmitDoel = () => {
    if (editingDoel) {
      updateStrategischDoel(editingDoel, doelFormData)
      setEditingDoel(null)
    } else {
      addStrategischDoel(doelFormData)
    }
    setDoelFormData(emptyDoel)
    setShowAddDoel(false)
  }

  const handleEditDoel = (doel) => {
    setDoelFormData(doel)
    setEditingDoel(doel.id)
    setShowAddDoel(true)
  }

  const handleDeleteDoel = (id) => {
    if (confirm('Weet je zeker dat je dit doel wilt verwijderen?')) {
      deleteStrategischDoel(id)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl">
                <Eye className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Visie & Strategische Doelen</h1>
                <p className="text-sm text-white/70">Van programmavisie naar meetbare doelstellingen</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg">
                <span className="text-2xl font-bold">{strategischeDoelen.length}</span>
                <p className="text-xs text-white/70">doelen</p>
              </div>
              <button
                onClick={() => {
                  setVisieForm({
                    programmaVisie: visie.programmaVisie,
                    missie: visie.missie,
                    horizon: visie.horizon,
                    bronDocument: visie.bronDocument
                  })
                  setEditingVisie(!editingVisie)
                }}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-sm font-medium"
              >
                <Edit3 className="w-4 h-4" />
                {editingVisie ? 'Annuleren' : 'Visie & Missie bewerken'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SECTIE 1: Programma Visie */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-4 right-4 text-slate-600">
          <Quote className="w-20 h-20" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-amber-400" />
            <span className="text-xs uppercase tracking-wider text-slate-400">Programma Visie</span>
          </div>
          {editingVisie ? (
            <textarea
              value={visieForm.programmaVisie}
              onChange={(e) => setVisieForm({ ...visieForm, programmaVisie: e.target.value })}
              className="w-full text-2xl font-bold bg-slate-700 border border-slate-600 rounded-xl p-4 text-white resize-none"
              rows={2}
            />
          ) : (
            <blockquote className="text-2xl md:text-3xl font-bold leading-tight mb-6">
              "{visie.programmaVisie}"
            </blockquote>
          )}
          <div className="flex items-center gap-4 text-sm text-slate-400">
            {editingVisie ? (
              <>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <input
                    type="text"
                    value={visieForm.bronDocument}
                    onChange={(e) => setVisieForm({ ...visieForm, bronDocument: e.target.value })}
                    className="bg-slate-700 border border-slate-600 rounded px-2 py-1 text-white text-sm"
                    placeholder="Brondocument"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <input
                    type="text"
                    value={visieForm.horizon}
                    onChange={(e) => setVisieForm({ ...visieForm, horizon: e.target.value })}
                    className="bg-slate-700 border border-slate-600 rounded px-2 py-1 text-white text-sm"
                    placeholder="Horizon"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  {visie.bronDocument}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {visie.horizon}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* SECTIE 2: Missie */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-blue-100 rounded-xl">
            <Compass className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-lg font-bold text-slate-800">Missie</h2>
        </div>
        {editingVisie ? (
          <textarea
            value={visieForm.missie}
            onChange={(e) => setVisieForm({ ...visieForm, missie: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-700 text-sm resize-none"
            rows={3}
          />
        ) : (
          <p className="text-slate-600 leading-relaxed">{visie.missie}</p>
        )}
      </div>

      {/* Save button when editing visie */}
      {editingVisie && (
        <div className="flex justify-end">
          <button
            onClick={handleSaveVisie}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
          >
            <Save className="w-4 h-4" />
            Visie & Missie Opslaan
          </button>
        </div>
      )}

      {/* SECTIE 3: Strategische Doelen */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-100 rounded-xl">
                <Target className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">Strategische Doelen</h2>
                <p className="text-sm text-slate-500">Meetbare doelstellingen afgeleid van de visie</p>
              </div>
            </div>
            <button
              onClick={() => {
                setDoelFormData(emptyDoel)
                setEditingDoel(null)
                setShowAddDoel(true)
              }}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              Doel toevoegen
            </button>
          </div>
        </div>

        {/* Add/Edit Doel Form */}
        {showAddDoel && (
          <div className="p-6 bg-emerald-50 border-b border-emerald-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-emerald-800">
                {editingDoel ? 'Doel bewerken' : 'Nieuw Strategisch Doel'}
              </h3>
              <button
                onClick={() => { setShowAddDoel(false); setEditingDoel(null); setDoelFormData(emptyDoel); }}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <label className="block text-xs font-medium text-slate-600 mb-1">Titel *</label>
                <input
                  type="text"
                  value={doelFormData.titel}
                  onChange={(e) => setDoelFormData({ ...doelFormData, titel: e.target.value })}
                  className="w-full border border-emerald-200 rounded-lg px-3 py-2 text-sm bg-white"
                  placeholder="Titel van het doel"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Eigenaar</label>
                <input
                  type="text"
                  value={doelFormData.eigenaar}
                  onChange={(e) => setDoelFormData({ ...doelFormData, eigenaar: e.target.value })}
                  className="w-full border border-emerald-200 rounded-lg px-3 py-2 text-sm bg-white"
                  placeholder="Naam/rol"
                />
              </div>

              <div className="lg:col-span-3">
                <label className="block text-xs font-medium text-slate-600 mb-1">Beschrijving</label>
                <textarea
                  value={doelFormData.beschrijving}
                  onChange={(e) => setDoelFormData({ ...doelFormData, beschrijving: e.target.value })}
                  className="w-full border border-emerald-200 rounded-lg px-3 py-2 text-sm bg-white resize-none"
                  rows={2}
                  placeholder="Beschrijving van het doel"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Indicator</label>
                <input
                  type="text"
                  value={doelFormData.indicator}
                  onChange={(e) => setDoelFormData({ ...doelFormData, indicator: e.target.value })}
                  className="w-full border border-emerald-200 rounded-lg px-3 py-2 text-sm bg-white"
                  placeholder="NPS, %, etc."
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Huidige waarde</label>
                <input
                  type="text"
                  value={doelFormData.huidigeWaarde}
                  onChange={(e) => setDoelFormData({ ...doelFormData, huidigeWaarde: e.target.value })}
                  className="w-full border border-emerald-200 rounded-lg px-3 py-2 text-sm bg-white"
                  placeholder="+15, 45%"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Doel waarde</label>
                <input
                  type="text"
                  value={doelFormData.doelWaarde}
                  onChange={(e) => setDoelFormData({ ...doelFormData, doelWaarde: e.target.value })}
                  className="w-full border border-emerald-200 rounded-lg px-3 py-2 text-sm bg-white"
                  placeholder="+40, 90%"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Prioriteit</label>
                <select
                  value={doelFormData.prioriteit}
                  onChange={(e) => setDoelFormData({ ...doelFormData, prioriteit: e.target.value })}
                  className="w-full border border-emerald-200 rounded-lg px-3 py-2 text-sm bg-white"
                >
                  <option value="high">Hoog</option>
                  <option value="medium">Midden</option>
                  <option value="low">Laag</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Status</label>
                <select
                  value={doelFormData.status}
                  onChange={(e) => setDoelFormData({ ...doelFormData, status: e.target.value })}
                  className="w-full border border-emerald-200 rounded-lg px-3 py-2 text-sm bg-white"
                >
                  <option value="actief">Actief</option>
                  <option value="gepland">Gepland</option>
                  <option value="afgerond">Afgerond</option>
                  <option value="risico">Risico</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Tijdshorizon</label>
                <input
                  type="text"
                  value={doelFormData.tijdshorizon}
                  onChange={(e) => setDoelFormData({ ...doelFormData, tijdshorizon: e.target.value })}
                  className="w-full border border-emerald-200 rounded-lg px-3 py-2 text-sm bg-white"
                  placeholder="Q4 2026"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => { setShowAddDoel(false); setEditingDoel(null); setDoelFormData(emptyDoel); }}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm"
              >
                Annuleren
              </button>
              <button
                onClick={handleSubmitDoel}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium"
              >
                <Save className="w-4 h-4" />
                {editingDoel ? 'Opslaan' : 'Toevoegen'}
              </button>
            </div>
          </div>
        )}

        {/* Doelen Grid */}
        <div className="p-6">
          {strategischeDoelen.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {strategischeDoelen.map(doel => {
                const status = statusConfig[doel.status] || statusConfig.actief
                const prioriteit = prioriteitConfig[doel.prioriteit] || prioriteitConfig.medium
                const progress = calculateProgress(doel.huidigeWaarde, doel.doelWaarde)
                const StatusIcon = status.icon
                const vermogensCount = getVermogensCount(doel.id)

                return (
                  <div
                    key={doel.id}
                    className="bg-slate-50 rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow group relative"
                  >
                    {/* Actions */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                      <button
                        onClick={() => handleEditDoel(doel)}
                        className="p-1.5 bg-white hover:bg-slate-100 rounded-lg shadow-sm"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-slate-500" />
                      </button>
                      <button
                        onClick={() => handleDeleteDoel(doel.id)}
                        className="p-1.5 bg-white hover:bg-red-50 rounded-lg shadow-sm"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-red-500" />
                      </button>
                    </div>

                    {/* Header */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {status.label}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${prioriteit.color}`}>
                        {prioriteit.label}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-800 mb-2 pr-16">{doel.titel}</h3>

                    {doel.beschrijving && (
                      <p className="text-sm text-slate-600 mb-4 line-clamp-2">{doel.beschrijving}</p>
                    )}

                    {/* Progress */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-slate-500">{doel.indicator}</span>
                        <span className="font-semibold text-slate-800">{progress}%</span>
                      </div>
                      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            progress >= 75 ? 'bg-emerald-500' : progress >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                          }`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-400 mt-1">
                        <span>Huidig: {doel.huidigeWaarde}</span>
                        <span>Doel: {doel.doelWaarde}</span>
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-slate-500 pt-3 border-t border-slate-200">
                      {doel.eigenaar && (
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5" />
                          {doel.eigenaar}
                        </span>
                      )}
                      {doel.tijdshorizon && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {doel.tijdshorizon}
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-purple-600">
                        <Zap className="w-3.5 h-3.5" />
                        {vermogensCount} vermogens
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <Target className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 mb-4">Nog geen strategische doelen gedefinieerd</p>
              <button
                onClick={() => setShowAddDoel(true)}
                className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
              >
                Voeg je eerste doel toe
              </button>
            </div>
          )}
        </div>
      </div>

      {/* DIN Keten: Volgende stap -> Baten */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-500 rounded-xl text-white">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800">Volgende stap: Baten</h3>
              <p className="text-sm text-slate-500">
                Welke meetbare baten leveren deze doelen op?
              </p>
            </div>
          </div>
          <a
            href="/baten"
            className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-sm font-medium"
          >
            Bekijk Baten
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* DIN Context */}
      <div className="bg-slate-100 rounded-xl p-4 border border-slate-200">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-cyan-100 rounded-lg text-cyan-600 shrink-0">
            <FileText className="w-4 h-4" />
          </div>
          <div className="text-sm">
            <p className="font-medium text-slate-700 mb-1">Doelen-Inspanningennetwerk (DIN)</p>
            <p className="text-slate-500">
              De keten: <strong>Visie → Strategische Doelen → Baten → Vermogens → Inspanningen</strong>.
              Strategische doelen komen voort uit de organisatiestrategie en vormen de basis voor het bepalen van baten.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
