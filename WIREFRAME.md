# BWT Uzbekistan — Premium Website Wireframe v1.0

## 1. Tech Stack

- **Framework:** Next.js 15 App Router + TypeScript
- **Styling:** Tailwind CSS v4 + CSS Variables
- **Animations:** Framer Motion v11
- **Smooth scroll:** Lenis
- **3D/Hero:** Spline (embedded scene) или CSS keyframes
- **Images:** Next/Image + AVIF/WebP
- **Forms:** React Hook Form + Zod validation
- **Icons:** Lucide React (outline only)
- **i18n:** next-intl (RU primary, UZ secondary)
- **Analytics:** Vercel Analytics + GTM placeholder
- **Hosting:** Vercel + bwt-uzb.uz domain
- **API integration:** Existing ERP at erp-bwt.uz for /leads, /products endpoints

## 2. Design System

### 2.1 Color tokens
```css
:root {
  /* Primary palette */
  --bwt-navy: #0A1628;          /* primary brand */
  --bwt-navy-light: #1B2942;    /* hover, secondary surfaces */
  --bwt-navy-dark: #050B17;     /* deep accents */

  /* Luxury accent */
  --bwt-gold: #C9A961;          /* CTA, key highlights */
  --bwt-gold-light: #D9BC78;    /* hover */
  --bwt-gold-dark: #A88A48;     /* pressed state */

  /* Subtle accents */
  --bwt-aqua: #4DD0E1;          /* water hint, icons */
  --bwt-aqua-soft: #B2EBF2;     /* backgrounds */

  /* Neutrals */
  --bwt-ivory: #FAFAF7;         /* light backgrounds */
  --bwt-cream: #F5F2EB;         /* alternate light */
  --bwt-charcoal: #1A1A1A;      /* text on light */
  --bwt-graphite: #6B6B6B;      /* secondary text */
  --bwt-silver: #D4D4D4;        /* borders, dividers */

  /* Semantic */
  --bwt-success: #2D7A4F;
  --bwt-danger: #B8473A;
}
```

### 2.2 Typography
```css
/* Headlines — Editorial serif */
font-family: 'Playfair Display', 'Cormorant Garamond', serif;
/* UI / body — Modern sans */
font-family: 'Inter', 'PP Neue Montreal', system-ui;
/* Uzbek text — handles Cyrillic + Latin properly */
font-family: 'Inter', 'Noto Sans', system-ui;
```

**Type scale:**
- Display XL (Hero): 88px / 96px line / weight 300
- Display L (Section H1): 64px / 72px / 400
- Display M (Section H2): 48px / 56px / 400
- H3: 32px / 40px / 400
- H4: 24px / 32px / 500
- Body L: 20px / 32px / 400
- Body: 16px / 28px / 400
- Caption: 13px / 20px / 500 letter-spacing 1.5px uppercase

**Mobile scale (multiply by 0.65):**
- Display XL → 56px
- Display L → 42px
- Display M → 32px

### 2.3 Spacing scale
```
xs: 4px    sm: 8px    md: 16px   lg: 24px
xl: 40px   2xl: 64px  3xl: 96px  4xl: 128px
section: 160px (vertical between sections, desktop)
section-mobile: 80px
```

### 2.4 Container widths
- Wide content: max-width 1440px, padding 64px (desktop) / 24px (mobile)
- Narrow content (text-heavy): max-width 720px
- Hero: full-bleed (100vw)

### 2.5 Border radius
- Buttons: 4px (sharp, premium)
- Cards: 12px
- Images: 8px
- Avatars: 50%

### 2.6 Shadows (используем редко)
```css
--shadow-soft: 0 1px 3px rgba(10, 22, 40, 0.06);
--shadow-card: 0 10px 30px rgba(10, 22, 40, 0.08);
--shadow-modal: 0 40px 60px rgba(10, 22, 40, 0.15);
```

## 3. Layout grid
- Desktop: 12-column grid, 32px gutters
- Tablet: 8-column, 24px gutters
- Mobile: 4-column, 16px gutters

---

## 4. Global components

