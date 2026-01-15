import { useState, useEffect, useRef } from 'react'
import { X, ChevronRight, ChevronLeft, Check, Sparkles } from 'lucide-react'

// Tour steps configuration
const TOUR_STEPS = [
  {
    target: '[data-tour="welcome"]',
    title: 'Welkom bij AI Dashboard',
    content: 'Ontdek hoe je met natuurlijke vragen inzicht krijgt in je programma data.',
    position: 'center'
  },
  {
    target: '[data-tour="query-input"]',
    title: 'Stel een vraag',
    content: 'Typ hier je vraag in natuurlijke taal, zoals "Hoeveel baten zijn er?" of "Vergelijk NPS per sector".',
    position: 'top'
  },
  {
    target: '[data-tour="suggestions"]',
    title: 'Snelle suggesties',
    content: 'Klik op een suggestie om snel relevante data te bekijken. De suggesties passen zich aan op basis van je eerdere vragen.',
    position: 'top'
  },
  {
    target: '[data-tour="widget-grid"]',
    title: 'Widget Canvas',
    content: 'Hier verschijnen je dashboard widgets. Je kunt ze verplaatsen, verwijderen, en nieuwe toevoegen.',
    position: 'left'
  },
  {
    target: '[data-tour="sector-filter"]',
    title: 'Filter per sector',
    content: 'Filter alle widgets tegelijk op sector om specifieke inzichten te krijgen.',
    position: 'bottom'
  },
  {
    target: '[data-tour="ai-panel"]',
    title: 'AI Assistent',
    content: 'De AI assistent houdt context bij en kan follow-up vragen beantwoorden. Je gesprek wordt bewaard.',
    position: 'left'
  }
]

/**
 * OnboardingTour Component
 * Guides new users through the AI Dashboard features
 */
export default function OnboardingTour({ isOpen, onComplete, onSkip }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [targetRect, setTargetRect] = useState(null)
  const spotlightRef = useRef(null)

  const step = TOUR_STEPS[currentStep]
  const isLastStep = currentStep === TOUR_STEPS.length - 1
  const isFirstStep = currentStep === 0

  // Find and highlight target element
  useEffect(() => {
    if (!isOpen || !step) return

    const findTarget = () => {
      if (step.position === 'center') {
        setTargetRect(null)
        return
      }

      const target = document.querySelector(step.target)
      if (target) {
        const rect = target.getBoundingClientRect()
        setTargetRect({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height
        })
        // Scroll target into view
        target.scrollIntoView({ behavior: 'smooth', block: 'center' })
      } else {
        setTargetRect(null)
      }
    }

    // Small delay to allow for animations
    const timeout = setTimeout(findTarget, 100)
    window.addEventListener('resize', findTarget)
    window.addEventListener('scroll', findTarget)

    return () => {
      clearTimeout(timeout)
      window.removeEventListener('resize', findTarget)
      window.removeEventListener('scroll', findTarget)
    }
  }, [isOpen, currentStep, step])

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onSkip()
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        if (isLastStep) {
          onComplete()
        } else {
          setCurrentStep(prev => prev + 1)
        }
      } else if (e.key === 'ArrowLeft' && !isFirstStep) {
        setCurrentStep(prev => prev - 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, isLastStep, isFirstStep, onComplete, onSkip])

  if (!isOpen) return null

  // Calculate tooltip position
  const getTooltipStyle = () => {
    if (!targetRect || step.position === 'center') {
      return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }
    }

    const padding = 16
    const tooltipWidth = 320

    switch (step.position) {
      case 'top':
        return {
          bottom: `calc(100% - ${targetRect.top - padding}px)`,
          left: Math.max(padding, targetRect.left + targetRect.width / 2 - tooltipWidth / 2)
        }
      case 'bottom':
        return {
          top: targetRect.top + targetRect.height + padding,
          left: Math.max(padding, targetRect.left + targetRect.width / 2 - tooltipWidth / 2)
        }
      case 'left':
        return {
          top: targetRect.top + targetRect.height / 2,
          right: `calc(100% - ${targetRect.left - padding}px)`,
          transform: 'translateY(-50%)'
        }
      case 'right':
        return {
          top: targetRect.top + targetRect.height / 2,
          left: targetRect.left + targetRect.width + padding,
          transform: 'translateY(-50%)'
        }
      default:
        return {}
    }
  }

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Overlay with spotlight cutout */}
      <div className="absolute inset-0 bg-black/60 transition-all duration-300">
        {/* Spotlight cutout using clip-path */}
        {targetRect && (
          <div
            ref={spotlightRef}
            className="absolute bg-transparent ring-4 ring-[#003366] ring-opacity-50 rounded-xl transition-all duration-300"
            style={{
              top: targetRect.top - 8,
              left: targetRect.left - 8,
              width: targetRect.width + 16,
              height: targetRect.height + 16,
              boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.6)'
            }}
          />
        )}
      </div>

      {/* Tooltip */}
      <div
        className="absolute w-80 bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200"
        style={getTooltipStyle()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-br from-[#003366] via-[#004080] to-[#002855] text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold">{step.title}</h3>
              <p className="text-xs text-white/60">
                Stap {currentStep + 1} van {TOUR_STEPS.length}
              </p>
            </div>
          </div>
          <button
            onClick={onSkip}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors"
            aria-label="Tour overslaan"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-5 py-4">
          <p className="text-sm text-slate-600 leading-relaxed">{step.content}</p>
        </div>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-1.5 py-2">
          {TOUR_STEPS.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentStep
                  ? 'w-6 bg-[#003366]'
                  : index < currentStep
                    ? 'bg-[#003366]/50'
                    : 'bg-slate-200'
              }`}
              aria-label={`Ga naar stap ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100 bg-slate-50">
          <button
            onClick={() => setCurrentStep(prev => prev - 1)}
            disabled={isFirstStep}
            className="flex items-center gap-1 px-3 py-2 text-sm text-slate-600 hover:text-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Vorige
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onSkip}
              className="px-3 py-2 text-sm text-slate-500 hover:text-slate-700 transition-colors"
            >
              Overslaan
            </button>
            <button
              onClick={() => {
                if (isLastStep) {
                  onComplete()
                } else {
                  setCurrentStep(prev => prev + 1)
                }
              }}
              className="flex items-center gap-1 px-4 py-2 bg-[#003366] text-white text-sm font-medium rounded-xl hover:bg-[#002855] transition-colors"
            >
              {isLastStep ? (
                <>
                  <Check className="w-4 h-4" />
                  Voltooien
                </>
              ) : (
                <>
                  Volgende
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
