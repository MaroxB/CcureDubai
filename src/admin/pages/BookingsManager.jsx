import { useState, useMemo } from 'react'
import {
  Plus, Pencil, Trash2, X, Save, ChevronLeft, ChevronRight,
  CalendarDays, Clock, User, Phone, Mail, CheckCircle2, XCircle, AlertCircle,
} from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'

const STATUS_CONFIG = {
  pending:   { label: 'Wachtend',    bg: 'bg-amber-50',  text: 'text-amber-600',  border: 'border-amber-200',  dot: 'bg-amber-400' },
  confirmed: { label: 'Bevestigd',   bg: 'bg-green-50',  text: 'text-green-600',  border: 'border-green-200',  dot: 'bg-green-400' },
  cancelled: { label: 'Geannuleerd', bg: 'bg-red-50',    text: 'text-red-500',    border: 'border-red-200',    dot: 'bg-red-400' },
}

const DAY_NAMES_SHORT = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo']
const MONTH_NAMES = ['Januari','Februari','Maart','April','Mei','Juni','Juli','Augustus','September','Oktober','November','December']

function BookingModal({ booking, services, onClose, onSave }) {
  const isEditing = !!booking
  const [form, setForm] = useState(booking ? { ...booking } : {
    clientName: '', clientEmail: '', clientPhone: '',
    serviceId: services[0]?.id || '', serviceName: services[0]?.name || '',
    servicePrice: services[0]?.price || 0,
    date: '', time: '09:00', notes: '', status: 'pending',
  })

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleServiceChange = (id) => {
    const s = services.find(sv => sv.id === id)
    set('serviceId', id)
    set('serviceName', s?.name || '')
    set('servicePrice', s?.price || 0)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(form)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#EDD8E8]/60">
          <h2 className="font-serif text-xl text-[#2C2028]">{isEditing ? 'Boeking bewerken' : 'Nieuwe boeking'}</h2>
          <button onClick={onClose} className="p-2 rounded-xl text-[#9D8090] hover:bg-[#F9E8F3] hover:text-[#A41162] transition-colors">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Client name */}
          <div>
            <label className="block text-xs font-medium text-[#7A6270] uppercase tracking-wide mb-1.5">Naam klant *</label>
            <input required value={form.clientName} onChange={e => set('clientName', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#EDD8E8] bg-[#FAF7F5] text-sm text-[#2C2028] focus:outline-none focus:ring-2 focus:ring-[#A41162]/20"
              placeholder="Volledige naam" />
          </div>

          {/* Contact */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#7A6270] uppercase tracking-wide mb-1.5">Email</label>
              <input type="email" value={form.clientEmail} onChange={e => set('clientEmail', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#EDD8E8] bg-[#FAF7F5] text-sm text-[#2C2028] focus:outline-none focus:ring-2 focus:ring-[#A41162]/20"
                placeholder="email@voorbeeld.be" />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#7A6270] uppercase tracking-wide mb-1.5">Telefoon</label>
              <input type="tel" value={form.clientPhone} onChange={e => set('clientPhone', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#EDD8E8] bg-[#FAF7F5] text-sm text-[#2C2028] focus:outline-none focus:ring-2 focus:ring-[#A41162]/20"
                placeholder="0498 00 00 00" />
            </div>
          </div>

          {/* Service */}
          <div>
            <label className="block text-xs font-medium text-[#7A6270] uppercase tracking-wide mb-1.5">Behandeling *</label>
            <select value={form.serviceId} onChange={e => handleServiceChange(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#EDD8E8] bg-[#FAF7F5] text-sm text-[#2C2028] focus:outline-none focus:ring-2 focus:ring-[#A41162]/20">
              {services.filter(s => s.isActive).map(s => (
                <option key={s.id} value={s.id}>{s.name} ({s.duration} min{s.price ? ` · €${s.price}` : ''})</option>
              ))}
            </select>
          </div>

          {/* Date + Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#7A6270] uppercase tracking-wide mb-1.5">Datum *</label>
              <input required type="date" value={form.date} onChange={e => set('date', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#EDD8E8] bg-[#FAF7F5] text-sm text-[#2C2028] focus:outline-none focus:ring-2 focus:ring-[#A41162]/20" />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#7A6270] uppercase tracking-wide mb-1.5">Tijdstip *</label>
              <input required type="time" value={form.time} onChange={e => set('time', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#EDD8E8] bg-[#FAF7F5] text-sm text-[#2C2028] focus:outline-none focus:ring-2 focus:ring-[#A41162]/20" />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-medium text-[#7A6270] uppercase tracking-wide mb-1.5">Status</label>
            <div className="flex gap-2">
              {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
                <button key={key} type="button"
                  onClick={() => set('status', key)}
                  className={`flex-1 py-2 rounded-xl text-xs font-medium border transition-all ${form.status === key ? `${cfg.bg} ${cfg.text} ${cfg.border}` : 'border-[#EDD8E8] text-[#9D8090] hover:bg-[#FAF7F5]'}`}
                >
                  {cfg.label}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-medium text-[#7A6270] uppercase tracking-wide mb-1.5">Notities</label>
            <textarea rows={2} value={form.notes} onChange={e => set('notes', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#EDD8E8] bg-[#FAF7F5] text-sm text-[#2C2028] focus:outline-none focus:ring-2 focus:ring-[#A41162]/20 resize-none"
              placeholder="Interne notities..." />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-[#EDD8E8] text-[#7A6270] text-sm font-medium hover:bg-[#FAF7F5]">
              Annuleren
            </button>
            <button type="submit"
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#A41162] to-[#953D7F] text-white text-sm font-medium hover:opacity-90 flex items-center justify-center gap-2">
              <Save size={15} />
              {isEditing ? 'Opslaan' : 'Toevoegen'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function MiniCalendar({ selectedDate, bookings, onChange }) {
  const [viewDate, setViewDate] = useState(() => selectedDate ? new Date(selectedDate) : new Date())

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const firstDay = new Date(year, month, 1)
  // Monday-first: 0=Mon, 6=Sun
  let startOffset = firstDay.getDay() - 1
  if (startOffset < 0) startOffset = 6
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const bookingDays = new Set(
    bookings
      .filter(b => b.status !== 'cancelled')
      .map(b => b.date)
      .filter(d => d && d.startsWith(`${year}-${String(month + 1).padStart(2, '0')}`))
      .map(d => parseInt(d.split('-')[2]))
  )

  const today = new Date()
  const todayY = today.getFullYear(), todayM = today.getMonth(), todayD = today.getDate()

  const selectedParts = selectedDate ? selectedDate.split('-') : null
  const selY = selectedParts ? parseInt(selectedParts[0]) : null
  const selM = selectedParts ? parseInt(selectedParts[1]) - 1 : null
  const selD = selectedParts ? parseInt(selectedParts[2]) : null

  const cells = []
  for (let i = 0; i < startOffset; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  return (
    <div className="bg-white rounded-2xl p-4 border border-[#EDD8E8]/40 shadow-[0_2px_12px_rgba(44,32,40,0.06)]">
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => setViewDate(new Date(year, month - 1, 1))} className="p-1.5 rounded-lg hover:bg-[#F9E8F3] text-[#7A6270] hover:text-[#A41162]">
          <ChevronLeft size={16} />
        </button>
        <span className="text-sm font-medium text-[#2C2028]">{MONTH_NAMES[month]} {year}</span>
        <button onClick={() => setViewDate(new Date(year, month + 1, 1))} className="p-1.5 rounded-lg hover:bg-[#F9E8F3] text-[#7A6270] hover:text-[#A41162]">
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-1">
        {DAY_NAMES_SHORT.map(d => (
          <div key={d} className="text-center text-[10px] font-medium text-[#9D8090] py-1">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} />
          const isToday = year === todayY && month === todayM && day === todayD
          const isSelected = year === selY && month === selM && day === selD
          const hasBooking = bookingDays.has(day)
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`

          return (
            <button key={day} onClick={() => onChange(isSelected ? null : dateStr)}
              className={`relative aspect-square flex items-center justify-center rounded-lg text-xs transition-all ${
                isSelected ? 'bg-[#A41162] text-white font-medium shadow-[0_2px_8px_rgba(164,17,98,0.3)]'
                : isToday ? 'bg-[#F9E8F3] text-[#A41162] font-medium'
                : 'text-[#2C2028] hover:bg-[#F9E8F3] hover:text-[#A41162]'
              }`}
            >
              {day}
              {hasBooking && !isSelected && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#A41162]" />
              )}
            </button>
          )
        })}
      </div>

      {selectedDate && (
        <button onClick={() => onChange(null)} className="mt-3 w-full text-xs text-[#9D8090] hover:text-[#A41162] transition-colors">
          Filter wissen
        </button>
      )}
    </div>
  )
}

export default function BookingsManager() {
  const { bookings, services, addBooking, updateBooking, deleteBooking } = useAdmin()
  const [modal, setModal] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [confirmDelete, setConfirmDelete] = useState(null)

  const filtered = useMemo(() => {
    return bookings
      .filter(b => {
        const matchDate = !selectedDate || b.date === selectedDate
        const matchStatus = filterStatus === 'all' || b.status === filterStatus
        return matchDate && matchStatus
      })
      .sort((a, b) => {
        const da = `${a.date} ${a.time}`
        const db = `${b.date} ${b.time}`
        return db.localeCompare(da)
      })
  }, [bookings, selectedDate, filterStatus])

  const handleSave = (data) => {
    if (modal === 'new') {
      addBooking(data)
    } else {
      updateBooking(modal.id, data)
    }
    setModal(null)
  }

  const handleStatusChange = (id, status) => {
    updateBooking(id, { status })
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl text-[#2C2028]">Boekingen</h1>
          <p className="text-sm text-[#7A6270] mt-0.5">{bookings.length} totaal · {bookings.filter(b => b.status === 'pending').length} wachtend</p>
        </div>
        <button
          onClick={() => setModal('new')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#A41162] to-[#953D7F] text-white text-sm font-medium hover:opacity-90"
        >
          <Plus size={16} />
          Boeking toevoegen
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar sidebar */}
        <div className="lg:col-span-1">
          <MiniCalendar
            selectedDate={selectedDate}
            bookings={bookings}
            onChange={setSelectedDate}
          />
        </div>

        {/* Booking list */}
        <div className="lg:col-span-3 space-y-3">
          {/* Status filter */}
          <div className="flex gap-2 flex-wrap">
            {[['all', 'Alle'], ['pending', 'Wachtend'], ['confirmed', 'Bevestigd'], ['cancelled', 'Geannuleerd']].map(([key, label]) => (
              <button key={key}
                onClick={() => setFilterStatus(key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${filterStatus === key ? 'bg-[#A41162] text-white' : 'bg-white border border-[#EDD8E8] text-[#7A6270] hover:bg-[#F9E8F3]'}`}
              >
                {label}
                {key !== 'all' && (
                  <span className="ml-1.5 text-[10px] opacity-70">
                    {bookings.filter(b => b.status === key).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#EDD8E8]/40 py-16 text-center">
              <CalendarDays size={32} className="mx-auto text-[#EDD8E8] mb-3" />
              <p className="text-sm text-[#9D8090]">
                {selectedDate ? `Geen boekingen op ${selectedDate}` : 'Geen boekingen gevonden'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map(booking => {
                const s = STATUS_CONFIG[booking.status] || STATUS_CONFIG.pending
                return (
                  <div key={booking.id} className={`bg-white rounded-2xl border p-4 transition-all ${s.border}`}>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#F9E8F3] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-sm font-serif text-[#A41162]">
                          {(booking.clientName || 'K').charAt(0).toUpperCase()}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="font-medium text-sm text-[#2C2028]">{booking.clientName}</span>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${s.bg} ${s.text}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                            {s.label}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#7A6270]">
                          <span className="flex items-center gap-1">
                            <CalendarDays size={11} />
                            {booking.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={11} />
                            {booking.time}
                          </span>
                          {booking.clientPhone && (
                            <span className="flex items-center gap-1">
                              <Phone size={11} />
                              {booking.clientPhone}
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-[#9D8090] mt-1 truncate">
                          {booking.serviceName}
                          {booking.servicePrice ? ` · €${booking.servicePrice}` : ''}
                        </p>
                        {booking.notes && (
                          <p className="text-xs text-[#9D8090] mt-0.5 italic">"{booking.notes}"</p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-1.5 flex-shrink-0">
                        <div className="flex gap-1">
                          <button onClick={() => setModal(booking)}
                            className="p-2 rounded-xl text-[#9D8090] hover:bg-[#F9E8F3] hover:text-[#A41162] transition-colors">
                            <Pencil size={14} />
                          </button>
                          <button onClick={() => setConfirmDelete(booking.id)}
                            className="p-2 rounded-xl text-[#9D8090] hover:bg-red-50 hover:text-red-500 transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                        {booking.status === 'pending' && (
                          <div className="flex gap-1">
                            <button onClick={() => handleStatusChange(booking.id, 'confirmed')}
                              className="p-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors" title="Bevestigen">
                              <CheckCircle2 size={13} />
                            </button>
                            <button onClick={() => handleStatusChange(booking.id, 'cancelled')}
                              className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors" title="Annuleren">
                              <XCircle size={13} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {modal && (
        <BookingModal
          booking={modal === 'new' ? null : modal}
          services={services}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}

      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm">
            <h3 className="font-serif text-lg text-[#2C2028] mb-2">Boeking verwijderen?</h3>
            <p className="text-sm text-[#7A6270] mb-5">Deze actie kan niet ongedaan worden gemaakt.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(null)} className="flex-1 py-2.5 rounded-xl border border-[#EDD8E8] text-sm text-[#7A6270]">Annuleren</button>
              <button onClick={() => { deleteBooking(confirmDelete); setConfirmDelete(null) }} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm">Verwijderen</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
