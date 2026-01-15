/**
 * Intent Mapper Service
 * Analyzes user queries and extracts intent, entities, and suggested widget configurations
 */

// Intent patterns with confidence weights
const INTENT_PATTERNS = {
  metric_count: {
    patterns: [/hoeveel|aantal|tel|totaal|som/i],
    weight: 0.9,
    widgetType: 'kpi'
  },
  comparison: {
    patterns: [/vergelijk|per|breakdown|versus|vs|tussen/i],
    weight: 0.85,
    widgetType: 'bar'
  },
  trend: {
    patterns: [/trend|ontwikkeling|verloop|over\s*tijd|historisch/i],
    weight: 0.85,
    widgetType: 'line'
  },
  list: {
    patterns: [/toon|lijst|overzicht|welke|alle/i],
    weight: 0.7,
    widgetType: 'table'
  },
  status: {
    patterns: [/status|gereedheid|go.?no.?go|voortgang|ready/i],
    weight: 0.9,
    widgetType: 'kpi'
  },
  filter: {
    patterns: [/filter|alleen|sector|domein|type/i],
    weight: 0.6,
    widgetType: null // Filter modifier, not a primary intent
  },
  detail: {
    patterns: [/detail|meer\s*over|drill.?down|uitleg|specificeer/i],
    weight: 0.75,
    widgetType: 'table'
  },
  risk: {
    patterns: [/risico|risk|gevaar|probleem|blokkade/i],
    weight: 0.85,
    widgetType: 'table'
  }
}

// Entity patterns for extracting data sources
const ENTITY_PATTERNS = {
  baten: {
    patterns: [/baten?|benefit|opbrengst|waarde/i],
    dataSource: { entity: 'baten' }
  },
  inspanningen: {
    patterns: [/inspanning|project|activiteit|initiatief|werk/i],
    dataSource: { entity: 'inspanningen' }
  },
  risicos: {
    patterns: [/risico|risk|gevaar/i],
    dataSource: { entity: 'risicos' }
  },
  doelen: {
    patterns: [/doel|target|objective|kpi/i],
    dataSource: { entity: 'doelen' }
  },
  vermogens: {
    patterns: [/vermogen|capability|competentie/i],
    dataSource: { entity: 'vermogens' }
  },
  stuurparameters: {
    patterns: [/go.?no.?go|gereedheid|stuur|parameter/i],
    dataSource: { entity: 'stuurparameters' }
  }
}

// Metric patterns
const METRIC_PATTERNS = {
  nps: {
    patterns: [/nps|tevredenheid|satisfaction|score/i],
    metric: 'nps'
  },
  count: {
    patterns: [/aantal|hoeveel|totaal|tel/i],
    metric: 'count',
    aggregation: 'count'
  },
  dekking: {
    patterns: [/dekking|coverage|percentage/i],
    metric: 'dekking'
  },
  gereedheid: {
    patterns: [/gereedheid|ready|klaar|voortgang/i],
    metric: 'gereedheid'
  },
  trend: {
    patterns: [/trend|verloop|ontwikkeling/i],
    metric: 'trend'
  }
}

// GroupBy patterns
const GROUPBY_PATTERNS = {
  sector: {
    patterns: [/per\s*sector|sector|sectoren/i],
    groupBy: 'sector'
  },
  domein: {
    patterns: [/per\s*domein|domein|domeinen/i],
    groupBy: 'domein'
  },
  type: {
    patterns: [/per\s*type|type|soort/i],
    groupBy: 'type'
  },
  status: {
    patterns: [/per\s*status|status/i],
    groupBy: 'status'
  },
  periode: {
    patterns: [/per\s*periode|periode|maand|kwartaal/i],
    groupBy: 'periode'
  }
}

// Follow-up/context patterns (voor pronoun resolution)
const CONTEXT_PATTERNS = {
  reference: [/daarvan|daaruit|hiervan|deze|die|het|ze/i],
  moreDetail: [/meer\s*details?|uitgebreider|specifieker/i],
  drillDown: [/drill.?down|inzoomen|verdiepen/i],
  related: [/gerelateerd|gelinkt|gekoppeld/i]
}

/**
 * Analyzes a query and returns intent classification
 * @param {string} query - User's natural language query
 * @param {Object} context - Previous conversation context
 * @returns {Object} - Intent analysis result
 */
