/**
 * KPICard Widget
 * Premium KPI display with circular progress and trend indicators
 */

import { useMemo, forwardRef } from 'react'
import { useAppStore } from '../../../stores/appStore'
import { useMethodologieStore } from '../../../stores/methodologieStore'
import { TrendingUp, TrendingDown, Minus, X, Target, Users, Zap, AlertTriangle, RefreshCw } from 'lucide-react'
import { getLoadingAriaProps } from '../../../utils/accessibility'

// ============================================================================
// Sub-components
// ============================================================================

/**
 * Animated circular progress component
 * Accessible with proper ARIA attributes
 */
function CircularProgress({ value, size = 56, strokeWidth = 4, color = '#10B981', label }) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (value / 100) * circumference

  return (
    <svg
      width={size}
      height={size}
      className="transform -rotate-90"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label || `${value}% voltooid`}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className="text-white/20"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-1000 ease-out"
      />
    </svg>
  )
}

/**
 * Loading skeleton for KPI card
 */
export function KPICardSkeleton() {
  return (
    <div className="bg-gradient-to-br from-slate-300 to-slate-400 rounded-2xl p-5 animate-pulse">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 bg-white/20 rounded-lg" />
        <div className="w-20 h-3 bg-white/30 rounded" />
      </div>
      <div className="flex items-center justify-between">
        <div className="w-24 h-12 bg-white/30 rounded" />
        <div className="w-12 h-12 bg-white/20 rounded-xl" />
      </div>
      <div className="mt-3 pt-3 border-t border-white/10">
        <div className="w-16 h-2 bg-white/20 rounded" />
      </div>
    </div>
  )
}

// ============================================================================
// Constants
// ============================================================================

// Icon mapping for different KPI types
const KPI_ICONS = {
  gereedheid: Target,
  baten: Users,
  inspanningen: Zap,
  risicos: AlertTriangle
}

// Premium color schemes with gradients and glows
const STATUS_STYLES = {
  success: {
    bg: 'bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600',
    glow: 'shadow-lg shadow-emerald-500/30',
    accent: '#10B981',
    trendColor: 'text-emerald-200'
  },
  warning: {
    bg: 'bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600',
    glow: 'shadow-lg shadow-amber-500/30',
    accent: '#F59E0B',
    trendColor: 'text-amber-200'
  },
  error: {
    bg: 'bg-gradient-to-br from-rose-500 via-red-500 to-pink-600',
    glow: 'shadow-lg shadow-rose-500/30',
    accent: '#EF4444',
    trendColor: 'text-rose-200'
  },
  neutral: {
    bg: 'bg-gradient-to-br from-slate-500 via-slate-600 to-slate-700',
    glow: 'shadow-lg shadow-slate-500/20',
    accent: '#64748B',
    trendColor: 'text-slate-300'
  }
}

// ============================================================================
// Data Processing Hook
// ============================================================================

/**
 * Custom hook for processing KPI data
 * Encapsulates all data calculation logic
 */
function useKPIData(config) {
  const { baten, inspanningen, risicos } = useAppStore()
  const { getCyclusVoortgang, getStuurparametersMetMetadata } = useMethodologieStore()

  return useMemo(() => {
    const { entity, metric, aggregation, filter } = config?.dataSource || {}

    // Gereedheid calculation
    if (entity === 'stuurparameters' && metric === 'gereedheid') {
      const cyclusVoortgang = getCyclusVoortgang ? getCyclusVoortgang() : { percentage: 50 }
      const stuurparameters = getStuurparametersMetMetadata ? getStuurparametersMetMetadata() : []
      const stuurparamsOk = stuurparameters.filter(p => p.status === 'groen').length
      const stuurparamsTotal = stuurparameters.length || 5

      const batenMetKoppeling = baten.filter(baat =>
        inspanningen.some(insp => insp.gekoppeldeBaten?.includes(String(baat.id)))
      ).length
      const dekking = baten.length > 0 ? Math.round((batenMetKoppeling / baten.length) * 100) : 0

      const risicoHoog = risicos.filter(r => (r.score || 0) >= 15).length
      const risicoOpen = risicos.filter(r => r.status === 'open').length
      const risicoScore = risicoHoog > 0 ? 0 : risicoOpen > 2 ? 50 : 100

      const gereedheid = Math.round(
        (cyclusVoortgang.percentage * 0.4) +
        ((stuurparamsOk / stuurparamsTotal) * 100 * 0.3) +
        (dekking * 0.2) +
        (risicoScore * 0.1)
      )

      const finalValue = Math.min(100, Math.max(0, gereedheid))
      return {
        value: finalValue,
        label: '%',
        trend: gereedheid >= 80 ? 'up' : gereedheid >= 60 ? 'neutral' : 'down',
        status: gereedheid >= 80 ? 'success' : gereedheid >= 60 ? 'warning' : 'error',
        isPercentage: true,
        iconType: 'gereedheid',
        subtitle: `${stuurparamsOk}/${stuurparamsTotal} parameters OK`
      }
    }

    // Baten count
    if (entity === 'baten' && aggregation === 'count') {
      const actief = baten.filter(b => b.status === 'actief').length
      return {
        value: baten.length,
        label: 'baten',
        trend: 'neutral',
        status: baten.length > 0 ? 'success' : 'warning',
        isPercentage: false,
        iconType: 'baten',
        subtitle: actief > 0 ? `${actief} actief` : 'Geen actief'
      }
    }

    // Inspanningen count
    if (entity === 'inspanningen' && aggregation === 'count') {
      let data = inspanningen
      if (filter?.status) {
        data = inspanningen.filter(i => i.status === filter.status)
      }
      const actief = inspanningen.filter(i => i.status === 'in_progress').length
      const afgerond = inspanningen.filter(i => i.status === 'completed').length
      return {
        value: data.length,
        label: filter?.status === 'in_progress' ? 'actief' : 'inspanningen',
        trend: actief > 0 ? 'up' : 'neutral',
        status: data.length > 0 ? 'success' : 'warning',
        isPercentage: false,
        iconType: 'inspanningen',
        subtitle: `${afgerond} afgerond`
      }
    }

    // Risicos count
    if (entity === 'risicos' && aggregation === 'count') {
      const hoogRisico = risicos.filter(r => (r.score || 0) >= 15).length
      const midRisico = risicos.filter(r => (r.score || 0) >= 8 && (r.score || 0) < 15).length
      return {
        value: risicos.length,
        label: "risico's",
        trend: hoogRisico > 0 ? 'down' : 'neutral',
        status: hoogRisico > 0 ? 'error' : 'success',
        isPercentage: false,
        iconType: 'risicos',
        subtitle: hoogRisico > 0 ? `${hoogRisico} hoog risico` : `${midRisico} middel`
      }
    }

    // Default fallback
    return {
      value: '-',
      label: '',
      trend: 'neutral',
      status: 'neutral',
      isPercentage: false,
      iconType: 'gereedheid',
      subtitle: ''
    }
  }, [config, baten, inspanningen, risicos, getCyclusVoortgang, getStuurparametersMetMetadata])
}

