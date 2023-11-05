'use client';
import { IUser } from '@/models/user';
import { createContext, useContext, useEffect, useState } from 'react';

export interface UserContextProps {
  registeredUsers: IUser[] | [];
  registerUser: (user: IUser) => void;
  signIn: (email: string, password: string) => boolean;
  signOut: () => void;
  loggedUser: IUser | null;
  signInDialogState: boolean;
  handleSignInDialogState: () => void;
  handleFavoriteProduct: (productSlug: string) => void;
  favoriteProducts: string[];
}

interface UserContextProviderProps {
  children: React.ReactNode
}

const INITIAL_STATE: UserContextProps = {
  registeredUsers: [],
  registerUser: () => { },
  signIn: () => false,
  signOut: () => { },
  loggedUser: null,
  signInDialogState: false,
  handleSignInDialogState: () => { },
  handleFavoriteProduct: () => { },
  favoriteProducts: []
}

export const UserContext = createContext<UserContextProps>(INITIAL_STATE);

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [registeredUsers, setRegisteredUsers] = useState<IUser[] | []>(INITIAL_STATE.registeredUsers);
  const [loggedUser, setLoggedUser] = useState<IUser | null>(INITIAL_STATE.loggedUser);
  const [signInDialogState, setSignInDialogState] = useState<boolean>(INITIAL_STATE.signInDialogState);
  const [favoriteProducts, setFavoriteProducts] = useState<string[]>([]);

  useEffect(() => {
    if (localStorage.getItem("registeredUsers")) {
      setRegisteredUsers(JSON.parse(localStorage.getItem("registeredUsers")!));
    }

    if (localStorage.getItem("loggedUser")) {
      const parsedUser = JSON.parse(localStorage.getItem("loggedUser")!) as IUser;
      setLoggedUser(parsedUser);
      setFavoriteProducts(parsedUser.favorites);
    }
  }, []);

  const handleRegisterUser = (user: IUser) => {
    let storedUser: IUser[] = [];
    if (localStorage.getItem("registeredUsers")) {
      storedUser = JSON.parse(localStorage.getItem("registeredUsers")!);
    }
    storedUser.push(user);
    localStorage.setItem("registeredUsers", JSON.stringify(storedUser));
    setRegisteredUsers(storedUser);
  }

  const handleSignIn = (email: string, password: string) => {   
    const user = registeredUsers.find((u) => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem("loggedUser", JSON.stringify(user));
      setLoggedUser(user);
      setFavoriteProducts(user.favorites);
      return true;
    }
    return false;
  }

  const handleSignOut = () => {
    setLoggedUser(null);
    setFavoriteProducts([]);
    localStorage.removeItem("loggedUser");
  }

  const handleSignInDialogState = () => {
    setSignInDialogState((cur) => !cur);
  }

  const handleFavoriteProduct = (productSlug: string) => {
    if (!loggedUser) return;
    const updatedUser = { ...loggedUser };
    
    if(loggedUser.favorites.find((fav) => fav === productSlug)) { // Means that the product is already a favorite
      updatedUser.favorites = updatedUser.favorites.filter((fav) => fav !== productSlug);
    } else {
      updatedUser.favorites.push(productSlug);
    }
    setFavoriteProducts(updatedUser.favorites);
    setLoggedUser(updatedUser);
    localStorage.setItem("loggedUser", JSON.stringify(updatedUser));
    setRegisteredUsers((cur) => {
      const updatedUsers = cur.map((user) => {
        if (user.email === updatedUser.email) {
          return updatedUser;
        }
        return user;
      });
      localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));
      return updatedUsers;
    });
  }

  return (
    <UserContext.Provider value={{
      registeredUsers,
      registerUser: handleRegisterUser,
      signIn: handleSignIn,
      signOut: handleSignOut,
      loggedUser,
      signInDialogState,
      handleSignInDialogState,
      handleFavoriteProduct,
      favoriteProducts
    }}>
      {children}
    </UserContext.Provider>
  );
}