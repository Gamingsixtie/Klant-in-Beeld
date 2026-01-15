/**
 * AI Service Layer
 * Handles all AI-related processing, query analysis, and response generation
 */

import { analyzeQuery, generateWidgetConfig, generateClarification, generateFollowUpSuggestions } from './intentMapper'

// ============================================================================
// Configuration
// ============================================================================

const AI_CONFIG = {
  processingDelay: 600, // Simulated processing delay in ms
  maxRetries: 3,
  retryDelay: 1000,
  confidenceThreshold: 0.5,
  streamingEnabled: false // Set to true when backend supports streaming
}

// ============================================================================
// Response Templates
// ============================================================================

const RESPONSE_TEMPLATES = {
  kpi: (title) => `📊 Hier is ${title}:`,
  bar: (title) => `📊 ${title} vergelijking:`,
  line: (title) => `📈 ${title} trend:`,
  table: (title) => `📋 Overzicht van ${title}:`,
  pie: (title) => `🥧 Verdeling ${title}:`,
  progress: (title) => `📊 Voortgang ${title}:`,
  default: (title) => `Hier is ${title}:`
}

const ERROR_MESSAGES = {
  unknown_query: (query) =>
    `Ik begreep je vraag niet helemaal. Probeer specifiek te vragen naar:\n` +
    `• Baten (bijv. "Hoeveel baten zijn er?")\n` +
    `• Inspanningen (bijv. "Toon actieve inspanningen")\n` +
    `• Risico's (bijv. "Wat zijn de hoogste risico's?")\n` +
    `• NPS of metrics (bijv. "Vergelijk NPS per sector")`,

  follow_up_without_context: (entities) =>
    `Je wilt meer weten over ${entities.join(', ')}. Kun je specifieker zijn? ` +
    `Bijvoorbeeld: "Toon NPS per sector" of "Hoeveel zijn er actief?"`,

  processing_error: () =>
    '❌ Sorry, er ging iets mis. Probeer het opnieuw of kies een suggestie.',

  network_error: () =>
    '❌ Netwerk fout. Controleer je verbinding en probeer het opnieuw.',

  timeout_error: () =>
    '❌ De verwerking duurde te lang. Probeer een eenvoudigere vraag.'
}

// ============================================================================
// Widget Type Mapping
// ============================================================================

const WIDGET_TYPE_MAP = {
  kpi: 'kpi',
  bar: 'bar',
  line: 'line',
  table: 'table',
  pie: 'pie',
  progress: 'progress'
}

// ============================================================================
// AI Service Class
// ============================================================================

class AIService {
  constructor() {
    this.isInitialized = false
    this.eventListeners = new Map()
  }

  /**
   * Initialize the AI service
   */
  async initialize() {
    if (this.isInitialized) return

    // Perform any async initialization here
    // e.g., load models, establish connections, etc.

    this.isInitialized = true
    this.emit('initialized')
  }

  /**
   * Process a natural language query
   * @param {string} query - The user's query
   * @param {Object} context - Conversation context
   * @param {Object} options - Processing options
   * @returns {Promise<Object>} - AI response with potential widget config
   */
  async processQuery(query, context = {}, options = {}) {
    const {
      skipDelay = false,
      maxRetries = AI_CONFIG.maxRetries
    } = options

    this.emit('processing_started', { query })

    try {
      // Simulate processing delay (remove in production with real AI)
      if (!skipDelay) {
        await this.delay(AI_CONFIG.processingDelay)
      }

      // Analyze the query
      const analysis = analyzeQuery(query, context)

      this.emit('analysis_complete', { analysis })

      // Check if clarification is needed
      if (analysis.needsClarification && analysis.confidence < AI_CONFIG.confidenceThreshold) {
        const clarification = generateClarification(analysis)
        if (clarification) {
          return {
            type: 'clarification',
            content: `🤔 ${clarification.question}`,
            clarification,
            analysis
          }
        }
      }

      // Generate widget configuration
      const widgetConfig = generateWidgetConfig(analysis)

      // Build response
      const response = this.buildResponse(analysis, widgetConfig, context)

      // Generate follow-up suggestions
      const suggestions = generateFollowUpSuggestions({
        lastEntities: analysis.entities.map(e => e.entity),
        lastMetrics: analysis.metrics.map(m => m.metric),
        lastWidgetType: widgetConfig?.type
      })

      this.emit('processing_complete', { response, widgetConfig, suggestions })

      return {
        type: 'success',
        content: response.content,
        widget: response.widget,
        suggestions,
        analysis,
        context: {
          lastEntities: analysis.entities.map(e => e.entity),
          lastMetrics: analysis.metrics.map(m => m.metric),
          lastWidgetType: widgetConfig?.type,
          lastFilters: analysis.groupBy ? { groupBy: analysis.groupBy } : {}
        }
      }

    } catch (error) {
      this.emit('processing_error', { error, query })

      const retries = options.retryCount || 0
      if (retries < maxRetries && this.isRetryableError(error)) {
        await this.delay(AI_CONFIG.retryDelay * (retries + 1))
        return this.processQuery(query, context, { ...options, retryCount: retries + 1 })
      }

      return {
        type: 'error',
        content: this.getErrorMessage(error),
        error
      }
    }
  }

