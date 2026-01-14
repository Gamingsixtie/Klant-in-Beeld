/**
 * Klant in Beeld - Programma Data
 *
 * METHODOLOGIE: "Werken aan Programma's" (Prevaas & Van Loon)
 * TOEPASSING: Klant in Beeld (Cito)
 *
 * De methodologie is leidend met:
 * - 8 Thema's
 * - 4 Levensloopcycli
 * - 5 Stuurparameters
 *
 * Toegepast op Klant in Beeld met:
 * - 3 Sectoren (PO, VO, Professionals)
 * - 4 Domeinen (Mens, Proces, Systeem, Cultuur)
 * - Specifieke toolkit en deliverables
 */

import { themas, levensloopcycli, activiteiten, documentTemplates } from './methodologie'

// ==================== PROGRAMMA INFO ====================
export const programmaInfo = {
  naam: 'Klant in Beeld',
  organisatie: 'Cito',
  visie: `Cito BV ontwikkelt zich tot een organisatie die vanuit een outside-in perspectief werkt,
waarin mens, proces en systeem verbonden zijn en dit onderdeel wordt van de cultuur,
zodat dienstverlening en samenwerking blijvend aansluiten bij de behoeften van klanten.`,
  methodiek: 'Voordoen → Samen doen → Zelf doen',
  startDatum: '2025-09-01',
  geplandeDuur: '24 maanden',
  huidigeStatus: 'Opbouwen'
}

// ==================== 3 SECTOREN ====================
export const sectoren = [
  {
    id: 'po',
    naam: 'Primair Onderwijs',
    afkorting: 'PO',
    kleur: '#3b82f6',
    baateigenaar: {
      naam: 'Sectormanager PO',
      rol: 'Baateigenaar'
    },
    klantreizen: 5,
    huidigeWerkfase: 3,
    werkfaseStatus: 'Richting einde',
    beschrijving: 'Basisscholen en speciaal onderwijs'
  },
  {
    id: 'vo',
    naam: 'Voortgezet Onderwijs',
    afkorting: 'VO',
    kleur: '#8b5cf6',
    baateigenaar: {
      naam: 'Sectormanager VO',
      rol: 'Baateigenaar'
    },
    klantreizen: 5,
    huidigeWerkfase: 3,
    werkfaseStatus: 'Richting einde',
    beschrijving: 'Middelbare scholen'
  },
  {
    id: 'professionals',
    naam: 'Professionals / Zakelijk',
    afkorting: 'ZAK',
    kleur: '#f59e0b',
    baateigenaar: {
      naam: 'Sectormanager Zakelijk',
      rol: 'Baateigenaar'
    },
    klantreizen: 3,
    huidigeWerkfase: 2,
    werkfaseStatus: 'Begin',
    beschrijving: 'Zakelijke markt en professionals'
  }
]

// ==================== 4 WERKFASES (per sector) ====================
// Dit zijn de operationele fases binnen de uitvoeringscyclus
export const werkfases = [
  {
    id: 1,
    naam: 'Identificeer',
    beschrijving: 'Klanten en stakeholders identificeren',
    levenscyclus: 'opbouwen', // Mapping naar methodologie
    themas: ['kiezen', 'vormgeven'],
    tools: ['stakeholder-canvas'],
    deliverables: ['Stakeholder Canvas', 'Persona beschrijvingen', 'Scopedocument'],
    eindverantwoordelijke: 'Programmamanager'
  },
  {
    id: 2,
    naam: 'Analyseer Klantreis (AS-IS)',
    beschrijving: 'Huidige klantreis en pijnpunten in kaart brengen',
    levenscyclus: 'uitvoeren',
    themas: ['vormgeven', 'sturen'],
    tools: ['simpele-klantreis', 'klantreis', 'below-the-line', 'pijn-winst', 'interviews', 'inzichten'],
    deliverables: ['Klantreizen', 'Proceskaarten', 'Pijn & Winst kaart', 'Interview samenvattingen'],
    eindverantwoordelijke: 'Baateigenaar (Sectormanager)'
  },
  {
    id: 3,
    naam: 'Ontwerp Ideale Situatie (TO-BE)',
    beschrijving: 'Gewenste klantreis en oplossingen ontwerpen',
    levenscyclus: 'uitvoeren',
    themas: ['vormgeven', 'beslissen'],
    tools: ['design-criteria', 'effort-value', 'ideatie'],
    deliverables: ['Design Criteria', 'Effort & Value matrix', 'Verbeterideeën', 'TO-BE klantreis'],
    eindverantwoordelijke: 'Baateigenaar (Sectormanager)'
  },
  {
    id: 4,
    naam: 'Implementeer Scenario\'s',
    beschrijving: 'Verbeteringen implementeren en borgen',
    levenscyclus: 'uitvoeren',
    themas: ['organiseren', 'sturen', 'samenwerken'],
    tools: [],
    deliverables: ['Geïmplementeerde verbeteringen', 'Trainingsmateriaal', 'Effectmeting rapport'],
    eindverantwoordelijke: 'Inspanningsleiders'
  }
]

// ==================== 4 DOMEINEN ====================
export const domeinen = [
  {
    id: 'mens',
    naam: 'Mens',
    kleur: '#3b82f6',
    icon: 'Users',
    beschrijving: 'Vaardigheden ontwikkelen voor outside-in werken',
    doelen: [
      'Heldere rollen en verantwoordelijkheden',
      'Ruimte voor oefenen en reflectie',
      'Outside-in vaardigheden'
    ],
    inspanningType: 'leer'
  },
  {
    id: 'proces',
    naam: 'Proces',
    kleur: '#10b981',
    icon: 'GitBranch',
    beschrijving: 'Organisatiebreed uniform klantproces',
    doelen: [
      'Eenduidige opvolging van klantinzichten',
      'Borging in standaard werkwijze',
      'Uniforme klantbenadering'
    ],
    inspanningType: 'proces'
  },
  {
    id: 'systeem',
    naam: 'Systeem',
    kleur: '#8b5cf6',
    icon: 'Database',
    beschrijving: 'Verbetering CRM en klantdata',
    doelen: [
      'Integraal 360° klantbeeld',
      'Systemen die proactief handelen ondersteunen',
      'Betere datakwaliteit'
    ],
    inspanningType: 'systeem'
  },
  {
    id: 'cultuur',
    naam: 'Cultuur',
    kleur: '#f59e0b',
    icon: 'Heart',
    beschrijving: 'Van productgericht naar klantgericht',
    doelen: [
      'Gedeeld eigenaarschap voor klantrelaties',
      'Sectoroverstijgende samenwerking',
      'Outside-in mindset'
    ],
    inspanningType: 'leer'
  }
]

