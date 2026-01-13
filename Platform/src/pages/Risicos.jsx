import { useState } from 'react'
import { useAppStore } from '../stores/appStore'
import {
    Plus,
    Edit2,
    Trash2,
    X,
    AlertTriangle,
    Search,
    Download,
    Filter,
    TrendingUp,
    TrendingDown,
    Minus
} from 'lucide-react'

// Risico impact en kans levels
const impactLevels = [
    { value: 1, label: 'Zeer Laag', color: 'bg-green-100 text-green-800' },
    { value: 2, label: 'Laag', color: 'bg-lime-100 text-lime-800' },
    { value: 3, label: 'Midden', color: 'bg-yellow-100 text-yellow-800' },
    { value: 4, label: 'Hoog', color: 'bg-orange-100 text-orange-800' },
    { value: 5, label: 'Zeer Hoog', color: 'bg-red-100 text-red-800' }
]

const kansLevels = [
    { value: 1, label: 'Zeer Onwaarschijnlijk' },
    { value: 2, label: 'Onwaarschijnlijk' },
    { value: 3, label: 'Mogelijk' },
    { value: 4, label: 'Waarschijnlijk' },
    { value: 5, label: 'Zeer Waarschijnlijk' }
]

const statussen = [
    { value: 'open', label: 'Open', color: 'bg-blue-100 text-blue-800' },
    { value: 'in_behandeling', label: 'In behandeling', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'gemitigeerd', label: 'Gemitigeerd', color: 'bg-green-100 text-green-800' },
    { value: 'geaccepteerd', label: 'Geaccepteerd', color: 'bg-slate-100 text-slate-800' },
    { value: 'gesloten', label: 'Gesloten', color: 'bg-gray-100 text-gray-600' }
]

const categorieen = [
    'Organisatie',
    'Technisch',
    'Financieel',
    'Planning',
    'Stakeholders',
    'Externe factoren',
    'Resources'
]

// Hulpfunctie voor risicoscore kleur
function getRisicoScoreColor(score) {
    if (score <= 4) return 'bg-green-500'
    if (score <= 9) return 'bg-lime-500'
    if (score <= 14) return 'bg-yellow-500'
    if (score <= 19) return 'bg-orange-500'
    return 'bg-red-500'
}

function getRisicoScoreBgColor(score) {
    if (score <= 4) return 'bg-green-100 text-green-800'
    if (score <= 9) return 'bg-lime-100 text-lime-800'
    if (score <= 14) return 'bg-yellow-100 text-yellow-800'
    if (score <= 19) return 'bg-orange-100 text-orange-800'
    return 'bg-red-100 text-red-800'
}

