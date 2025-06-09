import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import axiosAuth from '../api/axiosAuth';
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
  signUp: (UserData: FormData) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => { },
  logout: () => { },
  isLoading: true,
  signUp: async () => { },
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
    localStorage.setItem('authUser', JSON.stringify(fullUser));
    setUser(fullUser);
  };

  const signUp = async (userData: FormData) => {
    await axiosAuth.post('/Auth/signup', userData)
      .then(response => {
        const user = response.data.data;
        const fullUser: User = {
          userId: user.id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          photoUrl: user.photoUrl,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
        };
        localStorage.setItem('authUser', JSON.stringify(fullUser));
        setUser(fullUser);
        navigate('/dashboard');
      })
    // .catch(error => {
    //   console.error('Sign Up Error:', error);
    //   throw error;
    // });
  }


  const logout = () => {
    setUser(null);
    localStorage.removeItem('authUser');
    navigate('/login');
  };

  useEffect(() => {

    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
