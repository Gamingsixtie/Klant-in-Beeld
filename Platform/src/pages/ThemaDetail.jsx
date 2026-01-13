import { useParams, useNavigate } from 'react-router-dom'
import { useMethodologieStore } from '../stores/methodologieStore'
import { themas, levensloopcycli, activiteiten, documentTemplates } from '../data/methodologie'
import {
  ArrowLeft,
  CheckCircle,
  Circle,
  Clock,
  FileText,
  ChevronDown,
  ChevronUp,
  AlertTriangle
} from 'lucide-react'
import { useState } from 'react'

function ThemaDetail() {
  const { themaId } = useParams()
  const navigate = useNavigate()
  const {
    voortgang,
    toggleChecklistItem,
    getThemaVoortgang,
    getActiviteitStatus,
    getDocumentStatus,
    updateDocument
  } = useMethodologieStore()

  const [expandedActiviteit, setExpandedActiviteit] = useState(null)

  const thema = themas.find(t => t.id === themaId)
  if (!thema) return <div>Thema niet gevonden</div>

  // Haal activiteiten voor dit thema in de huidige cyclus
  const themaActiviteiten = activiteiten
    .filter(a => a.themaId === themaId && a.cyclusId === voortgang.huidigeCyclus)
    .sort((a, b) => a.volgorde - b.volgorde)

  // Documenten voor dit thema in huidige cyclus
  const themaDocumenten = documentTemplates.filter(
    d => d.themaId === themaId && d.cyclusId === voortgang.huidigeCyclus
  )

  const huidigeCyclus = levensloopcycli.find(c => c.id === voortgang.huidigeCyclus)
  const themaVoortgang = getThemaVoortgang(themaId, voortgang.huidigeCyclus)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/methodologie')}
          className="p-2 hover:bg-slate-100 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div
              className="px-3 py-1 rounded-full text-sm font-medium"
              style={{ backgroundColor: `${thema.kleur}20`, color: thema.kleur }}
            >
              Thema {thema.nummer}
            </div>
            <span className="text-slate-400">|</span>
            <span className="text-slate-500">{huidigeCyclus?.naam}</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mt-1">{thema.naam}</h1>
          <p className="text-slate-500">{thema.beschrijving}</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold" style={{ color: thema.kleur }}>
            {themaVoortgang.percentage}%
          </div>
          <div className="text-sm text-slate-500">
            {themaVoortgang.completed}/{themaVoortgang.total} activiteiten
          </div>
        </div>
      </div>

      {/* Kernvragen */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-3">Kernvragen</h2>
        <ul className="space-y-2">
          {thema.kernvragen.map((vraag, i) => (
            <li key={i} className="flex items-start gap-2 text-slate-600">
              <span className="text-slate-400">•</span>
              {vraag}
            </li>
          ))}
        </ul>
      </div>

      {/* Activiteiten */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-800">
          Activiteiten in {huidigeCyclus?.naam}
        </h2>

        {themaActiviteiten.length === 0 ? (
          <div className="bg-slate-50 rounded-xl p-8 text-center">
            <p className="text-slate-500">
              Geen activiteiten voor dit thema in de {huidigeCyclus?.naam} fase.
            </p>
          </div>
        ) : (
          themaActiviteiten.map((activiteit, index) => {
            const activiteitData = voortgang.activiteiten[activiteit.id] || {}
            const status = activiteitData.status || 'not_started'
            const completedItems = activiteitData.completedItems || []
            const isExpanded = expandedActiviteit === activiteit.id

            return (
              <div
                key={activiteit.id}
                className={`bg-white rounded-xl shadow-sm border-2 transition-all ${
                  status === 'completed'
                    ? 'border-green-200'
                    : status === 'in_progress'
                    ? 'border-blue-200'
                    : 'border-slate-200'
                }`}
              >
                {/* Header */}
                <button
                  onClick={() => setExpandedActiviteit(isExpanded ? null : activiteit.id)}
                  className="w-full p-4 flex items-center gap-4 text-left"
                >
                  <div className={`p-2 rounded-full ${
                    status === 'completed'
                      ? 'bg-green-100'
                      : status === 'in_progress'
                      ? 'bg-blue-100'
                      : 'bg-slate-100'
                  }`}>
                    {status === 'completed' ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : status === 'in_progress' ? (
                      <Clock className="w-5 h-5 text-blue-600" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-400" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-400">Stap {index + 1}</span>
                      {activiteit.isGoNogo && (
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-xs font-medium">
                          Go/No-Go
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-slate-800">{activiteit.naam}</h3>
                    <p className="text-sm text-slate-500">{activiteit.beschrijving}</p>
                  </div>

                  <div className="text-right mr-2">
                    <div className="text-sm text-slate-500">
                      {completedItems.length}/{activiteit.checklistItems?.length || 0}
                    </div>
                  </div>

                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </button>

                {/* Expanded content */}
                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-slate-100">
                    {/* Checklist */}
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-slate-700 mb-2">Checklist</h4>
                      <div className="space-y-2">
                        {activiteit.checklistItems?.map((item, i) => {
                          const isChecked = completedItems.includes(item)
                          return (
                            <label
                              key={i}
                              className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => toggleChecklistItem(activiteit.id, item)}
                                className="w-5 h-5 rounded border-slate-300 text-[#003366] focus:ring-[#003366]"
                              />
                              <span className={isChecked ? 'text-slate-500 line-through' : 'text-slate-700'}>
                                {item}
                              </span>
                            </label>
                          )
                        })}
                      </div>
                    </div>

                    {/* Deliverables */}
                    {activiteit.deliverables && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-slate-700 mb-2">Deliverables</h4>
                        <div className="flex flex-wrap gap-2">
                          {activiteit.deliverables.map((del, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-sm flex items-center gap-1"
                            >
                              <FileText className="w-4 h-4" />
                              {del}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Datum */}
                    {activiteitData.datum && (
                      <div className="mt-4 text-sm text-slate-500">
                        Laatst bijgewerkt: {activiteitData.datum}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>

      {/* Documenten */}
      {themaDocumenten.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Documenten</h2>
          <div className="space-y-3">
            {themaDocumenten.map((doc) => {
              const docData = voortgang.documenten[doc.id] || {}
              const docStatus = docData.status || 'not_started'

              return (
                <div
                  key={doc.id}
                  className={`flex items-center gap-4 p-4 rounded-lg border ${
                    docStatus === 'completed'
                      ? 'bg-green-50 border-green-200'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <FileText className={`w-5 h-5 ${
                    docStatus === 'completed' ? 'text-green-600' : 'text-slate-400'
                  }`} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-800">{doc.naam}</span>
                      {doc.verplicht && (
                        <span className="px-1.5 py-0.5 bg-red-100 text-red-700 rounded text-xs">
                          Verplicht
                        </span>
                      )}
                    </div>
                    {docData.path && (
                      <div className="text-sm text-slate-500">{docData.path}</div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {docData.versie && (
                      <span className="text-sm text-slate-400">v{docData.versie}</span>
                    )}
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      docStatus === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : docStatus === 'in_progress'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {docStatus === 'completed' ? 'Gereed' : docStatus === 'in_progress' ? 'In bewerking' : 'Nog te maken'}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Navigatie naar vorige/volgende thema */}
      <div className="flex justify-between">
        {thema.nummer > 1 && (
          <button
            onClick={() => navigate(`/thema/${themas[thema.nummer - 2].id}`)}
            className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            {themas[thema.nummer - 2].naam}
          </button>
        )}
        <div className="flex-1" />
        {thema.nummer < 8 && (
          <button
            onClick={() => navigate(`/thema/${themas[thema.nummer].id}`)}
            className="flex items-center gap-2 px-4 py-2 bg-[#003366] text-white rounded-lg hover:bg-[#0066cc]"
          >
            {themas[thema.nummer].naam}
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </button>
        )}
      </div>
    </div>
  )
}

export default ThemaDetail
