# Algorithm Roulette — Engineering Tasks

## Phase 1: Project Setup
- [x] Create Next.js 14 app with App Router (`npx create-next-app@latest --typescript --tailwind --app`)
- [ ] Install dependencies: `framer-motion`, `firebase`, `posthog-js`
- [ ] Configure Tailwind with dark theme defaults and custom neon colors
- [ ] Set up Firebase project config (use env vars: `NEXT_PUBLIC_FIREBASE_API_KEY`, etc.)
- [ ] Create `lib/firebase.ts` — initialize Firebase app + Firestore
- [ ] Create `lib/analytics.ts` — PostHog init (conditional, only in production)
- [ ] Set up root layout with dark theme, Inter/Space Grotesk fonts, meta tags

## Phase 2: Roulette Wheel
- [ ] Build `RouletteWheel.tsx` component:
  - HTML5 Canvas wheel with 5 colored segments (one per category)
  - Category names + emoji rendered on each segment
  - Spin animation: pre-determine winner, animate with cubic-out easing (3-5 seconds)
  - Tick/click sound effect during spin (Web Audio API)
  - Callback `onResult(category)` when spin completes
- [ ] Build `SpinButton.tsx` — large neon CTA button, disabled during spin
- [ ] Build landing page (`app/page.tsx`):
  - Centered wheel + spin button
  - Title: "Algorithm Roulette" with tagline "Experience someone else's echo chamber"
  - Mode toggle: Roulette vs Targeted (ModeSelector component)
  - On spin result: router.push(`/feed/${category}`)
- [ ] Targeted mode flow:
  - Show category grid instead of wheel
  - User picks a category → "Here's what the OTHER side sees" → navigate to opposing feed

## Phase 3: Video Feed
- [ ] Build `VideoCard.tsx`:
  - Full-screen container (100vh × 100vw)
  - TikTok embed: render `<blockquote>` + load embed script
  - YouTube embed: render `<iframe>` with autoplay, muted initially
  - Platform detection from URL
  - Loading skeleton while embed loads
- [ ] Build `VideoFeed.tsx`:
  - Vertical swipe container using Framer Motion
  - Snap scrolling — each swipe advances exactly one video
  - Preload current + next 2 videos
  - Destroy videos 2+ positions behind current
  - Track swipe count for ad placement
- [ ] Build `AdPlaceholder.tsx`:
  - Appears every 5-7 videos in feed
  - Shows "Ad" label with placeholder content
  - Same full-screen format as video cards
- [ ] Build feed page (`app/feed/[category]/page.tsx`):
  - Fetch videos for category from Firestore
  - Shuffle order randomly
  - Render VideoFeed with fetched videos
  - Category pill/badge at top showing current echo chamber
  - "Back to wheel" button (subtle, top-left)
- [ ] Build `ShareButton.tsx`:
  - Fixed position bottom-right
  - "I survived X minutes in the [Category] algorithm"
  - Copy link to clipboard + Web Share API on mobile

## Phase 4: Data & Firebase
- [ ] Create Firestore collections: `videos`, `categories`
- [ ] Create seed data file `data/seed-videos.json` with structure:
  ```json
  {
    "categories": [
      { "id": "far-right", "name": "Far-Right Political", "color": "#FF0040", "icon": "🔴", "description": "..." },
      { "id": "far-left", "name": "Far-Left Political", "color": "#0066FF", "icon": "🔵", "description": "..." },
      { "id": "flat-earth", "name": "Flat Earth / Conspiracy", "color": "#FFD700", "icon": "🌍", "description": "..." },
      { "id": "crypto-bro", "name": "Crypto Maximalist", "color": "#00FF88", "icon": "₿", "description": "..." },
      { "id": "wellness-alt", "name": "Wellness / Alt Medicine", "color": "#FF66FF", "icon": "🧘", "description": "..." }
    ],
    "videos": [
      { "url": "https://www.youtube.com/shorts/XXXXX", "platform": "youtube", "category": "far-right", "creator": "@example" }
    ]
  }
  ```
- [ ] Create seed script `scripts/seed-firestore.ts` — reads JSON, writes to Firestore
- [ ] Curate 20 real YouTube Shorts URLs per category (100 total for MVP)
  - Use public, embeddable shorts from known polarized creators
  - Verify each URL is embeddable before adding

## Phase 5: Polish & Deploy
- [ ] Add page transitions (Framer Motion `AnimatePresence`)
- [ ] Add wheel spin sound effect (royalty-free click/tick)
- [ ] Mobile viewport fix (`viewport-fit=cover`, safe area insets)
- [ ] About page with explainer text
- [ ] Favicon + OG image + meta tags for social sharing
- [ ] Create GitHub repo: `TheRichArcher/algorithm-roulette`
- [ ] Deploy to Vercel, configure env vars
- [ ] Test on mobile Safari + Chrome
- [ ] Verify all embeds load correctly

## Definition of Done
- [ ] Landing page loads < 1.5s, wheel spins smoothly
- [ ] 5 categories with 20 videos each — all embeddable
- [ ] Vertical swipe feed works on mobile + desktop
- [ ] Share button copies correct link
- [ ] Deployed to Vercel, accessible via URL
- [ ] No console errors, no broken embeds
