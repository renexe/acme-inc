'use client';
import { IProduct } from '@/models/product';
import { createContext, useEffect, useState } from 'react';

export interface CartContextProps {
  cart: IProduct[] | [];
  emptyCart: () => void;
  addToCart: (product: IProduct) => void;
  removeFromCart: (product: IProduct) => void;
  drawerState: boolean;
  handleDrawerState: () => void;
}

interface CartContextProviderProps {
  children: React.ReactNode
}

const INITIAL_STATE: CartContextProps = {
  cart: [],
  emptyCart: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  drawerState: false,
  handleDrawerState: () => {},
}

export const CartContext = createContext<CartContextProps>(INITIAL_STATE);

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cart, setCart] = useState<IProduct[] | []>(INITIAL_STATE.cart);
  const [drawerState, setDrawerState] = useState<boolean>(INITIAL_STATE.drawerState);

  const handleAddToCart = (product: IProduct) => {
    setCart([...cart, product]);

    let storedCart: IProduct[] = [];
    if (localStorage.getItem("cart")) {
      storedCart = JSON.parse(localStorage.getItem("cart")!);
    }
    storedCart.push(product);
    localStorage.setItem("cart", JSON.stringify(storedCart));
  }

  const handleRemoveFromCart = (product: IProduct) => {
    const newCart = cart.filter((item) => item.slug !== product.slug);
    setCart(newCart);

    let storedCart: IProduct[] = [];
    if (localStorage.getItem("cart")) {
      storedCart = JSON.parse(localStorage.getItem("cart")!);
    }
    storedCart = storedCart.filter((item) => item.slug !== product.slug);
    localStorage.setItem("cart", JSON.stringify(storedCart));
  }
  
  const emptyCart = () => {
    setCart([]);
    localStorage.setItem("cart", JSON.stringify([]));
  }

  const handleDrawerState = () => {
    setDrawerState((cur) => !cur);
  }

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCart(parsedCart);
    }
    console.log(cart);
  }, []);

  return (
    <CartContext.Provider value={{ 
      cart, 
      emptyCart, 
      addToCart: handleAddToCart, 
      removeFromCart: handleRemoveFromCart,
      drawerState,
      handleDrawerState,
      }}>
      {children}
    </CartContext.Provider>
  );
}