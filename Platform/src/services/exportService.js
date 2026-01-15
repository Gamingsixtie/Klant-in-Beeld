/**
 * Export Service
 * Handles dashboard export to various formats (JSON, PNG)
 */

/**
 * Export dashboard configuration to JSON file
 * @param {Object} dashboardData - Dashboard data including widgets, filters, etc.
 * @param {string} filename - Name of the export file
 */
export function exportToJSON(dashboardData, filename = 'dashboard-export') {
  const exportData = {
    version: '1.0',
    exportDate: new Date().toISOString(),
    dashboard: {
      widgets: dashboardData.widgets,
      filters: dashboardData.globalFilters,
      preferences: {
        lastUsedReport: dashboardData.preferences?.lastUsedReport
      }
    },
    metadata: {
      widgetCount: dashboardData.widgets?.length || 0,
      exportedBy: 'Klant in Beeld - AI Dashboard'
    }
  }

  const json = JSON.stringify(exportData, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  downloadBlob(blob, `${filename}.json`)
}

/**
 * Export dashboard canvas to PNG image
 * Note: This requires html2canvas to be installed for full functionality
 * For now, we provide a simplified version using canvas API
 * @param {HTMLElement} element - The DOM element to capture
 * @param {string} filename - Name of the export file
 */
export async function exportToPNG(element, filename = 'dashboard-screenshot') {
  if (!element) {
    console.error('No element provided for PNG export')
    return
  }

  try {
    // Try to use html2canvas if available
    if (typeof window !== 'undefined' && window.html2canvas) {
      const canvas = await window.html2canvas(element, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
        useCORS: true
      })
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'))
      downloadBlob(blob, `${filename}.png`)
      return
    }

    // Fallback: Create a simple canvas representation
    const rect = element.getBoundingClientRect()
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const scale = 2

    canvas.width = rect.width * scale
    canvas.height = rect.height * scale

    // Fill background
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add header text
    ctx.scale(scale, scale)
    ctx.fillStyle = '#003366'
    ctx.font = 'bold 24px Inter, system-ui, sans-serif'
    ctx.fillText('AI Dashboard Export', 20, 40)

    ctx.fillStyle = '#64748b'
    ctx.font = '14px Inter, system-ui, sans-serif'
    ctx.fillText(`Geëxporteerd op: ${new Date().toLocaleString('nl-NL')}`, 20, 65)

    // Add note about limited export
    ctx.fillStyle = '#94a3b8'
    ctx.font = '12px Inter, system-ui, sans-serif'
    ctx.fillText('Tip: Installeer html2canvas voor volledige screenshot functionaliteit', 20, rect.height - 20)

    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'))
    downloadBlob(blob, `${filename}.png`)
  } catch (error) {
    console.error('Error exporting to PNG:', error)
    throw error
  }
}

/**
 * Import dashboard configuration from JSON file
 * @param {File} file - The JSON file to import
 * @returns {Object} - Parsed dashboard data
 */
export async function importFromJSON(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result)

        // Validate structure
        if (!data.dashboard || !data.version) {
          throw new Error('Invalid dashboard export file')
        }

        resolve({
          widgets: data.dashboard.widgets || [],
          filters: data.dashboard.filters || {},
          preferences: data.dashboard.preferences || {},
          metadata: data.metadata
        })
      } catch (error) {
        reject(new Error('Could not parse dashboard file: ' + error.message))
      }
    }

    reader.onerror = () => {
      reject(new Error('Could not read file'))
    }

    reader.readAsText(file)
  })
}

/**
 * Export conversation history to text file
 * @param {Array} conversation - Array of conversation messages
 * @param {string} filename - Name of the export file
 */
export function exportConversation(conversation, filename = 'conversation-export') {
  const lines = conversation.map(msg => {
    const role = msg.role === 'user' ? 'Jij' : 'AI'
    const time = msg.timestamp ? new Date(msg.timestamp).toLocaleString('nl-NL') : ''
    return `[${role}] ${time}\n${msg.content}\n`
  })

  const text = `AI Dashboard Gesprek Export\n` +
    `Geëxporteerd op: ${new Date().toLocaleString('nl-NL')}\n` +
    `${'='.repeat(50)}\n\n` +
    lines.join('\n')

  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
  downloadBlob(blob, `${filename}.txt`)
}

/**
 * Generate a summary report of the current dashboard state
 * @param {Object} dashboardData - Dashboard data
 * @returns {string} - Markdown formatted report
 */
export function generateReport(dashboardData) {
  const { widgets = [], globalFilters = {}, conversation = [] } = dashboardData

  const kpiWidgets = widgets.filter(w => w.type === 'kpi')
  const chartWidgets = widgets.filter(w => ['bar', 'line'].includes(w.type))
  const tableWidgets = widgets.filter(w => w.type === 'table')

  const report = `# AI Dashboard Rapport

**Gegenereerd op:** ${new Date().toLocaleString('nl-NL')}

## Dashboard Overzicht

- **Totaal widgets:** ${widgets.length}
  - KPI's: ${kpiWidgets.length}
  - Charts: ${chartWidgets.length}
  - Tabellen: ${tableWidgets.length}

## Actieve Filters

${globalFilters.sector ? `- **Sector:** ${globalFilters.sector}` : '- Geen sectorfilter actief'}
${globalFilters.domein ? `- **Domein:** ${globalFilters.domein}` : ''}

## Widgets

${widgets.map((w, i) => `${i + 1}. **${w.title}** (${w.type})`).join('\n')}

## Gesprek Samenvatting

- **Totaal berichten:** ${conversation.length}
- **Gebruikersvragen:** ${conversation.filter(m => m.role === 'user').length}
- **AI antwoorden:** ${conversation.filter(m => m.role === 'assistant').length}

---
*Rapport gegenereerd door Klant in Beeld AI Dashboard*
`

  return report
}

/**
 * Export report as Markdown file
 * @param {Object} dashboardData - Dashboard data
 * @param {string} filename - Name of the export file
 */
export function exportReport(dashboardData, filename = 'dashboard-report') {
  const report = generateReport(dashboardData)
  const blob = new Blob([report], { type: 'text/markdown;charset=utf-8' })
  downloadBlob(blob, `${filename}.md`)
}

/**
 * Helper function to download a blob as a file
 */
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export default {
  exportToJSON,
  exportToPNG,
  importFromJSON,
  exportConversation,
  generateReport,
  exportReport
}
