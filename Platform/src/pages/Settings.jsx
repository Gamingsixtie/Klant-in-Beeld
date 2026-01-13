import { useState } from 'react'
import {
  Database,
  Key,
  Palette,
  Bell,
  Download,
  Upload,
  Info,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

function Settings() {
  const [supabaseUrl, setSupabaseUrl] = useState('')
  const [supabaseKey, setSupabaseKey] = useState('')
  const [claudeKey, setClaudeKey] = useState('')
  const [connectionStatus, setConnectionStatus] = useState(null)
  const [theme, setTheme] = useState('light')

  const handleTestConnection = () => {
    // Simulate connection test
    setConnectionStatus('testing')
    setTimeout(() => {
      if (supabaseUrl && supabaseKey) {
        setConnectionStatus('success')
      } else {
        setConnectionStatus('error')
      }
    }, 1500)
  }

  const handleExport = () => {
    // Export data to JSON
    const data = localStorage.getItem('app-storage')
    const blob = new Blob([data || '{}'], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `klant-in-beeld-backup-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result)
          localStorage.setItem('app-storage', JSON.stringify(data))
          alert('Data succesvol geïmporteerd. Herlaad de pagina om de wijzigingen te zien.')
        } catch {
          alert('Ongeldig bestandsformaat')
        }
      }
      reader.readAsText(file)
    }
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Instellingen</h1>
        <p className="text-slate-500">Configureer het platform naar wens</p>
      </div>

      {/* Database Connection */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Database className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Database Connectie</h2>
            <p className="text-sm text-slate-500">Supabase configuratie voor cloud opslag</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Supabase URL</label>
            <input
              type="text"
              value={supabaseUrl}
              onChange={(e) => setSupabaseUrl(e.target.value)}
              placeholder="https://xxxx.supabase.co"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Supabase Anon Key</label>
            <input
              type="password"
              value={supabaseKey}
              onChange={(e) => setSupabaseKey(e.target.value)}
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleTestConnection}
              className="px-4 py-2 bg-[#003366] text-white rounded-lg hover:bg-[#0066cc]"
            >
              Test Verbinding
            </button>
            {connectionStatus === 'testing' && (
              <span className="text-sm text-slate-500">Verbinding testen...</span>
            )}
            {connectionStatus === 'success' && (
              <span className="flex items-center gap-1 text-sm text-green-600">
                <CheckCircle className="w-4 h-4" />
                Verbinding succesvol
              </span>
            )}
            {connectionStatus === 'error' && (
              <span className="flex items-center gap-1 text-sm text-red-600">
                <AlertCircle className="w-4 h-4" />
                Verbinding mislukt
              </span>
            )}
          </div>
        </div>
      </div>

      {/* AI Configuration */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Key className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-800">AI Integratie</h2>
            <p className="text-sm text-slate-500">Claude API configuratie</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Claude API Key</label>
            <input
              type="password"
              value={claudeKey}
              onChange={(e) => setClaudeKey(e.target.value)}
              placeholder="sk-ant-..."
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
            />
            <p className="mt-1 text-xs text-slate-500">
              Verkrijgbaar via console.anthropic.com
            </p>
          </div>
        </div>
      </div>

      {/* Theme */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-orange-100 rounded-lg">
            <Palette className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Weergave</h2>
            <p className="text-sm text-slate-500">Pas het uiterlijk aan</p>
          </div>
        </div>

        <div className="flex gap-4">
          {['light', 'dark'].map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`flex-1 p-4 rounded-lg border-2 transition-colors ${
                theme === t
                  ? 'border-[#003366] bg-[#003366]/5'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className={`h-20 rounded mb-2 ${t === 'light' ? 'bg-white border border-slate-200' : 'bg-slate-800'}`} />
              <span className="text-sm font-medium capitalize">{t === 'light' ? 'Licht' : 'Donker'}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Data Export/Import */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-100 rounded-lg">
            <Download className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Data Beheer</h2>
            <p className="text-sm text-slate-500">Export en import van data</p>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200"
          >
            <Download className="w-4 h-4" />
            Export Data
          </button>
          <label className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 cursor-pointer">
            <Upload className="w-4 h-4" />
            Import Data
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Info */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-slate-100 rounded-lg">
            <Info className="w-5 h-5 text-slate-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Over</h2>
          </div>
        </div>

        <div className="space-y-2 text-sm text-slate-600">
          <p><strong>Applicatie:</strong> Klant in Beeld Platform</p>
          <p><strong>Versie:</strong> 1.0.0</p>
          <p><strong>Organisatie:</strong> Cito</p>
          <p><strong>Methodiek:</strong> Werken met Programma's</p>
        </div>
      </div>
    </div>
  )
}

export default Settings
