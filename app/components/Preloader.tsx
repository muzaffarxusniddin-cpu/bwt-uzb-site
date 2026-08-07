"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Short brand preloader on hard page load: navy screen, BWT logo,
 * pink progress line — then the curtain fades and slides away.
 * Mounted once in the locale layout, so client-side navigation never re-shows it.
 */
export default function Preloader() {
  const reduced = useReducedMotion();
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (reduced) {
      setShow(false);
      return;
    }
    const t = setTimeout(() => setShow(false), 1100);
    return () => clearTimeout(t);
  }, [reduced]);

  if (reduced) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-bwt-navy"
          aria-hidden="true"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <Image
              src="/images/bwt-logo.svg"
              alt=""
              width={150}
              height={51}
              priority
              unoptimized
              style={{ height: "auto", filter: "brightness(0) invert(1)" }}
            />
          </motion.div>
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className="mt-8 block h-0.5 w-40 origin-left bg-bwt-gold"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