### 4.1 Top navigation
```
Desktop (height 88px, transparent → navy 95% on scroll):
┌──────────────────────────────────────────────────────────────┐
│  [Logo 120x40]    Продукты  Технология  Сервис  О нас        │
│                                                              │
│                                          RU | UZ  +998 77    │
│                                          407-87-77  [CTA]   │
└──────────────────────────────────────────────────────────────┘

Mobile (height 64px):
┌──────────────────────────────────────────────────────────────┐
│  [Logo]                                          [Menu icon] │
└──────────────────────────────────────────────────────────────┘

Mobile menu (slide-in from right, full-height):
- Same items vertically
- Language toggle at bottom
- Phone CTA prominent
```

### 4.2 Footer
```
6 columns desktop, 2 columns mobile:
[Logo + tagline]   Продукты   Сервис   Компания   Контакты   Соцсети

Bottom strip:
© 2026 BWT Uzbekistan · Конфиденциальность · Оферта · Гарантия
```

---

## 5. SECTION-BY-SECTION WIREFRAME

### Section 1 — Hero (100vh)
```
LAYER STRUCTURE:

[Layer 1 — Background video/3D]
- Looping 6-sec video: water droplet on marble (slow motion)
- OR Spline 3D scene of water droplet
- Fallback: high-res image
- Filter: brightness 70%

[Layer 2 — Dark gradient overlay]
- linear-gradient(rgba(10,22,40,0.6) 0%, rgba(10,22,40,0.2) 50%, rgba(10,22,40,0.7) 100%)

[Layer 3 — Content, vertically centered]

Desktop layout (1440x900):
┌──────────────────────────────────────────────────────┐
│                                                      │
│  [Logo BWT — top left, fixed nav]                    │
│                                                      │
│                                                      │
│                                                      │
│         BEST WATER TECHNOLOGY                        │
│         (caption, gold, uppercase, letter-spacing)   │
│                                                      │
│         Качество воды.                               │
│         Качество жизни.                              │
│         (88px Playfair, weight 300, ivory)           │
│                                                      │
│         Suv sifati. Hayot sifati.                    │
│         (20px Inter, weight 400, ivory/60%)          │
│                                                      │
│         Немецкая инженерия для дома, где             │
│         важно качество каждой капли.                 │
│         (20px Inter, max-width 540px, ivory/85%)     │
│                                                      │
│         [Подобрать систему →]  Бесплатный анализ →   │
│         (gold button)           (gold text-link)     │
│                                                      │
│                                                      │
│         ↓ scroll to discover                         │
│         (caption, bottom 64px, pulsing)              │
│                                                      │
└──────────────────────────────────────────────────────┘

Mobile (375x812):
- Headline 56px instead of 88px
- Buttons stack vertically, full-width
- Video → still image (perf)

ANIMATIONS:
[On mount, staggered]
1. Logo: opacity 0→1 (0.4s)
2. Caption (Best Water Technology): fade-up 20px (0.5s, delay 0.2s)
3. Headline: fade-up 30px + slight scale 0.98→1 (0.8s, delay 0.4s, cubic-bezier)
4. UZ subtitle: fade-up (0.6s, delay 0.8s)
5. Body: fade-up (0.6s, delay 1s)
6. Buttons: fade-up + scale 0.95→1 (0.5s, delay 1.2s)
7. Scroll cue: fade-in + bounce infinite (1s after load)

[On scroll]
- Background video: parallax slower scroll (transform translateY)
- Content: fade out as user scrolls down (opacity tied to scroll)
```

---

