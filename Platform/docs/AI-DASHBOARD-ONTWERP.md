# AI-Dashboard Ontwerp Specificaties

**Datum**: Januari 2026
**Versie**: 1.0
**Gebaseerd op**: UX-Audit Rapport v1.0
**Scope**: AI-gestuurd dynamisch dashboard systeem

---

## 1. Executive Summary

Dit document beschrijft het ontwerp voor een verbeterd AI-Dashboard met:
- **Progressive Disclosure**: 4-level informatiedichtheid systeem
- **Clean Slate Welcome**: Gebruiksvriendelijke start ervaring
- **Enhanced Widget System**: Verbeterde widgets met consistente states
- **Improved AI Integration**: Betere intent mapping en context awareness

### Kernprincipes
1. **Gebruiker niet overweldigen** - Informatie gradueel tonen
2. **AI als gids** - Proactieve suggesties en hulp
3. **Consistentie** - Uniforme patterns en componenten
4. **Toegankelijkheid** - WCAG AA compliant

---

## 2. Architectuur Overview

### 2.1 High-Level Systeem Design

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           DashboardShell                                 │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │                         Header                                     │  │
│  │  [Logo] [Stats Badges] [Filters] [Export] [Settings]              │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│                                                                          │
│  ┌─────────────────────┐  ┌─────────────────────────────────────────┐  │
│  │  AIAssistantPanel   │  │           DashboardCanvas                │  │
│  │  ┌───────────────┐  │  │  ┌─────────────────────────────────┐    │  │
│  │  │  QueryInput   │  │  │  │  Level 0: WelcomePanel           │    │  │
│  │  │  [Ctrl+K]     │  │  │  │  "Wat wil je vandaag weten?"     │    │  │
│  │  ├───────────────┤  │  │  │  [Suggestie] [Suggestie]         │    │  │
│  │  │  Suggestions  │  │  │  └─────────────────────────────────┘    │  │
│  │  │  Quick chips  │  │  │                                          │  │
│  │  ├───────────────┤  │  │  ┌─────────────────────────────────┐    │  │
│  │  │  Conversation │  │  │  │  Level 1-3: WidgetGrid           │    │  │
│  │  │  History      │  │  │  │  ┌───┐ ┌───┐ ┌───┐ ┌───┐        │    │  │
│  │  │  [Message]    │  │  │  │  │KPI│ │KPI│ │KPI│ │KPI│        │    │  │
│  │  │  [Response]   │  │  │  │  └───┘ └───┘ └───┘ └───┘        │    │  │
│  │  │  [Widget]     │  │  │  │  ┌───────────┐ ┌───────────┐    │    │  │
│  │  └───────────────┘  │  │  │  │   Chart   │ │   Chart   │    │    │  │
│  │                     │  │  │  └───────────┘ └───────────┘    │    │  │
│  │  [Panel Toggle]     │  │  │  ┌─────────────────────────┐    │    │  │
│  └─────────────────────┘  │  │  │        Table            │    │    │  │
│                           │  │  └─────────────────────────┘    │    │  │
│                           │  └─────────────────────────────────┘    │  │
│                           └─────────────────────────────────────────┘  │
│                                                                          │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │                      StatusBar (optional)                          │  │
│  │  [Widgets: 5] [Last Update: 2m ago] [AI: Online]                  │  │
│  └───────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Component Hiërarchie

```
App
└── DashboardProvider (Context)
    └── DashboardShell
        ├── DashboardHeader
        │   ├── Logo
        │   ├── StatsBadges
        │   ├── GlobalFilters
        │   └── ActionButtons
        │
        ├── AIAssistantPanel
        │   ├── PanelHeader
        │   ├── QueryInput
        │   ├── SuggestionChips
        │   ├── ConversationHistory
        │   │   ├── MessageBubble (user)
        │   │   ├── ResponseBubble (ai)
        │   │   └── WidgetPreview
        │   └── PanelToggle
        │
        ├── DashboardCanvas
        │   ├── WelcomePanel (level 0)
        │   │   ├── WelcomeMessage
        │   │   ├── RoleSuggestions
        │   │   └── QuickStartTemplates
        │   │
        │   └── WidgetGrid (level 1-3)
        │       ├── BaseWidget
        │       │   ├── WidgetHeader
        │       │   ├── WidgetContent
        │       │   ├── LoadingSkeleton
        │       │   └── EmptyState
        │       │
        │       └── Widget Types
        │           ├── KPICard
        │           ├── BarChartWidget
        │           ├── LineChartWidget
        │           ├── PieChartWidget
        │           ├── DataTableWidget
        │           ├── ProgressWidget
        │           └── StatusListWidget
        │
        ├── ClarificationDialog (modal)
        ├── OnboardingTour (overlay)
        └── KeyboardShortcutsHelp (modal)
```

---

## 3. Progressive Disclosure System

### 3.1 Level Definities

| Level | Naam | Widgets | Trigger | Gebruiker Intent |
|-------|------|---------|---------|------------------|
| 0 | Clean Slate | 0 | Initial load / Reset | "Ik wil beginnen" |
| 1 | Quick Insights | 1-3 KPIs | Eerste query | "Geef me een snel overzicht" |
| 2 | Exploration | 4-6 mixed | Follow-up queries | "Vertel me meer" |
| 3 | Deep Analysis | 7+ widgets | Complexe queries | "Ik wil alles zien" |

### 3.2 Level Transitie Regels

```typescript
interface DisclosureLevelRules {
  // Level 0 → 1: Eerste widget toegevoegd
  toLevel1: {
    condition: 'widgetCount >= 1',
    animation: 'fade-up',
    duration: 300
  };

  // Level 1 → 2: Meer dan 3 widgets OF chart/table toegevoegd
  toLevel2: {
    condition: 'widgetCount > 3 || hasChartOrTable',
    animation: 'expand',
    duration: 400
  };

  // Level 2 → 3: Meer dan 6 widgets OF "toon alles" query
  toLevel3: {
    condition: 'widgetCount > 6 || explicitDeepAnalysis',
    animation: 'expand',
    duration: 500
  };

  // Any → 0: Explicit reset OF clear all
  toLevel0: {
    condition: 'clearWidgets || resetDashboard',
    animation: 'fade-out',
    duration: 300
  };
}
```

### 3.3 Level 0: Clean Slate Design

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                  │
│                    ┌──────────────────────┐                     │
│                    │       🎯 Logo        │                     │
│                    └──────────────────────┘                     │
│                                                                  │
│              Welkom bij het AI Dashboard                         │
│              ─────────────────────────────                       │
│              Stel een vraag over je programma                    │
│                                                                  │
│     ┌─────────────────────────────────────────────────┐         │
│     │  🔍 Stel een vraag...                     [⏎]   │         │
│     └─────────────────────────────────────────────────┘         │
│                                                                  │
│     Probeer bijvoorbeeld:                                        │
│                                                                  │
│     ┌──────────────────┐  ┌──────────────────┐                  │
│     │ 📊 Hoe staat het │  │ 📈 Vergelijk NPS │                  │
│     │    programma?    │  │    per sector    │                  │
│     └──────────────────┘  └──────────────────┘                  │
│                                                                  │
│     ┌──────────────────┐  ┌──────────────────┐                  │
│     │ ⚠️ Toon actieve  │  │ 📋 Overzicht     │                  │
│     │    risico's      │  │    inspanningen  │                  │
│     └──────────────────┘  └──────────────────┘                  │
│                                                                  │
│     ─────────────────────────────────────────────────           │
│                                                                  │
│     Of start met een template:                                   │
│                                                                  │
│     [🎯 Programma Status]  [📊 Sector Analyse]                  │
│     [⚠️ Risico Dashboard]  [📈 Voortgang]                        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 3.4 Level Visuele Transities

