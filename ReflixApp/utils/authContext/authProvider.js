import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import AuthContext from './authContext';
// import axios from "axios";

const AuthProvider = ({children}) => {
  const [currentUser, setUser] = useState({currentUser: null});
  const [initializing, setInitializing] = useState(true);
  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(() => ({currentUser: user}));
        console.log('logged in');
        if (initializing) setInitializing(false);
      } else {
        console.log('not logged in');
        setUser(() => ({currentUser: null}));
        if (initializing) setInitializing(false);
      }
    });
  }, []);
  if (initializing) return null;
  else
    return (
      <AuthContext.Provider value={currentUser}>
        {children}
      </AuthContext.Provider>
    );
};
export default AuthProvider;
