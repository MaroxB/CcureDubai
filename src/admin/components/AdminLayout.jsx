import { useState } from 'react'
import { NavLink, useNavigate, Outlet } from 'react-router-dom'
import {
  LayoutDashboard, Scissors, CalendarDays, Clock,
  Image, Settings, LogOut, Menu, Sparkles, ChevronRight,
  ExternalLink, Users,
} from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'

const ADMIN_NAV = [
  { to: '/admin/dashboard',       label: 'Dashboard',       icon: LayoutDashboard },
  { to: '/admin/specialisten',    label: 'Specialisten',    icon: Users },
  { to: '/admin/diensten',        label: 'Diensten',        icon: Scissors },
  { to: '/admin/boekingen',       label: 'Boekingen',       icon: CalendarDays },
  { to: '/admin/beschikbaarheid', label: 'Beschikbaarheid', icon: Clock },
  { to: '/admin/galerij',         label: 'Galerij',         icon: Image },
  { to: '/admin/instellingen',    label: 'Instellingen',    icon: Settings },
]

const SPECIALIST_NAV = [
  { to: '/admin/dashboard',       label: 'Dashboard',    icon: LayoutDashboard },
  { to: '/admin/boekingen',       label: 'Boekingen',    icon: CalendarDays },
  { to: '/admin/beschikbaarheid', label: 'Mijn agenda',  icon: Clock },
]

function SidebarLink({ item, collapsed, onClick }) {
  const Icon = item.icon
  return (
    <NavLink
      to={item.to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
          isActive
            ? 'bg-gradient-to-r from-[#A41162] to-[#953D7F] text-white shadow-[0_2px_12px_rgba(164,17,98,0.3)]'
            : 'text-[#7A6270] hover:bg-[#F9E8F3] hover:text-[#A41162]'
        }`
      }
    >
      <Icon size={18} className="flex-shrink-0" />
      {!collapsed && <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>}
    </NavLink>
  )
}

export default function AdminLayout() {
  const { logout, siteConfig, stats, isAdmin, isSpecialist, currentUser, specialists } = useAdmin()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  const handleLogout = () => { logout(); navigate('/admin') }

  const navItems = isAdmin ? ADMIN_NAV : SPECIALIST_NAV

  const displayName = isAdmin
    ? (siteConfig?.branding?.businessName || 'C-Cure')
    : currentUser?.name || 'Specialist'

  const roleLabel = isAdmin ? 'Hoofdbeheerder' : 'Specialist'

  // Specialist avatar color
  const specialistColor = isSpecialist
    ? (specialists.find(s => s.id === currentUser?.id)?.color || '#A41162')
    : null

  return (
    <div className="min-h-screen bg-[#FAF7F5] flex">
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── SIDEBAR ───────────────────────────────────────────── */}
      <aside className={`
        fixed top-0 left-0 bottom-0 z-50 flex flex-col bg-white border-r border-[#EDD8E8]/60
        transition-all duration-300 shadow-[2px_0_16px_rgba(164,17,98,0.06)]
        lg:relative lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${collapsed ? 'w-[68px]' : 'w-64'}
      `}>
        {/* Identity */}
        <div className={`flex items-center gap-3 px-4 py-5 border-b border-[#EDD8E8]/60 ${collapsed ? 'justify-center' : ''}`}>
          {isSpecialist ? (
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-white text-sm font-semibold"
              style={{ background: `linear-gradient(135deg, ${specialistColor}, ${specialistColor}cc)` }}
            >
              {displayName.charAt(0).toUpperCase()}
            </div>
          ) : (
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#A41162] to-[#953D7F] flex items-center justify-center flex-shrink-0">
              <Sparkles size={15} className="text-white" />
            </div>
          )}
          {!collapsed && (
            <div className="min-w-0">
              <p className="font-serif text-sm text-[#2C2028] truncate">{displayName}</p>
              <p className="text-[10px] text-[#9D8090]">{roleLabel}</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            <SidebarLink key={item.to} item={item} collapsed={collapsed} onClick={() => setSidebarOpen(false)} />
          ))}
        </nav>

        {/* Bottom actions */}
        <div className="px-3 py-4 border-t border-[#EDD8E8]/60 space-y-1">
          {isAdmin && (
            <a href="/" target="_blank" rel="noopener noreferrer"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#7A6270] hover:bg-[#F9E8F3] hover:text-[#A41162] transition-all duration-200 ${collapsed ? 'justify-center' : ''}`}>
              <ExternalLink size={18} className="flex-shrink-0" />
              {!collapsed && <span className="text-sm font-medium">Bekijk website</span>}
            </a>
          )}
          <button onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#7A6270] hover:bg-red-50 hover:text-red-500 transition-all duration-200 ${collapsed ? 'justify-center' : ''}`}>
            <LogOut size={18} className="flex-shrink-0" />
            {!collapsed && <span className="text-sm font-medium">Uitloggen</span>}
          </button>
        </div>

        <button onClick={() => setCollapsed(v => !v)}
          className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 rounded-full bg-white border border-[#EDD8E8] shadow-soft items-center justify-center text-[#9D8090] hover:text-[#A41162] transition-colors">
          <ChevronRight size={12} className={`transition-transform duration-300 ${collapsed ? '' : 'rotate-180'}`} />
        </button>
      </aside>

      {/* ── MAIN ──────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-[#EDD8E8]/60 px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <button onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-xl text-[#7A6270] hover:bg-[#F9E8F3] hover:text-[#A41162] transition-colors">
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2 ml-auto text-xs text-[#9D8090]">
            {isSpecialist && (
              <span className="font-medium text-[#A41162] hidden sm:inline">{currentUser?.name}</span>
            )}
            <span className="hidden sm:inline">Boekingen:</span>
            <span className="font-semibold text-[#A41162]">{stats.totalBookings}</span>
            {isAdmin && (
              <>
                <span className="hidden sm:inline text-[#EDD8E8]">·</span>
                <span className="hidden sm:inline">Specialisten:</span>
                <span className="hidden sm:inline font-semibold text-[#A41162]">{stats.totalSpecialists}</span>
              </>
            )}
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
