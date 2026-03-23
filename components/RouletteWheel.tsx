"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/data/categories";

export default function RouletteWheel() {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [mode, setMode] = useState<"roulette" | "targeted">("roulette");
  const [selectedCamp, setSelectedCamp] = useState<string | null>(null);
  const router = useRouter();

  const segmentAngle = 360 / CATEGORIES.length;

  const spin = useCallback(() => {
    if (spinning) return;
    setSpinning(true);

    // Random 3-5 full rotations + random landing
    const extraRotations = (3 + Math.random() * 2) * 360;
    const randomSegment = Math.floor(Math.random() * CATEGORIES.length);
    const targetRotation = rotation + extraRotations + randomSegment * segmentAngle;

    setRotation(targetRotation);

    setTimeout(() => {
      setSpinning(false);
      // Calculate which segment we landed on
      const normalizedAngle = targetRotation % 360;
      const landedIndex = Math.floor(normalizedAngle / segmentAngle) % CATEGORIES.length;

      if (mode === "targeted" && selectedCamp) {
        // In targeted mode, go to the opposite feed
        const selected = CATEGORIES.find((c) => c.id === selectedCamp);
        if (selected) {
          router.push(`/feed/${selected.opposite}`);
          return;
        }
      }

      router.push(`/feed/${CATEGORIES[landedIndex].id}`);
    }, 4000);
  }, [spinning, rotation, segmentAngle, mode, selectedCamp, router]);

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Mode Toggle */}
      <div className="flex gap-2 bg-white/5 rounded-full p-1">
        <button
          onClick={() => { setMode("roulette"); setSelectedCamp(null); }}
          className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
            mode === "roulette" ? "bg-white text-black" : "text-white/60 hover:text-white"
          }`}
        >
          🎰 True Roulette
        </button>
        <button
          onClick={() => setMode("targeted")}
          className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
            mode === "targeted" ? "bg-white text-black" : "text-white/60 hover:text-white"
          }`}
        >
          🎯 Targeted
        </button>
      </div>

      {/* Targeted Mode: Pick your camp */}
      {mode === "targeted" && (
        <div className="text-center">
          <p className="text-white/60 text-sm mb-3">Where do you stand?</p>
          <div className="flex flex-wrap justify-center gap-2 max-w-md">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCamp(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                  selectedCamp === cat.id
                    ? "border-white scale-110"
                    : "border-white/20 hover:border-white/40"
                }`}
                style={{
                  backgroundColor: selectedCamp === cat.id ? cat.color : `${cat.color}33`,
                  color: "white",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
          {selectedCamp && (
            <p className="text-white/40 text-xs mt-3">
              Cool. Now spin to see what the other side sees.
            </p>
          )}
        </div>
      )}

      {/* Wheel */}
      <div className="relative w-72 h-72 sm:w-80 sm:h-80">
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10 text-3xl drop-shadow-lg">
          ▼
        </div>

        <motion.div
          animate={{ rotate: rotation }}
          transition={{ duration: 4, ease: [0.2, 0.8, 0.2, 1] }}
          className="w-full h-full rounded-full relative overflow-hidden border-4 border-white/20 shadow-2xl shadow-white/5"
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {CATEGORIES.map((cat, i) => {
              const startAngle = i * segmentAngle;
              const endAngle = (i + 1) * segmentAngle;
              const startRad = ((startAngle - 90) * Math.PI) / 180;
              const endRad = ((endAngle - 90) * Math.PI) / 180;
              const x1 = 100 + 95 * Math.cos(startRad);
              const y1 = 100 + 95 * Math.sin(startRad);
              const x2 = 100 + 95 * Math.cos(endRad);
              const y2 = 100 + 95 * Math.sin(endRad);
              const largeArc = segmentAngle > 180 ? 1 : 0;
              const midRad = (((startAngle + endAngle) / 2 - 90) * Math.PI) / 180;
              const textX = 100 + 60 * Math.cos(midRad);
              const textY = 100 + 60 * Math.sin(midRad);
              const textAngle = (startAngle + endAngle) / 2;

              return (
                <g key={cat.id}>
                  <path
                    d={`M100,100 L${x1},${y1} A95,95 0 ${largeArc},1 ${x2},${y2} Z`}
                    fill={cat.color}
                    stroke="#0a0a0a"
                    strokeWidth="1"
                  />
                  <text
                    x={textX}
                    y={textY}
                    fill="white"
                    fontSize="6.5"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${textAngle}, ${textX}, ${textY})`}
                  >
                    {cat.label}
                  </text>
                </g>
              );
            })}
            {/* Center circle */}
            <circle cx="100" cy="100" r="15" fill="#0a0a0a" stroke="white" strokeWidth="2" />
            <text
              x="100"
              y="100"
              fill="white"
              fontSize="8"
              fontWeight="bold"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              🎰
            </text>
          </svg>
        </motion.div>
      </div>

      {/* Spin Button */}
      <button
        onClick={spin}
        disabled={spinning || (mode === "targeted" && !selectedCamp)}
        className={`px-10 py-4 rounded-full text-xl font-black uppercase tracking-wider transition-all ${
          spinning
            ? "bg-white/20 text-white/40 cursor-not-allowed"
            : mode === "targeted" && !selectedCamp
            ? "bg-white/10 text-white/30 cursor-not-allowed"
            : "bg-white text-black hover:scale-105 hover:shadow-lg hover:shadow-white/20 active:scale-95"
        }`}
      >
        {spinning ? "Spinning..." : "SPIN"}
      </button>
    </div>
  );
}
