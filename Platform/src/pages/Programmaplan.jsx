/**
 * Programmaplan Pagina - Strategisch Overzicht
 *
 * ONDERSCHEID met Werkdocument:
 * - Werkdocument = HOE voeren we uit (operationeel, dagelijks)
 * - Programmaplan = WAT willen we bereiken en HOE hangt alles samen (strategisch)
 *
 * UNIEKE SECTIES:
 * 1. Header (programma identiteit)
 * 2. Baten-Inspanningen Netwerk (visuele relaties)
 * 3. Stuurparameters (5 parameters uit theorie)
 * 4. Scope (Programma vs Lijn)
 */

import { Link } from 'react-router-dom'
import {
  Target,
  CheckCircle,
  ArrowRight,
  Building,
  Briefcase,
  Calendar,
  FileText,
  Clock,
  Gauge,
  Timer,
  Shield,
  RefreshCw,
  TrendingUp,
  Lightbulb,
  GitBranch,
  Circle
} from 'lucide-react'
import { useAppStore } from '../stores/appStore'
import {
  programmaInfo,
  stuurparameters,
  programmaLijnChecklist
} from '../data/programmaData'

function Programmaplan() {
  const { baten, inspanningen } = useAppStore()

  // Bouw relaties tussen baten en inspanningen
  const batenMetInspanningen = baten.map(baat => {
    const gekoppeldeInspanningen = inspanningen.filter(
      insp => insp.gekoppeldeBaten?.includes(String(baat.id))
    )
    return {
      ...baat,
      inspanningen: gekoppeldeInspanningen
    }
  })

  // Inspanningen zonder koppeling
  const ongekoopeldeInspanningen = inspanningen.filter(
    insp => !insp.gekoppeldeBaten || insp.gekoppeldeBaten.length === 0
  )

  // Stuurparameter icons
  const parameterIcons = {
    doeltreffendheid: Target,
    tempo: Timer,
    haalbaarheid: Shield,
    wendbaarheid: RefreshCw,
    efficientie: Gauge
  }

  const statusKleur = (status) => {
    switch (status) {
      case 'groen': return 'bg-green-500'
      case 'geel': return 'bg-amber-400'
      case 'rood': return 'bg-red-500'
      default: return 'bg-slate-300'
    }
  }

  const statusBg = (status) => {
    switch (status) {
      case 'groen': return 'bg-green-50 border-green-200'
      case 'geel': return 'bg-amber-50 border-amber-200'
      case 'rood': return 'bg-red-50 border-red-200'
      default: return 'bg-slate-50 border-slate-200'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#003366] to-[#0066cc] rounded-xl p-6 text-white">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="w-5 h-5" />
          <span className="text-white/80 text-sm">Programmaplan</span>
          <span className="ml-auto text-xs bg-white/20 px-2 py-1 rounded-full">Strategisch Overzicht</span>
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

      {/* 1. Baten-Inspanningen Netwerk */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-600 rounded-lg">
            <GitBranch className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Baten-Inspanningen Netwerk</h2>
            <p className="text-sm text-slate-500">Welke inspanningen dragen bij aan welke baten?</p>
          </div>
          <div className="ml-auto flex gap-2">
            <Link to="/baten" className="text-xs text-[#003366] hover:underline">Baten beheren</Link>
            <span className="text-slate-300">|</span>
            <Link to="/inspanningen" className="text-xs text-[#003366] hover:underline">Inspanningen beheren</Link>
          </div>
        </div>

        {batenMetInspanningen.length > 0 ? (
          <div className="space-y-4">
            {batenMetInspanningen.map((baat) => (
              <div key={baat.id} className="border border-slate-200 rounded-xl overflow-hidden">
                {/* Baat header */}
                <div className="bg-purple-50 p-4 flex items-center gap-3">
                  <Target className="w-5 h-5 text-purple-600" />
                  <div className="flex-1">
                    <div className="font-medium text-slate-800">{baat.naam}</div>
                    <div className="text-xs text-slate-500">{baat.sector} • {baat.indicator}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-slate-600">+{baat.huidigeWaarde} → <span className="text-green-600">+{baat.doelWaarde}</span></div>
                  </div>
                </div>

                {/* Gekoppelde inspanningen */}
                <div className="p-4 bg-white">
                  {baat.inspanningen.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {baat.inspanningen.map((insp) => (
                        <div
                          key={insp.id}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm"
                          style={{
                            backgroundColor: insp.type === 'project' ? '#3b82f620' : insp.type === 'leer' ? '#10b98120' : insp.type === 'proces' ? '#8b5cf620' : '#f59e0b20',
                            color: insp.type === 'project' ? '#3b82f6' : insp.type === 'leer' ? '#10b981' : insp.type === 'proces' ? '#8b5cf6' : '#f59e0b'
                          }}
                        >
                          <Briefcase className="w-3.5 h-3.5" />
                          <span>{insp.naam}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm text-slate-400 italic flex items-center gap-2">
                      <Circle className="w-3 h-3" />
                      Nog geen inspanningen gekoppeld
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Ongekoppelde inspanningen */}
            {ongekoopeldeInspanningen.length > 0 && (
              <div className="border border-amber-200 rounded-xl overflow-hidden">
                <div className="bg-amber-50 p-4 flex items-center gap-3">
                  <Lightbulb className="w-5 h-5 text-amber-600" />
                  <div>
                    <div className="font-medium text-amber-800">Inspanningen zonder baat-koppeling</div>
                    <div className="text-xs text-amber-600">Deze inspanningen zijn nog niet gekoppeld aan een baat</div>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <div className="flex flex-wrap gap-2">
                    {ongekoopeldeInspanningen.map((insp) => (
                      <div
                        key={insp.id}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm bg-slate-100 text-slate-600"
                      >
                        <Briefcase className="w-3.5 h-3.5" />
                        <span>{insp.naam}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-500">
            <GitBranch className="w-12 h-12 mx-auto mb-3 text-slate-300" />
            <p className="font-medium">Nog geen baten gedefinieerd</p>
            <p className="text-sm mt-1">Definieer eerst baten en koppel daar inspanningen aan</p>
            <Link to="/baten" className="inline-flex items-center gap-2 mt-4 text-[#003366] hover:underline">
              Baten toevoegen <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* Samenvatting */}
        <div className="mt-6 p-4 bg-slate-50 rounded-lg flex items-center justify-between">
          <div className="flex gap-8">
            <div>
              <div className="text-2xl font-bold text-purple-600">{baten.length}</div>
              <div className="text-xs text-slate-500">Baten</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-pink-600">{inspanningen.length}</div>
              <div className="text-xs text-slate-500">Inspanningen</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {batenMetInspanningen.filter(b => b.inspanningen.length > 0).length}
              </div>
              <div className="text-xs text-slate-500">Baten met koppeling</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-600">Dekkingsgraad</div>
            <div className="text-lg font-bold text-slate-800">
              {baten.length > 0 ? Math.round((batenMetInspanningen.filter(b => b.inspanningen.length > 0).length / baten.length) * 100) : 0}%
            </div>
          </div>
        </div>
      </div>

      {/* 2. Stuurparameters */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-[#003366] rounded-lg">
            <Gauge className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-800">5 Stuurparameters</h2>
            <p className="text-sm text-slate-500">Hoe sturen we het programma? (uit "Werken aan Programma's")</p>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-4">
          {stuurparameters.map((param) => {
            const Icon = parameterIcons[param.id] || Gauge
            return (
              <div
                key={param.id}
                className={`p-4 rounded-xl border ${statusBg(param.status)}`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Icon className="w-5 h-5 text-slate-600" />
                  <div className={`w-3 h-3 rounded-full ${statusKleur(param.status)}`} />
                </div>
                <div className="font-semibold text-slate-800 text-sm mb-1">{param.naam}</div>
                <div className="text-xs text-slate-600 mb-2">{param.vraag}</div>
                <div className="text-xs text-slate-500 italic">{param.toelichting}</div>
              </div>
            )
          })}
        </div>

        {/* Legenda */}
        <div className="mt-4 flex gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span>Op koers</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <span>Aandacht nodig</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span>Actie vereist</span>
          </div>
        </div>
      </div>

      {/* 3. Programma Scope */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-slate-700 rounded-lg">
            <Building className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Programma Scope</h2>
            <p className="text-sm text-slate-500">Wat hoort WEL en NIET bij het programma?</p>
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

        {/* Twee kolommen */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Programma */}
          <div className="p-4 bg-[#003366]/5 rounded-xl border-2 border-[#003366]">
            <div className="flex items-center gap-2 mb-3">
              <Briefcase className="w-5 h-5 text-[#003366]" />
              <span className="font-semibold text-[#003366]">PROGRAMMA</span>
              <span className="text-xs text-slate-500 ml-auto">Tijdelijk</span>
            </div>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#003366] mt-0.5 flex-shrink-0" />
                <span>Nieuwe werkwijzen ontwikkelen</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#003366] mt-0.5 flex-shrink-0" />
                <span>Sectoroverstijgende initiatieven</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#003366] mt-0.5 flex-shrink-0" />
                <span>Pilots en experimenten</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#003366] mt-0.5 flex-shrink-0" />
                <span>Externe expertise inschakelen</span>
              </li>
            </ul>
          </div>

          {/* Lijn */}
          <div className="p-4 bg-green-50 rounded-xl border-2 border-green-500">
            <div className="flex items-center gap-2 mb-3">
              <Building className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-green-700">LIJN</span>
              <span className="text-xs text-slate-500 ml-auto">Permanent</span>
            </div>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Dagelijkse uitvoering</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Continu verbeteren bestaand</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Borgen en onderhouden</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Reguliere aansturing</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Checklist */}
        <div>
          <h4 className="font-medium text-slate-700 mb-3">Checklist: Programma of Lijn?</h4>
          <div className="space-y-2">
            {programmaLijnChecklist.slice(0, 6).map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg text-sm">
                <span className="flex-1 text-slate-700">{item.vraag}</span>
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                  item.programma ? 'bg-[#003366] text-white' : 'bg-slate-200 text-slate-400'
                }`}>
                  {item.programma ? 'Programma' : '-'}
                </span>
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                  item.lijn ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-400'
                }`}>
                  {item.lijn ? 'Lijn' : '-'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-[#003366] to-[#0066cc] rounded-xl p-6 text-white">
        <h2 className="text-lg font-semibold mb-2">Navigatie</h2>
        <p className="text-white/80 mb-4">
          Bekijk de operationele details in het Werkdocument of beheer baten en inspanningen.
        </p>
        <div className="flex gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 bg-white text-[#003366] px-4 py-2 rounded-lg font-medium hover:bg-white/90 transition-colors"
          >
            <TrendingUp className="w-4 h-4" />
            Naar Werkdocument
          </Link>
          <Link
            to="/baten"
            className="flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-lg font-medium hover:bg-white/30 transition-colors"
          >
            <Target className="w-4 h-4" />
            Baten beheren
          </Link>
          <Link
            to="/inspanningen"
            className="flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-lg font-medium hover:bg-white/30 transition-colors"
          >
            <Briefcase className="w-4 h-4" />
            Inspanningen beheren
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Programmaplan