// ==================== TOOLKIT (10 TOOLS) ====================
export const toolkit = [
  {
    id: 'stakeholder-canvas',
    nummer: 4,
    naam: 'Stakeholder Canvas',
    beschrijving: 'Stakeholders geplot op invloed en betrokkenheid',
    werkfase: 1,
    categorie: 'Identificatie',
    status: 'beschikbaar'
  },
  {
    id: 'simpele-klantreis',
    nummer: 1,
    naam: 'Simpele Klantreis',
    beschrijving: 'Eerste schets met belangrijkste fases',
    werkfase: 2,
    categorie: 'AS-IS',
    status: 'beschikbaar'
  },
  {
    id: 'klantreis',
    nummer: 2,
    naam: 'Klantreis',
    beschrijving: 'Gedetailleerd Above the Line met touchpoints',
    werkfase: 2,
    categorie: 'AS-IS',
    status: 'beschikbaar'
  },
  {
    id: 'below-the-line',
    nummer: 3,
    naam: 'Klantreis Onder de Lijn',
    beschrijving: 'Interne processen, systemen en data',
    werkfase: 2,
    categorie: 'AS-IS',
    status: 'beschikbaar'
  },
  {
    id: 'pijn-winst',
    nummer: 5,
    naam: 'Pijn & Winst Kaart',
    beschrijving: 'Behoeften en pijnpunten per persona',
    werkfase: 2,
    categorie: 'AS-IS',
    status: 'beschikbaar'
  },
  {
    id: 'interviews',
    nummer: 6,
    naam: 'Interview Samenvatting',
    beschrijving: 'Uitgewerkte klantinterviews',
    werkfase: 2,
    categorie: 'AS-IS',
    status: 'beschikbaar'
  },
  {
    id: 'inzichten',
    nummer: 7,
    naam: 'Klantreis Inzichten',
    beschrijving: 'Bevindingen geplot op klantreis',
    werkfase: 2,
    categorie: 'AS-IS',
    status: 'beschikbaar'
  },
  {
    id: 'design-criteria',
    nummer: 8,
    naam: 'Design Criteria',
    beschrijving: 'MoSCoW prioritering van requirements',
    werkfase: 3,
    categorie: 'TO-BE',
    status: 'beschikbaar'
  },
  {
    id: 'effort-value',
    nummer: 9,
    naam: 'Effort & Value',
    beschrijving: 'Prioriteringsmatrix voor ideeën',
    werkfase: 3,
    categorie: 'TO-BE',
    status: 'beschikbaar'
  },
  {
    id: 'ideatie',
    nummer: 10,
    naam: 'Ideatie',
    beschrijving: 'HKJ\'s en uitgewerkte verbeterideeën',
    werkfase: 3,
    categorie: 'TO-BE',
    status: 'beschikbaar'
  }
]

// ==================== GOVERNANCE ====================
export const governanceStructuur = {
  programmaEigenaar: {
    rol: 'Programma-eigenaar',
    functie: 'Commercieel Manager',
    verantwoordelijkheden: [
      'Stuurt op batenrealisatie',
      'Eindverantwoordelijk voor programma-uitkomsten',
      'Besluit over strategische richting',
      'Verbindt programma aan organisatiedoelen'
    ],
    // Mapping naar methodologie thema's
    themasVerantwoordelijk: ['vormgeven', 'beslissen']
  },
  programmaManager: {
    rol: 'Programmamanager',
    naam: 'Pim de Burger',
    functie: 'Senior Programmamanager',
    verantwoordelijkheden: [
      'Coördineert en bewaakt samenhang',
      'Voorzitter Programmaraad',
      'Rapporteert voortgang',
      'Escaleert issues',
      'Dagelijkse aansturing'
    ],
    themasVerantwoordelijk: ['organiseren', 'sturen', 'samenwerken']
  },
  programmaRaad: {
    naam: 'Programmaraad',
    beschrijving: 'Tactisch sturend orgaan voor dagelijkse programmavoortgang',
    niveau: 'Tactisch',
    leden: [
      { rol: 'Voorzitter', functie: 'Programmamanager', naam: 'Pim de Burger' },
      { rol: 'Lid', functie: 'Programma-eigenaar' },
      { rol: 'Baateigenaar PO', functie: 'Sectormanager PO' },
      { rol: 'Baateigenaar VO', functie: 'Sectormanager VO' },
      { rol: 'Baateigenaar Zakelijk', functie: 'Sectormanager Zakelijk' },
      { rol: 'Lid', functie: 'Data & Tech manager' },
      { rol: 'Lid', functie: 'HR' }
    ],
    frequentie: '2-wekelijks',
    verantwoordelijkheden: [
      'Prioriteiten stellen en bijsturen',
      'Voortgang bewaken en bespreken',
      'Operationele knelpunten oplossen',
      'Budgetallocatie binnen programma',
      'Escalaties voorbereiden voor Sponsorgroep'
    ],
    themasVerantwoordelijk: ['beslissen', 'sturen']
  },
  sponsorgroep: {
    naam: 'Sponsorgroep',
    beschrijving: 'Strategisch besluitvormend orgaan dat Go/No-Go besluiten neemt',
    niveau: 'Strategisch',
    leden: [
      { rol: 'Voorzitter', functie: 'Directeur', naam: 'n.t.b.' },
      { rol: 'Sponsor PO', functie: 'Directeur PO', naam: 'n.t.b.' },
      { rol: 'Sponsor VO', functie: 'Directeur VO', naam: 'n.t.b.' },
      { rol: 'Sponsor Zakelijk', functie: 'Directeur Zakelijk', naam: 'n.t.b.' },
      { rol: 'Programma-eigenaar', functie: 'Commercieel Manager', naam: 'n.t.b.' }
    ],
    verantwoordelijkheden: [
      'Goedkeuren Go/No-Go besluiten',
      'Vrijgeven resources (budget, mensen)',
      'Strategische koers bepalen',
      'Escalaties oplossen',
      'Draagvlak in de organisatie'
    ],
    frequentie: 'Per Go/No-Go moment + kwartaal',
    themasVerantwoordelijk: ['beslissen', 'leiden']
  },
  inspanningsLeiders: {
    rollen: [
      'Projectleiders',
      'Procesleiders',
      'Leer- en gedragstrajectleiders',
      'Systeem/data-trajectleiders'
    ],
    verantwoordelijkheden: [
      'Uitvoering binnen kaders',
      'Rapportage aan Programmamanager',
      'Operationele beslissingen'
    ]
  }
}

