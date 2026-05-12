/**
 * Site-wide configuration. Most values are environment-driven so the same
 * code runs on bwt-uzb.uz, a preview deployment, and localhost.
 */

export const ERP_API =
  process.env.NEXT_PUBLIC_ERP_API ?? "https://erp-bwt.uz";

export const BRAND = {
  name:        "BWT Uzbekistan",
  legalName:   "«MUHANDIS-KONSALTING» MChJ",
  tagline:     "Best Water Technology",
  phone:       "+998 77 407-87-77",
  phoneHref:   "tel:+998774078777",
  email:       "info@bwt-uzb.uz",
  telegram:    "https://t.me/bwt_uzb",
  telegramHandle: "@bwt_uzb",
  instagram:   "https://www.instagram.com/bwt_uzb/",
  instagramHandle: "@bwt_uzb",
  address:     "г. Ташкент, Юнусабадский р-н, ул. Хушнаво, 4 проезд, д. 2",
  addressShort:"Ташкент, Юнусабадский р-н",
  workingHours:"Пн–Сб 9:00–18:00",
  maps:        "https://maps.google.com/?q=" + encodeURIComponent("BWT Uzbekistan, Tashkent"),
} as const;
