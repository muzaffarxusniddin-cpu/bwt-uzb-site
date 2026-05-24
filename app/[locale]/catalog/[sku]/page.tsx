import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { fetchProductBySku, fetchProducts } from "@/lib/api";
import { ChevronLeft, Phone, ArrowRight, Droplet } from "lucide-react";
import { BRAND } from "@/lib/config";
import { Link } from "@/i18n/navigation";

export const revalidate = 300;

export async function generateStaticParams() {
  const products = await fetchProducts();
  return products.filter((p) => p.sku).map((p) => ({ sku: p.sku as string }));
}

type Params = Promise<{ locale: string; sku: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { sku } = await params;
  const product = await fetchProductBySku(sku);
  if (!product) return { title: "Товар не найден" };
  return {
    title: `${product.name} · BWT Uzbekistan`,
    description: product.description ?? `Купить ${product.name} в Узбекистане. Установка и сервис.`,
    openGraph: {
      title: product.name,
      description: product.description ?? "",
      images: product.imageUrl ? [{ url: product.imageUrl }] : [],
    },
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { locale, sku } = await params;
  const product = await fetchProductBySku(sku);
  if (!product) notFound();
  const t = await getTranslations({ locale, namespace: "productPage" });

  const requestHref = `/request?sku=${encodeURIComponent(
    product.sku ?? ""
  )}&name=${encodeURIComponent(product.name)}`;

  return (
    <div className="bg-bwt-ivory">
      <div className="mx-auto max-w-[1440px] px-6 py-12 lg:px-16 lg:py-20">
        <Link
          href="/catalog"
          className="mb-8 inline-flex items-center gap-1.5 font-sans text-sm text-bwt-graphite transition-colors hover:text-bwt-gold-dark"
        >
          <ChevronLeft className="h-4 w-4" /> {t("back")}
        </Link>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="flex min-h-[320px] items-center justify-center rounded-card border border-bwt-silver/60 bg-white p-8 lg:min-h-[520px] lg:p-12">
            {product.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.imageUrl}
                alt={product.name}
                className="max-h-[440px] max-w-full object-contain"
              />
            ) : (
              <Droplet className="h-24 w-24 text-bwt-silver" strokeWidth={1} />
            )}
          </div>

          <div className="flex flex-col">
            <span className="font-sans text-xs uppercase tracking-[0.2em] text-bwt-gold-dark">
              {product.category}
            </span>
            <h1 className="mt-3 font-serif text-3xl leading-tight text-bwt-charcoal lg:text-4xl">
              {product.name}
            </h1>
            {product.sku && (
              <div className="mt-2 font-sans text-xs text-bwt-graphite">SKU: {product.sku}</div>
            )}
            {product.description && (
              <p className="mt-6 font-sans text-base leading-relaxed text-bwt-graphite">
                {product.description}
              </p>
            )}

            <div className="mt-8 rounded-card border border-bwt-silver/60 bg-white p-6">
              <div className="flex items-end justify-between">
                <div>
                  <div className="font-sans text-xs uppercase tracking-wider text-bwt-graphite">
                    {t("price")}
                  </div>
                  <div className="font-serif text-4xl text-bwt-charcoal">
                    ${product.priceRetail.toFixed(0)}
                  </div>
                </div>
                <span
                  className={`rounded-full px-3 py-1 font-sans text-sm font-medium ${
                    product.stockQty > 0
                      ? "bg-bwt-success/10 text-bwt-success"
                      : "bg-bwt-gold/15 text-bwt-gold-dark"
                  }`}
                >
                  {product.stockQty > 0 ? t("inStock") : t("onOrder")}
                </span>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={requestHref}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-btn bg-bwt-gold px-6 py-3.5 font-sans text-sm font-semibold uppercase tracking-wider text-bwt-navy-dark transition-colors hover:bg-bwt-gold-light"
                >
                  {t("orderInstall")} <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={BRAND.phoneHref}
                  className="inline-flex items-center justify-center gap-2 rounded-btn border border-bwt-charcoal/20 px-6 py-3.5 font-sans text-sm font-semibold uppercase tracking-wider text-bwt-charcoal transition-colors hover:border-bwt-gold hover:text-bwt-gold-dark"
                >
                  <Phone className="h-4 w-4" /> {t("consultation")}
                </a>
              </div>
            </div>

            {product.cartridges.length > 0 && (
              <div className="mt-8">
                <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-bwt-graphite">
                  {t("cartridges")} ({product.cartridges.length})
                </h3>
                <div className="mt-4 space-y-2">
                  {product.cartridges.map((c, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-card border border-bwt-silver/50 bg-white p-3"
                    >
                      {c.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={c.imageUrl}
                          alt=""
                          className="h-12 w-12 shrink-0 rounded-btn bg-bwt-cream object-contain"
                        />
                      ) : (
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-btn bg-bwt-cream">
                          <Droplet className="h-5 w-5 text-bwt-silver" />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-sans text-sm font-medium text-bwt-charcoal">
                          {c.name}
                        </div>
                        <div className="font-sans text-xs text-bwt-graphite">
                          {t("replaceEvery", { months: c.intervalMonths, qty: c.quantity })}
                        </div>
                      </div>
                      <div className="font-serif text-base text-bwt-charcoal">
                        ${c.priceUsd.toFixed(0)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <section className="bg-bwt-navy py-16 text-center text-bwt-ivory lg:py-20">
        <div className="mx-auto max-w-[640px] px-6 lg:px-16">
          <h2 className="font-serif text-3xl">{t("ctaTitle")}</h2>
          <p className="mt-3 font-sans text-lg text-bwt-ivory/70">{t("ctaText")}</p>
          <Link
            href={requestHref}
            className="mt-7 inline-flex items-center gap-2.5 rounded-btn bg-bwt-gold px-7 py-4 font-sans text-sm font-semibold uppercase tracking-wider text-bwt-navy-dark transition-colors hover:bg-bwt-gold-light"
          >
            {t("ctaButton")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
