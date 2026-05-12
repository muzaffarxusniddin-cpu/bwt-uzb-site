import { ERP_API } from "./config";
import type { PublicProduct } from "./types";

export async function fetchProducts(): Promise<PublicProduct[]> {
  try {
    const res = await fetch(`${ERP_API}/api/public/products`, {
      next: { revalidate: 300 }, // 5 min ISR cache on Vercel
    });
    if (!res.ok) return [];
    return (await res.json()) as PublicProduct[];
  } catch {
    return [];
  }
}

export async function fetchProductBySku(sku: string): Promise<PublicProduct | null> {
  const all = await fetchProducts();
  return all.find(p => p.sku === sku) ?? null;
}
