/**
 * Modal Component
 *
 * Toegankelijke modal met:
 * - Focus trap (tab blijft binnen modal)
 * - Escape to close
 * - Click outside to close
 * - Scroll lock op body
 * - ARIA attributes
 * - Animaties
 */

import { useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

const FOCUSABLE_SELECTORS = [
  'button:not([disabled])',
  '[href]',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])'
].join(', ')

export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  headerColor,
  headerIcon: HeaderIcon,
  size = 'lg',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  children
}) {
  const modalRef = useRef(null)
  const previousActiveElement = useRef(null)

  // Size classes
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-xl',
    lg: 'max-w-3xl',
    xl: 'max-w-5xl',
    full: 'max-w-[90vw]'
  }

  // Focus trap implementation
  const trapFocus = useCallback((e) => {
    if (e.key !== 'Tab' || !modalRef.current) return

    const focusableElements = modalRef.current.querySelectorAll(FOCUSABLE_SELECTORS)
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    if (!firstElement) return

    if (e.shiftKey) {
      // Shift + Tab: als we op eerste element zijn, ga naar laatste
      if (document.activeElement === firstElement) {
        e.preventDefault()
        lastElement?.focus()
      }
    } else {
      // Tab: als we op laatste element zijn, ga naar eerste
      if (document.activeElement === lastElement) {
        e.preventDefault()
        firstElement?.focus()
      }
    }
  }, [])

  // Escape key handler
  const handleEscape = useCallback((e) => {
    if (closeOnEscape && e.key === 'Escape') {
      onClose()
    }
  }, [closeOnEscape, onClose])

  // Overlay click handler
  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose()
    }
  }

  // Effect: Focus management & body scroll lock
  useEffect(() => {
    if (isOpen) {
      // Store currently focused element
      previousActiveElement.current = document.activeElement

      // Lock body scroll
      document.body.style.overflow = 'hidden'

      // Focus modal after animation
      setTimeout(() => {
        const firstFocusable = modalRef.current?.querySelector(FOCUSABLE_SELECTORS)
        if (firstFocusable) {
          firstFocusable.focus()
        } else {
          modalRef.current?.focus()
        }
      }, 50)

      // Add event listeners
      document.addEventListener('keydown', trapFocus)
      document.addEventListener('keydown', handleEscape)

      return () => {
        document.removeEventListener('keydown', trapFocus)
        document.removeEventListener('keydown', handleEscape)
        document.body.style.overflow = ''

        // Restore focus
        previousActiveElement.current?.focus()
      }
    }
  }, [isOpen, trapFocus, handleEscape])

  // Don't render if not open
  if (!isOpen) return null

  // Determine header styling based on headerColor
  const hasColoredHeader = !!headerColor
  const headerBg = hasColoredHeader ? headerColor : 'var(--color-surface-elevated)'
  const headerText = hasColoredHeader ? 'text-white' : 'text-gray-900'
  const headerSubtext = hasColoredHeader ? 'opacity-80' : 'text-gray-500'
  const closeButtonStyle = hasColoredHeader
    ? 'hover:bg-white/20 text-white focus-visible:ring-white'
    : 'hover:bg-gray-100 text-gray-500 focus-visible:ring-[var(--color-cito-blue)]'

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Overlay backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* Modal content */}
      <div
        ref={modalRef}
        className={`
          relative bg-white rounded-xl shadow-xl w-full max-h-[85vh] overflow-hidden
          modal-content ${sizeClasses[size]}
        `}
        tabIndex={-1}
      >
        {/* Header */}
        <div
          className={`sticky top-0 z-10 p-6 border-b flex items-center justify-between ${headerText}`}
          style={{ backgroundColor: headerBg, borderColor: hasColoredHeader ? 'transparent' : 'var(--gray-100)' }}
        >
          <div className="flex items-center gap-3">
            {HeaderIcon && (
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  hasColoredHeader ? 'bg-white/20' : 'bg-gray-100'
                }`}
              >
                <HeaderIcon className={`w-6 h-6 ${hasColoredHeader ? 'text-white' : 'text-gray-600'}`} />
              </div>
            )}
            <div>
              <h2 id="modal-title" className="text-2xl font-bold">
                {title}
              </h2>
              {subtitle && (
                <p className={`text-sm mt-1 ${headerSubtext}`}>
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className={`
              p-2 rounded-lg transition-colors
              focus-visible:ring-2 focus-visible:ring-offset-2
              ${closeButtonStyle}
            `}
            aria-label="Modal sluiten"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-auto max-h-[calc(85vh-88px)]">
          {children}
        </div>
      </div>
    </div>,
    document.body
  )
}

export default Modal
