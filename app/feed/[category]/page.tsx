"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import VideoFeed from "@/components/VideoFeed";
import ShareButton from "@/components/ShareButton";
import { getCategoryById } from "@/data/categories";
import videosData from "@/data/videos.json";

interface Video {
  id: string;
  category: string;
  platform: string;
  embedUrl: string;
  title: string;
  creator: string;
}

export default function FeedPage() {
  const params = useParams();
  const categoryId = params.category as string;
  const category = getCategoryById(categoryId);

  const videos = (videosData as Video[]).filter((v) => v.category === categoryId);

  // Shuffle videos for randomness
  const shuffled = [...videos].sort(() => Math.random() - 0.5);

  if (!category || shuffled.length === 0) {
    return (
      <main className="min-h-dvh flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl font-black mb-4">Category not found</h1>
        <Link href="/" className="text-white/50 hover:text-white transition-colors">
          ← Back to wheel
        </Link>
      </main>
    );
  }

  return (
    <main className="h-dvh relative">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/80 to-transparent">
        <Link
          href="/"
          className="text-white/60 hover:text-white text-sm font-bold transition-colors"
        >
          ← Spin Again
        </Link>
        <span
          className="px-3 py-1 rounded-full text-xs font-bold"
          style={{ backgroundColor: `${category.color}cc` }}
        >
          {category.label}
        </span>
      </div>

      {/* Feed */}
      <VideoFeed videos={shuffled} />

      {/* Share */}
      <ShareButton categoryId={categoryId} />
    </main>
  );
}
