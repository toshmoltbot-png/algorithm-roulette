import RouletteWheel from "@/components/RouletteWheel";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-10 relative z-10">
        <h1 className="text-5xl sm:text-7xl font-black tracking-tighter mb-4">
          ALGORITHM
          <br />
          <span className="bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            ROULETTE
          </span>
        </h1>
        <p className="text-white/50 text-lg sm:text-xl max-w-md mx-auto leading-relaxed">
          See what the other side sees.
          <br />
          <span className="text-white/30">Spin the wheel. Land in someone else&apos;s algorithm.</span>
        </p>
      </div>

      {/* Wheel */}
      <div className="relative z-10">
        <RouletteWheel />
      </div>

      {/* About link */}
      <Link
        href="/about"
        className="mt-12 text-white/20 text-sm hover:text-white/40 transition-colors relative z-10"
      >
        What is this? →
      </Link>
    </main>
  );
}
