"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import styles from "./promo.module.css";

type Review = {
  id: string;
  name: string;
  role: string;
  caption: string;
  short: boolean;
};

type Copy = {
  eyebrow: string;
  titleA: string;
  titleAccent: string;
  titleB: string;
  watch: string;
  close: string;
};

type Props = {
  reviews: ReadonlyArray<Review>;
  copy: Copy;
};

const YT_THUMB = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
const YT_EMBED = (id: string) =>
  `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;

export default function PromoReviews({ reviews, copy }: Props) {
  const [active, setActive] = useState<string | null>(null);

  const open = useCallback((id: string) => setActive(id), []);
  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [active, close]);

  return (
    <section id="reviews" className={styles.reviews}>
      <div className={styles.container}>
        <div className={styles.reviewsHeader}>
          <div className={styles.eyebrow}>{copy.eyebrow}</div>
          <h2>
            {copy.titleA}{" "}
            <span className={styles.serif} style={{ color: "var(--bwt-pink)" }}>
              {copy.titleAccent}
            </span>{" "}
            {copy.titleB}
          </h2>
        </div>

        <div className={styles.reviewsGrid}>
          {reviews.map((r) => (
            <article
              key={r.id}
              className={`${styles.reviewCard} ${r.short ? styles.reviewShort : ""}`}
            >
              <button
                type="button"
                onClick={() => open(r.id)}
                className={styles.reviewThumb}
                aria-label={`${copy.watch} — ${r.name}`}
              >
                <Image
                  src={YT_THUMB(r.id)}
                  alt={r.caption}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                  unoptimized
                />
                <span className={styles.reviewPlay} aria-hidden>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </button>
              <div className={styles.reviewBody}>
                <div className={styles.reviewName}>{r.name}</div>
                <div className={styles.reviewRole}>{r.role}</div>
                <p className={styles.reviewCaption}>{r.caption}</p>
                <button
                  type="button"
                  onClick={() => open(r.id)}
                  className={`${styles.btn} ${styles.btnPrimary} ${styles.reviewCta}`}
                >
                  {copy.watch}
                  <svg
                    className={styles.arrow}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    aria-hidden
                  >
                    <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {active && (
        <div
          className={styles.reviewModal}
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <div
            className={`${styles.reviewModalInner} ${
              reviews.find((r) => r.id === active)?.short ? styles.reviewModalShort : ""
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
              className={styles.reviewModalClose}
              aria-label={copy.close}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
            <div className={styles.reviewModalFrame}>
              <iframe
                src={YT_EMBED(active)}
                title="YouTube review"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
