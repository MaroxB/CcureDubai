import spaLogo from '/Afbeeldingen/spa logo.png'

export default function SPABadge({ className = '' }) {
  return (
    <div className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass shadow-soft ${className}`}>
      <img
        src={spaLogo}
        alt="SPA"
        className="h-5 w-auto object-contain opacity-90"
        onError={(e) => { e.target.style.display = 'none' }}
      />
      <span className="text-xs font-medium text-text-muted tracking-wide">SPA Certified Partner</span>
    </div>
  )
}
