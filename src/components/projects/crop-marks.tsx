/**
 * CropMarks — thin cobalt print registration / crop marks at the four corners
 * of its positioned parent. This is the site's signature device: it ties the
 * "broadcast / print" idea together and breaks the cream-serif AI-default look.
 *
 * Drop it inside any `position: relative` container. Purely decorative
 * (aria-hidden, pointer-events:none).
 */
export function CropMarks({
  /** How far the marks sit outside the parent's edges, in px. */
  offset = -6,
  /** Arm length of each corner mark, in px. */
  length = 16,
  className = "",
}: {
  offset?: number;
  length?: number;
  className?: string;
}) {
  const box = { width: length, height: length } as const;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
    >
      <span
        className="absolute border-l border-t border-cobalt"
        style={{ ...box, top: offset, left: offset }}
      />
      <span
        className="absolute border-r border-t border-cobalt"
        style={{ ...box, top: offset, right: offset }}
      />
      <span
        className="absolute border-b border-l border-cobalt"
        style={{ ...box, bottom: offset, left: offset }}
      />
      <span
        className="absolute border-b border-r border-cobalt"
        style={{ ...box, bottom: offset, right: offset }}
      />
    </div>
  );
}
