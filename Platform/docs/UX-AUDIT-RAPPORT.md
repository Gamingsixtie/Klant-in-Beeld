# UX-Audit Rapport: Klant in Beeld AI Dashboard

**Datum**: Januari 2026
**Versie**: 1.0
**Auteur**: UX/Frontend Architect
**Scope**: AI Dashboard, DIN Keten pagina's, Navigatie

---

## Executive Summary

### Top 5 Bevindingen

| # | Bevinding | Impact | Urgentie |
|---|-----------|--------|----------|
| 1 | **Uitstekende visuele hiërarchie** - Premium gradient design met corporate blue (#003366) is consistent en professioneel | Positief | - |
| 2 | **Cognitive overload bij eerste load** - Alle widgets laden tegelijk zonder progressive disclosure | Hoog | Kritiek |
| 3 | **Widget systeem is solide** maar mist drag-and-drop en resize functionaliteit | Medium | Hoog |
| 4 | **Intent mapping is regex-based** - beperkt tot voorgedefinieerde patronen, geen echte NLP | Medium | Medium |
| 5 | **Inconsistente empty/loading states** tussen widgets | Medium | Hoog |

### Sterke Punten
- Premium visuele design met gradients en glassmorphism effecten
- Responsive layout met goede breakpoint keuzes (xs/sm/md/lg/xl)
- Keyboard shortcuts (Ctrl+K, Ctrl+/) voor power users
- Onboarding tour voor nieuwe gebruikers
- WCAG AA accessibility foundations aanwezig
- Context-aware AI suggestions met follow-up support

### Aanbevolen Acties
1. Implementeer progressive disclosure met 4 levels
2. Voeg clean slate welcome state toe
3. Standaardiseer loading/empty states
4. Implementeer widget drag-and-drop
5. Verbeter intent mapping met synonymen en fuzzy matching

---

## 1. Eerste Indruk Analyse (5-seconden test)

### Scores

| Aspect | Score | Toelichting |
|--------|-------|-------------|
| **Hoofddoel duidelijk** | 8/10 | KPI cards tonen direct de belangrijkste metrics (Go/No-Go, Baten, Inspanningen, Risico's) |
| **Visuele hiërarchie** | 9/10 | Gradient header met stats, duidelijke secties, premium feel |
| **Cognitieve belasting** | 6/10 | Veel informatie tegelijk (4 KPIs + 2 charts + 2 tables + AI panel) |
| **Call-to-action** | 7/10 | AI input field en suggestions zijn zichtbaar maar competeren met widgets |

### Observaties per Screenshot

#### AI Dashboard
- 4 KPI cards in gradient kleuren (groen/blauw/oranje/rood)
- 2 bar charts (NPS per Sector, Dekking per Domein)
- 1 line chart (Programma Voortgang)
- 2 data tables (Lopende Inspanningen, Risico's)
- AI Assistant panel rechts met conversation history
- **Probleem**: Alles laadt tegelijk - geen progressive disclosure

#### Visie & Strategische Doelen
- Premium gradient header met 5 stats
- Circulaire progress indicators per doel (38%, 50%, 100%, 81%)
- Goede visuele differentiatie met status badges (Actief/Hoog/Midden)
- DIN Keten banner onderaan met doorlink
- **Sterk**: Visueel aantrekkelijk en informatief

#### Methodologie/Sectoren
- Complexe maar goed gestructureerde layout
- 5 Stuurparameters als interactieve cards
- Levensloopcycli visualisatie (1-2-3-4)
- 8 Thema's in grid layout
- Sidebar met volledige navigatie
- **Sterk**: Veel informatie maar goed georganiseerd

#### Vermogens
- 6 vermogen cards in 2-kolom grid
- Circulaire progress per vermogen
- Domein/Type filter chips bovenaan
- Gekoppelde doelen en inspanningen zichtbaar per card
- **Sterk**: Consistente card layout met goede informatie density

---

## 2. Informatiearchitectuur Beoordeling

### Logische Groepering

#### Navigatie Structuur (Sidebar)
```
UITVOEREN
├── Introductie
├── Programmaverloop (Methodologie)
├── Programma vs Lijn
└── Governance

SECTOREN
├── PO (Primair onderwijs)
├── VO (Voortgezet onderwijs)
└── ZAK (Professionals/Zakelijk)

DIN KETEN
├── DIN Overzicht
├── Visie & Doelen
├── Baten
├── Vermogens
└── Inspanningen

TOOLS
├── AI Dashboard
├── Roadmap
├── Templates
└── Sessies
```

#### Sterke Punten
- DIN Keten flow (Visie → Baten → Vermogens → Inspanningen) is logisch en consistent
- Sectoren navigatie biedt snelle toegang per doelgroep
- Tools sectie groepeert hulpmiddelen effectief

#### Verbeterpunten
| Issue | Impact | Aanbeveling |
|-------|--------|-------------|
| Thema's niet in sidebar | Gebruikers moeten via Methodologie | Voeg directe thema links toe |
| Dashboard vs AIDashboard | Verwarrende naamgeving in code | Consolideer naar één implementatie |
| DIN flow niet visueel | Relaties niet direct zichtbaar | Voeg mini flow diagram toe in sidebar |

---

## 3. Component Analyse

### Widget Inventaris

| Component | Locatie | Status | Herbruikbaar | Verbeterpunt |
|-----------|---------|--------|--------------|--------------|
| **KPICard** | `widgets/KPICard.jsx` | Excellent | Ja | Value change animation |
| **BarChartWidget** | `widgets/BarChartWidget.jsx` | Goed | Ja | Click-through drill-down |
| **LineChartWidget** | `widgets/LineChartWidget.jsx` | Goed | Ja | Zoom/pan functionaliteit |
| **DataTableWidget** | `widgets/DataTableWidget.jsx` | Goed | Ja | Inline editing, betere pagination |
| **BaseWidget** | `widgets/BaseWidget.jsx` | Excellent | Ja | - (solide basis) |
| **ClarificationDialog** | `ClarificationDialog.jsx` | Goed | Ja | Keyboard navigation verbeteren |
| **OnboardingTour** | `OnboardingTour.jsx` | Goed | Ja | Skip confirmation |

### Component Compositie

```
AIDashboard
├── Header (gradient, stats badges)
├── AIAssistantPanel
│   ├── QueryInput
│   ├── SuggestionChips
│   └── ConversationHistory
├── FilterBar
├── WidgetCanvas
│   └── [Dynamic Widget Grid]
│       ├── KPICard (x4)
│       ├── BarChartWidget (x2)
│       ├── LineChartWidget (x1)
│       └── DataTableWidget (x2)
├── ClarificationDialog (modal)
└── OnboardingTour (overlay)
```

### Inconsistenties Geïdentificeerd

| Inconsistentie | Waar | Impact |
|----------------|------|--------|
| Empty state icons | Variëren per widget | Visuele inconsistentie |
| Loading skeletons | Verschillende hoogtes/styles | UX inconsistentie |
| Error states | Verschillende kleuren/layouts | Gebruiker verwarring |
| Button styles | Soms outline, soms filled | Design system gap |

---

## 4. Visuele Hiërarchie & Design System

### Design Tokens Analyse

**Locatie**: `Platform/src/config/designTokens.js`

#### Kleuren (colors)
```javascript
brand: {
  primary: '#003366',    // Corporate blue - consistent gebruikt
  secondary: '#0066CC',
  accent: '#00A3E0'
}

semantic: {
  success: '#10B981',    // Emerald
  warning: '#F59E0B',    // Amber
  error: '#EF4444',      // Rose
  info: '#3B82F6'        // Blue
}
```

#### Typography
- Font family: System fonts (goed voor performance)
- Font sizes: 12-48px scale
- Font weights: 400/500/600/700

#### Spacing
- 0-24 scale (0, 1, 2, 4, 6, 8, 12, 16, 20, 24)
- Correct toegepast in Tailwind classes

### Afwijkingen van Design System

| Afwijking | Locatie | Fix |
|-----------|---------|-----|
| Hardcoded `#003366` | Meerdere componenten | Gebruik `colors.brand.primary` |
| Duplicate gradient defs | KPICard, Header | Centraliseer in designTokens |
| Inconsistente shadows | Widget vs Card | Standaardiseer shadow tokens |
| Mixed spacing units | px en rem gemixed | Kies één systeem |

---

## 5. Interactie & Feedback Patterns

### Huidige Implementatie

#### Goed Geïmplementeerd
| Pattern | Implementatie | Locatie |
|---------|---------------|---------|
| Loading states | Skeleton screens | BaseWidget.jsx |
| Hover states | Opacity/scale transforms | Alle widgets |
| Typing indicator | Animated dots | AIAssistantPanel |
| Toast notifications | Success/error feedback | Via store |
| Keyboard shortcuts | Ctrl+K, Ctrl+/, Esc | useKeyboardShortcuts.js |

#### Ontbrekend/Verbeterpunten

| Pattern | Status | Impact | Aanbeveling |
|---------|--------|--------|-------------|
| **Optimistic UI** | Ontbreekt | Hoog | Toon widget placeholder direct |
| **Progress indicators** | Beperkt | Medium | Voeg progress bar toe voor lange queries |
| **Error recovery** | Basic | Hoog | Automatische retry met exponential backoff |
| **Undo/Redo** | Ontbreekt | Medium | Implementeer voor widget acties |
| **Touch gestures** | Ontbreekt | Medium | Swipe voor panel toggle op mobile |

### Feedback Timing

| Actie | Huidige Feedback | Ideale Feedback |
|-------|------------------|-----------------|
| Query submit | Processing indicator | + Estimated time |
| Widget add | Fade in | + Success toast |
| Widget remove | Instant remove | + Undo optie |
| Error | Error message | + Retry button + Help link |

---

## 6. Data Visualisatie Review

### Chart Type Analyse

| Data Type | Huidig Chart | Geschikt? | Aanbeveling |
|-----------|--------------|-----------|-------------|
| Single metric | KPI Card | Ja | Voeg sparkline toe |
| Vergelijking per categorie | Bar Chart | Ja | Click-through naar detail |
| Trend over tijd | Line Chart | Ja | Zoom/pan toevoegen |
| Detail data | Table | Ja | Betere filtering |
| Verdeling | Pie Chart | Niet gebruikt | Toevoegen als widget type |

### Chart Interactie

#### Huidige State
- Tooltips: Basic (value only)
- Click: Geen actie
- Hover: Highlight bar/point
- Legend: Statisch

#### Verbeteringen

| Verbetering | Impact | Prioriteit |
|-------------|--------|------------|
| Rijke tooltips (label + value + % of total) | Hoog | Hoog |
| Click-through naar gefilterde view | Hoog | Medium |
| Cross-filtering tussen charts | Medium | Laag |
| Export per chart (PNG/CSV) | Medium | Medium |

### Data-Ink Ratio

| Element | Status | Verbetering |
|---------|--------|-------------|
| Grid lines | Te prominent | Lighten of verwijderen |
| Axis labels | Goed | - |
| Legend | Neemt ruimte | Move to tooltip |
| Chart borders | Onnodige box | Verwijderen |

---

## 7. Responsiveness & Viewport

### Breakpoint Implementatie

| Breakpoint | Pixels | Kolommen | Panel State | Status |
|------------|--------|----------|-------------|--------|
| xs | < 640px | 1 | Hidden | OK |
| sm | 640-768px | 2 | Hidden | OK |
| md | 768-1024px | 2-3 | Collapsed | OK |
| lg | 1024-1280px | 3-4 | Expanded | OK |
| xl | > 1280px | 4 | Expanded | OK |

### Issues

| Issue | Viewport | Impact | Fix |
|-------|----------|--------|-----|
| Panel neemt veel ruimte | Tablet landscape | Hoog | Smaller collapsed state |
| Widgets niet resizable | Alle | Medium | Per-widget size control |
| Touch targets te klein | Mobile | Hoog | Min 44x44px |
| Horizontal scroll | xs op sommige charts | Medium | Responsive chart sizing |

### Aanbevelingen

1. **Tablet Optimalisatie**
   - Panel collapsed default op md
   - 2-column widget grid
   - Larger touch targets

2. **Mobile Optimalisatie**
   - Single column widgets
   - Swipe gestures voor panel
   - Bottom sheet voor AI input

---

## 8. Toegankelijkheid (A11y) Scan

### WCAG 2.1 AA Compliance

#### Geïmplementeerd (Goed)

| Criterium | Implementatie | Locatie |
|-----------|---------------|---------|
| 2.1.1 Keyboard | Keyboard shortcuts hook | useKeyboardShortcuts.js |
| 2.4.3 Focus Order | Tab order correct | Componenten |
| 4.1.2 Name, Role, Value | ARIA labels | BaseWidget.jsx |
| 1.4.3 Contrast (minimum) | Meestal OK | - |

#### Hooks Beschikbaar

| Hook | Functie | Status |
|------|---------|--------|
| useFocusTrap | Modal focus containment | Geïmplementeerd |
| useFocusReturn | Focus restoration | Geïmplementeerd |
| useAnnouncer | Screen reader announcements | Geïmplementeerd |
| useRovingTabindex | List navigation | Geïmplementeerd |

#### Verbeterpunten

| Issue | WCAG Criterium | Impact | Fix |
|-------|----------------|--------|-----|
| Light text op gradient | 1.4.3 Contrast | Hoog | Donkere overlay of text shadow |
| Focus visible inconsistent | 2.4.7 Focus Visible | Medium | Standaard focus ring style |
| Skip links ontbreken | 2.4.1 Bypass Blocks | Medium | Voeg skip to main content toe |
| Live regions incomplete | 4.1.3 Status Messages | Medium | aria-live voor widget updates |
| Chart niet accessible | 1.1.1 Non-text Content | Hoog | Voeg data table fallback toe |

### Aanbevolen Fixes

```jsx
// Focus visible style (toe te voegen aan Tailwind config)
'.focus-visible': {
  outline: '2px solid #0066CC',
  outlineOffset: '2px'
}

// Skip link component
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>

// Chart accessibility
<figure role="img" aria-label="Bar chart showing NPS per sector">
  <BarChart ... />
  <details>
    <summary>View data as table</summary>
    <table>...</table>
  </details>
</figure>
```

---

## 9. Performance UX

### Huidige Metingen (Geschat)

| Metric | Waarde | Target | Status |
|--------|--------|--------|--------|
| First Contentful Paint | ~2s | < 1.5s | Verbeteren |
| Time to Interactive | ~3s | < 2.5s | Verbeteren |
| Bundle Size | ~250KB | < 150KB | Verbeteren |

### Performance Patterns

#### Geïmplementeerd
| Pattern | Implementatie | Effectiviteit |
|---------|---------------|---------------|
| Virtual scrolling | DataTableWidget | Goed |
| Zustand (lightweight) | State management | Excellent |
| TTL Caching | dataCache.js (60s) | Goed |

#### Ontbrekend
| Pattern | Impact | Prioriteit |
|---------|--------|------------|
| Code splitting | Bundle size -50% | Hoog |
| Widget lazy loading | FCP verbetering | Hoog |
| Image optimization | LCP verbetering | Medium |
| Prefetching | Navigation snelheid | Medium |

### Bundle Analyse Aanbevelingen

```javascript
// vite.config.js toevoegingen
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-charts': ['recharts'],
          'widgets': [
            './src/components/ai-dashboard/widgets/KPICard.jsx',
            './src/components/ai-dashboard/widgets/BarChartWidget.jsx',
            // etc.
          ]
        }
      }
    }
  }
})
```

---

## 10. Heuristische Evaluatie (Nielsen's 10)

### Scores per Heuristiek

| # | Heuristiek | Score | Bevindingen |
|---|------------|-------|-------------|
| 1 | **Zichtbaarheid systeemstatus** | 7/10 | Processing indicator aanwezig, maar geen progress percentage |
| 2 | **Match systeem/wereld** | 9/10 | Nederlandse termen, domein-specifieke taal (DIN, Baten, Vermogens) |
| 3 | **Gebruikerscontrole en vrijheid** | 6/10 | Geen undo, beperkte widget manipulatie, wel clear buttons |
| 4 | **Consistentie en standaarden** | 8/10 | Goede basis, kleine afwijkingen in buttons/states |
| 5 | **Foutpreventie** | 6/10 | Clarification dialog helpt, maar geen input validatie hints |
| 6 | **Herkenning boven herinnering** | 8/10 | Suggestions zichtbaar, templates beschikbaar, shortcuts niet |
| 7 | **Flexibiliteit en efficiëntie** | 5/10 | Geen drag-drop, geen custom layouts, wel keyboard shortcuts |
| 8 | **Esthetisch en minimalistisch design** | 9/10 | Premium look, maar te veel info bij first load |
| 9 | **Help gebruikers fouten herkennen** | 6/10 | Basic error messages, geen recovery suggesties |
| 10 | **Help en documentatie** | 7/10 | Onboarding tour aanwezig, shortcuts help beschikbaar |

### Totaalscore: 7.1/10

### Detailbevindingen per Heuristiek

#### H1: Zichtbaarheid Systeemstatus
- **Goed**: Processing indicator, widget count badges, online status
- **Verbeteren**: Progress percentage, estimated time, background task status

#### H3: Gebruikerscontrole
- **Goed**: Clear widgets, remove widget, reset dashboard
- **Verbeteren**: Undo laatste actie, widget reorder, custom layouts

#### H7: Flexibiliteit
- **Goed**: Keyboard shortcuts, report templates, AI queries
- **Verbeteren**: Drag-drop widgets, resizable widgets, saved layouts

---

## 11. Prioriteitenmatrix

### Impact vs Inspanning Matrix

```
                    HOOG IMPACT
                         │
    ┌────────────────────┼────────────────────┐
    │                    │                    │
    │  Progressive       │  Drag-and-drop    │
    │  Disclosure        │  Widgets          │
    │                    │                    │
    │  Loading States    │  Real LLM         │
    │  Consistency       │  Integration      │
    │                    │                    │
LAGE├────────────────────┼────────────────────┤HOGE
INSP│                    │                    │INSP
    │  Focus Visible     │  Real-time        │
    │  Styles            │  Collaboration    │
    │                    │                    │
    │  Design Token      │  Custom Dashboard │
    │  Consolidatie      │  Builder          │
    │                    │                    │
    └────────────────────┼────────────────────┘
                         │
                    LAAG IMPACT
```

### Prioriteit Categorieën

#### Quick Wins (Week 1)
| Item | Impact | Inspanning | ROI |
|------|--------|------------|-----|
| Consistente loading skeletons | Hoog | 4u | Excellent |
| Focus visible states | Medium | 2u | Excellent |
| Design token consolidatie | Medium | 4u | Goed |
| Empty state uniformiteit | Medium | 3u | Goed |

#### Medium Effort (Week 2-3)
| Item | Impact | Inspanning | ROI |
|------|--------|------------|-----|
| Progressive disclosure | Zeer Hoog | 16u | Excellent |
| Clean slate welcome | Hoog | 8u | Goed |
| Widget enhancements | Hoog | 12u | Goed |
| Optimistic UI | Hoog | 8u | Goed |

#### Groot Project (Week 4+)
| Item | Impact | Inspanning | ROI |
|------|--------|------------|-----|
| Drag-and-drop widgets | Hoog | 24u | Goed |
| Enhanced intent mapper | Medium | 20u | Medium |
| Code splitting | Medium | 8u | Goed |

---

## 12. Concrete Aanbevelingen

### Per Component

#### AIDashboard.jsx
1. Voeg `disclosureLevel` state toe (0-3)
2. Implementeer clean slate welcome bij level 0
3. Toon widgets progressief per level
4. Voeg transition animations toe

#### dashboardStore.js
1. Voeg `disclosureLevel` toe aan state
2. Voeg `setDisclosureLevel` action toe
3. Persist disclosure preference
4. Track widget add count voor auto-level

#### BaseWidget.jsx
1. Standaardiseer skeleton loading
2. Voeg consistent error state toe
3. Implementeer value change animation
4. Voeg resize handles toe (toekomst)

#### intentMapper.js
1. Voeg synonym dictionary toe
2. Implementeer fuzzy matching (Levenshtein)
3. Verbeter confidence calibration
4. Voeg multi-intent support toe

### Nieuwe Componenten

#### LoadingSkeleton.jsx (nieuw)
```jsx
// Uniforme loading skeleton
export const LoadingSkeleton = ({ variant = 'card', lines = 3 }) => {
  // Variants: card, chart, table, kpi
  // Consistent animatie en styling
}
```

#### EmptyState.jsx (nieuw)
```jsx
// Uniforme empty state
export const EmptyState = ({
  icon,
  title,
  description,
  action
}) => {
  // Consistent design voor alle empty states
}
```

#### WelcomePanel.jsx (nieuw)
```jsx
// Clean slate welcome voor level 0
export const WelcomePanel = ({
  userName,
  suggestions,
  onQuerySelect
}) => {
  // AI-gestuurde welkomst met suggesties
}
```

---

## 13. Design System Gaps

### Ontbrekende Tokens

| Token | Huidige Status | Aanbeveling |
|-------|----------------|-------------|
| `animation.widget-enter` | Niet gedefinieerd | `fade-in 300ms ease-out` |
| `animation.value-change` | Niet gedefinieerd | `pulse 200ms` |
| `colors.gradient.header` | Hardcoded | Centraliseren |
| `spacing.widget-gap` | Hardcoded `gap-4` | Token maken |

### Ontbrekende Componenten

| Component | Urgentie | Beschrijving |
|-----------|----------|--------------|
| LoadingSkeleton | Hoog | Uniforme loading states |
| EmptyState | Hoog | Uniforme empty states |
| ProgressRing | Medium | Herbruikbare progress indicator |
| Tooltip | Medium | Consistente tooltip styling |

---

## 14. Conclusie

### Sterke Fundamenten
Het Klant in Beeld AI Dashboard heeft een **solide basis** met:
- Premium visuele design
- Goede component architectuur
- Werkende AI integratie
- Accessibility foundations

### Kritieke Verbeteringen
De belangrijkste verbeteringen zijn:

1. **Progressive Disclosure** (Prioriteit 1)
   - Reduceer cognitive load
   - Verbeter first-time user experience
   - Maak dashboard minder overweldigend

2. **Consistentie** (Prioriteit 2)
   - Uniforme loading states
   - Standaard empty states
   - Design token gebruik

3. **Gebruikerscontrole** (Prioriteit 3)
   - Widget drag-and-drop
   - Undo functionaliteit
   - Custom layouts

### Verwachte Impact
Na implementatie van aanbevelingen:
- **Cognitive Load**: -40% (minder widgets bij start)
- **User Satisfaction**: +25% (betere controle)
- **Task Completion**: +15% (snellere navigatie)
- **Accessibility**: WCAG AA compliant

---

## Bijlage A: Screenshot Referenties

1. `Dashboard v1.0 recent.png` - Volledig AI Dashboard met widgets
2. `pagina visie.png` - Visie & Strategische Doelen pagina
3. `sectoren.png` - Methodologie met sector overzicht
4. `vermogens pagina.png` - Vermogens (Capabilities) pagina

## Bijlage B: Geanalyseerde Bestanden

### Componenten
- `Platform/src/pages/AIDashboard.jsx`
- `Platform/src/components/ai-dashboard/widgets/*.jsx`
- `Platform/src/components/ai-dashboard/ClarificationDialog.jsx`
- `Platform/src/components/ai-dashboard/OnboardingTour.jsx`

### State & Services
- `Platform/src/stores/dashboardStore.js`
- `Platform/src/stores/appStore.js`
- `Platform/src/services/aiService.js`
- `Platform/src/services/intentMapper.js`

### Hooks
- `Platform/src/hooks/useAIQuery.js`
- `Platform/src/hooks/useResponsive.js`
- `Platform/src/hooks/useKeyboardShortcuts.js`
- `Platform/src/hooks/useFocusManagement.js`

### Config
- `Platform/src/config/designTokens.js`
- `Platform/src/types/dashboard.ts`
