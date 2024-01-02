'use client'
import React,  { createContext, useState, useEffect }  from "react";
import { useRouter } from 'next/navigation'
import axios from 'axios';
//import history from '../components/history';

const AuthContext = createContext();

function AuthProvider ({ children }) {
  const [authenticated, setAuthenticated] = useState(true);
  const [loading, setLoading] = useState(true);
  const router = useRouter()
  useEffect(() => {
    const token = localStorage.getItem('voxxNettUseToken');
    if (token != null) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
      console.log('Tem token')
    } else {
      console.log('Não tem token')
      router.push('/pages/login');
    }
    setLoading(false);

  }, [])

  async function handleLogin(email, password) {
    const apiUrl = 'http://localhost:3001'
    const x = process.env.NEXTAUTH_URL
    debugger
    const response = await axios.post(`${apiUrl}/login`, { "user": { "email": email, "password": password }  })
     .then((response) => {
      const token = response.data.token
      localStorage.setItem('voxxNettUseToken', JSON.stringify(token));
      api.defaults.headers.Authorization = `Bearer ${token}`;
      console.log(response.data)
      history.push('/dashboard');
      setAuthenticated(true);
     }).catch(function(err) {
      console.log('Apresentação do erro', err);
      return err;
     })
  }

  function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem('voxxNettUseToken');
    api.defaults.headers.Authorization = undefined;
    history.push('/login');
  }


  return (
    <AuthContext.Provider value={{ authenticated, loading, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };