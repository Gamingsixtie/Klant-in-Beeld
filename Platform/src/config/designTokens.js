/**
 * Design Tokens Configuration
 * Centralized design system tokens for the AI Dashboard
 */

// ============================================================================
// Color Tokens
// ============================================================================

export const colors = {
  // Brand Colors (Corporate Blue)
  brand: {
    50: '#e6f0ff',
    100: '#cce0ff',
    200: '#99c2ff',
    300: '#66a3ff',
    400: '#3385ff',
    500: '#003366', // Primary brand color
    600: '#002855',
    700: '#001f44',
    800: '#001633',
    900: '#000d22'
  },

  // Semantic Colors
  primary: {
    DEFAULT: '#003366',
    hover: '#002855',
    active: '#001f44',
    light: '#e6f0ff',
    dark: '#001633'
  },

  secondary: {
    DEFAULT: '#64748b',
    hover: '#475569',
    active: '#334155',
    light: '#f1f5f9',
    dark: '#1e293b'
  },

  success: {
    DEFAULT: '#10b981',
    hover: '#059669',
    light: '#d1fae5',
    dark: '#065f46'
  },

  warning: {
    DEFAULT: '#f59e0b',
    hover: '#d97706',
    light: '#fef3c7',
    dark: '#92400e'
  },

  error: {
    DEFAULT: '#ef4444',
    hover: '#dc2626',
    light: '#fee2e2',
    dark: '#991b1b'
  },

  info: {
    DEFAULT: '#3b82f6',
    hover: '#2563eb',
    light: '#dbeafe',
    dark: '#1e40af'
  },

  // Chart Colors
  chart: {
    blue: '#3B82F6',
    purple: '#8B5CF6',
    green: '#10B981',
    amber: '#F59E0B',
    rose: '#F43F5E',
    cyan: '#06B6D4',
    indigo: '#6366F1',
    emerald: '#34D399'
  },

  // Gradient Presets
  gradients: {
    brand: 'linear-gradient(135deg, #003366 0%, #004080 50%, #002855 100%)',
    success: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    purple: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)',
    blue: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)'
  },

  // Neutral Colors
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a'
  }
}

// ============================================================================
// Typography Tokens
// ============================================================================

export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
    mono: ['JetBrains Mono', 'Fira Code', 'monospace']
  },

  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],
    sm: ['0.875rem', { lineHeight: '1.25rem' }],
    base: ['1rem', { lineHeight: '1.5rem' }],
    lg: ['1.125rem', { lineHeight: '1.75rem' }],
    xl: ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }]
  },

  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  }
}

// ============================================================================
// Spacing Tokens
// ============================================================================

export const spacing = {
  0: '0',
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  2.5: '0.625rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  12: '3rem',
  14: '3.5rem',
  16: '4rem',
  20: '5rem',
  24: '6rem'
}

// ============================================================================
// Border Radius Tokens
// ============================================================================

export const borderRadius = {
  none: '0',
  sm: '0.25rem',
  DEFAULT: '0.375rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  '2xl': '1.5rem',
  '3xl': '2rem',
  full: '9999px'
}

// ============================================================================
// Shadow Tokens
// ============================================================================

export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',

  // Component-specific shadows
  widget: '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
  widgetHover: '0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.05)',
  panel: '0 25px 50px -12px rgb(0 0 0 / 0.15)',
  dropdown: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  modal: '0 25px 50px -12px rgb(0 0 0 / 0.25)'
}

// ============================================================================
// Animation Tokens
// ============================================================================

export const animation = {
  duration: {
    instant: '0ms',
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '700ms'
  },

  easing: {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
  },

  // Predefined animations
  presets: {
    fadeIn: 'fadeIn 300ms ease-out',
    fadeOut: 'fadeOut 300ms ease-in',
    slideInUp: 'slideInUp 300ms ease-out',
    slideInDown: 'slideInDown 300ms ease-out',
    scaleIn: 'scaleIn 200ms ease-out',
    pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    spin: 'spin 1s linear infinite',
    bounce: 'bounce 1s infinite'
  }
}

// ============================================================================
// Breakpoint Tokens
// ============================================================================

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
}

// ============================================================================
// Z-Index Tokens
// ============================================================================

export const zIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  tooltip: 1600,
  toast: 1700
}

// ============================================================================
// Widget Size Configurations
// ============================================================================

export const widgetSizes = {
  sm: {
    minWidth: 200,
    minHeight: 120,
    defaultCols: 1
  },
  md: {
    minWidth: 300,
    minHeight: 200,
    defaultCols: 2
  },
  lg: {
    minWidth: 450,
    minHeight: 280,
    defaultCols: 3
  },
  xl: {
    minWidth: 600,
    minHeight: 350,
    defaultCols: 4
  }
}

// ============================================================================
// Component-specific Tokens
// ============================================================================

export const components = {
  // Button variants
  button: {
    sizes: {
      sm: { height: '32px', padding: '0 12px', fontSize: '0.875rem' },
      md: { height: '40px', padding: '0 16px', fontSize: '0.875rem' },
      lg: { height: '48px', padding: '0 24px', fontSize: '1rem' }
    }
  },

  // Input variants
  input: {
    sizes: {
      sm: { height: '32px', padding: '0 10px', fontSize: '0.875rem' },
      md: { height: '40px', padding: '0 14px', fontSize: '0.875rem' },
      lg: { height: '48px', padding: '0 16px', fontSize: '1rem' }
    }
  },

  // Card variants
  card: {
    padding: {
      sm: '12px',
      md: '16px',
      lg: '20px',
      xl: '24px'
    },
    borderRadius: '1rem'
  },

  // Widget header
  widgetHeader: {
    iconSize: '16px',
    iconContainerSize: '36px',
    titleSize: '0.875rem',
    subtitleSize: '0.75rem'
  }
}

// ============================================================================
// Theme Export
// ============================================================================

export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  animation,
  breakpoints,
  zIndex,
  widgetSizes,
  components
}

export default theme
