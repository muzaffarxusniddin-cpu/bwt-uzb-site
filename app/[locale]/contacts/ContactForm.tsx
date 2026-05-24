"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { ERP_API } from "@/lib/config";

export default function ContactForm() {
  const t = useTranslations("contactsPage");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError(t("formError"));
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
          message: message.trim()
            ? `Сообщение со страницы контактов: ${message}`
            : "Заявка со страницы контактов.",
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
      <div className="rounded-card border border-bwt-gold/30 bg-white/[0.04] p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-bwt-gold" strokeWidth={1.5} />
        <h3 className="mt-4 font-serif text-xl text-bwt-ivory">{t("formSuccessTitle")}</h3>
        <p className="mt-2 font-sans text-sm text-bwt-ivory/70">{t("formSuccessText")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <input
        className={inputCls}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={t("formName")}
        required
      />
      <input
        className={inputCls}
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder={t("formPhone")}
        type="tel"
        inputMode="tel"
        required
      />
      <textarea
        className={`${inputCls} resize-none`}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={t("formMessage")}
        rows={3}
      />
      {error && <p className="font-sans text-sm text-bwt-danger">{error}</p>}
      <button
        type="submit"
        disabled={sending}
        className="flex h-14 w-full items-center justify-center gap-2.5 rounded-btn bg-bwt-gold font-sans text-sm font-semibold uppercase tracking-wider text-bwt-navy-dark transition-colors hover:bg-bwt-gold-light disabled:opacity-60"
      >
        {sending ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" /> …
          </>
        ) : (
          t("formSubmit")
        )}
      </button>
    </form>
  );
}
