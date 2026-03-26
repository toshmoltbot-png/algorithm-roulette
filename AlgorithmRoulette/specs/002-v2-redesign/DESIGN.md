# DESIGN.md - Algorithm Roulette V2 (Stitch Architecture Blueprint)

## 1. Aesthetic & Global Theme
- **Vibe:** Dystopian / Cyberpunk / Premium Native App
- **Mode:** Strictly Dark Mode (Mobile-First)
- **Base Background:** `bg-slate-950` with subtle, moody ambient glows.
- **Ambient Glows:** Use absolute positioned `<divs>` with high blur (`blur-3xl`), low opacity (`opacity-20`).
  - Top Left: `bg-cyan-500`
  - Bottom Right: `bg-fuchsia-600`

## 2. Typography
- **Heading Font:** Inter or a Geometric Sans-Serif (bold, tight tracking).
- **Body Font:** Inter or standard sans-serif.
- **Header Element:** "ALGORITHM ROULETTE"
  - Classes: `text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-tighter drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]`

## 3. The Core Interactive Element: The 3D Glassmorphic Wheel
*This replaces the flat 2D pie chart from V1.*

- **Container:** `relative w-80 h-80 mx-auto rounded-full p-2 bg-slate-900/50 backdrop-blur-md border border-slate-700/50 shadow-[0_0_40px_rgba(0,0,0,0.5)] inner-shadow`
- **The Segments (8 echo chambers):**
  - Use rich, modern gradients for each slice rather than flat colors.
  - Slice 1 (Far-Right): `bg-gradient-to-br from-red-600 to-rose-900`
  - Slice 2 (Far-Left): `bg-gradient-to-br from-blue-600 to-indigo-900`
  - Slice 3 (Tech VC): `bg-gradient-to-br from-emerald-500 to-teal-800`
  - Slice 4 (Crypto Bro): `bg-gradient-to-br from-yellow-500 to-orange-700`
  - Slice 5 (Flat Earth): `bg-gradient-to-br from-purple-600 to-fuchsia-900`
  - Slice 6 (Doomsday Prepper): `bg-gradient-to-br from-stone-600 to-neutral-900`
  - Slice 7 (TradTrad): `bg-gradient-to-br from-amber-700 to-brown-900`
  - Slice 8 (Spiritual/Woo): `bg-gradient-to-br from-sky-400 to-cyan-800`
- **Center Hub:** A sleek metallic/glass circle in the exact center.
  - `w-16 h-16 rounded-full bg-slate-800 border-2 border-slate-600 shadow-inner flex items-center justify-center z-20`
- **The Pointer/Ticker:**
  - Placed exactly at the top center (12 o'clock).
  - Shape: An inverted triangle pointing down.
  - `text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] z-30`

## 4. Animation Physics (Framer Motion)
- **Spin Action:** When the user clicks the button, the wheel rotates using `framer-motion`.
- **Spring Config:** A long, satisfying deceleration.
  - `transition={{ type: "spring", damping: 12, stiffness: 40, mass: 1, duration: 4 }}`
- **Snap:** The rotation math must snap the winning segment perfectly to the 12 o'clock pointer.

## 5. Action Elements
- **Primary CTA ("SPIN THE ALGORITHM"):**
  - Should look tactile and premium.
  - Classes: `w-full max-w-xs mx-auto py-4 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-bold text-lg uppercase tracking-widest shadow-[0_0_20px_rgba(192,38,211,0.5)] hover:shadow-[0_0_30px_rgba(192,38,211,0.8)] hover:scale-[1.02] active:scale-95 transition-all`
- **Secondary Link ("What is this?"):**
  - Clean and muted, bottom of the screen.
  - Classes: `text-sm text-slate-400 hover:text-slate-200 underline underline-offset-4 transition-colors`

## 6. Target Output
A single React component (`WheelPage.tsx`) utilizing Tailwind CSS and Framer Motion, structured as a mobile-first, full-viewport height (`h-screen`) flex-column.
