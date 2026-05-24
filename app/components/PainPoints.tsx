"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import {
  ShowerHead,
  Sparkles,
  WashingMachine,
  Coffee,
  HeartPulse,
  Coins,
  type LucideIcon,
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { imageBlurs } from "@/lib/image-blurs";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const VIEWPORT = { once: true, margin: "-80px" } as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const cardsContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const cardItem: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: EASE } },
};

const ICONS: LucideIcon[] = [ShowerHead, Sparkles, WashingMachine, Coffee, HeartPulse, Coins];

// All six pain points use a real photo behind a navy overlay.
const CARD_IMAGES: Record<number, { src: string; key: keyof typeof imageBlurs; alt: string }> = {
  0: { src: "/images/lifestyle/kids-drinking-water.jpg", key: "kids", alt: "Дети пьют чистую воду дома" },
  1: { src: "/images/pain_points/volosy.webp", key: "volosy", alt: "Кожа и волосы после душа" },
  2: { src: "/images/pain_points/limescale-kettle-interior.jpg", key: "limescale", alt: "Накипь внутри чайника от жёсткой воды" },
  3: { src: "/images/pain_points/vkus.webp", key: "vkus", alt: "Стакан чистой воды" },
  4: { src: "/images/pain_points/roditeli.webp", key: "roditeli", alt: "Здоровье семьи — чистая вода каждый день" },
  5: { src: "/images/pain_points/vremya.webp", key: "vremya", alt: "Комфорт и экономия дома" },
};

export default function PainPoints() {
  const t = useTranslations("painPoints");
  const locale = useLocale();
  const cards = t.raw("cards") as { title: string; text: string }[];

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

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mt-6 max-w-[540px] font-sans text-lg leading-relaxed text-bwt-ivory/70"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          variants={cardsContainer}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mt-12 grid grid-cols-2 gap-4 lg:mt-20 lg:grid-cols-3 lg:gap-6"
        >
          {cards.map((c, i) => {
            const Icon = ICONS[i];
            const img = CARD_IMAGES[i];
            return (
              <motion.div
                key={c.title}
                variants={cardItem}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="group relative flex h-full flex-col overflow-hidden rounded-card border border-bwt-gold/15 bg-white/[0.04] p-6 transition-colors duration-300 hover:bg-white/[0.07] lg:p-8"
              >
                {img && (
                  <>
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 1024px) 50vw, 33vw"
                      placeholder="blur"
                      blurDataURL={imageBlurs[img.key]}
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bwt-navy via-bwt-navy/85 to-bwt-navy/65" />
                  </>
                )}
                <Icon
                  className="relative h-8 w-8 text-bwt-gold transition-[filter] duration-300 group-hover:drop-shadow-[0_0_14px_rgba(201,169,97,0.55)]"
                  strokeWidth={1.5}
                />
                <h3 className="relative mt-8 font-sans text-sm font-semibold uppercase tracking-wider text-bwt-ivory">
                  {c.title}
                </h3>
                <p className="relative mt-3 font-sans text-sm leading-relaxed text-bwt-ivory/70">
                  {c.text}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {locale === "uz" && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="mx-auto mt-14 max-w-[680px] text-center lg:mt-20"
          >
            <p className="font-sans text-sm font-semibold uppercase tracking-[0.2em] text-bwt-gold">
              {t("accentTitle")}
            </p>
            <p className="mt-3 font-serif text-xl italic text-bwt-ivory/80 lg:text-2xl">
              {t("accentBody")}
            </p>
          </motion.div>
        )}

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mx-auto mt-10 max-w-[680px] text-center font-serif text-xl italic text-bwt-gold lg:mt-12 lg:text-2xl"
        >
          {t("closer")}
        </motion.p>
      </div>
    </section>
  );
}
