/**
 * BottomNav - Mobile Bottom Navigation Component
 *
 * Provides thumb-friendly navigation at the bottom of the screen
 * Only visible on mobile devices (< 1024px)
 * Part of Scenario C: Mobile-First Redesign
 */

import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Target,
  ListTodo,
  Sparkles,
  Menu
} from 'lucide-react'
import { useSidebar } from '../hooks/useResponsive'

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Home' },
  { path: '/din-keten', icon: Target, label: 'DIN' },
  { path: '/inspanningen', icon: ListTodo, label: 'Taken' },
  { path: '/dashboard', icon: Sparkles, label: 'AI' },
]

function BottomNav() {
  const { open } = useSidebar()
  const location = useLocation()

  // Check if current path matches (for highlighting)
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/' || location.pathname === '/methodologie'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 safe-bottom">
      <div className="flex items-center justify-around px-2 py-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.path)

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all min-w-[60px] ${
                active
                  ? 'text-[#003366] bg-blue-50'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Icon className={`w-5 h-5 ${active ? 'text-[#003366]' : ''}`} />
              <span className={`text-[10px] mt-0.5 font-medium ${active ? 'text-[#003366]' : ''}`}>
                {item.label}
              </span>
            </NavLink>
          )
        })}

        {/* Menu button to open full sidebar */}
        <button
          onClick={open}
          className="flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all min-w-[60px] text-slate-500 hover:text-slate-700 hover:bg-slate-50"
          aria-label="Menu"
        >
          <Menu className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 font-medium">Meer</span>
        </button>
      </div>
    </nav>
  )
}

export default BottomNav
