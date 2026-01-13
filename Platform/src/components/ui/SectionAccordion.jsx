/**
 * SectionAccordion Component
 *
 * Inklapbare sectie met:
 * - Smooth height animatie
 * - ARIA attributes
 * - Keyboard navigatie
 * - Optionele badge en icon
 */

import { useState, useRef, useEffect } from 'react'
import { ChevronRight, ChevronDown } from 'lucide-react'

export function SectionAccordion({
  id,
  title,
  subtitle,
  icon: Icon,
  badge,
  defaultExpanded = false,
  headerClassName = '',
  contentClassName = '',
  children
}) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  const [height, setHeight] = useState(defaultExpanded ? 'auto' : '0px')
  const contentRef = useRef(null)

  // Update height when expanded state changes
  useEffect(() => {
    if (contentRef.current) {
      if (isExpanded) {
        setHeight(`${contentRef.current.scrollHeight}px`)
        // After animation, set to auto for dynamic content
        const timer = setTimeout(() => setHeight('auto'), 300)
        return () => clearTimeout(timer)
      } else {
        // First set explicit height, then animate to 0
        setHeight(`${contentRef.current.scrollHeight}px`)
        requestAnimationFrame(() => {
          setHeight('0px')
        })
      }
    }
  }, [isExpanded])

  const toggle = () => setIsExpanded(!isExpanded)

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggle()
    }
  }

  // Badge variant colors
  const badgeColors = {
    info: 'bg-blue-100 text-blue-700',
    warning: 'bg-amber-100 text-amber-700',
    success: 'bg-green-100 text-green-700',
    error: 'bg-red-100 text-red-700',
    default: 'bg-gray-100 text-gray-700'
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 hover:border-gray-200 transition-all duration-200 overflow-hidden">
      {/* Header - Clickable */}
      <button
        id={`accordion-header-${id}`}
        onClick={toggle}
        onKeyDown={handleKeyDown}
        className={`
          w-full p-4 flex items-center justify-between
          hover:bg-gray-50 transition-colors
          focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-cito-blue)]
          text-left
          ${headerClassName}
        `}
        aria-expanded={isExpanded}
        aria-controls={`accordion-content-${id}`}
      >
        <div className="flex items-center gap-3">
          {/* Expand/Collapse icon */}
          <div className="text-gray-400 transition-transform duration-200" style={{ transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)' }}>
            <ChevronDown className="w-5 h-5" />
          </div>

          {/* Optional section icon */}
          {Icon && (
            <div className="p-1.5 bg-gray-100 rounded-lg">
              <Icon className="w-4 h-4 text-gray-600" />
            </div>
          )}

          {/* Title & Subtitle */}
          <div>
            <h3 className="font-medium text-gray-800">{title}</h3>
            {subtitle && (
              <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Optional badge */}
          {badge && (
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badgeColors[badge.variant] || badgeColors.default}`}>
              {badge.text}
            </span>
          )}

          {/* Visual indicator */}
          <ChevronRight
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
          />
        </div>
      </button>

      {/* Content - Animated */}
      <div
        id={`accordion-content-${id}`}
        role="region"
        aria-labelledby={`accordion-header-${id}`}
        style={{ height, overflow: 'hidden' }}
        className="transition-[height] duration-300 ease-out"
      >
        <div ref={contentRef} className={`p-4 pt-0 ${contentClassName}`}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default SectionAccordion
