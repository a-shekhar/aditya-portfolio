import React, { forwardRef, useRef } from "react";

/**
 * GlowCard
 * - Exports BOTH: named and default
 * - Works on hover + touch (pointer events)
 * - Light/Dark friendly — the glow layer is visual only
 */
function InnerGlowCard({ className = "", style, children, ...rest }, ref) {
  const rafRef = useRef(0);

  const setGlow = (el, on) => el?.style.setProperty("--glow", on ? 1 : 0);

  const updateGlow = (el, e, force = false) => {
    if (!el) return;
    const prev = rafRef.current;
    if (prev) cancelAnimationFrame(prev);

    rafRef.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const cx = (e.clientX ?? e.touches?.[0]?.clientX ?? 0) - rect.left;
      const cy = (e.clientY ?? e.touches?.[0]?.clientY ?? 0) - rect.top;
      el.style.setProperty("--x", `${cx}px`);
      el.style.setProperty("--y", `${cy}px`);
      if (force) setGlow(el, true);
    });
  };

  return (
    <div
      ref={ref}
      className={className}
      {...rest}
      onPointerMove={(e) => updateGlow(e.currentTarget, e)}
      onPointerEnter={(e) => setGlow(e.currentTarget, true)}
      onPointerLeave={(e) => setGlow(e.currentTarget, false)}
      onPointerDown={(e) => updateGlow(e.currentTarget, e, true)}
      onPointerUp={(e) => setGlow(e.currentTarget, false)}
      onPointerCancel={(e) => setGlow(e.currentTarget, false)}
      // keep existing style props but ensure --glow default is 0
      style={{ "--glow": 0, ...style }}
    >
      {/* glow overlay (hover/touch) */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: "var(--glow)",
          background:
            "radial-gradient(520px circle at var(--x,50%) var(--y,50%), rgba(168,85,247,0.18), transparent 40%)",
        }}
      />
      {/* content above overlay */}
      <div className="relative">{children}</div>
    </div>
  );
}

export const GlowCard = forwardRef(InnerGlowCard);
export default GlowCard;
