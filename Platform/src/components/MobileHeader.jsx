import { Menu, TrendingUp } from 'lucide-react'
import { useSidebar } from '../hooks/useResponsive'

function MobileHeader() {
  const { open } = useSidebar()

  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-gradient-to-r from-[#003366] to-[#002244] px-4 py-3 flex items-center gap-3 safe-top">
      <button
        onClick={open}
        className="p-2 -ml-2 rounded-lg hover:bg-white/10 transition-colors touch-target"
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6 text-white" />
      </button>

      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-br from-[#ff6600] to-[#e55a00] rounded-lg flex items-center justify-center shadow-lg">
          <TrendingUp className="w-4 h-4 text-white" />
        </div>
        <span className="font-semibold text-white text-sm">Klant in Beeld</span>
      </div>
    </header>
  )
}

export default MobileHeader
