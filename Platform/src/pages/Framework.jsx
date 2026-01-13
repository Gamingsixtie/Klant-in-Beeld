/**
 * Framework Pagina - Klant in Beeld
 *
 * Gebaseerd op:
 * - Methodologie "Werken aan Programma's" (Prevaas & Van Loon)
 * - Specifieke uitwerking voor Klant in Beeld
 *
 * Bevat:
 * - Baten × Domeinen Canvas
 * - 7 Kernprincipes
 * - Van Visie naar Inspanning flow
 * - Programma vs Lijn afbakening
 * - Batenprofiel template
 */

import { useState } from 'react'
import {
  Target,
  Users,
  GitBranch,
  Database,
  Heart,
  ArrowRight,
  CheckCircle,
  Circle,
  Lightbulb,
  Eye,
  ChevronRight,
  Info,
  AlertTriangle,
  Building,
  Briefcase,
  TrendingUp,
  Shield,
  Zap,
  RefreshCw,
  Layers,
  FileText,
  Calendar
} from 'lucide-react'
import {
  domeinen,
  kernprincipes as kernprincipesData,
  batenDomeinenMatrix as batenDomeinenMatrixData,
  programmaLijnChecklist as programmaLijnChecklistData,
  domeinDiagnose,
  batenProfielen
} from '../data/programmaData'

// Map icon strings to components
const iconMap = {
  Eye, Users, Layers, FileText, TrendingUp, Shield, Target
}

// Transform kernprincipes to use icon components
const kernprincipes = kernprincipesData.map(p => ({
  ...p,
  icon: iconMap[p.icon] || Target
}))

// Use centralized data
const batenDomeinenMatrix = batenDomeinenMatrixData
const programmaLijnChecklist = programmaLijnChecklistData

