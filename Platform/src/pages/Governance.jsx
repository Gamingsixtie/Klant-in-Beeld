/**
 * Governance Pagina - Klant in Beeld
 *
 * Bevat:
 * - Visueel organigram (interactief)
 * - Uitgebreide RACI matrix (editeerbaar)
 * - Rollen en verantwoordelijkheden
 * - Overlegstructuur
 * - Stakeholder management
 */

import { useState } from 'react'
import { governanceStructuur, sectoren, kibTeam } from '../data/programmaData'
import { useAppStore } from '../stores/appStore'
import {
  Users,
  User,
  Crown,
  Shield,
  Building2,
  ChevronDown,
  ArrowDown,
  CheckCircle,
  Circle,
  Briefcase,
  Target,
  Calendar,
  MessageSquare,
  TrendingUp,
  Wrench,
  Megaphone,
  Palette,
  ExternalLink,
  Edit2,
  Plus,
  X,
  Trash2,
  Save
} from 'lucide-react'

// Stakeholder Form Component
function StakeholderForm({ stakeholder, onSave, onCancel }) {
  const [form, setForm] = useState(stakeholder || {
    naam: '',
    rol: '',
    functie: '',
    email: '',
    telefoon: '',
    afdeling: '',
    belang: 'medium',
    invloed: 'medium',
    notities: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(form)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-800">
            {stakeholder ? 'Stakeholder bewerken' : 'Nieuwe stakeholder'}
          </h2>
          <button onClick={onCancel} className="p-2 hover:bg-slate-100 rounded-lg">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Naam</label>
              <input
                type="text"
                value={form.naam}
                onChange={(e) => setForm({ ...form, naam: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Rol</label>
              <select
                value={form.rol}
                onChange={(e) => setForm({ ...form, rol: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                required
              >
                <option value="">Selecteer...</option>
                <option value="Programma-eigenaar">Programma-eigenaar</option>
                <option value="Programmamanager">Programmamanager</option>
                <option value="Baateigenaar">Baateigenaar</option>
                <option value="Inspanningsleider">Inspanningsleider</option>
                <option value="Programmaraad lid">Programmaraad lid</option>
                <option value="Stakeholder">Stakeholder</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Functie</label>
              <input
                type="text"
                value={form.functie}
                onChange={(e) => setForm({ ...form, functie: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Afdeling</label>
              <input
                type="text"
                value={form.afdeling}
                onChange={(e) => setForm({ ...form, afdeling: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Telefoon</label>
              <input
                type="tel"
                value={form.telefoon}
                onChange={(e) => setForm({ ...form, telefoon: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Belang</label>
              <select
                value={form.belang}
                onChange={(e) => setForm({ ...form, belang: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
              >
                <option value="low">Laag</option>
                <option value="medium">Medium</option>
                <option value="high">Hoog</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Invloed</label>
              <select
                value={form.invloed}
                onChange={(e) => setForm({ ...form, invloed: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
              >
                <option value="low">Laag</option>
                <option value="medium">Medium</option>
                <option value="high">Hoog</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Notities</label>
            <textarea
              value={form.notities}
              onChange={(e) => setForm({ ...form, notities: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onCancel} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg">
              Annuleren
            </button>
            <button type="submit" className="px-4 py-2 bg-[#003366] text-white rounded-lg hover:bg-[#0066cc] flex items-center gap-2">
              <Save className="w-4 h-4" />
              Opslaan
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Icon mapping voor KIB Team pijlers
const pijlerIcons = {
  competentie: TrendingUp,
  tools: Wrench,
  evangelie: Megaphone,
  studio: Palette
}

const pijlerKleuren = {
  competentie: { bg: 'bg-blue-100', border: 'border-blue-300', text: 'text-blue-700', icon: 'text-blue-600' },
  tools: { bg: 'bg-amber-100', border: 'border-amber-300', text: 'text-amber-700', icon: 'text-amber-600' },
  evangelie: { bg: 'bg-green-100', border: 'border-green-300', text: 'text-green-700', icon: 'text-green-600' },
  studio: { bg: 'bg-purple-100', border: 'border-purple-300', text: 'text-purple-700', icon: 'text-purple-600' }
}

function Governance() {
  const { stakeholders, addStakeholder, updateStakeholder, deleteStakeholder } = useAppStore()
  const [showStakeholderForm, setShowStakeholderForm] = useState(false)
  const [editingStakeholder, setEditingStakeholder] = useState(null)
  const [selectedRole, setSelectedRole] = useState(null)
  const [activeTab, setActiveTab] = useState('organigram') // 'organigram' | 'stakeholders' | 'raci'

  // Helper: Get stakeholders by role from appStore
  const getStakeholdersByRole = (role) => stakeholders.filter(s => s.rol === role)
  const programmaEigenaar = getStakeholdersByRole('Programma-eigenaar')[0]
  const programmaManager = getStakeholdersByRole('Programmamanager')[0]
  const baateigenaren = getStakeholdersByRole('Baateigenaar')
  const inspanningsleiders = getStakeholdersByRole('Inspanningsleider')
  const programmaraadLeden = getStakeholdersByRole('Programmaraad lid')

  const handleSaveStakeholder = (form) => {
    if (editingStakeholder) {
      updateStakeholder(editingStakeholder.id, form)
    } else {
      addStakeholder(form)
    }
    setShowStakeholderForm(false)
    setEditingStakeholder(null)
  }

  const handleEditStakeholder = (stakeholder) => {
    setEditingStakeholder(stakeholder)
    setShowStakeholderForm(true)
  }

  const handleDeleteStakeholder = (id) => {
    if (confirm('Weet je zeker dat je deze stakeholder wilt verwijderen?')) {
      deleteStakeholder(id)
    }
  }

  // Group stakeholders by role
  const stakeholdersByRole = stakeholders.reduce((acc, s) => {
    const role = s.rol || 'Overig'
    if (!acc[role]) acc[role] = []
    acc[role].push(s)
    return acc
  }, {})

  const roleColors = {
    'Programma-eigenaar': { bg: 'bg-amber-100', border: 'border-amber-300', text: 'text-amber-800' },
    'Programmamanager': { bg: 'bg-blue-100', border: 'border-blue-300', text: 'text-blue-800' },
    'Baateigenaar': { bg: 'bg-green-100', border: 'border-green-300', text: 'text-green-800' },
    'Inspanningsleider': { bg: 'bg-slate-100', border: 'border-slate-300', text: 'text-slate-800' },
    'Programmaraad lid': { bg: 'bg-purple-100', border: 'border-purple-300', text: 'text-purple-800' },
    'Stakeholder': { bg: 'bg-cyan-100', border: 'border-cyan-300', text: 'text-cyan-800' }
  }

  // RACI Matrix data voor Klant in Beeld - nu editeerbaar via state
  const [raciMatrix, setRaciMatrix] = useState([
    // Strategisch
    { id: 1, categorie: 'Strategisch', activiteit: 'Programmavisie vaststellen', pe: 'A', pm: 'R', pr: 'C', be: 'I', il: 'I' },
    { id: 2, categorie: 'Strategisch', activiteit: 'Budget vrijmaken en goedkeuren', pe: 'A', pm: 'C', pr: 'R', be: 'I', il: 'I' },
    { id: 3, categorie: 'Strategisch', activiteit: 'Go/No-Go besluiten nemen', pe: 'A', pm: 'R', pr: 'A', be: 'C', il: 'I' },
    { id: 4, categorie: 'Strategisch', activiteit: 'Batenstructuur vaststellen', pe: 'A', pm: 'R', pr: 'C', be: 'C', il: 'I' },
    // Tactisch
    { id: 5, categorie: 'Tactisch', activiteit: 'Programmaplan opstellen', pe: 'A', pm: 'R', pr: 'C', be: 'C', il: 'I' },
    { id: 6, categorie: 'Tactisch', activiteit: 'Roadmap beheren', pe: 'C', pm: 'R', pr: 'I', be: 'C', il: 'I' },
    { id: 7, categorie: 'Tactisch', activiteit: 'Voortgang rapporteren', pe: 'I', pm: 'R', pr: 'I', be: 'C', il: 'C' },
    { id: 8, categorie: 'Tactisch', activiteit: 'Risico\'s escaleren', pe: 'I', pm: 'R', pr: 'A', be: 'C', il: 'C' },
    { id: 9, categorie: 'Tactisch', activiteit: 'Stakeholders managen', pe: 'C', pm: 'R', pr: 'I', be: 'C', il: 'I' },
    // Operationeel per sector
    { id: 10, categorie: 'Operationeel (Sector)', activiteit: 'Klantreizen analyseren (AS-IS)', pe: 'I', pm: 'C', pr: 'I', be: 'A', il: 'R' },
    { id: 11, categorie: 'Operationeel (Sector)', activiteit: 'Verbeteringen ontwerpen (TO-BE)', pe: 'I', pm: 'C', pr: 'I', be: 'A', il: 'R' },
    { id: 12, categorie: 'Operationeel (Sector)', activiteit: 'Klantinterviews uitvoeren', pe: 'I', pm: 'I', pr: 'I', be: 'A', il: 'R' },
    { id: 13, categorie: 'Operationeel (Sector)', activiteit: 'Implementaties uitvoeren', pe: 'I', pm: 'C', pr: 'I', be: 'A', il: 'R' },
    { id: 14, categorie: 'Operationeel (Sector)', activiteit: 'Batenrealisatie meten', pe: 'I', pm: 'R', pr: 'I', be: 'A', il: 'C' },
    // Sectoroverstijgend
    { id: 15, categorie: 'Sectoroverstijgend', activiteit: 'CRM/Systeem verbeteringen', pe: 'C', pm: 'R', pr: 'C', be: 'C', il: 'R' },
    { id: 16, categorie: 'Sectoroverstijgend', activiteit: 'Training & Leertrajecten', pe: 'I', pm: 'R', pr: 'I', be: 'C', il: 'R' },
    { id: 17, categorie: 'Sectoroverstijgend', activiteit: 'Proces standaardisatie', pe: 'C', pm: 'R', pr: 'C', be: 'C', il: 'R' },
    { id: 18, categorie: 'Sectoroverstijgend', activiteit: 'Cultuurverandering begeleiden', pe: 'A', pm: 'R', pr: 'C', be: 'R', il: 'C' },
  ])

  // Cycle through RACI values when clicked
  const raciValues = ['R', 'A', 'C', 'I']
  const handleRaciClick = (rowId, column) => {
    setRaciMatrix(prev => prev.map(row => {
      if (row.id === rowId) {
        const currentIndex = raciValues.indexOf(row[column])
        const nextIndex = (currentIndex + 1) % raciValues.length
        return { ...row, [column]: raciValues[nextIndex] }
      }
      return row
    }))
  }

  const raciKleuren = {
    R: 'bg-blue-500 text-white',
    A: 'bg-red-500 text-white',
    C: 'bg-amber-400 text-amber-900',
    I: 'bg-slate-200 text-slate-600'
  }

  const raciLabels = {
    R: 'Responsible (Uitvoerend)',
    A: 'Accountable (Eindverantwoordelijk)',
    C: 'Consulted (Geraadpleegd)',
    I: 'Informed (Geïnformeerd)'
  }

  // Groepeer RACI per categorie
  const raciPerCategorie = raciMatrix.reduce((acc, item) => {
    if (!acc[item.categorie]) acc[item.categorie] = []
    acc[item.categorie].push(item)
    return acc
  }, {})

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#003366] to-[#002855] rounded-xl p-5 shadow-sm text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Governance</h1>
            <p className="text-white/80 mt-1">Organisatiestructuur, rollen en verantwoordelijkheden</p>
          </div>
          <button
            onClick={() => setShowStakeholderForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            Stakeholder toevoegen
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mt-4">
          {[
            { id: 'organigram', label: 'Organigram', icon: Users },
            { id: 'stakeholders', label: `Stakeholders (${stakeholders.length})`, icon: User },
            { id: 'raci', label: 'RACI Matrix', icon: CheckCircle }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-[#003366] font-medium'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Organigram Tab */}
      {activeTab === 'organigram' && (
        <>
      <div className="bg-white rounded-xl border border-slate-100 hover:shadow-md transition-all duration-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-slate-800">Organigram Klant in Beeld</h2>
          <p className="text-xs text-slate-500">Klik op een rol om stakeholder te bewerken</p>
        </div>

        <div className="flex flex-col items-center">
          {/* Niveau 1: Programma-eigenaar */}
          <div className="w-full max-w-md">
            <div
              className="bg-amber-100 border-2 border-amber-400 rounded-xl p-4 text-center cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => programmaEigenaar ? handleEditStakeholder(programmaEigenaar) : setShowStakeholderForm(true)}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Crown className="w-6 h-6 text-amber-600" />
                <span className="font-bold text-amber-800">Programma-eigenaar</span>
                <Edit2 className="w-4 h-4 text-amber-400" />
              </div>
              {programmaEigenaar ? (
                <>
                  <div className="text-lg font-semibold text-slate-800">{programmaEigenaar.naam}</div>
                  <div className="text-sm text-amber-600">{programmaEigenaar.functie}</div>
                </>
              ) : (
                <div className="text-sm text-amber-600 italic">Klik om toe te voegen</div>
              )}
            </div>
          </div>

          {/* Pijl */}
          <div className="flex flex-col items-center py-2">
            <div className="w-0.5 h-4 bg-slate-300"></div>
            <ArrowDown className="w-5 h-5 text-slate-400" />
          </div>

          {/* Niveau 2: Programmamanager */}
          <div className="w-full max-w-md">
            <div
              className="bg-blue-100 border-2 border-blue-400 rounded-xl p-4 text-center cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => programmaManager ? handleEditStakeholder(programmaManager) : setShowStakeholderForm(true)}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <User className="w-6 h-6 text-blue-600" />
                <span className="font-bold text-blue-800">Programmamanager</span>
                <Edit2 className="w-4 h-4 text-blue-400" />
              </div>
              {programmaManager ? (
                <>
                  <div className="text-lg font-semibold text-slate-800">{programmaManager.naam}</div>
                  <div className="text-sm text-blue-600">{programmaManager.functie}</div>
                  {programmaManager.email && (
                    <div className="text-xs text-slate-500 mt-1">{programmaManager.email}</div>
                  )}
                </>
              ) : (
                <div className="text-sm text-blue-600 italic">Klik om toe te voegen</div>
              )}
            </div>
          </div>

          {/* Pijl naar beide kanten */}
          <div className="flex items-center w-full max-w-3xl py-2">
            <div className="flex-1 flex justify-end pr-4">
              <div className="w-32 h-0.5 bg-slate-300"></div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-4 bg-slate-300"></div>
              <ArrowDown className="w-5 h-5 text-slate-400" />
            </div>
            <div className="flex-1 flex justify-start pl-4">
              <div className="w-32 h-0.5 bg-slate-300"></div>
            </div>
          </div>

          {/* Niveau 3: Programmaraad en Baateigenaren */}
          <div className="w-full flex flex-col md:flex-row justify-center gap-4 md:gap-8">
            {/* Programmaraad */}
            <div className="w-64">
              <div className="bg-purple-100 border-2 border-purple-400 rounded-xl p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  <span className="font-bold text-purple-800">Programmaraad</span>
                </div>
                <div className="text-sm font-medium text-slate-700">Maandelijks</div>
                <div className="mt-2 space-y-1">
                  {programmaraadLeden.length > 0 ? (
                    programmaraadLeden.map(lid => (
                      <div
                        key={lid.id}
                        className="text-xs text-purple-700 cursor-pointer hover:underline"
                        onClick={() => handleEditStakeholder(lid)}
                      >
                        • {lid.naam}
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-purple-600 italic">Geen leden toegevoegd</div>
                  )}
                </div>
                <div className="mt-2 pt-2 border-t border-purple-200">
                  <div className="text-xs text-slate-600">
                    {programmaraadLeden.length} leden
                  </div>
                </div>
              </div>
            </div>

            {/* Baateigenaren */}
            <div className="w-64">
              <div className="bg-green-100 border-2 border-green-400 rounded-xl p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-green-600" />
                  <span className="font-bold text-green-800">Baateigenaren</span>
                </div>
                <div className="text-sm font-medium text-slate-700">{baateigenaren.length} Sectormanagers</div>
                <div className="mt-2 space-y-1">
                  {baateigenaren.length > 0 ? (
                    baateigenaren.map(be => (
                      <div
                        key={be.id}
                        className="text-xs text-green-700 cursor-pointer hover:underline"
                        onClick={() => handleEditStakeholder(be)}
                      >
                        • {be.naam} ({be.afdeling || 'Sector'})
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-green-600 italic">Geen baateigenaren</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Pijl naar Inspanningsleiders */}
          <div className="flex flex-col items-center py-2">
            <div className="w-0.5 h-4 bg-slate-300"></div>
            <ArrowDown className="w-5 h-5 text-slate-400" />
          </div>

          {/* Niveau 4: Inspanningsleiders */}
          <div className="w-full max-w-2xl">
            <div className="bg-slate-100 border-2 border-slate-300 rounded-xl p-4">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Briefcase className="w-5 h-5 text-slate-600" />
                <span className="font-bold text-slate-700">Inspanningsleiders ({inspanningsleiders.length})</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {inspanningsleiders.length > 0 ? (
                  inspanningsleiders.map(il => (
                    <div
                      key={il.id}
                      className="bg-white rounded-lg p-2 text-center text-xs text-slate-600 border border-slate-200 cursor-pointer hover:border-slate-400 hover:shadow transition-all"
                      onClick={() => handleEditStakeholder(il)}
                    >
                      <div className="font-medium text-slate-800">{il.naam}</div>
                      <div className="text-slate-500">{il.afdeling || il.functie}</div>
                    </div>
                  ))
                ) : (
                  governanceStructuur.inspanningsLeiders.rollen.map((rol, i) => (
                    <div key={i} className="bg-white rounded-lg p-2 text-center text-xs text-slate-600 border border-slate-200">
                      {rol}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rollen Detail */}
      <div className="grid grid-cols-2 gap-5">
        {/* Programma-eigenaar */}
        <div className="bg-white rounded-xl border border-slate-100 hover:shadow-md transition-all duration-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-100 rounded-lg">
              <Crown className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">Programma-eigenaar</h3>
              <p className="text-sm text-slate-500">{governanceStructuur.programmaEigenaar.functie}</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium text-slate-700 mb-2">Verantwoordelijkheden:</div>
            {governanceStructuur.programmaEigenaar.verantwoordelijkheden.map((v, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-slate-600">
                <CheckCircle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <span>{v}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="text-xs text-slate-500">Thema's: Vormgeven, Beslissen</div>
          </div>
        </div>

        {/* Programmamanager */}
        <div className="bg-white rounded-xl border border-slate-100 hover:shadow-md transition-all duration-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">
                {governanceStructuur.programmaManager.naam || 'Programmamanager'}
              </h3>
              <p className="text-sm text-slate-500">
                {governanceStructuur.programmaManager.naam ? 'Programmamanager' : ''} - {governanceStructuur.programmaManager.functie}
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium text-slate-700 mb-2">Verantwoordelijkheden:</div>
            {governanceStructuur.programmaManager.verantwoordelijkheden.map((v, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-slate-600">
                <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                <span>{v}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="text-xs text-slate-500">Thema's: Organiseren, Sturen, Samenwerken</div>
          </div>
        </div>

        {/* Programmaraad */}
        <div className="bg-white rounded-xl border border-slate-100 hover:shadow-md transition-all duration-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">Programmaraad</h3>
              <p className="text-sm text-slate-500">{governanceStructuur.programmaRaad.frequentie}</p>
            </div>
          </div>
          <div className="space-y-2 mb-4">
            <div className="text-sm font-medium text-slate-700 mb-2">Leden:</div>
            {governanceStructuur.programmaRaad.leden.map((lid, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                <Circle className="w-2 h-2 text-purple-400 shrink-0" />
                <span className="font-medium">{lid.functie}</span>
                <span className="text-slate-400">({lid.rol})</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="text-xs text-slate-500">Thema's: Beslissen, Sturen</div>
          </div>
        </div>

        {/* Baateigenaren */}
        <div className="bg-white rounded-xl border border-slate-100 hover:shadow-md transition-all duration-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">Baateigenaren (Sectormanagers)</h3>
              <p className="text-sm text-slate-500">Verantwoordelijk voor batenrealisatie</p>
            </div>
          </div>
          <div className="space-y-3">
            {sectoren.map(sector => (
              <div
                key={sector.id}
                className="p-3 rounded-lg border-l-4"
                style={{ borderColor: sector.kleur, backgroundColor: `${sector.kleur}10` }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: sector.kleur }}
                  >
                    {sector.afkorting}
                  </div>
                  <div>
                    <div className="font-medium text-slate-800">{sector.baateigenaar.naam}</div>
                    <div className="text-xs text-slate-500">{sector.naam}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RACI Matrix */}
      <div className="bg-white rounded-xl border border-slate-100 hover:shadow-md transition-all duration-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">RACI Matrix</h2>
            <p className="text-sm text-slate-500">Wie is verantwoordelijk voor wat?</p>
          </div>
          <div className="flex gap-3">
            {Object.entries(raciLabels).map(([code, label]) => (
              <div key={code} className="flex items-center gap-2 text-xs">
                <span className={`w-6 h-6 rounded flex items-center justify-center font-bold ${raciKleuren[code]}`}>
                  {code}
                </span>
                <span className="text-slate-600">{label.split(' ')[0]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left p-3 font-semibold text-slate-700 border-b border-slate-200 w-1/3">
                  Activiteit
                </th>
                <th className="text-center p-3 font-semibold text-slate-700 border-b border-slate-200">
                  <div className="flex flex-col items-center">
                    <Crown className="w-4 h-4 text-amber-600 mb-1" />
                    <span>PE</span>
                  </div>
                </th>
                <th className="text-center p-3 font-semibold text-slate-700 border-b border-slate-200">
                  <div className="flex flex-col items-center">
                    <User className="w-4 h-4 text-blue-600 mb-1" />
                    <span>PM</span>
                  </div>
                </th>
                <th className="text-center p-3 font-semibold text-slate-700 border-b border-slate-200">
                  <div className="flex flex-col items-center">
                    <Users className="w-4 h-4 text-purple-600 mb-1" />
                    <span>PR</span>
                  </div>
                </th>
                <th className="text-center p-3 font-semibold text-slate-700 border-b border-slate-200">
                  <div className="flex flex-col items-center">
                    <Target className="w-4 h-4 text-green-600 mb-1" />
                    <span>BE</span>
                  </div>
                </th>
                <th className="text-center p-3 font-semibold text-slate-700 border-b border-slate-200">
                  <div className="flex flex-col items-center">
                    <Briefcase className="w-4 h-4 text-slate-600 mb-1" />
                    <span>IL</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(raciPerCategorie).map(([categorie, items]) => (
                <>
                  <tr key={categorie} className="bg-slate-100">
                    <td colSpan={6} className="p-2 font-semibold text-slate-700 text-xs uppercase tracking-wide">
                      {categorie}
                    </td>
                  </tr>
                  {items.map((row, i) => (
                    <tr key={`${categorie}-${i}`} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="p-3 text-slate-700">{row.activiteit}</td>
                      <td className="p-3 text-center">
                        <span className={`inline-flex w-8 h-8 items-center justify-center rounded font-bold ${raciKleuren[row.pe]}`}>
                          {row.pe}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <span className={`inline-flex w-8 h-8 items-center justify-center rounded font-bold ${raciKleuren[row.pm]}`}>
                          {row.pm}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <span className={`inline-flex w-8 h-8 items-center justify-center rounded font-bold ${raciKleuren[row.pr]}`}>
                          {row.pr}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <span className={`inline-flex w-8 h-8 items-center justify-center rounded font-bold ${raciKleuren[row.be]}`}>
                          {row.be}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <span className={`inline-flex w-8 h-8 items-center justify-center rounded font-bold ${raciKleuren[row.il]}`}>
                          {row.il}
                        </span>
                      </td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legenda */}
        <div className="mt-6 p-4 bg-slate-50 rounded-lg">
          <div className="text-sm font-medium text-slate-700 mb-2">Legenda rollen:</div>
          <div className="grid grid-cols-5 gap-4 text-xs text-slate-600">
            <div><strong>PE</strong> = Programma-eigenaar</div>
            <div><strong>PM</strong> = Programmamanager</div>
            <div><strong>PR</strong> = Programmaraad</div>
            <div><strong>BE</strong> = Baateigenaar (Sectormanager)</div>
            <div><strong>IL</strong> = Inspanningsleider</div>
          </div>
        </div>
      </div>

      {/* Overlegstructuur */}
      <div className="bg-white rounded-xl border border-slate-100 hover:shadow-md transition-all duration-200 p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-6">Overlegstructuur</h2>

        <div className="grid grid-cols-3 gap-5">
          {/* Programmaraad */}
          <div className="p-5 bg-purple-50 rounded-xl border border-purple-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-purple-800">Programmaraad</h3>
                <p className="text-sm text-purple-600">Tactisch</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-500" />
                <span className="text-slate-700">{governanceStructuur.programmaRaad.frequentie}</span>
              </div>
              <div className="flex items-start gap-2">
                <MessageSquare className="w-4 h-4 text-purple-500 mt-0.5" />
                <span className="text-slate-600">Prioritering, keuzes, voortgangsbewaking</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-purple-200">
              <div className="text-xs text-purple-700">Voorzitter: Programmamanager</div>
            </div>
          </div>

          {/* Sectoroverleg */}
          <div className="p-5 bg-green-50 rounded-xl border border-green-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Target className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-green-800">Sectoroverleg</h3>
                <p className="text-sm text-green-600">Operationeel</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-green-500" />
                <span className="text-slate-700">Wekelijks per sector</span>
              </div>
              <div className="flex items-start gap-2">
                <MessageSquare className="w-4 h-4 text-green-500 mt-0.5" />
                <span className="text-slate-600">Voortgang klantreizen, issues, planning</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-green-200">
              <div className="text-xs text-green-700">Voorzitter: Baateigenaar</div>
            </div>
          </div>

          {/* KiB Team */}
          <div className="p-5 bg-blue-50 rounded-xl border border-blue-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Briefcase className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-800">KiB Team</h3>
                <p className="text-sm text-blue-600">Uitvoerend</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-500" />
                <span className="text-slate-700">Wekelijks</span>
              </div>
              <div className="flex items-start gap-2">
                <MessageSquare className="w-4 h-4 text-blue-500 mt-0.5" />
                <span className="text-slate-600">Tools, competentie, evangelie, studio</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-blue-200">
              <div className="text-xs text-blue-700">Partner: 3Sides</div>
            </div>
          </div>
        </div>
      </div>

      {/* KIB Team Model - Cirkel met 4 kwadranten */}
      <div className="bg-white rounded-xl border border-slate-100 hover:shadow-md transition-all duration-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">{kibTeam.naam}</h2>
            <p className="text-sm text-slate-500">{kibTeam.doel}</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-100 rounded-full">
            <ExternalLink className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-medium text-orange-700">Partner: {kibTeam.partner}</span>
          </div>
        </div>

        {/* Cirkel met 4 kwadranten */}
        <div className="flex justify-center mb-6">
          <div className="relative w-80 h-80">
            {/* Cirkel achtergrond */}
            <div className="absolute inset-0 rounded-full border-4 border-slate-200 overflow-hidden">
              {/* Kwadrant 1: Competentie Maturiteit (linksboven) */}
              <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-blue-100 border-r-2 border-b-2 border-white flex flex-col items-center justify-center p-4 hover:bg-blue-200 transition-colors cursor-pointer group">
                <TrendingUp className="w-8 h-8 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-blue-800 text-center leading-tight">Competentie</span>
                <span className="text-xs font-bold text-blue-800 text-center leading-tight">Maturiteit</span>
              </div>

              {/* Kwadrant 2: Tools (rechtsboven) */}
              <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-amber-100 border-l-2 border-b-2 border-white flex flex-col items-center justify-center p-4 hover:bg-amber-200 transition-colors cursor-pointer group">
                <Wrench className="w-8 h-8 text-amber-600 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-amber-800 text-center leading-tight">Tools</span>
              </div>

              {/* Kwadrant 3: Evangelie (linksonder) */}
              <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-green-100 border-r-2 border-t-2 border-white flex flex-col items-center justify-center p-4 hover:bg-green-200 transition-colors cursor-pointer group">
                <Megaphone className="w-8 h-8 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-green-800 text-center leading-tight">Evangelie</span>
              </div>

              {/* Kwadrant 4: Studio (rechtsonder) */}
              <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-purple-100 border-l-2 border-t-2 border-white flex flex-col items-center justify-center p-4 hover:bg-purple-200 transition-colors cursor-pointer group">
                <Palette className="w-8 h-8 text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-purple-800 text-center leading-tight">Studio</span>
              </div>
            </div>

            {/* Center cirkel met KIB */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-[#003366] rounded-full flex items-center justify-center shadow-lg z-10 border-4 border-white">
              <div className="text-center">
                <span className="text-white font-bold text-lg">KiB</span>
                <span className="text-white/70 text-xs block">Team</span>
              </div>
            </div>
          </div>
        </div>

        {/* Beschrijvingen onder de cirkel */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
            <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-800 text-sm">Competentie Maturiteit</h4>
              <p className="text-xs text-slate-600">Outside-in vaardigheden meten en bevorderen</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
            <Wrench className="w-5 h-5 text-amber-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-amber-800 text-sm">Tools</h4>
              <p className="text-xs text-slate-600">Toolkit ontwikkelen en beheren</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
            <Megaphone className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-green-800 text-sm">Evangelie</h4>
              <p className="text-xs text-slate-600">Communicatie en draagvlak creëren</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
            <Palette className="w-5 h-5 text-purple-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-purple-800 text-sm">Studio</h4>
              <p className="text-xs text-slate-600">Creatieve sessies en workshops faciliteren</p>
            </div>
          </div>
        </div>
      </div>

      {/* Besluitvormingsproces */}
      <div className="bg-white rounded-xl border border-slate-100 hover:shadow-md transition-all duration-200 p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Besluitvormingsproces</h2>

        <div className="flex items-center justify-between">
          {[
            { niveau: 'Operationeel', beslisser: 'Inspanningsleider', voorbeelden: 'Werkplanning, tactiek' },
            { niveau: 'Sector', beslisser: 'Baateigenaar', voorbeelden: 'Klantreis keuzes, prioriteiten' },
            { niveau: 'Programma', beslisser: 'Programmaraad', voorbeelden: 'Budget, resources, scope' },
            { niveau: 'Strategisch', beslisser: 'Programma-eigenaar', voorbeelden: 'Go/No-Go, richting' }
          ].map((item, i) => (
            <div key={item.niveau} className="flex items-center">
              <div className="text-center">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-2 ${
                  i === 0 ? 'bg-slate-100 border-2 border-slate-300' :
                  i === 1 ? 'bg-green-100 border-2 border-green-300' :
                  i === 2 ? 'bg-purple-100 border-2 border-purple-300' :
                  'bg-amber-100 border-2 border-amber-300'
                }`}>
                  <div className="text-center">
                    <div className="text-xs font-medium text-slate-600">{item.niveau}</div>
                    <div className="text-sm font-bold text-slate-800">{item.beslisser.split(' ')[0]}</div>
                  </div>
                </div>
                <p className="text-xs text-slate-500 max-w-24">{item.voorbeelden}</p>
              </div>
              {i < 3 && (
                <div className="mx-2">
                  <ChevronDown className="w-5 h-5 text-slate-300 rotate-[-90deg]" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
          <p className="text-sm text-amber-800">
            <strong>Escalatiepad:</strong> Als een besluit niet op het betreffende niveau genomen kan worden,
            escaleert dit naar het volgende niveau. De Programmamanager bewaakt dit proces.
          </p>
        </div>
      </div>
        </>
      )}

      {/* Stakeholders Tab */}
      {activeTab === 'stakeholders' && (
        <div className="space-y-6">
          {/* Stakeholder Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Object.entries(roleColors).map(([role, colors]) => {
              const count = stakeholdersByRole[role]?.length || 0
              return (
                <div
                  key={role}
                  className={`p-4 rounded-xl border-2 ${colors.bg} ${colors.border} cursor-pointer hover:shadow-md transition-shadow`}
                  onClick={() => setSelectedRole(selectedRole === role ? null : role)}
                >
                  <div className={`text-2xl font-bold ${colors.text}`}>{count}</div>
                  <div className="text-sm text-slate-600">{role}</div>
                </div>
              )
            })}
          </div>

          {/* Stakeholder List */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-semibold text-slate-800">
                {selectedRole ? `${selectedRole} (${stakeholdersByRole[selectedRole]?.length || 0})` : `Alle Stakeholders (${stakeholders.length})`}
              </h3>
              {selectedRole && (
                <button
                  onClick={() => setSelectedRole(null)}
                  className="text-sm text-slate-500 hover:text-slate-700"
                >
                  Toon alle
                </button>
              )}
            </div>

            <table className="w-full">
              <thead className="bg-slate-50">
                <tr className="text-left text-sm text-slate-500">
                  <th className="px-6 py-3 font-medium">Naam</th>
                  <th className="px-6 py-3 font-medium">Rol</th>
                  <th className="px-6 py-3 font-medium">Functie</th>
                  <th className="px-6 py-3 font-medium">Afdeling</th>
                  <th className="px-6 py-3 font-medium">Contact</th>
                  <th className="px-6 py-3 font-medium">Acties</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(selectedRole ? stakeholdersByRole[selectedRole] || [] : stakeholders).map(stakeholder => {
                  const colors = roleColors[stakeholder.rol] || { bg: 'bg-slate-100', text: 'text-slate-800' }
                  return (
                    <tr key={stakeholder.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-800">{stakeholder.naam}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}>
                          {stakeholder.rol}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{stakeholder.functie}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{stakeholder.afdeling}</td>
                      <td className="px-6 py-4">
                        {stakeholder.email && (
                          <a href={`mailto:${stakeholder.email}`} className="text-sm text-blue-600 hover:underline block">
                            {stakeholder.email}
                          </a>
                        )}
                        {stakeholder.telefoon && (
                          <span className="text-sm text-slate-500">{stakeholder.telefoon}</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleEditStakeholder(stakeholder)}
                            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteStakeholder(stakeholder.id)}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>

            {stakeholders.length === 0 && (
              <div className="text-center py-12 text-slate-500">
                Nog geen stakeholders toegevoegd
              </div>
            )}
          </div>

          {/* Stakeholder Matrix (Belang vs Invloed) */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-800 mb-4">Stakeholder Matrix (Belang vs Invloed)</h3>
            <div className="grid grid-cols-2 gap-4">
              {/* Hoog Belang, Hoge Invloed */}
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="text-sm font-medium text-red-800 mb-2">Intensief managen</div>
                <div className="text-xs text-slate-500 mb-3">Hoog belang & Hoge invloed</div>
                <div className="space-y-1">
                  {stakeholders.filter(s => s.belang === 'high' && s.invloed === 'high').map(s => (
                    <div key={s.id} className="text-sm text-slate-700">{s.naam}</div>
                  ))}
                </div>
              </div>
              {/* Hoog Belang, Lage Invloed */}
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="text-sm font-medium text-amber-800 mb-2">Tevreden houden</div>
                <div className="text-xs text-slate-500 mb-3">Hoog belang & Lage invloed</div>
                <div className="space-y-1">
                  {stakeholders.filter(s => s.belang === 'high' && s.invloed !== 'high').map(s => (
                    <div key={s.id} className="text-sm text-slate-700">{s.naam}</div>
                  ))}
                </div>
              </div>
              {/* Laag Belang, Hoge Invloed */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="text-sm font-medium text-blue-800 mb-2">Informeren</div>
                <div className="text-xs text-slate-500 mb-3">Laag belang & Hoge invloed</div>
                <div className="space-y-1">
                  {stakeholders.filter(s => s.belang !== 'high' && s.invloed === 'high').map(s => (
                    <div key={s.id} className="text-sm text-slate-700">{s.naam}</div>
                  ))}
                </div>
              </div>
              {/* Laag Belang, Lage Invloed */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="text-sm font-medium text-slate-700 mb-2">Monitoren</div>
                <div className="text-xs text-slate-500 mb-3">Laag belang & Lage invloed</div>
                <div className="space-y-1">
                  {stakeholders.filter(s => s.belang !== 'high' && s.invloed !== 'high').map(s => (
                    <div key={s.id} className="text-sm text-slate-700">{s.naam}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RACI Tab - Toon alleen als raci actief is */}
      {activeTab === 'raci' && (
        <div className="bg-white rounded-xl border border-slate-100 hover:shadow-md transition-all duration-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">RACI Matrix</h2>
              <p className="text-sm text-slate-500">Klik op een cel om de waarde te wijzigen (R → A → C → I)</p>
            </div>
            <div className="flex gap-3">
              {Object.entries(raciLabels).map(([code, label]) => (
                <div key={code} className="flex items-center gap-2 text-xs">
                  <span className={`w-6 h-6 rounded flex items-center justify-center font-bold ${raciKleuren[code]}`}>
                    {code}
                  </span>
                  <span className="text-slate-600">{label.split(' ')[0]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 font-semibold text-slate-700 border-b border-slate-200 w-1/3">
                    Activiteit
                  </th>
                  <th className="text-center p-3 font-semibold text-slate-700 border-b border-slate-200">
                    <div className="flex flex-col items-center">
                      <Crown className="w-4 h-4 text-amber-600 mb-1" />
                      <span>PE</span>
                    </div>
                  </th>
                  <th className="text-center p-3 font-semibold text-slate-700 border-b border-slate-200">
                    <div className="flex flex-col items-center">
                      <User className="w-4 h-4 text-blue-600 mb-1" />
                      <span>PM</span>
                    </div>
                  </th>
                  <th className="text-center p-3 font-semibold text-slate-700 border-b border-slate-200">
                    <div className="flex flex-col items-center">
                      <Users className="w-4 h-4 text-purple-600 mb-1" />
                      <span>PR</span>
                    </div>
                  </th>
                  <th className="text-center p-3 font-semibold text-slate-700 border-b border-slate-200">
                    <div className="flex flex-col items-center">
                      <Target className="w-4 h-4 text-green-600 mb-1" />
                      <span>BE</span>
                    </div>
                  </th>
                  <th className="text-center p-3 font-semibold text-slate-700 border-b border-slate-200">
                    <div className="flex flex-col items-center">
                      <Briefcase className="w-4 h-4 text-slate-600 mb-1" />
                      <span>IL</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(raciPerCategorie).map(([categorie, items]) => (
                  <>
                    <tr key={categorie} className="bg-slate-100">
                      <td colSpan={6} className="p-2 font-semibold text-slate-700 text-xs uppercase tracking-wide">
                        {categorie}
                      </td>
                    </tr>
                    {items.map((row, i) => (
                      <tr key={`${categorie}-${i}`} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="p-3 text-slate-700">{row.activiteit}</td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => handleRaciClick(row.id, 'pe')}
                            className={`inline-flex w-8 h-8 items-center justify-center rounded font-bold cursor-pointer hover:ring-2 hover:ring-offset-1 hover:ring-slate-400 transition-all ${raciKleuren[row.pe]}`}
                            title="Klik om te wijzigen"
                          >
                            {row.pe}
                          </button>
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => handleRaciClick(row.id, 'pm')}
                            className={`inline-flex w-8 h-8 items-center justify-center rounded font-bold cursor-pointer hover:ring-2 hover:ring-offset-1 hover:ring-slate-400 transition-all ${raciKleuren[row.pm]}`}
                            title="Klik om te wijzigen"
                          >
                            {row.pm}
                          </button>
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => handleRaciClick(row.id, 'pr')}
                            className={`inline-flex w-8 h-8 items-center justify-center rounded font-bold cursor-pointer hover:ring-2 hover:ring-offset-1 hover:ring-slate-400 transition-all ${raciKleuren[row.pr]}`}
                            title="Klik om te wijzigen"
                          >
                            {row.pr}
                          </button>
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => handleRaciClick(row.id, 'be')}
                            className={`inline-flex w-8 h-8 items-center justify-center rounded font-bold cursor-pointer hover:ring-2 hover:ring-offset-1 hover:ring-slate-400 transition-all ${raciKleuren[row.be]}`}
                            title="Klik om te wijzigen"
                          >
                            {row.be}
                          </button>
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => handleRaciClick(row.id, 'il')}
                            className={`inline-flex w-8 h-8 items-center justify-center rounded font-bold cursor-pointer hover:ring-2 hover:ring-offset-1 hover:ring-slate-400 transition-all ${raciKleuren[row.il]}`}
                            title="Klik om te wijzigen"
                          >
                            {row.il}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>

          {/* Legenda */}
          <div className="mt-6 p-4 bg-slate-50 rounded-lg">
            <div className="text-sm font-medium text-slate-700 mb-2">Legenda rollen:</div>
            <div className="grid grid-cols-5 gap-4 text-xs text-slate-600">
              <div><strong>PE</strong> = Programma-eigenaar</div>
              <div><strong>PM</strong> = Programmamanager</div>
              <div><strong>PR</strong> = Programmaraad</div>
              <div><strong>BE</strong> = Baateigenaar (Sectormanager)</div>
              <div><strong>IL</strong> = Inspanningsleider</div>
            </div>
          </div>
        </div>
      )}

      {/* Stakeholder Form Modal */}
      {showStakeholderForm && (
        <StakeholderForm
          stakeholder={editingStakeholder}
          onSave={handleSaveStakeholder}
          onCancel={() => { setShowStakeholderForm(false); setEditingStakeholder(null) }}
        />
      )}
    </div>
  )
}

export default Governance
