/**
 * ErrorBoundary Component
 * Catches JavaScript errors in child component tree and displays fallback UI
 */

import { Component } from 'react'
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react'

// ============================================================================
// Error Fallback Components
// ============================================================================

/**
 * Default error fallback UI
 */
export function DefaultErrorFallback({ error, resetError, componentStack }) {
  return (
    <div className="min-h-[200px] flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>

        <h2 className="text-lg font-semibold text-slate-800 mb-2">
          Er is iets misgegaan
        </h2>

        <p className="text-sm text-slate-500 mb-6">
          {error?.message || 'Een onverwachte fout is opgetreden'}
        </p>

        <div className="flex gap-3 justify-center">
          {resetError && (
            <button
              onClick={resetError}
              className="flex items-center gap-2 px-4 py-2 bg-[#003366] text-white rounded-xl hover:bg-[#002855] transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Opnieuw proberen
            </button>
          )}

          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors"
          >
            <Home className="w-4 h-4" />
            Pagina herladen
          </button>
        </div>

        {process.env.NODE_ENV === 'development' && componentStack && (
          <details className="mt-6 text-left">
            <summary className="text-xs text-slate-400 cursor-pointer hover:text-slate-600">
              <Bug className="w-3 h-3 inline mr-1" />
              Technische details
            </summary>
            <pre className="mt-2 p-3 bg-slate-50 rounded-lg text-xs text-red-600 overflow-auto max-h-48">
              {error?.stack || componentStack}
            </pre>
          </details>
        )}
      </div>
    </div>
  )
}

/**
 * Widget-specific error fallback
 */
export function WidgetErrorFallback({ error, resetError, widgetTitle }) {
  return (
    <div className="bg-white rounded-2xl border border-red-200 p-5">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-red-50 rounded-xl">
          <AlertTriangle className="w-5 h-5 text-red-500" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-800">
            {widgetTitle || 'Widget'} kon niet laden
          </h3>
          <p className="text-xs text-slate-400">Fout in component</p>
        </div>
      </div>

      <p className="text-sm text-slate-600 mb-4">
        {error?.message || 'Deze widget ondervond een probleem'}
      </p>

      {resetError && (
        <button
          onClick={resetError}
          className="flex items-center gap-2 px-3 py-2 text-sm text-[#003366] hover:bg-blue-50 rounded-lg transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Opnieuw proberen
        </button>
      )}
    </div>
  )
}

/**
 * Panel error fallback
 */
export function PanelErrorFallback({ error, resetError }) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
      <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mb-4">
        <AlertTriangle className="w-6 h-6 text-amber-500" />
      </div>

      <h3 className="text-sm font-semibold text-slate-700 mb-2">
        AI Assistant niet beschikbaar
      </h3>

      <p className="text-xs text-slate-500 mb-4">
        {error?.message || 'Probeer het later opnieuw'}
      </p>

      {resetError && (
        <button
          onClick={resetError}
          className="text-sm text-[#003366] hover:underline"
        >
          Opnieuw proberen
        </button>
      )}
    </div>
  )
}

/**
 * Inline error fallback for small components
 */
export function InlineErrorFallback({ error, resetError }) {
  return (
    <div className="flex items-center gap-2 p-2 bg-red-50 rounded-lg text-sm">
      <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
      <span className="text-red-700 truncate">
        {error?.message || 'Fout'}
      </span>
      {resetError && (
        <button
          onClick={resetError}
          className="text-red-600 hover:text-red-800 flex-shrink-0"
        >
          <RefreshCw className="w-3 h-3" />
        </button>
      )}
    </div>
  )
}

// ============================================================================
// Error Boundary Class Component
// ============================================================================

