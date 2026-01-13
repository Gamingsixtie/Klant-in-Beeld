import { useState } from 'react'
import { useAppStore } from '../stores/appStore'
import {
    Plus,
    Edit2,
    Trash2,
    X,
    AlertCircle,
    Search,
    Download,
    Filter,
    Clock,
    CheckCircle2
} from 'lucide-react'

const prioriteiten = [
    { value: 'laag', label: 'Laag', color: 'bg-green-100 text-green-800' },
    { value: 'midden', label: 'Midden', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'hoog', label: 'Hoog', color: 'bg-orange-100 text-orange-800' },
    { value: 'kritiek', label: 'Kritiek', color: 'bg-red-100 text-red-800' }
]

const statussen = [
    { value: 'open', label: 'Open', color: 'bg-blue-100 text-blue-800' },
    { value: 'in_behandeling', label: 'In behandeling', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'wacht_op_besluit', label: 'Wacht op besluit', color: 'bg-purple-100 text-purple-800' },
    { value: 'opgelost', label: 'Opgelost', color: 'bg-green-100 text-green-800' },
    { value: 'gesloten', label: 'Gesloten', color: 'bg-gray-100 text-gray-600' }
]

const categorieen = [
    'Scope',
    'Planning',
    'Resources',
    'Stakeholders',
    'Technisch',
    'Organisatie',
    'Budget',
    'Kwaliteit'
]

const impactTypes = [
    'Vertraging',
    'Kostenverhoging',
    'Scope wijziging',
    'Kwaliteitsrisico',
    'Stakeholder relatie'
]

