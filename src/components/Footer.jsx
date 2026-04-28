import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Star, CalendarCheck } from 'lucide-react'
import logo from '/Afbeeldingen/C-cure Logo.svg'

const hours = [
  { days: 'Monday – Thursday', time: '10:00 – 20:00' },
  { days: 'Friday', time: '10:00 – 14:00' },
  { days: 'Saturday – Sunday', time: '10:00 – 18:00' },
]

export default function Footer() {
  return (
    <footer style={{ background: 'linear-gradient(160deg, #2E0A38 0%, #5B1050 35%, #A41162 70%, #953D7F 100%)' }}>
      <div className="container-wide py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand column */}
        <div className="lg:col-span-1 flex flex-col gap-5">
          <img
            src={logo}
            alt="Aura Wellness"
            className="h-10 w-auto"
            style={{ filter: 'brightness(0) invert(1)' }}
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'block'
            }}
          />
          <span className="font-serif text-2xl text-white hidden">Aura Wellness</span>
          <p className="text-sm text-white/70 leading-relaxed font-light">
            A place where you can truly be yourself. Personalised treatments with genuine care — for body and mind.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="p-2.5 rounded-full bg-white/15 text-white hover:bg-white/30 transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={16} />
            </a>
            <a
              href="#"
              className="p-2.5 rounded-full bg-white/15 text-white hover:bg-white/30 transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-4">
          <h4 className="font-serif text-lg text-white">Navigation</h4>
          <nav className="flex flex-col gap-2.5">
            {[
              { label: 'Home', to: '/' },
              { label: 'Treatments', to: '/treatments' },
              { label: 'About Us', to: '/about' },
              { label: 'Contact', to: '/contact' },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm text-white/70 hover:text-white transition-colors w-fit"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-4">
          <h4 className="font-serif text-lg text-white">Contact</h4>
          <div className="flex flex-col gap-3">
            <a href="tel:+97144507788" className="flex items-start gap-2.5 text-sm text-white/70 hover:text-white transition-colors group">
              <Phone size={15} className="mt-0.5 flex-shrink-0" />
              +971 4 450 7788
            </a>
            <a href="mailto:hello@aurawellness.ae" className="flex items-start gap-2.5 text-sm text-white/70 hover:text-white transition-colors group">
              <Mail size={15} className="mt-0.5 flex-shrink-0" />
              hello@aurawellness.ae
            </a>
            <div className="flex items-start gap-2.5 text-sm text-white/70">
              <MapPin size={15} className="mt-0.5 flex-shrink-0" />
              <span>Marina Walk, Unit 7<br />Dubai Marina, Dubai, UAE</span>
            </div>
          </div>
        </div>

        {/* Hours */}
        <div className="flex flex-col gap-4">
          <h4 className="font-serif text-lg text-white">Opening Hours</h4>
          <div className="flex flex-col gap-2">
            {hours.map((h) => (
              <div key={h.days} className="flex items-start justify-between gap-3 text-sm">
                <span className="text-white/65 font-light">{h.days}</span>
                <span className="text-white font-medium flex-shrink-0">{h.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust + CTA strip */}
      <div className="border-t border-white/15">
        <div className="container-wide py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex gap-0.5">
              {Array(5).fill(0).map((_, i) => (
                <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-sm text-white/70">
              <span className="font-medium text-white">5.0 stars</span> on Google · 66 happy clients
            </span>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-brand-primary text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft-lg"
          >
            <CalendarCheck size={14} />
            Book an Appointment
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/15">
        <div className="container-wide py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-white/40">© {new Date().getFullYear()} Aura Wellness · Marina Walk, Unit 7, Dubai Marina, Dubai, UAE</span>
          <Link to="/admin" className="text-xs text-white/20 hover:text-white/40 transition-colors">Admin</Link>

          <a
            href="#"
            className="group flex items-center gap-2.5 px-4 py-2 rounded-full
                       border border-white/10 bg-white/5 backdrop-blur-sm
                       transition-all duration-300 ease-out
                       hover:-translate-y-px hover:border-[#118AB2]/50 hover:bg-[#022972]/40"
            style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif" }}
          >
            <span
              className="text-xs tracking-wider text-white/45 transition-colors duration-300 group-hover:text-[#29C5F2]"
              style={{ letterSpacing: '0.08em' }}
            >
              Designed &amp; built by <span className="font-semibold text-white/60 group-hover:text-[#29C5F2] transition-colors duration-300">Azzuro</span>
            </span>
          </a>
        </div>
      </div>
    </footer>
  )
}
