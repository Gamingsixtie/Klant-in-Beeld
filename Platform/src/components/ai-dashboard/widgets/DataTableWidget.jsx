import { useMemo } from 'react'
import { useAppStore } from '../../../stores/appStore'
import { X, Clock, CheckCircle, AlertCircle, AlertTriangle } from 'lucide-react'

const statusConfig = {
  planned: { label: 'Gepland', icon: Clock, bg: 'bg-slate-100', text: 'text-slate-700' },
  in_progress: { label: 'Actief', icon: AlertCircle, bg: 'bg-blue-100', text: 'text-blue-700' },
  completed: { label: 'Klaar', icon: CheckCircle, bg: 'bg-green-100', text: 'text-green-700' },
  open: { label: 'Open', icon: AlertTriangle, bg: 'bg-amber-100', text: 'text-amber-700' }
}

export default function DataTableWidget({ config, onRemove }) {
  const { baten, inspanningen, risicos } = useAppStore()

  // Get data based on dataSource
  const { columns, rows } = useMemo(() => {
    const { entity, filter, sortBy, order } = config.dataSource || {}

    if (entity === 'inspanningen') {
      let data = [...inspanningen]

      // Apply filter
      if (filter?.status) {
        data = data.filter(i => i.status === filter.status)
      }

      // Apply sort
      if (sortBy) {
        data.sort((a, b) => {
          const aVal = a[sortBy] || 0
          const bVal = b[sortBy] || 0
          return order === 'desc' ? bVal - aVal : aVal - bVal
        })
      }

      return {
        columns: [
          { key: 'code', label: 'Code', width: 'w-20' },
          { key: 'naam', label: 'Naam', width: 'flex-1' },
          { key: 'status', label: 'Status', width: 'w-24' },
          { key: 'periode', label: 'Periode', width: 'w-24' }
        ],
        rows: data.slice(0, 8).map(i => ({
          id: i.id,
          code: i.code,
          naam: i.naam,
          status: i.status,
          periode: `M${i.startMaand}-M${i.eindMaand}`
        }))
      }
    }

    if (entity === 'risicos') {
      let data = [...risicos]

      // Apply sort
      if (sortBy) {
        data.sort((a, b) => {
          const aVal = a[sortBy] || 0
          const bVal = b[sortBy] || 0
          return order === 'desc' ? bVal - aVal : aVal - bVal
        })
      }

      return {
        columns: [
          { key: 'titel', label: 'Risico', width: 'flex-1' },
          { key: 'score', label: 'Score', width: 'w-16' },
          { key: 'status', label: 'Status', width: 'w-24' }
        ],
        rows: data.slice(0, 8).map(r => ({
          id: r.id,
          titel: r.titel,
          score: r.score || (r.kans * r.impact) || 0,
          status: r.status
        }))
      }
    }

    if (entity === 'baten') {
      return {
        columns: [
          { key: 'naam', label: 'Baat', width: 'flex-1' },
          { key: 'sector', label: 'Sector', width: 'w-28' },
          { key: 'nps', label: 'NPS', width: 'w-20' }
        ],
        rows: baten.slice(0, 8).map(b => ({
          id: b.id,
          naam: b.naam,
          sector: b.sector?.split(' ')[0] || '-',
          nps: `+${b.huidigeWaarde || 0}`
        }))
      }
    }

    return { columns: [], rows: [] }
  }, [config, inspanningen, risicos, baten])

  if (rows.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <h3 className="text-sm font-semibold text-slate-700 mb-3">{config.title}</h3>
        <div className="text-sm text-slate-500 text-center py-4">Geen data beschikbaar</div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 relative group">
      {onRemove && (
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 p-1 bg-slate-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-slate-200 z-10"
        >
          <X className="w-3 h-3 text-slate-500" />
        </button>
      )}
      <h3 className="text-sm font-semibold text-slate-700 mb-3">{config.title}</h3>
      <div className="overflow-hidden">
        {/* Header */}
        <div className="flex gap-2 pb-2 border-b border-slate-200 text-xs font-medium text-slate-500 uppercase tracking-wide">
          {columns.map(col => (
            <div key={col.key} className={col.width}>{col.label}</div>
          ))}
        </div>

        {/* Rows */}
        <div className="divide-y divide-slate-100">
          {rows.map(row => (
            <div key={row.id} className="flex gap-2 py-2 text-sm items-center">
              {columns.map(col => {
                if (col.key === 'status') {
                  const cfg = statusConfig[row.status] || statusConfig.open
                  const Icon = cfg.icon
                  return (
                    <div key={col.key} className={col.width}>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${cfg.bg} ${cfg.text}`}>
                        <Icon className="w-3 h-3" />
                        {cfg.label}
                      </span>
                    </div>
                  )
                }
                if (col.key === 'score') {
                  const score = row[col.key]
                  const isHigh = score >= 15
                  return (
                    <div key={col.key} className={`${col.width} font-mono text-xs`}>
                      <span className={isHigh ? 'text-red-600 font-bold' : 'text-slate-600'}>
                        {score}
                      </span>
                    </div>
                  )
                }
                return (
                  <div key={col.key} className={`${col.width} truncate text-slate-700`}>
                    {row[col.key]}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
