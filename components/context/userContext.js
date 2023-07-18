import React, { createContext, useContext, useEffect, useState } from 'react';

// Create the context
const UserUidContext = createContext();

// Create a custom hook to access the user's UID
export const useUserUid = () => useContext(UserUidContext);

// Create a provider component to wrap your app
export const UserUidProvider = ({ children }) => {
  const [userUid, setUserUid] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        setUserUid(uid);
        localStorage.setItem('userUid', uid); // Save the UID in localStorage
        localStorage.setItem('userName', user.displayName); // Save the UID in localStorage
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  // Check if the userUid is already stored in localStorage
  useEffect(() => {
    const storedUserUid = localStorage.getItem('userUid');
    if (storedUserUid) {
      setUserUid(storedUserUid);
    }
  }, []);

  return (
    <UserUidContext.Provider value={userUid}>
      {children}
    </UserUidContext.Provider>
  );
};