/**
 * Error Boundary Component
 * React class component that catches errors in child components
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo })

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo)
    }

    // Call onError callback if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }

    // Log to external service if provided
    if (this.props.logError) {
      this.props.logError({
        error,
        errorInfo,
        componentStack: errorInfo?.componentStack,
        timestamp: new Date().toISOString(),
        location: window.location.href
      })
    }
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    })

    // Call onReset callback if provided
    if (this.props.onReset) {
      this.props.onReset()
    }
  }

  render() {
    const { hasError, error, errorInfo } = this.state
    const {
      children,
      fallback,
      FallbackComponent,
      fallbackProps = {}
    } = this.props

    if (hasError) {
      // Custom fallback render prop
      if (typeof fallback === 'function') {
        return fallback({
          error,
          errorInfo,
          resetError: this.resetError
        })
      }

      // Custom fallback element
      if (fallback) {
        return fallback
      }

      // Custom FallbackComponent
      if (FallbackComponent) {
        return (
          <FallbackComponent
            error={error}
            componentStack={errorInfo?.componentStack}
            resetError={this.resetError}
            {...fallbackProps}
          />
        )
      }

      // Default fallback
      return (
        <DefaultErrorFallback
          error={error}
          componentStack={errorInfo?.componentStack}
          resetError={this.resetError}
        />
      )
    }

    return children
  }
}

// ============================================================================
// Specialized Error Boundaries
// ============================================================================

/**
 * Widget Error Boundary
 * Specialized for dashboard widgets
 */
export function WidgetErrorBoundary({ children, widgetTitle, onError }) {
  return (
    <ErrorBoundary
      FallbackComponent={WidgetErrorFallback}
      fallbackProps={{ widgetTitle }}
      onError={onError}
    >
      {children}
    </ErrorBoundary>
  )
}

/**
 * Panel Error Boundary
 * Specialized for AI Assistant panel
 */
export function PanelErrorBoundary({ children, onError }) {
  return (
    <ErrorBoundary
      FallbackComponent={PanelErrorFallback}
      onError={onError}
    >
      {children}
    </ErrorBoundary>
  )
}

/**
 * Route Error Boundary
 * For catching errors at route level
 */
export function RouteErrorBoundary({ children, onError }) {
  return (
    <ErrorBoundary
      fallback={({ error, resetError }) => (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-10 h-10 text-red-500" />
            </div>

            <h1 className="text-xl font-bold text-slate-800 mb-2">
              Pagina kon niet worden geladen
            </h1>

            <p className="text-slate-500 mb-6">
              {error?.message || 'Er is een onverwachte fout opgetreden'}
            </p>

            <div className="flex gap-3 justify-center">
              <button
                onClick={resetError}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#003366] text-white rounded-xl hover:bg-[#002855] transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Opnieuw proberen
              </button>

              <button
                onClick={() => window.location.href = '/'}
                className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors"
              >
                <Home className="w-4 h-4" />
                Naar home
              </button>
            </div>
          </div>
        </div>
      )}
      onError={onError}
    >
      {children}
    </ErrorBoundary>
  )
}

// ============================================================================
// Higher-Order Component
// ============================================================================

/**
 * withErrorBoundary HOC
 * Wraps a component with an error boundary
 */
export function withErrorBoundary(WrappedComponent, errorBoundaryProps = {}) {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component'

  function ComponentWithErrorBoundary(props) {
    return (
      <ErrorBoundary {...errorBoundaryProps}>
        <WrappedComponent {...props} />
      </ErrorBoundary>
    )
  }

  ComponentWithErrorBoundary.displayName = `withErrorBoundary(${displayName})`

  return ComponentWithErrorBoundary
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Try-catch wrapper for async operations with error handling
 */
export async function withErrorHandling(operation, options = {}) {
  const {
    onError,
    fallbackValue = null,
    rethrow = false
  } = options

  try {
    return await operation()
  } catch (error) {
    if (onError) {
      onError(error)
    }

    if (process.env.NODE_ENV === 'development') {
      console.error('Operation failed:', error)
    }

    if (rethrow) {
      throw error
    }

    return fallbackValue
  }
}

/**
 * Create error logging function
 */
export function createErrorLogger(serviceName) {
  return (errorData) => {
    // In production, this would send to an error tracking service
    // e.g., Sentry, LogRocket, Datadog, etc.
    if (process.env.NODE_ENV === 'development') {
      console.group(`[${serviceName}] Error Log`)
      console.error('Error:', errorData.error)
      console.log('Timestamp:', errorData.timestamp)
      console.log('Location:', errorData.location)
      if (errorData.componentStack) {
        console.log('Component Stack:', errorData.componentStack)
      }
      console.groupEnd()
    }

    // Production error logging
    // await fetch('/api/log-error', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(errorData)
    // })
  }
}

export default ErrorBoundary
