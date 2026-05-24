"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

const LOCALES = [
  { code: "ru", label: "RU" },
  { code: "uz", label: "UZ" },
] as const;

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className="inline-flex items-center rounded-full border border-bwt-ivory/25 p-0.5">
      {LOCALES.map((l) => (
        <Link
          key={l.code}
          href={pathname}
          locale={l.code}
          className={`rounded-full px-2.5 py-1 font-sans text-xs font-semibold uppercase tracking-wider transition-colors ${
            locale === l.code
              ? "bg-bwt-gold text-bwt-navy-dark"
              : "text-bwt-ivory/70 hover:text-bwt-ivory"
          }`}
        >
          {l.label}
        </Link>
      ))}
    </div>
  );
}
