import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../stores/appStore'
import {
  Target,
  Zap,
  Briefcase,
  ChevronRight,
  ChevronDown,
  Users,
  Layers,
  Monitor,
  TrendingUp,
  Filter,
  Building,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Clock,
  Link2,
  Eye,
  LayoutGrid,
  List
} from 'lucide-react'

// Sector configuratie
const sectorConfig = {
  'Primair onderwijs': { short: 'PO', color: 'bg-cyan-500', bgLight: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200' },
  'Voortgezet onderwijs': { short: 'VO', color: 'bg-indigo-500', bgLight: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
  'Zakelijk Professionals': { short: 'ZP', color: 'bg-emerald-500', bgLight: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' }
}

// Domein configuratie
const domeinConfig = {
  'Mens': { color: '#3B82F6', bg: 'bg-blue-500', bgLight: 'bg-blue-50', text: 'text-blue-700', icon: Users },
  'Proces': { color: '#10B981', bg: 'bg-emerald-500', bgLight: 'bg-emerald-50', text: 'text-emerald-700', icon: Layers },
  'Systeem': { color: '#8B5CF6', bg: 'bg-violet-500', bgLight: 'bg-violet-50', text: 'text-violet-700', icon: Monitor },
  'Cultuur': { color: '#F59E0B', bg: 'bg-amber-500', bgLight: 'bg-amber-50', text: 'text-amber-700', icon: TrendingUp }
}

const sectoren = ['Primair onderwijs', 'Voortgezet onderwijs', 'Zakelijk Professionals']
const domeinen = ['Mens', 'Proces', 'Systeem', 'Cultuur']

export default function DINKeten() {
  const navigate = useNavigate()
  const { baten, vermogens, inspanningen, strategischeDoelen } = useAppStore()
  const [selectedSector, setSelectedSector] = useState(null) // null = alle sectoren
  const [viewMode, setViewMode] = useState('flow') // 'flow' | 'matrix'
  const [expandedItems, setExpandedItems] = useState({})

  // Bereken welke baten gekoppeld zijn aan welke vermogens
  const getBatenVoorVermogen = (vermogenId) => {
    const vermogen = vermogens.find(v => v.id === vermogenId)
    if (!vermogen?.gekoppeldeBaten) return []
    return vermogen.gekoppeldeBaten.map(id => baten.find(b => b.id === id)).filter(Boolean)
  }

  // Bereken welke inspanningen gekoppeld zijn aan welk vermogen
  const getInspanningenVoorVermogen = (vermogenId) => {
    const vermogen = vermogens.find(v => v.id === vermogenId)
    if (!vermogen?.gekoppeldeInspanningen) return []
    return vermogen.gekoppeldeInspanningen.map(id => inspanningen.find(i => i.id === id)).filter(Boolean)
  }

  // Filter op sector
  const filteredBaten = useMemo(() => {
    if (!selectedSector) return baten
    return baten.filter(b => b.sector === selectedSector)
  }, [baten, selectedSector])

  // Bereken statistieken
  const stats = useMemo(() => {
    // Doelen stats
    const doelenMetBaat = new Set(baten.map(b => b.gekoppeldDoel).filter(Boolean))
    const doelenZonderBaat = strategischeDoelen.filter(d => !doelenMetBaat.has(d.id))
    const doelenMetBaatList = strategischeDoelen.filter(d => doelenMetBaat.has(d.id))

    const allGekoppeldeBaten = vermogens.flatMap(v => v.gekoppeldeBaten || [])
    const batenZonderVermogen = filteredBaten.filter(b => !allGekoppeldeBaten.includes(b.id))
    const batenMetVermogen = filteredBaten.filter(b => allGekoppeldeBaten.includes(b.id))

    // Baten zonder gekoppeld doel
    const batenZonderDoel = filteredBaten.filter(b => !b.gekoppeldDoel)

    const vermogensZonderInspanning = vermogens.filter(v => !v.gekoppeldeInspanningen || v.gekoppeldeInspanningen.length === 0)
    const vermogensMetInspanning = vermogens.filter(v => v.gekoppeldeInspanningen && v.gekoppeldeInspanningen.length > 0)

    // Filter vermogens die gekoppeld zijn aan gefilterde baten
    const relevantVermogenIds = new Set()
    filteredBaten.forEach(baat => {
      vermogens.forEach(v => {
        if (v.gekoppeldeBaten?.includes(baat.id)) {
          relevantVermogenIds.add(v.id)
        }
      })
    })

    const relevantVermogens = vermogens.filter(v => relevantVermogenIds.has(v.id))
    const relevantInspanningIds = new Set()
    relevantVermogens.forEach(v => {
      (v.gekoppeldeInspanningen || []).forEach(id => relevantInspanningIds.add(id))
    })
    const relevantInspanningen = inspanningen.filter(i => relevantInspanningIds.has(i.id))

    return {
      totalDoelen: strategischeDoelen.length,
      doelenZonderBaat: doelenZonderBaat.length,
      doelenMetBaat: doelenMetBaatList.length,
      totalBaten: filteredBaten.length,
      batenZonderVermogen: batenZonderVermogen.length,
      batenMetVermogen: batenMetVermogen.length,
      batenZonderDoel: batenZonderDoel.length,
      totalVermogens: selectedSector ? relevantVermogens.length : vermogens.length,
      vermogensZonderInspanning: selectedSector
        ? relevantVermogens.filter(v => !v.gekoppeldeInspanningen || v.gekoppeldeInspanningen.length === 0).length
        : vermogensZonderInspanning.length,
      vermogensMetInspanning: selectedSector
        ? relevantVermogens.filter(v => v.gekoppeldeInspanningen && v.gekoppeldeInspanningen.length > 0).length
        : vermogensMetInspanning.length,
      totalInspanningen: selectedSector ? relevantInspanningen.length : inspanningen.length
    }
  }, [filteredBaten, vermogens, inspanningen, selectedSector, strategischeDoelen, baten])

  // Bouw de keten data structuur
  const ketenData = useMemo(() => {
    const allGekoppeldeBaten = vermogens.flatMap(v => v.gekoppeldeBaten || [])

    // Doelen zonder baat
    const doelenMetBaat = new Set(baten.map(b => b.gekoppeldDoel).filter(Boolean))
    const ongekoppeldeDoelen = strategischeDoelen.filter(d => !doelenMetBaat.has(d.id))

    // Baten zonder vermogen
    const ongekoppeldeBaten = filteredBaten.filter(b => !allGekoppeldeBaten.includes(b.id))

    // Volledige ketens: Doel → Baat → Vermogen → Inspanning
    const gekoppeldeKetens = []

    filteredBaten.forEach(baat => {
      if (allGekoppeldeBaten.includes(baat.id)) {
        // Vind het vermogen dat aan deze baat gekoppeld is
        const gekoppeldeVermogens = vermogens.filter(v => v.gekoppeldeBaten?.includes(baat.id))
        // Vind het doel voor deze baat
        const strategischDoel = baat.gekoppeldDoel
          ? strategischeDoelen.find(d => d.id === baat.gekoppeldDoel)
          : null

        gekoppeldeVermogens.forEach(vermogen => {
          const gekoppeldeInspanningen = getInspanningenVoorVermogen(vermogen.id)

          gekoppeldeKetens.push({
            doel: strategischDoel,
            baat,
            vermogen,
            inspanningen: gekoppeldeInspanningen,
            isComplete: gekoppeldeInspanningen.length > 0
          })
        })
      }
    })

    return {
      ongekoppeldeDoelen,
      ongekoppeldeBaten,
      gekoppeldeKetens
    }
  }, [filteredBaten, vermogens, inspanningen, strategischeDoelen, baten])

  const toggleExpand = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const getStatusColor = (isComplete, hasVermogen) => {
    if (isComplete) return 'bg-green-500'
    if (hasVermogen) return 'bg-amber-500'
    return 'bg-red-500'
  }

  const getStatusText = (isComplete, hasVermogen) => {
    if (isComplete) return 'Compleet'
    if (hasVermogen) return 'Vermogen aanwezig'
    return 'Wacht op vermogen'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#003366] via-[#004080] to-[#003366] rounded-2xl p-6 shadow-xl overflow-hidden relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg">
                <Link2 className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">DIN Keten Overzicht</h1>
                <p className="text-white/70 mt-1 text-xs sm:text-sm">Doelen → Baten → Vermogens → Inspanningen</p>
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl p-1 self-start">
              <button
                onClick={() => setViewMode('flow')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  viewMode === 'flow' ? 'bg-white text-[#003366]' : 'text-white/80 hover:bg-white/10'
                }`}
              >
                <List className="w-4 h-4" />
                Flow
              </button>
              <button
                onClick={() => setViewMode('matrix')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  viewMode === 'matrix' ? 'bg-white text-[#003366]' : 'text-white/80 hover:bg-white/10'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                Matrix
              </button>
            </div>
          </div>

          {/* Stats - responsive: stack op mobiel, flex wrap op tablet, grid op desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-11 gap-2">
            {/* Doelen stats */}
            <div className="col-span-1 sm:col-span-1 md:col-span-2 bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 bg-teal-500 rounded-lg">
                  <Eye className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xl font-bold text-white">{stats.totalDoelen}</p>
                  <p className="text-white/60 text-[10px]">Doelen</p>
                </div>
              </div>
              <div className="flex gap-1 text-[10px]">
                <span className="px-1.5 py-0.5 bg-red-500/20 text-red-200 rounded">{stats.doelenZonderBaat} open</span>
                <span className="px-1.5 py-0.5 bg-green-500/20 text-green-200 rounded">{stats.doelenMetBaat} gekoppeld</span>
              </div>
            </div>

            {/* Arrow - verborgen op mobiel */}
            <div className="hidden md:flex items-center justify-center">
              <ArrowRight className="w-5 h-5 text-white/40" />
            </div>

            {/* Baten stats */}
            <div className="col-span-1 sm:col-span-1 md:col-span-2 bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 bg-amber-500 rounded-lg">
                  <Target className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xl font-bold text-white">{stats.totalBaten}</p>
                  <p className="text-white/60 text-[10px]">Baten</p>
                </div>
              </div>
              <div className="flex gap-1 text-[10px]">
                <span className="px-1.5 py-0.5 bg-red-500/20 text-red-200 rounded">{stats.batenZonderVermogen} open</span>
                <span className="px-1.5 py-0.5 bg-green-500/20 text-green-200 rounded">{stats.batenMetVermogen} gekoppeld</span>
              </div>
            </div>

            {/* Arrow - verborgen op mobiel */}
            <div className="hidden md:flex items-center justify-center">
              <ArrowRight className="w-5 h-5 text-white/40" />
            </div>

            {/* Vermogens stats */}
            <div className="col-span-1 sm:col-span-1 md:col-span-2 bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 bg-violet-500 rounded-lg">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xl font-bold text-white">{stats.totalVermogens}</p>
                  <p className="text-white/60 text-[10px]">Vermogens</p>
                </div>
              </div>
              <div className="flex gap-1 text-[10px]">
                <span className="px-1.5 py-0.5 bg-amber-500/20 text-amber-200 rounded">{stats.vermogensZonderInspanning} open</span>
                <span className="px-1.5 py-0.5 bg-green-500/20 text-green-200 rounded">{stats.vermogensMetInspanning} gekoppeld</span>
              </div>
            </div>

            {/* Arrow - verborgen op mobiel */}
            <div className="hidden md:flex items-center justify-center">
              <ArrowRight className="w-5 h-5 text-white/40" />
            </div>

            {/* Inspanningen stats */}
            <div className="col-span-1 sm:col-span-1 md:col-span-2 bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-blue-500 rounded-lg">
                  <Briefcase className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xl font-bold text-white">{stats.totalInspanningen}</p>
                  <p className="text-white/60 text-[10px]">Inspanningen</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sector Filter */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-medium text-slate-600">Sector:</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedSector(null)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedSector === null
                  ? 'bg-[#003366] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Alle sectoren
            </button>
            {sectoren.map(sector => {
              const config = sectorConfig[sector]
              return (
                <button
                  key={sector}
                  onClick={() => setSelectedSector(sector)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedSector === sector
                      ? `${config.color} text-white`
                      : `${config.bgLight} ${config.text} hover:opacity-80`
                  }`}
                >
                  {config.short}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Legenda */}
      <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
        <div className="flex items-center gap-6 flex-wrap">
          <span className="text-sm font-medium text-slate-600">Status:</span>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <span className="text-xs text-slate-600">Wacht op volgende stap</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-amber-500 rounded-full" />
            <span className="text-xs text-slate-600">Gedeeltelijk gekoppeld</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span className="text-xs text-slate-600">Keten compleet</span>
          </div>
        </div>
      </div>

      {/* Flow View */}
      {viewMode === 'flow' && (
        <div className="space-y-4">
          {/* Ongekoppelde Doelen */}
          {ketenData.ongekoppeldeDoelen.length > 0 && (
            <div className="bg-teal-50 rounded-2xl border-2 border-teal-200 overflow-hidden">
              <div className="bg-teal-100 px-5 py-4 border-b border-teal-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-teal-500 rounded-xl">
                      <Eye className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="font-bold text-teal-900">Doelen zonder Baat</h2>
                      <p className="text-sm text-teal-700">Deze doelen wachten nog op een gekoppelde baat</p>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-teal-500 text-white rounded-full text-sm font-bold">
                    {ketenData.ongekoppeldeDoelen.length}
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {ketenData.ongekoppeldeDoelen.map(doel => (
                    <div
                      key={doel.id}
                      className="flex items-center gap-3 p-4 bg-white rounded-xl border border-teal-200"
                    >
                      <div className="w-3 h-3 bg-teal-500 rounded-full flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-slate-800 truncate">{doel.titel}</p>
                        {doel.beschrijving && (
                          <p className="text-xs text-slate-500 truncate mt-0.5">{doel.beschrijving}</p>
                        )}
                      </div>
                      <button
                        onClick={() => navigate('/baten')}
                        className="p-2 bg-teal-100 hover:bg-teal-200 rounded-lg transition-colors"
                        title="Ga naar Baten om te koppelen"
                      >
                        <ArrowRight className="w-4 h-4 text-teal-600" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Ongekoppelde Baten */}
          {ketenData.ongekoppeldeBaten.length > 0 && (
            <div className="bg-red-50 rounded-2xl border-2 border-red-200 overflow-hidden">
              <div className="bg-red-100 px-5 py-4 border-b border-red-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-500 rounded-xl">
                      <AlertCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="font-bold text-red-900">Baten zonder Vermogen</h2>
                      <p className="text-sm text-red-700">Deze baten wachten nog op een gekoppeld vermogen</p>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-red-500 text-white rounded-full text-sm font-bold">
                    {ketenData.ongekoppeldeBaten.length}
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {ketenData.ongekoppeldeBaten.map(baat => {
                    const dConfig = domeinConfig[baat.domein] || domeinConfig.Mens
                    const sConfig = sectorConfig[baat.sector]
                    return (
                      <div
                        key={baat.id}
                        className="flex items-center gap-3 p-4 bg-white rounded-xl border border-red-200"
                      >
                        <div className="w-3 h-3 bg-red-500 rounded-full flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-slate-800 truncate">{baat.naam}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`px-2 py-0.5 text-xs rounded ${sConfig?.bgLight} ${sConfig?.text}`}>
                              {sConfig?.short}
                            </span>
                            <span className={`px-2 py-0.5 text-xs rounded ${dConfig.bgLight} ${dConfig.text}`}>
                              {baat.domein}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => navigate('/vermogens')}
                          className="p-2 bg-red-100 hover:bg-red-200 rounded-lg transition-colors"
                          title="Ga naar Vermogens om te koppelen"
                        >
                          <ArrowRight className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Gekoppelde Ketens */}
          {ketenData.gekoppeldeKetens.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-50 px-5 py-4 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#003366] rounded-xl">
                      <Link2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="font-bold text-slate-800">Gekoppelde Ketens</h2>
                      <p className="text-sm text-slate-600">Doelen → Baten → Vermogens → Inspanningen</p>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-[#003366] text-white rounded-full text-sm font-bold">
                    {ketenData.gekoppeldeKetens.length}
                  </div>
                </div>
              </div>
              <div className="p-4 space-y-3">
                {ketenData.gekoppeldeKetens.map((keten, index) => {
                  const dConfig = domeinConfig[keten.baat.domein] || domeinConfig.Mens
                  const sConfig = sectorConfig[keten.baat.sector]
                  const isExpanded = expandedItems[`keten-${index}`]

                  return (
                    <div
                      key={`${keten.baat.id}-${keten.vermogen.id}`}
                      className={`rounded-xl border-2 overflow-hidden transition-all ${
                        keten.isComplete ? 'border-green-200 bg-green-50/30' : 'border-amber-200 bg-amber-50/30'
                      }`}
                    >
                      <button
                        onClick={() => toggleExpand(`keten-${index}`)}
                        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-white/50 transition-colors"
                      >
                        {/* Status indicator */}
                        <div className={`w-3 h-3 rounded-full flex-shrink-0 ${keten.isComplete ? 'bg-green-500' : 'bg-amber-500'}`} />

                        {/* Doel */}
                        <div className="flex items-center gap-2 min-w-0" style={{ flex: '0 0 auto', maxWidth: '160px' }}>
                          <div className="p-1.5 bg-teal-50 rounded-lg">
                            <Eye className="w-4 h-4 text-teal-600" />
                          </div>
                          <div className="text-left min-w-0">
                            {keten.doel ? (
                              <p className="font-medium text-slate-800 truncate text-sm">{keten.doel.titel}</p>
                            ) : (
                              <p className="text-xs text-slate-400 italic">Geen doel</p>
                            )}
                          </div>
                        </div>

                        <ChevronRight className="w-3 h-3 text-slate-400 flex-shrink-0" />

                        {/* Baat */}
                        <div className="flex items-center gap-2 min-w-0" style={{ flex: '0 0 auto', maxWidth: '160px' }}>
                          <div className={`p-1.5 ${dConfig.bgLight} rounded-lg`}>
                            <Target className={`w-4 h-4 ${dConfig.text}`} />
                          </div>
                          <div className="text-left min-w-0">
                            <p className="font-medium text-slate-800 truncate text-sm">{keten.baat.naam}</p>
                            <p className="text-xs text-slate-500">{sConfig?.short}</p>
                          </div>
                        </div>

                        <ChevronRight className="w-3 h-3 text-slate-400 flex-shrink-0" />

                        {/* Vermogen */}
                        <div className="flex items-center gap-2 min-w-0" style={{ flex: '0 0 auto', maxWidth: '160px' }}>
                          <div className="p-1.5 bg-violet-50 rounded-lg">
                            <Zap className="w-4 h-4 text-violet-600" />
                          </div>
                          <div className="text-left min-w-0">
                            <p className="font-medium text-slate-800 truncate text-sm">{keten.vermogen.naam}</p>
                          </div>
                        </div>

                        <ChevronRight className="w-3 h-3 text-slate-400 flex-shrink-0" />

                        {/* Inspanningen count */}
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-blue-50 rounded-lg">
                            <Briefcase className="w-4 h-4 text-blue-600" />
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                            keten.inspanningen.length > 0
                              ? 'bg-green-100 text-green-700'
                              : 'bg-amber-100 text-amber-700'
                          }`}>
                            {keten.inspanningen.length}
                          </span>
                        </div>

                        {isExpanded ? (
                          <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
                        )}
                      </button>

                      {/* Expanded Details */}
                      {isExpanded && (
                        <div className="px-4 pb-4 pt-2 border-t border-slate-200 bg-white/50">
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
                            {/* Doel details */}
                            <div className="bg-white rounded-lg p-3 border border-slate-200">
                              <div className="flex items-center gap-2 mb-2">
                                <Eye className="w-4 h-4 text-teal-600" />
                                <span className="text-xs font-semibold text-slate-600 uppercase">Doel</span>
                              </div>
                              {keten.doel ? (
                                <>
                                  <p className="font-medium text-slate-800 text-sm">{keten.doel.titel}</p>
                                  {keten.doel.beschrijving && (
                                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{keten.doel.beschrijving}</p>
                                  )}
                                </>
                              ) : (
                                <p className="text-xs text-slate-400 italic">Niet gekoppeld aan een doel</p>
                              )}
                            </div>

                            {/* Baat details */}
                            <div className="bg-white rounded-lg p-3 border border-slate-200">
                              <div className="flex items-center gap-2 mb-2">
                                <Target className={`w-4 h-4 ${dConfig.text}`} />
                                <span className="text-xs font-semibold text-slate-600 uppercase">Baat</span>
                              </div>
                              <p className="font-medium text-slate-800 text-sm">{keten.baat.naam}</p>
                              {keten.baat.beschrijving && (
                                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{keten.baat.beschrijving}</p>
                              )}
                              <div className="flex gap-1 mt-2">
                                <span className={`px-2 py-0.5 text-xs rounded ${sConfig?.bgLight} ${sConfig?.text}`}>
                                  {sConfig?.short}
                                </span>
                                <span className={`px-2 py-0.5 text-xs rounded ${dConfig.bgLight} ${dConfig.text}`}>
                                  {keten.baat.domein}
                                </span>
                              </div>
                            </div>

                            {/* Vermogen details */}
                            <div className="bg-white rounded-lg p-3 border border-slate-200">
                              <div className="flex items-center gap-2 mb-2">
                                <Zap className="w-4 h-4 text-violet-600" />
                                <span className="text-xs font-semibold text-slate-600 uppercase">Vermogen</span>
                              </div>
                              <p className="font-medium text-slate-800 text-sm">{keten.vermogen.naam}</p>
                              {keten.vermogen.beschrijving && (
                                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{keten.vermogen.beschrijving}</p>
                              )}
                              <div className="flex gap-1 mt-2">
                                <span className="px-2 py-0.5 text-xs rounded bg-violet-50 text-violet-700">
                                  {keten.vermogen.type}
                                </span>
                                <span className={`px-2 py-0.5 text-xs rounded ${domeinConfig[keten.vermogen.domein]?.bgLight} ${domeinConfig[keten.vermogen.domein]?.text}`}>
                                  {keten.vermogen.domein}
                                </span>
                              </div>
                            </div>

                            {/* Inspanningen details */}
                            <div className="bg-white rounded-lg p-3 border border-slate-200">
                              <div className="flex items-center gap-2 mb-2">
                                <Briefcase className="w-4 h-4 text-blue-600" />
                                <span className="text-xs font-semibold text-slate-600 uppercase">Inspanningen</span>
                              </div>
                              {keten.inspanningen.length > 0 ? (
                                <div className="space-y-2">
                                  {keten.inspanningen.map(insp => (
                                    <div key={insp.id} className="flex items-center gap-2">
                                      <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                                      <p className="text-xs text-slate-700 truncate">{insp.naam}</p>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="flex items-center gap-2 text-amber-600">
                                  <Clock className="w-4 h-4" />
                                  <p className="text-xs">Wacht op inspanning</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Empty state */}
          {ketenData.ongekoppeldeBaten.length === 0 && ketenData.gekoppeldeKetens.length === 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
              <Link2 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Geen data voor deze sector</h3>
              <p className="text-slate-500 mb-4">
                {selectedSector
                  ? `Er zijn nog geen baten voor ${selectedSector}`
                  : 'Begin met het toevoegen van baten om de DIN keten te vullen'
                }
              </p>
              <button
                onClick={() => navigate('/baten')}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#003366] text-white rounded-xl hover:bg-[#002855] transition-colors"
              >
                <Target className="w-5 h-5" />
                Ga naar Baten
              </button>
            </div>
          )}
        </div>
      )}

      {/* Matrix View */}
      {viewMode === 'matrix' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Doel</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Baat</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Sector</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Vermogen</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Inspanningen</th>
                  <th className="px-3 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredBaten.map(baat => {
                  const dConfig = domeinConfig[baat.domein] || domeinConfig.Mens
                  const sConfig = sectorConfig[baat.sector]
                  const allGekoppeldeBaten = vermogens.flatMap(v => v.gekoppeldeBaten || [])
                  const hasVermogen = allGekoppeldeBaten.includes(baat.id)
                  const gekoppeldeVermogens = vermogens.filter(v => v.gekoppeldeBaten?.includes(baat.id))
                  const gekoppeldeInspanningen = gekoppeldeVermogens.flatMap(v =>
                    (v.gekoppeldeInspanningen || []).map(id => inspanningen.find(i => i.id === id)).filter(Boolean)
                  )
                  const isComplete = hasVermogen && gekoppeldeInspanningen.length > 0
                  const gekoppeldDoel = baat.gekoppeldDoel
                    ? strategischeDoelen.find(d => d.id === baat.gekoppeldDoel)
                    : null

                  return (
                    <tr key={baat.id} className="hover:bg-slate-50">
                      <td className="px-3 py-3">
                        {gekoppeldDoel ? (
                          <div className="flex items-center gap-2">
                            <Eye className="w-4 h-4 text-teal-600 flex-shrink-0" />
                            <span className="text-sm text-slate-700 truncate max-w-[140px]">{gekoppeldDoel.titel}</span>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400 italic">Geen doel</span>
                        )}
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2">
                          <Target className={`w-4 h-4 ${dConfig.text} flex-shrink-0`} />
                          <span className="font-medium text-slate-800 text-sm truncate max-w-[140px]">{baat.naam}</span>
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <span className={`px-2 py-1 text-xs rounded ${sConfig?.bgLight} ${sConfig?.text}`}>
                          {sConfig?.short}
                        </span>
                      </td>
                      <td className="px-3 py-3">
                        {gekoppeldeVermogens.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {gekoppeldeVermogens.slice(0, 1).map(v => (
                              <span key={v.id} className="px-2 py-1 text-xs rounded bg-violet-50 text-violet-700 truncate max-w-[120px]">
                                {v.naam}
                              </span>
                            ))}
                            {gekoppeldeVermogens.length > 1 && (
                              <span className="px-2 py-1 text-xs rounded bg-slate-100 text-slate-600">
                                +{gekoppeldeVermogens.length - 1}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400 italic">Niet gekoppeld</span>
                        )}
                      </td>
                      <td className="px-3 py-3">
                        {gekoppeldeInspanningen.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {gekoppeldeInspanningen.slice(0, 1).map(i => (
                              <span key={i.id} className="px-2 py-1 text-xs rounded bg-blue-50 text-blue-700 truncate max-w-[120px]">
                                {i.naam}
                              </span>
                            ))}
                            {gekoppeldeInspanningen.length > 1 && (
                              <span className="px-2 py-1 text-xs rounded bg-slate-100 text-slate-600">
                                +{gekoppeldeInspanningen.length - 1}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400 italic">Geen</span>
                        )}
                      </td>
                      <td className="px-3 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(isComplete, hasVermogen)}`} />
                          <span className={`text-xs font-medium ${
                            isComplete ? 'text-green-700' : hasVermogen ? 'text-amber-700' : 'text-red-700'
                          }`}>
                            {getStatusText(isComplete, hasVermogen)}
                          </span>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {filteredBaten.length === 0 && (
            <div className="p-12 text-center">
              <Link2 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Geen data</h3>
              <p className="text-slate-500">Voeg baten toe om de matrix te vullen</p>
            </div>
          )}
        </div>
      )}

      {/* Quick Navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
        <button
          onClick={() => navigate('/visie-doelen')}
          className="flex items-center gap-3 p-4 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl border-2 border-teal-200 hover:border-teal-400 transition-all group"
        >
          <div className="p-2.5 bg-teal-500 rounded-xl">
            <Eye className="w-5 h-5 text-white" />
          </div>
          <div className="text-left flex-1 min-w-0">
            <h3 className="font-bold text-teal-900 text-sm">Doelen</h3>
            <p className="text-xs text-teal-700">Start van de keten</p>
          </div>
          <ArrowRight className="w-4 h-4 text-teal-400 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={() => navigate('/baten')}
          className="flex items-center gap-3 p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200 hover:border-amber-400 transition-all group"
        >
          <div className="p-2.5 bg-amber-500 rounded-xl">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div className="text-left flex-1 min-w-0">
            <h3 className="font-bold text-amber-900 text-sm">Baten</h3>
            <p className="text-xs text-amber-700">Meetbare resultaten</p>
          </div>
          <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={() => navigate('/vermogens')}
          className="flex items-center gap-3 p-4 bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl border-2 border-violet-200 hover:border-violet-400 transition-all group"
        >
          <div className="p-2.5 bg-violet-500 rounded-xl">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div className="text-left flex-1 min-w-0">
            <h3 className="font-bold text-violet-900 text-sm">Vermogens</h3>
            <p className="text-xs text-violet-700">Capabilities</p>
          </div>
          <ArrowRight className="w-4 h-4 text-violet-400 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={() => navigate('/inspanningen')}
          className="flex items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 hover:border-blue-400 transition-all group"
        >
          <div className="p-2.5 bg-blue-500 rounded-xl">
            <Briefcase className="w-5 h-5 text-white" />
          </div>
          <div className="text-left flex-1 min-w-0">
            <h3 className="font-bold text-blue-900 text-sm">Inspanningen</h3>
            <p className="text-xs text-blue-700">Projecten & processen</p>
          </div>
          <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  )
}
