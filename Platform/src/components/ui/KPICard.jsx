/**
 * KPICard Component
 *
 * Herbruikbare KPI/statistiek kaart met optionele trend indicator en progress bar.
 * Ondersteunt loading state met skeleton.
 */

import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

// Skeleton component voor loading state
function KPICardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 min-h-[140px] flex flex-col animate-pulse">
      <div className="flex items-center justify-between mb-3">
        <div className="h-4 w-20 bg-gray-200 rounded" />
        <div className="h-4 w-4 bg-gray-200 rounded" />
      </div>
      <div className="h-8 w-16 bg-gray-200 rounded mb-2" />
      <div className="mt-auto">
        <div className="h-2 w-full bg-gray-200 rounded-full" />
      </div>
    </div>
  )
}

// Trend badge sub-component
function TrendBadge({ direction, value, sentiment }) {
  const icons = {
    up: TrendingUp,
    down: TrendingDown,
    stable: Minus
  }

  const colors = {
    positive: 'text-green-600 bg-green-50',
    negative: 'text-red-600 bg-red-50',
    neutral: 'text-gray-600 bg-gray-50'
  }

  const Icon = icons[direction]
  const colorClass = colors[sentiment]

  return (
    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium ${colorClass}`}>
      <Icon className="w-3 h-3" />
      {value}
    </span>
  )
}

export function KPICard({
  // Content
  label,
  value,
  subtext,
  icon: Icon,

  // Visual
  variant = 'default',
  accentColor,
  trend,
  progress,

  // States
  isLoading = false,

  // Interaction
  onClick,
  className = ''
}) {
  if (isLoading) {
    return <KPICardSkeleton />
  }

  const variantClasses = {
    default: 'border-gray-100',
    highlight: 'border-[var(--color-cito-blue)] bg-[var(--color-cito-blue)]/5',
    warning: 'border-amber-300 bg-amber-50',
    success: 'border-green-300 bg-green-50'
  }

  const baseClasses = [
    'bg-white rounded-xl border p-4',
    'flex flex-col min-h-[140px]',
    'hover:shadow-md hover:border-gray-200',
    'transition-all duration-200',
    variantClasses[variant],
    onClick && 'cursor-pointer',
    className
  ].filter(Boolean).join(' ')

  const handleKeyDown = (e) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      onClick()
    }
  }

  return (
    <div
      className={baseClasses}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? `${label}: ${value}` : undefined}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-gray-500">{label}</span>
        {Icon && (
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: accentColor ? `${accentColor}15` : 'var(--gray-100)' }}
          >
            <Icon
              className="w-4 h-4"
              style={{ color: accentColor || 'var(--gray-500)' }}
            />
          </div>
        )}
      </div>

      {/* Value + Trend */}
      <div className="flex items-baseline gap-2 flex-wrap">
        <span className="text-3xl font-bold text-gray-800 number-animate">{value}</span>
        {trend && (
          <TrendBadge
            direction={trend.direction}
            value={trend.value}
            sentiment={trend.sentiment}
          />
        )}
      </div>

      {/* Progress bar */}
      {progress && (
        <div className="mt-auto pt-3">
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out progress-animate"
                style={{
                  width: `${Math.min((progress.current / progress.total) * 100, 100)}%`,
                  backgroundColor: progress.color || 'var(--color-cito-blue)'
                }}
              />
            </div>
            <span className="text-xs text-gray-500 font-medium tabular-nums">
              {progress.current}/{progress.total}
            </span>
          </div>
        </div>
      )}

      {/* Subtext (only shown when no progress) */}
      {subtext && !progress && (
        <span className="mt-auto text-xs text-gray-500">{subtext}</span>
      )}
    </div>
  )
}

export default KPICard
