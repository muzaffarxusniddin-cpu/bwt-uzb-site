import Link from "next/link";
import { fetchProducts } from "@/lib/api";
import LeadForm from "./components/LeadForm";
import { ArrowRight, Droplet, Shield, Wrench, Award } from "lucide-react";

// Re-validate the homepage every 5 min
export const revalidate = 300;

const BENEFITS = [
  { icon: Award,   title: "Немецкое качество",       text: "Фильтры BWT — европейское производство Германии" },
  { icon: Droplet, title: "100% безопасная вода",    text: "Защита от хлора, бактерий и накипи" },
  { icon: Wrench,  title: "Установка за 1 час",       text: "Опытные инженеры с сертификатом BWT" },
  { icon: Shield,  title: "Гарантия 3 года",          text: "На оборудование и установку" },
];

export default async function Home() {
  const products = await fetchProducts();

  // Featured: first 6 with imageUrl
  const featured = products.filter(p => p.imageUrl).slice(0, 6);

  return (
    <>
      {/* HERO ────────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0057A8 0%, #00AEEF 100%)" }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white 0%, transparent 40%), radial-gradient(circle at 80% 60%, white 0%, transparent 40%)" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-32 grid lg:grid-cols-2 gap-10 items-center">
          <div className="text-white">
            <span className="inline-block px-3 py-1 bg-white/15 rounded-full text-xs font-medium tracking-wider uppercase mb-4">
              Best Water Technology · Germany
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Чистая вода <br className="hidden sm:block" />для вашего дома
            </h1>
            <p className="mt-4 text-lg text-blue-100 max-w-lg leading-relaxed">
              Фильтры BWT — европейского производства Германии.
              Защита от хлора, бактерий и накипи. Гарантия 3 года.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/request"
                className="inline-flex items-center gap-2 bg-white text-[color:var(--primary)] px-6 py-3.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition">
                Подобрать фильтр <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/catalog"
                className="inline-flex items-center gap-2 border-2 border-white/40 text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-white/10 transition">
                Каталог
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl bg-white/10 backdrop-blur border border-white/20 shadow-2xl overflow-hidden flex items-center justify-center">
              {featured[0]?.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={featured[0].imageUrl} alt={featured[0].name}
                  className="max-h-[85%] max-w-[80%] object-contain drop-shadow-2xl" />
              ) : (
                <Droplet className="w-32 h-32 text-white/40" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* WHY BWT ─────────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 lg:py-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-3">
          Почему BWT?
        </h2>
        <p className="text-center text-gray-500 mb-10 max-w-2xl mx-auto">
          BWT — европейский лидер в фильтрации воды с 1990 года. В Узбекистане — официальный дистрибьютор.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {BENEFITS.map(b => {
            const Icon = b.icon;
            return (
              <div key={b.title}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "var(--bg)", color: "var(--primary)" }}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{b.title}</h3>
                <p className="text-sm text-gray-500">{b.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* FEATURED PRODUCTS ──────────────────────────────────────────────────── */}
      {featured.length > 0 && (
        <section className="bg-white py-14 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Популярные фильтры</h2>
                <p className="text-gray-500 mt-1">Подходят для квартиры, дома и офиса</p>
              </div>
              <Link href="/catalog"
                className="inline-flex items-center gap-1.5 text-[color:var(--primary)] font-medium hover:underline">
                Весь каталог <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featured.map(p => (
                <Link key={p.id} href={`/catalog/${p.sku}`}
                  className="group bg-white rounded-2xl p-5 border border-gray-100 hover:border-blue-200 hover:shadow-lg transition flex flex-col">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <div className="aspect-square mb-4 bg-[color:var(--bg)] rounded-xl flex items-center justify-center p-4 overflow-hidden">
                    <img src={p.imageUrl!} alt={p.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">{p.category}</div>
                  <h3 className="font-semibold text-gray-900 line-clamp-2 min-h-[2.5em]">{p.name}</h3>
                  <div className="mt-auto pt-4 flex items-end justify-between">
                    <div>
                      <div className="text-xs text-gray-400">Цена от</div>
                      <div className="text-xl font-bold text-[color:var(--primary)]">${p.priceRetail.toFixed(0)}</div>
                    </div>
                    <span className="text-sm text-[color:var(--primary)] font-medium opacity-0 group-hover:opacity-100 transition">
                      Подробнее →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* LEAD FORM ──────────────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-14 lg:py-20" id="form">
        <LeadForm />
      </section>
    </>
  );
}
