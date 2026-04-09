# Algorithm Roulette — Build Task

## Context
You are completing a partially-built Next.js app at this directory. The scaffold exists and builds clean.
Read specs/001-mvp/spec.md, plan.md, and tasks.md for full requirements.

## What's Already Done
- Next.js 14 + Tailwind + Framer Motion scaffold
- RouletteWheel component (SVG, spin animation, dual modes)
- VideoFeed + VideoCard components
- Landing page, feed page, about page
- Static video data (BUT all URLs are rickrolls — needs fixing)

## What You Must Do (in order)

### 1. Fix Video Content (CRITICAL)
All 80 video URLs in `data/videos.json` are rickrolls (dQw4w9WgXcQ).
Replace with REAL embeddable YouTube Shorts URLs. Find actual public YouTube Shorts from:
- **Far-Right Political**: Ben Shapiro, Steven Crowder, PragerU, Daily Wire, Turning Point USA
- **Far-Left Political**: Hasan Piker, The Young Turks, Second Thought, Democracy Now, More Perfect Union
- **Flat Earth / Conspiracy**: Flat Earth Society, conspiracy theory channels
- **Crypto Maximalist**: BitBoy Crypto, Coin Bureau, Anthony Pompliano
- **Hustle Bro / Sigma**: Andrew Tate fans, Gary Vee, Alex Hormozi
- **Trad Life**: Homesteading, tradwife content
- **Conspiracy**: QAnon-adjacent, Alex Jones clips
- **Climate Activist**: Greta Thunberg fans, Extinction Rebellion, Just Stop Oil

Get at MINIMUM 10 real working YouTube Shorts URLs per category. YouTube Shorts embed format:
`https://www.youtube.com/embed/VIDEO_ID` where VIDEO_ID is from youtube.com/shorts/VIDEO_ID

### 2. Update Categories
In `data/categories.ts`, make sure categories match what's in videos.json. Ensure each has:
- id, label, color (neon hex), opposite (for targeted mode)

### 3. Fix VideoCard Embed
In `components/VideoCard.tsx`, ensure YouTube embeds use proper Shorts format:
- iframe with `?autoplay=1&mute=1&loop=1&controls=0&rel=0&modestbranding=1`
- Full-screen vertical aspect ratio
- Loading skeleton

### 4. Add Share Functionality
The ShareButton should:
- Use Web Share API on mobile
- Fallback to clipboard copy on desktop  
- Text: "I just survived X minutes in the [Category] algorithm 🎰 algorithmroulette.vercel.app"

### 5. Add Ad Placeholders
Every 5-7 videos in the feed, insert an AdPlaceholder component:
- Full-screen card matching video card size
- "Ad" label, dark background, placeholder text
- Ready for AdSense integration later

### 6. Polish
- Ensure mobile viewport is correct (100dvh, safe areas)
- Add OG meta tags and favicon
- Make sure the wheel spin feels smooth with the cubic easing
- Add subtle sound effect on spin (can be a simple Web Audio beep if no audio file)
- Page transitions between wheel and feed

### 7. Create GitHub Repo & Deploy
- Initialize git if not already
- Create repo `TheRichArcher/algorithm-roulette` via `gh repo create`
- Push code
- The app should be deployable to Vercel (no Firebase needed for MVP — static JSON is fine)

## IMPORTANT RULES
- Do NOT use Firebase for MVP. Static JSON data is fine.
- Do NOT add any authentication or login
- Videos MUST be real YouTube URLs that actually work, not placeholders
- Test that `npm run build` passes before pushing
- Mobile-first — test vertical layout assumptions
