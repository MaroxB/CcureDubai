import { Star } from 'lucide-react'

// Google-style colored avatar backgrounds (per reviewer)
const avatarPalette = [
  '#4285F4', // Google blue
  '#EA4335', // Google red
  '#34A853', // Google green
  '#FBBC05', // Google yellow → use darker text
  '#9C27B0', // purple
  '#FF6D00', // orange
  '#00897B', // teal
  '#C2185B', // pink
]

export default function ReviewCard({ name, initials, avatarColor, text, date, stars = 5, index = 0 }) {
  const bgColor = avatarColor || avatarPalette[index % avatarPalette.length]
  const isYellow = bgColor === '#FBBC05'

  return (
    <div className="bg-white rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.10)] flex flex-col gap-4 select-none h-full">
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold"
            style={{ backgroundColor: bgColor, color: isYellow ? '#5F4800' : '#fff' }}
          >
            {initials}
          </div>
          {/* Name + meta */}
          <div>
            <p className="text-sm font-semibold text-[#202124] leading-tight">{name}</p>
            <p className="text-xs text-[#70757A] mt-0.5">Google review</p>
          </div>
        </div>
        {/* Google logo */}
        <svg width="18" height="18" viewBox="0 0 24 24" className="flex-shrink-0 mt-0.5 opacity-80">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
      </div>

      {/* Stars + date */}
      <div className="flex items-center gap-2">
        <div className="flex gap-0.5">
          {Array(stars).fill(0).map((_, i) => (
            <Star key={i} size={14} className="fill-[#FBBC05] text-[#FBBC05]" />
          ))}
        </div>
        <span className="text-xs text-[#70757A]">{date}</span>
      </div>

      {/* Review text */}
      <p className="text-sm text-[#3C4043] leading-relaxed font-normal flex-1">
        {text}
      </p>
    </div>
  )
}
