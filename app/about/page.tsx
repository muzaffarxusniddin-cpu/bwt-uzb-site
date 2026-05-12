import { BRAND } from "@/lib/config";
import { Award, Globe, Users, Heart } from "lucide-react";

export const metadata = {
  title: "О компании · BWT Uzbekistan",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-16">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">О компании</h1>
          <p className="text-gray-500 mt-2 max-w-2xl">
            Best Water Technology — европейский лидер в фильтрации воды с 1990 года.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">

        <div className="prose max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Best Water Technology</h2>
          <p className="text-gray-700 leading-relaxed">
            BWT — крупнейший в Европе производитель систем водоподготовки.
            Штаб-квартира в Австрии, заводы в Германии, представительства в более чем 80 странах.
            Технологии BWT защищают воду в миллионах квартир, отелей, ресторанов и больниц Европы.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-gray-100 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "var(--bg)", color: "var(--primary)" }}>
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <div className="font-semibold mb-1">80+ стран</div>
              <div className="text-sm text-gray-500">Представительства BWT по всему миру</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-gray-100 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "var(--bg)", color: "var(--primary)" }}>
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="font-semibold mb-1">30+ лет опыта</div>
              <div className="text-sm text-gray-500">Производство в Германии с 1990 года</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-gray-100 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "var(--bg)", color: "var(--primary)" }}>
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="font-semibold mb-1">Сертифицированные инженеры</div>
              <div className="text-sm text-gray-500">Установка и сервис по стандартам BWT</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-gray-100 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "var(--bg)", color: "var(--primary)" }}>
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <div className="font-semibold mb-1">Забота о здоровье</div>
              <div className="text-sm text-gray-500">Чистая вода — основа здоровья семьи</div>
            </div>
          </div>
        </div>

        <div className="prose max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">BWT в Узбекистане</h2>
          <p className="text-gray-700 leading-relaxed">
            {BRAND.legalName} — официальный дистрибьютор BWT в Узбекистане.
            Мы доставляем оригинальную продукцию напрямую с европейских заводов, обеспечиваем
            профессиональную установку и сервисное обслуживание по стандартам производителя.
          </p>
          <p className="text-gray-700 leading-relaxed mt-3">
            В нашей команде — сертифицированные инженеры, прошедшие обучение в BWT.
            Мы используем ту же ERP-систему для отслеживания каждого фильтра у клиента,
            что и крупные европейские дистрибьюторы — поэтому никто не забудет про вовремя сделанный сервис.
          </p>
        </div>
      </section>
    </>
  );
}
