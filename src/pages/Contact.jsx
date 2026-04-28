import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, CalendarCheck, CheckCircle2, Send, Instagram, Facebook } from 'lucide-react'
import { Link } from 'react-router-dom'
import SectionReveal from '../components/SectionReveal'
import TrustBadge from '../components/TrustBadge'

const hours = [
  { days: 'Monday – Thursday', time: '10:00 – 20:00' },
  { days: 'Friday', time: '10:00 – 14:00' },
  { days: 'Saturday – Sunday', time: '10:00 – 18:00' },
]

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sent

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sent')
  }

  if (status === 'sent') {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <div className="w-14 h-14 rounded-full bg-blush-mist flex items-center justify-center">
          <CheckCircle2 size={26} className="text-brand-primary" />
        </div>
        <h3 className="font-serif text-2xl text-text-dark">Message sent</h3>
        <p className="text-text-muted font-light max-w-sm">
          We will get back to you as soon as possible. You can also reach us directly on +971 4 450 7788.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-xs font-medium text-text-muted uppercase tracking-wide">Name *</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            className="px-4 py-3 rounded-2xl border border-orchid-haze bg-white/80 text-sm text-text-dark placeholder-text-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/25 focus:border-brand-primary/40 transition-colors"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-xs font-medium text-text-muted uppercase tracking-wide">Email *</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className="px-4 py-3 rounded-2xl border border-orchid-haze bg-white/80 text-sm text-text-dark placeholder-text-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/25 focus:border-brand-primary/40 transition-colors"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="phone" className="text-xs font-medium text-text-muted uppercase tracking-wide">Phone number</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          placeholder="+971 50 000 0000"
          className="px-4 py-3 rounded-2xl border border-orchid-haze bg-white/80 text-sm text-text-dark placeholder-text-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/25 focus:border-brand-primary/40 transition-colors"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-xs font-medium text-text-muted uppercase tracking-wide">Message *</label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="How can we help you? Which treatment are you interested in?"
          className="px-4 py-3 rounded-2xl border border-orchid-haze bg-white/80 text-sm text-text-dark placeholder-text-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/25 focus:border-brand-primary/40 transition-colors resize-none"
        />
      </div>
      <button type="submit" className="btn-primary w-full justify-center mt-2">
        <Send size={15} />
        Send message
      </button>
    </form>
  )
}