```css
/* Level transition animations */
.disclosure-enter {
  opacity: 0;
  transform: translateY(20px);
}

.disclosure-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: all 300ms ease-out;
}

.disclosure-exit {
  opacity: 1;
}

.disclosure-exit-active {
  opacity: 0;
  transition: opacity 200ms ease-in;
}

/* Widget stagger animation */
.widget-stagger {
  animation: fadeUp 300ms ease-out;
  animation-fill-mode: backwards;
}

.widget-stagger:nth-child(1) { animation-delay: 0ms; }
.widget-stagger:nth-child(2) { animation-delay: 50ms; }
.widget-stagger:nth-child(3) { animation-delay: 100ms; }
.widget-stagger:nth-child(4) { animation-delay: 150ms; }
```

---

## 4. State Management Design

### 4.1 Dashboard State Shape

```typescript
interface DashboardState {
  // Core state
  widgets: Widget[];
  conversation: ConversationMessage[];
  isProcessing: boolean;
  error: string | null;

  // Progressive Disclosure
  disclosureLevel: 0 | 1 | 2 | 3;
  isTransitioning: boolean;

  // Panel state
  panelState: 'expanded' | 'collapsed' | 'hidden';

  // Context
  conversationContext: ConversationContext;

  // Clarification
  clarification: ClarificationState | null;

  // Suggestions
  suggestions: Suggestion[];

  // Filters
  globalFilters: GlobalFilters;

  // User preferences (persisted)
  preferences: UserPreferences;

  // Report templates
  reportTemplates: ReportTemplate[];
}

interface UserPreferences {
  savedLayouts: SavedLayout[];
  recentQueries: string[];
  favoriteQueries: string[];
  lastUsedReport: string | null;
  autoLoadLastReport: boolean;
  showWelcome: boolean;
  hasSeenTour: boolean;
  keyboardShortcutsEnabled: boolean;
  defaultDisclosureLevel: 0 | 1 | 2 | 3;  // NEW
  preferredPanelState: 'expanded' | 'collapsed';  // NEW
}
```

### 4.2 Nieuwe Actions

```typescript
// Progressive Disclosure Actions
type DisclosureAction =
  | { type: 'SET_DISCLOSURE_LEVEL'; payload: 0 | 1 | 2 | 3 }
  | { type: 'AUTO_ADVANCE_LEVEL' }
  | { type: 'RESET_TO_CLEAN_SLATE' }
  | { type: 'START_TRANSITION' }
  | { type: 'END_TRANSITION' };

// Store methods
interface DashboardActions {
  // Existing
  addWidget: (widget: Widget) => void;
  removeWidget: (widgetId: string) => void;
  processQuery: (query: string) => Promise<void>;

  // New: Progressive Disclosure
  setDisclosureLevel: (level: 0 | 1 | 2 | 3) => void;
  autoAdvanceLevel: () => void;
  resetToCleanSlate: () => void;

  // New: Enhanced widget management
  reorderWidgets: (startIndex: number, endIndex: number) => void;
  resizeWidget: (widgetId: string, size: WidgetSize) => void;
}
```

### 4.3 Disclosure Level Selectors

```typescript
// selectors.js additions
export const getDisclosureLevel = (state: DashboardState) =>
  state.disclosureLevel;

export const isCleanSlate = (state: DashboardState) =>
  state.disclosureLevel === 0 && state.widgets.length === 0;

export const shouldShowWelcome = (state: DashboardState) =>
  state.disclosureLevel === 0 &&
  state.widgets.length === 0 &&
  state.preferences.showWelcome;

export const getVisibleWidgetCount = (state: DashboardState) => {
  switch (state.disclosureLevel) {
    case 0: return 0;
    case 1: return Math.min(state.widgets.length, 3);
    case 2: return Math.min(state.widgets.length, 6);
    case 3: return state.widgets.length;
  }
};

export const getWidgetsForCurrentLevel = (state: DashboardState) =>
  state.widgets.slice(0, getVisibleWidgetCount(state));
```