function Framework() {
  const [activePrincipe, setActivePrincipe] = useState(null)
  const [selectedBaat, setSelectedBaat] = useState(null)

  const impactKleur = (impact) => {
    switch (impact) {
      case 'hoog': return 'bg-red-500 text-white'
      case 'midden': return 'bg-amber-400 text-amber-900'
      case 'laag': return 'bg-green-200 text-green-800'
      default: return 'bg-slate-100 text-slate-500'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#003366] to-[#0066cc] rounded-xl p-6 text-white">
        <div className="flex items-center gap-2 mb-2">
          <Layers className="w-5 h-5" />
          <span className="text-white/80 text-sm">Framework</span>
        </div>
        <h1 className="text-2xl font-bold">Klant in Beeld - Programma Framework</h1>
        <p className="text-white/80 mt-2 max-w-3xl">
          Dit framework verbindt de methodologie "Werken aan Programma's" met de specifieke context van Klant in Beeld.
          Het toont hoe baten, domeinen en inspanningen samenhangen.
        </p>
      </div>

      {/* De Kernvraag */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-amber-100 rounded-lg">
            <Lightbulb className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h2 className="font-semibold text-amber-900 mb-2">De kernvraag: Baten-gedreven of Domein-gedreven?</h2>
            <div className="text-sm text-amber-800 space-y-2">
              <p>
                <strong>Antwoord: Hybride aanpak (de brug)</strong>
              </p>
              <ol className="list-decimal list-inside space-y-1 ml-2">
                <li><strong>Start bij sectormanagers</strong> - Open vraag: welke baten wil je realiseren?</li>
                <li><strong>Confronteer met diagnose</strong> - Check tegen de 4 domeinen (Mens, Proces, Systeem, Cultuur)</li>
                <li><strong>Maak verbinding expliciet</strong> - Welke domeinen moet je "aanzetten" voor welke baat?</li>
              </ol>
              <p className="italic mt-2">
                "De sectormanagers bepalen de BATEN, de domeinen zijn de KNOPPEN waaraan gedraaid moet worden."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 7 Kernprincipes */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">7 Kernprincipes</h2>
            <p className="text-sm text-slate-500">Uit "Werken aan Programma's" - toegepast op Klant in Beeld</p>
          </div>
          <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full">Methodologie</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kernprincipes.slice(0, 4).map((p) => {
            const Icon = p.icon
            return (
              <button
                key={p.id}
                onClick={() => setActivePrincipe(activePrincipe === p.id ? null : p.id)}
                className={`p-4 rounded-xl border-2 text-left transition-all hover:shadow-md ${
                  activePrincipe === p.id ? 'border-[#003366] bg-[#003366]/5' : 'border-slate-200'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: `${p.kleur}20` }}>
                    <Icon className="w-5 h-5" style={{ color: p.kleur }} />
                  </div>
                  <span className="text-xs text-slate-400">#{p.id}</span>
                </div>
                <h3 className="font-semibold text-slate-800 text-sm mb-1">{p.titel}</h3>
                <p className="text-xs text-slate-500">{p.beschrijving}</p>
                {activePrincipe === p.id && (
                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <div className="text-xs font-medium text-[#003366]">KiB toepassing:</div>
                    <p className="text-xs text-slate-600 mt-1">{p.kibToepassing}</p>
                  </div>
                )}
              </button>
            )
          })}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {kernprincipes.slice(4).map((p) => {
            const Icon = p.icon
            return (
              <button
                key={p.id}
                onClick={() => setActivePrincipe(activePrincipe === p.id ? null : p.id)}
                className={`p-4 rounded-xl border-2 text-left transition-all hover:shadow-md ${
                  activePrincipe === p.id ? 'border-[#003366] bg-[#003366]/5' : 'border-slate-200'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: `${p.kleur}20` }}>
                    <Icon className="w-5 h-5" style={{ color: p.kleur }} />
                  </div>
                  <span className="text-xs text-slate-400">#{p.id}</span>
                </div>
                <h3 className="font-semibold text-slate-800 text-sm mb-1">{p.titel}</h3>
                <p className="text-xs text-slate-500">{p.beschrijving}</p>
                {activePrincipe === p.id && (
                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <div className="text-xs font-medium text-[#003366]">KiB toepassing:</div>
                    <p className="text-xs text-slate-600 mt-1">{p.kibToepassing}</p>
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Van Visie naar Inspanning - Flow */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-6">Van Visie naar Inspanning</h2>

        <div className="flex items-center justify-between mb-8">
          {[
            { label: 'VISIE', sub: 'Outside-in werken', icon: Eye, kleur: '#003366' },
            { label: 'BATEN', sub: '6 meetbare effecten', icon: Target, kleur: '#10b981' },
            { label: 'DOMEINEN', sub: '4 verandergebieden', icon: Layers, kleur: '#8b5cf6' },
            { label: 'VERMOGENS', sub: 'Wat we moeten kunnen', icon: Zap, kleur: '#f59e0b' },
            { label: 'INSPANNINGEN', sub: 'Projecten & trajecten', icon: Briefcase, kleur: '#ec4899' }
          ].map((stap, i) => {
            const Icon = stap.icon
            return (
              <div key={stap.label} className="flex items-center">
                <div className="text-center">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-2 border-4"
                    style={{ borderColor: stap.kleur, backgroundColor: `${stap.kleur}15` }}
                  >
                    <Icon className="w-8 h-8" style={{ color: stap.kleur }} />
                  </div>
                  <div className="font-bold text-slate-800 text-sm">{stap.label}</div>
                  <div className="text-xs text-slate-500">{stap.sub}</div>
                </div>
                {i < 4 && <ChevronRight className="w-8 h-8 text-slate-300 mx-4" />}
              </div>
            )
          })}
        </div>

        {/* Toelichting */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-xs">
          <div className="p-3 bg-[#003366]/10 rounded-lg">
            <p className="text-slate-700">
              "Cito werkt vanuit outside-in perspectief, waarbij dienstverlening aansluit bij klantbehoeften"
            </p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="text-slate-700">
              Sectormanagers bepalen hun baten. Formulering: zelfstandig naamwoord + vergrotende trap
            </p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <p className="text-slate-700">
              Diagnose toont waar knelpunten zitten: Mens, Proces, Systeem, Cultuur
            </p>
          </div>
          <div className="p-3 bg-amber-50 rounded-lg">
            <p className="text-slate-700">
              Wat moet de organisatie KUNNEN om de baten te realiseren?
            </p>
          </div>
          <div className="p-3 bg-pink-50 rounded-lg">
            <p className="text-slate-700">
              Projecten, procesinspanningen, leertrajecten, systeemtrajecten
            </p>
          </div>
        </div>
      </div>

      {/* Baten × Domeinen Canvas */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Baten × Domeinen Canvas</h2>
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
              {batenDomeinenMatrix.map((row, i) => (
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
                    <span
                      className={`inline-flex w-8 h-8 items-center justify-center rounded font-bold text-xs ${impactKleur(row.domeinen.mens.impact)}`}
                      title={row.domeinen.mens.toelichting}
                    >
                      {row.domeinen.mens.impact.charAt(0).toUpperCase()}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <span
                      className={`inline-flex w-8 h-8 items-center justify-center rounded font-bold text-xs ${impactKleur(row.domeinen.proces.impact)}`}
                      title={row.domeinen.proces.toelichting}
                    >
                      {row.domeinen.proces.impact.charAt(0).toUpperCase()}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <span
                      className={`inline-flex w-8 h-8 items-center justify-center rounded font-bold text-xs ${impactKleur(row.domeinen.systeem.impact)}`}
                      title={row.domeinen.systeem.toelichting}
                    >
                      {row.domeinen.systeem.impact.charAt(0).toUpperCase()}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <span
                      className={`inline-flex w-8 h-8 items-center justify-center rounded font-bold text-xs ${impactKleur(row.domeinen.cultuur.impact)}`}
                      title={row.domeinen.cultuur.toelichting}
                    >
                      {row.domeinen.cultuur.impact.charAt(0).toUpperCase()}
                    </span>
                  </td>
                  <td className="p-3 text-slate-600 text-xs">{row.eigenaar}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detail view wanneer baat geselecteerd */}
        {selectedBaat !== null && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-3">
              Detail: {batenDomeinenMatrix[selectedBaat].baat}
            </h4>
            <div className="grid grid-cols-4 gap-4">
              {['mens', 'proces', 'systeem', 'cultuur'].map(domein => {
                const data = batenDomeinenMatrix[selectedBaat].domein[domein] || batenDomeinenMatrix[selectedBaat].domeinen[domein]
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

        {/* Legenda */}
        <div className="mt-4 flex gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-red-500 text-white flex items-center justify-center font-bold">H</span>
            <span className="text-slate-600">Hoog - Kritiek domein voor deze baat</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-amber-400 text-amber-900 flex items-center justify-center font-bold">M</span>
            <span className="text-slate-600">Midden - Belangrijk maar niet kritiek</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-green-200 text-green-800 flex items-center justify-center font-bold">L</span>
            <span className="text-slate-600">Laag - Ondersteunend</span>
          </div>
        </div>
      </div>

      {/* 4 Domeinen Diagnose */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">De 4 Domeinen - Diagnose</h2>
            <p className="text-sm text-slate-500">Uit klantreisanalyses kwamen structurele knelpunten per domein</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* MENS */}
          <div className="p-5 rounded-xl border-l-4 bg-blue-50" style={{ borderColor: '#3b82f6' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-white rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-800">MENS</h3>
            </div>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <span>Onvoldoende vaardig in outside-in denken</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <span>Geen structuur in verdiepend doorvragen</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <span>Moeite met vertalen klantdata naar keuzes</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <span>Rolonduidelijkheid, weinig oefenruimte</span>
              </li>
            </ul>
          </div>

          {/* PROCES */}
          <div className="p-5 rounded-xl border-l-4 bg-green-50" style={{ borderColor: '#10b981' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-white rounded-lg">
                <GitBranch className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-slate-800">PROCES</h3>
            </div>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <span>Geen uniform klantproces</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <span>Versnipperde vastlegging klantinzichten</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <span>Overdrachtsmomenten niet belegd</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <span>Geen borging eerdere initiatieven</span>
              </li>
            </ul>
          </div>

          {/* SYSTEEM */}
          <div className="p-5 rounded-xl border-l-4 bg-purple-50" style={{ borderColor: '#8b5cf6' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-white rounded-lg">
                <Database className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-slate-800">SYSTEEM</h3>
            </div>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <span>Klantinformatie verspreid over systemen</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <span>CRM sluit niet aan op werkwijze</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <span>Datakwaliteit onvoldoende</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <span>Geen integraal 360° klantbeeld</span>
              </li>
            </ul>
          </div>

          {/* CULTUUR */}
          <div className="p-5 rounded-xl border-l-4 bg-amber-50" style={{ borderColor: '#f59e0b' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-white rounded-lg">
                <Heart className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-semibold text-slate-800">CULTUUR</h3>
            </div>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <span>Productgerichte reflex dominant</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <span>Versnipperd eigenaarschap klantrelatie</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <span>Sectoroverstijgende samenwerking kost energie</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <span>Afwachtend gedrag, successen niet gedeeld</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Programma vs Lijn */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Programma vs. Lijn</h2>
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
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#003366]" />
                <span>Verbinden van stakeholders</span>
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
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Eigenaarschap dragen</span>
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
            {programmaLijnChecklist.map((item, i) => (
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

      {/* Batenprofiel Template */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Batenprofiel Template</h2>
            <p className="text-sm text-slate-500">Format voor het definiëren van baten</p>
          </div>
          <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">Template</span>
        </div>

        <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 bg-slate-50">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Naam van de baat</label>
              <div className="mt-1 p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-slate-400 italic">Zelfstandig naamwoord + vergrotende trap</span>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Bateneigenaar</label>
              <div className="mt-1 p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-slate-400 italic">Sectormanager PO / VO / Zakelijk</span>
              </div>
            </div>
            <div className="col-span-2">
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Omschrijving</label>
              <div className="mt-1 p-3 bg-white rounded-lg border border-slate-200 min-h-16">
                <span className="text-slate-400 italic">Waarom is deze baat belangrijk? Wat verandert er?</span>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Meeteenheid / KPI</label>
              <div className="mt-1 p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-slate-400 italic">NPS, %, dagen, aantal...</span>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Meetfrequentie</label>
              <div className="mt-1 p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-slate-400 italic">Maandelijks, per kwartaal, jaarlijks</span>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Startwaarde (nulmeting)</label>
              <div className="mt-1 p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-slate-400 italic">Huidige situatie</span>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Doelwaarde</label>
              <div className="mt-1 p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-slate-400 italic">Gewenste situatie</span>
              </div>
            </div>
            <div className="col-span-2">
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Bijdragende domeinen (kruis aan)</label>
              <div className="mt-1 p-3 bg-white rounded-lg border border-slate-200">
                <div className="flex gap-6">
                  {['Mens', 'Proces', 'Systeem', 'Cultuur'].map(d => (
                    <label key={d} className="flex items-center gap-2 text-sm text-slate-700">
                      <input type="checkbox" className="rounded" />
                      <span>{d}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-span-2">
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Benodigde vermogens</label>
              <div className="mt-1 p-3 bg-white rounded-lg border border-slate-200 min-h-16">
                <span className="text-slate-400 italic">Wat moet de organisatie KUNNEN om deze baat te realiseren?</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Voorkomen valkuilen */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-red-100 rounded-lg">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h2 className="font-semibold text-red-900 mb-3">Valkuilen om te voorkomen</h2>
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
    </div>
  )
}

export default Framework