// ==================== BATEN EN EFFECTEN ====================
export const batenStructuur = [
  {
    id: 'b1',
    baat: 'Hogere klanttevredenheid',
    effecten: ['Stijging NPS-score', 'Positievere klantfeedback'],
    indicator: 'NPS',
    nulmeting: '+15',
    doel: '+35',
    domein: 'cultuur',
    eigenaar: 'Alle sectormanagers'
  },
  {
    id: 'b2',
    baat: 'Lagere ongewenste klantuitstroom',
    effecten: ['Daling churn-percentage', 'Meer verlengingen'],
    indicator: 'Churn %',
    nulmeting: '12%',
    doel: '6%',
    domein: 'proces',
    eigenaar: 'Alle sectormanagers'
  },
  {
    id: 'b3',
    baat: 'Betere aansluiting op klantbehoefte',
    effecten: ['Meer gebruik van producten', 'Minder klachten'],
    indicator: 'Klachten per 1000',
    nulmeting: '45',
    doel: '20',
    domein: 'proces',
    eigenaar: 'Programma-eigenaar'
  },
  {
    id: 'b4',
    baat: 'Proactieve klantrelaties',
    effecten: ['Meer proactieve contactmomenten', 'Eerder signaleren'],
    indicator: 'Proactieve contacten %',
    nulmeting: '20%',
    doel: '60%',
    domein: 'mens',
    eigenaar: 'Alle sectormanagers'
  },
  {
    id: 'b5',
    baat: 'Efficiëntere interne samenwerking',
    effecten: ['Kortere doorlooptijden', 'Minder dubbel werk'],
    indicator: 'Doorlooptijd (dagen)',
    nulmeting: '14',
    doel: '5',
    domein: 'proces',
    eigenaar: 'Programmamanager'
  },
  {
    id: 'b6',
    baat: 'Betrouwbaar integraal klantbeeld',
    effecten: ['Eén klantview in systemen', 'Betere data-kwaliteit'],
    indicator: 'Datakwaliteit %',
    nulmeting: '65%',
    doel: '95%',
    domein: 'systeem',
    eigenaar: 'Data & Tech manager'
  }
]

// ==================== 5 STUURPARAMETERS (uit methodologie) ====================
export const stuurparameters = [
  {
    id: 'doeltreffendheid',
    naam: 'Doeltreffendheid',
    vraag: 'Bereiken we de juiste effecten?',
    indicatoren: ['NPS trend', 'Batenrealisatie %'],
    status: 'groen',
    toelichting: 'Op koers voor geplande baten'
  },
  {
    id: 'tempo',
    naam: 'Tempo',
    vraag: 'Liggen we op schema?',
    indicatoren: ['Mijlpalen gehaald', 'Doorlooptijd'],
    status: 'geel',
    toelichting: 'Sector Professionals loopt achter'
  },
  {
    id: 'haalbaarheid',
    naam: 'Haalbaarheid',
    vraag: 'Kunnen we dit realiseren?',
    indicatoren: ['Resources beschikbaar', 'Afhankelijkheden'],
    status: 'groen',
    toelichting: 'Voldoende capaciteit'
  },
  {
    id: 'wendbaarheid',
    naam: 'Wendbaarheid',
    vraag: 'Kunnen we bijsturen waar nodig?',
    indicatoren: ['Wijzigingen doorgevoerd', 'Besluitsnelheid'],
    status: 'groen',
    toelichting: 'Flexibele aanpak werkt'
  },
  {
    id: 'efficientie',
    naam: 'Efficiëntie',
    vraag: 'Doen we het met de juiste inzet?',
    indicatoren: ['Budget realisatie', 'Uren vs planning'],
    status: 'groen',
    toelichting: 'Binnen budget'
  }
]

// ==================== KiB TEAM ====================
export const kibTeam = {
  naam: 'KiB Team',
  doel: 'Interne capaciteit versterken met externe expertise',
  pijlers: [
    {
      id: 'competentie',
      naam: 'Competentie Maturiteit',
      icon: '📊',
      beschrijving: 'Ontwikkeling van outside-in vaardigheden meten en bevorderen',
      thema: 'ontwikkelen'
    },
    {
      id: 'tools',
      naam: 'Tools',
      icon: '🧰',
      beschrijving: 'Toolkit ontwikkelen en beheren',
      thema: 'vormgeven'
    },
    {
      id: 'evangelie',
      naam: 'Evangelie',
      icon: '📢',
      beschrijving: 'Communicatie en draagvlak creëren',
      thema: 'samenwerken'
    },
    {
      id: 'studio',
      naam: 'Studio',
      icon: '🎨',
      beschrijving: 'Creatieve sessies en workshops faciliteren',
      thema: 'leiden'
    }
  ],
  partner: '3Sides',
  partnerRol: 'Strategisch partner die interne capaciteit versterkt'
}

