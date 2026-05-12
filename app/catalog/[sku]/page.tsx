import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchProductBySku, fetchProducts } from "@/lib/api";
import LeadForm from "../../components/LeadForm";
import { ChevronLeft, Phone } from "lucide-react";
import { BRAND } from "@/lib/config";

export const revalidate = 300;

export async function generateStaticParams() {
  const products = await fetchProducts();
  return products
    .filter(p => p.sku)
    .map(p => ({ sku: p.sku as string }));
}

type Params = Promise<{ sku: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { sku } = await params;
  const product = await fetchProductBySku(sku);
  if (!product) return { title: "Товар не найден" };
  return {
    title: `${product.name} — bwt-uzb.uz`,
    description: product.description ?? `Купить ${product.name} в Узбекистане. Установка и сервис.`,
    openGraph: {
      title: product.name,
      description: product.description ?? "",
      images: product.imageUrl ? [{ url: product.imageUrl }] : [],
    },
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { sku } = await params;
  const product = await fetchProductBySku(sku);
  if (!product) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-10">
      <Link href="/catalog"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[color:var(--primary)] mb-5">
        <ChevronLeft className="w-4 h-4" /> К каталогу
      </Link>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 lg:p-10 flex items-center justify-center min-h-[280px] lg:min-h-[480px]">
          {product.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={product.imageUrl} alt={product.name}
              className="max-h-[420px] max-w-full object-contain" />
          ) : (
            <div className="text-7xl text-gray-200">🔧</div>
          )}
        </div>

        {/* Info */}
        <div>
          <div className="inline-block px-3 py-1 rounded-full bg-[color:var(--bg)] text-[color:var(--primary)] text-xs font-medium tracking-wider uppercase mb-2">
            {product.category}
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
            {product.name}
          </h1>
          {product.sku && (
            <div className="text-xs text-gray-400 font-mono mt-2">Артикул: {product.sku}</div>
          )}

          {product.description && (
            <p className="mt-5 text-gray-600 leading-relaxed">{product.description}</p>
          )}

          <div className="mt-6 bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-end justify-between">
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Цена</div>
                <div className="text-3xl font-bold text-[color:var(--primary)]">
                  ${product.priceRetail.toFixed(0)}
                </div>
              </div>
              {product.stockQty > 0 ? (
                <span className="text-sm text-green-700 bg-green-50 px-2.5 py-1 rounded-full font-medium">
                  В наличии
                </span>
              ) : (
                <span className="text-sm text-orange-700 bg-orange-50 px-2.5 py-1 rounded-full font-medium">
                  Под заказ
                </span>
              )}
            </div>

            <div className="mt-5 flex flex-col sm:flex-row gap-2">
              <Link href={`/request?sku=${encodeURIComponent(product.sku ?? "")}`}
                className="flex-1 inline-flex items-center justify-center px-5 py-3.5 rounded-xl text-white font-semibold shadow-sm hover:shadow transition"
                style={{ background: "var(--primary)" }}>
                Заказать установку
              </Link>
              <a href={BRAND.phoneHref}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border-2 border-gray-200 text-gray-700 font-medium hover:border-[color:var(--primary)] hover:text-[color:var(--primary)] transition">
                <Phone className="w-4 h-4" /> Консультация
              </a>
            </div>
          </div>

          {/* Cartridges */}
          {product.cartridges.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Сменные картриджи ({product.cartridges.length})
              </h3>
              <div className="space-y-2">
                {product.cartridges.map((c, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 p-3">
                    {c.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={c.imageUrl} alt="" className="w-12 h-12 object-contain bg-[color:var(--bg)] rounded-lg shrink-0" />
                    ) : (
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xl shrink-0">🧩</div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-800 truncate">{c.name}</div>
                      <div className="text-xs text-gray-500">Замена каждые {c.intervalMonths} мес. · {c.quantity} шт.</div>
                    </div>
                    <div className="text-sm font-semibold text-[color:var(--primary)]">${c.priceUsd.toFixed(0)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lead form */}
      <section className="mt-14 max-w-3xl mx-auto">
        <LeadForm
          productSku={product.sku ?? undefined}
          productName={product.name}
          title="Заинтересовал этот фильтр?"
          subtitle="Заполните форму — менеджер свяжется и предложит лучшую конфигурацию для вашей задачи." />
      </section>
    </div>
  );
}
