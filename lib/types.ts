export type PublicProduct = {
  id:          number;
  sku:         string | null;
  name:        string;
  category:    string;
  description: string | null;
  unit:        string;
  priceRetail: number;
  imageUrl:    string | null;
  stockQty:    number;
  cartridges:  Array<{
    intervalMonths: number;
    quantity:       number;
    sku:            string | null;
    name:           string;
    priceUsd:       number;
    imageUrl:       string | null;
  }>;
};