---

## 5. Widget Systeem Specificaties

### 5.1 Widget Types

| Type | Gebruik | Min Size | Max Size | Data Type |
|------|---------|----------|----------|-----------|
| `kpi` | Single metric | sm | md | number + trend |
| `bar` | Vergelijkingen | md | xl | array<{label, value}> |
| `line` | Trends | md | xl | array<{x, y}> |
| `pie` | Verdelingen | md | lg | array<{label, value}> |
| `table` | Detail data | md | xl | array<object> |
| `progress` | Voortgang | sm | md | percentage |
| `status` | Status lijst | sm | lg | array<{item, status}> |
| `sparkline` | Inline trend | sm | sm | array<number> |
| `gauge` | Percentage | sm | md | percentage |

### 5.2 Widget Configuration Schema

```typescript
interface WidgetConfig {
  id: string;
  type: WidgetType;
  title: string;
  size: WidgetSize;

  dataSource: {
    entity: EntityType;
    metric?: MetricType;
    groupBy?: GroupByType;
    filters?: FilterConfig;
    sort?: SortConfig;
  };

  display: {
    showHeader: boolean;
    showLegend: boolean;
    showTooltips: boolean;
    colorScheme?: string;
  };

  state: {
    isLoading: boolean;
    isError: boolean;
    errorMessage?: string;
    lastUpdated?: Date;
  };

  position?: {
    row: number;
    column: number;
  };
}
```

### 5.3 Widget Size Specifications

```typescript
const WIDGET_SIZES = {
  sm: {
    columns: 1,
    minHeight: 120,
    maxHeight: 160,
    padding: 12
  },
  md: {
    columns: 1,
    minHeight: 180,
    maxHeight: 240,
    padding: 16
  },
  lg: {
    columns: 2,
    minHeight: 240,
    maxHeight: 320,
    padding: 20
  },
  xl: {
    columns: 2,
    minHeight: 320,
    maxHeight: 480,
    padding: 24
  }
};
```

### 5.4 Widget State Machine

```
                    ┌─────────────┐
                    │   IDLE      │
                    └──────┬──────┘
                           │ fetch()
                           ▼
                    ┌─────────────┐
         ┌─────────│  LOADING    │─────────┐
         │         └─────────────┘         │
         │ error                   success │
         ▼                                 ▼
  ┌─────────────┐                   ┌─────────────┐
  │   ERROR     │                   │   READY     │
  └──────┬──────┘                   └──────┬──────┘
         │ retry()                         │ refresh()
         └────────────────┬────────────────┘
                          ▼
                   ┌─────────────┐
                   │  LOADING    │
                   └─────────────┘
```

---

## 6. AI Integration Verbetering

### 6.1 Enhanced Intent Mapper

