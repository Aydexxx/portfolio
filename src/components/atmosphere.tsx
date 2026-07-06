/**
 * Atmosphere — a very faint paper grain laid over the whole page, giving the
 * warm gallery paper a printed texture. Pure CSS (see globals.css): zero JS,
 * `pointer-events:none`, pinned behind all content (z-index: -1). Kept subtle —
 * texture, not decoration.
 */
export function Atmosphere() {
  return (
    <div className="atmosphere" aria-hidden="true">
      <div className="paper-grain" />
    </div>
  );
}
