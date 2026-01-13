/**
 * Sessies Pagina - Klant in Beeld
 *
 * Sessie-ontwerpen voor:
 * - Baten-identificatie met sectormanagers
 * - Domein-diagnose workshops
 * - Programmaraad sessies
 */

import { useState } from 'react'
import {
  Users,
  Clock,
  Target,
  GitBranch,
  Database,
  Heart,
  CheckCircle,
  Circle,
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  ChevronDown,
  Lightbulb,
  AlertTriangle,
  MessageSquare,
  FileText,
  Calendar,
  MapPin,
  UserCheck,
  Layers,
  Eye,
  Zap
} from 'lucide-react'
import { sectoren, domeinen, kernprincipes, batenProfielen } from '../data/programmaData'

// Sessie ontwerpen
const sessieOntwerpen = [
  {
    id: 'baten-identificatie',
    titel: 'Baten-identificatie Sessie',
    subtitel: 'Met sectormanagers',
    doel: 'Sectormanagers identificeren en formuleren hun gewenste baten volgens het KiB-format',
    duur: '2 uur',
    deelnemers: ['Sectormanager(s)', 'Programmamanager', 'Facilitator (3Sides)'],
    voorbereiding: [
      'Verstuur agenda en leesmateriaal 1 week vooraf',
      'Bereid lege batenprofiel templates voor (fysiek of digitaal)',
      'Zorg voor post-its, stiften, flip-overs',
      'Print de 7 kernprincipes als reminder'
    ],
    materialen: ['Batenprofiel template', 'Baten × Domeinen canvas', 'Post-its', 'Flip-over'],
    kleur: '#3b82f6',
    icon: Target,
    onderdelen: [
      {
        titel: 'Opening & Context',
        duur: '15 min',
        beschrijving: 'Welkom, doel van de sessie, link met programmavisie',
        facilitatorTips: [
          'Start met de programmavisie: "Outside-in werken"',
          'Benoem kernprincipe #1: Visie & doelen > inspanningen',
          'Maak expliciet: we zoeken BATEN, geen activiteiten'
        ],
        vragen: [
          'Wat zou er anders zijn als Klant in Beeld geslaagd is?',
          'Waar merk je dat nu in je sector?'
        ]
      },
      {
        titel: 'Individuele Reflectie',
        duur: '15 min',
        beschrijving: 'Elke deelnemer schrijft 3-5 gewenste verbeteringen op post-its',
        facilitatorTips: [
          'Geef de formuleringsregel: zelfstandig naamwoord + vergrotende trap',
          'Voorbeelden: "Hogere tevredenheid", "Snellere respons", "Betere aansluiting"',
          'Laat ze individueel werken, geen overleg'
        ],
        vragen: [
          'Welke verbetering zou jouw klanten het meest helpen?',
          'Wat zou jij willen meten om succes te zien?'
        ]
      },
      {
        titel: 'Delen & Clusteren',
        duur: '20 min',
        beschrijving: 'Post-its ophangen, toelichten, clusteren op thema',
        facilitatorTips: [
          'Laat iedereen kort toelichten (max 1 min per post-it)',
          'Cluster vergelijkbare baten samen',
          'Noteer de energie: waar zit de passie?'
        ],
        vragen: [
          'Zie je overlap tussen jullie baten?',
          'Welke clusters vallen op?'
        ]
      },
      {
        titel: 'Baten Selectie',
        duur: '20 min',
        beschrijving: 'Selecteer 2-3 prioriteitsbaten per sector',
        facilitatorTips: [
          'Gebruik dot-voting (3 stippen per persoon)',
          'Focus op impact EN haalbaarheid',
          'Check: is dit een BAAT of een INSPANNING?'
        ],
        vragen: [
          'Welke baat heeft de meeste impact op klanttevredenheid?',
          'Welke baat kun je daadwerkelijk beïnvloeden?'
        ]
      },
      {
        titel: 'Batenprofiel Invullen',
        duur: '35 min',
        beschrijving: 'Voor elke geselecteerde baat het profiel uitwerken',
        facilitatorTips: [
          'Werk per baat het volledige profiel uit',
          'Dwing af: wie is de EIGENAAR?',
          'Bespreek: hoe gaan we dit METEN?'
        ],
        vragen: [
          'Wat is de huidige situatie (nulmeting)?',
          'Wat is een realistisch maar ambitieus doel?',
          'Wie is eigenaar van deze baat?'
        ]
      },
      {
        titel: 'Domein-mapping',
        duur: '10 min',
        beschrijving: 'Per baat aangeven welke domeinen geraakt worden',
        facilitatorTips: [
          'Gebruik het Baten × Domeinen canvas',
          'Vraag: wat moet er veranderen in Mens/Proces/Systeem/Cultuur?',
          'Dit is input voor de diagnose-sessie'
        ],
        vragen: [
          'Welk domein heeft de meeste impact op deze baat?',
          'Waar zitten de grootste knelpunten?'
        ]
      },
      {
        titel: 'Afsluiting & Vervolgstappen',
        duur: '5 min',
        beschrijving: 'Samenvatten, afspraken maken, bedanken',
        facilitatorTips: [
          'Vat de geïdentificeerde baten samen',
          'Maak concrete afspraken over vervolg',
          'Plan de diagnose-sessie in'
        ],
        vragen: []
      }
    ]
  },
  {
    id: 'domein-diagnose',
    titel: 'Domein-diagnose Workshop',
    subtitel: 'Knelpunten identificeren',
    doel: 'Per domein (Mens, Proces, Systeem, Cultuur) de huidige knelpunten en gewenste situatie in kaart brengen',
    duur: '2,5 uur',
    deelnemers: ['Sectormanager(s)', 'Domein-experts', 'Programmamanager', 'Facilitator'],
    voorbereiding: [
      'Verzamel input uit klantreisanalyses',
      'Bereid per domein een diagnose-canvas voor',
      'Nodig de juiste domein-experts uit',
      'Print de baten uit de vorige sessie'
    ],
    materialen: ['Diagnose canvas per domein', 'Klantreisanalyses', 'Batenprofielen', 'Post-its'],
    kleur: '#10b981',
    icon: GitBranch,
    onderdelen: [
      {
        titel: 'Terugblik Baten',
        duur: '10 min',
        beschrijving: 'Recap van de geïdentificeerde baten en hun domein-mapping',
        facilitatorTips: [
          'Hang de batenprofielen zichtbaar op',
          'Benoem welke domeinen per baat geraakt worden',
          'Dit vormt de rode draad voor de sessie'
        ],
        vragen: []
      },
      {
        titel: 'Domein: MENS',
        duur: '25 min',
        beschrijving: 'Wat moeten medewerkers KUNNEN om de baten te realiseren?',
        facilitatorTips: [
          'Focus op vaardigheden, niet op mensen',
          'Vraag door: wat ontbreekt er nu?',
          'Noteer zowel knelpunten als kansen'
        ],
        vragen: [
          'Welke vaardigheden missen medewerkers nu?',
          'Waar is onvoldoende kennis of ervaring?',
          'Wat zou er anders zijn als medewerkers dit WEL konden?'
        ]
      },
      {
        titel: 'Domein: PROCES',
        duur: '25 min',
        beschrijving: 'Welke processen moeten ANDERS om de baten te realiseren?',
        facilitatorTips: [
          'Denk aan werkwijzen, procedures, overdrachten',
          'Vraag: waar gaat het mis in de klantreis?',
          'Zoek naar patronen, niet incidenten'
        ],
        vragen: [
          'Welke processen werken niet voor de klant?',
          'Waar vallen dingen tussen wal en schip?',
          'Welke overdrachtsmomenten zijn onduidelijk?'
        ]
      },
      {
        titel: 'Domein: SYSTEEM',
        duur: '25 min',
        beschrijving: 'Welke systemen moeten ANDERS om de baten te realiseren?',
        facilitatorTips: [
          'Denk aan CRM, data, tooling, integraties',
          'Vraag: wat kan niet omdat het systeem het niet ondersteunt?',
          'Focus op functionaliteit, niet op techniek'
        ],
        vragen: [
          'Welke informatie missen medewerkers?',
          'Waar werken systemen niet samen?',
          'Wat zou je willen kunnen zien/doen in het systeem?'
        ]
      },
      {
        titel: 'Domein: CULTUUR',
        duur: '25 min',
        beschrijving: 'Wat moet er ANDERS in gedrag en mindset?',
        facilitatorTips: [
          'Dit is vaak het lastigste domein',
          'Vraag naar concreet gedrag, niet abstracte waarden',
          'Zoek naar onderliggende overtuigingen'
        ],
        vragen: [
          'Welk gedrag zie je dat niet helpt?',
          'Wat wordt beloond dat eigenlijk niet zou moeten?',
          'Welke overtuigingen zitten in de weg?'
        ]
      },
      {
        titel: 'Synthese & Prioritering',
        duur: '20 min',
        beschrijving: 'Verbind de domeinen en prioriteer de belangrijkste knelpunten',
        facilitatorTips: [
          'Zoek naar verbanden tussen domeinen',
          'Vraag: als we DIT oplossen, wat lost dat nog meer op?',
          'Selecteer de top-3 knelpunten per domein'
        ],
        vragen: [
          'Welke knelpunten komen in meerdere domeinen terug?',
          'Waar zit de grootste hefboom?'
        ]
      },
      {
        titel: 'Vertaling naar Inspanningen',
        duur: '15 min',
        beschrijving: 'Eerste ideeën voor inspanningen die de knelpunten adresseren',
        facilitatorTips: [
          'Dit is nog geen planning, alleen ideegeneratie',
          'Categoriseer: project, proces, leer, systeem',
          'Check: is dit PROGRAMMA of LIJN?'
        ],
        vragen: [
          'Wat zou een oplossing kunnen zijn?',
          'Is dit iets nieuws (programma) of bestaand (lijn)?'
        ]
      },
      {
        titel: 'Afsluiting',
        duur: '5 min',
        beschrijving: 'Samenvatten en vervolgafspraken',
        facilitatorTips: [
          'Vat de top-knelpunten per domein samen',
          'Maak afspraken over uitwerking',
          'Bedank voor de openheid'
        ],
        vragen: []
      }
    ]
  },
  {
    id: 'programmaraad',
    titel: 'Programmaraad Sessie',
    subtitel: 'Besluitvorming & Sturing',
    doel: 'Gezamenlijke besluitvorming over voortgang, issues en Go/No-Go momenten',
    duur: '1,5 uur',
    deelnemers: ['Programma-eigenaar', 'Programmamanager', 'Alle sectormanagers', 'Data & Tech manager', 'HR'],
    voorbereiding: [
      'Programmamanager stuurt voortgangsrapportage 3 dagen vooraf',
      'Verzamel open issues en beslispunten',
      'Bereid dashboard/stuurparameters voor',
      'Check of alle baateigenaren aanwezig kunnen zijn'
    ],
    materialen: ['Voortgangsrapportage', 'Dashboard', 'Beslispuntenlijst', 'Risico-register'],
    kleur: '#8b5cf6',
    icon: Users,
    onderdelen: [
      {
        titel: 'Check-in',
        duur: '5 min',
        beschrijving: 'Korte persoonlijke check-in, energie peilen',
        facilitatorTips: [
          'Houd het kort: één woord of zin per persoon',
          'Dit geeft inzicht in de energie in de groep',
          'Bij lage energie: benoem het en pas eventueel aan'
        ],
        vragen: [
          'In één woord: hoe ga je deze sessie in?'
        ]
      },
      {
        titel: 'Voortgang per Stuurparameter',
        duur: '20 min',
        beschrijving: 'Doorloop de 5 stuurparameters: Doeltreffendheid, Tempo, Haalbaarheid, Wendbaarheid, Efficiëntie',
        facilitatorTips: [
          'Focus op afwijkingen (geel/rood)',
          'Vraag: wat is er nodig om weer op groen te komen?',
          'Noteer acties met eigenaar en deadline'
        ],
        vragen: [
          'Welke parameter vraagt nu de meeste aandacht?',
          'Wat is de oorzaak van de afwijking?'
        ]
      },
      {
        titel: 'Batenrealisatie',
        duur: '20 min',
        beschrijving: 'Update per baat: waar staan we ten opzichte van de doelen?',
        facilitatorTips: [
          'Laat baateigenaren zelf rapporteren',
          'Vraag naar trends, niet alleen cijfers',
          'Bespreek interventies als nodig'
        ],
        vragen: [
          'Liggen we op koers voor deze baat?',
          'Wat is er nodig om het doel te halen?'
        ]
      },
      {
        titel: 'Issues & Escalaties',
        duur: '15 min',
        beschrijving: 'Bespreek geëscaleerde issues die besluitvorming vragen',
        facilitatorTips: [
          'Behandel alleen wat hier besloten moet worden',
          'Gebruik de escalatiecriteria',
          'Neem een besluit of bepaal vervolgactie'
        ],
        vragen: [
          'Wat is het beslispunt precies?',
          'Wie heeft welk belang?',
          'Wat zijn de opties?'
        ]
      },
      {
        titel: 'Go/No-Go (indien van toepassing)',
        duur: '15 min',
        beschrijving: 'Formeel beslismoment over fase-overgang of grote wijzigingen',
        facilitatorTips: [
          'Gebruik de Go/No-Go criteria',
          'Vraag expliciet om commitment van elke baateigenaar',
          'Documenteer het besluit en de voorwaarden'
        ],
        vragen: [
          'Zijn we klaar voor de volgende fase?',
          'Welke voorwaarden moeten nog vervuld worden?'
        ]
      },
      {
        titel: 'Vooruitblik',
        duur: '10 min',
        beschrijving: 'Wat staat er de komende periode op de agenda?',
        facilitatorTips: [
          'Focus op de komende 4-6 weken',
          'Benoem belangrijke mijlpalen',
          'Check of resources beschikbaar zijn'
        ],
        vragen: [
          'Wat zijn de belangrijkste mijlpalen?',
          'Zijn er risicos die we nu moeten adresseren?'
        ]
      },
      {
        titel: 'Check-out',
        duur: '5 min',
        beschrijving: 'Korte reflectie op de sessie',
        facilitatorTips: [
          'Vraag naar één concreet punt dat iemand meeneemt',
          'Vraag naar feedback op de sessie zelf',
          'Beëindig positief en met energie'
        ],
        vragen: [
          'Wat neem je mee uit deze sessie?'
        ]
      }
    ]
  }
]