  /**
   * Build the response based on analysis and widget config
   */
  buildResponse(analysis, widgetConfig, context) {
    if (widgetConfig) {
      const templateFn = RESPONSE_TEMPLATES[widgetConfig.type] || RESPONSE_TEMPLATES.default
      return {
        content: templateFn(widgetConfig.title),
        widget: {
          ...widgetConfig,
          type: WIDGET_TYPE_MAP[widgetConfig.type] || widgetConfig.type
        }
      }
    }

    // No widget could be generated
    if (analysis.isFollowUp && context.lastEntities?.length > 0) {
      return {
        content: ERROR_MESSAGES.follow_up_without_context(context.lastEntities),
        widget: null
      }
    }

    return {
      content: ERROR_MESSAGES.unknown_query(analysis.query),
      widget: null
    }
  }

  /**
   * Process query with streaming (for future use)
   */
  async processQueryStreaming(query, context = {}, onChunk) {
    if (!AI_CONFIG.streamingEnabled) {
      const result = await this.processQuery(query, context)
      onChunk(result.content)
      return result
    }

    // Streaming implementation for when backend supports it
    // This would connect to a streaming API endpoint
    throw new Error('Streaming not yet implemented')
  }

  /**
   * Get suggestions based on current context
   */
  getSuggestions(context = {}) {
    return generateFollowUpSuggestions(context)
  }

  /**
   * Validate a query before processing
   */
  validateQuery(query) {
    if (!query || typeof query !== 'string') {
      return { valid: false, error: 'Query is required' }
    }

    const trimmed = query.trim()
    if (trimmed.length === 0) {
      return { valid: false, error: 'Query cannot be empty' }
    }

    if (trimmed.length > 500) {
      return { valid: false, error: 'Query is too long (max 500 characters)' }
    }

    return { valid: true, query: trimmed }
  }

  /**
   * Get error message based on error type
   */
  getErrorMessage(error) {
    if (error.name === 'NetworkError' || error.message.includes('network')) {
      return ERROR_MESSAGES.network_error()
    }

    if (error.name === 'TimeoutError' || error.message.includes('timeout')) {
      return ERROR_MESSAGES.timeout_error()
    }

    return ERROR_MESSAGES.processing_error()
  }

  /**
   * Check if error is retryable
   */
  isRetryableError(error) {
    return (
      error.name === 'NetworkError' ||
      error.message.includes('network') ||
      error.message.includes('timeout')
    )
  }

  /**
   * Utility delay function
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  /**
   * Event emitter functionality
   */
  on(event, callback) {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, new Set())
    }
    this.eventListeners.get(event).add(callback)
    return () => this.off(event, callback)
  }

  off(event, callback) {
    if (this.eventListeners.has(event)) {
      this.eventListeners.get(event).delete(callback)
    }
  }

  emit(event, data) {
    if (this.eventListeners.has(event)) {
      this.eventListeners.get(event).forEach(callback => {
        try {
          callback(data)
        } catch (error) {
          console.error(`Error in event listener for ${event}:`, error)
        }
      })
    }
  }
}

// ============================================================================
// Singleton Instance
// ============================================================================

const aiService = new AIService()

// ============================================================================
// Exported Functions
// ============================================================================

/**
 * Process a query through the AI service
 */
export async function processAIQuery(query, context, options) {
  return aiService.processQuery(query, context, options)
}

/**
 * Process a query with streaming
 */
export async function processAIQueryStreaming(query, context, onChunk) {
  return aiService.processQueryStreaming(query, context, onChunk)
}

/**
 * Get AI suggestions
 */
export function getAISuggestions(context) {
  return aiService.getSuggestions(context)
}

/**
 * Validate a query
 */
export function validateAIQuery(query) {
  return aiService.validateQuery(query)
}

/**
 * Subscribe to AI service events
 */
export function onAIServiceEvent(event, callback) {
  return aiService.on(event, callback)
}

/**
 * Initialize the AI service
 */
export async function initializeAIService() {
  return aiService.initialize()
}

// ============================================================================
// Mock Data Generator (for development)
// ============================================================================

export function generateMockResponse(type = 'kpi') {
  const mockData = {
    kpi: {
      value: Math.floor(Math.random() * 100),
      label: 'Mock KPI',
      trend: (Math.random() - 0.5) * 20,
      suffix: '%'
    },
    bar: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr'],
      datasets: [{
        label: 'Mock Data',
        data: [65, 59, 80, 81]
      }]
    },
    line: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [{
        label: 'Trend',
        data: [12, 19, 15, 22]
      }]
    },
    table: {
      columns: [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        { key: 'status', label: 'Status' }
      ],
      rows: [
        { id: 1, name: 'Item 1', status: 'active' },
        { id: 2, name: 'Item 2', status: 'pending' }
      ]
    }
  }

  return mockData[type] || mockData.kpi
}

export default aiService
