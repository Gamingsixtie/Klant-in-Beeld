/**
 * Klant in Beeld - Programmastructuur
 * Gebaseerd op MT Presentatie december 2025
 *
 * Structuur:
 * - 3 Sectoren (PO, VO, Professionals/Zakelijk)
 * - 4 Fases per sector
 * - 4 Domeinen (Mens, Proces, Systeem, Cultuur)
 * - 4 Typen inspanningen
 * - 10 Tools in de Toolkit
 */

// ==================== VISIE ====================
export const programmaVisie = {
  titel: "Klant in Beeld",
  visie: "Cito BV ontwikkelt zich tot een organisatie die vanuit een outside-in perspectief werkt, waarin mens, proces en systeem verbonden zijn en dit onderdeel wordt van de cultuur, zodat dienstverlening en samenwerking blijvend aansluiten bij de behoeften van klanten.",
  methodiek: "Voordoen → Samen doen → Zelf doen",
  kernprincipes: [
    "We denken niet in deliverables, maar in baten en effecten",
    "Eigenaarschap blijft bij Cito",
    "Participatie en betrokkenheid zijn essentieel voor succes"
  ]
}

// ==================== SECTOREN ====================
export const sectoren = [
  {
    id: 'po',
    naam: 'Primair Onderwijs',
    afkorting: 'PO',
    kleur: '#3b82f6', // blue
    baateigenaar: 'Sectormanager PO',
    huidigeFase: 3,
    faseStatus: 'richting einde',
    beschrijving: 'Basisscholen en speciaal onderwijs'
  },
  {
    id: 'vo',
    naam: 'Voortgezet Onderwijs',
    afkorting: 'VO',
    kleur: '#8b5cf6', // purple
    baateigenaar: 'Sectormanager VO',
    huidigeFase: 3,
    faseStatus: 'richting einde',
    beschrijving: 'Middelbare scholen'
  },
  {
    id: 'professionals',
    naam: 'Professionals / Zakelijk',
    afkorting: 'ZAK',
    kleur: '#f59e0b', // amber
    baateigenaar: 'Sectormanager Zakelijk/Professionals',
    huidigeFase: 2,
    faseStatus: 'begin',
    beschrijving: 'Zakelijke markt en professionals'
  }
]

// ==================== 4 FASES ====================
export const fases = [
  {
    id: 1,
    nummer: 1,
    naam: 'Identificeer',
    beschrijving: 'Klanten en stakeholders identificeren',
    kleur: '#6366f1',
    activiteiten: [
      'Klantgroepen identificeren',
      'Persona\'s opstellen',
      'Stakeholders in kaart brengen',
      'Scope bepalen'
    ],
    deliverables: [
      'Stakeholder Canvas',
      'Persona beschrijvingen',
      'Scopedocument'
    ],
    eindverantwoordelijke: 'Programmamanager',
    goedkeuring: 'Programmaraad'
  },
  {
    id: 2,
    nummer: 2,
    naam: 'Analyseer Klantreis (AS-IS)',
    beschrijving: 'Huidige klantreis en pijnpunten in kaart brengen',
    kleur: '#ec4899',
    activiteiten: [
      'Klantreis above the line uitwerken',
      'Klantreis below the line (processen, systemen) uitwerken',
      'Klantinterviews uitvoeren',
      'Pijnpunten identificeren',
      'Inzichten verzamelen en valideren'
    ],
    deliverables: [
      'Klantreis (5 per sector)',
      'Below the Line proceskaarten',
      'Pijn & Winst kaart',
      'Interview samenvattingen',
      'Klantreis inzichten'
    ],
    eindverantwoordelijke: 'Baateigenaar (Sectormanager)',
    goedkeuring: 'Programma-eigenaar'
  },
  {
    id: 3,
    nummer: 3,
    naam: 'Ontwerp Ideale Situatie (TO-BE)',
    beschrijving: 'Gewenste klantreis en oplossingen ontwerpen',
    kleur: '#10b981',
    activiteiten: [
      'Design criteria opstellen (MoSCoW)',
      'Ideatie sessies organiseren',
      'Effort & Value prioritering',
      'Verbeterideeën uitwerken',
      'TO-BE klantreis ontwerpen'
    ],
    deliverables: [
      'Design Criteria document',
      'Effort & Value matrix',
      'Uitgewerkte verbeterideeën',
      'TO-BE klantreis',
      'Implementatieplan'
    ],
    eindverantwoordelijke: 'Baateigenaar (Sectormanager)',
    goedkeuring: 'Programmaraad'
  },
  {
    id: 4,
    nummer: 4,
    naam: 'Implementeer Scenario\'s',
    beschrijving: 'Verbeteringen implementeren en borgen',
    kleur: '#f59e0b',
    activiteiten: [
      'Pilotprojecten uitvoeren',
      'Training en coaching verzorgen',
      'Processen aanpassen',
      'Systemen implementeren',
      'Cultuurverandering begeleiden',
      'Effecten meten en rapporteren'
    ],
    deliverables: [
      'Geïmplementeerde verbeteringen',
      'Trainingsmateriaal',
      'Aangepaste procesdocumentatie',
      'Effectmeting rapport',
      'Borgingsplan'
    ],
    eindverantwoordelijke: 'Inspanningsleiders',
    goedkeuring: 'Baateigenaar'
  }
]

