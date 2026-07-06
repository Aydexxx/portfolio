"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { CropMarks } from "@/components/projects/crop-marks";

/**
 * ProjectVideo — the demo clip framed as a white card floating on paper, wrapped
 * in cobalt crop marks (the site's signature). No dark bezel or glow.
 *
 * Playback is driven entirely in JS (no `autoplay` attribute):
 *  · In-view  → an IntersectionObserver plays the clip as the scene arrives and
 *    pauses it when it leaves, so only the visible channel is ever decoding.
 *  · Reduced motion → nothing auto-plays; the poster holds with a visible play
 *    button the viewer can trigger themselves.
 *
 * The clips are silent by design — always `muted`, never a mute/unmute control.
 * `preload="none"` + a fixed 16:9 box keep initial load light and layout stable.
 */
export function ProjectVideo({
  video,
  poster,
  name,
  playLabel,
}: {
  video: string;
  poster: string;
  name: string;
  playLabel: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  // Reduced-motion viewers get a manual play button instead of autoplay. Kept
  // in state (not derived) so the button can be dismissed once playback starts.
  const [showPlay, setShowPlay] = useState(false);

  useEffect(() => {
    setShowPlay(reduce === true);
  }, [reduce]);

  useEffect(() => {
    if (reduce !== false) return; // wait until we know motion is welcome
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // play() can reject (e.g. tab not visible) — harmless, ignore it.
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  const playNow = () => {
    ref.current
      ?.play()
      .then(() => setShowPlay(false))
      .catch(() => {});
  };

  return (
    <div className="relative">
      {/* White monitor card */}
      <div className="relative overflow-hidden rounded-xl border border-border bg-surface shadow-[0_24px_60px_-28px_rgba(20,22,27,0.35)]">
        <video
          ref={ref}
          className="aspect-video w-full bg-surface-2 object-cover"
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
          aria-label={`${name} — ${playLabel}`}
        >
          <source src={video} type="video/mp4" />
        </video>

        {showPlay && (
          <button
            type="button"
            onClick={playNow}
            aria-label={playLabel}
            className="absolute inset-0 grid place-items-center bg-ink/10 transition-colors hover:bg-ink/[0.04]"
          >
            <span className="grid size-16 place-items-center rounded-full bg-accent-solid text-accent-contrast shadow-lg">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}
      </div>

      {/* Cobalt registration marks around the card */}
      <CropMarks offset={-7} length={16} />
    </div>
  );
}
