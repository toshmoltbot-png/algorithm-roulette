"use client";

import { useEffect, useRef, useMemo } from "react";
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
  isActive: boolean;
  muted: boolean;
  onEnded?: () => void;
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

// Ensure YouTube IFrame API is loaded once
let apiLoaded = false;
let apiReady = false;
const apiCallbacks: (() => void)[] = [];

function ensureYouTubeAPI(cb: () => void) {
  if (apiReady) { cb(); return; }
  apiCallbacks.push(cb);
  if (apiLoaded) return;
  apiLoaded = true;

  const prev = (window as any).onYouTubeIframeAPIReady;
  (window as any).onYouTubeIframeAPIReady = () => {
    apiReady = true;
    if (prev) prev();
    apiCallbacks.forEach((fn) => fn());
    apiCallbacks.length = 0;
  };

  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  document.head.appendChild(tag);
}

export default function VideoCard({ video, isActive, muted, onEnded }: VideoCardProps) {
  const category = getCategoryById(video.category);
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const videoId = useMemo(() => getYouTubeIdFromEmbedUrl(video.embedUrl), [video.embedUrl]);

  // Create YouTube player
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let destroyed = false;

    ensureYouTubeAPI(() => {
      if (destroyed) return;

      const playerDiv = document.createElement("div");
      playerDiv.id = `yt-${video.id}`;
      container.appendChild(playerDiv);

      playerRef.current = new (window as any).YT.Player(playerDiv.id, {
        videoId,
        playerVars: {
          autoplay: isActive ? 1 : 0,
          mute: 1, // always start muted (browser requirement), we unmute via API
          controls: 1,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          fs: 0,
          loop: 0,
        },
        events: {
          onReady: (event: any) => {
            // Apply current mute state once player is ready
            if (!muted) {
              event.target.unMute();
              event.target.setVolume(100);
            }
          },
          onStateChange: (event: any) => {
            if (event.data === 0 && onEnded) {
              onEnded();
            }
          },
        },
      });
    });

    return () => {
      destroyed = true;
      if (playerRef.current?.destroy) {
        try { playerRef.current.destroy(); } catch {}
      }
      playerRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId, video.id]);

  // Play/pause based on visibility
  useEffect(() => {
    const player = playerRef.current;
    if (!player?.getPlayerState) return;

    try {
      if (isActive) {
        player.playVideo();
      } else {
        player.pauseVideo();
      }
    } catch {}
  }, [isActive]);

  // Sync mute state
  useEffect(() => {
    const player = playerRef.current;
    if (!player?.isMuted) return;

    try {
      if (muted) {
        player.mute();
      } else {
        player.unMute();
        player.setVolume(100);
      }
    } catch {}
  }, [muted]);

  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center">
      {/* YouTube player container */}
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full [&>iframe]:!w-full [&>iframe]:!h-full [&>div]:!w-full [&>div]:!h-full"
      />

      {/* Bottom overlay */}
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
