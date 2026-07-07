"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * ProjectVideo — the demo clip framed as a dark elevated card (--bg-2, thin
 * --line border, soft shadow). No bezel glow; the signature is the ghost
 * numeral behind the block, not the frame.
 *
 * Playback is driven entirely in JS (no `autoplay` attribute):
 *  · In-view  → an IntersectionObserver plays the clip as the block arrives and
 *    pauses it when it leaves (threshold ~0.4), so only the visible channel is
 *    ever decoding.
 *  · Reduced motion → nothing auto-plays; the poster holds with a visible play
 *    button the viewer can trigger themselves.
 *
 * The clips are silent by design — always `muted`, never a mute/unmute control.
 * `preload="none"` + a fixed 16:9 box keep initial load light and layout stable.
 */
export function ProjectVideo({
  src,
  poster,
  name,
}: {
  src: string;
  poster: string;
  name: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  // Reduced-motion viewers get a manual play button instead of autoplay. It's
  // derived from the motion preference (no effect — `useReducedMotion` flips
  // it on mount and re-renders naturally) and dismissed once playback starts,
  // so the overlay doesn't linger over a playing clip.
  const [dismissed, setDismissed] = useState(false);
  const showPlay = reduce === true && !dismissed;
  const playLabel = `${name} — demoyu oynat`;

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
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  const playNow = () => {
    ref.current
      ?.play()
      .then(() => setDismissed(true))
      .catch(() => {});
  };

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-bg-2 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.6)]">
      <video
        ref={ref}
        className="aspect-video w-full bg-bg-2 object-cover"
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={playLabel}
      >
        <source src={src} type="video/mp4" />
      </video>

      {showPlay && (
        <button
          type="button"
          onClick={playNow}
          aria-label={playLabel}
          className="absolute inset-0 grid place-items-center bg-bg/30 transition-colors hover:bg-bg/10"
        >
          <span className="grid size-16 place-items-center rounded-full bg-accent-solid text-accent-contrast shadow-lg">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
