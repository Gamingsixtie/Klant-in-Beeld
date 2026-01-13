/**
 * Methodologie Pagina - Klant in Beeld
 *
 * UX VERBETERINGEN (gebaseerd op Keto, Motion, Planview, ClickUp):
 * - View toggle (Overzicht/Timeline/Detail)
 * - KPI cards met trends
 * - Volgende actie prominent
 * - Progressive disclosure
 * - Quick actions bar
 */

import { useState } from 'react'
import { useMethodologieStore } from '../stores/methodologieStore'
import {
  levensloopcycli,
  themas,
  activiteiten,
  documentTemplates,
  getActiviteitenVoorThemaEnCyclus,
  getDocumentenVoorCyclus
} from '../data/methodologie'
import {
  sectoren,
  domeinen,
  batenProfielen,
  programmaInfo,
  documentenRegister,
  kernprincipes,
  kibTeam
} from '../data/programmaData'
import { useNavigate } from 'react-router-dom'
import {
  ChevronRight,
  ChevronDown,
  CheckCircle,
  Circle,
  Clock,
  Building,
  Users,
  X,
  Target,
  Lightbulb,
  Compass,
  Scale,
  Handshake,
  Crown,
  TrendingUp,
  CheckSquare,
  GitBranch,
  Database,
  Heart,
  FileText,
  Download,
  ExternalLink,
  LayoutGrid,
  Calendar,
  List,
  Play,
  ArrowRight,
  Zap,
  BarChart3,
  AlertCircle,
  Eye,
  EyeOff,
  Shield,
  BookOpen,
  Info,
  Briefcase,
  Upload,
  Link2
} from 'lucide-react'

const statusKleuren = {
  groen: 'bg-green-500',
  geel: 'bg-yellow-500',
  rood: 'bg-red-500'
}

// Icon mapping voor thema's
const themaIcons = {
  kiezen: CheckSquare,
  vormgeven: Lightbulb,
  organiseren: Users,
  sturen: Compass,
  beslissen: Scale,
  samenwerken: Handshake,
  leiden: Crown,
  ontwikkelen: TrendingUp
}

// Icon mapping voor kernprincipes
const principeIcons = {
  Eye: Eye,
  Users: Users,
  Layers: LayoutGrid,
  FileText: FileText,
  TrendingUp: TrendingUp,
  Shield: Shield,
  Target: Target
}

// Icon mapping voor domeinen
const domeinIcons = {
  mens: Users,
  proces: GitBranch,
  systeem: Database,
  cultuur: Heart
}

// Cyclus kleuren
const cyclusKleuren = {
  verkennen: '#3b82f6',
  opbouwen: '#8b5cf6',
  uitvoeren: '#10b981',
  afbouwen: '#f59e0b'
}

// View modes (zoals ClickUp)
const viewModes = [
  { id: 'overzicht', naam: 'Overzicht', icon: LayoutGrid },
  { id: 'timeline', naam: 'Timeline', icon: Calendar },
  { id: 'detail', naam: 'Detail', icon: List }
]

