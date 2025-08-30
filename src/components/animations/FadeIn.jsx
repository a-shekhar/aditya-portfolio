import React from "react";
import { motion } from "framer-motion";

/**
 * Usage:
 * <FadeIn>
 *   <h2>Let’s build something</h2>
 *   <p>Reach out for roles...</p>
 * </FadeIn>
 *
 * Props (all optional):
 * - as:      element/component to render (default: 'div')
 * - y:       initial translateY (default: 16)
 * - duration:animation duration (default: 0.5)
 * - delay:   animation delay (default: 0)
 * - once:    animate only the first time in view (default: true)
 * - amount:  viewport threshold (default: 0.2)
 */
export default function FadeIn({
  as = "div",
  children,
  className = "",
  y = 16,
  duration = 0.5,
  delay = 0,
  once = true,
  amount = 0.2,
}) {
  const MotionTag = motion(as);

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay }}
    >
      {children}
    </MotionTag>
  );
}
