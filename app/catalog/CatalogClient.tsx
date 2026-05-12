"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { PublicProduct } from "@/lib/types";
import { Search, SlidersHorizontal, X } from "lucide-react";

export default function CatalogClient({ products }: { products: PublicProduct[] }) {
  const [search, setSearch]   = useState("");
  const [active, setActive]   = useState<string[]>([]); // active category filters
  const [showFilters, setShowFilters] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(() =>
    products.reduce((m, p) => Math.max(m, p.priceRetail), 0)
  );

  const categories = useMemo(() => {
    const set = new Map<string, number>();
    for (const p of products) {
      set.set(p.category, (set.get(p.category) ?? 0) + 1);
    }
    return Array.from(set.entries()).sort((a, b) => b[1] - a[1]);
  }, [products]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter(p => {
      if (active.length && !active.includes(p.category)) return false;
      if (p.priceRetail > maxPrice) return false;
      if (q && !(
        p.name.toLowerCase().includes(q) ||
        (p.sku ?? "").toLowerCase().includes(q) ||
        (p.description ?? "").toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      )) return false;
      return true;
    });
  }, [products, active, search, maxPrice]);

  const toggleCategory = (c: string) => {
    setActive(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  };

  const reset = () => { setActive([]); setSearch(""); };

  const priceCap = products.reduce((m, p) => Math.max(m, p.priceRetail), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Каталог BWT</h1>
        <p className="text-gray-500 mt-1">{products.length} товаров · обновляется автоматически из ERP</p>
      </div>

      {/* Search bar */}
      <div className="flex gap-2 mb-5">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Поиск по названию, артикулу..."
            className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[color:var(--secondary)]"
          />
        </div>
        <button onClick={() => setShowFilters(s => !s)}
          className="lg:hidden flex items-center gap-2 px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-700 font-medium">
          <SlidersHorizontal className="w-5 h-5" />
          {active.length > 0 && <span className="bg-[color:var(--primary)] text-white text-xs px-1.5 rounded-full">{active.length}</span>}
        </button>
      </div>

      <div className="grid lg:grid-cols-[260px_1fr] gap-6">

        {/* Filters sidebar */}
        <aside className={`${showFilters ? "block" : "hidden"} lg:block`}>
          <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-20">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-gray-900">Фильтры</h2>
              {active.length > 0 && (
                <button onClick={reset}
                  className="text-xs text-gray-500 hover:text-red-600 flex items-center gap-1">
                  <X className="w-3 h-3" /> Сбросить
                </button>
              )}
            </div>

            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mt-4 mb-2">Категория</h3>
            <div className="space-y-1">
              {categories.map(([c, count]) => (
                <label key={c}
                  className="flex items-center gap-2 py-1.5 px-2 -mx-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input type="checkbox"
                    checked={active.includes(c)}
                    onChange={() => toggleCategory(c)}
                    className="w-4 h-4 accent-[color:var(--primary)]" />
                  <span className="text-sm flex-1">{c}</span>
                  <span className="text-xs text-gray-400">{count}</span>
                </label>
              ))}
            </div>

            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mt-6 mb-2">Цена до</h3>
            <input type="range" min={0} max={priceCap || 100} step={50} value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[color:var(--primary)]" />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>$0</span>
              <span>до ${maxPrice.toFixed(0)}</span>
              <span>${priceCap.toFixed(0)}</span>
            </div>
          </div>
        </aside>

        {/* Products grid */}
        <div>
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
              <p className="text-gray-500">Ничего не найдено. Попробуйте сбросить фильтры.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map(p => (
                <Link key={p.id} href={`/catalog/${p.sku}`}
                  className="group bg-white rounded-2xl p-5 border border-gray-100 hover:border-blue-200 hover:shadow-lg transition flex flex-col">
                  <div className="aspect-square mb-4 bg-[color:var(--bg)] rounded-xl flex items-center justify-center p-4 overflow-hidden">
                    {p.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.imageUrl} alt={p.name}
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform" />
                    ) : (
                      <div className="text-gray-300 text-4xl">🔧</div>
                    )}
                  </div>
                  <div className="text-[11px] text-gray-400 uppercase tracking-wider mb-1">{p.category}</div>
                  <h3 className="font-semibold text-gray-900 line-clamp-2 min-h-[2.5em] leading-snug">{p.name}</h3>
                  {p.description && (
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{p.description}</p>
                  )}
                  <div className="mt-auto pt-3 flex items-end justify-between">
                    <div>
                      <div className="text-[11px] text-gray-400">Цена от</div>
                      <div className="text-lg font-bold text-[color:var(--primary)]">${p.priceRetail.toFixed(0)}</div>
                    </div>
                    <span className="text-sm text-[color:var(--primary)] font-medium">Подробнее →</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
