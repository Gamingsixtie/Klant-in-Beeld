/**
 * Dashboard Type Definitions
 * Complete TypeScript types for the AI Dashboard system
 */

// ============================================================================
// Widget Types
// ============================================================================

export type WidgetType = 'kpi' | 'bar' | 'line' | 'pie' | 'table' | 'progress' | 'status'

export type WidgetSize = 'sm' | 'md' | 'lg' | 'xl'

export interface WidgetPosition {
  col: number
  row: number
  width?: number
  height?: number
}

export interface DataSource {
  entity: 'baten' | 'inspanningen' | 'risicos' | 'doelen' | 'vermogens' | 'stuurparameters' | 'voortgang'
  metric?: string
  aggregation?: 'count' | 'sum' | 'avg' | 'min' | 'max'
  groupBy?: 'sector' | 'domein' | 'type' | 'status' | 'periode'
  filter?: Record<string, unknown>
  sortBy?: string
  order?: 'asc' | 'desc'
}

export interface WidgetConfig {
  id: string
  type: WidgetType
  title: string
  dataSource: DataSource
  size: WidgetSize
  position?: WidgetPosition
  refreshInterval?: number
  createdAt?: string
  updatedAt?: string
}

export interface WidgetState {
  isLoading: boolean
  error: Error | null
  data: unknown
  lastUpdated: string | null
}

// ============================================================================
// AI/Conversation Types
// ============================================================================

export type IntentType =
  | 'metric_count'
  | 'comparison'
  | 'trend'
  | 'list'
  | 'status'
  | 'filter'
  | 'detail'
  | 'risk'
  | 'unknown'

export interface Intent {
  type: IntentType
  confidence: number
  widgetType: WidgetType | null
}

export interface DetectedEntity {
  entity: string
  dataSource: DataSource
}

export interface DetectedMetric {
  metric: string
  aggregation?: string
}

export interface QueryAnalysis {
  query: string
  primaryIntent: Intent
  allIntents: Intent[]
  entities: DetectedEntity[]
  metrics: DetectedMetric[]
  groupBy: string | null
  isFollowUp: boolean
  needsClarification: boolean
  confidence: number
  suggestedWidgetType: WidgetType | null
}

export interface AIQuery {
  text: string
  timestamp: string
  context?: ConversationContext
}

export interface AIResponse {
  content: string
  widget?: WidgetConfig | null
  suggestions?: QuerySuggestion[]
  needsClarification?: boolean
  clarificationOptions?: ClarificationOption[]
}

export interface QuerySuggestion {
  id: string
  query: string
  icon: string
  intent?: string
}

export interface ClarificationOption {
  label: string
  value: string
  description?: string
  widgetType?: WidgetType
}

export interface ConversationMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: string
  widget?: boolean
  metadata?: Record<string, unknown>
}

export interface ConversationContext {
  lastEntities: string[]
  lastMetrics: string[]
  lastFilters: Record<string, unknown>
  lastWidgetType: WidgetType | null
}

// ============================================================================
// Dashboard State Types
// ============================================================================

export type PanelState = 'expanded' | 'collapsed' | 'hidden'

export interface GlobalFilters {
  sector: string | null
  periode: {
    start: number
    end: number
  }
  domein: string | null
}

export interface ClarificationState {
  isOpen: boolean
  question: string
  options: ClarificationOption[]
  onSelect: ((option: ClarificationOption) => void) | null
}

export interface UserPreferences {
  savedLayouts: SavedLayout[]
  recentQueries: string[]
  favoriteQueries: string[]
  lastUsedReport: string | null
  autoLoadLastReport: boolean
  showWelcome: boolean
  hasSeenTour: boolean
  keyboardShortcutsEnabled: boolean
  theme?: 'light' | 'dark' | 'system'
  locale?: string
}

export interface SavedLayout {
  id: string
  name: string
  widgets: WidgetConfig[]
  filters: GlobalFilters
  savedAt: string
}

export interface ReportTemplate {
  id: string
  name: string
  description: string
  icon: string
  widgets: Omit<WidgetConfig, 'id'>[]
}

export interface DashboardState {
  // Widgets
  widgets: WidgetConfig[]

  // Conversation
  conversation: ConversationMessage[]
  isProcessing: boolean
  error: string | null

  // Panel
  panelState: PanelState

  // Context
  conversationContext: ConversationContext

  // Clarification
  clarification: ClarificationState

  // Filters
  globalFilters: GlobalFilters

  // Suggestions
  suggestions: QuerySuggestion[]

  // Preferences
  preferences: UserPreferences

  // Templates
  reportTemplates: ReportTemplate[]
}

// ============================================================================
// Action Types
// ============================================================================