// ==================== 4 DOMEINEN ====================
export const domeinen = [
  {
    id: 'mens',
    naam: 'Mens',
    kleur: '#3b82f6',
    icon: 'Users',
    beschrijving: 'Vaardigheden ontwikkelen voor outside-in werken. Heldere rollen en verantwoordelijkheden. Ruimte voor oefenen en reflectie.',
    focusgebieden: [
      'Outside-in vaardigheden',
      'Rollen en verantwoordelijkheden',
      'Training en coaching',
      'Gedragsverandering'
    ]
  },
  {
    id: 'proces',
    naam: 'Proces',
    kleur: '#10b981',
    icon: 'GitBranch',
    beschrijving: 'Organisatiebreed uniform klantproces. Eenduidige opvolging van klantinzichten. Borging in standaard werkwijze.',
    focusgebieden: [
      'Uniform klantproces',
      'Klachtenprocedure',
      'Opvolging klantinzichten',
      'Standaard werkwijze'
    ]
  },
  {
    id: 'systeem',
    naam: 'Systeem',
    kleur: '#8b5cf6',
    icon: 'Database',
    beschrijving: 'Verbetering CRM en klantdata. Integraal 360° klantbeeld. Systemen die proactief handelen ondersteunen.',
    focusgebieden: [
      'CRM verbetering',
      '360° klantbeeld',
      'Data-integratie',
      'Proactieve systemen'
    ]
  },
  {
    id: 'cultuur',
    naam: 'Cultuur',
    kleur: '#f59e0b',
    icon: 'Heart',
    beschrijving: 'Van productgericht naar klantgericht. Gedeeld eigenaarschap voor klantrelaties. Sectoroverstijgende samenwerking.',
    focusgebieden: [
      'Klantgerichte mindset',
      'Eigenaarschap',
      'Sectoroverstijgende samenwerking',
      'Outside-in cultuur'
    ]
  }
]

// ==================== 4 TYPEN INSPANNINGEN ====================
export const inspanningTypes = [
  {
    id: 'project',
    naam: 'Projecten',
    beschrijving: 'Concreet, afgebakend resultaat binnen bepaalde tijd',
    kleur: '#3b82f6',
    icon: 'Briefcase',
    voorbeelden: ['CRM implementatie', 'Klantreisanalyse', 'Pilotproject']
  },
  {
    id: 'proces',
    naam: 'Procesinspanningen',
    beschrijving: 'Werkprocessen duurzaam verbeteren en borgen',
    kleur: '#10b981',
    icon: 'RefreshCw',
    voorbeelden: ['Klachtenprocedure optimaliseren', 'Standaard werkwijze ontwikkelen']
  },
  {
    id: 'leer',
    naam: 'Leertrajecten',
    beschrijving: 'Vaardigheden, houding en gedrag ontwikkelen',
    kleur: '#f59e0b',
    icon: 'GraduationCap',
    voorbeelden: ['Training outside-in werken', 'Coaching klantgerichtheid']
  },
  {
    id: 'systeem',
    naam: 'Systeemtrajecten',
    beschrijving: 'Data-infrastructuur en klantbeeld realiseren',
    kleur: '#8b5cf6',
    icon: 'Server',
    voorbeelden: ['CRM upgrade', 'Data-integratie', '360° klantbeeld']
  }
]

// ==================== TOOLKIT (10 TOOLS) ====================
export const toolkit = [
  // Fase 2: AS-IS Tools
  {
    id: 'tool-1',
    nummer: 1,
    naam: 'Simpele Klantreis',
    beschrijving: 'Eerste schets met belangrijkste fases',
    fase: 2,
    categorie: 'AS-IS',
    miroLink: true
  },
  {
    id: 'tool-2',
    nummer: 2,
    naam: 'Klantreis',
    beschrijving: 'Gedetailleerd Above the Line met touchpoints',
    fase: 2,
    categorie: 'AS-IS',
    miroLink: true
  },
  {
    id: 'tool-3',
    nummer: 3,
    naam: 'Klantreis Onder de Lijn',
    beschrijving: 'Interne processen, systemen en data',
    fase: 2,
    categorie: 'AS-IS',
    miroLink: true
  },
  {
    id: 'tool-4',
    nummer: 4,
    naam: 'Stakeholder Canvas',
    beschrijving: 'Geplot op invloed en betrokkenheid',
    fase: 1,
    categorie: 'Identificatie',
    miroLink: true
  },
  {
    id: 'tool-5',
    nummer: 5,
    naam: 'Pijn & Winst Kaart',
    beschrijving: 'Behoeften en pijnpunten per persona',
    fase: 2,
    categorie: 'AS-IS',
    miroLink: true
  },
  {
    id: 'tool-6',
    nummer: 6,
    naam: 'Interview Samenvatting',
    beschrijving: 'Uitgewerkte klantinterviews',
    fase: 2,
    categorie: 'AS-IS',
    miroLink: true
  },
  {
    id: 'tool-7',
    nummer: 7,
    naam: 'Klantreis Inzichten',
    beschrijving: 'Bevindingen geplot op klantreis',
    fase: 2,
    categorie: 'AS-IS',
    miroLink: true
  },
  // Fase 3: TO-BE Tools
  {
    id: 'tool-8',
    nummer: 8,
    naam: 'Design Criteria',
    beschrijving: 'MoSCoW prioritering van requirements',
    fase: 3,
    categorie: 'TO-BE',
    miroLink: true
  },
  {
    id: 'tool-9',
    nummer: 9,
    naam: 'Effort & Value',
    beschrijving: 'Prioriteringsmatrix voor ideeën',
    fase: 3,
    categorie: 'TO-BE',
    miroLink: true
  },
  {
    id: 'tool-10',
    nummer: 10,
    naam: 'Ideatie',
    beschrijving: 'HKJ\'s en uitgewerkte verbeterideeën',
    fase: 3,
    categorie: 'TO-BE',
    miroLink: true
  }
]

