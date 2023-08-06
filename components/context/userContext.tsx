import { auth } from 'components/firebase/firebase-config';
import 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import React, {
  useContext,
  useEffect,
  useState
} from 'react';


const defaultUser = { loggedIn: false, email: "" };
const UserContext = React.createContext<any>({});
const UserProvider = UserContext.Provider;
const UserConsumer = UserContext.Consumer;

function onAuthStateChange(setUser: any) {
  return onAuthStateChanged(auth, user => {
    if (user) {
      setUser(user);
    } else {
      setUser({loggedIn: false});
    }
  });
}

export function NewUserProvider({children}: {children: React.ReactNode}) {
  const [newUser, setUser] = useState({loggedIn: null});
  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      unsubscribe();
    }
  }, []);


  return (
    <UserContext.Provider value={newUser}>
      {children}
    </UserContext.Provider>
  );
}

export const useNewUser = () => useContext(UserContext);