export function analyzeQuery(query, context = {}) {
  const normalizedQuery = query.toLowerCase().trim()

  // Detect intents with confidence scores
  const detectedIntents = []
  for (const [intentName, config] of Object.entries(INTENT_PATTERNS)) {
    for (const pattern of config.patterns) {
      if (pattern.test(normalizedQuery)) {
        detectedIntents.push({
          intent: intentName,
          confidence: config.weight,
          widgetType: config.widgetType
        })
        break
      }
    }
  }

  // Sort by confidence
  detectedIntents.sort((a, b) => b.confidence - a.confidence)
  const primaryIntent = detectedIntents[0] || { intent: 'unknown', confidence: 0 }

  // Detect entities
  const detectedEntities = []
  for (const [entityName, config] of Object.entries(ENTITY_PATTERNS)) {
    for (const pattern of config.patterns) {
      if (pattern.test(normalizedQuery)) {
        detectedEntities.push({
          entity: entityName,
          dataSource: config.dataSource
        })
        break
      }
    }
  }

  // Detect metrics
  const detectedMetrics = []
  for (const [metricName, config] of Object.entries(METRIC_PATTERNS)) {
    for (const pattern of config.patterns) {
      if (pattern.test(normalizedQuery)) {
        detectedMetrics.push({
          metric: metricName,
          ...config
        })
        break
      }
    }
  }

  // Detect groupBy
  let groupBy = null
  for (const [groupName, config] of Object.entries(GROUPBY_PATTERNS)) {
    for (const pattern of config.patterns) {
      if (pattern.test(normalizedQuery)) {
        groupBy = config.groupBy
        break
      }
    }
    if (groupBy) break
  }

  // Check for follow-up/context references
  const isFollowUp = CONTEXT_PATTERNS.reference.some(p => p.test(normalizedQuery)) ||
                     CONTEXT_PATTERNS.moreDetail.some(p => p.test(normalizedQuery)) ||
                     CONTEXT_PATTERNS.drillDown.some(p => p.test(normalizedQuery))

  // If follow-up and we have context, use previous entities/metrics
  let resolvedEntities = detectedEntities
  let resolvedMetrics = detectedMetrics

  if (isFollowUp && context.lastEntities?.length > 0 && detectedEntities.length === 0) {
    resolvedEntities = context.lastEntities.map(e => ({
      entity: e,
      dataSource: { entity: e }
    }))
  }

  if (isFollowUp && context.lastMetrics?.length > 0 && detectedMetrics.length === 0) {
    resolvedMetrics = context.lastMetrics.map(m => ({
      metric: m,
      ...METRIC_PATTERNS[m]
    }))
  }

  // Calculate overall confidence
  const needsClarification = primaryIntent.confidence < 0.7 ||
                             (resolvedEntities.length === 0 && !isFollowUp) ||
                             detectedIntents.length > 1 &&
                             detectedIntents[0].confidence - detectedIntents[1].confidence < 0.15

  return {
    query: normalizedQuery,
    primaryIntent,
    allIntents: detectedIntents,
    entities: resolvedEntities,
    metrics: resolvedMetrics,
    groupBy,
    isFollowUp,
    needsClarification,
    confidence: primaryIntent.confidence,
    suggestedWidgetType: primaryIntent.widgetType
  }
}

/**
 * Generates widget configuration based on intent analysis
 * @param {Object} analysis - Result from analyzeQuery
 * @returns {Object|null} - Widget configuration or null
 */
export function generateWidgetConfig(analysis) {
  const { primaryIntent, entities, metrics, groupBy, suggestedWidgetType } = analysis

  if (!suggestedWidgetType || entities.length === 0) {
    return null
  }

  const entity = entities[0].entity
  const metric = metrics[0]?.metric || null
  const aggregation = metrics[0]?.aggregation || null

  // Build data source
  const dataSource = {
    entity,
    ...(metric && { metric }),
    ...(aggregation && { aggregation }),
    ...(groupBy && { groupBy })
  }

  // Determine size based on widget type
  const sizeMap = {
    kpi: 'sm',
    bar: groupBy ? 'lg' : 'md',
    line: 'md',
    table: 'xl'
  }

  return {
    type: suggestedWidgetType,
    title: generateTitle(analysis),
    dataSource,
    size: sizeMap[suggestedWidgetType] || 'md'
  }
}

