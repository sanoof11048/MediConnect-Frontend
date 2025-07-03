import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import axiosAuth from '../api/axiosAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

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
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => { },
  logout: () => { },
  isLoading: true,
  signUp: async () => { },
  setIsLoading: () => { },
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
    const token = userData.accessToken
    localStorage.setItem('token', token);

    setUser(fullUser);
    console.log(userData)
    if (userData.role == "Admin") {
      console.log("ToAdmin")
      navigate('/admin')
    }
    else if (userData.role == "HomeNurse") {
      console.log("ToNurse")
      navigate('/nurse')
    }
    else if (userData.role == "Relative") {
      console.log("ToRelative")
      navigate('/relative')
    }
    else {
      console.log("ToHome")
      navigate('/');
    }
  };

  const signUp = async (userData: FormData) => {
    try {
      const response = await axiosAuth.post('/Auth/signup', userData);
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
      localStorage.setItem('token', user.accessToken);
      setUser(fullUser);

      if (user.role == "Relative") {
        navigate('/relative');
      } else if (user.role == "Relative") {
        navigate('/relative');
      }
      else navigate('/');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Sign up failed");
      throw error;
    }
  };

  const logout = async () => {
    try {
      await toast.promise(
        axiosAuth.post('/Auth/logout'),
        {
          loading: 'Logging out...',
          success: (res) => {
            setUser(null);
            localStorage.clear();
            navigate('/login');
            return res.data.message || 'Logged out successfully';
          },
          error: (err) => {
            throw err?.response?.data?.message || 'Logout failed';
          },
        }
      );
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error(typeof error === 'string' ? error : 'Something went wrong during logout.');
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        console.log("first")
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('authUser');
        setUser(null);
      } finally {

        setIsLoading(false);
      }
    }
    setIsLoading(false);
  }, []);


  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, signUp, setIsLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
