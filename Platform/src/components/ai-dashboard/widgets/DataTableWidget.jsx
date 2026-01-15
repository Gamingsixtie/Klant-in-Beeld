import { useMemo, useState, useRef, useEffect, useCallback } from 'react'
import { useAppStore } from '../../../stores/appStore'
import { X, Clock, CheckCircle, AlertCircle, AlertTriangle, ChevronDown, Table } from 'lucide-react'

const statusConfig = {
  planned: { label: 'Gepland', icon: Clock, bg: 'bg-slate-100', text: 'text-slate-700' },
  in_progress: { label: 'Actief', icon: AlertCircle, bg: 'bg-blue-100', text: 'text-blue-700' },
  completed: { label: 'Klaar', icon: CheckCircle, bg: 'bg-green-100', text: 'text-green-700' },
  open: { label: 'Open', icon: AlertTriangle, bg: 'bg-amber-100', text: 'text-amber-700' }
}

// Row height for virtual scrolling
const ROW_HEIGHT = 44
const VISIBLE_ROWS = 8
const BUFFER_ROWS = 3

export default function DataTableWidget({ config, onRemove }) {
  const { baten, inspanningen, risicos } = useAppStore()
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: VISIBLE_ROWS + BUFFER_ROWS })
  const containerRef = useRef(null)
  const [isExpanded, setIsExpanded] = useState(false)

  // Get all data based on dataSource
  const { columns, allRows } = useMemo(() => {
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
        allRows: data.map(i => ({
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
        allRows: data.map(r => ({
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
        allRows: baten.map(b => ({
          id: b.id,
          naam: b.naam,
          sector: b.sector?.split(' ')[0] || '-',
          nps: `+${b.huidigeWaarde || 0}`
        }))
      }
    }

    return { columns: [], allRows: [] }
  }, [config, inspanningen, risicos, baten])

  // Handle scroll for virtual scrolling
  const handleScroll = useCallback(() => {
    if (!containerRef.current || !isExpanded) return

    const scrollTop = containerRef.current.scrollTop
    const startIndex = Math.floor(scrollTop / ROW_HEIGHT)
    const endIndex = Math.min(
      startIndex + VISIBLE_ROWS + BUFFER_ROWS * 2,
      allRows.length
    )

    setVisibleRange({
      start: Math.max(0, startIndex - BUFFER_ROWS),
      end: endIndex
    })
  }, [allRows.length, isExpanded])

  // Setup scroll listener
  useEffect(() => {
    const container = containerRef.current
    if (container && isExpanded) {
      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll, isExpanded])

  // Get visible rows based on expansion state
  const displayRows = useMemo(() => {
    if (!isExpanded) {
      return allRows.slice(0, VISIBLE_ROWS)
    }
    return allRows.slice(visibleRange.start, visibleRange.end)
  }, [allRows, isExpanded, visibleRange])

  // Calculate total height for virtual scrolling
  const totalHeight = allRows.length * ROW_HEIGHT
  const offsetY = visibleRange.start * ROW_HEIGHT

  if (allRows.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl">
            <Table className="w-4 h-4 text-slate-500" />
          </div>
          <h3 className="text-sm font-semibold text-slate-800">{config.title}</h3>
        </div>
        <div className="text-sm text-slate-500 text-center py-8">Geen data beschikbaar</div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 relative group shadow-sm hover:shadow-lg transition-shadow">
      {/* Remove button */}
      {onRemove && (
        <button
          onClick={onRemove}
          className="absolute top-3 right-3 p-1.5 bg-slate-100 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-slate-200 z-10"
        >
          <X className="w-3.5 h-3.5 text-slate-500" />
        </button>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-md shadow-indigo-500/20">
            <Table className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-800">{config.title}</h3>
            <p className="text-xs text-slate-400 mt-0.5">{allRows.length} items</p>
          </div>
        </div>

        {/* Expand/collapse toggle */}
        {allRows.length > VISIBLE_ROWS && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {isExpanded ? 'Minder tonen' : `+${allRows.length - VISIBLE_ROWS} meer`}
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-slate-100">
        {/* Header */}
        <div className="flex gap-2 px-3 py-2.5 bg-slate-50 border-b border-slate-100 text-xs font-medium text-slate-500 uppercase tracking-wide">
          {columns.map(col => (
            <div key={col.key} className={col.width}>{col.label}</div>
          ))}
        </div>

        {/* Scrollable rows container */}
        <div
          ref={containerRef}
          className={`overflow-y-auto ${isExpanded ? 'max-h-80' : ''}`}
          style={isExpanded ? { height: Math.min(totalHeight, 320) } : {}}
        >
          {/* Virtual scroll container */}
          {isExpanded ? (
            <div style={{ height: totalHeight, position: 'relative' }}>
              <div style={{ transform: `translateY(${offsetY}px)` }}>
                {displayRows.map(row => (
                  <TableRow
                    key={row.id}
                    row={row}
                    columns={columns}
                    height={ROW_HEIGHT}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {displayRows.map(row => (
                <TableRow
                  key={row.id}
                  row={row}
                  columns={columns}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Extracted row component for better performance
function TableRow({ row, columns, height }) {
  return (
    <div
      className="flex gap-2 px-3 py-2 text-sm items-center hover:bg-slate-50 transition-colors"
      style={height ? { height } : {}}
    >
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
  )
}
