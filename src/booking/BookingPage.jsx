import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, ChevronLeft, ChevronRight, Clock, Calendar, User, Phone, Mail, FileText, Sparkles, ArrowLeft } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'
import { defaultSiteConfig } from '../config/siteConfig'
import { serviceCategories } from '../data/services'

const STEPS = ['Dienst', 'Datum & Tijd', 'Gegevens', 'Bevestigen']

const DAY_NAMES_SHORT = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo']
const MONTH_NAMES = ['Januari','Februari','Maart','April','Mei','Juni','Juli','Augustus','September','Oktober','November','December']

// ─── Helpers ───────────────────────────────────────────────────────────────
function generateTimeSlots(openTime, closeTime, duration, bufferMins) {
  const slots = []
  const [openH, openM] = openTime.split(':').map(Number)
  const [closeH, closeM] = closeTime.split(':').map(Number)
  const openTotal = openH * 60 + openM
  const closeTotal = closeH * 60 + closeM
  const step = duration + bufferMins

  for (let t = openTotal; t + duration <= closeTotal; t += step) {
    const h = Math.floor(t / 60)
    const m = t % 60
    slots.push(`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`)
  }
  return slots
}

const DAY_KEY_MAP = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday']

// ─── Step 1: Service selection ──────────────────────────────────────────────
function StepService({ services, selected, onSelect }) {
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered = services.filter(s => {
    return s.isActive && (activeCategory === 'all' || s.category === activeCategory)
  })

  const usedCategories = serviceCategories.filter(cat =>
    services.some(s => s.isActive && s.category === cat.id)
  )

  return (
    <div className="space-y-4">
      {/* Category tabs */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === 'all' ? 'bg-[#A41162] text-white' : 'bg-white border border-[#EDD8E8] text-[#7A6270] hover:bg-[#F9E8F3]'}`}
        >
          Alles
        </button>
        {usedCategories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === cat.id ? 'bg-[#A41162] text-white' : 'bg-white border border-[#EDD8E8] text-[#7A6270] hover:bg-[#F9E8F3]'}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Services */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filtered.map(service => {
          const isSelected = selected?.id === service.id
          return (
            <button
              key={service.id}
              onClick={() => onSelect(service)}
              className={`text-left p-4 rounded-2xl border-2 transition-all duration-200 ${
                isSelected
                  ? 'border-[#A41162] bg-[#F9E8F3]/60 shadow-[0_4px_16px_rgba(164,17,98,0.12)]'
                  : 'border-[#EDD8E8] bg-white hover:border-[#A41162]/30 hover:shadow-[0_2px_12px_rgba(164,17,98,0.08)]'
              }`}
            >
              <div className="flex items-start gap-3">
                {service.image && (
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#F9E8F3] flex-shrink-0">
                    <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className={`text-sm font-medium ${isSelected ? 'text-[#A41162]' : 'text-[#2C2028]'}`}>
                      {service.name}
                    </span>
                    {service.isNew && (
                      <span className="text-[10px] font-semibold text-[#A41162] bg-[#F9E8F3] px-1.5 py-0.5 rounded-full">Nieuw</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#9D8090]">
                    <span className="flex items-center gap-1">
                      <Clock size={11} />
                      {service.duration} min
                    </span>
                    <span className="font-medium text-[#7A6270]">
                      {service.price != null ? `€ ${service.price}` : 'Op aanvraag'}
                    </span>
                  </div>
                  {service.benefit && (
                    <p className="text-xs text-[#9D8090] mt-1 line-clamp-1">{service.benefit}</p>
                  )}
                </div>
                {isSelected && (
                  <CheckCircle2 size={18} className="text-[#A41162] flex-shrink-0 mt-0.5" />
                )}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Step 2: Date & Time ────────────────────────────────────────────────────
function StepDateTime({ service, selectedDate, selectedTime, bookings, siteConfig, onDate, onTime }) {
  const hours = siteConfig?.hours || defaultSiteConfig.hours
  const bufferMins = siteConfig?.booking?.slotDurationBuffer ?? 15
  const advanceDays = siteConfig?.booking?.advanceBookingDays ?? 60

  const [viewDate, setViewDate] = useState(() => new Date())
  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const maxDate = new Date(today)
  maxDate.setDate(maxDate.getDate() + advanceDays)

  const firstDay = new Date(year, month, 1)
  let startOffset = firstDay.getDay() - 1
  if (startOffset < 0) startOffset = 6
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const blockedDates = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('blockedDates') || '[]').map(b => b.date) } catch { return [] }
  }, [])

  const isDateAvailable = (d) => {
    const date = new Date(year, month, d)
    if (date < today || date > maxDate) return false
    const dayKey = DAY_KEY_MAP[date.getDay()]
    const dayConfig = hours[dayKey]
    if (!dayConfig || dayConfig.closed) return false
    const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`
    if (blockedDates.includes(dateStr)) return false
    return true
  }

  const cells = []
  for (let i = 0; i < startOffset; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const selectedParts = selectedDate ? selectedDate.split('-') : null
  const selY = selectedParts ? parseInt(selectedParts[0]) : null
  const selM = selectedParts ? parseInt(selectedParts[1]) - 1 : null
  const selD = selectedParts ? parseInt(selectedParts[2]) : null

  // Time slots for selected date
  const timeSlots = useMemo(() => {
    if (!selectedDate || !service) return []
    const date = new Date(selectedDate)
    const dayKey = DAY_KEY_MAP[date.getDay()]
    const dayConfig = hours[dayKey]
    if (!dayConfig || dayConfig.closed) return []

    const allSlots = generateTimeSlots(dayConfig.open, dayConfig.close, service.duration, bufferMins)

    // Filter out already booked slots
    const bookedSlots = bookings
      .filter(b => b.date === selectedDate && b.status !== 'cancelled')
      .map(b => b.time)

    return allSlots.filter(slot => !bookedSlots.includes(slot))
  }, [selectedDate, service, hours, bufferMins, bookings])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Calendar */}
      <div className="bg-white rounded-2xl border border-[#EDD8E8]/40 p-4">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setViewDate(new Date(year, month - 1, 1))}
            className="p-2 rounded-xl hover:bg-[#F9E8F3] text-[#7A6270] hover:text-[#A41162] transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="font-serif text-base text-[#2C2028]">{MONTH_NAMES[month]} {year}</span>
          <button
            onClick={() => setViewDate(new Date(year, month + 1, 1))}
            className="p-2 rounded-xl hover:bg-[#F9E8F3] text-[#7A6270] hover:text-[#A41162] transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {DAY_NAMES_SHORT.map(d => (
            <div key={d} className="text-center text-[11px] font-medium text-[#9D8090] py-1">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {cells.map((day, i) => {
            if (!day) return <div key={`e-${i}`} />
            const available = isDateAvailable(day)
            const dateStr = `${year}-${String(month + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`
            const isSelected = year === selY && month === selM && day === selD
            const isTodayDate = year === today.getFullYear() && month === today.getMonth() && day === today.getDate()

            return (
              <button
                key={day}
                disabled={!available}
                onClick={() => { onDate(dateStr); onTime('') }}
                className={`aspect-square flex items-center justify-center rounded-xl text-sm transition-all ${
                  isSelected
                    ? 'bg-[#A41162] text-white font-medium shadow-[0_2px_8px_rgba(164,17,98,0.3)]'
                    : available
                    ? isTodayDate
                      ? 'bg-[#F9E8F3] text-[#A41162] font-medium hover:bg-[#A41162] hover:text-white'
                      : 'text-[#2C2028] hover:bg-[#F9E8F3] hover:text-[#A41162]'
                    : 'text-[#EDD8E8] cursor-not-allowed'
                }`}
              >
                {day}
              </button>
            )
          })}
        </div>
      </div>

      {/* Time slots */}
      <div>
        {!selectedDate ? (
          <div className="h-full flex flex-col items-center justify-center text-center py-8 bg-[#FAF7F5] rounded-2xl border border-[#EDD8E8]/40">
            <Calendar size={32} className="text-[#EDD8E8] mb-3" />
            <p className="text-sm text-[#9D8090]">Selecteer een datum om beschikbare tijden te zien</p>
          </div>
        ) : timeSlots.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center py-8 bg-[#FAF7F5] rounded-2xl border border-[#EDD8E8]/40">
            <Clock size={32} className="text-[#EDD8E8] mb-3" />
            <p className="text-sm text-[#9D8090]">Geen beschikbare tijden op deze datum</p>
            <p className="text-xs text-[#9D8090] mt-1">Kies een andere datum</p>
          </div>
        ) : (
          <div>
            <p className="text-sm font-medium text-[#2C2028] mb-3">
              Beschikbare tijden op {new Date(selectedDate).toLocaleDateString('nl-BE', { weekday: 'long', day: 'numeric', month: 'long' })}
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {timeSlots.map(slot => (
                <button
                  key={slot}
                  onClick={() => onTime(slot)}
                  className={`py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${
                    selectedTime === slot
                      ? 'border-[#A41162] bg-[#A41162] text-white shadow-[0_2px_8px_rgba(164,17,98,0.3)]'
                      : 'border-[#EDD8E8] bg-white text-[#2C2028] hover:border-[#A41162]/40 hover:bg-[#F9E8F3]'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Step 3: Client details ─────────────────────────────────────────────────
function StepDetails({ form, onChange }) {
  return (
    <div className="space-y-4 max-w-lg">
      <div>
        <label className="block text-xs font-medium text-[#7A6270] uppercase tracking-wide mb-1.5">Volledige naam *</label>
        <div className="relative">
          <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9D8090]" />
          <input
            required
            value={form.name}
            onChange={e => onChange('name', e.target.value)}
            placeholder="Voor- en achternaam"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#EDD8E8] bg-white text-sm text-[#2C2028] focus:outline-none focus:ring-2 focus:ring-[#A41162]/20"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-[#7A6270] uppercase tracking-wide mb-1.5">E-mailadres *</label>
        <div className="relative">
          <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9D8090]" />
          <input
            required
            type="email"
            value={form.email}
            onChange={e => onChange('email', e.target.value)}
            placeholder="uw@email.be"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#EDD8E8] bg-white text-sm text-[#2C2028] focus:outline-none focus:ring-2 focus:ring-[#A41162]/20"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-[#7A6270] uppercase tracking-wide mb-1.5">Telefoonnummer *</label>
        <div className="relative">
          <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9D8090]" />
          <input
            required
            type="tel"
            value={form.phone}
            onChange={e => onChange('phone', e.target.value)}
            placeholder="0498 00 00 00"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#EDD8E8] bg-white text-sm text-[#2C2028] focus:outline-none focus:ring-2 focus:ring-[#A41162]/20"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-[#7A6270] uppercase tracking-wide mb-1.5">Opmerkingen (optioneel)</label>
        <div className="relative">
          <FileText size={15} className="absolute left-3.5 top-3.5 text-[#9D8090]" />
          <textarea
            rows={3}
            value={form.notes}
            onChange={e => onChange('notes', e.target.value)}
            placeholder="Eventuele bijzonderheden of vragen..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#EDD8E8] bg-white text-sm text-[#2C2028] focus:outline-none focus:ring-2 focus:ring-[#A41162]/20 resize-none"
          />
        </div>
      </div>
    </div>
  )
}

// ─── Step 4: Confirmation ───────────────────────────────────────────────────
function StepConfirm({ service, date, time, form }) {
  return (
    <div className="max-w-lg space-y-4">
      <div className="bg-[#F9E8F3]/40 rounded-2xl border border-[#A41162]/10 p-5 space-y-3">
        <h3 className="font-serif text-lg text-[#2C2028]">Samenvatting</h3>

        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#7A6270]">Behandeling</span>
            <span className="text-sm font-medium text-[#2C2028]">{service?.name}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#7A6270]">Duur</span>
            <span className="text-sm text-[#2C2028]">{service?.duration} minuten</span>
          </div>
          {service?.price != null && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#7A6270]">Prijs</span>
              <span className="text-sm font-medium text-[#A41162]">€ {service.price}</span>
            </div>
          )}
          <div className="border-t border-[#EDD8E8]/60 my-1" />
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#7A6270]">Datum</span>
            <span className="text-sm text-[#2C2028]">
              {date ? new Date(date).toLocaleDateString('nl-BE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : '—'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#7A6270]">Tijdstip</span>
            <span className="text-sm text-[#2C2028]">{time || '—'}</span>
          </div>
          <div className="border-t border-[#EDD8E8]/60 my-1" />
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#7A6270]">Naam</span>
            <span className="text-sm text-[#2C2028]">{form.name}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#7A6270]">Email</span>
            <span className="text-sm text-[#2C2028]">{form.email}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#7A6270]">Telefoon</span>
            <span className="text-sm text-[#2C2028]">{form.phone}</span>
          </div>
          {form.notes && (
            <div className="flex items-start justify-between gap-4">
              <span className="text-sm text-[#7A6270]">Opmerking</span>
              <span className="text-sm text-[#2C2028] text-right max-w-[60%]">{form.notes}</span>
            </div>
          )}
        </div>
      </div>

      <p className="text-xs text-[#9D8090] leading-relaxed">
        Door te bevestigen ga je akkoord met onze algemene voorwaarden. Je ontvangt een bevestiging op het opgegeven e-mailadres.
        For questions you can reach us at{' '}
        <a href="tel:+97144507788" className="text-[#A41162] hover:underline">+971 4 450 7788</a>.
      </p>
    </div>
  )
}

// ─── Main Booking Page ──────────────────────────────────────────────────────
export default function BookingPage() {
  const { services, addBooking, siteConfig, bookings } = useAdmin()
  const [step, setStep] = useState(0) // 0..3
  const [done, setDone] = useState(false)
  const [selectedService, setSelectedService] = useState(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [form, setForm] = useState({ name: '', email: '', phone: '', notes: '' })
  const [loading, setLoading] = useState(false)

  const businessName = siteConfig?.branding?.businessName || 'C-Cure'

  const setField = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const canProceed = () => {
    if (step === 0) return !!selectedService
    if (step === 1) return !!selectedDate && !!selectedTime
    if (step === 2) return !!form.name && !!form.email && !!form.phone
    return true
  }

  const handleNext = () => {
    if (step < 3 && canProceed()) setStep(s => s + 1)
  }

  const handleBack = () => {
    if (step > 0) setStep(s => s - 1)
  }

  const handleSubmit = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    addBooking({
      clientName: form.name,
      clientEmail: form.email,
      clientPhone: form.phone,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      servicePrice: selectedService.price,
      date: selectedDate,
      time: selectedTime,
      notes: form.notes,
    })
    setLoading(false)
    setDone(true)
  }

  if (done) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FAF7F5] via-[#F9E8F3] to-[#EDD8E8] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgba(164,17,98,0.12)] p-8 md:p-12 max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#A41162] to-[#953D7F] flex items-center justify-center mx-auto mb-6 shadow-[0_4px_16px_rgba(164,17,98,0.3)]">
            <CheckCircle2 size={30} className="text-white" />
          </div>
          <h1 className="font-serif text-2xl text-[#2C2028] mb-2">Boeking ontvangen!</h1>
          <p className="text-[#7A6270] text-sm mb-1">
            Bedankt, <strong>{form.name}</strong>. We hebben je boeking ontvangen.
          </p>
          <p className="text-[#9D8090] text-xs mb-6">
            Je ontvangt een bevestiging op <strong>{form.email}</strong>.
            We nemen zo snel mogelijk contact met je op.
          </p>

          <div className="bg-[#F9E8F3]/40 rounded-2xl border border-[#A41162]/10 p-4 text-left mb-6 space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-[#7A6270]">Behandeling</span>
              <span className="text-[#2C2028] font-medium">{selectedService?.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#7A6270]">Datum & tijd</span>
              <span className="text-[#2C2028]">
                {new Date(selectedDate).toLocaleDateString('nl-BE', { day: 'numeric', month: 'long' })} om {selectedTime}
              </span>
            </div>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#A41162] to-[#953D7F] text-white font-medium text-sm hover:opacity-90 transition-opacity"
          >
            Terug naar de website
          </Link>
        </div>
      </div>
    )
  }

  const activeServices = services.filter(s => s.isActive)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF7F5] to-[#F9E8F3]/40">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-[#EDD8E8]/60 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/" className="p-2 rounded-xl text-[#7A6270] hover:bg-[#F9E8F3] hover:text-[#A41162] transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <span className="text-xs text-[#9D8090]">{businessName}</span>
            <h1 className="font-serif text-lg text-[#2C2028]">Online boeking</h1>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Progress steps */}
        <div className="flex items-center justify-between mb-8">
          {STEPS.map((label, i) => (
            <div key={i} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                  i < step ? 'bg-[#A41162] text-white'
                  : i === step ? 'bg-[#A41162] text-white ring-4 ring-[#A41162]/20'
                  : 'bg-[#EDD8E8] text-[#9D8090]'
                }`}>
                  {i < step ? <CheckCircle2 size={14} /> : i + 1}
                </div>
                <span className={`text-[10px] mt-1 font-medium whitespace-nowrap ${i <= step ? 'text-[#A41162]' : 'text-[#9D8090]'}`}>
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 transition-colors ${i < step ? 'bg-[#A41162]' : 'bg-[#EDD8E8]'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl border border-[#EDD8E8]/40 p-5 md:p-8 mb-6">
          <h2 className="font-serif text-xl text-[#2C2028] mb-5">{STEPS[step]}</h2>

          {step === 0 && (
            <StepService
              services={activeServices}
              selected={selectedService}
              onSelect={setSelectedService}
            />
          )}
          {step === 1 && (
            <StepDateTime
              service={selectedService}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              bookings={bookings}
              siteConfig={siteConfig}
              onDate={setSelectedDate}
              onTime={setSelectedTime}
            />
          )}
          {step === 2 && (
            <StepDetails form={form} onChange={setField} />
          )}
          {step === 3 && (
            <StepConfirm
              service={selectedService}
              date={selectedDate}
              time={selectedTime}
              form={form}
            />
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4">
          {step > 0 ? (
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-[#EDD8E8] text-[#7A6270] text-sm font-medium hover:bg-white transition-colors"
            >
              <ChevronLeft size={16} />
              Vorige
            </button>
          ) : (
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-[#EDD8E8] text-[#7A6270] text-sm font-medium hover:bg-white transition-colors"
            >
              <ChevronLeft size={16} />
              Terug
            </Link>
          )}

          {step < 3 ? (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#A41162] to-[#953D7F] text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Volgende
              <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#A41162] to-[#953D7F] text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Verwerken...
                </>
              ) : (
                <>
                  <Sparkles size={15} />
                  Boeking bevestigen
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