// ==================== DOCUMENTEN REGISTER ====================
export const documentenRegister = [
  // Verkenningsfase documenten
  {
    id: 'doc-verkenning-1',
    naam: 'Programmavoorstel Klant in Beeld',
    type: 'Programmavoorstel',
    cyclus: 'verkennen',
    thema: 'kiezen',
    status: 'gereed',
    versie: '1.0',
    datum: '2025-09-15',
    eigenaar: 'Programma-eigenaar',
    verplicht: true
  },
  {
    id: 'doc-verkenning-2',
    naam: 'Initiële Businesscase',
    type: 'Businesscase',
    cyclus: 'verkennen',
    thema: 'vormgeven',
    status: 'gereed',
    versie: '1.0',
    datum: '2025-10-01',
    eigenaar: 'Programma-eigenaar',
    verplicht: true
  },
  {
    id: 'doc-verkenning-3',
    naam: 'Opbouwopdracht',
    type: 'Opdracht',
    cyclus: 'verkennen',
    thema: 'kiezen',
    status: 'gereed',
    versie: '1.0',
    datum: '2025-10-15',
    eigenaar: 'Sponsorgroep',
    verplicht: true
  },

  // Opbouwfase documenten
  {
    id: 'doc-opbouw-1',
    naam: 'Programmaplan Klant in Beeld',
    type: 'Programmaplan',
    cyclus: 'opbouwen',
    thema: 'vormgeven',
    status: 'in_bewerking',
    versie: '0.9',
    datum: '2025-12-01',
    eigenaar: 'Programmamanager',
    verplicht: true
  },
  {
    id: 'doc-opbouw-2',
    naam: 'Batenstructuur',
    type: 'Batenstructuur',
    cyclus: 'opbouwen',
    thema: 'vormgeven',
    status: 'gereed',
    versie: '1.0',
    datum: '2025-11-15',
    eigenaar: 'Programma-eigenaar',
    verplicht: true
  },
  {
    id: 'doc-opbouw-3',
    naam: 'Governance-schema',
    type: 'Governance',
    cyclus: 'opbouwen',
    thema: 'organiseren',
    status: 'gereed',
    versie: '1.0',
    datum: '2025-11-20',
    eigenaar: 'Programmamanager',
    verplicht: true
  },
  {
    id: 'doc-opbouw-4',
    naam: 'Inspanningsoverzicht',
    type: 'Inspanningsoverzicht',
    cyclus: 'opbouwen',
    thema: 'organiseren',
    status: 'in_bewerking',
    versie: '0.8',
    datum: '2025-12-01',
    eigenaar: 'Programmamanager',
    verplicht: true
  },
  {
    id: 'doc-opbouw-5',
    naam: 'Routekaart/Roadmap',
    type: 'Roadmap',
    cyclus: 'opbouwen',
    thema: 'vormgeven',
    status: 'gereed',
    versie: '1.0',
    datum: '2025-11-25',
    eigenaar: 'Programmamanager',
    verplicht: true
  },
  {
    id: 'doc-opbouw-6',
    naam: 'Stakeholderanalyse',
    type: 'Stakeholderanalyse',
    cyclus: 'opbouwen',
    thema: 'samenwerken',
    status: 'gereed',
    versie: '1.0',
    datum: '2025-10-30',
    eigenaar: 'Programmamanager',
    verplicht: true
  },
  {
    id: 'doc-opbouw-7',
    naam: 'Communicatieplan',
    type: 'Communicatieplan',
    cyclus: 'opbouwen',
    thema: 'samenwerken',
    status: 'niet_gestart',
    versie: '-',
    datum: null,
    eigenaar: 'Programmamanager',
    verplicht: false
  },
  {
    id: 'doc-opbouw-8',
    naam: 'Cyclusplan Cyclus 1',
    type: 'Cyclusplan',
    cyclus: 'opbouwen',
    thema: 'sturen',
    status: 'niet_gestart',
    versie: '-',
    datum: null,
    eigenaar: 'Programmamanager',
    verplicht: true
  },

  // Uitvoeringsfase documenten (per cyclus)
  {
    id: 'doc-uitvoer-1',
    naam: 'Voortgangsrapportage Template',
    type: 'Voortgangsrapportage',
    cyclus: 'uitvoeren',
    thema: 'sturen',
    status: 'beschikbaar',
    versie: '1.0',
    eigenaar: 'Programmamanager',
    verplicht: true,
    frequentie: 'Per cyclus'
  },
  {
    id: 'doc-uitvoer-2',
    naam: 'Besluitenlogboek',
    type: 'Besluitenlogboek',
    cyclus: 'uitvoeren',
    thema: 'beslissen',
    status: 'actief',
    versie: 'Lopend',
    eigenaar: 'Programmamanager',
    verplicht: true
  }
]

// ==================== MAPPING METHODOLOGIE → KiB ====================
// Hoe de 8 thema's zich vertalen naar Klant in Beeld activiteiten
export const themaMapping = {
  kiezen: {
    kibActiviteiten: ['Programmavoorstel', 'Go/No-Go verkenning'],
    verantwoordelijke: 'Programma-eigenaar',
    documenten: ['Programmavoorstel', 'Opbouwopdracht']
  },
  vormgeven: {
    kibActiviteiten: ['Visie uitwerken', 'Batenstructuur', 'Routekaart', 'Businesscase'],
    verantwoordelijke: 'Programma-eigenaar + Programmamanager',
    documenten: ['Programmaplan', 'Batenstructuur', 'Roadmap', 'Businesscase']
  },
  organiseren: {
    kibActiviteiten: ['Governance inrichten', 'Rollen toewijzen', 'Inspanningen definiëren'],
    verantwoordelijke: 'Programmamanager',
    documenten: ['Governance-schema', 'Inspanningsoverzicht', 'RACI-matrix']
  },
  sturen: {
    kibActiviteiten: ['Dashboard bijhouden', 'Stuurparameters monitoren', 'Cyclusplannen'],
    verantwoordelijke: 'Programmamanager',
    documenten: ['Cyclusplan', 'Voortgangsrapportage', 'Dashboard']
  },
  beslissen: {
    kibActiviteiten: ['Go/No-Go momenten', 'Besluitenlogboek bijhouden'],
    verantwoordelijke: 'Programmaraad',
    documenten: ['Besluitenlogboek', 'Go/No-Go documenten']
  },
  samenwerken: {
    kibActiviteiten: ['Stakeholdermanagement', 'Communicatie', 'Draagvlak creëren'],
    verantwoordelijke: 'Programmamanager + Baateigenaren',
    documenten: ['Stakeholderanalyse', 'Communicatieplan']
  },
  leiden: {
    kibActiviteiten: ['KiB Team aansturen', 'Eigenaarschap stimuleren'],
    verantwoordelijke: 'Programma-eigenaar',
    documenten: []
  },
  ontwikkelen: {
    kibActiviteiten: ['Reflectiesessies', 'Lessen vastleggen', 'Competentie ontwikkeling'],
    verantwoordelijke: 'Programmamanager',
    documenten: ['Reflectieverslagen', 'Lessons learned']
  }
}

