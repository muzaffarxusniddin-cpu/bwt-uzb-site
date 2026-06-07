import Hero from "@/app/components/Hero";
import HiddenThreat from "@/app/components/HiddenThreat";
import PainPoints from "@/app/components/PainPoints";
import SlimReveal from "@/app/components/SlimReveal";
import Technology from "@/app/components/Technology";
import Lifestyle from "@/app/components/Lifestyle";
import Lineup from "@/app/components/Lineup";
import Installations from "@/app/components/Installations";
import ServiceGuarantees from "@/app/components/ServiceGuarantees";
import Founder from "@/app/components/Founder";
import Reviews from "@/app/components/Reviews";
import PremiumResidences from "@/app/components/PremiumResidences";
import ChangeTheWorld from "@/app/components/ChangeTheWorld";
import FinalCTA from "@/app/components/FinalCTA";

export default function Home() {
  return (
    <>
      {/* 1 — Hero */}
      <Hero />
      {/* 2 — Скрытая угроза */}
      <HiddenThreat />
      {/* 3 — Что страдает */}
      <PainPoints />
      {/* 4 — BWT Slim Reveal */}
      <SlimReveal />
      {/* 5 — Технология (5 ступеней) */}
      <Technology />
      {/* 6 — Жизнь с BWT */}
      <Lifestyle />
      {/* 7 — Линейка + Калькулятор */}
      <Lineup />
      {/* 7.5 — Реальные монтажи */}
      <Installations />
      {/* 8 — Гарантии и сервис */}
      <ServiceGuarantees />
      {/* 8.3 — Основатель */}
      <Founder />
      {/* 8.6 — Отзывы специалистов */}
      <Reviews />
      {/* 9 — Premium ЖК */}
      <PremiumResidences />
      {/* 9.5 — BWT Change the World (Africa CSR) */}
      <ChangeTheWorld />
      {/* 10 — Final CTA / Lead form */}
      <FinalCTA />
    </>
  );
}
