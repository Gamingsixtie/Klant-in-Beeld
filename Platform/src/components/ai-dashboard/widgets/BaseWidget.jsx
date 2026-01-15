/**
 * BaseWidget Component
 * Wrapper component providing common functionality for all widgets
 */

import { useState, forwardRef, useCallback, useMemo } from 'react'
import { X, RefreshCw, Settings, Maximize2, Minimize2, GripVertical, AlertCircle } from 'lucide-react'

// Widget skeleton for loading state
export function WidgetSkeleton({ type = 'default', className = '' }) {
  const skeletons = {
    kpi: (
      <div className="bg-white rounded-2xl border border-slate-200 p-5 animate-pulse">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-slate-200 rounded-xl" />
          <div className="flex-1">
            <div className="h-4 bg-slate-200 rounded w-24 mb-2" />
            <div className="h-3 bg-slate-100 rounded w-16" />
          </div>
        </div>
        <div className="h-12 bg-slate-100 rounded-xl" />
      </div>
    ),
    chart: (
      <div className="bg-white rounded-2xl border border-slate-200 p-5 animate-pulse">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-slate-200 rounded-xl" />
          <div className="flex-1">
            <div className="h-4 bg-slate-200 rounded w-32 mb-2" />
            <div className="h-3 bg-slate-100 rounded w-20" />
          </div>
        </div>
        <div className="h-48 bg-slate-100 rounded-xl flex items-end gap-2 p-4">
          {[40, 60, 30, 80, 50, 70].map((h, i) => (
            <div key={i} className="flex-1 bg-slate-200 rounded-t" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    ),
    table: (
      <div className="bg-white rounded-2xl border border-slate-200 p-5 animate-pulse">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-slate-200 rounded-xl" />
          <div className="flex-1">
            <div className="h-4 bg-slate-200 rounded w-36 mb-2" />
            <div className="h-3 bg-slate-100 rounded w-24" />
          </div>
        </div>
        <div className="space-y-3">
          <div className="h-8 bg-slate-100 rounded-lg" />
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-10 bg-slate-50 rounded-lg" />
          ))}
        </div>
      </div>
    ),
    default: (
      <div className="bg-white rounded-2xl border border-slate-200 p-5 animate-pulse">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-slate-200 rounded-xl" />
          <div className="flex-1">
            <div className="h-4 bg-slate-200 rounded w-24 mb-2" />
            <div className="h-3 bg-slate-100 rounded w-16" />
          </div>
        </div>
        <div className="h-32 bg-slate-100 rounded-xl" />
      </div>
    )
  }

  return <div className={className}>{skeletons[type] || skeletons.default}</div>
}

// Widget error state
export function WidgetError({ error, onRetry, title = 'Fout bij laden' }) {
  return (
    <div className="bg-white rounded-2xl border border-red-200 p-5">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-red-50 rounded-xl">
          <AlertCircle className="w-5 h-5 text-red-500" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
          <p className="text-xs text-slate-500">Er is iets misgegaan</p>
        </div>
      </div>
      <p className="text-sm text-slate-600 mb-4">
        {error?.message || 'Kon de data niet laden'}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-3 py-2 text-sm text-[#003366] hover:bg-blue-50 rounded-lg transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Opnieuw proberen
        </button>
      )}
    </div>
  )
}

// Widget empty state
export function WidgetEmpty({ title = 'Geen data', message = 'Er is geen data beschikbaar', icon: Icon }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5">
      <div className="text-center py-8">
        {Icon && (
          <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Icon className="w-6 h-6 text-slate-400" />
          </div>
        )}
        <h3 className="text-sm font-semibold text-slate-600 mb-1">{title}</h3>
        <p className="text-xs text-slate-400">{message}</p>
      </div>
    </div>
  )
}

/**
 * BaseWidget Component
 * Wraps widget content with common UI and functionality
 */
