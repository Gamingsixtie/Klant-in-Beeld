/**
 * Programma vs Lijn - Interactieve Beslissingstool
 *
 * Helpt bepalen of een initiatief/idee thuishoort in het programma
 * of in de reguliere lijnorganisatie.
 *
 * Gebaseerd op "Werken aan Programma's" (Prevaas & Van Loon)
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Lightbulb,
  Building,
  Briefcase,
  CheckCircle,
  Circle,
  ArrowRight,
  RefreshCw,
  Scale,
  Target,
  Clock,
  Users,
  Layers,
  TrendingUp,
  AlertTriangle
} from 'lucide-react'
import { programmaLijnChecklist } from '../data/programmaData'

function ProgrammaVsLijn() {
  const [answers, setAnswers] = useState({})
  const [initiatief, setInitiatief] = useState('')

  // Uitgebreide vragen voor de beslissing
  const vragen = [
    {
      id: 'nieuw',
      vraag: 'Is dit iets NIEUWS dat ontwikkeld moet worden?',
      toelichting: 'Nieuwe werkwijzen, processen, systemen die nog niet bestaan',
      programma: true,
      lijn: false,
      icon: Lightbulb
    },
    {
      id: 'tijdelijk',
      vraag: 'Is het een tijdelijke inspanning met een duidelijk eindpunt?',
      toelichting: 'Na realisatie wordt het overgedragen aan de lijn',
      programma: true,
      lijn: false,
      icon: Clock
    },
    {
      id: 'sectoroverstijgend',
      vraag: 'Raakt het meerdere sectoren of afdelingen?',
      toelichting: 'Vereist samenwerking over organisatiegrenzen heen',
      programma: true,
      lijn: false,
      icon: Layers
    },
    {
      id: 'verandering',
      vraag: 'Vereist het significante gedragsverandering?',
      toelichting: 'Mensen moeten anders gaan werken dan ze gewend zijn',
      programma: true,
      lijn: false,
      icon: Users
    },
    {
      id: 'risico',
      vraag: 'Zijn er significante risico\'s of onzekerheden?',
      toelichting: 'Het is niet helder hoe de oplossing eruit moet zien',
      programma: true,
      lijn: false,
      icon: AlertTriangle
    },
    {
      id: 'verbetering',
      vraag: 'Is het continu verbeteren van iets dat al bestaat?',
      toelichting: 'Optimalisatie van huidige processen of systemen',
      programma: false,
      lijn: true,
      icon: TrendingUp
    },
    {
      id: 'dagelijks',
      vraag: 'Hoort het bij de dagelijkse operatie?',
      toelichting: 'Reguliere taken die voortdurend uitgevoerd worden',
      programma: false,
      lijn: true,
      icon: Building
    },
    {
      id: 'borgen',
      vraag: 'Gaat het om borgen en onderhouden?',
      toelichting: 'In stand houden van wat er al is',
      programma: false,
      lijn: true,
      icon: Target
    }
  ]

  const toggleAnswer = (vraagId, value) => {
    setAnswers(prev => ({
      ...prev,
      [vraagId]: prev[vraagId] === value ? null : value
    }))
  }

  // Bereken score
  const programmaScore = vragen.filter(v => answers[v.id] === 'ja' && v.programma).length
  const lijnScore = vragen.filter(v => answers[v.id] === 'ja' && v.lijn).length
  const totalAnswered = Object.values(answers).filter(a => a !== null).length
  const programmaPercentage = totalAnswered > 0 ? Math.round((programmaScore / (programmaScore + lijnScore || 1)) * 100) : 50

  // Bepaal advies (na 3 vragen al een indicatie geven)
  const getAdvies = () => {
    if (totalAnswered < 3) return null
    if (programmaPercentage >= 65) return 'programma'
    if (programmaPercentage <= 35) return 'lijn'
    return 'twijfel'
  }

  const advies = getAdvies()

  const resetForm = () => {
    setAnswers({})
    setInitiatief('')
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
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl shadow-lg">
                <Scale className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white/60 text-sm font-medium">Beslissingstool</span>
                </div>
                <h1 className="text-2xl font-bold text-white">Programma of Lijn?</h1>
                <p className="text-white/70 mt-1 max-w-xl">
                  Bepaal of een initiatief thuishoort in het programma of in de lijnorganisatie.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10 text-center">
                <Briefcase className="w-5 h-5 text-white mx-auto mb-1" />
                <div className="text-xs text-white/60">Programma</div>
                <div className="text-sm font-semibold text-white">Tijdelijk</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10 text-center">
                <Building className="w-5 h-5 text-white mx-auto mb-1" />
                <div className="text-xs text-white/60">Lijn</div>
                <div className="text-sm font-semibold text-white">Permanent</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* De Gouden Regel */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border-2 border-amber-300 overflow-hidden">
        <div className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-amber-500 rounded-xl">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-amber-900 text-lg">De Gouden Regel</span>
          </div>
          <p className="text-amber-900 text-xl font-medium">
            "Is dit iets <span className="underline decoration-amber-500 decoration-2">NIEUWS</span> dat ontwikkeld moet worden?"
          </p>
        </div>
        <div className="grid grid-cols-2 border-t border-amber-200">
          <div className="p-4 bg-[#003366]/5 border-r border-amber-200 flex items-center gap-3">
            <ArrowRight className="w-5 h-5 text-[#003366]" />
            <div>
              <span className="font-bold text-[#003366] text-lg">JA</span>
              <span className="text-slate-600 ml-2">= Programma</span>
            </div>
          </div>
          <div className="p-4 bg-green-50 flex items-center gap-3">
            <ArrowRight className="w-5 h-5 text-green-600" />
            <div>
              <span className="font-bold text-green-600 text-lg">NEE</span>
              <span className="text-slate-600 ml-2">= Lijn</span>
            </div>
          </div>
        </div>
      </div>

      {/* Initiatief invoer + voortgang */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-slate-700">
            Wat is het initiatief/idee dat je wilt toetsen?
          </label>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">{totalAnswered}/{vragen.length} beantwoord</span>
            <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#003366] to-green-500 transition-all duration-300"
                style={{ width: `${(totalAnswered / vragen.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
        <input
          type="text"
          value={initiatief}
          onChange={(e) => setInitiatief(e.target.value)}
          placeholder="Bijv. 'Implementatie nieuw CRM systeem' of 'Optimaliseren klantproces'"
          className="w-full p-3 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Vragen */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-slate-800">Beantwoord de vragen</h2>
          {totalAnswered > 0 && (
            <button
              onClick={resetForm}
              className="text-xs text-slate-500 hover:text-slate-700 flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              Reset
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {vragen.map((vraag) => {
            const Icon = vraag.icon
            const isJa = answers[vraag.id] === 'ja'
            const isNee = answers[vraag.id] === 'nee'

            return (
              <div
                key={vraag.id}
                className={`p-3 rounded-lg border-2 transition-all ${
                  isJa && vraag.programma ? 'border-[#003366] bg-[#003366]/5' :
                  isJa && vraag.lijn ? 'border-green-500 bg-green-50' :
                  isNee ? 'border-slate-200 bg-slate-50/50' :
                  'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-1.5 rounded-lg flex-shrink-0 ${
                    vraag.programma ? 'bg-[#003366]/10' : 'bg-green-100'
                  }`}>
                    <Icon className={`w-4 h-4 ${
                      vraag.programma ? 'text-[#003366]' : 'text-green-600'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-slate-800">{vraag.vraag}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{vraag.toelichting}</div>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <button
                      onClick={() => toggleAnswer(vraag.id, 'ja')}
                      className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${
                        isJa
                          ? vraag.programma ? 'bg-[#003366] text-white' : 'bg-green-500 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Ja
                    </button>
                    <button
                      onClick={() => toggleAnswer(vraag.id, 'nee')}
                      className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${
                        isNee
                          ? 'bg-slate-400 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Nee
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Resultaat */}
      {totalAnswered >= 4 && (
        <div className={`rounded-2xl overflow-hidden shadow-lg ${
          advies === 'programma' ? 'bg-gradient-to-br from-[#003366] to-[#004d99]' :
          advies === 'lijn' ? 'bg-gradient-to-br from-green-600 to-green-700' :
          'bg-gradient-to-br from-amber-500 to-amber-600'
        }`}>
          <div className="p-6 text-white">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  {advies === 'programma' && <Briefcase className="w-8 h-8" />}
                  {advies === 'lijn' && <Building className="w-8 h-8" />}
                  {advies === 'twijfel' && <Scale className="w-8 h-8" />}
                </div>
                <div>
                  <div className="text-white/60 text-sm mb-1">Advies</div>
                  <h2 className="text-2xl font-bold">
                    {advies === 'programma' && 'Dit hoort bij het PROGRAMMA'}
                    {advies === 'lijn' && 'Dit hoort bij de LIJN'}
                    {advies === 'twijfel' && 'Dit vereist nadere analyse'}
                  </h2>
                  {initiatief && <p className="text-white/70 mt-1">"{initiatief}"</p>}
                </div>
              </div>
              <div className="text-right bg-white/10 rounded-xl p-4">
                <div className="text-4xl font-bold">{programmaPercentage}%</div>
                <div className="text-white/60 text-sm">programma indicatie</div>
              </div>
            </div>

            {/* Score balk */}
            <div className="relative mb-5">
              <div className="flex justify-between text-xs text-white/60 mb-1">
                <span>Lijn</span>
                <span>Programma</span>
              </div>
              <div className="bg-white/20 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500 bg-white/50"
                  style={{ width: `${programmaPercentage}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between bg-white/10 rounded-xl p-4">
              <div className="text-sm text-white/90">
                {advies === 'programma' && (
                  <>Dit initiatief heeft kenmerken van programmawerk: nieuw, tijdelijk, sectoroverstijgend.</>
                )}
                {advies === 'lijn' && (
                  <>Dit initiatief past beter in de reguliere organisatie: bestaand, continu, operationeel.</>
                )}
                {advies === 'twijfel' && (
                  <>Dit initiatief heeft kenmerken van beide. Bespreek met de programmamanager.</>
                )}
              </div>
              <button
                onClick={resetForm}
                className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition-colors ml-4 flex-shrink-0"
              >
                <RefreshCw className="w-4 h-4" />
                Opnieuw
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Kenmerken vergelijking */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="font-semibold text-slate-800 mb-4">Kenmerken vergelijking</h2>
        <div className="grid grid-cols-2 gap-6">
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
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#003366] mt-0.5 flex-shrink-0" />
                <span>Duidelijk eindpunt</span>
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
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Geen einddatum</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Navigatie */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
        <div className="flex items-center justify-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
            Programmaverloop
          </Link>
          <Link
            to="/governance"
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <Users className="w-4 h-4" />
            Governance
          </Link>
          <Link
            to="/din-keten"
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <Target className="w-4 h-4" />
            DIN Keten
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProgrammaVsLijn
