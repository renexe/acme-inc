import { IProduct } from "./product";

export interface IUser {
  name: string;
  phone: string;
  email: string;
  password: string;
  favorites?: IProduct[];
}