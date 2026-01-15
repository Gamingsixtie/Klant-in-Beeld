/**
 * Accessibility Utilities
 * WCAG 2.1 AA compliant utilities for keyboard navigation,
 * screen reader support, and focus management
 */

// ============================================================================
// Focus Management
// ============================================================================

/**
 * Get all focusable elements within a container
 * @param {HTMLElement} container - The container to search within
 * @returns {HTMLElement[]} Array of focusable elements
 */
export function getFocusableElements(container = document) {
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable]'
  ].join(', ')

  return Array.from(container.querySelectorAll(focusableSelectors))
    .filter(el => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'))
}

/**
 * Trap focus within a container (for modals, dialogs)
 * @param {HTMLElement} container - The container to trap focus within
 * @returns {Function} Cleanup function to remove the trap
 */
export function trapFocus(container) {
  const focusableElements = getFocusableElements(container)

  if (focusableElements.length === 0) return () => {}

  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]

  // Focus first element
  firstElement?.focus()

  function handleKeyDown(e) {
    if (e.key !== 'Tab') return

    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        e.preventDefault()
        lastElement.focus()
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        e.preventDefault()
        firstElement.focus()
      }
    }
  }

  container.addEventListener('keydown', handleKeyDown)

  return () => {
    container.removeEventListener('keydown', handleKeyDown)
  }
}

/**
 * Restore focus to element that was focused before modal opened
 * @returns {Function} Function to call to restore focus
 */
export function saveFocusPosition() {
  const previouslyFocused = document.activeElement

  return () => {
    if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
      previouslyFocused.focus()
    }
  }
}

/**
 * Focus first focusable element in container
 * @param {HTMLElement} container
 */
export function focusFirstElement(container) {
  const focusable = getFocusableElements(container)
  focusable[0]?.focus()
}

/**
 * Focus last focusable element in container
 * @param {HTMLElement} container
 */
export function focusLastElement(container) {
  const focusable = getFocusableElements(container)
  focusable[focusable.length - 1]?.focus()
}

// ============================================================================
// Keyboard Navigation
// ============================================================================

/**
 * Arrow key navigation handler for lists/grids
 * @param {Object} options - Navigation options
 * @returns {Function} Keydown event handler
 */
export function createArrowKeyHandler(options = {}) {
  const {
    items = [],
    currentIndex = 0,
    onNavigate,
    onSelect,
    onEscape,
    orientation = 'vertical', // 'vertical', 'horizontal', 'grid'
    columnsPerRow = 4, // For grid navigation
    loop = true
  } = options

  return (event) => {
    const { key } = event
    let newIndex = currentIndex
    const itemCount = items.length

    if (itemCount === 0) return

    switch (key) {
      case 'ArrowUp':
        if (orientation === 'vertical' || orientation === 'grid') {
          event.preventDefault()
          if (orientation === 'grid') {
            newIndex = currentIndex - columnsPerRow
          } else {
            newIndex = currentIndex - 1
          }
        }
        break

      case 'ArrowDown':
        if (orientation === 'vertical' || orientation === 'grid') {
          event.preventDefault()
          if (orientation === 'grid') {
            newIndex = currentIndex + columnsPerRow
          } else {
            newIndex = currentIndex + 1
          }
        }
        break

      case 'ArrowLeft':
        if (orientation === 'horizontal' || orientation === 'grid') {
          event.preventDefault()
          newIndex = currentIndex - 1
        }
        break

      case 'ArrowRight':
        if (orientation === 'horizontal' || orientation === 'grid') {
          event.preventDefault()
          newIndex = currentIndex + 1
        }
        break

      case 'Home':
        event.preventDefault()
        newIndex = 0
        break

      case 'End':
        event.preventDefault()
        newIndex = itemCount - 1
        break

      case 'Enter':
      case ' ':
        event.preventDefault()
        onSelect?.(currentIndex, items[currentIndex])
        return

      case 'Escape':
        event.preventDefault()
        onEscape?.()
        return

      default:
        return
    }

    // Handle looping
    if (loop) {
      if (newIndex < 0) newIndex = itemCount - 1
      if (newIndex >= itemCount) newIndex = 0
    } else {
      newIndex = Math.max(0, Math.min(itemCount - 1, newIndex))
    }

    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < itemCount) {
      onNavigate?.(newIndex, items[newIndex])
    }
  }
}

