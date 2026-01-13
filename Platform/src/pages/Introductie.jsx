/**
 * Introductie - Werken aan Programma's Framework
 * Gebaseerd op methodologie van Prevaas & Van Loon
 */

import {
  Target,
  Users,
  Layers,
  TrendingUp,
  CheckCircle,
  Clock,
  Play,
  Pause,
  Search,
  Lightbulb,
  Settings,
  MessageSquare,
  Shield,
  Heart,
  Compass,
  Gauge,
  BookOpen,
  Eye,
  FileText
} from 'lucide-react'
import { kernprincipes } from '../data/programmaData'

function Introductie() {
  return (
    <div className="max-w-5xl mx-auto space-y-20">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-[#003366] to-[#004d99] p-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/15 rounded-xl">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Werken aan Programma's</h1>
              <p className="text-white/70 text-sm">Methodologie Klant in Beeld</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-slate-50">
          <p className="text-sm text-slate-600">
            Gebaseerd op <span className="font-medium text-slate-800">"Werken aan Programma's"</span> van Prevaas & Van Loon
          </p>
        </div>
      </div>

      {/* SECTIE 1: De 4 Levenscycli */}
      <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="bg-purple-50 px-8 py-6 border-b border-purple-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-500 rounded-xl shadow-lg">
              <Clock className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-purple-900">1. De 4 Levenscycli</h2>
              <p className="text-base text-purple-700 mt-1">Elk programma doorloopt 4 opeenvolgende fasen</p>
            </div>
          </div>
        </div>

        <div className="p-6 overflow-hidden">
          <div className="relative overflow-hidden">
            {/* Timeline connector */}
            <div className="absolute top-12 left-[12.5%] right-[12.5%] h-1 bg-slate-200 hidden md:block" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 overflow-hidden">
              {[
                {
                  naam: 'Verkennen',
                  vraag: 'Is dit een programma?',
                  icon: Search,
                  color: 'slate',
                  activiteiten: ['Probleemanalyse', 'Stakeholder identificatie', 'Go/no-go besluit'],
                  product: 'Programmavoorstel'
                },
                {
                  naam: 'Opbouwen',
                  vraag: 'Hoe gaan we dit doen?',
                  icon: Play,
                  color: 'blue',
                  activiteiten: ['Baten definiëren', 'Governance inrichten', 'Roadmap opstellen'],
                  product: 'Programmaplan'
                },
                {
                  naam: 'Uitvoeren',
                  vraag: 'Hoe houden we koers?',
                  icon: CheckCircle,
                  color: 'green',
                  activiteiten: ['Inspanningen uitvoeren', 'Voortgang monitoren', 'Bijsturen op baten'],
                  product: 'Batenrealisatie'
                },
                {
                  naam: 'Afbouwen',
                  vraag: 'Zijn de baten bereikt?',
                  icon: Pause,
                  color: 'amber',
                  activiteiten: ['Borging in de lijn', 'Evaluatie', 'Programma afsluiten'],
                  product: 'Overdracht'
                }
              ].map((fase, i) => {
                const Icon = fase.icon
                const colors = {
                  slate: { bg: 'bg-slate-500', light: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200' },
                  blue: { bg: 'bg-blue-500', light: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
                  green: { bg: 'bg-green-500', light: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
                  amber: { bg: 'bg-amber-500', light: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' }
                }[fase.color]

                return (
                  <div key={fase.naam} className="relative overflow-hidden">
                    {/* Nummer badge */}
                    <div className={`w-10 h-10 ${colors.bg} rounded-full flex items-center justify-center mx-auto mb-3 relative z-10 ring-4 ring-white`}>
                      <span className="text-white font-bold">{i + 1}</span>
                    </div>

                    <div className={`${colors.light} rounded-xl p-4 border ${colors.border} h-full overflow-hidden`}>
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className={`w-5 h-5 ${colors.text}`} />
                        <h3 className={`font-bold ${colors.text}`}>{fase.naam}</h3>
                      </div>

                      <p className="text-sm text-slate-600 italic mb-3">"{fase.vraag}"</p>

                      <div className="space-y-1 mb-3">
                        {fase.activiteiten.map((a, j) => (
                          <div key={j} className="flex items-center gap-2 text-xs text-slate-600">
                            <div className={`w-1.5 h-1.5 rounded-full ${colors.bg}`} />
                            {a}
                          </div>
                        ))}
                      </div>

                      <div className={`text-xs font-medium ${colors.text} bg-white px-2 py-1 rounded`}>
                        Resultaat: {fase.product}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>Klant in Beeld status:</strong> We bevinden ons in de overgang van <strong>Opbouwen</strong> naar <strong>Uitvoeren</strong>.
              De programmastructuur staat, inspanningen worden opgestart.
            </p>
          </div>
        </div>
      </section>

      {/* SECTIE 2: De 8 Thema's */}
      <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="bg-indigo-50 px-8 py-6 border-b border-indigo-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-500 rounded-xl shadow-lg">
              <Compass className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-indigo-900">2. De 8 Thema's</h2>
              <p className="text-base text-indigo-700 mt-1">Lenzen waardoor je naar het programma kijkt in elke cyclus</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <p className="text-sm text-slate-600 mb-4">
            In elke levenscyclus adresseer je dezelfde 8 thema's, maar met verschillende intensiteit en focus.
            De thema's zorgen ervoor dat je niets over het hoofd ziet.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { nr: 1, naam: 'Kiezen', icon: Target, desc: 'Wel/niet doen, prioriteiten', kleur: 'rose' },
              { nr: 2, naam: 'Vormgeven', icon: Lightbulb, desc: 'Visie, doelen en scope', kleur: 'orange' },
              { nr: 3, naam: 'Organiseren', icon: Settings, desc: 'Rollen, structuur, resources', kleur: 'amber' },
              { nr: 4, naam: 'Sturen', icon: Gauge, desc: 'Monitoren, rapporteren, bijsturen', kleur: 'yellow' },
              { nr: 5, naam: 'Beslissen', icon: Shield, desc: 'Wie beslist wat, wanneer', kleur: 'lime' },
              { nr: 6, naam: 'Samenwerken', icon: MessageSquare, desc: 'Stakeholders, communicatie', kleur: 'emerald' },
              { nr: 7, naam: 'Leiden', icon: Users, desc: 'Leiderschap, voorbeeldgedrag', kleur: 'teal' },
              { nr: 8, naam: 'Ontwikkelen', icon: TrendingUp, desc: 'Leren, verbeteren, reflectie', kleur: 'cyan' }
            ].map(thema => {
              const Icon = thema.icon
              const colors = {
                rose: 'bg-rose-100 text-rose-700 border-rose-200',
                orange: 'bg-orange-100 text-orange-700 border-orange-200',
                amber: 'bg-amber-100 text-amber-700 border-amber-200',
                yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200',
                lime: 'bg-lime-100 text-lime-700 border-lime-200',
                emerald: 'bg-emerald-100 text-emerald-700 border-emerald-200',
                teal: 'bg-teal-100 text-teal-700 border-teal-200',
                cyan: 'bg-cyan-100 text-cyan-700 border-cyan-200'
              }[thema.kleur]

              return (
                <div key={thema.nr} className={`${colors} border rounded-xl p-3`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg font-bold opacity-50">{thema.nr}</span>
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="font-semibold text-sm">{thema.naam}</h4>
                  <p className="text-xs opacity-75">{thema.desc}</p>
                </div>
              )
            })}
          </div>

          <div className="mt-4 p-3 bg-slate-50 rounded-lg">
            <p className="text-xs text-slate-600">
              <strong>Tip:</strong> De thema's zijn niet sequentieel. Je werkt parallel aan meerdere thema's, met wisselende prioriteit per fase.
            </p>
          </div>
        </div>
      </section>

      {/* SECTIE 3: De 7 Kernprincipes */}
      <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="bg-amber-50 px-8 py-6 border-b border-amber-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-500 rounded-xl shadow-lg">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-amber-900">3. De 7 Kernprincipes</h2>
              <p className="text-base text-amber-700 mt-1">Fundament van de methodologie</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <p className="text-sm text-slate-600 mb-4">
            Deze 7 principes vormen de basis van "Werken aan Programma's" en gelden voor alle programma-activiteiten.
            Ze helpen bij het maken van keuzes en het vermijden van valkuilen.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {kernprincipes.map(principe => {
              const iconMap = {
                Eye: Eye,
                Users: Users,
                Layers: Layers,
                FileText: FileText,
                TrendingUp: TrendingUp,
                Shield: Shield,
                Target: Target
              }
              const Icon = iconMap[principe.icon] || Shield

              return (
                <div
                  key={principe.id}
                  className="p-4 rounded-xl border-2 hover:shadow-md transition-all"
                  style={{ borderColor: `${principe.kleur}40`, backgroundColor: `${principe.kleur}08` }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: principe.kleur }}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-slate-400">P{principe.id}</span>
                        <h3 className="font-semibold text-slate-800 text-sm">{principe.titel}</h3>
                      </div>
                      <p className="text-xs text-slate-600 mb-2">{principe.beschrijving}</p>

                      {/* KiB Toepassing */}
                      <div className="bg-blue-50 rounded p-2 mb-2">
                        <div className="text-[10px] text-blue-600 font-medium mb-0.5">Klant in Beeld:</div>
                        <div className="text-xs text-blue-800">{principe.kibToepassing}</div>
                      </div>

                      {/* Valkuil & Check */}
                      <div className="flex gap-2 text-[10px]">
                        <div className="flex-1 bg-red-50 rounded p-1.5">
                          <span className="text-red-600 font-medium">Valkuil: </span>
                          <span className="text-red-700">{principe.valkuil}</span>
                        </div>
                        <div className="flex-1 bg-green-50 rounded p-1.5">
                          <span className="text-green-600 font-medium">Check: </span>
                          <span className="text-green-700">{principe.check}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-xs text-amber-800">
              <strong>Bron:</strong> "Werken aan Programma's" (Prevaas & Van Loon) - Deze principes zijn de basis voor alle programma-activiteiten.
            </p>
          </div>
        </div>
      </section>

      {/* SECTIE 4: De 4 Domeinen (Klant in Beeld specifiek) */}
      <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="bg-[#003366]/10 px-8 py-6 border-b border-[#003366]/20">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#003366] rounded-xl shadow-lg">
              <Layers className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#003366]">4. De 4 Domeinen</h2>
              <p className="text-base text-slate-600 mt-1">Structuur voor baten en inspanningen</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <p className="text-sm text-slate-600 mb-4">
            Binnen Klant in Beeld categoriseren we alle baten en inspanningen over 4 domeinen.
            Dit zorgt voor balans en voorkomt eenzijdige focus.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                naam: 'Mens',
                icon: Users,
                color: 'blue',
                focus: 'Mensen & competenties',
                voorbeelden: ['Training klantgerichtheid', 'Coaching medewerkers', 'Mindset ontwikkeling']
              },
              {
                naam: 'Proces',
                icon: Layers,
                color: 'emerald',
                focus: 'Werkwijzen & procedures',
                voorbeelden: ['Klantreis optimalisatie', 'Serviceprocessen', 'Klachtafhandeling']
              },
              {
                naam: 'Systeem',
                icon: Target,
                color: 'violet',
                focus: 'Technologie & data',
                voorbeelden: ['CRM implementatie', 'Data-integratie', 'Dashboard ontwikkeling']
              },
              {
                naam: 'Cultuur',
                icon: Heart,
                color: 'amber',
                focus: 'Waarden & gedrag',
                voorbeelden: ['Outside-in mindset', 'Klant centraal stellen', 'Samenwerkingscultuur']
              }
            ].map(domein => {
              const Icon = domein.icon
              const colors = {
                blue: { bg: 'bg-blue-500', light: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
                emerald: { bg: 'bg-emerald-500', light: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
                violet: { bg: 'bg-violet-500', light: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-200' },
                amber: { bg: 'bg-amber-500', light: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' }
              }[domein.color]

              return (
                <div key={domein.naam} className={`${colors.light} rounded-xl p-4 border-2 ${colors.border}`}>
                  <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center mb-3`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className={`text-lg font-bold ${colors.text} mb-1`}>{domein.naam}</h3>
                  <p className="text-sm text-slate-600 mb-3">{domein.focus}</p>
                  <div className="space-y-1">
                    {domein.voorbeelden.map((v, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-500">
                        <CheckCircle className="w-3 h-3 text-slate-400" />
                        {v}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* De 3 Sectoren */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <h4 className="font-semibold text-[#003366] mb-4">De 3 sectoren binnen Klant in Beeld</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {[
                { short: 'PO', naam: 'Primair onderwijs', kleur: 'cyan', doelgroep: 'Basisscholen' },
                { short: 'VO', naam: 'Voortgezet onderwijs', kleur: 'indigo', doelgroep: 'Middelbare scholen' },
                { short: 'ZP', naam: 'Zakelijk Professionals', kleur: 'emerald', doelgroep: 'Bedrijven & instellingen' }
              ].map(sector => {
                const colors = {
                  cyan: 'bg-cyan-500 text-cyan-700 border-cyan-200 bg-cyan-50',
                  indigo: 'bg-indigo-500 text-indigo-700 border-indigo-200 bg-indigo-50',
                  emerald: 'bg-emerald-500 text-emerald-700 border-emerald-200 bg-emerald-50'
                }
                const bgColor = colors[sector.kleur].split(' ')[0]
                const textColor = colors[sector.kleur].split(' ')[1]
                const lightBg = colors[sector.kleur].split(' ')[3]

                return (
                  <div key={sector.short} className={`${lightBg} rounded-xl p-4 border ${colors[sector.kleur].split(' ')[2]}`}>
                    <div className={`w-10 h-10 ${bgColor} rounded-lg flex items-center justify-center mb-2`}>
                      <span className="text-lg font-bold text-white">{sector.short}</span>
                    </div>
                    <h5 className={`font-semibold ${textColor}`}>{sector.naam}</h5>
                    <p className="text-xs text-slate-600 mt-1">{sector.doelgroep}</p>
                  </div>
                )
              })}
            </div>

            {/* Rol van sectoren */}
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-sm text-slate-600 mb-3">
                Elke sector definieert eigen <strong>baten</strong> per domein en voert <strong>inspanningen</strong> uit om deze te realiseren.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div className="flex items-center gap-2 bg-white rounded-lg p-2">
                  <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xs">1</span>
                  </div>
                  <span className="text-slate-700">Baten definiëren</span>
                </div>
                <div className="flex items-center gap-2 bg-white rounded-lg p-2">
                  <div className="w-5 h-5 bg-violet-500 rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xs">2</span>
                  </div>
                  <span className="text-slate-700">Inspanningen uitvoeren</span>
                </div>
                <div className="flex items-center gap-2 bg-white rounded-lg p-2">
                  <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xs">3</span>
                  </div>
                  <span className="text-slate-700">Voortgang monitoren</span>
                </div>
                <div className="flex items-center gap-2 bg-white rounded-lg p-2">
                  <div className="w-5 h-5 bg-amber-500 rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xs">4</span>
                  </div>
                  <span className="text-slate-700">Kennis delen</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTIE 5: De 5 Stuurparameters */}
      <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="bg-green-50 px-8 py-6 border-b border-green-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500 rounded-xl shadow-lg">
              <Gauge className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-green-900">5. De 5 Stuurparameters</h2>
              <p className="text-base text-green-700 mt-1">Waarop we het programma monitoren en bijsturen</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <p className="text-sm text-slate-600 mb-4">
            De stuurparameters zijn als "verkeerslichten" die aangeven hoe het programma ervoor staat.
            Per parameter bepalen we: groen (op koers), oranje (aandacht nodig), rood (actie vereist).
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {[
              { naam: 'Doeltreffendheid', vraag: 'Bereiken we de gewenste effecten?', focus: 'Batenrealisatie' },
              { naam: 'Tempo', vraag: 'Liggen we op schema?', focus: 'Planning & milestones' },
              { naam: 'Haalbaarheid', vraag: 'Kunnen we dit waarmaken?', focus: 'Resources & capaciteit' },
              { naam: 'Wendbaarheid', vraag: 'Kunnen we bijsturen indien nodig?', focus: 'Flexibiliteit' },
              { naam: 'Efficiëntie', vraag: 'Zetten we middelen juist in?', focus: 'Kosten & effort' }
            ].map((param, i) => (
              <div key={param.naam} className="bg-slate-50 rounded-xl p-4 text-center">
                <div className="w-10 h-10 bg-green-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold">{i + 1}</span>
                </div>
                <h4 className="font-semibold text-slate-800 text-sm mb-1">{param.naam}</h4>
                <p className="text-xs text-slate-500 italic mb-2">"{param.vraag}"</p>
                <div className="text-xs text-slate-600 bg-white px-2 py-1 rounded">
                  {param.focus}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full" />
              <span className="text-xs text-slate-600">Op koers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-amber-500 rounded-full" />
              <span className="text-xs text-slate-600">Aandacht nodig</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded-full" />
              <span className="text-xs text-slate-600">Actie vereist</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTIE 6: Governance Structuur */}
      <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="bg-amber-50 px-8 py-6 border-b border-amber-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-500 rounded-xl shadow-lg">
              <Users className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-amber-900">6. Governance Structuur</h2>
              <p className="text-base text-amber-700 mt-1">Wie is verantwoordelijk waarvoor</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Rollen */}
            <div className="space-y-3">
              <h3 className="font-semibold text-slate-800 mb-3">Kernrollen</h3>

              <div className="p-3 bg-amber-50 rounded-lg border-l-4 border-amber-500">
                <h4 className="font-semibold text-amber-800">Programma-eigenaar</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Eindverantwoordelijk voor programmasucces en batenrealisatie.
                  Besluit over strategische richting.
                </p>
              </div>

              <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-semibold text-blue-800">Programmamanager</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Dagelijkse leiding. Coördineert inspanningen, bewaakt samenhang,
                  rapporteert voortgang, escaleert issues.
                </p>
              </div>

              <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                <h4 className="font-semibold text-green-800">Baateigenaren</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Sectormanagers verantwoordelijk voor realisatie van baten
                  binnen hun sector.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border-l-4 border-slate-400">
                <h4 className="font-semibold text-slate-700">Inspanningsleiders</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Leiden individuele projecten, leertrajecten, procesverbeteringen
                  of systeemtrajecten.
                </p>
              </div>
            </div>

            {/* Overleg */}
            <div>
              <h3 className="font-semibold text-slate-800 mb-3">Overlegstructuur</h3>

              <div className="p-4 bg-purple-50 rounded-xl border border-purple-200 mb-4">
                <h4 className="font-semibold text-purple-800 mb-2">Programmaraad</h4>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-purple-700">2-wekelijks</span>
                </div>
                <p className="text-xs text-slate-600 mb-2">
                  Tactisch overleg voor afstemming, besluitvorming en voortgangsbespreking.
                </p>
                <div className="text-xs text-slate-500">
                  Deelnemers: PE, PM, Sectormanagers, Data/Tech, HR
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="font-semibold text-slate-700 mb-2">Relatie Programma ↔ Lijn</h4>
                <p className="text-xs text-slate-600">
                  Het programma <strong>ontwikkelt</strong> nieuwe werkwijzen.
                  De lijn <strong>voert uit</strong> en <strong>borgt</strong>.
                </p>
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 bg-[#003366] text-white rounded">
                    <strong>Programma:</strong> Nieuw ontwikkelen, piloteren
                  </div>
                  <div className="p-2 bg-green-500 text-white rounded">
                    <strong>Lijn:</strong> Uitvoeren, borgen, onderhouden
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl border border-slate-200 p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#003366] rounded-lg">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-[#003366]">Klant in Beeld</p>
              <p className="text-xs text-slate-500">Programma voor klantgerichtheid</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-slate-600">Cito</p>
            <p className="text-xs text-slate-400">Gebaseerd op "Werken aan Programma's"</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Introductie