### Section 2 — Скрытая угроза (Hidden Threat)
```
Background: var(--bwt-ivory)
Padding: 160px top/bottom desktop, 80px mobile

Desktop layout (1440 wide):
┌──────────────────────────────────────────────────────┐
│                                                      │
│  HIDDEN COMPOSITION  (caption, gold uppercase)       │
│                                                      │
│  То, чего вы не видите                               │
│  в стакане воды Узбекистана                          │
│  (64px Playfair, weight 400, charcoal, max 800px)    │
│                                                      │
│  ┌────────────────────┐  ┌────────────────────┐     │
│  │  Большое фото      │  │  Микрокопи         │     │
│  │  макро-съёмка      │  │  + 4 бул. пункта   │     │
│  │  накипи / частиц   │  │                    │     │
│  │                    │  │  Прозрачность      │     │
│  │  (50% width)       │  │  воды ничего       │     │
│  │  aspect 4:5        │  │  не говорит...     │     │
│  │                    │  │                    │     │
│  │                    │  │  • Жёсткость 12+   │     │
│  │                    │  │  • Хлор/хлораты    │     │
│  │                    │  │  • Тяжёлые металлы │     │
│  │                    │  │  • Микропластик    │     │
│  │                    │  │                    │     │
│  │                    │  │  ─────────         │     │
│  │                    │  │  Бутыли для пить.  │     │
│  │                    │  │  А душ, готовка?   │     │
│  │                    │  │  (italic, gold)    │     │
│  └────────────────────┘  └────────────────────┘     │
│                                                      │
└──────────────────────────────────────────────────────┘

Mobile: stack vertically (image first, then text)

ANIMATIONS:
- Headline: на entering viewport, fade-up + character-by-character reveal
- Image: reveal как clip-path (slide from top)
- Bullets: stagger fade-in slide-from-left (50ms каждый)
```

---

### Section 3 — Что страдает (Pain points)
```
Background: var(--bwt-navy)
Color: var(--bwt-ivory)
Padding: 160px

Desktop:
┌──────────────────────────────────────────────────────┐
│                                                      │
│  CONSEQUENCES (caption, gold)                        │
│                                                      │
│  Эта вода уже работает против вас                    │
│  (Display L, ivory, max 720px)                       │
│                                                      │
│  Простой стакан воды влияет на 6 областей жизни,     │
│  о которых обычно никто не задумывается.             │
│  (Body L, ivory/70%, max 540px)                      │
│                                                      │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐        │
│  │ [icon gold]│ │ [icon gold]│ │ [icon gold]│        │
│  │            │ │            │ │            │        │
│  │ КОЖА ДЕТЕЙ │ │  ВОЛОСЫ    │ │  ТЕХНИКА   │        │
│  │            │ │            │ │            │        │
│  │ Сухость... │ │ Жёсткая... │ │ Стиральная │        │
│  └────────────┘ └────────────┘ └────────────┘        │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐        │
│  │ ВКУС ЕДЫ   │ │ ЗДОРОВЬЕ   │ │ ВРЕМЯ И    │        │
│  │            │ │  РОДИТЕЛЕЙ │ │   ДЕНЬГИ   │        │
│  └────────────┘ └────────────┘ └────────────┘        │
│                                                      │
│  Каждый день без фильтра — решение,                  │
│  которое стоит вам денег и здоровья.                 │
│  (italic, gold, centered)                            │
│                                                      │
└──────────────────────────────────────────────────────┘

Cards:
- bg: rgba(255,255,255,0.04) с border 0.5px rgba(201,169,97,0.2)
- padding 32px
- aspect 4:5 desktop, 1:1 mobile
- hover: bg rgba(255,255,255,0.08), translate Y -4px

Mobile: 2 columns, 6 cards

ANIMATIONS:
- Headline: fade-up
- Cards: staggered fade-up + scale 0.95→1 (по 100ms)
- Hover: subtle gold glow on icon
```

---

