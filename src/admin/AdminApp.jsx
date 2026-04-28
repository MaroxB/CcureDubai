import { Navigate, Outlet, Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAdmin } from '../context/AdminContext'
import AdminLogin from './AdminLogin'
import AdminLayout from './components/AdminLayout'
import Dashboard from './pages/Dashboard'
import ServicesManager from './pages/ServicesManager'
import BookingsManager from './pages/BookingsManager'
import AvailabilityManager from './pages/AvailabilityManager'
import GalleryManager from './pages/GalleryManager'
import SettingsPage from './pages/SettingsPage'
import SpecialistsManager from './pages/SpecialistsManager'

/** Renders children when authenticated, otherwise back to login. */
function RequireAuth() {
  const { isAuthenticated } = useAdmin()
  return isAuthenticated ? <Outlet /> : <Navigate to="/admin" replace />
}

/** Main admin only — redirects specialists to their dashboard. */
function RequireAdmin() {
  const { isAdmin } = useAdmin()
  return isAdmin ? <Outlet /> : <Navigate to="/admin/dashboard" replace />
}

/** Auto-redirect to dashboard when already logged in. */
function LoginGate() {
  const { isAuthenticated } = useAdmin()
  const navigate = useNavigate()
  useEffect(() => {
    if (isAuthenticated) navigate('/admin/dashboard', { replace: true })
  }, [isAuthenticated, navigate])
  return <AdminLogin />
}

export default function AdminApp() {
  return (
    <Routes>
      {/* Login at /admin */}
      <Route index element={<LoginGate />} />

      {/* All dashboard routes require authentication */}
      <Route element={<RequireAuth />}>
        <Route element={<AdminLayout />}>
          <Route path="dashboard"       element={<Dashboard />} />
          <Route path="boekingen"       element={<BookingsManager />} />
          <Route path="beschikbaarheid" element={<AvailabilityManager />} />

          {/* Admin-only routes */}
          <Route element={<RequireAdmin />}>
            <Route path="specialisten"   element={<SpecialistsManager />} />
            <Route path="diensten"       element={<ServicesManager />} />
            <Route path="galerij"        element={<GalleryManager />} />
            <Route path="instellingen"   element={<SettingsPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        </Route>
      </Route>
    </Routes>
  )
}
