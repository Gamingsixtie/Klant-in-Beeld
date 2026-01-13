/**
 * Tabs Component
 *
 * Toegankelijke tab navigatie met:
 * - ARIA tablist/tab/tabpanel roles
 * - Keyboard navigatie (pijltjestoetsen)
 * - Animatie bij tab switch
 * - Optionele badges en icons
 */

import { useRef, useCallback } from 'react'

export function Tabs({
  tabs,
  activeTab,
  onTabChange,
  variant = 'default',
  className = '',
  children
}) {
  const tablistRef = useRef(null)

  // Keyboard navigation
  const handleKeyDown = useCallback((e, currentIndex) => {
    let newIndex = currentIndex

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault()
        newIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1
        break
      case 'ArrowRight':
        e.preventDefault()
        newIndex = currentIndex === tabs.length - 1 ? 0 : currentIndex + 1
        break
      case 'Home':
        e.preventDefault()
        newIndex = 0
        break
      case 'End':
        e.preventDefault()
        newIndex = tabs.length - 1
        break
      default:
        return
    }

    onTabChange(tabs[newIndex].id)

    // Focus the new tab
    const tabElements = tablistRef.current?.querySelectorAll('[role="tab"]')
    tabElements?.[newIndex]?.focus()
  }, [tabs, onTabChange])

  // Variant styles
  const variantStyles = {
    default: {
      container: 'bg-white rounded-xl border border-gray-100 overflow-hidden',
      tablist: 'flex border-b border-gray-100',
      tab: (isActive) => `
        flex-1 px-4 py-3 flex items-center justify-center gap-2
        text-sm font-medium transition-colors
        focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-cito-blue)]
        ${isActive
          ? 'bg-[var(--color-cito-blue)]/5 text-[var(--color-cito-blue)] border-b-2 border-[var(--color-cito-blue)] -mb-px'
          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
        }
      `,
      panel: 'p-6'
    },
    pills: {
      container: '',
      tablist: 'flex gap-2 p-1 bg-gray-100 rounded-lg w-fit',
      tab: (isActive) => `
        px-4 py-2 rounded-md text-sm font-medium transition-all
        focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-cito-blue)]
        ${isActive
          ? 'bg-white text-gray-900 shadow-sm'
          : 'text-gray-600 hover:text-gray-900'
        }
      `,
      panel: 'mt-4'
    },
    underline: {
      container: '',
      tablist: 'flex gap-6 border-b border-gray-200',
      tab: (isActive) => `
        pb-3 text-sm font-medium transition-colors relative
        focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-cito-blue)]
        ${isActive
          ? 'text-[var(--color-cito-blue)] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[var(--color-cito-blue)]'
          : 'text-gray-500 hover:text-gray-700'
        }
      `,
      panel: 'pt-6'
    }
  }

  const styles = variantStyles[variant]

  return (
    <div className={`${styles.container} ${className}`}>
      {/* Tab List */}
      <div
        ref={tablistRef}
        role="tablist"
        aria-label="Tabs"
        className={styles.tablist}
      >
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.id
          const Icon = tab.icon

          return (
            <button
              key={tab.id}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onTabChange(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={styles.tab(isActive)}
            >
              {Icon && <Icon className="w-4 h-4" />}
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="text-[10px] bg-[var(--color-cito-blue)] text-white px-1.5 py-0.5 rounded-full">
                  {tab.badge}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Tab Panels */}
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id

        return (
          <div
            key={tab.id}
            role="tabpanel"
            id={`tabpanel-${tab.id}`}
            aria-labelledby={`tab-${tab.id}`}
            hidden={!isActive}
            tabIndex={0}
            className={styles.panel}
          >
            {/* Only render content for active tab (performance) */}
            {isActive && children[tab.id]}
          </div>
        )
      })}
    </div>
  )
}

export default Tabs
