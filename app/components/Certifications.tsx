import Image from "next/image";

/** International certification logo badges (white cards — work on light & dark backgrounds). */
const CERTS = [
  { src: "/images/certs/tuv.webp", alt: "TÜV SÜD" },
  { src: "/images/certs/nsf.webp", alt: "NSF" },
  { src: "/images/certs/dvgw.webp", alt: "DVGW" },
  { src: "/images/certs/wras.webp", alt: "WRAS" },
  { src: "/images/certs/din.webp", alt: "DIN" },
  { src: "/images/certs/en.webp", alt: "EN" },
  { src: "/images/certs/iso.webp", alt: "ISO 9001" },
];

export default function Certifications({
  className = "",
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 ${className}`}
    >
      {CERTS.map((c) => (
        <span
          key={c.alt}
          className={`flex items-center justify-center rounded-md bg-white shadow-sm ring-1 ring-black/5 ${
            compact ? "h-8 px-2.5" : "h-12 px-4"
          }`}
        >
          <Image
            src={c.src}
            alt={`Сертификат ${c.alt}`}
            width={140}
            height={56}
            className={`w-auto object-contain ${compact ? "h-4" : "h-6 sm:h-7"}`}
          />
        </span>
      ))}
    </div>
  );
}
