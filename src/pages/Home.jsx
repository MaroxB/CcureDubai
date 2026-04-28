import { Link } from 'react-router-dom'
import {
  ArrowRight, Star, Heart, Leaf, Sparkles, Shield,
  Phone, CalendarCheck, CheckCircle2, ChevronRight,
} from 'lucide-react'
import SectionReveal from '../components/SectionReveal'
import ReviewCarousel from '../components/ReviewCarousel'
import { reviewConfig } from '../config/reviews'
import spaLogo    from '/Afbeeldingen/spa logo.png'
import spaSkincare from '/Afbeeldingen/Spa-Skincare.webp'
import spaBanner  from '/Afbeeldingen/spa-skincare-banner.webp'
import spaMixed   from '/Afbeeldingen/Spa-skincare, mixed.webp'

import heroImg1 from '/Afbeeldingen/Hero/facescan-c-cure.webp'
import cCureBg   from '/Afbeeldingen/ccure bg new.png'

import imgCuppingCard  from '/Afbeeldingen/Diensten/Vuurcupping-Rug-en-onderbenen.jpeg'
import imgMassageCard  from '/Afbeeldingen/Diensten/Holistische-massage.jpg.jpeg'
import imgGelaatCard   from '/Afbeeldingen/Diensten/HydraFacial.jpg.jpeg'
import imgFysioCard    from '/Afbeeldingen/Diensten/Yeso-Therapy.jpg.jpeg'
import imgPeelingCard  from '/Afbeeldingen/Diensten/bio-peel.jpg.jpeg'
import imgHuidscanCard from '/Afbeeldingen/Diensten/scan.jpeg'
import imgPlasmaCard   from '/Afbeeldingen/Diensten/Dermaplannig.jpg.jpeg'

function WaveTop({ color = '#ffffff', height = 52 }) {
  return (
    <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{ lineHeight: 0, zIndex: 1 }}>
      <svg viewBox="0 0 1440 52" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height }}>
        <path d="M0,26 Q360,52 720,26 Q1080,0 1440,26 L1440,0 L0,0 Z" fill={color} />
      </svg>
    </div>
  )
}

function WaveBottom({ color = '#ffffff', height = 52 }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ lineHeight: 0, zIndex: 1 }}>
      <svg viewBox="0 0 1440 52" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height }}>
        <path d="M0,26 Q360,0 720,26 Q1080,52 1440,26 L1440,52 L0,52 Z" fill={color} />
      </svg>
    </div>
  )
}

function GoogleReviewsPill() {
  const { count, score, googleUrl } = reviewConfig
  return (
    <a href={googleUrl} className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/30 hover:bg-white/25 transition-all duration-200 group">
      <svg width="16" height="16" viewBox="0 0 24 24" className="flex-shrink-0">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
      <div className="flex gap-0.5">
        {Array(5).fill(0).map((_, i) => <Star key={i} size={11} className="fill-amber-400 text-amber-400" />)}
      </div>
      <span className="text-white text-xs font-medium">{score}</span>
      <span className="text-white/70 text-xs">· {count} reviews</span>
      <ArrowRight size={11} className="text-white/50 group-hover:text-white/80 transition-colors" />
    </a>
  )
}

