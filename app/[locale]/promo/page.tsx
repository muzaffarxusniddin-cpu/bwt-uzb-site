import type { Metadata } from "next";
import { Manrope, Fraunces, JetBrains_Mono } from "next/font/google";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { altMeta } from "@/lib/seo";

import styles from "./promo.module.css";
import PromoLeadForm from "./PromoLeadForm";
import PromoProducts from "./PromoProducts";

import Hero from "@/app/components/Hero";
import HiddenThreat from "@/app/components/HiddenThreat";
import PainPoints from "@/app/components/PainPoints";
import SlimReveal from "@/app/components/SlimReveal";
import Technology from "@/app/components/Technology";
import Lifestyle from "@/app/components/Lifestyle";
import Installations from "@/app/components/Installations";
import ServiceGuarantees from "@/app/components/ServiceGuarantees";
import Founder from "@/app/components/Founder";
import Reviews from "@/app/components/Reviews";
import PremiumResidences from "@/app/components/PremiumResidences";
import ChangeTheWorld from "@/app/components/ChangeTheWorld";
import FinalCTA from "@/app/components/FinalCTA";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["italic"],
  variable: "--font-fraunces",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

// Promo product ladder — fixed marketing prices, Slim 4 is the popular pick.
const PRODUCTS = [
  { id: 2, sku: "BWT-SLIM-2-UF", name: "BWT Slim 2", description: null, priceRetail: 350, imageUrl: "/images/products/slim-2.webp" },
  { id: 3, sku: "BWT-SLIM-3-HW", name: "BWT Slim 3", description: null, priceRetail: 450, imageUrl: "/images/products/slim-3.webp" },
  { id: 4, sku: "BWT-SLIM-4-HW", name: "BWT Slim 4", description: null, priceRetail: 550, imageUrl: "/images/products/slim-4.webp" },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "promo.meta" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: altMeta(locale, "/promo"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      type: "website",
      locale: locale === "uz" ? "uz_UZ" : "ru_UZ",
      images: [{ url: "/images/bwt-logo-1200w.png", width: 1200, alt: "BWT Uzbekistan" }],
    },
    robots: { index: true, follow: true },
  };
}

type PageProps = { params: Promise<{ locale: string }> };

export default async function PromoPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "promo" });
  const catalogHref = locale === "uz" ? "/uz/catalog" : "/catalog";

  const offerItems = t.raw("offer.items") as ReadonlyArray<{
    title: string;
    body: string;
    price: string;
  }>;
  const districts = t.raw("offer.districts") as ReadonlyArray<string>;

  return (
    <>
      {/* 1 — Hero (same as homepage) */}
      <Hero />

      {/* 2 — Offer (conversion anchor): free 24h analysis + lead form */}
      <div className={`${styles.root} ${manrope.variable} ${fraunces.variable} ${jetbrains.variable}`}>
        <section id="offer" className={styles.offer}>
          <div className={styles.container}>
            <div className={styles.offerGrid}>
              <div>
                <div className={`${styles.eyebrow} ${styles.eyebrowDark}`}>{t("offer.eyebrow")}</div>
                <h2>
                  {t("offer.titleA")}{" "}
                  <span className={styles.serif} style={{ color: "var(--gold)" }}>
                    {t("offer.titleAccent")}
                  </span>{" "}
                  {t("offer.titleB")}
                </h2>
                <p className={styles.lead}>
                  {t("offer.leadA")} <strong>{t("offer.leadPrice")}</strong>
                  {t("offer.leadB")}
                </p>

                <div className={styles.valueStack}>
                  {offerItems.map((item) => (
                    <div key={item.title} className={`${styles.valueItem} ${styles.fadeIn}`}>
                      <div className={styles.valueCheck}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <path d="M5 12l5 5L20 7" />
                        </svg>
                      </div>
                      <div className={styles.text}>
                        <div className={styles.a}>{item.title}</div>
                        <div className={styles.b}>{item.body}</div>
                      </div>
                      <div className={styles.price}>
                        <span className={styles.muted}>{item.price}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles.valueTotal}>
                  <div className={styles.lbl}>{t("offer.totalLabel")}</div>
                  <div className={styles.val}>
                    <span className={styles.strike}>{t("offer.totalStrike")}</span>
                    <span className={styles.free}>{t("offer.totalFree")}</span>
                  </div>
                </div>

                <div className={styles.riskReversal}>
                  <div className={styles.riskSeal}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 2L4 7v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V7l-8-5z" />
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                  </div>
                  <div className={styles.copy}>
                    <div className={styles.a}>{t("offer.guaranteeTitle")}</div>
                    <div className={styles.b}>
                      <strong>{t("offer.guaranteeBody")}</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <PromoLeadForm
                  copy={{
                    formTag: t("offer.formTag"),
                    formTitle: t("offer.formTitle"),
                    formSub: t("offer.formSub"),
                    fieldName: t("offer.fieldName"),
                    fieldNamePh: t("offer.fieldNamePh"),
                    fieldPhone: t("offer.fieldPhone"),
                    fieldPhonePh: t("offer.fieldPhonePh"),
                    fieldDistrict: t("offer.fieldDistrict"),
                    districtPlaceholder: t("offer.districtPlaceholder"),
                    districts,
                    fieldHint: t("offer.fieldHint"),
                    consent: t("offer.consent"),
                    submit: t("offer.submit"),
                    submitSending: t("offer.submitSending"),
                    fineprint: t("offer.fineprint"),
                    successTitle: t("offer.successTitle"),
                    successBody: t("offer.successBody"),
                    successAgain: t("offer.successAgain"),
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 3+ — homepage story sections */}
      <HiddenThreat />
      <PainPoints />
      <SlimReveal />
      <Technology />

      {/* Products — fixed prices, Slim 4 popular */}
      <div className={`${styles.root} ${manrope.variable} ${fraunces.variable} ${jetbrains.variable}`}>
        <PromoProducts
          products={PRODUCTS}
          catalogHref={catalogHref}
          copy={{
            eyebrow: t("products.eyebrow"),
            titleA: t("products.titleA"),
            titleAccent: t("products.titleAccent"),
            lead: t("products.lead"),
            from: t("products.from"),
            currency: t("products.currency"),
            note: t("products.note"),
            ctaQuiz: t("products.ctaQuiz"),
            ctaCatalog: t("products.ctaCatalog"),
            empty: t("products.empty"),
            popularTag: t("products.popularTag"),
          }}
        />
      </div>

      <Lifestyle />
      <Installations />
      <ServiceGuarantees />
      <Founder />
      <Reviews />
      <PremiumResidences />
      <ChangeTheWorld />
      <FinalCTA />
    </>
  );
}
