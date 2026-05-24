import Hero from "@/app/components/Hero";
import HiddenThreat from "@/app/components/HiddenThreat";
import PainPoints from "@/app/components/PainPoints";
import SlimReveal from "@/app/components/SlimReveal";
import Technology from "@/app/components/Technology";
import Lifestyle from "@/app/components/Lifestyle";
import Lineup from "@/app/components/Lineup";
import ServiceGuarantees from "@/app/components/ServiceGuarantees";
import PremiumResidences from "@/app/components/PremiumResidences";
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
      {/* 8 — Гарантии и сервис */}
      <ServiceGuarantees />
      {/* 9 — Premium ЖК */}
      <PremiumResidences />
      {/* 10 — Final CTA / Lead form */}
      <FinalCTA />
    </>
  );
}
