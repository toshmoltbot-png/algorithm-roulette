"use client";

export default function AdPlaceholder() {
  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center snap-start snap-always">
      <div className="border border-white/10 rounded-xl p-8 text-center bg-white/5 backdrop-blur-sm">
        <p className="text-white/20 text-sm font-mono uppercase tracking-widest">Ad Space</p>
        <p className="text-white/10 text-xs mt-2">Sponsor this feed</p>
      </div>
    </div>
  );
}
