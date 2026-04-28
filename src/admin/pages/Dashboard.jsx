import { Link } from 'react-router-dom'
import {
  CalendarDays, Scissors, Clock, CheckCircle2, Euro,
  ArrowRight, Users, TrendingUp,
} from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'

function StatCard({ label, value, icon: Icon, color, sub }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-[0_2px_12px_rgba(44,32,40,0.06)] border border-[#EDD8E8]/40">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          <Icon size={18} className="text-white" />
        </div>
      </div>
      <p className="text-2xl font-semibold text-[#2C2028]">{value}</p>
      <p className="text-sm text-[#7A6270] mt-0.5">{label}</p>
      {sub && <p className="text-xs text-[#9D8090] mt-1">{sub}</p>}
    </div>
  )
}

function BookingRow({ booking }) {
  const statusConfig = {
    pending:   { label: 'Wachtend',    bg: 'bg-amber-50',  text: 'text-amber-600',  dot: 'bg-amber-400' },
    confirmed: { label: 'Bevestigd',   bg: 'bg-green-50',  text: 'text-green-600',  dot: 'bg-green-400' },
    cancelled: { label: 'Geannuleerd', bg: 'bg-red-50',    text: 'text-red-500',    dot: 'bg-red-400' },
  }
  const s = statusConfig[booking.status] || statusConfig.pending
  return (
    <div className="flex items-center gap-4 py-3 border-b border-[#FAF7F5] last:border-0">
      <div className="w-10 h-10 rounded-full bg-[#F9E8F3] flex items-center justify-center flex-shrink-0">
        <span className="text-sm font-serif text-[#A41162]">
          {(booking.clientName || 'K').charAt(0).toUpperCase()}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[#2C2028] truncate">{booking.clientName}</p>
        <p className="text-xs text-[#9D8090] truncate">{booking.serviceName} · {booking.date} {booking.time}</p>
      </div>
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${s.bg} ${s.text} flex-shrink-0`}>
        <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
        {s.label}
      </span>
    </div>
  )
}

function QuickAction({ to, icon: Icon, label, description, color }) {
  return (
    <Link to={to}
      className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-[#EDD8E8]/40 hover:border-[#A41162]/20 hover:shadow-[0_4px_16px_rgba(164,17,98,0.08)] transition-all duration-200 group">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
        <Icon size={18} className="text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[#2C2028]">{label}</p>
        <p className="text-xs text-[#9D8090]">{description}</p>
      </div>
      <ArrowRight size={16} className="text-[#9D8090] group-hover:text-[#A41162] transition-colors flex-shrink-0" />
    </Link>
  )
}

// ─── Admin overview dashboard ───────────────────────────────────────────────
function AdminDashboard({ stats, bookings, specialists, siteConfig }) {
  const businessName = siteConfig?.branding?.businessName || 'C-Cure'
  const recentBookings = [...bookings]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5)

  const greeting = () => {
    const h = new Date().getHours()
    if (h < 12) return 'Goedemorgen'
    if (h < 17) return 'Goedemiddag'
    return 'Goedenavond'
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="font-serif text-2xl md:text-3xl text-[#2C2028]">{greeting()}, {businessName} 👋</h1>
        <p className="text-[#7A6270] text-sm mt-1">
          {new Date().toLocaleDateString('nl-BE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Totale boekingen" value={stats.totalBookings} icon={CalendarDays}
          color="bg-gradient-to-br from-[#A41162] to-[#953D7F]" sub={`${stats.pendingBookings} wachtend`} />
        <StatCard label="Bevestigd" value={stats.confirmedBookings} icon={CheckCircle2}
          color="bg-gradient-to-br from-emerald-500 to-emerald-600" />
        <StatCard label="Specialisten" value={stats.totalSpecialists} icon={Users}
          color="bg-gradient-to-br from-violet-500 to-violet-600" />
        <StatCard label="Omzet (bevestigd)" value={`€ ${stats.totalRevenue}`} icon={Euro}
          color="bg-gradient-to-br from-amber-500 to-orange-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent bookings */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 shadow-[0_2px_12px_rgba(44,32,40,0.06)] border border-[#EDD8E8]/40">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-lg text-[#2C2028]">Recente boekingen</h2>
            <Link to="/admin/boekingen" className="text-xs text-[#A41162] hover:underline flex items-center gap-1">
              Alle bekijken <ArrowRight size={12} />
            </Link>
          </div>
          {recentBookings.length === 0 ? (
            <div className="py-10 text-center">
              <CalendarDays size={32} className="mx-auto text-[#EDD8E8] mb-3" />
              <p className="text-sm text-[#9D8090]">Nog geen boekingen</p>
            </div>
          ) : (
            recentBookings.map(b => <BookingRow key={b.id} booking={b} />)
          )}
        </div>

        {/* Quick actions */}
        <div className="space-y-3">
          <h2 className="font-serif text-lg text-[#2C2028] px-1">Snelle acties</h2>
          <QuickAction to="/admin/specialisten" icon={Users} label="Specialisten beheren"
            description="Medewerkers toevoegen of aanpassen" color="bg-gradient-to-br from-violet-500 to-violet-600" />
          <QuickAction to="/admin/boekingen" icon={CalendarDays} label="Boeking toevoegen"
            description="Handmatig een afspraak inplannen" color="bg-gradient-to-br from-[#A41162] to-[#953D7F]" />
          <QuickAction to="/admin/diensten" icon={Scissors} label="Diensten beheren"
            description="Behandelingen toevoegen of aanpassen" color="bg-gradient-to-br from-emerald-500 to-emerald-600" />
        </div>
      </div>

      {/* Specialists overview */}
      {specialists.length > 0 && (
        <div className="bg-white rounded-2xl p-5 shadow-[0_2px_12px_rgba(44,32,40,0.06)] border border-[#EDD8E8]/40">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-lg text-[#2C2028]">Team</h2>
            <Link to="/admin/specialisten" className="text-xs text-[#A41162] hover:underline flex items-center gap-1">
              Beheren <ArrowRight size={12} />
            </Link>
          </div>
          <div className="flex flex-wrap gap-3">
            {specialists.map(s => (
              <div key={s.id} className="flex items-center gap-2.5 px-3 py-2 bg-[#FAF7F5] rounded-xl">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-semibold"
                  style={{ background: s.color || '#A41162' }}>
                  {s.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium text-[#2C2028]">{s.name}</p>
                  {s.speciality && <p className="text-xs text-[#9D8090]">{s.speciality}</p>}
                </div>
                <span className={`ml-1 w-2 h-2 rounded-full ${s.isActive !== false ? 'bg-green-400' : 'bg-[#EDD8E8]'}`} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Specialist personal dashboard ──────────────────────────────────────────
function SpecialistDashboard({ stats, bookings, currentUser }) {
  const todayStr = new Date().toISOString().split('T')[0]
  const today = bookings.filter(b => b.date === todayStr)

  // Next 7 days
  const in7 = new Date(); in7.setDate(in7.getDate() + 7)
  const weekBookings = bookings
    .filter(b => b.date >= todayStr && b.date <= in7.toISOString().split('T')[0])
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))

  const greeting = () => {
    const h = new Date().getHours()
    if (h < 12) return 'Goedemorgen'
    if (h < 17) return 'Goedemiddag'
    return 'Goedenavond'
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="font-serif text-2xl md:text-3xl text-[#2C2028]">
          {greeting()}, {currentUser?.name} 👋
        </h1>
        <p className="text-[#7A6270] text-sm mt-1">
          {new Date().toLocaleDateString('nl-BE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Mijn boekingen" value={stats.totalBookings} icon={CalendarDays}
          color="bg-gradient-to-br from-[#A41162] to-[#953D7F]" sub={`${stats.pendingBookings} wachtend`} />
        <StatCard label="Bevestigd" value={stats.confirmedBookings} icon={CheckCircle2}
          color="bg-gradient-to-br from-emerald-500 to-emerald-600" />
        <StatCard label="Vandaag" value={today.length} icon={Clock}
          color="bg-gradient-to-br from-violet-500 to-violet-600" />
        <StatCard label="Omzet" value={`€ ${stats.totalRevenue}`} icon={Euro}
          color="bg-gradient-to-br from-amber-500 to-orange-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today */}
        <div className="bg-white rounded-2xl p-5 shadow-[0_2px_12px_rgba(44,32,40,0.06)] border border-[#EDD8E8]/40">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-lg text-[#2C2028]">Vandaag</h2>
            <span className="text-xs text-[#9D8090]">{today.length} afspraken</span>
          </div>
          {today.length === 0 ? (
            <div className="py-8 text-center">
              <Clock size={28} className="mx-auto text-[#EDD8E8] mb-2" />
              <p className="text-sm text-[#9D8090]">Geen afspraken vandaag</p>
            </div>
          ) : (
            <div className="space-y-2">
              {today.sort((a, b) => a.time?.localeCompare(b.time)).map(b => (
                <div key={b.id} className="flex items-center gap-3 bg-[#FAF7F5] rounded-xl px-4 py-2.5">
                  <Clock size={13} className="text-[#A41162] flex-shrink-0" />
                  <span className="text-sm font-medium text-[#2C2028] w-14 flex-shrink-0">{b.time}</span>
                  <span className="text-sm text-[#7A6270] flex-1 truncate">{b.clientName} — {b.serviceName}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Week */}
        <div className="bg-white rounded-2xl p-5 shadow-[0_2px_12px_rgba(44,32,40,0.06)] border border-[#EDD8E8]/40">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-lg text-[#2C2028]">Komende week</h2>
            <Link to="/admin/boekingen" className="text-xs text-[#A41162] hover:underline flex items-center gap-1">
              Alle bekijken <ArrowRight size={12} />
            </Link>
          </div>
          {weekBookings.length === 0 ? (
            <div className="py-8 text-center">
              <CalendarDays size={28} className="mx-auto text-[#EDD8E8] mb-2" />
              <p className="text-sm text-[#9D8090]">Geen afspraken komende week</p>
            </div>
          ) : (
            <div className="space-y-2">
              {weekBookings.slice(0, 6).map(b => (
                <div key={b.id} className="flex items-center gap-3 py-2 border-b border-[#FAF7F5] last:border-0">
                  <div className="text-center w-10 flex-shrink-0">
                    <p className="text-xs text-[#9D8090]">
                      {new Date(b.date).toLocaleDateString('nl-BE', { weekday: 'short' })}
                    </p>
                    <p className="text-sm font-semibold text-[#2C2028]">
                      {new Date(b.date).getDate()}
                    </p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#2C2028] truncate">{b.clientName}</p>
                    <p className="text-xs text-[#9D8090] truncate">{b.serviceName} · {b.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div className="space-y-3">
        <h2 className="font-serif text-lg text-[#2C2028]">Snelle acties</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <QuickAction to="/admin/boekingen" icon={CalendarDays} label="Boeking toevoegen"
            description="Handmatig een afspraak inplannen" color="bg-gradient-to-br from-[#A41162] to-[#953D7F]" />
          <QuickAction to="/admin/beschikbaarheid" icon={Clock} label="Mijn agenda"
            description="Werkuren en vrije dagen beheren" color="bg-gradient-to-br from-violet-500 to-violet-600" />
        </div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const { stats, bookings, specialists, siteConfig, isAdmin, currentUser } = useAdmin()
  return isAdmin
    ? <AdminDashboard stats={stats} bookings={bookings} specialists={specialists} siteConfig={siteConfig} />
    : <SpecialistDashboard stats={stats} bookings={bookings} currentUser={currentUser} />
}
