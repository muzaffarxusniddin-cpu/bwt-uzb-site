import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BRAND } from "@/lib/config";

export const metadata: Metadata = {
  title:        `${BRAND.name} — фильтры воды европейского производства`,
  description:  "Официальный дистрибьютор BWT в Узбекистане. Фильтры, умягчители, обратный осмос. Установка и сервис.",
  applicationName: BRAND.name,
  icons: {
    icon:        [{ url: "/icons/bwt-192.png", sizes: "192x192", type: "image/png" }],
    apple:       [{ url: "/icons/bwt-192.png", sizes: "192x192", type: "image/png" }],
    shortcut:    "/icons/bwt-192.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    title:       `${BRAND.name} — чистая вода для вашего дома`,
    description: "Фильтры BWT европейского производства Германии. Установка за 1 час. Гарантия 3 года.",
    locale:      "ru_UZ",
    siteName:    BRAND.name,
    type:        "website",
    images:      [{ url: "/images/bwt-logo-1200w.png", width: 1200, alt: "BWT Uzbekistan" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0057A8",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
