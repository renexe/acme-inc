'use client';
import { IUser } from '@/models/user';
import { createContext, useEffect, useState } from 'react';

export interface UserContextProps {
  registeredUsers: IUser[] | [];
  registerUser: (user: IUser) => void;
  signIn: (email: string, password: string) => boolean;
  signOut: () => void;
  loggedUser: IUser | null;
  signInDialogState: boolean;
  handleSignInDialogState: () => void;
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
}

export const UserContext = createContext<UserContextProps>(INITIAL_STATE);

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [registeredUsers, setRegisteredUsers] = useState<IUser[] | []>(INITIAL_STATE.registeredUsers);
  const [loggedUser, setLoggedUser] = useState<IUser | null>(INITIAL_STATE.loggedUser);
  const [signInDialogState, setSignInDialogState] = useState<boolean>(INITIAL_STATE.signInDialogState);

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
      return true;
    }
    return false;
  }

  const handleSignOut = () => {
    setLoggedUser(null);
    localStorage.removeItem("loggedUser");
  }

  const handleSignInDialogState = () => {
    setSignInDialogState((cur) => !cur);
  }

  useEffect(() => {
    if(localStorage.getItem("registeredUsers")) {
      setRegisteredUsers(JSON.parse(localStorage.getItem("registeredUsers")!));
    }
    
    if (localStorage.getItem("loggedUser")) {
      setLoggedUser(JSON.parse(localStorage.getItem("loggedUser")!));
    }
  }, []);

  return (
    <UserContext.Provider value={{
      registeredUsers,
      registerUser: handleRegisterUser,
      signIn: handleSignIn,
      signOut: handleSignOut,
      loggedUser,
      signInDialogState,
      handleSignInDialogState,
    }}>
      {children}
    </UserContext.Provider>
  );
}