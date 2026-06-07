"use client";

import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const VIEWPORT = { once: true, margin: "-80px" } as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const gridContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
};

const tileItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

type Stat = { num: string; unit: string; label: string };
type ResObject = { name: string; cat: string };

export default function PremiumResidences() {
  const t = useTranslations("residences");
  const stats = t.raw("stats") as ReadonlyArray<Stat>;
  const objects = t.raw("objects") as ReadonlyArray<ResObject>;

  return (
    <section className="bg-bwt-ivory py-20 lg:py-32">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-16">
        {/* Header */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-bwt-gold"
        >
          {t("eyebrow")}
        </motion.p>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mt-5 max-w-[14ch] font-sans text-4xl font-extrabold leading-[1.05] tracking-tight text-bwt-charcoal lg:text-6xl"
        >
          {t("titleA")}{" "}
          <span className="font-serif text-[1.05em] font-medium italic text-bwt-gold">
            {t("titleAccent")}
          </span>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mt-6 max-w-2xl font-sans text-lg leading-relaxed text-bwt-graphite"
        >
          {t("lead")}
        </motion.p>

        {/* Stat cards */}
        <motion.div
          variants={gridContainer}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4"
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={tileItem}
              className="rounded-card border border-bwt-silver/60 bg-white p-7 shadow-[0_1px_3px_rgba(10,22,40,0.04)] transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(10,22,40,0.08)]"
            >
              <div className="font-sans text-5xl font-extrabold leading-none tracking-tight text-bwt-charcoal lg:text-6xl">
                {s.num}
                <span className="text-2xl font-bold text-bwt-gold lg:text-3xl">{s.unit}</span>
              </div>
              <div className="mt-3 font-sans text-sm leading-snug text-bwt-graphite">
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Objects header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mt-16 flex flex-wrap items-baseline justify-between gap-3 lg:mt-24"
        >
          <h3 className="font-sans text-2xl font-bold tracking-tight text-bwt-charcoal lg:text-3xl">
            {t("objectsTitle")}
          </h3>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-bwt-gold">
            {t("objectsMeta")}
          </span>
        </motion.div>

        {/* Objects grid */}
        <motion.div
          variants={gridContainer}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
        >
          {objects.map((o, i) => (
            <motion.article
              key={o.name}
              variants={tileItem}
              className="group rounded-card border border-bwt-silver/60 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-bwt-gold/50 hover:shadow-[0_8px_24px_rgba(10,22,40,0.08)]"
            >
              <div className="font-mono text-xs tracking-widest text-bwt-gold">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="mt-3 font-sans text-base font-semibold leading-tight text-bwt-charcoal">
                {o.name}
              </div>
              <div className="mt-1 font-sans text-xs text-bwt-graphite/80">{o.cat}</div>
            </motion.article>
          ))}

          {/* Featured dark tile — private homes */}
          <motion.article
            variants={tileItem}
            className="rounded-card bg-bwt-navy p-4 text-white"
          >
            <div className="font-mono text-xs tracking-widest text-bwt-gold">+</div>
            <div className="mt-3 font-sans text-base font-semibold leading-tight">
              {t("moreName")}
            </div>
            <div className="mt-1 font-sans text-xs text-white/60">{t("moreCat")}</div>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}
