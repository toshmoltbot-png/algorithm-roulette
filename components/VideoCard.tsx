"use client";

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

export default function VideoCard({ video }: VideoCardProps) {
  const category = getCategoryById(video.category);

  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center snap-start snap-always">
      {/* Video Embed */}
      <iframe
        src={`${video.embedUrl}?autoplay=0&controls=1&modestbranding=1&rel=0`}
        className="w-full h-full max-w-lg"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={video.title}
        loading="lazy"
      />

      {/* Overlay: category pill + title */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none">
        {category && (
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-2"
            style={{ backgroundColor: `${category.color}cc` }}
          >
            {category.label}
          </span>
        )}
        <h3 className="text-white font-bold text-lg leading-tight">{video.title}</h3>
        <p className="text-white/60 text-sm mt-1">{video.creator}</p>
      </div>
    </div>
  );
}
