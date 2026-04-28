import { createContext, useContext, useCallback } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { defaultSiteConfig } from '../config/siteConfig'
import { defaultServices } from '../data/services'

const AdminContext = createContext(null)

export function AdminProvider({ children }) {
  // ─── AUTH ─────────────────────────────────────────────────────────────────
  // currentUser: null | { role: 'admin', email } | { role: 'specialist', id, name, email }
  const [currentUser, setCurrentUser] = useLocalStorage('admin_session', null)
  const [authError, setAuthError] = useLocalStorage('admin_auth_error', '')
  const isAuthenticated = !!currentUser
  const isAdmin = currentUser?.role === 'admin'
  const isSpecialist = currentUser?.role === 'specialist'

  // ─── SITE CONFIG ──────────────────────────────────────────────────────────
  const [_siteConfig, setSiteConfig] = useLocalStorage('siteConfig', defaultSiteConfig)
  const siteConfig = (_siteConfig && typeof _siteConfig === 'object') ? _siteConfig : defaultSiteConfig

  // ─── SPECIALISTS ──────────────────────────────────────────────────────────
  const [_specialists, setSpecialists] = useLocalStorage('specialists', [])
  const specialists = Array.isArray(_specialists) ? _specialists : []

  // ─── SERVICES ─────────────────────────────────────────────────────────────
  const [_services, setServices] = useLocalStorage('services', defaultServices)
  const services = Array.isArray(_services) ? _services : defaultServices

  // ─── BOOKINGS ─────────────────────────────────────────────────────────────
  const [_bookings, setBookings] = useLocalStorage('bookings', [])
  const bookings = Array.isArray(_bookings) ? _bookings : []

  // ─── GALLERY ──────────────────────────────────────────────────────────────
  const [_gallery, setGallery] = useLocalStorage('gallery', [])
  const gallery = Array.isArray(_gallery) ? _gallery : []

  // ─── AUTH FUNCTIONS ───────────────────────────────────────────────────────
  const login = useCallback((email, password) => {
    const adminCfg = siteConfig?.admin || defaultSiteConfig.admin
    if (email === adminCfg.email && password === adminCfg.passwordHash) {
      setCurrentUser({ role: 'admin', email })
      setAuthError('')
      return true
    }
    const specialist = specialists.find(
      s => s.email === email && s.password === password && s.isActive !== false
    )
    if (specialist) {
      setCurrentUser({ role: 'specialist', id: specialist.id, name: specialist.name, email: specialist.email })
      setAuthError('')
      return true
    }
    setAuthError('Onjuist e-mailadres of wachtwoord.')
    return false
  }, [siteConfig, specialists, setCurrentUser, setAuthError])

  const logout = useCallback(() => {
    setCurrentUser(null)
  }, [setCurrentUser])

  // ─── SPECIALIST CRUD ──────────────────────────────────────────────────────
  const addSpecialist = useCallback((data) => {
    const id = `specialist-${Date.now()}`
    const specialist = {
      id,
      name: data.name,
      email: data.email,
      password: data.password,
      color: data.color || '#A41162',
      speciality: data.speciality || '',
      isActive: true,
      hours: data.hours || defaultSiteConfig.hours,
      blockedDates: [],
      createdAt: new Date().toISOString(),
    }
    setSpecialists(prev => [...prev, specialist])
    return specialist
  }, [setSpecialists])

  const updateSpecialist = useCallback((id, updates) => {
    setSpecialists(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s))
    // Keep currentUser in sync if updating self
    if (currentUser?.id === id && updates.name) {
      setCurrentUser(prev => ({ ...prev, name: updates.name }))
    }
  }, [setSpecialists, currentUser, setCurrentUser])

  const deleteSpecialist = useCallback((id) => {
    setSpecialists(prev => prev.filter(s => s.id !== id))
  }, [setSpecialists])

  // ─── SERVICES CRUD ────────────────────────────────────────────────────────
  const addService = useCallback((service) => {
    const id = `custom-${Date.now()}`
    setServices(prev => [...prev, { ...service, id, isActive: true }])
  }, [setServices])

  const updateService = useCallback((id, updates) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s))
  }, [setServices])

  const deleteService = useCallback((id) => {
    setServices(prev => prev.filter(s => s.id !== id))
  }, [setServices])

  const reorderServices = useCallback((category, orderedIds) => {
    setServices(prev => prev.map(s => {
      if (s.category !== category) return s
      const idx = orderedIds.indexOf(s.id)
      return idx >= 0 ? { ...s, order: idx + 1 } : s
    }))
  }, [setServices])

  const resetServices = useCallback(() => setServices(defaultServices), [setServices])

  // ─── BOOKINGS CRUD ────────────────────────────────────────────────────────
  const addBooking = useCallback((booking) => {
    const id = `booking-${Date.now()}`
    const newBooking = {
      ...booking,
      id,
      status: 'pending',
      createdAt: new Date().toISOString(),
      // Tag with specialist if logged in as one
      specialistId: booking.specialistId || (isSpecialist ? currentUser?.id : null),
    }
    setBookings(prev => [...prev, newBooking])
    return newBooking
  }, [setBookings, isSpecialist, currentUser])

  const updateBooking = useCallback((id, updates) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b))
  }, [setBookings])

  const deleteBooking = useCallback((id) => {
    setBookings(prev => prev.filter(b => b.id !== id))
  }, [setBookings])

  // ─── GALLERY CRUD ─────────────────────────────────────────────────────────
  const addGalleryItem = useCallback((item) => {
    const id = `gallery-${Date.now()}`
    setGallery(prev => [...prev, { ...item, id, createdAt: new Date().toISOString() }])
  }, [setGallery])

  const deleteGalleryItem = useCallback((id) => {
    setGallery(prev => prev.filter(g => g.id !== id))
  }, [setGallery])

  const updateGalleryItem = useCallback((id, updates) => {
    setGallery(prev => prev.map(g => g.id === id ? { ...g, ...updates } : g))
  }, [setGallery])

  // ─── SITE CONFIG ──────────────────────────────────────────────────────────
  const updateSiteConfig = useCallback((path, value) => {
    setSiteConfig(prev => {
      const next = JSON.parse(JSON.stringify(prev))
      const keys = path.split('.')
      let cur = next
      for (let i = 0; i < keys.length - 1; i++) {
        if (!cur[keys[i]]) cur[keys[i]] = {}
        cur = cur[keys[i]]
      }
      cur[keys[keys.length - 1]] = value
      return next
    })
  }, [setSiteConfig])

  const resetSiteConfig = useCallback(() => setSiteConfig(defaultSiteConfig), [setSiteConfig])

  // ─── STATS ────────────────────────────────────────────────────────────────
  // For specialist: only their own bookings
  const myBookings = isSpecialist
    ? bookings.filter(b => b.specialistId === currentUser?.id)
    : bookings

  const stats = {
    totalBookings: myBookings.length,
    pendingBookings: myBookings.filter(b => b.status === 'pending').length,
    confirmedBookings: myBookings.filter(b => b.status === 'confirmed').length,
    cancelledBookings: myBookings.filter(b => b.status === 'cancelled').length,
    totalRevenue: myBookings
      .filter(b => b.status === 'confirmed')
      .reduce((sum, b) => sum + (b.servicePrice || 0), 0),
    totalServices: services.filter(s => s.isActive).length,
    galleryItems: gallery.length,
    totalSpecialists: specialists.filter(s => s.isActive !== false).length,
  }

  return (
    <AdminContext.Provider value={{
      // auth
      isAuthenticated, isAdmin, isSpecialist, currentUser, authError,
      login, logout,
      // specialists
      specialists, addSpecialist, updateSpecialist, deleteSpecialist,
      // site config
      siteConfig, updateSiteConfig, resetSiteConfig,
      // services
      services, addService, updateService, deleteService, reorderServices, resetServices,
      // bookings (all for admin, own for specialist)
      bookings: myBookings,
      allBookings: bookings,
      addBooking, updateBooking, deleteBooking,
      // gallery
      gallery, addGalleryItem, deleteGalleryItem, updateGalleryItem,
      // stats
      stats,
    }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const ctx = useContext(AdminContext)
  if (!ctx) throw new Error('useAdmin must be used inside AdminProvider')
  return ctx
}
