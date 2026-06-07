import Image from "next/image";
import { Check, Minus, ArrowRight, Layers, Filter, Factory, type LucideIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { PublicProduct } from "@/lib/types";
import { CATALOG_STRINGS } from "./strings";
import CatalogFullList from "./CatalogFullList";

const MODELS: { id: string; name: string; src: string; w: number; h: number; popular?: boolean }[] = [
  { id: "slim2", name: "BWT Slim 2", src: "/images/products/slim-2.webp", w: 295, h: 418 },
  { id: "slim3", name: "BWT Slim 3", src: "/images/products/slim-3.webp", w: 392, h: 314 },
  { id: "slim4", name: "BWT Slim 4", src: "/images/products/slim-4.webp", w: 295, h: 418, popular: true },
];

// Comparison matrix per row; "area" rows render the localized area strings.
const MATRIX: (boolean | "area")[][] = [
  [true, true, true],
  [true, true, true],
  [false, true, true],
  [false, false, true],
  ["area", "area", "area"],
];

const TILE_ICONS: LucideIcon[] = [Layers, Filter, Factory];

export default function CatalogClient({
  products,
  locale,
}: {
  products: PublicProduct[];
  locale: string;
}) {
  const s = CATALOG_STRINGS[locale] ?? CATALOG_STRINGS.ru;

  return (
    <>
      {/* Section 1 — Drinking water under-sink: BWT Slim */}
      <section className="bg-bwt-ivory py-16 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-16">
          <p className="mb-4 font-sans text-xs uppercase tracking-[0.25em] text-bwt-gold">
            {s.s1Eyebrow}
          </p>
          <h2 className="max-w-[760px] font-serif text-3xl font-normal leading-[1.1] text-bwt-charcoal sm:text-4xl lg:text-5xl">
            {s.s1Title}
          </h2>
          <p className="mt-5 max-w-xl font-sans text-lg text-bwt-graphite">{s.s1Text}</p>

          {/* Model cards */}
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {MODELS.map((m, i) => (
              <div
                key={m.id}
                className={`relative flex flex-col rounded-card border bg-white p-8 transition-shadow hover:shadow-card ${
                  m.popular ? "border-bwt-gold shadow-card lg:-translate-y-3" : "border-bwt-silver/60"
                }`}
              >
                {m.popular && (
                  <span className="absolute -top-3 left-8 rounded-btn bg-bwt-gold px-3 py-1 font-sans text-[0.65rem] font-semibold uppercase tracking-wider text-bwt-navy-dark">
                    {s.popular}
                  </span>
                )}
                <div className="mb-6 flex h-[200px] items-center justify-center">
                  <Image
                    src={m.src}
                    alt={m.name}
                    width={m.w}
                    height={m.h}
                    sizes="360px"
                    className="max-h-[200px] w-auto object-contain"
                  />
                </div>
                <h3 className="font-serif text-3xl text-bwt-charcoal">{m.name}</h3>
                <p className="mt-1 font-sans text-sm uppercase tracking-wider text-bwt-graphite">
                  {s.taglines[i]}
                </p>
                <Link
                  href="/request"
                  className={`mt-8 inline-flex items-center justify-center gap-2 rounded-btn px-6 py-3.5 font-sans text-sm font-semibold uppercase tracking-wider transition-colors ${
                    m.popular
                      ? "bg-bwt-gold text-bwt-navy-dark hover:bg-bwt-gold-light"
                      : "border border-bwt-charcoal/20 text-bwt-charcoal hover:border-bwt-gold hover:text-bwt-gold-dark"
                  }`}
                >
                  {s.learnPrice} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>

          {/* Comparison table */}
          <div className="mt-16">
            <h3 className="font-serif text-2xl text-bwt-charcoal lg:text-3xl">{s.compareTitle}</h3>
            <div className="mt-6 overflow-x-auto rounded-card border border-bwt-silver/60 bg-white">
              <table className="w-full min-w-[640px] border-collapse">
                <thead>
                  <tr className="border-b border-bwt-silver/60">
                    <th className="px-6 py-4 text-left font-sans text-xs uppercase tracking-wider text-bwt-graphite">
                      {s.compareFeature}
                    </th>
                    {MODELS.map((m) => (
                      <th
                        key={m.id}
                        className={`px-6 py-4 text-center font-serif text-lg ${
                          m.popular ? "text-bwt-gold-dark" : "text-bwt-charcoal"
                        }`}
                      >
                        {m.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {s.rows.map((label, ri) => (
                    <tr key={label} className={ri > 0 ? "border-t border-bwt-silver/40" : ""}>
                      <td className="px-6 py-4 font-sans text-sm text-bwt-charcoal">{label}</td>
                      {[0, 1, 2].map((ci) => {
                        const v = MATRIX[ri][ci];
                        return (
                          <td key={ci} className="px-6 py-4 text-center">
                            {v === "area" ? (
                              <span className="font-sans text-sm text-bwt-charcoal">{s.taglines[ci]}</span>
                            ) : v ? (
                              <Check className="mx-auto h-5 w-5 text-bwt-gold" strokeWidth={2.5} />
                            ) : (
                              <Minus className="mx-auto h-4 w-4 text-bwt-silver" strokeWidth={2} />
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — Whole-home filtration */}
      <section id="whole-home" className="scroll-mt-24 bg-bwt-cream py-16 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-16">
          <p className="mb-4 font-sans text-xs uppercase tracking-[0.25em] text-bwt-gold">
            {s.s2Eyebrow}
          </p>
          <h2 className="max-w-[760px] font-serif text-3xl font-normal leading-[1.1] text-bwt-charcoal sm:text-4xl lg:text-5xl">
            {s.s2Title}
          </h2>
          <p className="mt-5 max-w-xl font-sans text-lg text-bwt-graphite">{s.s2Text}</p>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {s.tiles.map((tile, i) => {
              const Icon = TILE_ICONS[i];
              return (
                <div
                  key={tile.title}
                  className="flex flex-col rounded-card border border-bwt-silver/60 bg-white p-8"
                >
                  <Icon className="h-9 w-9 text-bwt-gold" strokeWidth={1.5} />
                  <h3 className="mt-6 font-serif text-2xl text-bwt-charcoal">{tile.title}</h3>
                  <p className="mt-3 flex-1 font-sans text-base leading-relaxed text-bwt-graphite">
                    {tile.text}
                  </p>
                  <Link
                    href="/request"
                    className="mt-8 inline-flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-wider text-bwt-charcoal transition-colors hover:text-bwt-gold-dark"
                  >
                    {s.learnComposition} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 3 — Full ERP catalog (collapsible) */}
      <CatalogFullList products={products} />
    </>
  );
}
