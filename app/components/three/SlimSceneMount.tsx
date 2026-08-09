"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useInView, useReducedMotion } from "framer-motion";

/* Heavy WebGL bundle — never server-rendered, only fetched when the section
   is about to enter the viewport, and only on pointer/large screens. */
const SlimScene = dynamic(() => import("./SlimScene"), { ssr: false });
const SlimXray = dynamic(() => import("./SlimXray"), { ssr: false });
const FiltrationColumn = dynamic(() => import("./FiltrationColumn"), { ssr: false });

/* The animated schematic ships by default: the owner judged it clearer than
   both a modelled Slim 4 (?viz=3d) and a product photo with zone highlights
   (?viz=photo). Those two stay reachable for comparison. */
type Variant = "schema" | "3d" | "photo";

function pickVariant(): Variant {
  if (typeof window === "undefined") return "schema";
  const q = new URLSearchParams(window.location.search).get("viz");
  return q === "3d" || q === "photo" ? q : "schema";
}

function webglAvailable() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function SlimSceneMount({
  active,
  fallback,
  schema,
}: {
  active: number;
  /** Rendered when nothing richer can run (reduced motion, no WebGL). */
  fallback: React.ReactNode;
  /** Props for the default animated schematic. */
  schema: { stages: { n: string; short: string }[]; waterIn: string; waterOut: string };
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "200px" });
  const reduced = useReducedMotion();
  const [ok, setOk] = useState<boolean | null>(null);
  const [variant, setVariant] = useState<Variant>("schema");

  useEffect(() => {
    // Skip 3D on reduced-motion, coarse pointers (phones/tablets) and no-WebGL.
    if (reduced) return setOk(false);
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const small = window.matchMedia("(max-width: 1023px)").matches;
    const v = pickVariant();
    setVariant(v);
    // Only the WebGL scene needs gating; SVG and photo run anywhere.
    setOk(v === "3d" ? !coarse && !small && webglAvailable() : true);
  }, [reduced]);

  return (
    <div ref={ref} className="h-full w-full">
      {ok ? (
        variant === "photo" ? (
          <SlimXray active={active} />
        ) : variant === "3d" ? (
          <SlimScene active={active} paused={!inView} />
        ) : (
          <FiltrationColumn active={active} {...schema} />
        )
      ) : ok === false ? (
        fallback
      ) : null}
    </div>
  );
}
