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

import { useParams, Link } from 'react-router-dom'
import {
  sectoren,
  werkfases,
  toolkit,
  batenProfielen,
  batenStructuur,
  domeinen
} from '../data/programmaData'
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
  ExternalLink
} from 'lucide-react'
import { useState } from 'react'

function SectorDetail() {
  const { sectorId } = useParams()
  const sector = sectoren.find(s => s.id === sectorId)

  // State voor checklist items (in productie zou dit uit database komen)
  const [completedItems, setCompletedItems] = useState({})

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

  // Get baten for this sector
  const sectorBaten = batenStructuur // In productie zou je filteren op sector

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

      {/* Gerelateerde baten */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="font-semibold text-slate-800 mb-4">Te realiseren baten</h2>
        <div className="grid grid-cols-2 gap-4">
          {sectorBaten.slice(0, 4).map(baat => {
            const domein = domeinen.find(d => d.id === baat.domein)
            return (
              <div
                key={baat.id}
                className="p-4 rounded-lg border"
                style={{ borderColor: domein?.kleur, backgroundColor: `${domein?.kleur}10` }}
              >
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 mt-0.5" style={{ color: domein?.kleur }} />
                  <div className="flex-1">
                    <div className="font-medium text-slate-800">{baat.baat}</div>
                    <div className="text-xs text-slate-500 mt-1">
                      {baat.indicator}: {baat.nulmeting} → {baat.doel}
                    </div>
                    <div className="text-xs mt-2">
                      <span className="px-2 py-0.5 rounded" style={{ backgroundColor: domein?.kleur, color: 'white' }}>
                        {domein?.naam}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <Link
          to="/baten"
          className="inline-flex items-center gap-2 mt-4 text-sm text-blue-600 hover:text-blue-800"
        >
          Bekijk alle baten <ExternalLink className="w-4 h-4" />
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
                Bespreek voortgang met {fase.eindverantwoordelijke} en programmaraad
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