```typescript
// Nieuwe synonym dictionary
const SYNONYMS = {
  // Entities
  baten: ['opbrengsten', 'resultaten', 'outcomes', 'voordelen'],
  inspanningen: ['projecten', 'activiteiten', 'werk', 'taken'],
  vermogens: ['capabilities', 'competenties', 'vaardigheden'],
  risicos: ['risico\'s', 'gevaren', 'bedreigingen', 'problemen'],
  doelen: ['objectives', 'targets', 'ambities', 'streefdoelen'],

  // Metrics
  nps: ['tevredenheid', 'score', 'waardering'],
  voortgang: ['progress', 'status', 'stand'],

  // Actions
  vergelijk: ['compare', 'versus', 'tegenover'],
  toon: ['laat zien', 'geef', 'presenteer', 'show'],
  hoeveel: ['aantal', 'count', 'totaal'],

  // Time
  trend: ['verloop', 'ontwikkeling', 'over tijd'],

  // Grouping
  sector: ['doelgroep', 'segment', 'markt'],
  domein: ['gebied', 'categorie', 'type']
};

// Fuzzy matching function
function fuzzyMatch(input: string, target: string): number {
  // Levenshtein distance based matching
  // Returns confidence score 0-1
}

// Enhanced analysis
interface EnhancedQueryAnalysis {
  query: string;
  normalizedQuery: string;  // Synonyms replaced

  primaryIntent: {
    type: IntentType;
    confidence: number;
    matchedPatterns: string[];
  };

  entities: {
    type: EntityType;
    confidence: number;
    originalTerm: string;
    normalizedTerm: string;
  }[];

  suggestedWidgets: WidgetConfig[];

  clarificationNeeded: boolean;
  clarificationReason?: 'low_confidence' | 'multiple_intents' | 'missing_entity';

  contextUsed: boolean;
  followUpType?: 'refinement' | 'drill_down' | 'comparison';
}
```

### 6.2 Query Processing Pipeline

```
User Query
    │
    ▼
┌─────────────────────┐
│ 1. Preprocessing    │
│   - Lowercase       │
│   - Trim            │
│   - Normalize       │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ 2. Synonym Replace  │
│   - Dictionary      │
│   - Fuzzy match     │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ 3. Intent Detection │
│   - Pattern match   │
│   - Confidence calc │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ 4. Entity Extract   │
│   - Named entities  │
│   - Context merge   │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ 5. Clarification?   │◄──── confidence < 0.7?
│   - Generate dialog │       multiple intents?
└─────────┬───────────┘       missing entity?
          │
          ▼
┌─────────────────────┐
│ 6. Widget Config    │
│   - Select type     │
│   - Build config    │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ 7. Response Build   │
│   - Message         │
│   - Widget          │
│   - Suggestions     │
└─────────────────────┘
```

### 6.3 Context Management

```typescript
interface ConversationContext {
  // Last query info
  lastQuery: string;
  lastQueryTime: Date;

  // Extracted entities (for follow-ups)
  lastEntities: EntityType[];
  lastMetrics: MetricType[];
  lastFilters: FilterConfig;
  lastWidgetType: WidgetType;

  // Session tracking
  queriesThisSession: number;
  widgetsAddedThisSession: number;

  // Entity relationships discovered
  entityRelations: Map<EntityType, EntityType[]>;

  // User patterns
  frequentEntities: EntityType[];
  preferredWidgetTypes: WidgetType[];
}

// Context update on each query
function updateContext(
  currentContext: ConversationContext,
  analysis: QueryAnalysis,
  widget: WidgetConfig
): ConversationContext {
  return {
    ...currentContext,
    lastQuery: analysis.query,
    lastQueryTime: new Date(),
    lastEntities: analysis.entities.map(e => e.type),
    lastMetrics: analysis.metrics,
    lastWidgetType: widget.type,
    queriesThisSession: currentContext.queriesThisSession + 1,
    widgetsAddedThisSession: currentContext.widgetsAddedThisSession + 1
  };
}
```

---

## 7. Conversational UX Design

### 7.1 AI Response Types

| Response Type | When | Contains | Example |
|---------------|------|----------|---------|
| **Direct Answer** | Simple fact query | Text only | "Er zijn 5 actieve baten" |
| **Widget + Message** | Data query | Widget + explanation | Chart + "Hier is de vergelijking" |
| **Clarification** | Ambiguous query | Options dialog | "Bedoel je X of Y?" |
| **Proactive Insight** | Interesting pattern | Text + optional widget | "Ik zie dat risico X..." |
| **Help** | Unknown query | Suggestions | "Probeer deze vragen..." |

### 7.2 Suggested Queries per Context

