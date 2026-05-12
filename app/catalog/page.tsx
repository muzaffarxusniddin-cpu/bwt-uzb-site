import { fetchProducts } from "@/lib/api";
import CatalogClient from "./CatalogClient";

export const revalidate = 300;

export const metadata = {
  title: "Каталог фильтров BWT — bwt-uzb.uz",
  description: "Полный каталог фильтров BWT в Узбекистане: магистральные, защитные, картриджи, умягчители, обратный осмос.",
};

export default async function CatalogPage() {
  const products = await fetchProducts();
  return <CatalogClient products={products} />;
}
