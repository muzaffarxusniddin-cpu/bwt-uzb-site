import { BRAND } from "@/lib/config";
import LeadForm from "../components/LeadForm";
import { Phone, Mail, MapPin, Clock, Send, Camera } from "lucide-react";

export const metadata = {
  title: "Контакты · BWT Uzbekistan",
};

export default function ContactsPage() {
  return (
    <>
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-16">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">Контакты</h1>
          <p className="text-gray-500 mt-2 max-w-2xl">
            Свяжитесь с нами удобным способом — менеджер ответит в рабочее время.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid lg:grid-cols-2 gap-10">

        <div className="space-y-3">
          <a href={BRAND.phoneHref}
            className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-gray-100 hover:border-blue-200 transition">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: "var(--bg)", color: "var(--primary)" }}>
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">Телефон</div>
              <div className="text-lg font-semibold text-gray-900">{BRAND.phone}</div>
            </div>
          </a>

          <a href={BRAND.telegram} target="_blank" rel="noopener noreferrer"
            className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-gray-100 hover:border-blue-200 transition">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: "var(--bg)", color: "var(--primary)" }}>
              <Send className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">Telegram</div>
              <div className="text-lg font-semibold text-gray-900">{BRAND.telegramHandle}</div>
            </div>
          </a>

          <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer"
            className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-gray-100 hover:border-blue-200 transition">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: "var(--bg)", color: "var(--primary)" }}>
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">Instagram</div>
              <div className="text-lg font-semibold text-gray-900">{BRAND.instagramHandle}</div>
            </div>
          </a>

          <a href={`mailto:${BRAND.email}`}
            className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-gray-100 hover:border-blue-200 transition">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: "var(--bg)", color: "var(--primary)" }}>
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">Email</div>
              <div className="text-lg font-semibold text-gray-900">{BRAND.email}</div>
            </div>
          </a>

          <a href={BRAND.maps} target="_blank" rel="noopener noreferrer"
            className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-gray-100 hover:border-blue-200 transition">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: "var(--bg)", color: "var(--primary)" }}>
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">Адрес</div>
              <div className="text-base font-medium text-gray-900 leading-snug">{BRAND.address}</div>
              <div className="text-xs text-[color:var(--primary)] mt-1">Открыть на карте →</div>
            </div>
          </a>

          <div className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-gray-100">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: "var(--bg)", color: "var(--primary)" }}>
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">Часы работы</div>
              <div className="text-base font-medium text-gray-900">{BRAND.workingHours}</div>
            </div>
          </div>
        </div>

        <div>
          <LeadForm
            title="Напишите нам"
            subtitle="Оставьте сообщение — мы перезвоним в течение часа в рабочее время." />
        </div>
      </section>
    </>
  );
}
