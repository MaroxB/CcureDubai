import { useState, useEffect } from 'react'
import { Save, Plus, Trash2, RotateCcw, CalendarOff, Clock } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'
import { defaultSiteConfig } from '../../config/siteConfig'

const DAYS = [
  { key: 'monday',    label: 'Maandag' },
  { key: 'tuesday',   label: 'Dinsdag' },
  { key: 'wednesday', label: 'Woensdag' },
  { key: 'thursday',  label: 'Donderdag' },
  { key: 'friday',    label: 'Vrijdag' },
  { key: 'saturday',  label: 'Zaterdag' },
  { key: 'sunday',    label: 'Zondag' },
]

const DEFAULT_HOURS = defaultSiteConfig.hours

function Toggle({ value, onChange }) {
  return (
    <div onClick={() => onChange(!value)}
      className={`w-10 rounded-full cursor-pointer transition-colors flex-shrink-0 ${value ? 'bg-[#A41162]' : 'bg-[#EDD8E8]'}`}
      style={{ height: '22px', position: 'relative' }}>
      <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${value ? 'translate-x-5' : 'translate-x-0.5'}`} />
    </div>
  )
}

export default function AvailabilityManager() {
  const { isAdmin, isSpecialist, currentUser, specialists, updateSpecialist, updateSiteConfig, siteConfig } = useAdmin()

  // Determine whose availability we're editing
  const getSpecialistData = () => specialists.find(s => s.id === currentUser?.id)

  const getInitialHours = () => {
    if (isSpecialist) {
      return getSpecialistData()?.hours || DEFAULT_HOURS
    }
    return siteConfig?.hours || DEFAULT_HOURS
  }

  const getInitialBlocked = () => {
    if (isSpecialist) {
      return getSpecialistData()?.blockedDates || []
    }
    try { return JSON.parse(localStorage.getItem('blockedDates') || '[]') } catch { return [] }
  }

  const [localHours, setLocalHours] = useState(getInitialHours)
  const [blockedDates, setBlockedDates] = useState(getInitialBlocked)
  const [newBlockDate, setNewBlockDate] = useState('')
  const [newBlockNote, setNewBlockNote] = useState('')
  const [saved, setSaved] = useState(false)

  // Admin: specialist selector
  const [selectedSpecialistId, setSelectedSpecialistId] = useState('')
  const selectedSpecialist = specialists.find(s => s.id === selectedSpecialistId)

  useEffect(() => {
    if (isAdmin && selectedSpecialistId && selectedSpecialist) {
      setLocalHours(selectedSpecialist.hours || DEFAULT_HOURS)
      setBlockedDates(selectedSpecialist.blockedDates || [])
    }
  }, [selectedSpecialistId])

  const setDay = (dayKey, field, value) => {
    setLocalHours(prev => ({ ...prev, [dayKey]: { ...prev[dayKey], [field]: value } }))
  }

  const handleSave = () => {
    if (isSpecialist) {
      updateSpecialist(currentUser.id, { hours: localHours, blockedDates })
    } else if (isAdmin && selectedSpecialistId) {
      updateSpecialist(selectedSpecialistId, { hours: localHours, blockedDates })
    } else if (isAdmin) {
      updateSiteConfig('hours', localHours)
      localStorage.setItem('blockedDates', JSON.stringify(blockedDates))
    }
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleAddBlock = () => {
    if (!newBlockDate) return
    const updated = [...blockedDates, { date: newBlockDate, note: newBlockNote }]
      .sort((a, b) => a.date.localeCompare(b.date))
    setBlockedDates(updated)
    setNewBlockDate('')
    setNewBlockNote('')
  }

  const handleRemoveBlock = (date) => setBlockedDates(prev => prev.filter(b => b.date !== date))

  const handleReset = () => {
    if (confirm('Werkuren resetten naar standaard?')) setLocalHours(DEFAULT_HOURS)
  }

  const subTitle = isSpecialist
    ? `Uw persoonlijke werkuren en vrije dagen`
    : selectedSpecialistId
      ? `Werkuren van ${selectedSpecialist?.name}`
      : 'Algemene beschikbaarheid (geen specialist geselecteerd)'

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl text-[#2C2028]">
            {isSpecialist ? 'Mijn agenda' : 'Beschikbaarheid'}
          </h1>
          <p className="text-sm text-[#7A6270] mt-0.5">{subTitle}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleReset}
            className="p-2.5 rounded-xl border border-[#EDD8E8] text-[#9D8090] hover:text-[#A41162] hover:bg-[#F9E8F3] transition-colors" title="Reset">
            <RotateCcw size={16} />
          </button>
          <button onClick={handleSave}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              saved ? 'bg-green-500 text-white' : 'bg-gradient-to-r from-[#A41162] to-[#953D7F] text-white hover:opacity-90'
            }`}>
            <Save size={15} />
            {saved ? 'Opgeslagen!' : 'Opslaan'}
          </button>
        </div>
      </div>

      {/* Admin: specialist selector */}
      {isAdmin && specialists.length > 0 && (
        <div className="bg-white rounded-2xl border border-[#EDD8E8]/40 shadow-[0_2px_12px_rgba(44,32,40,0.06)] p-4">
          <label className="block text-xs font-medium text-[#7A6270] uppercase tracking-wide mb-2">
            Beschikbaarheid bekijken voor
          </label>
          <select value={selectedSpecialistId} onChange={e => setSelectedSpecialistId(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-[#EDD8E8] bg-[#FAF7F5] text-sm text-[#2C2028] focus:outline-none focus:ring-2 focus:ring-[#A41162]/20">
            <option value="">— Algemeen (salon) —</option>
            {specialists.map(s => (
              <option key={s.id} value={s.id}>{s.name} {s.speciality ? `(${s.speciality})` : ''}</option>
            ))}
          </select>
        </div>
      )}

      {/* Working hours */}
      <div className="bg-white rounded-2xl border border-[#EDD8E8]/40 shadow-[0_2px_12px_rgba(44,32,40,0.06)] overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#EDD8E8]/40">
          <Clock size={18} className="text-[#A41162]" />
          <h2 className="font-serif text-lg text-[#2C2028]">Werkuren</h2>
        </div>
        <div className="divide-y divide-[#FAF7F5]">
          {DAYS.map(({ key, label }) => {
            const day = localHours[key] || { open: '09:00', close: '17:00', closed: false }
            return (
              <div key={key} className="flex items-center gap-4 px-5 py-3.5">
                <div className="w-28 flex-shrink-0">
                  <span className="text-sm font-medium text-[#2C2028]">{label}</span>
                </div>
                <Toggle value={!day.closed} onChange={v => setDay(key, 'closed', !v)} />
                {day.closed ? (
                  <span className="text-sm text-[#9D8090]">Vrij / gesloten</span>
                ) : (
                  <div className="flex items-center gap-2">
                    <input type="time" value={day.open} onChange={e => setDay(key, 'open', e.target.value)}
                      className="px-3 py-1.5 rounded-xl border border-[#EDD8E8] bg-[#FAF7F5] text-sm text-[#2C2028] focus:outline-none focus:ring-2 focus:ring-[#A41162]/20" />
                    <span className="text-[#9D8090] text-sm">–</span>
                    <input type="time" value={day.close} onChange={e => setDay(key, 'close', e.target.value)}
                      className="px-3 py-1.5 rounded-xl border border-[#EDD8E8] bg-[#FAF7F5] text-sm text-[#2C2028] focus:outline-none focus:ring-2 focus:ring-[#A41162]/20" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Blocked dates */}
      <div className="bg-white rounded-2xl border border-[#EDD8E8]/40 shadow-[0_2px_12px_rgba(44,32,40,0.06)] overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#EDD8E8]/40">
          <CalendarOff size={18} className="text-[#A41162]" />
          <h2 className="font-serif text-lg text-[#2C2028]">Vrije dagen & uitzondering</h2>
        </div>
        <div className="p-5 space-y-4">
          <div className="flex gap-2 flex-wrap">
            <input type="date" value={newBlockDate} onChange={e => setNewBlockDate(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-[#EDD8E8] bg-[#FAF7F5] text-sm text-[#2C2028] focus:outline-none focus:ring-2 focus:ring-[#A41162]/20" />
            <input value={newBlockNote} onChange={e => setNewBlockNote(e.target.value)}
              placeholder="Reden (optioneel)"
              className="flex-1 min-w-[140px] px-3 py-2.5 rounded-xl border border-[#EDD8E8] bg-[#FAF7F5] text-sm text-[#2C2028] focus:outline-none focus:ring-2 focus:ring-[#A41162]/20" />
            <button onClick={handleAddBlock}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#A41162] text-white text-sm font-medium hover:opacity-90">
              <Plus size={15} />
              Blokkeren
            </button>
          </div>
          {blockedDates.length === 0 ? (
            <p className="text-sm text-[#9D8090] py-4 text-center">Geen geblokkeerde datums</p>
          ) : (
            <div className="space-y-2">
              {blockedDates.map(({ date, note }) => (
                <div key={date} className="flex items-center justify-between bg-[#FAF7F5] rounded-xl px-4 py-2.5">
                  <div>
                    <span className="text-sm font-medium text-[#2C2028]">
                      {new Date(date).toLocaleDateString('nl-BE', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </span>
                    {note && <span className="ml-2 text-xs text-[#9D8090]">— {note}</span>}
                  </div>
                  <button onClick={() => handleRemoveBlock(date)}
                    className="p-1.5 rounded-lg text-[#9D8090] hover:bg-red-50 hover:text-red-500 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