function Methodologie() {
  const navigate = useNavigate()
  const { voortgang, getCyclusVoortgang, getTotaleVoortgang, getVolgendeActie, advanceWeek, advanceCyclus, canUnlockCyclus, getStuurparametersMetMetadata, updateStuurparameter } = useMethodologieStore()
  const [geselecteerdeCyclus, setGeselecteerdeCyclus] = useState(null)
  const [geselecteerdThema, setGeselecteerdThema] = useState(null)
  const [activeView, setActiveView] = useState('overzicht')
  const [expandedSections, setExpandedSections] = useState({
    stuurparameters: true, // Open - belangrijke sturingsinformatie
    kernprincipes: false,
    kibteam: false,
    baten: false,        // Standaard dicht - minder cognitive load
    themas: true,        // Alleen thema's open - kern navigatie
    faseverloop: false,  // Standaard dicht - grote sectie
    sectoren: false
  })
  const [editingParameter, setEditingParameter] = useState(null)

  const totaal = getTotaleVoortgang()
  const volgendeActie = getVolgendeActie()
  const stuurparameters = getStuurparametersMetMetadata()

  // Toggle section expansion (progressive disclosure)
  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  // Haal documenten op voor een thema (uit beide bronnen)
  const getDocumentenVoorThema = (themaId) => {
    // Uit methodologie templates
    const templates = documentTemplates.filter(d => d.themaId === themaId)
    // Uit documentenRegister (met status)
    const register = documentenRegister.filter(d => d.thema === themaId)
    return { templates, register }
  }

  // Detail modal voor cyclus
  const CyclusDetailModal = ({ cyclus, onClose }) => {
    const kleur = cyclusKleuren[cyclus.id]
    const cyclusActiviteiten = activiteiten.filter(a => a.cyclusId === cyclus.id)
    const cyclusDocumenten = getDocumentenVoorCyclus(cyclus.id)
    const registerDocs = documentenRegister.filter(d => d.cyclus === cyclus.id)

    // Groepeer activiteiten per thema
    const activiteitenPerThema = {}
    cyclusActiviteiten.forEach(act => {
      if (!activiteitenPerThema[act.themaId]) {
        activiteitenPerThema[act.themaId] = []
      }
      activiteitenPerThema[act.themaId].push(act)
    })

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 modal-overlay" role="dialog" aria-modal="true" aria-labelledby="cyclus-modal-title">
        <div className="bg-white rounded-xl max-w-3xl w-full max-h-[85vh] overflow-auto">
          <div
            className="p-6 border-b flex items-center justify-between sticky top-0 z-10"
            style={{ backgroundColor: kleur, borderColor: kleur }}
          >
            <div className="text-white">
              <div className="text-sm opacity-80">Cyclus {cyclus.nummer}</div>
              <h2 id="cyclus-modal-title" className="text-2xl font-bold">{cyclus.naam}</h2>
              <div className="text-sm opacity-80 mt-1">{cyclus.beschrijving}</div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              aria-label="Modal sluiten"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Kerninfo */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="text-xs text-slate-500 mb-1">Kernvraag</div>
                <div className="font-medium text-slate-800">{cyclus.kernvraag}</div>
              </div>
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="text-xs text-slate-500 mb-1">Duur</div>
                <div className="font-medium text-slate-800">{cyclus.duur}</div>
              </div>
              <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                <div className="text-xs text-amber-600 mb-1">Go/No-Go</div>
                <div className="font-medium text-amber-800 text-sm">{cyclus.goNogo}</div>
              </div>
            </div>

            {/* Resultaten */}
            <div>
              <h3 className="font-medium text-slate-700 mb-3">Resultaten van deze cyclus</h3>
              <div className="flex flex-wrap gap-2">
                {cyclus.resultaten.map((res, i) => (
                  <span key={i} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-sm">
                    {res}
                  </span>
                ))}
              </div>
            </div>

            {/* Activiteiten per Thema */}
            <div>
              <h3 className="font-medium text-slate-700 mb-3">Activiteiten per Thema</h3>
              <div className="space-y-3">
                {Object.entries(activiteitenPerThema).map(([themaId, acts]) => {
                  const thema = themas.find(t => t.id === themaId)
                  if (!thema) return null
                  const Icon = themaIcons[themaId] || Circle

                  return (
                    <div key={themaId} className="border border-slate-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div
                          className="w-6 h-6 rounded flex items-center justify-center"
                          style={{ backgroundColor: thema.kleur }}
                        >
                          <Icon className="w-3 h-3 text-white" />
                        </div>
                        <span className="font-medium text-slate-800">{thema.naam}</span>
                      </div>
                      <ul className="space-y-2">
                        {acts.sort((a, b) => a.volgorde - b.volgorde).map(act => (
                          <li key={act.id} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                            <div>
                              <div className="text-sm text-slate-700">{act.naam}</div>
                              {act.deliverables && act.deliverables.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {act.deliverables.map((del, i) => (
                                    <span key={i} className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded">
                                      {del}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Documenten */}
            <div>
              <h3 className="font-medium text-slate-700 mb-3">Documenten in deze cyclus</h3>
              <div className="grid grid-cols-2 gap-2">
                {registerDocs.map(doc => (
                  <div
                    key={doc.id}
                    className={`p-3 rounded-lg border flex items-center gap-3 ${doc.status === 'gereed' ? 'bg-green-50 border-green-200' :
                        doc.status === 'in_bewerking' ? 'bg-amber-50 border-amber-200' :
                          doc.status === 'actief' ? 'bg-blue-50 border-blue-200' :
                            'bg-slate-50 border-slate-200'
                      }`}
                  >
                    <FileText className={`w-5 h-5 ${doc.status === 'gereed' ? 'text-green-600' :
                        doc.status === 'in_bewerking' ? 'text-amber-600' :
                          doc.status === 'actief' ? 'text-blue-600' :
                            'text-slate-400'
                      }`} />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-slate-800 text-sm truncate">{doc.naam}</div>
                      <div className="text-xs text-slate-500">{doc.type} • {doc.status}</div>
                    </div>
                    {doc.verplicht && (
                      <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">Verplicht</span>
                    )}
                  </div>
                ))}
                {registerDocs.length === 0 && (
                  <div className="col-span-2 text-sm text-slate-400 text-center py-4">
                    Geen documenten geregistreerd voor deze cyclus
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Detail modal voor thema
  const ThemaDetailModal = ({ thema, onClose }) => {
    const Icon = themaIcons[thema.id] || Circle
    const { templates, register } = getDocumentenVoorThema(thema.id)

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true" aria-labelledby="thema-modal-title">
        <div className="bg-white rounded-xl max-w-3xl w-full max-h-[85vh] overflow-auto">
          <div
            className="p-6 border-b flex items-center justify-between sticky top-0 z-10"
            style={{ backgroundColor: thema.kleur }}
          >
            <div className="flex items-center gap-3 text-white">
              <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h2 id="thema-modal-title" className="text-2xl font-bold">{thema.naam}</h2>
                <div className="text-sm opacity-80">{thema.subtitel}</div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              aria-label="Modal sluiten"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Beschrijving */}
            <div>
              <p className="text-slate-600">{thema.beschrijving}</p>
              <div className="text-xs text-slate-400 mt-2">Hoofdstukken: {thema.hoofdstukken?.join(', ')}</div>
            </div>

            {/* Kernvragen */}
            <div>
              <h3 className="font-medium text-slate-700 mb-3">Kernvragen</h3>
              <ul className="space-y-2">
                {thema.kernvragen.map((vraag, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-600">
                    <span className="font-bold" style={{ color: thema.kleur }}>?</span>
                    <span>{vraag}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Activiteiten per cyclus */}
            <div>
              <h3 className="font-medium text-slate-700 mb-3">Activiteiten per Cyclus</h3>
              <div className="grid grid-cols-2 gap-3">
                {levensloopcycli.map(cyclus => {
                  const cyclusActiviteiten = getActiviteitenVoorThemaEnCyclus(thema.id, cyclus.id)
                  const kleur = cyclusKleuren[cyclus.id]

                  return (
                    <div
                      key={cyclus.id}
                      className="border rounded-lg p-4"
                      style={{ borderColor: `${kleur}40` }}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <div
                          className="w-6 h-6 rounded flex items-center justify-center text-white text-xs font-bold"
                          style={{ backgroundColor: kleur }}
                        >
                          {cyclus.nummer}
                        </div>
                        <span className="font-medium text-slate-800">{cyclus.naam}</span>
                      </div>
                      {cyclusActiviteiten.length > 0 ? (
                        <ul className="space-y-2">
                          {cyclusActiviteiten.map(act => (
                            <li key={act.id} className="text-sm text-slate-600 flex items-start gap-2">
                              <CheckCircle className="w-3 h-3 mt-1 text-green-500 flex-shrink-0" />
                              <span>{act.naam}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="text-sm text-slate-400">Geen activiteiten in deze cyclus</div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* DOCUMENTEN */}
            <div>
              <h3 className="font-medium text-slate-700 mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Documenten voor dit thema
              </h3>

              {/* Templates uit methodologie */}
              {templates.length > 0 && (
                <div className="mb-4">
                  <div className="text-xs text-slate-500 mb-2">Vereiste documenten (methodologie)</div>
                  <div className="grid grid-cols-2 gap-2">
                    {templates.map(doc => {
                      const cyclus = levensloopcycli.find(c => c.id === doc.cyclusId)
                      return (
                        <div
                          key={doc.id}
                          className={`p-3 rounded-lg border ${doc.verplicht ? 'border-red-200 bg-red-50' : 'border-slate-200 bg-slate-50'
                            }`}
                        >
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-slate-600" />
                            <span className="font-medium text-slate-800 text-sm flex-1">{doc.naam}</span>
                            {doc.templateBestand && (
                              <a
                                href={`/templates/${doc.templateBestand}`}
                                download
                                className="p-1.5 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded transition-colors"
                                title="Download template"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Download className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                          <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                            <span
                              className="px-1.5 py-0.5 rounded text-white text-[10px]"
                              style={{ backgroundColor: cyclusKleuren[doc.cyclusId] }}
                            >
                              {cyclus?.naam}
                            </span>
                            {doc.verplicht && <span className="text-red-600">Verplicht</span>}
                            {doc.templateBestand && <span className="text-green-600">Template beschikbaar</span>}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Actuele documenten uit register */}
              {register.length > 0 && (
                <div>
                  <div className="text-xs text-slate-500 mb-2">Actuele documenten (Klant in Beeld)</div>
                  <div className="grid grid-cols-2 gap-2">
                    {register.map(doc => (
                      <div
                        key={doc.id}
                        className={`p-3 rounded-lg border ${doc.status === 'gereed' ? 'bg-green-50 border-green-200' :
                            doc.status === 'in_bewerking' ? 'bg-amber-50 border-amber-200' :
                              doc.status === 'actief' ? 'bg-blue-50 border-blue-200' :
                                'bg-slate-50 border-slate-200'
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <FileText className={`w-5 h-5 flex-shrink-0 ${doc.status === 'gereed' ? 'text-green-600' :
                              doc.status === 'in_bewerking' ? 'text-amber-600' :
                                doc.status === 'actief' ? 'text-blue-600' :
                                  'text-slate-400'
                            }`} />
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-slate-800 text-sm truncate">{doc.naam}</div>
                            <div className="text-xs text-slate-500">
                              {doc.versie !== '-' && `v${doc.versie} • `}
                              {doc.status === 'gereed' ? 'Gereed' :
                                doc.status === 'in_bewerking' ? 'In bewerking' :
                                  doc.status === 'actief' ? 'Actief' :
                                    'Niet gestart'}
                            </div>
                          </div>
                          {doc.status === 'gereed' && (
                            <Download className="w-4 h-4 text-green-600" />
                          )}
                        </div>
                        {/* Status verantwoording */}
                        <div className="mt-2 pt-2 border-t border-slate-200/50 text-[10px]">
                          <div className="flex items-center justify-between text-slate-500">
                            <span>Eigenaar: {doc.eigenaar}</span>
                            {doc.datum && <span>{doc.datum}</span>}
                          </div>
                          {doc.verplicht && (
                            <div className="mt-1 text-red-600 font-medium">Verplicht document (methodologie)</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {templates.length === 0 && register.length === 0 && (
                <div className="text-sm text-slate-400 text-center py-4 bg-slate-50 rounded-lg">
                  Geen documenten gekoppeld aan dit thema
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* === PAGE HEADER met context === */}
      <div className="bg-gradient-to-r from-[#003366] to-[#004488] rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
              <Compass className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{programmaInfo.naam}</h1>
              <p className="text-white/80 text-sm mt-1">Programmaverloop: Werken aan Programma's</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm bg-white/20 px-4 py-2 rounded-lg font-medium">Week {voortgang.huidigeWeek}</span>
            <span className="text-sm bg-white/20 px-4 py-2 rounded-lg capitalize">{voortgang.huidigeCyclus}</span>
          </div>
        </div>
      </div>

      {/* === QUICK ACTIONS BAR + VIEW TOGGLE (zoals ClickUp) === */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500">Weergave:</span>
        </div>

        {/* View Toggle (zoals ClickUp) */}
        <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
          {viewModes.map(mode => {
            const Icon = mode.icon
            return (
              <button
                key={mode.id}
                onClick={() => setActiveView(mode.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-all focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${activeView === mode.id
                    ? 'bg-white shadow-sm text-slate-800 font-medium'
                    : 'text-slate-500 hover:text-slate-700'
                  }`}
              >
                <Icon className="w-4 h-4" />
                <span>{mode.naam}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* === 5 STUURPARAMETERS - INTERACTIEF === */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <button
          onClick={() => toggleSection('stuurparameters')}
          className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500"
          aria-expanded={expandedSections.stuurparameters}
        >
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-slate-400" />
            <h2 className="font-medium text-slate-800">5 Stuurparameters</h2>
            <span className="text-xs text-slate-500 ml-2">Hoe staat het programma ervoor?</span>
          </div>
          <div className="flex items-center gap-3">
            {/* Quick status summary */}
            <div className="flex items-center gap-1">
              {stuurparameters.map(p => (
                <div
                  key={p.id}
                  className={`w-2.5 h-2.5 rounded-full ${statusKleuren[p.status]}`}
                  title={`${p.naam}: ${p.status}`}
                />
              ))}
            </div>
            {expandedSections.stuurparameters ? (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronRight className="w-5 h-5 text-slate-400" />
            )}
          </div>
        </button>

        {expandedSections.stuurparameters && (
          <div className="p-4 pt-0">
            <div className="grid grid-cols-5 gap-3">
              {stuurparameters.map(param => (
                <div
                  key={param.id}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    editingParameter === param.id
                      ? 'border-blue-500 shadow-md'
                      : param.status === 'groen' ? 'border-green-200 bg-green-50'
                      : param.status === 'geel' ? 'border-amber-200 bg-amber-50'
                      : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm text-slate-800">{param.naam}</span>
                    <button
                      onClick={() => setEditingParameter(editingParameter === param.id ? null : param.id)}
                      className="text-xs text-slate-400 hover:text-slate-600"
                    >
                      {editingParameter === param.id ? '✕' : '✎'}
                    </button>
                  </div>

                  {editingParameter === param.id ? (
                    <div className="space-y-2">
                      {/* Status selector */}
                      <div className="flex gap-1">
                        {['groen', 'geel', 'rood'].map(status => (
                          <button
                            key={status}
                            onClick={() => updateStuurparameter(param.id, { status })}
                            className={`flex-1 py-1.5 rounded text-xs font-medium transition-all ${
                              param.status === status
                                ? status === 'groen' ? 'bg-green-500 text-white'
                                : status === 'geel' ? 'bg-amber-500 text-white'
                                : 'bg-red-500 text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            {status === 'groen' ? 'Groen' : status === 'geel' ? 'Geel' : 'Rood'}
                          </button>
                        ))}
                      </div>
                      {/* Toelichting input */}
                      <input
                        type="text"
                        value={param.toelichting}
                        onChange={(e) => updateStuurparameter(param.id, { toelichting: e.target.value })}
                        placeholder="Toelichting..."
                        className="w-full text-xs p-2 border border-slate-200 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  ) : (
                    <>
                      <div className="text-xs text-slate-500 mb-1">{param.vraag}</div>
                      <div className="text-xs text-slate-600 italic">{param.toelichting}</div>
                      {param.laatstGewijzigd && (
                        <div className="text-[10px] text-slate-400 mt-2">
                          Gewijzigd: {param.laatstGewijzigd}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-3 text-xs text-slate-400 text-center">
              Klik op ✎ om een parameter te wijzigen • Wijzigingen worden automatisch opgeslagen
            </div>
          </div>
        )}
      </div>

      {/* === VOLGENDE ACTIE - PROMINENT (zoals Motion) === */}
      {volgendeActie && (
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs text-white/70 uppercase tracking-wide">Volgende Actie</div>
                <div className="text-lg font-semibold">{volgendeActie.naam}</div>
                <div className="text-sm text-white/80 flex items-center gap-2 mt-0.5">
                  <span className="px-2 py-0.5 bg-white/20 rounded text-xs">
                    {themas.find(t => t.id === volgendeActie.themaId)?.naam}
                  </span>
                  <span className="px-2 py-0.5 bg-white/20 rounded text-xs">
                    {levensloopcycli.find(c => c.id === volgendeActie.cyclusId)?.naam}
                  </span>
                </div>
              </div>
            </div>
            <button className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600">
              <Play className="w-4 h-4" />
              Start
            </button>
          </div>
        </div>
      )}

      {/* === KPI CARDS (compacte strip) === */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 items-stretch">
        {/* Voortgang KPI */}
        <div className="bg-white rounded-lg border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all duration-200 p-3">
          <div className="flex items-center justify-between mb-1">
            <div className="text-xs text-slate-500">Voortgang</div>
            <BarChart3 className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold text-slate-800">{totaal.percentage}%</div>
            <div className="flex-1">
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all"
                  style={{ width: `${totaal.percentage}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-400">{totaal.completed}/{totaal.total}</span>
            </div>
          </div>
        </div>

        {/* Huidige Cyclus KPI */}
        <div className="bg-white rounded-lg border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all duration-200 p-3">
          <div className="flex items-center justify-between mb-1">
            <div className="text-xs text-slate-500">Cyclus</div>
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: cyclusKleuren[voortgang.huidigeCyclus] }}
            />
          </div>
          <div className="text-lg font-bold text-slate-800 capitalize">{voortgang.huidigeCyclus}</div>
          <div className="text-[10px] text-slate-500 line-clamp-1">
            {levensloopcycli.find(c => c.id === voortgang.huidigeCyclus)?.kernvraag}
          </div>
        </div>

        {/* Stuurparameters Samenvatting */}
        <div className="bg-white rounded-lg border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all duration-200 p-3">
          <div className="flex items-center justify-between mb-1">
            <div className="text-xs text-slate-500">5 Stuurparameters</div>
            <span className="text-[9px] text-slate-400">H17-H22</span>
          </div>
          <div className="flex items-center gap-1.5">
            {stuurparameters.map((param) => (
              <div
                key={param.id}
                className="flex flex-col items-center group relative cursor-help"
                title={`${param.vraag}\n\n${param.toelichting}`}
              >
                <div className={`w-4 h-4 rounded-full ${statusKleuren[param.status]} ring-1 ring-offset-1 ring-transparent group-hover:ring-slate-300 transition-all`} />
                <span className="text-[9px] text-slate-500">{param.naam.substring(0, 4)}</span>
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-800 text-white text-[10px] rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 pointer-events-none">
                  <div className="font-medium mb-1">{param.naam}</div>
                  <div className="text-slate-300">{param.vraag}</div>
                  <div className="mt-1 pt-1 border-t border-slate-600 text-slate-400">{param.toelichting}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sectoren Quick View */}
        <div className="bg-white rounded-lg border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all duration-200 p-3">
          <div className="flex items-center justify-between mb-1">
            <div className="text-xs text-slate-500">Sectoren</div>
            <Users className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="flex items-center gap-1.5">
            {sectoren.map((sector) => (
              <button
                key={sector.id}
                onClick={() => navigate(`/sector/${sector.id}`)}
                className="w-7 h-7 rounded-md flex items-center justify-center text-white text-[10px] font-bold hover:scale-110 transition-transform focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1"
                style={{ backgroundColor: sector.kleur }}
                title={sector.naam}
                aria-label={`Ga naar sector ${sector.naam}`}
              >
                {sector.afkorting}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* === VIEW-BASED CONTENT === */}
      {activeView === 'timeline' && (
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-500" />
            Timeline: Faseverloop Week 1-8
          </h2>

          {/* Timeline Grid */}
          <div className="relative">
            {/* Week headers */}
            <div className="grid grid-cols-9 gap-1 mb-2">
              <div className="text-xs font-medium text-slate-500 p-2">Fase</div>
              {[1, 2, 3, 4, 5, 6, 7, 8].map(week => (
                <div
                  key={week}
                  className={`text-xs font-medium text-center p-2 rounded ${
                    voortgang.huidigeWeek === week
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  W{week}
                </div>
              ))}
            </div>

            {/* VERKENNEN Row */}
            <div className="grid grid-cols-9 gap-1 mb-1">
              <div className="text-xs font-medium text-blue-700 bg-blue-50 p-2 rounded flex items-center">
                <span className="w-4 h-4 rounded bg-blue-500 text-white text-[10px] flex items-center justify-center mr-1">1</span>
                Verkennen
              </div>
              <div className="bg-blue-100 p-1.5 rounded text-[10px] text-blue-800 truncate">Voorstel</div>
              <div className="bg-blue-100 p-1.5 rounded text-[10px] text-blue-800 truncate">Sessie</div>
              <div className="bg-blue-100 p-1.5 rounded text-[10px] text-blue-800 truncate">B.case</div>
              <div className="bg-amber-100 p-1.5 rounded text-[10px] text-amber-800 truncate border border-amber-300">Go/No-Go</div>
              <div className="bg-slate-50 p-1.5 rounded" />
              <div className="bg-slate-50 p-1.5 rounded" />
              <div className="bg-slate-50 p-1.5 rounded" />
              <div className="bg-slate-50 p-1.5 rounded" />
            </div>

            {/* OPBOUWEN Row */}
            <div className="grid grid-cols-9 gap-1 mb-1">
              <div className="text-xs font-medium text-purple-700 bg-purple-50 p-2 rounded flex items-center">
                <span className="w-4 h-4 rounded bg-purple-500 text-white text-[10px] flex items-center justify-center mr-1">2</span>
                Opbouwen
              </div>
              <div className="bg-slate-50 p-1.5 rounded" />
              <div className="bg-slate-50 p-1.5 rounded" />
              <div className="bg-slate-50 p-1.5 rounded" />
              <div className="bg-slate-50 p-1.5 rounded" />
              <div className="bg-purple-100 p-1.5 rounded text-[10px] text-purple-800 truncate">Bouw</div>
              <div className="bg-purple-100 p-1.5 rounded text-[10px] text-purple-800 truncate">Bouw</div>
              <div className="bg-purple-100 p-1.5 rounded text-[10px] text-purple-800 truncate">Bouw</div>
              <div className="bg-amber-100 p-1.5 rounded text-[10px] text-amber-800 truncate border border-amber-300">Go/No-Go</div>
            </div>

            {/* Current week indicator */}
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-blue-800">Huidige week: {voortgang.huidigeWeek}</span>
                  <span className="text-xs text-blue-600 ml-2">({voortgang.huidigeCyclus})</span>
                </div>
                <button
                  onClick={advanceWeek}
                  className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                >
                  Week +1
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeView === 'detail' && (
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <List className="w-5 h-5 text-blue-500" />
            Detail: Alle Activiteiten
          </h2>

          <div className="space-y-4">
            {levensloopcycli.map(cyclus => {
              const cyclusVoortgang = getCyclusVoortgang(cyclus.id)
              const kleur = cyclusKleuren[cyclus.id]
              const cyclusActiviteiten = activiteiten.filter(a => a.cyclusId === cyclus.id)

              return (
                <div key={cyclus.id} className="border rounded-lg overflow-hidden">
                  <div
                    className="p-3 flex items-center justify-between"
                    style={{ backgroundColor: `${kleur}15` }}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded flex items-center justify-center text-white text-sm font-bold"
                        style={{ backgroundColor: kleur }}
                      >
                        {cyclus.nummer}
                      </div>
                      <span className="font-medium text-slate-800">{cyclus.naam}</span>
                      <span className="text-xs text-slate-500">({cyclus.duur})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${cyclusVoortgang.percentage}%`, backgroundColor: kleur }}
                        />
                      </div>
                      <span className="text-xs font-medium" style={{ color: kleur }}>{cyclusVoortgang.percentage}%</span>
                    </div>
                  </div>
                  <div className="p-3 space-y-1">
                    {cyclusActiviteiten.map(act => {
                      const thema = themas.find(t => t.id === act.themaId)
                      return (
                        <div key={act.id} className="flex items-center gap-2 text-sm py-1.5 px-2 hover:bg-slate-50 rounded">
                          <Circle className="w-3 h-3 text-slate-300" />
                          <span className="flex-1 text-slate-700">{act.naam}</span>
                          <span
                            className="text-[10px] px-1.5 py-0.5 rounded"
                            style={{ backgroundColor: `${thema?.kleur}20`, color: thema?.kleur }}
                          >
                            {thema?.naam}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {activeView === 'overzicht' && (
      <>
      {/* === 4 LEVENSLOOPCYCLI - HORIZONTAL FLOW === */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500 rounded-lg shadow-sm">
              <Building className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">4 Levensloopcycli</h2>
              <p className="text-sm text-slate-500">Klik op een cyclus voor details</p>
            </div>
          </div>
        </div>
        <div className="p-4">
        <div className="flex items-center">
          {levensloopcycli.map((cyclus, index) => {
            const isHuidig = voortgang.huidigeCyclus === cyclus.id
            const cyclusVoortgang = getCyclusVoortgang(cyclus.id)
            const isAfgerond = cyclusVoortgang.percentage === 100
            const cyclusIndex = levensloopcycli.findIndex(c => c.id === voortgang.huidigeCyclus)
            const isPast = index < cyclusIndex
            const kleur = cyclusKleuren[cyclus.id]

            return (
              <div key={cyclus.id} className="flex items-center flex-1">
                <button
                  onClick={() => setGeselecteerdeCyclus(cyclus)}
                  aria-label={`Bekijk details van cyclus ${cyclus.naam}`}
                  className={`flex-1 p-4 rounded-xl text-left transition-all cursor-pointer hover:shadow-md focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${isHuidig
                      ? 'ring-2 ring-offset-2 shadow-md'
                      : isPast || isAfgerond
                        ? 'bg-slate-50'
                        : 'bg-slate-50/50'
                    }`}
                  style={{
                    backgroundColor: isHuidig ? `${kleur}10` : undefined,
                    ringColor: isHuidig ? kleur : undefined
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                      style={{ backgroundColor: kleur }}
                    >
                      {cyclus.nummer}
                    </div>
                    <div>
                      <div className="font-medium text-slate-800">{cyclus.naam}</div>
                      <div className="text-xs text-slate-500">{cyclus.duur}</div>
                    </div>
                    {(isPast || isAfgerond) && <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />}
                    {isHuidig && <Clock className="w-5 h-5 ml-auto" style={{ color: kleur }} />}
                  </div>
                  {/* Progress bar per cyclus */}
                  <div className="mt-2">
                    <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${cyclusVoortgang.percentage}%`,
                          backgroundColor: kleur
                        }}
                      />
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">{cyclusVoortgang.percentage}%</div>
                  </div>
                </button>
                {index < levensloopcycli.length - 1 && (
                  <ArrowRight className={`w-5 h-5 mx-3 ${isPast ? 'text-green-500' : 'text-slate-300'}`} />
                )}
              </div>
            )
          })}
        </div>
      </div>
      </div>

      {/* === 8 THEMA'S (met Progressive Disclosure) === */}
      <div className="bg-white rounded-xl border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all duration-200 overflow-hidden">
        <button
          onClick={() => toggleSection('themas')}
          className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500"
          aria-expanded={expandedSections.themas}
        >
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-slate-400" />
            <h2 className="font-medium text-slate-800">8 Thema's</h2>
            <span className="text-xs text-slate-500 ml-2">Doorlopend in elke cyclus</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Klik voor details</span>
            {expandedSections.themas ? (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronRight className="w-5 h-5 text-slate-400" />
            )}
          </div>
        </button>

        {expandedSections.themas && (
          <div className="p-4 pt-0 grid grid-cols-4 gap-3">
            {themas.map(thema => {
              const Icon = themaIcons[thema.id] || Circle
              const { templates, register } = getDocumentenVoorThema(thema.id)
              const docCount = templates.length + register.length

              return (
                <button
                  key={thema.id}
                  onClick={() => setGeselecteerdThema(thema)}
                  className="p-4 rounded-lg border-2 hover:shadow-md transition-all text-left group focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  style={{
                    borderColor: `${thema.kleur}40`,
                    backgroundColor: `${thema.kleur}05`
                  }}
                  aria-label={`Bekijk details van thema ${thema.naam}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: thema.kleur }}
                      >
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium text-slate-800">{thema.naam}</span>
                    </div>
                    {docCount > 0 && (
                      <span className="text-xs bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded">
                        {docCount} docs
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500">{thema.subtitel}</div>
                  {/* Bron referentie naar boek */}
                  {thema.hoofdstukken && (
                    <div className="mt-2 pt-2 border-t border-slate-100 flex items-center gap-1">
                      <BookOpen className="w-3 h-3 text-slate-400" />
                      <span className="text-[10px] text-slate-400">{thema.hoofdstukken.join(', ')}</span>
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* === 7 KERNPRINCIPES (Werken aan Programma's) === */}
      <div className="bg-white rounded-xl border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all duration-200 overflow-hidden">
        <button
          onClick={() => toggleSection('kernprincipes')}
          className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500"
          aria-expanded={expandedSections.kernprincipes}
        >
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-slate-400" />
            <h2 className="font-medium text-slate-800">7 Kernprincipes</h2>
            <span className="text-xs text-slate-500 ml-2">Fundament van de methodologie</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded">Bron: Prevaas & Van Loon</span>
            {expandedSections.kernprincipes ? (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronRight className="w-5 h-5 text-slate-400" />
            )}
          </div>
        </button>

        {expandedSections.kernprincipes && (
          <div className="p-4 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {kernprincipes.map(principe => {
                const Icon = principeIcons[principe.icon] || Shield
                return (
                  <div
                    key={principe.id}
                    className="p-4 rounded-lg border-2 border-slate-100 hover:border-slate-200 transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: principe.kleur }}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-slate-400">#{principe.id}</span>
                          <h3 className="font-semibold text-slate-800 text-sm">{principe.titel}</h3>
                        </div>
                        <p className="text-xs text-slate-600 mb-2">{principe.beschrijving}</p>

                        {/* KiB Toepassing */}
                        <div className="bg-blue-50 rounded p-2 mb-2">
                          <div className="text-[10px] text-blue-600 font-medium mb-0.5">Klant in Beeld toepassing:</div>
                          <div className="text-xs text-blue-800">{principe.kibToepassing}</div>
                        </div>

                        {/* Valkuil & Check */}
                        <div className="flex gap-2 text-[10px]">
                          <div className="flex-1 bg-red-50 rounded p-1.5">
                            <span className="text-red-600 font-medium">Valkuil: </span>
                            <span className="text-red-700">{principe.valkuil}</span>
                          </div>
                          <div className="flex-1 bg-green-50 rounded p-1.5">
                            <span className="text-green-600 font-medium">Check: </span>
                            <span className="text-green-700">{principe.check}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Bron referentie */}
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Info className="w-4 h-4" />
                <span>Deze principes komen uit "Werken aan Programma's" (Prevaas & Van Loon) en zijn de basis voor alle programma-activiteiten.</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* === BATEN PER SECTOR (met Progressive Disclosure) === */}
      <div className="bg-white rounded-xl border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all duration-200 overflow-hidden">
        <button
          onClick={() => toggleSection('baten')}
          className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500"
          aria-expanded={expandedSections.baten}
        >
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-slate-400" />
            <h2 className="font-medium text-slate-800">Baten per Sector</h2>
            <span className="text-xs text-slate-500 ml-2">6 baten × 3 sectoren</span>
          </div>
          <div className="flex items-center gap-4">
            {/* Quick priority summary (zoals Keto) */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-red-600 font-medium">3 kritiek</span>
              <span className="text-xs text-amber-600 font-medium">5 hoog</span>
              <span className="text-xs text-green-600 font-medium">10 midden</span>
            </div>
            {expandedSections.baten ? (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronRight className="w-5 h-5 text-slate-400" />
            )}
          </div>
        </button>

        {expandedSections.baten && (
          <div className="p-4 pt-0">
            {/* Baten tabel met sector-specifieke waarden */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-2 font-medium text-slate-600">Baat</th>
                    <th className="text-center py-3 px-2 font-medium text-slate-600">
                      <div className="flex items-center justify-center gap-1">
                        <div className="w-3 h-3 rounded" style={{ backgroundColor: sectoren[0].kleur }} />
                        PO
                      </div>
                    </th>
                    <th className="text-center py-3 px-2 font-medium text-slate-600">
                      <div className="flex items-center justify-center gap-1">
                        <div className="w-3 h-3 rounded" style={{ backgroundColor: sectoren[1].kleur }} />
                        VO
                      </div>
                    </th>
                    <th className="text-center py-3 px-2 font-medium text-slate-600">
                      <div className="flex items-center justify-center gap-1">
                        <div className="w-3 h-3 rounded" style={{ backgroundColor: sectoren[2].kleur }} />
                        ZAK
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {batenProfielen.slice(0, 6).map(baat => (
                    <tr key={baat.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-3 px-2">
                        <div className="font-medium text-slate-800">{baat.naam}</div>
                        <div className="text-xs text-slate-500">{baat.indicator}</div>
                      </td>
                      {['po', 'vo', 'professionals'].map((sectorId, idx) => {
                        const sectorData = baat.perSector?.[sectorId]
                        const prioriteitKleur = {
                          kritiek: 'bg-red-100 text-red-700 border-red-200',
                          hoog: 'bg-amber-100 text-amber-700 border-amber-200',
                          midden: 'bg-green-100 text-green-700 border-green-200'
                        }

                        return (
                          <td key={sectorId} className="py-3 px-2 text-center">
                            {sectorData ? (
                              <div className="space-y-1">
                                <div className="text-xs text-slate-500">
                                  {sectorData.nulmeting} → <span className="font-semibold text-slate-700">{sectorData.doel}</span>
                                </div>
                                <span className={`inline-block text-[10px] px-1.5 py-0.5 rounded border ${prioriteitKleur[sectorData.prioriteit]}`}>
                                  {sectorData.prioriteit}
                                </span>
                              </div>
                            ) : (
                              <span className="text-slate-300">-</span>
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Legenda en link naar Framework */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span className="font-medium">Prioriteit:</span>
                <div className="flex items-center gap-1">
                  <span className="px-1.5 py-0.5 rounded border bg-red-100 text-red-700 border-red-200">kritiek</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="px-1.5 py-0.5 rounded border bg-amber-100 text-amber-700 border-amber-200">hoog</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="px-1.5 py-0.5 rounded border bg-green-100 text-green-700 border-green-200">midden</span>
                </div>
              </div>
              <button
                onClick={() => navigate('/framework')}
                className="flex items-center gap-2 px-4 py-2 bg-[#003366] text-white rounded-lg hover:bg-[#002244] transition-colors text-sm focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                <span>Bekijk Baten × Domeinen Matrix</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* === WERKDOCUMENT: FASEVERLOOP (Week 1-8) === */}
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl shadow-sm border-2 border-blue-200 overflow-hidden">
        <button
          onClick={() => toggleSection('faseverloop')}
          className="w-full p-4 flex items-center justify-between hover:bg-white/50 transition-colors focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500"
          aria-expanded={expandedSections.faseverloop}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-slate-800">Faseverloop</h2>
              <span className="text-xs text-slate-500">Theorie → Praktijk: Week-voor-week met documenten</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full font-medium">
                Week {voortgang.huidigeWeek} actief
              </span>
              <span className="text-xs bg-slate-200 text-slate-600 px-2 py-1 rounded">
                {voortgang.huidigeCyclus === 'verkennen' ? 'VERKENNEN' : 'OPBOUWEN'}
              </span>
            </div>
            {expandedSections.faseverloop ? (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronRight className="w-5 h-5 text-slate-400" />
            )}
          </div>
        </button>

        {expandedSections.faseverloop && (
          <div className="p-6 pt-2 space-y-6">
            {/* VERKENNEN (Week 1-4) */}
            {(() => {
              const verkennenVoortgang = getCyclusVoortgang('verkennen')
              return (
            <div className={`rounded-xl border-2 ${voortgang.huidigeCyclus === 'verkennen' ? 'border-blue-300 bg-white' : 'border-slate-200 bg-slate-50/50'}`}>
              <div className="p-3 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold">1</div>
                  <div>
                    <div className="font-bold text-slate-800">VERKENNEN</div>
                    <div className="text-xs text-slate-500">Week 1-4 • Kiezen om de opgave aan te pakken als programma</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {/* Voortgang indicator */}
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full transition-all duration-500"
                        style={{ width: `${verkennenVoortgang.percentage}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-slate-600">{verkennenVoortgang.percentage}%</span>
                  </div>
                  {voortgang.huidigeCyclus === 'verkennen' && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">Actief</span>
                  )}
                </div>
              </div>

              <div className="p-3 space-y-2">
                {/* Week 1 */}
                <div className={`p-3 rounded-lg border ${voortgang.huidigeWeek === 1 ? 'border-blue-400 bg-blue-50 ring-2 ring-blue-200' : 'border-slate-200 bg-white'}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${voortgang.huidigeWeek > 1 ? 'bg-green-500 text-white' : voortgang.huidigeWeek === 1 ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                          {voortgang.huidigeWeek > 1 ? <CheckCircle className="w-4 h-4" /> : '1'}
                        </span>
                        <span className="font-semibold text-slate-800">Programmavoorstel</span>
                        {voortgang.huidigeWeek === 1 && <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded">Actief</span>}
                      </div>
                      <div className="ml-8 space-y-2">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <FileText className="w-4 h-4 text-slate-400" />
                          <span>Programmavoorstel (1 A4)</span>
                          <div className="ml-auto flex items-center gap-2">
                            <a
                              href="/templates/20240517-Werken-aan-Programmas-Template-programmavoorstel.docx"
                              download
                              className="flex items-center gap-1 text-xs text-green-600 hover:text-green-800 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-1 rounded"
                              aria-label="Download programmavoorstel template"
                            >
                              <Download className="w-3 h-3" />
                              Template
                            </a>
                            <button
                              className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 rounded"
                              aria-label="Upload programmavoorstel"
                            >
                              <Upload className="w-3 h-3" />
                              Upload
                            </button>
                          </div>
                        </div>
                        {/* Theorie-elementen */}
                        <div className="flex flex-wrap gap-1 mt-2">
                          <span className="text-[10px] px-2 py-0.5 bg-blue-100 text-blue-700 rounded">Stadium: VERKENNEN</span>
                          <span className="text-[10px] px-2 py-0.5 bg-purple-100 text-purple-700 rounded">Thema: Kiezen + Vormgeven</span>
                          <span className="text-[10px] px-2 py-0.5 bg-amber-100 text-amber-700 rounded">P1: Visie &gt; inspanningen</span>
                          <span className="text-[10px] px-2 py-0.5 bg-amber-100 text-amber-700 rounded">P2: Eigenaarschap</span>
                          <span className="text-[10px] px-2 py-0.5 bg-amber-100 text-amber-700 rounded">P4: Expliciet maken</span>
                        </div>
                        <div className="text-[10px] text-slate-400 flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />
                          Bron: §6.2 Programmavoorstel, Template beschikbaar
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Week 2 */}
                <div className={`p-3 rounded-lg border ${voortgang.huidigeWeek === 2 ? 'border-blue-400 bg-blue-50 ring-2 ring-blue-200' : 'border-slate-200 bg-white'}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${voortgang.huidigeWeek > 2 ? 'bg-green-500 text-white' : voortgang.huidigeWeek === 2 ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                          {voortgang.huidigeWeek > 2 ? <CheckCircle className="w-4 h-4" /> : '2'}
                        </span>
                        <span className="font-semibold text-slate-800">Sessie Baateigenaren</span>
                        {voortgang.huidigeWeek === 2 && <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded">Actief</span>}
                      </div>
                      <div className="ml-8 space-y-2">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <FileText className="w-4 h-4 text-slate-400" />
                          <span>Sessie-verslag baateigenaren</span>
                          <div className="ml-auto flex items-center gap-2">
                            <a
                              href="/templates/KiB-Template-sessie-baateigenaren.md"
                              download
                              className="flex items-center gap-1 text-xs text-green-600 hover:text-green-800 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-1 rounded"
                              aria-label="Download sessie baateigenaren template"
                            >
                              <Download className="w-3 h-3" />
                              Template
                            </a>
                            <button
                              className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 rounded"
                              aria-label="Upload sessie verslag"
                            >
                              <Upload className="w-3 h-3" />
                              Upload
                            </button>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          <span className="text-[10px] px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded">Thema: Leiden</span>
                          <span className="text-[10px] px-2 py-0.5 bg-amber-100 text-amber-700 rounded font-medium">P2: Eigenaarschap aanboren (centraal)</span>
                        </div>
                        <div className="text-[10px] text-slate-400 flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />
                          Bron: H30-H32 Leiden, Sectormanagers = Baateigenaren
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Week 3 */}
                <div className={`p-3 rounded-lg border ${voortgang.huidigeWeek === 3 ? 'border-blue-400 bg-blue-50 ring-2 ring-blue-200' : 'border-slate-200 bg-white'}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${voortgang.huidigeWeek > 3 ? 'bg-green-500 text-white' : voortgang.huidigeWeek === 3 ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                          {voortgang.huidigeWeek > 3 ? <CheckCircle className="w-4 h-4" /> : '3'}
                        </span>
                        <span className="font-semibold text-slate-800">Initiële Businesscase</span>
                        {voortgang.huidigeWeek === 3 && <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded">Actief</span>}
                      </div>
                      <div className="ml-8 space-y-2">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <FileText className="w-4 h-4 text-slate-400" />
                          <span>Businesscase v0.1</span>
                          <div className="ml-auto flex items-center gap-2">
                            <a
                              href="/templates/20240517-Werken-aan-Programmas-Template-business-case.docx"
                              download
                              className="flex items-center gap-1 text-xs text-green-600 hover:text-green-800 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-1 rounded"
                              aria-label="Download businesscase template"
                            >
                              <Download className="w-3 h-3" />
                              Template
                            </a>
                            <button
                              className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 rounded"
                              aria-label="Upload businesscase"
                            >
                              <Upload className="w-3 h-3" />
                              Upload
                            </button>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          <span className="text-[10px] px-2 py-0.5 bg-purple-100 text-purple-700 rounded">Thema: Vormgeven</span>
                          <span className="text-[10px] px-2 py-0.5 bg-amber-100 text-amber-700 rounded">P1: Visie &gt; inspanningen</span>
                          <span className="text-[10px] px-2 py-0.5 bg-amber-100 text-amber-700 rounded">P4: Expliciet maken</span>
                          <span className="text-[10px] px-2 py-0.5 bg-amber-100 text-amber-700 rounded">P7: Doel voor ogen</span>
                        </div>
                        <div className="text-[10px] text-slate-400 flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />
                          Bron: §6.2 Deliverables Verkennen, Template beschikbaar
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Week 4 - Go/No-Go */}
                <div className={`p-3 rounded-lg border-2 ${voortgang.huidigeWeek === 4 ? 'border-amber-400 bg-amber-50 ring-2 ring-amber-200' : 'border-amber-200 bg-amber-50/50'}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${voortgang.huidigeWeek > 4 ? 'bg-green-500 text-white' : voortgang.huidigeWeek === 4 ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                          {voortgang.huidigeWeek > 4 ? <CheckCircle className="w-4 h-4" /> : '4'}
                        </span>
                        <span className="font-semibold text-slate-800">Opbouwplan + Go/No-Go</span>
                        <span className="text-xs bg-amber-500 text-white px-2 py-0.5 rounded font-medium">BESLISMOMENT</span>
                      </div>
                      <div className="ml-8 space-y-2">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <FileText className="w-4 h-4 text-amber-500" />
                          <span>Opbouwopdracht</span>
                          <div className="ml-auto flex items-center gap-2">
                            <a
                              href="/templates/20240517-Werken-aan-Programmas-Template-opbouwplan.docx"
                              download
                              className="flex items-center gap-1 text-xs text-green-600 hover:text-green-800 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-1 rounded"
                              aria-label="Download opbouwplan template"
                            >
                              <Download className="w-3 h-3" />
                              Template
                            </a>
                            <button
                              className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 rounded"
                              aria-label="Upload opbouwplan"
                            >
                              <Upload className="w-3 h-3" />
                              Upload
                            </button>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          <span className="text-[10px] px-2 py-0.5 bg-red-100 text-red-700 rounded">Thema: Beslissen</span>
                          <span className="text-[10px] px-2 py-0.5 bg-amber-100 text-amber-700 rounded font-medium">P6: Integriteit besluitvorming</span>
                        </div>
                        <div className="text-[10px] text-slate-400 flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />
                          Bron: §6.2 Go/No-Go Verkenning, Sponsorgroep keurt goed
                        </div>
                        {/* Go/No-Go Button */}
                        <div className="mt-2 flex items-center gap-2">
                          {voortgang.huidigeCyclus === 'verkennen' && verkennenVoortgang.percentage >= 75 ? (
                            <button
                              onClick={() => advanceCyclus('opbouwen')}
                              className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                              <CheckCircle className="w-4 h-4" />
                              Go! Start Opbouwfase
                            </button>
                          ) : (
                            <div className="flex-1 py-2 bg-amber-100 text-amber-800 text-xs rounded-lg text-center">
                              <strong>Voorwaarde:</strong> Minimaal 75% voortgang voor Go/No-Go besluit
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Milestone */}
                {voortgang.huidigeCyclus !== 'verkennen' && (
                <div className="flex items-center gap-3 py-1">
                  <div className="flex-1 h-px bg-green-500" />
                  <div className="px-4 py-1.5 bg-green-500 text-white text-xs font-bold rounded-full flex items-center gap-2">
                    <CheckCircle className="w-3 h-3" />
                    VERKENNEN AFGEROND
                  </div>
                  <div className="flex-1 h-px bg-green-500" />
                </div>
                )}
              </div>
            </div>
              )
            })()}

            {/* OPBOUWEN (Week 5-8) */}
            {(() => {
              const opbouwenVoortgang = getCyclusVoortgang('opbouwen')
              const cyclusVolgorde = ['verkennen', 'opbouwen', 'uitvoeren', 'afbouwen']
              const isUnlocked = cyclusVolgorde.indexOf(voortgang.huidigeCyclus) >= 1
              return (
            <div className={`rounded-xl border-2 ${voortgang.huidigeCyclus === 'opbouwen' ? 'border-purple-300 bg-white' : isUnlocked ? 'border-slate-200 bg-slate-50/50' : 'border-slate-200 bg-slate-100/50 opacity-60'}`}>
              <div className="p-3 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold ${isUnlocked ? 'bg-purple-500' : 'bg-slate-400'}`}>2</div>
                  <div>
                    <div className="font-bold text-slate-800">OPBOUWEN</div>
                    <div className="text-xs text-slate-500">Week 5-8 • Programma concreet inrichten</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {isUnlocked && (
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-500 rounded-full transition-all duration-500"
                          style={{ width: `${opbouwenVoortgang.percentage}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-slate-600">{opbouwenVoortgang.percentage}%</span>
                    </div>
                  )}
                  {!isUnlocked && (
                    <span className="px-3 py-1 bg-slate-200 text-slate-500 text-xs font-medium rounded-full">Vergrendeld</span>
                  )}
                  {voortgang.huidigeCyclus === 'opbouwen' && (
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">Actief</span>
                  )}
                </div>
              </div>

              <div className="p-3 space-y-2">
                {/* Week 5-7: Bouwsessies */}
                <div className={`p-3 rounded-lg border ${voortgang.huidigeWeek >= 5 && voortgang.huidigeWeek <= 7 ? 'border-purple-400 bg-purple-50' : 'border-slate-200 bg-white'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">5-7</span>
                    <span className="font-semibold text-slate-800">Bouwsessies Baten & Inspanningen</span>
                  </div>
                  <div className="ml-8 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center justify-between text-sm text-slate-600 p-2 bg-white rounded border border-slate-100">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-slate-400" />
                          <span>Batenstructuur</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <a href="/templates/20240517-Werken-aan-Programmas-Template-batenprofiel.docx" download className="text-green-600 hover:text-green-800" title="Download template">
                            <Download className="w-3 h-3" />
                          </a>
                          <button className="text-blue-600 hover:text-blue-800" title="Upload document">
                            <Upload className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-slate-600 p-2 bg-white rounded border border-slate-100">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-slate-400" />
                          <span>Beschrijving Vermogens</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <a href="/templates/20240517-Werken-aan-Programmas-Template-beschrijving-vermogens.docx" download className="text-green-600 hover:text-green-800" title="Download template">
                            <Download className="w-3 h-3" />
                          </a>
                          <button className="text-blue-600 hover:text-blue-800" title="Upload document">
                            <Upload className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-slate-600 p-2 bg-white rounded border border-slate-100">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-slate-400" />
                          <span>Programmaplan</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <a href="/templates/20250422-Werken-aan-Programmas-Template-programmaplan.docx" download className="text-green-600 hover:text-green-800" title="Download template">
                            <Download className="w-3 h-3" />
                          </a>
                          <button className="text-blue-600 hover:text-blue-800" title="Upload document">
                            <Upload className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-slate-600 p-2 bg-white rounded border border-slate-100">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-slate-400" />
                          <span>Afhankelijkhedenlog</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <a href="/templates/20240517-Werken-aan-Programmas-Template-afhankelijkhedenlog.xlsx" download className="text-green-600 hover:text-green-800" title="Download template">
                            <Download className="w-3 h-3" />
                          </a>
                          <button className="text-blue-600 hover:text-blue-800" title="Upload document">
                            <Upload className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      <span className="text-[10px] px-2 py-0.5 bg-purple-100 text-purple-700 rounded">Activiteit: Bouwsessies (§6.3)</span>
                      <span className="text-[10px] px-2 py-0.5 bg-blue-100 text-blue-700 rounded">Batenprofiel-template</span>
                      <span className="text-[10px] px-2 py-0.5 bg-green-100 text-green-700 rounded">4 Domeinen: MPSC</span>
                    </div>
                  </div>
                </div>

                {/* Week 8 - Integratiesessie + Go/No-Go */}
                <div className="p-3 rounded-lg border-2 border-amber-200 bg-amber-50/50">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">8</span>
                    <span className="font-semibold text-slate-800">Integratiesessie + Go/No-Go</span>
                    <span className="text-xs bg-amber-500 text-white px-2 py-0.5 rounded font-medium">BESLISMOMENT</span>
                  </div>
                  <div className="ml-8 space-y-2">
                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-amber-500" />
                        <span>Cyclusplan 1 + Doelen-Inspanningennetwerk (DIN)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <a
                          href="/templates/20240517-Werken-aan-Programmas-Template-cyclusplan.docx"
                          download
                          className="flex items-center gap-1 text-xs text-green-600 hover:text-green-800 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-1 rounded"
                          aria-label="Download cyclusplan template"
                        >
                          <Download className="w-3 h-3" />
                          Template
                        </a>
                        <button
                          className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 rounded"
                          aria-label="Upload cyclusplan"
                        >
                          <Upload className="w-3 h-3" />
                          Upload
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      <span className="text-[10px] px-2 py-0.5 bg-purple-100 text-purple-700 rounded">Activiteit: DIN opstellen</span>
                      <span className="text-[10px] px-2 py-0.5 bg-blue-100 text-blue-700 rounded">Inspanningenregister</span>
                      <span className="text-[10px] px-2 py-0.5 bg-red-100 text-red-700 rounded">Thema: Beslissen</span>
                    </div>
                    {/* Go/No-Go Button */}
                    {isUnlocked && (
                    <div className="mt-2 flex items-center gap-2">
                      {voortgang.huidigeCyclus === 'opbouwen' && opbouwenVoortgang.percentage >= 75 ? (
                        <button
                          onClick={() => advanceCyclus('uitvoeren')}
                          className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Go! Start Uitvoerfase
                        </button>
                      ) : (
                        <div className="flex-1 py-2 bg-amber-100 text-amber-800 text-xs rounded-lg text-center">
                          <strong>Voorwaarde:</strong> Minimaal 75% voortgang voor Go/No-Go besluit
                        </div>
                      )}
                    </div>
                    )}
                  </div>
                </div>

                {/* Milestone */}
                {cyclusVolgorde.indexOf(voortgang.huidigeCyclus) >= 2 && (
                <div className="flex items-center gap-3 py-1">
                  <div className="flex-1 h-px bg-green-500" />
                  <div className="px-4 py-1.5 bg-green-500 text-white text-xs font-bold rounded-full flex items-center gap-2">
                    <CheckCircle className="w-3 h-3" />
                    OPBOUWEN AFGEROND - START UITVOERING
                  </div>
                  <div className="flex-1 h-px bg-green-500" />
                </div>
                )}
              </div>
            </div>
              )
            })()}

            {/* Legend */}
            <div className="flex items-center justify-between p-3 bg-slate-100 rounded-lg text-xs">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-slate-600">Afgerond</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="text-slate-600">Actief</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-slate-300" />
                  <span className="text-slate-600">Gepland</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="px-2 py-0.5 bg-amber-200 text-amber-800 rounded">Go/No-Go</span>
                  <span className="text-slate-600">Beslismoment</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-slate-500">
                <Info className="w-3 h-3" />
                <span>Principes P1-P7 gekoppeld per deliverable</span>
              </div>
            </div>

            {/* Alle Templates Overzicht */}
            <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Download className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold text-green-800">Alle Templates (Werken aan Programma's)</h3>
                </div>
                <span className="text-xs text-green-600">{documentTemplates.filter(d => d.templateBestand).length} templates beschikbaar</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {documentTemplates.filter(d => d.templateBestand).map(doc => {
                  const cyclus = levensloopcycli.find(c => c.id === doc.cyclusId)
                  return (
                    <a
                      key={doc.id}
                      href={`/templates/${doc.templateBestand}`}
                      download
                      className="flex items-center gap-2 p-2 bg-white rounded-lg border border-green-100 hover:border-green-300 hover:shadow-sm transition-all group"
                    >
                      <FileText className="w-4 h-4 text-slate-400 group-hover:text-green-600" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium text-slate-700 truncate">{doc.naam}</div>
                        <div className="text-[10px] text-slate-400">{cyclus?.naam}</div>
                      </div>
                      <Download className="w-3 h-3 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* === SECTOREN OVERZICHT === */}
      <div className="bg-white rounded-xl border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all duration-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-slate-400" />
          <h2 className="text-base font-medium text-slate-800">Sectoren</h2>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {sectoren.map(sector => (
            <button
              key={sector.id}
              onClick={() => navigate(`/sector/${sector.id}`)}
              className="p-4 rounded-lg border-2 hover:shadow-md transition-all text-left focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              style={{ borderColor: `${sector.kleur}40` }}
              aria-label={`Bekijk details van sector ${sector.naam}`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: sector.kleur }}
                >
                  {sector.afkorting}
                </div>
                <div>
                  <div className="font-medium text-slate-800">{sector.naam}</div>
                  <div className="text-xs text-slate-500">{sector.beschrijving}</div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                <span className="text-xs text-slate-500">Baateigenaar: {sector.baateigenaar.naam}</span>
                <ExternalLink className="w-4 h-4 text-slate-400" />
              </div>
            </button>
          ))}
        </div>
      </div>
      </>
      )}

      {/* Modals */}
      {geselecteerdeCyclus && (
        <CyclusDetailModal
          cyclus={geselecteerdeCyclus}
          onClose={() => setGeselecteerdeCyclus(null)}
        />
      )}
      {geselecteerdThema && (
        <ThemaDetailModal
          thema={geselecteerdThema}
          onClose={() => setGeselecteerdThema(null)}
        />
      )}
    </div>
  )
}

export default Methodologie
