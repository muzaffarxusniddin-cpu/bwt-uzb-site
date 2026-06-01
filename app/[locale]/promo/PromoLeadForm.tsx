"use client";

import { useState } from "react";
import { ERP_API } from "@/lib/config";
import styles from "./promo.module.css";

type FormCopy = {
  formTag: string;
  formTitle: string;
  formSub: string;
  fieldName: string;
  fieldNamePh: string;
  fieldPhone: string;
  fieldPhonePh: string;
  fieldDistrict: string;
  districtPlaceholder: string;
  districts: ReadonlyArray<string>;
  fieldHint: string;
  consent: string;
  submit: string;
  submitSending: string;
  fineprint: string;
  successTitle: string;
  successBody: string;
  successAgain: string;
};

type Props = {
  copy: FormCopy;
  /** Used as a stable identifier so leads from /promo are easy to filter in ERP. */
  source?: string;
};

export default function PromoLeadForm({ copy, source = "promo" }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [district, setDistrict] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError("Введите имя и телефон");
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
          city: district || "Ташкент",
          message: `[${source}] Water Truth Pack · район: ${district || "не указан"}`,
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? `HTTP ${res.status}`);
      }
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSending(false);
    }
  };

  if (done) {
    return (
      <div className={styles.offerForm}>
        <div className={styles.formSuccess}>
          <div className={styles.icon}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
              <path d="M5 12l5 5L20 7" />
            </svg>
          </div>
          <h3>{copy.successTitle}</h3>
          <p>{copy.successBody}</p>
          <button
            type="button"
            onClick={() => {
              setDone(false);
              setName("");
              setPhone("");
              setDistrict("");
            }}
          >
            {copy.successAgain}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className={styles.offerForm} onSubmit={submit} noValidate>
      <div className={styles.offerFormTag}>{copy.formTag}</div>
      <h3>{copy.formTitle}</h3>
      <p className={styles.offerFormSub}>{copy.formSub}</p>

      <div className={styles.formRow}>
        <label htmlFor="promo-name">{copy.fieldName}</label>
        <input
          id="promo-name"
          className={styles.formInput}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={copy.fieldNamePh}
          required
          autoComplete="name"
        />
      </div>

      <div className={styles.formRow}>
        <label htmlFor="promo-phone">{copy.fieldPhone}</label>
        <input
          id="promo-phone"
          className={styles.formInput}
          type="tel"
          inputMode="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={copy.fieldPhonePh}
          required
          autoComplete="tel"
        />
      </div>

      <div className={styles.formRow}>
        <label htmlFor="promo-district">{copy.fieldDistrict}</label>
        <select
          id="promo-district"
          className={styles.formSelect}
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          required
        >
          <option value="">{copy.districtPlaceholder}</option>
          {copy.districts.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        <div className={styles.formHint}>{copy.fieldHint}</div>
      </div>

      <label className={styles.formCheckbox}>
        <input type="checkbox" required />
        <span>{copy.consent}</span>
      </label>

      {error ? <div className={styles.formError}>{error}</div> : null}

      <button type="submit" className={styles.formSubmit} disabled={sending}>
        {sending ? copy.submitSending : copy.submit}
        {!sending ? (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden
          >
            <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : null}
      </button>

      <div className={styles.formFineprint}>{copy.fineprint}</div>

      <div className={styles.formTrustRow}>
        <span className={styles.badge}>TÜV</span>
        <span className={styles.badge}>NSF</span>
        <span className={styles.badge}>ISO 9001</span>
      </div>
    </form>
  );
}
