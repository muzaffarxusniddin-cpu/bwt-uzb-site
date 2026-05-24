// Curated catalog section copy, kept here (not in messages/*.json) so RU output is
// byte-identical to v2 and UZ can be added without touching ru.json.
// TODO(i18n): could be folded into next-intl later; UZ strings are a draft pending native review.

export type CatalogStrings = {
  s1Eyebrow: string;
  s1Title: string;
  s1Text: string;
  taglines: [string, string, string];
  popular: string;
  learnPrice: string;
  compareTitle: string;
  compareFeature: string;
  rows: [string, string, string, string, string];
  s2Eyebrow: string;
  s2Title: string;
  s2Text: string;
  tiles: { title: string; text: string }[];
  learnComposition: string;
  fullEyebrow: string;
  fullTitle: string;
  fullSubtitle: string;
  showAll: string;
  hide: string;
  searchPlaceholder: string;
  all: string;
  notFound: string;
  details: string;
};

export const CATALOG_STRINGS: Record<string, CatalogStrings> = {
  ru: {
    s1Eyebrow: "Питьевая вода",
    s1Title: "Питьевая вода под мойку — BWT Slim",
    s1Text:
      "Компактные системы под мойку. UF-мембрана 0.01 μm во всех моделях — сохраняют натуральный полезный состав воды.",
    taglines: ["Полная безопасность", "Защита от накипи", "Обогащение минералами"],
    popular: "★ Популярный",
    learnPrice: "Узнать цену",
    compareTitle: "Сравнение моделей",
    compareFeature: "Характеристика",
    rows: [
      "UF-мембрана 0.01 μm",
      "Угольный картридж",
      "Ионообменное умягчение",
      "BWT Magnesium минерализация",
      "Главная задача",
    ],
    s2Eyebrow: "Весь дом",
    s2Title: "Фильтрация для всего дома",
    s2Text:
      "Решения для всего дома, бизнеса и производства — от умягчения до промышленной водоподготовки.",
    tiles: [
      { title: "Колонные умягчители", text: "Умягчение воды для всего дома. Защита труб, бойлеров и сантехники от накипи." },
      { title: "Магистральные фильтры", text: "Предварительная очистка на входе в дом — песок, ржавчина и крупные примеси." },
      { title: "Промышленные системы", text: "Водоподготовка для бизнеса, производства и общественных зданий." },
    ],
    learnComposition: "Узнать состав",
    fullEyebrow: "Весь ассортимент",
    fullTitle: "Полный каталог BWT",
    fullSubtitle:
      "Все 54 модели — для тех, кто знает что ищет. Поиск по названию, фильтры по категориям.",
    showAll: "Показать все модели",
    hide: "Свернуть",
    searchPlaceholder: "Поиск по каталогу…",
    all: "Все",
    notFound: "Ничего не найдено. Сбросьте фильтры.",
    details: "Подробнее",
  },
  uz: {
    s1Eyebrow: "Ichimlik suvi",
    s1Title: "Rakovina osti ichimlik suvi — BWT Slim",
    s1Text:
      "Rakovina ostiga o'rnatiladigan ixcham tizimlar. Barcha modellarda UF-membrana 0.01 μm — suvning tabiiy foydali tarkibini saqlaydi.",
    taglines: ["To'liq xavfsizlik", "Cho'kmadan himoya", "Minerallar bilan boyitish"],
    popular: "★ Mashhur",
    learnPrice: "Narxni bilish",
    compareTitle: "Modellarni taqqoslash",
    compareFeature: "Xususiyat",
    rows: [
      "UF-membrana 0.01 μm",
      "Faol ko'mirli kartrij",
      "Ion almashinish yumshatish",
      "BWT Magnesium minerallashtirish",
      "Asosiy vazifa",
    ],
    s2Eyebrow: "Butun uy",
    s2Title: "Butun uy uchun filtratsiya",
    s2Text:
      "Butun uy, biznes va ishlab chiqarish uchun yechimlar — yumshatishdan sanoat suv tayyorlashgacha.",
    tiles: [
      { title: "Kolonnali yumshatgichlar", text: "Butun uy uchun suvni yumshatish. Quvur, boyler va santexnikani quyqadan himoya qiladi." },
      { title: "Magistral filtrlar", text: "Uy kirishida dastlabki tozalash — qum, zang va yirik aralashmalar." },
      { title: "Sanoat tizimlari", text: "Biznes, ishlab chiqarish va jamoat binolari uchun suv tayyorlash." },
    ],
    learnComposition: "Tarkibini bilish",
    fullEyebrow: "Butun assortiment",
    fullTitle: "To'liq BWT katalog — barcha modellar",
    fullSubtitle:
      "Barcha 54 model — nima izlayotganini biladiganlar uchun. Nom bo'yicha qidiruv, kategoriya filtrlari.",
    showAll: "Barcha modellarni ko'rsatish",
    hide: "Yig'ish",
    searchPlaceholder: "Katalogdan qidirish…",
    all: "Barchasi",
    notFound: "Hech narsa topilmadi. Filtrlarni tozalang.",
    details: "Batafsil",
  },
};
