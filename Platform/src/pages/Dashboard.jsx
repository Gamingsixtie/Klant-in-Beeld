import { useMemo, useState } from 'react'
import { useAppStore } from '../stores/appStore'
import { useMethodologieStore } from '../stores/methodologieStore'
import { sectoren } from '../data/programmaData'
import { useNavigate } from 'react-router-dom'
import {
  Target,
  ListTodo,
  Users,
  TrendingUp,
  Calendar,
  AlertCircle,
  AlertTriangle,
  GitBranch,
  Briefcase,
  Flag,
  Gauge,
  CheckCircle,
  ArrowRight,
  ChevronRight,
  Info
} from 'lucide-react'

// Iteratie 1: Data Hiërarchie - Primaire en secundaire KPIs duidelijk gescheiden
// Iteratie 2: Visuele indicatoren - Consistente kleuren en status badges
// Iteratie 3: Compacte data cards - Dense maar leesbaar
// Iteratie 4: Context tooltips - Uitleg bij elk getal
// Iteratie 5: Actionable insights - Wat moet je doen?

export default function Dashboard() {
  const navigate = useNavigate()
  const { baten, inspanningen, risicos, issues } = useAppStore()
  const { getStuurparametersMetMetadata, getCyclusVoortgang, voortgang } = useMethodologieStore()
  const [sectorFilter, setSectorFilter] = useState('alle')

  const stuurparameters = getStuurparametersMetMetadata()

  // === DATA BEREKENINGEN ===

  // Gefilterde data
  const filteredBaten = useMemo(() => {
    if (sectorFilter === 'alle') return baten || []
    const sectorNaam = sectoren.find(s => s.id === sectorFilter)?.naam
    return baten?.filter(b => b.sector === sectorNaam) || []
  }, [baten, sectorFilter])

  const filteredInspanningen = useMemo(() => {
    if (sectorFilter === 'alle') return inspanningen || []
    const sectorBatenIds = filteredBaten.map(b => String(b.id))
    return inspanningen?.filter(i =>
      i.gekoppeldeBaten?.some(baatId => sectorBatenIds.includes(baatId))
    ) || []
  }, [inspanningen, sectorFilter, filteredBaten])

  // Kerngetallen
  const kpis = useMemo(() => {
    const fb = filteredBaten
    const fi = filteredInspanningen
    const fr = risicos || []
    const fis = issues || []

    // NPS
    const npsHuidig = fb.length > 0
      ? Math.round(fb.reduce((sum, b) => sum + (b.huidigeWaarde || 0), 0) / fb.length)
      : 0
    const npsDoel = fb.length > 0
      ? Math.round(fb.reduce((sum, b) => sum + (b.doelWaarde || 0), 0) / fb.length)
      : 0

    // Dekkingsgraad
    const batenMetKoppeling = fb.filter(baat =>
      fi.some(insp => insp.gekoppeldeBaten?.includes(String(baat.id)))
    ).length
    const dekking = fb.length > 0 ? Math.round((batenMetKoppeling / fb.length) * 100) : 0

    // Inspanningen
    const inspActief = fi.filter(i => i.status === 'in_progress').length
    const inspGepland = fi.filter(i => i.status === 'planned').length
    const inspVoltooid = fi.filter(i => i.status === 'completed').length

    // Risico's
    const risicoHoog = fr.filter(r => (r.score || 0) >= 15).length
    const risicoOpen = fr.filter(r => r.status === 'open' || r.status === 'in_behandeling').length
    const issuesOpen = fis.filter(i => i.status !== 'opgelost').length

    // Go/No-Go Gereedheid
    const cyclusVoortgang = getCyclusVoortgang ? getCyclusVoortgang() : { percentage: 50 }
    const stuurparamsOk = stuurparameters?.filter(p => p.status === 'groen').length || 0
    const stuurparamsTotal = stuurparameters?.length || 5
    const risicoScore = risicoHoog > 0 ? 0 : risicoOpen > 2 ? 50 : 100

    const gereedheid = Math.round(
      (cyclusVoortgang.percentage * 0.4) +
      ((stuurparamsOk / stuurparamsTotal) * 100 * 0.3) +
      (dekking * 0.2) +
      (risicoScore * 0.1)
    )

    return {
      batenCount: fb.length,
      inspanningenCount: fi.length,
      npsHuidig,
      npsDoel,
      npsDelta: npsDoel - npsHuidig,
      dekkingsgraad: dekking,
      inspActief,
      inspGepland,
      inspVoltooid,
      risicoHoog,
      risicoOpen,
      issuesOpen,
      gereedheid: Math.min(100, Math.max(0, gereedheid)),
      stuurparamsOk,
      stuurparamsTotal
    }
  }, [filteredBaten, filteredInspanningen, risicos, issues, getCyclusVoortgang, stuurparameters])

  // Sector stats
  const sectorStats = useMemo(() => {
    return sectoren.map(sector => {
      const sectorBaten = baten?.filter(b => b.sector === sector.naam) || []
      const huidigeNPS = sectorBaten.length > 0
        ? Math.round(sectorBaten.reduce((sum, b) => sum + (b.huidigeWaarde || 0), 0) / sectorBaten.length)
        : 0
      const doelNPS = sectorBaten.length > 0
        ? Math.round(sectorBaten.reduce((sum, b) => sum + (b.doelWaarde || 0), 0) / sectorBaten.length)
        : 0
      return { ...sector, batenCount: sectorBaten.length, huidigeNPS, doelNPS }
    })
  }, [baten])

  // Actionable Insights - Iteratie 5
  const insights = useMemo(() => {
    const items = []

    if (kpis.risicoHoog > 0) {
      items.push({
        type: 'error',
        title: `${kpis.risicoHoog} hoog risico`,
        action: 'Directe actie vereist',
        link: '/inspanningen'
      })
    }
    if (kpis.dekkingsgraad < 50 && kpis.batenCount > 0) {
      items.push({
        type: 'warning',
        title: 'Lage dekkingsgraad',
        action: 'Koppel inspanningen aan baten',
        link: '/inspanningen'
      })
    }
    if (kpis.batenCount === 0) {
      items.push({
        type: 'info',
        title: 'Geen baten gedefinieerd',
        action: 'Definieer NPS doelen per sector',
        link: '/baten'
      })
    }
    if (kpis.gereedheid >= 80) {
      items.push({
        type: 'success',
        title: 'Gereed voor Go/No-Go',
        action: 'Plan Sponsorgroep meeting',
        link: '/governance'
      })
    }

    return items
  }, [kpis])

  const hasData = kpis.batenCount > 0 || kpis.inspanningenCount > 0

  // === RENDER ===

  return (
    <div className="space-y-4">
      {/* HEADER - Compact met sector filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900">Programma Dashboard</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Cyclus: <span className="font-medium text-slate-700">{voortgang?.huidigeCyclus || 'Verkennen'}</span>
          </p>
        </div>

        {/* Sector Filter - Compact */}
        <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-0.5 overflow-x-auto">
          <button
            onClick={() => setSectorFilter('alle')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              sectorFilter === 'alle' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Alle
          </button>
          {sectoren.map(sector => (
            <button
              key={sector.id}
              onClick={() => setSectorFilter(sector.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                sectorFilter === sector.id ? 'bg-white shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
              style={sectorFilter === sector.id ? { color: sector.kleur } : {}}
            >
              {sector.afkorting}
            </button>
          ))}
        </div>
      </div>

      {/* ITERATIE 5: Actionable Insights - Alerts bovenaan */}
      {insights.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {insights.map((insight, i) => (
            <button
              key={i}
              onClick={() => navigate(insight.link)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                insight.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100' :
                insight.type === 'warning' ? 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100' :
                insight.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100' :
                'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100'
              }`}
            >
              {insight.type === 'error' ? <AlertCircle className="w-3.5 h-3.5" /> :
               insight.type === 'warning' ? <AlertTriangle className="w-3.5 h-3.5" /> :
               insight.type === 'success' ? <CheckCircle className="w-3.5 h-3.5" /> :
               <Info className="w-3.5 h-3.5" />}
              <span>{insight.title}</span>
              <ChevronRight className="w-3 h-3 opacity-50" />
            </button>
          ))}
        </div>
      )}

      {/* ITERATIE 1: Primaire KPI - Go/No-Go Gereedheid altijd zichtbaar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 sm:gap-3">
        {/* Go/No-Go Gereedheid - Hoofdkaart */}
        <div className="col-span-1 sm:col-span-2 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-4 text-white">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="text-xs text-white/60 uppercase tracking-wide">Go/No-Go Gereedheid</div>
              <div className="text-4xl font-bold mt-1">{kpis.gereedheid}%</div>
            </div>
            <Gauge className="w-8 h-8 text-white/40" />
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                kpis.gereedheid >= 80 ? 'bg-green-400' : kpis.gereedheid >= 60 ? 'bg-amber-400' : 'bg-red-400'
              }`}
              style={{ width: `${kpis.gereedheid}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-3 text-xs">
            <span className="text-white/60">Stuurparameters: {kpis.stuurparamsOk}/{kpis.stuurparamsTotal} OK</span>
            <span className={`px-2 py-0.5 rounded ${
              kpis.gereedheid >= 80 ? 'bg-green-500/30 text-green-300' :
              kpis.gereedheid >= 60 ? 'bg-amber-500/30 text-amber-300' :
              'bg-red-500/30 text-red-300'
            }`}>
              {kpis.gereedheid >= 80 ? 'Gereed' : kpis.gereedheid >= 60 ? 'Bijna' : 'Niet gereed'}
            </span>
          </div>
        </div>

        {/* ITERATIE 3: Compacte data cards - Secundaire KPIs */}
        {/* NPS Delta */}
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>NPS Delta</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-slate-800">+{kpis.npsHuidig}</span>
            <ArrowRight className="w-3 h-3 text-slate-400 mx-1" />
            <span className="text-lg font-bold text-green-600">+{kpis.npsDoel}</span>
          </div>
          <div className="text-xs text-blue-600 mt-1">+{kpis.npsDelta} te realiseren</div>
        </div>

        {/* Dekkingsgraad */}
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <GitBranch className="w-3.5 h-3.5" />
            <span>Dekking</span>
          </div>
          <div className="text-2xl font-bold text-slate-800">{kpis.dekkingsgraad}%</div>
          <div className="h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
            <div
              className={`h-full rounded-full ${kpis.dekkingsgraad >= 80 ? 'bg-green-500' : 'bg-amber-500'}`}
              style={{ width: `${kpis.dekkingsgraad}%` }}
            />
          </div>
          <div className="text-xs text-slate-500 mt-1">Baten met inspanningen</div>
        </div>

        {/* Risico's */}
        <div className={`rounded-xl border p-4 ${
          kpis.risicoHoog > 0 ? 'bg-red-50 border-red-200' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <Flag className="w-3.5 h-3.5" />
            <span>Risico's</span>
          </div>
          <div className="flex items-baseline gap-3">
            <div>
              <span className="text-2xl font-bold text-slate-800">{kpis.risicoOpen}</span>
              <span className="text-xs text-slate-500 ml-1">open</span>
            </div>
            {kpis.risicoHoog > 0 && (
              <div className="text-red-600">
                <span className="text-lg font-bold">{kpis.risicoHoog}</span>
                <span className="text-xs ml-1">hoog</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ITERATIE 2: Stuurparameters met visuele indicatoren */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-slate-700">Stuurparameters</h3>
          <span className="text-xs text-slate-500">
            {kpis.stuurparamsOk} van {kpis.stuurparamsTotal} op groen
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {stuurparameters?.map((param) => (
            <div
              key={param.id}
              className={`rounded-lg p-2.5 border ${
                param.status === 'groen' ? 'bg-green-50 border-green-200' :
                param.status === 'geel' ? 'bg-yellow-50 border-yellow-200' :
                'bg-red-50 border-red-200'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <div className={`w-2 h-2 rounded-full ${
                  param.status === 'groen' ? 'bg-green-500' :
                  param.status === 'geel' ? 'bg-yellow-500' : 'bg-red-500'
                }`} />
                <span className="text-xs font-medium text-slate-700 truncate">{param.naam}</span>
              </div>
              <p className="text-[10px] text-slate-500 line-clamp-2">{param.toelichting}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ITERATIE 3: Sector Overzicht - Compacte grid */}
      {sectorFilter === 'alle' && (
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">Per Sector</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
            {sectorStats.map(sector => (
              <button
                key={sector.id}
                onClick={() => setSectorFilter(sector.id)}
                className="p-3 rounded-lg border-l-4 text-left hover:shadow-md transition-all bg-slate-50 hover:bg-white"
                style={{ borderColor: sector.kleur }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded flex items-center justify-center text-white text-xs font-bold"
                      style={{ backgroundColor: sector.kleur }}
                    >
                      {sector.afkorting}
                    </div>
                    <span className="text-sm font-medium text-slate-800">{sector.naam}</span>
                  </div>
                  <span className="text-xs text-slate-500">{sector.batenCount} baten</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-slate-800">+{sector.huidigeNPS}</span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                  <span className="text-sm font-semibold text-green-600">+{sector.doelNPS}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Detail data - Baten en Inspanningen */}
      {hasData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3">
          {/* Baten */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-500" />
                <h3 className="text-sm font-semibold text-slate-700">Baten</h3>
              </div>
              <button
                onClick={() => navigate('/baten')}
                className="text-xs text-blue-600 hover:underline flex items-center gap-1"
              >
                Beheren <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-1.5 max-h-48 overflow-y-auto">
              {filteredBaten.slice(0, 5).map(baat => (
                <div key={baat.id} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg text-sm">
                  <span className="text-slate-700 truncate flex-1 mr-2">{baat.naam}</span>
                  <div className="flex items-center gap-1 text-xs whitespace-nowrap">
                    <span className="text-slate-500">+{baat.huidigeWaarde}</span>
                    <ArrowRight className="w-2.5 h-2.5 text-slate-400" />
                    <span className="text-green-600 font-medium">+{baat.doelWaarde}</span>
                  </div>
                </div>
              ))}
              {filteredBaten.length === 0 && (
                <div className="text-center py-4 text-slate-400 text-sm">
                  Geen baten
                </div>
              )}
            </div>
          </div>

          {/* Inspanningen */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-purple-500" />
                <h3 className="text-sm font-semibold text-slate-700">Inspanningen</h3>
              </div>
              <button
                onClick={() => navigate('/inspanningen')}
                className="text-xs text-purple-600 hover:underline flex items-center gap-1"
              >
                Beheren <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <div className="flex gap-4 mb-3 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-slate-600">Actief: {kpis.inspActief}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="text-slate-600">Gepland: {kpis.inspGepland}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-slate-600">Voltooid: {kpis.inspVoltooid}</span>
              </div>
            </div>
            <div className="space-y-1.5 max-h-32 overflow-y-auto">
              {filteredInspanningen.slice(0, 4).map(insp => (
                <div key={insp.id} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg text-sm">
                  <span className="text-slate-700 truncate flex-1 mr-2">{insp.naam}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded ${
                    insp.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                    insp.status === 'completed' ? 'bg-green-100 text-green-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {insp.status === 'in_progress' ? 'Actief' :
                     insp.status === 'completed' ? 'Klaar' : 'Gepland'}
                  </span>
                </div>
              ))}
              {filteredInspanningen.length === 0 && (
                <div className="text-center py-4 text-slate-400 text-sm">
                  Geen inspanningen
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Geen data - Onboarding */}
      {!hasData && (
        <div className="bg-gradient-to-br from-blue-50 to-slate-50 border border-blue-200 rounded-xl p-8 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Target className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-semibold text-slate-800 mb-2">Begin met het definiëren van baten</h3>
          <p className="text-sm text-slate-600 mb-4 max-w-md mx-auto">
            Voeg NPS doelen per sector toe om dit dashboard met stuurinformatie te vullen.
          </p>
          <button
            onClick={() => navigate('/baten')}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
          >
            Baten toevoegen
          </button>
        </div>
      )}

      {/* Snelle navigatie - Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-200">
        <div className="flex gap-2">
          {[
            { path: '/baten', icon: Target, label: 'Baten', color: 'blue' },
            { path: '/inspanningen', icon: ListTodo, label: 'Inspanningen', color: 'purple' },
            { path: '/roadmap', icon: Calendar, label: 'Roadmap', color: 'green' },
            { path: '/governance', icon: Users, label: 'Governance', color: 'amber' }
          ].map(item => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-slate-600 hover:bg-${item.color}-50 hover:text-${item.color}-700 transition-all`}
            >
              <item.icon className="w-3.5 h-3.5" />
              {item.label}
            </button>
          ))}
        </div>
        <div className="text-xs text-slate-400">
          Filter: {sectorFilter === 'alle' ? 'Alle sectoren' : sectoren.find(s => s.id === sectorFilter)?.naam}
        </div>
      </div>
    </div>
  )
}
