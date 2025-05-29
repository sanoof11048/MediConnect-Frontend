import { useNavigate } from 'react-router-dom';

export default function NavigationPage() {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Navigation Page</h1>
      <div className="space-y-2">
        <button onClick={() => navigate('/login')} className="px-4 py-2 bg-blue-600 text-white rounded">
          Go to Login
        </button>
        <button onClick={() => navigate('/forget')} className="px-4 py-2 bg-purple-600 text-white rounded">
          Go to Forgot Password
        </button>
        <button onClick={() => navigate('/unauthorized')} className="px-4 py-2 bg-red-600 text-white rounded">
          Go to Unauthorized
        </button>
        <button onClick={() => navigate('/chief')} className="px-4 py-2 bg-green-600 text-white rounded">
          Go to Chief Dashboard
        </button>
        <button onClick={() => navigate('/')} className="px-4 py-2 bg-gray-600 text-white rounded">
          Go to Not Found (Home)
        </button>
      </div>
    </div>
  );
}
