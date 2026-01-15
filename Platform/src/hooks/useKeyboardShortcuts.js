import { useEffect, useCallback } from 'react'

/**
 * Keyboard shortcut definitions for AI Dashboard
 */
export const SHORTCUTS = {
  FOCUS_INPUT: { key: 'k', ctrl: true, description: 'Focus zoekveld' },
  TOGGLE_HELP: { key: '/', ctrl: true, description: 'Toon/verberg sneltoetsen' },
  CLOSE: { key: 'Escape', description: 'Sluit panel/modal' },
  EXPORT: { key: 'e', ctrl: true, description: 'Exporteer dashboard' },
  RESET: { key: 'r', ctrl: true, shift: true, description: 'Reset dashboard' },
  NAV_UP: { key: 'ArrowUp', description: 'Navigeer omhoog' },
  NAV_DOWN: { key: 'ArrowDown', description: 'Navigeer omlaag' },
  NAV_LEFT: { key: 'ArrowLeft', description: 'Navigeer links' },
  NAV_RIGHT: { key: 'ArrowRight', description: 'Navigeer rechts' },
  SELECT: { key: 'Enter', description: 'Selecteer item' }
}

/**
 * Check if a keyboard event matches a shortcut
 */
function matchesShortcut(event, shortcut) {
  const keyMatches = event.key === shortcut.key
  const ctrlMatches = shortcut.ctrl ? (event.ctrlKey || event.metaKey) : true
  const shiftMatches = shortcut.shift ? event.shiftKey : true

  return keyMatches && ctrlMatches && shiftMatches
}

/**
 * Custom hook for managing keyboard shortcuts
 *
 * @param {Object} handlers - Object mapping shortcut names to handler functions
 * @param {Object} options - Configuration options
 * @param {boolean} options.enabled - Whether shortcuts are enabled (default: true)
 * @param {boolean} options.enableInInputs - Whether to trigger in input fields (default: false)
 */
export function useKeyboardShortcuts(handlers, options = {}) {
  const { enabled = true, enableInInputs = false } = options

  const handleKeyDown = useCallback((event) => {
    if (!enabled) return

    // Check if focus is in an input field
    const isInputActive = ['INPUT', 'TEXTAREA', 'SELECT'].includes(
      document.activeElement?.tagName
    )

    // Skip shortcuts in input fields unless enabled
    if (isInputActive && !enableInInputs) {
      // Allow Escape to work in inputs
      if (event.key !== 'Escape') return
    }

    // Check each registered shortcut
    for (const [name, handler] of Object.entries(handlers)) {
      const shortcut = SHORTCUTS[name]
      if (!shortcut) continue

      if (matchesShortcut(event, shortcut)) {
        event.preventDefault()
        handler(event)
        return
      }
    }
  }, [enabled, enableInInputs, handlers])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])
}

/**
 * Get all available shortcuts for display
 */
export function getShortcutsList() {
  return Object.entries(SHORTCUTS).map(([name, shortcut]) => ({
    name,
    ...shortcut,
    keys: formatShortcutKeys(shortcut)
  }))
}

/**
 * Format shortcut keys for display
 */
function formatShortcutKeys(shortcut) {
  const parts = []
  if (shortcut.ctrl) parts.push('Ctrl')
  if (shortcut.shift) parts.push('Shift')
  parts.push(shortcut.key)
  return parts.join(' + ')
}

export default useKeyboardShortcuts
