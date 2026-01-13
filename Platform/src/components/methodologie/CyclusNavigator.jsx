/**
 * CyclusNavigator Component
 *
 * Horizontale weergave van de 4 levensloopcycli met voortgang.
 * Gebruikt bestaande data uit methodologie.js - inhoud ongewijzigd.
 */

import { CheckCircle, Circle, ArrowRight } from 'lucide-react'

// Cyclus kleuren mapping (uit design tokens)
const CYCLUS_KLEUREN = {
  verkennen: 'var(--color-cyclus-verkennen)',
  opbouwen: 'var(--color-cyclus-opbouwen)',
  uitvoeren: 'var(--color-cyclus-uitvoeren)',
  afbouwen: 'var(--color-cyclus-afbouwen)'
}

export function CyclusNavigator({
  cycli,
  huidigeCyclus,
  getCyclusVoortgang,
  onCyclusClick
}) {
  return (
    <div className="flex items-stretch gap-2">
      {cycli.map((cyclus, index) => {
        const voortgang = getCyclusVoortgang(cyclus.id)
        const isHuidig = cyclus.id === huidigeCyclus
        const isPast = cycli.findIndex(c => c.id === huidigeCyclus) > index
        const isAfgerond = voortgang.percentage === 100
        const kleur = CYCLUS_KLEUREN[cyclus.id]

        return (
          <div key={cyclus.id} className="flex items-center flex-1">
            <button
              onClick={() => onCyclusClick(cyclus)}
              aria-label={`Bekijk details van cyclus ${cyclus.naam}`}
              aria-current={isHuidig ? 'step' : undefined}
              className={`
                flex-1 p-4 rounded-xl text-left transition-all cursor-pointer
                hover:shadow-md focus-visible:ring-2 focus-visible:ring-[var(--color-cito-blue)] focus-visible:ring-offset-2
                ${isHuidig
                  ? 'ring-2 ring-offset-2 shadow-md'
                  : isPast || isAfgerond
                    ? 'bg-gray-50'
                    : 'bg-gray-50/50'
                }
              `}
              style={{
                borderColor: isHuidig ? kleur : 'transparent',
                ringColor: isHuidig ? kleur : undefined
              }}
            >
              {/* Header met nummer en status */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundColor: kleur }}
                  >
                    {cyclus.nummer}
                  </div>
                  <span className="font-medium text-gray-800">{cyclus.naam}</span>
                </div>

                {/* Status indicator */}
                {isAfgerond ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : isHuidig ? (
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-300" />
                )}
              </div>

              {/* Progress bar */}
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${voortgang.percentage}%`,
                    backgroundColor: kleur
                  }}
                />
              </div>

              {/* Voortgang tekst */}
              <div className="mt-2 text-xs text-gray-500">
                {voortgang.completed}/{voortgang.total} activiteiten
                {isHuidig && (
                  <span className="ml-2 text-green-600 font-medium">• Actief</span>
                )}
              </div>
            </button>

            {/* Arrow connector (niet na laatste) */}
            {index < cycli.length - 1 && (
              <ArrowRight className="w-5 h-5 text-gray-300 mx-1 flex-shrink-0" />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default CyclusNavigator