/**
 * Generates a human-readable title for the widget
 */
function generateTitle(analysis) {
  const { entities, metrics, groupBy, primaryIntent } = analysis

  const entityLabels = {
    baten: 'Baten',
    inspanningen: 'Inspanningen',
    risicos: "Risico's",
    doelen: 'Doelen',
    vermogens: 'Vermogens',
    stuurparameters: 'Stuurparameters'
  }

  const metricLabels = {
    nps: 'NPS',
    count: 'Aantal',
    dekking: 'Dekking',
    gereedheid: 'Gereedheid',
    trend: 'Trend'
  }

  const groupByLabels = {
    sector: 'per Sector',
    domein: 'per Domein',
    type: 'per Type',
    status: 'per Status',
    periode: 'Ontwikkeling'
  }

  const entity = entities[0]?.entity
  const metric = metrics[0]?.metric

  const parts = []

  if (metric && metricLabels[metric]) {
    parts.push(metricLabels[metric])
  }

  if (entity && entityLabels[entity]) {
    parts.push(entityLabels[entity])
  }

  if (groupBy && groupByLabels[groupBy]) {
    parts.push(groupByLabels[groupBy])
  }

  if (parts.length === 0) {
    return 'Dashboard Widget'
  }

  return parts.join(' ')
}

/**
 * Generates clarification options for ambiguous queries
 * @param {Object} analysis - Result from analyzeQuery
 * @returns {Object} - Clarification question and options
 */
export function generateClarification(analysis) {
  const { allIntents, entities, query } = analysis

  // If multiple intents with similar confidence
  if (allIntents.length > 1 && allIntents[0].confidence - allIntents[1].confidence < 0.15) {
    const intentLabels = {
      metric_count: 'Een aantal/telling zien',
      comparison: 'Een vergelijking maken',
      trend: 'Een trend bekijken',
      list: 'Een overzicht/lijst zien',
      status: 'De status bekijken',
      detail: 'Meer details zien',
      risk: "Risico's analyseren"
    }

    return {
      question: 'Wat wil je precies zien?',
      options: allIntents.slice(0, 3).map(i => ({
        label: intentLabels[i.intent] || i.intent,
        value: i.intent,
        widgetType: i.widgetType
      }))
    }
  }

  // If no entities detected
  if (entities.length === 0) {
    return {
      question: 'Over welke data wil je iets weten?',
      options: [
        { label: 'Baten', value: 'baten' },
        { label: 'Inspanningen', value: 'inspanningen' },
        { label: "Risico's", value: 'risicos' },
        { label: 'Doelen', value: 'doelen' }
      ]
    }
  }

  return null
}

/**
 * Generates follow-up suggestions based on current widget/context
 * @param {Object} context - Current conversation context
 * @returns {Array} - Array of suggestion objects
 */
export function generateFollowUpSuggestions(context) {
  const { lastEntities = [], lastMetrics = [], lastWidgetType } = context
  const suggestions = []

  if (lastEntities.includes('baten')) {
    suggestions.push(
      { query: 'Vergelijk NPS per sector', icon: '📊' },
      { query: 'Toon dekking per domein', icon: '📈' },
      { query: 'Welke baten hebben geen inspanning?', icon: '⚠️' }
    )
  }

  if (lastEntities.includes('inspanningen')) {
    suggestions.push(
      { query: 'Toon actieve inspanningen', icon: '📋' },
      { query: 'Hoeveel inspanningen per type?', icon: '📊' },
      { query: 'Welke inspanningen lopen achter?', icon: '⏰' }
    )
  }

  if (lastEntities.includes('risicos')) {
    suggestions.push(
      { query: 'Sorteer risicos op impact', icon: '🎯' },
      { query: 'Welke risicos zijn onbeheerst?', icon: '⚠️' }
    )
  }

  // Add generic suggestions if none specific
  if (suggestions.length === 0) {
    suggestions.push(
      { query: 'Hoe staat het met Go/No-Go?', icon: '🎯' },
      { query: 'Vergelijk NPS per sector', icon: '📊' },
      { query: 'Toon actieve inspanningen', icon: '📋' }
    )
  }

  return suggestions.slice(0, 4)
}

export default {
  analyzeQuery,
  generateWidgetConfig,
  generateClarification,
  generateFollowUpSuggestions
}