// ==================== 7 KERNPRINCIPES (Werken aan Programma's) ====================
export const kernprincipes = [
  {
    id: 1,
    titel: 'Visie & doelen > inspanningen',
    beschrijving: 'Begin bij het "waarom", niet bij het "wat". Inspanningen zijn middelen, geen doel.',
    icon: 'Eye',
    kleur: '#3b82f6',
    kibToepassing: 'We sturen op baten (hogere klanttevredenheid) niet op activiteiten (aantal workshops).',
    valkuil: 'Inspanningen als doel zien in plaats van als middel',
    check: 'Kun je uitleggen WAAROM je deze inspanning doet?'
  },
  {
    id: 2,
    titel: 'Eigenaarschap aanboren > opdrachten geven',
    beschrijving: 'Betrokkenheid ontstaat door eigenaarschap, niet door opdrachten van bovenaf.',
    icon: 'Users',
    kleur: '#10b981',
    kibToepassing: 'Sectormanagers zijn baateigenaar - zij bepalen welke baten zij willen realiseren.',
    valkuil: '"Dat is van het programma" - eigenaarschap afschuiven',
    check: 'Wie is de eigenaar van deze baat? Is dat expliciet?'
  },
  {
    id: 3,
    titel: 'Belangen verbinden > vertegenwoordigen',
    beschrijving: 'Zoek naar gedeelde belangen, niet naar compromissen tussen posities.',
    icon: 'Layers',
    kleur: '#8b5cf6',
    kibToepassing: 'Sectoroverstijgende samenwerking: wat goed is voor de klant, is goed voor iedereen.',
    valkuil: 'Alleen de eigen sector zien, niet het geheel',
    check: 'Wat is het gedeelde belang hier?'
  },
  {
    id: 4,
    titel: 'Expliciet maken > impliciet laten',
    beschrijving: 'Maak aannames, verwachtingen en afspraken expliciet. Voorkomt misverstanden.',
    icon: 'FileText',
    kleur: '#f59e0b',
    kibToepassing: 'Duidelijke RACI, batendefinities met meetbare indicatoren, governance-afspraken.',
    valkuil: 'Aannames niet checken, verwachtingen niet uitspreken',
    check: 'Hebben we dit zwart-op-wit staan?'
  },
  {
    id: 5,
    titel: 'Leren én presteren > alleen presteren',
    beschrijving: 'Een programma is ook een leeromgeving. Reflectie is onderdeel van het werk.',
    icon: 'TrendingUp',
    kleur: '#ec4899',
    kibToepassing: 'Methodiek "Voordoen → Samen doen → Zelf doen" met 3Sides als partner.',
    valkuil: 'Alleen doorrennen, geen tijd voor reflectie',
    check: 'Wanneer hebben we voor het laatst gereflecteerd?'
  },
  {
    id: 6,
    titel: 'Integriteit besluitvorming > inhoud besluiten',
    beschrijving: 'Hoe je besluiten neemt is net zo belangrijk als wat je besluit.',
    icon: 'Shield',
    kleur: '#6366f1',
    kibToepassing: 'Go/No-Go momenten, programmaraad met alle baateigenaren, escalatiepad.',
    valkuil: 'Besluiten nemen zonder de juiste mensen',
    check: 'Zijn de juiste mensen betrokken bij dit besluit?'
  },
  {
    id: 7,
    titel: 'Doel voor ogen > programma in stand houden',
    beschrijving: 'Het programma is een middel, geen doel. Stop wanneer de baten zijn gerealiseerd.',
    icon: 'Target',
    kleur: '#14b8a6',
    kibToepassing: 'Het programma ONTWIKKELT, de lijn VOERT UIT. Programma stopt na overdracht.',
    valkuil: 'Het programma in stand houden terwijl het doel bereikt is',
    check: 'Is dit nog nodig vanuit het programma, of kan de lijn het?'
  }
]