function Sessies() {
  const [activeSessie, setActiveSessie] = useState(sessieOntwerpen[0])
  const [expandedOnderdeel, setExpandedOnderdeel] = useState(0)
  const [completedOnderdelen, setCompletedOnderdelen] = useState([])
  const [isRunning, setIsRunning] = useState(false)

  const toggleOnderdeel = (index) => {
    setExpandedOnderdeel(expandedOnderdeel === index ? -1 : index)
  }

  const toggleCompleted = (index) => {
    setCompletedOnderdelen(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const resetSessie = () => {
    setCompletedOnderdelen([])
    setExpandedOnderdeel(0)
    setIsRunning(false)
  }

  const startSessie = () => {
    setIsRunning(true)
    setExpandedOnderdeel(0)
  }

  const getTotaleDuur = () => {
    return activeSessie.onderdelen.reduce((sum, o) => {
      const minuten = parseInt(o.duur)
      return sum + (isNaN(minuten) ? 0 : minuten)
    }, 0)
  }

  const getVoortgang = () => {
    const total = activeSessie.onderdelen.length
    const completed = completedOnderdelen.length
    return Math.round((completed / total) * 100)
  }

  const Icon = activeSessie.icon

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#003366] to-[#0066cc] rounded-xl p-6 text-white">
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="w-5 h-5" />
          <span className="text-white/80 text-sm">Facilitatie</span>
        </div>
        <h1 className="text-2xl font-bold">Sessie-ontwerpen</h1>
        <p className="text-white/80 mt-2 max-w-3xl">
          Kant-en-klare sessie-ontwerpen voor het faciliteren van workshops met sectormanagers,
          domein-experts en de programmaraad.
        </p>
      </div>

      {/* Sessie Selectie */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sessieOntwerpen.map((sessie) => {
          const SessieIcon = sessie.icon
          const isActive = activeSessie.id === sessie.id
          return (
            <button
              key={sessie.id}
              onClick={() => {
                setActiveSessie(sessie)
                resetSessie()
              }}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                isActive
                  ? 'border-[#003366] bg-[#003366]/5 shadow-md'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: `${sessie.kleur}20` }}
                >
                  <SessieIcon className="w-5 h-5" style={{ color: sessie.kleur }} />
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Clock className="w-4 h-4" />
                  <span>{sessie.duur}</span>
                </div>
              </div>
              <h3 className="font-semibold text-slate-800">{sessie.titel}</h3>
              <p className="text-sm text-slate-500">{sessie.subtitel}</p>
            </button>
          )
        })}
      </div>

      {/* Sessie Detail */}
      <div className="grid grid-cols-3 gap-6">
        {/* Linker kolom: Sessie info */}
        <div className="space-y-6">
          {/* Sessie overzicht */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="p-3 rounded-xl"
                style={{ backgroundColor: `${activeSessie.kleur}20` }}
              >
                <Icon className="w-6 h-6" style={{ color: activeSessie.kleur }} />
              </div>
              <div>
                <h2 className="font-semibold text-slate-800">{activeSessie.titel}</h2>
                <p className="text-sm text-slate-500">{activeSessie.subtitel}</p>
              </div>
            </div>

            <p className="text-sm text-slate-600 mb-4">{activeSessie.doel}</p>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-slate-400" />
                <span className="text-slate-600">Duur: <strong>{activeSessie.duur}</strong></span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <Users className="w-4 h-4 text-slate-400 mt-0.5" />
                <div>
                  <span className="text-slate-600">Deelnemers:</span>
                  <ul className="mt-1 space-y-1">
                    {activeSessie.deelnemers.map((d, i) => (
                      <li key={i} className="text-slate-500 text-xs">• {d}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Voorbereiding */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-400" />
              Voorbereiding
            </h3>
            <ul className="space-y-2">
              {activeSessie.voorbereiding.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  <span className="text-slate-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Materialen */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-slate-400" />
              Benodigde materialen
            </h3>
            <div className="flex flex-wrap gap-2">
              {activeSessie.materialen.map((item, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-slate-100 text-slate-600 text-sm rounded-full"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Start/Reset */}
          <div className="flex gap-2">
            <button
              onClick={isRunning ? () => setIsRunning(false) : startSessie}
              className={`flex-1 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                isRunning
                  ? 'bg-amber-500 text-white hover:bg-amber-600'
                  : 'bg-[#003366] text-white hover:bg-[#004488]'
              }`}
            >
              {isRunning ? (
                <>
                  <Pause className="w-5 h-5" />
                  Pauzeer
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  Start Sessie
                </>
              )}
            </button>
            <button
              onClick={resetSessie}
              className="px-4 py-3 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-all"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>

          {/* Voortgang */}
          {isRunning && (
            <div className="bg-slate-50 rounded-lg p-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-600">Voortgang</span>
                <span className="font-medium text-slate-800">{getVoortgang()}%</span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full transition-all"
                  style={{ width: `${getVoortgang()}%` }}
                />
              </div>
              <div className="text-xs text-slate-500 mt-2">
                {completedOnderdelen.length} van {activeSessie.onderdelen.length} onderdelen afgerond
              </div>
            </div>
          )}
        </div>

        {/* Rechter kolom: Agenda */}
        <div className="col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-slate-800">Sessie-agenda</h3>
            <div className="text-sm text-slate-500">
              Totaal: {getTotaleDuur()} minuten
            </div>
          </div>

          <div className="space-y-3">
            {activeSessie.onderdelen.map((onderdeel, index) => {
              const isExpanded = expandedOnderdeel === index
              const isCompleted = completedOnderdelen.includes(index)

              return (
                <div
                  key={index}
                  className={`rounded-lg border-2 transition-all ${
                    isCompleted
                      ? 'border-green-200 bg-green-50'
                      : isExpanded
                      ? 'border-[#003366] bg-[#003366]/5'
                      : 'border-slate-200'
                  }`}
                >
                  {/* Header */}
                  <button
                    onClick={() => toggleOnderdeel(index)}
                    className="w-full p-4 flex items-center gap-4 text-left"
                  >
                    {/* Nummer/Check */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleCompleted(index)
                      }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                        isCompleted
                          ? 'bg-green-500 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <span className="font-medium">{index + 1}</span>
                      )}
                    </button>

                    {/* Titel & duur */}
                    <div className="flex-1">
                      <div className="font-medium text-slate-800">{onderdeel.titel}</div>
                      <div className="text-sm text-slate-500">{onderdeel.beschrijving}</div>
                    </div>

                    {/* Duur */}
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Clock className="w-4 h-4" />
                      <span>{onderdeel.duur}</span>
                    </div>

                    {/* Expand icon */}
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-slate-400" />
                    )}
                  </button>

                  {/* Expanded content */}
                  {isExpanded && (
                    <div className="px-4 pb-4 pt-2 border-t border-slate-200 ml-12">
                      {/* Facilitator tips */}
                      {onderdeel.facilitatorTips && onderdeel.facilitatorTips.length > 0 && (
                        <div className="mb-4">
                          <div className="flex items-center gap-2 text-sm font-medium text-amber-700 mb-2">
                            <Lightbulb className="w-4 h-4" />
                            <span>Facilitator tips</span>
                          </div>
                          <ul className="space-y-1">
                            {onderdeel.facilitatorTips.map((tip, i) => (
                              <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                                <span className="text-amber-500">•</span>
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Vragen */}
                      {onderdeel.vragen && onderdeel.vragen.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 text-sm font-medium text-blue-700 mb-2">
                            <MessageSquare className="w-4 h-4" />
                            <span>Vragen om te stellen</span>
                          </div>
                          <ul className="space-y-1">
                            {onderdeel.vragen.map((vraag, i) => (
                              <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                                <span className="text-blue-500">?</span>
                                <span className="italic">"{vraag}"</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Actie knoppen */}
                      <div className="mt-4 pt-4 border-t border-slate-100 flex gap-2">
                        <button
                          onClick={() => toggleCompleted(index)}
                          className={`px-3 py-1.5 text-sm rounded-lg transition-all ${
                            isCompleted
                              ? 'bg-green-100 text-green-700'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {isCompleted ? 'Afgerond ✓' : 'Markeer als afgerond'}
                        </button>
                        {index < activeSessie.onderdelen.length - 1 && (
                          <button
                            onClick={() => {
                              toggleCompleted(index)
                              setExpandedOnderdeel(index + 1)
                            }}
                            className="px-3 py-1.5 text-sm bg-[#003366] text-white rounded-lg hover:bg-[#004488] transition-all flex items-center gap-1"
                          >
                            Volgende
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Tips sectie */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-amber-100 rounded-lg">
            <Lightbulb className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h2 className="font-semibold text-amber-900 mb-2">Facilitatie-tips</h2>
            <div className="grid grid-cols-3 gap-4 text-sm text-amber-800">
              <div>
                <p className="font-medium mb-1">Eigenaarschap</p>
                <p>Laat sectormanagers zelf formuleren en kiezen. Jij faciliteert, zij beslissen.</p>
              </div>
              <div>
                <p className="font-medium mb-1">Expliciet maken</p>
                <p>Schrijf alles op wat wordt gezegd. Maak aannames en verwachtingen zichtbaar.</p>
              </div>
              <div>
                <p className="font-medium mb-1">Energie volgen</p>
                <p>Let op waar de energie zit. Daar ligt vaak de sleutel tot verandering.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sessies