function IssueForm({ issue, onSave, onCancel }) {
    const [form, setForm] = useState(issue || {
        titel: '',
        beschrijving: '',
        categorie: '',
        prioriteit: 'midden',
        impact: '',
        impactOmschrijving: '',
        eigenaar: '',
        oplossing: '',
        status: 'open',
        datumGemeld: new Date().toISOString().split('T')[0],
        datumOpgelost: '',
        escalatieNodig: false
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        onSave(form)
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
                        {issue ? 'Issue bewerken' : 'Nieuw issue melden'}
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
                    {/* Titel en Prioriteit */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Titel *</label>
                            <input
                                type="text"
                                value={form.titel}
                                onChange={(e) => setForm({ ...form, titel: e.target.value })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                                required
                                placeholder="Korte, beschrijvende titel van het issue"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Prioriteit *</label>
                            <select
                                value={form.prioriteit}
                                onChange={(e) => setForm({ ...form, prioriteit: e.target.value })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                                required
                            >
                                {prioriteiten.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
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
                            placeholder="Beschrijf het issue in detail"
                        />
                    </div>

                    {/* Categorie en Impact */}
                    <div className="grid grid-cols-2 gap-4">
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
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Impact Type</label>
                            <select
                                value={form.impact}
                                onChange={(e) => setForm({ ...form, impact: e.target.value })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                            >
                                <option value="">Selecteer impact type...</option>
                                {impactTypes.map(i => <option key={i} value={i}>{i}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Impact omschrijving */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Impact Omschrijving</label>
                        <textarea
                            value={form.impactOmschrijving}
                            onChange={(e) => setForm({ ...form, impactOmschrijving: e.target.value })}
                            rows={2}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                            placeholder="Wat is de concrete impact op het programma?"
                        />
                    </div>

                    {/* Oplossing */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Voorgestelde Oplossing</label>
                        <textarea
                            value={form.oplossing}
                            onChange={(e) => setForm({ ...form, oplossing: e.target.value })}
                            rows={2}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                            placeholder="Welke oplossing wordt voorgesteld?"
                        />
                    </div>

                    {/* Eigenaar en Status */}
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
                        <div className="flex items-end">
                            <label className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50 w-full">
                                <input
                                    type="checkbox"
                                    checked={form.escalatieNodig}
                                    onChange={(e) => setForm({ ...form, escalatieNodig: e.target.checked })}
                                    className="text-[#003366] rounded"
                                />
                                <span className="text-sm text-slate-700">Escalatie nodig</span>
                            </label>
                        </div>
                    </div>

                    {/* Datums */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Datum Gemeld</label>
                            <input
                                type="date"
                                value={form.datumGemeld}
                                onChange={(e) => setForm({ ...form, datumGemeld: e.target.value })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Datum Opgelost</label>
                            <input
                                type="date"
                                value={form.datumOpgelost}
                                onChange={(e) => setForm({ ...form, datumOpgelost: e.target.value })}
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

function Issues() {
    const { issues, addIssue, updateIssue, deleteIssue } = useAppStore()
    const [showForm, setShowForm] = useState(false)
    const [editingIssue, setEditingIssue] = useState(null)
    const [filter, setFilter] = useState('all')
    const [search, setSearch] = useState('')

    const filteredIssues = issues.filter(i => {
        const matchesFilter = filter === 'all' || i.status === filter || i.prioriteit === filter || i.categorie === filter
        const matchesSearch = i.titel?.toLowerCase().includes(search.toLowerCase()) ||
            i.beschrijving?.toLowerCase().includes(search.toLowerCase())
        return matchesFilter && matchesSearch
    })

    // Sorteer op prioriteit (kritiek eerst)
    const prioriteitWaarde = { kritiek: 4, hoog: 3, midden: 2, laag: 1 }
    const sortedIssues = [...filteredIssues].sort((a, b) =>
        (prioriteitWaarde[b.prioriteit] || 0) - (prioriteitWaarde[a.prioriteit] || 0)
    )

    const handleSave = (form) => {
        if (editingIssue) {
            updateIssue(editingIssue.id, form)
        } else {
            addIssue(form)
        }
        setShowForm(false)
        setEditingIssue(null)
    }

    const handleEdit = (issue) => {
        setEditingIssue(issue)
        setShowForm(true)
    }

    const handleDelete = (id) => {
        if (confirm('Weet je zeker dat je dit issue wilt verwijderen?')) {
            deleteIssue(id)
        }
    }

    // Bereken dagen open
    const getDagenOpen = (datumGemeld) => {
        if (!datumGemeld) return '-'
        const start = new Date(datumGemeld)
        const nu = new Date()
        const diff = Math.floor((nu - start) / (1000 * 60 * 60 * 24))
        return diff
    }

    // Statistieken
    const stats = {
        totaal: issues.length,
        open: issues.filter(i => i.status === 'open' || i.status === 'in_behandeling').length,
        kritiek: issues.filter(i => i.prioriteit === 'kritiek' && i.status !== 'opgelost' && i.status !== 'gesloten').length,
        opgelost: issues.filter(i => i.status === 'opgelost' || i.status === 'gesloten').length,
        escalatie: issues.filter(i => i.escalatieNodig && i.status !== 'opgelost' && i.status !== 'gesloten').length
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Issuelog</h1>
                    <p className="text-slate-500">Beheer en track programma-issues</p>
                </div>
                <div className="flex gap-2">
                    <a
                        href="/20240517-Werken-aan-Programmas-Template-issuelog.xlsx"
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
                        Nieuw issue
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-5 gap-4">
                <div className="bg-white rounded-xl p-4 border border-slate-200">
                    <p className="text-sm text-slate-500">Totaal Issues</p>
                    <p className="text-2xl font-bold text-slate-800">{stats.totaal}</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-slate-200">
                    <p className="text-sm text-slate-500">Open</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.open}</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-slate-200">
                    <p className="text-sm text-slate-500">Kritiek</p>
                    <p className="text-2xl font-bold text-red-600">{stats.kritiek}</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-slate-200">
                    <p className="text-sm text-slate-500">Escalatie</p>
                    <p className="text-2xl font-bold text-orange-600">{stats.escalatie}</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-slate-200">
                    <p className="text-sm text-slate-500">Opgelost</p>
                    <p className="text-2xl font-bold text-green-600">{stats.opgelost}</p>
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
                        <option value="all">Alle issues</option>
                        <optgroup label="Status">
                            {statussen.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                        </optgroup>
                        <optgroup label="Prioriteit">
                            {prioriteiten.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
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
                            <th className="px-6 py-4 font-medium">Prioriteit</th>
                            <th className="px-6 py-4 font-medium">Issue</th>
                            <th className="px-6 py-4 font-medium">Categorie</th>
                            <th className="px-6 py-4 font-medium">Eigenaar</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                            <th className="px-6 py-4 font-medium">Dagen Open</th>
                            <th className="px-6 py-4 font-medium">Acties</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedIssues.map((issue) => {
                            const statusObj = statussen.find(s => s.value === issue.status)
                            const prioriteitObj = prioriteiten.find(p => p.value === issue.prioriteit)
                            const dagenOpen = getDagenOpen(issue.datumGemeld)

                            return (
                                <tr key={issue.id} className="border-t border-slate-100 hover:bg-slate-50">
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${prioriteitObj?.color || ''}`}>
                                            {prioriteitObj?.label || issue.prioriteit}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-start gap-2">
                                            {issue.escalatieNodig && (
                                                <AlertCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                                            )}
                                            <div>
                                                <p className="font-medium text-slate-800">{issue.titel}</p>
                                                <p className="text-sm text-slate-500 line-clamp-1">{issue.beschrijving}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-slate-600">{issue.categorie}</span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600">
                                        {issue.eigenaar || '-'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusObj?.color || ''}`}>
                                            {statusObj?.label || issue.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1">
                                            {issue.status === 'opgelost' || issue.status === 'gesloten' ? (
                                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                            ) : (
                                                <>
                                                    <Clock className={`w-4 h-4 ${dagenOpen > 14 ? 'text-red-500' : dagenOpen > 7 ? 'text-orange-500' : 'text-slate-400'}`} />
                                                    <span className={`text-sm ${dagenOpen > 14 ? 'text-red-600 font-medium' : 'text-slate-600'}`}>
                                                        {dagenOpen}d
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEdit(issue)}
                                                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg"
                                                aria-label="Bewerk issue"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(issue.id)}
                                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                                                aria-label="Verwijder issue"
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
                {sortedIssues.length === 0 && (
                    <div className="text-center py-12">
                        <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-500">Geen issues gevonden</p>
                        <button
                            onClick={() => setShowForm(true)}
                            className="mt-4 text-[#003366] hover:underline"
                        >
                            Meld je eerste issue
                        </button>
                    </div>
                )}
            </div>

            {/* Form Modal */}
            {showForm && (
                <IssueForm
                    issue={editingIssue}
                    onSave={handleSave}
                    onCancel={() => { setShowForm(false); setEditingIssue(null) }}
                />
            )}
        </div>
    )
}

export default Issues