### Section 4 — BWT Slim Reveal
```
Background: linear-gradient(135deg, ivory 0%, cream 100%)
Padding: 200px top, 160px bottom (extra space for hero product)

Desktop:
┌──────────────────────────────────────────────────────┐
│                                                      │
│  [Caption: THE SOLUTION, gold uppercase]             │
│                                                      │
│  Немецкая инженерия                                  │
│  для узбекского дома                                 │
│  (Display L, charcoal)                               │
│                                                      │
│  ┌──────────────────────┐  ┌────────────────────┐    │
│  │                      │  │  3 facts:          │    │
│  │  [BIG PRODUCT IMG]   │  │                    │    │
│  │  BWT Slim, hero shot │  │  35 ЛЕТ            │    │
│  │  на чистом фоне      │  │  Основан 1990.     │    │
│  │  с тонкой тенью      │  │                    │    │
│  │                      │  │  ─────             │    │
│  │  60% width           │  │                    │    │
│  │  aspect 1:1.2        │  │  90+ СТРАН         │    │
│  │                      │  │  От Швейцарии...   │    │
│  │  PARALLAX:           │  │                    │    │
│  │  rotate slightly     │  │  ─────             │    │
│  │  on scroll           │  │                    │    │
│  │                      │  │  ПРЕМИУМ-КЛАСС     │    │
│  │                      │  │  5★ отели...       │    │
│  └──────────────────────┘  └────────────────────┘    │
│                                                      │
│  ─────────                                           │
│  BWT Slim — флагманская линейка                      │
│  Компактная установка под мойку.                     │
│  (Body L, max 720px)                                 │
│                                                      │
│  [Изучить технологию ↓]                              │
│                                                      │
└──────────────────────────────────────────────────────┘

ANIMATIONS:
- Product image: при scroll проявляется (clip-path reveal)
- Image rotates 0deg → -5deg subtle on scroll progress (Framer scroll values)
- 3 facts: staggered fade-in
- Dividers: scale-x 0→1 (drawn animation)
```

---

### Section 5 — Технология (5 ступеней)
```
Background: var(--bwt-navy)
Color: ivory
Layout: STICKY SCROLLYTELLING

Desktop (height 5 × 100vh for sticky steps):
┌──────────────────────────────────────────────────────┐
│                                                      │
│  Left side (sticky, follows scroll):                 │
│  ┌────────────────────┐                              │
│  │                    │                              │
│  │  [Visualization]   │  Right side (scrolls):       │
│  │                    │                              │
│  │  3D cross-section  │  Caption: TECHNOLOGY         │
│  │  of filter showing │                              │
│  │  current stage     │  Пять ступеней               │
│  │  highlighted in    │  между трубой                │
│  │  gold              │  и вашим стаканом            │
│  │                    │                              │
│  │  Each stage:       │  ───                         │
│  │  rotation +        │                              │
│  │  zoom              │  СТУПЕНЬ 1                   │
│  │                    │  Механическая                │
│  │  50% width         │  Удаляет ржавчину...         │
│  │  sticky position   │                              │
│  └────────────────────┘  ───                         │
│                                                      │
│                          СТУПЕНЬ 2                   │
│                          Угольная                    │
│                          Австрийский...              │
│                                                      │
│                          ...continues for 5 stages   │
│                                                      │
│  After 5 stages — release sticky and show:           │
│                                                      │
│  ┌──────────────────────────────────────────┐        │
│  │  На входе — вода городского водопровода. │        │
│  │  На выходе — вода уровня премиум-        │        │
│  │  минеральной.                            │        │
│  │  (Display M, italic, centered, ivory)    │        │
│  └──────────────────────────────────────────┘        │
│                                                      │
│  [TÜV Austria] [NSF] [ISO 9001]                      │
│  (logos, 50% opacity, hover 100%)                    │
│                                                      │
└──────────────────────────────────────────────────────┘

Mobile:
- Sticky abandoned, replaced with sequential cards
- Each step = full screen card with image + text

ANIMATIONS:
- IntersectionObserver tracks which step is active
- Visualization morphs/rotates between steps (Framer)
- Active step text: gold accent, others: 50% opacity
```

---

