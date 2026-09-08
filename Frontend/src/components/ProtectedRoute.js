
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

  // Prevent flashing content while waiting for the network check to complete
  if (loading) {
    return <div>Verifying credentials...</div>; 
  }

  // If backend says no, kick them out to the login page
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}