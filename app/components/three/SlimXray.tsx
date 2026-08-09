"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────────────
   BWT Slim 4 — photographic stage highlight.

   Uses the official BWT studio render rather than modelled geometry: the
   product is dimmed, and the part that performs the active stage lifts to
   full brightness behind a pink halo, framed by a technical callout.
   ───────────────────────────────────────────────────────────────────────── */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const SRC = "/images/products/slim-4-cutout.webp";

/** left / top / width / height in % of the product image box. */
type Zone = { l: number; t: number; w: number; h: number };

/* Measured on the official BWT studio render (BWT_Pure_Slim_4_0221).
   Cartridge identity comes from the printed collars: SLIM-C = carbon on the
   left, SLIM-RS = resin softener on the right, 103 in the middle. */
const ZONES: Zone[] = [
  { l: 2, t: 2, w: 83, h: 44 }, // 01 механика — head unit, 5 µm inlet stage
  { l: 14.5, t: 48, w: 23.5, h: 51 }, // 02 уголь — SLIM-C cartridge
  { l: 67.5, t: 44, w: 17, h: 55 }, // 03 умягчение — SLIM-RS cartridge
  { l: 38, t: 48, w: 29.5, h: 51 }, // 04 UF-мембрана — centre cartridge (103)
  { l: 70, t: 21, w: 15, h: 13 }, // 05 магний — hard-water nameplate
  { l: 14.5, t: 88, w: 70, h: 11 }, // 06 полировка — outlet collars
];

export default function SlimXray({ active }: { active: number }) {
  const reduced = useReducedMotion();
  const i = Math.min(Math.max(active, 0), ZONES.length - 1);
  const z = ZONES[i];

  // clip-path inset() takes distances from each edge, with a little bleed so
  // the reveal edge never cuts through the highlighted part.
  const bleed = 1.2;
  const inset = `inset(${Math.max(z.t - bleed, 0)}% ${Math.max(100 - (z.l + z.w) - bleed, 0)}% ${Math.max(100 - (z.t + z.h) - bleed, 0)}% ${Math.max(z.l - bleed, 0)}%)`;

  const dur = reduced ? 0 : 0.75;

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative aspect-[820/1503] h-full max-h-[78vh]">
        {/* soft brand glow behind the product */}
        <div className="pointer-events-none absolute inset-[-12%] -z-10 blur-3xl">
          <div className="absolute left-[15%] top-[18%] h-[55%] w-[65%] rounded-full bg-bwt-gold/20" />
          <div className="absolute bottom-[8%] right-[10%] h-[40%] w-[45%] rounded-full bg-bwt-aqua/10" />
        </div>

        {/* dimmed product */}
        <Image
          src={SRC}
          alt="BWT Slim 4 — система фильтрации питьевой воды"
          fill
          sizes="(max-width: 1024px) 70vw, 420px"
          className="object-contain brightness-[0.72] saturate-[0.85]"
        />

        {/* pink light pooling on the active part */}
        <motion.div
          className="pointer-events-none absolute rounded-2xl bg-bwt-gold/20 blur-2xl"
          initial={false}
          animate={{ left: `${z.l - 4}%`, top: `${z.t - 3}%`, width: `${z.w + 8}%`, height: `${z.h + 6}%` }}
          transition={{ duration: dur, ease: EASE }}
        />

        {/* full-brightness reveal of the active part */}
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{ clipPath: inset }}
          transition={{ duration: dur, ease: EASE }}
        >
          <Image
            src={SRC}
            alt=""
            aria-hidden="true"
            fill
            sizes="(max-width: 1024px) 70vw, 420px"
            className="object-contain"
          />
        </motion.div>

        {/* frame + stage number + callout line toward the copy column */}
        <motion.div
          className="pointer-events-none absolute rounded-lg border border-bwt-gold/80"
          initial={false}
          animate={{ left: `${z.l}%`, top: `${z.t}%`, width: `${z.w}%`, height: `${z.h}%` }}
          transition={{ duration: dur, ease: EASE }}
        >
          {/* corner ticks read as a technical callout rather than a plain box */}
          {[
            "left-0 top-0 border-l-2 border-t-2",
            "right-0 top-0 border-r-2 border-t-2",
            "left-0 bottom-0 border-l-2 border-b-2",
            "right-0 bottom-0 border-r-2 border-b-2",
          ].map((cls) => (
            <span key={cls} className={`absolute h-3.5 w-3.5 border-bwt-gold ${cls}`} />
          ))}

          <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-bwt-gold px-2 py-[3px] font-sans text-[0.6rem] font-bold leading-none tracking-wider text-bwt-navy-dark">
            {String(i + 1).padStart(2, "0")}
          </span>

          <span className="absolute right-0 top-1/2 h-px w-[38%] translate-x-full bg-gradient-to-r from-bwt-gold to-transparent" />
          <span className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 translate-x-[calc(38%+100%)] rounded-full bg-bwt-gold" />
        </motion.div>
      </div>
    </div>
  );
}
