import { IUser } from "@/models/user";

export function getUsers(): IUser[] {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  return users;
}

export function saveUser(user: IUser): void {
  const users = getUsers();
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
}

export function login(email: string, password: string): boolean {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    return true;
  }
  return false;
}

export function isLoggedIn(): boolean {
  return localStorage.getItem('isLoggedIn') === 'true';
}

export function getLoggedInUser(): IUser | null {
  const user = localStorage.getItem('loggedInUser');
  if (user) {
    return JSON.parse(user);
  }
  return null;
}

export function logout(): void {
  localStorage.removeItem('isLoggedIn');
}
