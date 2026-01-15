import { useState, useEffect, useCallback } from 'react'

// Breakpoint definitions matching Tailwind defaults
const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
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

  return {
    breakpoint,
    dimensions,
    isMobile,
    isTablet,
    isDesktop,
    isSmallScreen,
    getRecommendedPanelState,
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