/**
 * Roving tabindex manager for list navigation
 * @param {HTMLElement[]} items - Array of elements
 * @param {number} activeIndex - Currently active index
 */
export function updateRovingTabindex(items, activeIndex) {
  items.forEach((item, index) => {
    if (index === activeIndex) {
      item.setAttribute('tabindex', '0')
      item.focus()
    } else {
      item.setAttribute('tabindex', '-1')
    }
  })
}

// ============================================================================
// Screen Reader Utilities
// ============================================================================

/**
 * Announce message to screen readers
 * @param {string} message - Message to announce
 * @param {string} priority - 'polite' or 'assertive'
 */
export function announce(message, priority = 'polite') {
  const announcer = getOrCreateAnnouncer(priority)
  announcer.textContent = message

  // Clear after announcement
  setTimeout(() => {
    announcer.textContent = ''
  }, 1000)
}

/**
 * Get or create screen reader announcer element
 * @param {string} priority - 'polite' or 'assertive'
 * @returns {HTMLElement}
 */
function getOrCreateAnnouncer(priority) {
  const id = `sr-announcer-${priority}`
  let announcer = document.getElementById(id)

  if (!announcer) {
    announcer = document.createElement('div')
    announcer.id = id
    announcer.setAttribute('role', 'status')
    announcer.setAttribute('aria-live', priority)
    announcer.setAttribute('aria-atomic', 'true')
    Object.assign(announcer.style, {
      position: 'absolute',
      width: '1px',
      height: '1px',
      padding: '0',
      margin: '-1px',
      overflow: 'hidden',
      clip: 'rect(0, 0, 0, 0)',
      whiteSpace: 'nowrap',
      border: '0'
    })
    document.body.appendChild(announcer)
  }

  return announcer
}

/**
 * Create visually hidden text for screen readers
 * @param {string} text - Text content
 * @returns {Object} Style object
 */
export const visuallyHiddenStyle = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: '0',
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: '0'
}

// ============================================================================
// ARIA Helpers
// ============================================================================

/**
 * Generate unique ID for ARIA relationships
 * @param {string} prefix - ID prefix
 * @returns {string}
 */
let idCounter = 0
export function generateAriaId(prefix = 'aria') {
  return `${prefix}-${++idCounter}`
}

/**
 * Create ARIA description props for an element
 * @param {string} description - Description text
 * @returns {Object} Props object with aria-describedby and helper element
 */
export function useAriaDescription(description) {
  const id = generateAriaId('desc')

  return {
    describedById: id,
    'aria-describedby': id,
    descriptionElement: {
      id,
      style: visuallyHiddenStyle,
      children: description
    }
  }
}

/**
 * Get appropriate ARIA role for widget type
 * @param {string} widgetType - Type of widget
 * @returns {string} ARIA role
 */
export function getWidgetRole(widgetType) {
  const roleMap = {
    kpi: 'status',
    bar: 'img',
    line: 'img',
    pie: 'img',
    table: 'table',
    progress: 'progressbar',
    list: 'list'
  }

  return roleMap[widgetType] || 'region'
}

/**
 * Create ARIA props for loading state
 * @param {boolean} isLoading
 * @param {string} loadingText
 * @returns {Object}
 */
export function getLoadingAriaProps(isLoading, loadingText = 'Laden...') {
  return {
    'aria-busy': isLoading,
    'aria-live': 'polite',
    ...(isLoading && { 'aria-label': loadingText })
  }
}

/**
 * Create ARIA props for error state
 * @param {boolean} hasError
 * @param {string} errorMessage
 * @returns {Object}
 */
export function getErrorAriaProps(hasError, errorMessage) {
  if (!hasError) return {}

  return {
    'aria-invalid': true,
    'aria-errormessage': errorMessage ? generateAriaId('error') : undefined,
    role: 'alert'
  }
}

// ============================================================================
// Color Contrast
// ============================================================================

/**
 * Calculate relative luminance of a color
 * @param {number} r - Red (0-255)
 * @param {number} g - Green (0-255)
 * @param {number} b - Blue (0-255)
 * @returns {number}
 */
function getLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

/**
 * Parse hex color to RGB
 * @param {string} hex - Hex color string
 * @returns {Object} { r, g, b }
 */
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

/**
 * Calculate contrast ratio between two colors
 * @param {string} color1 - Hex color
 * @param {string} color2 - Hex color
 * @returns {number} Contrast ratio (1-21)
 */
export function getContrastRatio(color1, color2) {
  const rgb1 = hexToRgb(color1)
  const rgb2 = hexToRgb(color2)

  if (!rgb1 || !rgb2) return 1

  const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b)
  const l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b)

  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)

  return (lighter + 0.05) / (darker + 0.05)
}

/**
 * Check if contrast meets WCAG requirements
 * @param {string} foreground - Foreground hex color
 * @param {string} background - Background hex color
 * @param {string} level - 'AA' or 'AAA'
 * @param {string} size - 'normal' or 'large'
 * @returns {boolean}
 */
export function meetsContrastRequirements(foreground, background, level = 'AA', size = 'normal') {
  const ratio = getContrastRatio(foreground, background)

  const requirements = {
    AA: { normal: 4.5, large: 3 },
    AAA: { normal: 7, large: 4.5 }
  }

  return ratio >= requirements[level][size]
}

// ============================================================================
// Reduced Motion
// ============================================================================

/**
 * Check if user prefers reduced motion
 * @returns {boolean}
 */
export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Get animation duration based on user preferences
 * @param {number} normalDuration - Duration in ms for normal motion
 * @param {number} reducedDuration - Duration in ms for reduced motion (default: 0)
 * @returns {number}
 */
export function getAnimationDuration(normalDuration, reducedDuration = 0) {
  return prefersReducedMotion() ? reducedDuration : normalDuration
}

// ============================================================================
// Skip Link
// ============================================================================

/**
 * Create skip link props
 * @param {string} targetId - ID of target element to skip to
 * @param {string} label - Skip link label
 * @returns {Object}
 */
export function createSkipLink(targetId, label = 'Ga naar hoofdinhoud') {
  return {
    href: `#${targetId}`,
    className: 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-[#003366] focus:rounded-lg focus:shadow-lg',
    children: label
  }
}

// ============================================================================
// Form Accessibility
// ============================================================================

/**
 * Generate form field accessibility props
 * @param {Object} options
 * @returns {Object}
 */
export function getFormFieldProps(options = {}) {
  const {
    id,
    label,
    error,
    required,
    description,
    disabled
  } = options

  const fieldId = id || generateAriaId('field')
  const errorId = error ? `${fieldId}-error` : undefined
  const descId = description ? `${fieldId}-desc` : undefined

  return {
    field: {
      id: fieldId,
      'aria-required': required || undefined,
      'aria-invalid': !!error || undefined,
      'aria-describedby': [errorId, descId].filter(Boolean).join(' ') || undefined,
      'aria-disabled': disabled || undefined
    },
    label: {
      htmlFor: fieldId
    },
    error: error ? {
      id: errorId,
      role: 'alert',
      'aria-live': 'polite'
    } : null,
    description: description ? {
      id: descId
    } : null
  }
}

// ============================================================================
// Live Region
// ============================================================================

/**
 * Create live region props
 * @param {string} politeness - 'polite', 'assertive', or 'off'
 * @param {boolean} atomic - Whether to announce entire region
 * @returns {Object}
 */
export function getLiveRegionProps(politeness = 'polite', atomic = true) {
  return {
    'aria-live': politeness,
    'aria-atomic': atomic,
    role: politeness === 'assertive' ? 'alert' : 'status'
  }
}

export default {
  getFocusableElements,
  trapFocus,
  saveFocusPosition,
  focusFirstElement,
  focusLastElement,
  createArrowKeyHandler,
  updateRovingTabindex,
  announce,
  visuallyHiddenStyle,
  generateAriaId,
  getWidgetRole,
  getLoadingAriaProps,
  getErrorAriaProps,
  getContrastRatio,
  meetsContrastRequirements,
  prefersReducedMotion,
  getAnimationDuration,
  createSkipLink,
  getFormFieldProps,
  getLiveRegionProps
}
