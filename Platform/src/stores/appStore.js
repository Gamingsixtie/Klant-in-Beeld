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
    levenscyclus: 'uitvoeren',
    werkfase: 3,
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
    levenscyclus: 'uitvoeren',
    werkfase: 3,
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
    levenscyclus: 'uitvoeren',
    werkfase: 3,
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
    levenscyclus: 'uitvoeren',
    werkfase: 3,
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
    levenscyclus: 'uitvoeren',
    werkfase: 3,
    gekoppeldeBaten: ['3', '4']
  },
  // Voorbeeld inspanningen gekoppeld aan "Hogere klanttevredenheid PO" (baat id: 1)
  {
    id: '7',
    type: 'project',
    code: 'P-002',
    naam: 'Klanttevredenheidsonderzoek PO',
    beschrijving: 'Implementatie van continu klanttevredenheidsonderzoek bij PO-scholen met NPS-metingen en verbeteracties',
    sector: 'Primair onderwijs',
    domein: 'Cultuur',
    eigenaar: 'Sectormanager PO',
    leider: 'Customer Experience Lead',
    startMaand: 2,
    eindMaand: 6,
    status: 'in_progress',
    levenscyclus: 'uitvoeren',
    werkfase: 3,
    gekoppeldeBaten: ['1'] // Draagt bij aan: Hogere klanttevredenheid PO
  },
  {
    id: '8',
    type: 'leer',
    code: 'L-003',
    naam: 'Klantgerichtheid Training PO-team',
    beschrijving: 'Trainingsprogramma voor alle medewerkers PO in klantgerichte houding en proactieve communicatie met scholen',
    sector: 'Primair onderwijs',
    domein: 'Mens',
    eigenaar: 'HR-manager',
    leider: 'L&D Specialist',
    startMaand: 3,
    eindMaand: 9,
    status: 'in_progress',
    levenscyclus: 'uitvoeren',
    werkfase: 3,
    gekoppeldeBaten: ['1'] // Draagt bij aan: Hogere klanttevredenheid PO
  },
  {
    id: '9',
    type: 'proces',
    code: 'PR-003',
    naam: 'Klachtenafhandeling Verbetering',
    beschrijving: 'Herontwerp van het klachtenproces voor snellere responstijd en hogere oplossingsgraad bij eerste contact',
    sector: 'Primair onderwijs',
    domein: 'Proces',
    eigenaar: 'Kwaliteitsmanager',
    leider: 'Procesverbeteraar',
    startMaand: 4,
    eindMaand: 8,
    status: 'planned',
    levenscyclus: 'uitvoeren',
    werkfase: 3,
    gekoppeldeBaten: ['1'] // Draagt bij aan: Hogere klanttevredenheid PO
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

// Programma Visie (komt van organisatiestrategie)
const initialVisie = {
  programmaVisie: 'Cito zet de klant centraal in alles wat we doen',
  missie: 'Wij helpen onderwijsprofessionals om leerlingen beter te begrijpen en te ondersteunen door betrouwbare toetsen en inzichten te bieden die aansluiten bij hun behoeften.',
  horizon: '2025-2027',
  bronDocument: 'Cito Strategie 2025-2027'
}

// Strategische Doelen (afgeleid van organisatiestrategie)
const initialStrategischeDoelen = [
  {
    id: '1',
    titel: 'Verhogen klanttevredenheid',
    beschrijving: 'De klanttevredenheid verhogen over alle sectoren heen door betere dienstverlening en communicatie',
    indicator: 'NPS score',
    huidigeWaarde: '+15',
    doelWaarde: '+40',
    prioriteit: 'high',
    tijdshorizon: 'Q4 2026',
    eigenaar: 'Directeur Klantrelaties',
    status: 'actief'
  },
  {
    id: '2',
    titel: 'Verbeteren klantinzicht',
    beschrijving: 'Een 360-graden beeld van onze klanten opbouwen om beter te kunnen anticiperen op hun behoeften',
    indicator: 'Data completeness %',
    huidigeWaarde: '45%',
    doelWaarde: '90%',
    prioriteit: 'high',
    tijdshorizon: 'Q2 2026',
    eigenaar: 'IT-directeur',
    status: 'actief'
  },
  {
    id: '3',
    titel: 'Efficiëntere klantprocessen',
    beschrijving: 'De doorlooptijd van klantinteracties halveren door procesoptimalisatie en automatisering',
    indicator: 'Gemiddelde doorlooptijd',
    huidigeWaarde: '5 dagen',
    doelWaarde: '2 dagen',
    prioriteit: 'medium',
    tijdshorizon: 'Q4 2026',
    eigenaar: 'COO',
    status: 'actief'
  },
  {
    id: '4',
    titel: 'Klantgerichte cultuur',
    beschrijving: 'Een outside-in mindset verankeren in de organisatiecultuur waarbij de klant centraal staat in besluitvorming',
    indicator: 'MTO klantgerichtheid score',
    huidigeWaarde: '6.5',
    doelWaarde: '8.0',
    prioriteit: 'medium',
    tijdshorizon: 'Q4 2027',
    eigenaar: 'HR-directeur',
    status: 'actief'
  }
]

// Vermogens (Capabilities) - de brug tussen doelen en inspanningen
const initialVermogens = [
  {
    id: '1',
    naam: 'Klantinzicht Competentie',
    beschrijving: 'Het vermogen om klantdata te verzamelen, analyseren en gebruiken voor betere besluitvorming',
    type: 'Inhoudelijk',
    domein: 'Systeem',
    volwassenheidHuidig: 2, // 1-5 schaal
    volwassenheidDoel: 4,
    gekoppeldeDoelen: ['2'], // Verbeteren klantinzicht
    gekoppeldeInspanningen: ['1', '5'], // CRM, Data-integratie
    eigenaar: 'Data Manager',
    status: 'in_ontwikkeling'
  },
  {
    id: '2',
    naam: 'Klantgerichte Dienstverlening',
    beschrijving: 'Het vermogen om consistent hoogwaardige en persoonlijke service te bieden aan alle klanten',
    type: 'Organisatorisch',
    domein: 'Proces',
    volwassenheidHuidig: 2,
    volwassenheidDoel: 4,
    gekoppeldeDoelen: ['1', '3'], // Verhogen klanttevredenheid, Efficiëntere processen
    gekoppeldeInspanningen: ['3', '4', '9'], // Klantreis optimalisatie, Customer Journey Mapping, Klachtenafhandeling
    eigenaar: 'Operations Manager',
    status: 'in_ontwikkeling'
  },
  {
    id: '3',
    naam: 'Outside-in Cultuur',
    beschrijving: 'Het vermogen van de organisatie om vanuit klantperspectief te denken en handelen',
    type: 'Cultureel',
    domein: 'Cultuur',
    volwassenheidHuidig: 2,
    volwassenheidDoel: 4,
    gekoppeldeDoelen: ['4'], // Klantgerichte cultuur
    gekoppeldeInspanningen: ['2'], // Outside-in Mindset Training
    eigenaar: 'HR-directeur',
    status: 'in_ontwikkeling'
  },
  {
    id: '4',
    naam: 'Geïntegreerd CRM Platform',
    beschrijving: 'Een technisch platform dat alle klantinteracties en -data centraal beheert',
    type: 'Technisch',
    domein: 'Systeem',
    volwassenheidHuidig: 1,
    volwassenheidDoel: 5,
    gekoppeldeDoelen: ['1', '2'], // Klanttevredenheid, Klantinzicht
    gekoppeldeInspanningen: ['1'], // CRM Implementatie
    eigenaar: 'IT-directeur',
    status: 'in_ontwikkeling'
  },
  {
    id: '5',
    naam: 'Klantfeedback Management',
    beschrijving: 'Het systematisch verzamelen, analyseren en acteren op klantfeedback',
    type: 'Organisatorisch',
    domein: 'Proces',
    volwassenheidHuidig: 2,
    volwassenheidDoel: 4,
    gekoppeldeDoelen: ['1'], // Verhogen klanttevredenheid
    gekoppeldeInspanningen: ['6', '8'], // NPS Implementatie, Voice of Customer
    eigenaar: 'Kwaliteitsmanager',
    status: 'in_ontwikkeling'
  },
  {
    id: '6',
    naam: 'Cross-functionele Samenwerking',
    beschrijving: 'Het vermogen van teams om over afdelingen heen samen te werken voor klantwaarde',
    type: 'Menselijk',
    domein: 'Mens',
    volwassenheidHuidig: 2,
    volwassenheidDoel: 4,
    gekoppeldeDoelen: ['3', '4'], // Efficiëntie, Cultuur
    gekoppeldeInspanningen: ['2', '7'], // Training, Ambassadeurs
    eigenaar: 'HR-directeur',
    status: 'gepland'
  }
]

export const useAppStore = create((set, get) => ({
  // State
  baten: initialBaten,
  inspanningen: initialInspanningen,
  stakeholders: initialStakeholders,
  risicos: initialRisicos,
  issues: initialIssues,
  visie: initialVisie,
  strategischeDoelen: initialStrategischeDoelen,
  vermogens: initialVermogens,

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

  // ==================== VISIE ====================
  updateVisie: (updates) => {
    const state = get()
    set({ visie: { ...state.visie, ...updates } })
  },

  // ==================== STRATEGISCHE DOELEN ====================
  addStrategischDoel: (doel) => {
    const state = get()
    const newDoel = { ...doel, id: `doel-${Date.now()}` }
    set({ strategischeDoelen: [...state.strategischeDoelen, newDoel] })
  },

  updateStrategischDoel: (id, updates) => {
    const state = get()
    set({
      strategischeDoelen: state.strategischeDoelen.map(d =>
        d.id === id ? { ...d, ...updates } : d
      )
    })
  },

  deleteStrategischDoel: (id) => {
    const state = get()
    // Also remove this doel from vermogens gekoppeldeDoelen
    const updatedVermogens = state.vermogens.map(v => ({
      ...v,
      gekoppeldeDoelen: (v.gekoppeldeDoelen || []).filter(did => did !== id)
    }))
    set({
      strategischeDoelen: state.strategischeDoelen.filter(d => d.id !== id),
      vermogens: updatedVermogens
    })
  },

  // ==================== VERMOGENS ====================
  addVermogen: (vermogen) => {
    const state = get()
    const newVermogen = { ...vermogen, id: `vermogen-${Date.now()}` }
    set({ vermogens: [...state.vermogens, newVermogen] })
  },

  updateVermogen: (id, updates) => {
    const state = get()
    set({
      vermogens: state.vermogens.map(v =>
        v.id === id ? { ...v, ...updates } : v
      )
    })
  },

  deleteVermogen: (id) => {
    const state = get()
    set({ vermogens: state.vermogens.filter(v => v.id !== id) })
  },

  // Link vermogen to doel
  linkVermogenToDoel: (vermogenId, doelId) => {
    const state = get()
    set({
      vermogens: state.vermogens.map(v => {
        if (v.id === vermogenId) {
          const gekoppeldeDoelen = v.gekoppeldeDoelen || []
          if (!gekoppeldeDoelen.includes(doelId)) {
            return { ...v, gekoppeldeDoelen: [...gekoppeldeDoelen, doelId] }
          }
        }
        return v
      })
    })
  },

  unlinkVermogenFromDoel: (vermogenId, doelId) => {
    const state = get()
    set({
      vermogens: state.vermogens.map(v => {
        if (v.id === vermogenId) {
          return {
            ...v,
            gekoppeldeDoelen: (v.gekoppeldeDoelen || []).filter(id => id !== doelId)
          }
        }
        return v
      })
    })
  },

  // Link vermogen to inspanning
  linkVermogenToInspanning: (vermogenId, inspanningId) => {
    const state = get()
    set({
      vermogens: state.vermogens.map(v => {
        if (v.id === vermogenId) {
          const gekoppeldeInspanningen = v.gekoppeldeInspanningen || []
          if (!gekoppeldeInspanningen.includes(inspanningId)) {
            return { ...v, gekoppeldeInspanningen: [...gekoppeldeInspanningen, inspanningId] }
          }
        }
        return v
      })
    })
  },

  unlinkVermogenFromInspanning: (vermogenId, inspanningId) => {
    const state = get()
    set({
      vermogens: state.vermogens.map(v => {
        if (v.id === vermogenId) {
          return {
            ...v,
            gekoppeldeInspanningen: (v.gekoppeldeInspanningen || []).filter(id => id !== inspanningId)
          }
        }
        return v
      })
    })
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
