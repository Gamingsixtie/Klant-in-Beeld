import { useState, useMemo } from 'react'
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
  ArrowRight,
  Sparkles,
  Award,
  BarChart3,
  Flag,
  Filter
} from 'lucide-react'

// Status styling
const statusConfig = {
  actief: { label: 'Actief', color: 'bg-emerald-500', textColor: 'text-emerald-700', bgLight: 'bg-emerald-50', icon: CheckCircle2 },
  gepland: { label: 'Gepland', color: 'bg-blue-500', textColor: 'text-blue-700', bgLight: 'bg-blue-50', icon: Clock },
  afgerond: { label: 'Afgerond', color: 'bg-slate-400', textColor: 'text-slate-600', bgLight: 'bg-slate-50', icon: CheckCircle2 },
  risico: { label: 'Risico', color: 'bg-red-500', textColor: 'text-red-700', bgLight: 'bg-red-50', icon: AlertCircle }
}

// Prioriteit styling
const prioriteitConfig = {
  high: { label: 'Hoog', color: 'bg-rose-500', textColor: 'text-rose-700', bgLight: 'bg-rose-50', icon: Flag },
  medium: { label: 'Midden', color: 'bg-amber-500', textColor: 'text-amber-700', bgLight: 'bg-amber-50', icon: Flag },
  low: { label: 'Laag', color: 'bg-slate-400', textColor: 'text-slate-600', bgLight: 'bg-slate-50', icon: Flag }
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

// Circular Progress Component
function CircularProgress({ value, size = 56, strokeWidth = 4, color = '#10b981' }) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (value / 100) * circumference

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e2e8f0"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-bold text-slate-700">{value}%</span>
      </div>
    </div>
  )
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
  const [filterStatus, setFilterStatus] = useState(null)
  const [filterPrioriteit, setFilterPrioriteit] = useState(null)

  // Form state for visie
  const [visieForm, setVisieForm] = useState({
    programmaVisie: visie.programmaVisie,
    missie: visie.missie,
    horizon: visie.horizon,
    bronDocument: visie.bronDocument
  })

  // Statistics
  const stats = useMemo(() => {
    const actief = strategischeDoelen.filter(d => d.status === 'actief').length
    const afgerond = strategischeDoelen.filter(d => d.status === 'afgerond').length
    const risico = strategischeDoelen.filter(d => d.status === 'risico').length
    const highPriority = strategischeDoelen.filter(d => d.prioriteit === 'high').length

    // Calculate average progress
    const progresses = strategischeDoelen.map(d => calculateProgress(d.huidigeWaarde, d.doelWaarde))
    const avgProgress = progresses.length > 0
      ? Math.round(progresses.reduce((a, b) => a + b, 0) / progresses.length)
      : 0

    return { actief, afgerond, risico, highPriority, avgProgress, total: strategischeDoelen.length }
  }, [strategischeDoelen])

  // Get linked vermogens count
  const getVermogensCount = (doelId) => {
    return vermogens.filter(v => v.gekoppeldeDoelen?.includes(doelId)).length
  }

  // Filter doelen
  const filteredDoelen = strategischeDoelen.filter(d => {
    if (filterStatus && d.status !== filterStatus) return false
    if (filterPrioriteit && d.prioriteit !== filterPrioriteit) return false
    return true
  })

  // Stats per status/prioriteit
  const statusCounts = useMemo(() => ({
    actief: strategischeDoelen.filter(d => d.status === 'actief').length,
    gepland: strategischeDoelen.filter(d => d.status === 'gepland').length,
    afgerond: strategischeDoelen.filter(d => d.status === 'afgerond').length,
    risico: strategischeDoelen.filter(d => d.status === 'risico').length
  }), [strategischeDoelen])

  const prioriteitCounts = useMemo(() => ({
    high: strategischeDoelen.filter(d => d.prioriteit === 'high').length,
    medium: strategischeDoelen.filter(d => d.prioriteit === 'medium').length,
    low: strategischeDoelen.filter(d => d.prioriteit === 'low').length
  }), [strategischeDoelen])

  // Calculate progress
  function calculateProgress(huidig, doel) {
    const huidigeNum = parseFloat(huidig?.replace(/[^0-9.-]/g, '')) || 0
    const doelNum = parseFloat(doel?.replace(/[^0-9.-]/g, '')) || 1
    if (doelNum === 0) return 0
    return Math.min(100, Math.max(0, Math.round((huidigeNum / doelNum) * 100)))
  }

  // Get progress color
  const getProgressColor = (progress) => {
    if (progress >= 75) return '#10b981'
    if (progress >= 50) return '#f59e0b'
    return '#ef4444'
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
      {/* Premium Header - Consistent met Vermogens pagina */}
      <div className="relative bg-gradient-to-br from-[#003366] via-[#004080] to-[#002855] rounded-2xl p-8 text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-45" />
        </div>

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl shadow-lg">
                <Eye className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Visie & Strategische Doelen</h1>
                <p className="text-white/70 mt-1">Van programmavisie naar meetbare doelstellingen</p>
              </div>
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
              className="flex items-center gap-2 px-5 py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl transition-all text-sm font-medium border border-white/20"
            >
              <Edit3 className="w-4 h-4" />
              {editingVisie ? 'Annuleren' : 'Visie & Missie bewerken'}
            </button>
          </div>

          {/* Stats Row - Met iconen zoals Vermogens */}
          <div className="grid grid-cols-5 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-3xl font-bold">{stats.total}</p>
                  <p className="text-xs text-white/60">Totaal doelen</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/30 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                </div>
                <div>
                  <p className="text-3xl font-bold">{stats.actief}</p>
                  <p className="text-xs text-white/60">Actief</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-rose-500/30 rounded-lg">
                  <Flag className="w-5 h-5 text-rose-300" />
                </div>
                <div>
                  <p className="text-3xl font-bold">{stats.highPriority}</p>
                  <p className="text-xs text-white/60">Hoge prioriteit</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/30 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <p className="text-3xl font-bold">{stats.risico}</p>
                  <p className="text-xs text-white/60">Risico</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/30 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-blue-300" />
                </div>
                <div>
                  <p className="text-3xl font-bold">{stats.avgProgress}%</p>
                  <p className="text-xs text-white/60">Gem. voortgang</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visie & Missie Section - Verbeterde regelafstand */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Programma Visie - Larger */}
        <div className="lg:col-span-3 bg-gradient-to-br from-[#003366] via-[#003d7a] to-[#002244] rounded-2xl p-8 text-white relative overflow-hidden group">
          <div className="absolute top-6 right-6 text-white/10 group-hover:text-white/15 transition-colors">
            <Quote className="w-24 h-24" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-white/15 rounded-xl">
                <Star className="w-5 h-5 text-white/80" />
              </div>
              <span className="text-xs uppercase tracking-widest text-white/50 font-semibold">Programma Visie</span>
            </div>

            {editingVisie ? (
              <textarea
                value={visieForm.programmaVisie}
                onChange={(e) => setVisieForm({ ...visieForm, programmaVisie: e.target.value })}
                className="w-full text-xl font-bold bg-white/10 border border-white/20 rounded-xl p-4 text-white resize-none focus:ring-2 focus:ring-white/30 focus:border-transparent leading-relaxed"
                rows={3}
              />
            ) : (
              <blockquote className="text-xl lg:text-2xl font-bold leading-[1.5] mb-10 text-white/95">
                "{visie.programmaVisie}"
              </blockquote>
            )}

            <div className="flex items-center gap-6 text-sm">
              {editingVisie ? (
                <>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-white/50" />
                    <input
                      type="text"
                      value={visieForm.bronDocument}
                      onChange={(e) => setVisieForm({ ...visieForm, bronDocument: e.target.value })}
                      className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-white/30"
                      placeholder="Brondocument"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-white/50" />
                    <input
                      type="text"
                      value={visieForm.horizon}
                      onChange={(e) => setVisieForm({ ...visieForm, horizon: e.target.value })}
                      className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-white/30"
                      placeholder="Horizon"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2.5 text-white/60">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <FileText className="w-4 h-4" />
                    </div>
                    <span>{visie.bronDocument}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-white/60">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <span>{visie.horizon}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Missie - Smaller */}
        <div className="lg:col-span-2 bg-slate-50 rounded-2xl p-6 border border-slate-200 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 bg-[#003366] rounded-xl shadow-lg shadow-slate-500/10">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-lg font-bold text-slate-800">Missie</h2>
            </div>

            {editingVisie ? (
              <textarea
                value={visieForm.missie}
                onChange={(e) => setVisieForm({ ...visieForm, missie: e.target.value })}
                className="w-full bg-white border border-slate-200 rounded-xl p-4 text-slate-700 text-sm resize-none focus:ring-2 focus:ring-[#003366] focus:border-transparent leading-relaxed"
                rows={5}
              />
            ) : (
              <p className="text-slate-600 leading-[1.8] text-[15px]">{visie.missie}</p>
            )}
          </div>
        </div>
      </div>

      {/* Save button when editing visie */}
      {editingVisie && (
        <div className="flex justify-end">
          <button
            onClick={handleSaveVisie}
            className="flex items-center gap-2 px-6 py-3 bg-[#003366] text-white rounded-xl font-medium hover:bg-[#002855] transition-all"
          >
            <Save className="w-4 h-4" />
            Visie & Missie Opslaan
          </button>
        </div>
      )}

      {/* Filters - Consistent met Vermogens pagina */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-medium text-slate-500">Status:</span>
            <button
              onClick={() => setFilterStatus(null)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                !filterStatus ? 'bg-[#003366] text-white shadow-lg' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Alle
            </button>
            {Object.entries(statusConfig).map(([key, config]) => {
              const StatusIcon = config.icon
              return (
                <button
                  key={key}
                  onClick={() => setFilterStatus(filterStatus === key ? null : key)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    filterStatus === key
                      ? `${config.color} text-white shadow-lg`
                      : `${config.bgLight} ${config.textColor} hover:opacity-80`
                  }`}
                >
                  <StatusIcon className="w-3 h-3" />
                  {config.label} ({statusCounts[key]})
                </button>
              )
            })}
          </div>
          <div className="h-6 w-px bg-slate-200" />
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-500">Prioriteit:</span>
            <button
              onClick={() => setFilterPrioriteit(null)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                !filterPrioriteit ? 'bg-[#003366] text-white shadow-lg' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Alle
            </button>
            {Object.entries(prioriteitConfig).map(([key, config]) => {
              const PrioIcon = config.icon
              return (
                <button
                  key={key}
                  onClick={() => setFilterPrioriteit(filterPrioriteit === key ? null : key)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    filterPrioriteit === key
                      ? `${config.color} text-white shadow-lg`
                      : `${config.bgLight} ${config.textColor} hover:opacity-80`
                  }`}
                >
                  <PrioIcon className="w-3 h-3" />
                  {config.label} ({prioriteitCounts[key]})
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Strategische Doelen Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#003366] rounded-xl">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">Strategische Doelen</h2>
                <p className="text-sm text-slate-500">Meetbare doelstellingen afgeleid van de visie</p>
              </div>
            </div>
            <button
              onClick={() => {
                setDoelFormData(emptyDoel)
                setEditingDoel(null)
                setShowAddDoel(true)
              }}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#003366] text-white rounded-xl hover:bg-[#002855] transition-all text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              Doel toevoegen
            </button>
          </div>
        </div>

        {/* Add/Edit Doel Form */}
        {showAddDoel && (
          <div className="p-6 bg-slate-50 border-b border-slate-200">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#003366] rounded-lg">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-bold text-slate-800">
                  {editingDoel ? 'Doel bewerken' : 'Nieuw Strategisch Doel'}
                </h3>
              </div>
              <button
                onClick={() => { setShowAddDoel(false); setEditingDoel(null); setDoelFormData(emptyDoel); }}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Titel *</label>
                <input
                  type="text"
                  value={doelFormData.titel}
                  onChange={(e) => setDoelFormData({ ...doelFormData, titel: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                  placeholder="Titel van het doel"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Eigenaar</label>
                <input
                  type="text"
                  value={doelFormData.eigenaar}
                  onChange={(e) => setDoelFormData({ ...doelFormData, eigenaar: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                  placeholder="Naam/rol"
                />
              </div>

              <div className="lg:col-span-3">
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Beschrijving</label>
                <textarea
                  value={doelFormData.beschrijving}
                  onChange={(e) => setDoelFormData({ ...doelFormData, beschrijving: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-white resize-none focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                  rows={2}
                  placeholder="Beschrijving van het doel"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Indicator</label>
                <input
                  type="text"
                  value={doelFormData.indicator}
                  onChange={(e) => setDoelFormData({ ...doelFormData, indicator: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                  placeholder="NPS, %, etc."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Huidige waarde</label>
                <input
                  type="text"
                  value={doelFormData.huidigeWaarde}
                  onChange={(e) => setDoelFormData({ ...doelFormData, huidigeWaarde: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                  placeholder="+15, 45%"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Doel waarde</label>
                <input
                  type="text"
                  value={doelFormData.doelWaarde}
                  onChange={(e) => setDoelFormData({ ...doelFormData, doelWaarde: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                  placeholder="+40, 90%"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Prioriteit</label>
                <select
                  value={doelFormData.prioriteit}
                  onChange={(e) => setDoelFormData({ ...doelFormData, prioriteit: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                >
                  <option value="high">Hoog</option>
                  <option value="medium">Midden</option>
                  <option value="low">Laag</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Status</label>
                <select
                  value={doelFormData.status}
                  onChange={(e) => setDoelFormData({ ...doelFormData, status: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                >
                  <option value="actief">Actief</option>
                  <option value="gepland">Gepland</option>
                  <option value="afgerond">Afgerond</option>
                  <option value="risico">Risico</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Tijdshorizon</label>
                <input
                  type="text"
                  value={doelFormData.tijdshorizon}
                  onChange={(e) => setDoelFormData({ ...doelFormData, tijdshorizon: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                  placeholder="Q4 2026"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => { setShowAddDoel(false); setEditingDoel(null); setDoelFormData(emptyDoel); }}
                className="px-5 py-2.5 text-slate-600 hover:bg-white rounded-xl text-sm font-medium transition-colors"
              >
                Annuleren
              </button>
              <button
                onClick={handleSubmitDoel}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#003366] text-white rounded-xl hover:bg-[#002855] text-sm font-medium transition-all"
              >
                <Save className="w-4 h-4" />
                {editingDoel ? 'Opslaan' : 'Toevoegen'}
              </button>
            </div>
          </div>
        )}

        {/* Doelen Grid */}
        <div className="p-6">
          {filteredDoelen.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {filteredDoelen.map(doel => {
                const status = statusConfig[doel.status] || statusConfig.actief
                const prioriteit = prioriteitConfig[doel.prioriteit] || prioriteitConfig.medium
                const progress = calculateProgress(doel.huidigeWaarde, doel.doelWaarde)
                const progressColor = getProgressColor(progress)
                const StatusIcon = status.icon
                const vermogensCount = getVermogensCount(doel.id)

                return (
                  <div
                    key={doel.id}
                    className="relative bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-slate-300 transition-all duration-300 group cursor-pointer"
                    onClick={() => handleEditDoel(doel)}
                  >
                    {/* Accent line */}
                    <div
                      className="h-1.5"
                      style={{ backgroundColor: progressColor }}
                    />

                    <div className="p-5">
                      {/* Actions - altijd zichtbaar voor duidelijkheid */}
                      <div className="absolute top-10 right-4 flex gap-1 z-10">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleEditDoel(doel); }}
                          className="p-2 bg-slate-100 hover:bg-[#003366] hover:text-white rounded-lg transition-colors group/btn"
                          title="Klik om te bewerken"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-slate-500 group-hover/btn:text-white" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDeleteDoel(doel.id); }}
                          className="p-2 bg-red-50 hover:bg-red-500 rounded-lg transition-colors group/btn"
                          title="Verwijderen"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-red-400 group-hover/btn:text-white" />
                        </button>
                      </div>

                      <div className="flex gap-5">
                        {/* Circular Progress */}
                        <div className="flex-shrink-0">
                          <CircularProgress
                            value={progress}
                            size={80}
                            strokeWidth={6}
                            color={progressColor}
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          {/* Header */}
                          <div className="flex items-center gap-2 mb-2.5">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.bgLight} ${status.textColor}`}>
                              <StatusIcon className="w-3 h-3" />
                              {status.label}
                            </span>
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${prioriteit.bgLight} ${prioriteit.textColor}`}>
                              {prioriteit.label}
                            </span>
                          </div>

                          <h3 className="font-bold text-slate-800 mb-1.5 pr-16 line-clamp-1 text-base">{doel.titel}</h3>

                          {doel.beschrijving && (
                            <p className="text-sm text-slate-500 mb-4 line-clamp-2 leading-relaxed">{doel.beschrijving}</p>
                          )}

                          {/* Progress Details */}
                          <div className="flex items-center gap-4 text-xs mb-4">
                            <div className="flex items-center gap-1.5 text-slate-500">
                              <BarChart3 className="w-3.5 h-3.5" />
                              <span>{doel.indicator}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-slate-400">{doel.huidigeWaarde}</span>
                              <ArrowRight className="w-3 h-3 text-slate-300" />
                              <span className="font-semibold text-slate-700">{doel.doelWaarde}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Meta - Buiten de flex voor volledige breedte */}
                      <div className="flex items-center gap-4 text-xs text-slate-500 pt-4 mt-4 border-t border-slate-100">
                        {doel.eigenaar && (
                          <span className="flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-slate-400" />
                            {doel.eigenaar}
                          </span>
                        )}
                        {doel.tijdshorizon && (
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            {doel.tijdshorizon}
                          </span>
                        )}
                        <span className="flex items-center gap-1.5 text-purple-600 font-medium">
                          <Zap className="w-3.5 h-3.5" />
                          {vermogensCount} vermogens
                        </span>
                        {/* Edit hint */}
                        <span className="flex items-center gap-1.5 ml-auto text-slate-400 group-hover:text-[#003366] transition-colors">
                          <Edit3 className="w-3.5 h-3.5" />
                          <span className="hidden group-hover:inline">Klik om aan te passen</span>
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-700 mb-2">
                {filterStatus || filterPrioriteit ? 'Geen doelen gevonden' : 'Nog geen strategische doelen'}
              </h3>
              <p className="text-slate-500 mb-6">
                {filterStatus || filterPrioriteit
                  ? 'Probeer een andere filter'
                  : 'Begin met het definiëren van je eerste strategisch doel'}
              </p>
              <button
                onClick={() => setShowAddDoel(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#003366] text-white rounded-xl font-medium hover:bg-[#002855] transition-all shadow-lg shadow-slate-500/10"
              >
                <Plus className="w-4 h-4" />
                {filterStatus || filterPrioriteit ? 'Doel toevoegen' : 'Eerste doel toevoegen'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* DIN Keten: Volgende stap -> Baten */}
      <div className="relative bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-2xl p-6 text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-orange-400/30 rounded-full blur-2xl" />
        </div>
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
              <TrendingUp className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-white/70 font-medium mb-1">Volgende in DIN keten</p>
              <h3 className="text-xl font-bold">Baten</h3>
              <p className="text-sm text-white/80">Welke meetbare baten leveren deze doelen op?</p>
            </div>
          </div>
          <a
            href="/baten"
            className="flex items-center gap-2 px-6 py-3 bg-white text-amber-600 rounded-xl hover:bg-white/90 transition-all text-sm font-semibold shadow-lg"
          >
            Bekijk Baten
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* DIN Context */}
      <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-5 border border-slate-200">
        <div className="flex items-start gap-4">
          <div className="p-2.5 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg shadow-cyan-500/20">
            <Award className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 mb-1">Doelen-Inspanningennetwerk (DIN)</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              De complete keten: <span className="font-semibold text-indigo-600">Visie</span> →
              <span className="font-semibold text-emerald-600"> Strategische Doelen</span> →
              <span className="font-semibold text-amber-600"> Baten</span> →
              <span className="font-semibold text-purple-600"> Vermogens</span> →
              <span className="font-semibold text-blue-600"> Inspanningen</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
