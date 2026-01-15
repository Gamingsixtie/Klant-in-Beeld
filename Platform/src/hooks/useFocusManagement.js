/**
 * useFocusManagement Hook
 * React hook for managing focus, keyboard navigation, and accessibility
 */

import { useRef, useCallback, useEffect, useState } from 'react'
import {
  trapFocus,
  saveFocusPosition,
  focusFirstElement,
  getFocusableElements,
  createArrowKeyHandler,
  updateRovingTabindex,
  announce
} from '../utils/accessibility'

// ============================================================================
// Focus Trap Hook
// ============================================================================

/**
 * Hook for trapping focus within a container
 * @param {boolean} active - Whether focus trap is active
 * @param {Object} options - Options
 * @returns {Object} - Ref and utility functions
 */
export function useFocusTrap(active = false, options = {}) {
  const {
    onEscape,
    initialFocus = true,
    returnFocus = true
  } = options

  const containerRef = useRef(null)
  const restoreFocusRef = useRef(null)

  useEffect(() => {
    if (!active || !containerRef.current) return

    // Save current focus position
    if (returnFocus) {
      restoreFocusRef.current = saveFocusPosition()
    }

    // Focus first element if requested
    if (initialFocus) {
      focusFirstElement(containerRef.current)
    }

    // Setup focus trap
    const cleanup = trapFocus(containerRef.current)

    // Handle escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onEscape?.()
      }
    }
    document.addEventListener('keydown', handleEscape)

    return () => {
      cleanup()
      document.removeEventListener('keydown', handleEscape)

      // Restore focus
      if (returnFocus && restoreFocusRef.current) {
        restoreFocusRef.current()
      }
    }
  }, [active, initialFocus, returnFocus, onEscape])

  return { containerRef }
}

// ============================================================================
// Roving Tabindex Hook
// ============================================================================

/**
 * Hook for roving tabindex navigation pattern
 * @param {Object} options - Navigation options
 * @returns {Object} - Navigation state and handlers
 */
export function useRovingTabindex(options = {}) {
  const {
    items = [],
    orientation = 'vertical',
    loop = true,
    onSelect,
    initialIndex = 0
  } = options

  const [activeIndex, setActiveIndex] = useState(initialIndex)
  const itemRefs = useRef([])

  // Update refs array when items change
  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, items.length)
  }, [items.length])

  // Navigate to specific index
  const navigateTo = useCallback((index) => {
    if (index >= 0 && index < items.length) {
      setActiveIndex(index)
      itemRefs.current[index]?.focus()
    }
  }, [items.length])

  // Handle keyboard navigation
  const handleKeyDown = useCallback((event) => {
    const handler = createArrowKeyHandler({
      items,
      currentIndex: activeIndex,
      orientation,
      loop,
      onNavigate: (newIndex) => navigateTo(newIndex),
      onSelect: (index, item) => onSelect?.(index, item)
    })
    handler(event)
  }, [items, activeIndex, orientation, loop, navigateTo, onSelect])

  // Get props for each item
  const getItemProps = useCallback((index) => ({
    ref: (el) => { itemRefs.current[index] = el },
    tabIndex: index === activeIndex ? 0 : -1,
    onKeyDown: handleKeyDown,
    onClick: () => {
      setActiveIndex(index)
      onSelect?.(index, items[index])
    },
    onFocus: () => setActiveIndex(index)
  }), [activeIndex, handleKeyDown, items, onSelect])

  // Get container props
  const getContainerProps = useCallback(() => ({
    role: orientation === 'horizontal' ? 'menubar' : 'menu',
    'aria-orientation': orientation
  }), [orientation])

  return {
    activeIndex,
    setActiveIndex: navigateTo,
    getItemProps,
    getContainerProps,
    handleKeyDown
  }
}

// ============================================================================
// Grid Navigation Hook
// ============================================================================

/**
 * Hook for 2D grid keyboard navigation
 * @param {Object} options - Grid options
 * @returns {Object} - Grid navigation state and handlers
 */
