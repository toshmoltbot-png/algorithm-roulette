"use client";

import { useState } from "react";
import { getCategoryById } from "@/data/categories";

interface ShareButtonProps {
  categoryId: string;
}

export default function ShareButton({ categoryId }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const category = getCategoryById(categoryId);
  const label = category?.label ?? categoryId;

  const shareText = `I just survived 10 minutes in the ${label} algorithm on Algorithm Roulette 🎰`;
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: "Algorithm Roulette", text: shareText, url: shareUrl });
        return;
      } catch {
        // User cancelled or share failed, fall through to clipboard
      }
    }

    // Clipboard fallback
    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard failed silently
    }
  };

  return (
    <button
      onClick={handleShare}
      className="fixed bottom-6 right-6 z-50 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-3 rounded-full font-bold text-sm hover:bg-white/20 transition-all active:scale-95 shadow-lg"
    >
      {copied ? "✅ Copied!" : "📤 Share"}
    </button>
  );
}
