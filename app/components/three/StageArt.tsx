"use client";

import { STAGE_ANIMATIONS } from "./StageAnimations";

/**
 * Single stage illustration by index — a thin wrapper so the 35 KB
 * animation module can be code-split with next/dynamic on mobile,
 * where the full filtration column never mounts.
 */
export default function StageArt({ index }: { index: number }) {
  const Art = STAGE_ANIMATIONS[Math.min(index, STAGE_ANIMATIONS.length - 1)];
  return <Art />;
}