export function useGridNavigation(options = {}) {
  const {
    rows = 0,
    columns = 0,
    items = [],
    onSelect,
    loop = true,
    initialIndex = 0
  } = options

  const [activeIndex, setActiveIndex] = useState(initialIndex)
  const cellRefs = useRef([])

  // Calculate row and column from index
  const getPosition = useCallback((index) => ({
    row: Math.floor(index / columns),
    col: index % columns
  }), [columns])

  // Calculate index from row and column
  const getIndex = useCallback((row, col) => {
    return row * columns + col
  }, [columns])

  // Navigate with keyboard
  const handleKeyDown = useCallback((event) => {
    const { key } = event
    const { row, col } = getPosition(activeIndex)
    const totalItems = rows * columns

    let newIndex = activeIndex

    switch (key) {
      case 'ArrowUp':
        event.preventDefault()
        if (row > 0) {
          newIndex = getIndex(row - 1, col)
        } else if (loop) {
          newIndex = getIndex(rows - 1, col)
        }
        break

      case 'ArrowDown':
        event.preventDefault()
        if (row < rows - 1) {
          newIndex = getIndex(row + 1, col)
        } else if (loop) {
          newIndex = getIndex(0, col)
        }
        break

      case 'ArrowLeft':
        event.preventDefault()
        if (col > 0) {
          newIndex = getIndex(row, col - 1)
        } else if (loop) {
          newIndex = getIndex(row, columns - 1)
        }
        break

      case 'ArrowRight':
        event.preventDefault()
        if (col < columns - 1) {
          newIndex = getIndex(row, col + 1)
        } else if (loop) {
          newIndex = getIndex(row, 0)
        }
        break

      case 'Home':
        event.preventDefault()
        if (event.ctrlKey) {
          newIndex = 0
        } else {
          newIndex = getIndex(row, 0)
        }
        break

      case 'End':
        event.preventDefault()
        if (event.ctrlKey) {
          newIndex = totalItems - 1
        } else {
          newIndex = getIndex(row, columns - 1)
        }
        break

      case 'Enter':
      case ' ':
        event.preventDefault()
        onSelect?.(activeIndex, items[activeIndex])
        return

      default:
        return
    }

    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < totalItems) {
      setActiveIndex(newIndex)
      cellRefs.current[newIndex]?.focus()
    }
  }, [activeIndex, rows, columns, loop, getPosition, getIndex, onSelect, items])

  // Get props for each cell
  const getCellProps = useCallback((index) => ({
    ref: (el) => { cellRefs.current[index] = el },
    tabIndex: index === activeIndex ? 0 : -1,
    onKeyDown: handleKeyDown,
    onClick: () => {
      setActiveIndex(index)
      onSelect?.(index, items[index])
    },
    role: 'gridcell'
  }), [activeIndex, handleKeyDown, items, onSelect])

  return {
    activeIndex,
    setActiveIndex,
    getCellProps,
    getPosition,
    handleKeyDown,
    containerProps: {
      role: 'grid',
      'aria-rowcount': rows,
      'aria-colcount': columns
    }
  }
}

// ============================================================================
// Skip Link Hook
// ============================================================================

/**
 * Hook for managing skip links
 * @param {string} mainContentId - ID of main content area
 * @returns {Object} - Skip link props and target props
 */
export function useSkipLink(mainContentId = 'main-content') {
  const skipToMain = useCallback(() => {
    const mainContent = document.getElementById(mainContentId)
    if (mainContent) {
      mainContent.setAttribute('tabindex', '-1')
      mainContent.focus()
      // Remove tabindex after focus to not interfere with natural tab order
      setTimeout(() => mainContent.removeAttribute('tabindex'), 100)
    }
  }, [mainContentId])

  return {
    skipLinkProps: {
      href: `#${mainContentId}`,
      onClick: (e) => {
        e.preventDefault()
        skipToMain()
      },
      className: 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-[#003366] focus:rounded-lg focus:shadow-lg focus:ring-2 focus:ring-[#003366]'
    },
    mainContentProps: {
      id: mainContentId,
      role: 'main'
    }
  }
}

// ============================================================================
// Announcer Hook
// ============================================================================

/**
 * Hook for screen reader announcements
 * @returns {Object} - Announce functions
 */
export function useAnnouncer() {
  const announcePolite = useCallback((message) => {
    announce(message, 'polite')
  }, [])

  const announceAssertive = useCallback((message) => {
    announce(message, 'assertive')
  }, [])

  return {
    announce: announcePolite,
    announcePolite,
    announceAssertive
  }
}

// ============================================================================
// Focus Return Hook
// ============================================================================

/**
 * Hook for returning focus when component unmounts or condition changes
 * @param {boolean} shouldReturn - Whether to return focus
 * @returns {Object} - Trigger ref
 */
export function useFocusReturn(shouldReturn = true) {
  const triggerRef = useRef(null)
  const previousElementRef = useRef(null)

  // Save element that opened the component
  const saveTrigger = useCallback((element) => {
    previousElementRef.current = element || document.activeElement
  }, [])

  // Return focus
  useEffect(() => {
    return () => {
      if (shouldReturn && previousElementRef.current) {
        previousElementRef.current.focus?.()
      }
    }
  }, [shouldReturn])

  return {
    triggerRef,
    saveTrigger,
    returnFocus: () => {
      if (previousElementRef.current) {
        previousElementRef.current.focus?.()
      }
    }
  }
}

// ============================================================================
// Focus Visible Hook
// ============================================================================

/**
 * Hook for focus-visible polyfill behavior
 * Tracks if focus should be visible based on input method
 * @returns {boolean} - Whether focus should be visible
 */
export function useFocusVisible() {
  const [focusVisible, setFocusVisible] = useState(false)
  const [hadKeyboardEvent, setHadKeyboardEvent] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Tab' || e.key === 'ArrowUp' || e.key === 'ArrowDown' ||
          e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        setHadKeyboardEvent(true)
      }
    }

    const handleMouseDown = () => {
      setHadKeyboardEvent(false)
    }

    const handleFocus = () => {
      setFocusVisible(hadKeyboardEvent)
    }

    const handleBlur = () => {
      setFocusVisible(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('focus', handleFocus, true)
    document.addEventListener('blur', handleBlur, true)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('focus', handleFocus, true)
      document.removeEventListener('blur', handleBlur, true)
    }
  }, [hadKeyboardEvent])

  return focusVisible
}