### Section 6 — Жизнь с BWT (Lifestyle Gallery)
```
Background: var(--bwt-ivory)
Padding: 160px

Desktop — magazine editorial layout:
┌──────────────────────────────────────────────────────┐
│                                                      │
│  THE EXPERIENCE (caption, gold)                      │
│                                                      │
│  Один установочный день.                             │
│  Перемены навсегда.                                  │
│                                                      │
│  [Filter pills: Утро · Готовка · Дети · Гости]       │
│                                                      │
│  Asymmetric grid (6 cards):                          │
│  ┌──────────┐  ┌──────────────────┐                  │
│  │ Утро     │  │  Чай для гостей  │                  │
│  │ (small)  │  │  (large, span 2) │                  │
│  └──────────┘  │                  │                  │
│  ┌──────────┐  │                  │                  │
│  │ Готовка  │  │                  │                  │
│  │ (small)  │  └──────────────────┘                  │
│  └──────────┘  ┌──────────┐ ┌──────────┐             │
│  ┌──────────┐  │ Дети     │ │ Техника  │             │
│  │ Большая  │  │          │ │          │             │
│  │ карточка │  └──────────┘ └──────────┘             │
│  │ "Спокой- │  ┌────────────────────────┐            │
│  │  ствие"  │  │ Время                  │            │
│  │ (span 2x │  │ (wide card)            │            │
│  │  high)   │  └────────────────────────┘            │
│  └──────────┘                                        │
│                                                      │
└──────────────────────────────────────────────────────┘

Card structure:
- Image (full-bleed)
- Overlay gradient bottom (navy 0→80%)
- Title + 2-line description bottom-left (ivory)
- Hover: image scale 1.05 (1s ease), title slides up

Mobile: simple vertical stack (all cards 1:1)

ANIMATIONS:
- Cards reveal on scroll, staggered
- Parallax внутри image (15% movement)
- Filter pills: smooth transition when filtering
```

---

### Section 7 — Линейка + Калькулятор
```
Background: var(--bwt-cream)
Padding: 160px

Part 1 — 3 product cards:
┌──────────────────────────────────────────────────────┐
│                                                      │
│  CHOOSE YOUR SYSTEM (caption, gold)                  │
│                                                      │
│  Подберите BWT Slim под ваш дом                      │
│                                                      │
│  ┌──────────┐  ┌══════════┐  ┌──────────┐            │
│  │  Slim 2  │  ║  Slim 3  ║  │  Slim 4  │            │
│  │   UF     │  ║   HW     ║  │   HW     │            │
│  │          │  ║ ★ POPULAR║  │          │            │
│  │ [PHOTO]  │  ║ [PHOTO]  ║  │ [PHOTO]  │            │
│  │          │  ║ (scaled  ║  │          │            │
│  │ Базовая  │  ║  larger) ║  │ Премиум  │            │
│  │ защита   │  ║          ║  │  полная  │            │
│  │          │  ║ Hard     ║  │          │            │
│  │ • bullets│  ║ water    ║  │ • bullets│            │
│  │ ...      │  ║ • bullets║  │ ...      │            │
│  │          │  ║ ...      ║  │          │            │
│  │ От $XXX  │  ║ От $XXX  ║  │ От $XXX  │            │
│  │ [Узнать] │  ║ [Узнать] ║  │ [Узнать] │            │
│  └──────────┘  └══════════┘  └──────────┘            │
│                  ↑ gold border, slightly elevated     │
│                                                      │
│  ──── divider ────                                   │
│                                                      │
│  Part 2 — Interactive calculator                     │
│                                                      │
│  Не знаете какая нужна?                              │
│  Калькулятор подбора за 60 секунд                    │
│                                                      │
│  ┌────────────────────────────────────────────┐      │
│  │  [Step 1 of 4]                             │      │
│  │  Тип жилья                                 │      │
│  │  ○ Квартира до 100 м²                      │      │
│  │  ○ Квартира 100-200 м²                     │      │
│  │  ○ Квартира 200+ м² / Частный дом          │      │
│  │  ○ Коттедж / Загородный дом                │      │
│  │                                            │      │
│  │  [Назад]              [Далее →]            │      │
│  │  (progress bar bottom)                     │      │
│  └────────────────────────────────────────────┘      │
│                                                      │
└──────────────────────────────────────────────────────┘

Calculator behavior:
- 4 steps in single card (no page reload)
- Smooth transition between steps (Framer AnimatePresence)
- Step indicator dots at bottom
- After step 4 → result card with recommended product
- "Записаться на анализ воды" CTA → lead form modal

ANIMATIONS:
- Featured card (Slim 3): slight pulse glow on border
- Steps: slide-left transition (exit) / slide-from-right (enter)
- Progress bar: scale-x animated
- Result card: confetti or subtle reveal animation
```

---

