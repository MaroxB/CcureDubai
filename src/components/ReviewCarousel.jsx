import ReviewCard from './ReviewCard'

const reviews = [
  {
    name: 'Sarah M.',
    initials: 'SM',
    avatarColor: '#4285F4',
    date: 'January 2026',
    stars: 5,
    text: 'Incredible experience at Aura Wellness! The HydraFacial treatment was thorough and deeply relaxing. The therapist explained every step with care. My skin has never looked better — absolutely coming back.',
  },
  {
    name: 'Layla K.',
    initials: 'LK',
    avatarColor: '#EA4335',
    date: 'January 2026',
    stars: 5,
    text: 'I had the hot stone massage and it was simply divine. The atmosphere is so calming and the team is incredibly professional. A true sanctuary in the heart of Dubai Marina.',
  },
  {
    name: 'Priya R.',
    initials: 'PR',
    avatarColor: '#34A853',
    date: 'October 2025',
    stars: 5,
    text: 'Tried cupping for the first time and was amazed by the results. The therapist has a wonderful technique and the studio is spotless. Highly recommend to anyone looking for genuine wellness treatments.',
  },
  {
    name: 'Amira S.',
    initials: 'AS',
    avatarColor: '#FF6D00',
    date: 'March 2025',
    stars: 5,
    text: 'From the moment I walked in, I felt completely at ease. The plasma lifting treatment was explained thoroughly and the results are already visible. This is hands down the best wellness studio in Dubai.',
  },
  {
    name: 'Jessica T.',
    initials: 'JT',
    avatarColor: '#9C27B0',
    date: 'February 2025',
    stars: 5,
    text: 'I have been coming to Aura Wellness for over a year and every visit is exceptional. The staff genuinely care about your wellbeing. The full-body massage with cupping is my favourite ritual.',
  },
  {
    name: 'Nadia H.',
    initials: 'NH',
    avatarColor: '#00897B',
    date: 'March 2024',
    stars: 5,
    text: 'A truly luxurious experience in a beautifully designed space. The dermaplaning facial left my skin glowing for weeks. The attention to detail and personalised care here is unmatched. Five stars without hesitation.',
  },
  {
    name: 'Fatima A.',
    initials: 'FA',
    avatarColor: '#C2185B',
    date: 'January 2024',
    stars: 5,
    text: 'My second visit for wet cupping therapy and once again I walked out feeling completely renewed. The therapist is gentle, precise and takes the time to truly understand your needs. Magic hands!',
  },
  {
    name: 'Elena V.',
    initials: 'EV',
    avatarColor: '#FBBC05',
    date: 'March 2023',
    stars: 5,
    text: 'A hidden gem in Dubai Marina! I came for the body wrap and left a completely different person — lighter, tighter and totally relaxed. The whole experience from booking to aftercare was absolutely flawless.',
  },
]

const doubled = [...reviews, ...reviews]

export default function ReviewCarousel() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #FAF7F5 0%, transparent 100%)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #FAF7F5 0%, transparent 100%)' }} />

      <div className="flex gap-5 pb-2" style={{ animation: 'marquee 42s linear infinite' }}
        onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'paused'}
        onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'running'}
      >
        {doubled.map((review, i) => (
          <div key={i} className="flex-shrink-0 w-80">
            <ReviewCard {...review} index={i % reviews.length} />
          </div>
        ))}
      </div>
    </div>
  )
}
