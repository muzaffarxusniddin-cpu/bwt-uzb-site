"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { imageBlurs } from "@/lib/image-blurs";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const VIEWPORT = { once: true, margin: "-80px" } as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const gridContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const cardItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function ServiceGuarantees() {
  const t = useTranslations("service");
  const items = t.raw("items") as { title: string; text: string }[];

  return (
    <section className="bg-bwt-navy py-20 text-bwt-ivory lg:py-40">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-16">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mb-6 font-sans text-xs font-medium uppercase tracking-[0.25em] text-bwt-gold"
        >
          {t("eyebrow")}
        </motion.p>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="max-w-[720px] font-serif text-4xl font-normal leading-[1.1] text-bwt-ivory sm:text-5xl lg:text-6xl"
        >
          {t("title")}
        </motion.h2>

        <motion.div
          variants={gridContainer}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-card border border-white/10 bg-white/5 sm:grid-cols-2 lg:mt-20"
        >
          {items.map((it, i) => (
            <motion.div key={it.title} variants={cardItem} className="group relative bg-bwt-navy p-8 lg:p-10">
              <motion.span
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
                className="absolute left-0 top-0 h-full w-0.5 origin-top bg-bwt-gold"
              />
              <span className="font-serif text-6xl text-bwt-gold lg:text-7xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 font-sans text-sm font-semibold uppercase tracking-[0.15em] text-bwt-ivory">
                {it.title}
              </h3>
              <p className="mt-3 max-w-sm font-sans text-base leading-relaxed text-bwt-ivory/70">
                {it.text}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="relative mt-12 aspect-[16/7] overflow-hidden rounded-card lg:mt-16"
        >
          <Image
            src="/images/installations/delivery-installation-team.jpg"
            alt="Доставка и установка системы BWT по всему Узбекистану"
            fill
            sizes="(max-width: 1440px) 100vw, 1280px"
            placeholder="blur"
            blurDataURL={imageBlurs.delivery}
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bwt-navy/70 via-transparent to-transparent" />
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mt-14 text-center font-serif text-xl italic text-bwt-gold lg:mt-20 lg:text-2xl"
        >
          {t("closer")}
        </motion.p>
      </div>
    </section>
  );
}
