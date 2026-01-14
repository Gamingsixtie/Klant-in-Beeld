import { useMemo } from 'react'
import { useMethodologieStore } from '../../../stores/methodologieStore'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Area, AreaChart } from 'recharts'
import { X, TrendingUp, Target } from 'lucide-react'

// Custom tooltip component
const CustomTooltip = ({ active, payload, label, metric }) => {
  if (active && payload && payload.length) {
    const data = payload[0]
    const isProjected = data.dataKey === 'projected'
    return (
      <div className="bg-slate-900 shadow-xl rounded-xl border border-slate-700 px-4 py-3 backdrop-blur-sm">
        <p className="font-semibold text-white text-sm">{label}</p>
        <div className="flex items-center gap-2 mt-1.5">
          <span className={`w-2 h-2 rounded-full ${isProjected ? 'bg-slate-400' : 'bg-blue-400'}`} />
          <span className="text-slate-400 text-xs">{isProjected ? 'Projectie' : 'Actueel'}</span>
          <span className="text-white font-semibold text-sm ml-1">
            {data.value}{metric === 'nps' ? '' : '%'}
          </span>
        </div>
      </div>
    )
  }
  return null
}

export default function LineChartWidget({ config, onRemove }) {
  const { voortgang } = useMethodologieStore()

  // Generate trend data based on dataSource
  const { chartData, goalValue, currentValue, metric } = useMemo(() => {
    const { entity, metric } = config.dataSource || {}

    // Simulated progress data per month
    if (entity === 'voortgang' || metric === 'trend') {
      const currentMonth = Math.min(
        Math.ceil((voortgang?.huidigeWeek || 4) / 4) +
        (['Verkennen', 'Opbouwen', 'Uitvoeren', 'Afbouwen'].indexOf(voortgang?.huidigeCyclus || 'Verkennen') * 3),
        18
      )

      const data = []
      let lastActual = 0
      for (let i = 1; i <= 18; i++) {
        if (i <= currentMonth) {
          // Actual data - simulated growth curve
          const baseProgress = (i / 18) * 100
          const variance = Math.sin(i * 0.5) * 5
          lastActual = Math.round(Math.min(baseProgress + variance, 100))
          data.push({
            month: `M${i}`,
            value: lastActual,
            type: 'actual'
          })
        } else {
          // Projected data
          const projected = ((i / 18) * 100)
          data.push({
            month: `M${i}`,
            projected: Math.round(projected),
            type: 'projected'
          })
        }
      }
      return { chartData: data, goalValue: 100, currentValue: lastActual, metric: 'progress' }
    }

    // NPS trend simulation
    if (metric === 'nps') {
      const data = [
        { month: 'Start', value: 15 },
        { month: 'M3', value: 18 },
        { month: 'M6', value: 22 },
        { month: 'M9', value: 28 },
        { month: 'M12', projected: 32 },
        { month: 'M15', projected: 36 },
        { month: 'M18', projected: 40 }
      ]
      return { chartData: data, goalValue: 40, currentValue: 28, metric: 'nps' }
    }

    return { chartData: [], goalValue: null, currentValue: 0, metric: '' }
  }, [config, voortgang])

  if (chartData.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <div className="text-sm text-slate-500">Geen trend data beschikbaar</div>
      </div>
    )
  }

  // Calculate progress towards goal
  const progressToGoal = goalValue ? Math.round((currentValue / goalValue) * 100) : 0

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
          <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-md shadow-emerald-500/20">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-800">{config.title}</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Huidig: {currentValue}{metric === 'nps' ? '' : '%'} van {goalValue}{metric === 'nps' ? '' : '%'}
            </p>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center gap-2">
          <div className="text-right">
            <span className="text-lg font-bold text-slate-800">{progressToGoal}%</span>
            <p className="text-[10px] text-slate-400">van doel</p>
          </div>
          <div className="w-10 h-10 relative">
            <svg className="w-10 h-10 transform -rotate-90">
              <circle
                cx="20"
                cy="20"
                r="16"
                fill="none"
                stroke="#E2E8F0"
                strokeWidth="3"
              />
              <circle
                cx="20"
                cy="20"
                r="16"
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth="3"
                strokeDasharray={`${progressToGoal} ${100 - progressToGoal}`}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#0D9488" />
                </linearGradient>
              </defs>
            </svg>
            <Target className="w-4 h-4 text-emerald-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#003366" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#003366" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="projectedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#94A3B8" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#94A3B8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 10, fill: '#94A3B8' }}
              stroke="#E2E8F0"
              axisLine={{ stroke: '#E2E8F0' }}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fontSize: 10, fill: '#94A3B8' }}
              stroke="#E2E8F0"
              axisLine={false}
              tickLine={false}
              domain={[0, 'auto']}
            />
            <Tooltip content={<CustomTooltip metric={metric} />} />
            {goalValue && (
              <ReferenceLine
                y={goalValue}
                stroke="#10B981"
                strokeDasharray="5 5"
                strokeWidth={2}
              >
                <label value="Doel" position="right" fontSize={10} fill="#10B981" />
              </ReferenceLine>
            )}
            {/* Actual area */}
            <Area
              type="monotone"
              dataKey="value"
              stroke="#003366"
              strokeWidth={3}
              fill="url(#actualGradient)"
              dot={{ fill: '#003366', r: 4, strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 6, fill: '#003366', stroke: '#fff', strokeWidth: 2 }}
            />
            {/* Projected area */}
            <Area
              type="monotone"
              dataKey="projected"
              stroke="#94A3B8"
              strokeWidth={2}
              strokeDasharray="6 4"
              fill="url(#projectedGradient)"
              dot={{ fill: '#94A3B8', r: 3, strokeWidth: 2, stroke: '#fff' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-3 pt-3 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-[#003366] rounded-full" />
          <span className="text-xs text-slate-500">Actueel</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-slate-400 rounded-full opacity-60" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #94A3B8 0, #94A3B8 4px, transparent 4px, transparent 8px)' }} />
          <span className="text-xs text-slate-500">Projectie</span>
        </div>
        {goalValue && (
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-emerald-500" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #10B981 0, #10B981 3px, transparent 3px, transparent 6px)' }} />
            <span className="text-xs text-slate-500">Doel ({goalValue}{metric === 'nps' ? '' : '%'})</span>
          </div>
        )}
      </div>
    </div>
  )
}
