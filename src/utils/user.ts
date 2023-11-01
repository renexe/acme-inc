import { IUser } from "@/models/user";
import { IProduct } from "@/models/product";

export function getUsers(): IUser[] {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  return users;
}

export function saveUser(user: IUser): void {
  const users = getUsers();
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
}

export function login(email: string, password: string): boolean {
  const users = getUsers();
  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    return true;
  }
  return false;
}

export function isLoggedIn(): boolean {
  return localStorage.getItem("isLoggedIn") === "true";
}

export function getLoggedInUser(): IUser | null {
  const user = localStorage.getItem("loggedInUser");
  if (user) {
    return JSON.parse(user);
  }
  return null;
}

export function logout(): void {
  localStorage.removeItem("isLoggedIn");
}

export function saveFavoriteProduct(product: IProduct): void {
  const user = getLoggedInUser();
  if (user) {
    const favoriteProducts = user.favorites || [];
    favoriteProducts.push(product);
    user.favorites = favoriteProducts;
    saveUser(user);
    localStorage.setItem("loggedInUser", JSON.stringify(user));
  }
}

export function getFavoriteProducts(): IProduct[] {
  const user = getLoggedInUser();
  if (user) {
    return user.favorites || [];
  }
  return [];
}

export function isFavoriteProduct(product: IProduct): boolean {
  const user = getLoggedInUser();
  if (!product || !user) return false;

  const favorites = getFavoriteProducts();
  if (favorites) {
    return favorites.some((p) => p.name === product.name);
  }

  return false;
}

export function removeFavoriteProduct(product: IProduct): void {
  const user = getLoggedInUser();
  if (user) {
    const favoriteProducts = user.favorites || [];
    const index = favoriteProducts.findIndex((p) => p.name === product.name);
    if (index !== -1) {
      favoriteProducts.splice(index, 1);
      user.favorites = favoriteProducts;
      saveUser(user);
      localStorage.setItem("loggedInUser", JSON.stringify(user));
    }
  }
}
