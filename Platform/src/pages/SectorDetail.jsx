/**
 * Sector Detail Pagina - Werkdocument voor Programmamanager
 *
 * Toont per sector:
 * - Huidige status en voortgang
 * - Alle werkfases met deliverables en verantwoordelijken
 * - Gekoppelde tools uit de toolkit
 * - Checklist van wat gedaan moet worden
 * - Klantreizen overzicht
 */

import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  sectoren,
  werkfases,
  toolkit,
  domeinen
} from '../data/programmaData'
import { useAppStore } from '../stores/appStore'
import {
  ArrowLeft,
  CheckCircle,
  Circle,
  Clock,
  User,
  FileText,
  Wrench,
  ChevronRight,
  Target,
  AlertCircle,
  CheckSquare,
  Square,
  ArrowRight,
  ExternalLink,
  TrendingUp,
  Briefcase,
  Activity,
  Eye,
  Zap,
  Link2,
  Plus
} from 'lucide-react'
import { useState, useMemo } from 'react'

function SectorDetail() {
  const { sectorId } = useParams()
  const navigate = useNavigate()
  const sector = sectoren.find(s => s.id === sectorId)
  const { baten, inspanningen, vermogens, strategischeDoelen } = useAppStore()

  // State voor checklist items (in productie zou dit uit database komen)
  const [completedItems, setCompletedItems] = useState({})

  // Bereken DIN Keten data voor deze sector
  const sectorDINData = useMemo(() => {
    if (!sector) return null

    // Filter baten voor deze sector
    const sectorBaten = baten.filter(b => b.sector === sector.naam)
    const sectorBaatIds = sectorBaten.map(b => b.id)

    // Vind doelen gekoppeld aan baten van deze sector
    const sectorDoelen = strategischeDoelen.filter(doel =>
      sectorBaten.some(baat => baat.gekoppeldDoel === doel.id)
    )

    // Vind vermogens gekoppeld aan baten van deze sector
    const sectorVermogens = vermogens.filter(vermogen =>
      vermogen.gekoppeldeBaten?.some(baatId =>
        sectorBaatIds.includes(baatId)
      )
    )
    const sectorVermogenIds = sectorVermogens.map(v => v.id)

    // Vind inspanningen gekoppeld aan vermogens van deze sector
    const sectorInspanningen = inspanningen.filter(insp =>
      sectorVermogens.some(v =>
        v.gekoppeldeInspanningen?.includes(insp.id)
      )
    )

    // Bereken statistieken
    const stats = {
      doelen: {
        total: sectorDoelen.length,
        zonderBaat: sectorDoelen.filter(d =>
          !sectorBaten.some(b => b.gekoppeldDoel === d.id)
        ).length
      },
      baten: {
        total: sectorBaten.length,
        zonderVermogen: sectorBaten.filter(b =>
          !sectorVermogens.some(v => v.gekoppeldeBaten?.includes(b.id))
        ).length,
        completed: sectorBaten.filter(b => b.status === 'completed').length,
        inProgress: sectorBaten.filter(b => b.status === 'in_progress').length
      },
      vermogens: {
        total: sectorVermogens.length,
        zonderInspanning: sectorVermogens.filter(v =>
          !v.gekoppeldeInspanningen || v.gekoppeldeInspanningen.length === 0
        ).length
      },
      inspanningen: {
        total: sectorInspanningen.length,
        completed: sectorInspanningen.filter(i => i.status === 'completed').length,
        inProgress: sectorInspanningen.filter(i => i.status === 'in_progress').length
      }
    }

    // Bereken keten completeness
    const ketenComplete = sectorBaten.filter(baat => {
      const heeftVermogen = sectorVermogens.some(v => v.gekoppeldeBaten?.includes(baat.id))
      if (!heeftVermogen) return false
      const gekoppeldeVermogens = sectorVermogens.filter(v => v.gekoppeldeBaten?.includes(baat.id))
      return gekoppeldeVermogens.some(v => v.gekoppeldeInspanningen?.length > 0)
    }).length

    return {
      doelen: sectorDoelen,
      baten: sectorBaten,
      vermogens: sectorVermogens,
      inspanningen: sectorInspanningen,
      stats,
      ketenComplete,
      ketenPercentage: sectorBaten.length > 0
        ? Math.round((ketenComplete / sectorBaten.length) * 100)
        : 0
    }
  }, [sector, baten, vermogens, inspanningen, strategischeDoelen])

  // Legacy compatibility
  const sectorBaten = sectorDINData?.baten || []
  const sectorInspanningen = sectorDINData?.inspanningen || []

  // Bereken sector NPS metrics
  const gemNPS = sectorBaten.length > 0
    ? Math.round(sectorBaten.reduce((sum, b) => sum + (b.huidigeWaarde || 0), 0) / sectorBaten.length)
    : 0
  const doelNPS = sectorBaten.length > 0
    ? Math.round(sectorBaten.reduce((sum, b) => sum + (b.doelWaarde || 0), 0) / sectorBaten.length)
    : 0

  const toggleItem = (key) => {
    setCompletedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  if (!sector) {
    return (
      <div className="p-8 text-center">
        <p className="text-slate-500">Sector niet gevonden</p>
        <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
          Terug naar overzicht
        </Link>
      </div>
    )
  }

  // Get tools for this sector's current phase
  const getToolsVoorWerkfase = (werkfaseId) => {
    return toolkit.filter(t => t.werkfase === werkfaseId)
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          to="/"
          className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-xl"
          style={{ backgroundColor: sector.kleur }}
        >
          {sector.afkorting}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{sector.naam}</h1>
          <p className="text-slate-500">{sector.beschrijving}</p>
        </div>
        <div className="ml-auto text-right">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500">Huidige fase:</span>
            <span
              className="px-3 py-1 rounded-full text-white text-sm font-medium"
              style={{ backgroundColor: sector.kleur }}
            >
              Fase {sector.huidigeWerkfase}: {werkfases.find(f => f.id === sector.huidigeWerkfase)?.naam}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">{sector.werkfaseStatus}</p>
        </div>
      </div>

      {/* DIN Keten Overzicht voor deze sector */}
      <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl border-2 border-blue-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: sector.kleur }}>
              <Link2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-slate-800">DIN Keten - {sector.afkorting}</h2>
              <p className="text-xs text-slate-500">Doelen → Baten → Vermogens → Inspanningen</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-2xl font-bold" style={{ color: sector.kleur }}>{sectorDINData?.ketenPercentage || 0}%</div>
              <div className="text-xs text-slate-500">keten compleet</div>
            </div>
            <button
              onClick={() => navigate('/din-keten')}
              className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Volledig overzicht
            </button>
          </div>
        </div>

        {/* DIN Keten Flow */}
        <div className="grid grid-cols-9 gap-2 items-center">
          {/* Doelen */}
          <div className="col-span-2 bg-white rounded-xl p-3 border border-teal-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-teal-500 rounded-lg">
                <Eye className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-medium text-slate-600">Doelen</span>
            </div>
            <div className="text-2xl font-bold text-slate-800">{sectorDINData?.stats.doelen.total || 0}</div>
            <div className="text-xs text-slate-400">gekoppeld aan {sector.afkorting}</div>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="w-5 h-5 text-slate-300" />
          </div>

          {/* Baten */}
          <div className="col-span-2 bg-white rounded-xl p-3 border border-amber-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-amber-500 rounded-lg">
                <Target className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-medium text-slate-600">Baten</span>
            </div>
            <div className="text-2xl font-bold text-slate-800">{sectorDINData?.stats.baten.total || 0}</div>
            {sectorDINData?.stats.baten.zonderVermogen > 0 && (
              <div className="text-xs text-amber-600">{sectorDINData.stats.baten.zonderVermogen} wacht op vermogen</div>
            )}
            {sectorDINData?.stats.baten.zonderVermogen === 0 && (
              <div className="text-xs text-slate-400">allen gekoppeld</div>
            )}
          </div>

          <div className="flex justify-center">
            <ArrowRight className="w-5 h-5 text-slate-300" />
          </div>

          {/* Vermogens */}
          <div className="col-span-2 bg-white rounded-xl p-3 border border-violet-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-violet-500 rounded-lg">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-medium text-slate-600">Vermogens</span>
            </div>
            <div className="text-2xl font-bold text-slate-800">{sectorDINData?.stats.vermogens.total || 0}</div>
            {sectorDINData?.stats.vermogens.zonderInspanning > 0 && (
              <div className="text-xs text-violet-600">{sectorDINData.stats.vermogens.zonderInspanning} wacht op inspanning</div>
            )}
            {sectorDINData?.stats.vermogens.zonderInspanning === 0 && sectorDINData?.stats.vermogens.total > 0 && (
              <div className="text-xs text-slate-400">allen gekoppeld</div>
            )}
          </div>

          <div className="flex justify-center">
            <ArrowRight className="w-5 h-5 text-slate-300" />
          </div>

          {/* Inspanningen */}
          <div className="bg-white rounded-xl p-3 border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-blue-500 rounded-lg">
                <Briefcase className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-medium text-slate-600">Insp.</span>
            </div>
            <div className="text-2xl font-bold text-slate-800">{sectorDINData?.stats.inspanningen.total || 0}</div>
            <div className="text-xs text-slate-400">actief</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-200">
          <span className="text-xs text-slate-500 mr-2">Snel toevoegen:</span>
          <button
            onClick={() => navigate('/baten')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 text-amber-700 rounded-lg text-xs font-medium hover:bg-amber-200 transition-colors"
          >
            <Plus className="w-3 h-3" />
            Baat voor {sector.afkorting}
          </button>
          <button
            onClick={() => navigate('/vermogens')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-100 text-violet-700 rounded-lg text-xs font-medium hover:bg-violet-200 transition-colors"
          >
            <Plus className="w-3 h-3" />
            Vermogen
          </button>
          <button
            onClick={() => navigate('/inspanningen')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-200 transition-colors"
          >
            <Plus className="w-3 h-3" />
            Inspanning
          </button>
        </div>
      </div>

      {/* Voortgang Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="font-semibold text-slate-800 mb-4">Voortgang Werkfases</h2>
        <div className="flex gap-2 mb-4">
          {[1, 2, 3, 4].map((fase) => {
            const werkfase = werkfases.find(f => f.id === fase)
            const isCompleted = fase < sector.huidigeWerkfase
            const isCurrent = fase === sector.huidigeWerkfase
            const isFuture = fase > sector.huidigeWerkfase

            return (
              <div key={fase} className="flex-1">
                <div
                  className={`h-3 rounded-full mb-2 ${
                    isCompleted ? 'bg-green-500' : isCurrent ? '' : 'bg-slate-200'
                  }`}
                  style={{ backgroundColor: isCurrent ? sector.kleur : undefined }}
                />
                <div className="text-center">
                  <div className={`text-xs font-medium ${isCurrent ? 'text-slate-800' : 'text-slate-500'}`}>
                    {fase}. {werkfase?.naam}
                  </div>
                  {isCompleted && <span className="text-xs text-green-600">Afgerond</span>}
                  {isCurrent && <span className="text-xs" style={{ color: sector.kleur }}>Actief</span>}
                  {isFuture && <span className="text-xs text-slate-400">Gepland</span>}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Baateigenaar info */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-slate-100 rounded-lg">
            <User className="w-6 h-6 text-slate-600" />
          </div>
          <div className="flex-1">
            <div className="text-sm text-slate-500">Baateigenaar (Sectormanager)</div>
            <div className="font-semibold text-slate-800">{sector.baateigenaar.naam}</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-500">Klantreizen</div>
            <div className="font-semibold text-slate-800">{sector.klantreizen} stuks</div>
          </div>
        </div>
      </div>

      {/* Alle 4 werkfases met details */}
      <div className="space-y-4">
        <h2 className="font-semibold text-slate-800 text-lg">Werkfases - Wat moet er gedaan worden?</h2>

        {werkfases.map((fase) => {
          const isCompleted = fase.id < sector.huidigeWerkfase
          const isCurrent = fase.id === sector.huidigeWerkfase
          const faseTools = getToolsVoorWerkfase(fase.id)

          return (
            <div
              key={fase.id}
              className={`bg-white rounded-xl shadow-sm border-2 p-6 ${
                isCurrent
                  ? 'border-[#003366]'
                  : isCompleted
                  ? 'border-green-300 bg-green-50/50'
                  : 'border-slate-200 opacity-60'
              }`}
            >
              {/* Fase Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                      isCompleted ? 'bg-green-500' : isCurrent ? 'bg-[#003366]' : 'bg-slate-300'
                    }`}
                  >
                    {isCompleted ? <CheckCircle className="w-5 h-5" /> : fase.id}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">{fase.naam}</h3>
                    <p className="text-sm text-slate-500">{fase.beschrijving}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400 mb-1">Eindverantwoordelijk:</div>
                  <div className="px-3 py-1 bg-slate-100 rounded text-sm font-medium text-slate-700">
                    {fase.eindverantwoordelijke}
                  </div>
                </div>
              </div>

              {/* Fase Content (uitgebreid voor huidige fase) */}
              <div className={`space-y-4 ${!isCurrent && !isCompleted ? 'opacity-50' : ''}`}>
                {/* Toolkit voor deze fase */}
                {faseTools.length > 0 && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <Wrench className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-blue-800">Tools ({faseTools.length})</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {faseTools.map(tool => (
                        <div
                          key={tool.id}
                          className="flex items-center gap-3 p-3 bg-white rounded-lg border border-blue-200"
                        >
                          <div className="w-8 h-8 rounded bg-[#003366] text-white flex items-center justify-center text-sm font-bold">
                            {tool.nummer}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-sm text-slate-800">{tool.naam}</div>
                            <div className="text-xs text-slate-500">{tool.beschrijving}</div>
                          </div>
                          {tool.status === 'beschikbaar' && (
                            <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                              Beschikbaar
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Deliverables checklist */}
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="w-4 h-4 text-slate-600" />
                    <span className="font-medium text-slate-700">Deliverables</span>
                    <span className="text-xs text-slate-400">
                      ({fase.deliverables.filter((_, i) => completedItems[`${fase.id}-${i}`]).length}/{fase.deliverables.length} afgerond)
                    </span>
                  </div>
                  <div className="space-y-2">
                    {fase.deliverables.map((deliverable, i) => {
                      const key = `${fase.id}-${i}`
                      const isChecked = completedItems[key]
                      return (
                        <button
                          key={i}
                          onClick={() => toggleItem(key)}
                          className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all text-left ${
                            isChecked
                              ? 'bg-green-50 border-green-200'
                              : 'bg-white border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          {isChecked ? (
                            <CheckSquare className="w-5 h-5 text-green-600 shrink-0" />
                          ) : (
                            <Square className="w-5 h-5 text-slate-300 shrink-0" />
                          )}
                          <span className={`flex-1 ${isChecked ? 'text-slate-500 line-through' : 'text-slate-700'}`}>
                            {deliverable}
                          </span>
                          {isCurrent && !isChecked && (
                            <span className="text-xs text-amber-600 bg-amber-100 px-2 py-1 rounded">
                              Te doen
                            </span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Thema koppeling */}
                {fase.themas && fase.themas.length > 0 && (
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <span>Gekoppelde thema's:</span>
                    {fase.themas.map(t => (
                      <Link
                        key={t}
                        to={`/thema/${t}`}
                        className="px-2 py-1 bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors"
                      >
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Klantreizen overzicht */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="font-semibold text-slate-800 mb-4">Klantreizen ({sector.klantreizen})</h2>
        <p className="text-sm text-slate-500 mb-4">
          Per sector worden {sector.klantreizen} klantreizen uitgewerkt. Hieronder een overzicht van de status per klantreis.
        </p>
        <div className="space-y-3">
          {Array.from({ length: sector.klantreizen }, (_, i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                style={{ backgroundColor: sector.kleur }}
              >
                {i + 1}
              </div>
              <div className="flex-1">
                <div className="font-medium text-slate-700">Klantreis {i + 1}</div>
                <div className="text-xs text-slate-500">
                  {i < 2 ? 'AS-IS compleet, TO-BE in uitvoering' : i < 4 ? 'AS-IS in uitvoering' : 'Gepland'}
                </div>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4].map(f => (
                  <div
                    key={f}
                    className={`w-6 h-2 rounded ${
                      f < 3 && i < 2 ? 'bg-green-500' : f === 3 && i < 2 ? '' : f === 2 && i < 4 ? '' : 'bg-slate-200'
                    }`}
                    style={{
                      backgroundColor:
                        (f === 3 && i < 2) || (f === 2 && i >= 2 && i < 4) ? sector.kleur : undefined
                    }}
                    title={`Fase ${f}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strategische Doelen voor deze sector */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-500 rounded-lg">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-slate-800">Strategische Doelen</h2>
              <p className="text-xs text-slate-500">Doelen gekoppeld aan {sector.afkorting} baten</p>
            </div>
          </div>
          <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full">
            {sectorDINData?.doelen.length || 0} doelen
          </span>
        </div>
        {sectorDINData?.doelen.length > 0 ? (
          <div className="space-y-3">
            {sectorDINData.doelen.map(doel => {
              const gekoppeldeBaten = sectorBaten.filter(b => b.gekoppeldDoel === doel.id)
              return (
                <div
                  key={doel.id}
                  className="p-4 rounded-lg border-2 border-teal-200 bg-teal-50/30"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Eye className="w-5 h-5 mt-0.5 text-teal-600" />
                      <div>
                        <div className="font-medium text-slate-800">{doel.titel}</div>
                        {doel.beschrijving && (
                          <div className="text-xs text-slate-500 mt-1">{doel.beschrijving}</div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-teal-700">
                        {gekoppeldeBaten.length} {gekoppeldeBaten.length === 1 ? 'baat' : 'baten'}
                      </div>
                    </div>
                  </div>
                  {gekoppeldeBaten.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {gekoppeldeBaten.map(baat => (
                        <span
                          key={baat.id}
                          className="text-xs px-2 py-1 rounded bg-amber-100 text-amber-700"
                        >
                          {baat.naam}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-6 text-slate-500">
            <Eye className="w-8 h-8 mx-auto mb-2 text-slate-300" />
            <p className="text-sm">Nog geen doelen gekoppeld aan {sector.afkorting} baten</p>
            <p className="text-xs text-slate-400 mt-1">Koppel baten aan doelen via de Baten pagina</p>
          </div>
        )}
        <Link
          to="/visie-doelen"
          className="inline-flex items-center gap-2 mt-4 text-sm text-teal-600 hover:text-teal-800"
        >
          Beheer Visie & Doelen <ExternalLink className="w-4 h-4" />
        </Link>
      </div>

      {/* Vermogens voor deze sector */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-violet-500 rounded-lg">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-slate-800">Vermogens (Capabilities)</h2>
              <p className="text-xs text-slate-500">Gekoppeld aan {sector.afkorting} baten</p>
            </div>
          </div>
          <span className="text-xs bg-violet-100 text-violet-700 px-2 py-1 rounded-full">
            {sectorDINData?.vermogens.length || 0} vermogens
          </span>
        </div>
        {sectorDINData?.vermogens.length > 0 ? (
          <div className="space-y-3">
            {sectorDINData.vermogens.map(vermogen => {
              const gekoppeldeInspanningen = inspanningen.filter(i =>
                vermogen.gekoppeldeInspanningen?.includes(i.id)
              )
              const gekoppeldeBatenNamen = vermogen.gekoppeldeBaten?.map(baatId =>
                sectorBaten.find(b => b.id === baatId)?.naam
              ).filter(Boolean) || []

              return (
                <div
                  key={vermogen.id}
                  className="p-4 rounded-lg border-2 border-violet-200 bg-violet-50/30"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Zap className="w-5 h-5 mt-0.5 text-violet-600" />
                      <div>
                        <div className="font-medium text-slate-800">{vermogen.naam}</div>
                        {vermogen.beschrijving && (
                          <div className="text-xs text-slate-500 mt-1 line-clamp-2">{vermogen.beschrijving}</div>
                        )}
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs px-2 py-0.5 rounded bg-violet-100 text-violet-700">
                            {vermogen.type}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                            {vermogen.domein}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-violet-700">
                        {gekoppeldeInspanningen.length} {gekoppeldeInspanningen.length === 1 ? 'inspanning' : 'inspanningen'}
                      </div>
                      {gekoppeldeBatenNamen.length > 0 && (
                        <div className="text-xs text-slate-500 mt-1">
                          Via: {gekoppeldeBatenNamen.slice(0, 2).join(', ')}
                          {gekoppeldeBatenNamen.length > 2 && ` +${gekoppeldeBatenNamen.length - 2}`}
                        </div>
                      )}
                    </div>
                  </div>
                  {gekoppeldeInspanningen.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {gekoppeldeInspanningen.map(insp => (
                        <span
                          key={insp.id}
                          className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700"
                        >
                          {insp.naam}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-6 text-slate-500">
            <Zap className="w-8 h-8 mx-auto mb-2 text-slate-300" />
            <p className="text-sm">Nog geen vermogens gekoppeld aan {sector.afkorting} baten</p>
            <p className="text-xs text-slate-400 mt-1">Koppel vermogens aan baten via de Vermogens pagina</p>
          </div>
        )}
        <Link
          to="/vermogens"
          className="inline-flex items-center gap-2 mt-4 text-sm text-violet-600 hover:text-violet-800"
        >
          Beheer Vermogens <ExternalLink className="w-4 h-4" />
        </Link>
      </div>

      {/* Sector Baten (LIVE DATA) */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500 rounded-lg">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-slate-800">Baten voor {sector.naam}</h2>
              <p className="text-xs text-slate-500">Meetbare resultaten</p>
            </div>
          </div>
          <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
            {sectorBaten.length} baten
          </span>
        </div>
        {sectorBaten.length > 0 ? (
          <div className="space-y-3">
            {sectorBaten.map(baat => {
              const gekoppeldeInsp = inspanningen.filter(i =>
                i.gekoppeldeBaten?.includes(String(baat.id))
              )
              return (
                <div
                  key={baat.id}
                  className="p-4 rounded-lg border-2"
                  style={{ borderColor: sector.kleur, backgroundColor: `${sector.kleur}08` }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Target className="w-5 h-5 mt-0.5" style={{ color: sector.kleur }} />
                      <div>
                        <div className="font-medium text-slate-800">{baat.naam}</div>
                        <div className="text-xs text-slate-500 mt-1">{baat.indicator}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-slate-600">
                        +{baat.huidigeWaarde} → <span className="text-green-600">+{baat.doelWaarde}</span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        {gekoppeldeInsp.length} inspanning{gekoppeldeInsp.length !== 1 ? 'en' : ''} gekoppeld
                      </div>
                    </div>
                  </div>
                  {gekoppeldeInsp.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {gekoppeldeInsp.map(insp => (
                        <span
                          key={insp.id}
                          className="text-xs px-2 py-1 rounded bg-slate-100 text-slate-600"
                        >
                          {insp.naam}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500">
            <Target className="w-10 h-10 mx-auto mb-2 text-slate-300" />
            <p>Nog geen baten voor {sector.naam}</p>
            <Link to="/baten" className="text-sm text-blue-600 hover:underline mt-2 inline-block">
              Baten toevoegen
            </Link>
          </div>
        )}
        <Link
          to="/baten"
          className="inline-flex items-center gap-2 mt-4 text-sm text-blue-600 hover:text-blue-800"
        >
          Beheer alle baten <ExternalLink className="w-4 h-4" />
        </Link>
      </div>

      {/* Acties en volgende stappen */}
      <div className="bg-gradient-to-r from-[#003366] to-[#0066cc] rounded-xl p-6 text-white">
        <h2 className="font-semibold mb-4">Volgende stappen</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm">1</div>
            <div>
              <div className="font-medium">Rondt fase {sector.huidigeWerkfase} af</div>
              <div className="text-sm text-white/70">
                Zorg dat alle deliverables van {werkfases.find(f => f.id === sector.huidigeWerkfase)?.naam} gereed zijn
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm">2</div>
            <div>
              <div className="font-medium">Plan Go/No-Go moment</div>
              <div className="text-sm text-white/70">
                Bespreek voortgang met {werkfases.find(f => f.id === sector.huidigeWerkfase)?.eindverantwoordelijke} en programmaraad
              </div>
            </div>
          </div>
          {sector.huidigeWerkfase < 4 && (
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm">3</div>
              <div>
                <div className="font-medium">Start fase {sector.huidigeWerkfase + 1}</div>
                <div className="text-sm text-white/70">
                  {werkfases.find(f => f.id === sector.huidigeWerkfase + 1)?.naam}: {werkfases.find(f => f.id === sector.huidigeWerkfase + 1)?.beschrijving}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SectorDetail
