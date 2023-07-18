import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./general/firebase-config.js";

// interface User {
//     uid: string
//     email: string
// }

interface ContextType {
  user: any;
  userLoading: string | null;
  loggedIn: boolean;
  setLoggedIn: any;
}

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserContext = createContext<ContextType>({
  user: null,
  userLoading: null,
  loggedIn: false,
  setLoggedIn: null,
});

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<any>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [userLoading, setUserLoading] = useState<string | null>('');

  useEffect(() => {
    setUserLoading("loading");
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if(currentUser) {
        setUserLoading("loaded");
      }
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, userLoading, loggedIn, setLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
