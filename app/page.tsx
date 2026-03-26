import RouletteWheel from "@/components/RouletteWheel";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-slate-950 px-4 py-8">
      <div className="pointer-events-none absolute -left-16 top-0 h-64 w-64 rounded-full bg-cyan-500 opacity-20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 right-[-3.5rem] h-72 w-72 rounded-full bg-fuchsia-600 opacity-20 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),_transparent_32%),linear-gradient(180deg,_rgba(15,23,42,0.08),_rgba(2,6,23,0.75))]" />

      <div className="relative z-10 flex w-full max-w-md flex-col items-center">
        <div className="mb-8 text-center">
          <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-cyan-300/70">
            Cross-Feed Portal
          </p>
          <h1 className="text-3xl font-black tracking-tighter text-transparent drop-shadow-[0_0_15px_rgba(34,211,238,0.5)] bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text sm:text-4xl">
            ALGORITHM ROULETTE
          </h1>
          <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-slate-400 sm:text-base">
            Spin the wheel and get dropped into a different algorithmic echo chamber.
          </p>
        </div>

        <RouletteWheel />
      </div>

      <Link
        href="/about"
        className="absolute bottom-8 z-10 text-sm text-slate-400 underline underline-offset-4 transition-colors hover:text-slate-200"
      >
        What is this?
      </Link>
    </main>
  );
}
