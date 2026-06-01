"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./promo.module.css";

type PopupCopy = {
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  close: string;
};

type Props = {
  popup: PopupCopy;
  /** Anchor href on the popup CTA — scrolls to the offer form. */
  ctaHref: string;
};

/**
 * Client-side polish for /promo:
 *   • scroll progress bar
 *   • intersection-observer fade-in for elements tagged with `.fadeIn`
 *   • 30-sec / exit-intent popup (once per session)
 */
export default function PromoEnhancements({ popup, ctaHref }: Props) {
  const [progress, setProgress] = useState(0);
  const [popupOpen, setPopupOpen] = useState(false);
  // Track in a ref to avoid setState-in-effect lint and re-renders we don't need.
  const popupShownRef = useRef(false);

  // Scroll progress
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const denom = h.scrollHeight - h.clientHeight;
      const pct = denom > 0 ? (h.scrollTop / denom) * 100 : 0;
      setProgress(pct);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fade-in on scroll
  useEffect(() => {
    const targets = document.querySelectorAll(`.${styles.fadeIn}`);
    if (!targets.length) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      targets.forEach((el) => el.classList.add(styles.visible));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // 30-sec + exit-intent popup (sessionStorage gated)
  useEffect(() => {
    let cancelled = false;
    try {
      if (sessionStorage.getItem("bwt_promo_popup_shown")) {
        popupShownRef.current = true;
        return;
      }
    } catch {
      // sessionStorage may be unavailable (privacy mode)
    }

    const trigger = () => {
      if (cancelled || popupShownRef.current) return;
      popupShownRef.current = true;
      setPopupOpen(true);
      try {
        sessionStorage.setItem("bwt_promo_popup_shown", "1");
      } catch {
        // ignore
      }
    };

    const timer = window.setTimeout(trigger, 30_000);
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) trigger();
    };
    document.addEventListener("mouseleave", onLeave);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const close = () => setPopupOpen(false);

  return (
    <>
      <div
        className={styles.scrollProgress}
        style={{ width: `${progress}%` }}
        aria-hidden
      />
      <div
        className={`${styles.popupOverlay} ${popupOpen ? styles.show : ""}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        aria-hidden={!popupOpen}
      >
        <div
          className={styles.popup}
          role="dialog"
          aria-modal="true"
          aria-labelledby="promo-popup-title"
        >
          <button
            type="button"
            className={styles.popupClose}
            onClick={close}
            aria-label={popup.close}
          >
            ×
          </button>
          <div className={styles.eyebrow}>{popup.eyebrow}</div>
          <h3 id="promo-popup-title">{popup.title}</h3>
          <p>{popup.body}</p>
          <a
            href={ctaHref}
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={close}
          >
            {popup.cta}
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
          </a>
        </div>
      </div>
    </>
  );
}
