"use client";

import { useSearchParams } from "next/navigation";
import LeadForm from "../components/LeadForm";

export default function RequestClient() {
  const params = useSearchParams();
  const sku  = params.get("sku") ?? undefined;
  const name = params.get("name") ?? undefined;
  return (
    <LeadForm
      productSku={sku}
      productName={name}
      title=""
      subtitle="" />
  );
}