```typescript
const ROLE_BASED_SUGGESTIONS = {
  programmamanager: [
    "Hoe staat het programma ervoor?",
    "Wat zijn de belangrijkste risico's?",
    "Vergelijk voortgang per sector",
    "Toon Go/No-Go gereedheid"
  ],
  sectormanager: [
    "Hoe staat mijn sector ervoor?",
    "Welke inspanningen lopen?",
    "Toon baten voor mijn sector",
    "Vergelijk met andere sectoren"
  ],
  sponsor: [
    "Executive summary",
    "Top 5 risico's",
    "Strategische voortgang",
    "Budget vs realisatie"
  ]
};

const CONTEXT_BASED_SUGGESTIONS = {
  afterKPI: [
    "Toon meer details",
    "Vergelijk per sector",
    "Bekijk trend over tijd"
  ],
  afterChart: [
    "Drill down naar details",
    "Filter op specifieke waarde",
    "Exporteer naar rapport"
  ],
  afterTable: [
    "Sorteer op andere kolom",
    "Filter specifieke status",
    "Toon als grafiek"
  ]
};
```

### 7.3 Follow-up Patterns

```typescript
// Pronoun resolution
const FOLLOW_UP_PATTERNS = [
  { pattern: /meer (over|van|details)/i, type: 'detail' },
  { pattern: /vergelijk (dit|deze|het)/i, type: 'comparison' },
  { pattern: /per (sector|domein|type)/i, type: 'breakdown' },
  { pattern: /trend|verloop|over tijd/i, type: 'trend' },
  { pattern: /filter|alleen|specifiek/i, type: 'filter' }
];

// Example: "Vergelijk dit per sector"
// - "dit" → resolves to lastEntities (e.g., baten)
// - "per sector" → groupBy: 'sector'
// - Result: BarChart of baten grouped by sector
```

---

## 8. Component Specificaties

### 8.1 WelcomePanel Component

```typescript
interface WelcomePanelProps {
  userName?: string;
  role?: UserRole;
  suggestions: string[];
  templates: ReportTemplate[];
  recentQueries: string[];
  onQuerySelect: (query: string) => void;
  onTemplateSelect: (templateId: string) => void;
}

// Render structure
<WelcomePanel>
  <WelcomeHeader>
    <Logo />
    <Title>Welkom bij het AI Dashboard</Title>
    <Subtitle>Stel een vraag over je programma</Subtitle>
  </WelcomeHeader>

  <QueryInputHighlight>
    <QueryInput autoFocus placeholder="Stel een vraag..." />
  </QueryInputHighlight>

  <SuggestionSection>
    <SectionTitle>Probeer bijvoorbeeld:</SectionTitle>
    <SuggestionGrid>
      {suggestions.map(s => <SuggestionCard key={s} query={s} />)}
    </SuggestionGrid>
  </SuggestionSection>

  <Divider />

  <TemplateSection>
    <SectionTitle>Of start met een template:</SectionTitle>
    <TemplateButtons>
      {templates.map(t => <TemplateButton key={t.id} template={t} />)}
    </TemplateButtons>
  </TemplateSection>

  {recentQueries.length > 0 && (
    <RecentSection>
      <SectionTitle>Recent:</SectionTitle>
      <RecentList>
        {recentQueries.slice(0, 3).map(q => <RecentQuery key={q} query={q} />)}
      </RecentList>
    </RecentSection>
  )}
</WelcomePanel>
```

### 8.2 LoadingSkeleton Component

```typescript
interface LoadingSkeletonProps {
  variant: 'kpi' | 'chart' | 'table' | 'text' | 'avatar';
  lines?: number;  // For text variant
  width?: string | number;
  height?: string | number;
  className?: string;
}

// Variants
const SKELETON_VARIANTS = {
  kpi: {
    structure: (
      <>
        <SkeletonCircle size={48} />
        <SkeletonLine width="60%" height={24} />
        <SkeletonLine width="40%" height={16} />
      </>
    )
  },
  chart: {
    structure: (
      <>
        <SkeletonRect width="100%" height={200} />
        <SkeletonLine width="80%" height={12} />
      </>
    )
  },
  table: {
    structure: (
      <>
        <SkeletonLine width="100%" height={40} /> {/* Header */}
        {[...Array(5)].map((_, i) => (
          <SkeletonLine key={i} width="100%" height={32} />
        ))}
      </>
    )
  }
};
```

