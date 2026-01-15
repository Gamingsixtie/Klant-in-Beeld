import React from 'react'

/**
 * Unified LoadingSkeleton component
 * Provides consistent loading states across all widgets and components
 *
 * @param {Object} props
 * @param {'kpi' | 'chart' | 'table' | 'text' | 'card' | 'avatar' | 'button'} props.variant - Type of skeleton
 * @param {number} props.lines - Number of lines (for text variant)
 * @param {string | number} props.width - Custom width
 * @param {string | number} props.height - Custom height
 * @param {string} props.className - Additional classes
 * @param {boolean} props.animate - Enable pulse animation (default: true)
 */
export default function LoadingSkeleton({
  variant = 'text',
  lines = 3,
  width,
  height,
  className = '',
  animate = true
}) {
  const baseClasses = `bg-slate-200 rounded ${animate ? 'animate-pulse' : ''}`

  // Skeleton primitives
  const SkeletonLine = ({ w = '100%', h = 16 }) => (
    <div
      className={baseClasses}
      style={{ width: w, height: h }}
    />
  )

  const SkeletonCircle = ({ size = 40 }) => (
    <div
      className={`${baseClasses} rounded-full`}
      style={{ width: size, height: size }}
    />
  )

  const SkeletonRect = ({ w = '100%', h = 100 }) => (
    <div
      className={`${baseClasses} rounded-xl`}
      style={{ width: w, height: h }}
    />
  )

  // Variant renders
  const variants = {
    // KPI Card skeleton
    kpi: (
      <div className={`p-5 ${className}`}>
        <div className="flex items-center gap-4 mb-4">
          <SkeletonCircle size={48} />
          <div className="flex-1 space-y-2">
            <SkeletonLine w="60%" h={20} />
            <SkeletonLine w="40%" h={14} />
          </div>
        </div>
        <SkeletonLine w="50%" h={32} />
      </div>
    ),

    // Chart skeleton (bar/line)
    chart: (
      <div className={`p-5 ${className}`}>
        <div className="flex items-center gap-3 mb-4">
          <SkeletonRect w={40} h={40} />
          <div className="flex-1 space-y-2">
            <SkeletonLine w="50%" h={16} />
            <SkeletonLine w="30%" h={12} />
          </div>
        </div>
        <div className="flex items-end justify-between gap-2 h-32">
          {[60, 80, 40, 90, 70, 50].map((h, i) => (
            <div
              key={i}
              className={baseClasses}
              style={{ width: '14%', height: `${h}%` }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-3">
          <SkeletonLine w="15%" h={10} />
          <SkeletonLine w="15%" h={10} />
          <SkeletonLine w="15%" h={10} />
        </div>
      </div>
    ),

    // Table skeleton
    table: (
      <div className={`p-5 ${className}`}>
        <div className="flex items-center gap-3 mb-4">
          <SkeletonRect w={40} h={40} />
          <div className="flex-1 space-y-2">
            <SkeletonLine w="40%" h={16} />
            <SkeletonLine w="25%" h={12} />
          </div>
        </div>
        {/* Table header */}
        <div className="flex gap-3 pb-3 border-b border-slate-100">
          <SkeletonLine w="30%" h={14} />
          <SkeletonLine w="20%" h={14} />
          <SkeletonLine w="15%" h={14} />
          <SkeletonLine w="15%" h={14} />
        </div>
        {/* Table rows */}
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex gap-3 py-3 border-b border-slate-50">
            <SkeletonLine w="30%" h={12} />
            <SkeletonLine w="20%" h={12} />
            <SkeletonLine w="15%" h={12} />
            <SkeletonLine w="15%" h={12} />
          </div>
        ))}
      </div>
    ),

    // Text lines skeleton
    text: (
      <div className={`space-y-2 ${className}`}>
        {[...Array(lines)].map((_, i) => (
          <SkeletonLine
            key={i}
            w={i === lines - 1 ? '70%' : '100%'}
            h={height || 14}
          />
        ))}
      </div>
    ),

    // Card skeleton
    card: (
      <div className={`p-4 bg-white rounded-xl border border-slate-100 ${className}`}>
        <div className="flex items-center gap-3 mb-3">
          <SkeletonCircle size={36} />
          <div className="flex-1 space-y-2">
            <SkeletonLine w="60%" h={14} />
            <SkeletonLine w="40%" h={10} />
          </div>
        </div>
        <SkeletonRect h={80} />
      </div>
    ),

    // Avatar skeleton
    avatar: (
      <div className={`flex items-center gap-3 ${className}`}>
        <SkeletonCircle size={40} />
        <div className="space-y-2">
          <SkeletonLine w={100} h={14} />
          <SkeletonLine w={60} h={10} />
        </div>
      </div>
    ),

    // Button skeleton
    button: (
      <div
        className={`${baseClasses} rounded-lg ${className}`}
        style={{ width: width || 100, height: height || 36 }}
      />
    )
  }

  // Custom dimensions override
  if (width || height) {
    return (
      <div
        className={`${baseClasses} ${className}`}
        style={{ width, height }}
      />
    )
  }

  return variants[variant] || variants.text
}

/**
 * Widget skeleton wrapper for BaseWidget compatibility
 */
export function WidgetSkeleton({ type = 'chart', className = '' }) {
  const typeMap = {
    kpi: 'kpi',
    bar: 'chart',
    line: 'chart',
    pie: 'chart',
    table: 'table',
    progress: 'kpi'
  }

  return (
    <div className={`bg-white rounded-2xl border border-slate-200 ${className}`}>
      <LoadingSkeleton variant={typeMap[type] || 'chart'} />
    </div>
  )
}
