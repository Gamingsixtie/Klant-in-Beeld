import React from 'react'
import {
  Search,
  BarChart3,
  Table,
  AlertCircle,
  Filter,
  Inbox,
  FileQuestion,
  Database,
  RefreshCw
} from 'lucide-react'

/**
 * Unified EmptyState component
 * Provides consistent empty state displays across all widgets and components
 *
 * @param {Object} props
 * @param {'search' | 'chart' | 'table' | 'error' | 'filter' | 'inbox' | 'data' | 'default'} props.icon - Icon type
 * @param {string} props.title - Main message
 * @param {string} props.description - Additional context
 * @param {Object} props.action - CTA button config
 * @param {string} props.action.label - Button text
 * @param {Function} props.action.onClick - Button handler
 * @param {'primary' | 'secondary'} props.action.variant - Button style
 * @param {'sm' | 'md' | 'lg'} props.size - Size variant
 * @param {string} props.className - Additional classes
 */
export default function EmptyState({
  icon = 'default',
  title = 'Geen data beschikbaar',
  description,
  action,
  size = 'md',
  className = ''
}) {
  // Icon mapping
  const icons = {
    search: Search,
    chart: BarChart3,
    table: Table,
    error: AlertCircle,
    filter: Filter,
    inbox: Inbox,
    data: Database,
    default: FileQuestion
  }

  const IconComponent = icons[icon] || icons.default

  // Size configurations
  const sizes = {
    sm: {
      container: 'py-6',
      iconWrapper: 'w-10 h-10',
      icon: 'w-5 h-5',
      title: 'text-sm',
      description: 'text-xs',
      button: 'px-3 py-1.5 text-xs'
    },
    md: {
      container: 'py-10',
      iconWrapper: 'w-14 h-14',
      icon: 'w-7 h-7',
      title: 'text-base',
      description: 'text-sm',
      button: 'px-4 py-2 text-sm'
    },
    lg: {
      container: 'py-16',
      iconWrapper: 'w-20 h-20',
      icon: 'w-10 h-10',
      title: 'text-lg',
      description: 'text-base',
      button: 'px-5 py-2.5 text-base'
    }
  }

  const s = sizes[size]

  // Icon background colors based on type
  const iconStyles = {
    search: 'bg-blue-100 text-blue-500',
    chart: 'bg-purple-100 text-purple-500',
    table: 'bg-slate-100 text-slate-500',
    error: 'bg-red-100 text-red-500',
    filter: 'bg-amber-100 text-amber-500',
    inbox: 'bg-slate-100 text-slate-400',
    data: 'bg-emerald-100 text-emerald-500',
    default: 'bg-slate-100 text-slate-400'
  }

  const buttonVariants = {
    primary: 'bg-[#003366] text-white hover:bg-[#004488] shadow-sm',
    secondary: 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300'
  }

  return (
    <div className={`flex flex-col items-center justify-center text-center ${s.container} ${className}`}>
      {/* Icon */}
      <div className={`${s.iconWrapper} rounded-2xl flex items-center justify-center mb-4 ${iconStyles[icon]}`}>
        <IconComponent className={s.icon} />
      </div>

      {/* Title */}
      <h3 className={`font-medium text-slate-700 mb-1 ${s.title}`}>
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className={`text-slate-500 max-w-xs mb-4 ${s.description}`}>
          {description}
        </p>
      )}

      {/* Action Button */}
      {action && (
        <button
          onClick={action.onClick}
          className={`${s.button} ${buttonVariants[action.variant || 'primary']} rounded-lg font-medium transition-all flex items-center gap-2`}
        >
          {action.icon && <action.icon className="w-4 h-4" />}
          {action.label}
        </button>
      )}
    </div>
  )
}

/**
 * Pre-configured empty state variants for common use cases
 */
export function NoDataEmptyState({ onRetry, entity = 'data' }) {
  return (
    <EmptyState
      icon="data"
      title={`Geen ${entity} gevonden`}
      description="Er zijn nog geen items om weer te geven"
      action={onRetry && {
        label: 'Vernieuwen',
        onClick: onRetry,
        variant: 'secondary',
        icon: RefreshCw
      }}
    />
  )
}

export function NoResultsEmptyState({ searchTerm, onClear }) {
  return (
    <EmptyState
      icon="search"
      title="Geen resultaten"
      description={searchTerm ? `Geen resultaten voor "${searchTerm}"` : 'Probeer een andere zoekopdracht'}
      action={onClear && {
        label: 'Wis filters',
        onClick: onClear,
        variant: 'secondary'
      }}
    />
  )
}

export function FilterEmptyState({ onClearFilters }) {
  return (
    <EmptyState
      icon="filter"
      title="Geen resultaten voor deze filters"
      description="Pas je filters aan om meer resultaten te zien"
      action={onClearFilters && {
        label: 'Reset filters',
        onClick: onClearFilters,
        variant: 'secondary'
      }}
    />
  )
}

export function ErrorEmptyState({ onRetry, message }) {
  return (
    <EmptyState
      icon="error"
      title="Er ging iets mis"
      description={message || 'Probeer het later opnieuw'}
      action={onRetry && {
        label: 'Probeer opnieuw',
        onClick: onRetry,
        variant: 'primary',
        icon: RefreshCw
      }}
    />
  )
}

export function ChartEmptyState({ onAction }) {
  return (
    <EmptyState
      icon="chart"
      title="Geen grafiek data"
      description="Er is onvoldoende data om een grafiek te tonen"
      size="sm"
      action={onAction && {
        label: 'Bekijk alternatieven',
        onClick: onAction,
        variant: 'secondary'
      }}
    />
  )
}

export function TableEmptyState({ onAction }) {
  return (
    <EmptyState
      icon="table"
      title="Geen items"
      description="Er zijn geen items om weer te geven"
      size="sm"
      action={onAction && {
        label: 'Item toevoegen',
        onClick: onAction,
        variant: 'primary'
      }}
    />
  )
}