// ==================== GOVERNANCE ====================
export const governance = {
  programmaEigenaar: {
    rol: 'Programma-eigenaar',
    naam: 'Commercieel Manager',
    verantwoordelijkheden: [
      'Stuurt op batenrealisatie',
      'Eindverantwoordelijk voor programma-uitkomsten',
      'Besluit over strategische richting'
    ]
  },
  programmaManager: {
    rol: 'Programmamanager',
    naam: '[In te vullen]',
    verantwoordelijkheden: [
      'Coördineert en bewaakt samenhang',
      'Voorzitter Programmaraad',
      'Rapporteert voortgang',
      'Escaleert issues'
    ]
  },
  programmaRaad: {
    naam: 'Programmaraad',
    leden: [
      'Programmamanager (voorzitter)',
      'Programma-eigenaar',
      'Baateigenaren (sectormanagers)',
      'Data & Tech manager',
      'HR'
    ],
    frequentie: '2-wekelijks',
    doel: 'Prioritering, keuzes, voortgangsbewaking'
  },
  baatEigenaren: [
    { sector: 'PO', rol: 'Sectormanager PO' },
    { sector: 'VO', rol: 'Sectormanager VO' },
    { sector: 'Professionals', rol: 'Sectormanager Zakelijk/Professionals' }
  ],
  inspanningsLeiders: [
    'Projectleiders',
    'Procesleiders',
    'Leer- en gedragstrajectleiders',
    'Systeem/data-trajectleiders'
  ]
}

// ==================== BATEN EN EFFECTEN ====================
export const batenEffecten = [
  {
    baat: 'Hogere klanttevredenheid',
    effecten: ['Stijging NPS-score', 'Positievere klantfeedback'],
    domein: 'cultuur'
  },
  {
    baat: 'Lagere ongewenste klantuitstroom',
    effecten: ['Daling churn-percentage', 'Meer verlengingen'],
    domein: 'proces'
  },
  {
    baat: 'Betere aansluiting op klantbehoefte',
    effecten: ['Meer gebruik van producten', 'Minder klachten'],
    domein: 'proces'
  },
  {
    baat: 'Proactieve klantrelaties',
    effecten: ['Meer proactieve contactmomenten', 'Eerder signaleren'],
    domein: 'mens'
  },
  {
    baat: 'Efficiëntere interne samenwerking',
    effecten: ['Kortere doorlooptijden', 'Minder dubbel werk'],
    domein: 'proces'
  },
  {
    baat: 'Betrouwbaar integraal klantbeeld',
    effecten: ['Eén klantview in systemen', 'Betere data-kwaliteit'],
    domein: 'systeem'
  }
]

// ==================== KiB TEAM ====================
export const kibTeam = {
  naam: 'KiB Team',
  pijlers: [
    {
      id: 'competentie',
      naam: 'Competentie Maturiteit',
      icon: '📊',
      beschrijving: 'Ontwikkeling van outside-in vaardigheden meten en bevorderen'
    },
    {
      id: 'tools',
      naam: 'Tools',
      icon: '🧰',
      beschrijving: 'Toolkit ontwikkelen en beheren'
    },
    {
      id: 'evangelie',
      naam: 'Evangelie',
      icon: '📢',
      beschrijving: 'Communicatie en draagvlak creëren'
    },
    {
      id: 'studio',
      naam: 'Studio',
      icon: '🎨',
      beschrijving: 'Creatieve sessies en workshops faciliteren'
    }
  ]
}

// ==================== HELPER FUNCTIES ====================
export function getSectorById(sectorId) {
  return sectoren.find(s => s.id === sectorId)
}

export function getFaseById(faseId) {
  return fases.find(f => f.id === faseId)
}

export function getToolsVoorFase(faseNummer) {
  return toolkit.filter(t => t.fase === faseNummer)
}

export function getDomeinById(domeinId) {
  return domeinen.find(d => d.id === domeinId)
}