// ============================================================================
// List Box Hook (combobox/select pattern)
// ============================================================================

/**
 * Hook for accessible listbox/select pattern
 * @param {Object} options
 * @returns {Object}
 */
export function useListBox(options = {}) {
  const {
    items = [],
    selectedIndex = -1,
    onSelect,
    isOpen = false,
    onOpenChange,
    label
  } = options

  const [highlightedIndex, setHighlightedIndex] = useState(selectedIndex)
  const listRef = useRef(null)
  const buttonRef = useRef(null)

  // Reset highlight when closed
  useEffect(() => {
    if (!isOpen) {
      setHighlightedIndex(selectedIndex)
    }
  }, [isOpen, selectedIndex])

  const handleButtonKeyDown = useCallback((event) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
      case 'ArrowDown':
        event.preventDefault()
        onOpenChange?.(true)
        break
      case 'ArrowUp':
        event.preventDefault()
        onOpenChange?.(true)
        setHighlightedIndex(items.length - 1)
        break
      default:
        break
    }
  }, [items.length, onOpenChange])

  const handleListKeyDown = useCallback((event) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        setHighlightedIndex(i => Math.min(i + 1, items.length - 1))
        break
      case 'ArrowUp':
        event.preventDefault()
        setHighlightedIndex(i => Math.max(i - 1, 0))
        break
      case 'Home':
        event.preventDefault()
        setHighlightedIndex(0)
        break
      case 'End':
        event.preventDefault()
        setHighlightedIndex(items.length - 1)
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        if (highlightedIndex >= 0) {
          onSelect?.(highlightedIndex, items[highlightedIndex])
          onOpenChange?.(false)
          buttonRef.current?.focus()
        }
        break
      case 'Escape':
        event.preventDefault()
        onOpenChange?.(false)
        buttonRef.current?.focus()
        break
      case 'Tab':
        onOpenChange?.(false)
        break
      default:
        break
    }
  }, [items, highlightedIndex, onSelect, onOpenChange])

  return {
    highlightedIndex,
    setHighlightedIndex,
    buttonRef,
    listRef,
    buttonProps: {
      ref: buttonRef,
      'aria-haspopup': 'listbox',
      'aria-expanded': isOpen,
      'aria-label': label,
      onKeyDown: handleButtonKeyDown,
      onClick: () => onOpenChange?.(!isOpen)
    },
    listProps: {
      ref: listRef,
      role: 'listbox',
      'aria-label': label,
      tabIndex: -1,
      onKeyDown: handleListKeyDown
    },
    getOptionProps: (index) => ({
      role: 'option',
      'aria-selected': index === selectedIndex,
      'data-highlighted': index === highlightedIndex,
      onClick: () => {
        onSelect?.(index, items[index])
        onOpenChange?.(false)
        buttonRef.current?.focus()
      },
      onMouseEnter: () => setHighlightedIndex(index)
    })
  }
}

export default {
  useFocusTrap,
  useRovingTabindex,
  useGridNavigation,
  useSkipLink,
  useAnnouncer,
  useFocusReturn,
  useFocusVisible,
  useListBox
}
