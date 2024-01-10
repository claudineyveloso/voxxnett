'use client'
import React,  { createContext, useState, useEffect }  from "react";
import { useRouter } from 'next/navigation'
import axios from 'axios';
import { api, login } from "../components/api/page";

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
    const response = await login(email, password)
    if(response) {
      const token = response.data.token
      setInfoUser({
        email: response.data.status.data.user.email,
        user_name: response.data.status.data.user.user_name,
        user_type: response.data.status.data.user.user_type,
      })
      localStorage.setItem('voxxNettUseToken', JSON.stringify(token));

      router.push('/');
    }
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