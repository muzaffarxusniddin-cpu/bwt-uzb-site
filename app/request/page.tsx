import { Suspense } from "react";
import RequestClient from "./RequestClient";

export const metadata = {
  title: "Оставить заявку · BWT Uzbekistan",
  description: "Подберём фильтр под вашу задачу. Менеджер свяжется в течение часа.",
};

export default function RequestPage() {
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10 lg:py-16">
      <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Оставить заявку</h1>
      <p className="text-gray-500 mb-8">
        Опишите задачу — менеджер свяжется в течение часа в рабочее время.
      </p>
      <Suspense fallback={<div className="text-gray-400 text-sm">Загрузка...</div>}>
        <RequestClient />
      </Suspense>
    </section>
  );
}