### 8.3 EmptyState Component

```typescript
interface EmptyStateProps {
  icon: 'search' | 'chart' | 'table' | 'error' | 'filter';
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Usage
<EmptyState
  icon="chart"
  title="Geen data beschikbaar"
  description="Er zijn geen resultaten voor de huidige filters"
  action={{
    label: "Reset filters",
    onClick: () => clearFilters()
  }}
/>
```

---

## 9. Data Flow Diagram

### 9.1 Query to Widget Flow

```
┌──────────────┐
│  User types  │
│   query      │
└──────┬───────┘
       │
       ▼
┌──────────────────────────────────────────────────────────┐
│                    QueryInput Component                   │
│  - Validates input                                        │
│  - Checks for empty/too short                            │
│  - Triggers onSubmit                                      │
└──────────────────────────┬───────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────┐
│                  dashboardStore.processQuery()            │
│  1. setProcessing(true)                                   │
│  2. addMessage({ role: 'user', content: query })         │
└──────────────────────────┬───────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────┐
│                    intentMapper.analyzeQuery()            │
│  1. Preprocess query                                      │
│  2. Replace synonyms                                      │
│  3. Detect intents (regex patterns)                       │
│  4. Extract entities                                      │
│  5. Check context for follow-ups                          │
│  6. Calculate confidence                                  │
└──────────────────────────┬───────────────────────────────┘
                           │
              ┌────────────┴────────────┐
              │                         │
              ▼                         ▼
    confidence >= 0.7           confidence < 0.7
              │                         │
              ▼                         ▼
┌─────────────────────┐    ┌─────────────────────┐
│ generateWidgetConfig │    │ generateClarification│
│ - Select widget type │    │ - Build options      │
│ - Build dataSource   │    │ - Return dialog      │
│ - Set title/size     │    └──────────┬──────────┘
└──────────┬──────────┘               │
           │                          ▼
           │               ┌─────────────────────┐
           │               │ Show Clarification  │
           │               │ Dialog to User      │
           │               └──────────┬──────────┘
           │                          │ user selects
           │                          ▼
           │               ┌─────────────────────┐
           │               │ Process selected    │
           │               │ option              │
           │               └──────────┬──────────┘
           │                          │
           └──────────┬───────────────┘
                      │
                      ▼
┌──────────────────────────────────────────────────────────┐
│                    addWidget(widgetConfig)                │
│  1. Generate unique ID                                    │
│  2. Add to widgets array                                  │
│  3. Auto-advance disclosure level                         │
└──────────────────────────┬───────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────┐
│                    updateContext()                        │
│  - Store last entities, metrics, widget type             │
│  - Generate follow-up suggestions                         │
└──────────────────────────┬───────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────┐
│                    addMessage() + setProcessing(false)    │
│  - Add AI response message                                │
│  - Reference widget in message                            │
└──────────────────────────┬───────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────┐
│                    React Re-render                        │
│  - WidgetGrid receives new widget                         │
│  - Widget component fetches data via useWidgetData        │
│  - Shows loading → ready with animation                   │
└──────────────────────────────────────────────────────────┘
```

---

## 10. Performance Strategie

### 10.1 Loading Strategy

| Resource | Strategy | Trigger |
|----------|----------|---------|
| Dashboard Shell | Eager | Route load |
| AI Panel | Eager | Route load |
| Widgets (code) | Lazy | First query |
| Widget data | On-demand | Widget mount |
| Suggestions | Prefetch | After first widget |

### 10.2 Caching Strategy

