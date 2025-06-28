declare global {
  interface Window {
    google: any;
  }
}
interface GoogleLoginButtonProps {
  divId: string;
}

import { useEffect } from 'react';
import toast from 'react-hot-toast';
import axiosAuth from '../../../api/axiosAuth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const clientId = '298724625715-nc8n8dnrc7527j0m8k5bjkc3uo2u9igc.apps.googleusercontent.com';

function GoogleLoginButton({ divId }: GoogleLoginButtonProps) {
  const navigate = useNavigate();
  const {setIsLoading} = useAuth();

  useEffect(() => {
    if (window.google && document.getElementById(divId)) {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById(divId),
        {
          theme: "outline",
          size: "large",
          shape: "circle",
          text: "continue_with",
          width: 300,
        }
      );
    }
  }, [divId]);

  const handleCredentialResponse = async (response: any) => {
    try {
      setIsLoading(true);
      console.log("first")
      const res = await toast.promise(
  axiosAuth.post(
    '/Auth/google-login',
    { idToken: response.credential }
  ).then((ress)=>{
    console.log(ress.data)
  }),

        {
          loading: 'Logging in with Google...',
          success: 'Google login successful!',
          error: 'Google login failed. Please try again.',
        }
      );
      const userData = await res.data.data;
      localStorage.setItem('authUser', JSON.stringify(userData));
      localStorage.setItem('token', userData.accessToken);
      console.log(userData.role)
      if (userData.role == "Admin"){
        console.log("ToAdmin")
        navigate('/admin')
        setIsLoading(true);
      }
      else if (userData.role == "HomeNurse"){
        console.log("ToNurse")
        navigate('/nurse')
        setIsLoading(true);
      }
      else if (userData.role == "Relative"){
        console.log("ToRelative")
        navigate('/relative')
        setIsLoading(true);
      }
      else{
        console.log("ToHome")
        navigate('/');
        setIsLoading(true);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }finally{
      setIsLoading(true);
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div id={divId} className="w-full flex justify-center items-center" />
    </div>
  );
}

export default GoogleLoginButton;
