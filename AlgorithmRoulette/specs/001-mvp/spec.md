# Algorithm Roulette — MVP Functional Spec

## Overview
A web app that lets users experience the algorithmic feed of an opposing worldview or extreme niche. Spin a roulette wheel, land on a category (e.g. "Far-Right", "Flat Earth", "Crypto Bro") — get dropped into a TikTok-style vertical swipe feed of real curated content from that echo chamber.

## Core UX Flow
1. User lands on homepage — sees a spinning roulette wheel with category segments
2. User clicks "SPIN" — wheel animates and lands on a random category
3. User is dropped into a full-screen vertical swipe feed of embedded TikTok/YouTube Shorts videos from that category
4. After every 5-7 swipes, a placeholder ad slot appears (ready for AdSense later)
5. Share button: "I just survived 10 minutes in the [Category] algorithm" — generates shareable link/screenshot

## Two Modes
1. **TRUE ROULETTE MODE** (default): Hit Spin — random category, user doesn't know what they'll get until videos start playing
2. **TARGETED MODE**: "Where do you stand on [topic]?" → select a camp → "Here's what the OTHER side sees" — serves the opposing feed

## Categories (MVP — 5 categories minimum)
- Far-Right Political
- Far-Left Political
- Flat Earth / Conspiracy
- Crypto/Web3 Maximalist
- Wellness/Alternative Medicine

## Video Content
- **NEVER host videos** — embed only (TikTok/YouTube embed players)
- Database stores URLs only
- Pre-curated: ~100 videos per category (500 total for MVP)
- Videos sourced from known polarized creator accounts

## Technical Requirements
- **Zero friction**: No login, no signup. Spin within 1.5 seconds of landing
- **Mobile-first**: Vertical swipe UI, touch gestures, full-screen video
- **Stack**: Next.js + Tailwind CSS + Framer Motion
- **Deploy**: Vercel (edge, free tier)
- **Database**: Firebase Firestore (video URLs + categories + metadata)
- **Analytics**: Vercel Analytics (built-in) + PostHog event tracking (spin counts, category engagement, session duration, swipe depth)

## Pages
1. **/** — Landing page with roulette wheel + "SPIN" button
2. **/feed/[category]** — Full-screen vertical swipe feed
3. **/about** — What is this? Explainer page

## Non-Goals (MVP)
- No God Mode / paywall
- No real-time event ingestion
- No user accounts or auth
- No actual ad integration (just placeholder slots)
- No native app

## Design Principles
- Dark theme (feels like a nightclub/casino)
- Neon accent colors per category
- Smooth animations (wheel spin, card transitions)
- Mobile-first responsive
- The roulette wheel should feel PHYSICAL — momentum, deceleration, click sounds
