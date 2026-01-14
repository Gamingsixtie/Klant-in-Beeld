import { useMemo } from 'react'
import { useAppStore } from '../../../stores/appStore'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { X, BarChart3 } from 'lucide-react'

const COLORS = {
  'Primair onderwijs': '#3B82F6',
  'Voortgezet onderwijs': '#8B5CF6',
  'Zakelijk Professionals': '#10B981',
  'Mens': '#3B82F6',
  'Proces': '#10B981',
  'Systeem': '#8B5CF6',
  'Cultuur': '#F59E0B',
  default: '#64748B'
}

// Premium gradient definitions for bars
const GRADIENTS = {
  'Primair onderwijs': ['#60A5FA', '#3B82F6'],
  'Voortgezet onderwijs': ['#A78BFA', '#8B5CF6'],
  'Zakelijk Professionals': ['#34D399', '#10B981'],
  'Mens': ['#60A5FA', '#3B82F6'],
  'Proces': ['#34D399', '#10B981'],
  'Systeem': ['#A78BFA', '#8B5CF6'],
  'Cultuur': ['#FBBF24', '#F59E0B'],
  default: ['#94A3B8', '#64748B']
}

// Custom tooltip component
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-slate-900 shadow-xl rounded-xl border border-slate-700 px-4 py-3 backdrop-blur-sm">
        <p className="font-semibold text-white text-sm">{data.fullName}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: data.color }} />
          <span className="text-slate-300 text-sm font-medium">{data.value}{data.suffix || ''}</span>
        </div>
      </div>
    )
  }
  return null
}

export default function BarChartWidget({ config, onRemove }) {
  const { baten, inspanningen } = useAppStore()

  // Calculate data based on dataSource
  const { chartData, suffix, maxValue } = useMemo(() => {
    const { entity, metric, groupBy } = config.dataSource || {}

    if (entity === 'baten' && groupBy === 'sector') {
      const sectors = ['Primair onderwijs', 'Voortgezet onderwijs', 'Zakelijk Professionals']
      const data = sectors.map(sector => {
        const sectorBaten = baten.filter(b => b.sector === sector)
        const avgNPS = sectorBaten.length > 0
          ? Math.round(sectorBaten.reduce((sum, b) => sum + (parseFloat(b.huidigeWaarde) || 0), 0) / sectorBaten.length)
          : 0
        return {
          name: sector.split(' ')[0],
          fullName: sector,
          value: avgNPS,
          color: COLORS[sector],
          gradient: GRADIENTS[sector],
          suffix: ''
        }
      })
      return { chartData: data, suffix: '', maxValue: Math.max(...data.map(d => d.value), 50) }
    }

    if (entity === 'baten' && groupBy === 'domein') {
      const domeinen = ['Mens', 'Proces', 'Systeem', 'Cultuur']
      const data = domeinen.map(domein => {
        const domeinBaten = baten.filter(b => b.domein === domein)
        const metKoppeling = domeinBaten.filter(baat =>
          inspanningen.some(insp => insp.gekoppeldeBaten?.includes(String(baat.id)))
        ).length
        const dekking = domeinBaten.length > 0
          ? Math.round((metKoppeling / domeinBaten.length) * 100)
          : 0
        return {
          name: domein,
          fullName: domein,
          value: dekking,
          color: COLORS[domein],
          gradient: GRADIENTS[domein],
          suffix: '%'
        }
      })
      return { chartData: data, suffix: '%', maxValue: 100 }
    }

    if (entity === 'inspanningen' && groupBy === 'type') {
      const types = [
        { key: 'project', label: 'Project' },
        { key: 'proces', label: 'Proces' },
        { key: 'leer', label: 'Leertraject' },
        { key: 'systeem', label: 'Systeem' }
      ]
      const data = types.map(type => ({
        name: type.label,
        fullName: type.label,
        value: inspanningen.filter(i => i.type === type.key).length,
        color: COLORS.default,
        gradient: GRADIENTS.default,
        suffix: ''
      }))
      return { chartData: data, suffix: '', maxValue: Math.max(...data.map(d => d.value), 5) }
    }

    return { chartData: [], suffix: '', maxValue: 100 }
  }, [config, baten, inspanningen])

  if (chartData.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <div className="text-sm text-slate-500">Geen data beschikbaar</div>
      </div>
    )
  }

  // Calculate totals for header
  const total = chartData.reduce((sum, d) => sum + d.value, 0)
  const avg = Math.round(total / chartData.length)

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
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-md shadow-blue-500/20">
            <BarChart3 className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-800">{config.title}</h3>
            <p className="text-xs text-slate-400 mt-0.5">Gemiddeld: {avg}{suffix}</p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <defs>
              {chartData.map((entry, index) => (
                <linearGradient key={`gradient-${index}`} id={`barGradient-${index}`} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={entry.gradient?.[0] || GRADIENTS.default[0]} />
                  <stop offset="100%" stopColor={entry.gradient?.[1] || GRADIENTS.default[1]} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" horizontal={true} vertical={false} />
            <XAxis
              type="number"
              tick={{ fontSize: 11, fill: '#94A3B8' }}
              stroke="#E2E8F0"
              axisLine={{ stroke: '#E2E8F0' }}
              tickLine={{ stroke: '#E2E8F0' }}
              domain={[0, maxValue]}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fontSize: 12, fill: '#475569', fontWeight: 500 }}
              stroke="#E2E8F0"
              axisLine={false}
              tickLine={false}
              width={70}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F1F5F9', radius: 8 }} />
            <Bar
              dataKey="value"
              radius={[0, 8, 8, 0]}
              barSize={32}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`url(#barGradient-${index})`}
                  style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-3 pt-3 border-t border-slate-100">
        {chartData.slice(0, 4).map((entry, index) => (
          <div key={index} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-xs text-slate-500">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
