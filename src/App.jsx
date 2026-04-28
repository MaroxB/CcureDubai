import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { error: null } }
  static getDerivedStateFromError(error) { return { error } }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 32, fontFamily: 'monospace', background: '#fff0f0', minHeight: '100vh' }}>
          <h2 style={{ color: '#c00' }}>Render Error</h2>
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', color: '#333', fontSize: 13 }}>
            {this.state.error?.message}\n\n{this.state.error?.stack}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}
import { AdminProvider } from './context/AdminContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingCTA from './components/FloatingCTA'
import Home from './pages/Home'
import Behandelingen from './pages/Behandelingen'
import OverCCure from './pages/OverCCure'
import Contact from './pages/Contact'
import AdminApp from './admin/AdminApp'
import BookingPage from './booking/BookingPage'

const pageMeta = {
  '/': {
    title: 'Aura Wellness Dubai | Beauty & Wellness Sanctuary',
    description: 'Aura Wellness in Dubai Marina — professional cupping, massage, facial treatments, peeling and plasma lifting. Book your appointment today.',
  },
  '/treatments': {
    title: 'Treatments | Aura Wellness Dubai — Cupping, Massage, Facials',
    description: 'Explore all treatments at Aura Wellness Dubai: cupping, hijama, massage, HydraFacial, dermaplaning, plasma lifting, peeling and more.',
  },
  '/about': {
    title: 'About Us | Aura Wellness Dubai',
    description: 'Discover the story behind Aura Wellness Dubai. Expert therapists offering personalised wellness and beauty treatments in the heart of Dubai Marina.',
  },
  '/contact': {
    title: 'Contact | Aura Wellness Dubai — Appointments & Opening Hours',
    description: 'Get in touch with Aura Wellness Dubai. Call +971 4 450 7788, email hello@aurawellness.ae or visit us at Marina Walk, Dubai Marina.',
  },
  '/boek': {
    title: 'Book an Appointment | Aura Wellness Dubai',
    description: 'Book your treatment at Aura Wellness Dubai. Choose your service, date and time.',
  },
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    const meta = pageMeta[pathname] || pageMeta['/']
    document.title = meta.title
    const descEl = document.querySelector('meta[name="description"]')
    if (descEl) descEl.setAttribute('content', meta.description)
  }, [pathname])
  return null
}

function PublicLayout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/treatments" element={<Behandelingen />} />
          <Route path="/about" element={<OverCCure />} />
          <Route path="/contact" element={<Contact />} />
          {/* Fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
    <AdminProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/admin/*" element={<ErrorBoundary><AdminApp /></ErrorBoundary>} />
          <Route path="/boek" element={<BookingPage />} />
          <Route path="/*" element={<PublicLayout />} />
        </Routes>
      </BrowserRouter>
    </AdminProvider>
    </ErrorBoundary>
  )
}