export default function Contact() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-20 overflow-hidden"
        style={{ background: 'linear-gradient(145deg, #1A0525 0%, #4A0E40 45%, #A41162 80%, #953D7F 100%)' }}>
        <div className="absolute top-0 right-0 w-[500px] h-[400px] pointer-events-none"
          style={{ background: 'radial-gradient(circle at 100% 0%, rgba(241,98,237,0.15) 0%, transparent 60%)' }} />
        <div className="absolute bottom-0 left-0 w-72 h-72 pointer-events-none"
          style={{ background: 'radial-gradient(circle at 0% 100%, rgba(149,61,127,0.25) 0%, transparent 65%)' }} />
        <div className="container-narrow relative z-10 text-center">
          <SectionReveal>
            <div className="section-label justify-center" style={{ color: 'rgba(251,229,250,0.70)' }}>
              <span className="w-6 h-px bg-white/40 inline-block" />
              We would love to hear from you
            </div>
            <h1 className="heading-lg mb-5 text-white">
              <em className="not-italic" style={{ color: '#F4A8DA' }}>Contact</em>
            </h1>
            <p className="text-lg text-white/70 font-light max-w-md mx-auto leading-relaxed">
              Have a question, want to book an appointment or simply curious? We are here for you.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Main contact content */}
      <section className="section-padding bg-ivory">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left: info */}
            <div className="flex flex-col gap-8">
              <SectionReveal>
                {/* Primary: booking */}
                <div className="rounded-3xl bg-gradient-cta p-8 text-white relative overflow-hidden mb-6">
                  <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                  <h2 className="font-serif text-2xl mb-3">Book Your Appointment</h2>
                  <p className="text-white/75 font-light text-sm mb-5 leading-relaxed">
                    Contact us directly by phone or email and our team will arrange your appointment at a time that suits you.
                  </p>
                  <a
                    href="tel:+97144507788"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-brand-primary font-medium text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <CalendarCheck size={15} />
                    Call to Book: +971 4 450 7788
                  </a>
                </div>
              </SectionReveal>

              {/* Contact details */}
              <SectionReveal delay={80}>
                <div className="card-soft flex flex-col gap-5">
                  <h3 className="font-serif text-xl text-text-dark">Contact Details</h3>
                  <div className="flex flex-col gap-4">
                    <a href="tel:+97144507788" className="flex items-center gap-3 group">
                      <div className="w-9 h-9 rounded-xl bg-blush-mist flex items-center justify-center flex-shrink-0 group-hover:bg-gradient-cta transition-colors">
                        <Phone size={15} className="text-brand-primary group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <p className="text-xs text-text-muted uppercase tracking-wide mb-0.5">Phone</p>
                        <p className="text-sm font-medium text-text-dark group-hover:text-brand-primary transition-colors">+971 4 450 7788</p>
                      </div>
                    </a>
                    <a href="mailto:hello@aurawellness.ae" className="flex items-center gap-3 group">
                      <div className="w-9 h-9 rounded-xl bg-blush-mist flex items-center justify-center flex-shrink-0 group-hover:bg-gradient-cta transition-colors">
                        <Mail size={15} className="text-brand-primary group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <p className="text-xs text-text-muted uppercase tracking-wide mb-0.5">Email</p>
                        <p className="text-sm font-medium text-text-dark group-hover:text-brand-primary transition-colors">hello@aurawellness.ae</p>
                      </div>
                    </a>
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blush-mist flex items-center justify-center flex-shrink-0">
                        <MapPin size={15} className="text-brand-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-text-muted uppercase tracking-wide mb-0.5">Address</p>
                        <p className="text-sm font-medium text-text-dark">Marina Walk, Unit 7<br />Dubai Marina, Dubai, UAE</p>
                      </div>
                    </div>
                  </div>

                  {/* Social */}
                  <div className="flex items-center gap-3 pt-2 border-t border-blush-mist">
                    <span className="text-xs text-text-muted">Follow us</span>
                    <a
                      href="#"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blush-mist text-brand-primary text-xs font-medium hover:bg-blush-light transition-colors"
                    >
                      <Facebook size={12} />
                      Facebook
                    </a>
                    <a
                      href="#"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blush-mist text-brand-primary text-xs font-medium hover:bg-blush-light transition-colors"
                    >
                      <Instagram size={12} />
                      Instagram
                    </a>
                  </div>
                </div>
              </SectionReveal>

              {/* Opening hours */}
              <SectionReveal delay={120}>
                <div className="card-soft">
                  <div className="flex items-center gap-2 mb-5">
                    <Clock size={17} className="text-brand-primary" />
                    <h3 className="font-serif text-xl text-text-dark">Opening Hours</h3>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    {hours.map((h) => (
                      <div key={h.days} className="flex items-center justify-between gap-4 text-sm">
                        <span className="text-text-muted font-light">{h.days}</span>
                        <span className="font-medium text-text-dark">{h.time}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-text-muted mt-4 pt-3 border-t border-blush-mist font-light">
                    By appointment — please call or email to reserve your slot.
                  </p>
                </div>
              </SectionReveal>

              {/* Trust */}
              <SectionReveal delay={140}>
                <TrustBadge />
              </SectionReveal>
            </div>

            {/* Right: form + map */}
            <div className="flex flex-col gap-8">
              <SectionReveal delay={60}>
                <div className="card-soft">
                  <h2 className="font-serif text-2xl text-text-dark mb-6">Send a Message</h2>
                  <ContactForm />
                </div>
              </SectionReveal>

              {/* Map */}
              <SectionReveal delay={100}>
                <div className="rounded-3xl overflow-hidden shadow-card" style={{ height: '280px' }}>
                  <iframe
                    title="Aura Wellness location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.6814!2d55.13753!3d25.0804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6b5d4e1c0001%3A0x0!2sDubai+Marina%2C+Dubai%2C+UAE!5e0!3m2!1sen!2sae!4v1700000000000"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'saturate(0.7) brightness(1.05)' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <p className="text-xs text-text-muted mt-2 text-center font-light">
                  Marina Walk, Unit 7 · Dubai Marina, Dubai, UAE ·{' '}
                  <a
                    href="https://maps.google.com/?q=Dubai+Marina,+Dubai,+UAE"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-primary hover:underline"
                  >
                    Open in Google Maps
                  </a>
                </p>
              </SectionReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Reassurance card */}
      <section className="section-padding bg-ivory">
        <div className="container-narrow">
          <SectionReveal>
            <div className="rounded-[2rem] overflow-hidden relative text-center"
              style={{ background: 'linear-gradient(135deg, #A41162 0%, #953D7F 60%, #c058a0 100%)' }}>
              <div className="absolute top-0 right-0 w-56 h-56 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/3 pointer-events-none" />
              <div className="relative z-10 px-8 py-14">
                <p className="font-serif text-3xl md:text-4xl text-white mb-3 text-balance">
                  Ready to experience it for yourself?
                </p>
                <p className="text-white/70 font-light mb-8 max-w-sm mx-auto">
                  No question is too small. Our team is happy to help you find the perfect treatment for your needs.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                  <Link to="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-brand-primary font-medium text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                    <CalendarCheck size={15} /> Book an Appointment
                  </Link>
                  <a href="tel:+97144507788"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/40 text-white font-medium text-sm transition-all duration-300 hover:bg-white/10">
                    Call Directly
                  </a>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  {['Fast response', 'No obligation', 'Warm & personal'].map((t) => (
                    <span key={t} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 border border-white/20 text-xs text-white/80">
                      <CheckCircle2 size={10} className="text-white/60" />
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  )
}
