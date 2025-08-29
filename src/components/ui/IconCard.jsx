// src/components/IconCard.jsx
import React from "react";

// tiny inline fallback (so you don't need a file)
const FALLBACK_DATA_URI =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512"><rect width="100%" height="100%" fill="%2326262b"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23999999" font-size="24" font-family="sans-serif">icon</text></svg>';

export default function IconCard({
  title,
  src,
  alt = "",
  className = "",
  href, // optional: make the tile a link
}) {
  const handleError = (e) => { e.currentTarget.src = FALLBACK_DATA_URI; };

  const Card = (
    <div
      className={
        "relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 " +
        className
      }
      aria-label={title}
    >
      {/* square canvas; never overflows */}
      <div className="mx-auto aspect-square w-full max-w-56 sm:max-w-64 md:max-w-72">
        <img
          src={src}
          alt={alt || title}
          loading="lazy"
          onError={handleError}
          className="block h-full w-full object-contain object-center"
        />
      </div>

      <div className="mt-3 text-sm/5 text-white/80">{title}</div>
    </div>
  );

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {Card}
    </a>
  ) : (
    Card
  );
}
