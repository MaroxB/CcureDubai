import { CalendarCheck } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function FloatingCTA() {
  return (
    <Link
      to="/contact"
      className="fixed bottom-6 right-5 z-50 flex items-center gap-3.5 px-8 py-5 rounded-full bg-gradient-cta text-white font-semibold text-base shadow-[0_8px_32px_rgba(164,17,98,0.40)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(164,17,98,0.50)] group"
      aria-label="Book an Appointment"
    >
      <CalendarCheck size={20} className="flex-shrink-0" />
      <span>Book an Appointment</span>
    </Link>
  )
}
