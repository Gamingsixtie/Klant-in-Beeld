/**
 * Templates Pagina - Klant in Beeld
 *
 * Interactieve templates voor:
 * - Batenprofiel opstellen
 * - Programma vs Lijn checklist
 */

import { useState } from 'react'
import {
  FileText,
  Target,
  Users,
  GitBranch,
  Database,
  Heart,
  CheckCircle,
  Circle,
  AlertTriangle,
  Lightbulb,
  Building,
  Briefcase,
  Download,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Info,
  Save
} from 'lucide-react'
import {
  domeinen,
  programmaLijnChecklist,
  batenProfielen
} from '../data/programmaData'
import { useAppStore } from '../stores/appStore'

// Sector configuratie - 3 sectoren
const sectorConfig = {
  'Primair onderwijs': { short: 'PO', color: 'bg-cyan-500', bgLight: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200' },
  'Voortgezet onderwijs': { short: 'VO', color: 'bg-indigo-500', bgLight: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
  'Zakelijk Professionals': { short: 'ZP', color: 'bg-emerald-500', bgLight: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' }
}
const sectoren = ['Primair onderwijs', 'Voortgezet onderwijs', 'Zakelijk Professionals']

// Lege batenprofiel template
const leegBatenprofiel = {
  naam: '',
  omschrijving: '',
  sector: '',
  domein: '',
  eigenaar: '',
  indicator: '',
  meeteenheid: '',
  meetfrequentie: 'Maandelijks',
  nulmeting: '',
  nulmetingDatum: '',
  nulmetingBron: '',
  doel: '',
  doelDatum: '',
  domeinenImpact: {
    mens: { impact: '', toelichting: '' },
    proces: { impact: '', toelichting: '' },
    systeem: { impact: '', toelichting: '' },
    cultuur: { impact: '', toelichting: '' }
  },
  benodigd: ['', '', ''],
  risicos: ['', '']
}

function Templates() {
  const { addBaat } = useAppStore()
  const [activeTab, setActiveTab] = useState('batenprofiel')
  const [batenprofiel, setBatenprofiel] = useState(leegBatenprofiel)
  const [checklistAntwoorden, setChecklistAntwoorden] = useState(
    programmaLijnChecklist.map(item => ({ ...item, checked: false }))
  )
  const [showVoorbeeld, setShowVoorbeeld] = useState(false)
  const [saveMessage, setSaveMessage] = useState(null)

  // Batenprofiel handlers
  const updateBatenprofiel = (field, value) => {
    setBatenprofiel(prev => ({ ...prev, [field]: value }))
  }

  const updateDomeinImpact = (domeinId, field, value) => {
    setBatenprofiel(prev => ({
      ...prev,
      domeinenImpact: {
        ...prev.domeinenImpact,
        [domeinId]: {
          ...prev.domeinenImpact[domeinId],
          [field]: value
        }
      }
    }))
  }

  // Opslaan naar Baten data
  const saveToBaten = () => {
    if (!batenprofiel.naam || !batenprofiel.sector || !batenprofiel.domein) {
      setSaveMessage({ type: 'error', text: 'Vul minimaal naam, sector en domein in' })
      setTimeout(() => setSaveMessage(null), 3000)
      return
    }

    // Converteer domeinenImpact naar domeinImpact formaat
    const domeinImpact = {
      mens: batenprofiel.domeinenImpact?.mens?.impact || '',
      proces: batenprofiel.domeinenImpact?.proces?.impact || '',
      systeem: batenprofiel.domeinenImpact?.systeem?.impact || '',
      cultuur: batenprofiel.domeinenImpact?.cultuur?.impact || ''
    }

    const newBaat = {
      sector: batenprofiel.sector,
      domein: batenprofiel.domein,
      naam: batenprofiel.naam,
      beschrijving: batenprofiel.omschrijving,
      indicator: batenprofiel.indicator,
      huidigeWaarde: batenprofiel.nulmeting,
      doelWaarde: batenprofiel.doel,
      eigenaar: batenprofiel.eigenaar,
      status: 'pending',
      domeinImpact
    }

    addBaat(newBaat)
    setSaveMessage({ type: 'success', text: `Baat "${batenprofiel.naam}" opgeslagen in ${sectorConfig[batenprofiel.sector]?.short || batenprofiel.sector}` })
    setTimeout(() => setSaveMessage(null), 4000)
  }

  const updateBenodigd = (index, value) => {
    setBatenprofiel(prev => {
      const newBenodigd = [...prev.benodigd]
      newBenodigd[index] = value
      return { ...prev, benodigd: newBenodigd }
    })
  }

  const updateRisico = (index, value) => {
    setBatenprofiel(prev => {
      const newRisicos = [...prev.risicos]
      newRisicos[index] = value
      return { ...prev, risicos: newRisicos }
    })
  }

  const resetBatenprofiel = () => {
    setBatenprofiel(leegBatenprofiel)
  }

  const laadVoorbeeld = () => {
    const voorbeeld = batenProfielen[0] // Hogere klanttevredenheid
    setBatenprofiel({
      naam: voorbeeld.naam,
      omschrijving: voorbeeld.omschrijving,
      sector: 'Primair onderwijs',
      domein: 'Cultuur',
      eigenaar: voorbeeld.eigenaar,
      indicator: voorbeeld.indicator,
      meeteenheid: voorbeeld.meeteenheid,
      meetfrequentie: voorbeeld.meetfrequentie,
      nulmeting: voorbeeld.nulmeting.waarde,
      nulmetingDatum: voorbeeld.nulmeting.datum,
      nulmetingBron: voorbeeld.nulmeting.bron,
      doel: voorbeeld.doel.waarde,
      doelDatum: voorbeeld.doel.datum,
      domeinenImpact: voorbeeld.domeinen,
      benodigd: [...voorbeeld.benodigd, ''],
      risicos: [...voorbeeld.risicos, '']
    })
  }

  // Checklist handlers
  const toggleChecklistItem = (index) => {
    setChecklistAntwoorden(prev => {
      const newAntwoorden = [...prev]
      newAntwoorden[index] = { ...newAntwoorden[index], checked: !newAntwoorden[index].checked }
      return newAntwoorden
    })
  }

  const resetChecklist = () => {
    setChecklistAntwoorden(programmaLijnChecklist.map(item => ({ ...item, checked: false })))
  }

  // Bereken checklist resultaat
  const getChecklistResultaat = () => {
    const checked = checklistAntwoorden.filter(item => item.checked)
    const programmaScore = checked.filter(item => item.programma).length
    const lijnScore = checked.filter(item => item.lijn).length

    if (checked.length === 0) return { type: 'none', message: 'Beantwoord de vragen om te bepalen of dit Programma of Lijn is' }
    if (programmaScore > lijnScore) return { type: 'programma', message: `Dit is een PROGRAMMA-activiteit (${programmaScore} programma-indicatoren)` }
    if (lijnScore > programmaScore) return { type: 'lijn', message: `Dit is een LIJN-activiteit (${lijnScore} lijn-indicatoren)` }
    return { type: 'both', message: 'Gelijke score - bespreek in de programmaraad' }
  }

  const checklistResultaat = getChecklistResultaat()

  // Check completeness van batenprofiel
  const getBatenprofielCompleteness = () => {
    const fields = [
      batenprofiel.naam,
      batenprofiel.sector,
      batenprofiel.domein,
      batenprofiel.omschrijving,
      batenprofiel.eigenaar,
      batenprofiel.indicator,
      batenprofiel.nulmeting,
      batenprofiel.doel
    ]
    const filled = fields.filter(f => f && f.trim() !== '').length
    return Math.round((filled / 8) * 100)
  }

  // Check of opslaan mogelijk is
  const canSave = batenprofiel.naam && batenprofiel.sector && batenprofiel.domein

  const domeinIcons = {
    mens: Users,
    proces: GitBranch,
    systeem: Database,
    cultuur: Heart
  }

  const domeinKleuren = {
    mens: '#3b82f6',
    proces: '#10b981',
    systeem: '#8b5cf6',
    cultuur: '#f59e0b'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#003366] to-[#0066cc] rounded-xl p-6 text-white">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="w-5 h-5" />
          <span className="text-white/80 text-sm">Werkvormen</span>
        </div>
        <h1 className="text-2xl font-bold">Templates</h1>
        <p className="text-white/80 mt-2 max-w-3xl">
          Interactieve templates om batenprofielen op te stellen en te bepalen of iets bij het programma of de lijn hoort.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('batenprofiel')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            activeTab === 'batenprofiel'
              ? 'bg-[#003366] text-white'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            <span>Batenprofiel</span>
          </div>
        </button>
        <button
          onClick={() => setActiveTab('programma-lijn')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            activeTab === 'programma-lijn'
              ? 'bg-[#003366] text-white'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            <span>Programma vs Lijn</span>
          </div>
        </button>
      </div>

      {/* Batenprofiel Template */}
      {activeTab === 'batenprofiel' && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">Batenprofiel Opstellen</h2>
              <p className="text-sm text-slate-500">Definieer een meetbare baat volgens het KiB-format</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm text-slate-500">
                Compleet: <span className="font-semibold text-[#003366]">{getBatenprofielCompleteness()}%</span>
              </div>
              <button
                onClick={laadVoorbeeld}
                className="px-3 py-1.5 text-sm bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors flex items-center gap-1"
              >
                <Lightbulb className="w-4 h-4" />
                Voorbeeld
              </button>
              <button
                onClick={resetBatenprofiel}
                className="px-3 py-1.5 text-sm bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-1"
              >
                <RefreshCw className="w-4 h-4" />
                Reset
              </button>
            </div>
          </div>

          {/* Save message */}
          {saveMessage && (
            <div className={`mb-4 p-4 rounded-lg border ${
              saveMessage.type === 'success'
                ? 'bg-green-50 border-green-200 text-green-800'
                : 'bg-red-50 border-red-200 text-red-800'
            }`}>
              <div className="flex items-center gap-2">
                {saveMessage.type === 'success' ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <AlertTriangle className="w-5 h-5" />
                )}
                <span className="font-medium">{saveMessage.text}</span>
              </div>
            </div>
          )}

          {/* Sector en Domein selectie - NIEUW */}
          <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <h3 className="font-semibold text-slate-800 mb-3">Voor welke sector en domein is deze baat?</h3>
            <div className="grid grid-cols-2 gap-4">
              {/* Sector selectie */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Sector *</label>
                <div className="flex gap-2">
                  {sectoren.map(s => {
                    const config = sectorConfig[s]
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => updateBatenprofiel('sector', s)}
                        className={`flex-1 p-3 rounded-xl border-2 transition-all ${
                          batenprofiel.sector === s
                            ? `${config.bgLight} ${config.border} ${config.text}`
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <p className={`text-lg font-bold text-center ${batenprofiel.sector === s ? config.text : 'text-slate-600'}`}>
                          {config.short}
                        </p>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Domein selectie */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Domein *</label>
                <div className="flex gap-2">
                  {['Mens', 'Proces', 'Systeem', 'Cultuur'].map(d => {
                    const kleur = domeinKleuren[d.toLowerCase()]
                    const Icon = domeinIcons[d.toLowerCase()]
                    return (
                      <button
                        key={d}
                        type="button"
                        onClick={() => updateBatenprofiel('domein', d)}
                        className={`flex-1 p-3 rounded-xl border-2 transition-all ${
                          batenprofiel.domein === d
                            ? 'border-current bg-white'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                        style={{ borderColor: batenprofiel.domein === d ? kleur : undefined }}
                      >
                        <Icon className="w-5 h-5 mx-auto mb-1" style={{ color: batenprofiel.domein === d ? kleur : '#94a3b8' }} />
                        <p className={`text-xs font-medium text-center`} style={{ color: batenprofiel.domein === d ? kleur : '#64748b' }}>
                          {d}
                        </p>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Formulering tip */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Formuleringsregel:</p>
                <p>Gebruik <strong>zelfstandig naamwoord + vergrotende trap</strong>. Bijvoorbeeld: "Hogere klanttevredenheid", "Lagere uitstroom", "Betere aansluiting".</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basis informatie */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Naam van de baat <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={batenprofiel.naam}
                  onChange={(e) => updateBatenprofiel('naam', e.target.value)}
                  placeholder="Bijv. Hogere klanttevredenheid"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Bateneigenaar <span className="text-red-500">*</span>
                </label>
                <select
                  value={batenprofiel.eigenaar}
                  onChange={(e) => updateBatenprofiel('eigenaar', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                >
                  <option value="">Selecteer eigenaar...</option>
                  <option value="Sectormanager PO">Sectormanager PO</option>
                  <option value="Sectormanager VO">Sectormanager VO</option>
                  <option value="Sectormanager Zakelijk">Sectormanager Zakelijk</option>
                  <option value="Alle sectormanagers (gezamenlijk)">Alle sectormanagers (gezamenlijk)</option>
                  <option value="Programma-eigenaar">Programma-eigenaar</option>
                  <option value="Programmamanager">Programmamanager</option>
                  <option value="Data & Tech manager">Data & Tech manager</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Indicator / KPI <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={batenprofiel.indicator}
                  onChange={(e) => updateBatenprofiel('indicator', e.target.value)}
                  placeholder="Bijv. Net Promoter Score (NPS)"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Meeteenheid</label>
                  <input
                    type="text"
                    value={batenprofiel.meeteenheid}
                    onChange={(e) => updateBatenprofiel('meeteenheid', e.target.value)}
                    placeholder="Bijv. %, dagen, aantal"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Meetfrequentie</label>
                  <select
                    value={batenprofiel.meetfrequentie}
                    onChange={(e) => updateBatenprofiel('meetfrequentie', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                  >
                    <option value="Wekelijks">Wekelijks</option>
                    <option value="Maandelijks">Maandelijks</option>
                    <option value="Kwartaal">Per kwartaal</option>
                    <option value="Jaarlijks">Jaarlijks</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Nulmeting en Doel */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Omschrijving <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={batenprofiel.omschrijving}
                  onChange={(e) => updateBatenprofiel('omschrijving', e.target.value)}
                  placeholder="Waarom is deze baat belangrijk? Wat verandert er?"
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Nulmeting <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={batenprofiel.nulmeting}
                    onChange={(e) => updateBatenprofiel('nulmeting', e.target.value)}
                    placeholder="Bijv. +15"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Datum</label>
                  <input
                    type="text"
                    value={batenprofiel.nulmetingDatum}
                    onChange={(e) => updateBatenprofiel('nulmetingDatum', e.target.value)}
                    placeholder="2025-09"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Bron</label>
                  <input
                    type="text"
                    value={batenprofiel.nulmetingBron}
                    onChange={(e) => updateBatenprofiel('nulmetingBron', e.target.value)}
                    placeholder="CRM, Enquête..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Doelwaarde <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={batenprofiel.doel}
                    onChange={(e) => updateBatenprofiel('doel', e.target.value)}
                    placeholder="Bijv. +35"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Doeldatum</label>
                  <input
                    type="text"
                    value={batenprofiel.doelDatum}
                    onChange={(e) => updateBatenprofiel('doelDatum', e.target.value)}
                    placeholder="2027-09"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Domeinen Impact */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <h3 className="font-semibold text-slate-800 mb-4">Impact per domein (optioneel)</h3>
            <div className="grid grid-cols-4 gap-4">
              {Object.entries(domeinKleuren).map(([domeinId, kleur]) => {
                const Icon = domeinIcons[domeinId]
                const domeinNaam = domeinId.charAt(0).toUpperCase() + domeinId.slice(1)
                return (
                  <div
                    key={domeinId}
                    className="p-4 rounded-lg border-2 border-slate-200"
                    style={{ borderLeftColor: kleur, borderLeftWidth: '4px' }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Icon className="w-5 h-5" style={{ color: kleur }} />
                      <span className="font-medium text-slate-700">{domeinNaam}</span>
                    </div>
                    <div className="space-y-2">
                      <select
                        value={batenprofiel.domeinenImpact[domeinId]?.impact || ''}
                        onChange={(e) => updateDomeinImpact(domeinId, 'impact', e.target.value)}
                        className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                      >
                        <option value="">Impact...</option>
                        <option value="hoog">Hoog</option>
                        <option value="midden">Midden</option>
                        <option value="laag">Laag</option>
                      </select>
                      <input
                        type="text"
                        value={batenprofiel.domeinenImpact[domeinId]?.toelichting || ''}
                        onChange={(e) => updateDomeinImpact(domeinId, 'toelichting', e.target.value)}
                        placeholder="Toelichting..."
                        className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Benodigd en Risico's */}
          <div className="mt-6 pt-6 border-t border-slate-200 grid grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-slate-800 mb-3">Wat is er nodig?</h3>
              <div className="space-y-2">
                {batenprofiel.benodigd.map((item, index) => (
                  <input
                    key={index}
                    type="text"
                    value={item}
                    onChange={(e) => updateBenodigd(index, e.target.value)}
                    placeholder={`Benodigd ${index + 1}...`}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                  />
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 mb-3">Risico's</h3>
              <div className="space-y-2">
                {batenprofiel.risicos.map((item, index) => (
                  <input
                    key={index}
                    type="text"
                    value={item}
                    onChange={(e) => updateRisico(index, e.target.value)}
                    placeholder={`Risico ${index + 1}...`}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Preview */}
          {batenprofiel.naam && (
            <div className="mt-6 pt-6 border-t border-slate-200">
              <button
                onClick={() => setShowVoorbeeld(!showVoorbeeld)}
                className="flex items-center gap-2 text-sm font-medium text-[#003366] hover:text-[#0066cc]"
              >
                {showVoorbeeld ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                {showVoorbeeld ? 'Verberg preview' : 'Toon preview'}
              </button>

              {showVoorbeeld && (
                <div className="mt-4 p-4 bg-slate-50 rounded-lg">
                  <h4 className="font-semibold text-slate-800 mb-2">{batenprofiel.naam || '[Naam]'}</h4>
                  <p className="text-sm text-slate-600 mb-3">{batenprofiel.omschrijving || '[Omschrijving]'}</p>
                  <div className="grid grid-cols-5 gap-4 text-sm">
                    <div>
                      <span className="text-slate-500">Sector:</span>
                      <div className="font-medium">{sectorConfig[batenprofiel.sector]?.short || batenprofiel.sector || '-'}</div>
                    </div>
                    <div>
                      <span className="text-slate-500">Domein:</span>
                      <div className="font-medium">{batenprofiel.domein || '-'}</div>
                    </div>
                    <div>
                      <span className="text-slate-500">Indicator:</span>
                      <div className="font-medium">{batenprofiel.indicator || '-'}</div>
                    </div>
                    <div>
                      <span className="text-slate-500">Nulmeting:</span>
                      <div className="font-medium">{batenprofiel.nulmeting || '-'}</div>
                    </div>
                    <div>
                      <span className="text-slate-500">Doel:</span>
                      <div className="font-medium">{batenprofiel.doel || '-'}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Opslaan naar Baten */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-600">
                {canSave ? (
                  <span className="text-green-600 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Klaar om op te slaan naar Baten
                  </span>
                ) : (
                  <span className="text-amber-600 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Vul minimaal naam, sector en domein in om op te slaan
                  </span>
                )}
              </div>
              <button
                onClick={saveToBaten}
                disabled={!canSave}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-colors ${
                  canSave
                    ? 'bg-[#003366] text-white hover:bg-[#0066cc]'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Save className="w-5 h-5" />
                Opslaan naar Baten
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Programma vs Lijn Checklist */}
      {activeTab === 'programma-lijn' && (
        <div className="space-y-6">
          {/* Uitleg */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Lightbulb className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h2 className="font-semibold text-amber-900 mb-2">De gouden regel</h2>
                <p className="text-amber-800">
                  "Is dit iets <strong>NIEUWS</strong> dat ontwikkeld moet worden?" → <strong>JA = Programma</strong>, <strong>NEE = Lijn</strong>
                </p>
                <p className="text-sm text-amber-700 mt-2">
                  Het programma ONTWIKKELT nieuwe werkwijzen, de lijn VOERT UIT en BORGT.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Checklist */}
            <div className="col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-slate-800">Checklist</h2>
                  <p className="text-sm text-slate-500">Vink aan wat van toepassing is op jouw activiteit</p>
                </div>
                <button
                  onClick={resetChecklist}
                  className="px-3 py-1.5 text-sm bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-1"
                >
                  <RefreshCw className="w-4 h-4" />
                  Reset
                </button>
              </div>

              <div className="space-y-3">
                {checklistAntwoorden.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => toggleChecklistItem(index)}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      item.checked
                        ? item.programma
                          ? 'border-[#003366] bg-[#003366]/5'
                          : 'border-green-500 bg-green-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 ${item.checked ? 'text-[#003366]' : 'text-slate-300'}`}>
                        {item.checked ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <Circle className="w-5 h-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-slate-800">{item.vraag}</div>
                        <div className="text-sm text-slate-500 mt-1">{item.toelichting}</div>
                      </div>
                      <div className="flex gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          item.programma
                            ? 'bg-[#003366] text-white'
                            : 'bg-slate-100 text-slate-400'
                        }`}>
                          Programma
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          item.lijn
                            ? 'bg-green-500 text-white'
                            : 'bg-slate-100 text-slate-400'
                        }`}>
                          Lijn
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Resultaat */}
            <div className="space-y-6">
              {/* Score */}
              <div className={`rounded-xl p-6 ${
                checklistResultaat.type === 'programma'
                  ? 'bg-[#003366] text-white'
                  : checklistResultaat.type === 'lijn'
                  ? 'bg-green-500 text-white'
                  : 'bg-slate-100 text-slate-600'
              }`}>
                <div className="flex items-center gap-3 mb-4">
                  {checklistResultaat.type === 'programma' ? (
                    <Briefcase className="w-8 h-8" />
                  ) : checklistResultaat.type === 'lijn' ? (
                    <Building className="w-8 h-8" />
                  ) : (
                    <AlertTriangle className="w-8 h-8" />
                  )}
                  <div>
                    <div className="text-lg font-bold">
                      {checklistResultaat.type === 'programma'
                        ? 'PROGRAMMA'
                        : checklistResultaat.type === 'lijn'
                        ? 'LIJN'
                        : 'Nog onbepaald'}
                    </div>
                  </div>
                </div>
                <p className="text-sm opacity-90">{checklistResultaat.message}</p>
              </div>

              {/* Toelichting */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="font-semibold text-slate-800 mb-4">Wat betekent dit?</h3>

                <div className="space-y-4">
                  <div className="p-3 bg-[#003366]/5 rounded-lg border-l-4 border-[#003366]">
                    <div className="flex items-center gap-2 mb-1">
                      <Briefcase className="w-4 h-4 text-[#003366]" />
                      <span className="font-medium text-[#003366]">Programma</span>
                    </div>
                    <ul className="text-xs text-slate-600 space-y-1 ml-6">
                      <li>• Ontwikkelt nieuwe werkwijzen</li>
                      <li>• Piloteren en experimenteren</li>
                      <li>• Externe expertise inschakelen</li>
                      <li>• Sectoroverstijgende coördinatie</li>
                    </ul>
                  </div>

                  <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <div className="flex items-center gap-2 mb-1">
                      <Building className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-green-600">Lijn</span>
                    </div>
                    <ul className="text-xs text-slate-600 space-y-1 ml-6">
                      <li>• Uitvoeren van werkwijzen</li>
                      <li>• Borgen en onderhouden</li>
                      <li>• Continu verbeteren</li>
                      <li>• Reguliere aansturing</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Tip */}
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-blue-600 mt-0.5" />
                  <p className="text-xs text-blue-800">
                    Bij twijfel: bespreek het in de programmaraad. Het is beter om even te checken dan om werk dubbel te doen of te laten liggen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Templates
