import { useState, useEffect, useCallback, createContext, useContext } from 'react'

// Breakpoint definitions matching Tailwind defaults
const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
}

// Context voor sidebar state (mobile menu)
const SidebarContext = createContext(null)

export function SidebarProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const toggle = useCallback(() => setIsOpen(prev => !prev), [])

  return (
    <SidebarContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}

/**
 * Custom hook for responsive design
 * Returns current breakpoint and helper booleans
 */
export function useResponsive() {
  const [breakpoint, setBreakpoint] = useState('desktop')
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1280,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  })

  const getBreakpoint = useCallback((width) => {
    if (width < BREAKPOINTS.sm) return 'xs'
    if (width < BREAKPOINTS.md) return 'sm'
    if (width < BREAKPOINTS.lg) return 'md'
    if (width < BREAKPOINTS.xl) return 'lg'
    if (width < BREAKPOINTS['2xl']) return 'xl'
    return '2xl'
  }, [])

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      setDimensions({ width, height })
      setBreakpoint(getBreakpoint(width))
    }

    // Set initial values
    handleResize()

    // Use ResizeObserver for better performance
    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(document.body)

    // Fallback for window resize
    window.addEventListener('resize', handleResize)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', handleResize)
    }
  }, [getBreakpoint])

  // Computed values
  const isMobile = breakpoint === 'xs' || breakpoint === 'sm'
  const isTablet = breakpoint === 'md' || breakpoint === 'lg'
  const isDesktop = breakpoint === 'xl' || breakpoint === '2xl'
  const isSmallScreen = isMobile || breakpoint === 'md'

  // Panel state recommendations based on breakpoint
  const getRecommendedPanelState = useCallback(() => {
    if (isMobile) return 'hidden'
    if (isTablet) return 'collapsed'
    return 'expanded'
  }, [isMobile, isTablet])

  // Helper: should sidebar be shown as fixed (desktop) or overlay (mobile)
  // Matches Tailwind's lg: breakpoint (1024px)
  const shouldShowFixedSidebar = breakpoint === 'lg' || breakpoint === 'xl' || breakpoint === '2xl'
  const shouldShowMobileSidebar = breakpoint === 'xs' || breakpoint === 'sm' || breakpoint === 'md'

  return {
    breakpoint,
    dimensions,
    isMobile,
    isTablet,
    isDesktop,
    isSmallScreen,
    getRecommendedPanelState,
    // Sidebar helpers
    shouldShowFixedSidebar,
    shouldShowMobileSidebar,
    // Direct breakpoint checks
    isXs: breakpoint === 'xs',
    isSm: breakpoint === 'sm',
    isMd: breakpoint === 'md',
    isLg: breakpoint === 'lg',
    isXl: breakpoint === 'xl',
    is2Xl: breakpoint === '2xl'
  }
}

/**
 * Hook for media query matching
 * @param {string} query - CSS media query string
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    setMatches(mediaQuery.matches)

    const handler = (event) => setMatches(event.matches)
    mediaQuery.addEventListener('change', handler)

    return () => mediaQuery.removeEventListener('change', handler)
  }, [query])

  return matches
}

export default useResponsive
