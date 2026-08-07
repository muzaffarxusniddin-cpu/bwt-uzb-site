"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Word-by-word text reveal (premium heading animation).
 * Each word slides up from behind an overflow mask with a small stagger.
 * Uses an explicit useInView + animate prop so it works reliably even
 * when nested inside parents that drive their own variants.
 */
export default function RevealText({
  text,
  className,
  delay = 0,
  stagger = 0.045,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) return <span className={className}>{text}</span>;

  return (
    <span ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]"
          aria-hidden="true"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "115%" }}
            animate={inView ? { y: 0 } : { y: "115%" }}
            transition={{ duration: 0.65, delay: delay + i * stagger, ease: EASE }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
