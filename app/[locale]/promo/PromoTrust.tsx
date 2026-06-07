import styles from "./promo.module.css";
import Certifications from "@/app/components/Certifications";

type TrustCopy = {
  eyebrow: string;
  titleA: string;
  titleAccent: string;
  lead: string;
  stats: ReadonlyArray<{ num: string; unit: string; label: string }>;
  objectsTitle: string;
  objectsMeta: string;
  objects: ReadonlyArray<{ name: string; cat: string }>;
  moreName: string;
  moreCat: string;
  certsLabel: string;
};

type Props = {
  copy: TrustCopy;
};

export default function PromoTrust({ copy }: Props) {
  return (
    <section id="trust" className={styles.trustSection}>
      <div className={styles.container}>
        <div className={styles.trustHeader}>
          <div className={styles.eyebrow}>{copy.eyebrow}</div>
          <h2>
            {copy.titleA}{" "}
            <span className={styles.serif} style={{ color: "var(--bwt-pink)" }}>
              {copy.titleAccent}
            </span>
          </h2>
          <p className={styles.lead}>{copy.lead}</p>
        </div>

        <div className={styles.trustStats}>
          {copy.stats.map((stat) => (
            <div key={stat.label} className={`${styles.trustStat} ${styles.fadeIn}`}>
              <div className={styles.num}>
                {stat.num}
                <span className={styles.unit}>{stat.unit}</span>
              </div>
              <div className={styles.lbl}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div className={styles.trustObjectsHeader}>
          <h3>{copy.objectsTitle}</h3>
          <div className={styles.meta}>{copy.objectsMeta}</div>
        </div>

        <div className={styles.objectsGrid}>
          {copy.objects.map((obj, i) => (
            <div key={obj.name} className={`${styles.objectTile} ${styles.fadeIn}`}>
              <div className={styles.n}>{String(i + 1).padStart(2, "0")}</div>
              <div className={styles.name}>{obj.name}</div>
              <div className={styles.cat}>{obj.cat}</div>
            </div>
          ))}
          <div className={`${styles.objectTile} ${styles.objectTileMore} ${styles.fadeIn}`}>
            <div className={styles.n}>+</div>
            <div className={styles.name}>{copy.moreName}</div>
            <div className={styles.cat}>{copy.moreCat}</div>
          </div>
        </div>

        <div className={styles.certsRow}>
          <span className={styles.label}>{copy.certsLabel}</span>
        </div>
        <Certifications className="mt-5" />
      </div>
    </section>
  );
}
