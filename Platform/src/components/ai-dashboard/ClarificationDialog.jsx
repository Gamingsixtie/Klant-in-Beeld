import { HelpCircle, X, ChevronRight } from 'lucide-react'

/**
 * ClarificationDialog Component
 * Shows when the AI needs clarification on an ambiguous query
 */
export default function ClarificationDialog({
  isOpen,
  question,
  options,
  onSelect,
  onClose
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
          <div className="p-2 bg-blue-50 rounded-xl">
            <HelpCircle className="w-5 h-5 text-[#003366]" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-800">Even verduidelijken</h3>
            <p className="text-xs text-slate-500">Kies een optie om verder te gaan</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
            aria-label="Sluiten"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Question */}
        <div className="px-5 py-4">
          <p className="text-sm text-slate-700 font-medium mb-4">{question}</p>

          {/* Options */}
          <div className="space-y-2">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => onSelect(option)}
                className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-[#003366]/30 rounded-xl text-left transition-all group"
              >
                <div className="flex items-center gap-3">
                  {option.icon && (
                    <span className="text-lg">{option.icon}</span>
                  )}
                  <div>
                    <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
                      {option.label}
                    </span>
                    {option.description && (
                      <p className="text-xs text-slate-500 mt-0.5">{option.description}</p>
                    )}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#003366] transition-colors" />
              </button>
            ))}
          </div>
        </div>

        {/* Footer hint */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100">
          <p className="text-xs text-slate-400 text-center">
            Druk op <kbd className="px-1.5 py-0.5 bg-white rounded border border-slate-200 font-mono text-[10px]">Esc</kbd> om te annuleren
          </p>
        </div>
      </div>
    </div>
  )
}
