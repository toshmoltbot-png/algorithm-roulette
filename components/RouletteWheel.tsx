"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/data/categories";

const SPIN_DURATION_MS = 4000;
const SEGMENT_GRADIENTS = [
  { from: "#dc2626", to: "#881337" },
  { from: "#2563eb", to: "#312e81" },
  { from: "#10b981", to: "#115e59" },
  { from: "#f59e0b", to: "#c2410c" },
  { from: "#9333ea", to: "#701a75" },
  { from: "#57534e", to: "#171717" },
  { from: "#b45309", to: "#451a03" },
  { from: "#38bdf8", to: "#155e75" },
] as const;

function polarToCartesian(angle: number, radius: number) {
  const radians = ((angle - 90) * Math.PI) / 180;
  return {
    x: 100 + radius * Math.cos(radians),
    y: 100 + radius * Math.sin(radians),
  };
}

export default function RouletteWheel() {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [mode, setMode] = useState<"roulette" | "targeted">("roulette");
  const [selectedCamp, setSelectedCamp] = useState<string | null>(null);
  const router = useRouter();

  const segmentAngle = 360 / CATEGORIES.length;

  const spin = useCallback(() => {
    if (spinning) return;

    let winnerIndex = Math.floor(Math.random() * CATEGORIES.length);
    if (mode === "targeted" && selectedCamp) {
      const selected = CATEGORIES.find((category) => category.id === selectedCamp);
      const oppositeIndex = CATEGORIES.findIndex((category) => category.id === selected?.opposite);
      if (oppositeIndex >= 0) {
        winnerIndex = oppositeIndex;
      }
    }

    const currentRotation = ((rotation % 360) + 360) % 360;
    const targetAlignment = (360 - (winnerIndex * segmentAngle + segmentAngle / 2)) % 360;
    const delta = (targetAlignment - currentRotation + 360) % 360;
    const extraRotations = (4 + Math.random() * 2) * 360;
    const targetRotation = rotation + extraRotations + delta;

    setSpinning(true);
    setRotation(targetRotation);

    window.setTimeout(() => {
      setSpinning(false);
      router.push(`/feed/${CATEGORIES[winnerIndex].id}`);
    }, SPIN_DURATION_MS);
  }, [spinning, rotation, segmentAngle, mode, selectedCamp, router]);

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <div className="inline-flex rounded-full border border-slate-700/70 bg-slate-900/60 p-1 shadow-[0_0_35px_rgba(15,23,42,0.5)] backdrop-blur-xl">
        <button
          onClick={() => {
            setMode("roulette");
            setSelectedCamp(null);
          }}
          className={`rounded-full px-4 py-2 text-sm font-semibold tracking-wide transition-all ${
            mode === "roulette"
              ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.45)]"
              : "text-slate-400 hover:text-slate-100"
          }`}
        >
          True Roulette
        </button>
        <button
          onClick={() => setMode("targeted")}
          className={`rounded-full px-4 py-2 text-sm font-semibold tracking-wide transition-all ${
            mode === "targeted"
              ? "bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white shadow-[0_0_20px_rgba(192,38,211,0.45)]"
              : "text-slate-400 hover:text-slate-100"
          }`}
        >
          Targeted
        </button>
      </div>

      {mode === "targeted" && (
        <div className="w-full rounded-[1.75rem] border border-slate-800 bg-slate-900/40 p-4 text-center shadow-[0_20px_60px_rgba(2,6,23,0.55)] backdrop-blur-md">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.28em] text-slate-400">
            Choose your current lane
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCamp(cat.id)}
                className={`rounded-full border px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] transition-all ${
                  selectedCamp === cat.id
                    ? "scale-[1.03] border-cyan-300/80 bg-cyan-400/12 text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.25)]"
                    : "border-slate-700 bg-slate-950/50 text-slate-400 hover:-translate-y-0.5 hover:border-slate-500 hover:text-slate-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
          {selectedCamp && (
            <p className="mt-3 text-xs text-slate-500">
              Spin to drop into the opposite feed.
            </p>
          )}
        </div>
      )}

      <div className="relative mx-auto h-80 w-80 max-w-[calc(100vw-2rem)] max-h-[calc(100vw-2rem)]">
        <div className="absolute left-1/2 top-[-0.8rem] z-30 -translate-x-1/2 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
          <div className="h-0 w-0 border-l-[14px] border-r-[14px] border-t-[22px] border-l-transparent border-r-transparent border-t-white" />
        </div>

        <div className="relative h-full w-full rounded-full border border-slate-700/50 bg-slate-900/50 p-2 shadow-[0_0_40px_rgba(0,0,0,0.5)] backdrop-blur-md">
          <div className="absolute inset-5 rounded-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.14),transparent_22%),radial-gradient(circle_at_75%_80%,rgba(34,211,238,0.10),transparent_28%)]" />
          <motion.div
            animate={{ rotate: rotation }}
            transition={{ type: "spring", damping: 12, stiffness: 40, mass: 1, duration: 4 }}
            className="relative h-full w-full overflow-hidden rounded-full border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_0_30px_rgba(8,47,73,0.2)]"
          >
            <svg viewBox="0 0 200 200" className="h-full w-full">
              <defs>
                {CATEGORIES.map((cat, index) => (
                  <linearGradient
                    id={`segment-gradient-${cat.id}`}
                    key={cat.id}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor={SEGMENT_GRADIENTS[index].from} />
                    <stop offset="100%" stopColor={SEGMENT_GRADIENTS[index].to} />
                  </linearGradient>
                ))}
                <radialGradient id="wheel-gloss" cx="35%" cy="25%" r="70%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.24)" />
                  <stop offset="45%" stopColor="rgba(255,255,255,0.05)" />
                  <stop offset="100%" stopColor="rgba(15,23,42,0.04)" />
                </radialGradient>
              </defs>

              {CATEGORIES.map((cat, i) => {
                const startAngle = i * segmentAngle;
                const endAngle = (i + 1) * segmentAngle;
                const start = polarToCartesian(startAngle, 98);
                const end = polarToCartesian(endAngle, 98);
                const label = cat.label.split(" ");
                const labelPosition = polarToCartesian(startAngle + segmentAngle / 2, 62);
                const labelAngle = startAngle + segmentAngle / 2;

                return (
                  <g key={cat.id}>
                    <path
                      d={`M100 100 L${start.x} ${start.y} A98 98 0 0 1 ${end.x} ${end.y} Z`}
                      fill={`url(#segment-gradient-${cat.id})`}
                      stroke="rgba(15,23,42,0.75)"
                      strokeWidth="1.5"
                    />
                    <text
                      x={labelPosition.x}
                      y={labelPosition.y}
                      fill="rgba(248,250,252,0.92)"
                      fontSize="7"
                      fontWeight="700"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      transform={`rotate(${labelAngle}, ${labelPosition.x}, ${labelPosition.y})`}
                    >
                      {label.map((word, wordIndex) => (
                        <tspan
                          key={`${cat.id}-${word}`}
                          x={labelPosition.x}
                          dy={wordIndex === 0 ? 0 : 8}
                        >
                          {word}
                        </tspan>
                      ))}
                    </text>
                  </g>
                );
              })}

              <circle cx="100" cy="100" r="97" fill="url(#wheel-gloss)" />
            </svg>

            <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_120%,rgba(15,23,42,0.35),transparent_45%),radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.12),transparent_30%)]" />
          </motion.div>

          <div className="absolute inset-1/2 z-20 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-slate-600 bg-slate-800 shadow-[inset_0_3px_8px_rgba(255,255,255,0.12),0_0_24px_rgba(15,23,42,0.55)]">
            <div className="h-7 w-7 rounded-full border border-cyan-300/30 bg-gradient-to-br from-cyan-300/30 to-slate-800/80" />
          </div>
        </div>
      </div>

      <button
        onClick={spin}
        disabled={spinning || (mode === "targeted" && !selectedCamp)}
        className={`w-full max-w-xs rounded-2xl py-4 text-lg font-bold uppercase tracking-widest transition-all ${
          spinning
            ? "cursor-wait bg-slate-800 text-slate-500 shadow-none"
            : mode === "targeted" && !selectedCamp
              ? "cursor-not-allowed bg-slate-900 text-slate-600"
              : "bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-[0_0_20px_rgba(192,38,211,0.5)] hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(192,38,211,0.8)] active:scale-95"
        }`}
      >
        {spinning ? "Spinning..." : "Spin The Algorithm"}
      </button>

      <p className="max-w-xs text-center text-xs leading-5 text-slate-500">
        Land on a chamber and see the same short-form worldview loop they do.
      </p>
    </div>
  );
}
