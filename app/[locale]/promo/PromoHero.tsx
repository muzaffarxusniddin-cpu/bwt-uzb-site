import styles from "./promo.module.css";

type HeroCopy = {
  trustLabel: string;
  trustLogos: ReadonlyArray<string>;
  badge: string;
  title: string;
  subtitle: string;
  fineprint: string;
  ctaPrimary: string;
  ctaSecondary: string;
  shockUnit: string;
  shockText: string;
  badges: {
    ufA: string;
    ufB: string;
    warrantyA: string;
    warrantyB: string;
    installA: string;
    installB: string;
  };
};

type Props = {
  copy: HeroCopy;
};

/** Hero — fully visual, no client state. Kept as its own file so page.tsx stays lean. */
export default function PromoHero({ copy }: Props) {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.heroInner}>
          <div className={styles.heroTrustStrip}>
            <span className={styles.label}>{copy.trustLabel}</span>
            <div className={styles.logos}>
              {copy.trustLogos.map((logo) => (
                <span key={logo}>{logo}</span>
              ))}
            </div>
          </div>

          <div className={styles.heroGrid}>
            <div>
              <div className={styles.heroBadge}>
                <span className={styles.pulse} aria-hidden />
                <span>{copy.badge}</span>
              </div>

              <h1 className={styles.heroTitle}>{copy.title}</h1>

              <p className={styles.heroSub}>{copy.subtitle}</p>

              <div className={styles.heroCtas}>
                <a href="#offer" className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLg}`}>
                  {copy.ctaPrimary}
                  <svg
                    className={styles.arrow}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    aria-hidden
                  >
                    <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a href="#products" className={`${styles.btn} ${styles.btnGhostLight}`}>
                  {copy.ctaSecondary}
                </a>
                <p className={styles.heroFineprint}>{copy.fineprint}</p>
              </div>

              <div className={styles.heroShock}>
                <div className={styles.heroShockNum}>
                  14<span className={styles.sm}>{copy.shockUnit}</span>
                </div>
                <div className={styles.heroShockTxt}>{copy.shockText}</div>
              </div>
            </div>

            {/* CSS-only product hero — no extra asset load */}
            <div className={styles.heroVisual} aria-hidden>
              <div className={styles.heroProduct}>
                <div className={styles.productMock}>
                  <div className={styles.productScreen}>
                    <div className={styles.stat}>0.01μm</div>
                    <div className={styles.lbl}>UF</div>
                  </div>
                  <div className={styles.productLogo}>BWT</div>
                  <div className={styles.productPort} />
                </div>
                <div className={`${styles.qBadge} ${styles.qBadge1}`}>
                  <div className={styles.ic}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M9 11l3 3 8-8M21 12c0 5-4 9-9 9s-9-4-9-9 4-9 9-9c2 0 4 .5 5.5 1.5" />
                    </svg>
                  </div>
                  <div className={styles.txt}>
                    <div className={styles.a}>{copy.badges.ufA}</div>
                    <div className={styles.b}>{copy.badges.ufB}</div>
                  </div>
                </div>
                <div className={`${styles.qBadge} ${styles.qBadge2}`}>
                  <div className={`${styles.ic} ${styles.cyan}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 2L4 7v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V7l-8-5z" />
                    </svg>
                  </div>
                  <div className={styles.txt}>
                    <div className={styles.a}>{copy.badges.warrantyA}</div>
                    <div className={styles.b}>{copy.badges.warrantyB}</div>
                  </div>
                </div>
                <div className={`${styles.qBadge} ${styles.qBadge3}`}>
                  <div className={`${styles.ic} ${styles.gold}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                  </div>
                  <div className={styles.txt}>
                    <div className={styles.a}>{copy.badges.installA}</div>
                    <div className={styles.b}>{copy.badges.installB}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
