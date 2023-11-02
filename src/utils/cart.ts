import { IProduct } from "@/models/product";

const DISCOUNT = 0.15;

export function getCart() {
  if (typeof window === 'undefined') return;

  let cart: IProduct[] = [];
  if (localStorage?.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart")!);
  }
  return cart;
}

export function addToCart(product: IProduct) {
  let cart: IProduct[] = [];
  if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart")!);
  }
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function removeFromCart(productIndex: number) {
  let cart: IProduct[] = [];
  if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart")!);
  }
  cart.splice(productIndex, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
}

function applyDiscount(price: number): number {
  return price - price * DISCOUNT;
}

export function priceWithDiscount(price: number) {
  const finalPrice = applyDiscount(price);
  return finalPrice.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function totalCart() {
  let total = 0;
  if (localStorage.getItem("cart")) {
    const cart = JSON.parse(localStorage.getItem("cart")!);
    total = cart.reduce((acc: number, product: IProduct) => {
      return acc + applyDiscount(product.price);
    }, 0);
  }

  return total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
