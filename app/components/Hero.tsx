"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { imageBlurs } from "@/lib/image-blurs";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const t = useTranslations("hero");
  const tb = useTranslations("buttons");
  const locale = useLocale();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section
      ref={ref}
      className="relative isolate min-h-svh w-full overflow-hidden bg-bwt-navy"
    >
      {/* Layer 1 — animated background (scroll parallax only) */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-20">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 70% 15%, #1b2942 0%, #0a1628 45%, #050b17 100%)",
          }}
        />
        <Image
          src="/images/hero/water-splash-hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={imageBlurs.heroWater}
          className="object-cover object-right"
        />
        <div className="hero-float absolute -top-1/4 right-[-10%] h-[60vh] w-[60vh] rounded-full bg-bwt-aqua/10 blur-[120px]" />
        <div className="hero-float-slow absolute bottom-[-15%] left-[-5%] h-[50vh] w-[50vh] rounded-full bg-bwt-gold/10 blur-[120px]" />
      </motion.div>

      {/* Layer 2a — left block keeps the serif headline legible */}
      <div className="absolute inset-0 bg-gradient-to-r from-bwt-navy from-0% via-bwt-navy/85 via-45% to-bwt-navy/30 to-100%" />

      {/* Layer 2b — bottom darkening under the SCROLL cue */}
      <div className="absolute inset-0 bg-gradient-to-t from-bwt-navy/60 via-transparent to-transparent" />

      {/* Layer 3 — content */}
      <div className="relative z-10 mx-auto flex min-h-svh max-w-[1440px] flex-col justify-center px-6 lg:px-16">
        <motion.div style={{ y: contentY, opacity: contentOpacity }} className="max-w-3xl">
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.p
              variants={fadeUp}
              className="mb-6 font-sans text-xs font-medium uppercase tracking-[0.25em] text-bwt-gold"
            >
              {t("eyebrow")}
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="font-serif text-[3.5rem] font-normal leading-[1.04] text-bwt-ivory sm:text-7xl lg:text-[5.5rem]"
            >
              {t("title")}
            </motion.h1>

            {locale === "uz" && (
              <motion.p
                variants={fadeUp}
                className="mt-5 font-sans text-lg text-bwt-ivory/60 sm:text-xl"
              >
                {t("subtitleRu")}
              </motion.p>
            )}

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xl font-sans text-base leading-relaxed text-bwt-ivory/85 sm:text-lg"
            >
              {t("body")}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center"
            >
              <Link
                href="/request"
                className="group inline-flex items-center gap-2.5 rounded-btn bg-bwt-gold px-7 py-4 font-sans text-sm font-semibold uppercase tracking-wider text-bwt-navy-dark transition-colors hover:bg-bwt-gold-light"
              >
                {tb("selectSystem")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="#lead"
                className="group inline-flex items-center gap-2 font-sans text-sm font-medium uppercase tracking-wider text-bwt-gold transition-colors hover:text-bwt-gold-light"
              >
                {tb("freeAnalysis")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-3 text-bwt-ivory/50">
          <span className="font-sans text-[0.65rem] uppercase tracking-[0.3em]">
            {t("scroll")}
          </span>
          <span className="hero-scroll-cue block h-10 w-px bg-gradient-to-b from-bwt-gold to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
