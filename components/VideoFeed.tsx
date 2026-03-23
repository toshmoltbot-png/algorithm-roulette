"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import VideoCard from "./VideoCard";
import AdPlaceholder from "./AdPlaceholder";

interface Video {
  id: string;
  category: string;
  platform: string;
  embedUrl: string;
  title: string;
  creator: string;
}

interface VideoFeedProps {
  videos: Video[];
}

export default function VideoFeed({ videos }: VideoFeedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Build feed with ad placeholders every 5-7 videos
  const feedItems: (Video | "ad")[] = [];
  let nextAdAt = 5 + Math.floor(Math.random() * 3);
  let videoCount = 0;

  for (const video of videos) {
    feedItems.push(video);
    videoCount++;
    if (videoCount === nextAdAt) {
      feedItems.push("ad");
      videoCount = 0;
      nextAdAt = 5 + Math.floor(Math.random() * 3);
    }
  }

  // Track which card is visible via IntersectionObserver
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const idx = Number(entry.target.getAttribute("data-index"));
            if (!isNaN(idx)) setActiveIndex(idx);
          }
        }
      },
      { root: container, threshold: 0.5 }
    );

    const items = container.querySelectorAll("[data-index]");
    items.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [feedItems.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const container = containerRef.current;
      if (!container) return;

      if (e.key === "ArrowDown" || e.key === "j") {
        e.preventDefault();
        container.scrollBy({ top: window.innerHeight, behavior: "smooth" });
      } else if (e.key === "ArrowUp" || e.key === "k") {
        e.preventDefault();
        container.scrollBy({ top: -window.innerHeight, behavior: "smooth" });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Auto-scroll to next when video ends
  const handleVideoEnded = useCallback((index: number) => {
    const container = containerRef.current;
    if (!container) return;
    // Scroll to next item
    const nextEl = container.querySelector(`[data-index="${index + 1}"]`);
    if (nextEl) {
      nextEl.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-dvh w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar"
    >
      {feedItems.map((item, index) =>
        item === "ad" ? (
          <div key={`ad-${index}`} data-index={index} className="h-dvh w-full snap-start snap-always">
            <AdPlaceholder />
          </div>
        ) : (
          <div key={item.id} data-index={index} className="h-dvh w-full snap-start snap-always">
            <VideoCard
              video={item}
              isActive={index === activeIndex}
              onEnded={() => handleVideoEnded(index)}
            />
          </div>
        )
      )}
    </div>
  );
}
