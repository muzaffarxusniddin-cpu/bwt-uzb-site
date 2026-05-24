import { notFound } from "next/navigation";

// Catch-all for unknown paths under a locale. Without this, next-intl rewrites
// unknown URLs to the default locale and they fall through to the global
// /_not-found instead of our styled app/[locale]/not-found.tsx.
export default function CatchAllNotFound() {
  notFound();
}
