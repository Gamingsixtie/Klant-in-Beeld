import { create } from 'zustand'
import * as db from '../services/supabase'

// Initial data (fallback when Supabase not available)
// Baten structuur: sector + primair domein + impact op alle domeinen
const initialBaten = [
  {
    id: '1',
    sector: 'Primair onderwijs',
    domein: 'Cultuur',
    naam: 'Hogere klanttevredenheid PO',
    beschrijving: 'Scholen ervaren betere en klantgerichte dienstverlening',
    indicator: 'NPS score',
    huidigeWaarde: '+15',
    doelWaarde: '+40',
    eigenaar: 'Sectormanager PO',
    status: 'in_progress',
    domeinImpact: { mens: 'midden', proces: 'hoog', systeem: 'midden', cultuur: 'hoog' }
  },
  {
    id: '2',
    sector: 'Primair onderwijs',
    domein: 'Proces',
    naam: 'Snellere doorlooptijd klantvragen',
    beschrijving: 'Efficiëntere afhandeling van vragen van scholen',
    indicator: 'Doorlooptijd in dagen',
    huidigeWaarde: '5',
    doelWaarde: '2',
    eigenaar: 'Sectormanager PO',
    status: 'planned',
    domeinImpact: { mens: 'laag', proces: 'hoog', systeem: 'midden', cultuur: 'laag' }
  },
  {
    id: '3',
    sector: 'Voortgezet onderwijs',
    domein: 'Systeem',
    naam: '360° Klantbeeld VO',
    beschrijving: 'Eenduidig klantbeeld voor alle VO-scholen',
    indicator: 'Data completeness score',
    huidigeWaarde: '45%',
    doelWaarde: '90%',
    eigenaar: 'Sectormanager VO',
    status: 'in_progress',
    domeinImpact: { mens: 'midden', proces: 'midden', systeem: 'hoog', cultuur: 'laag' }
  },
  {
    id: '4',
    sector: 'Zakelijk Professionals',
    domein: 'Mens',
    naam: 'Klantgerichte medewerkers ZP',
    beschrijving: 'Medewerkers handelen vanuit klantperspectief',
    indicator: 'MTO-score klantgerichtheid',
    huidigeWaarde: '6.5',
    doelWaarde: '8.0',
    eigenaar: 'Sectormanager ZP',
    status: 'planned',
    domeinImpact: { mens: 'hoog', proces: 'midden', systeem: 'laag', cultuur: 'hoog' }
  }
]

const initialInspanningen = [
  {
    id: '1',
    type: 'project',
    code: 'P-001',
    naam: 'CRM Selectie & Implementatie',
    beschrijving: 'Selecteren en implementeren van nieuw CRM-systeem voor alle sectoren',
    sector: 'Programma',
    domein: 'Systeem',
    eigenaar: 'IT-directeur',
    leider: 'Projectleider IT',
    startMaand: 1,
    eindMaand: 9,
    status: 'in_progress',
    levenscyclus: 'opbouwen',
    werkfase: 2,
    gekoppeldeBaten: ['1', '2', '3'] // Draagt bij aan deze baten
  },
  {
    id: '2',
    type: 'leer',
    code: 'L-001',
    naam: 'Outside-in Mindset Training',
    beschrijving: 'Trainen van medewerkers in klantgericht denken en handelen',
    sector: 'Programma',
    domein: 'Mens',
    eigenaar: 'HR-directeur',
    leider: 'Learning & Development',
    startMaand: 3,
    eindMaand: 12,
    status: 'planned',
    levenscyclus: 'verkennen',
    werkfase: 1,
    gekoppeldeBaten: ['1', '4']
  },
  {
    id: '3',
    type: 'proces',
    code: 'PR-001',
    naam: 'Klantreis PO Optimalisatie',
    beschrijving: 'Analyseren en verbeteren van de klantreis primair onderwijs',
    sector: 'Primair onderwijs',
    domein: 'Proces',
    eigenaar: 'Sectormanager PO',
    leider: 'Process Analyst',
    startMaand: 2,
    eindMaand: 8,
    status: 'in_progress',
    levenscyclus: 'uitvoeren',
    werkfase: 3,
    gekoppeldeBaten: ['1']
  },
  {
    id: '4',
    type: 'systeem',
    code: 'S-001',
    naam: 'Data Integratie Platform',
    beschrijving: 'Koppelen van systemen voor eenduidig klantbeeld over alle sectoren',
    sector: 'Programma',
    domein: 'Systeem',
    eigenaar: 'IT-directeur',
    leider: 'Integratie Architect',
    startMaand: 4,
    eindMaand: 15,
    status: 'planned',
    levenscyclus: 'opbouwen',
    werkfase: 2,
    gekoppeldeBaten: ['2', '3']
  },
  {
    id: '5',
    type: 'proces',
    code: 'PR-002',
    naam: 'Klantreis VO Optimalisatie',
    beschrijving: 'Analyseren en verbeteren van de klantreis voortgezet onderwijs',
    sector: 'Voortgezet onderwijs',
    domein: 'Proces',
    eigenaar: 'Sectormanager VO',
    leider: 'Process Analyst',
    startMaand: 4,
    eindMaand: 10,
    status: 'planned',
    levenscyclus: 'opbouwen',
    werkfase: 2,
    gekoppeldeBaten: ['2']
  },
  {
    id: '6',
    type: 'leer',
    code: 'L-002',
    naam: 'Klantgericht Communiceren',
    beschrijving: 'Training voor frontoffice medewerkers in klantgerichte communicatie',
    sector: 'Zakelijk Professionals',
    domein: 'Cultuur',
    eigenaar: 'Sectormanager ZP',
    leider: 'Training Coordinator',
    startMaand: 5,
    eindMaand: 8,
    status: 'planned',
    levenscyclus: 'verkennen',
    werkfase: 1,
    gekoppeldeBaten: ['3', '4']
  }
]