function HeroSection() {
  return (
    <section className="wave-container relative min-h-screen flex items-center overflow-hidden">
      {/* Soft pastel background — shows through if image has light areas */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(135deg, #EAD8F0 0%, #F3E2F0 25%, #FAE8F6 55%, #FAF4FB 80%, #FAF7F5 100%)'
      }} />

      {/* Hero image */}
      <img
        src={cCureBg}
        alt="Aura Wellness Dubai Marina"
        className="absolute inset-0 w-full h-full object-cover object-center"
        loading="eager"
      />

      {/* Directional gradient overlay — deep brand purple on left fading to transparent right */}
      <div className="absolute inset-0 z-10 pointer-events-none" style={{
        background: 'linear-gradient(105deg, rgba(22,4,32,0.78) 0%, rgba(64,12,52,0.62) 28%, rgba(140,30,100,0.32) 55%, rgba(180,80,140,0.08) 80%, transparent 100%)'
      }} />

      {/* Soft radial glow bottom-left for warmth */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[400px] z-10 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 0% 100%, rgba(164,17,98,0.18) 0%, transparent 65%)'
      }} />

      {/* White base at bottom for wave transition */}
      <div className="absolute bottom-0 left-0 right-0 h-8 z-10 pointer-events-none bg-white" />

      <div className="container-wide relative z-20 pt-24 pb-12 md:pt-28 md:pb-16">
        <div className="flex items-start justify-between gap-8">
          <div className="max-w-2xl flex flex-col gap-6">
            <div><GoogleReviewsPill /></div>
            <div className="section-label flex-wrap" style={{ color: 'rgba(251,229,250,0.75)' }}>
              <span className="w-6 h-px bg-white/40 inline-block flex-shrink-0" />
              Beauty Specialist · Wellness &amp; Massage · Dubai Marina
            </div>
            <h1 className="font-serif leading-[1.05] text-balance">
              <span className="block text-2xl sm:text-3xl md:text-4xl text-white/80"
                style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontWeight: 300, fontStyle: 'italic', letterSpacing: '0.04em' }}>
                Your body
              </span>
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl" style={{
                background: 'linear-gradient(135deg, #F9D0ED 0%, #F162ED 45%, #D4A8C7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontWeight: 400,
              }}>
                deserves rest.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/75 font-light leading-relaxed max-w-xl">
              Professional treatments in a calming environment — with genuine care for your wellbeing, comfort and recovery.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/treatments"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-brand-primary font-medium text-sm tracking-wide transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                View our treatments <ArrowRight size={15} />
              </Link>
              <Link to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/15 border border-white/40 text-white font-medium text-sm tracking-wide backdrop-blur-sm transition-all duration-300 hover:bg-white/25 hover:-translate-y-0.5">
                <CalendarCheck size={15} /> Book an Appointment
              </Link>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {['Warm welcome', 'Personalised care', 'Attentive service', 'SPA Partner'].map(t => (
                <span key={t} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-xs text-white/80">
                  <CheckCircle2 size={10} className="text-white/60" />{t}
                </span>
              ))}
            </div>
          </div>
          {/* SPA badge */}
          <div className="hidden lg:flex flex-col items-center gap-3 flex-shrink-0 self-center">
            <div className="flex flex-col items-center gap-3 px-8 py-7 rounded-3xl bg-white/12 backdrop-blur-md border border-white/25 shadow-soft-lg">
              <img src={spaLogo} alt="SPA" className="h-16 w-auto object-contain"
                style={{ filter: 'brightness(0) invert(1)' }}
                onError={e => { e.target.style.display = 'none' }} />
              <div className="w-10 h-px bg-white/30" />
              <p className="text-white/80 text-xs font-medium tracking-widest uppercase text-center leading-relaxed">SPA<br />Partner</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ReviewsSection() {
  const { count, score, googleUrl } = reviewConfig
  return (
    <section className="section-padding relative overflow-hidden bg-white">
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(164,17,98,0.10) 1.5px, transparent 1.5px)',
          backgroundSize: '30px 30px',
        }} />
      <div className="absolute top-0 right-0 w-[480px] h-[380px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(249,232,243,0.65) 0%, transparent 70%)' }} />

      <div className="container-wide mb-10 relative z-10">
        <SectionReveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="section-label">
                <span className="w-6 h-px bg-brand-primary/50 inline-block" />
                What clients say
              </div>
              <h2 className="heading-md">Loved by our clients</h2>
            </div>
            <a href={googleUrl}
              className="inline-flex flex-col items-center gap-1 px-5 py-3 rounded-2xl border border-brand-primary/10 bg-white shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-0.5 group">
              <div className="flex gap-0.5">
                {Array(5).fill(0).map((_, i) => <Star key={i} size={14} className="fill-amber-400 text-amber-400" />)}
              </div>
              <span className="text-sm font-semibold text-text-dark">{score} stars</span>
              <span className="text-xs text-text-muted">{count} Google reviews</span>
              <span className="text-xs text-brand-primary/70 group-hover:text-brand-primary flex items-center gap-1 mt-0.5">
                Read all reviews <ArrowRight size={10} />
              </span>
            </a>
          </div>
        </SectionReveal>
      </div>
      <div className="container-wide relative z-10">
        <ReviewCarousel />
      </div>
    </section>
  )
}

