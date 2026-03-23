# Algorithm Roulette 🎰

> See what the other side sees. Spin the wheel, land in someone else's algorithm.

A web app that lets you experience the algorithmic feed of an opposing worldview. Spin a roulette wheel, land on a category — Far-Right, Far-Left, Flat Earth, Crypto Maximalist, and more — then get dropped into a TikTok-style vertical swipe feed of real content from that echo chamber.

## Features

- 🎡 **Animated Roulette Wheel** — Casino-style spin with 8 categories
- 📱 **TikTok-style Feed** — Full-screen vertical swipe with snap scrolling
- 🎯 **Two Modes** — True Roulette (random) or Targeted (pick your camp, see the opposite)
- 📤 **Share** — "I just survived 10 minutes in the [X] algorithm"
- 📺 **Embedded Videos** — YouTube iframes, zero hosting cost
- 🌙 **Dark Theme** — Edgy, mobile-first design

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

```bash
npx vercel
```

Or connect your GitHub repo at [vercel.com](https://vercel.com).

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion

## Architecture

- No backend — videos are static JSON
- No logins — zero friction
- No video hosting — embed iframes only
- Mobile-first — designed for vertical swiping on phones
