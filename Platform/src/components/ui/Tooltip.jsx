import { useState, useRef, useEffect, cloneElement } from 'react'

/**
 * Tooltip Component
 * A reusable tooltip that shows on hover, click, or focus
 *
 * @param {ReactNode} children - The element that triggers the tooltip
 * @param {string|ReactNode} content - The tooltip content
 * @param {string} position - Position: 'top' | 'bottom' | 'left' | 'right'
 * @param {string} trigger - Trigger type: 'hover' | 'click' | 'focus'
 * @param {number} delay - Delay before showing (in ms)
 * @param {boolean} disabled - Whether the tooltip is disabled
 */
export default function Tooltip({
  children,
  content,
  position = 'top',
  trigger = 'hover',
  delay = 200,
  disabled = false,
  className = ''
}) {
  const [isVisible, setIsVisible] = useState(false)
  const [coords, setCoords] = useState({ top: 0, left: 0 })
  const triggerRef = useRef(null)
  const tooltipRef = useRef(null)
  const timeoutRef = useRef(null)

  // Calculate tooltip position
  const updatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const tooltipRect = tooltipRef.current.getBoundingClientRect()
    const scrollX = window.scrollX
    const scrollY = window.scrollY

    let top = 0
    let left = 0

    switch (position) {
      case 'top':
        top = triggerRect.top + scrollY - tooltipRect.height - 8
        left = triggerRect.left + scrollX + (triggerRect.width - tooltipRect.width) / 2
        break
      case 'bottom':
        top = triggerRect.bottom + scrollY + 8
        left = triggerRect.left + scrollX + (triggerRect.width - tooltipRect.width) / 2
        break
      case 'left':
        top = triggerRect.top + scrollY + (triggerRect.height - tooltipRect.height) / 2
        left = triggerRect.left + scrollX - tooltipRect.width - 8
        break
      case 'right':
        top = triggerRect.top + scrollY + (triggerRect.height - tooltipRect.height) / 2
        left = triggerRect.right + scrollX + 8
        break
    }

    // Keep tooltip within viewport
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    if (left < 8) left = 8
    if (left + tooltipRect.width > viewportWidth - 8) left = viewportWidth - tooltipRect.width - 8
    if (top < 8) top = 8
    if (top + tooltipRect.height > viewportHeight - 8) top = viewportHeight - tooltipRect.height - 8

    setCoords({ top, left })
  }

  // Show tooltip with optional delay
  const show = () => {
    if (disabled) return
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true)
    }, delay)
  }

  // Hide tooltip
  const hide = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsVisible(false)
  }

  // Toggle for click trigger
  const toggle = () => {
    if (disabled) return
    if (isVisible) {
      hide()
    } else {
      setIsVisible(true)
    }
  }

  // Update position when visible
  useEffect(() => {
    if (isVisible) {
      updatePosition()
      window.addEventListener('scroll', updatePosition, true)
      window.addEventListener('resize', updatePosition)
    }
    return () => {
      window.removeEventListener('scroll', updatePosition, true)
      window.removeEventListener('resize', updatePosition)
    }
  }, [isVisible])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  // Event handlers based on trigger type
  const getEventHandlers = () => {
    switch (trigger) {
      case 'hover':
        return {
          onMouseEnter: show,
          onMouseLeave: hide
        }
      case 'click':
        return {
          onClick: toggle
        }
      case 'focus':
        return {
          onFocus: show,
          onBlur: hide
        }
      default:
        return {}
    }
  }

  // Arrow position classes
  const arrowClasses = {
    top: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-t-slate-800 border-l-transparent border-r-transparent border-b-transparent',
    bottom: 'top-0 left-1/2 -translate-x-1/2 -translate-y-full border-b-slate-800 border-l-transparent border-r-transparent border-t-transparent',
    left: 'right-0 top-1/2 translate-x-full -translate-y-1/2 border-l-slate-800 border-t-transparent border-b-transparent border-r-transparent',
    right: 'left-0 top-1/2 -translate-x-full -translate-y-1/2 border-r-slate-800 border-t-transparent border-b-transparent border-l-transparent'
  }

  // Clone child element and add event handlers
  const triggerElement = cloneElement(children, {
    ref: triggerRef,
    ...getEventHandlers(),
    'aria-describedby': isVisible ? 'tooltip' : undefined
  })

  if (!content) return children

  return (
    <>
      {triggerElement}

      {isVisible && (
        <div
          ref={tooltipRef}
          id="tooltip"
          role="tooltip"
          className={`fixed z-[9999] px-3 py-2 text-xs text-white bg-slate-800 rounded-lg shadow-lg max-w-xs animate-in fade-in zoom-in-95 duration-150 ${className}`}
          style={{
            top: coords.top,
            left: coords.left
          }}
        >
          {content}
          {/* Arrow */}
          <span
            className={`absolute w-0 h-0 border-[6px] ${arrowClasses[position]}`}
          />
        </div>
      )}
    </>
  )
}

/**
 * Simple inline tooltip for text
 */
export function TooltipText({ children, content, ...props }) {
  return (
    <Tooltip content={content} {...props}>
      <span className="border-b border-dotted border-slate-400 cursor-help">
        {children}
      </span>
    </Tooltip>
  )
}
