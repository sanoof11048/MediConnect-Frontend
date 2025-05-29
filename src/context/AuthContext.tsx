import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import axiosAuth from '../api/axiosAuth';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

type User = {
  userId: string;
  email: string;
  role: string;
  photoUrl: string;
  fullName: string;
  accessToken: string;
    refreshToken: string;
} | null;

type AuthContextType = {
  user: User;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {},
  isLoading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

const login = async (email: string, password: string) => {
  const response = await axiosAuth.post(`/auth/login`, { email, password });
  const userData = response.data.data;
  const fullUser: User = {
    userId: userData.id,
    fullName: userData.fullName,
    email: userData.email,
    role: userData.role,
    photoUrl: userData.photoUrl,
    accessToken: userData.accessToken,
    refreshToken: userData.refreshToken,
  };
  Cookies.set('authUser', JSON.stringify(fullUser), { expires: 7, sameSite: 'strict' });
  setUser(fullUser);
};


  const logout = () => {
    setUser(null);
    Cookies.remove('authUser');
    navigate('/login');
  };

  useEffect(() => {
    const storedUser = Cookies.get('authUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
