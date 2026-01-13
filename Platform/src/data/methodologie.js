/**
 * Methodologie: Werken aan Programma's
 * Bron: Björn Prevaas & Niels van Loon
 *
 * Structuur:
 * - 4 Levensloopcycli (VERKENNEN → OPBOUWEN → UITVOEREN → AFBOUWEN)
 * - 8 Thema's (doorlopend door alle cycli)
 * - Activiteiten per thema per cyclus
 * - Deliverables/documenten per activiteit
 */

// De 4 Levensloopcycli
export const levensloopcycli = [
  {
    id: 'verkennen',
    nummer: 1,
    naam: 'Verkennen',
    beschrijving: 'Kiezen om de opgave wel of niet aan te pakken als programma',
    duur: 'Weken tot maanden',
    kernvraag: 'Is dit echt een programma?',
    goNogo: 'Sponsorgroep keurt programmavoorstel goed → Start Opbouw',
    resultaten: [
      'Initiële visie op de opgave',
      'Programmavoorstel',
      'Initiële businesscase',
      'Opbouwplan',
      'Go/No-go beslissing'
    ]
  },
  {
    id: 'opbouwen',
    nummer: 2,
    naam: 'Opbouwen',
    beschrijving: 'Programma concreet inrichten zodat betrokkenen zich eraan verbinden',
    duur: 'Maanden',
    kernvraag: 'Hoe gaan we dit doen?',
    goNogo: 'Eigenaar keurt programmaplan goed → Start Uitvoering',
    resultaten: [
      'Programmaplan',
      'Businesscase (uitgewerkt)',
      'Eerste cyclusplan',
      'Go/No-go op uitvoering'
    ]
  },
  {
    id: 'uitvoeren',
    nummer: 3,
    naam: 'Uitvoeren',
    beschrijving: 'Realiseren van inspanningen, vermogens en baten',
    duur: 'Jaren (in cycli van 6-9 maanden)',
    kernvraag: 'Hoe houden we koers?',
    goNogo: 'Einde cyclus: balans, reflectie, GO volgende cyclus of afbouw',
    resultaten: [
      'Cyclusplannen',
      'Voortgangsrapportages',
      'Bijstellingen',
      'Gerealiseerde baten'
    ]
  },
  {
    id: 'afbouwen',
    nummer: 4,
    naam: 'Afbouwen',
    beschrijving: 'Zorgvuldig afronden, borging van opbrengsten',
    duur: 'Maanden',
    kernvraag: 'Zijn baten bereikt? Is organisatie klaar voor overdracht?',
    goNogo: 'Sponsorgroep keurt afbouwplan goed → Afsluiting',
    resultaten: [
      'Programmareview',
      'Afbouwplan',
      'Afrondingsdocument',
      'Dechargedocument'
    ]
  }
]

// De 8 Thema's
export const themas = [
  {
    id: 'kiezen',
    nummer: 1,
    naam: 'Kiezen',
    subtitel: 'Wel of niet programmatisch?',
    beschrijving: 'Bepalen of de opgave geschikt is voor programma-aanpak',
    kleur: '#3b82f6', // blue
    icon: 'CheckSquare',
    hoofdstukken: ['H1-H6'],
    kernvragen: [
      'Wat is de aard van de opgave?',
      'Zijn er meerdere afhankelijke baten?',
      'Zijn er meerdere organisatieonderdelen betrokken?',
      'Is dit meerjarig en strategisch?'
    ]
  },
  {
    id: 'vormgeven',
    nummer: 2,
    naam: 'Vormgeven',
    subtitel: 'Visie, doelen, strategie',
    beschrijving: 'Het programma inhoudelijk vormgeven met visie en doelen',
    kleur: '#8b5cf6', // purple
    icon: 'Lightbulb',
    hoofdstukken: ['H7-H12'],
    kernvragen: [
      'Wat is de visie en ambitie?',
      'Welke baten willen we realiseren?',
      'Wat is de strategie/routekaart?',
      'Wat is de businesscase?'
    ]
  },
  {
    id: 'organiseren',
    nummer: 3,
    naam: 'Organiseren',
    subtitel: 'Rollen, structuur, teams',
    beschrijving: 'De organisatiestructuur en rollen inrichten',
    kleur: '#ec4899', // pink
    icon: 'Users',
    hoofdstukken: ['H13-H16'],
    kernvragen: [
      'Wie is programma-eigenaar?',
      'Wie zijn de bateneigenaren?',
      'Hoe organiseren we de inspanningen?',
      'Wat is de governance-structuur?'
    ]
  },
  {
    id: 'sturen',
    nummer: 4,
    naam: 'Sturen',
    subtitel: 'Plannen, monitoren, bijsturen',
    beschrijving: 'Het programma op koers houden door sturing',
    kleur: '#f59e0b', // amber
    icon: 'Compass',
    hoofdstukken: ['H17-H22'],
    kernvragen: [
      'Hoe monitoren we voortgang?',
      'Welke stuurparameters gebruiken we?',
      'Hoe rapporteren we?',
      'Wanneer en hoe sturen we bij?'
    ]
  },
  {
    id: 'beslissen',
    nummer: 5,
    naam: 'Beslissen',
    subtitel: 'Wie beslist wat?',
    beschrijving: 'Besluitvormingsstructuur en -processen',
    kleur: '#ef4444', // red
    icon: 'Scale',
    hoofdstukken: ['H23-H25'],
    kernvragen: [
      'Wie beslist over wat?',
      'Hoe nemen we besluiten?',
      'Hoe leggen we besluiten vast?',
      'Wat zijn de Go/No-Go momenten?'
    ]
  },
  {
    id: 'samenwerken',
    nummer: 6,
    naam: 'Samenwerken',
    subtitel: 'Stakeholders, communicatie',
    beschrijving: 'Effectief samenwerken met alle betrokkenen',
    kleur: '#10b981', // emerald
    icon: 'Handshake',
    hoofdstukken: ['H26-H29'],
    kernvragen: [
      'Wie zijn de stakeholders?',
      'Hoe managen we verwachtingen?',
      'Hoe communiceren we?',
      'Hoe gaan we om met weerstand?'
    ]
  },
  {
    id: 'leiden',
    nummer: 7,
    naam: 'Leiden',
    subtitel: 'Leiderschap, eigenaarschap',
    beschrijving: 'Leiderschap tonen en eigenaarschap stimuleren',
    kleur: '#6366f1', // indigo
    icon: 'Crown',
    hoofdstukken: ['H30-H32'],
    kernvragen: [
      'Welk leiderschap is nodig?',
      'Hoe stimuleren we eigenaarschap?',
      'Hoe gaan we om met macht?',
      'Hoe bouwen we vertrouwen?'
    ]
  },
  {
    id: 'ontwikkelen',
    nummer: 8,
    naam: 'Ontwikkelen',
    subtitel: 'Leren, verbeteren',
    beschrijving: 'Continu leren en verbeteren als programma',
    kleur: '#14b8a6', // teal
    icon: 'TrendingUp',
    hoofdstukken: ['H33-H35'],
    kernvragen: [
      'Hoe organiseren we leren?',
      'Welke reflectiemomenten plannen we?',
      'Hoe verbeteren we onze aanpak?',
      'Hoe borgen we kennis?'
    ]
  }
]

// Activiteiten per Thema per Cyclus
export const activiteiten = [
  // THEMA 1: KIEZEN
  // Verkennen
  {
    id: 'k-v-1',
    themaId: 'kiezen',
    cyclusId: 'verkennen',
    naam: 'Opgave verkennen',
    beschrijving: 'Analyseer de huidige situatie en het vraagstuk',
    volgorde: 1,
    deliverables: ['Probleemanalyse', 'Contextbeschrijving'],
    checklistItems: [
      'Huidige situatie beschreven',
      'Urgentie en belang bepaald',
      'Scope afgebakend'
    ]
  },
  {
    id: 'k-v-2',
    themaId: 'kiezen',
    cyclusId: 'verkennen',
    naam: 'Programma-criteria toetsen',
    beschrijving: 'Bepaal of dit een programma-aanpak vereist',
    volgorde: 2,
    deliverables: ['Toetsing 6 criteria', 'Advies werkwijze'],
    checklistItems: [
      'Meerdere baten geïdentificeerd',
      'Meerdere organisatieonderdelen betrokken',
      'Afhankelijkheden in kaart',
      'Meerjarig en strategisch bevestigd'
    ]
  },
  {
    id: 'k-v-3',
    themaId: 'kiezen',
    cyclusId: 'verkennen',
    naam: 'Programmavoorstel opstellen',
    beschrijving: 'Stel het programmavoorstel op voor besluitvorming',
    volgorde: 3,
    deliverables: ['Programmavoorstel'],
    checklistItems: [
      'Visie en ambitie beschreven',
      'Globale scope en aanpak',
      'Eerste inschatting middelen',
      'Voorstel governance'
    ]
  },
  {
    id: 'k-v-4',
    themaId: 'kiezen',
    cyclusId: 'verkennen',
    naam: 'Go/No-Go Verkenning',
    beschrijving: 'Verkrijg besluit van sponsorgroep om door te gaan',
    volgorde: 4,
    deliverables: ['Go/No-Go besluit', 'Opbouwopdracht'],
    checklistItems: [
      'Sponsorgroep geïnformeerd',
      'Besluit genomen en vastgelegd',
      'Opbouwopdracht verstrekt (bij GO)'
    ],
    isGoNogo: true
  },

  // THEMA 2: VORMGEVEN
  // Verkennen
  {
    id: 'v-v-1',
    themaId: 'vormgeven',
    cyclusId: 'verkennen',
    naam: 'Initiële visie ontwikkelen',
    beschrijving: 'Formuleer een eerste visie op de gewenste situatie',
    volgorde: 1,
    deliverables: ['Visieschets'],
    checklistItems: [
      'Gewenste eindsituatie beschreven',
      'Kernwaarden geïdentificeerd'
    ]
  },
  {
    id: 'v-v-2',
    themaId: 'vormgeven',
    cyclusId: 'verkennen',
    naam: 'Globale baten identificeren',
    beschrijving: 'Identificeer de belangrijkste baten op hoofdlijnen',
    volgorde: 2,
    deliverables: ['Initiële batenlijst'],
    checklistItems: [
      'Hoofdbaten geïdentificeerd',
      'Per domein bekeken (MPSC)'
    ]
  },

  // Opbouwen
  {
    id: 'v-o-1',
    themaId: 'vormgeven',
    cyclusId: 'opbouwen',
    naam: 'Visie en ambitie uitwerken',
    beschrijving: 'Werk de visie uit tot een gedragen ambitie',
    volgorde: 1,
    deliverables: ['Visiedocument', 'Ambitiebeschrijving'],
    checklistItems: [
      'Visie uitgewerkt en gevalideerd',
      'Ambitie SMART geformuleerd',
      'Draagvlak bij stakeholders'
    ]
  },
  {
    id: 'v-o-2',
    themaId: 'vormgeven',
    cyclusId: 'opbouwen',
    naam: 'Batenstructuur opstellen',
    beschrijving: 'Maak de volledige batenstructuur met indicatoren',
    volgorde: 2,
    deliverables: ['Batenstructuur', 'KPI-definities'],
    checklistItems: [
      'Domeinbaten gedefinieerd',
      'Sectorbaten gedefinieerd',
      'Indicatoren en doelwaarden vastgesteld',
      'Bateneigenaren toegewezen'
    ]
  },
  {
    id: 'v-o-3',
    themaId: 'vormgeven',
    cyclusId: 'opbouwen',
    naam: 'Businesscase uitwerken',
    beschrijving: 'Maak de businesscase met kosten en baten',
    volgorde: 3,
    deliverables: ['Businesscase'],
    checklistItems: [
      'Kosten geschat',
      'Baten gekwantificeerd',
      'Terugverdientijd berekend',
      'Risicos geïdentificeerd'
    ]
  },
  {
    id: 'v-o-4',
    themaId: 'vormgeven',
    cyclusId: 'opbouwen',
    naam: 'Routekaart ontwikkelen',
    beschrijving: 'Stel de meerjarige routekaart op',
    volgorde: 4,
    deliverables: ['Routekaart/Roadmap'],
    checklistItems: [
      'Fases gedefinieerd',
      'Mijlpalen bepaald',
      'Afhankelijkheden in kaart'
    ]
  },
  {
    id: 'v-o-5',
    themaId: 'vormgeven',
    cyclusId: 'opbouwen',
    naam: 'Programmaplan afronden',
    beschrijving: 'Consolideer alles in het programmaplan',
    volgorde: 5,
    deliverables: ['Programmaplan'],
    checklistItems: [
      'Alle onderdelen geïntegreerd',
      'Review uitgevoerd',
      'Goedkeuring verkregen'
    ]
  },

  // THEMA 3: ORGANISEREN
  // Verkennen
  {
    id: 'o-v-1',
    themaId: 'organiseren',
    cyclusId: 'verkennen',
    naam: 'Kernrollen identificeren',
    beschrijving: 'Bepaal wie eigenaar en manager worden',
    volgorde: 1,
    deliverables: ['Rolbeschrijving PE en PM'],
    checklistItems: [
      'Programma-eigenaar geïdentificeerd',
      'Programmamanager geïdentificeerd'
    ]
  },

  // Opbouwen
  {
    id: 'o-o-1',
    themaId: 'organiseren',
    cyclusId: 'opbouwen',
    naam: 'Governance-structuur ontwerpen',
    beschrijving: 'Ontwerp de volledige governance-structuur',
    volgorde: 1,
    deliverables: ['Governance-schema', 'Organigram'],
    checklistItems: [
      'Sponsorgroep samengesteld',
      'Bateneigenaren benoemd',
      'Overlegstructuur bepaald'
    ]
  },
  {
    id: 'o-o-2',
    themaId: 'organiseren',
    cyclusId: 'opbouwen',
    naam: 'Inspanningen definiëren',
    beschrijving: 'Definieer alle inspanningen (projecten, processen, etc.)',
    volgorde: 2,
    deliverables: ['Inspanningsoverzicht'],
    checklistItems: [
      'Projecten gedefinieerd',
      'Procesinspanningen gedefinieerd',
      'Leertrajecten gedefinieerd',
      'Systeemtrajecten gedefinieerd',
      'Inspanningsleiders toegewezen'
    ]
  },
  {
    id: 'o-o-3',
    themaId: 'organiseren',
    cyclusId: 'opbouwen',
    naam: 'RACI-matrix opstellen',
    beschrijving: 'Maak de RACI-matrix voor alle beslissingen',
    volgorde: 3,
    deliverables: ['RACI-matrix'],
    checklistItems: [
      'Activiteiten/beslissingen geïdentificeerd',
      'RACI per activiteit bepaald',
      'Gevalideerd met betrokkenen'
    ]
  },

  // THEMA 4: STUREN
  // Opbouwen
  {
    id: 's-o-1',
    themaId: 'sturen',
    cyclusId: 'opbouwen',
    naam: 'Stuurparameters bepalen',
    beschrijving: 'Bepaal de 5 stuurparameters en hoe te meten',
    volgorde: 1,
    deliverables: ['Stuurparameters-definitie'],
    checklistItems: [
      'Doeltreffendheid gedefinieerd',
      'Tempo gedefinieerd',
      'Haalbaarheid gedefinieerd',
      'Wendbaarheid gedefinieerd',
      'Efficiëntie gedefinieerd'
    ]
  },
  {
    id: 's-o-2',
    themaId: 'sturen',
    cyclusId: 'opbouwen',
    naam: 'Dashboard ontwerpen',
    beschrijving: 'Ontwerp het stuurdashboard',
    volgorde: 2,
    deliverables: ['Dashboard-ontwerp'],
    checklistItems: [
      'KPIs geselecteerd',
      'Stuurlampen gedefinieerd',
      'Rapportageformat bepaald'
    ]
  },
  {
    id: 's-o-3',
    themaId: 'sturen',
    cyclusId: 'opbouwen',
    naam: 'Eerste cyclusplan maken',
    beschrijving: 'Maak het plan voor de eerste uitvoeringscyclus',
    volgorde: 3,
    deliverables: ['Cyclusplan 1'],
    checklistItems: [
      'Doelen cyclus 1 bepaald',
      'Inspanningen gepland',
      'Resources toegewezen',
      'Mijlpalen vastgesteld'
    ]
  },

  // Uitvoeren
  {
    id: 's-u-1',
    themaId: 'sturen',
    cyclusId: 'uitvoeren',
    naam: 'Voortgang monitoren',
    beschrijving: 'Monitor de voortgang op alle parameters',
    volgorde: 1,
    deliverables: ['Voortgangsrapportage'],
    checklistItems: [
      'Data verzameld',
      'Stuurlampen bijgewerkt',
      'Afwijkingen geanalyseerd'
    ],
    isCyclisch: true
  },
  {
    id: 's-u-2',
    themaId: 'sturen',
    cyclusId: 'uitvoeren',
    naam: 'Bijsturen waar nodig',
    beschrijving: 'Neem bijsturingsmaatregelen',
    volgorde: 2,
    deliverables: ['Bijsturingsacties'],
    checklistItems: [
      'Oorzaken geanalyseerd',
      'Maatregelen bepaald',
      'Acties uitgezet'
    ],
    isCyclisch: true
  },
  {
    id: 's-u-3',
    themaId: 'sturen',
    cyclusId: 'uitvoeren',
    naam: 'Cyclus-evaluatie uitvoeren',
    beschrijving: 'Evalueer de afgelopen cyclus',
    volgorde: 3,
    deliverables: ['Cyclus-evaluatie', 'Volgend cyclusplan'],
    checklistItems: [
      'Resultaten geëvalueerd',
      'Lessen geleerd',
      'Volgende cyclus gepland'
    ],
    isCyclisch: true,
    isGoNogo: true
  },

  // THEMA 5: BESLISSEN
  // Opbouwen
  {
    id: 'b-o-1',
    themaId: 'beslissen',
    cyclusId: 'opbouwen',
    naam: 'Besluitvormingsstructuur ontwerpen',
    beschrijving: 'Bepaal wie over wat beslist',
    volgorde: 1,
    deliverables: ['Besluitvormingsmatrix'],
    checklistItems: [
      'Besluiten geïnventariseerd',
      'Beslissers per type bepaald',
      'Escalatiepad vastgesteld'
    ]
  },
  {
    id: 'b-o-2',
    themaId: 'beslissen',
    cyclusId: 'opbouwen',
    naam: 'Go/No-Go momenten plannen',
    beschrijving: 'Plan alle Go/No-Go momenten',
    volgorde: 2,
    deliverables: ['Go/No-Go kalender'],
    checklistItems: [
      'Momenten geïdentificeerd',
      'Criteria per moment bepaald',
      'In planning opgenomen'
    ]
  },
  {
    id: 'b-o-3',
    themaId: 'beslissen',
    cyclusId: 'opbouwen',
    naam: 'Go/No-Go Opbouw',
    beschrijving: 'Verkrijg besluit om te starten met uitvoering',
    volgorde: 3,
    deliverables: ['Go/No-Go besluit uitvoering'],
    checklistItems: [
      'Programmaplan gepresenteerd',
      'Businesscase goedgekeurd',
      'Resources vrijgemaakt',
      'Besluit vastgelegd'
    ],
    isGoNogo: true
  },

  // THEMA 6: SAMENWERKEN
  // Opbouwen
  {
    id: 'sw-o-1',
    themaId: 'samenwerken',
    cyclusId: 'opbouwen',
    naam: 'Stakeholderanalyse uitvoeren',
    beschrijving: 'Breng alle stakeholders in kaart',
    volgorde: 1,
    deliverables: ['Stakeholderanalyse', 'Stakeholdermatrix'],
    checklistItems: [
      'Stakeholders geïdentificeerd',
      'Belangen in kaart gebracht',
      'Invloed en houding bepaald'
    ]
  },
  {
    id: 'sw-o-2',
    themaId: 'samenwerken',
    cyclusId: 'opbouwen',
    naam: 'Communicatieplan opstellen',
    beschrijving: 'Maak het communicatieplan',
    volgorde: 2,
    deliverables: ['Communicatieplan'],
    checklistItems: [
      'Doelgroepen bepaald',
      'Boodschappen geformuleerd',
      'Kanalen gekozen',
      'Frequentie bepaald'
    ]
  },

  // THEMA 7: LEIDEN
  // Opbouwen
  {
    id: 'l-o-1',
    themaId: 'leiden',
    cyclusId: 'opbouwen',
    naam: 'Leiderschapsstijl bepalen',
    beschrijving: 'Bepaal welk leiderschap nodig is',
    volgorde: 1,
    deliverables: ['Leiderschapsvisie'],
    checklistItems: [
      'Situatie geanalyseerd',
      'Stijl gekozen',
      'Afspraken gemaakt'
    ]
  },

  // THEMA 8: ONTWIKKELEN
  // Opbouwen
  {
    id: 'on-o-1',
    themaId: 'ontwikkelen',
    cyclusId: 'opbouwen',
    naam: 'Leerplan opstellen',
    beschrijving: 'Plan de leermomenten en reflecties',
    volgorde: 1,
    deliverables: ['Leerplan'],
    checklistItems: [
      'Reflectiemomenten gepland',
      'Leervragen geformuleerd',
      'Kennisborging bepaald'
    ]
  },

  // Uitvoeren
  {
    id: 'on-u-1',
    themaId: 'ontwikkelen',
    cyclusId: 'uitvoeren',
    naam: 'Reflectiesessies uitvoeren',
    beschrijving: 'Voer geplande reflecties uit',
    volgorde: 1,
    deliverables: ['Reflectieverslag'],
    checklistItems: [
      'Sessie voorbereid',
      'Sessie uitgevoerd',
      'Lessen vastgelegd'
    ],
    isCyclisch: true
  },

  // AFBOUWEN - voor alle relevante thema's
  {
    id: 'af-1',
    themaId: 'sturen',
    cyclusId: 'afbouwen',
    naam: 'Eindmeting uitvoeren',
    beschrijving: 'Voer de eindmeting van alle KPIs uit',
    volgorde: 1,
    deliverables: ['Eindmeting KPIs'],
    checklistItems: [
      'Alle KPIs gemeten',
      'Vergeleken met doelwaarden',
      'Analyse opgesteld'
    ]
  },
  {
    id: 'af-2',
    themaId: 'vormgeven',
    cyclusId: 'afbouwen',
    naam: 'Batenrealisatie evalueren',
    beschrijving: 'Evalueer welke baten zijn gerealiseerd',
    volgorde: 2,
    deliverables: ['Batenevaluatie'],
    checklistItems: [
      'Per baat geëvalueerd',
      'Realisatiegraad bepaald',
      'Resterende acties geïdentificeerd'
    ]
  },
  {
    id: 'af-3',
    themaId: 'organiseren',
    cyclusId: 'afbouwen',
    naam: 'Overdracht organiseren',
    beschrijving: 'Organiseer overdracht naar de lijn',
    volgorde: 3,
    deliverables: ['Overdrachtsplan', 'Overdrachtsdocument'],
    checklistItems: [
      'Ontvanger bepaald',
      'Kennisoverdracht gepland',
      'Documentatie compleet'
    ]
  },
  {
    id: 'af-4',
    themaId: 'beslissen',
    cyclusId: 'afbouwen',
    naam: 'Programma afsluiten',
    beschrijving: 'Formele afsluiting en decharge',
    volgorde: 4,
    deliverables: ['Afrondingsdocument', 'Dechargedocument'],
    checklistItems: [
      'Eindevaluatie uitgevoerd',
      'Lessen gedocumenteerd',
      'Decharge verleend'
    ],
    isGoNogo: true
  }
]

// Documenten/Templates per type
// Elk document heeft optioneel een templateBestand dat verwijst naar de beschikbare Word/Excel template
export const documentTemplates = [
  // ==================== VERKENNEN ====================
  {
    id: 'doc-1',
    naam: 'Verkenningsopdracht',
    cyclusId: 'verkennen',
    themaId: 'kiezen',
    verplicht: true,
    beschrijving: 'Document waarmee het verkenningsstadium officieel start',
    templateBestand: '20240517-Werken-aan-Programmas-Template-verkenningsopdracht.docx'
  },
  {
    id: 'doc-2',
    naam: 'Programmavoorstel',
    cyclusId: 'verkennen',
    themaId: 'kiezen',
    verplicht: true,
    beschrijving: 'Eerste beeld van opgave, visie en globale aanpak',
    templateBestand: '20240517-Werken-aan-Programmas-Template-programmavoorstel.docx'
  },
  {
    id: 'doc-3',
    naam: 'Visiedocument',
    cyclusId: 'verkennen',
    themaId: 'vormgeven',
    verplicht: true,
    beschrijving: 'Gedragen visie met verleden, heden, beweeg-redenen en toekomst',
    templateBestand: '20240521-Werken-aan-Programmas-Template-visiestatement.docx'
  },
  {
    id: 'doc-4',
    naam: 'Initiële Businesscase',
    cyclusId: 'verkennen',
    themaId: 'vormgeven',
    verplicht: true,
    beschrijving: 'Eerste inschatting van kosten, baten en haalbaarheid',
    templateBestand: '20240517-Werken-aan-Programmas-Template-business-case.docx'
  },
  {
    id: 'doc-5',
    naam: 'Opbouwopdracht',
    cyclusId: 'verkennen',
    themaId: 'kiezen',
    verplicht: true,
    beschrijving: 'Goedkeuring om door te gaan naar opbouwstadium',
    templateBestand: '20240517-Werken-aan-Programmas-Template-opbouwplan.docx'
  },

  // ==================== OPBOUWEN ====================
  {
    id: 'doc-6',
    naam: 'Programmaplan',
    cyclusId: 'opbouwen',
    themaId: 'vormgeven',
    verplicht: true,
    beschrijving: 'Volledig uitgewerkt plan voor het programma',
    templateBestand: '20250422-Werken-aan-Programmas-Template-programmaplan.docx'
  },
  {
    id: 'doc-7',
    naam: 'Businesscase (uitgewerkt)',
    cyclusId: 'opbouwen',
    themaId: 'vormgeven',
    verplicht: true,
    beschrijving: 'Volledige kosten-batenanalyse en zakelijke rechtvaardiging',
    templateBestand: '20240517-Werken-aan-Programmas-Template-business-case.docx'
  },
  {
    id: 'doc-8',
    naam: 'Doelen-Inspanningennetwerk (DIN)',
    cyclusId: 'opbouwen',
    themaId: 'vormgeven',
    verplicht: true,
    beschrijving: 'Visualisatie samenhang tussen visie, doelen, baten, vermogens en inspanningen',
    templateBestand: 'KiB-Template-doelen-inspanningennetwerk.md'
  },
  {
    id: 'doc-9',
    naam: 'Beschrijving Vermogens',
    cyclusId: 'opbouwen',
    themaId: 'vormgeven',
    verplicht: true,
    beschrijving: 'Uitwerking van de te ontwikkelen capabilities',
    templateBestand: '20240517-Werken-aan-Programmas-Template-beschrijving-vermogens.docx'
  },
  {
    id: 'doc-10',
    naam: 'Batenstructuur',
    cyclusId: 'opbouwen',
    themaId: 'vormgeven',
    verplicht: true,
    beschrijving: 'Overzicht van alle baten met indicatoren en eigenaren',
    templateBestand: '20240517-Werken-aan-Programmas-Template-batenprofiel.docx'
  },
  {
    id: 'doc-11',
    naam: 'Batenrealisatieplan',
    cyclusId: 'opbouwen',
    themaId: 'sturen',
    verplicht: true,
    beschrijving: 'Planning wanneer welke baten tot welk niveau gerealiseerd worden',
    templateBestand: 'KiB-Template-batenrealisatieplan.md'
  },
  {
    id: 'doc-12',
    naam: 'Routekaart/Roadmap',
    cyclusId: 'opbouwen',
    themaId: 'vormgeven',
    verplicht: true,
    beschrijving: 'Meerjarige planning met plateaus en mijlpalen',
    templateBestand: 'KiB-Template-routekaart-roadmap.md'
  },
  {
    id: 'doc-13',
    naam: 'Governance-schema',
    cyclusId: 'opbouwen',
    themaId: 'organiseren',
    verplicht: true,
    beschrijving: 'Organigram met rollen, verantwoordelijkheden en overlegstructuur',
    templateBestand: 'KiB-Template-governance-schema.md'
  },
  {
    id: 'doc-14',
    naam: 'Inspanningsoverzicht',
    cyclusId: 'opbouwen',
    themaId: 'organiseren',
    verplicht: true,
    beschrijving: 'Overzicht van alle projecten, processen en andere inspanningen',
    templateBestand: 'KiB-Template-inspanningsoverzicht.md'
  },
  {
    id: 'doc-15',
    naam: 'Projectplan',
    cyclusId: 'opbouwen',
    themaId: 'organiseren',
    verplicht: false,
    beschrijving: 'Plan per individueel project binnen het programma',
    templateBestand: '20240524-Werken-aan-Programmas-Template-projectplan.docx'
  },
  {
    id: 'doc-16',
    naam: 'RACI-matrix',
    cyclusId: 'opbouwen',
    themaId: 'organiseren',
    verplicht: true,
    beschrijving: 'Wie is Responsible, Accountable, Consulted, Informed',
    templateBestand: 'KiB-Template-raci-matrix.md'
  },
  {
    id: 'doc-17',
    naam: 'Afhankelijkhedenlog',
    cyclusId: 'opbouwen',
    themaId: 'organiseren',
    verplicht: false,
    beschrijving: 'Register van afhankelijkheden tussen inspanningen',
    templateBestand: '20240517-Werken-aan-Programmas-Template-afhankelijkhedenlog.xlsx'
  },
  {
    id: 'doc-18',
    naam: 'Cyclusplan',
    cyclusId: 'opbouwen',
    themaId: 'sturen',
    verplicht: true,
    beschrijving: 'Gedetailleerd plan voor de komende cyclus',
    templateBestand: '20240517-Werken-aan-Programmas-Template-cyclusplan.docx'
  },
  {
    id: 'doc-19',
    naam: 'Stakeholderanalyse',
    cyclusId: 'opbouwen',
    themaId: 'samenwerken',
    verplicht: true,
    beschrijving: 'Analyse van stakeholders, belangen en beïnvloedingsstrategie',
    templateBestand: 'KiB-Template-stakeholderanalyse.md'
  },
  {
    id: 'doc-20',
    naam: 'Communicatieplan',
    cyclusId: 'opbouwen',
    themaId: 'samenwerken',
    verplicht: false,
    beschrijving: 'Plan voor interne en externe communicatie',
    templateBestand: 'KiB-Template-communicatieplan.md'
  },
  {
    id: 'doc-21',
    naam: 'Leerplan',
    cyclusId: 'opbouwen',
    themaId: 'ontwikkelen',
    verplicht: false,
    beschrijving: 'Plan voor leermomenten, reflecties en kennisborging',
    templateBestand: 'KiB-Template-leerplan.md'
  },

  // ==================== UITVOEREN ====================
  {
    id: 'doc-22',
    naam: 'Voortgangsrapportage',
    cyclusId: 'uitvoeren',
    themaId: 'sturen',
    verplicht: true,
    beschrijving: 'Periodieke rapportage over voortgang en stuurparameters',
    templateBestand: '20240517-Werken-aan-Programmas-Template-voortgangsrapportage-programma.docx'
  },
  {
    id: 'doc-23',
    naam: 'Risicolog',
    cyclusId: 'uitvoeren',
    themaId: 'sturen',
    verplicht: true,
    beschrijving: 'Register van risico\'s met beoordeling en maatregelen',
    templateBestand: '20240517-Werken-aan-Programmas-Template-risicolog.xlsx'
  },
  {
    id: 'doc-24',
    naam: 'Issuelog',
    cyclusId: 'uitvoeren',
    themaId: 'sturen',
    verplicht: true,
    beschrijving: 'Register van issues die moeten worden opgelost',
    templateBestand: '20240517-Werken-aan-Programmas-Template-issuelog.xlsx'
  },
  {
    id: 'doc-25',
    naam: 'BWA-log (Besluiten-Wijzigingen-Acties)',
    cyclusId: 'uitvoeren',
    themaId: 'beslissen',
    verplicht: false,
    beschrijving: 'Gecombineerd register voor besluiten, wijzigingen en acties',
    templateBestand: '20240517-Werken-aan-Programmas-Template-besluiten-wijzigingen-en-actieslog-BWA.xlsx'
  },
  {
    id: 'doc-26',
    naam: 'Beslisdocument',
    cyclusId: 'uitvoeren',
    themaId: 'beslissen',
    verplicht: true,
    beschrijving: 'Template voor Go/No-Go beslissingen',
    templateBestand: '20240517-Werken-aan-Programmas-Template-beslisdocument.docx'
  },
  {
    id: 'doc-27',
    naam: 'Cyclus-evaluatie',
    cyclusId: 'uitvoeren',
    themaId: 'sturen',
    verplicht: true,
    beschrijving: 'Evaluatie aan het einde van elke cyclus',
    templateBestand: '20240517-Werken-aan-Programmas-Template-evaluatiedocument.docx'
  },
  {
    id: 'doc-28',
    naam: 'Budgetbewaking',
    cyclusId: 'uitvoeren',
    themaId: 'sturen',
    verplicht: false,
    beschrijving: 'Financiële monitoring van het programmabudget',
    templateBestand: '20240517-Werken-aan-Programmas-Template-bewaken-programmabudgetten.xlsx'
  },

  // ==================== AFBOUWEN ====================
  {
    id: 'doc-29',
    naam: 'Afbouwopdracht',
    cyclusId: 'afbouwen',
    themaId: 'beslissen',
    verplicht: true,
    beschrijving: 'Bevestiging dat het programma kan worden afgebouwd',
    templateBestand: '20240517-Werken-aan-Programmas-Template-afbouwopdracht.docx'
  },
  {
    id: 'doc-30',
    naam: 'Programmareview',
    cyclusId: 'afbouwen',
    themaId: 'sturen',
    verplicht: true,
    beschrijving: 'Eindreview van het gehele programma'
  },
  {
    id: 'doc-31',
    naam: 'Overdrachtsplan',
    cyclusId: 'afbouwen',
    themaId: 'organiseren',
    verplicht: true,
    beschrijving: 'Plan voor overdracht van resultaten naar de lijn'
  },
  {
    id: 'doc-32',
    naam: 'Geleerde Lessen',
    cyclusId: 'afbouwen',
    themaId: 'ontwikkelen',
    verplicht: true,
    beschrijving: 'Documentatie van lessen voor toekomstige programma\'s',
    templateBestand: '20240517-Werken-aan-Programmas-Template-geleerde-lessen.docx'
  },
  {
    id: 'doc-33',
    naam: 'Afrondingsdocument',
    cyclusId: 'afbouwen',
    themaId: 'beslissen',
    verplicht: true,
    beschrijving: 'Documentatie van de afronding en oogst van het programma'
  },
  {
    id: 'doc-34',
    naam: 'Dechargedocument',
    cyclusId: 'afbouwen',
    themaId: 'beslissen',
    verplicht: true,
    beschrijving: 'Formele ontslaging van programmarollen',
    templateBestand: '20240517-Werken-aan-Programmas-Template-dechargedocument.docx'
  }
]

// Helper functies
export function getActiviteitenVoorThemaEnCyclus(themaId, cyclusId) {
  return activiteiten
    .filter(a => a.themaId === themaId && a.cyclusId === cyclusId)
    .sort((a, b) => a.volgorde - b.volgorde)
}

export function getDocumentenVoorCyclus(cyclusId) {
  return documentTemplates.filter(d => d.cyclusId === cyclusId)
}

export function getThemaById(themaId) {
  return themas.find(t => t.id === themaId)
}

export function getCyclusById(cyclusId) {
  return levensloopcycli.find(c => c.id === cyclusId)
}
