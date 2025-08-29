import React from "react";
import { motion } from "framer-motion";

const DEFAULT_TILES = [
  { title: "Java",        src: "/icons/java.png",        labelPos: "top" },
  { title: "Spring Boot", src: "/icons/spring-boot.png", labelPos: "bottom" },
  { title: "Database",    src: "/icons/database.png",  labelPos: "bottom" },
  { title: "Cloud",       src: "/icons/cloud.png",       labelPos: "top" },
];

export default function HeroTechGrid({ items = DEFAULT_TILES }) {
  return (
    // IMPORTANT: uses the same parent grid classes your Hero already has
    <div className="absolute inset-6 grid grid-cols-2 gap-3">
      {items.map((t, i) => (
        <motion.div
          key={`${t.title}-${i}`}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5, delay: i * 0.05 }}
          whileHover={{ y: -6 }}
          className="relative rounded-2xl border border-white/10 bg-white/5 p-4 text-zinc-200"
        >
          <span
            className={`absolute left-4 z-10 font-semibold drop-shadow-sm text-white ${
              t.labelPos === "bottom" ? "bottom-3" : "top-3"
            }`}
          >
            {t.title}
          </span>

          {/* Square canvas; PNG stays contained & centered */}
          <div className="mx-auto aspect-square w-full">
            <img
              src={t.src}
              alt={t.title}
              loading="lazy"
              className="block h-full w-full object-contain object-center"
              onError={(e) => {
                e.currentTarget.src =
                  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256"><rect width="100%" height="100%" fill="%231b1b1f"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%238b8b90" font-size="18" font-family="sans-serif">icon</text></svg>';
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
