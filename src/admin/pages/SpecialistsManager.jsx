import { useState } from 'react'
import { Plus, Pencil, Trash2, Eye, EyeOff, X, Save, Users } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'
import { defaultSiteConfig } from '../../config/siteConfig'

const COLORS = [
  '#A41162', '#953D7F', '#7C3AED', '#2563EB', '#0891B2',
  '#059669', '#D97706', '#DC2626', '#BE185D', '#4F46E5',
]

const DEFAULT_HOURS = defaultSiteConfig.hours

function SpecialistModal({ specialist, onSave, onClose }) {
  const isEdit = !!specialist
  const [form, setForm] = useState({
    name: specialist?.name || '',
    email: specialist?.email || '',
    password: specialist?.password || '',
    speciality: specialist?.speciality || '',
    color: specialist?.color || COLORS[0],
    isActive: specialist?.isActive !== false,
  })
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim()) { setError('Naam is verplicht.'); return }
    if (!form.email.trim()) { setError('E-mail is verplicht.'); return }
    if (!isEdit && form.password.length < 4) { setError('Wachtwoord minimaal 4 tekens.'); return }
    setError('')
    onSave(form)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-[0_24px_80px_rgba(44,32,40,0.18)] w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#EDD8E8]/60">
          <h2 className="font-serif text-xl text-[#2C2028]">
            {isEdit ? 'Specialist bewerken' : 'Nieuwe specialist'}
          </h2>
          <button onClick={onClose} className="p-2 rounded-xl text-[#9D8090] hover:bg-[#F9E8F3] hover:text-[#A41162] transition-colors">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-xs font-medium text-[#7A6270] uppercase tracking-wide mb-1.5">Naam</label>
            <input value={form.name} onChange={e => set('name', e.target.value)} required
              placeholder="Voornaam Achternaam"
              className="w-full px-4 py-2.5 rounded-xl border border-[#EDD8E8] bg-[#FAF7F5] text-sm text-[#2C2028] focus:outline-none focus:ring-2 focus:ring-[#A41162]/20 focus:border-[#A41162]/40" />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-[#7A6270] uppercase tracking-wide mb-1.5">E-mailadres</label>
            <input type="email" value={form.email} onChange={e => set('email', e.target.value)} required
              placeholder="specialist@salon.be"
              className="w-full px-4 py-2.5 rounded-xl border border-[#EDD8E8] bg-[#FAF7F5] text-sm text-[#2C2028] focus:outline-none focus:ring-2 focus:ring-[#A41162]/20 focus:border-[#A41162]/40" />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-medium text-[#7A6270] uppercase tracking-wide mb-1.5">
              Wachtwoord {isEdit && <span className="normal-case text-[#9D8090]">(leeg = ongewijzigd)</span>}
            </label>
            <div className="relative">
              <input type={showPw ? 'text' : 'password'}
                value={form.password} onChange={e => set('password', e.target.value)}
                placeholder={isEdit ? '••••••••' : 'min. 4 tekens'}
                className="w-full pr-10 px-4 py-2.5 rounded-xl border border-[#EDD8E8] bg-[#FAF7F5] text-sm text-[#2C2028] focus:outline-none focus:ring-2 focus:ring-[#A41162]/20 focus:border-[#A41162]/40" />
              <button type="button" onClick={() => setShowPw(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9D8090] hover:text-[#A41162] transition-colors">
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Speciality */}
          <div>
            <label className="block text-xs font-medium text-[#7A6270] uppercase tracking-wide mb-1.5">Specialisatie (optioneel)</label>
            <input value={form.speciality} onChange={e => set('speciality', e.target.value)}
              placeholder="bv. Massage, Cupping, Gezichtsbehandeling"
              className="w-full px-4 py-2.5 rounded-xl border border-[#EDD8E8] bg-[#FAF7F5] text-sm text-[#2C2028] focus:outline-none focus:ring-2 focus:ring-[#A41162]/20 focus:border-[#A41162]/40" />
          </div>

          {/* Color */}
          <div>
            <label className="block text-xs font-medium text-[#7A6270] uppercase tracking-wide mb-1.5">Kleur</label>
            <div className="flex gap-2 flex-wrap">
              {COLORS.map(c => (
                <button key={c} type="button" onClick={() => set('color', c)}
                  className={`w-8 h-8 rounded-full transition-all ${form.color === c ? 'ring-2 ring-offset-2 ring-[#A41162] scale-110' : 'hover:scale-105'}`}
                  style={{ background: c }} />
              ))}
            </div>
          </div>

          {/* Active toggle */}
          {isEdit && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#2C2028]">Account actief</span>
              <div onClick={() => set('isActive', !form.isActive)}
                className={`w-10 rounded-full cursor-pointer transition-colors ${form.isActive ? 'bg-[#A41162]' : 'bg-[#EDD8E8]'}`}
                style={{ height: '22px', position: 'relative' }}>
                <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${form.isActive ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </div>
            </div>
          )}

          {error && <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-xl border border-red-100">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-[#EDD8E8] text-[#7A6270] text-sm font-medium hover:bg-[#FAF7F5] transition-colors">
              Annuleren
            </button>
            <button type="submit"
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#A41162] to-[#953D7F] text-white text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
              <Save size={15} />
              {isEdit ? 'Opslaan' : 'Aanmaken'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function SpecialistsManager() {
  const { specialists, addSpecialist, updateSpecialist, deleteSpecialist } = useAdmin()
  const [modal, setModal] = useState(null) // null | { mode: 'add' | 'edit', specialist? }

  const handleSave = (form) => {
    if (modal.mode === 'add') {
      addSpecialist({ ...form, hours: DEFAULT_HOURS })
    } else {
      const updates = { ...form }
      // Don't overwrite password if left blank on edit
      if (!updates.password) delete updates.password
      updateSpecialist(modal.specialist.id, updates)
    }
    setModal(null)
  }

  const handleDelete = (id, name) => {
    if (confirm(`Specialist "${name}" definitief verwijderen? Al hun boekingen blijven bewaard.`)) {
      deleteSpecialist(id)
    }
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl text-[#2C2028]">Specialisten</h1>
          <p className="text-sm text-[#7A6270] mt-0.5">Beheer medewerkers en hun toegang</p>
        </div>
        <button onClick={() => setModal({ mode: 'add' })}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#A41162] to-[#953D7F] text-white text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus size={16} />
          Nieuwe specialist
        </button>
      </div>

      {/* List */}
      {specialists.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#EDD8E8]/40 shadow-[0_2px_12px_rgba(44,32,40,0.06)] py-16 text-center">
          <Users size={40} className="mx-auto text-[#EDD8E8] mb-4" />
          <p className="font-serif text-lg text-[#2C2028] mb-1">Nog geen specialisten</p>
          <p className="text-sm text-[#9D8090] mb-6">Voeg een medewerker toe om aan de slag te gaan.</p>
          <button onClick={() => setModal({ mode: 'add' })}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#A41162] to-[#953D7F] text-white text-sm font-medium hover:opacity-90 transition-opacity">
            <Plus size={16} />
            Eerste specialist toevoegen
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {specialists.map(s => (
            <div key={s.id}
              className="bg-white rounded-2xl border border-[#EDD8E8]/40 shadow-[0_2px_12px_rgba(44,32,40,0.06)] p-4 flex items-center gap-4">
              {/* Avatar */}
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-base font-semibold flex-shrink-0"
                style={{ background: s.color || '#A41162' }}>
                {s.name.charAt(0).toUpperCase()}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-[#2C2028]">{s.name}</p>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                    s.isActive !== false ? 'bg-green-50 text-green-600' : 'bg-[#FAF7F5] text-[#9D8090]'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${s.isActive !== false ? 'bg-green-400' : 'bg-[#EDD8E8]'}`} />
                    {s.isActive !== false ? 'Actief' : 'Inactief'}
                  </span>
                </div>
                <p className="text-xs text-[#9D8090] mt-0.5">{s.email}</p>
                {s.speciality && <p className="text-xs text-[#A41162] mt-0.5">{s.speciality}</p>}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 flex-shrink-0">
                <button onClick={() => setModal({ mode: 'edit', specialist: s })}
                  className="p-2 rounded-xl text-[#9D8090] hover:bg-[#F9E8F3] hover:text-[#A41162] transition-colors">
                  <Pencil size={15} />
                </button>
                <button onClick={() => handleDelete(s.id, s.name)}
                  className="p-2 rounded-xl text-[#9D8090] hover:bg-red-50 hover:text-red-500 transition-colors">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Login info card */}
      {specialists.length > 0 && (
        <div className="bg-[#F9E8F3]/60 rounded-2xl border border-[#EDD8E8]/60 p-4">
          <p className="text-xs text-[#7A6270]">
            Elke specialist logt in via <span className="font-medium text-[#2C2028]">/admin</span> met hun eigen e-mail en wachtwoord.
            Ze zien enkel hun eigen boekingen en agenda.
          </p>
        </div>
      )}

      {modal && (
        <SpecialistModal
          specialist={modal.specialist}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  )
}
