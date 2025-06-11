<<<<<<< HEAD
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

const clientId = '298724625715-nc8n8dnrc7527j0m8k5bjkc3uo2u9igc.apps.googleusercontent.com';

function GoogleLoginButton({ divId }: GoogleLoginButtonProps) {
  const navigate = useNavigate();

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
      const res = await toast.promise(
        axiosAuth.post('/Auth/google-login', {
          idToken: response.credential,
        }),
        {
          loading: 'Logging in with Google...',
          success: 'Google login successful!',
          error: 'Google login failed. Please try again.',
        }
      );
      console.log(res)
      // const role = res.data.data.role;
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div id={divId} className="w-full flex justify-center items-center" />
    </div>
  );
}

export default GoogleLoginButton;
=======
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

const clientId = '298724625715-nc8n8dnrc7527j0m8k5bjkc3uo2u9igc.apps.googleusercontent.com';

function GoogleLoginButton({ divId }: GoogleLoginButtonProps) {
  const navigate = useNavigate();

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
      const res = await toast.promise(
        axiosAuth.post('/Auth/google-login', {
          idToken: response.credential,
        }),
        {
          loading: 'Logging in with Google...',
          success: 'Google login successful!',
          error: 'Google login failed. Please try again.',
        }
      );
      console.log(res)
      // const role = res.data.data.role;
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div id={divId} className="w-full flex justify-center items-center" />
    </div>
  );
}

export default GoogleLoginButton;
>>>>>>> 7697930 (Initial commit3)
