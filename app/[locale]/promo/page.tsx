import type { Metadata } from "next";
import Image from "next/image";
import { Manrope, Fraunces, JetBrains_Mono } from "next/font/google";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { fetchProducts } from "@/lib/api";
import { altMeta } from "@/lib/seo";
import type { PublicProduct } from "@/lib/types";

import styles from "./promo.module.css";
import PromoEnhancements from "./PromoEnhancements";
import PromoLeadForm from "./PromoLeadForm";
import PromoProducts from "./PromoProducts";
import PromoHero from "./PromoHero";
import PromoTrust from "./PromoTrust";
import PromoReviews from "./PromoReviews";

// 5-min ISR — matches the rest of the site, lets ERP product edits propagate.
export const revalidate = 300;

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

const SLIM_SKUS = new Set([
  "BWT-SLIM-2-UF",
  "BWT-SLIM-3-HW",
  "BWT-SLIM-3-SW",
  "BWT-SLIM-4-HW",
  "BWT-SLIM-4-SW",
]);

function pickSlimProducts(all: ReadonlyArray<PublicProduct>): ReadonlyArray<PublicProduct> {
  const filtered = all.filter((p) => (p.sku ? SLIM_SKUS.has(p.sku) : false));
  // Stable ordering matching the SLIM ladder (2 → 3-HW → 3-SW → 4-HW → 4-SW).
  const order = new Map<string, number>(
    ["BWT-SLIM-2-UF", "BWT-SLIM-3-HW", "BWT-SLIM-3-SW", "BWT-SLIM-4-HW", "BWT-SLIM-4-SW"].map(
      (sku, i) => [sku, i],
    ),
  );
  return [...filtered].sort(
    (a, b) => (order.get(a.sku ?? "") ?? 99) - (order.get(b.sku ?? "") ?? 99),
  );
}

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

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function PromoPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "promo" });
  const allProducts = await fetchProducts();
  const products = pickSlimProducts(allProducts);
  const catalogHref = locale === "uz" ? "/uz/catalog" : "/catalog";

  const trustLogos = t.raw("hero.trustLogos") as ReadonlyArray<string>;
  const prestigeItems = t.raw("prestige.items") as ReadonlyArray<string>;
  const painCards = t.raw("pain.cards") as ReadonlyArray<{
    label: string;
    big: string;
    title: string;
    body: string;
    reveal: string;
  }>;
  const offerItems = t.raw("offer.items") as ReadonlyArray<{
    title: string;
    body: string;
    price: string;
  }>;
  const districts = t.raw("offer.districts") as ReadonlyArray<string>;
  const techCards = t.raw("tech.cards") as ReadonlyArray<{
    tag: string;
    title: string;
    body: string;
    badge?: string;
  }>;
  const storyTimeline = t.raw("story.timeline") as ReadonlyArray<{
    time: string;
    a: string;
    b: string;
  }>;
  const trustStats = t.raw("trust.stats") as ReadonlyArray<{
    num: string;
    unit: string;
    label: string;
  }>;
  const trustObjects = t.raw("trust.objects") as ReadonlyArray<{ name: string; cat: string }>;
  const reviewItems = t.raw("reviews.items") as ReadonlyArray<{
    id: string;
    name: string;
    role: string;
    caption: string;
    short: boolean;
  }>;

  return (
    <div
      className={`${styles.root} ${manrope.variable} ${fraunces.variable} ${jetbrains.variable}`}
    >
      <PromoEnhancements
        popup={{
          eyebrow: t("popup.eyebrow"),
          title: t("popup.title"),
          body: t("popup.body"),
          cta: t("popup.cta"),
          close: t("popup.close"),
        }}
        ctaHref="#offer"
      />

      <PromoHero
        copy={{
          trustLabel: t("hero.trustLabel"),
          trustLogos,
          badge: t("hero.badge"),
          title: t("hero.title"),
          subtitle: t("hero.subtitle"),
          fineprint: t("hero.fineprint"),
          ctaPrimary: t("hero.ctaPrimary"),
          ctaSecondary: t("hero.ctaSecondary"),
          shockUnit: t("hero.shockUnit"),
          shockText: t("hero.shockText"),
          badges: {
            ufA: t("hero.badges.ufA"),
            ufB: t("hero.badges.ufB"),
            warrantyA: t("hero.badges.warrantyA"),
            warrantyB: t("hero.badges.warrantyB"),
            installA: t("hero.badges.installA"),
            installB: t("hero.badges.installB"),
          },
        }}
      />

      {/* ─── PRESTIGE MARQUEE ─── */}
      <div className={styles.prestige}>
        <div className={styles.container}>
          <div className={styles.prestigeInner}>
            <div className={styles.prestigeLabel}>{t("prestige.label")}</div>
            <div className={styles.prestigeMarquee}>
              <div className={styles.prestigeMarqueeTrack}>
                {[...prestigeItems, ...prestigeItems].map((item, i) => (
                  <span key={`${item}-${i}`}>{item}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── PAIN ─── */}
      <section id="problems" className={styles.pain}>
        <div className={styles.container}>
          <div className={styles.painHeader}>
            <div className={styles.eyebrow}>{t("pain.eyebrow")}</div>
            <h2>
              {t("pain.titleA")}{" "}
              <span className={styles.serif} style={{ color: "var(--bwt-pink)" }}>
                {t("pain.titleAccent")}
              </span>{" "}
              {t("pain.titleB")}
            </h2>
            <p className={styles.lead}>{t("pain.lead")}</p>
          </div>
          <div className={styles.painGrid}>
            {painCards.map((card) => (
              <div key={card.label} className={`${styles.painCard} ${styles.fadeIn}`}>
                <div className={styles.num}>
                  <span>{card.label}</span>
                  <span className={styles.big}>{card.big}</span>
                </div>
                <h4>{card.title}</h4>
                <p>{card.body}</p>
                <div className={styles.reveal}>{card.reveal}</div>
              </div>
            ))}
          </div>
          <div className={styles.painBottom}>
            <div className={styles.painBottomText}>
              <div className={styles.a}>{t("pain.bottomA")}</div>
              <div className={styles.b}>{t("pain.bottomB")}</div>
            </div>
            <a href="#offer" className={`${styles.btn} ${styles.btnPrimary}`}>
              {t("pain.bottomCta")}
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
      </section>

      {/* ─── OFFER ─── */}
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

      {/* ─── PRODUCTS (real ERP data) ─── */}
      <PromoProducts
        products={products}
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

      {/* ─── TECH ─── */}
      <section id="technology" className={styles.tech}>
        <div className={styles.container}>
          <div className={styles.techHeader}>
            <div className={`${styles.eyebrow} ${styles.eyebrowGold}`}>{t("tech.eyebrow")}</div>
            <h2>
              <span className={styles.serif} style={{ color: "var(--gold)" }}>
                {t("tech.titleA")}
              </span>{" "}
              {t("tech.titleB")}
            </h2>
            <p className={styles.lead}>{t("tech.lead")}</p>
          </div>

          <div className={styles.techFlow}>
            <span className={`${styles.techFlowStep} ${styles.from}`}>{t("tech.flowFrom")}</span>
            {["01", "02", "03", "04", "05", "06"].map((n) => (
              <span key={n} className={styles.techFlowStep}>
                {n}
              </span>
            ))}
            <span className={`${styles.techFlowStep} ${styles.to}`}>{t("tech.flowTo")}</span>
          </div>

          <div className={styles.techGrid}>
            {techCards.map((card, i) => (
              <div key={card.title} className={`${styles.techCard} ${styles.fadeIn}`}>
                <div className={styles.techCardNum}>{String(i + 1).padStart(2, "0")}</div>
                <div className={styles.techCardTag}>{card.tag}</div>
                <h4>{card.title}</h4>
                <p>{card.body}</p>
                {card.badge ? <span className={styles.badge}>{card.badge}</span> : null}
              </div>
            ))}
          </div>

          <div className={styles.techBottom}>
            <div className={styles.techBottomText}>
              <div className={styles.a}>{t("tech.bottomA")}</div>
              <div className={styles.b}>{t("tech.bottomB")}</div>
            </div>
            <div className={styles.techCert}>
              <span className={styles.certBadge}>TÜV</span>
              <span className={styles.certBadge}>NSF</span>
              <span className={styles.certBadge}>DIN</span>
              <span className={styles.certBadge}>EN</span>
              <span className={styles.certBadge}>ISO 9001</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOUNDER ─── */}
      <section className={styles.founder}>
        <div className={styles.container}>
          <div className={styles.founderGrid}>
            <div className={styles.founderImageWrap}>
              <Image
                src="/images/founder/founder.jpg"
                alt={t("founder.imageAlt")}
                fill
                sizes="(max-width: 900px) 100vw, 40vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className={styles.founderContent}>
              <div className={styles.eyebrow}>{t("founder.eyebrow")}</div>
              <div className={styles.founderName}>{t("founder.name")}</div>
              <div className={styles.founderRole}>{t("founder.role")}</div>
              <p className={styles.founderBio}>{t("founder.bio")}</p>
              <blockquote className={styles.founderQuote}>{t("founder.quote")}</blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ─── REVIEWS ─── */}
      <PromoReviews
        reviews={reviewItems}
        copy={{
          eyebrow: t("reviews.eyebrow"),
          titleA: t("reviews.titleA"),
          titleAccent: t("reviews.titleAccent"),
          titleB: t("reviews.titleB"),
          watch: t("reviews.watch"),
          close: t("reviews.close"),
        }}
      />

      {/* ─── STORY ─── */}
      <section className={styles.story}>
        <div className={styles.container}>
          <div className={styles.storyGrid}>
            <aside className={styles.storyVisual}>
              <span className={styles.storyQuoteMark} aria-hidden>
                “
              </span>
              <div className={styles.storyQuote}>{t("story.quote")}</div>
              <div className={styles.storyAuthor}>
                <div className={styles.nm}>{t("story.authorName")}</div>
                <div className={styles.ro}>{t("story.authorRole")}</div>
              </div>
            </aside>
            <div className={styles.storyContent}>
              <div className={styles.eyebrow}>{t("story.eyebrow")}</div>
              <h2>
                {t("story.titleA")}{" "}
                <span className={styles.serif} style={{ color: "var(--bwt-pink)" }}>
                  {t("story.titleAccent")}
                </span>{" "}
                {t("story.titleB")}
              </h2>
              <p className={styles.storyLead}>
                {t("story.leadA")} <strong>{t("story.leadModel")}</strong>
                {t("story.leadB")}
              </p>
              <div className={styles.storyTimeline}>
                {storyTimeline.map((item) => (
                  <div key={item.time} className={styles.storyTlItem}>
                    <div className={styles.storyTlTime}>{item.time}</div>
                    <div className={styles.storyTlContent}>
                      <div className={styles.a}>{item.a}</div>
                      <div className={styles.b}>{item.b}</div>
                    </div>
                  </div>
                ))}
              </div>
              <a href="#offer" className={`${styles.btn} ${styles.btnPrimary}`}>
                {t("story.cta")}
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
        </div>
      </section>

      <PromoTrust
        copy={{
          eyebrow: t("trust.eyebrow"),
          titleA: t("trust.titleA"),
          titleAccent: t("trust.titleAccent"),
          lead: t("trust.lead"),
          stats: trustStats,
          objectsTitle: t("trust.objectsTitle"),
          objectsMeta: t("trust.objectsMeta"),
          objects: trustObjects,
          moreName: t("trust.moreName"),
          moreCat: t("trust.moreCat"),
          certsLabel: t("trust.certsLabel"),
        }}
      />

      {/* ─── CHANGE THE WORLD (Africa CSR) ─── */}
      <section style={{ background: "var(--ink)", color: "var(--white)" }}>
        <div
          className={styles.container}
          style={{ paddingTop: "var(--pad-section)", paddingBottom: "var(--pad-section)" }}
        >
          <div className={`${styles.eyebrow} ${styles.eyebrowGold}`}>{t("africa.eyebrow")}</div>
          <h2 style={{ maxWidth: "760px" }}>
            <span className={styles.serif} style={{ color: "var(--gold)" }}>
              {t("africa.title")}
            </span>
          </h2>
          <p className={styles.lead} style={{ maxWidth: "640px" }}>
            {t("africa.lead")}
          </p>
          <div style={{ display: "flex", gap: "48px", marginTop: "40px", flexWrap: "wrap" }}>
            <div>
              <div
                className={styles.serif}
                style={{ color: "var(--gold)", fontSize: "3rem", lineHeight: 1 }}
              >
                {t("africa.stat1Num")}
              </div>
              <div
                style={{
                  marginTop: "8px",
                  fontSize: "13px",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  opacity: 0.7,
                }}
              >
                {t("africa.stat1Label")}
              </div>
            </div>
            <div>
              <div
                className={styles.serif}
                style={{ color: "var(--gold)", fontSize: "3rem", lineHeight: 1 }}
              >
                {t("africa.stat2Num")}
              </div>
              <div
                style={{
                  marginTop: "8px",
                  fontSize: "13px",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  opacity: 0.7,
                }}
              >
                {t("africa.stat2Label")}
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: "16px",
              marginTop: "40px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <a
              href="https://www.aquapearls.org/en/"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.btn} ${styles.btnPrimary}`}
            >
              {t("africa.linkProject")}
            </a>
            <a
              href="https://ewater.services/"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.btn} ${styles.btnGhostLight}`}
            >
              {t("africa.linkMonitor")}
            </a>
            <span
              className={styles.serif}
              style={{ color: "var(--gold)", fontStyle: "italic", marginLeft: "auto" }}
            >
              {t("africa.brandLine")}
            </span>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className={styles.final}>
        <div className={styles.container}>
          <div className={styles.finalInner}>
            <div className={`${styles.eyebrow} ${styles.eyebrowGold}`}>{t("final.eyebrow")}</div>
            <h2>
              {t("final.titleA")}{" "}
              <span className={styles.serif} style={{ color: "var(--gold)" }}>
                {t("final.titleAccent")}
              </span>
              {t("final.titleB")}
            </h2>
            <p>{t("final.lead")}</p>
            <div className={styles.finalCtas}>
              <a href="#offer" className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLg}`}>
                {t("final.ctaPrimary")}
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
              <a href="#products" className={`${styles.btn} ${styles.btnGhostLight} ${styles.btnLg}`}>
                {t("final.ctaSecondary")}
              </a>
            </div>
            <div className={styles.urgency}>
              <span className={styles.urgencyDot} aria-hidden />
              <span>{t("final.urgency")}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