// ==================== UITGEBREIDE BATENPROFIELEN ====================
// Baten kunnen per sector verschillen in nulmeting, doel en prioriteit
export const batenProfielen = [
  {
    id: 'bp1',
    baatId: 'b1',
    naam: 'Hogere klanttevredenheid',
    formulering: 'Zelfstandig naamwoord + vergrotende trap',
    omschrijving: 'Klanten ervaren een betere dienstverlening doordat medewerkers proactief en klantgericht werken, waardoor de algehele tevredenheid stijgt.',
    eigenaar: 'Alle sectormanagers (gezamenlijk)',
    indicator: 'Net Promoter Score (NPS)',
    meeteenheid: 'NPS score (-100 tot +100)',
    meetfrequentie: 'Kwartaal',
    // Programma-brede waarden (gemiddeld)
    nulmeting: { waarde: '+15', datum: '2025-09', bron: 'Klanttevredenheidsonderzoek 2025' },
    doel: { waarde: '+35', datum: '2027-09' },
    // SECTOR-SPECIFIEKE WAARDEN
    perSector: {
      po: {
        nulmeting: '+18',
        doel: '+40',
        prioriteit: 'hoog',
        eigenaar: 'Sectormanager PO',
        toelichting: 'Basisscholen hebben al redelijke NPS, focus op excellentie'
      },
      vo: {
        nulmeting: '+12',
        doel: '+32',
        prioriteit: 'hoog',
        eigenaar: 'Sectormanager VO',
        toelichting: 'Middelbare scholen vragen meer aandacht, complexere relaties'
      },
      professionals: {
        nulmeting: '+8',
        doel: '+28',
        prioriteit: 'kritiek',
        eigenaar: 'Sectormanager Zakelijk',
        toelichting: 'Zakelijke markt heeft laagste NPS, hoogste prioriteit'
      }
    },
    tussenDoelen: [
      { waarde: '+20', datum: '2026-03' },
      { waarde: '+25', datum: '2026-09' },
      { waarde: '+30', datum: '2027-03' }
    ],
    domeinen: {
      mens: { impact: 'hoog', toelichting: 'Vaardigheden klantgericht werken, outside-in denken' },
      proces: { impact: 'midden', toelichting: 'Uniforme klantbenadering, feedback verwerken' },
      systeem: { impact: 'laag', toelichting: 'CRM voor klanthistorie en preferences' },
      cultuur: { impact: 'hoog', toelichting: 'Outside-in mindset, klant centraal stellen' }
    },
    benodigd: [
      'Trainingen outside-in werken',
      'Klantinteractie standaarden',
      'Feedbackloop met klanten'
    ],
    risicos: ['Weerstand tegen verandering', 'Overbelasting medewerkers']
  },
  {
    id: 'bp2',
    baatId: 'b2',
    naam: 'Lagere ongewenste klantuitstroom',
    formulering: 'Zelfstandig naamwoord + vergrotende trap',
    omschrijving: 'Minder klanten vertrekken ongewenst doordat we proactief signalen oppikken en actie ondernemen voordat klanten afhaken.',
    eigenaar: 'Alle sectormanagers (gezamenlijk)',
    indicator: 'Churn percentage',
    meeteenheid: 'Percentage klanten dat vertrekt',
    meetfrequentie: 'Maandelijks',
    nulmeting: { waarde: '12%', datum: '2025-09', bron: 'Salesforce CRM' },
    doel: { waarde: '6%', datum: '2027-09' },
    perSector: {
      po: {
        nulmeting: '8%',
        doel: '4%',
        prioriteit: 'midden',
        eigenaar: 'Sectormanager PO',
        toelichting: 'Relatief stabiele klantbasis, focus op behoud'
      },
      vo: {
        nulmeting: '14%',
        doel: '7%',
        prioriteit: 'hoog',
        eigenaar: 'Sectormanager VO',
        toelichting: 'Hogere churn door concurrentie, actieve retentie nodig'
      },
      professionals: {
        nulmeting: '18%',
        doel: '8%',
        prioriteit: 'kritiek',
        eigenaar: 'Sectormanager Zakelijk',
        toelichting: 'Hoogste churn, contracten lopen af zonder verlenging'
      }
    },
    tussenDoelen: [
      { waarde: '10%', datum: '2026-03' },
      { waarde: '8%', datum: '2026-09' },
      { waarde: '7%', datum: '2027-03' }
    ],
    domeinen: {
      mens: { impact: 'midden', toelichting: 'Proactief signaleren, klantgesprekken voeren' },
      proces: { impact: 'hoog', toelichting: 'Retentieproces, escalatieprocedure' },
      systeem: { impact: 'hoog', toelichting: 'Churn-signalen detecteren, alerts' },
      cultuur: { impact: 'midden', toelichting: 'Eigenaarschap klantrelatie' }
    },
    benodigd: [
      'Churn-prediction model',
      'Retentie playbook',
      'Escalatieprocedure'
    ],
    risicos: ['Data niet beschikbaar', 'Te laat signaleren']
  },
  {
    id: 'bp3',
    baatId: 'b3',
    naam: 'Betere aansluiting op klantbehoefte',
    formulering: 'Zelfstandig naamwoord + vergrotende trap',
    omschrijving: 'Onze producten en diensten sluiten beter aan bij wat klanten daadwerkelijk nodig hebben, gemeten aan minder klachten en meer gebruik.',
    eigenaar: 'Programma-eigenaar',
    indicator: 'Klachten per 1000 klanten',
    meeteenheid: 'Aantal klachten',
    meetfrequentie: 'Maandelijks',
    nulmeting: { waarde: '45', datum: '2025-09', bron: 'Klachtenregistratie' },
    doel: { waarde: '20', datum: '2027-09' },
    perSector: {
      po: {
        nulmeting: '35',
        doel: '15',
        prioriteit: 'midden',
        eigenaar: 'Sectormanager PO',
        toelichting: 'Product-markt fit is redelijk, fine-tuning nodig'
      },
      vo: {
        nulmeting: '52',
        doel: '22',
        prioriteit: 'hoog',
        eigenaar: 'Sectormanager VO',
        toelichting: 'Veel klachten over examenproducten, aanpassing nodig'
      },
      professionals: {
        nulmeting: '60',
        doel: '25',
        prioriteit: 'kritiek',
        eigenaar: 'Sectormanager Zakelijk',
        toelichting: 'Mismatch tussen aanbod en zakelijke behoeften'
      }
    },
    tussenDoelen: [
      { waarde: '38', datum: '2026-03' },
      { waarde: '30', datum: '2026-09' },
      { waarde: '25', datum: '2027-03' }
    ],
    domeinen: {
      mens: { impact: 'hoog', toelichting: 'Klant begrijpen, behoeften identificeren' },
      proces: { impact: 'hoog', toelichting: 'Feedback verwerken in productontwikkeling' },
      systeem: { impact: 'midden', toelichting: 'Klantfeedback vastleggen en analyseren' },
      cultuur: { impact: 'hoog', toelichting: 'Klant centraal in besluitvorming' }
    },
    benodigd: [
      'Klantreisanalyses',
      'Voice of Customer programma',
      'Product feedback loops'
    ],
    risicos: ['Interne focus blijft domineren', 'Klantinput niet gehoord']
  },
  {
    id: 'bp4',
    baatId: 'b4',
    naam: 'Proactieve klantrelaties',
    formulering: 'Zelfstandig naamwoord + vergrotende trap',
    omschrijving: 'Medewerkers nemen het initiatief in klantcontact in plaats van alleen te reageren op vragen of klachten.',
    eigenaar: 'Alle sectormanagers (gezamenlijk)',
    indicator: 'Percentage proactieve contacten',
    meeteenheid: 'Percentage van alle contactmomenten',
    meetfrequentie: 'Maandelijks',
    nulmeting: { waarde: '20%', datum: '2025-09', bron: 'CRM contactregistratie' },
    doel: { waarde: '60%', datum: '2027-09' },
    perSector: {
      po: {
        nulmeting: '25%',
        doel: '65%',
        prioriteit: 'hoog',
        eigenaar: 'Sectormanager PO',
        toelichting: 'Al wat proactief, maar kan veel beter'
      },
      vo: {
        nulmeting: '18%',
        doel: '55%',
        prioriteit: 'hoog',
        eigenaar: 'Sectormanager VO',
        toelichting: 'Reactief gedrag dominant, cultuuromslag nodig'
      },
      professionals: {
        nulmeting: '15%',
        doel: '70%',
        prioriteit: 'kritiek',
        eigenaar: 'Sectormanager Zakelijk',
        toelichting: 'Zakelijke klanten verwachten proactief contact'
      }
    },
    tussenDoelen: [
      { waarde: '30%', datum: '2026-03' },
      { waarde: '40%', datum: '2026-09' },
      { waarde: '50%', datum: '2027-03' }
    ],
    domeinen: {
      mens: { impact: 'hoog', toelichting: 'Proactieve houding, initiatief nemen' },
      proces: { impact: 'hoog', toelichting: 'Contactmomenten plannen, triggers definiëren' },
      systeem: { impact: 'hoog', toelichting: 'Alerts, reminders, contacthistorie' },
      cultuur: { impact: 'midden', toelichting: 'Van reactief naar proactief' }
    },
    benodigd: [
      'Proactief contactplan per segment',
      'CRM alerts en triggers',
      'Training proactief klantcontact'
    ],
    risicos: ['Overbelasting door meer contactmomenten', 'Klanten ervaren spam']
  },
  {
    id: 'bp5',
    baatId: 'b5',
    naam: 'Efficiëntere interne samenwerking',
    formulering: 'Zelfstandig naamwoord + vergrotende trap',
    omschrijving: 'Sectoren en afdelingen werken beter samen rondom klanten, waardoor doorlooptijden korter worden en dubbel werk vermindert.',
    eigenaar: 'Programmamanager',
    indicator: 'Gemiddelde doorlooptijd klantvraag',
    meeteenheid: 'Dagen',
    meetfrequentie: 'Maandelijks',
    nulmeting: { waarde: '14 dagen', datum: '2025-09', bron: 'Procesmetingen' },
    doel: { waarde: '5 dagen', datum: '2027-09' },
    perSector: {
      po: {
        nulmeting: '10 dagen',
        doel: '4 dagen',
        prioriteit: 'midden',
        eigenaar: 'Sectormanager PO',
        toelichting: 'Redelijk efficiënt, optimalisatie mogelijk'
      },
      vo: {
        nulmeting: '16 dagen',
        doel: '6 dagen',
        prioriteit: 'hoog',
        eigenaar: 'Sectormanager VO',
        toelichting: 'Complexe vragen, veel handoffs tussen teams'
      },
      professionals: {
        nulmeting: '18 dagen',
        doel: '5 dagen',
        prioriteit: 'kritiek',
        eigenaar: 'Sectormanager Zakelijk',
        toelichting: 'Zakelijke klanten accepteren geen lange doorlooptijd'
      }
    },
    tussenDoelen: [
      { waarde: '11 dagen', datum: '2026-03' },
      { waarde: '8 dagen', datum: '2026-09' },
      { waarde: '6 dagen', datum: '2027-03' }
    ],
    domeinen: {
      mens: { impact: 'midden', toelichting: 'Samenwerken over grenzen, communicatie' },
      proces: { impact: 'hoog', toelichting: 'Overdrachtsprocessen, heldere routing' },
      systeem: { impact: 'midden', toelichting: 'Gedeelde systemen, workflow tools' },
      cultuur: { impact: 'hoog', toelichting: 'Sectoroverstijgend denken, gezamenlijke verantwoordelijkheid' }
    },
    benodigd: [
      'Sectoroverstijgende werkafspraken',
      'Shared service desk',
      'Workflow automatisering'
    ],
    risicos: ['Silo-denken blijft bestaan', 'Onduidelijke verantwoordelijkheden']
  },
  {
    id: 'bp6',
    baatId: 'b6',
    naam: 'Betrouwbaar integraal klantbeeld',
    formulering: 'Zelfstandig naamwoord + vergrotende trap',
    omschrijving: 'Eén betrouwbaar 360° klantbeeld in onze systemen, zodat elke medewerker de volledige klanthistorie kan zien.',
    eigenaar: 'Data & Tech manager',
    indicator: 'Datakwaliteit score',
    meeteenheid: 'Percentage complete en correcte klantrecords',
    meetfrequentie: 'Maandelijks',
    nulmeting: { waarde: '65%', datum: '2025-09', bron: 'Data quality assessment' },
    doel: { waarde: '95%', datum: '2027-09' },
    perSector: {
      po: {
        nulmeting: '70%',
        doel: '95%',
        prioriteit: 'midden',
        eigenaar: 'Data & Tech manager',
        toelichting: 'Beste datakwaliteit, standaard voor anderen'
      },
      vo: {
        nulmeting: '62%',
        doel: '95%',
        prioriteit: 'hoog',
        eigenaar: 'Data & Tech manager',
        toelichting: 'Veel legacy data, opschoning nodig'
      },
      professionals: {
        nulmeting: '55%',
        doel: '95%',
        prioriteit: 'kritiek',
        eigenaar: 'Data & Tech manager',
        toelichting: 'Zakelijke data verspreid, integratie urgent'
      }
    },
    tussenDoelen: [
      { waarde: '75%', datum: '2026-03' },
      { waarde: '85%', datum: '2026-09' },
      { waarde: '90%', datum: '2027-03' }
    ],
    domeinen: {
      mens: { impact: 'midden', toelichting: 'Data invoeren en gebruiken, discipline' },
      proces: { impact: 'midden', toelichting: 'Data-governance, kwaliteitscontrole' },
      systeem: { impact: 'hoog', toelichting: '360° klantview, integraties, master data' },
      cultuur: { impact: 'laag', toelichting: 'Data-gedreven werken accepteren' }
    },
    benodigd: [
      'Data governance framework',
      'CRM integratie project',
      'Data quality tooling'
    ],
    risicos: ['Legacy systemen moeilijk te integreren', 'Weerstand tegen data invoer']
  }
]

// ==================== DOMEIN DIAGNOSE ====================
export const domeinDiagnose = {
  mens: {
    id: 'mens',
    naam: 'Mens',
    kleur: '#3b82f6',
    icon: 'Users',
    vraag: 'Wat moeten medewerkers KUNNEN om de baten te realiseren?',
    huidigeKnelpunten: [
      { id: 'm1', beschrijving: 'Onvoldoende vaardig in outside-in denken', ernst: 'hoog' },
      { id: 'm2', beschrijving: 'Geen structuur in verdiepend doorvragen', ernst: 'hoog' },
      { id: 'm3', beschrijving: 'Moeite met vertalen klantdata naar keuzes', ernst: 'midden' },
      { id: 'm4', beschrijving: 'Rolonduidelijkheid, weinig oefenruimte', ernst: 'midden' },
      { id: 'm5', beschrijving: 'Beperkte kennis van klantreismethodes', ernst: 'midden' }
    ],
    gewensteSituatie: [
      'Medewerkers denken vanuit klantperspectief',
      'Vaardigheden om klantgesprekken te voeren',
      'Kunnen klantdata interpreteren en toepassen',
      'Duidelijke rollen en verantwoordelijkheden'
    ],
    inspanningTypes: ['leer', 'training', 'coaching']
  },
  proces: {
    id: 'proces',
    naam: 'Proces',
    kleur: '#10b981',
    icon: 'GitBranch',
    vraag: 'Welke processen moeten ANDERS om de baten te realiseren?',
    huidigeKnelpunten: [
      { id: 'p1', beschrijving: 'Geen uniform klantproces', ernst: 'hoog' },
      { id: 'p2', beschrijving: 'Versnipperde vastlegging klantinzichten', ernst: 'hoog' },
      { id: 'p3', beschrijving: 'Overdrachtsmomenten niet belegd', ernst: 'midden' },
      { id: 'p4', beschrijving: 'Geen borging eerdere initiatieven', ernst: 'midden' },
      { id: 'p5', beschrijving: 'Feedback loops ontbreken', ernst: 'midden' }
    ],
    gewensteSituatie: [
      'Eenduidig klantproces voor alle sectoren',
      'Gestructureerde vastlegging van klantinzichten',
      'Heldere overdrachten tussen afdelingen',
      'Borging van verbeteringen in werkwijze'
    ],
    inspanningTypes: ['proces', 'werkafspraken', 'procedures']
  },
  systeem: {
    id: 'systeem',
    naam: 'Systeem',
    kleur: '#8b5cf6',
    icon: 'Database',
    vraag: 'Welke systemen moeten ANDERS om de baten te realiseren?',
    huidigeKnelpunten: [
      { id: 's1', beschrijving: 'Klantinformatie verspreid over systemen', ernst: 'hoog' },
      { id: 's2', beschrijving: 'CRM sluit niet aan op werkwijze', ernst: 'hoog' },
      { id: 's3', beschrijving: 'Datakwaliteit onvoldoende', ernst: 'midden' },
      { id: 's4', beschrijving: 'Geen integraal 360° klantbeeld', ernst: 'hoog' },
      { id: 's5', beschrijving: 'Ontbreken van alerts en triggers', ernst: 'midden' }
    ],
    gewensteSituatie: [
      'Eén integraal klantbeeld (360°)',
      'CRM ondersteunt de gewenste werkwijze',
      'Hoge datakwaliteit en governance',
      'Proactieve alerts en signalering'
    ],
    inspanningTypes: ['systeem', 'data', 'integratie']
  },
  cultuur: {
    id: 'cultuur',
    naam: 'Cultuur',
    kleur: '#f59e0b',
    icon: 'Heart',
    vraag: 'Wat moet er ANDERS in gedrag en mindset om de baten te realiseren?',
    huidigeKnelpunten: [
      { id: 'c1', beschrijving: 'Productgerichte reflex dominant', ernst: 'hoog' },
      { id: 'c2', beschrijving: 'Versnipperd eigenaarschap klantrelatie', ernst: 'hoog' },
      { id: 'c3', beschrijving: 'Sectoroverstijgende samenwerking kost energie', ernst: 'midden' },
      { id: 'c4', beschrijving: 'Afwachtend gedrag, successen niet gedeeld', ernst: 'midden' },
      { id: 'c5', beschrijving: 'Inside-out denken als default', ernst: 'hoog' }
    ],
    gewensteSituatie: [
      'Outside-in mindset als default',
      'Gedeeld eigenaarschap voor klantrelaties',
      'Natuurlijke sectoroverstijgende samenwerking',
      'Proactief gedrag en delen van successen'
    ],
    inspanningTypes: ['cultuur', 'gedrag', 'communicatie']
  }
}