### Section 8 — Гарантии и сервис
```
Background: var(--bwt-navy)
Color: ivory
Padding: 160px

Desktop:
┌──────────────────────────────────────────────────────┐
│                                                      │
│  SERVICE ECOSYSTEM (caption, gold)                   │
│                                                      │
│  Один раз купили — десять лет не думаете             │
│  (Display L, ivory)                                  │
│                                                      │
│  ┌──────────────┐ ┌──────────────┐                   │
│  │ [01]         │ │ [02]         │                   │
│  │ УСТАНОВКА    │ │ ГАРАНТИЯ     │                   │
│  │              │ │              │                   │
│  │ За 90 минут  │ │ 3 года       │                   │
│  │ Inженер...   │ │ Все стан...  │                   │
│  └──────────────┘ └──────────────┘                   │
│  ┌──────────────┐ ┌──────────────┐                   │
│  │ [03]         │ │ [04]         │                   │
│  │ СЕРВИС       │ │ ПОДДЕРЖКА    │                   │
│  │              │ │              │                   │
│  │ Каждые 6 мес │ │ Telegram +   │                   │
│  │ Менеджер...  │ │ WhatsApp     │                   │
│  └──────────────┘ └──────────────┘                   │
│                                                      │
│  Выезд по всему Узбекистану                          │
│  (italic, gold, centered)                            │
│                                                      │
└──────────────────────────────────────────────────────┘

Card structure:
- bg: rgba(255,255,255,0.03) с border-left 2px gold
- padding 40px
- big number [01] in gold serif, 96px
- title uppercase letter-spacing
- description 16px ivory/70%

Mobile: 2x2 grid, smaller numbers

ANIMATIONS:
- Numbers: count-up animation (01 → 02 sequential)
- Cards: cascade in
- Border-left: scale-y 0→1 drawn animation
```

---

### Section 9 — Premium ЖК
```
Background: var(--bwt-ivory)
Padding: 160px

Desktop (как в widget выше):
┌──────────────────────────────────────────────────────┐
│                                                      │
│  INSTALLED IN UZBEKISTAN (caption, gold)             │
│                                                      │
│  300+                                                │
│  (Display XL, charcoal, centered)                    │
│                                                      │
│  премиум-объектов по всей стране                     │
│                                                      │
│  ┌────────────────────────────────────────────┐      │
│  │  ПРЕМИУМ-ЖК С УСТАНОВЛЕННЫМ BWT            │      │
│  │                                            │      │
│  │  01  NestOne          07  Modera Towers    │      │
│  │  02  Piramit          08  NRG Park         │      │
│  │  03  NRG Voha         09  KISLOROD ·       │      │
│  │  04  NRG Mirzo Ulug.       Murad Buildings │      │
│  │  05  NRG Hayot        10  Golden House     │      │
│  │  06  Mirabad Avenue   11  NRG Oybek        │      │
│  └────────────────────────────────────────────┘      │
│                                                      │
│  [100+ частных домов по всему Узбекистану]           │
│  (smaller pill-shaped card below)                    │
│                                                      │
└──────────────────────────────────────────────────────┘

Mobile: single column list, numbers on left

ANIMATIONS:
- 300+: count-up from 0 (1.5s)
- ЖК list: stagger fade-in (50ms each)
- Hover on row: gold underline draws (0.3s)
```

---

