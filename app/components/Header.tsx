"use client";

import Link from "next/link";
import { useState } from "react";
import { BRAND } from "@/lib/config";
import { Menu, X, Phone } from "lucide-react";

const NAV = [
  { href: "/",         label: "Главная" },
  { href: "/catalog",  label: "Каталог" },
  { href: "/services", label: "Услуги" },
  { href: "/about",    label: "О компании" },
  { href: "/contacts", label: "Контакты" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-white font-bold text-sm shadow-sm"
            style={{ background: "var(--primary)" }}>BWT</span>
          <span className="hidden sm:block">
            <div className="text-sm font-bold leading-tight">BWT Uzbekistan</div>
            <div className="text-[11px] text-gray-500 leading-tight">{BRAND.tagline}</div>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {NAV.map(n => (
            <Link key={n.href} href={n.href}
              className="text-sm text-gray-700 hover:text-[color:var(--primary)] font-medium transition">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href={BRAND.phoneHref}
            className="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-[color:var(--primary)] hover:bg-blue-50 transition">
            <Phone className="w-4 h-4" />
            {BRAND.phone}
          </a>
          <Link href="/request"
            className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold text-white shadow-sm hover:shadow transition"
            style={{ background: "var(--primary)" }}>
            Оставить заявку
          </Link>
          <button onClick={() => setOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            aria-label="Меню">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/40" onClick={() => setOpen(false)}>
          <div className="absolute right-0 top-0 bottom-0 w-72 max-w-[85vw] bg-white shadow-2xl flex flex-col"
            onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <span className="font-semibold">Меню</span>
              <button onClick={() => setOpen(false)} className="p-2 rounded-lg hover:bg-gray-100" aria-label="Закрыть">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 p-2">
              {NAV.map(n => (
                <Link key={n.href} href={n.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 rounded-lg hover:bg-gray-50 text-base font-medium text-gray-800">
                  {n.label}
                </Link>
              ))}
            </nav>
            <div className="p-4 border-t border-gray-100 space-y-2">
              <a href={BRAND.phoneHref}
                className="flex items-center gap-2 px-4 py-3 rounded-lg bg-gray-50 text-[color:var(--primary)] font-medium">
                <Phone className="w-5 h-5" /> {BRAND.phone}
              </a>
              <Link href="/request" onClick={() => setOpen(false)}
                className="block text-center px-4 py-3 rounded-lg text-white font-semibold"
                style={{ background: "var(--primary)" }}>
                Оставить заявку
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
