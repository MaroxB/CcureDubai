import { useState } from 'react'
import { Save, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'
import { defaultSiteConfig } from '../../config/siteConfig'

function Section({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="bg-white rounded-2xl border border-[#EDD8E8]/40 shadow-[0_2px_12px_rgba(44,32,40,0.06)] overflow-hidden">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-5 py-4 border-b border-[#EDD8E8]/40 hover:bg-[#FAF7F5]/60 transition-colors"
      >
        <h2 className="font-serif text-lg text-[#2C2028]">{title}</h2>
        {open ? <ChevronUp size={16} className="text-[#9D8090]" /> : <ChevronDown size={16} className="text-[#9D8090]" />}
      </button>
      {open && <div className="p-5 space-y-4">{children}</div>}
    </div>
  )
}

function Field({ label, value, onChange, multiline = false, placeholder = '' }) {
  const cls = "w-full px-4 py-2.5 rounded-xl border border-[#EDD8E8] bg-[#FAF7F5] text-sm text-[#2C2028] focus:outline-none focus:ring-2 focus:ring-[#A41162]/20 focus:border-[#A41162]/40"
  return (
    <div>
      <label className="block text-xs font-medium text-[#7A6270] uppercase tracking-wide mb-1.5">{label}</label>
      {multiline
        ? <textarea rows={4} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={`${cls} resize-none`} />
        : <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={cls} />
      }
    </div>
  )
}

export default function ContentEditor() {
  const { siteConfig, updateSiteConfig } = useAdmin()
  const [saved, setSaved] = useState(false)

  const get = (path) => {
    const keys = path.split('.')
    let cur = siteConfig
    for (const k of keys) cur = cur?.[k]
    return cur ?? ''
  }

  const set = (path, value) => updateSiteConfig(path, value)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl text-[#2C2028]">Webcontent</h1>
          <p className="text-sm text-[#7A6270] mt-0.5">Beheer alle teksten en informatie op uw website</p>
        </div>
        <button
          onClick={handleSave}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
            saved ? 'bg-green-500 text-white' : 'bg-gradient-to-r from-[#A41162] to-[#953D7F] text-white hover:opacity-90'
          }`}
        >
          <Save size={15} />
          {saved ? 'Opgeslagen!' : 'Opslaan'}
        </button>
      </div>

      {/* Hero Section */}
      <Section title="Hero sectie (homepage)">
        <Field
          label="Hoofdtitel"
          value={get('content.hero.headline')}
          onChange={v => set('content.hero.headline', v)}
          placeholder="Jouw moment van rust & herstel"
        />
        <Field
          label="Subtitel"
          value={get('content.hero.subline')}
          onChange={v => set('content.hero.subline', v)}
          multiline
          placeholder="Professionele behandelingen met warmte..."
        />
        <div className="grid grid-cols-2 gap-4">
          <Field
            label="CTA knop tekst"
            value={get('content.hero.ctaLabel')}
            onChange={v => set('content.hero.ctaLabel', v)}
            placeholder="Boek uw afspraak"
          />
          <Field
            label="Secundaire knop tekst"
            value={get('content.hero.ctaSecondaryLabel')}
            onChange={v => set('content.hero.ctaSecondaryLabel', v)}
            placeholder="Bekijk behandelingen"
          />
        </div>
      </Section>

      {/* About Section */}
      <Section title="Over ons pagina">
        <Field
          label="Paginatitel"
          value={get('content.about.title')}
          onChange={v => set('content.about.title', v)}
          placeholder="Over C-Cure"
        />
        <Field
          label="Intro tekst"
          value={get('content.about.intro')}
          onChange={v => set('content.about.intro', v)}
          multiline
          placeholder="Welkom bij C-Cure..."
        />
        <Field
          label="Hoofdtekst"
          value={get('content.about.body')}
          onChange={v => set('content.about.body', v)}
          multiline
          placeholder="Met jarenlange ervaring..."
        />
      </Section>

      {/* Contact info */}
      <Section title="Contactgegevens">
        <div className="grid grid-cols-2 gap-4">
          <Field
            label="Telefoonnummer"
            value={get('contact.phone')}
            onChange={v => set('contact.phone', v)}
            placeholder="0498 48 15 42"
          />
          <Field
            label="E-mailadres"
            value={get('contact.email')}
            onChange={v => set('contact.email', v)}
            placeholder="info@salon.be"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field
            label="Straat & nummer"
            value={get('contact.address')}
            onChange={v => set('contact.address', v)}
            placeholder="Straatnaam 1"
          />
          <Field
            label="Stad"
            value={get('contact.city')}
            onChange={v => set('contact.city', v)}
            placeholder="Stad"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field
            label="Postcode"
            value={get('contact.postalCode')}
            onChange={v => set('contact.postalCode', v)}
            placeholder="0000"
          />
          <Field
            label="Land (code)"
            value={get('contact.country')}
            onChange={v => set('contact.country', v)}
            placeholder="BE"
          />
        </div>
      </Section>

      {/* Social media */}
      <Section title="Social media" defaultOpen={false}>
        <Field
          label="Facebook URL"
          value={get('social.facebook')}
          onChange={v => set('social.facebook', v)}
          placeholder="https://facebook.com/..."
        />
        <Field
          label="Instagram URL"
          value={get('social.instagram')}
          onChange={v => set('social.instagram', v)}
          placeholder="https://instagram.com/..."
        />
        <Field
          label="WhatsApp nummer"
          value={get('social.whatsapp')}
          onChange={v => set('social.whatsapp', v)}
          placeholder="+32498000000"
        />
      </Section>

      {/* SEO */}
      <Section title="SEO instellingen" defaultOpen={false}>
        <Field
          label="Website URL"
          value={get('seo.siteUrl')}
          onChange={v => set('seo.siteUrl', v)}
          placeholder="https://www.uwsalon.be"
        />
        <Field
          label="Standaard paginatitel"
          value={get('seo.defaultTitle')}
          onChange={v => set('seo.defaultTitle', v)}
          placeholder="Salon | Uw ondertitel"
        />
        <Field
          label="Standaard beschrijving"
          value={get('seo.defaultDescription')}
          onChange={v => set('seo.defaultDescription', v)}
          multiline
          placeholder="Korte beschrijving van uw salon..."
        />
      </Section>

      {/* Reviews */}
      <Section title="Google Reviews" defaultOpen={false}>
        <div className="grid grid-cols-2 gap-4">
          <Field
            label="Aantal reviews"
            value={String(get('reviews.count') || '')}
            onChange={v => set('reviews.count', parseInt(v) || 0)}
            placeholder="66"
          />
          <Field
            label="Score (bv. 5,0)"
            value={get('reviews.score')}
            onChange={v => set('reviews.score', v)}
            placeholder="5,0"
          />
        </div>
        <Field
          label="Google Reviews URL"
          value={get('reviews.googleUrl')}
          onChange={v => set('reviews.googleUrl', v)}
          placeholder="https://g.page/..."
        />
      </Section>

      {/* Booking */}
      <Section title="Booking systeem" defaultOpen={false}>
        <Field
          label="Externe booking URL (Salonkee, Timely, etc.)"
          value={get('booking.externalUrl')}
          onChange={v => set('booking.externalUrl', v)}
          placeholder="https://salonkee.be/salon/..."
        />
        <div className="flex items-center gap-3">
          <div
            onClick={() => set('booking.useInternalBooking', !get('booking.useInternalBooking'))}
            className={`w-10 rounded-full transition-colors cursor-pointer flex-shrink-0 ${get('booking.useInternalBooking') ? 'bg-[#A41162]' : 'bg-[#EDD8E8]'}`}
            style={{ height: '22px', position: 'relative' }}
          >
            <span
              className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${get('booking.useInternalBooking') ? 'translate-x-5' : 'translate-x-0.5'}`}
            />
          </div>
          <span className="text-sm text-[#7A6270]">Ingebouwde booking pagina gebruiken (in plaats van externe link)</span>
        </div>
      </Section>
    </div>
  )
}
