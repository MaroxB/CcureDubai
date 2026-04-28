import { useState } from 'react'
import { Lock, AlertTriangle, RotateCcw } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'
import { defaultSiteConfig } from '../../config/siteConfig'

function Field({ label, value, onChange, type = 'text', placeholder = '' }) {
  return (
    <div>
      <label className="block text-xs font-medium text-[#7A6270] uppercase tracking-wide mb-1.5">{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-xl border border-[#EDD8E8] bg-[#FAF7F5] text-sm text-[#2C2028] focus:outline-none focus:ring-2 focus:ring-[#A41162]/20 focus:border-[#A41162]/40" />
    </div>
  )
}

export default function SettingsPage() {
  const { siteConfig, updateSiteConfig, resetSiteConfig } = useAdmin()
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [pwError, setPwError] = useState('')
  const [pwSaved, setPwSaved] = useState(false)

  const handlePasswordChange = () => {
    if (!newPassword || newPassword.length < 6) {
      setPwError('Wachtwoord moet minstens 6 tekens bevatten.')
      return
    }
    if (newPassword !== confirmPassword) {
      setPwError('Wachtwoorden komen niet overeen.')
      return
    }
    setPwError('')
    if (newEmail) updateSiteConfig('admin.email', newEmail)
    updateSiteConfig('admin.passwordHash', newPassword)
    setPwSaved(true)
    setNewEmail('')
    setNewPassword('')
    setConfirmPassword('')
    setTimeout(() => setPwSaved(false), 2000)
  }

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div>
        <h1 className="font-serif text-2xl text-[#2C2028]">Instellingen</h1>
        <p className="text-sm text-[#7A6270] mt-0.5">Accountbeheer hoofdbeheerder</p>
      </div>

      {/* Admin credentials */}
      <div className="bg-white rounded-2xl border border-[#EDD8E8]/40 shadow-[0_2px_12px_rgba(44,32,40,0.06)] overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#EDD8E8]/40">
          <Lock size={18} className="text-[#A41162]" />
          <h2 className="font-serif text-lg text-[#2C2028]">Hoofdbeheerder inloggegevens</h2>
        </div>
        <div className="p-5 space-y-4">
          <div className="p-3 rounded-xl bg-blue-50 border border-blue-100">
            <p className="text-xs text-blue-700">
              Huidig e-mailadres: <strong>{siteConfig?.admin?.email || defaultSiteConfig.admin.email}</strong>
            </p>
          </div>
          <Field label="Nieuw e-mailadres (optioneel)" value={newEmail} onChange={setNewEmail}
            type="email" placeholder="nieuw@email.be" />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Nieuw wachtwoord" value={newPassword} onChange={setNewPassword}
              type="password" placeholder="min. 6 tekens" />
            <Field label="Bevestig wachtwoord" value={confirmPassword} onChange={setConfirmPassword}
              type="password" placeholder="herhaal wachtwoord" />
          </div>
          {pwError && (
            <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-xl border border-red-100">{pwError}</p>
          )}
          <button onClick={handlePasswordChange}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              pwSaved ? 'bg-green-500 text-white' : 'bg-[#2C2028] text-white hover:bg-[#2C2028]/90'
            }`}>
            {pwSaved ? 'Opgeslagen!' : 'Inloggegevens bijwerken'}
          </button>
        </div>
      </div>

      {/* Danger zone */}
      <div className="bg-white rounded-2xl border border-red-100 overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-red-100">
          <AlertTriangle size={18} className="text-red-500" />
          <h2 className="font-serif text-lg text-[#2C2028]">Gevarenzone</h2>
        </div>
        <div className="p-5 space-y-3">
          <p className="text-xs text-[#7A6270]">Deze acties kunnen niet ongedaan worden gemaakt.</p>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => { if (confirm('Alle configuratie resetten naar standaard?')) resetSiteConfig() }}
              className="px-4 py-2.5 rounded-xl border border-red-200 text-red-500 text-xs font-medium hover:bg-red-50 transition-colors">
              Configuratie resetten
            </button>
            <button onClick={() => {
              if (confirm('Alle boekingen definitief verwijderen?')) {
                localStorage.removeItem('bookings')
                window.location.reload()
              }
            }}
              className="px-4 py-2.5 rounded-xl border border-red-200 text-red-500 text-xs font-medium hover:bg-red-50 transition-colors">
              Alle boekingen verwijderen
            </button>
            <button onClick={() => {
              if (confirm('Alle specialisten verwijderen?')) {
                localStorage.removeItem('specialists')
                window.location.reload()
              }
            }}
              className="px-4 py-2.5 rounded-xl border border-red-200 text-red-500 text-xs font-medium hover:bg-red-50 transition-colors">
              Alle specialisten verwijderen
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
