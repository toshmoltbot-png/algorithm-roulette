"use client";

export default function AdPlaceholder() {
  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center snap-start snap-always px-3 py-4">
      <div className="relative w-full max-w-[420px] aspect-[9/16] rounded-2xl overflow-hidden bg-zinc-950 border border-white/10 shadow-2xl">
        <div className="absolute top-3 left-3 px-2 py-1 rounded-md text-[10px] font-mono tracking-widest uppercase bg-white/10 text-white/70 border border-white/10">
          Ad
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
          <p className="text-white/80 text-lg font-black">Ad Placeholder</p>
          <p className="text-white/40 text-sm mt-2">
            Reserved for future AdSense / sponsor integration.
          </p>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
    </div>
  );
}
