"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Animated number counter (КП-style stat tiles).
 * Accepts formatted strings like "1200", "10 000", "90+", "5★", "0.01" —
 * the numeric part counts up on first view, any suffix stays static.
 */
export default function CountUp({
  value,
  duration = 1.4,
  className,
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();

  const m = value.match(/^([\d\s.,  ]*\d)(.*)$/);
  const numRaw = m?.[1] ?? "";
  const suffix = m?.[2] ?? "";
  const clean = numRaw.replace(/[\s  ]/g, "").replace(",", ".");
  const target = parseFloat(clean);
  const decimals = clean.includes(".") ? (clean.split(".")[1]?.length ?? 0) : 0;
  const grouped = /[\s  ]/.test(numRaw);

  const fmt = (v: number) => {
    let s = decimals ? v.toFixed(decimals) : String(Math.round(v));
    if (grouped) s = s.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return s;
  };

  const [text, setText] = useState(() => (isNaN(target) ? value : fmt(0) + suffix));

  useEffect(() => {
    if (isNaN(target)) return;
    if (!inView) return;
    if (reduced) {
      setText(fmt(target) + suffix);
      return;
    }
    const ctrl = animate(0, target, {
      duration,
      ease: EASE,
      onUpdate: (v) => setText(fmt(v) + suffix),
    });
    return () => ctrl.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduced, target, suffix, duration]);

  if (isNaN(target)) return <span className={className}>{value}</span>;

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}
