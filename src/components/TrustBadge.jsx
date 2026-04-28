import { Star } from 'lucide-react'

export default function TrustBadge({ variant = 'default', className = '' }) {
  const stars = Array(5).fill(0)

  if (variant === 'pill') {
    return (
      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass shadow-soft ${className}`}>
        <div className="flex gap-0.5">
          {stars.map((_, i) => (
            <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
          ))}
        </div>
        <span className="text-xs font-medium text-text-dark">5.0</span>
        <span className="text-xs text-text-muted">· 66 Google reviews</span>
      </div>
    )
  }

  if (variant === 'card') {
    return (
      <div className={`inline-flex flex-col items-center gap-1 px-5 py-3 rounded-2xl glass shadow-soft ${className}`}>
        <div className="flex gap-0.5">
          {stars.map((_, i) => (
            <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
          ))}
        </div>
        <span className="text-sm font-semibold text-text-dark">5.0 stars</span>
        <span className="text-xs text-text-muted">66 Google reviews</span>
      </div>
    )
  }

  if (variant === 'inline') {
    return (
      <span className={`inline-flex items-center gap-1.5 text-sm text-text-muted ${className}`}>
        <div className="flex gap-0.5">
          {stars.map((_, i) => (
            <Star key={i} size={11} className="fill-amber-400 text-amber-400" />
          ))}
        </div>
        <span className="font-medium text-text-dark">5.0</span> · 66 reviews
      </span>
    )
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex gap-1">
        {stars.map((_, i) => (
          <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
        ))}
      </div>
      <div>
        <p className="text-sm font-semibold text-text-dark leading-tight">5.0 stars</p>
        <p className="text-xs text-text-muted leading-tight">66 Google reviews</p>
      </div>
    </div>
  )
}
