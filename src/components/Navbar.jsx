import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Phone, Menu, X, ChevronDown } from 'lucide-react'
import logo from '/Afbeeldingen/C-cure Logo.svg'

const treatmentCategories = [
  { label: 'Physiotherapy', to: '/treatments?categorie=fysiotherapie' },
  { label: 'Cupping', to: '/treatments?categorie=cupping' },
  { label: 'Facial Treatments', to: '/treatments?categorie=gelaat', isNew: true },
  { label: 'Massage', to: '/treatments?categorie=massage' },
  { label: 'Peeling', to: '/treatments?categorie=peeling' },
  { label: 'Skin Analysis', to: '/treatments?categorie=huidscan' },
  { label: 'Plasma Lifting', to: '/treatments?categorie=plasma' },
]

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Treatments', to: '/treatments', hasDropdown: true },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileTreatmentsOpen, setMobileTreatmentsOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const isActive = (to) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to.split('?')[0])

  const linkClass = (to) =>
    `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${isActive(to)
      ? scrolled ? 'text-brand-primary bg-blush-mist' : 'text-white bg-white/20'
      : scrolled ? 'text-text-muted hover:text-text-dark hover:bg-blush-mist/50' : 'text-white/85 hover:text-white hover:bg-white/15'
    }`

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? 'py-3 bg-white shadow-soft'
          : 'py-5 bg-transparent'
          }`}
      >
        <div className="container-wide flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <img
              src={logo}
              alt="Aura Wellness"
              className="h-9 w-auto transition-all duration-500"
              style={{
                filter: scrolled
                  ? 'invert(15%) sepia(80%) saturate(2500%) hue-rotate(290deg) brightness(70%)'
                  : 'drop-shadow(0 1px 4px rgba(0,0,0,0.35))',
              }}
            />
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div key={link.to} className="relative group">
                  <Link
                    to={link.to}
                    className={`${linkClass(link.to)} inline-flex items-center gap-1`}
                  >
                    {link.label}
                    <ChevronDown size={13} className="transition-transform duration-300 group-hover:rotate-180" />
                  </Link>

                  <div className="absolute left-0 right-0 top-full h-3" />

                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-64 z-50
                                  opacity-0 pointer-events-none
                                  group-hover:opacity-100 group-hover:pointer-events-auto
                                  transition-opacity duration-300 ease-out">
                    <div className="bg-white rounded-2xl shadow-card border border-[#EDD8E8]/50 overflow-hidden">
                      <Link
                        to="/treatments"
                        className="block px-4 py-3 text-sm font-medium text-text-muted border-b border-[#EDD8E8]/50 hover:bg-blush-mist/60 hover:text-brand-primary transition-colors"
                      >
                        All Treatments
                      </Link>
                      <div className="px-2 py-2">
                        {treatmentCategories.map(cat => (
                          <Link
                            key={cat.to}
                            to={cat.to}
                            className="flex items-center justify-between gap-2 pl-3 pr-3 py-2 rounded-xl text-sm text-text-dark hover:bg-blush-mist/60 hover:text-brand-primary transition-colors"
                          >
                            <span className="flex-1">{cat.label}</span>
                            {cat.isNew && (
                              <span className="text-[10px] font-semibold text-brand-primary bg-blush-mist px-2 py-0.5 rounded-full flex-shrink-0">New</span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link key={link.to} to={link.to} className={linkClass(link.to)}>
                  {link.label}
                </Link>
              )
            )}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:+97144507788"
              className={`hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 ${scrolled
                ? 'bg-gradient-cta text-white hover:shadow-soft-lg'
                : 'bg-white/15 border border-white/50 text-white hover:bg-white/25 backdrop-blur-sm'
                }`}
            >
              <Phone size={14} />
              <span>Call Us</span>
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`md:hidden p-2 rounded-full transition-colors ${scrolled
                ? 'text-text-muted hover:text-text-dark hover:bg-blush-mist/60'
                : 'text-white hover:bg-white/15'
                }`}
              aria-label="Menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
      >
        <div
          className="absolute inset-0 bg-text-dark/30 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 bottom-0 w-72 bg-ivory shadow-soft-lg flex flex-col transition-transform duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-blush-mist">
            <img
              src={logo}
              alt="Aura Wellness"
              className="h-8 w-auto"
              style={{ filter: 'invert(15%) sepia(80%) saturate(2500%) hue-rotate(290deg) brightness(70%)' }}
            />
            <button
              onClick={() => setMenuOpen(false)}
              className="p-1.5 rounded-full hover:bg-blush-mist text-text-muted"
            >
              <X size={20} />
            </button>
          </div>
          <nav className="flex flex-col gap-1 px-4 py-6 flex-1 overflow-y-auto">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div key={link.to}>
                  <button
                    onClick={() => setMobileTreatmentsOpen(v => !v)}
                    className={`w-full text-left px-4 py-3.5 rounded-2xl text-base font-medium transition-all duration-200 flex items-center justify-between ${isActive(link.to) ? 'text-brand-primary bg-blush-mist' : 'text-text-dark hover:text-brand-primary hover:bg-blush-mist/60'
                      }`}
                  >
                    {link.label}
                    <ChevronDown size={16} className={`transition-transform duration-200 ${mobileTreatmentsOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileTreatmentsOpen && (
                    <div className="ml-4 mt-1 flex flex-col gap-0.5">
                      <Link
                        to="/treatments"
                        className="px-4 py-2.5 rounded-xl text-sm text-text-muted hover:text-brand-primary hover:bg-blush-mist/60 transition-colors"
                      >
                        All Treatments
                      </Link>
                      {treatmentCategories.map(cat => (
                        <Link
                          key={cat.to}
                          to={cat.to}
                          className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm text-text-dark hover:text-brand-primary hover:bg-blush-mist/60 transition-colors"
                        >
                          {cat.label}
                          {cat.isNew && (
                            <span className="text-[10px] font-semibold text-brand-primary bg-blush-mist px-1.5 py-0.5 rounded-full">New</span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-3.5 rounded-2xl text-base font-medium transition-all duration-200 ${isActive(link.to) ? 'text-brand-primary bg-blush-mist' : 'text-text-dark hover:text-brand-primary hover:bg-blush-mist/60'
                    }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
          <div className="px-4 py-6 border-t border-blush-mist space-y-3">
            <a
              href="tel:+97144507788"
              className="flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-full bg-gradient-cta text-white font-medium text-sm"
            >
              <Phone size={15} />
              +971 4 450 7788
            </a>
            <Link
              to="/contact"
              className="flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-full border border-brand-primary/30 text-brand-primary font-medium text-sm"
            >
              Book an Appointment
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
