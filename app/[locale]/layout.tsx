import type { Metadata, Viewport } from "next";
import "../globals.css";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Playfair_Display, Inter } from "next/font/google";
import { BRAND } from "@/lib/config";
import { routing } from "@/i18n/routing";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import SmoothScroll from "@/app/components/SmoothScroll";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isUz = locale === "uz";

  const seoData = {
    uz: {
      title:
        "BWT Uzbekistan — Nemis Sifati Asosidagi Suv Filtrlari va Tizimlari",
      description:
        "Dunyoning 122 mamlakatida tan olingan BWT suv filtrlari endi Toshkentda! Uy, xonadon va sanoat uchun Germaniya va Avstriya texnologiyalari asosidagi professional suv tozalash tizimlari. Rasmiy distribyutordan kafolatli mahsulotlar.",
      ogTitle: "BWT Uzbekistan — Premium Suv Tozalash Tizimlari",
      localeUrl: "uz",
      ogLocale: "uz_UZ",
    },
    ru: {
      title:
        "BWT Uzbekistan — Немецкие Фильтры для Воды от Официального Дистрибьютора",
      description:
        "Ищете надежную систему очистки воды? Немецкие фильтры BWT теперь в Ташкенте! Официальный дистрибьютор предлагает премиум фильтры под мойку (BWT Slim), умягчители и промышленные системы очистки воды с гарантией.",
      ogTitle: "BWT Uzbekistan — Немецкие Фильтры Премиум Класса",
      localeUrl: "",
      ogLocale: "ru_UZ",
    },
  };

  const currentSeo = isUz ? seoData.uz : seoData.ru;

  return {
    metadataBase: new URL("https://bwt-uzb.uz"),
    title: currentSeo.title,
    description: currentSeo.description,
    applicationName: BRAND.name,

    alternates: {
      canonical: `https://bwt-uzb.uz/${currentSeo.localeUrl}`,
      languages: {
        "uz-UZ": "https://bwt-uzb.uz/uz",
        "ru-UZ": "https://bwt-uzb.uz",
        "x-default": "https://bwt-uzb.uz",
      },
    },

    verification: {
      google: "JyetMDcKmg29g-BPPtYr5D7KLuu4hS_2QVNLOapluoc",
    },

    openGraph: {
      title: currentSeo.ogTitle,
      description: currentSeo.description,
      locale: currentSeo.ogLocale,
      siteName: BRAND.name,
      type: "website",
      url: `https://bwt-uzb.uz/${currentSeo.localeUrl}`,
      images: [
        {
          url: "/images/bwt-logo-1200w.png",
          width: 1200,
          height: 630,
          alt: BRAND.name,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: currentSeo.ogTitle,
      description: currentSeo.description,
      images: ["/images/bwt-logo-1200w.png"],
    },

    icons: {
      icon: [
        { url: "/icons/bwt-192.png", sizes: "192x192", type: "image/png" },
      ],
      apple: [
        { url: "/icons/bwt-192.png", sizes: "192x192", type: "image/png" },
      ],
      shortcut: "/icons/bwt-192.png",
    },
    manifest: "/manifest.json",
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a1628",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KQHHVBZ2"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <NextIntlClientProvider messages={messages}>
          <SmoothScroll />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>

      {/* Google Tag Manager - Head Script */}
      <Script id="gtm-script" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-KQHHVBZ2');`}
      </Script>

      <GoogleAnalytics gaId="G-XYKWF44598" />
    </html>
  );
}
