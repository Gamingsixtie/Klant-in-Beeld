/**
 * ThemaGrid Component
 *
 * Grid weergave van de 8 thema's met progressive disclosure.
 * Gebruikt bestaande data uit methodologie.js - inhoud ongewijzigd.
 */

import {
  CheckSquare,
  Lightbulb,
  Users,
  Compass,
  Scale,
  Handshake,
  Crown,
  TrendingUp
} from 'lucide-react'

// Icon mapping voor thema's
const THEMA_ICONS = {
  kiezen: CheckSquare,
  vormgeven: Lightbulb,
  organiseren: Users,
  sturen: Compass,
  beslissen: Scale,
  samenwerken: Handshake,
  leiden: Crown,
  ontwikkelen: TrendingUp
}

export function ThemaGrid({
  themas,
  getThemaVoortgang,
  huidigeCyclus,
  onThemaClick
}) {
  return (
    <div className="grid grid-cols-4 gap-3">
      {themas.map(thema => {
        const voortgang = getThemaVoortgang(thema.id, huidigeCyclus)
        const Icon = THEMA_ICONS[thema.id] || CheckSquare

        return (
          <button
            key={thema.id}
            onClick={() => onThemaClick(thema)}
            className="
              p-4 rounded-lg border-2 hover:shadow-md transition-all text-left group
              focus-visible:ring-2 focus-visible:ring-[var(--color-cito-blue)] focus-visible:ring-offset-2
            "
            style={{
              borderColor: `${thema.kleur}40`,
              backgroundColor: `${thema.kleur}05`
            }}
            aria-label={`Bekijk details van thema ${thema.naam}`}
          >
            {/* Header met icon en nummer */}
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${thema.kleur}20` }}
              >
                <Icon
                  className="w-4 h-4"
                  style={{ color: thema.kleur }}
                />
              </div>
              <span
                className="text-xs font-medium px-1.5 py-0.5 rounded"
                style={{
                  backgroundColor: `${thema.kleur}15`,
                  color: thema.kleur
                }}
              >
                {thema.nummer}
              </span>
            </div>

            {/* Thema naam */}
            <h4 className="font-medium text-gray-800 text-sm group-hover:text-gray-900">
              {thema.naam}
            </h4>

            {/* Subtitel */}
            <p className="text-xs text-gray-500 mt-1 line-clamp-1">
              {thema.subtitel}
            </p>

            {/* Voortgang indicator */}
            {voortgang.total > 0 && (
              <div className="mt-3 flex items-center gap-2">
                <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${voortgang.percentage}%`,
                      backgroundColor: thema.kleur
                    }}
                  />
                </div>
                <span className="text-[10px] text-gray-400">
                  {voortgang.percentage}%
                </span>
              </div>
            )}
          </button>
        )
      })}
    </div>
  )
}

export default ThemaGrid