```typescript
interface CacheConfig {
  // Widget data cache
  widgetData: {
    ttl: 60_000,         // 60 seconds
    maxEntries: 50,
    strategy: 'lru'
  };

  // Query results cache
  queryResults: {
    ttl: 300_000,        // 5 minutes
    maxEntries: 20,
    strategy: 'lru'
  };

  // User preferences
  preferences: {
    ttl: Infinity,
    storage: 'localStorage'
  };
}
```

### 10.3 Bundle Splitting

```javascript
// Recommended code splits
const splits = {
  // Vendor chunks
  'vendor-react': ['react', 'react-dom', 'react-router-dom'],
  'vendor-charts': ['recharts'],
  'vendor-state': ['zustand'],

  // Feature chunks
  'feature-ai': [
    './services/aiService',
    './services/intentMapper'
  ],
  'feature-widgets': [
    './components/ai-dashboard/widgets/*'
  ],

  // Route chunks
  'route-dashboard': ['./pages/AIDashboard'],
  'route-din': [
    './pages/Baten',
    './pages/Vermogens',
    './pages/Inspanningen'
  ]
};
```

---

## 11. Implementatie Roadmap

### Phase 1: Foundation (Week 1)
- [ ] Design token consolidatie
- [ ] LoadingSkeleton component
- [ ] EmptyState component
- [ ] Focus visible styles

### Phase 2: Progressive Disclosure (Week 1-2)
- [ ] Disclosure level state
- [ ] WelcomePanel component
- [ ] Level transition animations
- [ ] Auto-advance logic

### Phase 3: Widget Enhancements (Week 2)
- [ ] KPICard value animation
- [ ] Chart tooltip improvements
- [ ] Table loading states
- [ ] Consistent error handling

### Phase 4: AI Improvements (Week 3)
- [ ] Synonym dictionary
- [ ] Fuzzy matching
- [ ] Enhanced context management
- [ ] Better follow-up detection

### Phase 5: Polish (Week 3-4)
- [ ] Accessibility fixes
- [ ] Performance optimization
- [ ] Testing
- [ ] Documentation

---

## 12. Success Metrics

| Metric | Current | Target | Measurement |
|--------|---------|--------|-------------|
| Widgets at first load | 8+ | 0 | Count on load |
| Time to first insight | ~5s | ~2s | User testing |
| Clarification rate | ~30% | <15% | Analytics |
| User control score | 5/10 | 8/10 | Survey |
| FCP | ~2s | <1.5s | Lighthouse |
| Bundle size | ~250KB | <150KB | Build output |

---

## Bijlage: File Structure

```
Platform/src/
├── components/
│   ├── ai-dashboard/
│   │   ├── widgets/
│   │   │   ├── BaseWidget.jsx
│   │   │   ├── KPICard.jsx
│   │   │   ├── BarChartWidget.jsx
│   │   │   ├── LineChartWidget.jsx
│   │   │   ├── DataTableWidget.jsx
│   │   │   └── index.js
│   │   ├── WelcomePanel.jsx      ← NEW
│   │   ├── ClarificationDialog.jsx
│   │   ├── OnboardingTour.jsx
│   │   └── DashboardProvider.jsx
│   └── ui/
│       ├── LoadingSkeleton.jsx   ← NEW
│       ├── EmptyState.jsx        ← NEW
│       └── Tooltip.jsx
├── pages/
│   └── AIDashboard.jsx           ← MODIFY
├── stores/
│   ├── dashboardStore.js         ← MODIFY
│   └── selectors.js              ← MODIFY
├── services/
│   ├── aiService.js
│   └── intentMapper.js           ← MODIFY
├── hooks/
│   ├── useAIQuery.js
│   └── useResponsive.js
├── config/
│   └── designTokens.js           ← MODIFY
└── docs/
    ├── UX-AUDIT-RAPPORT.md
    └── AI-DASHBOARD-ONTWERP.md
```
