import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios';

const AuthContext = createContext({
  isLoggedIn: false,
  checkAuth: () => { },
  login: () => { },
  signup: () => { },
  logout: () => { },
});

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const checkAuth = async () => {
    try {
      await axios
        .get(`${process.env.REACT_APP_API_URL}/users/check-auth`, { withCredentials: true });
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
      setIsLoggedIn(false);
    }
  };

  const login = (formData, navigate) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/users/signin`, formData, { withCredentials: true })
      .then(() => {
        setIsLoggedIn(true);
        alert('ログインに成功しました');
        navigate('/todo');
      })
      .catch((error) => {
        console.error(error);
        alert('ログインに失敗しました');
      });
  };

  const signup = async (formData, navigate) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/users/signup`, formData, { withCredentials: true });
      alert('サインアップに成功しました');
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert('サインアップに失敗しました');
    }
  };

  const logout = async (navigate) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/users/signout`, {}, { withCredentials: true });
      setIsLoggedIn(false);
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  console.log('isLoggedIn =>', isLoggedIn);


  return (
    <AuthContext.Provider value={{ isLoggedIn, checkAuth, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
};

export const useAuth = () => useContext(AuthContext);