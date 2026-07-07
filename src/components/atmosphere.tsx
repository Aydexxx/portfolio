/**
 * Atmosphere — the filmic texture of the darkroom. Two fixed, full-screen
 * layers pinned behind all content (z-index: -1, pointer-events: none):
 *   · grain   — fine SVG noise over the charcoal (mix-blend overlay, ~0.045)
 *   · vignette — a soft radial edge-darkening
 * Kept subtle — texture and mood, never decoration.
 */
export function Atmosphere() {
  return (
    <div className="atmosphere" aria-hidden="true">
      <div className="atmosphere-grain" />
      <div className="atmosphere-vignette" />
    </div>
  );
}
