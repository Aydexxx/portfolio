/**
 * Signature atmosphere — a slow-drifting iris-toned aurora layered with a faint
 * film grain. Pure CSS (see globals.css): zero JS, GPU-composited, and it
 * freezes to a static gradient under `prefers-reduced-motion`.
 *
 * Rendered once in the root layout, pinned behind all content (z-index: -1).
 */
export function Atmosphere() {
  return (
    <div className="atmosphere" aria-hidden="true">
      <div className="aurora aurora--a" />
      <div className="aurora aurora--b" />
      <div className="grain" />
    </div>
  );
}
