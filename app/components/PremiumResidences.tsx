"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
  type Variants,
} from "framer-motion";
import { useTranslations } from "next-intl";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const VIEWPORT = { once: true, margin: "-80px" } as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const listContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};

const rowItem: Variants = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE } },
};

// Proper names — not translated.
const RESIDENCES = [
  "NestOne", "Piramit", "NRG Voha", "NRG Mirzo Ulugbek",
  "NRG Hayot", "Mirabad Avenue", "Modera Towers", "NRG Park",
  "KISLOROD · Murad Buildings", "Golden House", "NRG Oybek",
];

function Counter() {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (inView) {
      const controls = animate(count, 1200, { duration: 1.8, ease: EASE });
      return () => controls.stop();
    }
  }, [inView, count]);

  return (
    <span ref={ref} className="font-serif text-7xl text-bwt-charcoal lg:text-9xl">
      <motion.span>{rounded}</motion.span>+
    </span>
  );
}

export default function PremiumResidences() {
  const t = useTranslations("residences");

  return (
    <section className="bg-bwt-ivory py-20 lg:py-40">
      <div className="mx-auto max-w-[1100px] px-6 lg:px-16">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="text-center font-sans text-xs font-medium uppercase tracking-[0.25em] text-bwt-gold"
        >
          {t("eyebrow")}
        </motion.p>

        <div className="mt-6 text-center">
          <Counter />
          <p className="mt-4 font-serif text-2xl text-bwt-graphite lg:text-3xl">{t("countSuffix")}</p>
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mt-12 rounded-card border border-bwt-silver/60 bg-white p-8 lg:mt-20 lg:p-12"
        >
          <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-bwt-graphite">
            {t("listTitle")}
          </h3>
          <motion.ol
            variants={listContainer}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="mt-6 grid grid-cols-1 gap-x-12 gap-y-1 sm:grid-cols-2"
          >
            {RESIDENCES.map((name, i) => (
              <motion.li
                key={name}
                variants={rowItem}
                className="group flex items-center gap-4 border-b border-bwt-silver/40 py-3"
              >
                <span className="font-serif text-sm text-bwt-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-sans text-base text-bwt-charcoal">
                  <span className="bg-gradient-to-r from-bwt-gold to-bwt-gold bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">
                    {name}
                  </span>
                </span>
              </motion.li>
            ))}
          </motion.ol>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mt-8 text-center"
        >
          <span className="inline-block rounded-full border border-bwt-gold/40 bg-bwt-cream px-6 py-3 font-sans text-sm font-medium text-bwt-charcoal">
            {t("homes")}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