// ============================================================================
// Main Component
// ============================================================================

/**
 * KPICard Component
 * Displays a single KPI with visual indicators
 */
const KPICard = forwardRef(function KPICard({
  config,
  onRemove,
  onRefresh,
  isLoading = false,
  className = ''
}, ref) {
  // Get processed data
  const kpiData = useKPIData(config)
  const { value, label, trend, status, isPercentage, iconType, subtitle } = kpiData

  // Derived state
  const style = STATUS_STYLES[status]
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus
  const KPIIcon = KPI_ICONS[iconType] || Target

  // Build ARIA label for accessibility
  const ariaLabel = useMemo(() => {
    const trendText = trend === 'up' ? 'stijgend' : trend === 'down' ? 'dalend' : 'stabiel'
    return `${config?.title || 'KPI'}: ${value}${isPercentage ? ' procent' : ''} ${label}, trend ${trendText}`
  }, [config?.title, value, isPercentage, label, trend])

  // Loading state
  if (isLoading) {
    return <KPICardSkeleton />
  }

  return (
    <div
      ref={ref}
      className={`
        ${style.bg} ${style.glow}
        rounded-2xl p-5 text-white relative group overflow-hidden
        transition-all duration-300 hover:scale-[1.02] hover:shadow-xl
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50
        ${className}
      `}
      role="article"
      aria-label={ariaLabel}
      tabIndex={0}
      {...getLoadingAriaProps(isLoading)}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
      </div>

      {/* Action buttons */}
      <div className={`
        absolute top-3 right-3 flex items-center gap-1 z-10
        transition-opacity
        ${onRemove || onRefresh ? 'group-hover:opacity-100' : ''}
        opacity-0
      `}>
        {onRefresh && (
          <button
            onClick={onRefresh}
            className="p-1.5 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all"
            aria-label="Vernieuwen"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        )}
        {onRemove && (
          <button
            onClick={onRemove}
            className="p-1.5 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all"
            aria-label="Verwijderen"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header with icon */}
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 bg-white/20 backdrop-blur-sm rounded-lg">
            <KPIIcon className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold text-white/90 uppercase tracking-wider">{config?.title}</span>
        </div>

        {/* Main value area */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            {isPercentage ? (
              <div className="relative">
                <span className="text-5xl font-black tracking-tight">{value}</span>
                <span className="text-xl font-bold text-white/80 ml-0.5">{label}</span>
              </div>
            ) : (
              <>
                <span className="text-5xl font-black tracking-tight">{value}</span>
                <span className="text-base font-medium text-white/70 ml-1">{label}</span>
              </>
            )}
          </div>

          {/* Progress ring for percentages, trend icon for counts */}
          {isPercentage ? (
            <div className="relative flex items-center justify-center">
              <CircularProgress value={value} size={52} strokeWidth={4} color="rgba(255,255,255,0.9)" />
              <div className="absolute inset-0 flex items-center justify-center">
                <TrendIcon className={`w-5 h-5 ${style.trendColor}`} />
              </div>
            </div>
          ) : (
            <div className={`p-3 bg-white/10 backdrop-blur-sm rounded-xl`}>
              <TrendIcon className={`w-6 h-6 ${trend === 'up' ? 'text-emerald-200' : trend === 'down' ? 'text-rose-200' : 'text-white/60'}`} />
            </div>
          )}
        </div>

        {/* Subtitle / additional info */}
        {subtitle && (
          <div className="mt-3 pt-3 border-t border-white/20">
            <span className="text-xs text-white/70">{subtitle}</span>
          </div>
        )}
      </div>
    </div>
  )
})

export default KPICard