function RisicoForm({ risico, onSave, onCancel }) {
    const [form, setForm] = useState(risico || {
        titel: '',
        beschrijving: '',
        categorie: '',
        kans: 3,
        impact: 3,
        eigenaar: '',
        mitigatieMaatregel: '',
        contingencyPlan: '',
        status: 'open',
        trend: 'stabiel',
        datumGeidentificeerd: new Date().toISOString().split('T')[0],
        reviewDatum: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        onSave({
            ...form,
            score: form.kans * form.impact
        })
    }

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            role="dialog"
            aria-modal="true"
            aria-labelledby="form-title"
        >
            <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-slate-200">
                    <h2 id="form-title" className="text-xl font-semibold text-slate-800">
                        {risico ? 'Risico bewerken' : 'Nieuw risico toevoegen'}
                    </h2>
                    <button
                        onClick={onCancel}
                        className="p-2 hover:bg-slate-100 rounded-lg"
                        aria-label="Sluit formulier"
                    >
                        <X className="w-5 h-5 text-slate-500" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Titel en Categorie */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Titel *</label>
                            <input
                                type="text"
                                value={form.titel}
                                onChange={(e) => setForm({ ...form, titel: e.target.value })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                                required
                                placeholder="Korte, beschrijvende titel"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Categorie *</label>
                            <select
                                value={form.categorie}
                                onChange={(e) => setForm({ ...form, categorie: e.target.value })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                                required
                            >
                                <option value="">Selecteer categorie...</option>
                                {categorieen.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Beschrijving */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Beschrijving *</label>
                        <textarea
                            value={form.beschrijving}
                            onChange={(e) => setForm({ ...form, beschrijving: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                            required
                            placeholder="Beschrijf het risico en de mogelijke gevolgen"
                        />
                    </div>

                    {/* Kans en Impact met visuele matrix */}
                    <div className="bg-slate-50 rounded-lg p-4">
                        <h3 className="text-sm font-medium text-slate-700 mb-3">Risico Assessment</h3>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm text-slate-600 mb-1">Kans (1-5)</label>
                                <select
                                    value={form.kans}
                                    onChange={(e) => setForm({ ...form, kans: parseInt(e.target.value) })}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                                >
                                    {kansLevels.map(k => (
                                        <option key={k.value} value={k.value}>{k.value} - {k.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-slate-600 mb-1">Impact (1-5)</label>
                                <select
                                    value={form.impact}
                                    onChange={(e) => setForm({ ...form, impact: parseInt(e.target.value) })}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                                >
                                    {impactLevels.map(i => (
                                        <option key={i.value} value={i.value}>{i.value} - {i.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-slate-600 mb-1">Risicoscore</label>
                                <div className={`px-4 py-2 rounded-lg font-bold text-center ${getRisicoScoreBgColor(form.kans * form.impact)}`}>
                                    {form.kans * form.impact}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mitigatie en Contingency */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Mitigatiemaatregel</label>
                            <textarea
                                value={form.mitigatieMaatregel}
                                onChange={(e) => setForm({ ...form, mitigatieMaatregel: e.target.value })}
                                rows={2}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                                placeholder="Welke maatregelen nemen we om het risico te verkleinen?"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Contingency Plan</label>
                            <textarea
                                value={form.contingencyPlan}
                                onChange={(e) => setForm({ ...form, contingencyPlan: e.target.value })}
                                rows={2}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                                placeholder="Wat doen we als het risico zich voordoet?"
                            />
                        </div>
                    </div>

                    {/* Eigenaar, Status en Trend */}
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Eigenaar</label>
                            <input
                                type="text"
                                value={form.eigenaar}
                                onChange={(e) => setForm({ ...form, eigenaar: e.target.value })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                                placeholder="Wie is verantwoordelijk?"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                            <select
                                value={form.status}
                                onChange={(e) => setForm({ ...form, status: e.target.value })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                            >
                                {statussen.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Trend</label>
                            <select
                                value={form.trend}
                                onChange={(e) => setForm({ ...form, trend: e.target.value })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                            >
                                <option value="stijgend">↑ Stijgend</option>
                                <option value="stabiel">→ Stabiel</option>
                                <option value="dalend">↓ Dalend</option>
                            </select>
                        </div>
                    </div>

                    {/* Datums */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Datum Geïdentificeerd</label>
                            <input
                                type="date"
                                value={form.datumGeidentificeerd}
                                onChange={(e) => setForm({ ...form, datumGeidentificeerd: e.target.value })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Review Datum</label>
                            <input
                                type="date"
                                value={form.reviewDatum}
                                onChange={(e) => setForm({ ...form, reviewDatum: e.target.value })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                        >
                            Annuleren
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-[#003366] text-white rounded-lg hover:bg-[#0066cc]"
                        >
                            Opslaan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

function Risicos() {
    const { risicos, addRisico, updateRisico, deleteRisico } = useAppStore()
    const [showForm, setShowForm] = useState(false)
    const [editingRisico, setEditingRisico] = useState(null)
    const [filter, setFilter] = useState('all')
    const [search, setSearch] = useState('')

    const filteredRisicos = risicos.filter(r => {
        const matchesFilter = filter === 'all' || r.status === filter || r.categorie === filter
        const matchesSearch = r.titel?.toLowerCase().includes(search.toLowerCase()) ||
            r.beschrijving?.toLowerCase().includes(search.toLowerCase())
        return matchesFilter && matchesSearch
    })

    // Sorteer op risicoscore (hoogste eerst)
    const sortedRisicos = [...filteredRisicos].sort((a, b) => (b.score || 0) - (a.score || 0))

    const handleSave = (form) => {
        if (editingRisico) {
            updateRisico(editingRisico.id, form)
        } else {
            addRisico(form)
        }
        setShowForm(false)
        setEditingRisico(null)
    }

    const handleEdit = (risico) => {
        setEditingRisico(risico)
        setShowForm(true)
    }

    const handleDelete = (id) => {
        if (confirm('Weet je zeker dat je dit risico wilt verwijderen?')) {
            deleteRisico(id)
        }
    }

    const getTrendIcon = (trend) => {
        switch (trend) {
            case 'stijgend': return <TrendingUp className="w-4 h-4 text-red-500" />
            case 'dalend': return <TrendingDown className="w-4 h-4 text-green-500" />
            default: return <Minus className="w-4 h-4 text-slate-400" />
        }
    }

    // Statistieken
    const stats = {
        totaal: risicos.length,
        open: risicos.filter(r => r.status === 'open').length,
        hoogRisico: risicos.filter(r => (r.score || 0) >= 15).length,
        gemitigeerd: risicos.filter(r => r.status === 'gemitigeerd').length
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Risicolog</h1>
                    <p className="text-slate-500">Beheer en monitor programmarisico's</p>
                </div>
                <div className="flex gap-2">
                    <a
                        href="/20240517-Werken-aan-Programmas-Template-risicolog.xlsx"
                        download
                        className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
                    >
                        <Download className="w-4 h-4" />
                        Download Template
                    </a>
                    <button
                        onClick={() => setShowForm(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-[#003366] text-white rounded-lg hover:bg-[#0066cc]"
                    >
                        <Plus className="w-5 h-5" />
                        Nieuw risico
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-4 border border-slate-200">
                    <p className="text-sm text-slate-500">Totaal Risico's</p>
                    <p className="text-2xl font-bold text-slate-800">{stats.totaal}</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-slate-200">
                    <p className="text-sm text-slate-500">Open</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.open}</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-slate-200">
                    <p className="text-sm text-slate-500">Hoog Risico (≥15)</p>
                    <p className="text-2xl font-bold text-red-600">{stats.hoogRisico}</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-slate-200">
                    <p className="text-sm text-slate-500">Gemitigeerd</p>
                    <p className="text-2xl font-bold text-green-600">{stats.gemitigeerd}</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Zoeken..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                    />
                </div>
                <div className="flex gap-2 items-center">
                    <Filter className="w-4 h-4 text-slate-400" />
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                    >
                        <option value="all">Alle risico's</option>
                        <optgroup label="Status">
                            {statussen.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                        </optgroup>
                        <optgroup label="Categorie">
                            {categorieen.map(c => <option key={c} value={c}>{c}</option>)}
                        </optgroup>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-50">
                        <tr className="text-left text-sm text-slate-500">
                            <th className="px-6 py-4 font-medium">Score</th>
                            <th className="px-6 py-4 font-medium">Risico</th>
                            <th className="px-6 py-4 font-medium">Categorie</th>
                            <th className="px-6 py-4 font-medium">K × I</th>
                            <th className="px-6 py-4 font-medium">Eigenaar</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                            <th className="px-6 py-4 font-medium">Trend</th>
                            <th className="px-6 py-4 font-medium">Acties</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedRisicos.map((risico) => {
                            const statusObj = statussen.find(s => s.value === risico.status)
                            return (
                                <tr key={risico.id} className="border-t border-slate-100 hover:bg-slate-50">
                                    <td className="px-6 py-4">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white ${getRisicoScoreColor(risico.score || 0)}`}>
                                            {risico.score || 0}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-medium text-slate-800">{risico.titel}</p>
                                            <p className="text-sm text-slate-500 line-clamp-1">{risico.beschrijving}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-slate-600">{risico.categorie}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-slate-600">
                                            {risico.kans} × {risico.impact}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600">
                                        {risico.eigenaar || '-'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusObj?.color || ''}`}>
                                            {statusObj?.label || risico.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {getTrendIcon(risico.trend)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEdit(risico)}
                                                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg"
                                                aria-label="Bewerk risico"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(risico.id)}
                                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                                                aria-label="Verwijder risico"
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
                {sortedRisicos.length === 0 && (
                    <div className="text-center py-12">
                        <AlertTriangle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-500">Geen risico's gevonden</p>
                        <button
                            onClick={() => setShowForm(true)}
                            className="mt-4 text-[#003366] hover:underline"
                        >
                            Voeg je eerste risico toe
                        </button>
                    </div>
                )}
            </div>

            {/* Form Modal */}
            {showForm && (
                <RisicoForm
                    risico={editingRisico}
                    onSave={handleSave}
                    onCancel={() => { setShowForm(false); setEditingRisico(null) }}
                />
            )}
        </div>
    )
}

export default Risicos