const initialStakeholders = [
  {
    id: '1',
    naam: 'Pim de Burger',
    rol: 'Programmamanager',
    functie: 'Senior Programmamanager',
    email: 'p.deburger@cito.nl',
    telefoon: '06-12345678',
    afdeling: 'Programmabureau',
    belang: 'high',
    invloed: 'high',
    notities: 'Dagelijkse leiding programma Klant in Beeld'
  },
  {
    id: '2',
    naam: 'Maria Jansen',
    rol: 'Programma-eigenaar',
    functie: 'Directeur Klantrelaties',
    email: 'm.jansen@cito.nl',
    telefoon: '06-23456789',
    afdeling: 'Directie',
    belang: 'high',
    invloed: 'high',
    notities: 'Eindverantwoordelijk voor programmasucces'
  },
  {
    id: '3',
    naam: 'Jan Peters',
    rol: 'Baateigenaar',
    functie: 'Sectormanager PO',
    email: 'j.peters@cito.nl',
    telefoon: '06-34567890',
    afdeling: 'Primair Onderwijs',
    belang: 'high',
    invloed: 'medium',
    notities: 'Verantwoordelijk voor batenrealisatie PO sector'
  },
  {
    id: '4',
    naam: 'Kees de Vries',
    rol: 'Inspanningsleider',
    functie: 'IT Projectleider',
    email: 'k.devries@cito.nl',
    telefoon: '06-45678901',
    afdeling: 'ICT',
    belang: 'medium',
    invloed: 'medium',
    notities: 'Leidt CRM implementatie project'
  }
]

const initialRisicos = [
  {
    id: '1',
    titel: 'Weerstand tegen verandering',
    beschrijving: 'Medewerkers kunnen weerstand bieden tegen nieuwe werkwijzen',
    categorie: 'Organisatie',
    kans: 4,
    impact: 3,
    score: 12,
    eigenaar: 'HR-directeur',
    mitigatie: 'Change management programma met ambassadeurs',
    status: 'open'
  },
  {
    id: '2',
    titel: 'CRM implementatie vertraging',
    beschrijving: 'Technische complexiteit kan leiden tot vertraging',
    categorie: 'Technisch',
    kans: 3,
    impact: 4,
    score: 12,
    eigenaar: 'IT-directeur',
    mitigatie: 'Faseer implementatie, begin met pilot',
    status: 'open'
  }
]

const initialIssues = [
  {
    id: '1',
    titel: 'Data kwaliteit legacy systemen',
    beschrijving: 'Klantdata in oude systemen is incompleet en inconsistent',
    prioriteit: 'high',
    eigenaar: 'Data Manager',
    status: 'open',
    oplossing: ''
  }
]

