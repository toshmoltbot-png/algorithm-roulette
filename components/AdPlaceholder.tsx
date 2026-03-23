"use client";

export default function AdPlaceholder() {
  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center">
      <div className="absolute top-4 left-4 px-2.5 py-1 rounded-md text-[10px] font-mono tracking-widest uppercase bg-white/10 text-white/60 border border-white/10 z-10">
        Ad
      </div>

      <div className="flex flex-col items-center justify-center text-center px-8">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
          <span className="text-3xl">📢</span>
        </div>
        <p className="text-white/70 text-lg font-black">Your Ad Here</p>
        <p className="text-white/30 text-sm mt-2 max-w-xs">
          This space is reserved for sponsor integration.
        </p>
      </div>
    </div>
  );
}
