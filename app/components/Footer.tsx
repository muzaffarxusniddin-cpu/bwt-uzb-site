import Link from "next/link";
import { BRAND } from "@/lib/config";
import { Phone, Mail, MapPin, Camera, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[color:var(--primary-dark)] text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white text-[color:var(--primary)] font-bold text-sm">BWT</span>
            <span className="font-bold">BWT Uzbekistan</span>
          </div>
          <p className="text-sm text-blue-100 leading-relaxed">
            Официальный дистрибьютор BWT в Узбекистане. Чистая вода для дома, офиса и производства.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold tracking-wider uppercase text-blue-200 mb-3">Навигация</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/catalog"  className="hover:text-white text-blue-100">Каталог</Link></li>
            <li><Link href="/services" className="hover:text-white text-blue-100">Услуги</Link></li>
            <li><Link href="/about"    className="hover:text-white text-blue-100">О компании</Link></li>
            <li><Link href="/contacts" className="hover:text-white text-blue-100">Контакты</Link></li>
            <li><Link href="/request"  className="hover:text-white text-blue-100">Оставить заявку</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold tracking-wider uppercase text-blue-200 mb-3">Контакты</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2"><Phone className="w-4 h-4 mt-0.5 shrink-0" />
              <a href={BRAND.phoneHref} className="hover:text-white text-blue-100">{BRAND.phone}</a>
            </li>
            <li className="flex items-start gap-2"><Mail className="w-4 h-4 mt-0.5 shrink-0" />
              <a href={`mailto:${BRAND.email}`} className="hover:text-white text-blue-100">{BRAND.email}</a>
            </li>
            <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0" />
              <span className="text-blue-100">{BRAND.address}</span>
            </li>
            <li className="text-blue-200 text-xs mt-2">{BRAND.workingHours}</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold tracking-wider uppercase text-blue-200 mb-3">Соц. сети</h4>
          <div className="flex gap-2">
            <a href={BRAND.telegram} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-sm">
              <Send className="w-4 h-4" /> Telegram
            </a>
            <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-sm">
              <Camera className="w-4 h-4" /> Instagram
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 text-xs text-blue-200 flex flex-wrap justify-between gap-2">
          <span>© {new Date().getFullYear()} {BRAND.legalName}</span>
          <span>Сделано с заботой о чистой воде 💧</span>
        </div>
      </div>
    </footer>
  );
}