export const useAppStore = create((set, get) => ({
  // State
  baten: initialBaten,
  inspanningen: initialInspanningen,
  stakeholders: initialStakeholders,
  risicos: initialRisicos,
  issues: initialIssues,

  // Loading & error state
  isLoading: false,
  isInitialized: false,
  error: null,
  useSupabase: true,

  // ==================== INITIALIZATION ====================
  initializeFromSupabase: async () => {
    set({ isLoading: true, error: null })
    try {
      const data = await db.fetchAllData()
      if (data) {
        set({
          baten: data.baten.length > 0 ? data.baten : initialBaten,
          inspanningen: data.inspanningen.length > 0 ? data.inspanningen : initialInspanningen,
          stakeholders: data.stakeholders.length > 0 ? data.stakeholders : initialStakeholders,
          risicos: data.risicos,
          issues: data.issues,
          isInitialized: true,
          isLoading: false,
          useSupabase: true
        })
        console.log('✅ Data geladen van Supabase')
        return true
      } else {
        set({ isLoading: false, useSupabase: false, isInitialized: true })
        console.log('⚠️ Supabase niet beschikbaar, lokale data gebruikt')
        return false
      }
    } catch (error) {
      console.error('❌ Fout bij laden data:', error)
      set({ isLoading: false, error: error.message, useSupabase: false, isInitialized: true })
      return false
    }
  },

  // ==================== BATEN ====================
  addBaat: async (baat) => {
    const state = get()
    const tempId = `temp-${Date.now()}`
    const newBaat = { ...baat, id: tempId }

    // Optimistic update
    set({ baten: [...state.baten, newBaat] })

    if (state.useSupabase) {
      try {
        const created = await db.createBaat(baat)
        if (created) {
          set({ baten: state.baten.map(b => b.id === tempId ? created : b).concat(created.id !== tempId ? [] : []) })
          // Refresh to get correct data
          const fresh = await db.fetchBaten()
          set({ baten: fresh })
        }
      } catch (error) {
        console.error('Error creating baat:', error)
      }
    }
  },

  updateBaat: async (id, updates) => {
    const state = get()

    // Optimistic update
    set({ baten: state.baten.map(b => b.id === id ? { ...b, ...updates } : b) })

    if (state.useSupabase) {
      try {
        await db.updateBaat(id, updates)
      } catch (error) {
        console.error('Error updating baat:', error)
      }
    }
  },

  deleteBaat: async (id) => {
    const state = get()

    // Optimistic update
    set({ baten: state.baten.filter(b => b.id !== id) })

    if (state.useSupabase) {
      try {
        await db.deleteBaat(id)
      } catch (error) {
        console.error('Error deleting baat:', error)
      }
    }
  },

  // ==================== INSPANNINGEN ====================
  addInspanning: async (inspanning) => {
    const state = get()
    const tempId = `temp-${Date.now()}`
    const newInspanning = { ...inspanning, id: tempId }

    // Optimistic update
    set({ inspanningen: [...state.inspanningen, newInspanning] })

    if (state.useSupabase) {
      try {
        const created = await db.createInspanning(inspanning)
        if (created) {
          const fresh = await db.fetchInspanningen()
          set({ inspanningen: fresh })
        }
      } catch (error) {
        console.error('Error creating inspanning:', error)
      }
    }
  },

  updateInspanning: async (id, updates) => {
    const state = get()

    // Optimistic update
    set({ inspanningen: state.inspanningen.map(i => i.id === id ? { ...i, ...updates } : i) })

    if (state.useSupabase) {
      try {
        await db.updateInspanning(id, updates)
      } catch (error) {
        console.error('Error updating inspanning:', error)
      }
    }
  },

  deleteInspanning: async (id) => {
    const state = get()

    // Optimistic update
    set({ inspanningen: state.inspanningen.filter(i => i.id !== id) })

    if (state.useSupabase) {
      try {
        await db.deleteInspanning(id)
      } catch (error) {
        console.error('Error deleting inspanning:', error)
      }
    }
  },

  // ==================== STAKEHOLDERS ====================
  addStakeholder: async (stakeholder) => {
    const state = get()
    const tempId = `temp-${Date.now()}`
    const newStakeholder = { ...stakeholder, id: tempId }

    set({ stakeholders: [...state.stakeholders, newStakeholder] })

    if (state.useSupabase) {
      try {
        await db.createStakeholder(stakeholder)
        const fresh = await db.fetchStakeholders()
        set({ stakeholders: fresh })
      } catch (error) {
        console.error('Error creating stakeholder:', error)
      }
    }
  },

  updateStakeholder: async (id, updates) => {
    const state = get()
    set({ stakeholders: state.stakeholders.map(s => s.id === id ? { ...s, ...updates } : s) })

    if (state.useSupabase) {
      try {
        await db.updateStakeholder(id, updates)
      } catch (error) {
        console.error('Error updating stakeholder:', error)
      }
    }
  },

  deleteStakeholder: async (id) => {
    const state = get()
    set({ stakeholders: state.stakeholders.filter(s => s.id !== id) })

    if (state.useSupabase) {
      try {
        await db.deleteStakeholder(id)
      } catch (error) {
        console.error('Error deleting stakeholder:', error)
      }
    }
  },

  // ==================== RISICOS ====================
  addRisico: async (risico) => {
    const state = get()
    const tempId = `temp-${Date.now()}`
    const newRisico = { ...risico, id: tempId, score: (risico.kans || 0) * (risico.impact || 0) }

    set({ risicos: [...state.risicos, newRisico] })

    if (state.useSupabase) {
      try {
        await db.createRisico(risico)
        const fresh = await db.fetchRisicos()
        set({ risicos: fresh })
      } catch (error) {
        console.error('Error creating risico:', error)
      }
    }
  },

  updateRisico: async (id, updates) => {
    const state = get()
    set({ risicos: state.risicos.map(r => r.id === id ? { ...r, ...updates } : r) })

    if (state.useSupabase) {
      try {
        await db.updateRisico(id, updates)
      } catch (error) {
        console.error('Error updating risico:', error)
      }
    }
  },

  deleteRisico: async (id) => {
    const state = get()
    set({ risicos: state.risicos.filter(r => r.id !== id) })

    if (state.useSupabase) {
      try {
        await db.deleteRisico(id)
      } catch (error) {
        console.error('Error deleting risico:', error)
      }
    }
  },

  // ==================== ISSUES ====================
  addIssue: async (issue) => {
    const state = get()
    const tempId = `temp-${Date.now()}`
    const newIssue = { ...issue, id: tempId }

    set({ issues: [...state.issues, newIssue] })

    if (state.useSupabase) {
      try {
        await db.createIssue(issue)
        const fresh = await db.fetchIssues()
        set({ issues: fresh })
      } catch (error) {
        console.error('Error creating issue:', error)
      }
    }
  },

  updateIssue: async (id, updates) => {
    const state = get()
    set({ issues: state.issues.map(i => i.id === id ? { ...i, ...updates } : i) })

    if (state.useSupabase) {
      try {
        await db.updateIssue(id, updates)
      } catch (error) {
        console.error('Error updating issue:', error)
      }
    }
  },

  deleteIssue: async (id) => {
    const state = get()
    set({ issues: state.issues.filter(i => i.id !== id) })

    if (state.useSupabase) {
      try {
        await db.deleteIssue(id)
      } catch (error) {
        console.error('Error deleting issue:', error)
      }
    }
  },

  // ==================== COMPUTED VALUES ====================
  getStats: () => {
    const state = get()
    return {
      totalBaten: state.baten.length,
      completedBaten: state.baten.filter(b => b.status === 'completed').length,
      totalInspanningen: state.inspanningen.length,
      activeInspanningen: state.inspanningen.filter(i => i.status === 'in_progress').length,
      totalStakeholders: state.stakeholders.length,
      openRisicos: state.risicos.filter(r => r.status === 'open' || r.status === 'in_behandeling').length,
      hoogRisicos: state.risicos.filter(r => (r.score || 0) >= 15).length,
      openIssues: state.issues.filter(i => i.status === 'open' || i.status === 'in_behandeling').length
    }
  },

  // ==================== REFRESH ====================
  refresh: async () => {
    const state = get()
    if (state.useSupabase) {
      try {
        const data = await db.fetchAllData()
        if (data) {
          set({
            baten: data.baten,
            inspanningen: data.inspanningen,
            stakeholders: data.stakeholders,
            risicos: data.risicos,
            issues: data.issues
          })
        }
      } catch (error) {
        console.error('Error refreshing data:', error)
      }
    }
  }
}))
