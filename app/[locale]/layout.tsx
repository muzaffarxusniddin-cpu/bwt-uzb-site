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
// 1. Google Analytics import qilinadi
import { GoogleAnalytics } from "@next/third-parties/google";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://bwt-uzb.uz"),
  title: `${BRAND.name} — фильтры воды европейского производства`,
  description:
    "Официальный дистрибьютор BWT в Узбекистане. Фильтры, умягчители, обратный осмос. Установка и сервис.",
  applicationName: BRAND.name,
  icons: {
    icon: [{ url: "/icons/bwt-192.png", sizes: "192x192", type: "image/png" }],
    apple: [{ url: "/icons/bwt-192.png", sizes: "192x192", type: "image/png" }],
    shortcut: "/icons/bwt-192.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: `${BRAND.name} — чистая вода для вашего дома`,
    description:
      "Фильтры BWT европейского производства Германии. Установка за 1 час. Гарантия 3 года.",
    locale: "ru_UZ",
    siteName: BRAND.name,
    type: "website",
    images: [
      { url: "/images/bwt-logo-1200w.png", width: 1200, alt: "BWT Uzbekistan" },
    ],
  },
};

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
        <NextIntlClientProvider messages={messages}>
          <SmoothScroll />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>
      <GoogleAnalytics gaId="G-XYKWF44598" />
    </html>
  );
}
