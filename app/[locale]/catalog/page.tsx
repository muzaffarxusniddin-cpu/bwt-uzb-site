import { getTranslations } from "next-intl/server";
import { fetchProducts } from "@/lib/api";
import CatalogClient from "./CatalogClient";
import type { Metadata } from "next";

export const revalidate = 300;

// Katalog sahifasi uchun mukammal dinamik SEO funksiyasi
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isUz = locale === "uz";

  // Siz taqdim etgan mukammal SEO matnlari
  const seoData = {
    uz: {
      title: "BWT Suv Filtrlari Katalogi — Mo'yka Osti va Oqimli Filtrlar",
      description:
        "Toshkentda BWT suv filtrlarining to'liq katalogi. Mo'yka va rakovina ostiga o'rnatiladigan ixcham filtrlar, oqimli ultra-filtratsiya tizimlari va barcha turdagi almashtiriladigan kartrijlar hamyonbop narxlarda.",
      localeUrl: "uz/catalog",
    },
    ru: {
      title: "Каталог Фильтров BWT — Фильтры Под Мойку и Ультрафильтрация",
      description:
        "Полный каталог систем очистки воды BWT в Ташкенте. Компактные фильтры под мойку и раковину, системы ультрафильтрации и проточные фильтры без осмоса. Выберите идеальный фильтр премиум-класса для кухни.",
      localeUrl: "catalog",
    },
  };

  const currentSeo = isUz ? seoData.uz : seoData.ru;

  return {
    metadataBase: new URL("https://bwt-uzb.uz"),
    title: currentSeo.title,
    description: currentSeo.description,

    // Google uchun Canonical va muqobil til manzillarini bog'lash
    alternates: {
      canonical: `https://bwt-uzb.uz/${currentSeo.localeUrl}`,
      languages: {
        "uz-UZ": "https://bwt-uzb.uz/uz/catalog",
        "ru-UZ": "https://bwt-uzb.uz/catalog",
        "x-default": "https://bwt-uzb.uz/catalog",
      },
    },

    // Ijtimoiy tarmoqlarda katalog linki ulashilgandagi ko'rinish
    openGraph: {
      title: currentSeo.title,
      description: currentSeo.description,
      locale: isUz ? "uz_UZ" : "ru_UZ",
      siteName: "BWT Uzbekistan",
      type: "website",
      url: `https://bwt-uzb.uz/${currentSeo.localeUrl}`,
      images: [
        {
          url: "/images/bwt-logo-1200w.png",
          width: 1200,
          height: 630,
          alt: "BWT Filter Catalog",
        },
      ],
    },

    // Twitter / X kartalari uchun
    twitter: {
      card: "summary_large_image",
      title: currentSeo.title,
      description: currentSeo.description,
      images: ["/images/bwt-logo-1200w.png"],
    },
  };
}

export default async function CatalogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "catalogPage" });
  const products = await fetchProducts();

  return (
    <>
      {/* Hero (navy) */}
      <section className="bg-bwt-navy text-bwt-ivory">
        <div className="mx-auto flex min-h-[280px] max-w-[1440px] flex-col justify-center px-6 py-16 lg:min-h-[320px] lg:px-16">
          <p className="mb-5 font-sans text-xs uppercase tracking-[0.25em] text-bwt-gold">
            {t("eyebrow")}
          </p>
          <h1 className="font-serif text-4xl font-normal leading-[1.1] sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-xl font-sans text-lg text-bwt-ivory/70">
            {t("subtitle")}
          </p>
        </div>
      </section>

      <CatalogClient products={products} locale={locale} />
    </>
  );
}
