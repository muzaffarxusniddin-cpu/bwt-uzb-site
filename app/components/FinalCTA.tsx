"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { CheckCircle2, Loader2, Phone, Send, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { BRAND, ERP_API } from "@/lib/config";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const VIEWPORT = { once: true, margin: "-80px" } as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const waHref = `https://wa.me/${BRAND.phoneHref.replace(/[^0-9]/g, "")}`;

export default function FinalCTA() {
  const t = useTranslations("finalCta");
  const methods = t.raw("methods") as string[];

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [method, setMethod] = useState<string>(methods[0]);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError(t("error"));
      return;
    }
    setSending(true);
    setError(null);
    try {
      const res = await fetch(`${ERP_API}/api/public/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          message: `Бесплатный анализ воды. Удобный способ связи: ${method}.`,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `HTTP ${res.status}`);
      }
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSending(false);
    }
  };

  const inputCls =
    "w-full border-b border-bwt-ivory/30 bg-transparent py-3 font-sans text-base text-bwt-ivory placeholder:text-bwt-ivory/40 focus:border-bwt-gold focus:outline-none transition-colors";

  return (
    <section id="lead" className="relative overflow-hidden bg-bwt-navy py-20 lg:py-40">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="hero-float absolute -right-20 top-0 h-[60vh] w-[60vh] rounded-full bg-bwt-aqua/5 blur-[120px]" />
        <div className="hero-float-slow absolute -left-20 bottom-0 h-[50vh] w-[50vh] rounded-full bg-bwt-gold/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-[720px] px-6 lg:px-16">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="text-center font-serif text-4xl font-normal leading-[1.1] text-bwt-ivory sm:text-5xl"
        >
          {t("title")}
        </motion.h2>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mx-auto mt-6 max-w-[540px] text-center font-sans text-lg leading-relaxed text-bwt-ivory/75"
        >
          {t("subtitle")}
        </motion.p>

        {done ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="mt-12 rounded-card border border-bwt-gold/30 bg-white/[0.04] p-10 text-center"
          >
            <CheckCircle2 className="mx-auto h-14 w-14 text-bwt-gold" strokeWidth={1.5} />
            <h3 className="mt-4 font-serif text-2xl text-bwt-ivory">{t("successTitle")}</h3>
            <p className="mt-2 font-sans text-bwt-ivory/70">{t("successText")}</p>
          </motion.div>
        ) : (
          <motion.form
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            onSubmit={submit}
            className="mx-auto mt-12 max-w-[520px] space-y-6"
          >
            <input
              className={inputCls}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("namePlaceholder")}
              required
            />
            <input
              className={inputCls}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t("phonePlaceholder")}
              type="tel"
              inputMode="tel"
              required
            />
            <div className="flex flex-wrap gap-3 pt-2">
              {methods.map((m) => (
                <button
                  type="button"
                  key={m}
                  onClick={() => setMethod(m)}
                  className={`rounded-btn border px-5 py-2.5 font-sans text-sm transition-colors ${
                    method === m
                      ? "border-bwt-gold bg-bwt-gold/15 text-bwt-gold"
                      : "border-bwt-ivory/25 text-bwt-ivory/70 hover:border-bwt-ivory/50"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            {error && <p className="font-sans text-sm text-bwt-danger">{error}</p>}

            <button
              type="submit"
              disabled={sending}
              className="flex h-14 w-full items-center justify-center gap-2.5 rounded-btn bg-bwt-gold font-sans text-sm font-semibold uppercase tracking-wider text-bwt-navy-dark transition-colors hover:bg-bwt-gold-light disabled:opacity-60"
            >
              {sending ? (
                <><Loader2 className="h-5 w-5 animate-spin" /> …</>
              ) : (
                t("submit")
              )}
            </button>
            <p className="text-center font-sans text-xs text-bwt-ivory/50">{t("reassurance")}</p>
          </motion.form>
        )}

        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <a href={BRAND.phoneHref} className="inline-flex items-center gap-2 font-sans text-sm text-bwt-ivory/80 transition-colors hover:text-bwt-gold">
            <Phone className="h-4 w-4 text-bwt-gold" /> {BRAND.phone}
          </a>
          <a href={BRAND.telegram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-sans text-sm text-bwt-ivory/80 transition-colors hover:text-bwt-gold">
            <Send className="h-4 w-4 text-bwt-gold" /> {BRAND.telegramHandle}
          </a>
          <a href={waHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-sans text-sm text-bwt-ivory/80 transition-colors hover:text-bwt-gold">
            <MessageCircle className="h-4 w-4 text-bwt-gold" /> WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
