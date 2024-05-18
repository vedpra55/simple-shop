// context/AuthContext.js
import { createContext, useEffect, useState, useContext, } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, firestore } from '@/config/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(null);

      if (user) {
        const userDocRef = doc(firestore, 'users', user.uid);
        const userDocUnsubscribe = onSnapshot(userDocRef, (doc) => {
          setCurrentUser({ uid: user.uid, ...doc.data() });
        });
        setLoading(false)

        return () => userDocUnsubscribe();
      } else {
        setLoading(false);
      }
    });


    return unsubscribe;
  }, []);

  if (loading) {
    return <div className='h-screen flex justify-center mt-56 items-center'>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);