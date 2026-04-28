export const defaultSiteConfig = {
  branding: {
    businessName: 'Aura Wellness',
    tagline: 'Beauty & Wellness Sanctuary',
    logo: '/Afbeeldingen/C-cure Logo.svg',
    logoDark: '/Afbeeldingen/C-cure Logo Zwarte achtergrond.svg',
    favicon: '/Afbeeldingen/Diensten/cropped-favicon-180x180.png',
    colors: {
      primary: '#A41162',
      secondary: '#953D7F',
      accent: '#F162ED',
    },
    fonts: {
      heading: 'Cormorant Garamond',
      body: 'DM Sans',
    },
  },

  contact: {
    phone: '+971 4 450 7788',
    phoneRaw: '+97144507788',
    email: 'hello@aurawellness.ae',
    address: 'Marina Walk, Unit 7',
    city: 'Dubai Marina, Dubai',
    postalCode: '',
    country: 'AE',
    geo: { lat: 25.0804, lng: 55.1403 },
  },

  hours: {
    monday:    { open: '10:00', close: '20:00', closed: false },
    tuesday:   { open: '10:00', close: '20:00', closed: false },
    wednesday: { open: '10:00', close: '20:00', closed: false },
    thursday:  { open: '10:00', close: '20:00', closed: false },
    friday:    { open: '10:00', close: '14:00', closed: false },
    saturday:  { open: '10:00', close: '18:00', closed: false },
    sunday:    { open: '10:00', close: '18:00', closed: false },
  },

  social: {
    facebook:  '#',
    instagram: '#',
    whatsapp:  '',
  },

  booking: {
    externalUrl: '/contact',
    useInternalBooking: false,
    slotDurationBuffer: 15,
    advanceBookingDays: 60,
    minNoticeHours: 2,
  },

  seo: {
    siteUrl: 'https://www.aurawellness.ae',
    defaultTitle: 'Aura Wellness Dubai | Beauty & Wellness Sanctuary',
    defaultDescription: 'Aura Wellness in Dubai Marina — professional cupping, massage, facial treatments, peeling and plasma lifting. Book your appointment today.',
    ogImage: 'https://www.aurawellness.ae/Afbeeldingen/Hero/facescan-c-cure.webp',
  },

  content: {
    hero: {
      headline: 'Your body\ndeserves rest.',
      subline: 'Professional treatments in a calming environment — with genuine care for your wellbeing, comfort and recovery.',
      ctaLabel: 'Book an Appointment',
      ctaSecondaryLabel: 'View Treatments',
    },
    about: {
      title: 'About Aura Wellness',
      intro: 'Welcome to Aura Wellness, your sanctuary in the heart of Dubai Marina.',
      body: 'With expert therapists specialising in cupping, massage and advanced skincare, Aura Wellness delivers personalised treatments with warmth and professionalism.',
    },
    footer: {
      tagline: 'Your moment of rest & recovery in Dubai Marina.',
    },
  },

  reviews: {
    count: 66,
    score: '5.0',
    scoreNumeric: 5.0,
    googleUrl: '#',
    label: 'Google reviews',
  },

  admin: {
    email: 'admin@aurawellness.ae',
    passwordHash: 'aura2024',
  },
}
