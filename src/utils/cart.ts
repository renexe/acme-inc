const DISCOUNT = 0.15;

export function applyDiscount(price: number): number {
  return price - price * DISCOUNT;
}

export function priceWithDiscount(price: number) {
  const finalPrice = applyDiscount(price);
  return finalPrice.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}