const pillars = [
  { icon: <Heart size={20} />, title: 'Personal attention', desc: 'Every client is welcomed personally. No rush, no anonymous studio — only your wellbeing matters here.', accent: '#A41162' },
  { icon: <Leaf size={20} />, title: 'Calming atmosphere', desc: 'An intimate, warm sanctuary where you immediately feel the stress melt away. Exactly the rest you deserve.', accent: '#953D7F' },
  { icon: <Shield size={20} />, title: 'Professional treatments', desc: 'Years of expertise in cupping, massage and advanced skincare. Quality you feel, results that last.', accent: '#A41162' },
  { icon: <Sparkles size={20} />, title: 'Exceptional service', desc: '66 Google reviews, all five stars. Clients return because they feel heard, cared for and renewed.', accent: '#953D7F' },
]

function WhyAura() {
  return (
    <section className="section-padding relative overflow-hidden bg-white">
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(60deg, transparent 0px, transparent 28px, rgba(164,17,98,0.04) 28px, rgba(164,17,98,0.04) 29px)',
        }} />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 0% 50%, rgba(241,98,237,0.08) 0%, transparent 65%)' }} />

      <div className="container-wide relative z-10">
        <SectionReveal>
          <div className="text-center max-w-xl mx-auto mb-14">
            <div className="section-label justify-center">
              <span className="w-6 h-px bg-brand-primary/50 inline-block" />
              Why Aura Wellness
            </div>
            <h2 className="heading-md mb-4">Why clients keep coming back</h2>
            <p className="text-text-muted font-light leading-relaxed">
              Every time you leave Aura Wellness, you take more than relaxation with you. You leave with a feeling of care, trust and renewal.
            </p>
          </div>
        </SectionReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((p, i) => (
            <SectionReveal key={p.title} delay={i * 80}>
              <div className="rounded-3xl p-6 h-full flex flex-col gap-4 bg-white shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
                style={{ borderTop: `3px solid ${p.accent}` }}>
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${p.accent}12` }}>
                  <span style={{ color: p.accent }}>{p.icon}</span>
                </div>
                <h3 className="font-serif text-xl text-text-dark">{p.title}</h3>
                <p className="text-sm text-text-muted font-light leading-relaxed">{p.desc}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function BrandExperience() {
  return (
    <section className="section-padding relative overflow-hidden"
      style={{ background: 'linear-gradient(145deg, #2E0A38 0%, #6B1050 28%, #A41162 58%, #953D7F 80%, #c468a0 100%)' }}>

      <WaveTop color="#ffffff" height={52} />

      <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)', transform: 'translate(30%,0)' }} />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(241,98,237,0.12) 0%, transparent 70%)', transform: 'translate(0, 30%)' }} />
      <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none select-none hidden lg:block"
        style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 320, lineHeight: 1, color: 'rgba(255,255,255,0.04)', userSelect: 'none' }}>
        A
      </div>

      <div className="container-wide relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <SectionReveal>
            <div className="flex flex-col gap-6">
              <div className="section-label" style={{ color: 'rgba(251,229,250,0.65)' }}>
                <span className="w-6 h-px bg-white/40 inline-block" />
                More than a treatment
              </div>
              <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight text-balance">
                A moment of genuine{' '}
                <em className="not-italic" style={{ color: '#F4A8DA' }}>care</em>
              </h2>
              <p className="text-white/75 font-light leading-relaxed text-lg">
                At Aura Wellness, it is not just about the treatment — it is about how you feel afterwards. Rest, attention and quality come together here.
              </p>
              <p className="text-white/65 font-light leading-relaxed">
                In our intimate studio in the heart of Dubai Marina, you are allowed to do nothing at all. No rushed appointments, no crowds — just you and the care you deserve.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                {['Intimate studio', 'One-on-one care', 'SPA Partner'].map(t => (
                  <span key={t} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/12 border border-white/20 text-xs text-white/80">
                    <CheckCircle2 size={11} className="text-white/60" />{t}
                  </span>
                ))}
              </div>
              <Link to="/about"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-brand-primary font-medium text-sm tracking-wide self-start transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                About Aura Wellness <ArrowRight size={15} />
              </Link>
            </div>
          </SectionReveal>
          <SectionReveal delay={150}>
            <div className="relative">
              <div className="absolute -inset-6 rounded-[2.5rem] pointer-events-none"
                style={{ background: 'radial-gradient(ellipse, rgba(255,255,255,0.08) 0%, transparent 70%)' }} />
              <div className="relative rounded-[2rem] overflow-hidden shadow-card-hover">
                <img src={heroImg1} alt="Treatment at Aura Wellness"
                  className="w-full h-[480px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2E0A38]/40 to-transparent pointer-events-none" />
              </div>
              <div className="absolute -bottom-4 -left-4 rounded-2xl px-5 py-3.5 shadow-soft-lg"
                style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.25)' }}>
                <div className="flex gap-0.5 mb-1">
                  {Array(5).fill(0).map((_, i) => <Star key={i} size={12} className="fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-sm font-medium text-white">66 happy clients</p>
                <p className="text-xs text-white/70">Rated excellent on Google</p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>

      <WaveBottom color="#ffffff" height={52} />
    </section>
  )
}

const treatmentGrid = [
  {
    id: 'fysiotherapie', title: 'Physiotherapy',
    desc: 'Body wrap · 2 treatments', image: imgFysioCard,
    col: '1 / 2', row: '1 / 4', to: '/treatments?categorie=fysiotherapie',
  },
  {
    id: 'peeling', title: 'Peeling',
    desc: 'Professional peelings · 3 treatments', image: imgPeelingCard,
    col: '1 / 2', row: '4 / 7', to: '/treatments?categorie=peeling',
  },
  {
    id: 'cupping', title: 'Cupping',
    desc: 'Dry cupping, fire cupping & hijama · 12 treatments', image: imgCuppingCard,
    col: '2 / 4', row: '1 / 3', to: '/treatments?categorie=cupping',
  },
  {
    id: 'gelaat', title: 'Facial Treatments',
    desc: 'HydraFacial, CoolLifting, microneedling & more · 21 treatments', image: imgGelaatCard,
    col: '2 / 4', row: '3 / 5', to: '/treatments?categorie=gelaat',
  },
  {
    id: 'massage', title: 'Massage',
    desc: 'Hot stone, holistic massage, pregnancy & more · 29 treatments', image: imgMassageCard,
    col: '2 / 4', row: '5 / 7', to: '/treatments?categorie=massage',
  },
  {
    id: 'plasma', title: 'Plasma Lifting',
    desc: 'Non-invasive · 7 treatments', image: imgPlasmaCard,
    col: '4 / 5', row: '1 / 4', to: '/treatments?categorie=plasma',
  },
  {
    id: 'huidscan', title: 'Skin Analysis',
    desc: 'Personalised skin assessment · 1 treatment', image: imgHuidscanCard,
    col: '4 / 5', row: '4 / 7', to: '/treatments?categorie=huidscan',
  },
]

function FeaturedTreatments() {
  return (
    <section className="section-padding relative overflow-hidden bg-white">
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <span style={{
          fontFamily: 'Cormorant Garamond, Georgia, serif',
          fontSize: 'clamp(300px, 40vw, 520px)',
          lineHeight: 1,
          color: 'rgba(164,17,98,0.025)',
          userSelect: 'none',
        }}>A</span>
      </div>

      <div className="container-wide relative z-10">
        <SectionReveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <div className="section-label">
                <span className="w-6 h-px bg-brand-primary/50 inline-block" />
                Our treatments
              </div>
              <h2 className="heading-md">A treatment for every body</h2>
            </div>
            <Link to="/treatments" className="btn-ghost text-sm">
              All treatments <ChevronRight size={15} />
            </Link>
          </div>
        </SectionReveal>

        <div className="hidden md:grid gap-3"
          style={{
            gridTemplateColumns: '1fr 2fr 2fr 1fr',
            gridTemplateRows: 'repeat(6, 85px)',
          }}>
          {treatmentGrid.map(item => (
            <Link
              key={item.id}
              to={item.to}
              className="relative overflow-hidden rounded-2xl group block"
              style={{ gridColumn: item.col, gridRow: item.row }}>
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(15,3,20,0.88) 0%, rgba(15,3,20,0.35) 55%, transparent 100%)' }} />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-serif text-white leading-tight"
                  style={{ fontSize: item.col === '2 / 4' ? '1.2rem' : '1.05rem' }}>
                  {item.title}
                </h3>
                <p className="text-white/65 text-xs mt-0.5 line-clamp-1">{item.desc}</p>
              </div>
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center
                              border border-white/25 bg-black/20 backdrop-blur-sm
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowRight size={13} className="text-white" />
              </div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:hidden">
          {treatmentGrid.map(item => (
            <Link
              key={item.id}
              to={item.to}
              className="relative overflow-hidden rounded-2xl group block h-52 sm:h-56">
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(15,3,20,0.85) 0%, rgba(15,3,20,0.3) 55%, transparent 100%)' }} />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-serif text-white text-lg leading-tight">{item.title}</h3>
                <p className="text-white/65 text-xs mt-0.5">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function SPASection() {
  return (
    <section className="section-padding relative overflow-hidden bg-white">
      <div className="absolute top-0 right-0 pointer-events-none" style={{ width: 450, height: 450 }}>
        <svg viewBox="0 0 450 450" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
          <circle cx="380" cy="70" r="240" fill="rgba(249,232,243,0.35)" />
          <circle cx="380" cy="70" r="160" fill="rgba(237,216,232,0.25)" />
          <circle cx="380" cy="70" r="90" fill="rgba(212,168,199,0.15)" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 pointer-events-none" style={{ width: 240, height: 240 }}>
        <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
          <circle cx="0" cy="240" r="160" fill="rgba(249,232,243,0.25)" />
        </svg>
      </div>

      <div className="container-wide relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <SectionReveal>
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2.5rem] blur-2xl pointer-events-none"
                style={{ background: 'linear-gradient(135deg, rgba(249,232,243,0.6), rgba(237,216,232,0.4))' }} />
              <div className="relative rounded-[2rem] overflow-hidden shadow-card-hover aspect-[4/3]">
                <img src={spaBanner} alt="SPA Skincare" className="w-full h-full object-cover"
                  style={{ objectPosition: 'left center' }}
                  onError={e => { e.target.src = spaSkincare }} />
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(135deg, rgba(164,17,98,0.06), transparent)' }} />
              </div>
              <div className="absolute -bottom-5 -right-5 w-36 h-36 rounded-2xl overflow-hidden shadow-soft-lg border-2 border-white">
                <img src={spaSkincare} alt="SPA detail" className="w-full h-full object-cover"
                  onError={e => { e.target.src = spaMixed }} />
              </div>
              <div className="absolute -top-4 -left-4 glass rounded-2xl px-4 py-3 shadow-soft-lg flex items-center gap-2.5">
                <img src={spaLogo} alt="SPA" className="h-7 w-auto object-contain"
                  style={{ filter: 'invert(15%) sepia(80%) saturate(2500%) hue-rotate(290deg) brightness(70%)' }}
                  onError={e => { e.target.style.display = 'none' }} />
                <span className="text-xs font-medium text-text-muted">Certified Partner</span>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={120}>
            <div className="flex flex-col gap-6">
              <div>
                <img src={spaLogo} alt="SPA" className="h-12 w-auto object-contain mb-4"
                  style={{ filter: 'invert(15%) sepia(80%) saturate(2500%) hue-rotate(290deg) brightness(70%)' }}
                  onError={e => { e.target.style.display = 'none' }} />
                <div className="section-label">
                  <span className="w-6 h-px bg-brand-primary/50 inline-block" />
                  SPA Skincare
                </div>
              </div>
              <h2 className="heading-md">
                Natural{' '}
                <em className="gradient-text not-italic">skin enhancement</em>
              </h2>
              <p className="text-xl font-serif text-text-muted font-light leading-snug">
                For everyone. The optimal aftercare!
              </p>
              <p className="text-text-muted font-light leading-relaxed">
                As a certified SPA partner, we offer professional skincare products that optimally support your treatment. Pure, natural ingredients for visible results — continuing the care you begin here, at home.
              </p>
              <div className="flex flex-col gap-3">
                {['Professional SPA skincare', 'Natural and pure ingredients', 'Ideal aftercare following your treatment', 'Personalised advice'].map(item => (
                  <div key={item} className="flex items-center gap-2.5">
                    <CheckCircle2 size={15} className="text-brand-primary flex-shrink-0" />
                    <span className="text-sm text-text-muted font-light">{item}</span>
                  </div>
                ))}
              </div>
              <div className="pt-2 flex flex-wrap gap-4">
                <a href="tel:+97144507788" className="btn-primary">
                  <Phone size={15} /> Ask about our products
                </a>
                <Link to="/contact" className="btn-secondary">
                  More information <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="section-padding relative overflow-hidden bg-white">
      <div className="absolute top-0 left-0 w-96 h-64 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 0% 0%, rgba(249,232,243,0.6) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 right-0 w-96 h-64 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 100% 100%, rgba(237,216,232,0.5) 0%, transparent 70%)' }} />

      <div className="container-narrow text-center relative z-10">
        <SectionReveal>
          <div className="rounded-[2.5rem] overflow-hidden relative"
            style={{ background: 'linear-gradient(135deg, #A41162 0%, #953D7F 60%, #c058a0 100%)' }}>
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/3 pointer-events-none" />
            <div className="relative z-10 px-8 py-16 md:py-20">
              <div className="flex items-center justify-center gap-1 mb-6">
                {Array(5).fill(0).map((_, i) => <Star key={i} size={16} className="fill-white/80 text-white/80" />)}
              </div>
              <h2 className="font-serif text-4xl md:text-5xl text-white mb-5 text-balance">
                Give yourself a moment of rest.
              </h2>
              <p className="text-white/75 font-light text-lg mb-10 max-w-md mx-auto">
                Book your appointment at a time that suits you. Ready to put yourself first?
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-brand-primary font-medium text-base transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                  <CalendarCheck size={17} /> Book an Appointment
                </Link>
                <Link to="/treatments"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/40 text-white font-medium text-base transition-all duration-300 hover:bg-white/10">
                  View treatments <ArrowRight size={15} />
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
                <a href="tel:+97144507788" className="flex items-center gap-2 text-white/70 text-sm hover:text-white transition-colors">
                  <Phone size={14} /> +971 4 450 7788
                </a>
                <span className="text-white/30">·</span>
                <span className="text-white/70 text-sm">Marina Walk, Unit 7, Dubai Marina</span>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedTreatments />
      <ReviewsSection />
      <WhyAura />
      <BrandExperience />
      <SPASection />
      <CTASection />
    </>
  )
}