export type DashboardAction =
  | { type: 'ADD_WIDGET'; payload: WidgetConfig }
  | { type: 'REMOVE_WIDGET'; payload: string }
  | { type: 'UPDATE_WIDGET'; payload: { id: string; updates: Partial<WidgetConfig> } }
  | { type: 'CLEAR_WIDGETS' }
  | { type: 'SET_WIDGETS'; payload: WidgetConfig[] }
  | { type: 'ADD_MESSAGE'; payload: ConversationMessage }
  | { type: 'SET_PROCESSING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_PANEL_STATE'; payload: PanelState }
  | { type: 'SET_GLOBAL_FILTER'; payload: { key: keyof GlobalFilters; value: unknown } }
  | { type: 'CLEAR_FILTERS' }
  | { type: 'SET_SUGGESTIONS'; payload: QuerySuggestion[] }
  | { type: 'UPDATE_PREFERENCES'; payload: Partial<UserPreferences> }
  | { type: 'UPDATE_CONTEXT'; payload: Partial<ConversationContext> }
  | { type: 'SHOW_CLARIFICATION'; payload: Omit<ClarificationState, 'isOpen'> & { isOpen: true } }
  | { type: 'HIDE_CLARIFICATION' }

// ============================================================================
// Hook Types
// ============================================================================

export interface UseAIQueryOptions {
  onSuccess?: (response: AIResponse) => void
  onError?: (error: Error) => void
  onWidget?: (widget: WidgetConfig) => void
}

export interface UseAIQueryReturn {
  query: (text: string) => Promise<AIResponse | null>
  isProcessing: boolean
  error: Error | null
  lastResponse: AIResponse | null
}

export interface UseWidgetDataOptions<T> {
  enabled?: boolean
  refetchInterval?: number
  staleTime?: number
  onSuccess?: (data: T) => void
  onError?: (error: Error) => void
}

export interface UseWidgetDataReturn<T> {
  data: T | undefined
  isLoading: boolean
  isError: boolean
  error: Error | null
  refetch: () => void
  isFromCache: boolean
}

// ============================================================================
// Component Props Types
// ============================================================================

export interface BaseWidgetProps {
  config: WidgetConfig
  onRemove?: () => void
  onEdit?: () => void
  onRefresh?: () => void
  className?: string
  tabIndex?: number
}

export interface WidgetSkeletonProps {
  type?: WidgetType
  size?: WidgetSize
}

export interface DashboardProviderProps {
  children: React.ReactNode
  initialState?: Partial<DashboardState>
}

export interface AIAssistantPanelProps {
  isOpen?: boolean
  onToggle?: () => void
  className?: string
}

export interface QueryInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: (query: string) => void
  isProcessing?: boolean
  placeholder?: string
  suggestions?: QuerySuggestion[]
}

// ============================================================================
// Utility Types
// ============================================================================

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }

export type WidgetPropsMap = {
  kpi: KPIWidgetData
  bar: ChartWidgetData
  line: ChartWidgetData
  pie: ChartWidgetData
  table: TableWidgetData
  progress: ProgressWidgetData
  status: StatusWidgetData
}

// Widget-specific data types
export interface KPIWidgetData {
  value: number | string
  label: string
  trend?: number
  suffix?: string
  color?: string
}

export interface ChartWidgetData {
  labels: string[]
  datasets: ChartDataset[]
}

export interface ChartDataset {
  label: string
  data: number[]
  color?: string
}

export interface TableWidgetData {
  columns: TableColumn[]
  rows: Record<string, unknown>[]
  totalRows?: number
}

export interface TableColumn {
  key: string
  label: string
  width?: string
  sortable?: boolean
  render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode
}

export interface ProgressWidgetData {
  value: number
  max: number
  label?: string
  color?: string
}

export interface StatusWidgetData {
  items: StatusItem[]
}

export interface StatusItem {
  id: string
  label: string
  status: 'success' | 'warning' | 'error' | 'pending' | 'info'
  description?: string
}

// ============================================================================
// Event Types
// ============================================================================

export interface WidgetEvent {
  widgetId: string
  type: 'click' | 'hover' | 'focus' | 'blur' | 'resize' | 'move'
  timestamp: string
  metadata?: Record<string, unknown>
}

export interface DashboardEvent {
  type: 'query' | 'filter' | 'export' | 'reset' | 'layout_change'
  timestamp: string
  metadata?: Record<string, unknown>
}

// ============================================================================
// API Types
// ============================================================================

export interface APIError {
  code: string
  message: string
  details?: Record<string, unknown>
}

export interface APIResponse<T> {
  success: boolean
  data?: T
  error?: APIError
  meta?: {
    timestamp: string
    requestId: string
  }
}

export interface PaginatedResponse<T> extends APIResponse<T[]> {
  pagination?: {
    page: number
    pageSize: number
    totalItems: number
    totalPages: number
  }
}
