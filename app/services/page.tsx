import Link from "next/link";
import { Wrench, Settings, FlaskConical, ArrowRight } from "lucide-react";
import LeadForm from "../components/LeadForm";

export const metadata = {
  title: "Услуги — установка, сервис, подбор · BWT Uzbekistan",
};

const SERVICES = [
  {
    icon: Wrench,
    title: "Установка фильтров",
    points: [
      "Профессиональная установка сертифицированными инженерами BWT",
      "Гарантия на работу — 12 месяцев",
      "Срок установки: 1–2 часа",
      "Бесплатно при покупке фильтра у нас",
    ],
  },
  {
    icon: Settings,
    title: "Сервисное обслуживание",
    points: [
      "Плановая замена картриджей",
      "Диагностика системы и проверка давления",
      "Чистка и санитарная обработка",
      "Напоминания через Telegram заблаговременно",
    ],
  },
  {
    icon: FlaskConical,
    title: "Подбор системы",
    points: [
      "Анализ воды на месте (тест-полоски)",
      "Расчёт производительности под вашу задачу",
      "Подбор оптимального решения по бюджету",
      "Рекомендации по эксплуатации",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-16">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">Услуги</h1>
          <p className="text-gray-500 mt-2 max-w-2xl">
            От подбора системы до установки и сервиса — всё под ключ от официального дистрибьютора BWT в Узбекистане.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-16">
        <div className="grid lg:grid-cols-3 gap-6">
          {SERVICES.map(s => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="bg-white rounded-2xl p-6 lg:p-7 border border-gray-100 shadow-sm">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: "linear-gradient(135deg, #0057A8, #00AEEF)", color: "white" }}>
                  <Icon className="w-7 h-7" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">{s.title}</h2>
                <ul className="space-y-2">
                  {s.points.map(p => (
                    <li key={p} className="flex gap-2 text-sm text-gray-600">
                      <span className="text-[color:var(--primary)] mt-0.5">✓</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link href="/request"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-xl text-white font-semibold shadow-md hover:shadow-lg transition"
            style={{ background: "var(--primary)" }}>
            Заказать услугу <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
        <LeadForm
          title="Бесплатная консультация"
          subtitle="Расскажите, какая у вас задача — поможем подобрать оптимальное решение." />
      </section>
    </>
  );
}
