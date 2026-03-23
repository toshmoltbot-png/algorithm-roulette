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
      playlist: id,
      controls: "1",
      rel: "0",
      modestbranding: "1",
      playsinline: "1",
      fs: "0",
    });
    return `${video.embedUrl}?${params.toString()}`;
  }, [video.embedUrl]);

  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center">
      {/* Loading skeleton */}
      {!loaded && (
        <div className="absolute inset-0 bg-zinc-900 animate-pulse z-10" aria-hidden="true">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-white/20 border-t-white/60 rounded-full animate-spin" />
          </div>
        </div>
      )}

      {/* YouTube iframe — fills entire viewport */}
      <iframe
        src={src}
        className="absolute inset-0 w-full h-full"
        style={{ border: "none" }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={video.title}
        loading="lazy"
        onLoad={() => setLoaded(true)}
      />

      {/* Bottom overlay: category pill + title */}
      <div className="absolute bottom-0 left-0 right-0 p-5 pb-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-20">
        {category && (
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 uppercase tracking-wide"
            style={{ backgroundColor: `${category.color}dd` }}
          >
            {category.label}
          </span>
        )}
        <h3 className="text-white font-bold text-lg leading-tight line-clamp-2 drop-shadow-lg">
          {video.title}
        </h3>
        <p className="text-white/50 text-sm mt-1 drop-shadow">{video.creator}</p>
      </div>
    </div>
  );
}
