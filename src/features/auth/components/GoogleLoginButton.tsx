declare global {
  interface Window {
    google: any;
  }
}

import { useEffect } from 'react';
import axios from 'axios';

const clientId = '298724625715-nc8n8dnrc7527j0m8k5bjkc3uo2u9igc.apps.googleusercontent.com';

function GoogleLoginButton() {
  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredentialResponse,
      });
    }
  }, []);

  const handleCredentialResponse = async (response: any) => {
    console.log('Google ID Token:', response.credential);
    try {
      const res = await axios.post('https://localhost:7267/api/Auth/google-login', {
        idToken: response.credential,
      });
      console.log('Login Success:', res.data);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleGoogleSignIn = () => {
    if (window.google) {
      window.google.accounts.id.prompt();
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="w-full mb-6 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 shadow-sm hover:shadow-md"
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C.78 9.3.78 13.7 2.18 15.93L5.84 14.09z" />
        <path fill="#EA4335" d="M12 4.62c1.62 0 3.08.56 4.23 1.67l3.16-3.16C17.44 1.09 14.88 0 12 0 7.7 0 3.99 2.47 2.18 6.07L5.84 8.91C6.71 6.31 9.14 4.62 12 4.62z" />
      </svg>
      <span>Continue with Google</span>
    </button>
  );
}

export default GoogleLoginButton;