// ==================== PROGRAMMA VS LIJN CHECKLIST ====================
export const programmaLijnChecklist = [
  {
    id: 'pl1',
    vraag: 'Is het iets NIEUWS dat ontwikkeld moet worden?',
    programma: true,
    lijn: false,
    toelichting: 'Nieuwe werkwijzen, tools, of processen worden door het programma ontwikkeld'
  },
  {
    id: 'pl2',
    vraag: 'Raakt het meerdere afdelingen/sectoren?',
    programma: true,
    lijn: false,
    toelichting: 'Sectoroverstijgende initiatieven vragen programma-coördinatie'
  },
  {
    id: 'pl3',
    vraag: 'Is het een strategische verandering?',
    programma: true,
    lijn: false,
    toelichting: 'Strategische veranderingen horen bij het programma'
  },
  {
    id: 'pl4',
    vraag: 'Is expertise van buitenaf nodig?',
    programma: true,
    lijn: false,
    toelichting: 'Externe expertise wordt via het programma ingeschakeld'
  },
  {
    id: 'pl5',
    vraag: 'Moet het gepiloteerd worden?',
    programma: true,
    lijn: false,
    toelichting: 'Pilots en experimenten vallen onder het programma'
  },
  {
    id: 'pl6',
    vraag: 'Is het dagelijkse uitvoering van bestaand werk?',
    programma: false,
    lijn: true,
    toelichting: 'Reguliere uitvoering hoort bij de lijn'
  },
  {
    id: 'pl7',
    vraag: 'Is het continu verbeteren van bestaande processen?',
    programma: false,
    lijn: true,
    toelichting: 'Continue verbetering is een lijnverantwoordelijkheid'
  },
  {
    id: 'pl8',
    vraag: 'Valt het onder reguliere aansturing manager?',
    programma: false,
    lijn: true,
    toelichting: 'Als een manager het kan aansturen, is het lijn'
  }
]

// ==================== BATEN × DOMEINEN MATRIX ====================
export const batenDomeinenMatrix = batenProfielen.map(bp => ({
  baat: bp.naam,
  indicator: bp.indicator,
  eigenaar: bp.eigenaar,
  domeinen: bp.domeinen
}))

// ==================== HELPERS ====================
export function getSectorById(id) {
  return sectoren.find(s => s.id === id)
}

export function getWerkfaseById(id) {
  return werkfases.find(f => f.id === id)
}

export function getToolsVoorWerkfase(werkfaseId) {
  const werkfase = getWerkfaseById(werkfaseId)
  if (!werkfase) return []
  return toolkit.filter(t => werkfase.tools.includes(t.id))
}

export function getDocumentenVoorCyclus(cyclusId) {
  return documentenRegister.filter(d => d.cyclus === cyclusId)
}

export function getDocumentenVoorThema(themaId) {
  return documentenRegister.filter(d => d.thema === themaId)
}

export function getKernprincipeById(id) {
  return kernprincipes.find(k => k.id === id)
}

export function getBatenProfielById(id) {
  return batenProfielen.find(b => b.id === id || b.baatId === id)
}

export function getBatenProfielByNaam(naam) {
  return batenProfielen.find(b => b.naam.toLowerCase().includes(naam.toLowerCase()))
}

export function getDomeinDiagnose(domeinId) {
  return domeinDiagnose[domeinId]
}

export function getKnelpuntenVoorDomein(domeinId) {
  const diagnose = domeinDiagnose[domeinId]
  return diagnose ? diagnose.huidigeKnelpunten : []
}

export function getBatenVoorDomein(domeinId) {
  return batenProfielen.filter(bp =>
    bp.domeinen[domeinId]?.impact === 'hoog'
  )
}

export function isProgrammaActiviteit(checklistItems) {
  // Returns true if more programma items are checked than lijn items
  const programmaCount = checklistItems.filter(item => item.programma && item.checked).length
  const lijnCount = checklistItems.filter(item => item.lijn && item.checked).length
  return programmaCount > lijnCount
}
