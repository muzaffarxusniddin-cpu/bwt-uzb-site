"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useInView, useReducedMotion } from "framer-motion";

/* Heavy WebGL bundle — never server-rendered, only fetched when the section
   is about to enter the viewport, and only on pointer/large screens. */
const SlimScene = dynamic(() => import("./SlimScene"), { ssr: false });

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
}: {
  active: number;
  /** Rendered instead of the canvas when 3D is unavailable or unwanted. */
  fallback: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "200px" });
  const reduced = useReducedMotion();
  const [ok, setOk] = useState<boolean | null>(null);

  useEffect(() => {
    // Skip 3D on reduced-motion, coarse pointers (phones/tablets) and no-WebGL.
    if (reduced) return setOk(false);
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const small = window.matchMedia("(max-width: 1023px)").matches;
    setOk(!coarse && !small && webglAvailable());
  }, [reduced]);

  return (
    <div ref={ref} className="h-full w-full">
      {ok ? <SlimScene active={active} paused={!inView} /> : ok === false ? fallback : null}
    </div>
  );
}
