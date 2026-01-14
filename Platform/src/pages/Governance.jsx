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
      {/* Visueel Organigram */}
      <div className="bg-white rounded-xl border border-slate-100 p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-6">Organigram</h2>

        <div className="flex flex-col items-center">
          {/* Sponsorgroep - Top */}
          <div className="w-full max-w-md mb-3">
            <div className="bg-gradient-to-r from-slate-700 to-slate-800 rounded-xl p-4 text-center text-white">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Shield className="w-5 h-5" />
                <span className="font-bold">Sponsorgroep</span>
                <span className="text-xs bg-amber-400 text-amber-900 px-2 py-0.5 rounded ml-2">n.t.b.</span>
              </div>
              <div className="text-xs text-white/70">Go/No-Go & Strategie</div>
            </div>
          </div>

          <ArrowDown className="w-4 h-4 text-slate-400 my-1" />

          {/* Programma-eigenaar */}
          <div
            className="w-full max-w-sm mb-3 cursor-pointer"
            onClick={() => programmaEigenaar ? handleEditStakeholder(programmaEigenaar) : setShowStakeholderForm(true)}
          >
            <div className="bg-amber-100 border-2 border-amber-400 rounded-xl p-3 text-center hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center gap-2">
                <Crown className="w-5 h-5 text-amber-600" />
                <span className="font-bold text-amber-800">Programma-eigenaar</span>
              </div>
              <div className="text-sm text-slate-700 mt-1">{programmaEigenaar?.naam || 'Klik om toe te voegen'}</div>
            </div>
          </div>

          <ArrowDown className="w-4 h-4 text-slate-400 my-1" />

          {/* Programmamanager */}
          <div
            className="w-full max-w-sm mb-3 cursor-pointer"
            onClick={() => programmaManager ? handleEditStakeholder(programmaManager) : setShowStakeholderForm(true)}
          >
            <div className="bg-blue-100 border-2 border-blue-400 rounded-xl p-3 text-center hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                <span className="font-bold text-blue-800">Programmamanager</span>
              </div>
              <div className="text-sm text-slate-700 mt-1">{governanceStructuur.programmaManager.naam}</div>
            </div>
          </div>

          <ArrowDown className="w-4 h-4 text-slate-400 my-1" />

          {/* Programmaraad + Baateigenaren naast elkaar */}
          <div className="flex gap-6 mb-3">
            <div className="w-48">
              <div className="bg-purple-100 border-2 border-purple-400 rounded-xl p-3 text-center">
                <div className="flex items-center justify-center gap-2">
                  <Users className="w-4 h-4 text-purple-600" />
                  <span className="font-semibold text-purple-800 text-sm">Programmaraad</span>
                </div>
                <div className="text-xs text-slate-600 mt-1">{governanceStructuur.programmaRaad.leden.length} leden</div>
              </div>
            </div>
            <div className="w-48">
              <div className="bg-green-100 border-2 border-green-400 rounded-xl p-3 text-center">
                <div className="flex items-center justify-center gap-2">
                  <Target className="w-4 h-4 text-green-600" />
                  <span className="font-semibold text-green-800 text-sm">Baateigenaren</span>
                </div>
                <div className="text-xs text-slate-600 mt-1">{sectoren.length} sectoren</div>
              </div>
            </div>
          </div>

          <ArrowDown className="w-4 h-4 text-slate-400 my-1" />

          {/* Inspanningsleiders */}
          <div className="w-full max-w-lg">
            <div className="bg-slate-100 border-2 border-slate-300 rounded-xl p-3 text-center">
              <div className="flex items-center justify-center gap-2">
                <Briefcase className="w-4 h-4 text-slate-600" />
                <span className="font-semibold text-slate-700 text-sm">Inspanningsleiders</span>
              </div>
              <div className="flex justify-center gap-2 mt-2 flex-wrap">
                {governanceStructuur.inspanningsLeiders.rollen.map((rol, i) => (
                  <span key={i} className="text-xs bg-white px-2 py-1 rounded border border-slate-200">{rol}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rollen toelichting - Uitgebreid */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Rollen & Verantwoordelijkheden</h2>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Sponsorgroep */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 hover:shadow-md transition-all">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-slate-700 rounded-lg">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Sponsorgroep</h3>
                <span className="text-xs text-slate-500">Strategisch niveau</span>
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-3">Beslist <strong>OVER</strong> het programma - niet erin</p>
            <div className="space-y-1 text-xs text-slate-500 mb-3">
              <div className="flex items-start gap-1.5">
                <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 shrink-0" />
                <span>Go/No-Go besluiten tussen cycli</span>
              </div>
              <div className="flex items-start gap-1.5">
                <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 shrink-0" />
                <span>Budget en resources vrijgeven</span>
              </div>
              <div className="flex items-start gap-1.5">
                <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 shrink-0" />
                <span>Strategische richting bepalen</span>
              </div>
            </div>
            <div className="text-xs text-amber-600 font-medium">Leden n.t.b.</div>
          </div>

          {/* Programma-eigenaar */}
          <div
            className="bg-amber-50 rounded-xl border border-amber-200 p-4 hover:shadow-md transition-all cursor-pointer"
            onClick={() => programmaEigenaar ? handleEditStakeholder(programmaEigenaar) : setShowStakeholderForm(true)}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-amber-500 rounded-lg">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Programma-eigenaar</h3>
                <span className="text-xs text-slate-500">Eindverantwoordelijk</span>
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-3">Stuurt op <strong>batenrealisatie</strong> en draagt programma</p>
            <div className="space-y-1 text-xs text-slate-500 mb-3">
              <div className="flex items-start gap-1.5">
                <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 shrink-0" />
                <span>Bewaakt visie en doelstellingen</span>
              </div>
              <div className="flex items-start gap-1.5">
                <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 shrink-0" />
                <span>Escaleert naar Sponsorgroep</span>
              </div>
              <div className="flex items-start gap-1.5">
                <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 shrink-0" />
                <span>Aanjager van organisatieverandering</span>
              </div>
            </div>
            <div className="text-xs text-amber-700">{programmaEigenaar?.naam || 'Klik om toe te voegen'}</div>
          </div>

          {/* Programmamanager */}
          <div
            className="bg-blue-50 rounded-xl border border-blue-200 p-4 hover:shadow-md transition-all cursor-pointer"
            onClick={() => programmaManager ? handleEditStakeholder(programmaManager) : setShowStakeholderForm(true)}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Programmamanager</h3>
                <span className="text-xs text-slate-500">Dagelijkse coördinatie</span>
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-3">Coördineert, rapporteert en <strong>houdt overzicht</strong></p>
            <div className="space-y-1 text-xs text-slate-500 mb-3">
              <div className="flex items-start gap-1.5">
                <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 shrink-0" />
                <span>Leidt Programmaraad vergaderingen</span>
              </div>
              <div className="flex items-start gap-1.5">
                <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 shrink-0" />
                <span>Bewaakt voortgang en stuurparameters</span>
              </div>
              <div className="flex items-start gap-1.5">
                <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 shrink-0" />
                <span>Coördineert tussen sectoren</span>
              </div>
            </div>
            <div className="text-xs text-blue-700">{governanceStructuur.programmaManager.naam}</div>
          </div>

          {/* Programmaraad */}
          <div className="bg-purple-50 rounded-xl border border-purple-200 p-4 hover:shadow-md transition-all">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-purple-500 rounded-lg">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Programmaraad</h3>
                <span className="text-xs text-slate-500">Tactisch niveau</span>
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-3">Beslist <strong>BINNEN</strong> het programma</p>
            <div className="space-y-1 text-xs text-slate-500 mb-3">
              <div className="flex items-start gap-1.5">
                <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 shrink-0" />
                <span>Prioriteiten stellen en bijsturen</span>
              </div>
              <div className="flex items-start gap-1.5">
                <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 shrink-0" />
                <span>Budget allocatie binnen programma</span>
              </div>
              <div className="flex items-start gap-1.5">
                <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 shrink-0" />
                <span>Operationele knelpunten oplossen</span>
              </div>
            </div>
            <div className="text-xs text-purple-700">{governanceStructuur.programmaRaad.leden.length} leden • {governanceStructuur.programmaRaad.frequentie}</div>
          </div>

          {/* Baateigenaren */}
          <div className="bg-green-50 rounded-xl border border-green-200 p-4 hover:shadow-md transition-all">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-green-500 rounded-lg">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Baateigenaren</h3>
                <span className="text-xs text-slate-500">Per sector</span>
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-3">Verantwoordelijk voor <strong>NPS verbetering</strong> in hun sector</p>
            <div className="space-y-1 text-xs text-slate-500 mb-3">
              <div className="flex items-start gap-1.5">
                <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 shrink-0" />
                <span>Definieert baten voor sector</span>
              </div>
              <div className="flex items-start gap-1.5">
                <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 shrink-0" />
                <span>Stuurt klantreisverbeteringen aan</span>
              </div>
              <div className="flex items-start gap-1.5">
                <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 shrink-0" />
                <span>Meet en rapporteert batenrealisatie</span>
              </div>
            </div>
            <div className="flex gap-1">
              {sectoren.map(s => (
                <span key={s.id} className="text-[10px] px-1.5 py-0.5 rounded text-white font-medium" style={{ backgroundColor: s.kleur }}>{s.afkorting}</span>
              ))}
            </div>
          </div>

          {/* Inspanningsleiders */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 hover:shadow-md transition-all">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-slate-500 rounded-lg">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Inspanningsleiders</h3>
                <span className="text-xs text-slate-500">Uitvoerend niveau</span>
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-3">Leiden <strong>projecten en trajecten</strong> die baten realiseren</p>
            <div className="space-y-1 text-xs text-slate-500 mb-3">
              <div className="flex items-start gap-1.5">
                <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 shrink-0" />
                <span>Voert inspanning uit en rapporteert</span>
              </div>
              <div className="flex items-start gap-1.5">
                <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 shrink-0" />
                <span>Signaleert risico's en issues</span>
              </div>
              <div className="flex items-start gap-1.5">
                <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 shrink-0" />
                <span>Koppelt resultaat aan baten</span>
              </div>
            </div>
            <div className="text-xs text-slate-500">{inspanningsleiders.length || governanceStructuur.inspanningsLeiders.rollen.length} rollen gedefinieerd</div>
          </div>
        </div>
      </div>

      {/* Verschil Sponsorgroep vs Programmaraad - Compact */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Sponsorgroep vs Programmaraad</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-lg p-3 border-l-4 border-slate-600">
            <div className="font-semibold text-sm text-slate-800 mb-1">Sponsorgroep</div>
            <p className="text-xs text-slate-600">Beslist <strong>OVER</strong> het programma</p>
            <div className="text-[10px] text-slate-400 mt-1">Go/No-Go, budget, strategie</div>
          </div>
          <div className="bg-white rounded-lg p-3 border-l-4 border-purple-500">
            <div className="font-semibold text-sm text-slate-800 mb-1">Programmaraad</div>
            <p className="text-xs text-slate-600">Beslist <strong>BINNEN</strong> het programma</p>
            <div className="text-[10px] text-slate-400 mt-1">Prioriteiten, voortgang, operatie</div>
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