### Section 10 — Final CTA / Lead form
```
Background: var(--bwt-navy)
Padding: 200px
Full-bleed background image (low opacity 15%): premium kitchen

Desktop (centered, max-width 720px):
┌──────────────────────────────────────────────────────┐
│                                                      │
│                                                      │
│  Узнайте состав воды                                 │
│  в вашем доме.                                       │
│  Бесплатно. За 24 часа.                              │
│  (Display L, ivory, centered)                        │
│                                                      │
│  Лабораторный анализ из вашего крана.                │
│  Привезём, заберём, пришлём в Telegram.              │
│  (Body L, ivory/75%, centered, max 540px)            │
│                                                      │
│  ┌────────────────────────────────────────────┐      │
│  │  [Имя *                              ]      │      │
│  │  [+998 _________________________]           │      │
│  │  [Регион: dropdown ▼             ]          │      │
│  │                                            │      │
│  │  ○ Telegram  ○ WhatsApp  ○ Звонок          │      │
│  │                                            │      │
│  │  ┌────────────────────────────────────┐    │      │
│  │  │  ПОЛУЧИТЬ БЕСПЛАТНЫЙ АНАЛИЗ →     │    │      │
│  │  └────────────────────────────────────┘    │      │
│  │  (gold button, 56px height, full-width)    │      │
│  │                                            │      │
│  │  Никаких звонков для продаж.               │      │
│  │  Только результаты анализа.                │      │
│  │  (caption, ivory/60%, centered)            │      │
│  └────────────────────────────────────────────┘      │
│                                                      │
│  ─── alternative ways to reach ───                   │
│                                                      │
│  📞 +998 77 407-87-77                                │
│  💬 @bwt_uzb (Telegram)                              │
│  📱 WhatsApp                                         │
│  (icons gold, links ivory)                           │
│                                                      │
└──────────────────────────────────────────────────────┘

Form behavior:
- Inputs: transparent bg with border-bottom 1px ivory/30%
- Focus: border-bottom gold + label slides up
- Validation: zod schema, inline errors gold-red
- Submit: button shows spinner, then check icon
- Success: form replaced with thank-you message
- POST to /api/lead → forwards to erp-bwt.uz/api/public/leads

ANIMATIONS:
- Background image: subtle ken-burns (slow zoom)
- Form: fade-up on viewport entry
- Inputs: stagger reveal
```

---

### Section 11 — Footer
```
Background: var(--bwt-navy-dark)
Color: ivory/70%
Padding: 80px top, 32px bottom

Desktop layout (5 columns):
┌──────────────────────────────────────────────────────┐
│                                                      │
│  [Logo]    Продукты    Сервис    Компания    Связь   │
│            Slim 2 UF   Установка О бренде    +998... │
│  BWT       Slim 3 HW   Замена    Технология  @bwt..  │
│  Best...   Slim 4 HW   картрид.  Гарантия    Mail    │
│            Картриджи   Анализ    Партнёры    Адрес   │
│                                                      │
│  ─── divider ───                                     │
│                                                      │
│  © 2026 BWT Uzbekistan  ·  Privacy  ·  Oferta  ·     │
│  Гарантия                       [TÜV] [NSF] [ISO]    │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## 6. Page Routes
```
/                       → Главная (все 11 секций)
/products/slim-2-uf     → Карточка продукта
/products/slim-3-hw     → Карточка продукта
/products/slim-4-hw     → Карточка продукта
/products               → Каталог всех продуктов
/technology             → Подробная технология (deep-dive)
/service                → Сервис: установка, замена, гарантия
/about                  → О бренде BWT
/contacts               → Контакты + карта
/uz/...                 → Все то же на узбекском
```

## 7. API Integration
```
GET  /api/products      → Прокси к erp-bwt.uz/api/public/products
POST /api/lead          → Прокси к erp-bwt.uz/api/public/leads
POST /api/water-analysis → Запрос на бесплатный анализ
```

## 8. Performance Requirements
- LCP < 1.5s
- TBT < 200ms
- CLS < 0.05
- Total bundle < 250KB JS
- Hero image: AVIF + WebP, srcset, blur placeholder
- Lazy load всё ниже первого экрана
- Prefetch /products при hover на nav

## 9. SEO
```
<title>BWT Uzbekistan — Премиум фильтрация воды для дома</title>
<meta description="Немецкие фильтры BWT для квартир и домов в Узбекистане. Установка, сервис, гарантия 3 года. 300+ установок в премиум-ЖК.">

OG image: 1200x630 с лого + кадром BWT Slim
Schema.org: LocalBusiness, Product, AggregateRating
Sitemap: автогенерация
hreflang ru-UZ + uz-UZ
```

## 10. Mobile-first checklist
- Все touch-targets минимум 44x44px
- Forms: type="tel" с inputmode для номера
- Sticky CTA bar внизу на mobile (после section 2)
- WhatsApp floating button
- Меню без overflow, нативный scroll
- Шрифты subset для cyrillic + latin only
- Lighthouse mobile score >90
