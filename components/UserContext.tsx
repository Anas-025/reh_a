import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router.js";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebase/firebase-config.js";
import Loading from "./general/Loading/Loading";

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
  const [user, setUser] = useState<any>({loggedIn: null});
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [userLoading, setUserLoading] = useState<string | null>('');
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    setUserLoading("loading");
    onAuthStateChanged(auth, (currentUser) => {
      if(currentUser) {
        setUser(currentUser);
        setLoading(false);
        setUserLoading("loaded");
      }else{
        setUser({loggedIn: false});
      }
    });
  }, []);

  if(user.loggedIn === false){
    router.push("/signin");
  }


  return (
      loading ? (
        <Loading message="Loading Data..." />
      ) : (
        <UserContext.Provider value={{ user, userLoading, loggedIn, setLoggedIn }}>
          {children}
        </UserContext.Provider>
      )
  );
};

export const useUser = () => useContext(UserContext);
