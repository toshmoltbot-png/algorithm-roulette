# Algorithm Roulette — Technical Plan

## Architecture

### Frontend (Next.js 14 App Router)
```
app/
├── layout.tsx          # Root layout, dark theme, fonts, metadata
├── page.tsx            # Landing page — roulette wheel
├── feed/
│   └── [category]/
│       └── page.tsx    # Vertical swipe feed
├── about/
│   └── page.tsx        # Explainer
├── globals.css         # Tailwind + custom styles
└── components/
    ├── RouletteWheel.tsx    # Canvas/SVG wheel with spin physics
    ├── SpinButton.tsx       # Big "SPIN" CTA
    ├── VideoFeed.tsx        # Vertical swipe container
    ├── VideoCard.tsx        # Individual video embed (TikTok/YouTube)
    ├── AdPlaceholder.tsx    # Placeholder for future ads
    ├── ShareButton.tsx      # "I survived the X algorithm" share
    ├── CategoryPill.tsx     # Category label/badge
    └── ModeSelector.tsx     # Toggle: Roulette vs Targeted mode
```

### Database (Firebase Firestore)
```
Collection: videos
Document: {
  id: string (auto)
  url: string (TikTok/YouTube embed URL)
  platform: "tiktok" | "youtube"
  category: string (e.g. "far-right", "flat-earth")
  title: string (optional description)
  creator: string (source account)
  addedAt: timestamp
  active: boolean
}

Collection: categories
Document: {
  id: string (slug)
  name: string (display name)
  color: string (hex — neon accent)
  icon: string (emoji)
  videoCount: number
  description: string
}
```

### Key Technical Decisions
1. **Embed strategy**: Use TikTok's `<blockquote>` embed + YouTube `<iframe>` embed. Lazy-load off-screen videos.
2. **Swipe physics**: Framer Motion `drag` with `dragConstraints` for vertical swipe. Snap to next video on release.
3. **Roulette wheel**: HTML5 Canvas with easing function (cubic-out deceleration). Pre-determine result, animate to it.
4. **Video preloading**: Load current + next 2 videos. Destroy videos 2+ positions behind.
5. **No SSR for feed**: Client-side only for video embeds (embed scripts need DOM).
6. **Sound**: Optional click/tick sound during wheel spin (Web Audio API, user-initiated).

### Deployment
- Vercel (auto-deploy from GitHub)
- Environment: `NEXT_PUBLIC_FIREBASE_*` config vars
- Domain: TBD (can use Vercel subdomain for MVP)

### Seed Data
- 5 categories × 100 video URLs = 500 entries
- For MVP: seed with 20 real videos per category (100 total) to prove the UX
- Seed script: `scripts/seed-videos.ts` — reads from `data/seed-videos.json`, writes to Firestore

### Analytics Events (PostHog)
- `wheel_spin` — category result, mode (roulette/targeted)
- `video_view` — category, position in feed, platform
- `video_skip` — swipe away < 3 seconds
- `share_click` — category, swipe count
- `session_depth` — total videos viewed per session

### Performance Targets
- Landing page: < 1.5s LCP
- First video playing: < 3s from spin
- Smooth 60fps swipe animations
