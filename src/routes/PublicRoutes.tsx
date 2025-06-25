import type { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loading from '../pages/Loading';

const PublicRoute = ({ children }: { children: JSX.Element }): JSX.Element => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <Loading />;
  if (user) return <Navigate to="/" replace />;

  return children;
};

export default PublicRoute;