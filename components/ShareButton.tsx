"use client";

import { useMemo, useState } from "react";
import { getCategoryById } from "@/data/categories";

interface ShareButtonProps {
  categoryId: string;
  minutes?: number;
}

export default function ShareButton({ categoryId, minutes = 10 }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const category = getCategoryById(categoryId);
  const label = category?.label ?? categoryId;

  const shareUrl = useMemo(() => {
    // Use canonical prod URL so shares work outside localhost.
    return `https://algorithmroulette.vercel.app/feed/${categoryId}`;
  }, [categoryId]);

  const shareText = useMemo(() => {
    return `I just survived ${minutes} minutes in the ${label} algorithm 🎰 ${shareUrl}`;
  }, [label, minutes, shareUrl]);

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await (navigator as any).share({
          title: "Algorithm Roulette",
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch {
        // user cancelled or share failed -> fall through
      }
    }

    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <button
      onClick={handleShare}
      className="fixed bottom-6 right-6 z-50 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-3 rounded-full font-bold text-sm hover:bg-white/20 transition-all active:scale-95 shadow-lg"
      aria-label="Share"
    >
      {copied ? "Copied" : "Share"}
    </button>
  );
}
