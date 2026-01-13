import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { activiteiten, themas, levensloopcycli, documentTemplates } from '../data/methodologie'

// Initiële voortgang - Klant in Beeld start in VERKENNEN fase (Week 1)
const initialVoortgang = {
  // Huidige positie
  huidigeCyclus: 'verkennen',
  huidigeThema: 'kiezen',
  cyclusNummer: 0, // Nog niet in uitvoeren
  huidigeWeek: 1, // Week 1 van Verkennen

  // Activiteiten voortgang: { activiteitId: { status, completedItems, notities, datum } }
  activiteiten: {
    // Nog niets afgerond - we beginnen net
  },

  // Documenten: { documentId: { status, path, versie, datum } }
  documenten: {
    // Nog geen documenten
  },

  // Go/No-Go besluiten
  besluiten: [
    // Nog geen besluiten genomen
  ]
}

export const useMethodologieStore = create(
  persist(
    (set, get) => ({
      // State
      voortgang: initialVoortgang,

      // Huidige positie wijzigen
      setCyclus: (cyclusId) => set((state) => ({
        voortgang: { ...state.voortgang, huidigeCyclus: cyclusId }
      })),

      setThema: (themaId) => set((state) => ({
        voortgang: { ...state.voortgang, huidigeThema: themaId }
      })),

      // Activiteit voortgang
      updateActiviteit: (activiteitId, updates) => set((state) => ({
        voortgang: {
          ...state.voortgang,
          activiteiten: {
            ...state.voortgang.activiteiten,
            [activiteitId]: {
              ...state.voortgang.activiteiten[activiteitId],
              ...updates
            }
          }
        }
      })),

      toggleChecklistItem: (activiteitId, item) => set((state) => {
        const current = state.voortgang.activiteiten[activiteitId] || { completedItems: [], status: 'not_started' }
        const completedItems = current.completedItems || []
        const isCompleted = completedItems.includes(item)

        const newCompletedItems = isCompleted
          ? completedItems.filter(i => i !== item)
          : [...completedItems, item]

        // Bepaal status op basis van checklist
        const activiteit = activiteiten.find(a => a.id === activiteitId)
        const totalItems = activiteit?.checklistItems?.length || 0
        let newStatus = 'not_started'
        if (newCompletedItems.length === totalItems) {
          newStatus = 'completed'
        } else if (newCompletedItems.length > 0) {
          newStatus = 'in_progress'
        }

        return {
          voortgang: {
            ...state.voortgang,
            activiteiten: {
              ...state.voortgang.activiteiten,
              [activiteitId]: {
                ...current,
                completedItems: newCompletedItems,
                status: newStatus,
                datum: new Date().toISOString().split('T')[0]
              }
            }
          }
        }
      }),

      // Document voortgang
      updateDocument: (documentId, updates) => set((state) => ({
        voortgang: {
          ...state.voortgang,
          documenten: {
            ...state.voortgang.documenten,
            [documentId]: {
              ...state.voortgang.documenten[documentId],
              ...updates
            }
          }
        }
      })),

      // Besluit toevoegen
      addBesluit: (besluit) => set((state) => ({
        voortgang: {
          ...state.voortgang,
          besluiten: [...state.voortgang.besluiten, { ...besluit, id: `gnG-${Date.now()}` }]
        }
      })),

      // Computed getters
      getActiviteitStatus: (activiteitId) => {
        const state = get()
        return state.voortgang.activiteiten[activiteitId]?.status || 'not_started'
      },

      getDocumentStatus: (documentId) => {
        const state = get()
        return state.voortgang.documenten[documentId]?.status || 'not_started'
      },

      // Voortgang per thema berekenen
      getThemaVoortgang: (themaId, cyclusId) => {
        const state = get()
        const themaActiviteiten = activiteiten.filter(
          a => a.themaId === themaId && a.cyclusId === cyclusId
        )

        if (themaActiviteiten.length === 0) return { percentage: 0, completed: 0, total: 0 }

        const completed = themaActiviteiten.filter(
          a => state.voortgang.activiteiten[a.id]?.status === 'completed'
        ).length

        return {
          percentage: Math.round((completed / themaActiviteiten.length) * 100),
          completed,
          total: themaActiviteiten.length
        }
      },

      // Voortgang per cyclus berekenen
      getCyclusVoortgang: (cyclusId) => {
        const state = get()
        const cyclusActiviteiten = activiteiten.filter(a => a.cyclusId === cyclusId)

        if (cyclusActiviteiten.length === 0) return { percentage: 0, completed: 0, total: 0 }

        const completed = cyclusActiviteiten.filter(
          a => state.voortgang.activiteiten[a.id]?.status === 'completed'
        ).length

        return {
          percentage: Math.round((completed / cyclusActiviteiten.length) * 100),
          completed,
          total: cyclusActiviteiten.length
        }
      },

      // Totale programma voortgang
      getTotaleVoortgang: () => {
        const state = get()
        const totalActiviteiten = activiteiten.length
        const completed = Object.values(state.voortgang.activiteiten).filter(
          a => a.status === 'completed'
        ).length

        return {
          percentage: Math.round((completed / totalActiviteiten) * 100),
          completed,
          total: totalActiviteiten
        }
      },

      // Volgende actie bepalen
      getVolgendeActie: () => {
        const state = get()
        const { huidigeCyclus, huidigeThema } = state.voortgang

        // Zoek eerste niet-afgeronde activiteit in huidige thema/cyclus
        const huidigeActiviteiten = activiteiten
          .filter(a => a.themaId === huidigeThema && a.cyclusId === huidigeCyclus)
          .sort((a, b) => a.volgorde - b.volgorde)

        for (const activiteit of huidigeActiviteiten) {
          const status = state.voortgang.activiteiten[activiteit.id]?.status
          if (status !== 'completed') {
            return activiteit
          }
        }

        // Alle activiteiten in dit thema/cyclus af, zoek volgende thema
        const themaIndex = themas.findIndex(t => t.id === huidigeThema)
        if (themaIndex < themas.length - 1) {
          const volgendThema = themas[themaIndex + 1]
          const volgendeActiviteiten = activiteiten
            .filter(a => a.themaId === volgendThema.id && a.cyclusId === huidigeCyclus)
            .sort((a, b) => a.volgorde - b.volgorde)
          if (volgendeActiviteiten.length > 0) {
            return volgendeActiviteiten[0]
          }
        }

        return null
      },

      // Reset voor demo
      resetVoortgang: () => set({ voortgang: initialVoortgang })
    }),
    {
      name: 'methodologie-storage'
    }
  )
)
