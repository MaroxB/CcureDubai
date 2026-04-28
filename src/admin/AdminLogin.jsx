import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Lock, Mail, Sparkles } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'

export default function AdminLogin() {
  const { login, authError } = useAdmin()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    // Tiny artificial delay for UX
    await new Promise(r => setTimeout(r, 400))
    const ok = login(form.email, form.password)
    setLoading(false)
    if (ok) navigate('/admin/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FAF7F5] via-[#F9E8F3] to-[#EDD8E8] p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgba(164,17,98,0.12)] p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#A41162] to-[#953D7F] mb-4 shadow-[0_4px_16px_rgba(164,17,98,0.3)]">
              <Sparkles size={24} className="text-white" />
            </div>
            <h1 className="font-serif text-2xl text-[#2C2028] mb-1">Admin Dashboard</h1>
            <p className="text-sm text-[#7A6270]">Log in om uw salon te beheren</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-[#7A6270] uppercase tracking-wide mb-1.5">
                E-mailadres
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9D8090]" />
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="admin@c-cure.be"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#EDD8E8] bg-[#FAF7F5] text-[#2C2028] text-sm placeholder-[#9D8090] focus:outline-none focus:ring-2 focus:ring-[#A41162]/20 focus:border-[#A41162]/40 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-[#7A6270] uppercase tracking-wide mb-1.5">
                Wachtwoord
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9D8090]" />
                <input
                  type={showPw ? 'text' : 'password'}
                  required
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-[#EDD8E8] bg-[#FAF7F5] text-[#2C2028] text-sm placeholder-[#9D8090] focus:outline-none focus:ring-2 focus:ring-[#A41162]/20 focus:border-[#A41162]/40 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(v => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9D8090] hover:text-[#A41162] transition-colors"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {authError && (
              <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                {authError}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#A41162] to-[#953D7F] text-white font-medium text-sm tracking-wide transition-all hover:opacity-90 hover:shadow-[0_4px_16px_rgba(164,17,98,0.3)] disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Inloggen...
                </>
              ) : 'Inloggen'}
            </button>
          </form>

          {/* Hint */}
          <p className="mt-6 text-center text-xs text-[#9D8090]">
            Standaard: <span className="font-medium text-[#7A6270]">admin@c-cure.be</span> / <span className="font-medium text-[#7A6270]">ccure2024</span>
          </p>
        </div>

        <p className="text-center text-xs text-[#9D8090] mt-4">
          C-Cure Admin · Beveiligd dashboard
        </p>
      </div>
    </div>
  )
}
