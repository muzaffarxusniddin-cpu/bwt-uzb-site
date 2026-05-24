"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { ERP_API } from "@/lib/config";

const MODEL_NAME: Record<string, string> = { slim2: "BWT Slim 2", slim3: "BWT Slim 3", slim4: "BWT Slim 4" };
// Calculator region index → requestPage.regions index (regions array has the same order in RU/UZ).
const CALC_REGION_TO_REQUEST = [0, 1, 5, 10, 11];

export default function RequestClient() {
  const t = useTranslations("requestPage");
  const tl = useTranslations("lineup");
  const regions = t.raw("regions") as string[];
  const methods = t.raw("methods") as string[];
  const needsList = tl.raw("needs") as string[];
  const quizGoals = t.raw("quizGoals") as Record<string, string>;

  const params = useSearchParams();
  const productSku = params.get("sku") ?? undefined;
  const productName = params.get("name") ?? undefined;

  // From the homepage calculator quiz (?model=&region=&needs=)
  const modelParam = params.get("model");
  const quizModel = modelParam && MODEL_NAME[modelParam] ? MODEL_NAME[modelParam] : null;
  const quizGoal = modelParam && quizGoals[modelParam] ? quizGoals[modelParam] : null;
  const selectedNeeds = (params.get("needs") ?? "")
    .split(",")
    .map(Number)
    .filter((n) => !isNaN(n) && needsList[n]);
  const interestName = quizModel ?? productName;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [region, setRegion] = useState(() => {
    const ri = CALC_REGION_TO_REQUEST[Number(params.get("region"))];
    return ri != null && regions[ri] ? regions[ri] : regions[0];
  });
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
          city: region,
          productSku,
          productInterest: interestName,
          message: `Бесплатный анализ воды. Способ связи: ${method}.${
            interestName ? ` Интересует: ${interestName}.` : ""
          }${selectedNeeds.length ? ` Приоритеты: ${selectedNeeds.map((n) => needsList[n]).join(", ")}.` : ""}`,
        }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || `HTTP ${res.status}`);
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

  if (done) {
    return (
      <div className="mt-10 rounded-card border border-bwt-gold/30 bg-white/[0.04] p-10 text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-bwt-gold" strokeWidth={1.5} />
        <h3 className="mt-4 font-serif text-2xl text-bwt-ivory">{t("successTitle")}</h3>
        <p className="mt-2 font-sans text-bwt-ivory/70">{t("successText")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mx-auto mt-10 max-w-[520px] space-y-6">
      {quizModel ? (
        <div className="rounded-btn border border-bwt-gold/30 bg-bwt-gold/[0.08] px-4 py-3 font-sans text-sm leading-relaxed text-bwt-ivory/85">
          {t("quizBannerPrefix")}{" "}
          <span className="font-semibold text-bwt-gold">{quizModel}</span>
          {quizGoal ? ` — ${quizGoal}` : ""}. {t("quizBannerSuffix")}
        </div>
      ) : productName ? (
        <p className="rounded-btn bg-white/5 px-4 py-3 font-sans text-sm text-bwt-ivory/80">
          {t("interested")} <span className="text-bwt-gold">{productName}</span>
        </p>
      ) : null}
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
      <select
        className={`${inputCls} [&>option]:text-bwt-charcoal`}
        value={region}
        onChange={(e) => setRegion(e.target.value)}
      >
        {regions.map((r) => (
          <option key={r} value={r}>{r}</option>
        ))}
      </select>
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
        {sending ? <><Loader2 className="h-5 w-5 animate-spin" /> …</> : t("submit")}
      </button>
      <p className="text-center font-sans text-xs text-bwt-ivory/50">{t("reassurance")}</p>
    </form>
  );
}
