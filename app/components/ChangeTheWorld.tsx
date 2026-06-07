"use client";

import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const VIEWPORT = { once: true, margin: "-80px" } as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function ChangeTheWorld() {
  const t = useTranslations("changeWorld");
  const stats = t.raw("stats") as { num: string; label: string }[];

  return (
    <section className="bg-bwt-navy py-20 text-bwt-ivory lg:py-32">
      <div className="mx-auto max-w-[1100px] px-6 lg:px-16">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="max-w-[760px]"
        >
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-bwt-gold">{t("eyebrow")}</p>
          <h2 className="mt-5 font-serif text-3xl font-normal leading-[1.15] lg:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-6 font-sans text-lg leading-relaxed text-bwt-ivory/70">{t("lead")}</p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:mt-16"
        >
          {stats.map((s) => (
            <div key={s.label} className="border-l-2 border-bwt-gold/40 pl-6">
              <div className="font-serif text-5xl text-bwt-gold lg:text-6xl">{s.num}</div>
              <p className="mt-2 font-sans text-sm uppercase tracking-wider text-bwt-ivory/65">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mt-12 flex flex-col items-start gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex flex-wrap gap-4">
            <a
              href="https://www.aquapearls.org/en/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-btn border border-bwt-gold/40 px-6 py-3 font-sans text-sm font-semibold uppercase tracking-wider text-bwt-ivory transition-colors hover:border-bwt-gold hover:text-bwt-gold"
            >
              {t("linkProject")} <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="https://ewater.services/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-btn border border-bwt-ivory/20 px-6 py-3 font-sans text-sm font-semibold uppercase tracking-wider text-bwt-ivory/80 transition-colors hover:border-bwt-gold hover:text-bwt-gold"
            >
              {t("linkMonitor")} <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <p className="shrink-0 font-serif text-lg italic text-bwt-gold">{t("brandLine")}</p>
        </motion.div>
      </div>
    </section>
  );
}
