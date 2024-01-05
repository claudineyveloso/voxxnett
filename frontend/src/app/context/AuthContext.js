'use client'
import React,  { createContext, useState, useEffect }  from "react";
import { useRouter } from 'next/navigation'
import axios from 'axios';
import api from "../components/api";
//import { redirect } from "next/dist/server/api-utils";

//import history from '../components/history';

const AuthContext = createContext();

function AuthProvider ({ children }) {
  const [authenticated, setAuthenticated] = useState(true);
  const [loading, setLoading] = useState(true);
  const [infoUser, setInfoUser] = useState({});
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('voxxNettUseToken');
    if (token != null) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    } else {
      router.push('/pages/login');
    }
    setLoading(false);
  }, [])

  async function handleLogin(email, password) {
    const apiUrl = 'http://localhost:3001'
    const response = await axios.post(`${apiUrl}/login`, { "user": { "email": email, "password": password }  })
     .then((response) => {
      const token = response.data.token
      setInfoUser({
        email: response.data.status.data.user.email,
        user_name: response.data.status.data.user.user_name
      })
      localStorage.setItem('voxxNettUseToken', JSON.stringify(token));
      api.defaults.headers.Authorization = `Bearer ${token}`;
      console.log('Valor de response em AuthContext.js', response.data)
      router.push('/');
     }).catch(function(err) {
      console.log('Apresentação do erro', err);
      return err;
     })
  }


  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem('voxxNettUseToken');
    api.defaults.headers.Authorization = undefined;
  }


  return (
    <AuthContext.Provider value={{ authenticated, loading, infoUser, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };