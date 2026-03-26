# Algorithm Roulette V2 - Execution Plan

## Approach
This redesign focuses exclusively on the frontend UI layer, leveraging the existing Next.js structure. We will swap out the basic 2D wheel and typography for a heavily-styled Framer Motion component. The primary toolset is React, Tailwind CSS, and Framer Motion.

## 1. Setup & Scaffolding
- Ensure `framer-motion` and `lucide-react` (for the pointer pin) are installed in the `AlgorithmRoulette` package.json.
- Create a new `v2` page or component (`app/page-v2.tsx` or replace `app/page.tsx` directly depending on user preference, but we'll assume direct replacement for the `Wheel` component).

## 2. Component Construction (DESIGN.md implementation)
- **Background Container:** `main` or `div` wrapper with `bg-slate-950 h-screen flex flex-col items-center justify-center relative overflow-hidden`.
- **Ambient Glows:** Absolute divs with `blur-3xl opacity-20` placed in corners to create the cyberpunk atmosphere.
- **Typography:** Implement the neon-glowing gradient text header as specified.
- **The Wheel (Framer Motion):** 
  - Build an SVG or CSS `conic-gradient` based wheel split into 8 rich gradient segments.
  - Implement a `useAnimation` or state-driven `animate={{ rotate: rotationState }}` using the `spring` config from `DESIGN.md`.
  - Add a floating center hub and an absolute top-center metallic pointer pin.
- **CTA Button:** Build the large, pulsating `SPIN THE ALGORITHM` button with `hover:scale` and `active:scale` transitions.

## 3. Integration & Testing
- Hook up the existing `spin` state logic to the new `framer-motion` wheel.
- Ensure the selected segment actually aligns with the 12 o'clock pointer at the end of the rotation.
- Validate mobile responsiveness (no horizontal scroll, wheel fits on screen).