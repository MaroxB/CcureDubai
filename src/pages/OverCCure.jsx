import { Link } from 'react-router-dom'
import { Heart, Star, ArrowRight, CalendarCheck, CheckCircle2, Leaf, Shield, Sparkles } from 'lucide-react'
import SectionReveal from '../components/SectionReveal'
import TrustBadge from '../components/TrustBadge'
import SPABadge from '../components/SPABadge'
import faceScan from '/Afbeeldingen/Hero/facescan-c-cure.webp'

const values = [
  {
    icon: <Heart size={20} />,
    title: 'Tailored care',
    desc: 'Every treatment is adapted to your personal needs, body and wishes. You are not just a client — you are a valued guest.',
  },
  {
    icon: <Leaf size={20} />,
    title: 'Calming environment',
    desc: 'An intimate studio where tranquillity, warmth and privacy come first. No crowded waiting rooms, no rush — only your wellbeing.',
  },
  {
    icon: <Shield size={20} />,
    title: 'Professional expertise',
    desc: 'Years of experience in cupping, massage and advanced skincare. Continuous training to consistently deliver the best results.',
  },
  {
    icon: <Sparkles size={20} />,
    title: 'Genuine connection',
    desc: 'Our therapists listen to you. They take the time to understand your needs before beginning any treatment. That feels different — and it is.',
  },
]

export default function About() {
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
              The story behind Aura Wellness
            </div>
            <h1 className="heading-lg mb-5 text-white">
              About <em className="not-italic" style={{ color: '#F4A8DA' }}>Aura Wellness</em>
            </h1>
            <p className="text-lg text-white/70 font-light max-w-lg mx-auto leading-relaxed">
              A place where care, rest and personal attention come together — born from a passion for wellbeing and human connection.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Brand story */}
      <section className="section-padding bg-ivory">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <SectionReveal>
              <div className="relative">
                <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-soft opacity-60 blur-2xl" />
                <div className="relative rounded-[2rem] overflow-hidden shadow-card-hover">
                  <img
                    src={faceScan}
                    alt="Aura Wellness Dubai"
                    className="w-full h-[520px] object-cover"
                    onError={(e) => {
                      e.target.parentElement.style.background = 'linear-gradient(135deg, #F9E8F3, #EDD8E8, #FBE5FA)'
                      e.target.style.display = 'none'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/10 to-transparent pointer-events-none" />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-4 -right-4 glass rounded-2xl px-5 py-4 shadow-soft-lg">
                  <div className="flex gap-0.5 mb-1">
                    {Array(5).fill(0).map((_, i) => (
                      <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm font-medium text-text-dark">66 Google reviews</p>
                  <p className="text-xs text-text-muted">5.0 stars · Dubai Marina</p>
                </div>
              </div>
            </SectionReveal>

            <SectionReveal delay={120}>
              <div className="flex flex-col gap-6">
                <div className="section-label">
                  <span className="w-6 h-px bg-brand-primary/50 inline-block" />
                  Our story
                </div>
                <h2 className="heading-md">
                  Caring for people — <em className="gradient-text not-italic">it is in our heart</em>
                </h2>
                <div className="flex flex-col gap-4 text-text-muted font-light leading-relaxed">
                  <p>
                    Aura Wellness was founded with a single purpose: to create a sanctuary where every person can experience genuine care, deep relaxation and expert treatment — in the heart of Dubai Marina.
                  </p>
                  <p>
                    Our team brings together years of expertise in cupping therapy, massage, advanced facial treatments and plasma lifting. We believe that true wellness goes beyond the physical — it is about how you feel, inside and out.
                  </p>
                  <p>
                    We chose the name Aura Wellness because it captures what we stand for: the radiant energy and sense of renewal every client carries with them when they leave our studio. That glow is what drives us.
                  </p>
                  <p className="font-medium text-text-dark">
                    Every client who visits us deserves genuine attention. No rush, no one-size-fits-all approach — only personalised care at the pace that suits you.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 pt-2">
                  {['SPA Certified Partner', 'Dubai Marina Studio', 'Personalised approach'].map((t) => (
                    <span key={t} className="trust-pill">
                      <CheckCircle2 size={11} className="text-brand-primary/70" />
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-cream">
        <div className="container-wide">
          <SectionReveal>
            <div className="text-center max-w-lg mx-auto mb-14">
              <div className="section-label justify-center">
                <span className="w-6 h-px bg-brand-primary/50 inline-block" />
                Our values
              </div>
              <h2 className="heading-md mb-4">What Aura Wellness stands for</h2>
              <p className="text-text-muted font-light leading-relaxed">
                Four principles that guide every treatment and every conversation.
              </p>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <SectionReveal key={v.title} delay={i * 80}>
                <div className="card-soft h-full flex flex-col gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-blush-mist flex items-center justify-center text-brand-primary flex-shrink-0">
                    {v.icon}
                  </div>
                  <h3 className="font-serif text-xl text-text-dark">{v.title}</h3>
                  <p className="text-sm text-text-muted font-light leading-relaxed">{v.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy quote */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <SectionReveal>
            <div className="text-center mb-14">
              <span className="inline-block font-serif text-7xl text-brand-primary/20 leading-none mb-2 select-none">"</span>
              <blockquote className="font-serif text-3xl md:text-4xl lg:text-5xl text-text-dark leading-tight mb-6 text-balance">
                Here you are allowed to breathe. No expectations, no rush — only warmth, attention and the care you deserve.
              </blockquote>
              <div className="flex items-center justify-center gap-3">
                <div className="w-8 h-px bg-brand-primary/30" />
                <p className="text-text-muted font-light text-sm tracking-wide">Aura Wellness · Dubai Marina</p>
                <div className="w-8 h-px bg-brand-primary/30" />
              </div>
            </div>
          </SectionReveal>

          {/* Trust + SPA */}
          <SectionReveal delay={100}>
            <div className="flex flex-wrap gap-5 items-center justify-center mb-12">
              <TrustBadge variant="card" />
              <SPABadge />
            </div>
          </SectionReveal>

          {/* What to expect */}
          <SectionReveal delay={120}>
            <div className="rounded-3xl glass border border-white/80 shadow-soft p-8 md:p-10">
              <h3 className="font-serif text-2xl text-text-dark mb-6 text-center">What to expect at Aura Wellness</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'A personal welcome consultation before every treatment',
                  'A calm, intimate space in a private studio setting',
                  'Treatments tailored to your specific needs',
                  'No time pressure — you set the pace',
                  'Professional products and up-to-date techniques',
                  'Honest advice and aftercare following your treatment',
                  'One-on-one guidance from start to finish',
                  'Warm reception and genuine human connection',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-brand-primary mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-text-muted font-light">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 bg-cream">
        <div className="container-narrow text-center">
          <SectionReveal>
            <h2 className="heading-md mb-4">Ready to experience it for yourself?</h2>
            <p className="text-text-muted font-light mb-8 max-w-md mx-auto">
              Book your first treatment and discover why clients keep coming back.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/contact"
                className="btn-primary"
              >
                <CalendarCheck size={15} />
                Book an Appointment
              </Link>
              <Link to="/treatments" className="btn-secondary">
                View treatments
                <ArrowRight size={15} />
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  )
}
