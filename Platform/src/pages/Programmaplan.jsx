/**
 * Programmaplan Pagina - Levend Document
 *
 * Het Programmaplan is het LEVENDE document dat mee verandert met het programma.
 * Data komt uit de stores (dynamisch) waar mogelijk, en uit data files (statisch) waar nodig.
 *
 * DYNAMISCHE SECTIES (uit stores):
 * - Sector doelen (berekend uit actuele baten)
 * - Baten overzicht (uit appStore)
 * - Inspanningen overzicht (uit appStore)
 * - Huidige positie (uit methodologieStore)
 *
 * STATISCHE SECTIES (uit data files):
 * - Programma identiteit
 * - Programma vs Lijn checklist
 * - Valkuilen
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Target,
  Users,
  GitBranch,
  Database,
  Heart,
  CheckCircle,
  Circle,
  Lightbulb,
  Eye,
  ChevronRight,
  ArrowRight,
  AlertTriangle,
  Building,
  Briefcase,
  Zap,
  Layers,
  Flag,
  TrendingUp,
  Award,
  Calendar,
  FileText,
  Clock,
  BookOpen
} from 'lucide-react'
import { useAppStore } from '../stores/appStore'
import { useMethodologieStore } from '../stores/methodologieStore'
import {
  programmaInfo,
  sectoren,
  domeinen,
  batenDomeinenMatrix as batenDomeinenMatrixData,
  programmaLijnChecklist as programmaLijnChecklistData
} from '../data/programmaData'
import { levensloopcycli } from '../data/methodologie'

function Programmaplan() {
  const [selectedBaat, setSelectedBaat] = useState(null)

  // DYNAMISCHE DATA uit stores
  const { baten, inspanningen } = useAppStore()
  const { voortgang, getCyclusVoortgang, getTotaleVoortgang } = useMethodologieStore()

  // Berekeningen uit dynamische data
  const totaalVoortgang = getTotaleVoortgang()
  const cyclusVoortgang = getCyclusVoortgang(voortgang.huidigeCyclus)

  // Sector statistieken berekend uit actuele baten
  const sectorStats = sectoren.map(sector => {
    const sectorBaten = baten.filter(b => b.sector === sector.naam)
    const gemNPS = sectorBaten.length > 0
      ? Math.round(sectorBaten.reduce((sum, b) => sum + (b.huidigeWaarde || 0), 0) / sectorBaten.length)
      : 0
    const doelNPS = sectorBaten.length > 0
      ? Math.round(sectorBaten.reduce((sum, b) => sum + (b.doelWaarde || 0), 0) / sectorBaten.length)
      : 0
    return {
      ...sector,
      aantalBaten: sectorBaten.length,
      gemNPS,
      doelNPS
    }
  })

  // Inspanningen per type tellen
  const inspanningenPerType = {
    project: inspanningen.filter(i => i.type === 'project').length,
    leer: inspanningen.filter(i => i.type === 'leer').length,
    proces: inspanningen.filter(i => i.type === 'proces').length,
    systeem: inspanningen.filter(i => i.type === 'systeem').length
  }

  // Huidige cyclus info
  const huidigeCyclusInfo = levensloopcycli.find(c => c.id === voortgang.huidigeCyclus)

  const impactKleur = (impact) => {
    switch (impact) {
      case 'hoog': return 'bg-red-500 text-white'
      case 'midden': return 'bg-amber-400 text-amber-900'
      case 'laag': return 'bg-green-200 text-green-800'
      default: return 'bg-slate-100 text-slate-500'
    }
  }

  const statusKleur = (status) => {
    switch (status) {
      case 'actief': return 'bg-green-100 text-green-700'
      case 'gepland': return 'bg-blue-100 text-blue-700'
      case 'afgerond': return 'bg-slate-100 text-slate-600'
      default: return 'bg-slate-100 text-slate-500'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#003366] to-[#0066cc] rounded-xl p-6 text-white">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="w-5 h-5" />
          <span className="text-white/80 text-sm">Programmaplan</span>
          <span className="ml-auto text-xs bg-white/20 px-2 py-1 rounded-full">Levend Document</span>
        </div>
        <h1 className="text-2xl font-bold">{programmaInfo.naam}</h1>
        <p className="text-white/80 mt-2 max-w-3xl">
          {programmaInfo.visie}
        </p>
        <div className="flex items-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-white/60" />
            <span>{programmaInfo.organisatie}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-white/60" />
            <span>Start: {programmaInfo.startDatum}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-white/60" />
            <span>{programmaInfo.geplandeDuur}</span>
          </div>
        </div>
      </div>

      {/* 1. Huidige Positie (DYNAMISCH) */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-[#ff6600] rounded-lg">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-800">1. Huidige Positie</h2>
            <p className="text-sm text-slate-500">Waar staan we nu in het programma?</p>
          </div>
          <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Live data</span>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {/* Huidige Cyclus */}
          <div className="p-4 rounded-xl border-2" style={{ borderColor: huidigeCyclusInfo?.kleur || '#003366', backgroundColor: `${huidigeCyclusInfo?.kleur}10` }}>
            <div className="text-xs text-slate-500 mb-1">Huidige Cyclus</div>
            <div className="text-xl font-bold capitalize" style={{ color: huidigeCyclusInfo?.kleur }}>
              {voortgang.huidigeCyclus}
            </div>
            <div className="text-xs text-slate-600 mt-1">{huidigeCyclusInfo?.beschrijving}</div>
          </div>

          {/* Huidige Week */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-xs text-slate-500 mb-1">Huidige Week</div>
            <div className="text-xl font-bold text-slate-800">Week {voortgang.huidigeWeek}</div>
            <div className="text-xs text-slate-600 mt-1">van 16 weken totaal</div>
          </div>

          {/* Cyclus Voortgang */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-xs text-slate-500 mb-1">Cyclus Voortgang</div>
            <div className="text-xl font-bold text-slate-800">{cyclusVoortgang.percentage}%</div>
            <div className="h-2 bg-slate-200 rounded-full mt-2">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${cyclusVoortgang.percentage}%`, backgroundColor: huidigeCyclusInfo?.kleur }}
              />
            </div>
          </div>

          {/* Totale Voortgang */}
          <div className="p-4 bg-gradient-to-br from-[#003366] to-[#004488] rounded-xl text-white">
            <div className="text-xs text-white/70 mb-1">Totale Voortgang</div>
            <div className="text-xl font-bold">{totaalVoortgang.percentage}%</div>
            <div className="text-xs text-white/70 mt-1">{totaalVoortgang.completed}/{totaalVoortgang.total} activiteiten</div>
          </div>
        </div>

        {/* Laatste Go/No-Go */}
        {voortgang.besluiten.length > 0 && (
          <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-800">
                Laatste Go/No-Go: {voortgang.besluiten[voortgang.besluiten.length - 1]?.cyclus} naar {voortgang.besluiten[voortgang.besluiten.length - 1]?.nieuweCyclus}
                <span className="text-green-600 ml-2">({voortgang.besluiten[voortgang.besluiten.length - 1]?.datum})</span>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 2. Sector Doelen (DYNAMISCH) */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-[#003366] rounded-lg">
            <Eye className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-800">2. Ambitie per Sector</h2>
            <p className="text-sm text-slate-500">Berekend uit actuele baten per sector</p>
          </div>
          <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Live data</span>
        </div>

        {/* Ambitie */}
        <div className="bg-gradient-to-r from-[#003366]/10 to-[#0066cc]/10 rounded-xl p-4 mb-6 border-l-4 border-[#003366]">
          <div className="text-xs font-semibold text-[#003366] uppercase tracking-wide mb-1">Methodiek</div>
          <p className="text-slate-800 font-medium">{programmaInfo.methodiek}</p>
        </div>

        {/* Sector kaarten */}
        <div className="grid grid-cols-3 gap-4">
          {sectorStats.map(sector => (
            <div key={sector.id} className="rounded-xl p-4 border-2" style={{ borderColor: sector.kleur, backgroundColor: `${sector.kleur}08` }}>
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-slate-800">{sector.naam}</span>
                <span className="text-xs text-white px-2 py-0.5 rounded" style={{ backgroundColor: sector.kleur }}>{sector.afkorting}</span>
              </div>
              <div className="flex items-end gap-2 mb-3">
                <div>
                  <div className="text-xs text-slate-500">Gem. NPS nu</div>
                  <div className="text-xl font-bold text-slate-600">+{sector.gemNPS}</div>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 mb-1" />
                <div>
                  <div className="text-xs text-slate-500">Gem. doel</div>
                  <div className="text-xl font-bold" style={{ color: sector.kleur }}>+{sector.doelNPS}</div>
                </div>
              </div>
              <div className="text-xs text-slate-600">
                <span className="font-medium">{sector.aantalBaten}</span> baten gedefinieerd
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Doelen-Inspanningennetwerk (DYNAMISCH tellingen) */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-600 rounded-lg">
            <GitBranch className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-800">3. Doelen-Inspanningennetwerk</h2>
            <p className="text-sm text-slate-500">De keten van visie naar concrete inspanningen</p>
          </div>
          <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Live tellingen</span>
        </div>

        {/* Flow diagram met dynamische tellingen */}
        <div className="flex items-center justify-between mb-6">
          {[
            { label: 'VISIE', sub: 'Outside-in werken', icon: Eye, kleur: '#003366', detail: 'Klantgericht Cito' },
            { label: 'DOELEN', sub: 'Per sector', icon: Target, kleur: '#10b981', detail: `${sectoren.length} sectoren` },
            { label: 'BATEN', sub: 'Meetbare effecten', icon: TrendingUp, kleur: '#8b5cf6', detail: `${baten.length} baten` },
            { label: 'VERMOGENS', sub: 'Wat we moeten kunnen', icon: Zap, kleur: '#f59e0b', detail: `${domeinen.length} domeinen` },
            { label: 'INSPANNINGEN', sub: 'Projecten & trajecten', icon: Briefcase, kleur: '#ec4899', detail: `${inspanningen.length} actief` }
          ].map((stap, i) => {
            const Icon = stap.icon
            return (
              <div key={stap.label} className="flex items-center">
                <div className="text-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2 border-4 transition-transform hover:scale-110"
                    style={{ borderColor: stap.kleur, backgroundColor: `${stap.kleur}15` }}
                  >
                    <Icon className="w-7 h-7" style={{ color: stap.kleur }} />
                  </div>
                  <div className="font-bold text-slate-800 text-xs">{stap.label}</div>
                  <div className="text-[10px] text-slate-500">{stap.sub}</div>
                  <div className="text-[10px] font-medium mt-1" style={{ color: stap.kleur }}>{stap.detail}</div>
                </div>
                {i < 4 && <ChevronRight className="w-6 h-6 text-slate-300 mx-2" />}
              </div>
            )
          })}
        </div>
      </div>

      {/* 4. Baten Overzicht (DYNAMISCH) */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-600 rounded-lg">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-800">4. Baten Overzicht</h2>
            <p className="text-sm text-slate-500">Actuele baten uit het programma</p>
          </div>
          <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Live data</span>
          <Link to="/baten" className="text-sm text-[#003366] hover:underline flex items-center gap-1">
            Alle baten <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {baten.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 font-semibold text-slate-700 border-b">Baat</th>
                  <th className="text-left p-3 font-semibold text-slate-700 border-b">Sector</th>
                  <th className="text-left p-3 font-semibold text-slate-700 border-b">Indicator</th>
                  <th className="text-center p-3 font-semibold text-slate-700 border-b">Huidig</th>
                  <th className="text-center p-3 font-semibold text-slate-700 border-b">Doel</th>
                  <th className="text-center p-3 font-semibold text-slate-700 border-b">Status</th>
                </tr>
              </thead>
              <tbody>
                {baten.slice(0, 6).map((baat, i) => {
                  const sector = sectoren.find(s => s.naam === baat.sector)
                  return (
                    <tr key={baat.id || i} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="p-3 font-medium text-slate-800">{baat.naam}</td>
                      <td className="p-3">
                        <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: `${sector?.kleur}20`, color: sector?.kleur }}>
                          {baat.sector}
                        </span>
                      </td>
                      <td className="p-3 text-slate-600">{baat.indicator}</td>
                      <td className="p-3 text-center font-medium text-slate-600">+{baat.huidigeWaarde}</td>
                      <td className="p-3 text-center font-medium text-green-600">+{baat.doelWaarde}</td>
                      <td className="p-3 text-center">
                        <span className={`text-xs px-2 py-1 rounded ${statusKleur(baat.status)}`}>
                          {baat.status}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500">
            <Target className="w-8 h-8 mx-auto mb-2 text-slate-300" />
            <p>Nog geen baten gedefinieerd</p>
            <Link to="/baten" className="text-[#003366] hover:underline text-sm mt-2 inline-block">
              Voeg baten toe
            </Link>
          </div>
        )}
      </div>

      {/* 5. Inspanningen Overzicht (DYNAMISCH) */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-pink-600 rounded-lg">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-800">5. Inspanningen Overzicht</h2>
            <p className="text-sm text-slate-500">Verdeling per type inspanning</p>
          </div>
          <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Live data</span>
          <Link to="/inspanningen" className="text-sm text-[#003366] hover:underline flex items-center gap-1">
            Alle inspanningen <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { type: 'project', label: 'Projecten', icon: Briefcase, kleur: '#3b82f6', count: inspanningenPerType.project },
            { type: 'leer', label: 'Leertrajecten', icon: BookOpen, kleur: '#10b981', count: inspanningenPerType.leer },
            { type: 'proces', label: 'Procesverbeteringen', icon: GitBranch, kleur: '#8b5cf6', count: inspanningenPerType.proces },
            { type: 'systeem', label: 'Systeemtrajecten', icon: Database, kleur: '#f59e0b', count: inspanningenPerType.systeem }
          ].map(item => {
            const Icon = item.icon
            return (
              <div key={item.type} className="p-4 rounded-xl border-2" style={{ borderColor: item.kleur, backgroundColor: `${item.kleur}08` }}>
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-5 h-5" style={{ color: item.kleur }} />
                  <span className="text-sm font-medium text-slate-700">{item.label}</span>
                </div>
                <div className="text-3xl font-bold" style={{ color: item.kleur }}>{item.count}</div>
              </div>
            )
          })}
        </div>

        <div className="text-center p-4 bg-slate-50 rounded-lg">
          <span className="text-2xl font-bold text-slate-800">{inspanningen.length}</span>
          <span className="text-slate-600 ml-2">totale inspanningen</span>
        </div>
      </div>

      {/* 6. Baten x Domeinen Canvas (STATISCH) */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-indigo-600 rounded-lg">
            <Layers className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-800">6. Baten x Domeinen Canvas</h2>
            <p className="text-sm text-slate-500">Welke domeinen moeten "aan" voor welke baat? (H = Hoog, M = Midden, L = Laag)</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left p-3 font-semibold text-slate-700 border-b border-slate-200">Baat</th>
                <th className="text-center p-3 font-semibold text-slate-700 border-b border-slate-200">Indicator</th>
                <th className="text-center p-3 font-semibold border-b border-slate-200" style={{ color: '#3b82f6' }}>
                  <div className="flex flex-col items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>Mens</span>
                  </div>
                </th>
                <th className="text-center p-3 font-semibold border-b border-slate-200" style={{ color: '#10b981' }}>
                  <div className="flex flex-col items-center gap-1">
                    <GitBranch className="w-4 h-4" />
                    <span>Proces</span>
                  </div>
                </th>
                <th className="text-center p-3 font-semibold border-b border-slate-200" style={{ color: '#8b5cf6' }}>
                  <div className="flex flex-col items-center gap-1">
                    <Database className="w-4 h-4" />
                    <span>Systeem</span>
                  </div>
                </th>
                <th className="text-center p-3 font-semibold border-b border-slate-200" style={{ color: '#f59e0b' }}>
                  <div className="flex flex-col items-center gap-1">
                    <Heart className="w-4 h-4" />
                    <span>Cultuur</span>
                  </div>
                </th>
                <th className="text-left p-3 font-semibold text-slate-700 border-b border-slate-200">Eigenaar</th>
              </tr>
            </thead>
            <tbody>
              {batenDomeinenMatrixData.map((row, i) => (
                <tr
                  key={i}
                  className={`border-b border-slate-100 cursor-pointer transition-colors ${
                    selectedBaat === i ? 'bg-blue-50' : 'hover:bg-slate-50'
                  }`}
                  onClick={() => setSelectedBaat(selectedBaat === i ? null : i)}
                >
                  <td className="p-3 font-medium text-slate-800">{row.baat}</td>
                  <td className="p-3 text-center text-slate-600">{row.indicator}</td>
                  <td className="p-3 text-center">
                    <span className={`inline-flex w-8 h-8 items-center justify-center rounded font-bold text-xs ${impactKleur(row.domeinen.mens.impact)}`}>
                      {row.domeinen.mens.impact.charAt(0).toUpperCase()}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <span className={`inline-flex w-8 h-8 items-center justify-center rounded font-bold text-xs ${impactKleur(row.domeinen.proces.impact)}`}>
                      {row.domeinen.proces.impact.charAt(0).toUpperCase()}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <span className={`inline-flex w-8 h-8 items-center justify-center rounded font-bold text-xs ${impactKleur(row.domeinen.systeem.impact)}`}>
                      {row.domeinen.systeem.impact.charAt(0).toUpperCase()}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <span className={`inline-flex w-8 h-8 items-center justify-center rounded font-bold text-xs ${impactKleur(row.domeinen.cultuur.impact)}`}>
                      {row.domeinen.cultuur.impact.charAt(0).toUpperCase()}
                    </span>
                  </td>
                  <td className="p-3 text-slate-600 text-xs">{row.eigenaar}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detail view */}
        {selectedBaat !== null && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-3">
              Detail: {batenDomeinenMatrixData[selectedBaat].baat}
            </h4>
            <div className="grid grid-cols-4 gap-4">
              {['mens', 'proces', 'systeem', 'cultuur'].map(domein => {
                const data = batenDomeinenMatrixData[selectedBaat].domeinen[domein]
                const domeinInfo = domeinen.find(d => d.id === domein)
                return (
                  <div
                    key={domein}
                    className="p-3 bg-white rounded-lg"
                    style={{ borderLeft: `4px solid ${domeinInfo?.kleur}` }}
                  >
                    <div className="font-medium text-slate-800 text-sm mb-1">{domeinInfo?.naam}</div>
                    <div className={`inline-block px-2 py-0.5 rounded text-xs font-medium mb-2 ${impactKleur(data?.impact)}`}>
                      Impact: {data?.impact}
                    </div>
                    <p className="text-xs text-slate-600">{data?.toelichting}</p>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* 7. Programma vs Lijn (STATISCH) */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-slate-700 rounded-lg">
            <Building className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-800">7. Programma vs. Lijn</h2>
            <p className="text-sm text-slate-500">Het programma ONTWIKKELT, de lijn VOERT UIT en BORGT</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Programma */}
          <div className="p-5 bg-[#003366]/5 rounded-xl border-2 border-[#003366]">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-[#003366] rounded-lg">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-[#003366]">PROGRAMMA</h3>
                <p className="text-xs text-slate-500">Tijdelijk, ontwikkelend</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#003366]" />
                <span>Ontwerpen van nieuwe werkwijzen</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#003366]" />
                <span>Ontwikkelen van tools en methoden</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#003366]" />
                <span>Piloteren in sectoren</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#003366]" />
                <span>Faciliteren van verandering</span>
              </li>
            </ul>
          </div>

          {/* Lijn */}
          <div className="p-5 bg-green-50 rounded-xl border-2 border-green-500">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-500 rounded-lg">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-green-700">LIJN</h3>
                <p className="text-xs text-slate-500">Permanent, uitvoerend</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Uitvoeren van werkwijzen</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Toepassen van tools</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Borgen en onderhouden</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Continu verbeteren</span>
              </li>
            </ul>
          </div>
        </div>

        {/* De gouden regel */}
        <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-5 h-5 text-amber-600" />
            <span className="font-semibold text-amber-800">De gouden regel</span>
          </div>
          <p className="text-amber-800">
            "Is dit iets <strong>NIEUWS</strong> dat ontwikkeld moet worden?" → <strong>JA = Programma</strong>, <strong>NEE = Lijn</strong>
          </p>
        </div>

        {/* Checklist */}
        <div>
          <h4 className="font-semibold text-slate-700 mb-3">Checklist: Programma of Lijn?</h4>
          <div className="space-y-2">
            {programmaLijnChecklistData.map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
                <span className="flex-1 text-sm text-slate-700">{item.vraag}</span>
                <span className={`px-3 py-1 rounded text-xs font-medium ${
                  item.programma ? 'bg-[#003366] text-white' : 'bg-slate-200 text-slate-500'
                }`}>
                  {item.programma ? 'Programma' : ''}
                </span>
                <span className={`px-3 py-1 rounded text-xs font-medium ${
                  item.lijn ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-500'
                }`}>
                  {item.lijn ? 'Lijn' : ''}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 8. Valkuilen (STATISCH) */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-red-100 rounded-lg">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h2 className="font-semibold text-red-900 mb-3">8. Valkuilen om te voorkomen</h2>
            <div className="grid grid-cols-2 gap-4 text-sm text-red-800">
              <div>
                <p className="font-medium mb-1">"Dat is van het programma"</p>
                <p className="text-red-700">Voorkom dat het programma een excuus wordt. Eigenaarschap blijft bij de lijn.</p>
              </div>
              <div>
                <p className="font-medium mb-1">Baten zonder eigenaar</p>
                <p className="text-red-700">Elke baat heeft EEN eigenaar. Niet "iedereen" of "het MT".</p>
              </div>
              <div>
                <p className="font-medium mb-1">Inspanningen als doel</p>
                <p className="text-red-700">We meten niet hoeveel workshops, maar wat het effect is.</p>
              </div>
              <div>
                <p className="font-medium mb-1">Abstracte domeinen</p>
                <p className="text-red-700">Maak concreet: niet "Cultuur verbeteren" maar "Proactief contact opnemen".</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 9. Call to Action */}
      <div className="bg-gradient-to-r from-[#003366] to-[#0066cc] rounded-xl p-6 text-white">
        <h2 className="text-lg font-semibold mb-2">Aan de slag!</h2>
        <p className="text-white/80 mb-4">
          Dit programmaplan is een levend document. Wijzigingen in baten en inspanningen worden automatisch gereflecteerd.
        </p>
        <div className="flex gap-3">
          <Link
            to="/baten"
            className="flex items-center gap-2 bg-white text-[#003366] px-4 py-2 rounded-lg font-medium hover:bg-white/90 transition-colors"
          >
            <Target className="w-4 h-4" />
            Beheer Baten
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/inspanningen"
            className="flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-lg font-medium hover:bg-white/30 transition-colors"
          >
            <Briefcase className="w-4 h-4" />
            Beheer Inspanningen
          </Link>
          <Link
            to="/methodologie"
            className="flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-lg font-medium hover:bg-white/30 transition-colors"
          >
            <Calendar className="w-4 h-4" />
            Naar Werkdocument
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Programmaplan
