import Image from "next/image";
import styles from "./promo.module.css";

type PromoProduct = {
  id: number | string;
  sku: string | null;
  name: string;
  description: string | null;
  priceRetail: number;
  imageUrl: string | null;
};

type ProductsCopy = {
  eyebrow: string;
  titleA: string;
  titleAccent: string;
  lead: string;
  from: string;
  currency: string;
  note: string;
  ctaQuiz: string;
  ctaCatalog: string;
  empty: string;
  popularTag: string;
};

type Props = {
  products: ReadonlyArray<PromoProduct>;
  copy: ProductsCopy;
  /** Locale-aware path to the catalog (RU: "/catalog", UZ: "/uz/catalog"). */
  catalogHref: string;
};

// SKU of the model we promote as the "popular" pick — Slim 4 (90% of clients).
const POPULAR_SKUS = new Set(["BWT-SLIM-4-HW", "BWT-SLIM-4-SW"]);

function formatPrice(value: number): string {
  // ERP stores USD; render with comma thousands separator for readability.
  if (!Number.isFinite(value)) return "—";
  return Math.round(value).toLocaleString("ru-RU");
}

export default function PromoProducts({ products, copy, catalogHref }: Props) {
  return (
    <section id="products" className={styles.products}>
      <div className={styles.container}>
        <div className={styles.productsHeader}>
          <div className={styles.eyebrow}>{copy.eyebrow}</div>
          <h2>
            {copy.titleA} <span className={styles.serif} style={{ color: "var(--bwt-pink)" }}>{copy.titleAccent}</span>
          </h2>
          <p>{copy.lead}</p>
        </div>

        {products.length === 0 ? (
          <div className={styles.productsEmpty}>{copy.empty}</div>
        ) : (
          <div className={styles.productsGrid}>
            {products.map((p) => {
              const featured = p.sku ? POPULAR_SKUS.has(p.sku) : false;
              return (
                <article
                  key={p.id}
                  className={`${styles.productCard} ${featured ? styles.featured : ""} ${styles.fadeIn}`}
                >
                  <span className={styles.productTag}>{featured ? copy.popularTag + " · " + (p.sku ?? p.name) : (p.sku ?? p.name)}</span>
                  <h3>
                    {p.name}
                    {p.sku ? <span className={styles.model}>{p.sku}</span> : null}
                  </h3>
                  <div className={styles.productImg}>
                    {p.imageUrl ? (
                      <Image
                        src={p.imageUrl}
                        alt={p.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        style={{ objectFit: "contain", padding: "16px" }}
                        unoptimized
                      />
                    ) : (
                      <div className={styles.productImgMock}>{p.sku ?? "BWT"}</div>
                    )}
                  </div>
                  {p.description ? (
                    <p className={styles.productDesc}>{p.description}</p>
                  ) : null}
                  <div className={styles.productPriceRow}>
                    <div className={styles.from}>{copy.from}</div>
                    <div className={styles.price}>
                      {formatPrice(p.priceRetail)}
                      <span className={styles.cu}>{copy.currency}</span>
                    </div>
                    <div className={styles.note}>{copy.note}</div>
                  </div>
                  <div className={styles.productCardCta}>
                    <a href="#offer" className={`${styles.btn} ${styles.btnPrimary}`}>
                      {copy.ctaQuiz}
                    </a>
                    <a
                      href={catalogHref}
                      className={`${styles.btn} ${styles.btnGhost}`}
                    >
                      {copy.ctaCatalog}
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
