"use client";

import { useMemo, useState } from "react";
import { getCategoryById } from "@/data/categories";

interface Video {
  id: string;
  category: string;
  platform: string;
  embedUrl: string;
  title: string;
  creator: string;
}

interface VideoCardProps {
  video: Video;
}

function getYouTubeIdFromEmbedUrl(embedUrl: string) {
  // Expected: https://www.youtube.com/embed/VIDEO_ID
  try {
    const url = new URL(embedUrl);
    const parts = url.pathname.split("/").filter(Boolean);
    const idx = parts.indexOf("embed");
    if (idx >= 0 && parts[idx + 1]) return parts[idx + 1];
    return parts[parts.length - 1] ?? "";
  } catch {
    const parts = embedUrl.split("/");
    return parts[parts.length - 1]?.split("?")[0] ?? "";
  }
}

export default function VideoCard({ video }: VideoCardProps) {
  const category = getCategoryById(video.category);
  const [loaded, setLoaded] = useState(false);

  const src = useMemo(() => {
    const id = getYouTubeIdFromEmbedUrl(video.embedUrl);
    const params = new URLSearchParams({
      autoplay: "1",
      mute: "1",
      loop: "1",
      playlist: id, // required for YouTube loop
      controls: "0",
      rel: "0",
      modestbranding: "1",
      playsinline: "1",
    });
    return `${video.embedUrl}?${params.toString()}`;
  }, [video.embedUrl]);

  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center snap-start snap-always px-3 py-4">
      <div className="relative w-full max-w-[420px] aspect-[9/16] rounded-2xl overflow-hidden bg-black shadow-2xl">
        {/* Loading skeleton */}
        {!loaded && (
          <div className="absolute inset-0 bg-zinc-900 animate-pulse" aria-hidden="true">
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        )}

        <iframe
          src={src}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={video.title}
          loading="lazy"
          onLoad={() => setLoaded(true)}
        />

        {/* Overlay: category pill + title */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none">
          {category && (
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-2"
              style={{ backgroundColor: `${category.color}cc` }}
            >
              {category.label}
            </span>
          )}
          <h3 className="text-white font-bold text-lg leading-tight line-clamp-2">
            {video.title}
          </h3>
          <p className="text-white/60 text-sm mt-1">{video.creator}</p>
        </div>
      </div>
    </div>
  );
}
