import { NavLink } from 'react-router-dom'
import { useMethodologieStore } from '../stores/methodologieStore'
import { useAuth } from './Auth/AuthProvider'
import { useSidebar } from '../hooks/useResponsive'
import {
  BookOpen,
  LayoutDashboard,
  Target,
  ListTodo,
  Users,
  CalendarDays,
  Settings,
  TrendingUp,
  ChevronRight,
  Layers,
  FileText,
  Play,
  Scale,
  Eye,
  Zap,
  Link2,
  LogOut,
  User,
  X
} from 'lucide-react'

const navItems = [
  // Programma niveau - conceptueel
  { path: '/introductie', icon: BookOpen, label: 'Introductie', description: 'Start hier' },
  { path: '/', icon: LayoutDashboard, label: 'Programmaverloop', description: 'Cycli & Activiteiten' },
  { path: '/programma-vs-lijn', icon: Scale, label: 'Programma vs Lijn', description: 'Beslissingstool' },
  { path: '/governance', icon: Users, label: 'Governance', description: 'Wie doet wat' },
  // Sectoren - doelgroepen
  { type: 'divider', label: 'Sectoren' },
  { path: '/sector/po', label: 'PO', description: 'Primair Onderwijs', color: '#3b82f6' },
  { path: '/sector/vo', label: 'VO', description: 'Voortgezet Onderwijs', color: '#8b5cf6' },
  { path: '/sector/professionals', label: 'ZAK', description: 'Professionals', color: '#f59e0b' },
  // DIN Keten - juiste volgorde
  { type: 'divider', label: 'DIN Keten' },
  { path: '/din-keten', icon: Link2, label: 'DIN Overzicht', description: 'Complete keten' },
  { path: '/visie-doelen', icon: Eye, label: 'Visie & Doelen', description: '1. Strategische richting' },
  { path: '/baten', icon: Target, label: 'Baten', description: '2. Meetbare resultaten' },
  { path: '/vermogens', icon: Zap, label: 'Vermogens', description: '3. Capabilities' },
  { path: '/inspanningen', icon: ListTodo, label: 'Inspanningen', description: '4. Projecten & processen' },
  // Tools
  { type: 'divider', label: 'Tools' },
  { path: '/dashboard', icon: TrendingUp, label: 'AI Dashboard', description: 'Vraag & Visualiseer' },
  { path: '/roadmap', icon: CalendarDays, label: 'Roadmap', description: 'Planning' },
  { path: '/templates', icon: FileText, label: 'Templates', description: 'Werkvormen' },
  { path: '/sessies', icon: Play, label: 'Sessies', description: 'Facilitatie' },
]

function Sidebar() {
  const { getTotaleVoortgang, voortgang } = useMethodologieStore()
  const { user, signOut, requiresAuth } = useAuth()
  const { isOpen, close } = useSidebar()
  const totaal = getTotaleVoortgang()

  const navLinkClass = (isActive) =>
    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 touch-target " +
    (isActive ? "bg-white/[0.12] text-white" : "text-white/50 hover:bg-white/[0.06] hover:text-white/80")

  // Sluit sidebar bij navigatie (op desktop heeft dit geen effect)
  const handleNavClick = () => close()

  // Sidebar: Mobile = hidden overlay, Desktop = static (using custom CSS)
  const sidebarClasses = `sidebar-mobile ${isOpen ? 'open' : ''}`

  return (
    <>
      {/* Backdrop voor mobiel - alleen zichtbaar als menu open */}
      {isOpen && (
        <div
          className="sidebar-backdrop fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={close}
          aria-hidden="true"
        />
      )}

      <aside className={`${sidebarClasses} bg-gradient-to-b from-[#003366] via-[#002d5a] to-[#002244] text-white`}>
      <div className="p-6 border-b border-white/[0.06]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#ff6600] to-[#e55a00] rounded-xl flex items-center justify-center shadow-lg shadow-orange-900/20">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-semibold text-[15px] tracking-tight">Klant in Beeld</h1>
              <p className="text-[11px] text-white/40 font-medium">Cito Programma</p>
            </div>
          </div>

          {/* Close button - alleen zichtbaar op mobiel via CSS */}
          <button
            onClick={close}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors lg:hidden"
            aria-label="Sluit menu"
          >
            <X className="w-5 h-5 text-white/60" />
          </button>
        </div>

        <div className="mt-5">
          <div className="flex justify-between text-[11px] mb-2">
            <span className="text-white/40 font-medium">Voortgang</span>
            <span className="text-white font-semibold">{totaal.percentage}%</span>
          </div>
          <div className="h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#ff6600] to-[#ff8533] rounded-full transition-all duration-700 ease-out"
              style={{ width: totaal.percentage + '%' }}
            />
          </div>
          <div className="text-[10px] text-white/30 mt-2 font-medium uppercase tracking-wider">
            {voortgang.huidigeCyclus}
          </div>
        </div>
      </div>

      <nav className="flex-1 py-4 px-3 overflow-y-auto">
        <ul className="space-y-0.5">
          {navItems.map((item, index) => {
            if (item.type === 'divider') {
              return (
                <li key={index} className="pt-6 pb-3">
                  <span className="text-[10px] font-semibold text-white/25 uppercase tracking-[0.15em] px-3">
                    {item.label}
                  </span>
                </li>
              )
            }

            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={handleNavClick}
                  className={({ isActive }) => navLinkClass(isActive)}
                >
                  {item.icon ? (
                    <item.icon className="w-[18px] h-[18px] flex-shrink-0 opacity-80" />
                  ) : item.color ? (
                    <div
                      className="w-[18px] h-[18px] rounded-md flex items-center justify-center text-[10px] font-bold text-white shadow-sm"
                      style={{ backgroundColor: item.color }}
                    >
                      {item.label.charAt(0)}
                    </div>
                  ) : (
                    <div className="w-[18px] h-[18px]" />
                  )}
                  <div className="flex-1 min-w-0">
                    <span className="font-medium text-[13px]">{item.label}</span>
                    {item.description && (
                      <p className="text-[10px] opacity-50 truncate mt-0.5">{item.description}</p>
                    )}
                  </div>
                  {item.path === '/' && (
                    <ChevronRight className="w-3.5 h-3.5 opacity-30" />
                  )}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-white/[0.06]">
        <NavLink
          to="/settings"
          onClick={handleNavClick}
          className={({ isActive }) => navLinkClass(isActive)}
        >
          <Settings className="w-[18px] h-[18px] opacity-80" />
          <span className="font-medium text-[13px]">Instellingen</span>
        </NavLink>

        {/* User info & Logout */}
        {requiresAuth && user && (
          <div className="mt-3 pt-3 border-t border-white/[0.06]">
            <div className="flex items-center gap-2 px-3 py-2">
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
                <User className="w-4 h-4 text-white/60" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] text-white/60 truncate">
                  {user.email}
                </p>
              </div>
            </div>
            <button
              onClick={signOut}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-white/50 hover:bg-white/[0.06] hover:text-white/80 transition-all duration-150"
            >
              <LogOut className="w-[18px] h-[18px] opacity-80" />
              <span className="font-medium text-[13px]">Uitloggen</span>
            </button>
          </div>
        )}

        <div className="mt-4 px-3 text-[10px] text-white/20">
          <div className="font-medium">Werken aan Programmas</div>
          <div className="mt-0.5 opacity-70">v1.0.0</div>
        </div>
      </div>
      </aside>
    </>
  )
}

export default Sidebar