const BaseWidget = forwardRef(function BaseWidget({
  // Config
  config,

  // Content
  children,

  // Header
  icon: Icon,
  iconColor = 'from-blue-500 to-indigo-600',
  title,
  subtitle,

  // States
  isLoading = false,
  isError = false,
  error = null,
  isEmpty = false,

  // Actions
  onRemove,
  onRefresh,
  onEdit,
  onResize,

  // Styling
  className = '',
  headerClassName = '',
  contentClassName = '',

  // Features
  removable = true,
  refreshable = true,
  draggable = false,
  resizable = false,

  // Accessibility
  'aria-label': ariaLabel,
  tabIndex = 0,

  // Events
  onFocus,
  onBlur,
  onClick
}, ref) {
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Handle refresh with loading state
  const handleRefresh = useCallback(async () => {
    if (!onRefresh || isRefreshing) return

    setIsRefreshing(true)
    try {
      await onRefresh()
    } finally {
      setIsRefreshing(false)
    }
  }, [onRefresh, isRefreshing])

  // Computed title
  const displayTitle = title || config?.title || 'Widget'
  const displaySubtitle = subtitle || (config?.dataSource?.entity && `Data: ${config.dataSource.entity}`)

  // Render loading state
  if (isLoading) {
    return <WidgetSkeleton type={config?.type} className={className} />
  }

  // Render error state
  if (isError) {
    return <WidgetError error={error} onRetry={handleRefresh} title={displayTitle} />
  }

  // Render empty state
  if (isEmpty) {
    return <WidgetEmpty title={displayTitle} icon={Icon} />
  }

  return (
    <div
      ref={ref}
      className={`
        bg-white rounded-2xl border border-slate-200
        shadow-sm hover:shadow-lg transition-shadow
        relative group
        ${isExpanded ? 'fixed inset-4 z-50' : ''}
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={onFocus}
      onBlur={onBlur}
      onClick={onClick}
      tabIndex={tabIndex}
      aria-label={ariaLabel || displayTitle}
      role="article"
    >
      {/* Expanded backdrop */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/30 -z-10"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Drag handle */}
      {draggable && (
        <div className="absolute top-3 left-3 p-1 cursor-grab opacity-0 group-hover:opacity-100 transition-opacity">
          <GripVertical className="w-4 h-4 text-slate-400" />
        </div>
      )}

      {/* Action buttons */}
      <div className={`
        absolute top-3 right-3 flex items-center gap-1 z-10
        transition-opacity
        ${isHovered ? 'opacity-100' : 'opacity-0'}
      `}>
        {refreshable && onRefresh && (
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors disabled:opacity-50"
            aria-label="Vernieuwen"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-slate-500 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        )}

        {resizable && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            aria-label={isExpanded ? 'Minimaliseren' : 'Maximaliseren'}
          >
            {isExpanded ? (
              <Minimize2 className="w-3.5 h-3.5 text-slate-500" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5 text-slate-500" />
            )}
          </button>
        )}

        {onEdit && (
          <button
            onClick={onEdit}
            className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            aria-label="Bewerken"
          >
            <Settings className="w-3.5 h-3.5 text-slate-500" />
          </button>
        )}

        {removable && onRemove && (
          <button
            onClick={onRemove}
            className="p-1.5 bg-slate-100 hover:bg-red-100 rounded-lg transition-colors"
            aria-label="Verwijderen"
          >
            <X className="w-3.5 h-3.5 text-slate-500 hover:text-red-500" />
          </button>
        )}
      </div>

      {/* Header */}
      <div className={`p-5 pb-0 ${headerClassName}`}>
        <div className="flex items-center gap-3 mb-4">
          {Icon && (
            <div className={`p-2 bg-gradient-to-br ${iconColor} rounded-xl shadow-md`}>
              <Icon className="w-4 h-4 text-white" />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold text-slate-800 truncate">
              {displayTitle}
            </h3>
            {displaySubtitle && (
              <p className="text-xs text-slate-400 mt-0.5 truncate">
                {displaySubtitle}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`p-5 pt-0 ${contentClassName}`}>
        {children}
      </div>
    </div>
  )
})

export default BaseWidget
