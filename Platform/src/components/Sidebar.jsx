import { NavLink } from 'react-router-dom'
import { useMethodologieStore } from '../stores/methodologieStore'
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
  Play
} from 'lucide-react'

const navItems = [
  { path: '/introductie', icon: BookOpen, label: 'Introductie', description: 'Start hier' },
  { path: '/', icon: LayoutDashboard, label: 'Methodologie', description: "8 Thema's & Cycli" },
  { path: '/framework', icon: Layers, label: 'Framework', description: 'Baten × Domeinen' },
  { path: '/templates', icon: FileText, label: 'Templates', description: 'Werkvormen' },
  { path: '/sessies', icon: Play, label: 'Sessies', description: 'Facilitatie' },
  { path: '/dashboard', icon: TrendingUp, label: 'Dashboard', description: 'Status overzicht' },
  { type: 'divider', label: 'Sectoren' },
  { path: '/sector/po', label: 'PO', description: 'Primair Onderwijs', color: '#3b82f6' },
  { path: '/sector/vo', label: 'VO', description: 'Voortgezet Onderwijs', color: '#8b5cf6' },
  { path: '/sector/professionals', label: 'ZAK', description: 'Professionals', color: '#f59e0b' },
  { type: 'divider', label: 'Data' },
  { path: '/baten', icon: Target, label: 'Baten' },
  { path: '/inspanningen', icon: ListTodo, label: 'Inspanningen' },
  { path: '/governance', icon: Users, label: 'Governance' },
  { path: '/roadmap', icon: CalendarDays, label: 'Roadmap' },
]

function Sidebar() {
  const { getTotaleVoortgang, voortgang } = useMethodologieStore()
  const totaal = getTotaleVoortgang()

  const navLinkClass = (isActive) => 
    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 " + 
    (isActive ? "bg-white/[0.12] text-white" : "text-white/50 hover:bg-white/[0.06] hover:text-white/80")

  return (
    <aside className="w-[260px] bg-gradient-to-b from-[#003366] via-[#002d5a] to-[#002244] text-white flex flex-col">
      <div className="p-6 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#ff6600] to-[#e55a00] rounded-xl flex items-center justify-center shadow-lg shadow-orange-900/20">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-semibold text-[15px] tracking-tight">Klant in Beeld</h1>
            <p className="text-[11px] text-white/40 font-medium">Cito Programma</p>
          </div>
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
          className={({ isActive }) => navLinkClass(isActive)}
        >
          <Settings className="w-[18px] h-[18px] opacity-80" />
          <span className="font-medium text-[13px]">Instellingen</span>
        </NavLink>
        <div className="mt-4 px-3 text-[10px] text-white/20">
          <div className="font-medium">Werken aan Programmas</div>
          <div className="mt-0.5 opacity-70">v1.0.0</div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
